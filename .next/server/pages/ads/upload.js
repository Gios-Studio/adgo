"use strict";
(() => {
  var a = {};
  ((a.id = 3182),
    (a.ids = [636, 3182, 3220]),
    (a.modules = {
      361: (a) => {
        a.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
      },
      411: (a) => {
        a.exports = require("@supabase/auth-js");
      },
      598: (a) => {
        a.exports = import("@radix-ui/react-label");
      },
      731: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { Fc: () => k, TN: () => l });
            var e = c(8732),
              f = c(2015),
              g = c(8938),
              h = c(3894),
              i = a([g, h]);
            [g, h] = i.then ? (await i)() : i;
            let j = (0, g.cva)(
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
              k = f.forwardRef(({ className: a, variant: b, ...c }, d) =>
                (0, e.jsx)("div", {
                  ref: d,
                  role: "alert",
                  className: (0, h.cn)(j({ variant: b }), a),
                  ...c,
                }),
              );
            ((k.displayName = "Alert"),
              (f.forwardRef(({ className: a, ...b }, c) =>
                (0, e.jsx)("h5", {
                  ref: c,
                  className: (0, h.cn)(
                    "mb-1 font-medium leading-none tracking-tight",
                    a,
                  ),
                  ...b,
                }),
              ).displayName = "AlertTitle"));
            let l = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("div", {
                ref: c,
                className: (0, h.cn)("text-sm [&_p]:leading-relaxed", a),
                ...b,
              }),
            );
            ((l.displayName = "AlertDescription"), d());
          } catch (a) {
            d(a);
          }
        });
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
      2015: (a) => {
        a.exports = require("react");
      },
      2326: (a) => {
        a.exports = require("react-dom");
      },
      2377: (a) => {
        a.exports = import("@radix-ui/react-slider");
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
      2971: (a) => {
        a.exports = import("zod");
      },
      3638: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { A: () => j });
            var e = c(8732),
              f = c(2015),
              g = c(2377),
              h = c(3894),
              i = a([g, h]);
            [g, h] = i.then ? (await i)() : i;
            let j = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsxs)(g.Root, {
                ref: c,
                className: (0, h.cn)(
                  "relative flex w-full touch-none select-none items-center",
                  a,
                ),
                ...b,
                children: [
                  (0, e.jsx)(g.Track, {
                    className:
                      "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",
                    children: (0, e.jsx)(g.Range, {
                      className: "absolute h-full bg-primary",
                    }),
                  }),
                  (0, e.jsx)(g.Thumb, {
                    className:
                      "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  }),
                ],
              }),
            );
            ((j.displayName = g.Root.displayName), d());
          } catch (a) {
            d(a);
          }
        });
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
      3929: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { p: () => i });
            var e = c(8732),
              f = c(2015),
              g = c(3894),
              h = a([g]);
            g = (h.then ? (await h)() : h)[0];
            let i = f.forwardRef(({ className: a, type: b, ...c }, d) =>
              (0, e.jsx)("input", {
                type: b,
                className: (0, g.cn)(
                  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  a,
                ),
                ref: d,
                ...c,
              }),
            );
            ((i.displayName = "Input"), d());
          } catch (a) {
            d(a);
          }
        });
      },
      4075: (a) => {
        a.exports = require("zlib");
      },
      4201: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { T: () => i });
            var e = c(8732),
              f = c(2015),
              g = c(3894),
              h = a([g]);
            g = (h.then ? (await h)() : h)[0];
            let i = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)("textarea", {
                className: (0, g.cn)(
                  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  a,
                ),
                ref: c,
                ...b,
              }),
            );
            ((i.displayName = "Textarea"), d());
          } catch (a) {
            d(a);
          }
        });
      },
      4644: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            (c.r(b), c.d(b, { default: () => A, getStaticProps: () => B }));
            var e = c(8732),
              f = c(2015),
              g = c(4233),
              h = c(6884),
              i = c(8825),
              j = c(2971),
              k = c(9481),
              l = c(1339),
              m = c(2885),
              n = c(3929),
              o = c(5471),
              p = c(4201),
              q = c(3638),
              r = c(4719),
              s = c(4986),
              t = c(1354),
              u = c(1972),
              v = c(731),
              w = c(7188),
              x = c(1302),
              y = c(2893),
              z = a([h, i, j, l, m, n, o, p, q, r, s, t, u, v, w, y]);
            [h, i, j, l, m, n, o, p, q, r, s, t, u, v, w, y] = z.then
              ? (await z)()
              : z;
            let C = j.z.object({
                title: j.z
                  .string()
                  .min(5, "Title must be at least 5 characters")
                  .max(100, "Title too long"),
                description: j.z
                  .string()
                  .min(20, "Description must be at least 20 characters")
                  .max(500, "Description too long"),
                budget: j.z
                  .number()
                  .min(100, "Minimum budget is $100")
                  .max(5e4, "Maximum budget is $50,000"),
                campaignDuration: j.z
                  .number()
                  .min(1, "Minimum duration is 1 day")
                  .max(90, "Maximum duration is 90 days"),
                languages: j.z
                  .array(j.z.string())
                  .min(1, "Select at least one language"),
                radius: j.z
                  .number()
                  .min(1, "Minimum radius is 1km")
                  .max(100, "Maximum radius is 100km"),
                ageRange: j.z.object({
                  min: j.z
                    .number()
                    .min(18, "Minimum age is 18")
                    .max(65, "Maximum age is 65"),
                  max: j.z
                    .number()
                    .min(18, "Minimum age is 18")
                    .max(65, "Maximum age is 65"),
                }),
                demographics: j.z.object({
                  gender: j.z.array(j.z.enum(["male", "female", "other"])),
                  commuterType: j.z.array(
                    j.z.enum(["daily", "occasional", "weekend", "business"]),
                  ),
                }),
                interests: j.z
                  .array(j.z.string())
                  .min(1, "Select at least one interest"),
                region: j.z.string().min(1, "Select a region"),
                city: j.z.string().min(1, "Select a city"),
              }),
              D = [
                { value: "en", label: "English" },
                { value: "sw", label: "Swahili" },
                { value: "fr", label: "French" },
                { value: "ar", label: "Arabic" },
              ],
              E = [
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
              F = [
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
            function A() {
              let a = (0, g.useRouter)(),
                [b, c] = (0, f.useState)(0),
                [d, j] = (0, f.useState)(null),
                [z, A] = (0, f.useState)(null),
                [B, G] = (0, f.useState)(["en"]),
                [H, I] = (0, f.useState)([]),
                [J, K] = (0, f.useState)({ gender: [], commuterType: [] }),
                [L, M] = (0, f.useState)([]),
                {
                  register: N,
                  handleSubmit: O,
                  watch: P,
                  setValue: Q,
                  formState: { errors: R, isSubmitting: S },
                } = (0, h.useForm)({
                  resolver: (0, i.zodResolver)(C),
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
                T = P(),
                U = async (a) => {
                  let b = a.name.split(".").pop(),
                    c = `${Math.random().toString(36).substring(2)}.${b}`,
                    d = `ads_media/${c}`,
                    { error: e } = await k.N.storage
                      .from("ads_media")
                      .upload(d, a);
                  if (e) throw e;
                  let {
                    data: { publicUrl: f },
                  } = k.N.storage.from("ads_media").getPublicUrl(d);
                  return f;
                },
                V = async (b) => {
                  try {
                    c(10);
                    let e = "";
                    (d && (c(30), (e = await U(d))), c(60));
                    let {
                      data: { user: f },
                    } = await k.N.auth.getUser();
                    if (!f) throw Error("Not authenticated");
                    let { data: g, error: h } = await k.N.from("campaigns")
                      .insert({
                        name: b.title,
                        budget: b.budget,
                        duration_days: b.campaignDuration,
                        status: "draft",
                        advertiser_id: f.id,
                        targeting_filters: {
                          languages: b.languages,
                          radius: b.radius,
                          ageRange: b.ageRange,
                          demographics: b.demographics,
                          interests: b.interests,
                          region: b.region,
                          city: b.city,
                        },
                      })
                      .select()
                      .single();
                    if (h) throw h;
                    c(80);
                    let { error: i } = await k.N.from("ads").insert({
                      title: b.title,
                      description: b.description,
                      media_url: e,
                      media_type: d
                        ? d.type.startsWith("video/")
                          ? "video"
                          : "image"
                        : "text",
                      campaign_id: g.id,
                      advertiser_id: f.id,
                      status: "pending_review",
                    });
                    if (i) throw i;
                    (c(100),
                      y.toast.success(
                        "Ad uploaded successfully! It will be reviewed shortly.",
                      ),
                      a.push("/dashboard"));
                  } catch (a) {
                    (console.error("Upload error:", a),
                      y.toast.error("Failed to upload ad. Please try again."),
                      c(0));
                  }
                };
              return (0, e.jsx)("div", {
                className: "min-h-screen bg-gray-50 py-8",
                children: (0, e.jsxs)("div", {
                  className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                  children: [
                    (0, e.jsxs)("div", {
                      className: "mb-8",
                      children: [
                        (0, e.jsx)("h1", {
                          className: "text-3xl font-bold text-gray-900",
                          children: "Create New Ad Campaign",
                        }),
                        (0, e.jsx)("p", {
                          className: "text-gray-600 mt-2",
                          children:
                            "Upload your ad with precise targeting to reach the right audience in Kenya",
                        }),
                      ],
                    }),
                    (0, e.jsxs)("form", {
                      onSubmit: O(V),
                      className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                      children: [
                        (0, e.jsxs)("div", {
                          className: "lg:col-span-2 space-y-6",
                          children: [
                            (0, e.jsxs)(u.tU, {
                              defaultValue: "basic",
                              className: "w-full",
                              children: [
                                (0, e.jsxs)(u.j7, {
                                  className: "grid w-full grid-cols-4",
                                  children: [
                                    (0, e.jsx)(u.Xi, {
                                      value: "basic",
                                      children: "Basic Info",
                                    }),
                                    (0, e.jsx)(u.Xi, {
                                      value: "media",
                                      children: "Media",
                                    }),
                                    (0, e.jsx)(u.Xi, {
                                      value: "targeting",
                                      children: "Targeting",
                                    }),
                                    (0, e.jsx)(u.Xi, {
                                      value: "budget",
                                      children: "Budget",
                                    }),
                                  ],
                                }),
                                (0, e.jsx)(u.av, {
                                  value: "basic",
                                  className: "space-y-4",
                                  children: (0, e.jsxs)(m.Zp, {
                                    children: [
                                      (0, e.jsx)(m.aR, {
                                        children: (0, e.jsx)(m.ZB, {
                                          children: "Campaign Details",
                                        }),
                                      }),
                                      (0, e.jsxs)(m.Wu, {
                                        className: "space-y-4",
                                        children: [
                                          (0, e.jsxs)("div", {
                                            children: [
                                              (0, e.jsx)(o.J, {
                                                htmlFor: "title",
                                                children: "Ad Title *",
                                              }),
                                              (0, e.jsx)(n.p, {
                                                id: "title",
                                                ...N("title"),
                                                placeholder:
                                                  "Enter compelling ad title",
                                                className: R.title
                                                  ? "border-red-500"
                                                  : "",
                                              }),
                                              R.title &&
                                                (0, e.jsx)("p", {
                                                  className:
                                                    "text-red-500 text-sm mt-1",
                                                  children: R.title.message,
                                                }),
                                            ],
                                          }),
                                          (0, e.jsxs)("div", {
                                            children: [
                                              (0, e.jsx)(o.J, {
                                                htmlFor: "description",
                                                children: "Ad Description *",
                                              }),
                                              (0, e.jsx)(p.T, {
                                                id: "description",
                                                ...N("description"),
                                                rows: 4,
                                                placeholder:
                                                  "Describe your product or service...",
                                                className: R.description
                                                  ? "border-red-500"
                                                  : "",
                                              }),
                                              R.description &&
                                                (0, e.jsx)("p", {
                                                  className:
                                                    "text-red-500 text-sm mt-1",
                                                  children:
                                                    R.description.message,
                                                }),
                                            ],
                                          }),
                                          (0, e.jsxs)("div", {
                                            children: [
                                              (0, e.jsx)(o.J, {
                                                children:
                                                  "Campaign Duration (days) *",
                                              }),
                                              (0, e.jsxs)("div", {
                                                className: "mt-2",
                                                children: [
                                                  (0, e.jsx)(q.A, {
                                                    value: [
                                                      T.campaignDuration || 7,
                                                    ],
                                                    onValueChange: (a) =>
                                                      Q(
                                                        "campaignDuration",
                                                        a[0],
                                                      ),
                                                    max: 90,
                                                    min: 1,
                                                    step: 1,
                                                    className: "w-full",
                                                  }),
                                                  (0, e.jsxs)("div", {
                                                    className:
                                                      "flex justify-between text-sm text-gray-500 mt-1",
                                                    children: [
                                                      (0, e.jsx)("span", {
                                                        children: "1 day",
                                                      }),
                                                      (0, e.jsxs)("span", {
                                                        className:
                                                          "font-medium",
                                                        children: [
                                                          T.campaignDuration ||
                                                            7,
                                                          " days",
                                                        ],
                                                      }),
                                                      (0, e.jsx)("span", {
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
                                (0, e.jsx)(u.av, {
                                  value: "media",
                                  className: "space-y-4",
                                  children: (0, e.jsxs)(m.Zp, {
                                    children: [
                                      (0, e.jsx)(m.aR, {
                                        children: (0, e.jsx)(m.ZB, {
                                          children: "Upload Media",
                                        }),
                                      }),
                                      (0, e.jsx)(m.Wu, {
                                        children: (0, e.jsxs)("div", {
                                          className:
                                            "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center",
                                          children: [
                                            (0, e.jsx)("input", {
                                              type: "file",
                                              accept: "image/*,video/*",
                                              onChange: (a) => {
                                                let b = a.target.files?.[0];
                                                if (b) {
                                                  j(b);
                                                  let a = new FileReader();
                                                  ((a.onload = (a) => {
                                                    A(a.target?.result);
                                                  }),
                                                    a.readAsDataURL(b));
                                                }
                                              },
                                              className: "hidden",
                                              id: "media-upload",
                                            }),
                                            (0, e.jsx)("label", {
                                              htmlFor: "media-upload",
                                              className: "cursor-pointer",
                                              children: z
                                                ? (0, e.jsxs)("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      d?.type.startsWith(
                                                        "video/",
                                                      )
                                                        ? (0, e.jsx)(x.CeX, {
                                                            className:
                                                              "h-12 w-12 mx-auto text-gray-400",
                                                          })
                                                        : (0, e.jsx)(x._V3, {
                                                            className:
                                                              "h-12 w-12 mx-auto text-gray-400",
                                                          }),
                                                      (0, e.jsx)("p", {
                                                        className:
                                                          "text-green-600 font-medium",
                                                        children:
                                                          "Media uploaded successfully",
                                                      }),
                                                      (0, e.jsx)("p", {
                                                        className:
                                                          "text-sm text-gray-500",
                                                        children:
                                                          "Click to change",
                                                      }),
                                                    ],
                                                  })
                                                : (0, e.jsxs)("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                      (0, e.jsx)(x._OO, {
                                                        className:
                                                          "h-12 w-12 mx-auto text-gray-400",
                                                      }),
                                                      (0, e.jsxs)("div", {
                                                        children: [
                                                          (0, e.jsx)("p", {
                                                            className:
                                                              "text-lg font-medium",
                                                            children:
                                                              "Upload your ad media",
                                                          }),
                                                          (0, e.jsx)("p", {
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
                                (0, e.jsx)(u.av, {
                                  value: "targeting",
                                  className: "space-y-4",
                                  children: (0, e.jsxs)(m.Zp, {
                                    children: [
                                      (0, e.jsx)(m.aR, {
                                        children: (0, e.jsx)(m.ZB, {
                                          children: "Audience Targeting",
                                        }),
                                      }),
                                      (0, e.jsxs)(m.Wu, {
                                        className: "space-y-6",
                                        children: [
                                          (0, e.jsxs)("div", {
                                            children: [
                                              (0, e.jsx)(o.J, {
                                                children: "Languages *",
                                              }),
                                              (0, e.jsx)("div", {
                                                className:
                                                  "grid grid-cols-2 gap-2 mt-2",
                                                children: D.map((a) =>
                                                  (0, e.jsxs)(
                                                    "div",
                                                    {
                                                      className:
                                                        "flex items-center space-x-2",
                                                      children: [
                                                        (0, e.jsx)(s.S, {
                                                          id: a.value,
                                                          checked: B.includes(
                                                            a.value,
                                                          ),
                                                          onCheckedChange: (
                                                            b,
                                                          ) => {
                                                            if (b) {
                                                              let b = [
                                                                ...B,
                                                                a.value,
                                                              ];
                                                              (G(b),
                                                                Q(
                                                                  "languages",
                                                                  b,
                                                                ));
                                                            } else {
                                                              let b = B.filter(
                                                                (b) =>
                                                                  b !== a.value,
                                                              );
                                                              (G(b),
                                                                Q(
                                                                  "languages",
                                                                  b,
                                                                ));
                                                            }
                                                          },
                                                        }),
                                                        (0, e.jsx)(o.J, {
                                                          htmlFor: a.value,
                                                          children: a.label,
                                                        }),
                                                      ],
                                                    },
                                                    a.value,
                                                  ),
                                                ),
                                              }),
                                            ],
                                          }),
                                          (0, e.jsxs)("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                              (0, e.jsxs)("div", {
                                                children: [
                                                  (0, e.jsx)(o.J, {
                                                    children: "Region *",
                                                  }),
                                                  (0, e.jsxs)(r.l6, {
                                                    onValueChange: (a) => {
                                                      (Q("region", a),
                                                        Q("city", ""));
                                                      let b = F.find(
                                                        (b) => b.value === a,
                                                      );
                                                      M(b?.cities || []);
                                                    },
                                                    children: [
                                                      (0, e.jsx)(r.bq, {
                                                        children: (0, e.jsx)(
                                                          r.yv,
                                                          {
                                                            placeholder:
                                                              "Select region",
                                                          },
                                                        ),
                                                      }),
                                                      (0, e.jsx)(r.gC, {
                                                        children: F.map((a) =>
                                                          (0, e.jsx)(
                                                            r.eb,
                                                            {
                                                              value: a.value,
                                                              children: a.label,
                                                            },
                                                            a.value,
                                                          ),
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              (0, e.jsxs)("div", {
                                                children: [
                                                  (0, e.jsx)(o.J, {
                                                    children: "City *",
                                                  }),
                                                  (0, e.jsxs)(r.l6, {
                                                    onValueChange: (a) =>
                                                      Q("city", a),
                                                    children: [
                                                      (0, e.jsx)(r.bq, {
                                                        children: (0, e.jsx)(
                                                          r.yv,
                                                          {
                                                            placeholder:
                                                              "Select city",
                                                          },
                                                        ),
                                                      }),
                                                      (0, e.jsx)(r.gC, {
                                                        children: L.map((a) =>
                                                          (0, e.jsx)(
                                                            r.eb,
                                                            {
                                                              value: a,
                                                              children: a,
                                                            },
                                                            a,
                                                          ),
                                                        ),
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, e.jsxs)("div", {
                                            children: [
                                              (0, e.jsx)(o.J, {
                                                children:
                                                  "Targeting Radius (km) *",
                                              }),
                                              (0, e.jsxs)("div", {
                                                className: "mt-2",
                                                children: [
                                                  (0, e.jsx)(q.A, {
                                                    value: [T.radius || 25],
                                                    onValueChange: (a) =>
                                                      Q("radius", a[0]),
                                                    max: 100,
                                                    min: 1,
                                                    step: 1,
                                                    className: "w-full",
                                                  }),
                                                  (0, e.jsxs)("div", {
                                                    className:
                                                      "flex justify-between text-sm text-gray-500 mt-1",
                                                    children: [
                                                      (0, e.jsx)("span", {
                                                        children: "1km",
                                                      }),
                                                      (0, e.jsxs)("span", {
                                                        className:
                                                          "font-medium",
                                                        children: [
                                                          T.radius || 25,
                                                          "km",
                                                        ],
                                                      }),
                                                      (0, e.jsx)("span", {
                                                        children: "100km",
                                                      }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                          (0, e.jsxs)("div", {
                                            children: [
                                              (0, e.jsx)(o.J, {
                                                children: "Age Range *",
                                              }),
                                              (0, e.jsxs)("div", {
                                                className:
                                                  "grid grid-cols-2 gap-4 mt-2",
                                                children: [
                                                  (0, e.jsxs)("div", {
                                                    children: [
                                                      (0, e.jsx)(o.J, {
                                                        htmlFor: "age-min",
                                                        className: "text-sm",
                                                        children: "Minimum Age",
                                                      }),
                                                      (0, e.jsxs)(r.l6, {
                                                        onValueChange: (a) =>
                                                          Q(
                                                            "ageRange.min",
                                                            parseInt(a),
                                                          ),
                                                        children: [
                                                          (0, e.jsx)(r.bq, {
                                                            children: (0,
                                                            e.jsx)(r.yv, {
                                                              placeholder: "18",
                                                            }),
                                                          }),
                                                          (0, e.jsx)(r.gC, {
                                                            children:
                                                              Array.from(
                                                                { length: 48 },
                                                                (a, b) =>
                                                                  b + 18,
                                                              ).map((a) =>
                                                                (0, e.jsx)(
                                                                  r.eb,
                                                                  {
                                                                    value:
                                                                      a.toString(),
                                                                    children: a,
                                                                  },
                                                                  a,
                                                                ),
                                                              ),
                                                          }),
                                                        ],
                                                      }),
                                                    ],
                                                  }),
                                                  (0, e.jsxs)("div", {
                                                    children: [
                                                      (0, e.jsx)(o.J, {
                                                        htmlFor: "age-max",
                                                        className: "text-sm",
                                                        children: "Maximum Age",
                                                      }),
                                                      (0, e.jsxs)(r.l6, {
                                                        onValueChange: (a) =>
                                                          Q(
                                                            "ageRange.max",
                                                            parseInt(a),
                                                          ),
                                                        children: [
                                                          (0, e.jsx)(r.bq, {
                                                            children: (0,
                                                            e.jsx)(r.yv, {
                                                              placeholder: "65",
                                                            }),
                                                          }),
                                                          (0, e.jsx)(r.gC, {
                                                            children:
                                                              Array.from(
                                                                { length: 48 },
                                                                (a, b) =>
                                                                  b + 18,
                                                              ).map((a) =>
                                                                (0, e.jsx)(
                                                                  r.eb,
                                                                  {
                                                                    value:
                                                                      a.toString(),
                                                                    children: a,
                                                                  },
                                                                  a,
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
                                          (0, e.jsxs)("div", {
                                            children: [
                                              (0, e.jsx)(o.J, {
                                                children: "Interests *",
                                              }),
                                              (0, e.jsx)("div", {
                                                className:
                                                  "grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto",
                                                children: E.map((a) =>
                                                  (0, e.jsxs)(
                                                    "div",
                                                    {
                                                      className:
                                                        "flex items-center space-x-2",
                                                      children: [
                                                        (0, e.jsx)(s.S, {
                                                          id: a,
                                                          checked:
                                                            H.includes(a),
                                                          onCheckedChange: (
                                                            b,
                                                          ) => {
                                                            if (b) {
                                                              let b = [...H, a];
                                                              (I(b),
                                                                Q(
                                                                  "interests",
                                                                  b,
                                                                ));
                                                            } else {
                                                              let b = H.filter(
                                                                (b) => b !== a,
                                                              );
                                                              (I(b),
                                                                Q(
                                                                  "interests",
                                                                  b,
                                                                ));
                                                            }
                                                          },
                                                        }),
                                                        (0, e.jsx)(o.J, {
                                                          htmlFor: a,
                                                          className: "text-sm",
                                                          children: a,
                                                        }),
                                                      ],
                                                    },
                                                    a,
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
                                (0, e.jsx)(u.av, {
                                  value: "budget",
                                  className: "space-y-4",
                                  children: (0, e.jsxs)(m.Zp, {
                                    children: [
                                      (0, e.jsx)(m.aR, {
                                        children: (0, e.jsx)(m.ZB, {
                                          children: "Campaign Budget",
                                        }),
                                      }),
                                      (0, e.jsxs)(m.Wu, {
                                        className: "space-y-4",
                                        children: [
                                          (0, e.jsxs)("div", {
                                            children: [
                                              (0, e.jsx)(o.J, {
                                                htmlFor: "budget",
                                                children:
                                                  "Total Budget (USD) *",
                                              }),
                                              (0, e.jsx)(n.p, {
                                                id: "budget",
                                                type: "number",
                                                ...N("budget", {
                                                  valueAsNumber: !0,
                                                }),
                                                min: 100,
                                                max: 5e4,
                                                step: 50,
                                                placeholder: "1000",
                                                className: R.budget
                                                  ? "border-red-500"
                                                  : "",
                                              }),
                                              R.budget &&
                                                (0, e.jsx)("p", {
                                                  className:
                                                    "text-red-500 text-sm mt-1",
                                                  children: R.budget.message,
                                                }),
                                            ],
                                          }),
                                          (0, e.jsx)(v.Fc, {
                                            children: (0, e.jsxs)(v.TN, {
                                              children: [
                                                (0, e.jsx)("strong", {
                                                  children: "Budget Breakdown:",
                                                }),
                                                (0, e.jsx)("br", {}),
                                                "• Daily spend: $",
                                                Math.round(
                                                  (T.budget || 0) /
                                                    (T.campaignDuration || 1),
                                                ),
                                                (0, e.jsx)("br", {}),
                                                "• Estimated reach: ",
                                                Math.round(
                                                  2.5 * (T.budget || 0),
                                                ).toLocaleString(),
                                                " people",
                                                (0, e.jsx)("br", {}),
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
                            b > 0 &&
                              (0, e.jsx)(m.Zp, {
                                children: (0, e.jsx)(m.Wu, {
                                  className: "pt-6",
                                  children: (0, e.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      (0, e.jsxs)("div", {
                                        className:
                                          "flex justify-between text-sm",
                                        children: [
                                          (0, e.jsx)("span", {
                                            children: "Upload Progress",
                                          }),
                                          (0, e.jsxs)("span", {
                                            children: [b, "%"],
                                          }),
                                        ],
                                      }),
                                      (0, e.jsx)(w.k, { value: b }),
                                    ],
                                  }),
                                }),
                              }),
                            (0, e.jsxs)("div", {
                              className: "flex gap-4",
                              children: [
                                (0, e.jsxs)(l.$, {
                                  type: "submit",
                                  disabled: S,
                                  className: "flex-1",
                                  children: [
                                    (0, e.jsx)(x.Vnp, {
                                      className: "h-4 w-4 mr-2",
                                    }),
                                    S ? "Submitting..." : "Submit for Review",
                                  ],
                                }),
                                (0, e.jsxs)(l.$, {
                                  type: "button",
                                  variant: "outline",
                                  onClick: () =>
                                    (0, y.toast)("Draft saved locally", {
                                      icon: "\uD83D\uDCBE",
                                    }),
                                  children: [
                                    (0, e.jsx)(x.eMP, {
                                      className: "h-4 w-4 mr-2",
                                    }),
                                    "Save Draft",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, e.jsx)("div", {
                          className: "lg:col-span-1",
                          children: (0, e.jsx)("div", {
                            className: "sticky top-8",
                            children: (0, e.jsx)(
                              () =>
                                (0, e.jsxs)(m.Zp, {
                                  className: "h-fit",
                                  children: [
                                    (0, e.jsx)(m.aR, {
                                      children: (0, e.jsxs)(m.ZB, {
                                        className: "flex items-center gap-2",
                                        children: [
                                          (0, e.jsx)(x.kU3, {
                                            className: "h-5 w-5",
                                          }),
                                          "Live Preview",
                                        ],
                                      }),
                                    }),
                                    (0, e.jsxs)(m.Wu, {
                                      className: "space-y-4",
                                      children: [
                                        z &&
                                          (0, e.jsx)("div", {
                                            className:
                                              "rounded-lg overflow-hidden border",
                                            children: d?.type.startsWith(
                                              "video/",
                                            )
                                              ? (0, e.jsx)("video", {
                                                  src: z,
                                                  controls: !0,
                                                  className:
                                                    "w-full h-48 object-cover",
                                                })
                                              : (0, e.jsx)("img", {
                                                  src: z,
                                                  alt: "Ad preview",
                                                  className:
                                                    "w-full h-48 object-cover",
                                                }),
                                          }),
                                        (0, e.jsxs)("div", {
                                          children: [
                                            (0, e.jsx)("h3", {
                                              className:
                                                "font-semibold text-lg",
                                              children:
                                                T.title || "Your Ad Title Here",
                                            }),
                                            (0, e.jsx)("p", {
                                              className:
                                                "text-sm text-gray-600 mt-2",
                                              children:
                                                T.description ||
                                                "Your ad description will appear here...",
                                            }),
                                          ],
                                        }),
                                        (0, e.jsxs)("div", {
                                          className:
                                            "space-y-2 text-xs text-gray-500",
                                          children: [
                                            (0, e.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, e.jsx)(x.DTr, {
                                                  className: "h-3 w-3",
                                                }),
                                                (0, e.jsxs)("span", {
                                                  children: [
                                                    "Targeting: ",
                                                    B.join(", "),
                                                    " speakers",
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, e.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, e.jsx)(x.sDd, {
                                                  className: "h-3 w-3",
                                                }),
                                                (0, e.jsxs)("span", {
                                                  children: [
                                                    "Radius: ",
                                                    T.radius,
                                                    "km around ",
                                                    T.city || "selected city",
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, e.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, e.jsx)(x.zWC, {
                                                  className: "h-3 w-3",
                                                }),
                                                (0, e.jsxs)("span", {
                                                  children: [
                                                    "Ages: ",
                                                    T.ageRange?.min,
                                                    "-",
                                                    T.ageRange?.max,
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, e.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, e.jsx)(x.VvS, {
                                                  className: "h-3 w-3",
                                                }),
                                                (0, e.jsxs)("span", {
                                                  children: [
                                                    "Duration: ",
                                                    T.campaignDuration,
                                                    " days",
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, e.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, e.jsx)(x.G9t, {
                                                  className: "h-3 w-3",
                                                }),
                                                (0, e.jsxs)("span", {
                                                  children: [
                                                    "Budget: $",
                                                    T.budget?.toLocaleString(),
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        H.length > 0 &&
                                          (0, e.jsxs)("div", {
                                            children: [
                                              (0, e.jsx)("p", {
                                                className:
                                                  "text-xs text-gray-500 mb-2",
                                                children:
                                                  "Targeting interests:",
                                              }),
                                              (0, e.jsxs)("div", {
                                                className:
                                                  "flex flex-wrap gap-1",
                                                children: [
                                                  H.slice(0, 3).map((a) =>
                                                    (0, e.jsx)(
                                                      t.E,
                                                      {
                                                        variant: "secondary",
                                                        className: "text-xs",
                                                        children: a,
                                                      },
                                                      a,
                                                    ),
                                                  ),
                                                  H.length > 3 &&
                                                    (0, e.jsxs)(t.E, {
                                                      variant: "outline",
                                                      className: "text-xs",
                                                      children: [
                                                        "+",
                                                        H.length - 3,
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
                                }),
                              {},
                            ),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              });
            }
            async function B() {
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
      4986: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { S: () => k });
            var e = c(8732),
              f = c(2015),
              g = c(5665),
              h = c(1302),
              i = c(3894),
              j = a([g, i]);
            [g, i] = j.then ? (await j)() : j;
            let k = f.forwardRef(({ className: a, ...b }, c) =>
              (0, e.jsx)(g.Root, {
                ref: c,
                className: (0, i.cn)(
                  "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
                  a,
                ),
                ...b,
                children: (0, e.jsx)(g.Indicator, {
                  className: (0, i.cn)(
                    "flex items-center justify-center text-current",
                  ),
                  children: (0, e.jsx)(h.Jlk, { className: "h-4 w-4" }),
                }),
              }),
            );
            ((k.displayName = g.Root.displayName), d());
          } catch (a) {
            d(a);
          }
        });
      },
      5471: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { J: () => l });
            var e = c(8732),
              f = c(2015),
              g = c(598),
              h = c(8938),
              i = c(3894),
              j = a([g, h, i]);
            [g, h, i] = j.then ? (await j)() : j;
            let k = (0, h.cva)(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              ),
              l = f.forwardRef(({ className: a, ...b }, c) =>
                (0, e.jsx)(g.Root, {
                  ref: c,
                  className: (0, i.cn)(k(), a),
                  ...b,
                }),
              );
            ((l.displayName = g.Root.displayName), d());
          } catch (a) {
            d(a);
          }
        });
      },
      5665: (a) => {
        a.exports = import("@radix-ui/react-checkbox");
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
      6472: (a) => {
        a.exports = require("@opentelemetry/api");
      },
      6884: (a) => {
        a.exports = import("react-hook-form");
      },
      7188: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            c.d(b, { k: () => j });
            var e = c(8732),
              f = c(2015),
              g = c(7947),
              h = c(3894),
              i = a([g, h]);
            [g, h] = i.then ? (await i)() : i;
            let j = f.forwardRef(({ className: a, value: b, ...c }, d) =>
              (0, e.jsx)(g.Root, {
                ref: d,
                className: (0, h.cn)(
                  "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
                  a,
                ),
                ...c,
                children: (0, e.jsx)(g.Indicator, {
                  className: "h-full w-full flex-1 bg-primary transition-all",
                  style: { transform: `translateX(-${100 - (b || 0)}%)` },
                }),
              }),
            );
            ((j.displayName = g.Root.displayName), d());
          } catch (a) {
            d(a);
          }
        });
      },
      7259: (a) => {
        a.exports = import("@radix-ui/react-tabs");
      },
      7687: (a, b, c) => {
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
              k = c(4644),
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
                  page: "/ads/upload",
                  pathname: "/ads/upload",
                  bundlePath: "",
                  filename: "",
                },
                distDir: ".next",
                relativeProjectDir: "",
                components: { App: j.default, Document: i() },
                userland: k,
              }),
              z = (0, l.U)({
                srcPage: "/ads/upload",
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
      7860: (a) => {
        a.exports = import("@radix-ui/react-select");
      },
      7910: (a) => {
        a.exports = require("stream");
      },
      7947: (a) => {
        a.exports = import("@radix-ui/react-progress");
      },
      8421: (a) => {
        a.exports = import("clsx");
      },
      8496: (a) => {
        a.exports = require("@supabase/functions-js");
      },
      8732: (a) => {
        a.exports = require("react/jsx-runtime");
      },
      8825: (a) => {
        a.exports = import("@hookform/resolvers/zod");
      },
      8938: (a) => {
        a.exports = import("class-variance-authority");
      },
      9021: (a) => {
        a.exports = require("fs");
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
    }));
  var b = require("../../webpack-runtime.js");
  b.C(a);
  var c = b.X(0, [2631, 3317, 5781, 4233, 1690], () => b((b.s = 7687)));
  module.exports = c;
})();
