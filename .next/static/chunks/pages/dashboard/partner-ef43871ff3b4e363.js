(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7375],
  {
    16252: (e, s, a) => {
      "use strict";
      (a.r(s), a.d(s, { default: () => d }));
      var t = a(37876),
        c = a(14232);
      let n = (0, a(61629).UU)(
        "https://rkonwkggxaohpmxmzmfn.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
      );
      function d() {
        let [e, s] = (0, c.useState)([]),
          [a, d] = (0, c.useState)([]);
        return (
          (0, c.useEffect)(() => {
            (async () => {
              let { data: e } = await n
                  .from("campaigns")
                  .select("id, name, budget, start_date, end_date"),
                { data: a } = await n
                  .from("transactions")
                  .select("id, amount_cents, type, ref, memo, created_at")
                  .order("created_at", { ascending: !1 })
                  .limit(10);
              (s(e || []), d(a || []));
            })();
          }, []),
          (0, t.jsxs)("div", {
            className: "p-6 space-y-8",
            children: [
              (0, t.jsx)("h1", {
                className: "text-2xl font-bold",
                children: "Partner Dashboard",
              }),
              (0, t.jsxs)("section", {
                children: [
                  (0, t.jsx)("h2", {
                    className: "text-xl font-semibold mb-2",
                    children: "Active Campaigns",
                  }),
                  (0, t.jsx)("ul", {
                    className: "list-disc pl-6",
                    children: e.map((e, s) =>
                      (0, t.jsxs)(
                        "li",
                        {
                          children: [
                            e.name,
                            " — Budget ",
                            e.budget,
                            " (from ",
                            e.start_date,
                            " to ",
                            e.end_date,
                            ")",
                          ],
                        },
                        s,
                      ),
                    ),
                  }),
                ],
              }),
              (0, t.jsxs)("section", {
                children: [
                  (0, t.jsx)("h2", {
                    className: "text-xl font-semibold mb-2",
                    children: "Revenue Share Credits",
                  }),
                  (0, t.jsxs)("table", {
                    className: "w-full border",
                    children: [
                      (0, t.jsx)("thead", {
                        className: "bg-gray-100",
                        children: (0, t.jsxs)("tr", {
                          children: [
                            (0, t.jsx)("th", {
                              className: "p-2",
                              children: "Amount",
                            }),
                            (0, t.jsx)("th", {
                              className: "p-2",
                              children: "Type",
                            }),
                            (0, t.jsx)("th", {
                              className: "p-2",
                              children: "Ref",
                            }),
                            (0, t.jsx)("th", {
                              className: "p-2",
                              children: "Date",
                            }),
                          ],
                        }),
                      }),
                      (0, t.jsx)("tbody", {
                        children: a.map((e, s) =>
                          (0, t.jsxs)(
                            "tr",
                            {
                              children: [
                                (0, t.jsx)("td", {
                                  className: "p-2",
                                  children: e.amount_cents / 100,
                                }),
                                (0, t.jsx)("td", {
                                  className: "p-2",
                                  children: e.type,
                                }),
                                (0, t.jsx)("td", {
                                  className: "p-2",
                                  children: e.ref,
                                }),
                                (0, t.jsx)("td", {
                                  className: "p-2",
                                  children: new Date(
                                    e.created_at,
                                  ).toLocaleString(),
                                }),
                              ],
                            },
                            s,
                          ),
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        );
      }
    },
    66524: (e, s, a) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/dashboard/partner",
        function () {
          return a(16252);
        },
      ]);
    },
  },
  (e) => {
    (e.O(0, [636, 6593, 8792], () => e((e.s = 66524))), (_N_E = e.O()));
  },
]);
