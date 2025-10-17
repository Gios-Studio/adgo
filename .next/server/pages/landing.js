"use strict";
(() => {
  var a = {};
  ((a.id = 2001),
    (a.ids = [636, 2001, 3220]),
    (a.modules = {
      361: (a) => {
        a.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
      },
      411: (a) => {
        a.exports = require("@supabase/auth-js");
      },
      598: (a) => {
        a.exports = import("@radix-ui/react-label");
      },
      1339: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { $: () => l });
            var e = c(8732),
              f = c(2015),
              g = c(9640),
              h = c(8938),
              i = c(3894),
              j = a([g, h, i]);
            [g, h, i] = j.then ? (await j)() : j;
            let k = (0, h.cva)(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                {
                  variants: {
                    variant: {
                      default:
                        "bg-primary text-primary-foreground hover:bg-primary/90",
                      destructive:
                        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                      outline:
                        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                      secondary:
                        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                      ghost: "hover:bg-accent hover:text-accent-foreground",
                      link: "text-primary underline-offset-4 hover:underline",
                    },
                    size: {
                      default: "h-10 px-4 py-2",
                      sm: "h-9 rounded-md px-3",
                      lg: "h-11 rounded-md px-8",
                      icon: "h-10 w-10",
                    },
                  },
                  defaultVariants: { variant: "default", size: "default" },
                },
              ),
              l = f.forwardRef(
                (
                  { className: a, variant: b, size: c, asChild: d = !1, ...f },
                  h,
                ) => {
                  let j = d ? g.Slot : "button";
                  return (0, e.jsx)(j, {
                    className: (0, i.cn)(
                      k({ variant: b, size: c, className: a }),
                    ),
                    ref: h,
                    ...f,
                  });
                },
              );
            ((l.displayName = "Button"), d());
          } catch (a) {
            d(a);
          }
        });
      },
      1354: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { E: () => i });
            var e = c(8732);
            c(2015);
            var f = c(8938),
              g = c(3894),
              h = a([f, g]);
            [f, g] = h.then ? (await h)() : h;
            let j = (0, f.cva)(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              {
                variants: {
                  variant: {
                    default:
                      "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                    secondary:
                      "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    destructive:
                      "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                    outline: "text-foreground",
                  },
                },
                defaultVariants: { variant: "default" },
              },
            );
            function i({ className: a, variant: b, ...c }) {
              return (0, e.jsx)("div", {
                className: (0, g.cn)(j({ variant: b }), a),
                ...c,
              });
            }
            d();
          } catch (a) {
            d(a);
          }
        });
      },
      2015: (a) => {
        a.exports = require("react");
      },
      2326: (a) => {
        a.exports = require("react-dom");
      },
      2885: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, {
              BT: () => l,
              Wu: () => m,
              ZB: () => k,
              Zp: () => i,
              aR: () => j,
            });
            var e = c(8732),
              f = c(2015),
              g = c(3894),
              h = a([g]);
            g = (h.then ? (await h)() : h)[0];
            let i = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("div", {
                ref: c,
                className: (0, g.cn)(
                  "rounded-lg border bg-card text-card-foreground shadow-sm",
                  a,
                ),
                ...b,
              }),
            );
            i.displayName = "Card";
            let j = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("div", {
                ref: c,
                className: (0, g.cn)("flex flex-col space-y-1.5 p-6", a),
                ...b,
              }),
            );
            j.displayName = "CardHeader";
            let k = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("h3", {
                ref: c,
                className: (0, g.cn)(
                  "text-2xl font-semibold leading-none tracking-tight",
                  a,
                ),
                ...b,
              }),
            );
            k.displayName = "CardTitle";
            let l = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("p", {
                ref: c,
                className: (0, g.cn)("text-sm text-muted-foreground", a),
                ...b,
              }),
            );
            l.displayName = "CardDescription";
            let m = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("div", {
                ref: c,
                className: (0, g.cn)("p-6 pt-0", a),
                ...b,
              }),
            );
            ((m.displayName = "CardContent"),
              (f.forwardRef(({ className: a, ...b }, c) =>
                (0, e.jsx)("div", {
                  ref: c,
                  className: (0, g.cn)("flex items-center p-6 pt-0", a),
                  ...b,
                }),
              ).displayName = "CardFooter"),
              d());
          } catch (a) {
            d(a);
          }
        });
      },
      2893: (a) => {
        a.exports = import("react-hot-toast");
      },
      3071: (a, b, c) => {
        c.d(b, { dj: () => l });
        var d = c(2015);
        let e = 0,
          f = new Map(),
          g = (a) => {
            if (f.has(a)) return;
            let b = setTimeout(() => {
              (f.delete(a), j({ type: "REMOVE_TOAST", toastId: a }));
            }, 1e6);
            f.set(a, b);
          },
          h = [],
          i = { toasts: [] };
        function j(a) {
          ((i = ((a, b) => {
            switch (b.type) {
              case "ADD_TOAST":
                return { ...a, toasts: [b.toast, ...a.toasts].slice(0, 1) };
              case "UPDATE_TOAST":
                return {
                  ...a,
                  toasts: a.toasts.map((a) =>
                    a.id === b.toast.id ? { ...a, ...b.toast } : a,
                  ),
                };
              case "DISMISS_TOAST": {
                let { toastId: c } = b;
                return (
                  c
                    ? g(c)
                    : a.toasts.forEach((a) => {
                        g(a.id);
                      }),
                  {
                    ...a,
                    toasts: a.toasts.map((a) =>
                      a.id === c || void 0 === c ? { ...a, open: !1 } : a,
                    ),
                  }
                );
              }
              case "REMOVE_TOAST":
                if (void 0 === b.toastId) return { ...a, toasts: [] };
                return {
                  ...a,
                  toasts: a.toasts.filter((a) => a.id !== b.toastId),
                };
            }
          })(i, a)),
            h.forEach((a) => {
              a(i);
            }));
        }
        function k({ ...a }) {
          let b = (e = (e + 1) % Number.MAX_SAFE_INTEGER).toString(),
            c = () => j({ type: "DISMISS_TOAST", toastId: b });
          return (
            j({
              type: "ADD_TOAST",
              toast: {
                ...a,
                id: b,
                open: !0,
                onOpenChange: (a) => {
                  a || c();
                },
              },
            }),
            {
              id: b,
              dismiss: c,
              update: (a) =>
                j({ type: "UPDATE_TOAST", toast: { ...a, id: b } }),
            }
          );
        }
        function l() {
          let [a, b] = d.useState(i);
          return (
            d.useEffect(
              () => (
                h.push(b),
                () => {
                  let a = h.indexOf(b);
                  a > -1 && h.splice(a, 1);
                }
              ),
              [a],
            ),
            {
              ...a,
              toast: k,
              dismiss: (a) => j({ type: "DISMISS_TOAST", toastId: a }),
            }
          );
        }
      },
      3873: (a) => {
        a.exports = require("path");
      },
      3894: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { cn: () => h });
            var e = c(8421),
              f = c(5979),
              g = a([e, f]);
            function h(...a) {
              return (0, f.twMerge)((0, e.clsx)(a));
            }
            (([e, f] = g.then ? (await g)() : g), d());
          } catch (a) {
            d(a);
          }
        });
      },
      3929: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { p: () => i });
            var e = c(8732),
              f = c(2015),
              g = c(3894),
              h = a([g]);
            g = (h.then ? (await h)() : h)[0];
            let i = f.forwardRef(({ className: a, type: b, ...c }, d) =>
              (0, e.jsx)("input", {
                type: b,
                className: (0, g.cn)(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  a,
                ),
                ref: d,
                ...c,
              }),
            );
            ((i.displayName = "Input"), d());
          } catch (a) {
            d(a);
          }
        });
      },
      4075: (a) => {
        a.exports = require("zlib");
      },
      4096: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { C: () => l, z: () => k });
            var e = c(8732),
              f = c(2015),
              g = c(9953),
              h = c(1302),
              i = c(3894),
              j = a([g, i]);
            [g, i] = j.then ? (await j)() : j;
            let k = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)(g.Root, {
                className: (0, i.cn)("grid gap-2", a),
                ...b,
                ref: c,
              }),
            );
            k.displayName = g.Root.displayName;
            let l = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)(g.Item, {
                ref: c,
                className: (0, i.cn)(
                  "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  a,
                ),
                ...b,
                children: (0, e.jsx)(g.Indicator, {
                  className: "flex items-center justify-center",
                  children: (0, e.jsx)(h.jlt, {
                    className: "h-2.5 w-2.5 fill-current text-current",
                  }),
                }),
              }),
            );
            ((l.displayName = g.Item.displayName), d());
          } catch (a) {
            d(a);
          }
        });
      },
      5471: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { J: () => l });
            var e = c(8732),
              f = c(2015),
              g = c(598),
              h = c(8938),
              i = c(3894),
              j = a([g, h, i]);
            [g, h, i] = j.then ? (await j)() : j;
            let k = (0, h.cva)(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              ),
              l = f.forwardRef(({ className: a, ...b }, c) =>
                (0, e.jsx)(g.Root, {
                  ref: c,
                  className: (0, i.cn)(k(), a),
                  ...b,
                }),
              );
            ((l.displayName = g.Root.displayName), d());
          } catch (a) {
            d(a);
          }
        });
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
      7997: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            (c.r(b), c.d(b, { default: () => r, getStaticProps: () => q }));
            var e = c(8732),
              f = c(2015),
              g = c(4233),
              h = c(1339),
              i = c(2885),
              j = c(3929),
              k = c(1354),
              l = c(4096),
              m = c(5471),
              n = c(1302),
              o = c(3071),
              p = a([h, i, j, k, l, m]);
            [h, i, j, k, l, m] = p.then ? (await p)() : p;
            let r = () => {
              let a = (0, g.useRouter)(),
                { toast: b } = (0, o.dj)(),
                [c, d] = (0, f.useState)(""),
                [p, q] = (0, f.useState)(""),
                [r, s] = (0, f.useState)(""),
                [t, u] = (0, f.useState)(""),
                [v, w] = (0, f.useState)(""),
                [x, y] = (0, f.useState)([]),
                [z, A] = (0, f.useState)(!1),
                B = async (a) => {
                  if ((a.preventDefault(), !c))
                    return void b({
                      title: "Email Required",
                      description:
                        "Please enter your email address to join the waitlist.",
                      variant: "destructive",
                    });
                  A(!0);
                  try {
                    let a = {
                      email: c,
                      companySize: p,
                      monthlyAdSpend: r,
                      primaryChallenge: v,
                      willingToPay: t,
                      timestamp: new Date().toISOString(),
                    };
                    (console.log("Waitlist signup:", a),
                      b({
                        title: "\uD83C\uDF89 Welcome to AdGo!",
                        description:
                          "You're on the waitlist! We'll notify you when early access opens.",
                      }),
                      d(""),
                      q(""),
                      s(""),
                      w(""),
                      u(""));
                  } catch (a) {
                    b({
                      title: "Signup Failed",
                      description: "Something went wrong. Please try again.",
                      variant: "destructive",
                    });
                  } finally {
                    A(!1);
                  }
                },
                C = [
                  {
                    icon: n.DTr,
                    title: "Hyper-Targeted Campaigns",
                    description:
                      "AI-powered targeting that reaches your ideal customers with surgical precision across multiple channels.",
                  },
                  {
                    icon: n.VH9,
                    title: "Real-Time Analytics",
                    description:
                      "Monitor performance with live dashboards and actionable insights that help you optimize on the fly.",
                  },
                  {
                    icon: n.sDd,
                    title: "Geo-Location Intelligence",
                    description:
                      "Target by location, demographics, and behavior patterns to maximize local and regional impact.",
                  },
                  {
                    icon: n.KqI,
                    title: "Automated Optimization",
                    description:
                      "Let AI automatically adjust your campaigns for maximum ROI while you focus on strategy.",
                  },
                ];
              return (0, e.jsxs)("div", {
                className:
                  "min-h-screen bg-gradient-to-br from-primary/5 to-accent/5",
                children: [
                  (0, e.jsx)("nav", {
                    className:
                      "border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm",
                    children: (0, e.jsx)("div", {
                      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                      children: (0, e.jsxs)("div", {
                        className: "flex justify-between items-center h-16",
                        children: [
                          (0, e.jsxs)("div", {
                            className: "flex items-center",
                            children: [
                              (0, e.jsx)("img", {
                                src: "/lovable-uploads/2832d142-026e-456c-88e4-dbacf37c22e7.png",
                                alt: "AdGo Logo",
                                className: "h-8 w-auto",
                              }),
                              (0, e.jsx)("span", {
                                className:
                                  "ml-2 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                                children: "AdGo",
                              }),
                            ],
                          }),
                          (0, e.jsxs)("div", {
                            className: "flex items-center space-x-4",
                            children: [
                              (0, e.jsx)(h.$, {
                                variant: "ghost",
                                onClick: () => a.push("/login"),
                                className: "hover:bg-primary/10",
                                children: "Sign In",
                              }),
                              (0, e.jsx)(h.$, {
                                onClick: () => a.push("/auth"),
                                className:
                                  "bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300",
                                children: "Get Started",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, e.jsxs)("section", {
                    className:
                      "relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10",
                    children: [
                      (0, e.jsx)("div", {
                        className:
                          "absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent",
                      }),
                      (0, e.jsx)("div", {
                        className:
                          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative",
                        children: (0, e.jsxs)("div", {
                          className: "grid lg:grid-cols-2 gap-12 items-center",
                          children: [
                            (0, e.jsxs)("div", {
                              className: "text-left",
                              children: [
                                (0, e.jsx)(k.E, {
                                  variant: "secondary",
                                  className:
                                    "mb-4 bg-accent/10 text-accent border-accent/20",
                                  children:
                                    "\uD83D\uDE80 Now in Beta - Join 1000+ Early Adopters",
                                }),
                                (0, e.jsxs)("h1", {
                                  className:
                                    "text-4xl md:text-6xl font-bold mb-6 leading-tight",
                                  children: [
                                    (0, e.jsx)("span", {
                                      className:
                                        "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                                      children: "Hyper-Targeted",
                                    }),
                                    (0, e.jsx)("br", {}),
                                    (0, e.jsx)("span", {
                                      className: "text-foreground",
                                      children: "Advertising That",
                                    }),
                                    (0, e.jsx)("br", {}),
                                    (0, e.jsx)("span", {
                                      className:
                                        "bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent",
                                      children: "Actually Works",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("p", {
                                  className:
                                    "text-xl text-muted-foreground mb-8 max-w-2xl",
                                  children:
                                    "Stop wasting ad spend on broad audiences. AdGo uses AI-powered geo-targeting and behavioral insights to deliver your ads to the right people, at the right time, in the right location.",
                                }),
                                (0, e.jsxs)("div", {
                                  className: "flex flex-col sm:flex-row gap-4",
                                  children: [
                                    (0, e.jsxs)(h.$, {
                                      size: "lg",
                                      onClick: () =>
                                        document
                                          .getElementById("waitlist")
                                          ?.scrollIntoView({
                                            behavior: "smooth",
                                          }),
                                      className:
                                        "bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-105 transition-all duration-300 text-lg px-8 py-4",
                                      children: [
                                        "Join Waitlist ",
                                        (0, e.jsx)(n.Qpb, {
                                          className: "ml-2 h-5 w-5",
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)(h.$, {
                                      size: "lg",
                                      variant: "outline",
                                      onClick: () => a.push("/demo"),
                                      className:
                                        "border-primary/20 hover:bg-primary/5 text-lg px-8 py-4",
                                      children: [
                                        "Watch Demo ",
                                        (0, e.jsx)(n.jGG, {
                                          className: "ml-2 h-5 w-5",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("div", {
                                  className:
                                    "mt-12 pt-8 border-t border-border/50",
                                  children: (0, e.jsxs)("div", {
                                    className:
                                      "flex items-center gap-8 text-sm text-muted-foreground",
                                    children: [
                                      (0, e.jsxs)("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                          (0, e.jsx)("div", {
                                            className: "flex -space-x-2",
                                            children: [1, 2, 3, 4].map((a) =>
                                              (0, e.jsx)(
                                                "div",
                                                {
                                                  className:
                                                    "w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-white",
                                                },
                                                a,
                                              ),
                                            ),
                                          }),
                                          (0, e.jsx)("span", {
                                            children: "1000+ advertisers",
                                          }),
                                        ],
                                      }),
                                      (0, e.jsxs)("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                          (0, e.jsx)(n.FEq, {
                                            className:
                                              "h-4 w-4 text-yellow-400 fill-current",
                                          }),
                                          (0, e.jsx)("span", {
                                            children: "4.9/5 rating",
                                          }),
                                        ],
                                      }),
                                      (0, e.jsxs)("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                          (0, e.jsx)(n.ntg, {
                                            className: "h-4 w-4 text-primary",
                                          }),
                                          (0, e.jsx)("span", {
                                            children: "300% avg. ROI",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                            (0, e.jsxs)("div", {
                              className: "relative",
                              children: [
                                (0, e.jsx)("div", {
                                  className:
                                    "bg-white rounded-2xl shadow-2xl p-6 border border-border/20",
                                  children: (0, e.jsxs)("div", {
                                    className: "space-y-4",
                                    children: [
                                      (0, e.jsxs)("div", {
                                        className:
                                          "flex items-center justify-between",
                                        children: [
                                          (0, e.jsx)("h3", {
                                            className: "font-semibold text-lg",
                                            children: "Campaign Dashboard",
                                          }),
                                          (0, e.jsx)(k.E, {
                                            className:
                                              "bg-primary/10 text-primary",
                                            children: "Live",
                                          }),
                                        ],
                                      }),
                                      (0, e.jsxs)("div", {
                                        className: "grid grid-cols-3 gap-4",
                                        children: [
                                          (0, e.jsxs)("div", {
                                            className:
                                              "text-center p-4 bg-primary/5 rounded-lg",
                                            children: [
                                              (0, e.jsx)(n.kU3, {
                                                className:
                                                  "h-6 w-6 mx-auto mb-2 text-primary",
                                              }),
                                              (0, e.jsx)("div", {
                                                className:
                                                  "text-2xl font-bold text-primary",
                                                children: "42.5K",
                                              }),
                                              (0, e.jsx)("div", {
                                                className:
                                                  "text-xs text-muted-foreground",
                                                children: "Impressions",
                                              }),
                                            ],
                                          }),
                                          (0, e.jsxs)("div", {
                                            className:
                                              "text-center p-4 bg-accent/5 rounded-lg",
                                            children: [
                                              (0, e.jsx)(n.DTr, {
                                                className:
                                                  "h-6 w-6 mx-auto mb-2 text-accent",
                                              }),
                                              (0, e.jsx)("div", {
                                                className:
                                                  "text-2xl font-bold text-accent",
                                                children: "8.4%",
                                              }),
                                              (0, e.jsx)("div", {
                                                className:
                                                  "text-xs text-muted-foreground",
                                                children: "CTR",
                                              }),
                                            ],
                                          }),
                                          (0, e.jsxs)("div", {
                                            className:
                                              "text-center p-4 bg-primary/5 rounded-lg",
                                            children: [
                                              (0, e.jsx)(n.G9t, {
                                                className:
                                                  "h-6 w-6 mx-auto mb-2 text-primary",
                                              }),
                                              (0, e.jsx)("div", {
                                                className:
                                                  "text-2xl font-bold text-primary",
                                                children: "$1.20",
                                              }),
                                              (0, e.jsx)("div", {
                                                className:
                                                  "text-xs text-muted-foreground",
                                                children: "CPC",
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, e.jsxs)("div", {
                                        className:
                                          "h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-center justify-center",
                                        children: [
                                          (0, e.jsx)(n.sDd, {
                                            className:
                                              "h-8 w-8 text-primary mr-2",
                                          }),
                                          (0, e.jsx)("span", {
                                            className: "text-muted-foreground",
                                            children: "Geo-targeting Heatmap",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                                (0, e.jsx)("div", {
                                  className:
                                    "absolute -top-4 -right-4 bg-accent text-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold",
                                  children: "Real-time Analytics",
                                }),
                                (0, e.jsx)("div", {
                                  className:
                                    "absolute -bottom-4 -left-4 bg-primary text-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold",
                                  children: "AI-Powered Targeting",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, e.jsx)("section", {
                    className: "py-20 bg-white",
                    children: (0, e.jsxs)("div", {
                      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                      children: [
                        (0, e.jsxs)("div", {
                          className: "text-center mb-16",
                          children: [
                            (0, e.jsx)("h2", {
                              className: "text-4xl font-bold mb-6",
                              children: "Why AdGo is Different",
                            }),
                            (0, e.jsx)("p", {
                              className:
                                "text-xl text-muted-foreground max-w-3xl mx-auto",
                              children:
                                "Traditional advertising platforms waste your budget on unqualified leads. AdGo's AI-powered platform ensures every dollar spent reaches your ideal customer.",
                            }),
                          ],
                        }),
                        (0, e.jsx)("div", {
                          className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
                          children: C.map((a, b) =>
                            (0, e.jsxs)(
                              i.Zp,
                              {
                                className:
                                  "border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
                                children: [
                                  (0, e.jsxs)(i.aR, {
                                    className: "text-center pb-4",
                                    children: [
                                      (0, e.jsx)("div", {
                                        className:
                                          "mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center",
                                        children: (0, e.jsx)(a.icon, {
                                          className: "h-8 w-8 text-white",
                                        }),
                                      }),
                                      (0, e.jsx)(i.ZB, {
                                        className: "text-xl text-primary",
                                        children: a.title,
                                      }),
                                    ],
                                  }),
                                  (0, e.jsx)(i.Wu, {
                                    className: "text-center",
                                    children: (0, e.jsx)("p", {
                                      className: "text-muted-foreground",
                                      children: a.description,
                                    }),
                                  }),
                                ],
                              },
                              b,
                            ),
                          ),
                        }),
                      ],
                    }),
                  }),
                  (0, e.jsx)("section", {
                    className:
                      "py-20 bg-gradient-to-r from-primary to-accent text-white",
                    children: (0, e.jsxs)("div", {
                      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                      children: [
                        (0, e.jsxs)("div", {
                          className: "text-center mb-12",
                          children: [
                            (0, e.jsx)("h2", {
                              className: "text-4xl font-bold mb-4",
                              children: "Proven Results Across Industries",
                            }),
                            (0, e.jsx)("p", {
                              className: "text-xl opacity-90",
                              children:
                                "Don't just take our word for it - see what our platform delivers",
                            }),
                          ],
                        }),
                        (0, e.jsxs)("div", {
                          className:
                            "grid grid-cols-2 md:grid-cols-4 gap-8 text-center",
                          children: [
                            (0, e.jsxs)("div", {
                              children: [
                                (0, e.jsx)("div", {
                                  className: "text-4xl font-bold mb-2",
                                  children: "300%",
                                }),
                                (0, e.jsx)("div", {
                                  className: "text-accent opacity-90",
                                  children: "Average ROI Increase",
                                }),
                              ],
                            }),
                            (0, e.jsxs)("div", {
                              children: [
                                (0, e.jsx)("div", {
                                  className: "text-4xl font-bold mb-2",
                                  children: "89%",
                                }),
                                (0, e.jsx)("div", {
                                  className: "text-accent opacity-90",
                                  children: "Reduction in CAC",
                                }),
                              ],
                            }),
                            (0, e.jsxs)("div", {
                              children: [
                                (0, e.jsx)("div", {
                                  className: "text-4xl font-bold mb-2",
                                  children: "1000+",
                                }),
                                (0, e.jsx)("div", {
                                  className: "text-accent opacity-90",
                                  children: "Active Advertisers",
                                }),
                              ],
                            }),
                            (0, e.jsxs)("div", {
                              children: [
                                (0, e.jsx)("div", {
                                  className: "text-4xl font-bold mb-2",
                                  children: "$50M+",
                                }),
                                (0, e.jsx)("div", {
                                  className: "text-accent opacity-90",
                                  children: "Ad Spend Optimized",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, e.jsx)("section", {
                    id: "waitlist",
                    className:
                      "py-20 bg-gradient-to-br from-primary/5 to-accent/5",
                    children: (0, e.jsxs)("div", {
                      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
                      children: [
                        (0, e.jsxs)("div", {
                          className: "text-center mb-12",
                          children: [
                            (0, e.jsx)("h2", {
                              className:
                                "text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                              children: "Join the AdGo Revolution",
                            }),
                            (0, e.jsx)("p", {
                              className: "text-xl text-muted-foreground",
                              children:
                                "Get early access to the platform that's changing how businesses advertise. Plus, help us validate our pricing with your input.",
                            }),
                          ],
                        }),
                        (0, e.jsxs)(i.Zp, {
                          className:
                            "max-w-2xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur",
                          children: [
                            (0, e.jsxs)(i.aR, {
                              children: [
                                (0, e.jsx)(i.ZB, {
                                  className:
                                    "text-3xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                                  children: "Join the Waitlist",
                                }),
                                (0, e.jsx)("p", {
                                  className:
                                    "text-center text-muted-foreground text-lg",
                                  children:
                                    "Be among the first to experience hyper-targeted advertising that actually works",
                                }),
                              ],
                            }),
                            (0, e.jsxs)(i.Wu, {
                              className: "space-y-6",
                              children: [
                                (0, e.jsxs)("form", {
                                  onSubmit: B,
                                  children: [
                                    (0, e.jsxs)("div", {
                                      className:
                                        "grid md:grid-cols-2 gap-4 mb-6",
                                      children: [
                                        (0, e.jsx)("div", {
                                          children: (0, e.jsx)(j.p, {
                                            type: "email",
                                            placeholder:
                                              "Enter your work email",
                                            value: c,
                                            onChange: (a) => d(a.target.value),
                                            className: "h-12",
                                            required: !0,
                                          }),
                                        }),
                                        (0, e.jsx)("div", {
                                          children: (0, e.jsxs)("select", {
                                            value: p,
                                            onChange: (a) => q(a.target.value),
                                            className:
                                              "w-full h-12 p-3 border rounded-md bg-background",
                                            children: [
                                              (0, e.jsx)("option", {
                                                value: "",
                                                children: "Company size",
                                              }),
                                              (0, e.jsx)("option", {
                                                value: "1-10",
                                                children: "1-10 employees",
                                              }),
                                              (0, e.jsx)("option", {
                                                value: "11-50",
                                                children: "11-50 employees",
                                              }),
                                              (0, e.jsx)("option", {
                                                value: "51-200",
                                                children: "51-200 employees",
                                              }),
                                              (0, e.jsx)("option", {
                                                value: "201+",
                                                children: "201+ employees",
                                              }),
                                            ],
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      className: "mb-6",
                                      children: [
                                        (0, e.jsx)("label", {
                                          className:
                                            "text-sm font-medium mb-3 block text-primary",
                                          children: "Monthly Ad Spend",
                                        }),
                                        (0, e.jsx)(l.z, {
                                          value: r,
                                          onValueChange: s,
                                          children: (0, e.jsx)("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: [
                                              {
                                                value: "<$1K",
                                                label: "Less than $1,000",
                                              },
                                              {
                                                value: "$1K-$5K",
                                                label: "$1,000 - $5,000",
                                              },
                                              {
                                                value: "$5K-$20K",
                                                label: "$5,000 - $20,000",
                                              },
                                              {
                                                value: "$20K+",
                                                label: "$20,000+",
                                              },
                                            ].map((a) =>
                                              (0, e.jsxs)(
                                                "div",
                                                {
                                                  className:
                                                    "flex items-center space-x-2 p-3 border rounded-lg hover:bg-primary/5 transition-colors",
                                                  children: [
                                                    (0, e.jsx)(l.C, {
                                                      value: a.value,
                                                      id: a.value,
                                                    }),
                                                    (0, e.jsx)(m.J, {
                                                      htmlFor: a.value,
                                                      className:
                                                        "text-sm cursor-pointer",
                                                      children: a.label,
                                                    }),
                                                  ],
                                                },
                                                a.value,
                                              ),
                                            ),
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      className: "mb-6",
                                      children: [
                                        (0, e.jsx)("label", {
                                          className:
                                            "text-sm font-medium mb-3 block text-primary",
                                          children:
                                            "What's your biggest advertising challenge?",
                                        }),
                                        (0, e.jsx)(l.z, {
                                          value: v,
                                          onValueChange: w,
                                          children: (0, e.jsx)("div", {
                                            className: "space-y-2",
                                            children: [
                                              "Low conversion rates",
                                              "High cost per acquisition",
                                              "Poor targeting accuracy",
                                              "Difficulty measuring ROI",
                                              "Managing multiple campaigns",
                                            ].map((a) =>
                                              (0, e.jsxs)(
                                                "div",
                                                {
                                                  className:
                                                    "flex items-center space-x-2 p-2 rounded-lg hover:bg-primary/5 transition-colors",
                                                  children: [
                                                    (0, e.jsx)(l.C, {
                                                      value: a,
                                                      id: a,
                                                    }),
                                                    (0, e.jsx)(m.J, {
                                                      htmlFor: a,
                                                      className:
                                                        "text-sm cursor-pointer",
                                                      children: a,
                                                    }),
                                                  ],
                                                },
                                                a,
                                              ),
                                            ),
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, e.jsxs)("div", {
                                      className: "mb-6",
                                      children: [
                                        (0, e.jsx)("label", {
                                          className:
                                            "text-sm font-medium mb-3 block text-accent",
                                          children:
                                            "\uD83D\uDCB0 Would you pay for a solution that increases ad ROI by 300%?",
                                        }),
                                        (0, e.jsx)(l.z, {
                                          value: t,
                                          onValueChange: u,
                                          children: (0, e.jsx)("div", {
                                            className: "space-y-2",
                                            children: [
                                              {
                                                value: "yes",
                                                label:
                                                  "Yes, absolutely! Show me pricing",
                                                color: "text-green-600",
                                              },
                                              {
                                                value: "maybe",
                                                label:
                                                  "Maybe, depends on pricing and features",
                                                color: "text-yellow-600",
                                              },
                                              {
                                                value: "no",
                                                label:
                                                  "No, looking for free solutions only",
                                                color: "text-red-600",
                                              },
                                            ].map((a) =>
                                              (0, e.jsxs)(
                                                "div",
                                                {
                                                  className:
                                                    "flex items-center space-x-2 p-3 border rounded-lg hover:bg-primary/5 transition-colors",
                                                  children: [
                                                    (0, e.jsx)(l.C, {
                                                      value: a.value,
                                                      id: a.value,
                                                    }),
                                                    (0, e.jsx)(m.J, {
                                                      htmlFor: a.value,
                                                      className: `text-sm cursor-pointer ${a.color}`,
                                                      children: a.label,
                                                    }),
                                                  ],
                                                },
                                                a.value,
                                              ),
                                            ),
                                          }),
                                        }),
                                      ],
                                    }),
                                    (0, e.jsx)(h.$, {
                                      type: "submit",
                                      disabled: z || !c,
                                      className:
                                        "w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-lg font-semibold",
                                      children: z
                                        ? "Joining..."
                                        : "\uD83D\uDE80 Join Waitlist & Get Early Access",
                                    }),
                                  ],
                                }),
                                (0, e.jsxs)("div", {
                                  className: "text-center space-y-2",
                                  children: [
                                    (0, e.jsx)("p", {
                                      className:
                                        "text-xs text-muted-foreground",
                                      children:
                                        "We'll never spam you. Unsubscribe at any time.",
                                    }),
                                    (0, e.jsxs)("div", {
                                      className:
                                        "flex items-center justify-center gap-4 text-xs text-muted-foreground",
                                      children: [
                                        (0, e.jsxs)("span", {
                                          className: "flex items-center gap-1",
                                          children: [
                                            (0, e.jsx)(n.ekZ, {
                                              className: "h-3 w-3",
                                            }),
                                            "GDPR Compliant",
                                          ],
                                        }),
                                        (0, e.jsxs)("span", {
                                          className: "flex items-center gap-1",
                                          children: [
                                            (0, e.jsx)(n.rAV, {
                                              className: "h-3 w-3",
                                            }),
                                            "No Credit Card Required",
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
                      ],
                    }),
                  }),
                  (0, e.jsx)("footer", {
                    className: "bg-white border-t py-12",
                    children: (0, e.jsxs)("div", {
                      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                      children: [
                        (0, e.jsxs)("div", {
                          className: "grid md:grid-cols-4 gap-8",
                          children: [
                            (0, e.jsxs)("div", {
                              className: "col-span-2",
                              children: [
                                (0, e.jsxs)("div", {
                                  className: "flex items-center mb-4",
                                  children: [
                                    (0, e.jsx)("img", {
                                      src: "/lovable-uploads/2832d142-026e-456c-88e4-dbacf37c22e7.png",
                                      alt: "AdGo Logo",
                                      className: "h-8 w-auto mr-2",
                                    }),
                                    (0, e.jsx)("span", {
                                      className:
                                        "text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                                      children: "AdGo",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)("p", {
                                  className: "text-muted-foreground mb-4",
                                  children:
                                    "The future of hyper-targeted advertising. Reach your ideal customers with AI-powered precision.",
                                }),
                                (0, e.jsxs)("div", {
                                  className: "flex space-x-4",
                                  children: [
                                    (0, e.jsx)(h.$, {
                                      variant: "outline",
                                      size: "sm",
                                      children: "Twitter",
                                    }),
                                    (0, e.jsx)(h.$, {
                                      variant: "outline",
                                      size: "sm",
                                      children: "LinkedIn",
                                    }),
                                    (0, e.jsx)(h.$, {
                                      variant: "outline",
                                      size: "sm",
                                      children: "GitHub",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("div", {
                              children: [
                                (0, e.jsx)("h3", {
                                  className: "font-semibold mb-4 text-primary",
                                  children: "Product",
                                }),
                                (0, e.jsxs)("ul", {
                                  className:
                                    "space-y-2 text-sm text-muted-foreground",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children: (0, e.jsx)("a", {
                                        href: "#",
                                        className:
                                          "hover:text-primary transition-colors",
                                        children: "Features",
                                      }),
                                    }),
                                    (0, e.jsx)("li", {
                                      children: (0, e.jsx)("a", {
                                        href: "#",
                                        className:
                                          "hover:text-primary transition-colors",
                                        children: "Pricing",
                                      }),
                                    }),
                                    (0, e.jsx)("li", {
                                      children: (0, e.jsx)("a", {
                                        href: "#",
                                        className:
                                          "hover:text-primary transition-colors",
                                        children: "Demo",
                                      }),
                                    }),
                                    (0, e.jsx)("li", {
                                      children: (0, e.jsx)("a", {
                                        href: "#",
                                        className:
                                          "hover:text-primary transition-colors",
                                        children: "API",
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("div", {
                              children: [
                                (0, e.jsx)("h3", {
                                  className: "font-semibold mb-4 text-primary",
                                  children: "Company",
                                }),
                                (0, e.jsxs)("ul", {
                                  className:
                                    "space-y-2 text-sm text-muted-foreground",
                                  children: [
                                    (0, e.jsx)("li", {
                                      children: (0, e.jsx)("a", {
                                        href: "#",
                                        className:
                                          "hover:text-primary transition-colors",
                                        children: "About",
                                      }),
                                    }),
                                    (0, e.jsx)("li", {
                                      children: (0, e.jsx)("a", {
                                        href: "#",
                                        className:
                                          "hover:text-primary transition-colors",
                                        children: "Blog",
                                      }),
                                    }),
                                    (0, e.jsx)("li", {
                                      children: (0, e.jsx)("a", {
                                        href: "#",
                                        className:
                                          "hover:text-primary transition-colors",
                                        children: "Careers",
                                      }),
                                    }),
                                    (0, e.jsx)("li", {
                                      children: (0, e.jsx)("a", {
                                        href: "#",
                                        className:
                                          "hover:text-primary transition-colors",
                                        children: "Contact",
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, e.jsx)("div", {
                          className:
                            "border-t mt-12 pt-8 text-center text-sm text-muted-foreground",
                          children: (0, e.jsx)("p", {
                            children:
                              "\xa9 2025 AdGo Solutions Limited. All rights reserved. Built with precision, powered by AI.",
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              });
            };
            async function q() {
              return {
                props: { timestamp: new Date().toISOString() },
                revalidate: 86400,
              };
            }
            d();
          } catch (a) {
            d(a);
          }
        });
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
      8879: (a, b, c) => {
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
              k = c(7997),
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
                  page: "/landing",
                  pathname: "/landing",
                  bundlePath: "",
                  filename: "",
                },
                distDir: ".next",
                relativeProjectDir: "",
                components: { App: j.default, Document: i() },
                userland: k,
              }),
              z = (0, l.U)({
                srcPage: "/landing",
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
      9953: (a) => {
        a.exports = import("@radix-ui/react-radio-group");
      },
    }));
  var b = require("../webpack-runtime.js");
  b.C(a);
  var c = b.X(0, [2631, 3317, 5781, 4233, 1690], () => b((b.s = 8879)));
  module.exports = c;
})();
