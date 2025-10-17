"use strict";
(() => {
  var a = {};
  ((a.id = 6695),
    (a.ids = [636, 3220, 6695]),
    (a.modules = {
      361: (a) => {
        a.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
      },
      411: (a) => {
        a.exports = require("@supabase/auth-js");
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
      1415: (a) => {
        a.exports = import("sonner");
      },
      2015: (a) => {
        a.exports = require("react");
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
      3427: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            (c.r(b), c.d(b, { default: () => n, getStaticProps: () => m }));
            var e = c(8732),
              f = c(2015),
              g = c(1339),
              h = c(2885),
              i = c(3929),
              j = c(1302),
              k = c(1415),
              l = a([g, h, i, k]);
            [g, h, i, k] = l.then ? (await l)() : l;
            let n = () => {
              let [a, b] = (0, f.useState)(""),
                [c, d] = (0, f.useState)(!1);
              return (0, e.jsx)("div", {
                className:
                  "min-h-screen bg-gradient-to-br from-background via-login-bg to-background flex items-center justify-center p-4",
                children: (0, e.jsxs)("div", {
                  className: "w-full max-w-4xl",
                  children: [
                    (0, e.jsxs)("div", {
                      className: "text-center mb-12",
                      children: [
                        (0, e.jsx)("img", {
                          src: "/lovable-uploads/2832d142-026e-456c-88e4-dbacf37c22e7.png",
                          alt: "Adgo Logo",
                          className: "h-16 w-auto mx-auto mb-8",
                        }),
                        (0, e.jsxs)("h1", {
                          className: "text-5xl font-bold mb-4",
                          children: [
                            "The Future of",
                            " ",
                            (0, e.jsx)("span", {
                              className:
                                "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
                              children: "Ad Management",
                            }),
                            " ",
                            "is Coming",
                          ],
                        }),
                        (0, e.jsx)("p", {
                          className:
                            "text-xl text-muted-foreground max-w-2xl mx-auto",
                          children:
                            "We're building the most powerful advertising platform to help businesses craft data-driven strategies that turn clicks into customers.",
                        }),
                      ],
                    }),
                    (0, e.jsxs)("div", {
                      className: "grid md:grid-cols-2 gap-8 items-center",
                      children: [
                        (0, e.jsx)("div", {
                          children: (0, e.jsxs)(h.Zp, {
                            className:
                              "border-0 shadow-lg bg-white/80 backdrop-blur",
                            children: [
                              (0, e.jsxs)(h.aR, {
                                className: "text-center",
                                children: [
                                  (0, e.jsx)(h.ZB, {
                                    className: "text-2xl",
                                    children: "Join the Waitlist",
                                  }),
                                  (0, e.jsx)(h.BT, {
                                    children:
                                      "Be among the first to experience the next generation of ad management",
                                  }),
                                ],
                              }),
                              (0, e.jsx)(h.Wu, {
                                children: c
                                  ? (0, e.jsxs)("div", {
                                      className: "text-center space-y-4",
                                      children: [
                                        (0, e.jsx)(j.rAV, {
                                          className:
                                            "h-16 w-16 text-primary mx-auto",
                                        }),
                                        (0, e.jsx)("h3", {
                                          className: "text-xl font-semibold",
                                          children: "You're on the list!",
                                        }),
                                        (0, e.jsx)("p", {
                                          className: "text-muted-foreground",
                                          children:
                                            "We'll notify you as soon as Adgo is ready to transform your advertising.",
                                        }),
                                      ],
                                    })
                                  : (0, e.jsxs)("form", {
                                      onSubmit: (c) => {
                                        (c.preventDefault(),
                                          a &&
                                            (d(!0),
                                            k.toast.success(
                                              "Thanks for joining! We'll notify you when we launch.",
                                            ),
                                            b("")));
                                      },
                                      className: "space-y-4",
                                      children: [
                                        (0, e.jsx)(i.p, {
                                          type: "email",
                                          placeholder:
                                            "Enter your email address",
                                          value: a,
                                          onChange: (a) => b(a.target.value),
                                          required: !0,
                                          className: "h-12 text-center",
                                        }),
                                        (0, e.jsxs)(g.$, {
                                          type: "submit",
                                          className: "w-full h-12 text-lg",
                                          children: [
                                            (0, e.jsx)(j.f36, {
                                              className: "mr-2 h-5 w-5",
                                            }),
                                            "Join Waitlist",
                                          ],
                                        }),
                                      ],
                                    }),
                              }),
                            ],
                          }),
                        }),
                        (0, e.jsxs)("div", {
                          className: "space-y-6",
                          children: [
                            (0, e.jsxs)("div", {
                              className: "flex items-start space-x-4",
                              children: [
                                (0, e.jsx)(j.KqI, {
                                  className:
                                    "h-8 w-8 text-primary flex-shrink-0 mt-1",
                                }),
                                (0, e.jsxs)("div", {
                                  children: [
                                    (0, e.jsx)("h3", {
                                      className: "font-semibold text-lg mb-2",
                                      children: "Lightning-Fast Campaigns",
                                    }),
                                    (0, e.jsx)("p", {
                                      className: "text-muted-foreground",
                                      children:
                                        "Launch and optimize campaigns in minutes, not hours. Our intelligent automation handles the heavy lifting while you focus on strategy.",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("div", {
                              className: "flex items-start space-x-4",
                              children: [
                                (0, e.jsx)(j.ekZ, {
                                  className:
                                    "h-8 w-8 text-primary flex-shrink-0 mt-1",
                                }),
                                (0, e.jsxs)("div", {
                                  children: [
                                    (0, e.jsx)("h3", {
                                      className: "font-semibold text-lg mb-2",
                                      children: "Enterprise-Grade Security",
                                    }),
                                    (0, e.jsx)("p", {
                                      className: "text-muted-foreground",
                                      children:
                                        "Your data is protected with bank-level security. SOC 2 compliant with end-to-end encryption for complete peace of mind.",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)("div", {
                              className: "flex items-start space-x-4",
                              children: [
                                (0, e.jsx)(j.rAV, {
                                  className:
                                    "h-8 w-8 text-primary flex-shrink-0 mt-1",
                                }),
                                (0, e.jsxs)("div", {
                                  children: [
                                    (0, e.jsx)("h3", {
                                      className: "font-semibold text-lg mb-2",
                                      children: "Proven Results",
                                    }),
                                    (0, e.jsx)("p", {
                                      className: "text-muted-foreground",
                                      children:
                                        "Our beta users have seen an average 40% increase in ROI and 60% reduction in campaign management time.",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, e.jsxs)("div", {
                      className: "text-center mt-16",
                      children: [
                        (0, e.jsx)("p", {
                          className: "text-sm text-muted-foreground mb-4",
                          children:
                            "Have questions? We'd love to hear from you.",
                        }),
                        (0, e.jsx)(g.$, {
                          variant: "outline",
                          children: (0, e.jsx)("a", {
                            href: "mailto:hello@adgo.solutions",
                            children: "Contact Us",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              });
            };
            async function m() {
              return { props: {}, revalidate: 3600 };
            }
            d();
          } catch (a) {
            d(a);
          }
        });
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
      5292: (a, b, c) => {
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
              k = c(3427),
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
                  page: "/waitlist",
                  pathname: "/waitlist",
                  bundlePath: "",
                  filename: "",
                },
                distDir: ".next",
                relativeProjectDir: "",
                components: { App: j.default, Document: i() },
                userland: k,
              }),
              z = (0, l.U)({
                srcPage: "/waitlist",
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
  var c = b.X(0, [2631, 3317, 5781, 1690], () => b((b.s = 5292)));
  module.exports = c;
})();
