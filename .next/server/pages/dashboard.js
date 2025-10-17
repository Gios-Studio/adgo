"use strict";
(() => {
  var a = {};
  ((a.id = 9724),
    (a.ids = [636, 3220, 9724]),
    (a.modules = {
      30: (a) => {
        a.exports = require("lodash/some");
      },
      133: (a) => {
        a.exports = require("lodash/find");
      },
      361: (a) => {
        a.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
      },
      411: (a) => {
        a.exports = require("@supabase/auth-js");
      },
      599: (a) => {
        a.exports = require("lodash/minBy");
      },
      601: (a) => {
        a.exports = require("lodash/isObject");
      },
      1210: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            (c.r(b), c.d(b, { default: () => r, getStaticProps: () => s }));
            var e = c(8732),
              f = c(2015),
              g = c(9481),
              h = c(7775),
              i = c(2885),
              j = c(1972),
              k = c(1339),
              l = c(1354),
              m = c(284),
              n = c(1302),
              o = c(9825),
              p = c(2893),
              q = a([i, j, k, l, p]);
            [i, j, k, l, p] = q.then ? (await q)() : q;
            function r() {
              let [a, b] = (0, f.useState)(null),
                [c, d] = (0, f.useState)(null),
                [q, r] = (0, f.useState)(!0),
                [s, t] = (0, f.useState)(!1),
                u = async () => {
                  try {
                    t(!0);
                    let {
                      data: { user: a },
                    } = await g.N.auth.getUser();
                    if (!a) throw Error("Not authenticated");
                    let { data: c } = await g.N.from("profiles")
                      .select("role")
                      .eq("id", a.id)
                      .single();
                    d(c?.role || "advertiser");
                    let e = {
                      partner: {
                        campaigns: 45,
                        impressions: 125e3,
                        clicks: 4500,
                        ctr: 3.6,
                        revenue: 8750,
                        activeDrivers: 230,
                      },
                      advertiser: {
                        adSpend: 5200,
                        impressions: 89e3,
                        clicks: 3200,
                        ctr: 3.6,
                        conversions: 145,
                        roi: 2.3,
                        activeCampaigns: 8,
                      },
                      driver: {
                        earnings: 1250,
                        walletBalance: 780,
                        adViews: 145,
                        tripsToday: 12,
                        hoursOnline: 7.5,
                        avgEarningsPerTrip: 104,
                      },
                      charts: {
                        performanceData: Array.from({ length: 30 }, (a, b) => ({
                          date: (0, o.GP)(
                            new Date(Date.now() - (29 - b) * 864e5),
                            "MMM dd",
                          ),
                          impressions: Math.floor(5e3 * Math.random()) + 2e3,
                          clicks: Math.floor(200 * Math.random()) + 50,
                          revenue: Math.floor(500 * Math.random()) + 100,
                          spend: Math.floor(300 * Math.random()) + 80,
                        })),
                        regionData: [
                          { region: "Nairobi", value: 45, fill: "#0088FE" },
                          { region: "Mombasa", value: 25, fill: "#00C49F" },
                          { region: "Kisumu", value: 15, fill: "#FFBB28" },
                          { region: "Nakuru", value: 10, fill: "#FF8042" },
                          { region: "Other", value: 5, fill: "#8884D8" },
                        ],
                        timeData: Array.from({ length: 24 }, (a, b) => ({
                          hour: `${b}:00`,
                          activity: Math.floor(100 * Math.random()) + 20,
                        })),
                      },
                    };
                    b(e);
                  } catch (a) {
                    (console.error("Error fetching dashboard data:", a),
                      p.toast.error("Failed to load dashboard data"));
                  } finally {
                    (r(!1), t(!1));
                  }
                },
                v = async () => {
                  (0, p.toast)("PDF export feature coming soon", {
                    icon: "\uD83D\uDCC4",
                  });
                };
              return q
                ? (0, e.jsx)(h.A, {
                    children: (0, e.jsx)("div", {
                      className: "flex items-center justify-center h-64",
                      children: (0, e.jsxs)("div", {
                        className: "text-center",
                        children: [
                          (0, e.jsx)(n.e9t, {
                            className: "h-8 w-8 animate-spin mx-auto mb-2",
                          }),
                          (0, e.jsx)("p", { children: "Loading dashboard..." }),
                        ],
                      }),
                    }),
                  })
                : a
                  ? (0, e.jsx)(h.A, {
                      children: (0, e.jsxs)("div", {
                        className: "space-y-6",
                        children: [
                          (0, e.jsxs)("div", {
                            className: "flex justify-between items-center",
                            children: [
                              (0, e.jsxs)("div", {
                                children: [
                                  (0, e.jsxs)("h1", {
                                    className:
                                      "text-3xl font-bold text-gray-900",
                                    children: [
                                      "partner" === c && "Partner Dashboard",
                                      "advertiser" === c &&
                                        "Advertiser Dashboard",
                                      "driver" === c && "Driver Dashboard",
                                    ],
                                  }),
                                  (0, e.jsx)("p", {
                                    className: "text-gray-500",
                                    children:
                                      "Real-time analytics and performance metrics",
                                  }),
                                ],
                              }),
                              (0, e.jsxs)("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, e.jsx)(k.$, {
                                    onClick: u,
                                    variant: "outline",
                                    disabled: s,
                                    children: (0, e.jsx)(n.e9t, {
                                      className: `h-4 w-4 ${s ? "animate-spin" : ""}`,
                                    }),
                                  }),
                                  (0, e.jsxs)(k.$, {
                                    onClick: () => {
                                      if (!a) return;
                                      let b = a.charts.performanceData
                                          .map(
                                            (a) =>
                                              `${a.date},${a.impressions},${a.clicks},${a.revenue},${a.spend}`,
                                          )
                                          .join("\n"),
                                        c = `Date,Impressions,Clicks,Revenue,Spend
${b}`,
                                        d = new Blob([c], { type: "text/csv" }),
                                        e = window.URL.createObjectURL(d),
                                        f = document.createElement("a");
                                      ((f.href = e),
                                        (f.download = `adgo-analytics-${(0, o.GP)(new Date(), "yyyy-MM-dd")}.csv`),
                                        document.body.appendChild(f),
                                        f.click(),
                                        document.body.removeChild(f),
                                        window.URL.revokeObjectURL(e),
                                        p.toast.success(
                                          "CSV exported successfully",
                                        ));
                                    },
                                    variant: "outline",
                                    children: [
                                      (0, e.jsx)(n.nmj, {
                                        className: "h-4 w-4 mr-2",
                                      }),
                                      "CSV",
                                    ],
                                  }),
                                  (0, e.jsxs)(k.$, {
                                    onClick: v,
                                    variant: "outline",
                                    children: [
                                      (0, e.jsx)(n.f5X, {
                                        className: "h-4 w-4 mr-2",
                                      }),
                                      "PDF",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, e.jsxs)("div", {
                            className:
                              "flex items-center gap-2 text-sm text-green-600",
                            children: [
                              (0, e.jsx)("div", {
                                className:
                                  "w-2 h-2 bg-green-500 rounded-full animate-pulse",
                              }),
                              (0, e.jsx)("span", {
                                children:
                                  "Live data • Auto-refreshes every 10 seconds",
                              }),
                              (0, e.jsxs)(l.E, {
                                variant: "outline",
                                className: "text-xs",
                                children: [
                                  "Last updated: ",
                                  (0, o.GP)(new Date(), "HH:mm:ss"),
                                ],
                              }),
                            ],
                          }),
                          (0, e.jsxs)(j.tU, {
                            value: c || "advertiser",
                            onValueChange: (a) => d(a),
                            children: [
                              (0, e.jsxs)(j.j7, {
                                className: "grid w-full grid-cols-3",
                                children: [
                                  (0, e.jsx)(j.Xi, {
                                    value: "partner",
                                    children: "Partner",
                                  }),
                                  (0, e.jsx)(j.Xi, {
                                    value: "advertiser",
                                    children: "Advertiser",
                                  }),
                                  (0, e.jsx)(j.Xi, {
                                    value: "driver",
                                    children: "Driver",
                                  }),
                                ],
                              }),
                              (0, e.jsx)(j.av, {
                                value: "partner",
                                children: (0, e.jsx)(
                                  () =>
                                    (0, e.jsxs)("div", {
                                      className: "space-y-6",
                                      children: [
                                        (0, e.jsxs)("div", {
                                          className:
                                            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                                          children: [
                                            (0, e.jsx)(i.Zp, {
                                              children: (0, e.jsxs)(i.Wu, {
                                                className: "pt-6",
                                                children: [
                                                  (0, e.jsxs)("div", {
                                                    className:
                                                      "flex items-center justify-between",
                                                    children: [
                                                      (0, e.jsxs)("div", {
                                                        children: [
                                                          (0, e.jsx)("p", {
                                                            className:
                                                              "text-sm font-medium text-gray-500",
                                                            children:
                                                              "Total Revenue",
                                                          }),
                                                          (0, e.jsxs)("p", {
                                                            className:
                                                              "text-2xl font-bold",
                                                            children: [
                                                              "$",
                                                              a.partner.revenue.toLocaleString(),
                                                            ],
                                                          }),
                                                        ],
                                                      }),
                                                      (0, e.jsx)(n.G9t, {
                                                        className:
                                                          "h-8 w-8 text-green-500",
                                                      }),
                                                    ],
                                                  }),
                                                  (0, e.jsxs)("p", {
                                                    className:
                                                      "text-xs text-green-600 mt-1",
                                                    children: [
                                                      (0, e.jsx)(n.ntg, {
                                                        className:
                                                          "inline h-3 w-3",
                                                      }),
                                                      " +12% from last month",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            }),
                                            (0, e.jsx)(i.Zp, {
                                              children: (0, e.jsxs)(i.Wu, {
                                                className: "pt-6",
                                                children: [
                                                  (0, e.jsxs)("div", {
                                                    className:
                                                      "flex items-center justify-between",
                                                    children: [
                                                      (0, e.jsxs)("div", {
                                                        children: [
                                                          (0, e.jsx)("p", {
                                                            className:
                                                              "text-sm font-medium text-gray-500",
                                                            children:
                                                              "Active Campaigns",
                                                          }),
                                                          (0, e.jsx)("p", {
                                                            className:
                                                              "text-2xl font-bold",
                                                            children:
                                                              a.partner
                                                                .campaigns,
                                                          }),
                                                        ],
                                                      }),
                                                      (0, e.jsx)(n.DTr, {
                                                        className:
                                                          "h-8 w-8 text-blue-500",
                                                      }),
                                                    ],
                                                  }),
                                                  (0, e.jsxs)("p", {
                                                    className:
                                                      "text-xs text-blue-600 mt-1",
                                                    children: [
                                                      (0, e.jsx)(n.ntg, {
                                                        className:
                                                          "inline h-3 w-3",
                                                      }),
                                                      " +5 new this week",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            }),
                                            (0, e.jsx)(i.Zp, {
                                              children: (0, e.jsxs)(i.Wu, {
                                                className: "pt-6",
                                                children: [
                                                  (0, e.jsxs)("div", {
                                                    className:
                                                      "flex items-center justify-between",
                                                    children: [
                                                      (0, e.jsxs)("div", {
                                                        children: [
                                                          (0, e.jsx)("p", {
                                                            className:
                                                              "text-sm font-medium text-gray-500",
                                                            children:
                                                              "Active Drivers",
                                                          }),
                                                          (0, e.jsx)("p", {
                                                            className:
                                                              "text-2xl font-bold",
                                                            children:
                                                              a.partner
                                                                .activeDrivers,
                                                          }),
                                                        ],
                                                      }),
                                                      (0, e.jsx)(n.zWC, {
                                                        className:
                                                          "h-8 w-8 text-purple-500",
                                                      }),
                                                    ],
                                                  }),
                                                  (0, e.jsxs)("p", {
                                                    className:
                                                      "text-xs text-purple-600 mt-1",
                                                    children: [
                                                      "CTR: ",
                                                      a.partner.ctr,
                                                      "%",
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            }),
                                          ],
                                        }),
                                        (0, e.jsxs)("div", {
                                          className:
                                            "grid grid-cols-1 lg:grid-cols-2 gap-6",
                                          children: [
                                            (0, e.jsxs)(i.Zp, {
                                              children: [
                                                (0, e.jsx)(i.aR, {
                                                  children: (0, e.jsx)(i.ZB, {
                                                    children: "Revenue Trend",
                                                  }),
                                                }),
                                                (0, e.jsx)(i.Wu, {
                                                  children: (0, e.jsx)(m.uf, {
                                                    width: "100%",
                                                    height: 300,
                                                    children: (0, e.jsxs)(
                                                      m.QF,
                                                      {
                                                        data: a.charts
                                                          .performanceData,
                                                        children: [
                                                          (0, e.jsx)(m.dC, {
                                                            strokeDasharray:
                                                              "3 3",
                                                          }),
                                                          (0, e.jsx)(m.WX, {
                                                            dataKey: "date",
                                                          }),
                                                          (0, e.jsx)(m.h8, {}),
                                                          (0, e.jsx)(m.m_, {}),
                                                          (0, e.jsx)(m.Gk, {
                                                            type: "monotone",
                                                            dataKey: "revenue",
                                                            stroke: "#8884d8",
                                                            fill: "#8884d8",
                                                            fillOpacity: 0.6,
                                                          }),
                                                        ],
                                                      },
                                                    ),
                                                  }),
                                                }),
                                              ],
                                            }),
                                            (0, e.jsxs)(i.Zp, {
                                              children: [
                                                (0, e.jsx)(i.aR, {
                                                  children: (0, e.jsx)(i.ZB, {
                                                    children:
                                                      "Regional Distribution",
                                                  }),
                                                }),
                                                (0, e.jsx)(i.Wu, {
                                                  children: (0, e.jsx)(m.uf, {
                                                    width: "100%",
                                                    height: 300,
                                                    children: (0, e.jsxs)(
                                                      m.rW,
                                                      {
                                                        children: [
                                                          (0, e.jsx)(m.Fq, {
                                                            data: a.charts
                                                              .regionData,
                                                            cx: "50%",
                                                            cy: "50%",
                                                            labelLine: !1,
                                                            label: ({
                                                              region: a,
                                                              value: b,
                                                            }) => `${a}: ${b}%`,
                                                            outerRadius: 80,
                                                            fill: "#8884d8",
                                                            dataKey: "value",
                                                            children:
                                                              a.charts.regionData.map(
                                                                (a, b) =>
                                                                  (0, e.jsx)(
                                                                    m.fh,
                                                                    {
                                                                      fill: a.fill,
                                                                    },
                                                                    `cell-${b}`,
                                                                  ),
                                                              ),
                                                          }),
                                                          (0, e.jsx)(m.m_, {}),
                                                        ],
                                                      },
                                                    ),
                                                  }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  {},
                                ),
                              }),
                              (0, e.jsx)(j.av, {
                                value: "advertiser",
                                children: (0, e.jsx)(
                                  () =>
                                    (0, e.jsxs)("div", {
                                      className: "space-y-6",
                                      children: [
                                        (0, e.jsxs)("div", {
                                          className:
                                            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                                          children: [
                                            (0, e.jsx)(i.Zp, {
                                              children: (0, e.jsx)(i.Wu, {
                                                className: "pt-6",
                                                children: (0, e.jsxs)("div", {
                                                  className:
                                                    "flex items-center justify-between",
                                                  children: [
                                                    (0, e.jsxs)("div", {
                                                      children: [
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-sm font-medium text-gray-500",
                                                          children: "Ad Spend",
                                                        }),
                                                        (0, e.jsxs)("p", {
                                                          className:
                                                            "text-2xl font-bold",
                                                          children: [
                                                            "$",
                                                            a.advertiser.adSpend.toLocaleString(),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    (0, e.jsx)(n.G9t, {
                                                      className:
                                                        "h-8 w-8 text-red-500",
                                                    }),
                                                  ],
                                                }),
                                              }),
                                            }),
                                            (0, e.jsx)(i.Zp, {
                                              children: (0, e.jsx)(i.Wu, {
                                                className: "pt-6",
                                                children: (0, e.jsxs)("div", {
                                                  className:
                                                    "flex items-center justify-between",
                                                  children: [
                                                    (0, e.jsxs)("div", {
                                                      children: [
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-sm font-medium text-gray-500",
                                                          children:
                                                            "Impressions",
                                                        }),
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-2xl font-bold",
                                                          children:
                                                            a.advertiser.impressions.toLocaleString(),
                                                        }),
                                                      ],
                                                    }),
                                                    (0, e.jsx)(n.kU3, {
                                                      className:
                                                        "h-8 w-8 text-blue-500",
                                                    }),
                                                  ],
                                                }),
                                              }),
                                            }),
                                            (0, e.jsx)(i.Zp, {
                                              children: (0, e.jsx)(i.Wu, {
                                                className: "pt-6",
                                                children: (0, e.jsxs)("div", {
                                                  className:
                                                    "flex items-center justify-between",
                                                  children: [
                                                    (0, e.jsxs)("div", {
                                                      children: [
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-sm font-medium text-gray-500",
                                                          children: "Clicks",
                                                        }),
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-2xl font-bold",
                                                          children:
                                                            a.advertiser.clicks.toLocaleString(),
                                                        }),
                                                      ],
                                                    }),
                                                    (0, e.jsx)(n.zvZ, {
                                                      className:
                                                        "h-8 w-8 text-green-500",
                                                    }),
                                                  ],
                                                }),
                                              }),
                                            }),
                                            (0, e.jsx)(i.Zp, {
                                              children: (0, e.jsx)(i.Wu, {
                                                className: "pt-6",
                                                children: (0, e.jsxs)("div", {
                                                  className:
                                                    "flex items-center justify-between",
                                                  children: [
                                                    (0, e.jsxs)("div", {
                                                      children: [
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-sm font-medium text-gray-500",
                                                          children: "ROI",
                                                        }),
                                                        (0, e.jsxs)("p", {
                                                          className:
                                                            "text-2xl font-bold",
                                                          children: [
                                                            a.advertiser.roi,
                                                            "x",
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    (0, e.jsx)(n.ntg, {
                                                      className:
                                                        "h-8 w-8 text-purple-500",
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
                                              children: (0, e.jsx)(i.ZB, {
                                                children:
                                                  "Campaign Performance",
                                              }),
                                            }),
                                            (0, e.jsx)(i.Wu, {
                                              children: (0, e.jsx)(m.uf, {
                                                width: "100%",
                                                height: 400,
                                                children: (0, e.jsxs)(m.bl, {
                                                  data: a.charts
                                                    .performanceData,
                                                  children: [
                                                    (0, e.jsx)(m.dC, {
                                                      strokeDasharray: "3 3",
                                                    }),
                                                    (0, e.jsx)(m.WX, {
                                                      dataKey: "date",
                                                    }),
                                                    (0, e.jsx)(m.h8, {}),
                                                    (0, e.jsx)(m.m_, {}),
                                                    (0, e.jsx)(m.s$, {}),
                                                    (0, e.jsx)(m.N1, {
                                                      type: "monotone",
                                                      dataKey: "impressions",
                                                      stroke: "#8884d8",
                                                      name: "Impressions",
                                                    }),
                                                    (0, e.jsx)(m.N1, {
                                                      type: "monotone",
                                                      dataKey: "clicks",
                                                      stroke: "#82ca9d",
                                                      name: "Clicks",
                                                    }),
                                                  ],
                                                }),
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  {},
                                ),
                              }),
                              (0, e.jsx)(j.av, {
                                value: "driver",
                                children: (0, e.jsx)(
                                  () =>
                                    (0, e.jsxs)("div", {
                                      className: "space-y-6",
                                      children: [
                                        (0, e.jsxs)("div", {
                                          className:
                                            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                                          children: [
                                            (0, e.jsx)(i.Zp, {
                                              children: (0, e.jsx)(i.Wu, {
                                                className: "pt-6",
                                                children: (0, e.jsxs)("div", {
                                                  className:
                                                    "flex items-center justify-between",
                                                  children: [
                                                    (0, e.jsxs)("div", {
                                                      children: [
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-sm font-medium text-gray-500",
                                                          children:
                                                            "Today's Earnings",
                                                        }),
                                                        (0, e.jsxs)("p", {
                                                          className:
                                                            "text-2xl font-bold",
                                                          children: [
                                                            "KES ",
                                                            a.driver.earnings.toLocaleString(),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    (0, e.jsx)(n.G9t, {
                                                      className:
                                                        "h-8 w-8 text-green-500",
                                                    }),
                                                  ],
                                                }),
                                              }),
                                            }),
                                            (0, e.jsx)(i.Zp, {
                                              children: (0, e.jsx)(i.Wu, {
                                                className: "pt-6",
                                                children: (0, e.jsxs)("div", {
                                                  className:
                                                    "flex items-center justify-between",
                                                  children: [
                                                    (0, e.jsxs)("div", {
                                                      children: [
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-sm font-medium text-gray-500",
                                                          children:
                                                            "Wallet Balance",
                                                        }),
                                                        (0, e.jsxs)("p", {
                                                          className:
                                                            "text-2xl font-bold",
                                                          children: [
                                                            "KES ",
                                                            a.driver.walletBalance.toLocaleString(),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    (0, e.jsx)(n.uWV, {
                                                      className:
                                                        "h-8 w-8 text-blue-500",
                                                    }),
                                                  ],
                                                }),
                                              }),
                                            }),
                                            (0, e.jsx)(i.Zp, {
                                              children: (0, e.jsx)(i.Wu, {
                                                className: "pt-6",
                                                children: (0, e.jsxs)("div", {
                                                  className:
                                                    "flex items-center justify-between",
                                                  children: [
                                                    (0, e.jsxs)("div", {
                                                      children: [
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-sm font-medium text-gray-500",
                                                          children:
                                                            "Ad Views Today",
                                                        }),
                                                        (0, e.jsx)("p", {
                                                          className:
                                                            "text-2xl font-bold",
                                                          children:
                                                            a.driver.adViews,
                                                        }),
                                                      ],
                                                    }),
                                                    (0, e.jsx)(n.kU3, {
                                                      className:
                                                        "h-8 w-8 text-purple-500",
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
                                              children: (0, e.jsx)(i.ZB, {
                                                children: "Daily Activity",
                                              }),
                                            }),
                                            (0, e.jsx)(i.Wu, {
                                              children: (0, e.jsx)(m.uf, {
                                                width: "100%",
                                                height: 300,
                                                children: (0, e.jsxs)(m.Es, {
                                                  data: a.charts.timeData,
                                                  children: [
                                                    (0, e.jsx)(m.dC, {
                                                      strokeDasharray: "3 3",
                                                    }),
                                                    (0, e.jsx)(m.WX, {
                                                      dataKey: "hour",
                                                    }),
                                                    (0, e.jsx)(m.h8, {}),
                                                    (0, e.jsx)(m.m_, {}),
                                                    (0, e.jsx)(m.yP, {
                                                      dataKey: "activity",
                                                      fill: "#8884d8",
                                                    }),
                                                  ],
                                                }),
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  {},
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                    })
                  : (0, e.jsx)(h.A, {
                      children: (0, e.jsx)("div", {
                        className: "text-center py-8",
                        children: (0, e.jsx)("p", {
                          className: "text-red-500",
                          children: "Failed to load dashboard data",
                        }),
                      }),
                    });
            }
            async function s() {
              return {
                props: { timestamp: new Date().toISOString() },
                revalidate: 60,
              };
            }
            d();
          } catch (a) {
            d(a);
          }
        });
      },
      1247: (a) => {
        a.exports = require("lodash/isNumber");
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
      1343: (a) => {
        a.exports = require("eventemitter3");
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
      1570: (a) => {
        a.exports = require("lodash/isBoolean");
      },
      1651: (a) => {
        a.exports = require("tiny-invariant");
      },
      1972: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { Xi: () => l, av: () => m, j7: () => k, tU: () => j });
            var e = c(8732),
              f = c(2015),
              g = c(7259),
              h = c(3894),
              i = a([g, h]);
            [g, h] = i.then ? (await i)() : i;
            let j = g.Root,
              k = f.forwardRef(({ className: a, ...b }, c) =>
                (0, e.jsx)(g.List, {
                  ref: c,
                  className: (0, h.cn)(
                    "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
                    a,
                  ),
                  ...b,
                }),
              );
            k.displayName = g.List.displayName;
            let l = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)(g.Trigger, {
                ref: c,
                className: (0, h.cn)(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                  a,
                ),
                ...b,
              }),
            );
            l.displayName = g.Trigger.displayName;
            let m = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)(g.Content, {
                ref: c,
                className: (0, h.cn)(
                  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  a,
                ),
                ...b,
              }),
            );
            ((m.displayName = g.Content.displayName), d());
          } catch (a) {
            d(a);
          }
        });
      },
      1999: (a) => {
        a.exports = require("lodash/isString");
      },
      2015: (a) => {
        a.exports = require("react");
      },
      2326: (a) => {
        a.exports = require("react-dom");
      },
      2477: (a, b, c) => {
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
              k = c(1210),
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
                  page: "/dashboard",
                  pathname: "/dashboard",
                  bundlePath: "",
                  filename: "",
                },
                distDir: ".next",
                relativeProjectDir: "",
                components: { App: j.default, Document: i() },
                userland: k,
              }),
              z = (0, l.U)({
                srcPage: "/dashboard",
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
      2546: (a) => {
        a.exports = require("victory-vendor/d3-scale");
      },
      2654: (a) => {
        a.exports = require("lodash/last");
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
      3261: (a) => {
        a.exports = require("victory-vendor/d3-shape");
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
      4014: (a) => {
        a.exports = require("lodash/isFunction");
      },
      4075: (a) => {
        a.exports = require("zlib");
      },
      4106: (a) => {
        a.exports = require("lodash/get");
      },
      4184: (a) => {
        a.exports = require("lodash/sumBy");
      },
      4562: (a) => {
        a.exports = require("react-is");
      },
      4813: (a) => {
        a.exports = require("lodash/isPlainObject");
      },
      4956: (a) => {
        a.exports = require("clsx");
      },
      5009: (a) => {
        a.exports = require("lodash/isNil");
      },
      5106: (a) => {
        a.exports = require("lodash/min");
      },
      5503: (a) => {
        a.exports = require("recharts-scale");
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
      6186: (a) => {
        a.exports = require("lodash/uniqBy");
      },
      6472: (a) => {
        a.exports = require("@opentelemetry/api");
      },
      6490: (a) => {
        a.exports = require("lodash/mapValues");
      },
      6516: (a) => {
        a.exports = require("react-smooth");
      },
      6703: (a) => {
        a.exports = require("lodash/sortBy");
      },
      6770: (a) => {
        a.exports = require("lodash/throttle");
      },
      7259: (a) => {
        a.exports = import("@radix-ui/react-tabs");
      },
      7775: (a, b, c) => {
        c.d(b, { A: () => i });
        var d = c(8732),
          e = c(9918),
          f = c.n(e),
          g = c(4233);
        let h = [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/adupload", label: "Ad Upload" },
          { href: "/analytics", label: "Analytics" },
          { href: "/wallet", label: "Wallet" },
          { href: "/settings", label: "Settings" },
        ];
        function i({ children: a }) {
          let b = (0, g.useRouter)();
          return (0, d.jsxs)("div", {
            className: "min-h-screen bg-gray-50",
            children: [
              (0, d.jsx)("nav", {
                className: "bg-white shadow-md border-b border-gray-200",
                children: (0, d.jsx)("div", {
                  className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                  children: (0, d.jsx)("div", {
                    className: "flex justify-between h-16",
                    children: (0, d.jsx)("div", {
                      className: "flex space-x-8",
                      children: h.map((a) => {
                        let c = b.pathname === a.href;
                        return (0, d.jsx)(
                          f(),
                          {
                            href: a.href,
                            className: `
                      inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ease-in-out
                      border-b-2 hover:border-green-500 focus:outline-none focus:border-green-500
                      ${c ? "border-green-600 text-green-700" : "border-transparent text-gray-700 hover:text-green-600 hover:underline"}
                    `,
                            children: a.label,
                          },
                          a.href,
                        );
                      }),
                    }),
                  }),
                }),
              }),
              (0, d.jsx)("main", { className: "p-8", children: a }),
            ],
          });
        }
      },
      7910: (a) => {
        a.exports = require("stream");
      },
      8395: (a) => {
        a.exports = require("lodash/range");
      },
      8421: (a) => {
        a.exports = import("clsx");
      },
      8496: (a) => {
        a.exports = require("@supabase/functions-js");
      },
      8648: (a) => {
        a.exports = require("lodash/max");
      },
      8725: (a) => {
        a.exports = require("lodash/every");
      },
      8732: (a) => {
        a.exports = require("react/jsx-runtime");
      },
      8894: (a) => {
        a.exports = require("lodash/isEqual");
      },
      8921: (a) => {
        a.exports = require("lodash/maxBy");
      },
      8938: (a) => {
        a.exports = import("class-variance-authority");
      },
      9021: (a) => {
        a.exports = require("fs");
      },
      9315: (a) => {
        a.exports = require("lodash/isNaN");
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
      9673: (a) => {
        a.exports = require("lodash/flatMap");
      },
      9826: (a) => {
        a.exports = require("lodash/memoize");
      },
      9888: (a) => {
        a.exports = require("lodash/first");
      },
      9947: (a) => {
        a.exports = require("lodash/omit");
      },
      9948: (a) => {
        a.exports = require("lodash/upperFirst");
      },
    }));
  var b = require("../webpack-runtime.js");
  b.C(a);
  var c = b.X(0, [2631, 3317, 5781, 4233, 9918, 284, 9825, 1690], () =>
    b((b.s = 2477)),
  );
  module.exports = c;
})();
