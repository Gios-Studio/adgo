"use strict";
(() => {
  var a = {};
  ((a.id = 6548),
    (a.ids = [636, 3220, 6548]),
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
      699: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, {
              Cf: () => o,
              L3: () => q,
              c7: () => p,
              lG: () => k,
              rr: () => r,
              zM: () => l,
            });
            var e = c(8732),
              f = c(2015),
              g = c(3020),
              h = c(1302),
              i = c(3894),
              j = a([g, i]);
            [g, i] = j.then ? (await j)() : j;
            let k = g.Root,
              l = g.Trigger,
              m = g.Portal;
            g.Close;
            let n = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)(g.Overlay, {
                ref: c,
                className: (0, i.cn)(
                  "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                  a,
                ),
                ...b,
              }),
            );
            n.displayName = g.Overlay.displayName;
            let o = f.forwardRef(({ className: a, children: b, ...c }, d) =>
              (0, e.jsxs)(m, {
                children: [
                  (0, e.jsx)(n, {}),
                  (0, e.jsxs)(g.Content, {
                    ref: d,
                    className: (0, i.cn)(
                      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                      a,
                    ),
                    ...c,
                    children: [
                      b,
                      (0, e.jsxs)(g.Close, {
                        className:
                          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                        children: [
                          (0, e.jsx)(h.X, { className: "h-4 w-4" }),
                          (0, e.jsx)("span", {
                            className: "sr-only",
                            children: "Close",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            );
            o.displayName = g.Content.displayName;
            let p = ({ className: a, ...b }) =>
              (0, e.jsx)("div", {
                className: (0, i.cn)(
                  "flex flex-col space-y-1.5 text-center sm:text-left",
                  a,
                ),
                ...b,
              });
            p.displayName = "DialogHeader";
            let q = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)(g.Title, {
                ref: c,
                className: (0, i.cn)(
                  "text-lg font-semibold leading-none tracking-tight",
                  a,
                ),
                ...b,
              }),
            );
            q.displayName = g.Title.displayName;
            let r = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)(g.Description, {
                ref: c,
                className: (0, i.cn)("text-sm text-muted-foreground", a),
                ...b,
              }),
            );
            ((r.displayName = g.Description.displayName), d());
          } catch (a) {
            d(a);
          }
        });
      },
      701: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, {
              A0: () => j,
              BF: () => k,
              Hj: () => l,
              XI: () => i,
              nA: () => n,
              nd: () => m,
            });
            var e = c(8732),
              f = c(2015),
              g = c(3894),
              h = a([g]);
            g = (h.then ? (await h)() : h)[0];
            let i = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("div", {
                className: "relative w-full overflow-auto",
                children: (0, e.jsx)("table", {
                  ref: c,
                  className: (0, g.cn)("w-full caption-bottom text-sm", a),
                  ...b,
                }),
              }),
            );
            i.displayName = "Table";
            let j = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("thead", {
                ref: c,
                className: (0, g.cn)("[&_tr]:border-b", a),
                ...b,
              }),
            );
            j.displayName = "TableHeader";
            let k = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("tbody", {
                ref: c,
                className: (0, g.cn)("[&_tr:last-child]:border-0", a),
                ...b,
              }),
            );
            ((k.displayName = "TableBody"),
              (f.forwardRef(({ className: a, ...b }, c) =>
                (0, e.jsx)("tfoot", {
                  ref: c,
                  className: (0, g.cn)(
                    "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
                    a,
                  ),
                  ...b,
                }),
              ).displayName = "TableFooter"));
            let l = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("tr", {
                ref: c,
                className: (0, g.cn)(
                  "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                  a,
                ),
                ...b,
              }),
            );
            l.displayName = "TableRow";
            let m = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("th", {
                ref: c,
                className: (0, g.cn)(
                  "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
                  a,
                ),
                ...b,
              }),
            );
            m.displayName = "TableHead";
            let n = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("td", {
                ref: c,
                className: (0, g.cn)(
                  "p-4 align-middle [&:has([role=checkbox])]:pr-0",
                  a,
                ),
                ...b,
              }),
            );
            ((n.displayName = "TableCell"),
              (f.forwardRef(({ className: a, ...b }, c) =>
                (0, e.jsx)("caption", {
                  ref: c,
                  className: (0, g.cn)("mt-4 text-sm text-muted-foreground", a),
                  ...b,
                }),
              ).displayName = "TableCaption"),
              d());
          } catch (a) {
            d(a);
          }
        });
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
      3020: (a) => {
        a.exports = import("@radix-ui/react-dialog");
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
      4201: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { T: () => i });
            var e = c(8732),
              f = c(2015),
              g = c(3894),
              h = a([g]);
            g = (h.then ? (await h)() : h)[0];
            let i = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("textarea", {
                className: (0, g.cn)(
                  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  a,
                ),
                ref: c,
                ...b,
              }),
            );
            ((i.displayName = "Textarea"), d());
          } catch (a) {
            d(a);
          }
        });
      },
      4719: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, {
              bq: () => m,
              eb: () => q,
              gC: () => p,
              l6: () => k,
              yv: () => l,
            });
            var e = c(8732),
              f = c(2015),
              g = c(7860),
              h = c(1302),
              i = c(3894),
              j = a([g, i]);
            [g, i] = j.then ? (await j)() : j;
            let k = g.Root;
            g.Group;
            let l = g.Value,
              m = f.forwardRef(({ className: a, children: b, ...c }, d) =>
                (0, e.jsxs)(g.Trigger, {
                  ref: d,
                  className: (0, i.cn)(
                    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
                    a,
                  ),
                  ...c,
                  children: [
                    b,
                    (0, e.jsx)(g.Icon, {
                      asChild: !0,
                      children: (0, e.jsx)(h.yQN, {
                        className: "h-4 w-4 opacity-50",
                      }),
                    }),
                  ],
                }),
              );
            m.displayName = g.Trigger.displayName;
            let n = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)(g.ScrollUpButton, {
                ref: c,
                className: (0, i.cn)(
                  "flex cursor-default items-center justify-center py-1",
                  a,
                ),
                ...b,
                children: (0, e.jsx)(h.rXn, { className: "h-4 w-4" }),
              }),
            );
            n.displayName = g.ScrollUpButton.displayName;
            let o = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)(g.ScrollDownButton, {
                ref: c,
                className: (0, i.cn)(
                  "flex cursor-default items-center justify-center py-1",
                  a,
                ),
                ...b,
                children: (0, e.jsx)(h.yQN, { className: "h-4 w-4" }),
              }),
            );
            o.displayName = g.ScrollDownButton.displayName;
            let p = f.forwardRef(
              (
                { className: a, children: b, position: c = "popper", ...d },
                f,
              ) =>
                (0, e.jsx)(g.Portal, {
                  children: (0, e.jsxs)(g.Content, {
                    ref: f,
                    className: (0, i.cn)(
                      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                      "popper" === c &&
                        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
                      a,
                    ),
                    position: c,
                    ...d,
                    children: [
                      (0, e.jsx)(n, {}),
                      (0, e.jsx)(g.Viewport, {
                        className: (0, i.cn)(
                          "p-1",
                          "popper" === c &&
                            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                        ),
                        children: b,
                      }),
                      (0, e.jsx)(o, {}),
                    ],
                  }),
                }),
            );
            ((p.displayName = g.Content.displayName),
              (f.forwardRef(({ className: a, ...b }, c) =>
                (0, e.jsx)(g.Label, {
                  ref: c,
                  className: (0, i.cn)(
                    "py-1.5 pl-8 pr-2 text-sm font-semibold",
                    a,
                  ),
                  ...b,
                }),
              ).displayName = g.Label.displayName));
            let q = f.forwardRef(({ className: a, children: b, ...c }, d) =>
              (0, e.jsxs)(g.Item, {
                ref: d,
                className: (0, i.cn)(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  a,
                ),
                ...c,
                children: [
                  (0, e.jsx)("span", {
                    className:
                      "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                    children: (0, e.jsx)(g.ItemIndicator, {
                      children: (0, e.jsx)(h.Jlk, { className: "h-4 w-4" }),
                    }),
                  }),
                  (0, e.jsx)(g.ItemText, { children: b }),
                ],
              }),
            );
            ((q.displayName = g.Item.displayName),
              (f.forwardRef(({ className: a, ...b }, c) =>
                (0, e.jsx)(g.Separator, {
                  ref: c,
                  className: (0, i.cn)("-mx-1 my-1 h-px bg-muted", a),
                  ...b,
                }),
              ).displayName = g.Separator.displayName),
              d());
          } catch (a) {
            d(a);
          }
        });
      },
      4835: (a, b, c) => {
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
              k = c(6994),
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
                  page: "/admin/review",
                  pathname: "/admin/review",
                  bundlePath: "",
                  filename: "",
                },
                distDir: ".next",
                relativeProjectDir: "",
                components: { App: j.default, Document: i() },
                userland: k,
              }),
              z = (0, l.U)({
                srcPage: "/admin/review",
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
      6994: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            (c.r(b), c.d(b, { default: () => u, getStaticProps: () => v }));
            var e = c(8732),
              f = c(2015),
              g = c(9481),
              h = c(1339),
              i = c(2885),
              j = c(1354),
              k = c(3929),
              l = c(5471),
              m = c(4201),
              n = c(701),
              o = c(699),
              p = c(4719),
              q = c(1302),
              r = c(2893),
              s = c(9825),
              t = a([h, i, j, k, l, m, n, o, p, r]);
            function u() {
              let [a, b] = (0, f.useState)([]),
                [c, d] = (0, f.useState)(!0),
                [t, u] = (0, f.useState)(""),
                [v, w] = (0, f.useState)("all"),
                [x, y] = (0, f.useState)(null),
                [z, A] = (0, f.useState)(""),
                [B, C] = (0, f.useState)(null),
                D = async () => {
                  try {
                    d(!0);
                    let a = g.N.from("ads")
                      .select(
                        `
          *,
          advertiser:profiles!advertiser_id(email, full_name),
          campaign:campaigns!campaign_id(name, budget)
        `,
                      )
                      .order("created_at", { ascending: !1 });
                    "all" !== v && (a = a.eq("status", v));
                    let { data: c, error: e } = await a;
                    if (e) throw e;
                    b(c || []);
                  } catch (a) {
                    (console.error("Error fetching ads:", a),
                      r.toast.error("Failed to load ads"));
                  } finally {
                    d(!1);
                  }
                },
                E = async (a) => {
                  try {
                    let { data: b, error: c } = await g.N.functions.invoke(
                      "moderate-ad",
                      {
                        body: {
                          adId: a.id,
                          title: a.title,
                          description: a.description,
                          mediaUrl: a.media_url,
                        },
                      },
                    );
                    if (c) throw c;
                    return b;
                  } catch (b) {
                    return (console.error("Moderation error:", b), F(a));
                  }
                },
                F = (a) => {
                  let b = `${a.title} ${a.description}`.toLowerCase(),
                    c = [
                      "scam",
                      "fraud",
                      "fake",
                      "illegal",
                      "drugs",
                      "weapons",
                      "violence",
                      "hate",
                      "discrimination",
                      "nsfw",
                      "adult",
                      "gambling",
                      "bitcoin",
                      "cryptocurrency",
                      "get rich quick",
                      "miracle cure",
                    ].filter((a) => b.includes(a));
                  return {
                    flagged: c.length > 0,
                    categories: c,
                    category_scores: {},
                    confidence: c.length > 0 ? 0.8 : 0.1,
                    reasons:
                      c.length > 0
                        ? [`Contains prohibited keywords: ${c.join(", ")}`]
                        : [],
                  };
                },
                G = async (a) => {
                  try {
                    C(a);
                    let { error: b } = await g.N.from("ads")
                      .update({
                        status: "approved",
                        moderation_score: 0.1,
                        updated_at: new Date().toISOString(),
                      })
                      .eq("id", a);
                    if (b) throw b;
                    (await g.N.from("ad_moderation").insert({
                      ad_id: a,
                      action: "approved",
                      moderator_id: (await g.N.auth.getUser()).data.user?.id,
                      reason: "Manually approved by admin",
                      created_at: new Date().toISOString(),
                    }),
                      r.toast.success("Ad approved successfully"),
                      D());
                  } catch (a) {
                    (console.error("Error approving ad:", a),
                      r.toast.error("Failed to approve ad"));
                  } finally {
                    C(null);
                  }
                },
                H = async (a, b) => {
                  try {
                    C(a);
                    let { error: c } = await g.N.from("ads")
                      .update({
                        status: "rejected",
                        rejection_reason: b,
                        updated_at: new Date().toISOString(),
                      })
                      .eq("id", a);
                    if (c) throw c;
                    (await g.N.from("ad_moderation").insert({
                      ad_id: a,
                      action: "rejected",
                      moderator_id: (await g.N.auth.getUser()).data.user?.id,
                      reason: b,
                      created_at: new Date().toISOString(),
                    }),
                      r.toast.success("Ad rejected"),
                      A(""),
                      D());
                  } catch (a) {
                    (console.error("Error rejecting ad:", a),
                      r.toast.error("Failed to reject ad"));
                  } finally {
                    C(null);
                  }
                },
                I = async (b) => {
                  try {
                    C(b);
                    let c = a.find((a) => a.id === b);
                    if (!c) return;
                    let d = await E(c),
                      { error: e } = await g.N.from("ads")
                        .update({
                          status: d.flagged ? "flagged" : "pending_review",
                          moderation_score: d.confidence,
                          updated_at: new Date().toISOString(),
                        })
                        .eq("id", b);
                    if (e) throw e;
                    (await g.N.from("ad_moderation").insert({
                      ad_id: b,
                      action: d.flagged ? "flagged" : "ai_reviewed",
                      moderator_id: (await g.N.auth.getUser()).data.user?.id,
                      reason: d.reasons.join("; "),
                      ai_confidence: d.confidence,
                      ai_categories: d.categories,
                      created_at: new Date().toISOString(),
                    }),
                      r.toast.success(
                        d.flagged
                          ? `Ad flagged: ${d.reasons.join(", ")}`
                          : "Ad passed AI review",
                      ),
                      D());
                  } catch (a) {
                    (console.error("Error flagging ad:", a),
                      r.toast.error("Failed to run AI moderation"));
                  } finally {
                    C(null);
                  }
                },
                J = a.filter(
                  (a) =>
                    !t ||
                    a.title.toLowerCase().includes(t.toLowerCase()) ||
                    a.description.toLowerCase().includes(t.toLowerCase()) ||
                    a.advertiser?.email.toLowerCase().includes(t.toLowerCase()),
                );
              return (0, e.jsx)("div", {
                className: "min-h-screen bg-gray-50 py-8",
                children: (0, e.jsxs)("div", {
                  className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                  children: [
                    (0, e.jsxs)("div", {
                      className: "mb-8",
                      children: [
                        (0, e.jsxs)("h1", {
                          className:
                            "text-3xl font-bold text-gray-900 flex items-center gap-2",
                          children: [
                            (0, e.jsx)(q.ekZ, { className: "h-8 w-8" }),
                            "Ad Review & Moderation",
                          ],
                        }),
                        (0, e.jsx)("p", {
                          className: "text-gray-600 mt-2",
                          children:
                            "Review submitted ads and manage content moderation",
                        }),
                      ],
                    }),
                    (0, e.jsx)(i.Zp, {
                      className: "mb-6",
                      children: (0, e.jsx)(i.Wu, {
                        className: "pt-6",
                        children: (0, e.jsxs)("div", {
                          className: "flex flex-col sm:flex-row gap-4",
                          children: [
                            (0, e.jsx)("div", {
                              className: "flex-1",
                              children: (0, e.jsxs)("div", {
                                className: "relative",
                                children: [
                                  (0, e.jsx)(q.vji, {
                                    className:
                                      "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4",
                                  }),
                                  (0, e.jsx)(k.p, {
                                    placeholder: "Search ads, advertisers...",
                                    value: t,
                                    onChange: (a) => u(a.target.value),
                                    className: "pl-10",
                                  }),
                                ],
                              }),
                            }),
                            (0, e.jsxs)(p.l6, {
                              value: v,
                              onValueChange: w,
                              children: [
                                (0, e.jsxs)(p.bq, {
                                  className: "w-48",
                                  children: [
                                    (0, e.jsx)(q.dJT, {
                                      className: "h-4 w-4 mr-2",
                                    }),
                                    (0, e.jsx)(p.yv, {}),
                                  ],
                                }),
                                (0, e.jsxs)(p.gC, {
                                  children: [
                                    (0, e.jsx)(p.eb, {
                                      value: "all",
                                      children: "All Status",
                                    }),
                                    (0, e.jsx)(p.eb, {
                                      value: "pending_review",
                                      children: "Pending Review",
                                    }),
                                    (0, e.jsx)(p.eb, {
                                      value: "approved",
                                      children: "Approved",
                                    }),
                                    (0, e.jsx)(p.eb, {
                                      value: "rejected",
                                      children: "Rejected",
                                    }),
                                    (0, e.jsx)(p.eb, {
                                      value: "flagged",
                                      children: "Flagged",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, e.jsxs)(h.$, {
                              onClick: D,
                              variant: "outline",
                              children: [
                                (0, e.jsx)(q.e9t, {
                                  className: "h-4 w-4 mr-2",
                                }),
                                "Refresh",
                              ],
                            }),
                          ],
                        }),
                      }),
                    }),
                    (0, e.jsxs)("div", {
                      className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6",
                      children: [
                        (0, e.jsx)(i.Zp, {
                          children: (0, e.jsx)(i.Wu, {
                            className: "pt-4",
                            children: (0, e.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, e.jsxs)("div", {
                                  children: [
                                    (0, e.jsx)("p", {
                                      className: "text-sm text-gray-500",
                                      children: "Pending Review",
                                    }),
                                    (0, e.jsx)("p", {
                                      className: "text-2xl font-bold",
                                      children: a.filter(
                                        (a) => "pending_review" === a.status,
                                      ).length,
                                    }),
                                  ],
                                }),
                                (0, e.jsx)(q.hcu, {
                                  className: "h-8 w-8 text-yellow-500",
                                }),
                              ],
                            }),
                          }),
                        }),
                        (0, e.jsx)(i.Zp, {
                          children: (0, e.jsx)(i.Wu, {
                            className: "pt-4",
                            children: (0, e.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, e.jsxs)("div", {
                                  children: [
                                    (0, e.jsx)("p", {
                                      className: "text-sm text-gray-500",
                                      children: "Approved Today",
                                    }),
                                    (0, e.jsx)("p", {
                                      className:
                                        "text-2xl font-bold text-green-600",
                                      children: a.filter(
                                        (a) =>
                                          "approved" === a.status &&
                                          new Date(
                                            a.created_at,
                                          ).toDateString() ===
                                            new Date().toDateString(),
                                      ).length,
                                    }),
                                  ],
                                }),
                                (0, e.jsx)(q.Jlk, {
                                  className: "h-8 w-8 text-green-500",
                                }),
                              ],
                            }),
                          }),
                        }),
                        (0, e.jsx)(i.Zp, {
                          children: (0, e.jsx)(i.Wu, {
                            className: "pt-4",
                            children: (0, e.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, e.jsxs)("div", {
                                  children: [
                                    (0, e.jsx)("p", {
                                      className: "text-sm text-gray-500",
                                      children: "Flagged",
                                    }),
                                    (0, e.jsx)("p", {
                                      className:
                                        "text-2xl font-bold text-red-600",
                                      children: a.filter(
                                        (a) => "flagged" === a.status,
                                      ).length,
                                    }),
                                  ],
                                }),
                                (0, e.jsx)(q.lNU, {
                                  className: "h-8 w-8 text-red-500",
                                }),
                              ],
                            }),
                          }),
                        }),
                        (0, e.jsx)(i.Zp, {
                          children: (0, e.jsx)(i.Wu, {
                            className: "pt-4",
                            children: (0, e.jsxs)("div", {
                              className: "flex items-center justify-between",
                              children: [
                                (0, e.jsxs)("div", {
                                  children: [
                                    (0, e.jsx)("p", {
                                      className: "text-sm text-gray-500",
                                      children: "Total Ads",
                                    }),
                                    (0, e.jsx)("p", {
                                      className: "text-2xl font-bold",
                                      children: a.length,
                                    }),
                                  ],
                                }),
                                (0, e.jsx)(q.ekZ, {
                                  className: "h-8 w-8 text-blue-500",
                                }),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                    (0, e.jsxs)(i.Zp, {
                      children: [
                        (0, e.jsx)(i.aR, {
                          children: (0, e.jsxs)(i.ZB, {
                            children: ["Submitted Ads (", J.length, ")"],
                          }),
                        }),
                        (0, e.jsxs)(i.Wu, {
                          children: [
                            c
                              ? (0, e.jsx)("div", {
                                  className: "text-center py-8",
                                  children: "Loading ads...",
                                })
                              : (0, e.jsxs)(n.XI, {
                                  children: [
                                    (0, e.jsx)(n.A0, {
                                      children: (0, e.jsxs)(n.Hj, {
                                        children: [
                                          (0, e.jsx)(n.nd, {
                                            children: "Ad Details",
                                          }),
                                          (0, e.jsx)(n.nd, {
                                            children: "Advertiser",
                                          }),
                                          (0, e.jsx)(n.nd, {
                                            children: "Status",
                                          }),
                                          (0, e.jsx)(n.nd, {
                                            children: "Submitted",
                                          }),
                                          (0, e.jsx)(n.nd, {
                                            children: "Actions",
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, e.jsx)(n.BF, {
                                      children: J.map((a) =>
                                        (0, e.jsxs)(
                                          n.Hj,
                                          {
                                            children: [
                                              (0, e.jsx)(n.nA, {
                                                children: (0, e.jsxs)("div", {
                                                  className:
                                                    "flex items-start gap-3",
                                                  children: [
                                                    (0, e.jsx)("div", {
                                                      className:
                                                        "flex-shrink-0",
                                                      children: ((a) => {
                                                        switch (a) {
                                                          case "image":
                                                            return (0, e.jsx)(
                                                              q._V3,
                                                              {
                                                                className:
                                                                  "h-4 w-4",
                                                              },
                                                            );
                                                          case "video":
                                                            return (0, e.jsx)(
                                                              q.CeX,
                                                              {
                                                                className:
                                                                  "h-4 w-4",
                                                              },
                                                            );
                                                          default:
                                                            return (0, e.jsx)(
                                                              q.iUU,
                                                              {
                                                                className:
                                                                  "h-4 w-4",
                                                              },
                                                            );
                                                        }
                                                      })(a.media_type),
                                                    }),
                                                    (0, e.jsxs)("div", {
                                                      children: [
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "font-medium",
                                                          children: a.title,
                                                        }),
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-sm text-gray-500 line-clamp-2",
                                                          children:
                                                            a.description,
                                                        }),
                                                        a.campaign &&
                                                          (0, e.jsxs)("p", {
                                                            className:
                                                              "text-xs text-blue-600 mt-1",
                                                            children: [
                                                              "Campaign: ",
                                                              a.campaign.name,
                                                              " ($",
                                                              a.campaign.budget,
                                                              ")",
                                                            ],
                                                          }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              }),
                                              (0, e.jsx)(n.nA, {
                                                children: (0, e.jsxs)("div", {
                                                  children: [
                                                    (0, e.jsx)("p", {
                                                      className: "font-medium",
                                                      children:
                                                        a.advertiser
                                                          ?.full_name ||
                                                        "Unknown",
                                                    }),
                                                    (0, e.jsx)("p", {
                                                      className:
                                                        "text-sm text-gray-500",
                                                      children:
                                                        a.advertiser?.email,
                                                    }),
                                                  ],
                                                }),
                                              }),
                                              (0, e.jsxs)(n.nA, {
                                                children: [
                                                  ((a) => {
                                                    switch (a) {
                                                      case "pending_review":
                                                        return (0, e.jsx)(j.E, {
                                                          variant: "outline",
                                                          className:
                                                            "text-yellow-600",
                                                          children:
                                                            "Pending Review",
                                                        });
                                                      case "approved":
                                                        return (0, e.jsx)(j.E, {
                                                          variant: "default",
                                                          className:
                                                            "bg-green-600",
                                                          children: "Approved",
                                                        });
                                                      case "rejected":
                                                        return (0, e.jsx)(j.E, {
                                                          variant:
                                                            "destructive",
                                                          children: "Rejected",
                                                        });
                                                      case "flagged":
                                                        return (0, e.jsx)(j.E, {
                                                          variant:
                                                            "destructive",
                                                          className:
                                                            "bg-orange-600",
                                                          children: "Flagged",
                                                        });
                                                      default:
                                                        return (0, e.jsx)(j.E, {
                                                          variant: "outline",
                                                          children: a,
                                                        });
                                                    }
                                                  })(a.status),
                                                  a.moderation_score &&
                                                    (0, e.jsxs)("p", {
                                                      className:
                                                        "text-xs text-gray-500 mt-1",
                                                      children: [
                                                        "AI Score: ",
                                                        Math.round(
                                                          100 *
                                                            a.moderation_score,
                                                        ),
                                                        "%",
                                                      ],
                                                    }),
                                                ],
                                              }),
                                              (0, e.jsx)(n.nA, {
                                                children: (0, e.jsxs)("div", {
                                                  className:
                                                    "flex items-center gap-1 text-sm text-gray-500",
                                                  children: [
                                                    (0, e.jsx)(q.VvS, {
                                                      className: "h-3 w-3",
                                                    }),
                                                    (0, s.GP)(
                                                      new Date(a.created_at),
                                                      "MMM d, HH:mm",
                                                    ),
                                                  ],
                                                }),
                                              }),
                                              (0, e.jsx)(n.nA, {
                                                children: (0, e.jsxs)("div", {
                                                  className:
                                                    "flex items-center gap-2",
                                                  children: [
                                                    (0, e.jsxs)(o.lG, {
                                                      children: [
                                                        (0, e.jsx)(o.zM, {
                                                          asChild: !0,
                                                          children: (0, e.jsx)(
                                                            h.$,
                                                            {
                                                              variant:
                                                                "outline",
                                                              size: "sm",
                                                              onClick: () =>
                                                                y(a),
                                                              children: (0,
                                                              e.jsx)(q.kU3, {
                                                                className:
                                                                  "h-4 w-4",
                                                              }),
                                                            },
                                                          ),
                                                        }),
                                                        (0, e.jsxs)(o.Cf, {
                                                          className:
                                                            "max-w-2xl",
                                                          children: [
                                                            (0, e.jsxs)(o.c7, {
                                                              children: [
                                                                (0, e.jsxs)(
                                                                  o.L3,
                                                                  {
                                                                    children: [
                                                                      "Review Ad: ",
                                                                      x?.title,
                                                                    ],
                                                                  },
                                                                ),
                                                                (0, e.jsx)(
                                                                  o.rr,
                                                                  {
                                                                    children:
                                                                      "Review this ad content and take appropriate action",
                                                                  },
                                                                ),
                                                              ],
                                                            }),
                                                            x &&
                                                              (0, e.jsxs)(
                                                                "div",
                                                                {
                                                                  className:
                                                                    "space-y-4",
                                                                  children: [
                                                                    (0, e.jsxs)(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "border rounded-lg p-4",
                                                                        children:
                                                                          [
                                                                            x.media_url &&
                                                                              (0,
                                                                              e.jsx)(
                                                                                "div",
                                                                                {
                                                                                  className:
                                                                                    "mb-4",
                                                                                  children:
                                                                                    "video" ===
                                                                                    x.media_type
                                                                                      ? (0,
                                                                                        e.jsx)(
                                                                                          "video",
                                                                                          {
                                                                                            src: x.media_url,
                                                                                            controls:
                                                                                              !0,
                                                                                            className:
                                                                                              "w-full max-h-64 object-cover rounded",
                                                                                          },
                                                                                        )
                                                                                      : (0,
                                                                                        e.jsx)(
                                                                                          "img",
                                                                                          {
                                                                                            src: x.media_url,
                                                                                            alt: "Ad media",
                                                                                            className:
                                                                                              "w-full max-h-64 object-cover rounded",
                                                                                          },
                                                                                        ),
                                                                                },
                                                                              ),
                                                                            (0,
                                                                            e.jsx)(
                                                                              "h3",
                                                                              {
                                                                                className:
                                                                                  "font-semibold text-lg mb-2",
                                                                                children:
                                                                                  x.title,
                                                                              },
                                                                            ),
                                                                            (0,
                                                                            e.jsx)(
                                                                              "p",
                                                                              {
                                                                                className:
                                                                                  "text-gray-600",
                                                                                children:
                                                                                  x.description,
                                                                              },
                                                                            ),
                                                                          ],
                                                                      },
                                                                    ),
                                                                    "pending_review" ===
                                                                      x.status &&
                                                                      (0,
                                                                      e.jsxs)(
                                                                        "div",
                                                                        {
                                                                          className:
                                                                            "space-y-2",
                                                                          children:
                                                                            [
                                                                              (0,
                                                                              e.jsx)(
                                                                                l.J,
                                                                                {
                                                                                  htmlFor:
                                                                                    "rejection-reason",
                                                                                  children:
                                                                                    "Rejection Reason (if rejecting)",
                                                                                },
                                                                              ),
                                                                              (0,
                                                                              e.jsx)(
                                                                                m.T,
                                                                                {
                                                                                  id: "rejection-reason",
                                                                                  value:
                                                                                    z,
                                                                                  onChange:
                                                                                    (
                                                                                      a,
                                                                                    ) =>
                                                                                      A(
                                                                                        a
                                                                                          .target
                                                                                          .value,
                                                                                      ),
                                                                                  placeholder:
                                                                                    "Enter reason for rejection...",
                                                                                  rows: 3,
                                                                                },
                                                                              ),
                                                                            ],
                                                                        },
                                                                      ),
                                                                    (0, e.jsxs)(
                                                                      "div",
                                                                      {
                                                                        className:
                                                                          "flex gap-2",
                                                                        children:
                                                                          [
                                                                            "pending_review" ===
                                                                              x.status &&
                                                                              (0,
                                                                              e.jsxs)(
                                                                                e.Fragment,
                                                                                {
                                                                                  children:
                                                                                    [
                                                                                      (0,
                                                                                      e.jsxs)(
                                                                                        h.$,
                                                                                        {
                                                                                          onClick:
                                                                                            () =>
                                                                                              G(
                                                                                                x.id,
                                                                                              ),
                                                                                          disabled:
                                                                                            B ===
                                                                                            x.id,
                                                                                          className:
                                                                                            "bg-green-600 hover:bg-green-700",
                                                                                          children:
                                                                                            [
                                                                                              (0,
                                                                                              e.jsx)(
                                                                                                q.Jlk,
                                                                                                {
                                                                                                  className:
                                                                                                    "h-4 w-4 mr-1",
                                                                                                },
                                                                                              ),
                                                                                              "Approve",
                                                                                            ],
                                                                                        },
                                                                                      ),
                                                                                      (0,
                                                                                      e.jsxs)(
                                                                                        h.$,
                                                                                        {
                                                                                          onClick:
                                                                                            () =>
                                                                                              H(
                                                                                                x.id,
                                                                                                z,
                                                                                              ),
                                                                                          disabled:
                                                                                            B ===
                                                                                              x.id ||
                                                                                            !z,
                                                                                          variant:
                                                                                            "destructive",
                                                                                          children:
                                                                                            [
                                                                                              (0,
                                                                                              e.jsx)(
                                                                                                q.X,
                                                                                                {
                                                                                                  className:
                                                                                                    "h-4 w-4 mr-1",
                                                                                                },
                                                                                              ),
                                                                                              "Reject",
                                                                                            ],
                                                                                        },
                                                                                      ),
                                                                                    ],
                                                                                },
                                                                              ),
                                                                            (0,
                                                                            e.jsxs)(
                                                                              h.$,
                                                                              {
                                                                                onClick:
                                                                                  () =>
                                                                                    I(
                                                                                      x.id,
                                                                                    ),
                                                                                disabled:
                                                                                  B ===
                                                                                  x.id,
                                                                                variant:
                                                                                  "outline",
                                                                                children:
                                                                                  [
                                                                                    (0,
                                                                                    e.jsx)(
                                                                                      q.lNU,
                                                                                      {
                                                                                        className:
                                                                                          "h-4 w-4 mr-1",
                                                                                      },
                                                                                    ),
                                                                                    "AI Review",
                                                                                  ],
                                                                              },
                                                                            ),
                                                                          ],
                                                                      },
                                                                    ),
                                                                  ],
                                                                },
                                                              ),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    "pending_review" ===
                                                      a.status &&
                                                      (0, e.jsxs)(e.Fragment, {
                                                        children: [
                                                          (0, e.jsx)(h.$, {
                                                            size: "sm",
                                                            onClick: () =>
                                                              G(a.id),
                                                            disabled:
                                                              B === a.id,
                                                            className:
                                                              "bg-green-600 hover:bg-green-700",
                                                            children: (0,
                                                            e.jsx)(q.Jlk, {
                                                              className:
                                                                "h-3 w-3",
                                                            }),
                                                          }),
                                                          (0, e.jsx)(h.$, {
                                                            size: "sm",
                                                            variant:
                                                              "destructive",
                                                            onClick: () => {
                                                              y(a);
                                                            },
                                                            disabled:
                                                              B === a.id,
                                                            children: (0,
                                                            e.jsx)(q.X, {
                                                              className:
                                                                "h-3 w-3",
                                                            }),
                                                          }),
                                                        ],
                                                      }),
                                                    (0, e.jsx)(h.$, {
                                                      size: "sm",
                                                      variant: "outline",
                                                      onClick: () => I(a.id),
                                                      disabled: B === a.id,
                                                      children: (0, e.jsx)(
                                                        q.lNU,
                                                        {
                                                          className: "h-3 w-3",
                                                        },
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              }),
                                            ],
                                          },
                                          a.id,
                                        ),
                                      ),
                                    }),
                                  ],
                                }),
                            0 === J.length &&
                              !c &&
                              (0, e.jsx)("div", {
                                className: "text-center py-8 text-gray-500",
                                children: "No ads found matching your criteria",
                              }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              });
            }
            async function v() {
              return {
                props: { timestamp: new Date().toISOString() },
                revalidate: 60,
              };
            }
            (([h, i, j, k, l, m, n, o, p, r] = t.then ? (await t)() : t), d());
          } catch (a) {
            d(a);
          }
        });
      },
      7860: (a) => {
        a.exports = import("@radix-ui/react-select");
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
      9481: (a, b, c) => {
        c.d(b, { N: () => e });
        var d = c(938);
        let e = (0, d.createClient)(
          "https://rkonwkggxaohpmxmzmfn.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
        );
        (0, d.createClient)(
          "https://rkonwkggxaohpmxmzmfn.supabase.co",
          process.env.SUPABASE_SERVICE_ROLE_KEY,
          { auth: { persistSession: !1 } },
        );
      },
      9640: (a) => {
        a.exports = import("@radix-ui/react-slot");
      },
      9672: (a) => {
        a.exports = require("@supabase/postgrest-js");
      },
    }));
  var b = require("../../webpack-runtime.js");
  b.C(a);
  var c = b.X(0, [2631, 3317, 5781, 9825, 1690], () => b((b.s = 4835)));
  module.exports = c;
})();
