(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [741],
  {
    18590: (e, a, r) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/ad-upload-page",
        function () {
          return r(50372);
        },
      ]);
    },
    20564: (e, a, r) => {
      "use strict";
      r.d(a, { A: () => d });
      var l = r(37876),
        s = r(48230),
        n = r.n(s),
        t = r(89099);
      let o = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/adupload", label: "Ad Upload" },
        { href: "/analytics", label: "Analytics" },
        { href: "/wallet", label: "Wallet" },
        { href: "/settings", label: "Settings" },
      ];
      function d(e) {
        let { children: a } = e,
          r = (0, t.useRouter)();
        return (0, l.jsxs)("div", {
          className: "min-h-screen bg-gray-50",
          children: [
            (0, l.jsx)("nav", {
              className: "bg-white shadow-md border-b border-gray-200",
              children: (0, l.jsx)("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: (0, l.jsx)("div", {
                  className: "flex justify-between h-16",
                  children: (0, l.jsx)("div", {
                    className: "flex space-x-8",
                    children: o.map((e) => {
                      let a = r.pathname === e.href;
                      return (0, l.jsx)(
                        n(),
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
            (0, l.jsx)("main", { className: "p-8", children: a }),
          ],
        });
      }
    },
    41962: (e, a, r) => {
      "use strict";
      (r.r(a), r.d(a, { default: () => s }));
      var l = r(37876);
      function s(e) {
        let {
          selectedCategory: a,
          onCategoryChange: r,
          duration: s,
          onDurationChange: n,
        } = e;
        return (0, l.jsxs)("div", {
          className: "border rounded-lg p-4 space-y-4",
          children: [
            (0, l.jsxs)("div", {
              children: [
                (0, l.jsx)("label", {
                  htmlFor: "category",
                  className: "block text-sm font-medium text-gray-700",
                  children: "Ad Category",
                }),
                (0, l.jsxs)("select", {
                  id: "category",
                  value: a,
                  onChange: (e) => r(e.target.value),
                  className:
                    "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500",
                  children: [
                    (0, l.jsx)("option", {
                      value: "",
                      children: "Select a category",
                    }),
                    (0, l.jsx)("option", {
                      value: "travel",
                      children: "Travel",
                    }),
                    (0, l.jsx)("option", { value: "food", children: "Food" }),
                    (0, l.jsx)("option", { value: "tech", children: "Tech" }),
                    (0, l.jsx)("option", {
                      value: "retail",
                      children: "Retail",
                    }),
                    (0, l.jsx)("option", {
                      value: "auto",
                      children: "Automotive",
                    }),
                  ],
                }),
              ],
            }),
            (0, l.jsxs)("div", {
              children: [
                (0, l.jsx)("label", {
                  htmlFor: "duration",
                  className: "block text-sm font-medium text-gray-700",
                  children: "Ad Duration",
                }),
                (0, l.jsxs)("select", {
                  id: "duration",
                  value: s,
                  onChange: (e) => n(e.target.value),
                  className:
                    "mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500",
                  children: [
                    (0, l.jsx)("option", {
                      value: "",
                      children: "Select duration",
                    }),
                    (0, l.jsx)("option", { value: "7", children: "7 days" }),
                    (0, l.jsx)("option", { value: "14", children: "14 days" }),
                    (0, l.jsx)("option", { value: "30", children: "30 days" }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      r(14232);
    },
    50372: (e, a, r) => {
      "use strict";
      (r.r(a), r.d(a, { default: () => i }));
      var l = r(37876),
        s = r(14232),
        n = r(20564),
        t = r(41962),
        o = r(4613),
        d = r(97685);
      function i() {
        let [e, a] = (0, s.useState)("Food & Drink"),
          [r, i] = (0, s.useState)("7 days"),
          [c, u] = (0, s.useState)(null),
          h = async () => {
            if (!c) return void d.Ay.error("Please select a file first.");
            let { data: e, error: a } = await o.N.storage
              .from("ads")
              .upload("uploads/".concat(c.name), c);
            if (a) return void d.Ay.error("Upload failed.");
            (d.Ay.success("Ad uploaded successfully!"),
              console.log("Uploaded:", e));
          };
        return (0, l.jsx)(n.A, {
          children: (0, l.jsxs)("div", {
            className: "space-y-6",
            children: [
              (0, l.jsx)("h1", {
                className: "text-2xl font-semibold",
                children: "Upload an Ad",
              }),
              (0, l.jsx)(t.default, {
                selectedCategory: e,
                onCategoryChange: a,
                duration: r,
                onDurationChange: i,
              }),
              (0, l.jsxs)("div", {
                className: "space-y-3",
                children: [
                  (0, l.jsx)("input", {
                    type: "file",
                    onChange: (e) => {
                      var a, r;
                      return u(
                        null !=
                          (r = null == (a = e.target.files) ? void 0 : a[0])
                          ? r
                          : null,
                      );
                    },
                    className: "border rounded-md p-2 w-full",
                  }),
                  (0, l.jsx)("button", {
                    onClick: h,
                    className:
                      "bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700",
                    children: "Upload",
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
  },
  (e) => {
    (e.O(0, [9008, 636, 6593, 8792], () => e((e.s = 18590))), (_N_E = e.O()));
  },
]);
