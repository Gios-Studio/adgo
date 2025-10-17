"use strict";
(() => {
  var a = {};
  ((a.id = 2913),
    (a.ids = [636, 2913, 3220]),
    (a.modules = {
      351: (a, b, c) => {
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
              k = c(7197),
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
                  page: "/cookie-policy",
                  pathname: "/cookie-policy",
                  bundlePath: "",
                  filename: "",
                },
                distDir: ".next",
                relativeProjectDir: "",
                components: { App: j.default, Document: i() },
                userland: k,
              }),
              z = (0, l.U)({
                srcPage: "/cookie-policy",
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
      7197: (a, b, c) => {
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
                          children: "Cookie Policy",
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
                                    'AdGo Solutions Limited ("AdGo," "we," "us," or "our") uses cookies and similar tracking technologies on our website and platform. This Cookie Policy explains what cookies are, how we use them, and how you can manage your cookie preferences.',
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "1. What Are Cookies?",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They allow the website to recognize your device and remember information about your visit, such as your preferred settings and other information.",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "Similar technologies include web beacons, pixels, localStorage, and other tracking mechanisms that serve similar purposes.",
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "2. Types of Cookies We Use",
                                }),
                                (0, e.jsxs)("div", {
                                  className: "space-y-6",
                                  children: [
                                    (0, e.jsxs)("div", {
                                      className:
                                        "border-l-4 border-green-500 pl-4",
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "text-lg font-medium text-gray-900 mb-2",
                                          children: "2.1 Necessary Cookies",
                                        }),
                                        (0, e.jsx)("p", {
                                          className: "mb-2",
                                          children:
                                            "These cookies are essential for the website to function properly. They cannot be disabled.",
                                        }),
                                        (0, e.jsxs)("ul", {
                                          className: "list-disc pl-6 space-y-1",
                                          children: [
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Authentication:",
                                                }),
                                                " Keep you logged in during your session",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Security:",
                                                }),
                                                " Protect against cross-site request forgery",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Load Balancing:",
                                                }),
                                                " Distribute traffic across our servers",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children:
                                                    "Session Management:",
                                                }),
                                                " Remember your preferences during your visit",
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      className:
                                        "border-l-4 border-blue-500 pl-4",
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "text-lg font-medium text-gray-900 mb-2",
                                          children: "2.2 Functional Cookies",
                                        }),
                                        (0, e.jsx)("p", {
                                          className: "mb-2",
                                          children:
                                            "These cookies enhance your experience by remembering your choices and preferences.",
                                        }),
                                        (0, e.jsxs)("ul", {
                                          className: "list-disc pl-6 space-y-1",
                                          children: [
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children:
                                                    "Language Settings:",
                                                }),
                                                " Remember your preferred language",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children:
                                                    "Theme Preferences:",
                                                }),
                                                " Save dark/light mode settings",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Dashboard Layout:",
                                                }),
                                                " Remember your customized dashboard",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children:
                                                    "Notification Settings:",
                                                }),
                                                " Store your communication preferences",
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      className:
                                        "border-l-4 border-yellow-500 pl-4",
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "text-lg font-medium text-gray-900 mb-2",
                                          children: "2.3 Analytics Cookies",
                                        }),
                                        (0, e.jsx)("p", {
                                          className: "mb-2",
                                          children:
                                            "These cookies help us understand how visitors use our website so we can improve it.",
                                        }),
                                        (0, e.jsxs)("ul", {
                                          className: "list-disc pl-6 space-y-1",
                                          children: [
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Google Analytics:",
                                                }),
                                                " Track website usage and performance",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Hotjar:",
                                                }),
                                                " Understand user behavior through heatmaps",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Custom Analytics:",
                                                }),
                                                " Monitor platform-specific metrics",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Error Tracking:",
                                                }),
                                                " Identify and fix technical issues",
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      className:
                                        "border-l-4 border-purple-500 pl-4",
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "text-lg font-medium text-gray-900 mb-2",
                                          children: "2.4 Marketing Cookies",
                                        }),
                                        (0, e.jsx)("p", {
                                          className: "mb-2",
                                          children:
                                            "These cookies are used to deliver relevant advertisements and track campaign performance.",
                                        }),
                                        (0, e.jsxs)("ul", {
                                          className: "list-disc pl-6 space-y-1",
                                          children: [
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Facebook Pixel:",
                                                }),
                                                " Track conversions from Facebook ads",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Google Ads:",
                                                }),
                                                " Measure advertising effectiveness",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Retargeting:",
                                                }),
                                                " Show relevant ads to returning visitors",
                                              ],
                                            }),
                                            (0, e.jsxs)("li", {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children:
                                                    "Campaign Attribution:",
                                                }),
                                                " Track which marketing efforts are most effective",
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
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "3. Third-Party Cookies",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "Some cookies on our website are placed by third-party services. These include:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-2",
                                  children: [
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Google Services:",
                                        }),
                                        " Analytics, Ads, Maps, and other Google products",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Social Media:",
                                        }),
                                        " Facebook, Twitter, LinkedIn integration",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Payment Processors:",
                                        }),
                                        " Stripe, PayPal, and mobile money providers",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Support Tools:",
                                        }),
                                        " Customer service chat widgets",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "CDN Services:",
                                        }),
                                        " Content delivery and performance optimization",
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
                                  children: "4. How We Use Cookies",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "We use cookies for the following purposes:",
                                }),
                                (0, e.jsxs)("div", {
                                  className: "space-y-4",
                                  children: [
                                    (0, e.jsxs)("div", {
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "font-medium text-gray-900",
                                          children: "Platform Functionality",
                                        }),
                                        (0, e.jsxs)("ul", {
                                          className: "list-disc pl-6 space-y-1",
                                          children: [
                                            (0, e.jsx)("li", {
                                              children:
                                                "Authenticate users and maintain secure sessions",
                                            }),
                                            (0, e.jsx)("li", {
                                              children:
                                                "Remember user preferences and settings",
                                            }),
                                            (0, e.jsx)("li", {
                                              children:
                                                "Provide personalized dashboard experiences",
                                            }),
                                            (0, e.jsx)("li", {
                                              children:
                                                "Enable shopping cart and payment functionality",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "font-medium text-gray-900",
                                          children: "Performance and Analytics",
                                        }),
                                        (0, e.jsxs)("ul", {
                                          className: "list-disc pl-6 space-y-1",
                                          children: [
                                            (0, e.jsx)("li", {
                                              children:
                                                "Monitor website performance and uptime",
                                            }),
                                            (0, e.jsx)("li", {
                                              children:
                                                "Analyze user behavior and usage patterns",
                                            }),
                                            (0, e.jsx)("li", {
                                              children:
                                                "Identify and resolve technical issues",
                                            }),
                                            (0, e.jsx)("li", {
                                              children:
                                                "Optimize loading speeds and user experience",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "font-medium text-gray-900",
                                          children: "Marketing and Advertising",
                                        }),
                                        (0, e.jsxs)("ul", {
                                          className: "list-disc pl-6 space-y-1",
                                          children: [
                                            (0, e.jsx)("li", {
                                              children:
                                                "Deliver targeted advertising campaigns",
                                            }),
                                            (0, e.jsx)("li", {
                                              children:
                                                "Measure advertising effectiveness and ROI",
                                            }),
                                            (0, e.jsx)("li", {
                                              children:
                                                "Retarget visitors with relevant content",
                                            }),
                                            (0, e.jsx)("li", {
                                              children:
                                                "Track conversion events and attribution",
                                            }),
                                          ],
                                        }),
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
                                  children:
                                    "5. Managing Your Cookie Preferences",
                                }),
                                (0, e.jsx)("h3", {
                                  className:
                                    "text-lg font-medium text-gray-900 mb-2",
                                  children: "5.1 Consent Banner",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "When you first visit our website, you'll see a consent banner allowing you to:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1 mb-4",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children: "Accept all cookies",
                                    }),
                                    (0, e.jsx)("li", {
                                      children: "Reject non-essential cookies",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Customize your preferences by category",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("h3", {
                                  className:
                                    "text-lg font-medium text-gray-900 mb-2",
                                  children: "5.2 Cookie Preference Center",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "You can change your cookie preferences at any time by:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1 mb-4",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children:
                                        'Clicking the "Cookie Settings" link in our footer',
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Visiting your account settings page",
                                    }),
                                    (0, e.jsx)("li", {
                                      children:
                                        "Using the cookie banner if it appears",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("h3", {
                                  className:
                                    "text-lg font-medium text-gray-900 mb-2",
                                  children: "5.3 Browser Settings",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "You can also manage cookies through your browser settings:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1",
                                  children: [
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Chrome:",
                                        }),
                                        " Settings > Privacy and security > Cookies and other site data",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Firefox:",
                                        }),
                                        " Preferences > Privacy & Security > Cookies and Site Data",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Safari:",
                                        }),
                                        " Preferences > Privacy > Manage Website Data",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("strong", {
                                          children: "Edge:",
                                        }),
                                        " Settings > Cookies and site permissions > Cookies and site data",
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
                                  children: "6. Impact of Disabling Cookies",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "Disabling certain types of cookies may affect your experience:",
                                }),
                                (0, e.jsxs)("div", {
                                  className: "space-y-4",
                                  children: [
                                    (0, e.jsxs)("div", {
                                      className:
                                        "bg-red-50 border border-red-200 rounded-lg p-4",
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "font-medium text-red-900 mb-2",
                                          children: "Necessary Cookies",
                                        }),
                                        (0, e.jsx)("p", {
                                          className: "text-red-800 text-sm",
                                          children:
                                            "Disabling these will prevent you from logging in and using core platform features.",
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      className:
                                        "bg-blue-50 border border-blue-200 rounded-lg p-4",
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "font-medium text-blue-900 mb-2",
                                          children: "Functional Cookies",
                                        }),
                                        (0, e.jsx)("p", {
                                          className: "text-blue-800 text-sm",
                                          children:
                                            "You'll need to reconfigure your preferences each time you visit.",
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      className:
                                        "bg-yellow-50 border border-yellow-200 rounded-lg p-4",
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "font-medium text-yellow-900 mb-2",
                                          children: "Analytics Cookies",
                                        }),
                                        (0, e.jsx)("p", {
                                          className: "text-yellow-800 text-sm",
                                          children:
                                            "We won't be able to improve our services based on your usage patterns.",
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      className:
                                        "bg-purple-50 border border-purple-200 rounded-lg p-4",
                                      children: [
                                        (0, e.jsx)("h3", {
                                          className:
                                            "font-medium text-purple-900 mb-2",
                                          children: "Marketing Cookies",
                                        }),
                                        (0, e.jsx)("p", {
                                          className: "text-purple-800 text-sm",
                                          children:
                                            "You may see less relevant advertisements and offers.",
                                        }),
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
                                  children: "7. Cookie Retention Periods",
                                }),
                                (0, e.jsx)("div", {
                                  className: "overflow-x-auto",
                                  children: (0, e.jsxs)("table", {
                                    className:
                                      "min-w-full border border-gray-300",
                                    children: [
                                      (0, e.jsx)("thead", {
                                        className: "bg-gray-50",
                                        children: (0, e.jsxs)("tr", {
                                          children: [
                                            (0, e.jsx)("th", {
                                              className:
                                                "border border-gray-300 px-4 py-2 text-left",
                                              children: "Cookie Type",
                                            }),
                                            (0, e.jsx)("th", {
                                              className:
                                                "border border-gray-300 px-4 py-2 text-left",
                                              children: "Retention Period",
                                            }),
                                            (0, e.jsx)("th", {
                                              className:
                                                "border border-gray-300 px-4 py-2 text-left",
                                              children: "Purpose",
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, e.jsxs)("tbody", {
                                        children: [
                                          (0, e.jsxs)("tr", {
                                            children: [
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2",
                                                children: "Session Cookies",
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2",
                                                children:
                                                  "Until browser closes",
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2",
                                                children:
                                                  "Authentication and session management",
                                              }),
                                            ],
                                          }),
                                          (0, e.jsxs)("tr", {
                                            children: [
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2",
                                                children: "Persistent Cookies",
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2",
                                                children: "30 days - 2 years",
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2",
                                                children:
                                                  "User preferences and analytics",
                                              }),
                                            ],
                                          }),
                                          (0, e.jsxs)("tr", {
                                            children: [
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2",
                                                children: "Advertising Cookies",
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2",
                                                children: "90 days - 1 year",
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2",
                                                children:
                                                  "Campaign tracking and retargeting",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "8. Updates to This Policy",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "We may update this Cookie Policy from time to time to reflect changes in:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "list-disc pl-6 space-y-1",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children: "The cookies we use",
                                    }),
                                    (0, e.jsx)("li", {
                                      children: "Legal requirements",
                                    }),
                                    (0, e.jsx)("li", {
                                      children: "Our business practices",
                                    }),
                                    (0, e.jsx)("li", {
                                      children: "Technology improvements",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("p", {
                                  className: "mt-4",
                                  children:
                                    "We will notify you of significant changes through our consent banner or email notifications.",
                                }),
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "9. Contact Us",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "If you have questions about our use of cookies or this Cookie Policy, please contact us:",
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
                              ],
                            }),
                            (0, e.jsxs)("section", {
                              children: [
                                (0, e.jsx)("h2", {
                                  className:
                                    "text-xl font-semibold text-gray-900 mb-4",
                                  children: "10. Related Policies",
                                }),
                                (0, e.jsx)("p", {
                                  className: "mb-4",
                                  children:
                                    "This Cookie Policy should be read alongside our other policies:",
                                }),
                                (0, e.jsxs)("ul", {
                                  className: "space-y-2",
                                  children: [
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("a", {
                                          href: "/privacy-policy",
                                          className:
                                            "text-blue-600 hover:underline",
                                          children: "Privacy Policy",
                                        }),
                                        " - How we collect and use your personal data",
                                      ],
                                    }),
                                    (0, e.jsxs)("li", {
                                      children: [
                                        (0, e.jsx)("a", {
                                          href: "/terms-of-service",
                                          className:
                                            "text-blue-600 hover:underline",
                                          children: "Terms of Service",
                                        }),
                                        " - Your rights and obligations when using our services",
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
  var c = b.X(0, [2631, 3317, 5781, 4233, 1690, 5790], () => b((b.s = 351)));
  module.exports = c;
})();
