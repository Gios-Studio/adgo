(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3428],
  {
    14540: (e, s, t) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/dashboard/telemetry",
        function () {
          return t(21813);
        },
      ]);
    },
    21813: (e, s, t) => {
      "use strict";
      (t.r(s), t.d(s, { default: () => I }));
      var r = t(37876),
        a = t(14232),
        l = t(46958),
        n = t(31188),
        i = t(76423),
        d = t(42298),
        c = t(73534),
        o = t(34007),
        x = t(45907),
        u = t(4069),
        m = t(40570),
        h = t(25493),
        p = t(67362),
        f = t(54955),
        g = t(99306),
        y = t(33947),
        j = t(88246),
        b = t(42320),
        v = t(26400),
        N = t(17963);
      let w = (0, N.A)("Activity", [
        [
          "path",
          {
            d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
            key: "169zse",
          },
        ],
      ]);
      var _ = t(46293),
        k = t(41180),
        R = t(93784);
      let A = (0, N.A)("Globe", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          [
            "path",
            {
              d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
              key: "13o1zl",
            },
          ],
          ["path", { d: "M2 12h20", key: "9i4pu4" }],
        ]),
        C = (0, N.A)("Clock", [
          ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
          ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }],
        ]);
      var Z = t(54410);
      let L = (0, N.A)("Database", [
        ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
        ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
        ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }],
      ]);
      function I() {
        var e, s, t, N, I, B, D, S, T, z, E, W;
        let [F, M] = (0, a.useState)(null),
          [J, O] = (0, a.useState)(!0),
          [U, V] = (0, a.useState)("7"),
          [K, P] = (0, a.useState)("all"),
          q = (0, l.UU)(
            "https://rkonwkggxaohpmxmzmfn.supabase.co",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
          );
        (0, a.useEffect)(() => {
          G();
          let e = setInterval(G, 3e4);
          return () => clearInterval(e);
        }, [U, K]);
        let G = async () => {
            try {
              O(!0);
              let { data: e, error: s } = await q
                .from("license_usage_summary")
                .select("*")
                .order("usage_percentage", { ascending: !1 });
              if (s) throw s;
              let { data: t, error: r } = await q.rpc("get_license_analytics", {
                days_back: parseInt(U),
              });
              if (r) throw r;
              let a = q
                .from("telemetry_events")
                .select(
                  "\n          *,\n          licenses(license_key, plan, region)\n        ",
                )
                .order("timestamp", { ascending: !1 })
                .limit(100);
              "all" !== K && (a = a.eq("region", K));
              let { data: l, error: n } = await a;
              if (n) throw n;
              let { data: i } = await q
                .from("telemetry_events")
                .select("event_type, timestamp")
                .gte("timestamp", new Date(Date.now() - 864e5).toISOString());
              M({
                license_usage_summary: e || [],
                analytics: (null == t ? void 0 : t[0]) || {},
                recent_events: l || [],
                system_health: i || [],
              });
            } catch (e) {
              console.error("Error fetching telemetry data:", e);
            } finally {
              O(!1);
            }
          },
          X = () => {
            if (!F) return [];
            let e = {};
            F.recent_events.forEach((s) => {
              e[s.event_type] = (e[s.event_type] || 0) + 1;
            });
            let s = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"];
            return Object.entries(e).map((e, t) => {
              let [r, a] = e;
              return { name: r, value: a, color: s[t % s.length] };
            });
          };
        return J
          ? (0, r.jsx)("div", {
              className: "flex items-center justify-center h-64",
              children: (0, r.jsx)("div", {
                className:
                  "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600",
              }),
            })
          : (0, r.jsxs)("div", {
              className: "p-6 space-y-6",
              children: [
                (0, r.jsxs)("div", {
                  className: "flex justify-between items-center",
                  children: [
                    (0, r.jsxs)("div", {
                      children: [
                        (0, r.jsx)("h1", {
                          className: "text-3xl font-bold tracking-tight",
                          children: "SDK Telemetry Dashboard",
                        }),
                        (0, r.jsx)("p", {
                          className: "text-muted-foreground",
                          children:
                            "Real-time monitoring of AdGo SDK usage, performance, and health metrics",
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "flex gap-4",
                      children: [
                        (0, r.jsxs)(c.l6, {
                          value: K,
                          onValueChange: P,
                          children: [
                            (0, r.jsx)(c.bq, {
                              className: "w-32",
                              children: (0, r.jsx)(c.yv, {}),
                            }),
                            (0, r.jsxs)(c.gC, {
                              children: [
                                (0, r.jsx)(c.eb, {
                                  value: "all",
                                  children: "All Regions",
                                }),
                                (0, r.jsx)(c.eb, {
                                  value: "global",
                                  children: "Global",
                                }),
                                (0, r.jsx)(c.eb, {
                                  value: "eu",
                                  children: "Europe",
                                }),
                                (0, r.jsx)(c.eb, {
                                  value: "africa",
                                  children: "Africa",
                                }),
                                (0, r.jsx)(c.eb, {
                                  value: "asia",
                                  children: "Asia",
                                }),
                                (0, r.jsx)(c.eb, {
                                  value: "americas",
                                  children: "Americas",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, r.jsxs)(c.l6, {
                          value: U,
                          onValueChange: V,
                          children: [
                            (0, r.jsx)(c.bq, {
                              className: "w-32",
                              children: (0, r.jsx)(c.yv, {}),
                            }),
                            (0, r.jsxs)(c.gC, {
                              children: [
                                (0, r.jsx)(c.eb, {
                                  value: "1",
                                  children: "Last 24h",
                                }),
                                (0, r.jsx)(c.eb, {
                                  value: "7",
                                  children: "Last 7 days",
                                }),
                                (0, r.jsx)(c.eb, {
                                  value: "30",
                                  children: "Last 30 days",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, r.jsxs)(d.$, {
                          onClick: G,
                          variant: "outline",
                          children: [
                            (0, r.jsx)(w, { className: "w-4 h-4 mr-2" }),
                            "Refresh",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
                  children: [
                    (0, r.jsxs)(n.Zp, {
                      children: [
                        (0, r.jsxs)(n.aR, {
                          className:
                            "flex flex-row items-center justify-between space-y-0 pb-2",
                          children: [
                            (0, r.jsx)(n.ZB, {
                              className: "text-sm font-medium",
                              children: "Active Licenses",
                            }),
                            (0, r.jsx)(_.A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                        (0, r.jsxs)(n.Wu, {
                          children: [
                            (0, r.jsx)("div", {
                              className: "text-2xl font-bold",
                              children:
                                (null == F || null == (e = F.analytics)
                                  ? void 0
                                  : e.active_licenses) || 0,
                            }),
                            (0, r.jsxs)("p", {
                              className: "text-xs text-muted-foreground",
                              children: [
                                "+",
                                (
                                  (((null == F || null == (s = F.analytics)
                                    ? void 0
                                    : s.active_licenses) || 0) /
                                    Math.max(
                                      (null == F || null == (t = F.analytics)
                                        ? void 0
                                        : t.total_licenses) || 1,
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
                    (0, r.jsxs)(n.Zp, {
                      children: [
                        (0, r.jsxs)(n.aR, {
                          className:
                            "flex flex-row items-center justify-between space-y-0 pb-2",
                          children: [
                            (0, r.jsx)(n.ZB, {
                              className: "text-sm font-medium",
                              children: "Total API Usage",
                            }),
                            (0, r.jsx)(k.A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                        (0, r.jsxs)(n.Wu, {
                          children: [
                            (0, r.jsx)("div", {
                              className: "text-2xl font-bold",
                              children:
                                (null == F ||
                                null == (I = F.analytics) ||
                                null == (N = I.total_usage)
                                  ? void 0
                                  : N.toLocaleString()) || 0,
                            }),
                            (0, r.jsxs)("p", {
                              className: "text-xs text-muted-foreground",
                              children: [
                                "Avg: ",
                                (null == F ||
                                null == (D = F.analytics) ||
                                null == (B = D.avg_usage_per_license)
                                  ? void 0
                                  : B.toFixed(1)) || 0,
                                " per license",
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)(n.Zp, {
                      children: [
                        (0, r.jsxs)(n.aR, {
                          className:
                            "flex flex-row items-center justify-between space-y-0 pb-2",
                          children: [
                            (0, r.jsx)(n.ZB, {
                              className: "text-sm font-medium",
                              children: "Error Rate",
                            }),
                            (0, r.jsx)(R.A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                        (0, r.jsxs)(n.Wu, {
                          children: [
                            (0, r.jsxs)("div", {
                              className: "text-2xl font-bold",
                              children: [
                                (null == F ||
                                null == (T = F.analytics) ||
                                null == (S = T.error_rate)
                                  ? void 0
                                  : S.toFixed(2)) || 0,
                                "%",
                              ],
                            }),
                            (0, r.jsxs)("p", {
                              className: "text-xs text-muted-foreground",
                              children: ["Last ", U, " days"],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)(n.Zp, {
                      children: [
                        (0, r.jsxs)(n.aR, {
                          className:
                            "flex flex-row items-center justify-between space-y-0 pb-2",
                          children: [
                            (0, r.jsx)(n.ZB, {
                              className: "text-sm font-medium",
                              children: "Top Region",
                            }),
                            (0, r.jsx)(A, {
                              className: "h-4 w-4 text-muted-foreground",
                            }),
                          ],
                        }),
                        (0, r.jsxs)(n.Wu, {
                          children: [
                            (0, r.jsx)("div", {
                              className: "text-2xl font-bold capitalize",
                              children:
                                (null == F || null == (z = F.analytics)
                                  ? void 0
                                  : z.top_region) || "Global",
                            }),
                            (0, r.jsx)("p", {
                              className: "text-xs text-muted-foreground",
                              children: "Most active region",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "grid gap-6 md:grid-cols-2",
                  children: [
                    (0, r.jsxs)(n.Zp, {
                      children: [
                        (0, r.jsxs)(n.aR, {
                          children: [
                            (0, r.jsxs)(n.ZB, {
                              className: "flex items-center gap-2",
                              children: [
                                (0, r.jsx)(C, { className: "w-5 h-5" }),
                                "Events Timeline",
                              ],
                            }),
                            (0, r.jsx)(n.BT, {
                              children:
                                "Daily event volume over the last 7 days",
                            }),
                          ],
                        }),
                        (0, r.jsx)(n.Wu, {
                          children: (0, r.jsx)(o.u, {
                            width: "100%",
                            height: 300,
                            children: (0, r.jsxs)(x.b, {
                              data: (() => {
                                if (!F) return [];
                                let e = {};
                                return (
                                  F.recent_events.forEach((s) => {
                                    let t = new Date(
                                      s.timestamp,
                                    ).toLocaleDateString();
                                    e[t] = (e[t] || 0) + 1;
                                  }),
                                  Object.entries(e)
                                    .map((e) => {
                                      let [s, t] = e;
                                      return { day: s, events: t };
                                    })
                                    .slice(-7)
                                );
                              })(),
                              children: [
                                (0, r.jsx)(u.d, { strokeDasharray: "3 3" }),
                                (0, r.jsx)(m.W, { dataKey: "day" }),
                                (0, r.jsx)(h.h, {}),
                                (0, r.jsx)(p.m, {}),
                                (0, r.jsx)(f.N, {
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
                    (0, r.jsxs)(n.Zp, {
                      children: [
                        (0, r.jsxs)(n.aR, {
                          children: [
                            (0, r.jsxs)(n.ZB, {
                              className: "flex items-center gap-2",
                              children: [
                                (0, r.jsx)(w, { className: "w-5 h-5" }),
                                "Event Types Distribution",
                              ],
                            }),
                            (0, r.jsx)(n.BT, {
                              children:
                                "Breakdown of event types in selected period",
                            }),
                          ],
                        }),
                        (0, r.jsx)(n.Wu, {
                          children: (0, r.jsx)(o.u, {
                            width: "100%",
                            height: 300,
                            children: (0, r.jsxs)(g.r, {
                              children: [
                                (0, r.jsx)(y.F, {
                                  data: X(),
                                  cx: "50%",
                                  cy: "50%",
                                  labelLine: !1,
                                  label: (e) => {
                                    let { name: s, percent: t } = e;
                                    return ""
                                      .concat(s, " ")
                                      .concat((100 * t).toFixed(0), "%");
                                  },
                                  outerRadius: 80,
                                  fill: "#8884d8",
                                  dataKey: "value",
                                  children: X().map((e, s) =>
                                    (0, r.jsx)(
                                      j.f,
                                      { fill: e.color },
                                      "cell-".concat(s),
                                    ),
                                  ),
                                }),
                                (0, r.jsx)(p.m, {}),
                              ],
                            }),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)(n.Zp, {
                  children: [
                    (0, r.jsxs)(n.aR, {
                      children: [
                        (0, r.jsxs)(n.ZB, {
                          className: "flex items-center gap-2",
                          children: [
                            (0, r.jsx)(Z.A, { className: "w-5 h-5" }),
                            "License Usage Overview",
                          ],
                        }),
                        (0, r.jsx)(n.BT, {
                          children:
                            "Usage statistics and health status for all active licenses",
                        }),
                      ],
                    }),
                    (0, r.jsx)(n.Wu, {
                      children: (0, r.jsx)(o.u, {
                        width: "100%",
                        height: 400,
                        children: (0, r.jsxs)(b.E, {
                          data: F
                            ? F.license_usage_summary.map((e) => ({
                                license_key:
                                  e.license_key.substring(0, 12) + "...",
                                usage_percentage: e.usage_percentage,
                                plan: e.plan,
                                region: e.region,
                                health: e.health_status,
                              }))
                            : [],
                          children: [
                            (0, r.jsx)(u.d, { strokeDasharray: "3 3" }),
                            (0, r.jsx)(m.W, { dataKey: "license_key" }),
                            (0, r.jsx)(h.h, {}),
                            (0, r.jsx)(p.m, {}),
                            (0, r.jsx)(v.y, {
                              dataKey: "usage_percentage",
                              fill: "#8884d8",
                            }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
                (0, r.jsxs)(n.Zp, {
                  children: [
                    (0, r.jsxs)(n.aR, {
                      children: [
                        (0, r.jsxs)(n.ZB, {
                          className: "flex items-center gap-2",
                          children: [
                            (0, r.jsx)(L, { className: "w-5 h-5" }),
                            "License Status Details",
                          ],
                        }),
                        (0, r.jsx)(n.BT, {
                          children:
                            "Detailed view of license usage, limits, and health status",
                        }),
                      ],
                    }),
                    (0, r.jsx)(n.Wu, {
                      children: (0, r.jsx)("div", {
                        className: "overflow-x-auto",
                        children: (0, r.jsxs)("table", {
                          className:
                            "w-full border-collapse border border-gray-300",
                          children: [
                            (0, r.jsx)("thead", {
                              children: (0, r.jsxs)("tr", {
                                className: "bg-gray-50",
                                children: [
                                  (0, r.jsx)("th", {
                                    className:
                                      "border border-gray-300 px-4 py-2 text-left",
                                    children: "License Key",
                                  }),
                                  (0, r.jsx)("th", {
                                    className:
                                      "border border-gray-300 px-4 py-2 text-left",
                                    children: "Plan",
                                  }),
                                  (0, r.jsx)("th", {
                                    className:
                                      "border border-gray-300 px-4 py-2 text-left",
                                    children: "Region",
                                  }),
                                  (0, r.jsx)("th", {
                                    className:
                                      "border border-gray-300 px-4 py-2 text-right",
                                    children: "Usage",
                                  }),
                                  (0, r.jsx)("th", {
                                    className:
                                      "border border-gray-300 px-4 py-2 text-right",
                                    children: "Remaining",
                                  }),
                                  (0, r.jsx)("th", {
                                    className:
                                      "border border-gray-300 px-4 py-2 text-center",
                                    children: "Health",
                                  }),
                                  (0, r.jsx)("th", {
                                    className:
                                      "border border-gray-300 px-4 py-2 text-left",
                                    children: "Last Used",
                                  }),
                                ],
                              }),
                            }),
                            (0, r.jsx)("tbody", {
                              children:
                                null == F ||
                                null == (E = F.license_usage_summary)
                                  ? void 0
                                  : E.slice(0, 20).map((e, s) =>
                                      (0, r.jsxs)(
                                        "tr",
                                        {
                                          className:
                                            s % 2 == 0
                                              ? "bg-white"
                                              : "bg-gray-50",
                                          children: [
                                            (0, r.jsxs)("td", {
                                              className:
                                                "border border-gray-300 px-4 py-2 font-mono text-sm",
                                              children: [
                                                e.license_key.substring(0, 16),
                                                "...",
                                              ],
                                            }),
                                            (0, r.jsx)("td", {
                                              className:
                                                "border border-gray-300 px-4 py-2",
                                              children: (0, r.jsx)(i.E, {
                                                variant:
                                                  "enterprise" === e.plan
                                                    ? "default"
                                                    : "pro" === e.plan
                                                      ? "secondary"
                                                      : "outline",
                                                children: e.plan,
                                              }),
                                            }),
                                            (0, r.jsx)("td", {
                                              className:
                                                "border border-gray-300 px-4 py-2 capitalize",
                                              children: e.region,
                                            }),
                                            (0, r.jsxs)("td", {
                                              className:
                                                "border border-gray-300 px-4 py-2 text-right",
                                              children: [
                                                e.usage_count.toLocaleString(),
                                                " / ",
                                                e.usage_limit.toLocaleString(),
                                              ],
                                            }),
                                            (0, r.jsx)("td", {
                                              className:
                                                "border border-gray-300 px-4 py-2 text-right",
                                              children:
                                                e.remaining_calls.toLocaleString(),
                                            }),
                                            (0, r.jsx)("td", {
                                              className:
                                                "border border-gray-300 px-4 py-2 text-center",
                                              children: (0, r.jsx)("div", {
                                                className:
                                                  "inline-block w-3 h-3 rounded-full ".concat(
                                                    ((e) => {
                                                      switch (e) {
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
                                                    })(e.health_status),
                                                  ),
                                              }),
                                            }),
                                            (0, r.jsx)("td", {
                                              className:
                                                "border border-gray-300 px-4 py-2 text-sm",
                                              children: e.last_used
                                                ? new Date(
                                                    e.last_used,
                                                  ).toLocaleDateString()
                                                : "Never",
                                            }),
                                          ],
                                        },
                                        e.id,
                                      ),
                                    ),
                            }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
                (0, r.jsxs)(n.Zp, {
                  children: [
                    (0, r.jsxs)(n.aR, {
                      children: [
                        (0, r.jsx)(n.ZB, {
                          children: "Recent Telemetry Events",
                        }),
                        (0, r.jsx)(n.BT, {
                          children:
                            "Latest events from all SDK instances (max 50 shown)",
                        }),
                      ],
                    }),
                    (0, r.jsx)(n.Wu, {
                      children: (0, r.jsx)("div", {
                        className: "space-y-2 max-h-96 overflow-y-auto",
                        children:
                          null == F || null == (W = F.recent_events)
                            ? void 0
                            : W.slice(0, 50).map((e, s) => {
                                var t, a;
                                return (0, r.jsxs)(
                                  "div",
                                  {
                                    className:
                                      "flex items-center justify-between p-3 border rounded-lg",
                                    children: [
                                      (0, r.jsxs)("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                          (0, r.jsx)(i.E, {
                                            variant:
                                              "error" === e.event_type
                                                ? "destructive"
                                                : "outline",
                                            children: e.event_type,
                                          }),
                                          (0, r.jsxs)("span", {
                                            className: "text-sm font-mono",
                                            children: [
                                              null == (a = e.licenses) ||
                                              null == (t = a.license_key)
                                                ? void 0
                                                : t.substring(0, 12),
                                              "...",
                                            ],
                                          }),
                                          (0, r.jsx)("span", {
                                            className:
                                              "text-sm text-muted-foreground capitalize",
                                            children: e.region,
                                          }),
                                        ],
                                      }),
                                      (0, r.jsx)("div", {
                                        className:
                                          "text-xs text-muted-foreground",
                                        children: new Date(
                                          e.timestamp,
                                        ).toLocaleString(),
                                      }),
                                    ],
                                  },
                                  e.id,
                                );
                              }),
                      }),
                    }),
                  ],
                }),
              ],
            });
      }
    },
    27025: (e, s, t) => {
      "use strict";
      t.d(s, { cn: () => l });
      var r = t(69241),
        a = t(29573);
      function l() {
        for (var e = arguments.length, s = Array(e), t = 0; t < e; t++)
          s[t] = arguments[t];
        return (0, a.QP)((0, r.$)(s));
      }
    },
    31188: (e, s, t) => {
      "use strict";
      t.d(s, {
        BT: () => c,
        Wu: () => o,
        ZB: () => d,
        Zp: () => n,
        aR: () => i,
      });
      var r = t(37876),
        a = t(14232),
        l = t(27025);
      let n = a.forwardRef((e, s) => {
        let { className: t, ...a } = e;
        return (0, r.jsx)("div", {
          ref: s,
          className: (0, l.cn)(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            t,
          ),
          ...a,
        });
      });
      n.displayName = "Card";
      let i = a.forwardRef((e, s) => {
        let { className: t, ...a } = e;
        return (0, r.jsx)("div", {
          ref: s,
          className: (0, l.cn)("flex flex-col space-y-1.5 p-6", t),
          ...a,
        });
      });
      i.displayName = "CardHeader";
      let d = a.forwardRef((e, s) => {
        let { className: t, ...a } = e;
        return (0, r.jsx)("h3", {
          ref: s,
          className: (0, l.cn)(
            "text-2xl font-semibold leading-none tracking-tight",
            t,
          ),
          ...a,
        });
      });
      d.displayName = "CardTitle";
      let c = a.forwardRef((e, s) => {
        let { className: t, ...a } = e;
        return (0, r.jsx)("p", {
          ref: s,
          className: (0, l.cn)("text-sm text-muted-foreground", t),
          ...a,
        });
      });
      c.displayName = "CardDescription";
      let o = a.forwardRef((e, s) => {
        let { className: t, ...a } = e;
        return (0, r.jsx)("div", {
          ref: s,
          className: (0, l.cn)("p-6 pt-0", t),
          ...a,
        });
      });
      ((o.displayName = "CardContent"),
        (a.forwardRef((e, s) => {
          let { className: t, ...a } = e;
          return (0, r.jsx)("div", {
            ref: s,
            className: (0, l.cn)("flex items-center p-6 pt-0", t),
            ...a,
          });
        }).displayName = "CardFooter"));
    },
    42298: (e, s, t) => {
      "use strict";
      t.d(s, { $: () => c });
      var r = t(37876),
        a = t(14232),
        l = t(82987),
        n = t(47137),
        i = t(27025);
      let d = (0, n.F)(
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
        c = a.forwardRef((e, s) => {
          let { className: t, variant: a, size: n, asChild: c = !1, ...o } = e,
            x = c ? l.DX : "button";
          return (0, r.jsx)(x, {
            className: (0, i.cn)(d({ variant: a, size: n, className: t })),
            ref: s,
            ...o,
          });
        });
      c.displayName = "Button";
    },
    54410: (e, s, t) => {
      "use strict";
      t.d(s, { A: () => r });
      let r = (0, t(17963).A)("Shield", [
        [
          "path",
          {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y",
          },
        ],
      ]);
    },
    73534: (e, s, t) => {
      "use strict";
      t.d(s, {
        bq: () => u,
        eb: () => f,
        gC: () => p,
        l6: () => o,
        yv: () => x,
      });
      var r = t(37876),
        a = t(14232),
        l = t(87791),
        n = t(58725),
        i = t(16076),
        d = t(32257),
        c = t(27025);
      let o = l.bL;
      l.YJ;
      let x = l.WT,
        u = a.forwardRef((e, s) => {
          let { className: t, children: a, ...i } = e;
          return (0, r.jsxs)(l.l9, {
            ref: s,
            className: (0, c.cn)(
              "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
              t,
            ),
            ...i,
            children: [
              a,
              (0, r.jsx)(l.In, {
                asChild: !0,
                children: (0, r.jsx)(n.A, { className: "h-4 w-4 opacity-50" }),
              }),
            ],
          });
        });
      u.displayName = l.l9.displayName;
      let m = a.forwardRef((e, s) => {
        let { className: t, ...a } = e;
        return (0, r.jsx)(l.PP, {
          ref: s,
          className: (0, c.cn)(
            "flex cursor-default items-center justify-center py-1",
            t,
          ),
          ...a,
          children: (0, r.jsx)(i.A, { className: "h-4 w-4" }),
        });
      });
      m.displayName = l.PP.displayName;
      let h = a.forwardRef((e, s) => {
        let { className: t, ...a } = e;
        return (0, r.jsx)(l.wn, {
          ref: s,
          className: (0, c.cn)(
            "flex cursor-default items-center justify-center py-1",
            t,
          ),
          ...a,
          children: (0, r.jsx)(n.A, { className: "h-4 w-4" }),
        });
      });
      h.displayName = l.wn.displayName;
      let p = a.forwardRef((e, s) => {
        let { className: t, children: a, position: n = "popper", ...i } = e;
        return (0, r.jsx)(l.ZL, {
          children: (0, r.jsxs)(l.UC, {
            ref: s,
            className: (0, c.cn)(
              "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              "popper" === n &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
              t,
            ),
            position: n,
            ...i,
            children: [
              (0, r.jsx)(m, {}),
              (0, r.jsx)(l.LM, {
                className: (0, c.cn)(
                  "p-1",
                  "popper" === n &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                ),
                children: a,
              }),
              (0, r.jsx)(h, {}),
            ],
          }),
        });
      });
      ((p.displayName = l.UC.displayName),
        (a.forwardRef((e, s) => {
          let { className: t, ...a } = e;
          return (0, r.jsx)(l.JU, {
            ref: s,
            className: (0, c.cn)("py-1.5 pl-8 pr-2 text-sm font-semibold", t),
            ...a,
          });
        }).displayName = l.JU.displayName));
      let f = a.forwardRef((e, s) => {
        let { className: t, children: a, ...n } = e;
        return (0, r.jsxs)(l.q7, {
          ref: s,
          className: (0, c.cn)(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            t,
          ),
          ...n,
          children: [
            (0, r.jsx)("span", {
              className:
                "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
              children: (0, r.jsx)(l.VF, {
                children: (0, r.jsx)(d.A, { className: "h-4 w-4" }),
              }),
            }),
            (0, r.jsx)(l.p4, { children: a }),
          ],
        });
      });
      ((f.displayName = l.q7.displayName),
        (a.forwardRef((e, s) => {
          let { className: t, ...a } = e;
          return (0, r.jsx)(l.wv, {
            ref: s,
            className: (0, c.cn)("-mx-1 my-1 h-px bg-muted", t),
            ...a,
          });
        }).displayName = l.wv.displayName));
    },
    76423: (e, s, t) => {
      "use strict";
      t.d(s, { E: () => i });
      var r = t(37876);
      t(14232);
      var a = t(47137),
        l = t(27025);
      let n = (0, a.F)(
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
      function i(e) {
        let { className: s, variant: t, ...a } = e;
        return (0, r.jsx)("div", {
          className: (0, l.cn)(n({ variant: t }), s),
          ...a,
        });
      }
    },
  },
  (e) => {
    (e.O(0, [1987, 9853, 9956, 6582, 636, 6593, 8792], () => e((e.s = 14540))),
      (_N_E = e.O()));
  },
]);
