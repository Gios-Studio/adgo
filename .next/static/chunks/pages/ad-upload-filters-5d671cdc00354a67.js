(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8453],
  {
    41962: (e, l, o) => {
      "use strict";
      (o.r(l), o.d(l, { default: () => a }));
      var r = o(37876);
      function a(e) {
        let {
          selectedCategory: l,
          onCategoryChange: o,
          duration: a,
          onDurationChange: n,
        } = e;
        return (0, r.jsxs)("div", {
          className: "border rounded-lg p-4 space-y-4",
          children: [
            (0, r.jsxs)("div", {
              children: [
                (0, r.jsx)("label", {
                  htmlFor: "category",
                  className: "block text-sm font-medium text-gray-700",
                  children: "Ad Category",
                }),
                (0, r.jsxs)("select", {
                  id: "category",
                  value: l,
                  onChange: (e) => o(e.target.value),
                  className:
                    "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500",
                  children: [
                    (0, r.jsx)("option", {
                      value: "",
                      children: "Select a category",
                    }),
                    (0, r.jsx)("option", {
                      value: "travel",
                      children: "Travel",
                    }),
                    (0, r.jsx)("option", { value: "food", children: "Food" }),
                    (0, r.jsx)("option", { value: "tech", children: "Tech" }),
                    (0, r.jsx)("option", {
                      value: "retail",
                      children: "Retail",
                    }),
                    (0, r.jsx)("option", {
                      value: "auto",
                      children: "Automotive",
                    }),
                  ],
                }),
              ],
            }),
            (0, r.jsxs)("div", {
              children: [
                (0, r.jsx)("label", {
                  htmlFor: "duration",
                  className: "block text-sm font-medium text-gray-700",
                  children: "Ad Duration",
                }),
                (0, r.jsxs)("select", {
                  id: "duration",
                  value: a,
                  onChange: (e) => n(e.target.value),
                  className:
                    "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500",
                  children: [
                    (0, r.jsx)("option", {
                      value: "",
                      children: "Select duration",
                    }),
                    (0, r.jsx)("option", { value: "7", children: "7 days" }),
                    (0, r.jsx)("option", { value: "14", children: "14 days" }),
                    (0, r.jsx)("option", { value: "30", children: "30 days" }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      o(14232);
    },
    74912: (e, l, o) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/ad-upload-filters",
        function () {
          return o(41962);
        },
      ]);
    },
  },
  (e) => {
    (e.O(0, [636, 6593, 8792], () => e((e.s = 74912))), (_N_E = e.O()));
  },
]);
