(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [6548],
  {
    704: (e, t, a) => {
      "use strict";
      a.d(t, { T: () => i });
      var r = a(37876),
        s = a(14232),
        n = a(27025);
      let i = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("textarea", {
          className: (0, n.cn)(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            a,
          ),
          ref: t,
          ...s,
        });
      });
      i.displayName = "Textarea";
    },
    5636: (e, t, a) => {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/admin/review",
        function () {
          return a(79883);
        },
      ]);
    },
    23478: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => r });
      let r = (0, a(17963).A)("Video", [
        [
          "path",
          {
            d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
            key: "ftymec",
          },
        ],
        [
          "rect",
          { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" },
        ],
      ]);
    },
    27025: (e, t, a) => {
      "use strict";
      a.d(t, { cn: () => n });
      var r = a(69241),
        s = a(29573);
      function n() {
        for (var e = arguments.length, t = Array(e), a = 0; a < e; a++)
          t[a] = arguments[a];
        return (0, s.QP)((0, r.$)(t));
      }
    },
    31188: (e, t, a) => {
      "use strict";
      a.d(t, {
        BT: () => o,
        Wu: () => c,
        ZB: () => d,
        Zp: () => i,
        aR: () => l,
      });
      var r = a(37876),
        s = a(14232),
        n = a(27025);
      let i = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("div", {
          ref: t,
          className: (0, n.cn)(
            "rounded-lg border bg-card text-card-foreground shadow-sm",
            a,
          ),
          ...s,
        });
      });
      i.displayName = "Card";
      let l = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("div", {
          ref: t,
          className: (0, n.cn)("flex flex-col space-y-1.5 p-6", a),
          ...s,
        });
      });
      l.displayName = "CardHeader";
      let d = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("h3", {
          ref: t,
          className: (0, n.cn)(
            "text-2xl font-semibold leading-none tracking-tight",
            a,
          ),
          ...s,
        });
      });
      d.displayName = "CardTitle";
      let o = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("p", {
          ref: t,
          className: (0, n.cn)("text-sm text-muted-foreground", a),
          ...s,
        });
      });
      o.displayName = "CardDescription";
      let c = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("div", {
          ref: t,
          className: (0, n.cn)("p-6 pt-0", a),
          ...s,
        });
      });
      ((c.displayName = "CardContent"),
        (s.forwardRef((e, t) => {
          let { className: a, ...s } = e;
          return (0, r.jsx)("div", {
            ref: t,
            className: (0, n.cn)("flex items-center p-6 pt-0", a),
            ...s,
          });
        }).displayName = "CardFooter"));
    },
    42298: (e, t, a) => {
      "use strict";
      a.d(t, { $: () => o });
      var r = a(37876),
        s = a(14232),
        n = a(82987),
        i = a(47137),
        l = a(27025);
      let d = (0, i.F)(
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
        o = s.forwardRef((e, t) => {
          let { className: a, variant: s, size: i, asChild: o = !1, ...c } = e,
            u = o ? n.DX : "button";
          return (0, r.jsx)(u, {
            className: (0, l.cn)(d({ variant: s, size: i, className: a })),
            ref: t,
            ...c,
          });
        });
      o.displayName = "Button";
    },
    44190: (e, t, a) => {
      "use strict";
      a.d(t, { N: () => n });
      var r = a(46958),
        s = a(65364);
      let n = (0, r.UU)(
        "https://rkonwkggxaohpmxmzmfn.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
      );
      (0, r.UU)(
        "https://rkonwkggxaohpmxmzmfn.supabase.co",
        s.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: !1 } },
      );
    },
    54410: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => r });
      let r = (0, a(17963).A)("Shield", [
        [
          "path",
          {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y",
          },
        ],
      ]);
    },
    59773: (e, t, a) => {
      "use strict";
      a.d(t, { b: () => l });
      var r = a(14232),
        s = a(66326),
        n = a(37876),
        i = r.forwardRef((e, t) =>
          (0, n.jsx)(s.sG.label, {
            ...e,
            ref: t,
            onMouseDown: (t) => {
              t.target.closest("button, input, select, textarea") ||
                (e.onMouseDown?.(t),
                !t.defaultPrevented && t.detail > 1 && t.preventDefault());
            },
          }),
        );
      i.displayName = "Label";
      var l = i;
    },
    64041: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => r });
      let r = (0, a(17963).A)("Calendar", [
        ["path", { d: "M8 2v4", key: "1cmpym" }],
        ["path", { d: "M16 2v4", key: "4m81vk" }],
        [
          "rect",
          { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
        ],
        ["path", { d: "M3 10h18", key: "8toen8" }],
      ]);
    },
    67514: (e, t, a) => {
      "use strict";
      a.d(t, { p: () => i });
      var r = a(37876),
        s = a(14232),
        n = a(27025);
      let i = s.forwardRef((e, t) => {
        let { className: a, type: s, ...i } = e;
        return (0, r.jsx)("input", {
          type: s,
          className: (0, n.cn)(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            a,
          ),
          ref: t,
          ...i,
        });
      });
      i.displayName = "Input";
    },
    70948: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => r });
      let r = (0, a(17963).A)("Image", [
        [
          "rect",
          {
            width: "18",
            height: "18",
            x: "3",
            y: "3",
            rx: "2",
            ry: "2",
            key: "1m3agn",
          },
        ],
        ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
        [
          "path",
          { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" },
        ],
      ]);
    },
    73534: (e, t, a) => {
      "use strict";
      a.d(t, {
        bq: () => m,
        eb: () => g,
        gC: () => x,
        l6: () => c,
        yv: () => u,
      });
      var r = a(37876),
        s = a(14232),
        n = a(87791),
        i = a(58725),
        l = a(16076),
        d = a(32257),
        o = a(27025);
      let c = n.bL;
      n.YJ;
      let u = n.WT,
        m = s.forwardRef((e, t) => {
          let { className: a, children: s, ...l } = e;
          return (0, r.jsxs)(n.l9, {
            ref: t,
            className: (0, o.cn)(
              "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
              a,
            ),
            ...l,
            children: [
              s,
              (0, r.jsx)(n.In, {
                asChild: !0,
                children: (0, r.jsx)(i.A, { className: "h-4 w-4 opacity-50" }),
              }),
            ],
          });
        });
      m.displayName = n.l9.displayName;
      let f = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)(n.PP, {
          ref: t,
          className: (0, o.cn)(
            "flex cursor-default items-center justify-center py-1",
            a,
          ),
          ...s,
          children: (0, r.jsx)(l.A, { className: "h-4 w-4" }),
        });
      });
      f.displayName = n.PP.displayName;
      let p = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)(n.wn, {
          ref: t,
          className: (0, o.cn)(
            "flex cursor-default items-center justify-center py-1",
            a,
          ),
          ...s,
          children: (0, r.jsx)(i.A, { className: "h-4 w-4" }),
        });
      });
      p.displayName = n.wn.displayName;
      let x = s.forwardRef((e, t) => {
        let { className: a, children: s, position: i = "popper", ...l } = e;
        return (0, r.jsx)(n.ZL, {
          children: (0, r.jsxs)(n.UC, {
            ref: t,
            className: (0, o.cn)(
              "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              "popper" === i &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
              a,
            ),
            position: i,
            ...l,
            children: [
              (0, r.jsx)(f, {}),
              (0, r.jsx)(n.LM, {
                className: (0, o.cn)(
                  "p-1",
                  "popper" === i &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                ),
                children: s,
              }),
              (0, r.jsx)(p, {}),
            ],
          }),
        });
      });
      ((x.displayName = n.UC.displayName),
        (s.forwardRef((e, t) => {
          let { className: a, ...s } = e;
          return (0, r.jsx)(n.JU, {
            ref: t,
            className: (0, o.cn)("py-1.5 pl-8 pr-2 text-sm font-semibold", a),
            ...s,
          });
        }).displayName = n.JU.displayName));
      let g = s.forwardRef((e, t) => {
        let { className: a, children: s, ...i } = e;
        return (0, r.jsxs)(n.q7, {
          ref: t,
          className: (0, o.cn)(
            "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            a,
          ),
          ...i,
          children: [
            (0, r.jsx)("span", {
              className:
                "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
              children: (0, r.jsx)(n.VF, {
                children: (0, r.jsx)(d.A, { className: "h-4 w-4" }),
              }),
            }),
            (0, r.jsx)(n.p4, { children: s }),
          ],
        });
      });
      ((g.displayName = n.q7.displayName),
        (s.forwardRef((e, t) => {
          let { className: a, ...s } = e;
          return (0, r.jsx)(n.wv, {
            ref: t,
            className: (0, o.cn)("-mx-1 my-1 h-px bg-muted", a),
            ...s,
          });
        }).displayName = n.wv.displayName));
    },
    76423: (e, t, a) => {
      "use strict";
      a.d(t, { E: () => l });
      var r = a(37876);
      a(14232);
      var s = a(47137),
        n = a(27025);
      let i = (0, s.F)(
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
      function l(e) {
        let { className: t, variant: a, ...s } = e;
        return (0, r.jsx)("div", {
          className: (0, n.cn)(i({ variant: a }), t),
          ...s,
        });
      }
    },
    79883: (e, t, a) => {
      "use strict";
      (a.r(t), a.d(t, { default: () => eO }));
      var r = a(37876),
        s = a(14232),
        n = a(44190),
        i = a(42298),
        l = a(31188),
        d = a(76423),
        o = a(67514),
        c = a(93732),
        u = a(704),
        m = a(27025);
      let f = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("div", {
          className: "relative w-full overflow-auto",
          children: (0, r.jsx)("table", {
            ref: t,
            className: (0, m.cn)("w-full caption-bottom text-sm", a),
            ...s,
          }),
        });
      });
      f.displayName = "Table";
      let p = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("thead", {
          ref: t,
          className: (0, m.cn)("[&_tr]:border-b", a),
          ...s,
        });
      });
      p.displayName = "TableHeader";
      let x = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("tbody", {
          ref: t,
          className: (0, m.cn)("[&_tr:last-child]:border-0", a),
          ...s,
        });
      });
      ((x.displayName = "TableBody"),
        (s.forwardRef((e, t) => {
          let { className: a, ...s } = e;
          return (0, r.jsx)("tfoot", {
            ref: t,
            className: (0, m.cn)(
              "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
              a,
            ),
            ...s,
          });
        }).displayName = "TableFooter"));
      let g = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("tr", {
          ref: t,
          className: (0, m.cn)(
            "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
            a,
          ),
          ...s,
        });
      });
      g.displayName = "TableRow";
      let h = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("th", {
          ref: t,
          className: (0, m.cn)(
            "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
            a,
          ),
          ...s,
        });
      });
      h.displayName = "TableHead";
      let v = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)("td", {
          ref: t,
          className: (0, m.cn)(
            "p-4 align-middle [&:has([role=checkbox])]:pr-0",
            a,
          ),
          ...s,
        });
      });
      ((v.displayName = "TableCell"),
        (s.forwardRef((e, t) => {
          let { className: a, ...s } = e;
          return (0, r.jsx)("caption", {
            ref: t,
            className: (0, m.cn)("mt-4 text-sm text-muted-foreground", a),
            ...s,
          });
        }).displayName = "TableCaption"));
      var j = a(33716),
        y = a(10714),
        b = a(91844),
        N = a(70294),
        w = a(58162),
        R = a(73520),
        _ = a(90870),
        k = a(31893),
        C = a(96822),
        A = a(66326),
        I = a(22658),
        D = a(50223),
        S = a(94769),
        F = a(82987),
        E = "Dialog",
        [O, M] = (0, b.A)(E),
        [T, z] = O(E),
        P = (e) => {
          let {
              __scopeDialog: t,
              children: a,
              open: n,
              defaultOpen: i,
              onOpenChange: l,
              modal: d = !0,
            } = e,
            o = s.useRef(null),
            c = s.useRef(null),
            [u, m] = (0, w.i)({
              prop: n,
              defaultProp: i ?? !1,
              onChange: l,
              caller: E,
            });
          return (0, r.jsx)(T, {
            scope: t,
            triggerRef: o,
            contentRef: c,
            contentId: (0, N.B)(),
            titleId: (0, N.B)(),
            descriptionId: (0, N.B)(),
            open: u,
            onOpenChange: m,
            onOpenToggle: s.useCallback(() => m((e) => !e), [m]),
            modal: d,
            children: a,
          });
        };
      P.displayName = E;
      var q = "DialogTrigger",
        L = s.forwardRef((e, t) => {
          let { __scopeDialog: a, ...s } = e,
            n = z(q, a),
            i = (0, y.s)(t, n.triggerRef);
          return (0, r.jsx)(A.sG.button, {
            type: "button",
            "aria-haspopup": "dialog",
            "aria-expanded": n.open,
            "aria-controls": n.contentId,
            "data-state": ei(n.open),
            ...s,
            ref: i,
            onClick: (0, j.mK)(e.onClick, n.onOpenToggle),
          });
        });
      L.displayName = q;
      var Z = "DialogPortal",
        [U, $] = O(Z, { forceMount: void 0 }),
        B = (e) => {
          let {
              __scopeDialog: t,
              forceMount: a,
              children: n,
              container: i,
            } = e,
            l = z(Z, t);
          return (0, r.jsx)(U, {
            scope: t,
            forceMount: a,
            children: s.Children.map(n, (e) =>
              (0, r.jsx)(C.C, {
                present: a || l.open,
                children: (0, r.jsx)(k.Z, {
                  asChild: !0,
                  container: i,
                  children: e,
                }),
              }),
            ),
          });
        };
      B.displayName = Z;
      var H = "DialogOverlay",
        J = s.forwardRef((e, t) => {
          let a = $(H, e.__scopeDialog),
            { forceMount: s = a.forceMount, ...n } = e,
            i = z(H, e.__scopeDialog);
          return i.modal
            ? (0, r.jsx)(C.C, {
                present: s || i.open,
                children: (0, r.jsx)(W, { ...n, ref: t }),
              })
            : null;
        });
      J.displayName = H;
      var V = (0, F.TL)("DialogOverlay.RemoveScroll"),
        W = s.forwardRef((e, t) => {
          let { __scopeDialog: a, ...s } = e,
            n = z(H, a);
          return (0, r.jsx)(D.A, {
            as: V,
            allowPinchZoom: !0,
            shards: [n.contentRef],
            children: (0, r.jsx)(A.sG.div, {
              "data-state": ei(n.open),
              ...s,
              ref: t,
              style: { pointerEvents: "auto", ...s.style },
            }),
          });
        }),
        G = "DialogContent",
        X = s.forwardRef((e, t) => {
          let a = $(G, e.__scopeDialog),
            { forceMount: s = a.forceMount, ...n } = e,
            i = z(G, e.__scopeDialog);
          return (0, r.jsx)(C.C, {
            present: s || i.open,
            children: i.modal
              ? (0, r.jsx)(K, { ...n, ref: t })
              : (0, r.jsx)(Q, { ...n, ref: t }),
          });
        });
      X.displayName = G;
      var K = s.forwardRef((e, t) => {
          let a = z(G, e.__scopeDialog),
            n = s.useRef(null),
            i = (0, y.s)(t, a.contentRef, n);
          return (
            s.useEffect(() => {
              let e = n.current;
              if (e) return (0, S.Eq)(e);
            }, []),
            (0, r.jsx)(Y, {
              ...e,
              ref: i,
              trapFocus: a.open,
              disableOutsidePointerEvents: !0,
              onCloseAutoFocus: (0, j.mK)(e.onCloseAutoFocus, (e) => {
                (e.preventDefault(), a.triggerRef.current?.focus());
              }),
              onPointerDownOutside: (0, j.mK)(e.onPointerDownOutside, (e) => {
                let t = e.detail.originalEvent,
                  a = 0 === t.button && !0 === t.ctrlKey;
                (2 === t.button || a) && e.preventDefault();
              }),
              onFocusOutside: (0, j.mK)(e.onFocusOutside, (e) =>
                e.preventDefault(),
              ),
            })
          );
        }),
        Q = s.forwardRef((e, t) => {
          let a = z(G, e.__scopeDialog),
            n = s.useRef(!1),
            i = s.useRef(!1);
          return (0, r.jsx)(Y, {
            ...e,
            ref: t,
            trapFocus: !1,
            disableOutsidePointerEvents: !1,
            onCloseAutoFocus: (t) => {
              (e.onCloseAutoFocus?.(t),
                t.defaultPrevented ||
                  (n.current || a.triggerRef.current?.focus(),
                  t.preventDefault()),
                (n.current = !1),
                (i.current = !1));
            },
            onInteractOutside: (t) => {
              (e.onInteractOutside?.(t),
                t.defaultPrevented ||
                  ((n.current = !0),
                  "pointerdown" === t.detail.originalEvent.type &&
                    (i.current = !0)));
              let r = t.target;
              (a.triggerRef.current?.contains(r) && t.preventDefault(),
                "focusin" === t.detail.originalEvent.type &&
                  i.current &&
                  t.preventDefault());
            },
          });
        }),
        Y = s.forwardRef((e, t) => {
          let {
              __scopeDialog: a,
              trapFocus: n,
              onOpenAutoFocus: i,
              onCloseAutoFocus: l,
              ...d
            } = e,
            o = z(G, a),
            c = s.useRef(null),
            u = (0, y.s)(t, c);
          return (
            (0, I.Oh)(),
            (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(_.n, {
                  asChild: !0,
                  loop: !0,
                  trapped: n,
                  onMountAutoFocus: i,
                  onUnmountAutoFocus: l,
                  children: (0, r.jsx)(R.qW, {
                    role: "dialog",
                    id: o.contentId,
                    "aria-describedby": o.descriptionId,
                    "aria-labelledby": o.titleId,
                    "data-state": ei(o.open),
                    ...d,
                    ref: u,
                    onDismiss: () => o.onOpenChange(!1),
                  }),
                }),
                (0, r.jsxs)(r.Fragment, {
                  children: [
                    (0, r.jsx)(ec, { titleId: o.titleId }),
                    (0, r.jsx)(eu, {
                      contentRef: c,
                      descriptionId: o.descriptionId,
                    }),
                  ],
                }),
              ],
            })
          );
        }),
        ee = "DialogTitle",
        et = s.forwardRef((e, t) => {
          let { __scopeDialog: a, ...s } = e,
            n = z(ee, a);
          return (0, r.jsx)(A.sG.h2, { id: n.titleId, ...s, ref: t });
        });
      et.displayName = ee;
      var ea = "DialogDescription",
        er = s.forwardRef((e, t) => {
          let { __scopeDialog: a, ...s } = e,
            n = z(ea, a);
          return (0, r.jsx)(A.sG.p, { id: n.descriptionId, ...s, ref: t });
        });
      er.displayName = ea;
      var es = "DialogClose",
        en = s.forwardRef((e, t) => {
          let { __scopeDialog: a, ...s } = e,
            n = z(es, a);
          return (0, r.jsx)(A.sG.button, {
            type: "button",
            ...s,
            ref: t,
            onClick: (0, j.mK)(e.onClick, () => n.onOpenChange(!1)),
          });
        });
      function ei(e) {
        return e ? "open" : "closed";
      }
      en.displayName = es;
      var el = "DialogTitleWarning",
        [ed, eo] = (0, b.q)(el, {
          contentName: G,
          titleName: ee,
          docsSlug: "dialog",
        }),
        ec = ({ titleId: e }) => {
          let t = eo(el),
            a = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
          return (
            s.useEffect(() => {
              e && (document.getElementById(e) || console.error(a));
            }, [a, e]),
            null
          );
        },
        eu = ({ contentRef: e, descriptionId: t }) => {
          let a = eo("DialogDescriptionWarning"),
            r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${a.contentName}}.`;
          return (
            s.useEffect(() => {
              let a = e.current?.getAttribute("aria-describedby");
              t && a && (document.getElementById(t) || console.warn(r));
            }, [r, e, t]),
            null
          );
        },
        em = a(17963);
      let ef = (0, em.A)("X", [
          ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
          ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
        ]),
        ep = s.forwardRef((e, t) => {
          let { className: a, ...s } = e;
          return (0, r.jsx)(J, {
            ref: t,
            className: (0, m.cn)(
              "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              a,
            ),
            ...s,
          });
        });
      ep.displayName = J.displayName;
      let ex = s.forwardRef((e, t) => {
        let { className: a, children: s, ...n } = e;
        return (0, r.jsxs)(B, {
          children: [
            (0, r.jsx)(ep, {}),
            (0, r.jsxs)(X, {
              ref: t,
              className: (0, m.cn)(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                a,
              ),
              ...n,
              children: [
                s,
                (0, r.jsxs)(en, {
                  className:
                    "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                  children: [
                    (0, r.jsx)(ef, { className: "h-4 w-4" }),
                    (0, r.jsx)("span", {
                      className: "sr-only",
                      children: "Close",
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      });
      ex.displayName = X.displayName;
      let eg = (e) => {
        let { className: t, ...a } = e;
        return (0, r.jsx)("div", {
          className: (0, m.cn)(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            t,
          ),
          ...a,
        });
      };
      eg.displayName = "DialogHeader";
      let eh = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)(et, {
          ref: t,
          className: (0, m.cn)(
            "text-lg font-semibold leading-none tracking-tight",
            a,
          ),
          ...s,
        });
      });
      eh.displayName = et.displayName;
      let ev = s.forwardRef((e, t) => {
        let { className: a, ...s } = e;
        return (0, r.jsx)(er, {
          ref: t,
          className: (0, m.cn)("text-sm text-muted-foreground", a),
          ...s,
        });
      });
      ev.displayName = er.displayName;
      var ej = a(73534),
        ey = a(70948),
        eb = a(23478);
      let eN = (0, em.A)("FileText", [
        [
          "path",
          {
            d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
            key: "1rqfz7",
          },
        ],
        ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
        ["path", { d: "M10 9H8", key: "b1mrlr" }],
        ["path", { d: "M16 13H8", key: "t4e002" }],
        ["path", { d: "M16 17H8", key: "z1uh3a" }],
      ]);
      var ew = a(54410);
      let eR = (0, em.A)("Search", [
          ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
          ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
        ]),
        e_ = (0, em.A)("Filter", [
          [
            "polygon",
            {
              points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",
              key: "1yg77f",
            },
          ],
        ]);
      var ek = a(23551),
        eC = a(93784),
        eA = a(32257);
      let eI = (0, em.A)("Flag", [
        [
          "path",
          {
            d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",
            key: "i9b6wo",
          },
        ],
        ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }],
      ]);
      var eD = a(64041),
        eS = a(30860),
        eF = a(97685),
        eE = a(52126);
      function eO() {
        let [e, t] = (0, s.useState)([]),
          [a, m] = (0, s.useState)(!0),
          [j, y] = (0, s.useState)(""),
          [b, N] = (0, s.useState)("all"),
          [w, R] = (0, s.useState)(null),
          [_, k] = (0, s.useState)(""),
          [C, A] = (0, s.useState)(null),
          I = async () => {
            try {
              m(!0);
              let e = n.N.from("ads")
                .select(
                  "\n          *,\n          advertiser:profiles!advertiser_id(email, full_name),\n          campaign:campaigns!campaign_id(name, budget)\n        ",
                )
                .order("created_at", { ascending: !1 });
              "all" !== b && (e = e.eq("status", b));
              let { data: a, error: r } = await e;
              if (r) throw r;
              t(a || []);
            } catch (e) {
              (console.error("Error fetching ads:", e),
                eF.oR.error("Failed to load ads"));
            } finally {
              m(!1);
            }
          };
        (0, s.useEffect)(() => {
          I();
        }, [b]);
        let D = async (e) => {
            try {
              let { data: t, error: a } = await n.N.functions.invoke(
                "moderate-ad",
                {
                  body: {
                    adId: e.id,
                    title: e.title,
                    description: e.description,
                    mediaUrl: e.media_url,
                  },
                },
              );
              if (a) throw a;
              return t;
            } catch (t) {
              return (console.error("Moderation error:", t), S(e));
            }
          },
          S = (e) => {
            let t = "".concat(e.title, " ").concat(e.description).toLowerCase(),
              a = [
                "scam",
                "fraud",
                "fake",
                "illegal",
                "drugs",
                "weapons",
                "violence",
                "hate",
                "discrimination",
                "nsfw",
                "adult",
                "gambling",
                "bitcoin",
                "cryptocurrency",
                "get rich quick",
                "miracle cure",
              ].filter((e) => t.includes(e));
            return {
              flagged: a.length > 0,
              categories: a,
              category_scores: {},
              confidence: a.length > 0 ? 0.8 : 0.1,
              reasons:
                a.length > 0
                  ? ["Contains prohibited keywords: ".concat(a.join(", "))]
                  : [],
            };
          },
          F = async (e) => {
            try {
              var t;
              A(e);
              let { error: a } = await n.N.from("ads")
                .update({
                  status: "approved",
                  moderation_score: 0.1,
                  updated_at: new Date().toISOString(),
                })
                .eq("id", e);
              if (a) throw a;
              (await n.N.from("ad_moderation").insert({
                ad_id: e,
                action: "approved",
                moderator_id:
                  null == (t = (await n.N.auth.getUser()).data.user)
                    ? void 0
                    : t.id,
                reason: "Manually approved by admin",
                created_at: new Date().toISOString(),
              }),
                eF.oR.success("Ad approved successfully"),
                I());
            } catch (e) {
              (console.error("Error approving ad:", e),
                eF.oR.error("Failed to approve ad"));
            } finally {
              A(null);
            }
          },
          E = async (e, t) => {
            try {
              var a;
              A(e);
              let { error: r } = await n.N.from("ads")
                .update({
                  status: "rejected",
                  rejection_reason: t,
                  updated_at: new Date().toISOString(),
                })
                .eq("id", e);
              if (r) throw r;
              (await n.N.from("ad_moderation").insert({
                ad_id: e,
                action: "rejected",
                moderator_id:
                  null == (a = (await n.N.auth.getUser()).data.user)
                    ? void 0
                    : a.id,
                reason: t,
                created_at: new Date().toISOString(),
              }),
                eF.oR.success("Ad rejected"),
                k(""),
                I());
            } catch (e) {
              (console.error("Error rejecting ad:", e),
                eF.oR.error("Failed to reject ad"));
            } finally {
              A(null);
            }
          },
          O = async (t) => {
            try {
              var a;
              A(t);
              let r = e.find((e) => e.id === t);
              if (!r) return;
              let s = await D(r),
                { error: i } = await n.N.from("ads")
                  .update({
                    status: s.flagged ? "flagged" : "pending_review",
                    moderation_score: s.confidence,
                    updated_at: new Date().toISOString(),
                  })
                  .eq("id", t);
              if (i) throw i;
              (await n.N.from("ad_moderation").insert({
                ad_id: t,
                action: s.flagged ? "flagged" : "ai_reviewed",
                moderator_id:
                  null == (a = (await n.N.auth.getUser()).data.user)
                    ? void 0
                    : a.id,
                reason: s.reasons.join("; "),
                ai_confidence: s.confidence,
                ai_categories: s.categories,
                created_at: new Date().toISOString(),
              }),
                eF.oR.success(
                  s.flagged
                    ? "Ad flagged: ".concat(s.reasons.join(", "))
                    : "Ad passed AI review",
                ),
                I());
            } catch (e) {
              (console.error("Error flagging ad:", e),
                eF.oR.error("Failed to run AI moderation"));
            } finally {
              A(null);
            }
          },
          M = e.filter((e) => {
            var t;
            return (
              !j ||
              e.title.toLowerCase().includes(j.toLowerCase()) ||
              e.description.toLowerCase().includes(j.toLowerCase()) ||
              (null == (t = e.advertiser)
                ? void 0
                : t.email.toLowerCase().includes(j.toLowerCase()))
            );
          });
        return (0, r.jsx)("div", {
          className: "min-h-screen bg-gray-50 py-8",
          children: (0, r.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
              (0, r.jsxs)("div", {
                className: "mb-8",
                children: [
                  (0, r.jsxs)("h1", {
                    className:
                      "text-3xl font-bold text-gray-900 flex items-center gap-2",
                    children: [
                      (0, r.jsx)(ew.A, { className: "h-8 w-8" }),
                      "Ad Review & Moderation",
                    ],
                  }),
                  (0, r.jsx)("p", {
                    className: "text-gray-600 mt-2",
                    children:
                      "Review submitted ads and manage content moderation",
                  }),
                ],
              }),
              (0, r.jsx)(l.Zp, {
                className: "mb-6",
                children: (0, r.jsx)(l.Wu, {
                  className: "pt-6",
                  children: (0, r.jsxs)("div", {
                    className: "flex flex-col sm:flex-row gap-4",
                    children: [
                      (0, r.jsx)("div", {
                        className: "flex-1",
                        children: (0, r.jsxs)("div", {
                          className: "relative",
                          children: [
                            (0, r.jsx)(eR, {
                              className:
                                "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4",
                            }),
                            (0, r.jsx)(o.p, {
                              placeholder: "Search ads, advertisers...",
                              value: j,
                              onChange: (e) => y(e.target.value),
                              className: "pl-10",
                            }),
                          ],
                        }),
                      }),
                      (0, r.jsxs)(ej.l6, {
                        value: b,
                        onValueChange: N,
                        children: [
                          (0, r.jsxs)(ej.bq, {
                            className: "w-48",
                            children: [
                              (0, r.jsx)(e_, { className: "h-4 w-4 mr-2" }),
                              (0, r.jsx)(ej.yv, {}),
                            ],
                          }),
                          (0, r.jsxs)(ej.gC, {
                            children: [
                              (0, r.jsx)(ej.eb, {
                                value: "all",
                                children: "All Status",
                              }),
                              (0, r.jsx)(ej.eb, {
                                value: "pending_review",
                                children: "Pending Review",
                              }),
                              (0, r.jsx)(ej.eb, {
                                value: "approved",
                                children: "Approved",
                              }),
                              (0, r.jsx)(ej.eb, {
                                value: "rejected",
                                children: "Rejected",
                              }),
                              (0, r.jsx)(ej.eb, {
                                value: "flagged",
                                children: "Flagged",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, r.jsxs)(i.$, {
                        onClick: I,
                        variant: "outline",
                        children: [
                          (0, r.jsx)(ek.A, { className: "h-4 w-4 mr-2" }),
                          "Refresh",
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              (0, r.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6",
                children: [
                  (0, r.jsx)(l.Zp, {
                    children: (0, r.jsx)(l.Wu, {
                      className: "pt-4",
                      children: (0, r.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, r.jsxs)("div", {
                            children: [
                              (0, r.jsx)("p", {
                                className: "text-sm text-gray-500",
                                children: "Pending Review",
                              }),
                              (0, r.jsx)("p", {
                                className: "text-2xl font-bold",
                                children: e.filter(
                                  (e) => "pending_review" === e.status,
                                ).length,
                              }),
                            ],
                          }),
                          (0, r.jsx)(eC.A, {
                            className: "h-8 w-8 text-yellow-500",
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, r.jsx)(l.Zp, {
                    children: (0, r.jsx)(l.Wu, {
                      className: "pt-4",
                      children: (0, r.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, r.jsxs)("div", {
                            children: [
                              (0, r.jsx)("p", {
                                className: "text-sm text-gray-500",
                                children: "Approved Today",
                              }),
                              (0, r.jsx)("p", {
                                className: "text-2xl font-bold text-green-600",
                                children: e.filter(
                                  (e) =>
                                    "approved" === e.status &&
                                    new Date(e.created_at).toDateString() ===
                                      new Date().toDateString(),
                                ).length,
                              }),
                            ],
                          }),
                          (0, r.jsx)(eA.A, {
                            className: "h-8 w-8 text-green-500",
                          }),
                        ],
                      }),
                    }),
                  }),
                  (0, r.jsx)(l.Zp, {
                    children: (0, r.jsx)(l.Wu, {
                      className: "pt-4",
                      children: (0, r.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, r.jsxs)("div", {
                            children: [
                              (0, r.jsx)("p", {
                                className: "text-sm text-gray-500",
                                children: "Flagged",
                              }),
                              (0, r.jsx)("p", {
                                className: "text-2xl font-bold text-red-600",
                                children: e.filter(
                                  (e) => "flagged" === e.status,
                                ).length,
                              }),
                            ],
                          }),
                          (0, r.jsx)(eI, { className: "h-8 w-8 text-red-500" }),
                        ],
                      }),
                    }),
                  }),
                  (0, r.jsx)(l.Zp, {
                    children: (0, r.jsx)(l.Wu, {
                      className: "pt-4",
                      children: (0, r.jsxs)("div", {
                        className: "flex items-center justify-between",
                        children: [
                          (0, r.jsxs)("div", {
                            children: [
                              (0, r.jsx)("p", {
                                className: "text-sm text-gray-500",
                                children: "Total Ads",
                              }),
                              (0, r.jsx)("p", {
                                className: "text-2xl font-bold",
                                children: e.length,
                              }),
                            ],
                          }),
                          (0, r.jsx)(ew.A, {
                            className: "h-8 w-8 text-blue-500",
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
              (0, r.jsxs)(l.Zp, {
                children: [
                  (0, r.jsx)(l.aR, {
                    children: (0, r.jsxs)(l.ZB, {
                      children: ["Submitted Ads (", M.length, ")"],
                    }),
                  }),
                  (0, r.jsxs)(l.Wu, {
                    children: [
                      a
                        ? (0, r.jsx)("div", {
                            className: "text-center py-8",
                            children: "Loading ads...",
                          })
                        : (0, r.jsxs)(f, {
                            children: [
                              (0, r.jsx)(p, {
                                children: (0, r.jsxs)(g, {
                                  children: [
                                    (0, r.jsx)(h, { children: "Ad Details" }),
                                    (0, r.jsx)(h, { children: "Advertiser" }),
                                    (0, r.jsx)(h, { children: "Status" }),
                                    (0, r.jsx)(h, { children: "Submitted" }),
                                    (0, r.jsx)(h, { children: "Actions" }),
                                  ],
                                }),
                              }),
                              (0, r.jsx)(x, {
                                children: M.map((e) => {
                                  var t, a;
                                  return (0, r.jsxs)(
                                    g,
                                    {
                                      children: [
                                        (0, r.jsx)(v, {
                                          children: (0, r.jsxs)("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                              (0, r.jsx)("div", {
                                                className: "flex-shrink-0",
                                                children: ((e) => {
                                                  switch (e) {
                                                    case "image":
                                                      return (0, r.jsx)(ey.A, {
                                                        className: "h-4 w-4",
                                                      });
                                                    case "video":
                                                      return (0, r.jsx)(eb.A, {
                                                        className: "h-4 w-4",
                                                      });
                                                    default:
                                                      return (0, r.jsx)(eN, {
                                                        className: "h-4 w-4",
                                                      });
                                                  }
                                                })(e.media_type),
                                              }),
                                              (0, r.jsxs)("div", {
                                                children: [
                                                  (0, r.jsx)("p", {
                                                    className: "font-medium",
                                                    children: e.title,
                                                  }),
                                                  (0, r.jsx)("p", {
                                                    className:
                                                      "text-sm text-gray-500 line-clamp-2",
                                                    children: e.description,
                                                  }),
                                                  e.campaign &&
                                                    (0, r.jsxs)("p", {
                                                      className:
                                                        "text-xs text-blue-600 mt-1",
                                                      children: [
                                                        "Campaign: ",
                                                        e.campaign.name,
                                                        " ($",
                                                        e.campaign.budget,
                                                        ")",
                                                      ],
                                                    }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, r.jsx)(v, {
                                          children: (0, r.jsxs)("div", {
                                            children: [
                                              (0, r.jsx)("p", {
                                                className: "font-medium",
                                                children:
                                                  (null == (t = e.advertiser)
                                                    ? void 0
                                                    : t.full_name) || "Unknown",
                                              }),
                                              (0, r.jsx)("p", {
                                                className:
                                                  "text-sm text-gray-500",
                                                children:
                                                  null == (a = e.advertiser)
                                                    ? void 0
                                                    : a.email,
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, r.jsxs)(v, {
                                          children: [
                                            ((e) => {
                                              switch (e) {
                                                case "pending_review":
                                                  return (0, r.jsx)(d.E, {
                                                    variant: "outline",
                                                    className:
                                                      "text-yellow-600",
                                                    children: "Pending Review",
                                                  });
                                                case "approved":
                                                  return (0, r.jsx)(d.E, {
                                                    variant: "default",
                                                    className: "bg-green-600",
                                                    children: "Approved",
                                                  });
                                                case "rejected":
                                                  return (0, r.jsx)(d.E, {
                                                    variant: "destructive",
                                                    children: "Rejected",
                                                  });
                                                case "flagged":
                                                  return (0, r.jsx)(d.E, {
                                                    variant: "destructive",
                                                    className: "bg-orange-600",
                                                    children: "Flagged",
                                                  });
                                                default:
                                                  return (0, r.jsx)(d.E, {
                                                    variant: "outline",
                                                    children: e,
                                                  });
                                              }
                                            })(e.status),
                                            e.moderation_score &&
                                              (0, r.jsxs)("p", {
                                                className:
                                                  "text-xs text-gray-500 mt-1",
                                                children: [
                                                  "AI Score: ",
                                                  Math.round(
                                                    100 * e.moderation_score,
                                                  ),
                                                  "%",
                                                ],
                                              }),
                                          ],
                                        }),
                                        (0, r.jsx)(v, {
                                          children: (0, r.jsxs)("div", {
                                            className:
                                              "flex items-center gap-1 text-sm text-gray-500",
                                            children: [
                                              (0, r.jsx)(eD.A, {
                                                className: "h-3 w-3",
                                              }),
                                              (0, eE.GP)(
                                                new Date(e.created_at),
                                                "MMM d, HH:mm",
                                              ),
                                            ],
                                          }),
                                        }),
                                        (0, r.jsx)(v, {
                                          children: (0, r.jsxs)("div", {
                                            className:
                                              "flex items-center gap-2",
                                            children: [
                                              (0, r.jsxs)(P, {
                                                children: [
                                                  (0, r.jsx)(L, {
                                                    asChild: !0,
                                                    children: (0, r.jsx)(i.$, {
                                                      variant: "outline",
                                                      size: "sm",
                                                      onClick: () => R(e),
                                                      children: (0, r.jsx)(
                                                        eS.A,
                                                        {
                                                          className: "h-4 w-4",
                                                        },
                                                      ),
                                                    }),
                                                  }),
                                                  (0, r.jsxs)(ex, {
                                                    className: "max-w-2xl",
                                                    children: [
                                                      (0, r.jsxs)(eg, {
                                                        children: [
                                                          (0, r.jsxs)(eh, {
                                                            children: [
                                                              "Review Ad: ",
                                                              null == w
                                                                ? void 0
                                                                : w.title,
                                                            ],
                                                          }),
                                                          (0, r.jsx)(ev, {
                                                            children:
                                                              "Review this ad content and take appropriate action",
                                                          }),
                                                        ],
                                                      }),
                                                      w &&
                                                        (0, r.jsxs)("div", {
                                                          className:
                                                            "space-y-4",
                                                          children: [
                                                            (0, r.jsxs)("div", {
                                                              className:
                                                                "border rounded-lg p-4",
                                                              children: [
                                                                w.media_url &&
                                                                  (0, r.jsx)(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "mb-4",
                                                                      children:
                                                                        "video" ===
                                                                        w.media_type
                                                                          ? (0,
                                                                            r.jsx)(
                                                                              "video",
                                                                              {
                                                                                src: w.media_url,
                                                                                controls:
                                                                                  !0,
                                                                                className:
                                                                                  "w-full max-h-64 object-cover rounded",
                                                                              },
                                                                            )
                                                                          : (0,
                                                                            r.jsx)(
                                                                              "img",
                                                                              {
                                                                                src: w.media_url,
                                                                                alt: "Ad media",
                                                                                className:
                                                                                  "w-full max-h-64 object-cover rounded",
                                                                              },
                                                                            ),
                                                                    },
                                                                  ),
                                                                (0, r.jsx)(
                                                                  "h3",
                                                                  {
                                                                    className:
                                                                      "font-semibold text-lg mb-2",
                                                                    children:
                                                                      w.title,
                                                                  },
                                                                ),
                                                                (0, r.jsx)(
                                                                  "p",
                                                                  {
                                                                    className:
                                                                      "text-gray-600",
                                                                    children:
                                                                      w.description,
                                                                  },
                                                                ),
                                                              ],
                                                            }),
                                                            "pending_review" ===
                                                              w.status &&
                                                              (0, r.jsxs)(
                                                                "div",
                                                                {
                                                                  className:
                                                                    "space-y-2",
                                                                  children: [
                                                                    (0, r.jsx)(
                                                                      c.J,
                                                                      {
                                                                        htmlFor:
                                                                          "rejection-reason",
                                                                        children:
                                                                          "Rejection Reason (if rejecting)",
                                                                      },
                                                                    ),
                                                                    (0, r.jsx)(
                                                                      u.T,
                                                                      {
                                                                        id: "rejection-reason",
                                                                        value:
                                                                          _,
                                                                        onChange:
                                                                          (e) =>
                                                                            k(
                                                                              e
                                                                                .target
                                                                                .value,
                                                                            ),
                                                                        placeholder:
                                                                          "Enter reason for rejection...",
                                                                        rows: 3,
                                                                      },
                                                                    ),
                                                                  ],
                                                                },
                                                              ),
                                                            (0, r.jsxs)("div", {
                                                              className:
                                                                "flex gap-2",
                                                              children: [
                                                                "pending_review" ===
                                                                  w.status &&
                                                                  (0, r.jsxs)(
                                                                    r.Fragment,
                                                                    {
                                                                      children:
                                                                        [
                                                                          (0,
                                                                          r.jsxs)(
                                                                            i.$,
                                                                            {
                                                                              onClick:
                                                                                () =>
                                                                                  F(
                                                                                    w.id,
                                                                                  ),
                                                                              disabled:
                                                                                C ===
                                                                                w.id,
                                                                              className:
                                                                                "bg-green-600 hover:bg-green-700",
                                                                              children:
                                                                                [
                                                                                  (0,
                                                                                  r.jsx)(
                                                                                    eA.A,
                                                                                    {
                                                                                      className:
                                                                                        "h-4 w-4 mr-1",
                                                                                    },
                                                                                  ),
                                                                                  "Approve",
                                                                                ],
                                                                            },
                                                                          ),
                                                                          (0,
                                                                          r.jsxs)(
                                                                            i.$,
                                                                            {
                                                                              onClick:
                                                                                () =>
                                                                                  E(
                                                                                    w.id,
                                                                                    _,
                                                                                  ),
                                                                              disabled:
                                                                                C ===
                                                                                  w.id ||
                                                                                !_,
                                                                              variant:
                                                                                "destructive",
                                                                              children:
                                                                                [
                                                                                  (0,
                                                                                  r.jsx)(
                                                                                    ef,
                                                                                    {
                                                                                      className:
                                                                                        "h-4 w-4 mr-1",
                                                                                    },
                                                                                  ),
                                                                                  "Reject",
                                                                                ],
                                                                            },
                                                                          ),
                                                                        ],
                                                                    },
                                                                  ),
                                                                (0, r.jsxs)(
                                                                  i.$,
                                                                  {
                                                                    onClick:
                                                                      () =>
                                                                        O(w.id),
                                                                    disabled:
                                                                      C ===
                                                                      w.id,
                                                                    variant:
                                                                      "outline",
                                                                    children: [
                                                                      (0,
                                                                      r.jsx)(
                                                                        eI,
                                                                        {
                                                                          className:
                                                                            "h-4 w-4 mr-1",
                                                                        },
                                                                      ),
                                                                      "AI Review",
                                                                    ],
                                                                  },
                                                                ),
                                                              ],
                                                            }),
                                                          ],
                                                        }),
                                                    ],
                                                  }),
                                                ],
                                              }),
                                              "pending_review" === e.status &&
                                                (0, r.jsxs)(r.Fragment, {
                                                  children: [
                                                    (0, r.jsx)(i.$, {
                                                      size: "sm",
                                                      onClick: () => F(e.id),
                                                      disabled: C === e.id,
                                                      className:
                                                        "bg-green-600 hover:bg-green-700",
                                                      children: (0, r.jsx)(
                                                        eA.A,
                                                        {
                                                          className: "h-3 w-3",
                                                        },
                                                      ),
                                                    }),
                                                    (0, r.jsx)(i.$, {
                                                      size: "sm",
                                                      variant: "destructive",
                                                      onClick: () => {
                                                        R(e);
                                                      },
                                                      disabled: C === e.id,
                                                      children: (0, r.jsx)(ef, {
                                                        className: "h-3 w-3",
                                                      }),
                                                    }),
                                                  ],
                                                }),
                                              (0, r.jsx)(i.$, {
                                                size: "sm",
                                                variant: "outline",
                                                onClick: () => O(e.id),
                                                disabled: C === e.id,
                                                children: (0, r.jsx)(eI, {
                                                  className: "h-3 w-3",
                                                }),
                                              }),
                                            ],
                                          }),
                                        }),
                                      ],
                                    },
                                    e.id,
                                  );
                                }),
                              }),
                            ],
                          }),
                      0 === M.length &&
                        !a &&
                        (0, r.jsx)("div", {
                          className: "text-center py-8 text-gray-500",
                          children: "No ads found matching your criteria",
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    93732: (e, t, a) => {
      "use strict";
      a.d(t, { J: () => o });
      var r = a(37876),
        s = a(14232),
        n = a(59773),
        i = a(47137),
        l = a(27025);
      let d = (0, i.F)(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        ),
        o = s.forwardRef((e, t) => {
          let { className: a, ...s } = e;
          return (0, r.jsx)(n.b, {
            ref: t,
            className: (0, l.cn)(d(), a),
            ...s,
          });
        });
      o.displayName = n.b.displayName;
    },
  },
  (e) => {
    (e.O(0, [1987, 9853, 9956, 2880, 636, 6593, 8792], () => e((e.s = 5636))),
      (_N_E = e.O()));
  },
]);
