(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [9304],
  {
    12564: (e, a, n) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/dev/events-test",
        function () {
          return n(69087);
        },
      ]);
    },
    69087: (e, a, n) => {
      "use strict";
      (n.r(a), n.d(a, { default: () => i }));
      var s = n(37876),
        t = n(14232);
      function i() {
        let [e, a] = (0, t.useState)("3aeff106-1335-4121-844f-846addcb29f9"),
          [n, i] = (0, t.useState)("ride-demo-123"),
          [d, r] = (0, t.useState)(null);
        async function c(a) {
          let s = await fetch("/api/sdk/event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ campaign_id: e, ride_id: n, event_type: a }),
          });
          r(await s.json());
        }
        async function o() {
          let a = await fetch("/api/metrics/ctr?campaign_id=".concat(e));
          r(await a.json());
        }
        return (0, s.jsxs)("div", {
          className: "p-4 space-y-3",
          children: [
            (0, s.jsxs)("div", {
              className: "flex gap-2",
              children: [
                (0, s.jsx)("input", {
                  className: "border p-2 rounded",
                  value: e,
                  onChange: (e) => a(e.target.value),
                }),
                (0, s.jsx)("input", {
                  className: "border p-2 rounded",
                  value: n,
                  onChange: (e) => i(e.target.value),
                }),
              ],
            }),
            (0, s.jsxs)("div", {
              className: "flex gap-2",
              children: [
                (0, s.jsx)("button", {
                  className: "border rounded px-3 py-2",
                  onClick: () => c("impression"),
                  children: "Emit Impression",
                }),
                (0, s.jsx)("button", {
                  className: "border rounded px-3 py-2",
                  onClick: () => c("click"),
                  children: "Emit Click",
                }),
                (0, s.jsx)("button", {
                  className: "border rounded px-3 py-2",
                  onClick: o,
                  children: "Fetch CTR",
                }),
              ],
            }),
            (0, s.jsx)("pre", {
              className: "border rounded p-3 text-xs overflow-auto",
              children: JSON.stringify(d, null, 2),
            }),
          ],
        });
      }
    },
  },
  (e) => {
    (e.O(0, [636, 6593, 8792], () => e((e.s = 12564))), (_N_E = e.O()));
  },
]);
