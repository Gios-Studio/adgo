/**
 * AdGo Platform - Partner Integration Dashboard
 * Real-time dashboard for managing partner onboarding workflows
 */

import React, { useState, useEffect } from 'react';
import { 
  PartnerIntegrationGenerator, 
  PartnerProfile, 
  IntegrationWorkflow,
  ChecklistItem 
} from '../utils/partner-integration';

interface DashboardProps {
  className?: string;
}

export function PartnerIntegrationDashboard({ className = '' }: DashboardProps) {
  const [activeWorkflows, setActiveWorkflows] = useState<IntegrationWorkflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [showNewPartnerForm, setShowNewPartnerForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generator = PartnerIntegrationGenerator.getInstance();

  useEffect(() => {
    refreshWorkflows();
  }, []);

  const refreshWorkflows = () => {
    const workflows = generator.listActiveWorkflows();
    setActiveWorkflows(workflows);
  };

  const handleCreateWorkflow = (profile: PartnerProfile) => {
    const workflow = generator.generateWorkflow(profile);
    setActiveWorkflows([workflow, ...activeWorkflows]);
    setSelectedWorkflow(workflow.id);
    setShowNewPartnerForm(false);
  };

  const handleUpdateStatus = (workflowId: string, itemId: string, status: ChecklistItem['status']) => {
    generator.updateItemStatus(workflowId, itemId, status);
    refreshWorkflows();
  };

  const handleExportPDF = (workflowId: string) => {
    try {
      generator.exportToPDF(workflowId);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleRunAutomatedChecks = async (workflowId: string) => {
    setIsLoading(true);
    try {
      const results = await generator.runAutomatedChecks(workflowId);
      alert(`Automated checks completed: ${results.passed} passed, ${results.failed} failed`);
      refreshWorkflows();
    } catch (error) {
      console.error('Automated checks failed:', error);
      alert('Automated checks failed. Please check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedWorkflowData = selectedWorkflow 
    ? activeWorkflows.find(w => w.id === selectedWorkflow)
    : null;

  return (
    <div className={`partner-integration-dashboard ${className}`}>
      <div className="dashboard-header">
        <h1>Partner Integration Dashboard</h1>
        <div className="dashboard-actions">
          <button 
            onClick={() => setShowNewPartnerForm(true)}
            className="btn btn-primary"
          >
            + New Partner Integration
          </button>
          <button onClick={refreshWorkflows} className="btn btn-secondary">
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Workflow List */}
        <div className="workflows-sidebar">
          <h3>Active Integrations ({activeWorkflows.length})</h3>
          <div className="workflow-list">
            {activeWorkflows.map(workflow => (
              <WorkflowCard
                key={workflow.id}
                workflow={workflow}
                isSelected={selectedWorkflow === workflow.id}
                onClick={() => setSelectedWorkflow(workflow.id)}
              />
            ))}
            {activeWorkflows.length === 0 && (
              <div className="empty-state">
                <p>No active integrations</p>
                <button 
                  onClick={() => setShowNewPartnerForm(true)}
                  className="btn btn-link"
                >
                  Create your first integration
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Workflow Details */}
        <div className="workflow-details">
          {selectedWorkflowData ? (
            <WorkflowDetails
              workflow={selectedWorkflowData}
              onUpdateStatus={handleUpdateStatus}
              onExportPDF={handleExportPDF}
              onRunAutomatedChecks={handleRunAutomatedChecks}
              isLoading={isLoading}
            />
          ) : (
            <div className="no-selection">
              <h3>Select an integration to view details</h3>
              <p>Choose from the list on the left to see the complete workflow, timeline, and checklist.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Partner Form Modal */}
      {showNewPartnerForm && (
        <NewPartnerModal
          onClose={() => setShowNewPartnerForm(false)}
          onSubmit={handleCreateWorkflow}
        />
      )}

      <style jsx>{`
        .partner-integration-dashboard {
          min-height: 100vh;
          background: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .dashboard-header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-header h1 {
          margin: 0;
          color: #1a202c;
          font-size: 1.875rem;
          font-weight: 600;
        }

        .dashboard-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #3182ce;
          color: white;
          border-color: #3182ce;
        }

        .btn-primary:hover {
          background: #2c5aa0;
          border-color: #2c5aa0;
        }

        .btn-secondary {
          background: #718096;
          color: white;
          border-color: #718096;
        }

        .btn-secondary:hover {
          background: #4a5568;
          border-color: #4a5568;
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 350px 1fr;
          min-height: calc(100vh - 120px);
        }

        .workflows-sidebar {
          background: white;
          border-right: 1px solid #e2e8f0;
          padding: 1.5rem;
        }

        .workflows-sidebar h3 {
          margin: 0 0 1rem 0;
          color: #2d3748;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .workflow-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .empty-state {
          text-align: center;
          padding: 2rem 0;
          color: #718096;
        }

        .no-selection {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          text-align: center;
          color: #718096;
        }

        .workflow-details {
          padding: 1.5rem 2rem;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }
          
          .workflows-sidebar {
            border-right: none;
            border-bottom: 1px solid #e2e8f0;
          }
        }
      `}</style>
    </div>
  );
}

interface WorkflowCardProps {
  workflow: IntegrationWorkflow;
  isSelected: boolean;
  onClick: () => void;
}

function WorkflowCard({ workflow, isSelected, onClick }: WorkflowCardProps) {
  const getStatusColor = (percentage: number) => {
    if (percentage >= 80) return '#48bb78';
    if (percentage >= 50) return '#ed8936';
    return '#e53e3e';
  };

  return (
    <div 
      className={`workflow-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="workflow-header">
        <h4>{workflow.partnerProfile.name}</h4>
        <span className="workflow-type">{workflow.partnerProfile.type}</span>
      </div>
      
      <div className="workflow-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${workflow.completionPercentage}%`,
              backgroundColor: getStatusColor(workflow.completionPercentage)
            }}
          />
        </div>
        <span className="progress-text">
          {workflow.completionPercentage.toFixed(0)}% Complete
        </span>
      </div>

      <div className="workflow-meta">
        <div className="meta-item">
          <span className="meta-label">Region:</span>
          <span className="meta-value">{workflow.partnerProfile.region}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Target:</span>
          <span className="meta-value">{workflow.timeline.goLive}</span>
        </div>
      </div>

      <style jsx>{`
        .workflow-card {
          padding: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
          background: white;
        }

        .workflow-card:hover {
          border-color: #cbd5e0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .workflow-card.selected {
          border-color: #3182ce;
          box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
        }

        .workflow-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .workflow-header h4 {
          margin: 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: #2d3748;
        }

        .workflow-type {
          background: #edf2f7;
          color: #4a5568;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .workflow-progress {
          margin-bottom: 0.75rem;
        }

        .progress-bar {
          width: 100%;
          height: 0.5rem;
          background: #edf2f7;
          border-radius: 0.25rem;
          overflow: hidden;
          margin-bottom: 0.25rem;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.75rem;
          color: #718096;
          font-weight: 500;
        }

        .workflow-meta {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .meta-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
        }

        .meta-label {
          color: #718096;
        }

        .meta-value {
          color: #2d3748;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

interface WorkflowDetailsProps {
  workflow: IntegrationWorkflow;
  onUpdateStatus: (workflowId: string, itemId: string, status: ChecklistItem['status']) => void;
  onExportPDF: (workflowId: string) => void;
  onRunAutomatedChecks: (workflowId: string) => void;
  isLoading: boolean;
}

function WorkflowDetails({ 
  workflow, 
  onUpdateStatus, 
  onExportPDF, 
  onRunAutomatedChecks,
  isLoading 
}: WorkflowDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'timeline' | 'contacts'>('overview');

  return (
    <div className="workflow-details-container">
      <div className="workflow-header">
        <div>
          <h2>{workflow.partnerProfile.name}</h2>
          <p className="subtitle">{workflow.partnerProfile.type} • {workflow.partnerProfile.region}</p>
        </div>
        
        <div className="workflow-actions">
          <button 
            onClick={() => onRunAutomatedChecks(workflow.id)}
            disabled={isLoading}
            className="btn btn-secondary"
          >
            {isLoading ? '⏳ Running...' : '🤖 Run Auto Checks'}
          </button>
          <button 
            onClick={() => onExportPDF(workflow.id)}
            className="btn btn-secondary"
          >
            📄 Export PDF
          </button>
        </div>
      </div>

      <div className="workflow-tabs">
        {(['overview', 'checklist', 'timeline', 'contacts'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && <OverviewTab workflow={workflow} />}
        {activeTab === 'checklist' && (
          <ChecklistTab 
            workflow={workflow} 
            onUpdateStatus={onUpdateStatus}
          />
        )}
        {activeTab === 'timeline' && <TimelineTab workflow={workflow} />}
        {activeTab === 'contacts' && <ContactsTab workflow={workflow} />}
      </div>

      <style jsx>{`
        .workflow-details-container {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .workflow-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .workflow-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
        }

        .subtitle {
          margin: 0.25rem 0 0 0;
          color: #718096;
          font-size: 0.875rem;
        }

        .workflow-actions {
          display: flex;
          gap: 0.75rem;
        }

        .workflow-tabs {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 1.5rem;
        }

        .tab {
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #718096;
          font-weight: 500;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .tab:hover {
          color: #4a5568;
        }

        .tab.active {
          color: #3182ce;
          border-bottom-color: #3182ce;
        }

        .tab-content {
          flex: 1;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}

function OverviewTab({ workflow }: { workflow: IntegrationWorkflow }) {
  const completedItems = workflow.checklist.filter(item => item.status === 'completed').length;
  const inProgressItems = workflow.checklist.filter(item => item.status === 'in-progress').length;
  const blockedItems = workflow.checklist.filter(item => item.status === 'blocked').length;

  return (
    <div className="overview-tab">
      {/* Progress Summary */}
      <div className="section">
        <h3>Progress Summary</h3>
        <div className="progress-grid">
          <div className="progress-stat">
            <div className="stat-number">{workflow.completionPercentage.toFixed(0)}%</div>
            <div className="stat-label">Complete</div>
          </div>
          <div className="progress-stat">
            <div className="stat-number">{completedItems}/{workflow.checklist.length}</div>
            <div className="stat-label">Tasks Done</div>
          </div>
          <div className="progress-stat">
            <div className="stat-number">{inProgressItems}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="progress-stat">
            <div className="stat-number">{blockedItems}</div>
            <div className="stat-label">Blocked</div>
          </div>
        </div>
      </div>

      {/* Partner Profile */}
      <div className="section">
        <h3>Partner Profile</h3>
        <div className="profile-grid">
          <div className="profile-item">
            <span className="label">Size:</span>
            <span className="value">{workflow.partnerProfile.size}</span>
          </div>
          <div className="profile-item">
            <span className="label">Expected Volume:</span>
            <span className="value">{workflow.partnerProfile.expectedVolume}</span>
          </div>
          <div className="profile-item">
            <span className="label">Priority:</span>
            <span className="value">{workflow.partnerProfile.priorityLevel}</span>
          </div>
          <div className="profile-item">
            <span className="label">Tech Stack:</span>
            <span className="value">{workflow.partnerProfile.techStack.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="section">
        <h3>Risk Assessment</h3>
        <div className="risk-grid">
          <div className="risk-item">
            <span className="risk-label">Technical</span>
            <span className={`risk-badge risk-${workflow.riskAssessment.technical}`}>
              {workflow.riskAssessment.technical}
            </span>
          </div>
          <div className="risk-item">
            <span className="risk-label">Compliance</span>
            <span className={`risk-badge risk-${workflow.riskAssessment.compliance}`}>
              {workflow.riskAssessment.compliance}
            </span>
          </div>
          <div className="risk-item">
            <span className="risk-label">Business</span>
            <span className={`risk-badge risk-${workflow.riskAssessment.business}`}>
              {workflow.riskAssessment.business}
            </span>
          </div>
          <div className="risk-item">
            <span className="risk-label">Timeline</span>
            <span className={`risk-badge risk-${workflow.riskAssessment.timeline}`}>
              {workflow.riskAssessment.timeline}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overview-tab {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .section h3 {
          margin: 0 0 1rem 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #2d3748;
        }

        .progress-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }

        .progress-stat {
          text-align: center;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 0.5rem;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #718096;
          margin-top: 0.25rem;
        }

        .profile-grid {
          display: grid;
          gap: 0.75rem;
        }

        .profile-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #f7fafc;
          border-radius: 0.375rem;
        }

        .label {
          font-weight: 500;
          color: #4a5568;
        }

        .value {
          color: #2d3748;
        }

        .risk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .risk-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #f7fafc;
          border-radius: 0.375rem;
        }

        .risk-label {
          font-weight: 500;
          color: #4a5568;
        }

        .risk-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .risk-low {
          background: #c6f6d5;
          color: #2f855a;
        }

        .risk-medium {
          background: #feebc8;
          color: #c05621;
        }

        .risk-high {
          background: #fed7d7;
          color: #c53030;
        }
      `}</style>
    </div>
  );
}

function ChecklistTab({ 
  workflow, 
  onUpdateStatus 
}: { 
  workflow: IntegrationWorkflow;
  onUpdateStatus: (workflowId: string, itemId: string, status: ChecklistItem['status']) => void;
}) {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(workflow.checklist.map(item => item.category)))];
  const statuses = ['all', 'pending', 'in-progress', 'completed', 'blocked'];

  const filteredItems = workflow.checklist.filter(item => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="checklist-tab">
      <div className="filters">
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="filter-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="checklist-items">
        {filteredItems.map(item => (
          <ChecklistItemCard
            key={item.id}
            item={item}
            onUpdateStatus={(status) => onUpdateStatus(workflow.id, item.id, status)}
          />
        ))}
      </div>

      <style jsx>{`
        .checklist-tab {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .filters {
          display: flex;
          gap: 1rem;
        }

        .filter-select {
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          background: white;
          color: #2d3748;
        }

        .checklist-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}

function ChecklistItemCard({ 
  item, 
  onUpdateStatus 
}: { 
  item: ChecklistItem;
  onUpdateStatus: (status: ChecklistItem['status']) => void;
}) {
  const getStatusColor = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed': return '#48bb78';
      case 'in-progress': return '#ed8936';
      case 'blocked': return '#e53e3e';
      default: return '#718096';
    }
  };

  const getPriorityColor = (priority: ChecklistItem['priority']) => {
    switch (priority) {
      case 'critical': return '#e53e3e';
      case 'high': return '#ed8936';
      case 'medium': return '#3182ce';
      default: return '#718096';
    }
  };

  return (
    <div className="checklist-item-card">
      <div className="item-header">
        <div className="item-title-section">
          <h4>{item.title}</h4>
          <div className="item-badges">
            <span 
              className="badge category-badge"
              style={{ backgroundColor: '#edf2f7', color: '#4a5568' }}
            >
              {item.category}
            </span>
            <span 
              className="badge priority-badge"
              style={{ backgroundColor: getPriorityColor(item.priority) + '20', color: getPriorityColor(item.priority) }}
            >
              {item.priority}
            </span>
            <span 
              className="badge status-badge"
              style={{ backgroundColor: getStatusColor(item.status) + '20', color: getStatusColor(item.status) }}
            >
              {item.status}
            </span>
          </div>
        </div>

        <select
          value={item.status}
          onChange={(e) => onUpdateStatus(e.target.value as ChecklistItem['status'])}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <p className="item-description">{item.description}</p>

      <div className="item-meta">
        <div className="meta-row">
          <span className="meta-label">Assignee:</span>
          <span className="meta-value">{item.assignee}</span>
        </div>
        <div className="meta-row">
          <span className="meta-label">Estimated Time:</span>
          <span className="meta-value">{item.estimatedTime}</span>
        </div>
        {item.dependencies.length > 0 && (
          <div className="meta-row">
            <span className="meta-label">Dependencies:</span>
            <span className="meta-value">{item.dependencies.join(', ')}</span>
          </div>
        )}
      </div>

      {item.resources.length > 0 && (
        <div className="item-resources">
          <h5>Resources:</h5>
          <ul>
            {item.resources.map((resource, index) => (
              <li key={index}>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.title}
                </a>
                <span className="resource-type">({resource.type})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style jsx>{`
        .checklist-item-card {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 1.5rem;
          background: white;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .item-title-section {
          flex: 1;
        }

        .item-header h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #2d3748;
        }

        .item-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .badge {
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-select {
          padding: 0.375rem 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          background: white;
          color: #2d3748;
          font-size: 0.875rem;
        }

        .item-description {
          color: #4a5568;
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }

        .item-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .meta-label {
          font-weight: 500;
          color: #718096;
        }

        .meta-value {
          color: #2d3748;
        }

        .item-resources h5 {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: #2d3748;
        }

        .item-resources ul {
          margin: 0;
          padding-left: 1rem;
        }

        .item-resources li {
          margin-bottom: 0.25rem;
          font-size: 0.875rem;
        }

        .item-resources a {
          color: #3182ce;
          text-decoration: none;
        }

        .item-resources a:hover {
          text-decoration: underline;
        }

        .resource-type {
          color: #718096;
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
}

function TimelineTab({ workflow }: { workflow: IntegrationWorkflow }) {
  return (
    <div className="timeline-tab">
      <div className="timeline">
        {workflow.milestones.map((milestone, index) => (
          <div key={milestone.id} className={`milestone ${milestone.status}`}>
            <div className="milestone-marker">
              <div className="milestone-dot" />
              {index < workflow.milestones.length - 1 && <div className="milestone-line" />}
            </div>
            <div className="milestone-content">
              <h4>{milestone.title}</h4>
              <p className="milestone-date">{milestone.targetDate}</p>
              <p className="milestone-description">{milestone.description}</p>
              {milestone.completionCriteria.length > 0 && (
                <div className="completion-criteria">
                  <h5>Completion Criteria:</h5>
                  <ul>
                    {milestone.completionCriteria.map((criteria, index) => (
                      <li key={index}>{criteria}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .timeline-tab {
          padding: 1rem 0;
        }

        .timeline {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .milestone {
          display: flex;
          gap: 1rem;
        }

        .milestone-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }

        .milestone-dot {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: #e2e8f0;
          border: 3px solid #cbd5e0;
        }

        .milestone.completed .milestone-dot {
          background: #48bb78;
          border-color: #48bb78;
        }

        .milestone.in-progress .milestone-dot {
          background: #ed8936;
          border-color: #ed8936;
        }

        .milestone-line {
          width: 2px;
          height: 2rem;
          background: #e2e8f0;
          margin-top: 0.5rem;
        }

        .milestone-content {
          flex: 1;
        }

        .milestone-content h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #2d3748;
        }

        .milestone-date {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
          color: #718096;
          font-weight: 500;
        }

        .milestone-description {
          margin: 0 0 1rem 0;
          color: #4a5568;
          line-height: 1.5;
        }

        .completion-criteria h5 {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: #2d3748;
        }

        .completion-criteria ul {
          margin: 0;
          padding-left: 1rem;
        }

        .completion-criteria li {
          margin-bottom: 0.25rem;
          font-size: 0.875rem;
          color: #4a5568;
        }
      `}</style>
    </div>
  );
}

function ContactsTab({ workflow }: { workflow: IntegrationWorkflow }) {
  return (
    <div className="contacts-tab">
      <div className="contacts-grid">
        {workflow.contactPoints.map((contact, index) => (
          <div key={index} className="contact-card">
            <div className="contact-header">
              <h4>{contact.name}</h4>
              <span className="contact-role">{contact.role}</span>
            </div>
            
            <div className="contact-info">
              <div className="info-item">
                <span className="info-label">Email:</span>
                <a href={`mailto:${contact.email}`} className="info-value">
                  {contact.email}
                </a>
              </div>
              <div className="info-item">
                <span className="info-label">Organization:</span>
                <span className="info-value">{contact.organization}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Availability:</span>
                <span className="info-value">{contact.availability}</span>
              </div>
            </div>

            <div className="responsibilities">
              <h5>Responsibilities:</h5>
              <ul>
                {contact.responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .contacts-tab {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contacts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .contact-card {
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 1.5rem;
          background: white;
        }

        .contact-header {
          margin-bottom: 1rem;
        }

        .contact-header h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #2d3748;
        }

        .contact-role {
          background: #edf2f7;
          color: #4a5568;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
        }

        .info-label {
          font-weight: 500;
          color: #718096;
        }

        .info-value {
          color: #2d3748;
          text-decoration: none;
        }

        .info-value:hover {
          text-decoration: underline;
        }

        .responsibilities h5 {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: #2d3748;
        }

        .responsibilities ul {
          margin: 0;
          padding-left: 1rem;
        }

        .responsibilities li {
          margin-bottom: 0.25rem;
          font-size: 0.875rem;
          color: #4a5568;
        }
      `}</style>
    </div>
  );
}

function NewPartnerModal({ 
  onClose, 
  onSubmit 
}: { 
  onClose: () => void;
  onSubmit: (profile: PartnerProfile) => void;
}) {
  const [formData, setFormData] = useState<Partial<PartnerProfile>>({
    name: '',
    type: 'advertiser',
    region: 'global',
    size: 'medium',
    techStack: [],
    complianceRequirements: [],
    expectedVolume: 'medium',
    priorityLevel: 'standard'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert('Partner name is required');
      return;
    }

    const profile: PartnerProfile = {
      id: `partner_${Date.now()}`,
      name: formData.name,
      type: formData.type as PartnerProfile['type'],
      region: formData.region as PartnerProfile['region'],
      size: formData.size as PartnerProfile['size'],
      techStack: formData.techStack || [],
      complianceRequirements: formData.complianceRequirements || [],
      expectedVolume: formData.expectedVolume as PartnerProfile['expectedVolume'],
      priorityLevel: formData.priorityLevel as PartnerProfile['priorityLevel']
    };

    onSubmit(profile);
  };

  const handleTechStackChange = (tech: string) => {
    const current = formData.techStack || [];
    const updated = current.includes(tech)
      ? current.filter(t => t !== tech)
      : [...current, tech];
    setFormData({ ...formData, techStack: updated });
  };

  const handleComplianceChange = (requirement: string) => {
    const current = formData.complianceRequirements || [];
    const updated = current.includes(requirement)
      ? current.filter(r => r !== requirement)
      : [...current, requirement];
    setFormData({ ...formData, complianceRequirements: updated });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create New Partner Integration</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <form onSubmit={handleSubmit} className="partner-form">
          <div className="form-group">
            <label>Partner Name *</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter partner name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as PartnerProfile['type'] })}
              >
                <option value="advertiser">Advertiser</option>
                <option value="publisher">Publisher</option>
                <option value="agency">Agency</option>
                <option value="technology">Technology</option>
                <option value="data">Data</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>

            <div className="form-group">
              <label>Region</label>
              <select
                value={formData.region}
                onChange={e => setFormData({ ...formData, region: e.target.value as PartnerProfile['region'] })}
              >
                <option value="global">Global</option>
                <option value="americas">Americas</option>
                <option value="europe">Europe</option>
                <option value="africa">Africa</option>
                <option value="asia">Asia</option>
                <option value="middle-east">Middle East</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Company Size</label>
              <select
                value={formData.size}
                onChange={e => setFormData({ ...formData, size: e.target.value as PartnerProfile['size'] })}
              >
                <option value="startup">Startup</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="enterprise">Enterprise</option>
                <option value="fortune500">Fortune 500</option>
              </select>
            </div>

            <div className="form-group">
              <label>Expected Volume</label>
              <select
                value={formData.expectedVolume}
                onChange={e => setFormData({ ...formData, expectedVolume: e.target.value as PartnerProfile['expectedVolume'] })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority Level</label>
              <select
                value={formData.priorityLevel}
                onChange={e => setFormData({ ...formData, priorityLevel: e.target.value as PartnerProfile['priorityLevel'] })}
              >
                <option value="standard">Standard</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Technology Stack</label>
            <div className="checkbox-grid">
              {['web', 'mobile', 'ios', 'android', 'react', 'angular', 'vue', 'node.js', 'python', 'java', 'php', 'legacy'].map(tech => (
                <label key={tech} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={(formData.techStack || []).includes(tech)}
                    onChange={() => handleTechStackChange(tech)}
                  />
                  {tech}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Compliance Requirements</label>
            <div className="checkbox-grid">
              {['gdpr', 'ccpa', 'coppa', 'hipaa', 'sox', 'pci-dss', 'iso27001'].map(requirement => (
                <label key={requirement} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={(formData.complianceRequirements || []).includes(requirement)}
                    onChange={() => handleComplianceChange(requirement)}
                  />
                  {requirement.toUpperCase()}
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Integration Workflow
            </button>
          </div>
        </form>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .modal-content {
            background: white;
            border-radius: 0.5rem;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e2e8f0;
          }

          .modal-header h3 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: #2d3748;
          }

          .close-button {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #718096;
            padding: 0;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .partner-form {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }

          .form-group label {
            font-weight: 500;
            color: #2d3748;
            font-size: 0.875rem;
          }

          .form-group input,
          .form-group select {
            padding: 0.5rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.375rem;
            font-size: 0.875rem;
          }

          .checkbox-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.5rem;
          }

          .checkbox-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            cursor: pointer;
          }

          .checkbox-item input {
            margin: 0;
          }

          .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #e2e8f0;
          }
        `}</style>
      </div>
    </div>
  );
}