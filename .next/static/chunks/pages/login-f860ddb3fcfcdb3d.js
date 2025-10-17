(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8295],
  {
    7984: (e, r, s) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/login",
        function () {
          return s(19416);
        },
      ]);
    },
    19416: (e, r, s) => {
      "use strict";
      (s.r(r), s.d(r, { __N_SSG: () => i, default: () => l }));
      var o = s(37876),
        a = s(14232),
        t = s(89099),
        n = s(4613),
        i = !0;
      function l() {
        let e = (0, t.useRouter)(),
          [r, s] = (0, a.useState)(""),
          [i, l] = (0, a.useState)(""),
          [c, d] = (0, a.useState)(!1),
          [u, p] = (0, a.useState)(""),
          g = async (s) => {
            (s.preventDefault(), d(!0), p(""));
            try {
              var o;
              (console.log(
                "\uD83D\uDD11 Using Supabase URL:",
                "https://rkonwkggxaohpmxmzmfn.supabase.co",
              ),
                console.log(
                  "\uD83D\uDD11 Using Supabase Key (first 6 chars):",
                  ((o =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo"),
                  void 0 === o)
                    ? void 0
                    : o.slice(0, 6),
                ));
              let { data: s, error: a } = await n.N.auth.signInWithPassword({
                email: r,
                password: i,
              });
              a
                ? (console.error("❌ Login error:", a.message), p(a.message))
                : (console.log("✅ Login successful:", s),
                  e.push("/Dashboard"));
            } catch (e) {
              (console.error("⚠️ Unexpected login error:", e),
                p("Unexpected error occurred. Check console for details."));
            } finally {
              d(!1);
            }
          },
          m = async () => {
            (d(!0), p(""));
            try {
              let { error: e } = await n.N.auth.signUp({
                email: r,
                password: i,
                options: {
                  emailRedirectTo: "".concat(
                    window.location.origin,
                    "/Dashboard",
                  ),
                },
              });
              e ? p(e.message) : alert("Check your inbox to confirm sign-up!");
            } catch (e) {
              (console.error("⚠️ Signup error:", e),
                p("Unexpected error occurred."));
            } finally {
              d(!1);
            }
          };
        return (0, o.jsx)("div", {
          className: "min-h-screen flex items-center justify-center bg-gray-50",
          children: (0, o.jsxs)("form", {
            onSubmit: g,
            className: "bg-white p-8 rounded shadow w-full max-w-sm space-y-4",
            children: [
              (0, o.jsx)("h1", {
                className: "text-2xl font-semibold text-center",
                children: "AdGo Login",
              }),
              u &&
                (0, o.jsx)("p", {
                  className: "text-red-500 text-sm text-center",
                  children: u,
                }),
              (0, o.jsx)("input", {
                type: "email",
                name: "email",
                id: "email",
                autoComplete: "email",
                placeholder: "Email",
                required: !0,
                className: "w-full border p-2 rounded",
                onChange: (e) => s(e.target.value),
              }),
              (0, o.jsx)("input", {
                type: "password",
                name: "password",
                id: "password",
                autoComplete: "current-password",
                placeholder: "Password",
                required: !0,
                className: "w-full border p-2 rounded",
                onChange: (e) => l(e.target.value),
              }),
              (0, o.jsx)("button", {
                type: "submit",
                disabled: c,
                className:
                  "w-full bg-green-600 text-white p-2 rounded hover:bg-green-700",
                children: c ? "Logging in..." : "Login",
              }),
              (0, o.jsx)("button", {
                type: "button",
                onClick: m,
                disabled: c,
                className:
                  "w-full bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300",
                children: "Create Account",
              }),
            ],
          }),
        });
      }
    },
    89099: (e, r, s) => {
      e.exports = s(16296);
    },
  },
  (e) => {
    (e.O(0, [636, 6593, 8792], () => e((e.s = 7984))), (_N_E = e.O()));
  },
]);
