(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [201],
  {
    23224: (e, s, a) => {
      "use strict";
      (a.r(s), a.d(s, { default: () => n }));
      var c = a(37876),
        l = a(14232);
      let t = (0, a(61629).UU)(
        "https://rkonwkggxaohpmxmzmfn.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
      );
      function n() {
        let [e, s] = (0, l.useState)([]),
          [a, n] = (0, l.useState)([]);
        return (
          (0, l.useEffect)(() => {
            (async () => {
              let { data: e } = await t.from("wallets").select("*"),
                { data: a } = await t
                  .from("transactions")
                  .select("*")
                  .order("created_at", { ascending: !1 })
                  .limit(10);
              (s(e || []), n(a || []));
            })();
          }, []),
          (0, c.jsxs)("div", {
            className: "p-6 space-y-8",
            children: [
              (0, c.jsx)("h1", {
                className: "text-2xl font-bold",
                children: "Driver Wallet",
              }),
              (0, c.jsxs)("section", {
                children: [
                  (0, c.jsx)("h2", {
                    className: "text-xl font-semibold mb-2",
                    children: "Balance",
                  }),
                  e.map((e, s) =>
                    (0, c.jsxs)(
                      "div",
                      {
                        className: "border p-3 rounded mb-2",
                        children: [
                          (0, c.jsxs)("p", {
                            children: [
                              (0, c.jsx)("strong", { children: "Wallet:" }),
                              " ",
                              e.id,
                            ],
                          }),
                          (0, c.jsxs)("p", {
                            children: [
                              (0, c.jsx)("strong", { children: "Balance:" }),
                              " ",
                              e.balance_cents / 100,
                              " ",
                              e.currency,
                            ],
                          }),
                        ],
                      },
                      s,
                    ),
                  ),
                ],
              }),
              (0, c.jsxs)("section", {
                children: [
                  (0, c.jsx)("h2", {
                    className: "text-xl font-semibold mb-2",
                    children: "Transactions",
                  }),
                  (0, c.jsxs)("table", {
                    className: "w-full border",
                    children: [
                      (0, c.jsx)("thead", {
                        className: "bg-gray-100",
                        children: (0, c.jsxs)("tr", {
                          children: [
                            (0, c.jsx)("th", {
                              className: "p-2",
                              children: "Type",
                            }),
                            (0, c.jsx)("th", {
                              className: "p-2",
                              children: "Amount",
                            }),
                            (0, c.jsx)("th", {
                              className: "p-2",
                              children: "Ref",
                            }),
                            (0, c.jsx)("th", {
                              className: "p-2",
                              children: "Memo",
                            }),
                            (0, c.jsx)("th", {
                              className: "p-2",
                              children: "Date",
                            }),
                          ],
                        }),
                      }),
                      (0, c.jsx)("tbody", {
                        children: a.map((e, s) =>
                          (0, c.jsxs)(
                            "tr",
                            {
                              children: [
                                (0, c.jsx)("td", {
                                  className: "p-2",
                                  children: e.type,
                                }),
                                (0, c.jsx)("td", {
                                  className: "p-2",
                                  children: e.amount_cents / 100,
                                }),
                                (0, c.jsx)("td", {
                                  className: "p-2",
                                  children: e.ref,
                                }),
                                (0, c.jsx)("td", {
                                  className: "p-2",
                                  children: e.memo,
                                }),
                                (0, c.jsx)("td", {
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
    50482: (e, s, a) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/dashboard/driver",
        function () {
          return a(23224);
        },
      ]);
    },
  },
  (e) => {
    (e.O(0, [636, 6593, 8792], () => e((e.s = 50482))), (_N_E = e.O()));
  },
]);
