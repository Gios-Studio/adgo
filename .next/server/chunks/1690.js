((exports.id = 1690),
  (exports.ids = [1690]),
  (exports.modules = {
    979: () => {},
    1690: (a, b, c) => {
      "use strict";
      c.a(a, async (a, d) => {
        try {
          (c.r(b), c.d(b, { default: () => m }));
          var e = c(8732);
          c(979);
          var f = c(2893),
            g = c(8075),
            h = c(9060),
            i = c(9525);
          (c(1881), c(2015));
          var j = a([f]);
          function k() {
            let { showConsentModal: a } = (0, i.S)();
            return (0, e.jsx)(g.A, { isOpen: a, onClose: () => {} });
          }
          function l() {
            return null;
          }
          function m({ Component: a, pageProps: b }) {
            return (0, e.jsxs)(h.A, {
              children: [
                (0, e.jsx)(l, {}),
                (0, e.jsx)(a, { ...b }),
                (0, e.jsx)(k, {}),
                (0, e.jsx)(f.Toaster, {
                  position: "top-right",
                  toastOptions: {
                    duration: 4e3,
                    style: { background: "#363636", color: "#fff" },
                    success: {
                      duration: 3e3,
                      iconTheme: { primary: "#4ade80", secondary: "#fff" },
                    },
                    error: {
                      duration: 5e3,
                      iconTheme: { primary: "#ef4444", secondary: "#fff" },
                    },
                  },
                }),
              ],
            });
          }
          ((f = (j.then ? (await j)() : j)[0]), d());
        } catch (a) {
          d(a);
        }
      });
    },
    1881: (a, b, c) => {
      "use strict";
      function d() {
        let a = [];
        ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"].forEach(
          (a) => {},
        );
        let b = 0 === a.length,
          c = b
            ? `✅ Client environment variables validated`
            : `❌ Missing client environment variables: ${a.join(", ")}`;
        return { isValid: b, missingVars: a, warnings: [], summary: c };
      }
      c.d(b, { lQ: () => d });
    },
    5175: (a, b, c) => {
      "use strict";
      (c.d(b, { A: () => f }), c(8732));
      var d = c(2015);
      c(5288);
      let e = (0, d.createContext)({
        loading: !0,
        session: null,
        user: null,
        signOut: async () => {},
      });
      function f() {
        return (0, d.useContext)(e);
      }
    },
    5288: (a, b, c) => {
      "use strict";
      c.d(b, { N: () => g });
      var d = c(938);
      let e = "https://rkonwkggxaohpmxmzmfn.supabase.co",
        f =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo";
      (console.log("\uD83D\uDD0D Initializing Supabase client with:"),
        console.log("   URL:", e),
        console.log("   KEY (first 6):", f.slice(0, 6)));
      let g = (0, d.createClient)(e, f);
    },
    8075: (a, b, c) => {
      "use strict";
      c.d(b, { A: () => g });
      var d = c(8732),
        e = c(2015),
        f = c(9525);
      let g = ({ isOpen: a, onClose: b }) => {
        let { saveConsent: c } = (0, f.S)(),
          [g, h] = (0, e.useState)({
            marketing: !1,
            analytics: !1,
            functional: !0,
            necessary: !0,
          }),
          [i, j] = (0, e.useState)(!1),
          [k, l] = (0, e.useState)(!1);
        if (!a) return null;
        let m = async () => {
            (l(!0),
              (await c({
                marketing: !0,
                analytics: !0,
                functional: !0,
                necessary: !0,
              })) && b(),
              l(!1));
          },
          n = async () => {
            (l(!0), (await c(g)) && b(), l(!1));
          },
          o = async () => {
            (l(!0),
              (await c({
                marketing: !1,
                analytics: !1,
                functional: !1,
                necessary: !0,
              })) && b(),
              l(!1));
          },
          p = (a, b) => {
            "necessary" !== a && h((c) => ({ ...c, [a]: b }));
          };
        return (0, d.jsx)("div", {
          className:
            "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
          children: (0, d.jsx)("div", {
            className:
              "bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto",
            children: (0, d.jsxs)("div", {
              className: "p-6",
              children: [
                (0, d.jsxs)("div", {
                  className: "flex items-center mb-4",
                  children: [
                    (0, d.jsx)("div", {
                      className: "text-2xl mr-2",
                      children: "\uD83C\uDF6A",
                    }),
                    (0, d.jsx)("h2", {
                      className: "text-2xl font-bold text-gray-800",
                      children: "Privacy & Cookie Consent",
                    }),
                  ],
                }),
                (0, d.jsxs)("div", {
                  className: "mb-6",
                  children: [
                    (0, d.jsx)("p", {
                      className: "text-gray-700 mb-4",
                      children:
                        "AdGo respects your privacy and is committed to protecting your personal data. We use cookies and similar technologies to enhance your experience and provide personalized advertising.",
                    }),
                    (0, d.jsx)("p", {
                      className: "text-gray-700 mb-4",
                      children:
                        "This notice complies with Kenya's Data Protection Act (Kenya DPA) 2019 and GDPR requirements. Please review and customize your consent preferences below.",
                    }),
                  ],
                }),
                (0, d.jsxs)("div", {
                  className: "space-y-4 mb-6",
                  children: [
                    (0, d.jsxs)("div", {
                      className: "border rounded-lg p-4 bg-gray-50",
                      children: [
                        (0, d.jsxs)("div", {
                          className: "flex justify-between items-start mb-2",
                          children: [
                            (0, d.jsxs)("div", {
                              children: [
                                (0, d.jsx)("h3", {
                                  className: "font-semibold text-gray-800",
                                  children: "Strictly Necessary Cookies",
                                }),
                                (0, d.jsx)("p", {
                                  className: "text-sm text-gray-600",
                                  children:
                                    "Essential for the website to function properly. Cannot be disabled.",
                                }),
                              ],
                            }),
                            (0, d.jsx)("input", {
                              type: "checkbox",
                              checked: g.necessary,
                              disabled: !0,
                              className: "mt-1",
                            }),
                          ],
                        }),
                        (0, d.jsx)("p", {
                          className: "text-xs text-gray-500",
                          children:
                            "Used for: Authentication, security, load balancing, and core website functionality.",
                        }),
                      ],
                    }),
                    (0, d.jsxs)("div", {
                      className: "border rounded-lg p-4",
                      children: [
                        (0, d.jsxs)("div", {
                          className: "flex justify-between items-start mb-2",
                          children: [
                            (0, d.jsxs)("div", {
                              children: [
                                (0, d.jsx)("h3", {
                                  className: "font-semibold text-gray-800",
                                  children: "Functional Cookies",
                                }),
                                (0, d.jsx)("p", {
                                  className: "text-sm text-gray-600",
                                  children:
                                    "Enable enhanced functionality and personalization.",
                                }),
                              ],
                            }),
                            (0, d.jsx)("input", {
                              type: "checkbox",
                              checked: g.functional,
                              onChange: (a) =>
                                p("functional", a.target.checked),
                              className: "mt-1",
                            }),
                          ],
                        }),
                        (0, d.jsx)("p", {
                          className: "text-xs text-gray-500",
                          children:
                            "Used for: Language preferences, dashboard customization, and user settings.",
                        }),
                      ],
                    }),
                    (0, d.jsxs)("div", {
                      className: "border rounded-lg p-4",
                      children: [
                        (0, d.jsxs)("div", {
                          className: "flex justify-between items-start mb-2",
                          children: [
                            (0, d.jsxs)("div", {
                              children: [
                                (0, d.jsx)("h3", {
                                  className: "font-semibold text-gray-800",
                                  children: "Analytics Cookies",
                                }),
                                (0, d.jsx)("p", {
                                  className: "text-sm text-gray-600",
                                  children:
                                    "Help us understand how you interact with our platform.",
                                }),
                              ],
                            }),
                            (0, d.jsx)("input", {
                              type: "checkbox",
                              checked: g.analytics,
                              onChange: (a) => p("analytics", a.target.checked),
                              className: "mt-1",
                            }),
                          ],
                        }),
                        (0, d.jsx)("p", {
                          className: "text-xs text-gray-500",
                          children:
                            "Used for: Page views, click tracking, performance monitoring, and usage analytics.",
                        }),
                      ],
                    }),
                    (0, d.jsxs)("div", {
                      className: "border rounded-lg p-4",
                      children: [
                        (0, d.jsxs)("div", {
                          className: "flex justify-between items-start mb-2",
                          children: [
                            (0, d.jsxs)("div", {
                              children: [
                                (0, d.jsx)("h3", {
                                  className: "font-semibold text-gray-800",
                                  children: "Marketing Cookies",
                                }),
                                (0, d.jsx)("p", {
                                  className: "text-sm text-gray-600",
                                  children:
                                    "Used to deliver relevant advertising and measure campaign effectiveness.",
                                }),
                              ],
                            }),
                            (0, d.jsx)("input", {
                              type: "checkbox",
                              checked: g.marketing,
                              onChange: (a) => p("marketing", a.target.checked),
                              className: "mt-1",
                            }),
                          ],
                        }),
                        (0, d.jsx)("p", {
                          className: "text-xs text-gray-500",
                          children:
                            "Used for: Ad personalization, campaign tracking, and cross-platform advertising.",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, d.jsxs)("div", {
                  className: "mb-6 p-4 bg-blue-50 rounded-lg",
                  children: [
                    (0, d.jsx)("h4", {
                      className: "font-semibold text-blue-800 mb-2",
                      children: "Your Data Rights",
                    }),
                    (0, d.jsx)("p", {
                      className: "text-sm text-blue-700",
                      children:
                        "You have the right to access, correct, delete, or port your personal data. You can withdraw consent at any time in your account settings.",
                    }),
                  ],
                }),
                (0, d.jsxs)("div", {
                  className: "flex flex-col sm:flex-row gap-3",
                  children: [
                    (0, d.jsx)("button", {
                      onClick: m,
                      disabled: k,
                      className:
                        "flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold",
                      children: k ? "Saving..." : "Accept All",
                    }),
                    (0, d.jsx)("button", {
                      onClick: n,
                      disabled: k,
                      className:
                        "flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold",
                      children: k ? "Saving..." : "Save Preferences",
                    }),
                    (0, d.jsx)("button", {
                      onClick: o,
                      disabled: k,
                      className:
                        "flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 disabled:opacity-50 font-semibold",
                      children: k ? "Saving..." : "Decline All",
                    }),
                  ],
                }),
                (0, d.jsxs)("div", {
                  className: "mt-4 text-center text-sm text-gray-500",
                  children: [
                    (0, d.jsx)("a", {
                      href: "/privacy-policy",
                      className: "text-blue-600 hover:underline",
                      children: "Privacy Policy",
                    }),
                    " • ",
                    (0, d.jsx)("a", {
                      href: "/terms-of-service",
                      className: "text-blue-600 hover:underline",
                      children: "Terms of Service",
                    }),
                    " • ",
                    (0, d.jsx)("a", {
                      href: "/cookie-policy",
                      className: "text-blue-600 hover:underline",
                      children: "Cookie Policy",
                    }),
                  ],
                }),
              ],
            }),
          }),
        });
      };
    },
    9060: (a, b, c) => {
      "use strict";
      c.d(b, { A: () => h });
      var d = c(8732),
        e = c(2015),
        f = c(1302);
      class g extends e.Component {
        static getDerivedStateFromError(a) {
          return { hasError: !0, error: a };
        }
        componentDidCatch(a, b) {
          (console.error("ErrorBoundary caught an error:", a, b),
            this.setState({ error: a, errorInfo: b }),
            this.logErrorToService(a, b));
        }
        render() {
          return this.state.hasError
            ? this.props.fallback
              ? this.props.fallback
              : (0, d.jsx)("div", {
                  className:
                    "min-h-screen bg-gray-50 flex items-center justify-center p-4",
                  children: (0, d.jsxs)("div", {
                    className:
                      "max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center",
                    children: [
                      (0, d.jsx)("div", {
                        className: "flex justify-center mb-6",
                        children: (0, d.jsx)("div", {
                          className:
                            "w-16 h-16 bg-red-100 rounded-full flex items-center justify-center",
                          children: (0, d.jsx)(f.hcu, {
                            className: "w-8 h-8 text-red-600",
                          }),
                        }),
                      }),
                      (0, d.jsx)("h1", {
                        className: "text-2xl font-bold text-gray-900 mb-4",
                        children: "Oops! Something went wrong",
                      }),
                      (0, d.jsx)("p", {
                        className: "text-gray-600 mb-6",
                        children:
                          "We encountered an unexpected error. Our team has been notified and is working on a fix.",
                      }),
                      !1,
                      (0, d.jsxs)("div", {
                        className: "flex flex-col sm:flex-row gap-3",
                        children: [
                          (0, d.jsxs)("button", {
                            onClick: this.handleRetry,
                            className:
                              "flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2",
                            children: [
                              (0, d.jsx)(f.e9t, { className: "w-4 h-4" }),
                              "Try Again",
                            ],
                          }),
                          (0, d.jsxs)("button", {
                            onClick: this.handleGoHome,
                            className:
                              "flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2",
                            children: [
                              (0, d.jsx)(f.ww0, { className: "w-4 h-4" }),
                              "Go Home",
                            ],
                          }),
                        ],
                      }),
                      (0, d.jsx)("div", {
                        className: "mt-6 pt-6 border-t border-gray-200",
                        children: (0, d.jsxs)("p", {
                          className: "text-sm text-gray-500",
                          children: [
                            "If this problem persists, please contact",
                            " ",
                            (0, d.jsx)("a", {
                              href: "mailto:support@adgosolutions.com",
                              className: "text-blue-600 hover:underline",
                              children: "support@adgosolutions.com",
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                })
            : this.props.children;
        }
        constructor(...a) {
          (super(...a),
            (this.state = { hasError: !1 }),
            (this.logErrorToService = (a, b) => {}),
            (this.handleRetry = () => {
              this.setState({ hasError: !1, error: void 0, errorInfo: void 0 });
            }),
            (this.handleGoHome = () => {}));
        }
      }
      let h = g;
    },
    9525: (a, b, c) => {
      "use strict";
      c.d(b, { S: () => g });
      var d = c(2015),
        e = c(5288),
        f = c(5175);
      let g = () => {
        let [a, b] = (0, d.useState)(null),
          [c, g] = (0, d.useState)(!1),
          [h, i] = (0, d.useState)(!0),
          { user: j } = (0, f.A)();
        (0, d.useEffect)(() => {
          k();
        }, [j]);
        let k = async () => {
            i(!0);
            try {
              let a = localStorage.getItem("adgo-consent");
              if (!j) {
                if (a) {
                  let c = JSON.parse(a);
                  (b(c), g(!1));
                } else g(!0);
                i(!1);
                return;
              }
              let { data: c, error: d } = await e.N.from("user_consents")
                .select("*")
                .eq("user_id", j.id)
                .order("created_at", { ascending: !1 })
                .limit(1)
                .single();
              (d &&
                "PGRST116" !== d.code &&
                console.error("Error checking consent:", d),
                c ? (b(c), g(!1)) : g(!0));
            } catch (a) {
              (console.error("Consent check error:", a), g(!0));
            } finally {
              i(!1);
            }
          },
          l = async (a) => {
            try {
              let c = {
                user_id: j?.id || null,
                consents: a,
                ip_address: await n(),
                user_agent: navigator.userAgent,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              };
              if (j) {
                let { data: d, error: f } = await e.N.from("user_consents")
                  .upsert({
                    user_id: j.id,
                    consents: a,
                    ip_address: c.ip_address,
                    user_agent: c.user_agent,
                  })
                  .select()
                  .single();
                if (f) throw f;
                b(d);
              } else {
                let a = { id: `local-${Date.now()}`, ...c };
                (localStorage.setItem("adgo-consent", JSON.stringify(a)), b(a));
              }
              return (g(!1), !0);
            } catch (a) {
              return (console.error("Error saving consent:", a), !1);
            }
          },
          m = async (b) => !!a && (await l(b)),
          n = async () => {
            try {
              let a = await fetch("/api/get-client-ip");
              return (await a.json()).ip || "unknown";
            } catch {
              return "unknown";
            }
          };
        return {
          consentRecord: a,
          showConsentModal: c,
          loading: h,
          saveConsent: l,
          updateConsent: m,
          withdrawConsent: async () => {
            if (!j)
              return (
                localStorage.removeItem("adgo-consent"),
                b(null),
                g(!0),
                !0
              );
            try {
              let { error: a } = await e.N.from("user_consents")
                .delete()
                .eq("user_id", j.id);
              if (a) throw a;
              return (b(null), g(!0), !0);
            } catch (a) {
              return (console.error("Error withdrawing consent:", a), !1);
            }
          },
          hasConsent: (b) => !!a && !0 === a.consents[b],
          checkConsentStatus: k,
        };
      };
    },
  }));
