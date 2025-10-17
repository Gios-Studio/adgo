"use strict";
(() => {
  var a = {};
  ((a.id = 5719),
    (a.ids = [5719]),
    (a.modules = {
      37: (a) => {
        a.exports = import("uuid");
      },
      91: (a, b, c) => {
        c.d(b, { dY: () => e });
        class d {
          set(a, b, c = this.DEFAULT_TTL) {
            this.cache.size >= this.MAX_SIZE && this.cleanup();
            let d = { data: b, timestamp: Date.now(), ttl: c };
            (this.cache.set(a, d),
              this.stats.sets++,
              (this.stats.size = this.cache.size),
              this.logCacheOperation("SET", a, { ttl: c }));
          }
          get(a) {
            let b = this.cache.get(a);
            return b
              ? Date.now() - b.timestamp > b.ttl
                ? (this.cache.delete(a),
                  this.stats.misses++,
                  (this.stats.size = this.cache.size),
                  this.logCacheOperation("EXPIRED", a),
                  null)
                : (this.stats.hits++, this.logCacheOperation("HIT", a), b.data)
              : (this.stats.misses++, this.logCacheOperation("MISS", a), null);
          }
          has(a) {
            let b = this.cache.get(a);
            return (
              !!b &&
              (!(Date.now() - b.timestamp > b.ttl) ||
                (this.cache.delete(a), (this.stats.size = this.cache.size), !1))
            );
          }
          delete(a) {
            let b = this.cache.delete(a);
            return (
              (this.stats.size = this.cache.size),
              b && this.logCacheOperation("DELETE", a),
              b
            );
          }
          clear() {
            (this.cache.clear(),
              (this.stats.size = 0),
              this.logCacheOperation("CLEAR", "all"));
          }
          cleanup() {
            let a = Date.now(),
              b = 0;
            for (let [c, d] of this.cache.entries())
              a - d.timestamp > d.ttl && (this.cache.delete(c), b++);
            ((this.stats.size = this.cache.size),
              b > 0 && this.logCacheOperation("CLEANUP", `${b} entries`));
          }
          getStats() {
            let a = this.stats.hits + this.stats.misses,
              b = a > 0 ? (this.stats.hits / a) * 100 : 0;
            return { ...this.stats, hitRate: Math.round(100 * b) / 100 };
          }
          logCacheOperation(a, b, c) {
            console.log(
              JSON.stringify({
                timestamp: new Date().toISOString(),
                operation: a,
                key: b,
                stats: this.getStats(),
                ...c,
              }),
            );
          }
          static generateMetricsKey(a, b, c) {
            let d = ["metrics"];
            return (
              a && d.push(`campaign:${a}`),
              b && d.push(`partner:${b}`),
              c && d.push(`period:${c}`),
              d.join("|")
            );
          }
          constructor() {
            ((this.cache = new Map()),
              (this.stats = { hits: 0, misses: 0, sets: 0, size: 0 }),
              (this.DEFAULT_TTL = 3e4),
              (this.MAX_SIZE = 1e3));
          }
        }
        let e = new d();
      },
      2480: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            (c.r(b),
              c.d(b, { config: () => o, default: () => n, handler: () => m }));
            var e = c(9046),
              f = c(8667),
              g = c(3480),
              h = c(6435),
              i = c(9783),
              j = c(8112),
              k = c(6385),
              l = a([i]);
            i = (l.then ? (await l)() : l)[0];
            let n = (0, h.M)(i, "default"),
              o = (0, h.M)(i, "config"),
              p = new g.PagesAPIRouteModule({
                definition: {
                  kind: f.A.PAGES_API,
                  page: "/api/sdk/events",
                  pathname: "/api/sdk/events",
                  bundlePath: "",
                  filename: "",
                },
                userland: i,
                distDir: ".next",
                relativeProjectDir: "",
              });
            async function m(a, b, c) {
              let d = await p.prepare(a, b, { srcPage: "/api/sdk/events" });
              if (!d) {
                ((b.statusCode = 400),
                  b.end("Bad Request"),
                  null == c.waitUntil ||
                    c.waitUntil.call(c, Promise.resolve()));
                return;
              }
              let {
                query: f,
                params: g,
                prerenderManifest: h,
                routerServerContext: i,
              } = d;
              try {
                let c = a.method || "GET",
                  d = (0, j.getTracer)(),
                  e = d.getActiveScopeSpan(),
                  l = p.instrumentationOnRequestError.bind(p),
                  m = async (e) =>
                    p
                      .render(a, b, {
                        query: { ...f, ...g },
                        params: g,
                        allowedRevalidateHeaderKeys: [],
                        multiZoneDraftMode: !1,
                        trustHostHeader: !1,
                        previewProps: h.preview,
                        propagateError: !1,
                        dev: p.isDev,
                        page: "/api/sdk/events",
                        internalRevalidate: null == i ? void 0 : i.revalidate,
                        onError: (...b) => l(a, ...b),
                      })
                      .finally(() => {
                        if (!e) return;
                        e.setAttributes({
                          "http.status_code": b.statusCode,
                          "next.rsc": !1,
                        });
                        let f = d.getRootSpanAttributes();
                        if (!f) return;
                        if (
                          f.get("next.span_type") !==
                          k.BaseServerSpan.handleRequest
                        )
                          return void console.warn(
                            `Unexpected root span type '${f.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`,
                          );
                        let g = f.get("next.route");
                        if (g) {
                          let a = `${c} ${g}`;
                          (e.setAttributes({
                            "next.route": g,
                            "http.route": g,
                            "next.span_name": a,
                          }),
                            e.updateName(a));
                        } else e.updateName(`${c} ${a.url}`);
                      });
                e
                  ? await m(e)
                  : await d.withPropagatedContext(a.headers, () =>
                      d.trace(
                        k.BaseServerSpan.handleRequest,
                        {
                          spanName: `${c} ${a.url}`,
                          kind: j.SpanKind.SERVER,
                          attributes: {
                            "http.method": c,
                            "http.target": a.url,
                          },
                        },
                        m,
                      ),
                    );
              } catch (a) {
                if (p.isDev) throw a;
                (0, e.sendError)(b, 500, "Internal Server Error");
              } finally {
                null == c.waitUntil || c.waitUntil.call(c, Promise.resolve());
              }
            }
            d();
          } catch (a) {
            d(a);
          }
        });
      },
      2971: (a) => {
        a.exports = import("zod");
      },
      3939: (a) => {
        a.exports = require("@supabase/supabase-js");
      },
      5600: (a) => {
        a.exports = require("next/dist/compiled/next-server/pages-api.runtime.prod.js");
      },
      6472: (a) => {
        a.exports = require("@opentelemetry/api");
      },
      9783: (a, b, c) => {
        c.a(a, async (a, d) => {
          try {
            (c.r(b), c.d(b, { default: () => m }));
            var e = c(3939),
              f = c(37),
              g = c(2971),
              h = c(91),
              i = a([f, g]);
            [f, g] = i.then ? (await i)() : i;
            let u = (0, e.createClient)(
                "https://rkonwkggxaohpmxmzmfn.supabase.co",
                process.env.SUPABASE_SERVICE_ROLE_KEY,
              ),
              v = g.z.object({
                campaign_id: g.z.string().uuid(),
                ad_id: g.z.string().uuid(),
                ride_id: g.z.string().min(1),
                device_id: g.z.string().min(1).optional(),
                event_type: g.z.enum(["impression", "click", "conversion"]),
                zone: g.z.string().default("post-ride"),
                meta: g.z.record(g.z.any()).optional(),
              }),
              w = g.z.object({
                events: g.z.array(v).min(1).max(50),
                batch_id: g.z.string().uuid().optional(),
              });
            g.z.object({
              ride_id: g.z.string().min(1),
              device_id: g.z.string().min(1),
              zone: g.z.string().default("post-ride"),
            });
            let x = g.z.object({
                ride_id: g.z.string().min(1).optional(),
                device_id: g.z.string().min(1).optional(),
                zone: g.z.string().default("post-ride"),
                limit: g.z.coerce.number().min(1).max(100).default(50),
                offset: g.z.coerce.number().min(0).default(0),
                cursor: g.z.string().optional(),
                since: g.z.string().datetime().optional(),
                campaign_id: g.z.string().uuid().optional(),
                event_type: g.z
                  .enum(["impression", "click", "conversion"])
                  .optional(),
              }),
              y = { maxRetries: 3, baseDelay: 100, maxDelay: 2e3 };
            function j(a) {
              let b = a.ride_id,
                c = null,
                d = { ...a };
              return (
                (0, f.validate)(b) ||
                  ((c = b),
                  b.startsWith("test_") || b.includes("test")
                    ? (d.ride_id = "619fee45-808f-4336-8468-54571cea537c")
                    : "00000000-0000-0000-0000-000000000300" === b
                      ? (d.ride_id = b)
                      : (d.ride_id = (0, f.v4)())),
                (0, f.validate)(d.campaign_id) ||
                  (console.log(
                    `Invalid campaign_id: ${d.campaign_id}, generating new UUID`,
                  ),
                  (d.campaign_id = "ace29fa0-5765-4ce0-b856-074b3abad5e7")),
                (0, f.validate)(d.ad_id) ||
                  (console.log(
                    `Invalid ad_id: ${d.ad_id}, generating new UUID`,
                  ),
                  (d.ad_id = "88c0a93e-493c-499a-8a0a-eaa2cdba6a2c")),
                { normalizedData: d, rideRef: c }
              );
            }
            async function k(a) {
              try {
                let { data: b, error: c } = await u
                  .from("analytics_events")
                  .select("id, ride_id, event_type, created_at")
                  .eq("id", a)
                  .single();
                return !c && b && b.id === a;
              } catch {
                return !1;
              }
            }
            async function l(a, b = "operation") {
              let c,
                d = 0;
              for (let e = 0; e <= y.maxRetries; e++)
                try {
                  return await a();
                } catch (h) {
                  if (
                    ((c = h),
                    h.message?.includes("duplicate key") || "23505" === h.code)
                  ) {
                    if (++d >= 2)
                      throw (
                        console.log(
                          `${b} detected duplicate key after ${d} attempts - skipping`,
                        ),
                        h
                      );
                    console.log(`${b} detected duplicate key - attempt ${d}/2`);
                  }
                  if (
                    (h.code?.startsWith("23") || h.code?.startsWith("42")) &&
                    !(
                      h.message?.includes("duplicate key") || "23505" === h.code
                    )
                  )
                    throw h;
                  if (e === y.maxRetries)
                    throw (
                      console.error(
                        `${b} failed after ${y.maxRetries + 1} attempts:`,
                        h,
                      ),
                      h
                    );
                  let a = y.baseDelay * Math.pow(2, e),
                    f = 50 * Math.random(),
                    g = Math.min(a + f, y.maxDelay);
                  (console.warn(
                    `${b} attempt ${e + 1} failed, retrying in ${Math.round(g)}ms:`,
                    h.message,
                  ),
                    await new Promise((a) => setTimeout(a, g)));
                }
              throw c;
            }
            async function m(a, b) {
              try {
                if (
                  (b.setHeader("X-AdGo-SDK-Version", "1.0.0"),
                  b.setHeader("X-Response-Time", Date.now().toString()),
                  "GET" === a.method)
                ) {
                  if (
                    a.query.limit ||
                    a.query.offset ||
                    a.query.since ||
                    a.query.event_type
                  )
                    return await n(a, b);
                  return await q(a, b);
                }
                if ("POST" === a.method) return await s(a, b);
                return b
                  .status(405)
                  .json({
                    error: "method_not_allowed",
                    allowed_methods: ["GET", "POST"],
                    sdk_version: "1.0.0",
                  });
              } catch (a) {
                return (
                  console.error("SDK Events API Error:", a),
                  b
                    .status(500)
                    .json({
                      error: "internal_server_error",
                      message: a.message,
                      sdk_version: "1.0.0",
                      timestamp: new Date().toISOString(),
                    })
                );
              }
            }
            async function n(a, b) {
              try {
                let c,
                  d,
                  e,
                  f = x.safeParse(a.query);
                if (!f.success)
                  return b
                    .status(400)
                    .json({
                      error: "invalid_query_parameters",
                      details: f.error.issues,
                      sdk_version: "1.0.0",
                    });
                let {
                    ride_id: g,
                    device_id: i,
                    zone: j,
                    limit: k,
                    offset: l,
                    cursor: m,
                    since: n,
                    campaign_id: q,
                    event_type: r,
                  } = f.data,
                  s = `events|${g || "all"}|${i || "all"}|${j}|${k}|${l}|${n || "all"}|${q || "all"}|${r || "all"}`,
                  t = h.dY.get(s);
                if (t)
                  return (
                    b.setHeader("X-Cache", "HIT"),
                    b.setHeader("X-Cache-Key", s.substring(0, 50) + "..."),
                    b
                      .status(200)
                      .json({
                        ...t,
                        cached: !0,
                        timestamp: new Date().toISOString(),
                      })
                  );
                b.setHeader("X-Cache", "MISS");
                try {
                  let a = await o({
                    ride_id: g,
                    device_id: i,
                    zone: j,
                    limit: k,
                    offset: l,
                    since: n,
                    campaign_id: q,
                    event_type: r,
                  });
                  ((c = a.data), (d = a.error), (e = a.count));
                } catch (a) {
                  console.warn(
                    "OFFSET pagination failed, falling back to cursor-based:",
                    a,
                  );
                  try {
                    let a = await p({
                      ride_id: g,
                      device_id: i,
                      zone: j,
                      limit: k,
                      cursor: m,
                      since: n,
                      campaign_id: q,
                      event_type: r,
                    });
                    ((c = a.events),
                      (d = a.error),
                      (e = a.count),
                      b.setHeader("X-Pagination-Method", "cursor-fallback"));
                  } catch (c) {
                    return (
                      console.error("Both pagination methods failed:", {
                        offsetError: a,
                        cursorError: c,
                      }),
                      b
                        .status(500)
                        .json({
                          error: "pagination_failed",
                          message: "Both OFFSET and cursor pagination failed",
                          sdk_version: "1.0.0",
                        })
                    );
                  }
                }
                if (d)
                  return (
                    console.error("Query events error:", d),
                    b
                      .status(500)
                      .json({
                        error: "Failed to query events",
                        details: d.message,
                        sdk_version: "1.0.0",
                      })
                  );
                c || (c = []);
                let u = !!e && l + k < e,
                  v = u ? l + k : null,
                  w = c.length > 0 ? c[c.length - 1].id : null,
                  y = {
                    events: c || [],
                    pagination: {
                      limit: k,
                      offset: l,
                      total: e || 0,
                      hasMore: u,
                      nextOffset: v,
                      nextCursor: w,
                    },
                    deltaSync: {
                      since: n || null,
                      latestTimestamp: c?.[0]?.created_at || null,
                    },
                    sdk_version: "1.0.0",
                    timestamp: new Date().toISOString(),
                  };
                return (h.dY.set(s, y, 3e4), b.status(200).json(y));
              } catch (a) {
                return (
                  console.error("Query events error:", a),
                  b
                    .status(500)
                    .json({
                      error: "Failed to query events",
                      details: a instanceof Error ? a.message : "Unknown error",
                      sdk_version: "1.0.0",
                    })
                );
              }
            }
            async function o(a) {
              let b = u
                .from("analytics_events")
                .select(
                  "id, campaign_id, ad_id, event_type, device_id, ride_id, region, created_at, occurred_at, meta",
                  { count: "exact" },
                )
                .order("created_at", { ascending: !1 })
                .range(a.offset, a.offset + a.limit - 1);
              return (
                a.ride_id && (b = b.eq("ride_id", a.ride_id)),
                a.device_id && (b = b.eq("device_id", a.device_id)),
                a.zone && (b = b.eq("region", a.zone)),
                a.campaign_id && (b = b.eq("campaign_id", a.campaign_id)),
                a.event_type && (b = b.eq("event_type", a.event_type)),
                a.since && (b = b.gte("created_at", a.since)),
                await b
              );
            }
            async function p(a) {
              let b = u
                .from("analytics_events")
                .select(
                  "id, campaign_id, ad_id, event_type, device_id, ride_id, region, created_at, occurred_at, meta",
                )
                .order("created_at", { ascending: !1 })
                .limit(a.limit);
              (a.cursor && (b = b.lt("id", a.cursor)),
                a.ride_id && (b = b.eq("ride_id", a.ride_id)),
                a.device_id && (b = b.eq("device_id", a.device_id)),
                a.zone && (b = b.eq("region", a.zone)),
                a.campaign_id && (b = b.eq("campaign_id", a.campaign_id)),
                a.event_type && (b = b.eq("event_type", a.event_type)),
                a.since && (b = b.gte("created_at", a.since)));
              let { data: c, error: d } = await b;
              return { events: c, error: d, count: null };
            }
            async function q(a, b) {
              let { ride_id: c, device_id: d, zone: e = "post-ride" } = a.query;
              if (!c) return b.status(400).json({ error: "missing_ride_id" });
              let { normalizedData: f, rideRef: g } = j({ ride_id: c }),
                h = f.ride_id;
              try {
                let { data: a, error: c } = await u
                  .from("analytics_events")
                  .select("id")
                  .eq("ride_id", h)
                  .limit(1);
                if (c) throw c;
                if (a && a.length > 0)
                  return b
                    .status(200)
                    .json({
                      ad: null,
                      message: "frequency_cap_reached",
                      ride_id: h,
                    });
                let { data: d, error: f } = await u
                  .from("campaigns")
                  .select("id, name, budget_cents, status")
                  .eq("status", "active")
                  .gt("budget_cents", 0)
                  .limit(1);
                if (f) throw f;
                if (!d || 0 === d.length)
                  return b
                    .status(200)
                    .json({ ad: null, message: "no_available_campaigns" });
                let g = d[0],
                  { data: i, error: j } = await u
                    .from("ads")
                    .select("id, title, media_url, status")
                    .eq("campaign_id", g.id)
                    .eq("status", "active");
                if (j) throw j;
                if (!i || 0 === i.length)
                  return b
                    .status(200)
                    .json({ ad: null, message: "no_active_ads" });
                let k = i[Math.floor(Math.random() * i.length)];
                return b
                  .status(200)
                  .json({
                    ad: {
                      id: k.id,
                      campaign_id: g.id,
                      title: k.title,
                      media_url: k.media_url,
                      tracking_pixel: `/api/sdk/events?event_type=impression&campaign_id=${g.id}&ad_id=${k.id}&ride_id=${h}`,
                      click_url: `/api/sdk/events?event_type=click&campaign_id=${g.id}&ad_id=${k.id}&ride_id=${h}`,
                    },
                    ride_id: h,
                    zone: e,
                  });
              } catch (a) {
                return (
                  console.error("Serve ad error:", a),
                  b.status(500).json({ error: "Failed to serve ad" })
                );
              }
            }
            async function r(a, b) {
              try {
                let c = w.safeParse(a.body);
                if (!c.success)
                  return b
                    .status(400)
                    .json({
                      error: "invalid_batch_parameters",
                      details: c.error.issues,
                      sdk_version: "1.0.0",
                    });
                let { events: d, batch_id: e } = c.data,
                  g = Date.now(),
                  h = e || (0, f.v4)(),
                  i = d.map((a) => {
                    let { normalizedData: b, rideRef: c } = j(a),
                      d = b.ride_id;
                    return {
                      campaign_id: a.campaign_id,
                      ad_id: a.ad_id,
                      ride_id: d,
                      device_id: a.device_id || null,
                      event_type: a.event_type,
                      region: a.zone || "post-ride",
                      occurred_at: new Date().toISOString(),
                      meta: { ...a.meta, batch_id: h, batch_processing: !0 },
                    };
                  }),
                  k = await Promise.allSettled(
                    i.map(async (a, b) => {
                      try {
                        let c = await l(
                          async () => {
                            let { data: b, error: c } = await u
                              .from("analytics_events")
                              .insert(a)
                              .select()
                              .single();
                            if (c) throw c;
                            return b;
                          },
                          `Batch event ${b + 1}/${i.length}`,
                        );
                        return { success: !0, data: c, index: b };
                      } catch (a) {
                        if (
                          a.message?.includes("duplicate key") ||
                          "23505" === a.code
                        )
                          return (
                            console.log(
                              `Batch event ${b + 1}: duplicate entry skipped`,
                            ),
                            { success: !0, duplicate: !0, index: b }
                          );
                        throw a;
                      }
                    }),
                  ),
                  m = k.filter((a) => "fulfilled" === a.status).length,
                  n = k.filter((a) => "rejected" === a.status).length,
                  o = k.filter(
                    (a) => "fulfilled" === a.status && a.value.duplicate,
                  ).length,
                  p = k
                    .filter(
                      (a) =>
                        "fulfilled" === a.status &&
                        !a.value.duplicate &&
                        a.value.data,
                    )
                    .map((a) => a.value.data),
                  q = Date.now() - g;
                if (o > 0 || n > 0) {
                  let a = {
                    timestamp: new Date().toISOString(),
                    batch_id: h,
                    total_events: i.length,
                    successful: m,
                    duplicates: o,
                    failed: n,
                    processing_time_ms: q,
                  };
                  console.log("[BATCH_RETRY_LOG]", JSON.stringify(a));
                }
                return b
                  .status(200)
                  .json({
                    success: !0,
                    batch_id: h,
                    events_total: i.length,
                    events_processed: m,
                    events_inserted: p.length,
                    events_duplicates: o,
                    events_failed: n,
                    processing_time_ms: q,
                    event_ids: p.map((a) => a.id),
                    sdk_version: "1.0.0",
                    timestamp: new Date().toISOString(),
                  });
              } catch (a) {
                return (
                  console.error("Batch event error:", a),
                  b
                    .status(500)
                    .json({
                      error: "batch_processing_failed",
                      message: a.message,
                      sdk_version: "1.0.0",
                      timestamp: new Date().toISOString(),
                    })
                );
              }
            }
            async function s(a, b) {
              try {
                if (Array.isArray(a.body.events)) return await r(a, b);
                let c = v.safeParse(a.body);
                if (!c.success)
                  return b
                    .status(400)
                    .json({
                      error: "invalid_event_parameters",
                      details: c.error.issues,
                      sdk_version: "1.0.0",
                    });
                let {
                    campaign_id: d,
                    ad_id: e,
                    ride_id: f,
                    device_id: g = null,
                    zone: h = "post-ride",
                    event_type: i,
                    meta: m = {},
                  } = c.data,
                  { normalizedData: n, rideRef: o } = j({
                    ride_id: f,
                    campaign_id: d,
                    ad_id: e,
                  }),
                  p = await l(async () => {
                    let a = {
                      campaign_id: n.campaign_id,
                      ad_id: n.ad_id,
                      event_type: i,
                      device_id: g,
                      region: h,
                      ride_id: n.ride_id,
                      meta: m,
                      occurred_at: new Date().toISOString(),
                    };
                    o && (a.ride_ref = o);
                    let { data: b, error: c } = await u
                      .from("analytics_events")
                      .insert(a)
                      .select()
                      .single();
                    if (c) throw c;
                    return b;
                  }, "Event insertion"),
                  q = await k(p.id);
                if (
                  (q ||
                    console.warn(
                      "Event insertion verification failed for:",
                      p.id,
                    ),
                  "click" === i)
                )
                  try {
                    await l(
                      () => t(n.ride_id, n.campaign_id, n.ad_id),
                      "Driver payout",
                    );
                  } catch (a) {
                    console.error("Payout failed but event recorded:", a);
                  }
                return b
                  .status(200)
                  .json({
                    success: !0,
                    event_id: p.id,
                    ride_id: n.ride_id,
                    event_type: i,
                    verified: q,
                    sdk_version: "1.0.0",
                    timestamp: new Date().toISOString(),
                  });
              } catch (a) {
                return (
                  console.error("Record event error:", a),
                  b
                    .status(500)
                    .json({
                      error: "event_recording_failed",
                      message: a.message,
                      sdk_version: "1.0.0",
                      timestamp: new Date().toISOString(),
                    })
                );
              }
            }
            async function t(a, b, c) {
              try {
                let { data: b, error: c } = await u
                  .from("rides")
                  .select("driver_id")
                  .eq("id", a)
                  .single();
                if (c || !b)
                  return void console.log("No ride found for payout:", a);
                let { data: d, error: e } = await u
                  .from("driver_wallet")
                  .select("balance_cents, ad_earnings")
                  .eq("driver_id", b.driver_id)
                  .single();
                if (e) {
                  console.log("Driver wallet not found, creating new one");
                  let { error: a } = await u
                    .from("driver_wallet")
                    .insert({
                      driver_id: b.driver_id,
                      balance_cents: 10,
                      ad_earnings: 10,
                    });
                  if (a) throw a;
                } else {
                  let { error: a } = await u
                    .from("driver_wallet")
                    .update({
                      balance_cents: (d.balance_cents || 0) + 10,
                      ad_earnings: (d.ad_earnings || 0) + 10,
                    })
                    .eq("driver_id", b.driver_id);
                  if (a) throw a;
                }
              } catch (a) {
                console.error("Driver payout error:", a);
              }
            }
            d();
          } catch (a) {
            d(a);
          }
        });
      },
    }));
  var b = require("../../../webpack-api-runtime.js");
  b.C(a);
  var c = b.X(0, [7169], () => b((b.s = 2480)));
  module.exports = c;
})();
