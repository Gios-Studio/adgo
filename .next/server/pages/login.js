"use strict";
(() => {
  var a = {};
  ((a.id = 8295),
    (a.ids = [636, 3220, 8295]),
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
      6060: (a) => {
        a.exports = require("next/dist/shared/lib/no-fallback-error.external.js");
      },
      6472: (a) => {
        a.exports = require("@opentelemetry/api");
      },
      7143: (a, b, c) => {
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
              k = c(8595),
              l = c(2289),
              m = a([j]);
            j = (m.then ? (await m)() : m)[0];
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
                  page: "/login",
                  pathname: "/login",
                  bundlePath: "",
                  filename: "",
                },
                distDir: ".next",
                relativeProjectDir: "",
                components: { App: j.default, Document: i() },
                userland: k,
              }),
              z = (0, l.U)({
                srcPage: "/login",
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
      7910: (a) => {
        a.exports = require("stream");
      },
      8496: (a) => {
        a.exports = require("@supabase/functions-js");
      },
      8595: (a, b, c) => {
        (c.r(b), c.d(b, { default: () => h, getStaticProps: () => i }));
        var d = c(8732),
          e = c(2015),
          f = c(4233),
          g = c(5288);
        function h() {
          let a = (0, f.useRouter)(),
            [b, c] = (0, e.useState)(""),
            [h, i] = (0, e.useState)(""),
            [j, k] = (0, e.useState)(!1),
            [l, m] = (0, e.useState)(""),
            n = async (c) => {
              (c.preventDefault(), k(!0), m(""));
              try {
                (console.log(
                  "\uD83D\uDD11 Using Supabase URL:",
                  "https://rkonwkggxaohpmxmzmfn.supabase.co",
                ),
                  console.log(
                    "\uD83D\uDD11 Using Supabase Key (first 6 chars):",
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo".slice(
                      0,
                      6,
                    ),
                  ));
                let { data: c, error: d } = await g.N.auth.signInWithPassword({
                  email: b,
                  password: h,
                });
                d
                  ? (console.error("❌ Login error:", d.message), m(d.message))
                  : (console.log("✅ Login successful:", c),
                    a.push("/Dashboard"));
              } catch (a) {
                (console.error("⚠️ Unexpected login error:", a),
                  m("Unexpected error occurred. Check console for details."));
              } finally {
                k(!1);
              }
            },
            o = async () => {
              (k(!0), m(""));
              try {
                let { error: a } = await g.N.auth.signUp({
                  email: b,
                  password: h,
                  options: {
                    emailRedirectTo: `${window.location.origin}/Dashboard`,
                  },
                });
                a
                  ? m(a.message)
                  : alert("Check your inbox to confirm sign-up!");
              } catch (a) {
                (console.error("⚠️ Signup error:", a),
                  m("Unexpected error occurred."));
              } finally {
                k(!1);
              }
            };
          return (0, d.jsx)("div", {
            className:
              "min-h-screen flex items-center justify-center bg-gray-50",
            children: (0, d.jsxs)("form", {
              onSubmit: n,
              className:
                "bg-white p-8 rounded shadow w-full max-w-sm space-y-4",
              children: [
                (0, d.jsx)("h1", {
                  className: "text-2xl font-semibold text-center",
                  children: "AdGo Login",
                }),
                l &&
                  (0, d.jsx)("p", {
                    className: "text-red-500 text-sm text-center",
                    children: l,
                  }),
                (0, d.jsx)("input", {
                  type: "email",
                  name: "email",
                  id: "email",
                  autoComplete: "email",
                  placeholder: "Email",
                  required: !0,
                  className: "w-full border p-2 rounded",
                  onChange: (a) => c(a.target.value),
                }),
                (0, d.jsx)("input", {
                  type: "password",
                  name: "password",
                  id: "password",
                  autoComplete: "current-password",
                  placeholder: "Password",
                  required: !0,
                  className: "w-full border p-2 rounded",
                  onChange: (a) => i(a.target.value),
                }),
                (0, d.jsx)("button", {
                  type: "submit",
                  disabled: j,
                  className:
                    "w-full bg-green-600 text-white p-2 rounded hover:bg-green-700",
                  children: j ? "Logging in..." : "Login",
                }),
                (0, d.jsx)("button", {
                  type: "button",
                  onClick: o,
                  disabled: j,
                  className:
                    "w-full bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300",
                  children: "Create Account",
                }),
              ],
            }),
          });
        }
        async function i() {
          return { props: {}, revalidate: 86400 };
        }
      },
      8732: (a) => {
        a.exports = require("react/jsx-runtime");
      },
      9021: (a) => {
        a.exports = require("fs");
      },
      9390: (a) => {
        a.exports = require("@supabase/realtime-js");
      },
      9672: (a) => {
        a.exports = require("@supabase/postgrest-js");
      },
    }));
  var b = require("../webpack-runtime.js");
  b.C(a);
  var c = b.X(0, [2631, 3317, 5781, 4233, 1690], () => b((b.s = 7143)));
  module.exports = c;
})();
