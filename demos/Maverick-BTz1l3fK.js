import { r as v, o as O, a as R, c as C, b as a, d as m, u as h, e as k, t as L, f as M, w as A, v as $, n as D, F as U, g as V, h as B, i as F, j as x } from "./mount-DpeSORhq.js";
import { c as T, _ as W } from "./_plugin-vue_export-helper-DagV1u3B.js";
import { S as z } from "./star-M0S-IBQG.js";
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _ = T("KeyRoundIcon", [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H = T("TrophyIcon", [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
]), X = 6, P = 3, j = 1, q = 4;
function G(t) {
  const n = Math.max(2, t.loopCount ?? X), l = w(
    t.anchorLoopIndex ?? j,
    n
  ), o = w(
    t.targetLoopIndex ?? q,
    n
  ), r = o <= l && l < n - 1 ? l + 1 : o;
  return K({
    ...t,
    anchorLoopIndex: l,
    anchorPrizeId: t.anchorPrizeId ?? null,
    loopCount: n,
    shuffleCombo: t.shuffleCombo ?? E,
    targetLoopIndex: r
  });
}
function Z(t, n) {
  const l = S(t, n);
  if (l === null)
    return N();
  const o = Math.floor(P / 2);
  return K({
    anchorLoopIndex: o,
    anchorPrizeId: l.id,
    loopCount: P,
    shuffleCombo: E,
    targetLoopIndex: o,
    targetPrize: l,
    visiblePrizes: t
  });
}
function J(t) {
  return t.containerWidth / 2 - (t.cellLeft + t.cellWidth / 2);
}
function K(t) {
  const n = Q(t.visiblePrizes, t.targetPrize);
  if (n.length === 0)
    return N();
  const l = S(n, t.anchorPrizeId), o = (l == null ? void 0 : l.id) ?? n[0].id, r = t.targetPrize.id, y = [];
  let g = null, I = null;
  for (let s = 0; s < t.loopCount; s += 1) {
    const c = n.map((p, d) => ({ poolIndex: d, prize: p })), f = s === t.anchorLoopIndex || s === t.targetLoopIndex ? c : t.shuffleCombo(c, s);
    for (const [p, d] of f.entries()) {
      const b = `${s}:${p}:${d.prize.id}`, i = s === t.anchorLoopIndex && d.prize.id === o, e = s === t.targetLoopIndex && d.prize.id === r;
      i && (g = b), e && (I = b), y.push({
        ...d.prize,
        cellKey: b,
        isAnchor: i,
        isTarget: e,
        loopIndex: s
      });
    }
  }
  return {
    anchorCellKey: g,
    anchorPrizeId: o,
    cells: y,
    targetCellKey: I,
    targetPrizeId: r
  };
}
function Q(t, n) {
  return t.some((l) => l.id === n.id) ? [...t] : [...t, n];
}
function S(t, n) {
  return t.length === 0 ? null : t.find((l) => l.id === n) ?? t[0];
}
function w(t, n) {
  return Math.min(Math.max(Math.trunc(t), 0), n - 1);
}
function E(t, n) {
  if (t.length <= 1)
    return t;
  const l = n % t.length;
  return [...t.slice(l), ...t.slice(0, l)];
}
function N() {
  return {
    anchorCellKey: null,
    anchorPrizeId: null,
    cells: [],
    targetCellKey: null,
    targetPrizeId: null
  };
}
const Y = { class: "demo-topbar" }, ee = { class: "member-balance" }, te = {
  key: 0,
  class: "demo-tabs",
  "aria-label": "Раздел Maverick"
}, ae = ["aria-pressed", "disabled"], le = ["aria-pressed", "disabled"], ne = { class: "roulette-content" }, oe = {
  class: "mav-wood-card mav-roulette-machine",
  "aria-label": "Рулетка призов"
}, re = { class: "mav-roulette-arch" }, se = ["data-cell-key", "data-jackpot", "data-target"], ie = ["disabled"], ue = {
  class: "demo-status",
  role: "status"
}, de = {
  key: 1,
  class: "member-profile"
}, ce = { class: "member-achievements" }, pe = {
  __name: "Maverick",
  props: { compact: Boolean },
  setup(t) {
    const n = [100, 250, 500, 1e3].map((i) => ({ id: String(i), title: `${i} баллов`, points_value: i })), l = v(Z(n)), o = v(0), r = v(!1), y = v(1250), g = v("Ключи для демо не заканчиваются."), I = v(), s = v(), c = v("roulette");
    let f, p;
    function d(i) {
      const e = [...s.value.children].find((u) => u.dataset.cellKey === i);
      return e ? J({ cellLeft: e.offsetLeft, cellWidth: e.offsetWidth, containerWidth: I.value.clientWidth }) : 0;
    }
    async function b() {
      if (r.value) return;
      r.value = !0, g.value = "Лента выбирает награду…";
      const i = n[Math.floor(Math.random() * n.length)];
      l.value = G({ visiblePrizes: n, targetPrize: i }), await F();
      const e = d(l.value.anchorCellKey), u = d(l.value.targetCellKey);
      o.value = e, f = s.value.animate([{ transform: `translateX(${e}px)` }, { transform: `translateX(${u}px)` }], { duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 3500, easing: "cubic-bezier(.12,.75,.18,1)", fill: "forwards" }), f.onfinish = () => {
        o.value = u, y.value += i.points_value, g.value = `+${i.points_value} демо-баллов. Награда добавлена в профиль.`, r.value = !1, f.cancel();
      };
    }
    return O(() => {
      o.value = d(l.value.anchorCellKey), p = new ResizeObserver(() => {
        r.value || (o.value = d(l.value.targetCellKey));
      }), p.observe(I.value);
    }), R(() => {
      f == null || f.cancel(), p == null || p.disconnect();
    }), (i, e) => (x(), C("div", {
      class: B(["maverick-demo", { compact: t.compact }])
    }, [
      a("header", Y, [
        e[2] || (e[2] = a("span", { class: "demo-wordmark" }, "MAVERICK", -1)),
        a("span", ee, [
          m(h(z), { size: 14 }),
          k(L(y.value.toLocaleString("ru-RU")), 1)
        ])
      ]),
      t.compact ? M("", !0) : (x(), C("nav", te, [
        a("button", {
          "aria-pressed": c.value === "roulette",
          disabled: r.value,
          onClick: e[0] || (e[0] = (u) => c.value = "roulette")
        }, "Рулетка", 8, ae),
        a("button", {
          "aria-pressed": c.value === "profile",
          disabled: r.value,
          onClick: e[1] || (e[1] = (u) => c.value = "profile")
        }, "Профиль участника", 8, le)
      ])),
      A(a("div", ne, [
        e[8] || (e[8] = a("div", { class: "roulette-heading" }, [
          a("span", null, "Бегущая дорожка"),
          a("h3", null, "Крути. Собирай. Возвращайся.")
        ], -1)),
        a("section", oe, [
          a("div", re, [
            m(h(z), { size: 17 }),
            e[3] || (e[3] = a("strong", null, "Испытай удачу", -1))
          ]),
          a("div", {
            ref_key: "windowEl",
            ref: I,
            class: "mav-strip-window"
          }, [
            a("div", {
              ref_key: "trackEl",
              ref: s,
              class: "mav-strip-track",
              style: D({ transform: `translateX(${o.value}px)` })
            }, [
              (x(!0), C(U, null, V(l.value.cells, (u) => (x(), C("article", {
                key: u.cellKey,
                class: "mav-prize-cell",
                "data-cell-key": u.cellKey,
                "data-jackpot": u.points_value >= 1e3,
                "data-target": u.isTarget
              }, [
                m(h(z), {
                  size: 23,
                  fill: "#c7a348",
                  color: "#c7a348"
                }),
                a("strong", null, "+" + L(u.points_value), 1),
                e[4] || (e[4] = a("small", null, "баллов", -1))
              ], 8, se))), 128))
            ], 4),
            e[5] || (e[5] = a("div", { class: "mav-strip-fade mav-strip-fade--left" }, null, -1)),
            e[6] || (e[6] = a("div", { class: "mav-strip-fade mav-strip-fade--right" }, null, -1)),
            e[7] || (e[7] = a("div", {
              class: "mav-strip-pointer",
              "aria-hidden": "true"
            }, null, -1))
          ], 512)
        ]),
        a("button", {
          class: "demo-action",
          disabled: r.value,
          onClick: b
        }, [
          m(h(_), { size: 17 }),
          k(L(r.value ? "Крутим…" : "Крутить рулетку"), 1)
        ], 8, ie),
        a("p", ue, L(g.value), 1)
      ], 512), [
        [$, c.value === "roulette"]
      ]),
      c.value === "profile" ? (x(), C("div", de, [
        e[13] || (e[13] = a("div", { class: "member-avatar" }, "А", -1)),
        e[14] || (e[14] = a("span", null, "Участник сообщества", -1)),
        e[15] || (e[15] = a("h3", null, "Алексей", -1)),
        a("strong", null, [
          k(L(y.value.toLocaleString("ru-RU")) + " ", 1),
          e[9] || (e[9] = a("small", null, "баллов", -1))
        ]),
        a("div", ce, [
          a("span", null, [
            m(h(H)),
            e[10] || (e[10] = k("Первый шаг", -1))
          ]),
          a("span", null, [
            m(h(z)),
            e[11] || (e[11] = k("Коллекционер", -1))
          ]),
          a("span", null, [
            m(h(_)),
            e[12] || (e[12] = k("Исследователь", -1))
          ])
        ]),
        e[16] || (e[16] = a("p", null, "Покрутите рулетку — баланс обновится здесь.", -1))
      ])) : M("", !0),
      e[17] || (e[17] = a("p", { class: "demo-note" }, "Демо-профиль · баллы сохраняются только до обновления страницы", -1))
    ], 2));
  }
}, he = /* @__PURE__ */ W(pe, [["__scopeId", "data-v-216799a6"]]);
export {
  he as default
};
