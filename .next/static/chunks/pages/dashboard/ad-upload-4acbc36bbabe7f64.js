(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5602],
  {
    4033: (e, t, a) => {
      "use strict";
      (a.r(t), a.d(t, { default: () => l, uploadCreative: () => s }));
      var r = a(37876),
        n = a(14232);
      async function s(e, t) {
        var a = e;
        let r = a.type.startsWith("image/"),
          n = a.type.startsWith("video/");
        if (r && a.size > 5242880) throw Error("Image must be under 5MB");
        if (n && a.size > 0x1400000) throw Error("Video must be under 20MB");
        if (a.size > 0x3200000) throw Error("Function not implemented.");
      }
      let i = (0, a(46958).UU)(
        "https://rkonwkggxaohpmxmzmfn.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
      );
      function l() {
        let [e, t] = (0, n.useState)(null),
          [a, s] = (0, n.useState)(""),
          [l, o] = (0, n.useState)(""),
          [d, u] = (0, n.useState)(""),
          c = async () => {
            if (!e || !a || !l) return;
            let { data: t, error: r } = await i.storage
              .from("creatives")
              .upload("ads/".concat(Date.now(), "-").concat(e.name), e);
            if (r) return void u("Upload failed: " + r.message);
            i.storage.from("creatives").getPublicUrl(t.path).data.publicUrl;
            let { error: n } = await i
              .from("campaigns")
              .insert([
                {
                  name: a,
                  budget: Number(l),
                  start_date: new Date().toISOString(),
                  end_date: new Date(Date.now() + 6048e5).toISOString(),
                },
              ]);
            if (n) return void u("DB insert failed: " + n.message);
            u("Ad uploaded and campaign created!");
          };
        return (0, r.jsxs)("div", {
          className: "p-6 space-y-6",
          children: [
            (0, r.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Upload New Ad",
            }),
            (0, r.jsx)("input", {
              type: "text",
              placeholder: "Campaign name",
              className: "border p-2 w-full",
              value: a,
              onChange: (e) => s(e.target.value),
            }),
            (0, r.jsx)("input", {
              type: "number",
              placeholder: "Budget (KES)",
              className: "border p-2 w-full",
              value: l,
              onChange: (e) => o(e.target.value),
            }),
            (0, r.jsx)("input", {
              type: "file",
              onChange: (e) => {
                var a;
                return t(
                  (null == (a = e.target.files) ? void 0 : a[0]) || null,
                );
              },
            }),
            (0, r.jsx)("button", {
              className: "bg-green-600 text-white px-4 py-2 rounded",
              onClick: c,
              children: "Upload",
            }),
            d && (0, r.jsx)("p", { className: "text-sm", children: d }),
          ],
        });
      }
    },
    47548: (e, t, a) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/dashboard/ad-upload",
        function () {
          return a(4033);
        },
      ]);
    },
  },
  (e) => {
    (e.O(0, [636, 6593, 8792], () => e((e.s = 47548))), (_N_E = e.O()));
  },
]);
