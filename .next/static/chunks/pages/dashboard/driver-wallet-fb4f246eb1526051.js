(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1737],
  {
    71546: (e, t, s) => {
      "use strict";
      (s.r(t), s.d(t, { default: () => r }));
      var n = s(37876),
        i = s(14232);
      let d = (0, s(61629).UU)(
        "https://rkonwkggxaohpmxmzmfn.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
      );
      function r() {
        let [e, t] = (0, i.useState)([]);
        return (
          (0, i.useEffect)(() => {
            d.from("transactions")
              .select("*")
              .then((e) => {
                let { data: s } = e;
                s && t(s);
              });
          }, []),
          (0, n.jsxs)("div", {
            className: "p-6",
            children: [
              (0, n.jsx)("h1", { children: "Driver Wallet" }),
              (0, n.jsxs)("table", {
                className: "w-full border",
                children: [
                  (0, n.jsx)("thead", {
                    children: (0, n.jsxs)("tr", {
                      children: [
                        (0, n.jsx)("th", { children: "Date" }),
                        (0, n.jsx)("th", { children: "Type" }),
                        (0, n.jsx)("th", { children: "Amount" }),
                        (0, n.jsx)("th", { children: "Memo" }),
                      ],
                    }),
                  }),
                  (0, n.jsx)("tbody", {
                    children: e.map((e) =>
                      (0, n.jsxs)(
                        "tr",
                        {
                          children: [
                            (0, n.jsx)("td", {
                              children: new Date(
                                e.created_at,
                              ).toLocaleDateString(),
                            }),
                            (0, n.jsx)("td", { children: e.type }),
                            (0, n.jsxs)("td", {
                              children: [
                                "KES ",
                                (e.amount_cents / 100).toFixed(2),
                              ],
                            }),
                            (0, n.jsx)("td", { children: e.memo }),
                          ],
                        },
                        e.id,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          })
        );
      }
    },
    76736: (e, t, s) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/dashboard/driver-wallet",
        function () {
          return s(71546);
        },
      ]);
    },
  },
  (e) => {
    (e.O(0, [636, 6593, 8792], () => e((e.s = 76736))), (_N_E = e.O()));
  },
]);
