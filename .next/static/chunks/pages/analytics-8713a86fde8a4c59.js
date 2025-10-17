(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1432],
  {
    2076: (e, a, t) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/analytics",
        function () {
          return t(28007);
        },
      ]);
    },
    20564: (e, a, t) => {
      "use strict";
      t.d(a, { A: () => c });
      var s = t(37876),
        r = t(48230),
        l = t.n(r),
        n = t(89099);
      let i = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/adupload", label: "Ad Upload" },
        { href: "/analytics", label: "Analytics" },
        { href: "/wallet", label: "Wallet" },
        { href: "/settings", label: "Settings" },
      ];
      function c(e) {
        let { children: a } = e,
          t = (0, n.useRouter)();
        return (0, s.jsxs)("div", {
          className: "min-h-screen bg-gray-50",
          children: [
            (0, s.jsx)("nav", {
              className: "bg-white shadow-md border-b border-gray-200",
              children: (0, s.jsx)("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: (0, s.jsx)("div", {
                  className: "flex justify-between h-16",
                  children: (0, s.jsx)("div", {
                    className: "flex space-x-8",
                    children: i.map((e) => {
                      let a = t.pathname === e.href;
                      return (0, s.jsx)(
                        l(),
                        {
                          href: e.href,
                          className:
                            "\n                      inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ease-in-out\n                      border-b-2 hover:border-green-500 focus:outline-none focus:border-green-500\n                      ".concat(
                              a
                                ? "border-green-600 text-green-700"
                                : "border-transparent text-gray-700 hover:text-green-600 hover:underline",
                              "\n                    ",
                            ),
                          children: e.label,
                        },
                        e.href,
                      );
                    }),
                  }),
                }),
              }),
            }),
            (0, s.jsx)("main", { className: "p-8", children: a }),
          ],
        });
      }
    },
    28007: (e, a, t) => {
      "use strict";
      (t.r(a), t.d(a, { default: () => i }));
      var s = t(37876),
        r = t(14232),
        l = t(4613),
        n = t(20564);
      function i() {
        var e;
        let [a, t] = (0, r.useState)([]),
          [i, c] = (0, r.useState)(!0),
          [d, x] = (0, r.useState)(null);
        return (
          (0, r.useEffect)(() => {
            (async () => {
              c(!0);
              try {
                console.log("\uD83D\uDD04 Fetching analytics data...");
                let { data: e, error: a } = await l.N.rpc(
                  "rpc_campaign_summary_30d",
                );
                if (a) throw a;
                (console.log("✅ RPC Data:", e), t(e || []));
              } catch (e) {
                (console.error("❌ RPC Fetch Error:", e), x(e.message));
              } finally {
                c(!1);
              }
            })();
          }, []),
          (0, s.jsx)(n.A, {
            children: (0, s.jsxs)("div", {
              className: "p-8",
              children: [
                (0, s.jsx)("h1", {
                  className: "text-2xl font-bold mb-2",
                  children: "Campaign Analytics",
                }),
                i &&
                  (0, s.jsx)("p", {
                    className: "text-gray-500",
                    children: "Loading analytics...",
                  }),
                d &&
                  (0, s.jsxs)("p", {
                    className: "text-red-500",
                    children: ["Error: ", d],
                  }),
                !i &&
                  !d &&
                  (0, s.jsxs)(s.Fragment, {
                    children: [
                      (0, s.jsxs)("p", {
                        className: "text-gray-400 text-sm mb-6",
                        children: [
                          "Last updated:",
                          " ",
                          (
                            null == a || null == (e = a[0])
                              ? void 0
                              : e.last_updated
                          )
                            ? new Date(a[0].last_updated).toLocaleString()
                            : "—",
                        ],
                      }),
                      0 === a.length
                        ? (0, s.jsx)("p", {
                            className: "text-gray-500 italic",
                            children: "No campaigns found.",
                          })
                        : (0, s.jsx)("div", {
                            className:
                              "overflow-x-auto rounded-lg shadow bg-white",
                            children: (0, s.jsxs)("table", {
                              className: "w-full border-collapse text-sm",
                              children: [
                                (0, s.jsx)("thead", {
                                  className:
                                    "bg-gray-100 text-gray-600 uppercase text-xs",
                                  children: (0, s.jsxs)("tr", {
                                    children: [
                                      (0, s.jsx)("th", {
                                        className: "py-3 px-4 text-left",
                                        children: "Campaign",
                                      }),
                                      (0, s.jsx)("th", {
                                        className: "py-3 px-4 text-right",
                                        children: "Impressions",
                                      }),
                                      (0, s.jsx)("th", {
                                        className: "py-3 px-4 text-right",
                                        children: "Clicks",
                                      }),
                                      (0, s.jsx)("th", {
                                        className: "py-3 px-4 text-right",
                                        children: "CTR (%)",
                                      }),
                                      (0, s.jsx)("th", {
                                        className: "py-3 px-4 text-right",
                                        children: "ROI",
                                      }),
                                    ],
                                  }),
                                }),
                                (0, s.jsx)("tbody", {
                                  children: a.map((e) =>
                                    (0, s.jsxs)(
                                      "tr",
                                      {
                                        className:
                                          "border-t hover:bg-gray-50 transition",
                                        children: [
                                          (0, s.jsx)("td", {
                                            className:
                                              "py-3 px-4 font-medium text-gray-800",
                                            children: e.campaign_name,
                                          }),
                                          (0, s.jsx)("td", {
                                            className: "py-3 px-4 text-right",
                                            children: e.total_impressions,
                                          }),
                                          (0, s.jsx)("td", {
                                            className: "py-3 px-4 text-right",
                                            children: e.total_clicks,
                                          }),
                                          (0, s.jsx)("td", {
                                            className: "py-3 px-4 text-right",
                                            children: parseFloat(e.ctr).toFixed(
                                              2,
                                            ),
                                          }),
                                          (0, s.jsx)("td", {
                                            className: "py-3 px-4 text-right",
                                            children: parseFloat(e.roi).toFixed(
                                              2,
                                            ),
                                          }),
                                        ],
                                      },
                                      e.campaign_id,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                          }),
                    ],
                  }),
              ],
            }),
          })
        );
      }
    },
  },
  (e) => {
    (e.O(0, [9008, 636, 6593, 8792], () => e((e.s = 2076))), (_N_E = e.O()));
  },
]);
