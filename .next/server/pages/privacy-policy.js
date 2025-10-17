"use strict";
(() => {
  var a = {};
  ((a.id = 3947),
    (a.ids = [636, 3220, 3947]),
    (a.modules = {
      361: (a) => {
        a.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
      },
      411: (a) => {
        a.exports = require("@supabase/auth-js");
      },
      2015: (a) => {
        a.exports = require("react");
      },
      2326: (a) => {
        a.exports = require("react-dom");
      },
      2893: (a) => {
        a.exports = import("react-hot-toast");
      },
      2911: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            (c.r(b),
              c.d(b, {
                config: () => r,
                default: () => n,
                getServerSideProps: () => q,
                getStaticPaths: () => p,
                getStaticProps: () => o,
                handler: () => z,
                reportWebVitals: () => s,
                routeModule: () => y,
                unstable_getServerProps: () => w,
                unstable_getServerSideProps: () => x,
                unstable_getStaticParams: () => v,
                unstable_getStaticPaths: () => u,
                unstable_getStaticProps: () => t,
              }));
            var e = c(3885),
              f = c(237),
              g = c(1413),
              h = c(3317),
              i = c.n(h),
              j = c(1690),
              k = c(8783),
              l = c(2289),
              m = a([j, k]);
            [j, k] = m.then ? (await m)() : m;
            let n = (0, g.M)(k, "default"),
              o = (0, g.M)(k, "getStaticProps"),
              p = (0, g.M)(k, "getStaticPaths"),
              q = (0, g.M)(k, "getServerSideProps"),
              r = (0, g.M)(k, "config"),
              s = (0, g.M)(k, "reportWebVitals"),
              t = (0, g.M)(k, "unstable_getStaticProps"),
              u = (0, g.M)(k, "unstable_getStaticPaths"),
              v = (0, g.M)(k, "unstable_getStaticParams"),
              w = (0, g.M)(k, "unstable_getServerProps"),
              x = (0, g.M)(k, "unstable_getServerSideProps"),
              y = new e.PagesRouteModule({
                definition: {
                  kind: f.RouteKind.PAGES,
                  page: "/privacy-policy",
                  pathname: "/privacy-policy",
                  bundlePath: "",
                  filename: "",
                },
                distDir: ".next",
                relativeProjectDir: "",
                components: { App: j.default, Document: i() },
                userland: k,
              }),
              z = (0, l.U)({
                srcPage: "/privacy-policy",
                config: r,
                userland: k,
                routeModule: y,
                getStaticPaths: p,
                getStaticProps: o,
                getServerSideProps: q,
              });
            d();
          } catch (a) {
            d(a);
          }
        });
      },
      3873: (a) => {
        a.exports = require("path");
      },
      4075: (a) => {
        a.exports = require("zlib");
      },
      5750: (a) => {
        a.exports = require("@supabase/node-fetch");
      },
      5912: (a) => {
        a.exports = require("@supabase/storage-js");
      },
      5979: (a) => {
        a.exports = import("tailwind-merge");
      },
      6060: (a) => {
        a.exports = require("next/dist/shared/lib/no-fallback-error.external.js");
      },
      6472: (a) => {
        a.exports = require("@opentelemetry/api");
      },
      7910: (a) => {
        a.exports = require("stream");
      },
      8421: (a) => {
        a.exports = import("clsx");
      },
      8496: (a) => {
        a.exports = require("@supabase/functions-js");
      },
      8732: (a) => {
        a.exports = require("react/jsx-runtime");
      },
      8783: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            (c.r(b), c.d(b, { default: () => i, getStaticProps: () => j }));
            var e = c(8732);
            c(2015);
            var f = c(2250),
              g = c(1117),
              h = a([f]);
            function i() {
              return (0, e.jsxs)("div", {
                className: "min-h-screen bg-gray-50",
                children: [
                  (0, e.jsx)(f.j, {}),
                  (0, e.jsx)("div", {
                    className: "container mx-auto px-4 py-8 max-w-4xl",
                    children: (0, e.jsxs)("div", {
                      className: "bg-white rounded-lg shadow-lg p-8",
                      children: [
                        (0, e.jsx)("h1", {
                          className: "text-3xl font-bold text-gray-900 mb-8",
                          children: "Privacy Policy",
                        }),
                        (0, e.jsxs)("div", {
                          className: "space-y-8 text-gray-700",
                          children: [
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsxs)("p", {
                                  className: "text-sm text-gray-500 mb-4",
                                  children: [
                                    (0, e.jsx)("strong", {
                                      children: "Last Updated:",
                                    }),
                                    " ",
                                    new Date().toLocaleDateString(),
                                  ],
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    'AdGo Solutions Limited ("AdGo," "we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile advertising platform and related services.',
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "This policy complies with the Kenya Data Protection Act 2019 (DPA) and the General Data Protection Regulation (GDPR) where applicable.",
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "1. Information We Collect",
                                }),
                                (0, e.jsx)("h3", {
                                  className:
                                    "text-lg font-medium text-gray-900 mb-2",
                                  children: "1.1 Personal Information",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 mb-4 space-y-1",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children:
                                        "Contact information (name, email, phone number)",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Account credentials and profile information",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Payment and billing information",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Identity verification documents (as required by law)",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("h3", {
                                  className:
                                    "text-lg font-medium text-gray-900 mb-2",
                                  children: "1.2 Technical Information",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 mb-4 space-y-1",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children:
                                        "Device information (IP address, browser type, operating system)",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Usage data (pages visited, time spent, click patterns)",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Location data (with your explicit consent)",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Cookies and tracking technologies",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("h3", {
                                  className:
                                    "text-lg font-medium text-gray-900 mb-2",
                                  children: "1.3 Advertising Data",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 mb-4 space-y-1",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children:
                                        "Ad interaction data (views, clicks, conversions)",
                                    }),
                                    (0, e.jsx)("li", {
                                      children: "Campaign performance metrics",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Audience insights and demographics",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "2. How We Use Your Information",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children:
                                        "Provide and maintain our advertising services",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Process payments and manage accounts",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Personalize and optimize ad delivery",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Analyze platform performance and user behavior",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Communicate with you about our services",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Comply with legal obligations and prevent fraud",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Improve our services and develop new features",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children:
                                    "3. Legal Basis for Processing (GDPR)",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1",
                                  children: [
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Contract:",
                                        }),
                                        " Processing necessary to perform our services",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Consent:",
                                        }),
                                        " Marketing communications and non-essential cookies",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Legitimate Interest:",
                                        }),
                                        " Analytics, security, and service improvement",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Legal Obligation:",
                                        }),
                                        " Compliance with applicable laws",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "4. Information Sharing",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "We may share your information with:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children:
                                        "Service providers and business partners",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Payment processors and financial institutions",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Legal authorities when required by law",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Business successors in case of merger or acquisition",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("p", {
                                  className: "mt-4",
                                  children: (0, e.jsx)("strong", {
                                    children:
                                      "We do not sell your personal data to third parties.",
                                  }),
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "5. Data Storage and Security",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "We implement appropriate technical and organizational measures to protect your data:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children:
                                        "Encryption in transit and at rest",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Access controls and authentication",
                                    }),
                                    (0, e.jsx)("li", {
                                      children: "Regular security assessments",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Staff training on data protection",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("p", {
                                  className: "mt-4",
                                  children:
                                    "Data is stored on secure servers within Kenya and the European Union.",
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "6. Your Rights",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "Under the Kenya DPA and GDPR, you have the right to:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1",
                                  children: [
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Access:",
                                        }),
                                        " Request a copy of your personal data",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Rectification:",
                                        }),
                                        " Correct inaccurate information",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Erasure:",
                                        }),
                                        " Request deletion of your data",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Portability:",
                                        }),
                                        " Transfer your data to another service",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Restriction:",
                                        }),
                                        " Limit how we process your data",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Objection:",
                                        }),
                                        " Object to certain processing activities",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Withdraw Consent:",
                                        }),
                                        " Revoke consent at any time",
                                      ],
                                    }),
                                  ],
                                }),
                                (0, e.jsxs)("p", {
                                  className: "mt-4",
                                  children: [
                                    "To exercise these rights, contact us at ",
                                    (0, e.jsx)("a", {
                                      href: "mailto:privacy@adgosolutions.com",
                                      className:
                                        "text-blue-600 hover:underline",
                                      children: "privacy@adgosolutions.com",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "7. Cookies and Tracking",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "We use cookies and similar technologies to enhance your experience. You can manage cookie preferences through our consent banner or browser settings.",
                                }),
                                (0, e.jsxs)("p", {
                                  className: "mb-4",
                                  children: [
                                    "For detailed information, see our ",
                                    (0, e.jsx)("a", {
                                      href: "/cookie-policy",
                                      className:
                                        "text-blue-600 hover:underline",
                                      children: "Cookie Policy",
                                    }),
                                    ".",
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "8. Data Retention",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "We retain your personal data only as long as necessary for:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children: "Providing our services to you",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Complying with legal obligations",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Resolving disputes and enforcing agreements",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("p", {
                                  className: "mt-4",
                                  children:
                                    "Marketing data is retained for up to 3 years unless you withdraw consent.",
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "9. International Transfers",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "If we transfer your data outside Kenya or the EU, we ensure adequate protection through:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children:
                                        "European Commission adequacy decisions",
                                    }),
                                    (0, e.jsx)("li", {
                                      children: "Standard contractual clauses",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Certification schemes and codes of conduct",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "10. Children's Privacy",
                                }),
                                (0, e.jsx)("p", {
                                  children:
                                    "Our services are not intended for individuals under 18 years old. We do not knowingly collect personal information from minors. If you believe we have collected information from a minor, please contact us immediately.",
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "11. Changes to This Policy",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "We may update this Privacy Policy periodically. We will notify you of significant changes by:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children:
                                        "Email notification to registered users",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Prominent notice on our website",
                                    }),
                                    (0, e.jsx)("li", {
                                      children: "In-app notifications",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "12. Contact Information",
                                }),
                                (0, e.jsxs)("div", {
                                  className: "space-y-2",
                                  children: [
                                    (0, e.jsx)("p", {
                                      children: (0, e.jsx)("strong", {
                                        children: "AdGo Solutions Limited",
                                      }),
                                    }),
                                    (0, e.jsxs)("p", {
                                      children: [
                                        "Email: ",
                                        (0, e.jsx)("a", {
                                          href: "mailto:privacy@adgosolutions.com",
                                          className:
                                            "text-blue-600 hover:underline",
                                          children: "privacy@adgosolutions.com",
                                        }),
                                      ],
                                    }),
                                    (0, e.jsx)("p", {
                                      children: "Phone: +254 700 000 000",
                                    }),
                                    (0, e.jsx)("p", {
                                      children: "Address: Nairobi, Kenya",
                                    }),
                                  ],
                                }),
                                (0, e.jsxs)("div", {
                                  className: "mt-6 space-y-2",
                                  children: [
                                    (0, e.jsx)("p", {
                                      children: (0, e.jsx)("strong", {
                                        children:
                                          "Data Protection Officer (DPO)",
                                      }),
                                    }),
                                    (0, e.jsxs)("p", {
                                      children: [
                                        "Email: ",
                                        (0, e.jsx)("a", {
                                          href: "mailto:dpo@adgosolutions.com",
                                          className:
                                            "text-blue-600 hover:underline",
                                          children: "dpo@adgosolutions.com",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, e.jsxs)("div", {
                                  className: "mt-6 space-y-2",
                                  children: [
                                    (0, e.jsx)("p", {
                                      children: (0, e.jsx)("strong", {
                                        children:
                                          "Supervisory Authority (Kenya)",
                                      }),
                                    }),
                                    (0, e.jsx)("p", {
                                      children:
                                        "Office of the Data Protection Commissioner",
                                    }),
                                    (0, e.jsxs)("p", {
                                      children: [
                                        "Website: ",
                                        (0, e.jsx)("a", {
                                          href: "https://www.odpc.go.ke",
                                          className:
                                            "text-blue-600 hover:underline",
                                          children: "www.odpc.go.ke",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, e.jsx)(g.A, {}),
                ],
              });
            }
            async function j() {
              return { props: {}, revalidate: 86400 };
            }
            ((f = (h.then ? (await h)() : h)[0]), d());
          } catch (a) {
            d(a);
          }
        });
      },
      8938: (a) => {
        a.exports = import("class-variance-authority");
      },
      9021: (a) => {
        a.exports = require("fs");
      },
      9390: (a) => {
        a.exports = require("@supabase/realtime-js");
      },
      9640: (a) => {
        a.exports = import("@radix-ui/react-slot");
      },
      9672: (a) => {
        a.exports = require("@supabase/postgrest-js");
      },
    }));
  var b = require("../webpack-runtime.js");
  b.C(a);
  var c = b.X(0, [2631, 3317, 5781, 4233, 1690, 5790], () => b((b.s = 2911)));
  module.exports = c;
})();
