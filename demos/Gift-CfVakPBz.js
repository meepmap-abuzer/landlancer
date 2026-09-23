import { c as z, _ as w } from "./_plugin-vue_export-helper-DagV1u3B.js";
import { S as G } from "./star-M0S-IBQG.js";
import { j as l, c as u, b as a, t as d, F as k, g as $, h as B, y as b, u as C, p as x, r as p, o as N, a as S, d as I, n as A, z as D, i as L, e as U, f as V } from "./mount-DpeSORhq.js";
import { G as F } from "./gift-DTfqeF7K.js";
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const T = z("BombIcon", [
  ["circle", { cx: "11", cy: "13", r: "9", key: "hd149" }],
  [
    "path",
    {
      d: "M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95",
      key: "jp4j1b"
    }
  ],
  ["path", { d: "m22 2-1.5 1.5", key: "ay92ug" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j = z("CrownIcon", [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E = z("GemIcon", [
  ["path", { d: "M6 3h12l4 6-10 13L2 9Z", key: "1pcd5k" }],
  ["path", { d: "M11 3 8 9l4 13 4-13-3-6", key: "1fcu3u" }],
  ["path", { d: "M2 9h20", key: "16fsjt" }]
]);
function q(r = 3, t = Math.random) {
  const e = Array.from({ length: 25 }, (o, n) => n);
  for (let o = e.length - 1; o > 0; o--) {
    const n = Math.floor(t() * (o + 1));
    [e[o], e[n]] = [e[n], e[o]];
  }
  return new Set(e.slice(0, r));
}
function X(r, t) {
  if (r.status !== "playing" || t < 0 || t >= 25 || r.open.has(t)) return r;
  const e = new Set(r.open);
  return e.add(t), { ...r, open: e, status: r.mines.has(t) ? "lost" : e.size === 25 - r.mines.size ? "won" : "playing" };
}
const H = (r) => Number((1 + r * 0.18).toFixed(2)), O = (r) => Math.exp(Math.max(0, r) / 5500), R = (r, t) => (r % 360 + 360) % 360 < t * 3.6, W = { class: "mines-demo" }, Z = { class: "mine-summary" }, J = { class: "mine-options" }, K = ["aria-pressed", "disabled", "onClick"], P = { class: "game-field" }, Q = ["aria-label", "disabled", "onClick"], Y = {
  key: 2,
  class: "cell-hidden"
}, ee = ["disabled"], ae = {
  class: "demo-status",
  role: "status"
}, te = {
  __name: "MinesDemo",
  props: { compact: Boolean },
  setup(r) {
    const t = p(3), e = p({ status: "ready", mines: /* @__PURE__ */ new Set(), open: /* @__PURE__ */ new Set() }), o = x(() => H([...e.value.open].filter((m) => !e.value.mines.has(m)).length)), n = x(() => e.value.status === "lost" ? "Мина! Попробуйте ещё раз." : e.value.status === "won" ? `Раунд завершён · ×${o.value.toFixed(2)}` : e.value.status === "playing" ? "Открывайте клетки или завершите раунд." : "Найдите звёзды на поле 5 × 5.");
    function c() {
      e.value = { status: "playing", mines: q(t.value), open: /* @__PURE__ */ new Set() };
    }
    function v(m) {
      e.value = X(e.value, m);
    }
    return (m, _) => (l(), u("div", W, [
      a("div", Z, [
        _[1] || (_[1] = a("span", null, "МИНЫ", -1)),
        a("strong", null, "×" + d(o.value.toFixed(2)), 1),
        a("div", J, [
          (l(), u(k, null, $([3, 5, 7], (s) => a("button", {
            key: s,
            "aria-pressed": t.value === s,
            disabled: e.value.status === "playing",
            onClick: (i) => t.value = s
          }, d(s), 9, K)), 64))
        ])
      ]),
      a("div", P, [
        (l(), u(k, null, $(25, (s) => a("button", {
          key: s,
          class: B(["cell", { revealed: e.value.open.has(s - 1), mine: e.value.open.has(s - 1) && e.value.mines.has(s - 1), safe: e.value.open.has(s - 1) && !e.value.mines.has(s - 1) }]),
          "aria-label": `Клетка ${s}${e.value.open.has(s - 1) ? e.value.mines.has(s - 1) ? ": мина" : ": звезда" : ""}`,
          disabled: e.value.status !== "playing" || e.value.open.has(s - 1),
          onClick: (i) => v(s - 1)
        }, [
          e.value.open.has(s - 1) && e.value.mines.has(s - 1) ? (l(), b(C(T), { key: 0 })) : e.value.open.has(s - 1) ? (l(), b(C(G), {
            key: 1,
            fill: "currentColor"
          })) : (l(), u("span", Y, "?"))
        ], 10, Q)), 64))
      ]),
      e.value.status !== "playing" ? (l(), u("button", {
        key: 0,
        class: "demo-action",
        onClick: c
      }, d(e.value.status === "ready" ? "Играть в мины" : "Ещё раунд"), 1)) : (l(), u("button", {
        key: 1,
        class: "demo-action",
        disabled: !e.value.open.size,
        onClick: _[0] || (_[0] = (s) => e.value.status = "won")
      }, "Завершить · ×" + d(o.value.toFixed(2)), 9, ee)),
      a("p", ae, d(n.value), 1)
    ]));
  }
}, se = /* @__PURE__ */ w(te, [["__scopeId", "data-v-1976ed0e"]]), ne = { class: "crash-demo" }, oe = { class: "game-container" }, le = {
  class: "graph-svg",
  viewBox: "0 0 400 280",
  preserveAspectRatio: "none",
  "aria-hidden": "true"
}, re = ["d", "stroke"], ie = { class: "history-bar" }, ce = {
  class: "demo-status",
  role: "status"
}, ue = {
  __name: "CrashDemo",
  setup(r) {
    const t = p("ready"), e = p(1), o = p([]);
    let n = 0, c = 0, v = 2;
    const m = x(() => {
      const f = Math.min((e.value - 1) / 3, 1);
      return Array.from({ length: 51 }, (g, y) => {
        const M = y / 50 * f;
        return `${y ? "L" : "M"}${50 + Math.pow(M, 0.41) * 320},${250 - Math.pow(Math.max(0, (M - 0.1) / 0.9), 2) * 200}`;
      }).join(" ");
    });
    function _(f) {
      cancelAnimationFrame(n), t.value = f, o.value = [e.value, ...o.value].slice(0, 6);
    }
    function s(f) {
      e.value = Math.min(O(f - c), v), e.value >= v ? _("crashed") : n = requestAnimationFrame(s);
    }
    function i() {
      t.value !== "running" && (e.value = 1, t.value = "running", v = 1.5 + Math.random() * 3, c = performance.now(), n = requestAnimationFrame(s));
    }
    function h() {
      document.hidden && t.value === "running" && _("paused");
    }
    return N(() => document.addEventListener("visibilitychange", h)), S(() => {
      cancelAnimationFrame(n), document.removeEventListener("visibilitychange", h);
    }), (f, g) => (l(), u("div", ne, [
      a("div", oe, [
        (l(), u("svg", le, [
          g[1] || (g[1] = a("defs", null, [
            a("pattern", {
              id: "demo-crash-grid",
              width: "40",
              height: "40",
              patternUnits: "userSpaceOnUse"
            }, [
              a("path", {
                d: "M40 0H0V40",
                fill: "none",
                stroke: "#ffffff0e"
              })
            ])
          ], -1)),
          g[2] || (g[2] = a("rect", {
            width: "400",
            height: "280",
            fill: "url(#demo-crash-grid)"
          }, null, -1)),
          a("path", {
            d: m.value,
            fill: "none",
            stroke: t.value === "crashed" ? "#f87171" : "#9aff27",
            "stroke-width": "4",
            "stroke-linecap": "round"
          }, null, 8, re)
        ])),
        a("div", {
          class: B(["multiplier-display", { crashed: t.value === "crashed" }])
        }, "×" + d(e.value.toFixed(2)), 3)
      ]),
      a("div", ie, [
        (l(!0), u(k, null, $(o.value, (y, M) => (l(), u("span", {
          class: "history-badge",
          key: M
        }, "×" + d(y.toFixed(2)), 1))), 128))
      ]),
      a("button", {
        class: "demo-action",
        onClick: g[0] || (g[0] = (y) => t.value === "running" ? _("collected") : i())
      }, d(t.value === "running" ? "Остановить полёт" : "Запустить краш"), 1),
      a("p", ce, d(t.value === "crashed" ? "Краш! Запустите новый полёт." : t.value === "collected" ? `Остановлено на ×${e.value.toFixed(2)}` : t.value === "paused" ? "Раунд остановлен при уходе со страницы." : "Успейте остановиться до завершения полёта."), 1)
    ]));
  }
}, de = /* @__PURE__ */ w(ue, [["__scopeId", "data-v-326c6ea9"]]), me = { class: "case-demo" }, ve = { class: "case-heading" }, pe = ["disabled"], he = {
  class: "demo-status",
  role: "status"
}, fe = {
  __name: "CaseDemo",
  setup(r) {
    const t = [{ name: "Crystal", icon: E, color: "#71dfff" }, { name: "Lucky Star", icon: G, color: "#f9dc72" }, { name: "Gift Box", icon: F, color: "#c292ff" }, { name: "Crown", icon: j, color: "#a5ff77" }], e = p(), o = p(Array.from({ length: 32 }, (s, i) => t[i % 4])), n = p(0), c = p(!1), v = p("");
    let m;
    async function _() {
      if (c.value) return;
      c.value = !0, v.value = "", n.value = 0, await L();
      const s = Math.floor(Math.random() * 4), h = (24 + s) * 108 + 50 - e.value.clientWidth / 2;
      await L();
      const f = e.value.querySelector(".roulette-track"), g = matchMedia("(prefers-reduced-motion: reduce)").matches, y = f.animate([{ transform: "translateX(0)" }, { transform: `translateX(-${h}px)` }], { duration: g ? 0 : 3200, easing: "cubic-bezier(.12,.75,.18,1)", fill: "forwards" });
      m = y, y.onfinish = () => {
        v.value = t[s].name, n.value = h, c.value = !1, y.cancel();
      };
    }
    return S(() => m == null ? void 0 : m.cancel()), (s, i) => (l(), u("div", me, [
      a("div", ve, [
        I(C(F), { size: 34 }),
        i[0] || (i[0] = a("h3", null, "Коллекция подарков", -1)),
        i[1] || (i[1] = a("p", null, "Запустите ленту и посмотрите результат.", -1))
      ]),
      a("div", {
        ref_key: "windowEl",
        ref: e,
        class: "roulette-container"
      }, [
        i[2] || (i[2] = a("div", { class: "roulette-indicator" }, null, -1)),
        a("div", {
          class: "roulette-track",
          style: A({ transform: `translateX(-${n.value}px)` })
        }, [
          (l(!0), u(k, null, $(o.value, (h, f) => (l(), u("div", {
            class: "roulette-item",
            key: f
          }, [
            (l(), b(D(h.icon), {
              size: 46,
              color: h.color
            }, null, 8, ["color"])),
            a("span", null, d(h.name), 1)
          ]))), 128))
        ], 4)
      ], 512),
      a("button", {
        class: "demo-action",
        disabled: c.value,
        onClick: _
      }, d(c.value ? "Открываем…" : "Открыть кейс"), 9, pe),
      a("p", he, d(v.value ? `Ваш демо-подарок — ${v.value}` : "Все подарки в этой витрине виртуальные."), 1)
    ]));
  }
}, _e = /* @__PURE__ */ w(fe, [["__scopeId", "data-v-f72bf811"]]), ge = { class: "upgrade-demo" }, ye = { class: "upgrade-picks" }, ke = { class: "upgrade-wheel" }, $e = {
  viewBox: "0 0 200 200",
  "aria-hidden": "true"
}, be = ["stroke-dasharray"], we = { class: "target-picker" }, Me = ["disabled", "aria-pressed", "onClick"], Ce = ["disabled"], xe = {
  class: "demo-status",
  role: "status"
}, Fe = {
  __name: "UpgradeDemo",
  setup(r) {
    const t = p(0), e = p(0), o = p(!1), n = p("");
    let c;
    const v = [{ name: "Crystal", chance: 65, icon: E }, { name: "Crown", chance: 35, icon: j }], m = x(() => v[t.value]);
    function _() {
      if (o.value) return;
      o.value = !0, n.value = "";
      const s = Math.random() * 360;
      e.value = Math.ceil(e.value / 360) * 360 + 1080 + s, c = setTimeout(() => {
        n.value = R(s, m.value.chance) ? "Апгрейд получился!" : "В этот раз не получилось. Попробуйте ещё.", o.value = !1;
      }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 2800);
    }
    return S(() => clearTimeout(c)), (s, i) => (l(), u("div", ge, [
      a("div", ye, [
        a("div", null, [
          I(C(F), { size: 48 }),
          i[0] || (i[0] = a("span", null, "Gift Box", -1))
        ]),
        a("div", ke, [
          (l(), u("svg", $e, [
            i[2] || (i[2] = a("circle", {
              cx: "100",
              cy: "100",
              r: "81",
              fill: "none",
              stroke: "#ef4444",
              "stroke-width": "5"
            }, null, -1)),
            a("circle", {
              cx: "100",
              cy: "100",
              r: "81",
              fill: "none",
              stroke: "#9aff27",
              "stroke-width": "5",
              "stroke-dasharray": `${m.value.chance / 100 * 509} 509`,
              transform: "rotate(-90 100 100)"
            }, null, 8, be),
            a("g", {
              style: A({ transform: `rotate(${e.value}deg)`, transformOrigin: "100px 100px", transition: "transform 2.8s cubic-bezier(.17,.67,.12,.99)" })
            }, [...i[1] || (i[1] = [
              a("polygon", {
                points: "100,19 106,42 94,42",
                fill: "white"
              }, null, -1)
            ])], 4)
          ])),
          a("strong", null, d(m.value.chance) + "%", 1)
        ]),
        a("div", null, [
          (l(), b(D(m.value.icon), { size: 48 })),
          a("span", null, d(m.value.name), 1)
        ])
      ]),
      a("div", we, [
        (l(), u(k, null, $(v, (h, f) => a("button", {
          key: h.name,
          disabled: o.value,
          "aria-pressed": t.value === f,
          onClick: (g) => {
            t.value = f, n.value = "";
          }
        }, d(h.name) + " · " + d(h.chance) + "%", 9, Me)), 64))
      ]),
      a("button", {
        class: "demo-action",
        disabled: o.value,
        onClick: _
      }, d(o.value ? "Улучшаем…" : "Попробовать апгрейд"), 9, Ce),
      a("p", xe, d(n.value || "Выберите цель и запустите вращение."), 1)
    ]));
  }
}, ze = /* @__PURE__ */ w(Fe, [["__scopeId", "data-v-cb63e19a"]]), Be = {
  key: 0,
  class: "demo-tabs",
  "aria-label": "Режим игры"
}, Se = ["aria-pressed", "onClick"], De = {
  __name: "Gift",
  props: { compact: Boolean },
  setup(r) {
    const t = p("mines"), e = [["mines", "Мины", se], ["case", "Кейсы", _e], ["crash", "Краш", de], ["upgrade", "Апгрейд", ze]];
    return (o, n) => (l(), u("div", {
      class: B(["gift-demo", { compact: r.compact }])
    }, [
      n[0] || (n[0] = a("header", { class: "demo-topbar" }, [
        a("span", { class: "demo-wordmark" }, [
          U("Gift Run"),
          a("span", null, "✳")
        ]),
        a("small", null, "Интерактивное демо")
      ], -1)),
      r.compact ? V("", !0) : (l(), u("nav", Be, [
        (l(), u(k, null, $(e, ([c, v]) => a("button", {
          key: c,
          "aria-pressed": t.value === c,
          onClick: (m) => t.value = c
        }, d(v), 9, Se)), 64))
      ])),
      (l(), b(D(e.find((c) => c[0] === t.value)[2]), { compact: r.compact }, null, 8, ["compact"])),
      n[1] || (n[1] = a("p", { class: "demo-note" }, "Демонстрационные раунды · без ставок и реальных призов", -1))
    ], 2));
  }
}, je = /* @__PURE__ */ w(De, [["__scopeId", "data-v-1806e352"]]);
export {
  je as default
};
