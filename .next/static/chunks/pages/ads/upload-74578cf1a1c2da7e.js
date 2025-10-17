(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [3182],
  {
    704: (e, s, a) => {
      "use strict";
      a.d(s, { T: () => l });
      var r = a(37876),
        t = a(14232),
        i = a(27025);
      let l = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)("textarea", {
          className: (0, i.cn)(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            a,
          ),
          ref: s,
          ...t,
        });
      });
      l.displayName = "Textarea";
    },
    4046: (e, s, a) => {
      "use strict";
      (a.r(s), a.d(s, { __N_SSG: () => O, default: () => W }));
      var r = a(37876),
        t = a(14232),
        i = a(89099),
        l = a(88992),
        n = a(13810),
        d = a(22442),
        c = a(44190),
        o = a(42298),
        m = a(31188),
        u = a(67514),
        x = a(93732),
        g = a(704),
        p = a(24502),
        f = a(27025);
      let h = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsxs)(p.bL, {
          ref: s,
          className: (0, f.cn)(
            "relative flex w-full touch-none select-none items-center",
            a,
          ),
          ...t,
          children: [
            (0, r.jsx)(p.CC, {
              className:
                "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",
              children: (0, r.jsx)(p.Q6, {
                className: "absolute h-full bg-primary",
              }),
            }),
            (0, r.jsx)(p.zi, {
              className:
                "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            }),
          ],
        });
      });
      h.displayName = p.bL.displayName;
      var v = a(73534),
        j = a(29470),
        b = a(32257);
      let y = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)(j.bL, {
          ref: s,
          className: (0, f.cn)(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            a,
          ),
          ...t,
          children: (0, r.jsx)(j.C1, {
            className: (0, f.cn)(
              "flex items-center justify-center text-current",
            ),
            children: (0, r.jsx)(b.A, { className: "h-4 w-4" }),
          }),
        });
      });
      y.displayName = j.bL.displayName;
      var N = a(76423),
        w = a(13194);
      let k = (0, a(47137).F)(
          "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
          {
            variants: {
              variant: {
                default: "bg-background text-foreground",
                destructive:
                  "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
              },
            },
            defaultVariants: { variant: "default" },
          },
        ),
        R = t.forwardRef((e, s) => {
          let { className: a, variant: t, ...i } = e;
          return (0, r.jsx)("div", {
            ref: s,
            role: "alert",
            className: (0, f.cn)(k({ variant: t }), a),
            ...i,
          });
        });
      ((R.displayName = "Alert"),
        (t.forwardRef((e, s) => {
          let { className: a, ...t } = e;
          return (0, r.jsx)("h5", {
            ref: s,
            className: (0, f.cn)(
              "mb-1 font-medium leading-none tracking-tight",
              a,
            ),
            ...t,
          });
        }).displayName = "AlertTitle"));
      let C = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)("div", {
          ref: s,
          className: (0, f.cn)("text-sm [&_p]:leading-relaxed", a),
          ...t,
        });
      });
      C.displayName = "AlertDescription";
      var A = a(24972);
      let S = t.forwardRef((e, s) => {
        let { className: a, value: t, ...i } = e;
        return (0, r.jsx)(A.bL, {
          ref: s,
          className: (0, f.cn)(
            "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
            a,
          ),
          ...i,
          children: (0, r.jsx)(A.C1, {
            className: "h-full w-full flex-1 bg-primary transition-all",
            style: { transform: "translateX(-".concat(100 - (t || 0), "%)") },
          }),
        });
      });
      S.displayName = A.bL.displayName;
      var _ = a(30860),
        M = a(9498),
        I = a(6781),
        J = a(46293),
        T = a(64041),
        D = a(54893),
        F = a(23478),
        B = a(70948),
        U = a(76158),
        E = a(28113),
        L = a(6394),
        Z = a(97685);
      let V = d.Ik({
          title: d
            .Yj()
            .min(5, "Title must be at least 5 characters")
            .max(100, "Title too long"),
          description: d
            .Yj()
            .min(20, "Description must be at least 20 characters")
            .max(500, "Description too long"),
          budget: d
            .ai()
            .min(100, "Minimum budget is $100")
            .max(5e4, "Maximum budget is $50,000"),
          campaignDuration: d
            .ai()
            .min(1, "Minimum duration is 1 day")
            .max(90, "Maximum duration is 90 days"),
          languages: d.YO(d.Yj()).min(1, "Select at least one language"),
          radius: d
            .ai()
            .min(1, "Minimum radius is 1km")
            .max(100, "Maximum radius is 100km"),
          ageRange: d.Ik({
            min: d
              .ai()
              .min(18, "Minimum age is 18")
              .max(65, "Maximum age is 65"),
            max: d
              .ai()
              .min(18, "Minimum age is 18")
              .max(65, "Maximum age is 65"),
          }),
          demographics: d.Ik({
            gender: d.YO(d.k5(["male", "female", "other"])),
            commuterType: d.YO(
              d.k5(["daily", "occasional", "weekend", "business"]),
            ),
          }),
          interests: d.YO(d.Yj()).min(1, "Select at least one interest"),
          region: d.Yj().min(1, "Select a region"),
          city: d.Yj().min(1, "Select a city"),
        }),
        P = [
          { value: "en", label: "English" },
          { value: "sw", label: "Swahili" },
          { value: "fr", label: "French" },
          { value: "ar", label: "Arabic" },
        ],
        Y = [
          "Technology",
          "Fashion",
          "Food & Dining",
          "Travel",
          "Sports",
          "Music",
          "Gaming",
          "Health & Fitness",
          "Business",
          "Education",
          "Shopping",
          "Entertainment",
          "News",
          "Finance",
          "Real Estate",
          "Automotive",
        ],
        z = [
          {
            value: "nairobi",
            label: "Nairobi County",
            cities: ["Nairobi CBD", "Westlands", "Karen", "Kilimani"],
          },
          {
            value: "mombasa",
            label: "Mombasa County",
            cities: ["Mombasa Island", "Nyali", "Bamburi", "Likoni"],
          },
          {
            value: "kisumu",
            label: "Kisumu County",
            cities: ["Kisumu Central", "Kondele", "Mamboleo"],
          },
        ];
      var O = !0;
      function W() {
        let e = (0, i.useRouter)(),
          [s, a] = (0, t.useState)(0),
          [d, p] = (0, t.useState)(null),
          [f, j] = (0, t.useState)(null),
          [b, k] = (0, t.useState)(["en"]),
          [A, O] = (0, t.useState)([]),
          [W, X] = (0, t.useState)({ gender: [], commuterType: [] }),
          [$, q] = (0, t.useState)([]),
          {
            register: G,
            handleSubmit: K,
            watch: H,
            setValue: Q,
            formState: { errors: ee, isSubmitting: es },
          } = (0, l.mN)({
            resolver: (0, n.u)(V),
            defaultValues: {
              title: "",
              description: "",
              budget: 1e3,
              campaignDuration: 7,
              languages: ["en"],
              radius: 25,
              ageRange: { min: 18, max: 65 },
              demographics: { gender: [], commuterType: [] },
              interests: [],
              region: "",
              city: "",
            },
          }),
          ea = H(),
          er = async (e) => {
            let s = e.name.split(".").pop(),
              a = ""
                .concat(Math.random().toString(36).substring(2), ".")
                .concat(s),
              r = "ads_media/".concat(a),
              { error: t } = await c.N.storage.from("ads_media").upload(r, e);
            if (t) throw t;
            let {
              data: { publicUrl: i },
            } = c.N.storage.from("ads_media").getPublicUrl(r);
            return i;
          },
          et = async (s) => {
            try {
              a(10);
              let r = "";
              (d && (a(30), (r = await er(d))), a(60));
              let {
                data: { user: t },
              } = await c.N.auth.getUser();
              if (!t) throw Error("Not authenticated");
              let { data: i, error: l } = await c.N.from("campaigns")
                .insert({
                  name: s.title,
                  budget: s.budget,
                  duration_days: s.campaignDuration,
                  status: "draft",
                  advertiser_id: t.id,
                  targeting_filters: {
                    languages: s.languages,
                    radius: s.radius,
                    ageRange: s.ageRange,
                    demographics: s.demographics,
                    interests: s.interests,
                    region: s.region,
                    city: s.city,
                  },
                })
                .select()
                .single();
              if (l) throw l;
              a(80);
              let { error: n } = await c.N.from("ads").insert({
                title: s.title,
                description: s.description,
                media_url: r,
                media_type: d
                  ? d.type.startsWith("video/")
                    ? "video"
                    : "image"
                  : "text",
                campaign_id: i.id,
                advertiser_id: t.id,
                status: "pending_review",
              });
              if (n) throw n;
              (a(100),
                Z.oR.success(
                  "Ad uploaded successfully! It will be reviewed shortly.",
                ),
                e.push("/dashboard"));
            } catch (e) {
              (console.error("Upload error:", e),
                Z.oR.error("Failed to upload ad. Please try again."),
                a(0));
            }
          };
        return (0, r.jsx)("div", {
          className: "min-h-screen bg-gray-50 py-8",
          children: (0, r.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
              (0, r.jsxs)("div", {
                className: "mb-8",
                children: [
                  (0, r.jsx)("h1", {
                    className: "text-3xl font-bold text-gray-900",
                    children: "Create New Ad Campaign",
                  }),
                  (0, r.jsx)("p", {
                    className: "text-gray-600 mt-2",
                    children:
                      "Upload your ad with precise targeting to reach the right audience in Kenya",
                  }),
                ],
              }),
              (0, r.jsxs)("form", {
                onSubmit: K(et),
                className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                children: [
                  (0, r.jsxs)("div", {
                    className: "lg:col-span-2 space-y-6",
                    children: [
                      (0, r.jsxs)(w.tU, {
                        defaultValue: "basic",
                        className: "w-full",
                        children: [
                          (0, r.jsxs)(w.j7, {
                            className: "grid w-full grid-cols-4",
                            children: [
                              (0, r.jsx)(w.Xi, {
                                value: "basic",
                                children: "Basic Info",
                              }),
                              (0, r.jsx)(w.Xi, {
                                value: "media",
                                children: "Media",
                              }),
                              (0, r.jsx)(w.Xi, {
                                value: "targeting",
                                children: "Targeting",
                              }),
                              (0, r.jsx)(w.Xi, {
                                value: "budget",
                                children: "Budget",
                              }),
                            ],
                          }),
                          (0, r.jsx)(w.av, {
                            value: "basic",
                            className: "space-y-4",
                            children: (0, r.jsxs)(m.Zp, {
                              children: [
                                (0, r.jsx)(m.aR, {
                                  children: (0, r.jsx)(m.ZB, {
                                    children: "Campaign Details",
                                  }),
                                }),
                                (0, r.jsxs)(m.Wu, {
                                  className: "space-y-4",
                                  children: [
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsx)(x.J, {
                                          htmlFor: "title",
                                          children: "Ad Title *",
                                        }),
                                        (0, r.jsx)(u.p, {
                                          id: "title",
                                          ...G("title"),
                                          placeholder:
                                            "Enter compelling ad title",
                                          className: ee.title
                                            ? "border-red-500"
                                            : "",
                                        }),
                                        ee.title &&
                                          (0, r.jsx)("p", {
                                            className:
                                              "text-red-500 text-sm mt-1",
                                            children: ee.title.message,
                                          }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsx)(x.J, {
                                          htmlFor: "description",
                                          children: "Ad Description *",
                                        }),
                                        (0, r.jsx)(g.T, {
                                          id: "description",
                                          ...G("description"),
                                          rows: 4,
                                          placeholder:
                                            "Describe your product or service...",
                                          className: ee.description
                                            ? "border-red-500"
                                            : "",
                                        }),
                                        ee.description &&
                                          (0, r.jsx)("p", {
                                            className:
                                              "text-red-500 text-sm mt-1",
                                            children: ee.description.message,
                                          }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsx)(x.J, {
                                          children:
                                            "Campaign Duration (days) *",
                                        }),
                                        (0, r.jsxs)("div", {
                                          className: "mt-2",
                                          children: [
                                            (0, r.jsx)(h, {
                                              value: [ea.campaignDuration || 7],
                                              onValueChange: (e) =>
                                                Q("campaignDuration", e[0]),
                                              max: 90,
                                              min: 1,
                                              step: 1,
                                              className: "w-full",
                                            }),
                                            (0, r.jsxs)("div", {
                                              className:
                                                "flex justify-between text-sm text-gray-500 mt-1",
                                              children: [
                                                (0, r.jsx)("span", {
                                                  children: "1 day",
                                                }),
                                                (0, r.jsxs)("span", {
                                                  className: "font-medium",
                                                  children: [
                                                    ea.campaignDuration || 7,
                                                    " days",
                                                  ],
                                                }),
                                                (0, r.jsx)("span", {
                                                  children: "90 days",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          (0, r.jsx)(w.av, {
                            value: "media",
                            className: "space-y-4",
                            children: (0, r.jsxs)(m.Zp, {
                              children: [
                                (0, r.jsx)(m.aR, {
                                  children: (0, r.jsx)(m.ZB, {
                                    children: "Upload Media",
                                  }),
                                }),
                                (0, r.jsx)(m.Wu, {
                                  children: (0, r.jsxs)("div", {
                                    className:
                                      "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center",
                                    children: [
                                      (0, r.jsx)("input", {
                                        type: "file",
                                        accept: "image/*,video/*",
                                        onChange: (e) => {
                                          var s;
                                          let a =
                                            null == (s = e.target.files)
                                              ? void 0
                                              : s[0];
                                          if (a) {
                                            p(a);
                                            let e = new FileReader();
                                            ((e.onload = (e) => {
                                              var s;
                                              j(
                                                null == (s = e.target)
                                                  ? void 0
                                                  : s.result,
                                              );
                                            }),
                                              e.readAsDataURL(a));
                                          }
                                        },
                                        className: "hidden",
                                        id: "media-upload",
                                      }),
                                      (0, r.jsx)("label", {
                                        htmlFor: "media-upload",
                                        className: "cursor-pointer",
                                        children: f
                                          ? (0, r.jsxs)("div", {
                                              className: "space-y-2",
                                              children: [
                                                (
                                                  null == d
                                                    ? void 0
                                                    : d.type.startsWith(
                                                        "video/",
                                                      )
                                                )
                                                  ? (0, r.jsx)(F.A, {
                                                      className:
                                                        "h-12 w-12 mx-auto text-gray-400",
                                                    })
                                                  : (0, r.jsx)(B.A, {
                                                      className:
                                                        "h-12 w-12 mx-auto text-gray-400",
                                                    }),
                                                (0, r.jsx)("p", {
                                                  className:
                                                    "text-green-600 font-medium",
                                                  children:
                                                    "Media uploaded successfully",
                                                }),
                                                (0, r.jsx)("p", {
                                                  className:
                                                    "text-sm text-gray-500",
                                                  children: "Click to change",
                                                }),
                                              ],
                                            })
                                          : (0, r.jsxs)("div", {
                                              className: "space-y-2",
                                              children: [
                                                (0, r.jsx)(U.A, {
                                                  className:
                                                    "h-12 w-12 mx-auto text-gray-400",
                                                }),
                                                (0, r.jsxs)("div", {
                                                  children: [
                                                    (0, r.jsx)("p", {
                                                      className:
                                                        "text-lg font-medium",
                                                      children:
                                                        "Upload your ad media",
                                                    }),
                                                    (0, r.jsx)("p", {
                                                      className:
                                                        "text-sm text-gray-500",
                                                      children:
                                                        "Supports images (JPG, PNG) and videos (MP4, MOV)",
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            }),
                          }),
                          (0, r.jsx)(w.av, {
                            value: "targeting",
                            className: "space-y-4",
                            children: (0, r.jsxs)(m.Zp, {
                              children: [
                                (0, r.jsx)(m.aR, {
                                  children: (0, r.jsx)(m.ZB, {
                                    children: "Audience Targeting",
                                  }),
                                }),
                                (0, r.jsxs)(m.Wu, {
                                  className: "space-y-6",
                                  children: [
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsx)(x.J, {
                                          children: "Languages *",
                                        }),
                                        (0, r.jsx)("div", {
                                          className:
                                            "grid grid-cols-2 gap-2 mt-2",
                                          children: P.map((e) =>
                                            (0, r.jsxs)(
                                              "div",
                                              {
                                                className:
                                                  "flex items-center space-x-2",
                                                children: [
                                                  (0, r.jsx)(y, {
                                                    id: e.value,
                                                    checked: b.includes(
                                                      e.value,
                                                    ),
                                                    onCheckedChange: (s) => {
                                                      if (s) {
                                                        let s = [...b, e.value];
                                                        (k(s),
                                                          Q("languages", s));
                                                      } else {
                                                        let s = b.filter(
                                                          (s) => s !== e.value,
                                                        );
                                                        (k(s),
                                                          Q("languages", s));
                                                      }
                                                    },
                                                  }),
                                                  (0, r.jsx)(x.J, {
                                                    htmlFor: e.value,
                                                    children: e.label,
                                                  }),
                                                ],
                                              },
                                              e.value,
                                            ),
                                          ),
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "grid grid-cols-2 gap-4",
                                      children: [
                                        (0, r.jsxs)("div", {
                                          children: [
                                            (0, r.jsx)(x.J, {
                                              children: "Region *",
                                            }),
                                            (0, r.jsxs)(v.l6, {
                                              onValueChange: (e) => {
                                                (Q("region", e), Q("city", ""));
                                                let s = z.find(
                                                  (s) => s.value === e,
                                                );
                                                q(
                                                  (null == s
                                                    ? void 0
                                                    : s.cities) || [],
                                                );
                                              },
                                              children: [
                                                (0, r.jsx)(v.bq, {
                                                  children: (0, r.jsx)(v.yv, {
                                                    placeholder:
                                                      "Select region",
                                                  }),
                                                }),
                                                (0, r.jsx)(v.gC, {
                                                  children: z.map((e) =>
                                                    (0, r.jsx)(
                                                      v.eb,
                                                      {
                                                        value: e.value,
                                                        children: e.label,
                                                      },
                                                      e.value,
                                                    ),
                                                  ),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        (0, r.jsxs)("div", {
                                          children: [
                                            (0, r.jsx)(x.J, {
                                              children: "City *",
                                            }),
                                            (0, r.jsxs)(v.l6, {
                                              onValueChange: (e) =>
                                                Q("city", e),
                                              children: [
                                                (0, r.jsx)(v.bq, {
                                                  children: (0, r.jsx)(v.yv, {
                                                    placeholder: "Select city",
                                                  }),
                                                }),
                                                (0, r.jsx)(v.gC, {
                                                  children: $.map((e) =>
                                                    (0, r.jsx)(
                                                      v.eb,
                                                      { value: e, children: e },
                                                      e,
                                                    ),
                                                  ),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsx)(x.J, {
                                          children: "Targeting Radius (km) *",
                                        }),
                                        (0, r.jsxs)("div", {
                                          className: "mt-2",
                                          children: [
                                            (0, r.jsx)(h, {
                                              value: [ea.radius || 25],
                                              onValueChange: (e) =>
                                                Q("radius", e[0]),
                                              max: 100,
                                              min: 1,
                                              step: 1,
                                              className: "w-full",
                                            }),
                                            (0, r.jsxs)("div", {
                                              className:
                                                "flex justify-between text-sm text-gray-500 mt-1",
                                              children: [
                                                (0, r.jsx)("span", {
                                                  children: "1km",
                                                }),
                                                (0, r.jsxs)("span", {
                                                  className: "font-medium",
                                                  children: [
                                                    ea.radius || 25,
                                                    "km",
                                                  ],
                                                }),
                                                (0, r.jsx)("span", {
                                                  children: "100km",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsx)(x.J, {
                                          children: "Age Range *",
                                        }),
                                        (0, r.jsxs)("div", {
                                          className:
                                            "grid grid-cols-2 gap-4 mt-2",
                                          children: [
                                            (0, r.jsxs)("div", {
                                              children: [
                                                (0, r.jsx)(x.J, {
                                                  htmlFor: "age-min",
                                                  className: "text-sm",
                                                  children: "Minimum Age",
                                                }),
                                                (0, r.jsxs)(v.l6, {
                                                  onValueChange: (e) =>
                                                    Q(
                                                      "ageRange.min",
                                                      parseInt(e),
                                                    ),
                                                  children: [
                                                    (0, r.jsx)(v.bq, {
                                                      children: (0, r.jsx)(
                                                        v.yv,
                                                        { placeholder: "18" },
                                                      ),
                                                    }),
                                                    (0, r.jsx)(v.gC, {
                                                      children: Array.from(
                                                        { length: 48 },
                                                        (e, s) => s + 18,
                                                      ).map((e) =>
                                                        (0, r.jsx)(
                                                          v.eb,
                                                          {
                                                            value: e.toString(),
                                                            children: e,
                                                          },
                                                          e,
                                                        ),
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, r.jsxs)("div", {
                                              children: [
                                                (0, r.jsx)(x.J, {
                                                  htmlFor: "age-max",
                                                  className: "text-sm",
                                                  children: "Maximum Age",
                                                }),
                                                (0, r.jsxs)(v.l6, {
                                                  onValueChange: (e) =>
                                                    Q(
                                                      "ageRange.max",
                                                      parseInt(e),
                                                    ),
                                                  children: [
                                                    (0, r.jsx)(v.bq, {
                                                      children: (0, r.jsx)(
                                                        v.yv,
                                                        { placeholder: "65" },
                                                      ),
                                                    }),
                                                    (0, r.jsx)(v.gC, {
                                                      children: Array.from(
                                                        { length: 48 },
                                                        (e, s) => s + 18,
                                                      ).map((e) =>
                                                        (0, r.jsx)(
                                                          v.eb,
                                                          {
                                                            value: e.toString(),
                                                            children: e,
                                                          },
                                                          e,
                                                        ),
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsx)(x.J, {
                                          children: "Interests *",
                                        }),
                                        (0, r.jsx)("div", {
                                          className:
                                            "grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto",
                                          children: Y.map((e) =>
                                            (0, r.jsxs)(
                                              "div",
                                              {
                                                className:
                                                  "flex items-center space-x-2",
                                                children: [
                                                  (0, r.jsx)(y, {
                                                    id: e,
                                                    checked: A.includes(e),
                                                    onCheckedChange: (s) => {
                                                      if (s) {
                                                        let s = [...A, e];
                                                        (O(s),
                                                          Q("interests", s));
                                                      } else {
                                                        let s = A.filter(
                                                          (s) => s !== e,
                                                        );
                                                        (O(s),
                                                          Q("interests", s));
                                                      }
                                                    },
                                                  }),
                                                  (0, r.jsx)(x.J, {
                                                    htmlFor: e,
                                                    className: "text-sm",
                                                    children: e,
                                                  }),
                                                ],
                                              },
                                              e,
                                            ),
                                          ),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                          (0, r.jsx)(w.av, {
                            value: "budget",
                            className: "space-y-4",
                            children: (0, r.jsxs)(m.Zp, {
                              children: [
                                (0, r.jsx)(m.aR, {
                                  children: (0, r.jsx)(m.ZB, {
                                    children: "Campaign Budget",
                                  }),
                                }),
                                (0, r.jsxs)(m.Wu, {
                                  className: "space-y-4",
                                  children: [
                                    (0, r.jsxs)("div", {
                                      children: [
                                        (0, r.jsx)(x.J, {
                                          htmlFor: "budget",
                                          children: "Total Budget (USD) *",
                                        }),
                                        (0, r.jsx)(u.p, {
                                          id: "budget",
                                          type: "number",
                                          ...G("budget", { valueAsNumber: !0 }),
                                          min: 100,
                                          max: 5e4,
                                          step: 50,
                                          placeholder: "1000",
                                          className: ee.budget
                                            ? "border-red-500"
                                            : "",
                                        }),
                                        ee.budget &&
                                          (0, r.jsx)("p", {
                                            className:
                                              "text-red-500 text-sm mt-1",
                                            children: ee.budget.message,
                                          }),
                                      ],
                                    }),
                                    (0, r.jsx)(R, {
                                      children: (0, r.jsxs)(C, {
                                        children: [
                                          (0, r.jsx)("strong", {
                                            children: "Budget Breakdown:",
                                          }),
                                          (0, r.jsx)("br", {}),
                                          "• Daily spend: $",
                                          Math.round(
                                            (ea.budget || 0) /
                                              (ea.campaignDuration || 1),
                                          ),
                                          (0, r.jsx)("br", {}),
                                          "• Estimated reach: ",
                                          Math.round(
                                            2.5 * (ea.budget || 0),
                                          ).toLocaleString(),
                                          " people",
                                          (0, r.jsx)("br", {}),
                                          "• Cost per click: $0.15 - $0.45",
                                        ],
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      s > 0 &&
                        (0, r.jsx)(m.Zp, {
                          children: (0, r.jsx)(m.Wu, {
                            className: "pt-6",
                            children: (0, r.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, r.jsxs)("div", {
                                  className: "flex justify-between text-sm",
                                  children: [
                                    (0, r.jsx)("span", {
                                      children: "Upload Progress",
                                    }),
                                    (0, r.jsxs)("span", { children: [s, "%"] }),
                                  ],
                                }),
                                (0, r.jsx)(S, { value: s }),
                              ],
                            }),
                          }),
                        }),
                      (0, r.jsxs)("div", {
                        className: "flex gap-4",
                        children: [
                          (0, r.jsxs)(o.$, {
                            type: "submit",
                            disabled: es,
                            className: "flex-1",
                            children: [
                              (0, r.jsx)(E.A, { className: "h-4 w-4 mr-2" }),
                              es ? "Submitting..." : "Submit for Review",
                            ],
                          }),
                          (0, r.jsxs)(o.$, {
                            type: "button",
                            variant: "outline",
                            onClick: () =>
                              (0, Z.oR)("Draft saved locally", {
                                icon: "\uD83D\uDCBE",
                              }),
                            children: [
                              (0, r.jsx)(L.A, { className: "h-4 w-4 mr-2" }),
                              "Save Draft",
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, r.jsx)("div", {
                    className: "lg:col-span-1",
                    children: (0, r.jsx)("div", {
                      className: "sticky top-8",
                      children: (0, r.jsx)(() => {
                        var e, s, a;
                        return (0, r.jsxs)(m.Zp, {
                          className: "h-fit",
                          children: [
                            (0, r.jsx)(m.aR, {
                              children: (0, r.jsxs)(m.ZB, {
                                className: "flex items-center gap-2",
                                children: [
                                  (0, r.jsx)(_.A, { className: "h-5 w-5" }),
                                  "Live Preview",
                                ],
                              }),
                            }),
                            (0, r.jsxs)(m.Wu, {
                              className: "space-y-4",
                              children: [
                                f &&
                                  (0, r.jsx)("div", {
                                    className:
                                      "rounded-lg overflow-hidden border",
                                    children: (
                                      null == d
                                        ? void 0
                                        : d.type.startsWith("video/")
                                    )
                                      ? (0, r.jsx)("video", {
                                          src: f,
                                          controls: !0,
                                          className: "w-full h-48 object-cover",
                                        })
                                      : (0, r.jsx)("img", {
                                          src: f,
                                          alt: "Ad preview",
                                          className: "w-full h-48 object-cover",
                                        }),
                                  }),
                                (0, r.jsxs)("div", {
                                  children: [
                                    (0, r.jsx)("h3", {
                                      className: "font-semibold text-lg",
                                      children:
                                        ea.title || "Your Ad Title Here",
                                    }),
                                    (0, r.jsx)("p", {
                                      className: "text-sm text-gray-600 mt-2",
                                      children:
                                        ea.description ||
                                        "Your ad description will appear here...",
                                    }),
                                  ],
                                }),
                                (0, r.jsxs)("div", {
                                  className: "space-y-2 text-xs text-gray-500",
                                  children: [
                                    (0, r.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, r.jsx)(M.A, {
                                          className: "h-3 w-3",
                                        }),
                                        (0, r.jsxs)("span", {
                                          children: [
                                            "Targeting: ",
                                            b.join(", "),
                                            " speakers",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, r.jsx)(I.A, {
                                          className: "h-3 w-3",
                                        }),
                                        (0, r.jsxs)("span", {
                                          children: [
                                            "Radius: ",
                                            ea.radius,
                                            "km around ",
                                            ea.city || "selected city",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, r.jsx)(J.A, {
                                          className: "h-3 w-3",
                                        }),
                                        (0, r.jsxs)("span", {
                                          children: [
                                            "Ages: ",
                                            null == (e = ea.ageRange)
                                              ? void 0
                                              : e.min,
                                            "-",
                                            null == (s = ea.ageRange)
                                              ? void 0
                                              : s.max,
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, r.jsx)(T.A, {
                                          className: "h-3 w-3",
                                        }),
                                        (0, r.jsxs)("span", {
                                          children: [
                                            "Duration: ",
                                            ea.campaignDuration,
                                            " days",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, r.jsxs)("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        (0, r.jsx)(D.A, {
                                          className: "h-3 w-3",
                                        }),
                                        (0, r.jsxs)("span", {
                                          children: [
                                            "Budget: $",
                                            null == (a = ea.budget)
                                              ? void 0
                                              : a.toLocaleString(),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                A.length > 0 &&
                                  (0, r.jsxs)("div", {
                                    children: [
                                      (0, r.jsx)("p", {
                                        className: "text-xs text-gray-500 mb-2",
                                        children: "Targeting interests:",
                                      }),
                                      (0, r.jsxs)("div", {
                                        className: "flex flex-wrap gap-1",
                                        children: [
                                          A.slice(0, 3).map((e) =>
                                            (0, r.jsx)(
                                              N.E,
                                              {
                                                variant: "secondary",
                                                className: "text-xs",
                                                children: e,
                                              },
                                              e,
                                            ),
                                          ),
                                          A.length > 3 &&
                                            (0, r.jsxs)(N.E, {
                                              variant: "outline",
                                              className: "text-xs",
                                              children: [
                                                "+",
                                                A.length - 3,
                                                " more",
                                              ],
                                            }),
                                        ],
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                          ],
                        });
                      }, {}),
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    13194: (e, s, a) => {
      "use strict";
      a.d(s, { Xi: () => c, av: () => o, j7: () => d, tU: () => n });
      var r = a(37876),
        t = a(14232),
        i = a(90491),
        l = a(27025);
      let n = i.bL,
        d = t.forwardRef((e, s) => {
          let { className: a, ...t } = e;
          return (0, r.jsx)(i.B8, {
            ref: s,
            className: (0, l.cn)(
              "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
              a,
            ),
            ...t,
          });
        });
      d.displayName = i.B8.displayName;
      let c = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)(i.l9, {
          ref: s,
          className: (0, l.cn)(
            "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
            a,
          ),
          ...t,
        });
      });
      c.displayName = i.l9.displayName;
      let o = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)(i.UC, {
          ref: s,
          className: (0, l.cn)(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            a,
          ),
          ...t,
        });
      });
      o.displayName = i.UC.displayName;
    },
    18452: (e, s, a) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/ads/upload",
        function () {
          return a(4046);
        },
      ]);
    },
    27025: (e, s, a) => {
      "use strict";
      a.d(s, { cn: () => i });
      var r = a(69241),
        t = a(29573);
      function i() {
        for (var e = arguments.length, s = Array(e), a = 0; a < e; a++)
          s[a] = arguments[a];
        return (0, t.QP)((0, r.$)(s));
      }
    },
    31188: (e, s, a) => {
      "use strict";
      a.d(s, {
        BT: () => c,
        Wu: () => o,
        ZB: () => d,
        Zp: () => l,
        aR: () => n,
      });
      var r = a(37876),
        t = a(14232),
        i = a(27025);
      let l = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)("div", {
          ref: s,
          className: (0, i.cn)(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            a,
          ),
          ...t,
        });
      });
      l.displayName = "Card";
      let n = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)("div", {
          ref: s,
          className: (0, i.cn)("flex flex-col space-y-1.5 p-6", a),
          ...t,
        });
      });
      n.displayName = "CardHeader";
      let d = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)("h3", {
          ref: s,
          className: (0, i.cn)(
            "text-2xl font-semibold leading-none tracking-tight",
            a,
          ),
          ...t,
        });
      });
      d.displayName = "CardTitle";
      let c = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)("p", {
          ref: s,
          className: (0, i.cn)("text-sm text-muted-foreground", a),
          ...t,
        });
      });
      c.displayName = "CardDescription";
      let o = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)("div", {
          ref: s,
          className: (0, i.cn)("p-6 pt-0", a),
          ...t,
        });
      });
      ((o.displayName = "CardContent"),
        (t.forwardRef((e, s) => {
          let { className: a, ...t } = e;
          return (0, r.jsx)("div", {
            ref: s,
            className: (0, i.cn)("flex items-center p-6 pt-0", a),
            ...t,
          });
        }).displayName = "CardFooter"));
    },
    42298: (e, s, a) => {
      "use strict";
      a.d(s, { $: () => c });
      var r = a(37876),
        t = a(14232),
        i = a(82987),
        l = a(47137),
        n = a(27025);
      let d = (0, l.F)(
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
        c = t.forwardRef((e, s) => {
          let { className: a, variant: t, size: l, asChild: c = !1, ...o } = e,
            m = c ? i.DX : "button";
          return (0, r.jsx)(m, {
            className: (0, n.cn)(d({ variant: t, size: l, className: a })),
            ref: s,
            ...o,
          });
        });
      c.displayName = "Button";
    },
    44190: (e, s, a) => {
      "use strict";
      a.d(s, { N: () => i });
      var r = a(61629),
        t = a(65364);
      let i = (0, r.UU)(
        "https://rkonwkggxaohpmxmzmfn.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
      );
      (0, r.UU)(
        "https://rkonwkggxaohpmxmzmfn.supabase.co",
        t.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: !1 } },
      );
    },
    67514: (e, s, a) => {
      "use strict";
      a.d(s, { p: () => l });
      var r = a(37876),
        t = a(14232),
        i = a(27025);
      let l = t.forwardRef((e, s) => {
        let { className: a, type: t, ...l } = e;
        return (0, r.jsx)("input", {
          type: t,
          className: (0, i.cn)(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            a,
          ),
          ref: s,
          ...l,
        });
      });
      l.displayName = "Input";
    },
    73534: (e, s, a) => {
      "use strict";
      a.d(s, {
        bq: () => u,
        eb: () => f,
        gC: () => p,
        l6: () => o,
        yv: () => m,
      });
      var r = a(37876),
        t = a(14232),
        i = a(87791),
        l = a(58725),
        n = a(16076),
        d = a(32257),
        c = a(27025);
      let o = i.bL;
      i.YJ;
      let m = i.WT,
        u = t.forwardRef((e, s) => {
          let { className: a, children: t, ...n } = e;
          return (0, r.jsxs)(i.l9, {
            ref: s,
            className: (0, c.cn)(
              "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
              a,
            ),
            ...n,
            children: [
              t,
              (0, r.jsx)(i.In, {
                asChild: !0,
                children: (0, r.jsx)(l.A, { className: "h-4 w-4 opacity-50" }),
              }),
            ],
          });
        });
      u.displayName = i.l9.displayName;
      let x = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)(i.PP, {
          ref: s,
          className: (0, c.cn)(
            "flex cursor-default items-center justify-center py-1",
            a,
          ),
          ...t,
          children: (0, r.jsx)(n.A, { className: "h-4 w-4" }),
        });
      });
      x.displayName = i.PP.displayName;
      let g = t.forwardRef((e, s) => {
        let { className: a, ...t } = e;
        return (0, r.jsx)(i.wn, {
          ref: s,
          className: (0, c.cn)(
            "flex cursor-default items-center justify-center py-1",
            a,
          ),
          ...t,
          children: (0, r.jsx)(l.A, { className: "h-4 w-4" }),
        });
      });
      g.displayName = i.wn.displayName;
      let p = t.forwardRef((e, s) => {
        let { className: a, children: t, position: l = "popper", ...n } = e;
        return (0, r.jsx)(i.ZL, {
          children: (0, r.jsxs)(i.UC, {
            ref: s,
            className: (0, c.cn)(
              "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              "popper" === l &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
              a,
            ),
            position: l,
            ...n,
            children: [
              (0, r.jsx)(x, {}),
              (0, r.jsx)(i.LM, {
                className: (0, c.cn)(
                  "p-1",
                  "popper" === l &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                ),
                children: t,
              }),
              (0, r.jsx)(g, {}),
            ],
          }),
        });
      });
      ((p.displayName = i.UC.displayName),
        (t.forwardRef((e, s) => {
          let { className: a, ...t } = e;
          return (0, r.jsx)(i.JU, {
            ref: s,
            className: (0, c.cn)("py-1.5 pl-8 pr-2 text-sm font-semibold", a),
            ...t,
          });
        }).displayName = i.JU.displayName));
      let f = t.forwardRef((e, s) => {
        let { className: a, children: t, ...l } = e;
        return (0, r.jsxs)(i.q7, {
          ref: s,
          className: (0, c.cn)(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            a,
          ),
          ...l,
          children: [
            (0, r.jsx)("span", {
              className:
                "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
              children: (0, r.jsx)(i.VF, {
                children: (0, r.jsx)(d.A, { className: "h-4 w-4" }),
              }),
            }),
            (0, r.jsx)(i.p4, { children: t }),
          ],
        });
      });
      ((f.displayName = i.q7.displayName),
        (t.forwardRef((e, s) => {
          let { className: a, ...t } = e;
          return (0, r.jsx)(i.wv, {
            ref: s,
            className: (0, c.cn)("-mx-1 my-1 h-px bg-muted", a),
            ...t,
          });
        }).displayName = i.wv.displayName));
    },
    76423: (e, s, a) => {
      "use strict";
      a.d(s, { E: () => n });
      var r = a(37876);
      a(14232);
      var t = a(47137),
        i = a(27025);
      let l = (0, t.F)(
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
      function n(e) {
        let { className: s, variant: a, ...t } = e;
        return (0, r.jsx)("div", {
          className: (0, i.cn)(l({ variant: a }), s),
          ...t,
        });
      }
    },
    93732: (e, s, a) => {
      "use strict";
      a.d(s, { J: () => c });
      var r = a(37876),
        t = a(14232),
        i = a(59773),
        l = a(47137),
        n = a(27025);
      let d = (0, l.F)(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        ),
        c = t.forwardRef((e, s) => {
          let { className: a, ...t } = e;
          return (0, r.jsx)(i.b, {
            ref: s,
            className: (0, n.cn)(d(), a),
            ...t,
          });
        });
      c.displayName = i.b.displayName;
    },
  },
  (e) => {
    (e.O(0, [1987, 9853, 9956, 3682, 636, 6593, 8792], () => e((e.s = 18452))),
      (_N_E = e.O()));
  },
]);
