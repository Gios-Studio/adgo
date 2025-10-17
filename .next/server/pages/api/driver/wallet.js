(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [623],
  {
    2613: (a, b, c) => {
      "use strict";
      (c.r(b), c.d(b, { default: () => w }), c(7031));
      var d,
        e = c(1333),
        f = c(1353),
        g = c(1121);
      c(6816);
      var h = c(7746);
      (c(7947),
        "undefined" == typeof URLPattern || URLPattern,
        c(237),
        c(3692));
      var i = c(5253);
      if (
        (new WeakMap(),
        c(9726),
        i.unstable_postpone,
        !1 ===
          (function (a) {
            return (
              a.includes(
                "needs to bail out of prerendering at this point because it used",
              ) &&
              a.includes(
                "Learn more: https://nextjs.org/docs/messages/ppr-caught-error",
              )
            );
          })(
            "Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error",
          ))
      )
        throw Object.defineProperty(
          Error(
            "Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js",
          ),
          "__NEXT_ERROR_CODE",
          { value: "E296", enumerable: !1, configurable: !0 },
        );
      (RegExp(
        `\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)`,
      ),
        RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`),
        RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`),
        RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`),
        c(3798),
        (0, c(4799).xl)());
      let { env: j, stdout: k } =
          (null == (d = globalThis) ? void 0 : d.process) ?? {},
        l =
          j &&
          !j.NO_COLOR &&
          (j.FORCE_COLOR ||
            ((null == k ? void 0 : k.isTTY) && !j.CI && "dumb" !== j.TERM)),
        m = (a, b, c, d) => {
          let e = a.substring(0, d) + c,
            f = a.substring(d + b.length),
            g = f.indexOf(b);
          return ~g ? e + m(f, b, c, g) : e + f;
        },
        n = (a, b, c = a) =>
          l
            ? (d) => {
                let e = "" + d,
                  f = e.indexOf(b, a.length);
                return ~f ? a + m(e, b, c, f) + b : a + e + b;
              }
            : String,
        o = n("\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m");
      (n("\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m"),
        n("\x1b[3m", "\x1b[23m"),
        n("\x1b[4m", "\x1b[24m"),
        n("\x1b[7m", "\x1b[27m"),
        n("\x1b[8m", "\x1b[28m"),
        n("\x1b[9m", "\x1b[29m"),
        n("\x1b[30m", "\x1b[39m"));
      let p = n("\x1b[31m", "\x1b[39m"),
        q = n("\x1b[32m", "\x1b[39m"),
        r = n("\x1b[33m", "\x1b[39m");
      n("\x1b[34m", "\x1b[39m");
      let s = n("\x1b[35m", "\x1b[39m");
      (n("\x1b[38;2;173;127;168m", "\x1b[39m"), n("\x1b[36m", "\x1b[39m"));
      let t = n("\x1b[37m", "\x1b[39m");
      (n("\x1b[90m", "\x1b[39m"),
        n("\x1b[40m", "\x1b[49m"),
        n("\x1b[41m", "\x1b[49m"),
        n("\x1b[42m", "\x1b[49m"),
        n("\x1b[43m", "\x1b[49m"),
        n("\x1b[44m", "\x1b[49m"),
        n("\x1b[45m", "\x1b[49m"),
        n("\x1b[46m", "\x1b[49m"),
        n("\x1b[47m", "\x1b[49m"));
      var u = c(7386);
      function v(a) {
        return h.R.json(
          {
            weekEarnings: 4350,
            adEarnings: 310,
            pendingPayout: 620,
            lastPayoutAt: "2025-08-31T16:00:00Z",
          },
          {
            headers: {
              "Cache-Control": "public, max-age=60, s-maxage=120",
              "X-Edge-Cache": "MISS",
            },
          },
        );
      }
      function w(a) {
        return (0, e.O)({
          ...a,
          IncrementalCache: f.N,
          page: "/api/driver/wallet",
          handler: (0, g.l0)("/api/driver/wallet", v),
        });
      }
      (t(o("○")),
        p(o("⨯")),
        r(o("⚠")),
        t(o(" ")),
        q(o("✓")),
        s(o("\xbb")),
        new u.q(1e4, (a) => a.length),
        new WeakMap());
    },
    2802: (a, b) => {
      "use strict";
      var c = Symbol.for("react.element"),
        d = Symbol.for("react.portal"),
        e =
          (Symbol.for("react.fragment"),
          Symbol.for("react.strict_mode"),
          Symbol.for("react.profiler"),
          Symbol.for("react.provider"),
          Symbol.for("react.context"),
          Symbol.for("react.forward_ref"),
          Symbol.for("react.suspense"),
          Symbol.for("react.memo"),
          Symbol.for("react.lazy"),
          Symbol.iterator),
        f = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        },
        g = Object.assign,
        h = {};
      function i(a, b, c) {
        ((this.props = a),
          (this.context = b),
          (this.refs = h),
          (this.updater = c || f));
      }
      function j() {}
      function k(a, b, c) {
        ((this.props = a),
          (this.context = b),
          (this.refs = h),
          (this.updater = c || f));
      }
      ((i.prototype.isReactComponent = {}),
        (i.prototype.setState = function (a, b) {
          if ("object" != typeof a && "function" != typeof a && null != a)
            throw Error(
              "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
            );
          this.updater.enqueueSetState(this, a, b, "setState");
        }),
        (i.prototype.forceUpdate = function (a) {
          this.updater.enqueueForceUpdate(this, a, "forceUpdate");
        }),
        (j.prototype = i.prototype));
      var l = (k.prototype = new j());
      ((l.constructor = k), g(l, i.prototype), (l.isPureReactComponent = !0));
      Object.prototype.hasOwnProperty;
    },
    5253: (a, b, c) => {
      "use strict";
      a.exports = c(2802);
    },
    5356: (a) => {
      "use strict";
      a.exports = require("node:buffer");
    },
    5521: (a) => {
      "use strict";
      a.exports = require("node:async_hooks");
    },
    7947: (a, b, c) => {
      var d;
      (() => {
        var e = {
            226: function (e, f) {
              !(function (g, h) {
                "use strict";
                var i = "function",
                  j = "undefined",
                  k = "object",
                  l = "string",
                  m = "major",
                  n = "model",
                  o = "name",
                  p = "type",
                  q = "vendor",
                  r = "version",
                  s = "architecture",
                  t = "console",
                  u = "mobile",
                  v = "tablet",
                  w = "smarttv",
                  x = "wearable",
                  y = "embedded",
                  z = "Amazon",
                  A = "Apple",
                  B = "ASUS",
                  C = "BlackBerry",
                  D = "Browser",
                  E = "Chrome",
                  F = "Firefox",
                  G = "Google",
                  H = "Huawei",
                  I = "Microsoft",
                  J = "Motorola",
                  K = "Opera",
                  L = "Samsung",
                  M = "Sharp",
                  N = "Sony",
                  O = "Xiaomi",
                  P = "Zebra",
                  Q = "Facebook",
                  R = "Chromium OS",
                  S = "Mac OS",
                  T = function (a, b) {
                    var c = {};
                    for (var d in a)
                      b[d] && b[d].length % 2 == 0
                        ? (c[d] = b[d].concat(a[d]))
                        : (c[d] = a[d]);
                    return c;
                  },
                  U = function (a) {
                    for (var b = {}, c = 0; c < a.length; c++)
                      b[a[c].toUpperCase()] = a[c];
                    return b;
                  },
                  V = function (a, b) {
                    return typeof a === l && -1 !== W(b).indexOf(W(a));
                  },
                  W = function (a) {
                    return a.toLowerCase();
                  },
                  X = function (a, b) {
                    if (typeof a === l)
                      return (
                        (a = a.replace(/^\s\s*/, "")),
                        typeof b === j ? a : a.substring(0, 350)
                      );
                  },
                  Y = function (a, b) {
                    for (var c, d, e, f, g, j, l = 0; l < b.length && !g; ) {
                      var m = b[l],
                        n = b[l + 1];
                      for (c = d = 0; c < m.length && !g && m[c]; )
                        if ((g = m[c++].exec(a)))
                          for (e = 0; e < n.length; e++)
                            ((j = g[++d]),
                              typeof (f = n[e]) === k && f.length > 0
                                ? 2 === f.length
                                  ? typeof f[1] == i
                                    ? (this[f[0]] = f[1].call(this, j))
                                    : (this[f[0]] = f[1])
                                  : 3 === f.length
                                    ? typeof f[1] !== i ||
                                      (f[1].exec && f[1].test)
                                      ? (this[f[0]] = j
                                          ? j.replace(f[1], f[2])
                                          : void 0)
                                      : (this[f[0]] = j
                                          ? f[1].call(this, j, f[2])
                                          : void 0)
                                    : 4 === f.length &&
                                      (this[f[0]] = j
                                        ? f[3].call(this, j.replace(f[1], f[2]))
                                        : h)
                                : (this[f] = j || h));
                      l += 2;
                    }
                  },
                  Z = function (a, b) {
                    for (var c in b)
                      if (typeof b[c] === k && b[c].length > 0) {
                        for (var d = 0; d < b[c].length; d++)
                          if (V(b[c][d], a)) return "?" === c ? h : c;
                      } else if (V(b[c], a)) return "?" === c ? h : c;
                    return a;
                  },
                  $ = {
                    ME: "4.90",
                    "NT 3.11": "NT3.51",
                    "NT 4.0": "NT4.0",
                    2e3: "NT 5.0",
                    XP: ["NT 5.1", "NT 5.2"],
                    Vista: "NT 6.0",
                    7: "NT 6.1",
                    8: "NT 6.2",
                    8.1: "NT 6.3",
                    10: ["NT 6.4", "NT 10.0"],
                    RT: "ARM",
                  },
                  _ = {
                    browser: [
                      [/\b(?:crmo|crios)\/([\w\.]+)/i],
                      [r, [o, "Chrome"]],
                      [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                      [r, [o, "Edge"]],
                      [
                        /(opera mini)\/([-\w\.]+)/i,
                        /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                        /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
                      ],
                      [o, r],
                      [/opios[\/ ]+([\w\.]+)/i],
                      [r, [o, K + " Mini"]],
                      [/\bopr\/([\w\.]+)/i],
                      [r, [o, K]],
                      [
                        /(kindle)\/([\w\.]+)/i,
                        /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                        /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                        /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                        /(?:ms|\()(ie) ([\w\.]+)/i,
                        /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                        /(heytap|ovi)browser\/([\d\.]+)/i,
                        /(weibo)__([\d\.]+)/i,
                      ],
                      [o, r],
                      [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                      [r, [o, "UC" + D]],
                      [
                        /microm.+\bqbcore\/([\w\.]+)/i,
                        /\bqbcore\/([\w\.]+).+microm/i,
                      ],
                      [r, [o, "WeChat(Win) Desktop"]],
                      [/micromessenger\/([\w\.]+)/i],
                      [r, [o, "WeChat"]],
                      [/konqueror\/([\w\.]+)/i],
                      [r, [o, "Konqueror"]],
                      [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                      [r, [o, "IE"]],
                      [/ya(?:search)?browser\/([\w\.]+)/i],
                      [r, [o, "Yandex"]],
                      [/(avast|avg)\/([\w\.]+)/i],
                      [[o, /(.+)/, "$1 Secure " + D], r],
                      [/\bfocus\/([\w\.]+)/i],
                      [r, [o, F + " Focus"]],
                      [/\bopt\/([\w\.]+)/i],
                      [r, [o, K + " Touch"]],
                      [/coc_coc\w+\/([\w\.]+)/i],
                      [r, [o, "Coc Coc"]],
                      [/dolfin\/([\w\.]+)/i],
                      [r, [o, "Dolphin"]],
                      [/coast\/([\w\.]+)/i],
                      [r, [o, K + " Coast"]],
                      [/miuibrowser\/([\w\.]+)/i],
                      [r, [o, "MIUI " + D]],
                      [/fxios\/([-\w\.]+)/i],
                      [r, [o, F]],
                      [/\bqihu|(qi?ho?o?|360)browser/i],
                      [[o, "360 " + D]],
                      [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                      [[o, /(.+)/, "$1 " + D], r],
                      [/(comodo_dragon)\/([\w\.]+)/i],
                      [[o, /_/g, " "], r],
                      [
                        /(electron)\/([\w\.]+) safari/i,
                        /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                        /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
                      ],
                      [o, r],
                      [
                        /(metasr)[\/ ]?([\w\.]+)/i,
                        /(lbbrowser)/i,
                        /\[(linkedin)app\]/i,
                      ],
                      [o],
                      [
                        /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i,
                      ],
                      [[o, Q], r],
                      [
                        /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                        /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                        /safari (line)\/([\w\.]+)/i,
                        /\b(line)\/([\w\.]+)\/iab/i,
                        /(chromium|instagram)[\/ ]([-\w\.]+)/i,
                      ],
                      [o, r],
                      [/\bgsa\/([\w\.]+) .*safari\//i],
                      [r, [o, "GSA"]],
                      [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
                      [r, [o, "TikTok"]],
                      [/headlesschrome(?:\/([\w\.]+)| )/i],
                      [r, [o, E + " Headless"]],
                      [/ wv\).+(chrome)\/([\w\.]+)/i],
                      [[o, E + " WebView"], r],
                      [
                        /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i,
                      ],
                      [r, [o, "Android " + D]],
                      [
                        /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i,
                      ],
                      [o, r],
                      [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                      [r, [o, "Mobile Safari"]],
                      [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                      [r, o],
                      [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                      [
                        o,
                        [
                          r,
                          Z,
                          {
                            "1.0": "/8",
                            1.2: "/1",
                            1.3: "/3",
                            "2.0": "/412",
                            "2.0.2": "/416",
                            "2.0.3": "/417",
                            "2.0.4": "/419",
                            "?": "/",
                          },
                        ],
                      ],
                      [/(webkit|khtml)\/([\w\.]+)/i],
                      [o, r],
                      [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                      [[o, "Netscape"], r],
                      [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                      [r, [o, F + " Reality"]],
                      [
                        /ekiohf.+(flow)\/([\w\.]+)/i,
                        /(swiftfox)/i,
                        /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                        /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                        /(firefox)\/([\w\.]+)/i,
                        /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                        /(links) \(([\w\.]+)/i,
                        /panasonic;(viera)/i,
                      ],
                      [o, r],
                      [/(cobalt)\/([\w\.]+)/i],
                      [o, [r, /master.|lts./, ""]],
                    ],
                    cpu: [
                      [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                      [[s, "amd64"]],
                      [/(ia32(?=;))/i],
                      [[s, W]],
                      [/((?:i[346]|x)86)[;\)]/i],
                      [[s, "ia32"]],
                      [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                      [[s, "arm64"]],
                      [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                      [[s, "armhf"]],
                      [/windows (ce|mobile); ppc;/i],
                      [[s, "arm"]],
                      [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                      [[s, /ower/, "", W]],
                      [/(sun4\w)[;\)]/i],
                      [[s, "sparc"]],
                      [
                        /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
                      ],
                      [[s, W]],
                    ],
                    device: [
                      [
                        /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
                      ],
                      [n, [q, L], [p, v]],
                      [
                        /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                        /samsung[- ]([-\w]+)/i,
                        /sec-(sgh\w+)/i,
                      ],
                      [n, [q, L], [p, u]],
                      [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
                      [n, [q, A], [p, u]],
                      [
                        /\((ipad);[-\w\),; ]+apple/i,
                        /applecoremedia\/[\w\.]+ \((ipad)/i,
                        /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
                      ],
                      [n, [q, A], [p, v]],
                      [/(macintosh);/i],
                      [n, [q, A]],
                      [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                      [n, [q, M], [p, u]],
                      [
                        /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i,
                      ],
                      [n, [q, H], [p, v]],
                      [
                        /(?:huawei|honor)([-\w ]+)[;\)]/i,
                        /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
                      ],
                      [n, [q, H], [p, u]],
                      [
                        /\b(poco[\w ]+)(?: bui|\))/i,
                        /\b; (\w+) build\/hm\1/i,
                        /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                        /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                        /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
                      ],
                      [
                        [n, /_/g, " "],
                        [q, O],
                        [p, u],
                      ],
                      [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                      [
                        [n, /_/g, " "],
                        [q, O],
                        [p, v],
                      ],
                      [
                        /; (\w+) bui.+ oppo/i,
                        /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
                      ],
                      [n, [q, "OPPO"], [p, u]],
                      [
                        /vivo (\w+)(?: bui|\))/i,
                        /\b(v[12]\d{3}\w?[at])(?: bui|;)/i,
                      ],
                      [n, [q, "Vivo"], [p, u]],
                      [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                      [n, [q, "Realme"], [p, u]],
                      [
                        /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                        /\bmot(?:orola)?[- ](\w*)/i,
                        /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
                      ],
                      [n, [q, J], [p, u]],
                      [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                      [n, [q, J], [p, v]],
                      [
                        /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
                      ],
                      [n, [q, "LG"], [p, v]],
                      [
                        /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                        /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                        /\blg-?([\d\w]+) bui/i,
                      ],
                      [n, [q, "LG"], [p, u]],
                      [
                        /(ideatab[-\w ]+)/i,
                        /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
                      ],
                      [n, [q, "Lenovo"], [p, v]],
                      [
                        /(?:maemo|nokia).*(n900|lumia \d+)/i,
                        /nokia[-_ ]?([-\w\.]*)/i,
                      ],
                      [
                        [n, /_/g, " "],
                        [q, "Nokia"],
                        [p, u],
                      ],
                      [/(pixel c)\b/i],
                      [n, [q, G], [p, v]],
                      [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                      [n, [q, G], [p, u]],
                      [
                        /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
                      ],
                      [n, [q, N], [p, u]],
                      [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                      [
                        [n, "Xperia Tablet"],
                        [q, N],
                        [p, v],
                      ],
                      [
                        / (kb2005|in20[12]5|be20[12][59])\b/i,
                        /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
                      ],
                      [n, [q, "OnePlus"], [p, u]],
                      [
                        /(alexa)webm/i,
                        /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                        /(kf[a-z]+)( bui|\)).+silk\//i,
                      ],
                      [n, [q, z], [p, v]],
                      [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                      [
                        [n, /(.+)/g, "Fire Phone $1"],
                        [q, z],
                        [p, u],
                      ],
                      [/(playbook);[-\w\),; ]+(rim)/i],
                      [n, q, [p, v]],
                      [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                      [n, [q, C], [p, u]],
                      [
                        /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
                      ],
                      [n, [q, B], [p, v]],
                      [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                      [n, [q, B], [p, u]],
                      [/(nexus 9)/i],
                      [n, [q, "HTC"], [p, v]],
                      [
                        /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                        /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                        /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
                      ],
                      [q, [n, /_/g, " "], [p, u]],
                      [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                      [n, [q, "Acer"], [p, v]],
                      [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                      [n, [q, "Meizu"], [p, u]],
                      [
                        /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                        /(hp) ([\w ]+\w)/i,
                        /(asus)-?(\w+)/i,
                        /(microsoft); (lumia[\w ]+)/i,
                        /(lenovo)[-_ ]?([-\w]+)/i,
                        /(jolla)/i,
                        /(oppo) ?([\w ]+) bui/i,
                      ],
                      [q, n, [p, u]],
                      [
                        /(kobo)\s(ereader|touch)/i,
                        /(archos) (gamepad2?)/i,
                        /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                        /(kindle)\/([\w\.]+)/i,
                        /(nook)[\w ]+build\/(\w+)/i,
                        /(dell) (strea[kpr\d ]*[\dko])/i,
                        /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                        /(trinity)[- ]*(t\d{3}) bui/i,
                        /(gigaset)[- ]+(q\w{1,9}) bui/i,
                        /(vodafone) ([\w ]+)(?:\)| bui)/i,
                      ],
                      [q, n, [p, v]],
                      [/(surface duo)/i],
                      [n, [q, I], [p, v]],
                      [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                      [n, [q, "Fairphone"], [p, u]],
                      [/(u304aa)/i],
                      [n, [q, "AT&T"], [p, u]],
                      [/\bsie-(\w*)/i],
                      [n, [q, "Siemens"], [p, u]],
                      [/\b(rct\w+) b/i],
                      [n, [q, "RCA"], [p, v]],
                      [/\b(venue[\d ]{2,7}) b/i],
                      [n, [q, "Dell"], [p, v]],
                      [/\b(q(?:mv|ta)\w+) b/i],
                      [n, [q, "Verizon"], [p, v]],
                      [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                      [n, [q, "Barnes & Noble"], [p, v]],
                      [/\b(tm\d{3}\w+) b/i],
                      [n, [q, "NuVision"], [p, v]],
                      [/\b(k88) b/i],
                      [n, [q, "ZTE"], [p, v]],
                      [/\b(nx\d{3}j) b/i],
                      [n, [q, "ZTE"], [p, u]],
                      [/\b(gen\d{3}) b.+49h/i],
                      [n, [q, "Swiss"], [p, u]],
                      [/\b(zur\d{3}) b/i],
                      [n, [q, "Swiss"], [p, v]],
                      [/\b((zeki)?tb.*\b) b/i],
                      [n, [q, "Zeki"], [p, v]],
                      [
                        /\b([yr]\d{2}) b/i,
                        /\b(dragon[- ]+touch |dt)(\w{5}) b/i,
                      ],
                      [[q, "Dragon Touch"], n, [p, v]],
                      [/\b(ns-?\w{0,9}) b/i],
                      [n, [q, "Insignia"], [p, v]],
                      [/\b((nxa|next)-?\w{0,9}) b/i],
                      [n, [q, "NextBook"], [p, v]],
                      [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                      [[q, "Voice"], n, [p, u]],
                      [/\b(lvtel\-)?(v1[12]) b/i],
                      [[q, "LvTel"], n, [p, u]],
                      [/\b(ph-1) /i],
                      [n, [q, "Essential"], [p, u]],
                      [/\b(v(100md|700na|7011|917g).*\b) b/i],
                      [n, [q, "Envizen"], [p, v]],
                      [/\b(trio[-\w\. ]+) b/i],
                      [n, [q, "MachSpeed"], [p, v]],
                      [/\btu_(1491) b/i],
                      [n, [q, "Rotor"], [p, v]],
                      [/(shield[\w ]+) b/i],
                      [n, [q, "Nvidia"], [p, v]],
                      [/(sprint) (\w+)/i],
                      [q, n, [p, u]],
                      [/(kin\.[onetw]{3})/i],
                      [
                        [n, /\./g, " "],
                        [q, I],
                        [p, u],
                      ],
                      [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                      [n, [q, P], [p, v]],
                      [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                      [n, [q, P], [p, u]],
                      [/smart-tv.+(samsung)/i],
                      [q, [p, w]],
                      [/hbbtv.+maple;(\d+)/i],
                      [
                        [n, /^/, "SmartTV"],
                        [q, L],
                        [p, w],
                      ],
                      [
                        /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i,
                      ],
                      [
                        [q, "LG"],
                        [p, w],
                      ],
                      [/(apple) ?tv/i],
                      [q, [n, A + " TV"], [p, w]],
                      [/crkey/i],
                      [
                        [n, E + "cast"],
                        [q, G],
                        [p, w],
                      ],
                      [/droid.+aft(\w)( bui|\))/i],
                      [n, [q, z], [p, w]],
                      [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                      [n, [q, M], [p, w]],
                      [/(bravia[\w ]+)( bui|\))/i],
                      [n, [q, N], [p, w]],
                      [/(mitv-\w{5}) bui/i],
                      [n, [q, O], [p, w]],
                      [/Hbbtv.*(technisat) (.*);/i],
                      [q, n, [p, w]],
                      [
                        /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                        /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
                      ],
                      [
                        [q, X],
                        [n, X],
                        [p, w],
                      ],
                      [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                      [[p, w]],
                      [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                      [q, n, [p, t]],
                      [/droid.+; (shield) bui/i],
                      [n, [q, "Nvidia"], [p, t]],
                      [/(playstation [345portablevi]+)/i],
                      [n, [q, N], [p, t]],
                      [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                      [n, [q, I], [p, t]],
                      [/((pebble))app/i],
                      [q, n, [p, x]],
                      [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                      [n, [q, A], [p, x]],
                      [/droid.+; (glass) \d/i],
                      [n, [q, G], [p, x]],
                      [/droid.+; (wt63?0{2,3})\)/i],
                      [n, [q, P], [p, x]],
                      [/(quest( 2| pro)?)/i],
                      [n, [q, Q], [p, x]],
                      [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                      [q, [p, y]],
                      [/(aeobc)\b/i],
                      [n, [q, z], [p, y]],
                      [
                        /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i,
                      ],
                      [n, [p, u]],
                      [
                        /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i,
                      ],
                      [n, [p, v]],
                      [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                      [[p, v]],
                      [
                        /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i,
                      ],
                      [[p, u]],
                      [/(android[-\w\. ]{0,9});.+buil/i],
                      [n, [q, "Generic"]],
                    ],
                    engine: [
                      [/windows.+ edge\/([\w\.]+)/i],
                      [r, [o, "EdgeHTML"]],
                      [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                      [r, [o, "Blink"]],
                      [
                        /(presto)\/([\w\.]+)/i,
                        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                        /ekioh(flow)\/([\w\.]+)/i,
                        /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                        /(icab)[\/ ]([23]\.[\d\.]+)/i,
                        /\b(libweb)/i,
                      ],
                      [o, r],
                      [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                      [r, o],
                    ],
                    os: [
                      [/microsoft (windows) (vista|xp)/i],
                      [o, r],
                      [
                        /(windows) nt 6\.2; (arm)/i,
                        /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                        /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
                      ],
                      [o, [r, Z, $]],
                      [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                      [
                        [o, "Windows"],
                        [r, Z, $],
                      ],
                      [
                        /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                        /ios;fbsv\/([\d\.]+)/i,
                        /cfnetwork\/.+darwin/i,
                      ],
                      [
                        [r, /_/g, "."],
                        [o, "iOS"],
                      ],
                      [
                        /(mac os x) ?([\w\. ]*)/i,
                        /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
                      ],
                      [
                        [o, S],
                        [r, /_/g, "."],
                      ],
                      [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                      [r, o],
                      [
                        /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                        /(blackberry)\w*\/([\w\.]*)/i,
                        /(tizen|kaios)[\/ ]([\w\.]+)/i,
                        /\((series40);/i,
                      ],
                      [o, r],
                      [/\(bb(10);/i],
                      [r, [o, C]],
                      [
                        /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i,
                      ],
                      [r, [o, "Symbian"]],
                      [
                        /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
                      ],
                      [r, [o, F + " OS"]],
                      [
                        /web0s;.+rt(tv)/i,
                        /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i,
                      ],
                      [r, [o, "webOS"]],
                      [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                      [r, [o, "watchOS"]],
                      [/crkey\/([\d\.]+)/i],
                      [r, [o, E + "cast"]],
                      [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                      [[o, R], r],
                      [
                        /panasonic;(viera)/i,
                        /(netrange)mmh/i,
                        /(nettv)\/(\d+\.[\w\.]+)/i,
                        /(nintendo|playstation) ([wids345portablevuch]+)/i,
                        /(xbox); +xbox ([^\);]+)/i,
                        /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                        /(mint)[\/\(\) ]?(\w*)/i,
                        /(mageia|vectorlinux)[; ]/i,
                        /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                        /(hurd|linux) ?([\w\.]*)/i,
                        /(gnu) ?([\w\.]*)/i,
                        /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                        /(haiku) (\w+)/i,
                      ],
                      [o, r],
                      [/(sunos) ?([\w\.\d]*)/i],
                      [[o, "Solaris"], r],
                      [
                        /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                        /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                        /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                        /(unix) ?([\w\.]*)/i,
                      ],
                      [o, r],
                    ],
                  },
                  aa = function (a, b) {
                    if (
                      (typeof a === k && ((b = a), (a = h)),
                      !(this instanceof aa))
                    )
                      return new aa(a, b).getResult();
                    var c = typeof g !== j && g.navigator ? g.navigator : h,
                      d = a || (c && c.userAgent ? c.userAgent : ""),
                      e = c && c.userAgentData ? c.userAgentData : h,
                      f = b ? T(_, b) : _,
                      t = c && c.userAgent == d;
                    return (
                      (this.getBrowser = function () {
                        var a,
                          b = {};
                        return (
                          (b[o] = h),
                          (b[r] = h),
                          Y.call(b, d, f.browser),
                          (b[m] =
                            typeof (a = b[r]) === l
                              ? a.replace(/[^\d\.]/g, "").split(".")[0]
                              : h),
                          t &&
                            c &&
                            c.brave &&
                            typeof c.brave.isBrave == i &&
                            (b[o] = "Brave"),
                          b
                        );
                      }),
                      (this.getCPU = function () {
                        var a = {};
                        return ((a[s] = h), Y.call(a, d, f.cpu), a);
                      }),
                      (this.getDevice = function () {
                        var a = {};
                        return (
                          (a[q] = h),
                          (a[n] = h),
                          (a[p] = h),
                          Y.call(a, d, f.device),
                          t && !a[p] && e && e.mobile && (a[p] = u),
                          t &&
                            "Macintosh" == a[n] &&
                            c &&
                            typeof c.standalone !== j &&
                            c.maxTouchPoints &&
                            c.maxTouchPoints > 2 &&
                            ((a[n] = "iPad"), (a[p] = v)),
                          a
                        );
                      }),
                      (this.getEngine = function () {
                        var a = {};
                        return (
                          (a[o] = h),
                          (a[r] = h),
                          Y.call(a, d, f.engine),
                          a
                        );
                      }),
                      (this.getOS = function () {
                        var a = {};
                        return (
                          (a[o] = h),
                          (a[r] = h),
                          Y.call(a, d, f.os),
                          t &&
                            !a[o] &&
                            e &&
                            "Unknown" != e.platform &&
                            (a[o] = e.platform
                              .replace(/chrome os/i, R)
                              .replace(/macos/i, S)),
                          a
                        );
                      }),
                      (this.getResult = function () {
                        return {
                          ua: this.getUA(),
                          browser: this.getBrowser(),
                          engine: this.getEngine(),
                          os: this.getOS(),
                          device: this.getDevice(),
                          cpu: this.getCPU(),
                        };
                      }),
                      (this.getUA = function () {
                        return d;
                      }),
                      (this.setUA = function (a) {
                        return (
                          (d =
                            typeof a === l && a.length > 350 ? X(a, 350) : a),
                          this
                        );
                      }),
                      this.setUA(d),
                      this
                    );
                  };
                ((aa.VERSION = "1.0.35"),
                  (aa.BROWSER = U([o, r, m])),
                  (aa.CPU = U([s])),
                  (aa.DEVICE = U([n, q, p, t, u, w, v, x, y])),
                  (aa.ENGINE = aa.OS = U([o, r])),
                  typeof f !== j
                    ? (e.exports && (f = e.exports = aa), (f.UAParser = aa))
                    : c.amdO
                      ? void 0 ===
                          (d = function () {
                            return aa;
                          }.call(b, c, b, a)) || (a.exports = d)
                      : typeof g !== j && (g.UAParser = aa));
                var ab = typeof g !== j && (g.jQuery || g.Zepto);
                if (ab && !ab.ua) {
                  var ac = new aa();
                  ((ab.ua = ac.getResult()),
                    (ab.ua.get = function () {
                      return ac.getUA();
                    }),
                    (ab.ua.set = function (a) {
                      ac.setUA(a);
                      var b = ac.getResult();
                      for (var c in b) ab.ua[c] = b[c];
                    }));
                }
              })("object" == typeof window ? window : this);
            },
          },
          f = {};
        function g(a) {
          var b = f[a];
          if (void 0 !== b) return b.exports;
          var c = (f[a] = { exports: {} }),
            d = !0;
          try {
            (e[a].call(c.exports, c, c.exports, g), (d = !1));
          } finally {
            d && delete f[a];
          }
          return c.exports;
        }
        ((g.ab = "//"), (a.exports = g(226)));
      })();
    },
  },
  (a) => {
    a.O(0, [893], () => a((a.s = 2613)));
    var b = a.O();
    (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)[
      "middleware_pages/api/driver/wallet"
    ] = b;
  },
]);
//# sourceMappingURL=wallet.js.map
