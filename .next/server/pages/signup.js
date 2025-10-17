"use strict";
(() => {
  var a = {};
  ((a.id = 4252),
    (a.ids = [636, 3220, 4252]),
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
      5631: (a, b, c) => {
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
              k = c(7450),
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
                  page: "/signup",
                  pathname: "/signup",
                  bundlePath: "",
                  filename: "",
                },
                distDir: ".next",
                relativeProjectDir: "",
                components: { App: j.default, Document: i() },
                userland: k,
              }),
              z = (0, l.U)({
                srcPage: "/signup",
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
      6060: (a) => {
        a.exports = require("next/dist/shared/lib/no-fallback-error.external.js");
      },
      6472: (a) => {
        a.exports = require("@opentelemetry/api");
      },
      7450: (a, b, c) => {
        (c.r(b), c.d(b, { default: () => h, getStaticProps: () => i }));
        var d = c(8732),
          e = c(2015),
          f = c(4233),
          g = c(5288);
        function h() {
          let a = (0, f.useRouter)(),
            [b, c] = (0, e.useState)(""),
            [h, i] = (0, e.useState)(""),
            [j, k] = (0, e.useState)("advertiser"),
            [l, m] = (0, e.useState)(!1);
          async function n(c) {
            (c.preventDefault(), m(!0));
            let { data: d, error: e } = await g.N.auth.signUp({
              email: b,
              password: h,
            });
            if (e) {
              (alert(e.message), m(!1));
              return;
            }
            let f = d.user;
            if (!f) {
              (alert("No user returned from Supabase"), m(!1));
              return;
            }
            (await g.N.from("users")
              .insert([{ id: f.id, email: b, role: j }])
              .select(),
              a.push(`/dashboard/${j}`));
          }
          return (0, d.jsxs)("form", {
            onSubmit: n,
            className: "max-w-sm mx-auto mt-20 space-y-4",
            children: [
              (0, d.jsx)("input", {
                type: "email",
                placeholder: "Email",
                value: b,
                onChange: (a) => c(a.target.value),
                className: "w-full border p-2",
              }),
              (0, d.jsx)("input", {
                type: "password",
                placeholder: "Password",
                value: h,
                onChange: (a) => i(a.target.value),
                className: "w-full border p-2",
              }),
              (0, d.jsxs)("select", {
                value: j,
                onChange: (a) => k(a.target.value),
                className: "w-full border p-2",
                children: [
                  (0, d.jsx)("option", {
                    value: "advertiser",
                    children: "Advertiser",
                  }),
                  (0, d.jsx)("option", { value: "driver", children: "Driver" }),
                  (0, d.jsx)("option", {
                    value: "partner",
                    children: "Partner",
                  }),
                ],
              }),
              (0, d.jsx)("button", {
                type: "submit",
                className: "w-full bg-green-600 text-white py-2",
                disabled: l,
                children: l ? "Signing up…" : "Sign Up",
              }),
            ],
          });
        }
        async function i() {
          return { props: {}, revalidate: 86400 };
        }
      },
      7910: (a) => {
        a.exports = require("stream");
      },
      8496: (a) => {
        a.exports = require("@supabase/functions-js");
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
  var c = b.X(0, [2631, 3317, 5781, 4233, 1690], () => b((b.s = 5631)));
  module.exports = c;
})();
