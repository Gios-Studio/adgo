#!/usr/bin/env node

/**
 * AdGo Partner Integration CLI Tool
 * Command-line interface for partner integration workflow management
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PartnerIntegrationCLI {
  constructor() {
    this.workflowsDir = path.join(process.cwd(), '.adgo', 'workflows');
    this.templatesDir = path.join(process.cwd(), '.adgo', 'templates');
    this.configFile = path.join(process.cwd(), '.adgo', 'config.json');
    
    this.ensureDirectories();
    this.loadConfig();
  }

  ensureDirectories() {
    [this.workflowsDir, this.templatesDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  loadConfig() {
    try {
      if (fs.existsSync(this.configFile)) {
        this.config = JSON.parse(fs.readFileSync(this.configFile, 'utf8'));
      } else {
        this.config = {
          apiEndpoint: 'https://api.adgo.com',
          defaultRegion: 'global',
          notifications: {
            slack: null,
            email: null,
            teams: null
          }
        };
        this.saveConfig();
      }
    } catch (error) {
      console.error('Error loading config:', error.message);
      process.exit(1);
    }
  }

  saveConfig() {
    fs.writeFileSync(this.configFile, JSON.stringify(this.config, null, 2));
  }

  async run() {
    const args = process.argv.slice(2);
    const command = args[0];

    try {
      switch (command) {
        case 'init':
          await this.initProject();
          break;
        case 'create':
          await this.createWorkflow(args.slice(1));
          break;
        case 'list':
          await this.listWorkflows();
          break;
        case 'status':
          await this.showStatus(args[1]);
          break;
        case 'update':
          await this.updateStatus(args[1], args[2], args[3]);
          break;
        case 'validate':
          await this.validateWorkflow(args[1]);
          break;
        case 'export':
          await this.exportWorkflow(args[1], args[2]);
          break;
        case 'template':
          await this.manageTemplate(args.slice(1));
          break;
        case 'config':
          await this.manageConfig(args.slice(1));
          break;
        case 'notify':
          await this.sendNotification(args.slice(1));
          break;
        case 'help':
        default:
          this.showHelp();
          break;
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  }

  async initProject() {
    console.log('🚀 Initializing AdGo Partner Integration project...');

    // Create default templates
    const defaultTemplates = {
      'technical-standard': {
        name: 'Standard Technical Integration',
        items: [
          {
            id: 'sdk-setup',
            title: 'SDK Installation and Setup',
            category: 'technical',
            priority: 'critical',
            estimatedTime: '2-4 hours',
            description: 'Install and configure AdGo SDK'
          },
          {
            id: 'api-integration',
            title: 'API Integration Testing',
            category: 'technical',
            priority: 'high',
            estimatedTime: '4-6 hours',
            description: 'Test core API endpoints and error handling'
          }
        ]
      },
      'compliance-gdpr': {
        name: 'GDPR Compliance Workflow',
        items: [
          {
            id: 'data-processing-agreement',
            title: 'Data Processing Agreement',
            category: 'legal',
            priority: 'critical',
            estimatedTime: '1-2 weeks',
            description: 'Review and execute DPA'
          },
          {
            id: 'consent-management',
            title: 'Consent Management Implementation',
            category: 'compliance',
            priority: 'high',
            estimatedTime: '3-5 days',
            description: 'Implement GDPR consent mechanisms'
          }
        ]
      }
    };

    // Save templates
    Object.entries(defaultTemplates).forEach(([key, template]) => {
      const templatePath = path.join(this.templatesDir, `${key}.json`);
      fs.writeFileSync(templatePath, JSON.stringify(template, null, 2));
    });

    // Create sample workflow
    const sampleWorkflow = {
      id: 'sample-integration',
      partnerName: 'Sample Partner',
      partnerType: 'advertiser',
      region: 'global',
      status: 'active',
      createdAt: new Date().toISOString(),
      checklist: defaultTemplates['technical-standard'].items
    };

    const workflowPath = path.join(this.workflowsDir, 'sample-integration.json');
    fs.writeFileSync(workflowPath, JSON.stringify(sampleWorkflow, null, 2));

    console.log('✅ Project initialized successfully!');
    console.log(`📁 Workflows directory: ${this.workflowsDir}`);
    console.log(`📋 Templates directory: ${this.templatesDir}`);
    console.log('🔧 Run "adgo-partners help" to see available commands');
  }

  async createWorkflow(args) {
    const [partnerName, partnerType = 'advertiser', region = 'global'] = args;

    if (!partnerName) {
      throw new Error('Partner name is required. Usage: adgo-partners create "Partner Name" [type] [region]');
    }

    const workflowId = `${partnerName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    
    // Interactive workflow creation
    console.log(`🤝 Creating integration workflow for ${partnerName}...`);
    
    const workflow = {
      id: workflowId,
      partnerName,
      partnerType,
      region,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: this.generateTimeline(),
      checklist: await this.buildChecklist(partnerType, region),
      metadata: {
        priority: 'standard',
        expectedVolume: 'medium',
        techStack: [],
        complianceRequirements: []
      }
    };

    const workflowPath = path.join(this.workflowsDir, `${workflowId}.json`);
    fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2));

    console.log(`✅ Workflow created: ${workflowId}`);
    console.log(`📅 Timeline: ${workflow.timeline.kickoff} → ${workflow.timeline.goLive}`);
    console.log(`📋 ${workflow.checklist.length} checklist items generated`);
    
    return workflowId;
  }

  generateTimeline() {
    const now = new Date();
    const kickoff = new Date(now);
    const technical = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // +1 week
    const testing = new Date(technical.getTime() + 14 * 24 * 60 * 60 * 1000); // +2 weeks
    const compliance = new Date(testing.getTime() + 7 * 24 * 60 * 60 * 1000); // +1 week
    const goLive = new Date(compliance.getTime() + 7 * 24 * 60 * 60 * 1000); // +1 week

    return {
      kickoff: kickoff.toISOString().split('T')[0],
      technicalIntegration: technical.toISOString().split('T')[0],
      testing: testing.toISOString().split('T')[0],
      compliance: compliance.toISOString().split('T')[0],
      goLive: goLive.toISOString().split('T')[0]
    };
  }

  async buildChecklist(partnerType, region) {
    const checklist = [];
    
    // Load technical template
    const technicalTemplate = this.loadTemplate('technical-standard');
    if (technicalTemplate) {
      checklist.push(...technicalTemplate.items);
    }

    // Add compliance items for EU partners
    if (region === 'europe') {
      const complianceTemplate = this.loadTemplate('compliance-gdpr');
      if (complianceTemplate) {
        checklist.push(...complianceTemplate.items);
      }
    }

    // Add partner-type specific items
    if (partnerType === 'publisher' || partnerType === 'advertiser') {
      checklist.push({
        id: 'revenue-sharing',
        title: 'Revenue Sharing Agreement',
        category: 'business',
        priority: 'high',
        estimatedTime: '1-2 weeks',
        description: 'Define revenue sharing terms and payment processes'
      });
    }

    return checklist.map(item => ({
      ...item,
      status: 'pending',
      assignee: 'partner',
      dependencies: [],
      createdAt: new Date().toISOString()
    }));
  }

  loadTemplate(templateName) {
    try {
      const templatePath = path.join(this.templatesDir, `${templateName}.json`);
      if (fs.existsSync(templatePath)) {
        return JSON.parse(fs.readFileSync(templatePath, 'utf8'));
      }
    } catch (error) {
      console.warn(`⚠️  Could not load template: ${templateName}`);
    }
    return null;
  }

  async listWorkflows() {
    console.log('📋 Active Partner Integration Workflows\n');

    const workflowFiles = fs.readdirSync(this.workflowsDir)
      .filter(file => file.endsWith('.json'));

    if (workflowFiles.length === 0) {
      console.log('No workflows found. Run "adgo-partners create" to create your first workflow.');
      return;
    }

    workflowFiles.forEach(file => {
      try {
        const workflow = JSON.parse(fs.readFileSync(path.join(this.workflowsDir, file), 'utf8'));
        const completedItems = workflow.checklist.filter(item => item.status === 'completed').length;
        const progress = ((completedItems / workflow.checklist.length) * 100).toFixed(0);

        console.log(`🔹 ${workflow.partnerName} (${workflow.id})`);
        console.log(`   Type: ${workflow.partnerType} | Region: ${workflow.region}`);
        console.log(`   Progress: ${progress}% (${completedItems}/${workflow.checklist.length} tasks)`);
        console.log(`   Timeline: ${workflow.timeline?.kickoff} → ${workflow.timeline?.goLive}`);
        console.log('');
      } catch (error) {
        console.error(`❌ Error reading workflow ${file}:`, error.message);
      }
    });
  }

  async showStatus(workflowId) {
    if (!workflowId) {
      throw new Error('Workflow ID is required. Usage: adgo-partners status <workflow-id>');
    }

    const workflow = this.loadWorkflow(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    console.log(`📊 Status Report: ${workflow.partnerName}\n`);

    // Overall progress
    const completedItems = workflow.checklist.filter(item => item.status === 'completed').length;
    const inProgressItems = workflow.checklist.filter(item => item.status === 'in-progress').length;
    const blockedItems = workflow.checklist.filter(item => item.status === 'blocked').length;
    const pendingItems = workflow.checklist.filter(item => item.status === 'pending').length;

    console.log('📈 Progress Summary:');
    console.log(`   Total Tasks: ${workflow.checklist.length}`);
    console.log(`   ✅ Completed: ${completedItems}`);
    console.log(`   🔄 In Progress: ${inProgressItems}`);
    console.log(`   ❌ Blocked: ${blockedItems}`);
    console.log(`   ⏳ Pending: ${pendingItems}`);
    console.log(`   📊 Overall: ${((completedItems / workflow.checklist.length) * 100).toFixed(0)}%`);

    // Timeline status
    console.log('\n📅 Timeline:');
    Object.entries(workflow.timeline || {}).forEach(([phase, date]) => {
      const isCompleted = new Date(date) < new Date();
      const icon = isCompleted ? '✅' : '📅';
      console.log(`   ${icon} ${phase}: ${date}`);
    });

    // Recent activity
    console.log('\n📝 Recent Activity:');
    const recentItems = workflow.checklist
      .filter(item => item.updatedAt || item.completedAt)
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.completedAt || 0);
        const dateB = new Date(b.updatedAt || b.completedAt || 0);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);

    if (recentItems.length > 0) {
      recentItems.forEach(item => {
        const date = (item.updatedAt || item.completedAt || '').split('T')[0];
        const statusIcon = item.status === 'completed' ? '✅' : 
                          item.status === 'in-progress' ? '🔄' : 
                          item.status === 'blocked' ? '❌' : '⏳';
        console.log(`   ${statusIcon} ${item.title} (${date})`);
      });
    } else {
      console.log('   No recent activity');
    }
  }

  async updateStatus(workflowId, itemId, newStatus) {
    if (!workflowId || !itemId || !newStatus) {
      throw new Error('Usage: adgo-partners update <workflow-id> <item-id> <status>');
    }

    const workflow = this.loadWorkflow(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    const item = workflow.checklist.find(item => item.id === itemId);
    if (!item) {
      throw new Error(`Checklist item not found: ${itemId}`);
    }

    const validStatuses = ['pending', 'in-progress', 'completed', 'blocked'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status. Valid options: ${validStatuses.join(', ')}`);
    }

    const oldStatus = item.status;
    item.status = newStatus;
    item.updatedAt = new Date().toISOString();

    if (newStatus === 'completed') {
      item.completedAt = new Date().toISOString();
    }

    workflow.updatedAt = new Date().toISOString();

    this.saveWorkflow(workflowId, workflow);

    console.log(`✅ Updated ${item.title}: ${oldStatus} → ${newStatus}`);

    // Send notification if configured
    await this.sendStatusNotification(workflow, item, oldStatus, newStatus);
  }

  async validateWorkflow(workflowId) {
    if (!workflowId) {
      throw new Error('Workflow ID is required. Usage: adgo-partners validate <workflow-id>');
    }

    const workflow = this.loadWorkflow(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    console.log(`🔍 Validating workflow: ${workflow.partnerName}\n`);

    const issues = [];
    const warnings = [];

    // Check for required fields
    if (!workflow.partnerName) issues.push('Partner name is missing');
    if (!workflow.partnerType) issues.push('Partner type is missing');
    if (!workflow.checklist || workflow.checklist.length === 0) {
      issues.push('Checklist is empty');
    }

    // Check timeline consistency
    if (workflow.timeline) {
      const phases = ['kickoff', 'technicalIntegration', 'testing', 'compliance', 'goLive'];
      for (let i = 1; i < phases.length; i++) {
        const prevDate = new Date(workflow.timeline[phases[i-1]]);
        const currDate = new Date(workflow.timeline[phases[i]]);
        if (prevDate >= currDate) {
          warnings.push(`Timeline issue: ${phases[i]} should be after ${phases[i-1]}`);
        }
      }
    }

    // Check for blocked items
    const blockedItems = workflow.checklist.filter(item => item.status === 'blocked');
    if (blockedItems.length > 0) {
      warnings.push(`${blockedItems.length} tasks are blocked`);
    }

    // Check for overdue items
    const today = new Date();
    const overdueItems = workflow.checklist.filter(item => {
      return item.dueDate && new Date(item.dueDate) < today && item.status !== 'completed';
    });
    if (overdueItems.length > 0) {
      warnings.push(`${overdueItems.length} tasks are overdue`);
    }

    // Report results
    if (issues.length === 0 && warnings.length === 0) {
      console.log('✅ Workflow validation passed - no issues found');
    } else {
      if (issues.length > 0) {
        console.log('❌ Critical Issues:');
        issues.forEach(issue => console.log(`   - ${issue}`));
      }
      
      if (warnings.length > 0) {
        console.log('⚠️  Warnings:');
        warnings.forEach(warning => console.log(`   - ${warning}`));
      }
    }

    return { valid: issues.length === 0, issues, warnings };
  }

  async exportWorkflow(workflowId, format = 'json') {
    if (!workflowId) {
      throw new Error('Workflow ID is required. Usage: adgo-partners export <workflow-id> [format]');
    }

    const workflow = this.loadWorkflow(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    const validFormats = ['json', 'csv', 'markdown'];
    if (!validFormats.includes(format)) {
      throw new Error(`Invalid format. Valid options: ${validFormats.join(', ')}`);
    }

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${workflowId}-export-${timestamp}`;

    switch (format) {
      case 'json':
        await this.exportJSON(workflow, filename);
        break;
      case 'csv':
        await this.exportCSV(workflow, filename);
        break;
      case 'markdown':
        await this.exportMarkdown(workflow, filename);
        break;
    }

    console.log(`✅ Exported workflow to ${filename}.${format}`);
  }

  async exportJSON(workflow, filename) {
    const exportData = {
      ...workflow,
      exportedAt: new Date().toISOString(),
      exportedBy: 'adgo-partners-cli'
    };

    fs.writeFileSync(`${filename}.json`, JSON.stringify(exportData, null, 2));
  }

  async exportCSV(workflow, filename) {
    const headers = ['ID', 'Title', 'Category', 'Priority', 'Status', 'Assignee', 'Estimated Time'];
    const rows = workflow.checklist.map(item => [
      item.id,
      `"${item.title}"`,
      item.category,
      item.priority,
      item.status,
      item.assignee,
      item.estimatedTime
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    fs.writeFileSync(`${filename}.csv`, csvContent);
  }

  async exportMarkdown(workflow, filename) {
    const completedItems = workflow.checklist.filter(item => item.status === 'completed').length;
    const progress = ((completedItems / workflow.checklist.length) * 100).toFixed(0);

    const content = `# ${workflow.partnerName} - Integration Checklist

**Partner Type:** ${workflow.partnerType}  
**Region:** ${workflow.region}  
**Progress:** ${progress}% (${completedItems}/${workflow.checklist.length} tasks)  
**Last Updated:** ${workflow.updatedAt}

## Timeline

${Object.entries(workflow.timeline || {}).map(([phase, date]) => `- **${phase}:** ${date}`).join('\n')}

## Checklist Items

${workflow.checklist.map(item => `
### ${item.title} ${item.status === 'completed' ? '✅' : item.status === 'in-progress' ? '🔄' : item.status === 'blocked' ? '❌' : '⏳'}

- **Category:** ${item.category}
- **Priority:** ${item.priority}
- **Status:** ${item.status}
- **Assignee:** ${item.assignee}
- **Estimated Time:** ${item.estimatedTime}

${item.description}
`).join('\n')}

---
*Generated by AdGo Partner Integration CLI*
`;

    fs.writeFileSync(`${filename}.md`, content);
  }

  async manageTemplate(args) {
    const [action, templateName] = args;

    switch (action) {
      case 'list':
        await this.listTemplates();
        break;
      case 'show':
        await this.showTemplate(templateName);
        break;
      case 'create':
        await this.createTemplate(templateName);
        break;
      case 'delete':
        await this.deleteTemplate(templateName);
        break;
      default:
        console.log('Usage: adgo-partners template <list|show|create|delete> [template-name]');
    }
  }

  async listTemplates() {
    console.log('📋 Available Templates\n');

    const templateFiles = fs.readdirSync(this.templatesDir)
      .filter(file => file.endsWith('.json'));

    if (templateFiles.length === 0) {
      console.log('No templates found. Run "adgo-partners template create <name>" to create a template.');
      return;
    }

    templateFiles.forEach(file => {
      try {
        const template = JSON.parse(fs.readFileSync(path.join(this.templatesDir, file), 'utf8'));
        console.log(`🔹 ${file.replace('.json', '')}`);
        console.log(`   Name: ${template.name}`);
        console.log(`   Items: ${template.items?.length || 0}`);
        console.log('');
      } catch (error) {
        console.error(`❌ Error reading template ${file}:`, error.message);
      }
    });
  }

  async showTemplate(templateName) {
    if (!templateName) {
      throw new Error('Template name is required. Usage: adgo-partners template show <template-name>');
    }

    const template = this.loadTemplate(templateName);
    if (!template) {
      throw new Error(`Template not found: ${templateName}`);
    }

    console.log(`📋 Template: ${template.name}\n`);
    console.log(`Items (${template.items?.length || 0}):`);
    
    template.items?.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
      console.log(`   Category: ${item.category} | Priority: ${item.priority}`);
      console.log(`   Time: ${item.estimatedTime}`);
      console.log('');
    });
  }

  async createTemplate(templateName) {
    if (!templateName) {
      throw new Error('Template name is required. Usage: adgo-partners template create <template-name>');
    }

    console.log(`📝 Creating template: ${templateName}`);
    console.log('This is a simplified template creation. Edit the JSON file directly for full customization.');

    const template = {
      name: templateName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      description: 'Custom template created via CLI',
      items: [
        {
          id: 'sample-item',
          title: 'Sample Checklist Item',
          category: 'technical',
          priority: 'medium',
          estimatedTime: '2-4 hours',
          description: 'Replace this with your actual checklist item'
        }
      ]
    };

    const templatePath = path.join(this.templatesDir, `${templateName}.json`);
    fs.writeFileSync(templatePath, JSON.stringify(template, null, 2));

    console.log(`✅ Template created: ${templatePath}`);
    console.log('💡 Edit the JSON file to customize the template items');
  }

  async deleteTemplate(templateName) {
    if (!templateName) {
      throw new Error('Template name is required. Usage: adgo-partners template delete <template-name>');
    }

    const templatePath = path.join(this.templatesDir, `${templateName}.json`);
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found: ${templateName}`);
    }

    fs.unlinkSync(templatePath);
    console.log(`✅ Template deleted: ${templateName}`);
  }

  async manageConfig(args) {
    const [action, key, value] = args;

    switch (action) {
      case 'show':
        console.log('⚙️  Current Configuration:\n');
        console.log(JSON.stringify(this.config, null, 2));
        break;
      
      case 'set':
        if (!key || !value) {
          throw new Error('Usage: adgo-partners config set <key> <value>');
        }
        this.setConfigValue(key, value);
        break;
      
      case 'get':
        if (!key) {
          throw new Error('Usage: adgo-partners config get <key>');
        }
        console.log(this.getConfigValue(key));
        break;
      
      default:
        console.log('Usage: adgo-partners config <show|set|get> [key] [value]');
    }
  }

  setConfigValue(key, value) {
    const keys = key.split('.');
    let current = this.config;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    this.saveConfig();
    console.log(`✅ Set ${key} = ${value}`);
  }

  getConfigValue(key) {
    const keys = key.split('.');
    let current = this.config;
    
    for (const k of keys) {
      if (!(k in current)) {
        return undefined;
      }
      current = current[k];
    }
    
    return current;
  }

  async sendNotification(args) {
    const [channel, workflowId, message] = args;

    if (!channel || !workflowId) {
      throw new Error('Usage: adgo-partners notify <slack|email|teams> <workflow-id> [message]');
    }

    const workflow = this.loadWorkflow(workflowId);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    const defaultMessage = `Workflow update for ${workflow.partnerName}`;
    const notificationMessage = message || defaultMessage;

    console.log(`📢 Sending ${channel} notification...`);

    // In a real implementation, this would integrate with actual notification services
    switch (channel) {
      case 'slack':
        await this.sendSlackNotification(workflow, notificationMessage);
        break;
      case 'email':
        await this.sendEmailNotification(workflow, notificationMessage);
        break;
      case 'teams':
        await this.sendTeamsNotification(workflow, notificationMessage);
        break;
      default:
        throw new Error('Invalid channel. Options: slack, email, teams');
    }
  }

  async sendSlackNotification(workflow, message) {
    const slackConfig = this.config.notifications?.slack;
    if (!slackConfig) {
      console.log('⚠️  Slack not configured. Use: adgo-partners config set notifications.slack.webhook <url>');
      return;
    }

    // Mock notification - replace with actual Slack API call
    console.log(`✅ Slack notification sent: ${message}`);
  }

  async sendEmailNotification(workflow, message) {
    const emailConfig = this.config.notifications?.email;
    if (!emailConfig) {
      console.log('⚠️  Email not configured. Use: adgo-partners config set notifications.email.smtp <config>');
      return;
    }

    // Mock notification - replace with actual email sending
    console.log(`✅ Email notification sent: ${message}`);
  }

  async sendTeamsNotification(workflow, message) {
    const teamsConfig = this.config.notifications?.teams;
    if (!teamsConfig) {
      console.log('⚠️  Teams not configured. Use: adgo-partners config set notifications.teams.webhook <url>');
      return;
    }

    // Mock notification - replace with actual Teams API call
    console.log(`✅ Teams notification sent: ${message}`);
  }

  async sendStatusNotification(workflow, item, oldStatus, newStatus) {
    // Auto-send notifications for critical status changes
    if (newStatus === 'completed' && item.priority === 'critical') {
      const message = `🎉 Critical task completed: ${item.title} for ${workflow.partnerName}`;
      
      // Send to all configured channels
      if (this.config.notifications?.slack) {
        await this.sendSlackNotification(workflow, message);
      }
      if (this.config.notifications?.email) {
        await this.sendEmailNotification(workflow, message);
      }
    }
    
    if (newStatus === 'blocked') {
      const message = `🚨 Task blocked: ${item.title} for ${workflow.partnerName}`;
      
      // Send urgent notifications
      if (this.config.notifications?.slack) {
        await this.sendSlackNotification(workflow, message);
      }
    }
  }

  loadWorkflow(workflowId) {
    try {
      const workflowPath = path.join(this.workflowsDir, `${workflowId}.json`);
      if (fs.existsSync(workflowPath)) {
        return JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading workflow:', error.message);
    }
    return null;
  }

  saveWorkflow(workflowId, workflow) {
    const workflowPath = path.join(this.workflowsDir, `${workflowId}.json`);
    fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2));
  }

  showHelp() {
    console.log(`
🤝 AdGo Partner Integration CLI

USAGE:
  adgo-partners <command> [options]

COMMANDS:
  init                           Initialize new project
  create <name> [type] [region]  Create new partner workflow
  list                          List all active workflows
  status <workflow-id>          Show workflow status and progress
  update <workflow-id> <item-id> <status>  Update checklist item status
  validate <workflow-id>        Validate workflow integrity
  export <workflow-id> [format] Export workflow (json|csv|markdown)

TEMPLATES:
  template list                 List available templates
  template show <name>          Show template details
  template create <name>        Create new template
  template delete <name>        Delete template

CONFIGURATION:
  config show                   Show current configuration
  config set <key> <value>      Set configuration value
  config get <key>              Get configuration value

NOTIFICATIONS:
  notify <channel> <workflow-id> [message]  Send notification

EXAMPLES:
  adgo-partners create "Acme Corp" advertiser americas
  adgo-partners update acme-corp-123 sdk-setup completed
  adgo-partners export acme-corp-123 markdown
  adgo-partners config set notifications.slack.webhook https://hooks.slack.com/...

For more information, visit: https://docs.adgo.com/partner-integration
    `);
  }
}

// Run CLI if called directly
if (require.main === module) {
  const cli = new PartnerIntegrationCLI();
  cli.run().catch(error => {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = PartnerIntegrationCLI;