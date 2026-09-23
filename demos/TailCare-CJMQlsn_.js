import { k as q, j as d, c as n, B as x, x as C, l as A, f as N, b as e, t as u, h as I, e as _, p as M, d as m, u as h, F as $, w as K, C as P, g as S, r as y, y as j, i as T } from "./mount-D_cTBYQE.js";
import { c as k, _ as L } from "./_plugin-vue_export-helper-D7VY89rh.js";
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H = k("ArrowLeftIcon", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Z = k("HeartIcon", [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const D = k("PawPrintIcon", [
  ["circle", { cx: "11", cy: "4", r: "2", key: "vol9p0" }],
  ["circle", { cx: "18", cy: "8", r: "2", key: "17gozi" }],
  ["circle", { cx: "20", cy: "16", r: "2", key: "1v9bxh" }],
  [
    "path",
    {
      d: "M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",
      key: "1ydw1z"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F = k("SearchIcon", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]), E = ["onKeydown"], Q = ["disabled", "aria-label"], U = { class: "dog-card__image" }, G = ["src", "alt"], J = {
  key: 1,
  class: "dog-card__placeholder",
  "aria-hidden": "true"
}, O = { class: "dog-card__body" }, R = { class: "dog-card__topline" }, W = { class: "dog-card__meta" }, X = { class: "dog-card__meta dog-card__meta--time" }, Y = /* @__PURE__ */ q({
  __name: "DogCard",
  props: {
    card: {},
    canModerate: { type: Boolean, default: !1 },
    isDeleting: { type: Boolean, default: !1 }
  },
  emits: ["delete-card", "select"],
  setup(o, { emit: b }) {
    const v = { home_search: "Ищет дом", missed: "Потерялся", found: "Найден" }, c = o, t = b, i = M(() => `dog-card__status--${c.card.category}`), f = M(() => c.card.category === "found" ? "Вчера, 18:02" : c.card.category === "missed" ? "Вчера, 21:47" : c.card.id % 2 === 0 ? "Сегодня, 09:15" : "Сегодня, 10:23");
    function p() {
      t("select", c.card);
    }
    function g() {
      t("delete-card", c.card);
    }
    return (z, r) => (d(), n("article", {
      class: "dog-card",
      role: "button",
      tabindex: "0",
      onClick: p,
      onKeydown: [
        x(p, ["enter"]),
        x(C(p, ["prevent"]), ["space"])
      ]
    }, [
      o.canModerate ? (d(), n("button", {
        key: 0,
        class: "moderation-trash-button moderation-trash-button--card",
        type: "button",
        disabled: o.isDeleting,
        "aria-label": `Удалить карточку ${o.card.name}`,
        title: "Удалить карточку",
        onClick: C(g, ["stop"]),
        onKeydown: r[0] || (r[0] = x(C(() => {
        }, ["stop"]), ["enter"]))
      }, [...r[1] || (r[1] = [
        A('<svg viewBox="0 0 24 24" aria-hidden="true" data-v-9cb1fcd2><path d="M4 7h16" data-v-9cb1fcd2></path><path d="M10 11v6M14 11v6" data-v-9cb1fcd2></path><path d="M6 7l1 14h10l1-14" data-v-9cb1fcd2></path><path d="M9 7V4h6v3" data-v-9cb1fcd2></path></svg>', 1)
      ])], 40, Q)) : N("", !0),
      e("div", U, [
        o.card.preview_photo ? (d(), n("img", {
          key: 0,
          src: o.card.preview_photo.url,
          alt: o.card.name,
          loading: "lazy"
        }, null, 8, G)) : (d(), n("div", J))
      ]),
      e("div", O, [
        e("div", R, [
          e("h3", null, u(o.card.name), 1),
          e("span", {
            class: I(["dog-card__status", i.value])
          }, u(v[o.card.category]), 3)
        ]),
        e("div", W, [
          e("span", null, [
            r[2] || (r[2] = e("svg", {
              viewBox: "0 0 24 24",
              "aria-hidden": "true"
            }, [
              e("path", { d: "M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" }),
              e("circle", {
                cx: "12",
                cy: "9",
                r: "2.5"
              })
            ], -1)),
            _(" " + u(o.card.city.name), 1)
          ])
        ]),
        e("div", X, [
          e("span", null, [
            r[3] || (r[3] = e("svg", {
              viewBox: "0 0 24 24",
              "aria-hidden": "true"
            }, [
              e("circle", {
                cx: "12",
                cy: "12",
                r: "8"
              }),
              e("path", { d: "M12 8v4l3 2" })
            ], -1)),
            _(" " + u(f.value), 1)
          ])
        ])
      ])
    ], 40, E));
  }
}), ee = /* @__PURE__ */ L(Y, [["__scopeId", "data-v-9cb1fcd2"]]), ae = { class: "demo-topbar" }, te = { class: "demo-wordmark" }, se = { class: "pet-search" }, oe = {
  class: "pet-filters",
  "aria-label": "Статус объявления"
}, le = ["aria-pressed", "onClick"], de = {
  key: 0,
  class: "pet-grid"
}, ce = {
  key: 1,
  class: "pet-empty"
}, ne = {
  key: 1,
  class: "pet-detail"
}, re = { class: "pet-detail-content" }, ie = ["src", "alt"], ue = ["aria-pressed"], ve = {
  __name: "TailCare",
  props: { compact: Boolean },
  setup(o) {
    const b = o, v = y("all"), c = y(""), t = y(null), i = y(/* @__PURE__ */ new Set()), f = y(), p = [["Луна", "luna", "home_search", "2 года · спокойная, любит прогулки"], ["Тоша", "tosha", "home_search", "1 год · добрый и очень контактный"], ["Рэй", "rey", "missed", "3 года · потерялся возле парка"], ["Майя", "maya", "found", "4 года · найдена у остановки"]].map(([s, a, l, w], B) => ({ id: B + 1, name: s, category: l, description: w, city: { name: "Алматы" }, preview_photo: { url: `/assets/demos/riyadom-${a}.jpg` } })), g = M(() => p.filter((s) => (v.value === "all" || s.category === v.value) && s.name.toLowerCase().includes(c.value.toLowerCase())).slice(0, b.compact ? 2 : 4));
    async function z(s) {
      var a;
      t.value = s, await T(), (a = f.value) == null || a.focus();
    }
    function r() {
      const s = new Set(i.value);
      s.has(t.value.id) ? s.delete(t.value.id) : s.add(t.value.id), i.value = s;
    }
    async function V() {
      var a;
      const s = t.value.id;
      t.value = null, await T(), (a = document.querySelector(`[data-pet-id="${s}"]`)) == null || a.focus();
    }
    return (s, a) => (d(), n("div", {
      class: I(["tailcare-demo", { compact: o.compact }])
    }, [
      e("header", ae, [
        e("span", te, [
          a[2] || (a[2] = _("TailCare ", -1)),
          m(h(D), { size: 19 })
        ]),
        e("small", null, u(i.value.size ? `В избранном: ${i.value.size}` : "Помощь рядом"), 1)
      ]),
      t.value ? (d(), n("div", ne, [
        e("button", {
          ref_key: "back",
          ref: f,
          class: "pet-back",
          onClick: V
        }, [
          m(h(H), { size: 15 }),
          a[4] || (a[4] = _(" К каталогу", -1))
        ], 512),
        e("div", re, [
          e("img", {
            src: t.value.preview_photo.url,
            alt: t.value.name
          }, null, 8, ie),
          e("div", null, [
            a[5] || (a[5] = e("span", null, "Алматы · Демо-объявление", -1)),
            e("h3", null, u(t.value.name), 1),
            e("p", null, u(t.value.description), 1),
            e("button", {
              class: "demo-action",
              "aria-pressed": i.value.has(t.value.id),
              onClick: r
            }, [
              m(h(Z), {
                size: 16,
                fill: i.value.has(t.value.id) ? "currentColor" : "none"
              }, null, 8, ["fill"]),
              _(u(i.value.has(t.value.id) ? "В избранном" : "Сохранить"), 1)
            ], 8, ue)
          ])
        ])
      ])) : (d(), n($, { key: 0 }, [
        e("div", se, [
          m(h(F), { size: 17 }),
          K(e("input", {
            "onUpdate:modelValue": a[0] || (a[0] = (l) => c.value = l),
            "aria-label": "Имя питомца",
            placeholder: "Найти друга по имени"
          }, null, 512), [
            [P, c.value]
          ])
        ]),
        e("div", oe, [
          (d(), n($, null, S([["all", "Все"], ["home_search", "Ищут дом"], ["missed", "Потерялись"], ["found", "Найдены"]], ([l, w]) => e("button", {
            key: l,
            "aria-pressed": v.value === l,
            onClick: (B) => v.value = l
          }, u(w), 9, le)), 64))
        ]),
        g.value.length ? (d(), n("div", de, [
          (d(!0), n($, null, S(g.value, (l) => (d(), j(ee, {
            key: l.id,
            card: l,
            "data-pet-id": l.id,
            onSelect: z
          }, null, 8, ["card", "data-pet-id"]))), 128))
        ])) : (d(), n("div", ce, [
          m(h(D), { size: 35 }),
          a[3] || (a[3] = e("p", null, "Никого не нашли. Попробуйте другое имя.", -1)),
          e("button", {
            class: "demo-action",
            onClick: a[1] || (a[1] = (l) => {
              c.value = "", v.value = "all";
            })
          }, "Сбросить поиск")
        ]))
      ], 64)),
      a[6] || (a[6] = e("p", { class: "demo-note" }, "Поиск, фильтры и избранное работают прямо здесь", -1))
    ], 2));
  }
}, he = /* @__PURE__ */ L(ve, [["__scopeId", "data-v-4810e256"]]);
export {
  he as default
};
