(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [719],
  {
    127: (a, b, c) => {
      "use strict";
      let d;
      (c.r(b), c.d(b, { default: () => G }), c(7031));
      var e = c(1333),
        f = c(1353),
        g = c(1121),
        h = c(4958);
      let i =
          /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i,
        j = function (a) {
          return "string" == typeof a && i.test(a);
        },
        k = {
          randomUUID:
            "undefined" != typeof crypto &&
            crypto.randomUUID &&
            crypto.randomUUID.bind(crypto),
        },
        l = new Uint8Array(16),
        m = [];
      for (let a = 0; a < 256; ++a) m.push((a + 256).toString(16).slice(1));
      let n = function (a, b, c) {
        if (k.randomUUID && !b && !a) return k.randomUUID();
        var e = a,
          f = c;
        let g =
          (e = e || {}).random ??
          e.rng?.() ??
          (function () {
            if (!d) {
              if ("undefined" == typeof crypto || !crypto.getRandomValues)
                throw Error(
                  "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported",
                );
              d = crypto.getRandomValues.bind(crypto);
            }
            return d(l);
          })();
        if (g.length < 16) throw Error("Random bytes length must be >= 16");
        if (((g[6] = (15 & g[6]) | 64), (g[8] = (63 & g[8]) | 128), b)) {
          if ((f = f || 0) < 0 || f + 16 > b.length)
            throw RangeError(
              `UUID byte range ${f}:${f + 15} is out of buffer bounds`,
            );
          for (let a = 0; a < 16; ++a) b[f + a] = g[a];
          return b;
        }
        return (function (a, b = 0) {
          return (
            m[a[b + 0]] +
            m[a[b + 1]] +
            m[a[b + 2]] +
            m[a[b + 3]] +
            "-" +
            m[a[b + 4]] +
            m[a[b + 5]] +
            "-" +
            m[a[b + 6]] +
            m[a[b + 7]] +
            "-" +
            m[a[b + 8]] +
            m[a[b + 9]] +
            "-" +
            m[a[b + 10]] +
            m[a[b + 11]] +
            m[a[b + 12]] +
            m[a[b + 13]] +
            m[a[b + 14]] +
            m[a[b + 15]]
          ).toLowerCase();
        })(g);
      };
      var o = c(3340),
        p = c(9590);
      let q = (0, h.UU)(
          "https://rkonwkggxaohpmxmzmfn.supabase.co",
          process.env.SUPABASE_SERVICE_ROLE_KEY,
        ),
        r = o.Ik({
          campaign_id: o.Yj().uuid(),
          ad_id: o.Yj().uuid(),
          ride_id: o.Yj().min(1),
          device_id: o.Yj().min(1).optional(),
          event_type: o.k5(["impression", "click", "conversion"]),
          zone: o.Yj().default("post-ride"),
          meta: o.g1(o.bz()).optional(),
        }),
        s = o.Ik({
          events: o.YO(r).min(1).max(50),
          batch_id: o.Yj().uuid().optional(),
        });
      o.Ik({
        ride_id: o.Yj().min(1),
        device_id: o.Yj().min(1),
        zone: o.Yj().default("post-ride"),
      });
      let t = o.Ik({
          ride_id: o.Yj().min(1).optional(),
          device_id: o.Yj().min(1).optional(),
          zone: o.Yj().default("post-ride"),
          limit: o.au.number().min(1).max(100).default(50),
          offset: o.au.number().min(0).default(0),
          cursor: o.Yj().optional(),
          since: o.Yj().datetime().optional(),
          campaign_id: o.Yj().uuid().optional(),
          event_type: o.k5(["impression", "click", "conversion"]).optional(),
        }),
        u = { maxRetries: 3, baseDelay: 100, maxDelay: 2e3 };
      function v(a) {
        let b = a.ride_id,
          c = null,
          d = { ...a };
        return (
          j(b) ||
            ((c = b),
            b.startsWith("test_") || b.includes("test")
              ? (d.ride_id = "619fee45-808f-4336-8468-54571cea537c")
              : "00000000-0000-0000-0000-000000000300" === b
                ? (d.ride_id = b)
                : (d.ride_id = n())),
          j(d.campaign_id) ||
            (console.log(
              `Invalid campaign_id: ${d.campaign_id}, generating new UUID`,
            ),
            (d.campaign_id = "ace29fa0-5765-4ce0-b856-074b3abad5e7")),
          j(d.ad_id) ||
            (console.log(`Invalid ad_id: ${d.ad_id}, generating new UUID`),
            (d.ad_id = "88c0a93e-493c-499a-8a0a-eaa2cdba6a2c")),
          { normalizedData: d, rideRef: c }
        );
      }
      async function w(a) {
        try {
          let { data: b, error: c } = await q
            .from("analytics_events")
            .select("id, ride_id, event_type, created_at")
            .eq("id", a)
            .single();
          return !c && b && b.id === a;
        } catch {
          return !1;
        }
      }
      async function x(a, b = "operation") {
        let c,
          d = 0;
        for (let e = 0; e <= u.maxRetries; e++)
          try {
            return await a();
          } catch (f) {
            if (
              ((c = f),
              f.message?.includes("duplicate key") || "23505" === f.code)
            ) {
              if (++d >= 2)
                throw (
                  console.log(
                    `${b} detected duplicate key after ${d} attempts - skipping`,
                  ),
                  f
                );
              console.log(`${b} detected duplicate key - attempt ${d}/2`);
            }
            if (
              (f.code?.startsWith("23") || f.code?.startsWith("42")) &&
              !(f.message?.includes("duplicate key") || "23505" === f.code)
            )
              throw f;
            if (e === u.maxRetries)
              throw (
                console.error(
                  `${b} failed after ${u.maxRetries + 1} attempts:`,
                  f,
                ),
                f
              );
            let a = Math.min(
              u.baseDelay * Math.pow(2, e) + 50 * Math.random(),
              u.maxDelay,
            );
            (console.warn(
              `${b} attempt ${e + 1} failed, retrying in ${Math.round(a)}ms:`,
              f.message,
            ),
              await new Promise((b) => setTimeout(b, a)));
          }
        throw c;
      }
      async function y(a, b) {
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
              return await z(a, b);
            return await C(a, b);
          }
          if ("POST" === a.method) return await E(a, b);
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
      async function z(a, b) {
        try {
          let c,
            d,
            e,
            f = t.safeParse(a.query);
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
              device_id: h,
              zone: i,
              limit: j,
              offset: k,
              cursor: l,
              since: m,
              campaign_id: n,
              event_type: o,
            } = f.data,
            q = `events|${g || "all"}|${h || "all"}|${i}|${j}|${k}|${m || "all"}|${n || "all"}|${o || "all"}`,
            r = p.dY.get(q);
          if (r)
            return (
              b.setHeader("X-Cache", "HIT"),
              b.setHeader("X-Cache-Key", q.substring(0, 50) + "..."),
              b.setHeader("Cache-Control", "public, max-age=60, s-maxage=120"),
              b
                .status(200)
                .json({ ...r, cached: !0, timestamp: new Date().toISOString() })
            );
          b.setHeader("X-Cache", "MISS");
          try {
            let a = await A({
              ride_id: g,
              device_id: h,
              zone: i,
              limit: j,
              offset: k,
              since: m,
              campaign_id: n,
              event_type: o,
            });
            ((c = a.data), (d = a.error), (e = a.count));
          } catch (a) {
            console.warn(
              "OFFSET pagination failed, falling back to cursor-based:",
              a,
            );
            try {
              let a = await B({
                ride_id: g,
                device_id: h,
                zone: i,
                limit: j,
                cursor: l,
                since: m,
                campaign_id: n,
                event_type: o,
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
          let s = !!e && k + j < e,
            u = s ? k + j : null,
            v = c.length > 0 ? c[c.length - 1].id : null,
            w = {
              events: c || [],
              pagination: {
                limit: j,
                offset: k,
                total: e || 0,
                hasMore: s,
                nextOffset: u,
                nextCursor: v,
              },
              deltaSync: {
                since: m || null,
                latestTimestamp: c?.[0]?.created_at || null,
              },
              sdk_version: "1.0.0",
              timestamp: new Date().toISOString(),
            };
          return (
            p.dY.set(q, w, 3e4),
            b.setHeader("Cache-Control", "public, max-age=60, s-maxage=120"),
            b.status(200).json(w)
          );
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
      async function A(a) {
        let b = q
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
      async function B(a) {
        let b = q
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
      async function C(a, b) {
        let { ride_id: c, device_id: d, zone: e = "post-ride" } = a.query;
        if (!c) return b.status(400).json({ error: "missing_ride_id" });
        let { normalizedData: f, rideRef: g } = v({ ride_id: c }),
          h = f.ride_id;
        try {
          let { data: a, error: c } = await q
            .from("analytics_events")
            .select("id")
            .eq("ride_id", h)
            .limit(1);
          if (c) throw c;
          if (a && a.length > 0)
            return b
              .status(200)
              .json({ ad: null, message: "frequency_cap_reached", ride_id: h });
          let { data: d, error: f } = await q
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
            { data: i, error: j } = await q
              .from("ads")
              .select("id, title, media_url, status")
              .eq("campaign_id", g.id)
              .eq("status", "active");
          if (j) throw j;
          if (!i || 0 === i.length)
            return b.status(200).json({ ad: null, message: "no_active_ads" });
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
      async function D(a, b) {
        try {
          let c = s.safeParse(a.body);
          if (!c.success)
            return b
              .status(400)
              .json({
                error: "invalid_batch_parameters",
                details: c.error.issues,
                sdk_version: "1.0.0",
              });
          let { events: d, batch_id: e } = c.data,
            f = Date.now(),
            g = e || n(),
            h = d.map((a) => {
              let { normalizedData: b, rideRef: c } = v(a),
                d = b.ride_id;
              return {
                campaign_id: a.campaign_id,
                ad_id: a.ad_id,
                ride_id: d,
                device_id: a.device_id || null,
                event_type: a.event_type,
                region: a.zone || "post-ride",
                occurred_at: new Date().toISOString(),
                meta: { ...a.meta, batch_id: g, batch_processing: !0 },
              };
            }),
            i = await Promise.allSettled(
              h.map(async (a, b) => {
                try {
                  let c = await x(
                    async () => {
                      let { data: b, error: c } = await q
                        .from("analytics_events")
                        .insert(a)
                        .select()
                        .single();
                      if (c) throw c;
                      return b;
                    },
                    `Batch event ${b + 1}/${h.length}`,
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
            j = i.filter((a) => "fulfilled" === a.status).length,
            k = i.filter((a) => "rejected" === a.status).length,
            l = i.filter(
              (a) => "fulfilled" === a.status && a.value.duplicate,
            ).length,
            m = i
              .filter(
                (a) =>
                  "fulfilled" === a.status &&
                  !a.value.duplicate &&
                  a.value.data,
              )
              .map((a) => a.value.data),
            o = Date.now() - f;
          if (l > 0 || k > 0) {
            let a = {
              timestamp: new Date().toISOString(),
              batch_id: g,
              total_events: h.length,
              successful: j,
              duplicates: l,
              failed: k,
              processing_time_ms: o,
            };
            console.log("[BATCH_RETRY_LOG]", JSON.stringify(a));
          }
          return b
            .status(200)
            .json({
              success: !0,
              batch_id: g,
              events_total: h.length,
              events_processed: j,
              events_inserted: m.length,
              events_duplicates: l,
              events_failed: k,
              processing_time_ms: o,
              event_ids: m.map((a) => a.id),
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
      async function E(a, b) {
        try {
          if (Array.isArray(a.body.events)) return await D(a, b);
          let c = r.safeParse(a.body);
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
              meta: j = {},
            } = c.data,
            { normalizedData: k, rideRef: l } = v({
              ride_id: f,
              campaign_id: d,
              ad_id: e,
            }),
            m = await x(async () => {
              let a = {
                campaign_id: k.campaign_id,
                ad_id: k.ad_id,
                event_type: i,
                device_id: g,
                region: h,
                ride_id: k.ride_id,
                meta: j,
                occurred_at: new Date().toISOString(),
              };
              l && (a.ride_ref = l);
              let { data: b, error: c } = await q
                .from("analytics_events")
                .insert(a)
                .select()
                .single();
              if (c) throw c;
              return b;
            }, "Event insertion"),
            n = await w(m.id);
          if (
            (n ||
              console.warn("Event insertion verification failed for:", m.id),
            "click" === i)
          )
            try {
              await x(
                () => F(k.ride_id, k.campaign_id, k.ad_id),
                "Driver payout",
              );
            } catch (a) {
              console.error("Payout failed but event recorded:", a);
            }
          return b
            .status(200)
            .json({
              success: !0,
              event_id: m.id,
              ride_id: k.ride_id,
              event_type: i,
              verified: n,
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
      async function F(a, b, c) {
        try {
          let { data: b, error: c } = await q
            .from("rides")
            .select("driver_id")
            .eq("id", a)
            .single();
          if (c || !b) return void console.log("No ride found for payout:", a);
          let { data: d, error: e } = await q
            .from("driver_wallet")
            .select("balance_cents, ad_earnings")
            .eq("driver_id", b.driver_id)
            .single();
          if (e) {
            console.log("Driver wallet not found, creating new one");
            let { error: a } = await q
              .from("driver_wallet")
              .insert({
                driver_id: b.driver_id,
                balance_cents: 10,
                ad_earnings: 10,
              });
            if (a) throw a;
          } else {
            let { error: a } = await q
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
      function G(a) {
        return (0, e.O)({
          ...a,
          IncrementalCache: f.N,
          page: "/api/sdk/events",
          handler: (0, g.l0)("/api/sdk/events", y),
        });
      }
    },
    5356: (a) => {
      "use strict";
      a.exports = require("node:buffer");
    },
    5521: (a) => {
      "use strict";
      a.exports = require("node:async_hooks");
    },
    9590: (a, b, c) => {
      "use strict";
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
  },
  (a) => {
    a.O(0, [893, 3], () => a((a.s = 127)));
    var b = a.O();
    (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)[
      "middleware_pages/api/sdk/events"
    ] = b;
  },
]);
//# sourceMappingURL=events.js.map
