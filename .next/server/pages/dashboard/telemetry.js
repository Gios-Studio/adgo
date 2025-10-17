"use strict";
(() => {
  var a = {};
  ((a.id = 3428),
    (a.ids = [636, 3220, 3428]),
    (a.modules = {
      30: (a) => {
        a.exports = require("lodash/some");
      },
      133: (a) => {
        a.exports = require("lodash/find");
      },
      242: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            (c.r(b), c.d(b, { default: () => o, getStaticProps: () => p }));
            var e = c(8732),
              f = c(2015),
              g = c(938),
              h = c(2885),
              i = c(1354),
              j = c(1339),
              k = c(4719),
              l = c(284),
              m = c(1302),
              n = a([h, i, j, k]);
            function o() {
              let [a, b] = (0, f.useState)(null),
                [c, d] = (0, f.useState)(!0),
                [n, o] = (0, f.useState)("7"),
                [p, q] = (0, f.useState)("all"),
                r = (0, g.createClient)(
                  "https://rkonwkggxaohpmxmzmfn.supabase.co",
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
                ),
                s = async () => {
                  try {
                    d(!0);
                    let { data: a, error: c } = await r
                      .from("license_usage_summary")
                      .select("*")
                      .order("usage_percentage", { ascending: !1 });
                    if (c) throw c;
                    let { data: e, error: f } = await r.rpc(
                      "get_license_analytics",
                      { days_back: parseInt(n) },
                    );
                    if (f) throw f;
                    let g = r
                      .from("telemetry_events")
                      .select(
                        `
          *,
          licenses(license_key, plan, region)
        `,
                      )
                      .order("timestamp", { ascending: !1 })
                      .limit(100);
                    "all" !== p && (g = g.eq("region", p));
                    let { data: h, error: i } = await g;
                    if (i) throw i;
                    let { data: j } = await r
                      .from("telemetry_events")
                      .select("event_type, timestamp")
                      .gte(
                        "timestamp",
                        new Date(Date.now() - 864e5).toISOString(),
                      );
                    b({
                      license_usage_summary: a || [],
                      analytics: e?.[0] || {},
                      recent_events: h || [],
                      system_health: j || [],
                    });
                  } catch (a) {
                    console.error("Error fetching telemetry data:", a);
                  } finally {
                    d(!1);
                  }
                },
                t = () => {
                  if (!a) return [];
                  let b = {};
                  a.recent_events.forEach((a) => {
                    b[a.event_type] = (b[a.event_type] || 0) + 1;
                  });
                  let c = [
                    "#8884d8",
                    "#82ca9d",
                    "#ffc658",
                    "#ff7c7c",
                    "#8dd1e1",
                  ];
                  return Object.entries(b).map(([a, b], d) => ({
                    name: a,
                    value: b,
                    color: c[d % c.length],
                  }));
                };
              return c
                ? (0, e.jsx)("div", {
                    className: "flex items-center justify-center h-64",
                    children: (0, e.jsx)("div", {
                      className:
                        "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600",
                    }),
                  })
                : (0, e.jsxs)("div", {
                    className: "p-6 space-y-6",
                    children: [
                      (0, e.jsxs)("div", {
                        className: "flex justify-between items-center",
                        children: [
                          (0, e.jsxs)("div", {
                            children: [
                              (0, e.jsx)("h1", {
                                className: "text-3xl font-bold tracking-tight",
                                children: "SDK Telemetry Dashboard",
                              }),
                              (0, e.jsx)("p", {
                                className: "text-muted-foreground",
                                children:
                                  "Real-time monitoring of AdGo SDK usage, performance, and health metrics",
                              }),
                            ],
                          }),
                          (0, e.jsxs)("div", {
                            className: "flex gap-4",
                            children: [
                              (0, e.jsxs)(k.l6, {
                                value: p,
                                onValueChange: q,
                                children: [
                                  (0, e.jsx)(k.bq, {
                                    className: "w-32",
                                    children: (0, e.jsx)(k.yv, {}),
                                  }),
                                  (0, e.jsxs)(k.gC, {
                                    children: [
                                      (0, e.jsx)(k.eb, {
                                        value: "all",
                                        children: "All Regions",
                                      }),
                                      (0, e.jsx)(k.eb, {
                                        value: "global",
                                        children: "Global",
                                      }),
                                      (0, e.jsx)(k.eb, {
                                        value: "eu",
                                        children: "Europe",
                                      }),
                                      (0, e.jsx)(k.eb, {
                                        value: "africa",
                                        children: "Africa",
                                      }),
                                      (0, e.jsx)(k.eb, {
                                        value: "asia",
                                        children: "Asia",
                                      }),
                                      (0, e.jsx)(k.eb, {
                                        value: "americas",
                                        children: "Americas",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, e.jsxs)(k.l6, {
                                value: n,
                                onValueChange: o,
                                children: [
                                  (0, e.jsx)(k.bq, {
                                    className: "w-32",
                                    children: (0, e.jsx)(k.yv, {}),
                                  }),
                                  (0, e.jsxs)(k.gC, {
                                    children: [
                                      (0, e.jsx)(k.eb, {
                                        value: "1",
                                        children: "Last 24h",
                                      }),
                                      (0, e.jsx)(k.eb, {
                                        value: "7",
                                        children: "Last 7 days",
                                      }),
                                      (0, e.jsx)(k.eb, {
                                        value: "30",
                                        children: "Last 30 days",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              (0, e.jsxs)(j.$, {
                                onClick: s,
                                variant: "outline",
                                children: [
                                  (0, e.jsx)(m.Ilq, {
                                    className: "w-4 h-4 mr-2",
                                  }),
                                  "Refresh",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, e.jsxs)("div", {
                        className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
                        children: [
                          (0, e.jsxs)(h.Zp, {
                            children: [
                              (0, e.jsxs)(h.aR, {
                                className:
                                  "flex flex-row items-center justify-between space-y-0 pb-2",
                                children: [
                                  (0, e.jsx)(h.ZB, {
                                    className: "text-sm font-medium",
                                    children: "Active Licenses",
                                  }),
                                  (0, e.jsx)(m.zWC, {
                                    className: "h-4 w-4 text-muted-foreground",
                                  }),
                                ],
                              }),
                              (0, e.jsxs)(h.Wu, {
                                children: [
                                  (0, e.jsx)("div", {
                                    className: "text-2xl font-bold",
                                    children:
                                      a?.analytics?.active_licenses || 0,
                                  }),
                                  (0, e.jsxs)("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: [
                                      "+",
                                      (
                                        ((a?.analytics?.active_licenses || 0) /
                                          Math.max(
                                            a?.analytics?.total_licenses || 1,
                                            1,
                                          )) *
                                        100
                                      ).toFixed(1),
                                      "% active",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, e.jsxs)(h.Zp, {
                            children: [
                              (0, e.jsxs)(h.aR, {
                                className:
                                  "flex flex-row items-center justify-between space-y-0 pb-2",
                                children: [
                                  (0, e.jsx)(h.ZB, {
                                    className: "text-sm font-medium",
                                    children: "Total API Usage",
                                  }),
                                  (0, e.jsx)(m.ntg, {
                                    className: "h-4 w-4 text-muted-foreground",
                                  }),
                                ],
                              }),
                              (0, e.jsxs)(h.Wu, {
                                children: [
                                  (0, e.jsx)("div", {
                                    className: "text-2xl font-bold",
                                    children:
                                      a?.analytics?.total_usage?.toLocaleString() ||
                                      0,
                                  }),
                                  (0, e.jsxs)("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: [
                                      "Avg: ",
                                      a?.analytics?.avg_usage_per_license?.toFixed(
                                        1,
                                      ) || 0,
                                      " per license",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, e.jsxs)(h.Zp, {
                            children: [
                              (0, e.jsxs)(h.aR, {
                                className:
                                  "flex flex-row items-center justify-between space-y-0 pb-2",
                                children: [
                                  (0, e.jsx)(h.ZB, {
                                    className: "text-sm font-medium",
                                    children: "Error Rate",
                                  }),
                                  (0, e.jsx)(m.hcu, {
                                    className: "h-4 w-4 text-muted-foreground",
                                  }),
                                ],
                              }),
                              (0, e.jsxs)(h.Wu, {
                                children: [
                                  (0, e.jsxs)("div", {
                                    className: "text-2xl font-bold",
                                    children: [
                                      a?.analytics?.error_rate?.toFixed(2) || 0,
                                      "%",
                                    ],
                                  }),
                                  (0, e.jsxs)("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: ["Last ", n, " days"],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, e.jsxs)(h.Zp, {
                            children: [
                              (0, e.jsxs)(h.aR, {
                                className:
                                  "flex flex-row items-center justify-between space-y-0 pb-2",
                                children: [
                                  (0, e.jsx)(h.ZB, {
                                    className: "text-sm font-medium",
                                    children: "Top Region",
                                  }),
                                  (0, e.jsx)(m.qzq, {
                                    className: "h-4 w-4 text-muted-foreground",
                                  }),
                                ],
                              }),
                              (0, e.jsxs)(h.Wu, {
                                children: [
                                  (0, e.jsx)("div", {
                                    className: "text-2xl font-bold capitalize",
                                    children:
                                      a?.analytics?.top_region || "Global",
                                  }),
                                  (0, e.jsx)("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Most active region",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, e.jsxs)("div", {
                        className: "grid gap-6 md:grid-cols-2",
                        children: [
                          (0, e.jsxs)(h.Zp, {
                            children: [
                              (0, e.jsxs)(h.aR, {
                                children: [
                                  (0, e.jsxs)(h.ZB, {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, e.jsx)(m.zD7, {
                                        className: "w-5 h-5",
                                      }),
                                      "Events Timeline",
                                    ],
                                  }),
                                  (0, e.jsx)(h.BT, {
                                    children:
                                      "Daily event volume over the last 7 days",
                                  }),
                                ],
                              }),
                              (0, e.jsx)(h.Wu, {
                                children: (0, e.jsx)(l.uf, {
                                  width: "100%",
                                  height: 300,
                                  children: (0, e.jsxs)(l.bl, {
                                    data: (() => {
                                      if (!a) return [];
                                      let b = {};
                                      return (
                                        a.recent_events.forEach((a) => {
                                          let c = new Date(
                                            a.timestamp,
                                          ).toLocaleDateString();
                                          b[c] = (b[c] || 0) + 1;
                                        }),
                                        Object.entries(b)
                                          .map(([a, b]) => ({
                                            day: a,
                                            events: b,
                                          }))
                                          .slice(-7)
                                      );
                                    })(),
                                    children: [
                                      (0, e.jsx)(l.dC, {
                                        strokeDasharray: "3 3",
                                      }),
                                      (0, e.jsx)(l.WX, { dataKey: "day" }),
                                      (0, e.jsx)(l.h8, {}),
                                      (0, e.jsx)(l.m_, {}),
                                      (0, e.jsx)(l.N1, {
                                        type: "monotone",
                                        dataKey: "events",
                                        stroke: "#8884d8",
                                        strokeWidth: 2,
                                      }),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                          (0, e.jsxs)(h.Zp, {
                            children: [
                              (0, e.jsxs)(h.aR, {
                                children: [
                                  (0, e.jsxs)(h.ZB, {
                                    className: "flex items-center gap-2",
                                    children: [
                                      (0, e.jsx)(m.Ilq, {
                                        className: "w-5 h-5",
                                      }),
                                      "Event Types Distribution",
                                    ],
                                  }),
                                  (0, e.jsx)(h.BT, {
                                    children:
                                      "Breakdown of event types in selected period",
                                  }),
                                ],
                              }),
                              (0, e.jsx)(h.Wu, {
                                children: (0, e.jsx)(l.uf, {
                                  width: "100%",
                                  height: 300,
                                  children: (0, e.jsxs)(l.rW, {
                                    children: [
                                      (0, e.jsx)(l.Fq, {
                                        data: t(),
                                        cx: "50%",
                                        cy: "50%",
                                        labelLine: !1,
                                        label: ({ name: a, percent: b }) =>
                                          `${a} ${(100 * b).toFixed(0)}%`,
                                        outerRadius: 80,
                                        fill: "#8884d8",
                                        dataKey: "value",
                                        children: t().map((a, b) =>
                                          (0, e.jsx)(
                                            l.fh,
                                            { fill: a.color },
                                            `cell-${b}`,
                                          ),
                                        ),
                                      }),
                                      (0, e.jsx)(l.m_, {}),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, e.jsxs)(h.Zp, {
                        children: [
                          (0, e.jsxs)(h.aR, {
                            children: [
                              (0, e.jsxs)(h.ZB, {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, e.jsx)(m.ekZ, { className: "w-5 h-5" }),
                                  "License Usage Overview",
                                ],
                              }),
                              (0, e.jsx)(h.BT, {
                                children:
                                  "Usage statistics and health status for all active licenses",
                              }),
                            ],
                          }),
                          (0, e.jsx)(h.Wu, {
                            children: (0, e.jsx)(l.uf, {
                              width: "100%",
                              height: 400,
                              children: (0, e.jsxs)(l.Es, {
                                data: a
                                  ? a.license_usage_summary.map((a) => ({
                                      license_key:
                                        a.license_key.substring(0, 12) + "...",
                                      usage_percentage: a.usage_percentage,
                                      plan: a.plan,
                                      region: a.region,
                                      health: a.health_status,
                                    }))
                                  : [],
                                children: [
                                  (0, e.jsx)(l.dC, { strokeDasharray: "3 3" }),
                                  (0, e.jsx)(l.WX, { dataKey: "license_key" }),
                                  (0, e.jsx)(l.h8, {}),
                                  (0, e.jsx)(l.m_, {}),
                                  (0, e.jsx)(l.yP, {
                                    dataKey: "usage_percentage",
                                    fill: "#8884d8",
                                  }),
                                ],
                              }),
                            }),
                          }),
                        ],
                      }),
                      (0, e.jsxs)(h.Zp, {
                        children: [
                          (0, e.jsxs)(h.aR, {
                            children: [
                              (0, e.jsxs)(h.ZB, {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, e.jsx)(m.WmV, { className: "w-5 h-5" }),
                                  "License Status Details",
                                ],
                              }),
                              (0, e.jsx)(h.BT, {
                                children:
                                  "Detailed view of license usage, limits, and health status",
                              }),
                            ],
                          }),
                          (0, e.jsx)(h.Wu, {
                            children: (0, e.jsx)("div", {
                              className: "overflow-x-auto",
                              children: (0, e.jsxs)("table", {
                                className:
                                  "w-full border-collapse border border-gray-300",
                                children: [
                                  (0, e.jsx)("thead", {
                                    children: (0, e.jsxs)("tr", {
                                      className: "bg-gray-50",
                                      children: [
                                        (0, e.jsx)("th", {
                                          className:
                                            "border border-gray-300 px-4 py-2 text-left",
                                          children: "License Key",
                                        }),
                                        (0, e.jsx)("th", {
                                          className:
                                            "border border-gray-300 px-4 py-2 text-left",
                                          children: "Plan",
                                        }),
                                        (0, e.jsx)("th", {
                                          className:
                                            "border border-gray-300 px-4 py-2 text-left",
                                          children: "Region",
                                        }),
                                        (0, e.jsx)("th", {
                                          className:
                                            "border border-gray-300 px-4 py-2 text-right",
                                          children: "Usage",
                                        }),
                                        (0, e.jsx)("th", {
                                          className:
                                            "border border-gray-300 px-4 py-2 text-right",
                                          children: "Remaining",
                                        }),
                                        (0, e.jsx)("th", {
                                          className:
                                            "border border-gray-300 px-4 py-2 text-center",
                                          children: "Health",
                                        }),
                                        (0, e.jsx)("th", {
                                          className:
                                            "border border-gray-300 px-4 py-2 text-left",
                                          children: "Last Used",
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, e.jsx)("tbody", {
                                    children: a?.license_usage_summary
                                      ?.slice(0, 20)
                                      .map((a, b) =>
                                        (0, e.jsxs)(
                                          "tr",
                                          {
                                            className:
                                              b % 2 == 0
                                                ? "bg-white"
                                                : "bg-gray-50",
                                            children: [
                                              (0, e.jsxs)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2 font-mono text-sm",
                                                children: [
                                                  a.license_key.substring(
                                                    0,
                                                    16,
                                                  ),
                                                  "...",
                                                ],
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2",
                                                children: (0, e.jsx)(i.E, {
                                                  variant:
                                                    "enterprise" === a.plan
                                                      ? "default"
                                                      : "pro" === a.plan
                                                        ? "secondary"
                                                        : "outline",
                                                  children: a.plan,
                                                }),
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2 capitalize",
                                                children: a.region,
                                              }),
                                              (0, e.jsxs)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2 text-right",
                                                children: [
                                                  a.usage_count.toLocaleString(),
                                                  " / ",
                                                  a.usage_limit.toLocaleString(),
                                                ],
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2 text-right",
                                                children:
                                                  a.remaining_calls.toLocaleString(),
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2 text-center",
                                                children: (0, e.jsx)("div", {
                                                  className: `inline-block w-3 h-3 rounded-full ${((
                                                    a,
                                                  ) => {
                                                    switch (a) {
                                                      case "healthy":
                                                        return "bg-green-500";
                                                      case "warning":
                                                        return "bg-yellow-500";
                                                      case "exceeded":
                                                        return "bg-red-500";
                                                      case "inactive":
                                                        return "bg-gray-500";
                                                      default:
                                                        return "bg-blue-500";
                                                    }
                                                  })(a.health_status)}`,
                                                }),
                                              }),
                                              (0, e.jsx)("td", {
                                                className:
                                                  "border border-gray-300 px-4 py-2 text-sm",
                                                children: a.last_used
                                                  ? new Date(
                                                      a.last_used,
                                                    ).toLocaleDateString()
                                                  : "Never",
                                              }),
                                            ],
                                          },
                                          a.id,
                                        ),
                                      ),
                                  }),
                                ],
                              }),
                            }),
                          }),
                        ],
                      }),
                      (0, e.jsxs)(h.Zp, {
                        children: [
                          (0, e.jsxs)(h.aR, {
                            children: [
                              (0, e.jsx)(h.ZB, {
                                children: "Recent Telemetry Events",
                              }),
                              (0, e.jsx)(h.BT, {
                                children:
                                  "Latest events from all SDK instances (max 50 shown)",
                              }),
                            ],
                          }),
                          (0, e.jsx)(h.Wu, {
                            children: (0, e.jsx)("div", {
                              className: "space-y-2 max-h-96 overflow-y-auto",
                              children: a?.recent_events
                                ?.slice(0, 50)
                                .map((a, b) =>
                                  (0, e.jsxs)(
                                    "div",
                                    {
                                      className:
                                        "flex items-center justify-between p-3 border rounded-lg",
                                      children: [
                                        (0, e.jsxs)("div", {
                                          className: "flex items-center gap-3",
                                          children: [
                                            (0, e.jsx)(i.E, {
                                              variant:
                                                "error" === a.event_type
                                                  ? "destructive"
                                                  : "outline",
                                              children: a.event_type,
                                            }),
                                            (0, e.jsxs)("span", {
                                              className: "text-sm font-mono",
                                              children: [
                                                a.licenses?.license_key?.substring(
                                                  0,
                                                  12,
                                                ),
                                                "...",
                                              ],
                                            }),
                                            (0, e.jsx)("span", {
                                              className:
                                                "text-sm text-muted-foreground capitalize",
                                              children: a.region,
                                            }),
                                          ],
                                        }),
                                        (0, e.jsx)("div", {
                                          className:
                                            "text-xs text-muted-foreground",
                                          children: new Date(
                                            a.timestamp,
                                          ).toLocaleString(),
                                        }),
                                      ],
                                    },
                                    a.id,
                                  ),
                                ),
                            }),
                          }),
                        ],
                      }),
                    ],
                  });
            }
            async function p() {
              return {
                props: { timestamp: new Date().toISOString() },
                revalidate: 60,
              };
            }
            (([h, i, j, k] = n.then ? (await n)() : n), d());
          } catch (a) {
            d(a);
          }
        });
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
      833: (a, b, c) => {
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
              k = c(242),
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
                  page: "/dashboard/telemetry",
                  pathname: "/dashboard/telemetry",
                  bundlePath: "",
                  filename: "",
                },
                distDir: ".next",
                relativeProjectDir: "",
                components: { App: j.default, Document: i() },
                userland: k,
              }),
              z = (0, l.U)({
                srcPage: "/dashboard/telemetry",
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
      1999: (a) => {
        a.exports = require("lodash/isString");
      },
      2015: (a) => {
        a.exports = require("react");
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
      4106: (a) => {
        a.exports = require("lodash/get");
      },
      4184: (a) => {
        a.exports = require("lodash/sumBy");
      },
      4562: (a) => {
        a.exports = require("react-is");
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
      7860: (a) => {
        a.exports = import("@radix-ui/react-select");
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
      9315: (a) => {
        a.exports = require("lodash/isNaN");
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
  var b = require("../../webpack-runtime.js");
  b.C(a);
  var c = b.X(0, [2631, 3317, 5781, 284, 1690], () => b((b.s = 833)));
  module.exports = c;
})();
