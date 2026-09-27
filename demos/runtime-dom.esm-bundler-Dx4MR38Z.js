import { z as V, A as G, B as U, C as l, D as C, E as j, G as F, H as W, I as q, J as h, K as $, L as X, M as J, N as T, O as Z, P as M } from "./runtime-core.esm-bundler-Ch0unMqb.js";
/**
* @vue/runtime-dom v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let E;
const N = typeof window < "u" && window.trustedTypes;
if (N)
  try {
    E = /* @__PURE__ */ N.createPolicy("vue", {
      createHTML: (t) => t
    });
  } catch {
  }
const z = E ? (t) => E.createHTML(t) : (t) => t, Q = "http://www.w3.org/2000/svg", Y = "http://www.w3.org/1998/Math/MathML", f = typeof document < "u" ? document : null, _ = f && /* @__PURE__ */ f.createElement("template"), k = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, i) => {
    const s = e === "svg" ? f.createElementNS(Q, t) : e === "mathml" ? f.createElementNS(Y, t) : n ? f.createElement(t, { is: n }) : f.createElement(t);
    return t === "select" && i && i.multiple != null && s.setAttribute("multiple", i.multiple), s;
  },
  createText: (t) => f.createTextNode(t),
  createComment: (t) => f.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => f.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(t, e, n, i, s, r) {
    const o = n ? n.previousSibling : e.lastChild;
    if (s && (s === r || s.nextSibling))
      for (; e.insertBefore(s.cloneNode(!0), n), !(s === r || !(s = s.nextSibling)); )
        ;
    else {
      _.innerHTML = z(
        i === "svg" ? `<svg>${t}</svg>` : i === "mathml" ? `<math>${t}</math>` : t
      );
      const c = _.content;
      if (i === "svg" || i === "mathml") {
        const a = c.firstChild;
        for (; a.firstChild; )
          c.appendChild(a.firstChild);
        c.removeChild(a);
      }
      e.insertBefore(c, n);
    }
    return [
      // first
      o ? o.nextSibling : e.firstChild,
      // last
      n ? n.previousSibling : e.lastChild
    ];
  }
}, tt = /* @__PURE__ */ Symbol("_vtc");
function et(t, e, n) {
  const i = t[tt];
  i && (e = (e ? [e, ...i] : [...i]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
const S = /* @__PURE__ */ Symbol("_vod"), B = /* @__PURE__ */ Symbol("_vsh"), _t = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(t, { value: e }, { transition: n }) {
    t[S] = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : p(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: i }) {
    !e != !n && (i ? e ? (i.beforeEnter(t), p(t, !0), i.enter(t)) : i.leave(t, () => {
      p(t, !1);
    }) : p(t, e));
  },
  beforeUnmount(t, { value: e }) {
    p(t, e);
  }
};
function p(t, e) {
  t.style.display = e ? t[S] : "none", t[B] = !e;
}
const nt = /* @__PURE__ */ Symbol(""), it = /(?:^|;)\s*display\s*:/;
function st(t, e, n) {
  const i = t.style, s = l(n);
  let r = !1;
  if (n && !s) {
    if (e)
      if (l(e))
        for (const o of e.split(";")) {
          const c = o.slice(0, o.indexOf(":")).trim();
          n[c] == null && m(i, c, "");
        }
      else
        for (const o in e)
          n[o] == null && m(i, o, "");
    for (const o in n) {
      o === "display" && (r = !0);
      const c = n[o];
      c != null ? rt(
        t,
        o,
        !l(e) && e ? e[o] : void 0,
        c
      ) || m(i, o, c) : m(i, o, "");
    }
  } else if (s) {
    if (e !== n) {
      const o = i[nt];
      o && (n += ";" + o), i.cssText = n, r = it.test(n);
    }
  } else e && t.removeAttribute("style");
  S in t && (t[S] = r ? i.display : "", t[B] && (i.display = "none"));
}
const y = /\s*!important$/;
function m(t, e, n) {
  if (C(n))
    n.forEach((i) => m(t, e, i));
  else if (n == null && (n = ""), e.startsWith("--"))
    t.setProperty(e, n);
  else {
    const i = ot(t, e);
    y.test(n) ? t.setProperty(
      T(i),
      n.replace(y, ""),
      "important"
    ) : t[i] = n;
  }
}
const L = ["Webkit", "Moz", "ms"], v = {};
function ot(t, e) {
  const n = v[e];
  if (n)
    return n;
  let i = h(e);
  if (i !== "filter" && i in t)
    return v[e] = i;
  i = Z(i);
  for (let s = 0; s < L.length; s++) {
    const r = L[s] + i;
    if (r in t)
      return v[e] = r;
  }
  return e;
}
function rt(t, e, n, i) {
  return t.tagName === "TEXTAREA" && (e === "width" || e === "height") && l(i) && n === i;
}
const P = "http://www.w3.org/1999/xlink";
function R(t, e, n, i, s, r = J(e)) {
  i && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(P, e.slice(6, e.length)) : t.setAttributeNS(P, e, n) : n == null || r && !$(n) ? t.removeAttribute(e) : t.setAttribute(
    e,
    r ? "" : X(n) ? String(n) : n
  );
}
function K(t, e, n, i, s) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? z(n) : n);
    return;
  }
  const r = t.tagName;
  if (e === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const c = r === "OPTION" ? t.getAttribute("value") || "" : t.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      t.type === "checkbox" ? "on" : ""
    ) : String(n);
    (c !== a || !("_value" in t)) && (t.value = a), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const c = typeof t[e];
    c === "boolean" ? n = $(n) : n == null && c === "string" ? (n = "", o = !0) : c === "number" && (n = 0, o = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  o && t.removeAttribute(s || e);
}
function d(t, e, n, i) {
  t.addEventListener(e, n, i);
}
function ct(t, e, n, i) {
  t.removeEventListener(e, n, i);
}
const O = /* @__PURE__ */ Symbol("_vei");
function at(t, e, n, i, s = null) {
  const r = t[O] || (t[O] = {}), o = r[e];
  if (i && o)
    o.value = i;
  else {
    const [c, a] = lt(e);
    if (i) {
      const u = r[e] = mt(
        i,
        s
      );
      d(t, c, u, a);
    } else o && (ct(t, c, o, a), r[e] = void 0);
  }
}
const ft = /(Once|Passive|Capture)$/, ut = /^on:?(?:Once|Passive|Capture)$/;
function lt(t) {
  let e, n;
  for (; (n = t.match(ft)) && !ut.test(t); )
    e || (e = {}), t = t.slice(0, t.length - n[1].length), e[n[1].toLowerCase()] = !0;
  return [t[2] === ":" ? t.slice(3) : T(t.slice(2)), e];
}
let w = 0;
const dt = /* @__PURE__ */ Promise.resolve(), pt = () => w || (dt.then(() => w = 0), w = Date.now());
function mt(t, e) {
  const n = (i) => {
    if (!i._vts)
      i._vts = Date.now();
    else if (i._vts <= n.attached)
      return;
    const s = n.value;
    if (C(s)) {
      const r = i.stopImmediatePropagation;
      i.stopImmediatePropagation = () => {
        r.call(i), i._stopped = !0;
      };
      const o = s.slice(), c = [i];
      for (let a = 0; a < o.length && !i._stopped; a++) {
        const u = o[a];
        u && M(
          u,
          e,
          5,
          c
        );
      }
    } else
      M(
        s,
        e,
        5,
        [i]
      );
  };
  return n.value = t, n.attached = pt(), n;
}
const x = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // lowercase letter
t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, ht = (t, e, n, i, s, r) => {
  const o = s === "svg";
  e === "class" ? et(t, i, o) : e === "style" ? st(t, n, i) : W(e) ? q(e) || at(t, e, n, i, r) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : gt(t, e, i, o)) ? (K(t, e, i), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && R(t, e, i, o, r, e !== "value")) : /* #11081 force set props for possible async custom element */ t._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (bt(t, e) || // @ts-expect-error _def is private
  t._def.__asyncLoader && (/[A-Z]/.test(e) || !l(i))) ? K(t, h(e), i, r, e) : (e === "true-value" ? t._trueValue = i : e === "false-value" && (t._falseValue = i), R(t, e, i, o));
};
function gt(t, e, n, i) {
  if (i)
    return !!(e === "innerHTML" || e === "textContent" || e in t && x(e) && V(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t.tagName === "IFRAME" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA")
    return !1;
  if (e === "width" || e === "height") {
    const s = t.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return x(e) && l(n) ? !1 : e in t;
}
function bt(t, e) {
  const n = (
    // @ts-expect-error _def is private
    t._def.props
  );
  if (!n)
    return !1;
  const i = h(e);
  return Array.isArray(n) ? n.some((s) => h(s) === i) : Object.keys(n).some((s) => h(s) === i);
}
const H = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return C(e) ? (n) => j(e, n) : e;
};
function St(t) {
  t.target.composing = !0;
}
function I(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
const g = /* @__PURE__ */ Symbol("_assign"), b = /* @__PURE__ */ Symbol("_initialValue");
function A(t, e, n) {
  return e && (t = t.trim()), n && (t = G(t)), t;
}
const yt = {
  created(t, { modifiers: { lazy: e, trim: n, number: i } }, s) {
    t.parentNode && (t.type === "text" ? t[b] = t.defaultValue.replace(/[\r\n]/g, "") : t.type === "textarea" && (t[b] = t.defaultValue.replace(/\r\n?/g, `
`))), t[g] = H(s);
    const r = i || s.props && s.props.type === "number";
    d(t, e ? "change" : "input", (o) => {
      o.target.composing || t[g](A(t.value, n, r));
    }), (n || r) && d(t, "change", () => {
      t.value = A(t.value, n, r);
    }), e || (d(t, "compositionstart", St), d(t, "compositionend", I), d(t, "change", I));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(t, { value: e, modifiers: { trim: n, number: i } }) {
    const s = e ?? "", r = t[b];
    delete t[b], r !== void 0 && (t.type === "text" || t.type === "textarea") && t.value !== r ? t[g](A(t.value, n, i)) : t.value = s;
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: i, trim: s, number: r } }, o) {
    if (t[g] = H(o), t.composing) return;
    const c = (r || t.type === "number") && !/^0\d/.test(t.value) ? G(t.value) : t.value, a = e ?? "";
    if (c === a)
      return;
    const u = t.getRootNode();
    (u instanceof Document || u instanceof ShadowRoot) && u.activeElement === t && t.type !== "range" && (i && e === n || s && t.value.trim() === a) || (t.value = a);
  }
}, vt = ["ctrl", "shift", "alt", "meta"], wt = {
  stop: (t) => t.stopPropagation(),
  prevent: (t) => t.preventDefault(),
  self: (t) => t.target !== t.currentTarget,
  ctrl: (t) => !t.ctrlKey,
  shift: (t) => !t.shiftKey,
  alt: (t) => !t.altKey,
  meta: (t) => !t.metaKey,
  left: (t) => "button" in t && t.button !== 0,
  middle: (t) => "button" in t && t.button !== 1,
  right: (t) => "button" in t && t.button !== 2,
  exact: (t, e) => vt.some((n) => t[`${n}Key`] && !e.includes(n))
}, Lt = (t, e) => {
  if (!t) return t;
  const n = t._withMods || (t._withMods = {}), i = e.join(".");
  return n[i] || (n[i] = ((s, ...r) => {
    for (let o = 0; o < e.length; o++) {
      const c = wt[e[o]];
      if (c && c(s, e)) return;
    }
    return t(s, ...r);
  }));
}, At = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Pt = (t, e) => {
  const n = t._withKeys || (t._withKeys = {}), i = e.join(".");
  return n[i] || (n[i] = ((s) => {
    if (!("key" in s))
      return;
    const r = T(s.key);
    if (e.some(
      (o) => o === r || At[o] === r
    ))
      return t(s);
  }));
}, Et = /* @__PURE__ */ F({ patchProp: ht }, k);
let D;
function Ct() {
  return D || (D = U(Et));
}
const Rt = ((...t) => {
  const e = Ct().createApp(...t), { mount: n } = e;
  return e.mount = (i) => {
    const s = Mt(i);
    if (!s) return;
    const r = e._component;
    !V(r) && !r.render && !r.template && (r.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const o = n(s, !1, Tt(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), o;
  }, e;
});
function Tt(t) {
  if (t instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement)
    return "mathml";
}
function Mt(t) {
  return l(t) ? document.querySelector(t) : t;
}
export {
  Pt as a,
  yt as b,
  Rt as c,
  _t as v,
  Lt as w
};
