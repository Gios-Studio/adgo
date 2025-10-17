"use strict";
(() => {
  var a = {};
  ((a.id = 9705),
    (a.ids = [9705]),
    (a.modules = {
      3939: (a) => {
        a.exports = require("@supabase/supabase-js");
      },
      5600: (a) => {
        a.exports = require("next/dist/compiled/next-server/pages-api.runtime.prod.js");
      },
      6472: (a) => {
        a.exports = require("@opentelemetry/api");
      },
      7263: (a, b, c) => {
        (c.r(b),
          c.d(b, { config: () => B, default: () => A, handler: () => D }));
        var d = {};
        (c.r(d), c.d(d, { default: () => l }));
        var e = c(9046),
          f = c(8667),
          g = c(3480),
          h = c(6435),
          i = c(3939);
        let j = (0, i.createClient)(
          "https://rkonwkggxaohpmxmzmfn.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
        );
        (0, i.createClient)(
          "https://rkonwkggxaohpmxmzmfn.supabase.co",
          process.env.SUPABASE_SERVICE_ROLE_KEY,
          { auth: { persistSession: !1 } },
        );
        class k {
          constructor() {
            ((this.templates = new Map()),
              (this.workflows = new Map()),
              this.initializeTemplates(),
              this.setupGlobalAccess());
          }
          static getInstance() {
            return (k.instance || (k.instance = new k()), k.instance);
          }
          setupGlobalAccess() {}
          initializeTemplates() {
            (this.templates.set("technical", [
              {
                id: "tech-001",
                title: "SDK Integration Setup",
                description:
                  "Install and configure AdGo SDK in partner environment",
                category: "technical",
                priority: "critical",
                estimatedTime: "2-4 hours",
                dependencies: [],
                assignee: "partner",
                status: "pending",
                resources: [
                  {
                    type: "documentation",
                    title: "SDK Installation Guide",
                    url: "/docs/sdk/javascript/installation",
                    description: "Complete installation and setup instructions",
                  },
                  {
                    type: "sdk",
                    title: "JavaScript SDK Package",
                    url: "https://www.npmjs.com/package/@adgo/sdk",
                    description: "Official AdGo JavaScript/TypeScript SDK",
                  },
                ],
                validationCriteria: [
                  "SDK successfully installed via npm/yarn",
                  "Basic initialization code functional",
                  "License key authentication working",
                ],
                automationAvailable: !0,
              },
              {
                id: "tech-002",
                title: "API Integration Testing",
                description: "Test core API endpoints and error handling",
                category: "technical",
                priority: "high",
                estimatedTime: "4-6 hours",
                dependencies: ["tech-001"],
                assignee: "partner",
                status: "pending",
                resources: [
                  {
                    type: "api",
                    title: "API Reference",
                    url: "/docs/api/overview",
                    description: "Complete API documentation and examples",
                  },
                  {
                    type: "tool",
                    title: "Postman Collection",
                    description: "Pre-built API testing collection",
                    downloadable: !0,
                  },
                ],
                validationCriteria: [
                  "Successful ad fetch requests",
                  "Proper impression tracking",
                  "Click tracking functional",
                  "Error handling implemented",
                ],
                automationAvailable: !0,
              },
            ]),
              this.templates.set("compliance", [
                {
                  id: "legal-001",
                  title: "Data Processing Agreement",
                  description: "Review and execute data processing agreement",
                  category: "legal",
                  priority: "critical",
                  estimatedTime: "1-2 weeks",
                  dependencies: [],
                  assignee: "adgo-legal",
                  status: "pending",
                  resources: [
                    {
                      type: "template",
                      title: "Standard DPA Template",
                      description:
                        "AdGo standard data processing agreement template",
                    },
                    {
                      type: "contact",
                      title: "Legal Team Contact",
                      description:
                        "Direct contact for legal questions and negotiations",
                    },
                  ],
                  validationCriteria: [
                    "DPA reviewed by partner legal team",
                    "Any amendments negotiated and agreed",
                    "Signed DPA received and filed",
                  ],
                  automationAvailable: !1,
                },
                {
                  id: "legal-002",
                  title: "GDPR Compliance Verification",
                  description: "Ensure GDPR compliance for EU operations",
                  category: "compliance",
                  priority: "high",
                  estimatedTime: "3-5 days",
                  dependencies: ["legal-001"],
                  assignee: "joint",
                  status: "pending",
                  resources: [
                    {
                      type: "documentation",
                      title: "GDPR Compliance Guide",
                      url: "/docs/compliance/gdpr",
                      description:
                        "AdGo GDPR compliance requirements and implementation",
                    },
                  ],
                  validationCriteria: [
                    "Consent management implemented",
                    "Data retention policies configured",
                    "Right to erasure mechanism in place",
                  ],
                  automationAvailable: !0,
                },
              ]),
              this.templates.set("business", [
                {
                  id: "biz-001",
                  title: "Revenue Sharing Agreement",
                  description:
                    "Define revenue sharing terms and payment processes",
                  category: "business",
                  priority: "high",
                  estimatedTime: "1-2 weeks",
                  dependencies: [],
                  assignee: "adgo-business",
                  status: "pending",
                  resources: [
                    {
                      type: "template",
                      title: "Revenue Sharing Template",
                      description:
                        "Standard revenue sharing agreement template",
                    },
                  ],
                  validationCriteria: [
                    "Revenue sharing percentages agreed",
                    "Payment schedule defined",
                    "Reporting requirements specified",
                  ],
                  automationAvailable: !1,
                },
              ]));
          }
          generateWorkflow(a) {
            let b = `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
              c = this.buildCustomChecklist(a),
              d = this.calculateTimeline(a),
              e = this.generateMilestones(a, d),
              f = this.assessRisks(a),
              g = this.defineSuccessCriteria(a),
              h = this.assignContactPoints(a),
              i = {
                id: b,
                partnerProfile: a,
                checklist: c,
                timeline: d,
                milestones: e,
                riskAssessment: f,
                successCriteria: g,
                contactPoints: h,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                completionPercentage: 0,
                estimatedCompletionDate: d.goLive,
              };
            return (
              this.workflows.set(b, i),
              console.log(
                `✅ Generated integration workflow for ${a.name} (${b})`,
              ),
              i
            );
          }
          buildCustomChecklist(a) {
            let b = [];
            return (
              b.push(...this.getTemplate("technical")),
              ("europe" === a.region ||
                a.complianceRequirements.includes("gdpr")) &&
                b.push(...this.getTemplate("compliance")),
              ("advertiser" === a.type || "publisher" === a.type) &&
                b.push(...this.getTemplate("business")),
              ("enterprise" === a.size || "fortune500" === a.size) &&
                b.push(...this.generateSecurityChecklist(a)),
              a.techStack.includes("mobile") &&
                b.push(...this.generateMobileChecklist(a)),
              this.prioritizeAndSequence(b, a)
            );
          }
          generateSecurityChecklist(a) {
            return [
              {
                id: "sec-001",
                title: "Security Review Process",
                description:
                  "Conduct comprehensive security assessment and penetration testing",
                category: "security",
                priority: "critical",
                estimatedTime: "1-2 weeks",
                dependencies: ["tech-002"],
                assignee: "adgo-technical",
                status: "pending",
                resources: [
                  {
                    type: "documentation",
                    title: "Security Requirements",
                    url: "/docs/security/enterprise-requirements",
                    description:
                      "Enterprise security standards and requirements",
                  },
                ],
                validationCriteria: [
                  "Security assessment completed",
                  "Penetration testing passed",
                  "Vulnerability remediation complete",
                ],
                automationAvailable: !0,
              },
            ];
          }
          generateMobileChecklist(a) {
            return [
              {
                id: "mobile-001",
                title: "Mobile SDK Integration",
                description:
                  "Integrate AdGo mobile SDK for iOS and Android applications",
                category: "technical",
                priority: "high",
                estimatedTime: "1-2 days",
                dependencies: ["tech-001"],
                assignee: "partner",
                status: "pending",
                resources: [
                  {
                    type: "sdk",
                    title: "iOS SDK",
                    url: "/docs/sdk/mobile/ios-swift",
                    description: "Native iOS SDK documentation and examples",
                  },
                  {
                    type: "sdk",
                    title: "Android SDK",
                    url: "/docs/sdk/mobile/android-kotlin",
                    description:
                      "Native Android SDK documentation and examples",
                  },
                ],
                validationCriteria: [
                  "iOS SDK integrated and functional",
                  "Android SDK integrated and functional",
                  "Mobile-specific ad formats working",
                ],
                automationAvailable: !1,
              },
            ];
          }
          calculateTimeline(a) {
            let b = this.getBaselineWeeks(a),
              c = new Date(new Date()),
              d = new Date(c.getTime() + 6048e5),
              e = new Date(d.getTime() + 7 * b.technical * 864e5),
              f = new Date(e.getTime() + 7 * b.testing * 864e5),
              g = new Date(f.getTime() + 7 * b.compliance * 864e5),
              h = new Date(g.getTime() + 12096e5);
            return {
              kickoff: c.toISOString().split("T")[0],
              technicalIntegration: d.toISOString().split("T")[0],
              testing: e.toISOString().split("T")[0],
              compliance: f.toISOString().split("T")[0],
              goLive: g.toISOString().split("T")[0],
              postLaunch: h.toISOString().split("T")[0],
            };
          }
          getBaselineWeeks(a) {
            let b = 2,
              c = 1,
              d = 1;
            switch (a.size) {
              case "startup":
              case "small":
                ((b = 1), (c = 0.5), (d = 0.5));
                break;
              case "medium":
                ((b = 2), (c = 1), (d = 1));
                break;
              case "enterprise":
                ((b = 3), (c = 2), (d = 2));
                break;
              case "fortune500":
                ((b = 4), (c = 2), (d = 3));
            }
            return (
              a.techStack.length > 5 && (b += 1),
              a.complianceRequirements.length > 2 && (d += 1),
              "enterprise" === a.expectedVolume && (c += 1),
              { technical: b, testing: c, compliance: d }
            );
          }
          generateMilestones(a, b) {
            return [
              {
                id: "milestone-001",
                title: "Project Kickoff Complete",
                description:
                  "Initial meetings held, requirements gathered, and project plan approved",
                targetDate: b.kickoff,
                status: "upcoming",
                blockers: [],
                completionCriteria: [
                  "Kickoff meeting completed",
                  "Requirements documented and approved",
                  "Contact points established",
                  "Communication channels set up",
                ],
              },
              {
                id: "milestone-002",
                title: "Technical Integration Complete",
                description:
                  "Core SDK integration and API connectivity established",
                targetDate: b.technicalIntegration,
                status: "upcoming",
                blockers: [],
                completionCriteria: [
                  "SDK successfully integrated",
                  "API authentication working",
                  "Basic ad serving functional",
                  "Error handling implemented",
                ],
              },
              {
                id: "milestone-003",
                title: "Testing Phase Complete",
                description:
                  "Comprehensive testing and quality assurance completed",
                targetDate: b.testing,
                status: "upcoming",
                blockers: [],
                completionCriteria: [
                  "Unit tests passing",
                  "Integration tests successful",
                  "Performance benchmarks met",
                  "Security testing completed",
                ],
              },
              {
                id: "milestone-004",
                title: "Compliance Verification Complete",
                description: "All legal and compliance requirements satisfied",
                targetDate: b.compliance,
                status: "upcoming",
                blockers: [],
                completionCriteria: [
                  "Legal agreements executed",
                  "Compliance requirements verified",
                  "Data protection measures implemented",
                  "Regulatory approvals obtained",
                ],
              },
              {
                id: "milestone-005",
                title: "Production Go-Live",
                description:
                  "Partner integration live in production environment",
                targetDate: b.goLive,
                status: "upcoming",
                blockers: [],
                completionCriteria: [
                  "Production deployment successful",
                  "Live traffic flowing",
                  "Monitoring and alerts active",
                  "Success metrics being tracked",
                ],
              },
            ];
          }
          assessRisks(a) {
            let b = "low",
              c = "low",
              d = "low",
              e = "low";
            return (
              a.techStack.length > 5 || a.techStack.includes("legacy")
                ? (b = "high")
                : (a.techStack.includes("mobile") ||
                    a.techStack.includes("embedded")) &&
                  (b = "medium"),
              a.complianceRequirements.length > 3
                ? (c = "high")
                : ("europe" === a.region ||
                    a.complianceRequirements.includes("gdpr")) &&
                  (c = "medium"),
              ("fortune500" === a.size || "enterprise" === a.expectedVolume) &&
                (d = "medium"),
              "critical" === a.priorityLevel && "enterprise" === a.size
                ? (e = "high")
                : "high" === a.priorityLevel && (e = "medium"),
              {
                technical: b,
                compliance: c,
                business: d,
                timeline: e,
                mitigationStrategies: [
                  "Regular check-in meetings and progress reviews",
                  "Dedicated technical support during integration",
                  "Proactive compliance consultation and guidance",
                  "Flexible timeline adjustments based on partner needs",
                  "Escalation procedures for critical blockers",
                ],
              }
            );
          }
          defineSuccessCriteria(a) {
            let b = [
              "Successful ad serving with <100ms response time",
              "Impression and click tracking accuracy >99%",
              "Zero critical security vulnerabilities",
              "Full compliance with applicable regulations",
            ];
            switch (a.expectedVolume) {
              case "high":
              case "enterprise":
                b.push(
                  "Sustained performance under peak load (10K+ requests/min)",
                );
                break;
              case "medium":
                b.push(
                  "Stable performance under normal load (1K+ requests/min)",
                );
            }
            return (
              "publisher" === a.type &&
                b.push("Revenue tracking and reporting accuracy >99.5%"),
              "advertiser" === a.type &&
                b.push("Campaign management and optimization tools functional"),
              b
            );
          }
          assignContactPoints(a) {
            let b = [
              {
                role: "project-manager",
                name: "AdGo Partnership Team",
                email: "partnerships@adgosolutions.com",
                organization: "adgo",
                availability: "Business hours (9 AM - 6 PM local time)",
                responsibilities: [
                  "Overall project coordination and timeline management",
                  "Cross-functional communication and escalation",
                  "Weekly progress reviews and reporting",
                ],
              },
              {
                role: "technical-lead",
                name: "AdGo Engineering Team",
                email: "integration-support@adgosolutions.com",
                organization: "adgo",
                availability:
                  "24/7 for critical issues, business hours for general support",
                responsibilities: [
                  "SDK and API technical support",
                  "Integration architecture guidance",
                  "Performance optimization recommendations",
                ],
              },
            ];
            return (
              ("enterprise" === a.size || "fortune500" === a.size) &&
                b.push({
                  role: "business-lead",
                  name: "Enterprise Account Manager",
                  email: "enterprise@adgosolutions.com",
                  organization: "adgo",
                  availability: "Business hours with emergency escalation",
                  responsibilities: [
                    "Strategic partnership development",
                    "Executive relationship management",
                    "Custom solution architecture",
                  ],
                }),
              a.complianceRequirements.length > 0 &&
                b.push({
                  role: "compliance-officer",
                  name: "AdGo Compliance Team",
                  email: "compliance@adgosolutions.com",
                  organization: "adgo",
                  availability: "Business hours",
                  responsibilities: [
                    "Regulatory compliance guidance",
                    "Data protection consultation",
                    "Legal documentation review",
                  ],
                }),
              b
            );
          }
          updateItemStatus(a, b, c) {
            let d = this.workflows.get(a);
            if (!d) return !1;
            let e = d.checklist.find((a) => a.id === b);
            if (!e) return !1;
            ((e.status = c),
              (e.completedDate =
                "completed" === c ? new Date().toISOString() : void 0));
            let f = d.checklist.filter((a) => "completed" === a.status).length;
            return (
              (d.completionPercentage = (f / d.checklist.length) * 100),
              (d.updatedAt = new Date().toISOString()),
              console.log(
                `📋 Updated ${b} status to ${c} (${d.completionPercentage.toFixed(1)}% complete)`,
              ),
              !0
            );
          }
          exportToPDF(a) {
            let b = this.workflows.get(a);
            if (!b) throw Error("Workflow not found");
            return this.generatePDFContent(b);
          }
          generatePDFContent(a) {
            return `
# AdGo Partner Integration Checklist
**Partner**: ${a.partnerProfile.name}
**Type**: ${a.partnerProfile.type}
**Generated**: ${new Date().toLocaleDateString()}

## Partner Profile
- **Region**: ${a.partnerProfile.region}
- **Size**: ${a.partnerProfile.size}
- **Expected Volume**: ${a.partnerProfile.expectedVolume}
- **Tech Stack**: ${a.partnerProfile.techStack.join(", ")}

## Timeline
- **Kickoff**: ${a.timeline.kickoff}
- **Technical Integration**: ${a.timeline.technicalIntegration}
- **Testing**: ${a.timeline.testing}
- **Compliance**: ${a.timeline.compliance}
- **Go-Live**: ${a.timeline.goLive}

## Checklist Items
${a.checklist
  .map(
    (a) => `
### ${a.title} (${a.status})
- **Category**: ${a.category}
- **Priority**: ${a.priority}
- **Assignee**: ${a.assignee}
- **Estimated Time**: ${a.estimatedTime}
- **Description**: ${a.description}
`,
  )
  .join("\n")}

---
Generated by AdGo Partner Integration System
    `;
          }
          getWorkflow(a) {
            return this.workflows.get(a) || null;
          }
          listActiveWorkflows() {
            return Array.from(this.workflows.values())
              .filter((a) => a.completionPercentage < 100)
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              );
          }
          getTemplate(a) {
            return this.templates.get(a) || [];
          }
          prioritizeAndSequence(a, b) {
            return a.sort((a, b) => {
              let c = { critical: 4, high: 3, medium: 2, low: 1 },
                d = c[b.priority] - c[a.priority];
              return 0 !== d
                ? d
                : 0 === a.dependencies.length && b.dependencies.length > 0
                  ? -1
                  : +(a.dependencies.length > 0 && 0 === b.dependencies.length);
            });
          }
          validateCompliance(a) {
            let b = this.workflows.get(a);
            if (!b) return { valid: !1, issues: ["Workflow not found"] };
            let c = [];
            return (
              b.checklist
                .filter(
                  (a) => "compliance" === a.category || "legal" === a.category,
                )
                .forEach((a) => {
                  "completed" !== a.status &&
                    c.push(`${a.title} is not completed (Status: ${a.status})`);
                }),
              { valid: 0 === c.length, issues: c }
            );
          }
          async runAutomatedChecks(a) {
            let b = this.workflows.get(a);
            if (!b) throw Error("Workflow not found");
            let c = [],
              d = 0,
              e = 0;
            for (let f of b.checklist)
              if (f.automationAvailable)
                try {
                  let b = await this.runAutomatedCheck(f);
                  (c.push(b),
                    b.passed
                      ? (d++, this.updateItemStatus(a, f.id, "completed"))
                      : e++);
                } catch (a) {
                  (e++,
                    c.push({
                      itemId: f.id,
                      passed: !1,
                      error: a instanceof Error ? a.message : "Unknown error",
                    }));
                }
            return { passed: d, failed: e, results: c };
          }
          async runAutomatedCheck(a) {
            await new Promise((a) => setTimeout(a, 1e3 * Math.random()));
            let b = Math.random() > 0.2;
            return {
              itemId: a.id,
              passed: b,
              details: b
                ? "Automated check passed"
                : "Automated check failed - manual review required",
            };
          }
          generateProgressReport(a) {
            let b = this.workflows.get(a);
            if (!b) throw Error("Workflow not found");
            return `
# Integration Progress Report
**Partner**: ${b.partnerProfile.name}
**Report Date**: ${new Date().toLocaleDateString()}
**Overall Progress**: ${b.completionPercentage.toFixed(1)}%

## Status Summary
- **Total Items**: ${b.checklist.length}
- **Completed**: ${b.checklist.filter((a) => "completed" === a.status).length}
- **In Progress**: ${b.checklist.filter((a) => "in-progress" === a.status).length}
- **Pending**: ${b.checklist.filter((a) => "pending" === a.status).length}
- **Blocked**: ${b.checklist.filter((a) => "blocked" === a.status).length}

## Category Breakdown
${["technical", "legal", "business", "compliance", "security"]
  .map((a) => {
    let c = b.checklist.filter((b) => b.category === a),
      d = c.filter((a) => "completed" === a.status).length;
    return `- **${a}**: ${d}/${c.length} (${c.length > 0 ? ((d / c.length) * 100).toFixed(0) : 0}%)`;
  })
  .join("\n")}

## Timeline Status
- **Current Phase**: ${this.getCurrentPhase(b)}
- **Estimated Completion**: ${b.estimatedCompletionDate}
- **Days Remaining**: ${Math.ceil((new Date(b.estimatedCompletionDate).getTime() - Date.now()) / 864e5)}

## Risk Assessment
- **Technical Risk**: ${b.riskAssessment.technical}
- **Compliance Risk**: ${b.riskAssessment.compliance} 
- **Business Risk**: ${b.riskAssessment.business}
- **Timeline Risk**: ${b.riskAssessment.timeline}

## Next Steps
${this.getNextSteps(b).join("\n")}
    `;
          }
          getCurrentPhase(a) {
            let b = new Date().toISOString().split("T")[0];
            return b <= a.timeline.technicalIntegration
              ? "Technical Integration"
              : b <= a.timeline.testing
                ? "Testing"
                : b <= a.timeline.compliance
                  ? "Compliance"
                  : b <= a.timeline.goLive
                    ? "Pre-Launch"
                    : "Post-Launch";
          }
          getNextSteps(a) {
            let b = [];
            return (
              a.checklist
                .filter(
                  (a) => "pending" === a.status || "in-progress" === a.status,
                )
                .slice(0, 5)
                .forEach((a) => {
                  b.push(`- Complete ${a.title} (${a.assignee})`);
                }),
              0 === b.length &&
                b.push("- All checklist items completed! Prepare for go-live."),
              b
            );
          }
          customizeWorkflow(a, b) {
            let c = this.workflows.get(a);
            return (
              !!c &&
              (b.additionalItems && c.checklist.push(...b.additionalItems),
              b.timelineAdjustments &&
                Object.assign(c.timeline, b.timelineAdjustments),
              (c.updatedAt = new Date().toISOString()),
              !0)
            );
          }
          exportToExcel(a) {
            let b = this.workflows.get(a);
            if (!b) throw Error("Workflow not found");
            return this.generateCSVContent(b);
          }
          generateCSVContent(a) {
            return [
              "ID,Title,Category,Priority,Status,Assignee,Estimated Time,Due Date,Completed Date",
              ...a.checklist
                .map((a) => [
                  a.id,
                  `"${a.title}"`,
                  a.category,
                  a.priority,
                  a.status,
                  a.assignee,
                  a.estimatedTime,
                  a.dueDate || "",
                  a.completedDate || "",
                ])
                .map((a) => a.join(",")),
            ].join("\n");
          }
        }
        async function l(a, b) {
          try {
            k.getInstance();
            let { method: c, query: d } = a,
              { workflowId: e, action: f } = d;
            switch (c) {
              case "GET":
                if (e) return await o(a, b, e);
                return await n(a, b);
              case "POST":
                if (e && f) return await q(a, b, e, f);
                if (e) return await p(a, b, e);
                return await m(a, b);
              case "PUT":
                if (e) return await v(a, b, e);
                break;
              case "DELETE":
                if (e) return await w(a, b, e);
                break;
              default:
                return (
                  b.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]),
                  b.status(405).json({ error: "Method not allowed" })
                );
            }
            return b.status(400).json({ error: "Invalid request" });
          } catch (a) {
            return (
              console.error("Partner Integration API Error:", a),
              b
                .status(500)
                .json({
                  error: "Internal server error",
                  message: a instanceof Error ? a.message : "Unknown error",
                })
            );
          }
        }
        async function m(a, b) {
          let { partnerProfile: c } = a.body;
          if (!c)
            return b.status(400).json({ error: "Partner profile is required" });
          try {
            let a = (function (a) {
              let b = [];
              ((a.name && 0 !== a.name.trim().length) ||
                b.push("Partner name is required"),
                a.type || b.push("Partner type is required"),
                a.region || b.push("Partner region is required"),
                a.size || b.push("Partner size is required"));
              let c = [
                "advertiser",
                "publisher",
                "agency",
                "technology",
                "data",
                "analytics",
              ];
              a.type &&
                !c.includes(a.type) &&
                b.push(`Invalid partner type. Valid options: ${c.join(", ")}`);
              let d = [
                "global",
                "americas",
                "europe",
                "africa",
                "asia",
                "middle-east",
              ];
              a.region &&
                !d.includes(a.region) &&
                b.push(`Invalid region. Valid options: ${d.join(", ")}`);
              let e = [
                "startup",
                "small",
                "medium",
                "enterprise",
                "fortune500",
              ];
              return (
                a.size &&
                  !e.includes(a.size) &&
                  b.push(`Invalid size. Valid options: ${e.join(", ")}`),
                { valid: 0 === b.length, issues: b }
              );
            })(c);
            if (!a.valid)
              return b
                .status(400)
                .json({ error: "Invalid partner profile", issues: a.issues });
            let d = k.getInstance().generateWorkflow(c),
              { data: e, error: f } = await j
                .from("partner_workflows")
                .insert({
                  id: d.id,
                  partner_profile: d.partnerProfile,
                  checklist: d.checklist,
                  timeline: d.timeline,
                  milestones: d.milestones,
                  risk_assessment: d.riskAssessment,
                  success_criteria: d.successCriteria,
                  contact_points: d.contactPoints,
                  completion_percentage: d.completionPercentage,
                  estimated_completion_date: d.estimatedCompletionDate,
                  status: "active",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                })
                .select()
                .single();
            if (f)
              return (
                console.error("Database error:", f),
                b.status(500).json({ error: "Failed to create workflow" })
              );
            return (
              await x(d.id, "workflow_created", {
                partnerName: c.name,
                partnerType: c.type,
              }),
              b
                .status(201)
                .json({
                  success: !0,
                  workflow: d,
                  message: `Integration workflow created for ${c.name}`,
                })
            );
          } catch (a) {
            return (
              console.error("Create workflow error:", a),
              b
                .status(500)
                .json({
                  error: "Failed to create workflow",
                  message: a instanceof Error ? a.message : "Unknown error",
                })
            );
          }
        }
        async function n(a, b) {
          try {
            let { status: c = "active", page: d = 1, limit: e = 50 } = a.query,
              f = (parseInt(d) - 1) * parseInt(e),
              g = j
                .from("partner_workflows")
                .select(
                  `
        id,
        partner_profile,
        completion_percentage,
        estimated_completion_date,
        status,
        created_at,
        updated_at
      `,
                )
                .order("updated_at", { ascending: !1 });
            "all" !== c && (g = g.eq("status", c));
            let {
              data: h,
              error: i,
              count: k,
            } = await g.range(f, f + parseInt(e) - 1);
            if (i)
              return (
                console.error("Database error:", i),
                b.status(500).json({ error: "Failed to fetch workflows" })
              );
            return b
              .status(200)
              .json({
                workflows: h || [],
                pagination: {
                  page: parseInt(d),
                  limit: parseInt(e),
                  total: k || 0,
                  totalPages: Math.ceil((k || 0) / parseInt(e)),
                },
              });
          } catch (a) {
            return (
              console.error("List workflows error:", a),
              b
                .status(500)
                .json({
                  error: "Failed to list workflows",
                  message: a instanceof Error ? a.message : "Unknown error",
                })
            );
          }
        }
        async function o(a, b, c) {
          try {
            let { data: a, error: d } = await j
              .from("partner_workflows")
              .select("*")
              .eq("id", c)
              .single();
            if (d || !a)
              return b.status(404).json({ error: "Workflow not found" });
            return b.status(200).json({ workflow: a });
          } catch (a) {
            return (
              console.error("Get workflow error:", a),
              b
                .status(500)
                .json({
                  error: "Failed to get workflow",
                  message: a instanceof Error ? a.message : "Unknown error",
                })
            );
          }
        }
        async function p(a, b, c) {
          let { itemId: d, status: e } = a.body;
          if (!d || !e)
            return b
              .status(400)
              .json({ error: "Item ID and status are required" });
          try {
            let { data: a, error: f } = await j
              .from("partner_workflows")
              .select("*")
              .eq("id", c)
              .single();
            if (f || !a)
              return b.status(404).json({ error: "Workflow not found" });
            let g = k.getInstance();
            if (
              ![
                "pending",
                "in-progress",
                "completed",
                "blocked",
                "skipped",
              ].includes(e)
            )
              return b.status(400).json({ error: "Invalid status" });
            if (!g.updateItemStatus(c, d, e))
              return b
                .status(400)
                .json({ error: "Failed to update item status" });
            let h = g.getWorkflow(c);
            if (!h)
              return b
                .status(500)
                .json({ error: "Failed to retrieve updated workflow" });
            let { error: i } = await j
              .from("partner_workflows")
              .update({
                checklist: h.checklist,
                completion_percentage: h.completionPercentage,
                updated_at: new Date().toISOString(),
              })
              .eq("id", c);
            if (i)
              return (
                console.error("Database update error:", i),
                b
                  .status(500)
                  .json({ error: "Failed to update workflow in database" })
              );
            let l = h.checklist.find((a) => a.id === d);
            return (
              await x(c, "item_status_updated", {
                itemId: d,
                itemTitle: l?.title,
                newStatus: e,
                completionPercentage: h.completionPercentage,
              }),
              b
                .status(200)
                .json({
                  success: !0,
                  workflow: h,
                  message: `Updated ${l?.title} to ${e}`,
                })
            );
          } catch (a) {
            return (
              console.error("Update workflow item error:", a),
              b
                .status(500)
                .json({
                  error: "Failed to update workflow item",
                  message: a instanceof Error ? a.message : "Unknown error",
                })
            );
          }
        }
        async function q(a, b, c, d) {
          let e = k.getInstance();
          try {
            switch (d) {
              case "validate":
                return await r(a, b, c, e);
              case "export":
                return await s(a, b, c, e);
              case "automate":
                return await t(a, b, c, e);
              case "report":
                return await u(a, b, c, e);
              default:
                return b.status(400).json({ error: `Unknown action: ${d}` });
            }
          } catch (a) {
            return (
              console.error(`Workflow action ${d} error:`, a),
              b
                .status(500)
                .json({
                  error: `Failed to execute ${d}`,
                  message: a instanceof Error ? a.message : "Unknown error",
                })
            );
          }
        }
        async function r(a, b, c, d) {
          let e = d.validateCompliance(c);
          return (
            await x(c, "workflow_validated", {
              validationResult: e,
              timestamp: new Date().toISOString(),
            }),
            b
              .status(200)
              .json({
                workflowId: c,
                validation: e,
                message: e.valid
                  ? "Workflow validation passed"
                  : "Workflow validation failed",
              })
          );
        }
        async function s(a, b, c, d) {
          let e,
            f,
            g,
            { format: h = "pdf" } = a.query;
          switch (h) {
            case "pdf":
              ((e = d.exportToPDF(c)),
                (f = "application/pdf"),
                (g = `workflow-${c}.pdf`));
              break;
            case "excel":
              ((e = d.exportToExcel(c)),
                (f = "text/csv"),
                (g = `workflow-${c}.csv`));
              break;
            case "json":
              ((e = JSON.stringify(d.getWorkflow(c), null, 2)),
                (f = "application/json"),
                (g = `workflow-${c}.json`));
              break;
            default:
              return b
                .status(400)
                .json({
                  error: "Invalid export format. Supported: pdf, excel, json",
                });
          }
          return (
            await x(c, "workflow_exported", {
              format: h,
              timestamp: new Date().toISOString(),
            }),
            b.setHeader("Content-Type", f),
            b.setHeader("Content-Disposition", `attachment; filename="${g}"`),
            b.status(200).send(e)
          );
        }
        async function t(a, b, c, d) {
          try {
            let a = await d.runAutomatedChecks(c),
              { error: e } = await j
                .from("partner_workflows")
                .update({ updated_at: new Date().toISOString() })
                .eq("id", c);
            return (
              e && console.error("Database update error:", e),
              await x(c, "automated_checks_run", {
                results: a,
                timestamp: new Date().toISOString(),
              }),
              b
                .status(200)
                .json({
                  workflowId: c,
                  automationResults: a,
                  message: `Automated checks completed: ${a.passed} passed, ${a.failed} failed`,
                })
            );
          } catch (a) {
            return (
              console.error("Automated checks error:", a),
              b
                .status(500)
                .json({
                  error: "Automated checks failed",
                  message: a instanceof Error ? a.message : "Unknown error",
                })
            );
          }
        }
        async function u(a, b, c, d) {
          let e = d.generateProgressReport(c);
          return (
            await x(c, "progress_report_generated", {
              timestamp: new Date().toISOString(),
            }),
            b
              .status(200)
              .json({
                workflowId: c,
                report: e,
                generatedAt: new Date().toISOString(),
              })
          );
        }
        async function v(a, b, c) {
          let { customizations: d } = a.body;
          if (!d)
            return b.status(400).json({ error: "Customizations are required" });
          try {
            let a = k.getInstance();
            if (!a.customizeWorkflow(c, d))
              return b
                .status(404)
                .json({ error: "Workflow not found or update failed" });
            let e = a.getWorkflow(c),
              { error: f } = await j
                .from("partner_workflows")
                .update({
                  checklist: e?.checklist,
                  timeline: e?.timeline,
                  updated_at: new Date().toISOString(),
                })
                .eq("id", c);
            if (f)
              return (
                console.error("Database update error:", f),
                b
                  .status(500)
                  .json({ error: "Failed to update workflow in database" })
              );
            return (
              await x(c, "workflow_customized", {
                customizations: d,
                timestamp: new Date().toISOString(),
              }),
              b
                .status(200)
                .json({
                  success: !0,
                  workflow: e,
                  message: "Workflow updated successfully",
                })
            );
          } catch (a) {
            return (
              console.error("Update workflow error:", a),
              b
                .status(500)
                .json({
                  error: "Failed to update workflow",
                  message: a instanceof Error ? a.message : "Unknown error",
                })
            );
          }
        }
        async function w(a, b, c) {
          try {
            let { error: a } = await j
              .from("partner_workflows")
              .update({
                status: "archived",
                archived_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
              .eq("id", c);
            if (a)
              return (
                console.error("Database update error:", a),
                b.status(500).json({ error: "Failed to archive workflow" })
              );
            return (
              await x(c, "workflow_archived", {
                timestamp: new Date().toISOString(),
              }),
              b
                .status(200)
                .json({
                  success: !0,
                  message: "Workflow archived successfully",
                })
            );
          } catch (a) {
            return (
              console.error("Archive workflow error:", a),
              b
                .status(500)
                .json({
                  error: "Failed to archive workflow",
                  message: a instanceof Error ? a.message : "Unknown error",
                })
            );
          }
        }
        async function x(a, b, c) {
          try {
            await j
              .from("partner_workflow_activities")
              .insert({
                workflow_id: a,
                activity_type: b,
                metadata: c,
                created_at: new Date().toISOString(),
              });
          } catch (a) {
            console.error("Activity logging error:", a);
          }
        }
        k.getInstance();
        var y = c(8112),
          z = c(6385);
        let A = (0, h.M)(d, "default"),
          B = (0, h.M)(d, "config"),
          C = new g.PagesAPIRouteModule({
            definition: {
              kind: f.A.PAGES_API,
              page: "/api/partners/workflows",
              pathname: "/api/partners/workflows",
              bundlePath: "",
              filename: "",
            },
            userland: d,
            distDir: ".next",
            relativeProjectDir: "",
          });
        async function D(a, b, c) {
          let d = await C.prepare(a, b, { srcPage: "/api/partners/workflows" });
          if (!d) {
            ((b.statusCode = 400),
              b.end("Bad Request"),
              null == c.waitUntil || c.waitUntil.call(c, Promise.resolve()));
            return;
          }
          let {
            query: f,
            params: g,
            prerenderManifest: h,
            routerServerContext: i,
          } = d;
          try {
            let c = a.method || "GET",
              d = (0, y.getTracer)(),
              e = d.getActiveScopeSpan(),
              j = C.instrumentationOnRequestError.bind(C),
              k = async (e) =>
                C.render(a, b, {
                  query: { ...f, ...g },
                  params: g,
                  allowedRevalidateHeaderKeys: [],
                  multiZoneDraftMode: !1,
                  trustHostHeader: !1,
                  previewProps: h.preview,
                  propagateError: !1,
                  dev: C.isDev,
                  page: "/api/partners/workflows",
                  internalRevalidate: null == i ? void 0 : i.revalidate,
                  onError: (...b) => j(a, ...b),
                }).finally(() => {
                  if (!e) return;
                  e.setAttributes({
                    "http.status_code": b.statusCode,
                    "next.rsc": !1,
                  });
                  let f = d.getRootSpanAttributes();
                  if (!f) return;
                  if (
                    f.get("next.span_type") !== z.BaseServerSpan.handleRequest
                  )
                    return void console.warn(
                      `Unexpected root span type '${f.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`,
                    );
                  let g = f.get("next.route");
                  if (g) {
                    let a = `${c} ${g}`;
                    (e.setAttributes({
                      "next.route": g,
                      "http.route": g,
                      "next.span_name": a,
                    }),
                      e.updateName(a));
                  } else e.updateName(`${c} ${a.url}`);
                });
            e
              ? await k(e)
              : await d.withPropagatedContext(a.headers, () =>
                  d.trace(
                    z.BaseServerSpan.handleRequest,
                    {
                      spanName: `${c} ${a.url}`,
                      kind: y.SpanKind.SERVER,
                      attributes: { "http.method": c, "http.target": a.url },
                    },
                    k,
                  ),
                );
          } catch (a) {
            if (C.isDev) throw a;
            (0, e.sendError)(b, 500, "Internal Server Error");
          } finally {
            null == c.waitUntil || c.waitUntil.call(c, Promise.resolve());
          }
        }
      },
    }));
  var b = require("../../../webpack-api-runtime.js");
  b.C(a);
  var c = b.X(0, [7169], () => b((b.s = 7263)));
  module.exports = c;
})();
