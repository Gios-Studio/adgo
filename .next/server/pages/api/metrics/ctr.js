(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [886],
  {
    1991: (a, b, c) => {
      "use strict";
      (c.r(b), c.d(b, { default: () => p }), c(7031));
      var d = c(1333),
        e = c(1353),
        f = c(1121),
        g = c(4958),
        h = c(3340),
        i = c(9590);
      let j = (0, g.UU)(
          "https://rkonwkggxaohpmxmzmfn.supabase.co",
          process.env.SUPABASE_SERVICE_ROLE_KEY,
        ),
        k = h.Ik({
          campaign_id: h.Yj().uuid().optional(),
          partner_id: h.Yj().uuid().optional(),
          period: h.k5(["1h", "24h", "7d", "30d"]).default("24h"),
          format: h.k5(["json", "csv"]).default("json").optional(),
        });
      async function l(a, b) {
        try {
          let c = k.safeParse(a.query);
          if (!c.success)
            return b
              .status(400)
              .json({ error: "invalid_parameters", details: c.error.issues });
          let { campaign_id: d, period: e, partner_id: f, format: g } = c.data,
            h = `metrics|${d || "all"}|${f || "all"}|${e}|${g || "json"}`,
            j = i.dY.get(h);
          if (j)
            return (
              b.setHeader("X-Cache", "HIT"),
              b.setHeader("X-Cache-Key", h),
              b.setHeader("X-Cache-TTL", "60"),
              b.setHeader("Cache-Control", "public, max-age=60, s-maxage=120"),
              b.status(200).json(j)
            );
          if (
            (b.setHeader("X-Cache", "MISS"),
            b.setHeader("X-Cache-Key", h),
            b.setHeader("X-Cache-TTL", "60"),
            b.setHeader("Cache-Control", "public, max-age=60, s-maxage=120"),
            !d && !f)
          )
            return await m(a, b, e, g);
          if (d) return await n(a, b, d, g);
          if (f) return await o(a, b, f, e, g);
          return b.status(400).json({ error: "missing_required_parameters" });
        } catch (a) {
          return (
            console.error("Metrics API Error:", a),
            b
              .status(500)
              .json({
                error: "internal_server_error",
                message: a.message,
                timestamp: new Date().toISOString(),
              })
          );
        }
      }
      async function m(a, b, c, d) {
        try {
          let a = new Date(),
            d = new Date();
          switch (c) {
            case "1h":
              d.setHours(a.getHours() - 1);
              break;
            case "24h":
            default:
              d.setDate(a.getDate() - 1);
              break;
            case "7d":
              d.setDate(a.getDate() - 7);
              break;
            case "30d":
              d.setDate(a.getDate() - 30);
          }
          let e = 0,
            f = 0,
            g = 0;
          try {
            let a = "impressions, clicks, conversions";
            "24h" === c
              ? (a = "impressions_24h, clicks_24h, conversions_24h")
              : "7d" === c && (a = "impressions_7d, clicks_7d, conversions_7d");
            let { data: b, error: d } = await j
              .from("campaign_metrics")
              .select(a);
            if (!d && b?.length > 0)
              for (let a of b)
                "24h" === c
                  ? ((e += a.impressions_24h || 0),
                    (f += a.clicks_24h || 0),
                    (g += a.conversions_24h || 0))
                  : "7d" === c
                    ? ((e += a.impressions_7d || 0),
                      (f += a.clicks_7d || 0),
                      (g += a.conversions_7d || 0))
                    : ((e += a.impressions || 0),
                      (f += a.clicks || 0),
                      (g += a.conversions || 0));
            else throw Error("Materialized view not available");
          } catch (c) {
            let { data: a, error: b } = await j
              .from("analytics_events")
              .select("event_type, created_at")
              .gte("created_at", d.toISOString());
            if (b) throw b;
            ((e = a?.filter((a) => "impression" === a.event_type).length || 0),
              (f = a?.filter((a) => "click" === a.event_type).length || 0),
              (g =
                a?.filter((a) => "conversion" === a.event_type).length || 0));
          }
          let h = e > 0 ? (f / e) * 100 : 0,
            i = f > 0 ? (g / f) * 100 : 0;
          return b
            .status(200)
            .json({
              period: c,
              impressions: e,
              clicks: f,
              conversions: g,
              ctr: Number(h.toFixed(2)),
              conversionRate: Number(i.toFixed(2)),
              timestamp: new Date().toISOString(),
            });
        } catch (a) {
          return (
            console.error("Overall metrics error:", a),
            b.status(500).json({ error: "Failed to get overall metrics" })
          );
        }
      }
      async function n(a, b, c, d) {
        try {
          let a = `campaign_metrics|${c}|${d || "json"}`,
            e = i.dY.get(a);
          if (e)
            return (
              b.setHeader("X-Cache", "HIT"),
              b.setHeader("X-Cache-Key", a),
              b.status(200).json(e)
            );
          (b.setHeader("X-Cache", "MISS"), b.setHeader("X-Cache-Key", a));
          let { data: f, error: g } = await j
            .from("campaign_ctr")
            .select("*")
            .eq("campaign_id", c)
            .maybeSingle();
          if (g && "PGRST116" !== g.code) throw g;
          if (!f) {
            let { data: d, error: e } = await j
              .from("analytics_events")
              .select("event_type")
              .eq("campaign_id", c);
            if (e) throw e;
            let f = d?.filter((a) => "impression" === a.event_type).length || 0,
              g = d?.filter((a) => "click" === a.event_type).length || 0,
              h = f > 0 ? (g / f) * 100 : 0,
              k = {
                campaign_id: c,
                impressions: f,
                clicks: g,
                ctr: Number(h.toFixed(2)),
                calculated: !0,
              };
            return (i.dY.set(a, k, 6e4), b.status(200).json(k));
          }
          return (i.dY.set(a, f, 6e4), b.status(200).json(f));
        } catch (a) {
          return (
            console.error("Campaign metrics error:", a),
            b.status(500).json({ error: "Failed to get campaign metrics" })
          );
        }
      }
      async function o(a, b, c, d, e) {
        try {
          let a = `partner_metrics|${c}|${d}|${e || "json"}`,
            f = i.dY.get(a);
          if (f)
            return (
              b.setHeader("X-Cache", "HIT"),
              b.setHeader("X-Cache-Key", a),
              b.status(200).json(f)
            );
          (b.setHeader("X-Cache", "MISS"), b.setHeader("X-Cache-Key", a));
          let { data: g, error: h } = await j
            .from("campaigns")
            .select("id")
            .eq("partner_id", c);
          if (h) throw h;
          if (!g || 0 === g.length) {
            let e = {
              partner_id: c,
              period: d,
              impressions: 0,
              clicks: 0,
              ctr: 0,
              campaigns: 0,
            };
            return (i.dY.set(a, e, 6e4), b.status(200).json(e));
          }
          let k = g.map((a) => a.id),
            { data: l, error: m } = await j
              .from("analytics_events")
              .select("event_type, campaign_id")
              .in("campaign_id", k);
          if (m) throw m;
          let n = l?.filter((a) => "impression" === a.event_type).length || 0,
            o = l?.filter((a) => "click" === a.event_type).length || 0,
            p = n > 0 ? (o / n) * 100 : 0,
            q = {
              partner_id: c,
              period: d,
              impressions: n,
              clicks: o,
              ctr: Number(p.toFixed(2)),
              campaigns: g.length,
            };
          return (i.dY.set(a, q, 6e4), b.status(200).json(q));
        } catch (a) {
          return (
            console.error("Partner metrics error:", a),
            b.status(500).json({ error: "Failed to get partner metrics" })
          );
        }
      }
      function p(a) {
        return (0, d.O)({
          ...a,
          IncrementalCache: e.N,
          page: "/api/metrics/ctr",
          handler: (0, f.l0)("/api/metrics/ctr", l),
        });
      }
      h.Ik({
        period: h.Yj(),
        impressions: h.ai().int().min(0),
        clicks: h.ai().int().min(0),
        conversions: h.ai().int().min(0).optional(),
        ctr: h.ai().min(0).max(100),
        conversionRate: h.ai().min(0).max(100).optional(),
        timestamp: h.Yj().datetime(),
      });
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
    a.O(0, [893, 3], () => a((a.s = 1991)));
    var b = a.O();
    (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)[
      "middleware_pages/api/metrics/ctr"
    ] = b;
  },
]);
//# sourceMappingURL=ctr.js.map
