/**
* @vue/shared v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Kn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const B = {}, et = [], Ee = () => {
}, qs = () => !1, nn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), sn = (e) => e.startsWith("onUpdate:"), ee = Object.assign, Vn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, kr = Object.prototype.hasOwnProperty, $ = (e, t) => kr.call(e, t), R = Array.isArray, tt = (e) => At(e) === "[object Map]", Gs = (e) => At(e) === "[object Set]", ps = (e) => At(e) === "[object Date]", I = (e) => typeof e == "function", Y = (e) => typeof e == "string", Ae = (e) => typeof e == "symbol", K = (e) => e !== null && typeof e == "object", Js = (e) => (K(e) || I(e)) && I(e.then) && I(e.catch), Ys = Object.prototype.toString, At = (e) => Ys.call(e), ei = (e) => At(e).slice(8, -1), zs = (e) => At(e) === "[object Object]", Un = (e) => Y(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, mt = /* @__PURE__ */ Kn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), rn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, ti = /-\w/g, oe = rn(
  (e) => e.replace(ti, (t) => t.slice(1).toUpperCase())
), ni = /\B([A-Z])/g, Ve = rn(
  (e) => e.replace(ni, "-$1").toLowerCase()
), on = rn((e) => e.charAt(0).toUpperCase() + e.slice(1)), _n = rn(
  (e) => e ? `on${on(e)}` : ""
), Te = (e, t) => !Object.is(e, t), Ut = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Xs = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Wn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let gs;
const ln = () => gs || (gs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Bn(e) {
  if (R(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = Y(s) ? oi(s) : Bn(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (Y(e) || K(e))
    return e;
}
const si = /;(?![^(]*\))/g, ri = /:([^]+)/, ii = /\/\*[^]*?\*\//g;
function oi(e) {
  const t = {};
  return e.replace(ii, "").split(si).forEach((n) => {
    if (n) {
      const s = n.split(ri);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function qn(e) {
  let t = "";
  if (Y(e))
    t = e;
  else if (R(e))
    for (let n = 0; n < e.length; n++) {
      const s = qn(e[n]);
      s && (t += s + " ");
    }
  else if (K(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const li = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", fi = /* @__PURE__ */ Kn(li);
function Zs(e) {
  return !!e || e === "";
}
function ci(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = Gn(e[s], t[s]);
  return n;
}
function Gn(e, t) {
  if (e === t) return !0;
  let n = ps(e), s = ps(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = Ae(e), s = Ae(t), n || s)
    return e === t;
  if (n = R(e), s = R(t), n || s)
    return n && s ? ci(e, t) : !1;
  if (n = K(e), s = K(t), n || s) {
    if (!n || !s)
      return !1;
    const r = Object.keys(e).length, i = Object.keys(t).length;
    if (r !== i)
      return !1;
    for (const o in e) {
      const l = e.hasOwnProperty(o), c = t.hasOwnProperty(o);
      if (l && !c || !l && c || !Gn(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
const Qs = (e) => !!(e && e.__v_isRef === !0), ui = (e) => Y(e) ? e : e == null ? "" : R(e) || K(e) && (e.toString === Ys || !I(e.toString)) ? Qs(e) ? ui(e.value) : JSON.stringify(e, ks, 2) : String(e), ks = (e, t) => Qs(t) ? ks(e, t.value) : tt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[bn(s, i) + " =>"] = r, n),
    {}
  )
} : Gs(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => bn(n))
} : Ae(t) ? bn(t) : K(t) && !R(t) && !zs(t) ? String(t) : t, bn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ae(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Z;
class ai {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && Z && (Z.active ? (this.parent = Z, this.index = (Z.scopes || (Z.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) {
        const s = this.scopes.slice();
        for (t = 0, n = s.length; t < n; t++)
          s[t].pause();
      }
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) {
        const r = this.scopes.slice();
        for (t = 0, n = r.length; t < n; t++)
          r[t].resume();
      }
      const s = this.effects.slice();
      for (t = 0, n = s.length; t < n; t++)
        s[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Z;
      try {
        return Z = this, t();
      } finally {
        Z = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Z, Z = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Z === this)
        Z = this.prevScope;
      else {
        let t = Z;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        const r = this.scopes.slice();
        for (n = 0, s = r.length; n < s; n++)
          r[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function di() {
  return Z;
}
let G;
const yn = /* @__PURE__ */ new WeakSet();
class er {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Z && (Z.active ? Z.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, yn.has(this) && (yn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || nr(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ms(this), sr(this);
    const t = G, n = he;
    G = this, he = !0;
    try {
      return this.fn();
    } finally {
      rr(this), G = t, he = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        zn(t);
      this.deps = this.depsTail = void 0, ms(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? yn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Pn(this) && this.run();
  }
  get dirty() {
    return Pn(this);
  }
}
let tr = 0, _t, bt;
function nr(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = bt, bt = e;
    return;
  }
  e.next = _t, _t = e;
}
function Jn() {
  tr++;
}
function Yn() {
  if (--tr > 0)
    return;
  if (bt) {
    let t = bt;
    for (bt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; _t; ) {
    let t = _t;
    for (_t = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function sr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function rr(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), zn(s), hi(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Pn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ir(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ir(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === St) || (e.globalVersion = St, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Pn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = G, s = he;
  G = e, he = !0;
  try {
    sr(e);
    const r = e.fn(e._value);
    (t.version === 0 || Te(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    G = n, he = s, rr(e), e.flags &= -3;
  }
}
function zn(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      zn(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function hi(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let he = !0;
const or = [];
function De() {
  or.push(he), he = !1;
}
function Ne() {
  const e = or.pop();
  he = e === void 0 ? !0 : e;
}
function ms(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = G;
    G = void 0;
    try {
      t();
    } finally {
      G = n;
    }
  }
}
let St = 0;
class pi {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Xn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!G || !he || G === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== G)
      n = this.activeLink = new pi(G, this), G.deps ? (n.prevDep = G.depsTail, G.depsTail.nextDep = n, G.depsTail = n) : G.deps = G.depsTail = n, lr(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = G.depsTail, n.nextDep = void 0, G.depsTail.nextDep = n, G.depsTail = n, G.deps === n && (G.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, St++, this.notify(t);
  }
  notify(t) {
    Jn();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Yn();
    }
  }
}
function lr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        lr(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Rn = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ Symbol(
  ""
), In = /* @__PURE__ */ Symbol(
  ""
), wt = /* @__PURE__ */ Symbol(
  ""
);
function te(e, t, n) {
  if (he && G) {
    let s = Rn.get(e);
    s || Rn.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new Xn()), r.map = s, r.key = n), r.track();
  }
}
function Ie(e, t, n, s, r, i) {
  const o = Rn.get(e);
  if (!o) {
    St++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Jn(), t === "clear")
    o.forEach(l);
  else {
    const c = R(e), d = c && Un(n);
    if (c && n === "length") {
      const a = Number(s);
      o.forEach((p, C) => {
        (C === "length" || C === wt || !Ae(C) && C >= a) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(wt)), t) {
        case "add":
          c ? d && l(o.get("length")) : (l(o.get(Ye)), tt(e) && l(o.get(In)));
          break;
        case "delete":
          c || (l(o.get(Ye)), tt(e) && l(o.get(In)));
          break;
        case "set":
          tt(e) && l(o.get(Ye));
          break;
      }
  }
  Yn();
}
function Ze(e) {
  const t = /* @__PURE__ */ L(e);
  return t === e ? t : (te(t, "iterate", wt), /* @__PURE__ */ de(e) ? t : t.map(pe));
}
function fn(e) {
  return te(e = /* @__PURE__ */ L(e), "iterate", wt), e;
}
function we(e, t) {
  return /* @__PURE__ */ He(e) ? rt(/* @__PURE__ */ ze(e) ? pe(t) : t) : pe(t);
}
const gi = {
  __proto__: null,
  [Symbol.iterator]() {
    return vn(this, Symbol.iterator, (e) => we(this, e));
  },
  concat(...e) {
    return Ze(this).concat(
      ...e.map((t) => R(t) ? Ze(t) : t)
    );
  },
  entries() {
    return vn(this, "entries", (e) => (e[1] = we(this, e[1]), e));
  },
  every(e, t) {
    return Oe(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Oe(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => we(this, s)),
      arguments
    );
  },
  find(e, t) {
    return Oe(
      this,
      "find",
      e,
      t,
      (n) => we(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Oe(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Oe(
      this,
      "findLast",
      e,
      t,
      (n) => we(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Oe(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Oe(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return xn(this, "includes", e);
  },
  indexOf(...e) {
    return xn(this, "indexOf", e);
  },
  join(e) {
    return Ze(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return xn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Oe(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return at(this, "pop");
  },
  push(...e) {
    return at(this, "push", e);
  },
  reduce(e, ...t) {
    return _s(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return _s(this, "reduceRight", e, t);
  },
  shift() {
    return at(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Oe(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return at(this, "splice", e);
  },
  toReversed() {
    return Ze(this).toReversed();
  },
  toSorted(e) {
    return Ze(this).toSorted(e);
  },
  toSpliced(...e) {
    return Ze(this).toSpliced(...e);
  },
  unshift(...e) {
    return at(this, "unshift", e);
  },
  values() {
    return vn(this, "values", (e) => we(this, e));
  }
};
function vn(e, t, n) {
  const s = fn(e), r = s[t]();
  return s !== e && !/* @__PURE__ */ de(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.done || (i.value = n(i.value)), i;
  }), r;
}
const mi = Array.prototype;
function Oe(e, t, n, s, r, i) {
  const o = fn(e), l = o !== e && !/* @__PURE__ */ de(e), c = o[t];
  if (c !== mi[t]) {
    const p = c.apply(e, i);
    return l ? pe(p) : p;
  }
  let d = n;
  o !== e && (l ? d = function(p, C) {
    return n.call(this, we(e, p), C, e);
  } : n.length > 2 && (d = function(p, C) {
    return n.call(this, p, C, e);
  }));
  const a = c.call(o, d, s);
  return l && r ? r(a) : a;
}
function _s(e, t, n, s) {
  const r = fn(e), i = r !== e && !/* @__PURE__ */ de(e);
  let o = n, l = !1;
  r !== e && (i ? (l = s.length === 0, o = function(d, a, p) {
    return l && (l = !1, d = we(e, d)), n.call(this, d, we(e, a), p, e);
  }) : n.length > 3 && (o = function(d, a, p) {
    return n.call(this, d, a, p, e);
  }));
  const c = r[t](o, ...s);
  return l ? we(e, c) : c;
}
function xn(e, t, n) {
  const s = /* @__PURE__ */ L(e);
  te(s, "iterate", wt);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ es(n[0]) ? (n[0] = /* @__PURE__ */ L(n[0]), s[t](...n)) : r;
}
function at(e, t, n = []) {
  De(), Jn();
  const s = (/* @__PURE__ */ L(e))[t].apply(e, n);
  return Yn(), Ne(), s;
}
const _i = /* @__PURE__ */ Kn("__proto__,__v_isRef,__isVue"), fr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ae)
);
function bi(e) {
  Ae(e) || (e = String(e));
  const t = /* @__PURE__ */ L(this);
  return te(t, "has", e), t.hasOwnProperty(e);
}
class cr {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return s === (r ? i ? Oi : hr : i ? dr : ar).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = R(t);
    if (!r) {
      let c;
      if (o && (c = gi[n]))
        return c;
      if (n === "hasOwnProperty")
        return bi;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ ne(t) ? t : s
    );
    if ((Ae(n) ? fr.has(n) : _i(n)) || (r || te(t, "get", n), i))
      return l;
    if (/* @__PURE__ */ ne(l)) {
      const c = o && Un(n) ? l : l.value;
      return r && K(c) ? /* @__PURE__ */ Dn(c) : c;
    }
    return K(l) ? r ? /* @__PURE__ */ Dn(l) : /* @__PURE__ */ Qn(l) : l;
  }
}
class ur extends cr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    const o = R(t) && Un(n);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ He(i);
      if (!/* @__PURE__ */ de(s) && !/* @__PURE__ */ He(s) && (i = /* @__PURE__ */ L(i), s = /* @__PURE__ */ L(s)), !o && /* @__PURE__ */ ne(i) && !/* @__PURE__ */ ne(s))
        return d || (i.value = s), !0;
    }
    const l = o ? Number(n) < t.length : $(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ ne(t) ? t : r
    );
    return t === /* @__PURE__ */ L(r) && c && (l ? Te(s, i) && Ie(t, "set", n, s) : Ie(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = $(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Ie(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Ae(n) || !fr.has(n)) && te(t, "has", n), s;
  }
  ownKeys(t) {
    return te(
      t,
      "iterate",
      R(t) ? "length" : Ye
    ), Reflect.ownKeys(t);
  }
}
class yi extends cr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const vi = /* @__PURE__ */ new ur(), xi = /* @__PURE__ */ new yi(), Si = /* @__PURE__ */ new ur(!0);
const Fn = (e) => e, Ht = (e) => Reflect.getPrototypeOf(e);
function wi(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = /* @__PURE__ */ L(r), o = tt(i), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, d = r[e](...s), a = n ? Fn : t ? rt : pe;
    return !t && te(
      i,
      "iterate",
      c ? In : Ye
    ), ee(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: p, done: C } = d.next();
          return C ? { value: p, done: C } : {
            value: l ? [a(p[0]), a(p[1])] : a(p),
            done: C
          };
        }
      }
    );
  };
}
function jt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ci(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ L(i), l = /* @__PURE__ */ L(r);
      e || (Te(r, l) && te(o, "get", r), te(o, "get", l));
      const { has: c } = Ht(o), d = t ? Fn : e ? rt : pe;
      if (c.call(o, r))
        return d(i.get(r));
      if (c.call(o, l))
        return d(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && te(/* @__PURE__ */ L(r), "iterate", Ye), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ L(i), l = /* @__PURE__ */ L(r);
      return e || (Te(r, l) && te(o, "has", r), te(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ L(l), d = t ? Fn : e ? rt : pe;
      return !e && te(c, "iterate", Ye), l.forEach((a, p) => r.call(i, d(a), d(p), o));
    }
  };
  return ee(
    n,
    e ? {
      add: jt("add"),
      set: jt("set"),
      delete: jt("delete"),
      clear: jt("clear")
    } : {
      add(r) {
        const i = /* @__PURE__ */ L(this), o = Ht(i), l = /* @__PURE__ */ L(r), c = !t && !/* @__PURE__ */ de(r) && !/* @__PURE__ */ He(r) ? l : r;
        return o.has.call(i, c) || Te(r, c) && o.has.call(i, r) || Te(l, c) && o.has.call(i, l) || (i.add(c), Ie(i, "add", c, c)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ de(i) && !/* @__PURE__ */ He(i) && (i = /* @__PURE__ */ L(i));
        const o = /* @__PURE__ */ L(this), { has: l, get: c } = Ht(o);
        let d = l.call(o, r);
        d || (r = /* @__PURE__ */ L(r), d = l.call(o, r));
        const a = c.call(o, r);
        return o.set(r, i), d ? Te(i, a) && Ie(o, "set", r, i) : Ie(o, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ L(this), { has: o, get: l } = Ht(i);
        let c = o.call(i, r);
        c || (r = /* @__PURE__ */ L(r), c = o.call(i, r)), l && l.call(i, r);
        const d = i.delete(r);
        return c && Ie(i, "delete", r, void 0), d;
      },
      clear() {
        const r = /* @__PURE__ */ L(this), i = r.size !== 0, o = r.clear();
        return i && Ie(
          r,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = wi(r, e, t);
  }), n;
}
function Zn(e, t) {
  const n = Ci(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    $(n, r) && r in s ? n : s,
    r,
    i
  );
}
const Ti = {
  get: /* @__PURE__ */ Zn(!1, !1)
}, Ei = {
  get: /* @__PURE__ */ Zn(!1, !0)
}, Ai = {
  get: /* @__PURE__ */ Zn(!0, !1)
};
const ar = /* @__PURE__ */ new WeakMap(), dr = /* @__PURE__ */ new WeakMap(), hr = /* @__PURE__ */ new WeakMap(), Oi = /* @__PURE__ */ new WeakMap();
function Mi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function Qn(e) {
  return /* @__PURE__ */ He(e) ? e : kn(
    e,
    !1,
    vi,
    Ti,
    ar
  );
}
// @__NO_SIDE_EFFECTS__
function Pi(e) {
  return kn(
    e,
    !1,
    Si,
    Ei,
    dr
  );
}
// @__NO_SIDE_EFFECTS__
function Dn(e) {
  return kn(
    e,
    !0,
    xi,
    Ai,
    hr
  );
}
function kn(e, t, n, s, r) {
  if (!K(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = Mi(ei(e));
  if (o === 0)
    return e;
  const l = new Proxy(
    e,
    o === 2 ? s : n
  );
  return r.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function ze(e) {
  return /* @__PURE__ */ He(e) ? /* @__PURE__ */ ze(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function He(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function de(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function es(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function L(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ L(t) : e;
}
function Ri(e) {
  return !$(e, "__v_skip") && Object.isExtensible(e) && Xs(e, "__v_skip", !0), e;
}
const pe = (e) => K(e) ? /* @__PURE__ */ Qn(e) : e, rt = (e) => K(e) ? /* @__PURE__ */ Dn(e) : e;
// @__NO_SIDE_EFFECTS__
function ne(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function Sn(e) {
  return Ii(e, !1);
}
function Ii(e, t) {
  return /* @__PURE__ */ ne(e) ? e : new Fi(e, t);
}
class Fi {
  constructor(t, n) {
    this.dep = new Xn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ L(t), this._value = n ? t : pe(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ de(t) || /* @__PURE__ */ He(t);
    t = s ? t : /* @__PURE__ */ L(t), Te(t, n) && (this._rawValue = t, this._value = s ? t : pe(t), this.dep.trigger());
  }
}
function Di(e) {
  return /* @__PURE__ */ ne(e) ? e.value : e;
}
const Ni = {
  get: (e, t, n) => t === "__v_raw" ? e : Di(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return /* @__PURE__ */ ne(r) && !/* @__PURE__ */ ne(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function pr(e) {
  return /* @__PURE__ */ ze(e) ? e : new Proxy(e, Ni);
}
class Hi {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Xn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = St - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    G !== this)
      return nr(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ir(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function ji(e, t, n = !1) {
  let s, r;
  return I(e) ? s = e : (s = e.get, r = e.set), new Hi(s, r, n);
}
const Lt = {}, Gt = /* @__PURE__ */ new WeakMap();
let Je;
function Li(e, t = !1, n = Je) {
  if (n) {
    let s = Gt.get(n);
    s || Gt.set(n, s = []), s.push(e);
  }
}
function $i(e, t, n = B) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = n, d = (E) => r ? E : /* @__PURE__ */ de(E) || r === !1 || r === 0 ? Fe(E, 1) : Fe(E);
  let a, p, C, T, O = !1, S = !1;
  if (/* @__PURE__ */ ne(e) ? (p = () => e.value, O = /* @__PURE__ */ de(e)) : /* @__PURE__ */ ze(e) ? (p = () => d(e), O = !0) : R(e) ? (S = !0, O = e.some((E) => /* @__PURE__ */ ze(E) || /* @__PURE__ */ de(E)), p = () => e.map((E) => {
    if (/* @__PURE__ */ ne(E))
      return E.value;
    if (/* @__PURE__ */ ze(E))
      return d(E);
    if (I(E))
      return c ? c(E, 2) : E();
  })) : I(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (C) {
      De();
      try {
        C();
      } finally {
        Ne();
      }
    }
    const E = Je;
    Je = a;
    try {
      return c ? c(e, 3, [T]) : e(T);
    } finally {
      Je = E;
    }
  } : p = Ee, t && r) {
    const E = p, N = r === !0 ? 1 / 0 : r;
    p = () => Fe(E(), N);
  }
  const V = di(), H = () => {
    a.stop(), V && V.active && Vn(V.effects, a);
  };
  if (i && t) {
    const E = t;
    t = (...N) => {
      const ae = E(...N);
      return H(), ae;
    };
  }
  let F = S ? new Array(e.length).fill(Lt) : Lt;
  const D = (E) => {
    if (!(!(a.flags & 1) || !a.dirty && !E))
      if (t) {
        const N = a.run();
        if (E || r || O || (S ? N.some((ae, me) => Te(ae, F[me])) : Te(N, F))) {
          C && C();
          const ae = Je;
          Je = a;
          try {
            const me = [
              N,
              // pass undefined as the old value when it's changed for the first time
              F === Lt ? void 0 : S && F[0] === Lt ? [] : F,
              T
            ];
            F = N, c ? c(t, 3, me) : (
              // @ts-expect-error
              t(...me)
            );
          } finally {
            Je = ae;
          }
        }
      } else
        a.run();
  };
  return l && l(D), a = new er(p), a.scheduler = o ? () => o(D, !1) : D, T = (E) => Li(E, !1, a), C = a.onStop = () => {
    const E = Gt.get(a);
    if (E) {
      if (c)
        c(E, 4);
      else
        for (const N of E) N();
      Gt.delete(a);
    }
  }, t ? s ? D(!0) : F = a.run() : o ? o(D.bind(null, !0), !0) : a.run(), H.pause = a.pause.bind(a), H.resume = a.resume.bind(a), H.stop = H, H;
}
function Fe(e, t = 1 / 0, n) {
  if (t <= 0 || !K(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ ne(e))
    Fe(e.value, t, n);
  else if (R(e))
    for (let s = 0; s < e.length; s++)
      Fe(e[s], t, n);
  else if (Gs(e) || tt(e))
    e.forEach((s) => {
      Fe(s, t, n);
    });
  else if (zs(e)) {
    for (const s in e)
      Fe(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Fe(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Ot(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Mt(r, t, n);
  }
}
function ge(e, t, n, s) {
  if (I(e)) {
    const r = Ot(e, t, n, s);
    return r && Js(r) && r.catch((i) => {
      Mt(i, t, n);
    }), r;
  }
  if (R(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(ge(e[i], t, n, s));
    return r;
  }
}
function Mt(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || B;
  if (t) {
    let l = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, c, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      De(), Ot(i, null, 10, [
        e,
        c,
        d
      ]), Ne();
      return;
    }
  }
  Ki(e, n, r, s, o);
}
function Ki(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const ie = [];
let Se = -1;
const nt = [];
let Ke = null, Qe = 0;
const gr = /* @__PURE__ */ Promise.resolve();
let Jt = null;
function Vi(e) {
  const t = Jt || gr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ui(e) {
  let t = Se + 1, n = ie.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = ie[s], i = Ct(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ts(e) {
  if (!(e.flags & 1)) {
    const t = Ct(e), n = ie[ie.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Ct(n) ? ie.push(e) : ie.splice(Ui(t), 0, e), e.flags |= 1, mr();
  }
}
function mr() {
  Jt || (Jt = gr.then(br));
}
function Wi(e) {
  if (!R(e))
    Ke && e.id === -1 ? Ke.splice(Qe + 1, 0, e) : e.flags & 1 || (nt.push(e), e.flags |= 1);
  else
    for (let t = 0; t < e.length; t++)
      nt.push(e[t]);
  mr();
}
function bs(e, t, n = Se + 1) {
  for (; n < ie.length; n++) {
    const s = ie[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      ie.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function _r(e) {
  if (nt.length) {
    const t = [...new Set(nt)].sort(
      (n, s) => Ct(n) - Ct(s)
    );
    if (nt.length = 0, Ke) {
      for (let n = 0; n < t.length; n++)
        Ke.push(t[n]);
      return;
    }
    for (Ke = t, Qe = 0; Qe < Ke.length; Qe++) {
      const n = Ke[Qe];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    Ke = null, Qe = 0;
  }
}
const Ct = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function br(e) {
  try {
    for (Se = 0; Se < ie.length; Se++) {
      const t = ie[Se];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Ot(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Se < ie.length; Se++) {
      const t = ie[Se];
      t && (t.flags &= -2);
    }
    Se = -1, ie.length = 0, _r(), Jt = null, (ie.length || nt.length) && br();
  }
}
let ce = null, yr = null;
function Yt(e) {
  const t = ce;
  return ce = e, yr = e && e.type.__scopeId || null, t;
}
function Bi(e, t = ce, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Zt(-1);
    const i = Yt(t), o = Xe.length;
    let l;
    try {
      l = e(...r);
    } finally {
      for (let c = Xe.length; c > o; c--) Vr();
      Yt(i), s._d && Zt(1);
    }
    return l;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Hl(e, t) {
  if (ce === null)
    return e;
  const n = pn(ce), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, c = B] = t[r];
    i && (I(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Fe(o), s.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function qe(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let c = l.dir[s];
    c && (De(), ge(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Ne());
  }
}
function qi(e, t) {
  if (Q) {
    let n = Q.provides;
    const s = Q.parent && Q.parent.provides;
    s === n && (n = Q.provides = Object.create(s)), n[e] = t;
  }
}
function Wt(e, t, n = !1) {
  const s = qr();
  if (s || st) {
    let r = st ? st._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && I(t) ? t.call(s && s.proxy) : t;
  }
}
const Gi = /* @__PURE__ */ Symbol.for("v-scx"), Ji = () => Wt(Gi);
function jl(e, t) {
  return ns(e, null, t);
}
function wn(e, t, n) {
  return ns(e, t, n);
}
function ns(e, t, n = B) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = ee({}, n), c = t && s || !t && i !== "post";
  let d;
  if (ot) {
    if (i === "sync") {
      const T = Ji();
      d = T.__watcherHandles || (T.__watcherHandles = []);
    } else if (!c) {
      const T = () => {
      };
      return T.stop = Ee, T.resume = Ee, T.pause = Ee, T;
    }
  }
  const a = Q;
  l.call = (T, O, S) => ge(T, a, O, S);
  let p = !1;
  i === "post" ? l.scheduler = (T) => {
    le(T, a && a.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (T, O) => {
    O ? T() : ts(T);
  }), l.augmentJob = (T) => {
    t && (T.flags |= 4), p && (T.flags |= 2, a && (T.id = a.uid, T.i = a));
  };
  const C = $i(e, t, l);
  return ot && (d ? d.push(C) : c && C()), C;
}
function Yi(e, t, n) {
  const s = this.proxy, r = Y(e) ? e.includes(".") ? vr(s, e) : () => s[e] : e.bind(s, s);
  let i;
  I(t) ? i = t : (i = t.handler, n = t);
  const o = Pt(this), l = ns(r, i.bind(s), n);
  return o(), l;
}
function vr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const zi = /* @__PURE__ */ Symbol("_vte"), cn = (e) => e.__isTeleport, Cn = /* @__PURE__ */ Symbol("_leaveCb");
function Xi(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== je) {
        t = n;
        break;
      }
  }
  return t;
}
function xr(e) {
  if (!un(e))
    return cn(e.type) && e.children ? Xi(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && I(n.default))
      return n.default();
  }
}
function ss(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    ss(
      cn(n.type) && xr(n) || n,
      t
    );
  } else e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Zi(e, t) {
  return I(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ee({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ll() {
  const e = qr();
  return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : "";
}
function rs(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ys(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const zt = /* @__PURE__ */ new WeakMap();
function yt(e, t, n, s, r = !1) {
  if (R(e)) {
    e.forEach(
      (S, V) => yt(
        S,
        t && (R(t) ? t[V] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (vt(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && yt(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? pn(s.component) : s.el, o = r ? null : i, { i: l, r: c } = e, d = t && t.r, a = l.refs === B ? l.refs = {} : l.refs, p = l.setupState, C = /* @__PURE__ */ L(p), T = p === B ? qs : (S) => ys(a, S) ? !1 : $(C, S), O = (S, V) => !(V && ys(a, V));
  if (d != null && d !== c) {
    if (vs(t), Y(d))
      a[d] = null, T(d) && (p[d] = null);
    else if (/* @__PURE__ */ ne(d)) {
      const S = t;
      O(d, S.k) && (d.value = null), S.k && (a[S.k] = null);
    }
  }
  if (I(c))
    Ot(c, l, 12, [o, a]);
  else {
    const S = Y(c), V = /* @__PURE__ */ ne(c);
    if (S || V) {
      const H = () => {
        if (e.f) {
          const F = S ? T(c) ? p[c] : a[c] : O() || !e.k ? c.value : a[e.k];
          if (r)
            R(F) && Vn(F, i);
          else if (R(F))
            F.includes(i) || F.push(i);
          else if (S)
            a[c] = [i], T(c) && (p[c] = a[c]);
          else {
            const D = [i];
            O(c, e.k) && (c.value = D), e.k && (a[e.k] = D);
          }
        } else S ? (a[c] = o, T(c) && (p[c] = o)) : V && (O(c, e.k) && (c.value = o), e.k && (a[e.k] = o));
      };
      if (o) {
        const F = () => {
          H(), zt.delete(e);
        };
        F.id = -1, zt.set(e, F), le(F, n);
      } else
        vs(e), H();
    }
  }
}
function vs(e) {
  const t = zt.get(e);
  t && (t.flags |= 8, zt.delete(e));
}
const xs = (e) => e.nodeType === 8;
ln().requestIdleCallback;
ln().cancelIdleCallback;
function Qi(e, t) {
  if (xs(e) && e.data === "[") {
    let n = 1, s = e.nextSibling;
    for (; s; ) {
      if (s.nodeType === 1) {
        if (t(s) === !1)
          break;
      } else if (xs(s))
        if (s.data === "]") {
          if (--n === 0) break;
        } else s.data === "[" && n++;
      s = s.nextSibling;
    }
  } else
    t(e);
}
const vt = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function $l(e) {
  I(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: s,
    delay: r = 200,
    hydrate: i,
    timeout: o,
    // undefined = never times out
    suspensible: l = !0,
    onError: c
  } = e;
  let d = null, a, p = 0;
  const C = () => (p++, d = null, T()), T = () => {
    let O;
    return d || (O = d = t().catch((S) => {
      if (S = S instanceof Error ? S : new Error(String(S)), c)
        return new Promise((V, H) => {
          c(S, () => V(C()), () => H(S), p + 1);
        });
      throw S;
    }).then((S) => O !== d && d ? d : (S && (S.__esModule || S[Symbol.toStringTag] === "Module") && (S = S.default), a = S, S)));
  };
  return /* @__PURE__ */ Zi({
    name: "AsyncComponentWrapper",
    __asyncLoader: T,
    __asyncHydrate(O, S, V) {
      const H = O.isConnected;
      let F = !1;
      (S.bu || (S.bu = [])).push(() => F = !0);
      const D = () => {
        F || !O.parentNode || H && !O.isConnected || V();
      }, E = i ? () => {
        const N = i(
          D,
          (ae) => Qi(O, ae)
        );
        N && (S.bum || (S.bum = [])).push(N);
      } : D;
      a ? E() : T().then(() => !S.isUnmounted && E());
    },
    get __asyncResolved() {
      return a;
    },
    setup() {
      const O = Q;
      if (rs(O), a)
        return () => $t(a, O);
      const S = (N) => {
        d = null, Mt(
          N,
          O,
          13,
          !s
        );
      };
      if (l && O.suspense || ot)
        return T().then((N) => () => $t(N, O)).catch((N) => (S(N), () => s ? k(s, {
          error: N
        }) : null));
      const V = /* @__PURE__ */ Sn(!1), H = /* @__PURE__ */ Sn(), F = /* @__PURE__ */ Sn(!!r);
      let D, E;
      return is(() => {
        D != null && clearTimeout(D), E != null && clearTimeout(E);
      }), r && (E = setTimeout(() => {
        O.isUnmounted || (F.value = !1);
      }, r)), o != null && (D = setTimeout(() => {
        if (!O.isUnmounted && !V.value && !H.value) {
          const N = new Error(
            `Async component timed out after ${o}ms.`
          );
          S(N), H.value = N;
        }
      }, o)), T().then(() => {
        O.isUnmounted || (V.value = !0, O.parent && un(O.parent.vnode) && O.parent.update());
      }).catch((N) => {
        if (O.isUnmounted) {
          d = null;
          return;
        }
        S(N), H.value = N;
      }), () => {
        if (V.value && a)
          return $t(a, O);
        if (H.value && s)
          return k(s, {
            error: H.value
          });
        if (n && !F.value)
          return $t(
            n,
            O
          );
      };
    }
  });
}
function $t(e, t) {
  const { ref: n, props: s, children: r, ce: i } = t.vnode, o = k(e, s, r);
  return o.ref = n, o.ce = i, delete t.vnode.ce, o;
}
const un = (e) => e.type.__isKeepAlive;
function ki(e, t) {
  Sr(e, "a", t);
}
function eo(e, t) {
  Sr(e, "da", t);
}
function Sr(e, t, n = Q) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (an(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      un(r.parent.vnode) && to(s, t, n, r), r = r.parent;
  }
}
function to(e, t, n, s) {
  const r = an(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  is(() => {
    Vn(s[t], r);
  }, n);
}
function an(e, t, n = Q, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      De();
      const l = Pt(n), c = ge(t, n, e, o);
      return l(), Ne(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Le = (e) => (t, n = Q) => {
  (!ot || e === "sp") && an(e, (...s) => t(...s), n);
}, no = Le("bm"), so = Le("m"), ro = Le(
  "bu"
), io = Le("u"), oo = Le(
  "bum"
), is = Le("um"), lo = Le(
  "sp"
), fo = Le("rtg"), co = Le("rtc");
function uo(e, t = Q) {
  an("ec", e, t);
}
const ao = "components", wr = /* @__PURE__ */ Symbol.for("v-ndc");
function Kl(e) {
  return Y(e) ? ho(ao, e, !1) || e : e || wr;
}
function ho(e, t, n = !0, s = !1) {
  const r = ce || Q;
  if (r) {
    const i = r.type;
    {
      const l = ko(
        i,
        !1
      );
      if (l && (l === t || l === oe(t) || l === on(oe(t))))
        return i;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      Ss(r[e] || i[e], t) || // global registration
      Ss(r.appContext[e], t)
    );
    return !o && s ? i : o;
  }
}
function Ss(e, t) {
  return e && (e[t] || e[oe(t)] || e[on(oe(t))]);
}
function Vl(e, t, n, s) {
  let r;
  const i = n, o = R(e);
  if (o || Y(e)) {
    const l = o && /* @__PURE__ */ ze(e);
    let c = !1, d = !1;
    l && (c = !/* @__PURE__ */ de(e), d = /* @__PURE__ */ He(e), e = fn(e)), r = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      r[a] = t(
        c ? d ? rt(pe(e[a])) : pe(e[a]) : e[a],
        a,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, i);
  } else if (K(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, c) => t(l, c, void 0, i)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, d = l.length; c < d; c++) {
        const a = l[c];
        r[c] = t(e[a], a, c, i);
      }
    }
  else
    r = [];
  return r;
}
const Nn = (e) => e ? Gr(e) ? pn(e) : Nn(e.parent) : null, xt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Nn(e.parent),
    $root: (e) => Nn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Tr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ts(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Vi.bind(e.proxy)),
    $watch: (e) => Yi.bind(e)
  })
), Tn = (e, t) => e !== B && !e.__isScriptSetup && $(e, t), po = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const C = o[t];
      if (C !== void 0)
        switch (C) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (Tn(s, t))
          return o[t] = 1, s[t];
        if (r !== B && $(r, t))
          return o[t] = 2, r[t];
        if ($(i, t))
          return o[t] = 3, i[t];
        if (n !== B && $(n, t))
          return o[t] = 4, n[t];
        Hn && (o[t] = 0);
      }
    }
    const d = xt[t];
    let a, p;
    if (d)
      return t === "$attrs" && te(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== B && $(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, $(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return Tn(r, t) ? (r[t] = n, !0) : s !== B && $(s, t) ? (s[t] = n, !0) : $(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: i, type: o }
  }, l) {
    let c;
    return !!(n[l] || e !== B && l[0] !== "$" && $(e, l) || Tn(t, l) || $(i, l) || $(s, l) || $(xt, l) || $(r.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : $(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function ws(e) {
  return R(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Hn = !0;
function go(e) {
  const t = Tr(e), n = e.proxy, s = e.ctx;
  Hn = !1, t.beforeCreate && Cs(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: c,
    inject: d,
    // lifecycle
    created: a,
    beforeMount: p,
    mounted: C,
    beforeUpdate: T,
    updated: O,
    activated: S,
    deactivated: V,
    beforeDestroy: H,
    beforeUnmount: F,
    destroyed: D,
    unmounted: E,
    render: N,
    renderTracked: ae,
    renderTriggered: me,
    errorCaptured: $e,
    serverPrefetch: Rt,
    // public API
    expose: Ue,
    inheritAttrs: lt,
    // assets
    components: It,
    directives: Ft,
    filters: gn
  } = t;
  if (d && mo(d, s, null), o)
    for (const J in o) {
      const q = o[J];
      I(q) && (s[J] = q.bind(n));
    }
  if (r) {
    const J = r.call(n, n);
    K(J) && (e.data = /* @__PURE__ */ Qn(J));
  }
  if (Hn = !0, i)
    for (const J in i) {
      const q = i[J], We = I(q) ? q.bind(n, n) : I(q.get) ? q.get.bind(n, n) : Ee, Dt = !I(q) && I(q.set) ? q.set.bind(n) : Ee, Be = tl({
        get: We,
        set: Dt
      });
      Object.defineProperty(s, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Be.value,
        set: (_e) => Be.value = _e
      });
    }
  if (l)
    for (const J in l)
      Cr(l[J], s, n, J);
  if (c) {
    const J = I(c) ? c.call(n) : c;
    Reflect.ownKeys(J).forEach((q) => {
      qi(q, J[q]);
    });
  }
  a && Cs(a, e, "c");
  function se(J, q) {
    R(q) ? q.forEach((We) => J(We.bind(n))) : q && J(q.bind(n));
  }
  if (se(no, p), se(so, C), se(ro, T), se(io, O), se(ki, S), se(eo, V), se(uo, $e), se(co, ae), se(fo, me), se(oo, F), se(is, E), se(lo, Rt), R(Ue))
    if (Ue.length) {
      const J = e.exposed || (e.exposed = {});
      Ue.forEach((q) => {
        Object.defineProperty(J, q, {
          get: () => n[q],
          set: (We) => n[q] = We,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  N && e.render === Ee && (e.render = N), lt != null && (e.inheritAttrs = lt), It && (e.components = It), Ft && (e.directives = Ft), Rt && rs(e);
}
function mo(e, t, n = Ee) {
  R(e) && (e = jn(e));
  for (const s in e) {
    const r = e[s];
    let i;
    K(r) ? "default" in r ? i = Wt(
      r.from || s,
      r.default,
      !0
    ) : i = Wt(r.from || s) : i = Wt(r), /* @__PURE__ */ ne(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function Cs(e, t, n) {
  ge(
    R(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Cr(e, t, n, s) {
  let r = s.includes(".") ? vr(n, s) : () => n[s];
  if (Y(e)) {
    const i = t[e];
    I(i) && wn(r, i);
  } else if (I(e))
    wn(r, e.bind(n));
  else if (K(e))
    if (R(e))
      e.forEach((i) => Cr(i, t, n, s));
    else {
      const i = I(e.handler) ? e.handler.bind(n) : t[e.handler];
      I(i) && wn(r, i, e);
    }
}
function Tr(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (d) => Xt(c, d, o, !0)
  ), Xt(c, t, o)), K(t) && i.set(t, c), c;
}
function Xt(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && Xt(e, i, n, !0), r && r.forEach(
    (o) => Xt(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = _o[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const _o = {
  data: Ts,
  props: Es,
  emits: Es,
  // objects
  methods: pt,
  computed: pt,
  // lifecycle
  beforeCreate: re,
  created: re,
  beforeMount: re,
  mounted: re,
  beforeUpdate: re,
  updated: re,
  beforeDestroy: re,
  beforeUnmount: re,
  destroyed: re,
  unmounted: re,
  activated: re,
  deactivated: re,
  errorCaptured: re,
  serverPrefetch: re,
  // assets
  components: pt,
  directives: pt,
  // watch
  watch: yo,
  // provide / inject
  provide: Ts,
  inject: bo
};
function Ts(e, t) {
  return t ? e ? function() {
    return ee(
      I(e) ? e.call(this, this) : e,
      I(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function bo(e, t) {
  return pt(jn(e), jn(t));
}
function jn(e) {
  if (R(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function re(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function pt(e, t) {
  return e ? ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Es(e, t) {
  return e ? R(e) && R(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ee(
    /* @__PURE__ */ Object.create(null),
    ws(e),
    ws(t ?? {})
  ) : t;
}
function yo(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ee(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = re(e[s], t[s]);
  return n;
}
function Er() {
  return {
    app: null,
    config: {
      isNativeTag: qs,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let vo = 0;
function xo(e, t) {
  return function(s, r = null) {
    I(s) || (s = ee({}, s)), r != null && !K(r) && (r = null);
    const i = Er(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const d = i.app = {
      _uid: vo++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: nl,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return o.has(a) || (a && I(a.install) ? (o.add(a), a.install(d, ...p)) : I(a) && (o.add(a), a(d, ...p))), d;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), d;
      },
      component(a, p) {
        return p ? (i.components[a] = p, d) : i.components[a];
      },
      directive(a, p) {
        return p ? (i.directives[a] = p, d) : i.directives[a];
      },
      mount(a, p, C) {
        if (!c) {
          const T = d._ceVNode || k(s, r);
          return T.appContext = i, C === !0 ? C = "svg" : C === !1 && (C = void 0), e(T, a, C), c = !0, d._container = a, a.__vue_app__ = d, pn(T.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (ge(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(a, p) {
        return i.provides[a] = p, d;
      },
      runWithContext(a) {
        const p = st;
        st = d;
        try {
          return a();
        } finally {
          st = p;
        }
      }
    };
    return d;
  };
}
let st = null;
const So = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${oe(t)}Modifiers`] || e[`${Ve(t)}Modifiers`];
function wo(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || B;
  let r = n;
  const i = t.startsWith("update:"), o = i && So(s, t.slice(7));
  o && (o.trim && (r = n.map((a) => Y(a) ? a.trim() : a)), o.number && (r = n.map(Wn)));
  let l, c = s[l = _n(t)] || // also try camelCase event handler (#2249)
  s[l = _n(oe(t))];
  !c && i && (c = s[l = _n(Ve(t))]), c && ge(
    c,
    e,
    6,
    r
  );
  const d = s[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, ge(
      d,
      e,
      6,
      r
    );
  }
}
const Co = /* @__PURE__ */ new WeakMap();
function Ar(e, t, n = !1) {
  const s = n ? Co : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!I(e)) {
    const c = (d) => {
      const a = Ar(d, t, !0);
      a && (l = !0, ee(o, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (K(e) && s.set(e, null), null) : (R(i) ? i.forEach((c) => o[c] = null) : ee(o, i), K(e) && s.set(e, o), o);
}
function dn(e, t) {
  return !e || !nn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), $(e, t[0].toLowerCase() + t.slice(1)) || $(e, Ve(t)) || $(e, t));
}
function As(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: c,
    render: d,
    renderCache: a,
    props: p,
    data: C,
    setupState: T,
    ctx: O,
    inheritAttrs: S
  } = e, V = Yt(e);
  let H, F;
  try {
    if (n.shapeFlag & 4) {
      const E = r || s, N = E;
      H = Ce(
        d.call(
          N,
          E,
          a,
          p,
          T,
          C,
          O
        )
      ), F = l;
    } else {
      const E = t;
      H = Ce(
        E.length > 1 ? E(
          p,
          { attrs: l, slots: o, emit: c }
        ) : E(
          p,
          null
        )
      ), F = t.props ? l : To(l);
    }
  } catch (E) {
    Xe.length = 0, Mt(E, e, 1), H = k(je);
  }
  let D = H;
  if (F && S !== !1) {
    const E = Object.keys(F), { shapeFlag: N } = D;
    E.length && N & 7 && (i && E.some(sn) && (F = Eo(
      F,
      i
    )), D = it(D, F, !1, !0));
  }
  if (n.dirs && (D = it(D, null, !1, !0), D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs), n.transition) {
    const E = cn(D.type) && xr(D) || D;
    ss(E, n.transition);
  }
  return H = D, Yt(V), H;
}
const To = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || nn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Eo = (e, t) => {
  const n = {};
  for (const s in e)
    (!sn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Ao(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: c } = t, d = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? Os(s, o, d) : !!o;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const C = a[p];
        if (Or(o, s, C) && !dn(d, C))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? Os(s, o, d) : !0 : !!o;
  return !1;
}
function Os(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (Or(t, e, i) && !dn(n, i))
      return !0;
  }
  return !1;
}
function Or(e, t, n) {
  const s = e[n], r = t[n];
  return n === "style" && K(s) && K(r) ? !Gn(s, r) : s !== r;
}
function Oo({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e && (r.suspense.vnode.el = r.el = s, e = r), r === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const Mr = {}, Pr = () => Object.create(Mr), Rr = (e) => Object.getPrototypeOf(e) === Mr;
function Mo(e, t, n, s = !1) {
  const r = {}, i = Pr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ir(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : /* @__PURE__ */ Pi(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function Po(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ L(r), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let C = a[p];
        if (dn(e.emitsOptions, C))
          continue;
        const T = t[C];
        if (c)
          if ($(i, C))
            T !== i[C] && (i[C] = T, d = !0);
          else {
            const O = oe(C);
            r[O] = Ln(
              c,
              l,
              O,
              T,
              e,
              !1
            );
          }
        else
          T !== i[C] && (i[C] = T, d = !0);
      }
    }
  } else {
    Ir(e, t, r, i) && (d = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !$(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Ve(p)) === p || !$(t, a))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[a] !== void 0) && (r[p] = Ln(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (i !== l)
      for (const p in i)
        (!t || !$(t, p)) && (delete i[p], d = !0);
  }
  d && Ie(e.attrs, "set", "");
}
function Ir(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (mt(c))
        continue;
      const d = t[c];
      let a;
      r && $(r, a = oe(c)) ? !i || !i.includes(a) ? n[a] = d : (l || (l = {}))[a] = d : dn(e.emitsOptions, c) || (!(c in s) || d !== s[c]) && (s[c] = d, o = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ L(n), d = l || B;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      n[p] = Ln(
        r,
        c,
        p,
        d[p],
        e,
        !$(d, p)
      );
    }
  }
  return o;
}
function Ln(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = $(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && I(c)) {
        const { propsDefaults: d } = r;
        if (n in d)
          s = d[n];
        else {
          const a = Pt(r);
          s = d[n] = c.call(
            null,
            t
          ), a();
        }
      } else
        s = c;
      r.ce && r.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !l ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Ve(n)) && (s = !0));
  }
  return s;
}
const Ro = /* @__PURE__ */ new WeakMap();
function Fr(e, t, n = !1) {
  const s = n ? Ro : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let c = !1;
  if (!I(e)) {
    const a = (p) => {
      c = !0;
      const [C, T] = Fr(p, t, !0);
      ee(o, C), T && l.push(...T);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return K(e) && s.set(e, et), et;
  if (R(i))
    for (let a = 0; a < i.length; a++) {
      const p = oe(i[a]);
      Ms(p) && (o[p] = B);
    }
  else if (i)
    for (const a in i) {
      const p = oe(a);
      if (Ms(p)) {
        const C = i[a], T = o[p] = R(C) || I(C) ? { type: C } : ee({}, C), O = T.type;
        let S = !1, V = !0;
        if (R(O))
          for (let H = 0; H < O.length; ++H) {
            const F = O[H], D = I(F) && F.name;
            if (D === "Boolean") {
              S = !0;
              break;
            } else D === "String" && (V = !1);
          }
        else
          S = I(O) && O.name === "Boolean";
        T[
          0
          /* shouldCast */
        ] = S, T[
          1
          /* shouldCastTrue */
        ] = V, (S || $(T, "default")) && l.push(p);
      }
    }
  const d = [o, l];
  return K(e) && s.set(e, d), d;
}
function Ms(e) {
  return e[0] !== "$" && !mt(e);
}
const os = (e) => e === "_" || e === "_ctx" || e === "$stable", ls = (e) => R(e) ? e.map(Ce) : [Ce(e)], Io = (e, t, n) => {
  if (t._n)
    return t;
  const s = Bi((...r) => ls(t(...r)), n);
  return s._c = !1, s;
}, Dr = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (os(r)) continue;
    const i = e[r];
    if (I(i))
      t[r] = Io(r, i, s);
    else if (i != null) {
      const o = ls(i);
      t[r] = () => o;
    }
  }
}, Nr = (e, t) => {
  const n = ls(t);
  e.slots.default = () => n;
}, Hr = (e, t, n) => {
  for (const s in t)
    (n || !os(s)) && (e[s] = t[s]);
}, Fo = (e, t, n) => {
  const s = e.slots = Pr();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Hr(s, t, n), n && Xs(s, "_", r, !0)) : Dr(t, s);
  } else t && Nr(e, t);
}, Do = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = B;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Hr(r, t, n) : (i = !t.$stable, Dr(t, r)), o = t;
  } else t && (Nr(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !os(l) && o[l] == null && delete r[l];
}, le = $o;
function No(e) {
  return Ho(e);
}
function Ho(e, t) {
  const n = ln();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: c,
    setText: d,
    setElementText: a,
    parentNode: p,
    nextSibling: C,
    setScopeId: T = Ee,
    insertStaticContent: O
  } = e, S = (f, u, h, b = null, _ = null, g = null, x = void 0, v = null, y = !!u.dynamicChildren) => {
    if (f === u)
      return;
    f && !dt(f, u) && (b = Nt(f), _e(f, _, g, !0), f = null), u.patchFlag === -2 && (y = !1, u.dynamicChildren = null);
    const { type: m, ref: M, shapeFlag: w } = u;
    switch (m) {
      case hn:
        V(f, u, h, b);
        break;
      case je:
        H(f, u, h, b);
        break;
      case Bt:
        f == null && F(u, h, b, x);
        break;
      case Pe:
        It(
          f,
          u,
          h,
          b,
          _,
          g,
          x,
          v,
          y
        );
        break;
      default:
        w & 1 ? N(
          f,
          u,
          h,
          b,
          _,
          g,
          x,
          v,
          y
        ) : w & 6 ? Ft(
          f,
          u,
          h,
          b,
          _,
          g,
          x,
          v,
          y
        ) : (w & 64 || w & 128) && m.process(
          f,
          u,
          h,
          b,
          _,
          g,
          x,
          v,
          y,
          ct
        );
    }
    M != null && _ ? yt(M, f && f.ref, g, u || f, !u) : M == null && f && f.ref != null && yt(f.ref, null, g, f, !0);
  }, V = (f, u, h, b) => {
    if (f == null)
      s(
        u.el = l(u.children),
        h,
        b
      );
    else {
      const _ = u.el = f.el;
      u.children !== f.children && d(_, u.children);
    }
  }, H = (f, u, h, b) => {
    f == null ? s(
      u.el = c(u.children || ""),
      h,
      b
    ) : u.el = f.el;
  }, F = (f, u, h, b) => {
    [f.el, f.anchor] = O(
      f.children,
      u,
      h,
      b,
      f.el,
      f.anchor
    );
  }, D = ({ el: f, anchor: u }, h, b) => {
    let _;
    for (; f && f !== u; )
      _ = C(f), s(f, h, b), f = _;
    s(u, h, b);
  }, E = ({ el: f, anchor: u }) => {
    let h;
    for (; f && f !== u; )
      h = C(f), r(f), f = h;
    r(u);
  }, N = (f, u, h, b, _, g, x, v, y) => {
    if (u.type === "svg" ? x = "svg" : u.type === "math" && (x = "mathml"), f == null)
      ae(
        u,
        h,
        b,
        _,
        g,
        x,
        v,
        y
      );
    else {
      const m = f.el && f.el._isVueCE ? f.el : null;
      try {
        m && m._beginPatch(), Rt(
          f,
          u,
          _,
          g,
          x,
          v,
          y
        );
      } finally {
        m && m._endPatch();
      }
    }
  }, ae = (f, u, h, b, _, g, x, v) => {
    let y, m;
    const { props: M, shapeFlag: w, transition: A, dirs: P } = f;
    if (y = f.el = o(
      f.type,
      g,
      M && M.is,
      M
    ), w & 8 ? a(y, f.children) : w & 16 && $e(
      f.children,
      y,
      null,
      b,
      _,
      En(f, g),
      x,
      v
    ), P && qe(f, null, b, "created"), me(y, f, f.scopeId, x, b), M) {
      for (const W in M)
        W !== "value" && !mt(W) && i(y, W, null, M[W], g, b);
      "value" in M && i(y, "value", null, M.value, g), (m = M.onVnodeBeforeMount) && xe(m, b, f);
    }
    P && qe(f, null, b, "beforeMount");
    const j = jo(_, A);
    j && A.beforeEnter(y), s(y, u, h), ((m = M && M.onVnodeMounted) || j || P) && le(() => {
      try {
        m && xe(m, b, f), j && A.enter(y), P && qe(f, null, b, "mounted");
      } finally {
      }
    }, _);
  }, me = (f, u, h, b, _) => {
    if (h && T(f, h), b)
      for (let g = 0; g < b.length; g++)
        T(f, b[g]);
    if (_) {
      let g = _.subTree;
      if (u === g || Kr(g.type) && (g.ssContent === u || g.ssFallback === u)) {
        const x = _.vnode;
        me(
          f,
          x,
          x.scopeId,
          x.slotScopeIds,
          _.parent
        );
      }
    }
  }, $e = (f, u, h, b, _, g, x, v, y = 0) => {
    for (let m = y; m < f.length; m++) {
      const M = f[m] = v ? Re(f[m]) : Ce(f[m]);
      S(
        null,
        M,
        u,
        h,
        b,
        _,
        g,
        x,
        v
      );
    }
  }, Rt = (f, u, h, b, _, g, x) => {
    const v = u.el = f.el;
    let { patchFlag: y, dynamicChildren: m, dirs: M } = u;
    y |= f.patchFlag & 16;
    const w = f.props || B, A = u.props || B;
    let P;
    if (h && Ge(h, !1), (P = A.onVnodeBeforeUpdate) && xe(P, h, u, f), M && qe(u, f, h, "beforeUpdate"), h && Ge(h, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    m && (!f.dynamicChildren || f.dynamicChildren.length !== m.length) && (y = 0, x = !1, m = null), (w.innerHTML && A.innerHTML == null || w.textContent && A.textContent == null) && a(v, ""), m ? Ue(
      f.dynamicChildren,
      m,
      v,
      h,
      b,
      En(u, _),
      g
    ) : x || q(
      f,
      u,
      v,
      null,
      h,
      b,
      En(u, _),
      g,
      !1
    ), y > 0) {
      if (y & 16)
        lt(v, w, A, h, _);
      else if (y & 2 && w.class !== A.class && i(v, "class", null, A.class, _), y & 4 && i(v, "style", w.style, A.style, _), y & 8) {
        const j = u.dynamicProps;
        for (let W = 0; W < j.length; W++) {
          const U = j[W], z = w[U], X = A[U];
          (X !== z || U === "value") && i(v, U, z, X, _, h);
        }
      }
      y & 1 && f.children !== u.children && a(v, u.children);
    } else !x && m == null && lt(v, w, A, h, _);
    ((P = A.onVnodeUpdated) || M) && le(() => {
      P && xe(P, h, u, f), M && qe(u, f, h, "updated");
    }, b);
  }, Ue = (f, u, h, b, _, g, x) => {
    for (let v = 0; v < u.length; v++) {
      const y = f[v], m = u[v], M = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        y.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (y.type === Pe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !dt(y, m) || // - In the case of a component, it could contain anything.
        y.shapeFlag & 198) ? p(y.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      S(
        y,
        m,
        M,
        null,
        b,
        _,
        g,
        x,
        !0
      );
    }
  }, lt = (f, u, h, b, _) => {
    if (u !== h) {
      if (u !== B)
        for (const g in u)
          !mt(g) && !(g in h) && i(
            f,
            g,
            u[g],
            null,
            _,
            b
          );
      for (const g in h) {
        if (mt(g)) continue;
        const x = h[g], v = u[g];
        x !== v && g !== "value" && i(f, g, v, x, _, b);
      }
      "value" in h && i(f, "value", u.value, h.value, _);
    }
  }, It = (f, u, h, b, _, g, x, v, y) => {
    const m = u.el = f ? f.el : l(""), M = u.anchor = f ? f.anchor : l("");
    let { patchFlag: w, dynamicChildren: A, slotScopeIds: P } = u;
    P && (v = v ? v.concat(P) : P), f == null ? (s(m, h, b), s(M, h, b), $e(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      h,
      M,
      _,
      g,
      x,
      v,
      y
    )) : w > 0 && w & 64 && A && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === A.length ? (Ue(
      f.dynamicChildren,
      A,
      h,
      _,
      g,
      x,
      v
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || _ && u === _.subTree) && jr(
      f,
      u,
      !0
      /* shallow */
    )) : q(
      f,
      u,
      h,
      M,
      _,
      g,
      x,
      v,
      y
    );
  }, Ft = (f, u, h, b, _, g, x, v, y) => {
    u.slotScopeIds = v, f == null ? u.shapeFlag & 512 ? _.ctx.activate(
      u,
      h,
      b,
      x,
      y
    ) : gn(
      u,
      h,
      b,
      _,
      g,
      x,
      y
    ) : fs(f, u, y);
  }, gn = (f, u, h, b, _, g, x) => {
    const v = f.component = Yo(
      f,
      b,
      _
    );
    if (un(f) && (v.ctx.renderer = ct), zo(v, !1, x), v.asyncDep) {
      if (_ && _.registerDep(v, se, x), !f.el) {
        const y = v.subTree = k(je);
        H(null, y, u, h), f.placeholder = y.el;
      }
    } else
      se(
        v,
        f,
        u,
        h,
        _,
        g,
        x
      );
  }, fs = (f, u, h) => {
    const b = u.component = f.component;
    if (Ao(f, u, h))
      if (b.asyncDep && !b.asyncResolved) {
        J(b, u, h);
        return;
      } else
        b.next = u, b.update();
    else
      u.el = f.el, b.vnode = u;
  }, se = (f, u, h, b, _, g, x) => {
    const v = () => {
      if (f.isMounted) {
        let { next: w, bu: A, u: P, parent: j, vnode: W } = f;
        {
          const ye = Lr(f);
          if (ye) {
            w && (w.el = W.el, J(f, w, x)), ye.asyncDep.then(() => {
              le(() => {
                f.isUnmounted || m();
              }, _);
            });
            return;
          }
        }
        let U = w, z;
        Ge(f, !1), w ? (w.el = W.el, J(f, w, x)) : w = W, A && Ut(A), (z = w.props && w.props.onVnodeBeforeUpdate) && xe(z, j, w, W), Ge(f, !0);
        const X = As(f), be = f.subTree;
        f.subTree = X, S(
          be,
          X,
          // parent may have changed if it's in a teleport
          p(be.el),
          // anchor may have changed if it's in a fragment
          Nt(be),
          f,
          _,
          g
        ), w.el = X.el, U === null && Oo(f, X.el), P && le(P, _), (z = w.props && w.props.onVnodeUpdated) && le(
          () => xe(z, j, w, W),
          _
        );
      } else {
        let w;
        const { el: A, props: P } = u, { bm: j, m: W, parent: U, root: z, type: X } = f, be = vt(u);
        Ge(f, !1), j && Ut(j), !be && (w = P && P.onVnodeBeforeMount) && xe(w, U, u), Ge(f, !0);
        {
          z.ce && z.ce._hasShadowRoot() && z.ce._injectChildStyle(
            X,
            f.parent ? f.parent.type : void 0
          );
          const ye = f.subTree = As(f);
          S(
            null,
            ye,
            h,
            b,
            f,
            _,
            g
          ), u.el = ye.el;
        }
        if (W && le(W, _), !be && (w = P && P.onVnodeMounted)) {
          const ye = u;
          le(
            () => xe(w, U, ye),
            _
          );
        }
        (u.shapeFlag & 256 || U && vt(U.vnode) && U.vnode.shapeFlag & 256) && f.a && le(f.a, _), f.isMounted = !0, u = h = b = null;
      }
    };
    f.scope.on();
    const y = f.effect = new er(v);
    f.scope.off();
    const m = f.update = y.run.bind(y), M = f.job = y.runIfDirty.bind(y);
    M.i = f, M.id = f.uid, y.scheduler = () => ts(M), Ge(f, !0), m();
  }, J = (f, u, h) => {
    u.component = f;
    const b = f.vnode.props;
    f.vnode = u, f.next = null, Po(f, u.props, b, h), Do(f, u.children, h), De(), bs(f), Ne();
  }, q = (f, u, h, b, _, g, x, v, y = !1) => {
    const m = f && f.children, M = f ? f.shapeFlag : 0, w = u.children, { patchFlag: A, shapeFlag: P } = u;
    if (A > 0) {
      if (A & 128) {
        Dt(
          m,
          w,
          h,
          b,
          _,
          g,
          x,
          v,
          y
        );
        return;
      } else if (A & 256) {
        We(
          m,
          w,
          h,
          b,
          _,
          g,
          x,
          v,
          y
        );
        return;
      }
    }
    P & 8 ? (M & 16 && ft(m, _, g), w !== m && a(h, w)) : M & 16 ? P & 16 ? Dt(
      m,
      w,
      h,
      b,
      _,
      g,
      x,
      v,
      y
    ) : ft(m, _, g, !0) : (M & 8 && a(h, ""), P & 16 && $e(
      w,
      h,
      b,
      _,
      g,
      x,
      v,
      y
    ));
  }, We = (f, u, h, b, _, g, x, v, y) => {
    f = f || et, u = u || et;
    const m = f.length, M = u.length, w = Math.min(m, M);
    let A;
    for (A = 0; A < w; A++) {
      const P = u[A] = y ? Re(u[A]) : Ce(u[A]);
      S(
        f[A],
        P,
        h,
        null,
        _,
        g,
        x,
        v,
        y
      );
    }
    m > M ? ft(
      f,
      _,
      g,
      !0,
      !1,
      w
    ) : $e(
      u,
      h,
      b,
      _,
      g,
      x,
      v,
      y,
      w
    );
  }, Dt = (f, u, h, b, _, g, x, v, y) => {
    let m = 0;
    const M = u.length;
    let w = f.length - 1, A = M - 1;
    for (; m <= w && m <= A; ) {
      const P = f[m], j = u[m] = y ? Re(u[m]) : Ce(u[m]);
      if (dt(P, j))
        S(
          P,
          j,
          h,
          null,
          _,
          g,
          x,
          v,
          y
        );
      else
        break;
      m++;
    }
    for (; m <= w && m <= A; ) {
      const P = f[w], j = u[A] = y ? Re(u[A]) : Ce(u[A]);
      if (dt(P, j))
        S(
          P,
          j,
          h,
          null,
          _,
          g,
          x,
          v,
          y
        );
      else
        break;
      w--, A--;
    }
    if (m > w) {
      if (m <= A) {
        const P = A + 1, j = P < M ? u[P].el : b;
        for (; m <= A; )
          S(
            null,
            u[m] = y ? Re(u[m]) : Ce(u[m]),
            h,
            j,
            _,
            g,
            x,
            v,
            y
          ), m++;
      }
    } else if (m > A)
      for (; m <= w; )
        _e(f[m], _, g, !0), m++;
    else {
      const P = m, j = m, W = /* @__PURE__ */ new Map();
      for (m = j; m <= A; m++) {
        const fe = u[m] = y ? Re(u[m]) : Ce(u[m]);
        fe.key != null && W.set(fe.key, m);
      }
      let U, z = 0;
      const X = A - j + 1;
      let be = !1, ye = 0;
      const ut = new Array(X);
      for (m = 0; m < X; m++) ut[m] = 0;
      for (m = P; m <= w; m++) {
        const fe = f[m];
        if (z >= X) {
          _e(fe, _, g, !0);
          continue;
        }
        let ve;
        if (fe.key != null)
          ve = W.get(fe.key);
        else
          for (U = j; U <= A; U++)
            if (ut[U - j] === 0 && dt(fe, u[U])) {
              ve = U;
              break;
            }
        ve === void 0 ? _e(fe, _, g, !0) : (ut[ve - j] = m + 1, ve >= ye ? ye = ve : be = !0, S(
          fe,
          u[ve],
          h,
          null,
          _,
          g,
          x,
          v,
          y
        ), z++);
      }
      const as = be ? Lo(ut) : et;
      for (U = as.length - 1, m = X - 1; m >= 0; m--) {
        const fe = j + m, ve = u[fe], ds = u[fe + 1], hs = fe + 1 < M ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          ds.el || $r(ds)
        ) : b;
        ut[m] === 0 ? S(
          null,
          ve,
          h,
          hs,
          _,
          g,
          x,
          v,
          y
        ) : be && (U < 0 || m !== as[U] ? Be(ve, h, hs, 2) : U--);
      }
    }
  }, Be = (f, u, h, b, _ = null) => {
    const { el: g, type: x, transition: v, children: y, shapeFlag: m } = f;
    if (m & 6) {
      Be(f.component.subTree, u, h, b);
      return;
    }
    if (m & 128) {
      f.suspense.move(u, h, b);
      return;
    }
    if (m & 64) {
      x.move(f, u, h, ct);
      return;
    }
    if (x === Pe) {
      s(g, u, h);
      for (let w = 0; w < y.length; w++)
        Be(y[w], u, h, b);
      s(f.anchor, u, h);
      return;
    }
    if (x === Bt) {
      D(f, u, h);
      return;
    }
    if (b !== 2 && m & 1 && v)
      if (b === 0)
        v.persisted && !g[Cn] ? s(g, u, h) : (v.beforeEnter(g), s(g, u, h), le(() => v.enter(g), _));
      else {
        const { leave: w, delayLeave: A, afterLeave: P } = v, j = () => {
          f.ctx.isUnmounted ? r(g) : s(g, u, h);
        }, W = () => {
          const U = g._isLeaving || !!g[Cn];
          g._isLeaving && g[Cn](
            !0
            /* cancelled */
          ), v.persisted && !U ? j() : w(g, () => {
            j(), P && P();
          });
        };
        A ? A(g, j, W) : W();
      }
    else
      s(g, u, h);
  }, _e = (f, u, h, b = !1, _ = !1) => {
    const {
      type: g,
      props: x,
      ref: v,
      children: y,
      dynamicChildren: m,
      shapeFlag: M,
      patchFlag: w,
      dirs: A,
      cacheIndex: P,
      memo: j
    } = f;
    if (w === -2 && (_ = !1), v != null && (De(), yt(v, null, h, f, !0), Ne()), P != null && (u.renderCache[P] = void 0), M & 256) {
      u.ctx.deactivate(f);
      return;
    }
    const W = M & 1 && A, U = !vt(f);
    let z;
    if (U && (z = x && x.onVnodeBeforeUnmount) && xe(z, u, f), M & 6)
      Qr(f.component, h, b);
    else {
      if (M & 128) {
        f.suspense.unmount(h, b);
        return;
      }
      W && qe(f, null, u, "beforeUnmount"), M & 64 ? f.type.remove(
        f,
        u,
        h,
        ct,
        b
      ) : m && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !m.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (g !== Pe || w > 0 && w & 64) ? ft(
        m,
        u,
        h,
        !1,
        !0
      ) : (g === Pe && w & 384 || !_ && M & 16) && ft(y, u, h), b && cs(f);
    }
    const X = j != null && P == null;
    (U && (z = x && x.onVnodeUnmounted) || W || X) && le(() => {
      z && xe(z, u, f), W && qe(f, null, u, "unmounted"), X && (f.el = null);
    }, h);
  }, cs = (f) => {
    const { type: u, el: h, anchor: b, transition: _ } = f;
    if (u === Pe) {
      Zr(h, b);
      return;
    }
    if (u === Bt) {
      E(f);
      return;
    }
    const g = () => {
      r(h), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (f.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: x, delayLeave: v } = _, y = () => x(h, g);
      v ? v(f.el, g, y) : y();
    } else
      g();
  }, Zr = (f, u) => {
    let h;
    for (; f !== u; )
      h = C(f), r(f), f = h;
    r(u);
  }, Qr = (f, u, h) => {
    const { bum: b, scope: _, job: g, subTree: x, um: v, m: y, a: m } = f;
    Ps(y), Ps(m), b && Ut(b), _.stop(), g && (g.flags |= 8, _e(x, f, u, h)), v && le(v, u), le(() => {
      f.isUnmounted = !0;
    }, u);
  }, ft = (f, u, h, b = !1, _ = !1, g = 0) => {
    for (let x = g; x < f.length; x++)
      _e(f[x], u, h, b, _);
  }, Nt = (f) => {
    if (f.shapeFlag & 6)
      return Nt(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const u = C(f.anchor || f.el), h = u && u[zi];
    return h ? C(h) : u;
  };
  let mn = !1;
  const us = (f, u, h) => {
    let b;
    f == null ? u._vnode && (_e(u._vnode, null, null, !0), b = u._vnode.component) : S(
      u._vnode || null,
      f,
      u,
      null,
      null,
      null,
      h
    ), u._vnode = f, mn || (mn = !0, bs(b), _r(), mn = !1);
  }, ct = {
    p: S,
    um: _e,
    m: Be,
    r: cs,
    mt: gn,
    mc: $e,
    pc: q,
    pbc: Ue,
    n: Nt,
    o: e
  };
  return {
    render: us,
    hydrate: void 0,
    createApp: xo(us)
  };
}
function En({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ge({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function jo(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function jr(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (R(s) && R(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = Re(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && jr(o, l)), l.type === hn && (l.patchFlag === -1 && (l = r[i] = Re(l)), l.el = o.el), l.type === je && !l.el && (l.el = o.el);
    }
}
function Lo(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const d = e[s];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        l = i + o >> 1, e[n[l]] < d ? i = l + 1 : o = l;
      d < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
function Lr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Lr(t);
}
function Ps(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function $r(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? $r(t.subTree) : null;
}
const Kr = (e) => e.__isSuspense;
function $o(e, t) {
  t && t.pendingBranch ? R(e) ? t.effects.push(...e) : t.effects.push(e) : Wi(e);
}
const Pe = /* @__PURE__ */ Symbol.for("v-fgt"), hn = /* @__PURE__ */ Symbol.for("v-txt"), je = /* @__PURE__ */ Symbol.for("v-cmt"), Bt = /* @__PURE__ */ Symbol.for("v-stc"), Xe = [];
let ue = null;
function Ko(e = !1) {
  Xe.push(ue = e ? null : []);
}
function Vr() {
  Xe.pop(), ue = Xe[Xe.length - 1] || null;
}
let Tt = 1;
function Zt(e, t = !1) {
  Tt += e, e < 0 && ue && t && (ue.hasOnce = !0);
}
function Ur(e) {
  return e.dynamicChildren = Tt > 0 ? ue || et : null, Vr(), Tt > 0 && ue && ue.push(e), e;
}
function Ul(e, t, n, s, r, i) {
  return Ur(
    Br(
      e,
      t,
      n,
      s,
      r,
      i,
      !0
    )
  );
}
function Vo(e, t, n, s, r) {
  return Ur(
    k(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Qt(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function dt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Wr = ({ key: e }) => e ?? null, qt = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Y(e) || /* @__PURE__ */ ne(e) || I(e) ? { i: ce, r: e, k: t, f: !!n } : e : null);
function Br(e, t = null, n = null, s = 0, r = null, i = e === Pe ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Wr(t),
    ref: t && qt(t),
    scopeId: yr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ce
  };
  return l ? (kt(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= Y(n) ? 8 : 16), Tt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  ue && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && ue.push(c), c;
}
const k = Uo;
function Uo(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === wr) && (e = je), Qt(e)) {
    const l = it(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && kt(l, n), Tt > 0 && !i && ue && (l.shapeFlag & 6 ? ue[ue.indexOf(e)] = l : ue.push(l)), l.patchFlag = -2, l;
  }
  if (el(e) && (e = e.__vccOpts), t) {
    t = Wo(t);
    let { class: l, style: c } = t;
    l && !Y(l) && (t.class = qn(l)), K(c) && (/* @__PURE__ */ es(c) && !R(c) && (c = ee({}, c)), t.style = Bn(c));
  }
  const o = Y(e) ? 1 : Kr(e) ? 128 : cn(e) ? 64 : K(e) ? 4 : I(e) ? 2 : 0;
  return Br(
    e,
    t,
    n,
    s,
    r,
    o,
    i,
    !0
  );
}
function Wo(e) {
  return e ? /* @__PURE__ */ es(e) || Rr(e) ? ee({}, e) : e : null;
}
function it(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e, d = t ? qo(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Wr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? R(i) ? i.concat(qt(t)) : [i, qt(t)] : qt(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Pe ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && it(e.ssContent),
    ssFallback: e.ssFallback && it(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && s && ss(
    a,
    c.clone(a)
  ), a;
}
function Bo(e = " ", t = 0) {
  return k(hn, null, e, t);
}
function Wl(e, t) {
  const n = k(Bt, null, e);
  return n.staticCount = t, n;
}
function Bl(e = "", t = !1) {
  return t ? (Ko(), Vo(je, null, e)) : k(je, null, e);
}
function Ce(e) {
  return e == null || typeof e == "boolean" ? k(je) : R(e) ? k(
    Pe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Qt(e) ? Re(e) : k(hn, null, String(e));
}
function Re(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : it(e);
}
function kt(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (R(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), kt(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Rr(t) ? t._ctx = ce : r === 3 && ce && (ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (I(t)) {
    if (s & 65) {
      kt(e, { default: t });
      return;
    }
    t = { default: t, _ctx: ce }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [Bo(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function qo(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = qn([t.class, s.class]));
      else if (r === "style")
        t.style = Bn([t.style, s.style]);
      else if (nn(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(R(i) && i.includes(o)) ? t[r] = i ? [].concat(i, o) : o : o == null && i == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !sn(r) && (t[r] = o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function xe(e, t, n, s = null) {
  ge(e, t, 7, [
    n,
    s
  ]);
}
const Go = Er();
let Jo = 0;
function Yo(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || Go, i = {
    uid: Jo++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new ai(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Fr(s, r),
    emitsOptions: Ar(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: B,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: B,
    data: B,
    props: B,
    attrs: B,
    slots: B,
    refs: B,
    setupState: B,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = wo.bind(null, i), e.ce && e.ce(i), i;
}
let Q = null;
const qr = () => Q || ce;
let en, Et;
{
  const e = ln(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  en = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Q = n
  ), Et = t(
    "__VUE_SSR_SETTERS__",
    (n) => ot = n
  );
}
const Pt = (e) => {
  const t = Q;
  return en(e), e.scope.on(), () => {
    e.scope.off(), en(t);
  };
}, Rs = () => {
  Q && Q.scope.off(), en(null);
};
function Gr(e) {
  return e.vnode.shapeFlag & 4;
}
let ot = !1;
function zo(e, t = !1, n = !1) {
  t && Et(t);
  const { props: s, children: r } = e.vnode, i = Gr(e);
  Mo(e, s, i, t), Fo(e, r, n || t);
  const o = i ? Xo(e, t) : void 0;
  return t && Et(!1), o;
}
function Xo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, po);
  const { setup: s } = n;
  if (s) {
    De();
    const r = e.setupContext = s.length > 1 ? Qo(e) : null, i = Pt(e), o = Ot(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = Js(o);
    if (Ne(), i(), (l || e.sp) && !vt(e) && rs(e), l) {
      if (o.then(Rs, Rs), t)
        return o.then((c) => {
          Et(!0);
          try {
            Is(e, c, t);
          } finally {
            Et(!1);
          }
        }).catch((c) => {
          Mt(c, e, 0);
        });
      e.asyncDep = o;
    } else
      Is(e, o);
  } else
    Jr(e);
}
function Is(e, t, n) {
  I(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : K(t) && (e.setupState = pr(t)), Jr(e);
}
function Jr(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Ee);
  {
    const r = Pt(e);
    De();
    try {
      go(e);
    } finally {
      Ne(), r();
    }
  }
}
const Zo = {
  get(e, t) {
    return te(e, "get", ""), e[t];
  }
};
function Qo(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Zo),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function pn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(pr(Ri(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in xt)
        return xt[n](e);
    },
    has(t, n) {
      return n in t || n in xt;
    }
  })) : e.proxy;
}
function ko(e, t = !0) {
  return I(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function el(e) {
  return I(e) && "__vccOpts" in e;
}
const tl = (e, t) => /* @__PURE__ */ ji(e, t, ot);
function ql(e, t, n) {
  try {
    Zt(-1);
    const s = arguments.length;
    return s === 2 ? K(t) && !R(t) ? Qt(t) ? k(e, null, [t]) : k(e, t) : k(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Qt(n) && (n = [n]), k(e, t, n));
  } finally {
    Zt(1);
  }
}
const nl = "3.5.41";
/**
* @vue/runtime-dom v3.5.41
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let $n;
const Fs = typeof window < "u" && window.trustedTypes;
if (Fs)
  try {
    $n = /* @__PURE__ */ Fs.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Yr = $n ? (e) => $n.createHTML(e) : (e) => e, sl = "http://www.w3.org/2000/svg", rl = "http://www.w3.org/1998/Math/MathML", Me = typeof document < "u" ? document : null, Ds = Me && /* @__PURE__ */ Me.createElement("template"), il = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? Me.createElementNS(sl, e) : t === "mathml" ? Me.createElementNS(rl, e) : n ? Me.createElement(e, { is: n }) : Me.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => Me.createTextNode(e),
  createComment: (e) => Me.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Me.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      Ds.innerHTML = Yr(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ds.content;
      if (s === "svg" || s === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, ol = /* @__PURE__ */ Symbol("_vtc");
function ll(e, t, n) {
  const s = e[ol];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const tn = /* @__PURE__ */ Symbol("_vod"), zr = /* @__PURE__ */ Symbol("_vsh"), Gl = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[tn] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : ht(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), ht(e, !0), s.enter(e)) : s.leave(e, () => {
      ht(e, !1);
    }) : ht(e, t));
  },
  beforeUnmount(e, { value: t }) {
    ht(e, t);
  }
};
function ht(e, t) {
  e.style.display = t ? e[tn] : "none", e[zr] = !t;
}
const fl = /* @__PURE__ */ Symbol(""), cl = /(?:^|;)\s*display\s*:/;
function ul(e, t, n) {
  const s = e.style, r = Y(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (Y(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && gt(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && gt(s, o, "");
    for (const o in n) {
      o === "display" && (i = !0);
      const l = n[o];
      l != null ? dl(
        e,
        o,
        !Y(t) && t ? t[o] : void 0,
        l
      ) || gt(s, o, l) : gt(s, o, "");
    }
  } else if (r) {
    if (t !== n) {
      const o = s[fl];
      o && (n += ";" + o), s.cssText = n, i = cl.test(n);
    }
  } else t && e.removeAttribute("style");
  tn in e && (e[tn] = i ? s.display : "", e[zr] && (s.display = "none"));
}
const Ns = /\s*!important$/;
function gt(e, t, n) {
  if (R(n))
    n.forEach((s) => gt(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = al(e, t);
    Ns.test(n) ? e.setProperty(
      Ve(s),
      n.replace(Ns, ""),
      "important"
    ) : e[s] = n;
  }
}
const Hs = ["Webkit", "Moz", "ms"], An = {};
function al(e, t) {
  const n = An[t];
  if (n)
    return n;
  let s = oe(t);
  if (s !== "filter" && s in e)
    return An[t] = s;
  s = on(s);
  for (let r = 0; r < Hs.length; r++) {
    const i = Hs[r] + s;
    if (i in e)
      return An[t] = i;
  }
  return t;
}
function dl(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Y(s) && n === s;
}
const js = "http://www.w3.org/1999/xlink";
function Ls(e, t, n, s, r, i = fi(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(js, t.slice(6, t.length)) : e.setAttributeNS(js, t, n) : n == null || i && !Zs(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Ae(n) ? String(n) : n
  );
}
function $s(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Yr(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Zs(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function ke(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function hl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Ks = /* @__PURE__ */ Symbol("_vei");
function pl(e, t, n, s, r = null) {
  const i = e[Ks] || (e[Ks] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, c] = _l(t);
    if (s) {
      const d = i[t] = vl(
        s,
        r
      );
      ke(e, l, d, c);
    } else o && (hl(e, l, o, c), i[t] = void 0);
  }
}
const gl = /(Once|Passive|Capture)$/, ml = /^on:?(?:Once|Passive|Capture)$/;
function _l(e) {
  let t, n;
  for (; (n = e.match(gl)) && !ml.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : Ve(e.slice(2)), t];
}
let On = 0;
const bl = /* @__PURE__ */ Promise.resolve(), yl = () => On || (bl.then(() => On = 0), On = Date.now());
function vl(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const r = n.value;
    if (R(r)) {
      const i = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        i.call(s), s._stopped = !0;
      };
      const o = r.slice(), l = [s];
      for (let c = 0; c < o.length && !s._stopped; c++) {
        const d = o[c];
        d && ge(
          d,
          t,
          5,
          l
        );
      }
    } else
      ge(
        r,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = yl(), n;
}
const Vs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, xl = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? ll(e, s, o) : t === "style" ? ul(e, n, s) : nn(t) ? sn(t) || pl(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Sl(e, t, s, o)) ? ($s(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ls(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (wl(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !Y(s))) ? $s(e, oe(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Ls(e, t, s, o));
};
function Sl(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Vs(t) && I(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Vs(t) && Y(n) ? !1 : t in e;
}
function wl(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = oe(t);
  return Array.isArray(n) ? n.some((r) => oe(r) === s) : Object.keys(n).some((r) => oe(r) === s);
}
const Us = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return R(t) ? (n) => Ut(t, n) : t;
};
function Cl(e) {
  e.target.composing = !0;
}
function Ws(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Kt = /* @__PURE__ */ Symbol("_assign"), Vt = /* @__PURE__ */ Symbol("_initialValue");
function Mn(e, t, n) {
  return t && (e = e.trim()), n && (e = Wn(e)), e;
}
const Jl = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e.parentNode && (e.type === "text" ? e[Vt] = e.defaultValue.replace(/[\r\n]/g, "") : e.type === "textarea" && (e[Vt] = e.defaultValue.replace(/\r\n?/g, `
`))), e[Kt] = Us(r);
    const i = s || r.props && r.props.type === "number";
    ke(e, t ? "change" : "input", (o) => {
      o.target.composing || e[Kt](Mn(e.value, n, i));
    }), (n || i) && ke(e, "change", () => {
      e.value = Mn(e.value, n, i);
    }), t || (ke(e, "compositionstart", Cl), ke(e, "compositionend", Ws), ke(e, "change", Ws));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
    const r = t ?? "", i = e[Vt];
    delete e[Vt], i !== void 0 && (e.type === "text" || e.type === "textarea") && e.value !== i ? e[Kt](Mn(e.value, n, s)) : e.value = r;
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[Kt] = Us(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? Wn(e.value) : e.value, c = t ?? "";
    if (l === c)
      return;
    const d = e.getRootNode();
    (d instanceof Document || d instanceof ShadowRoot) && d.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === c) || (e.value = c);
  }
}, Tl = ["ctrl", "shift", "alt", "meta"], El = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Tl.some((n) => e[`${n}Key`] && !t.includes(n))
}, Yl = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = El[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  }));
}, Al = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, zl = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((r) => {
    if (!("key" in r))
      return;
    const i = Ve(r.key);
    if (t.some(
      (o) => o === i || Al[o] === i
    ))
      return e(r);
  }));
}, Ol = /* @__PURE__ */ ee({ patchProp: xl }, il);
let Bs;
function Ml() {
  return Bs || (Bs = No(Ol));
}
const Pl = ((...e) => {
  const t = Ml().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = Il(s);
    if (!r) return;
    const i = t._component;
    !I(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, Rl(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
});
function Rl(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Il(e) {
  return Y(e) ? document.querySelector(e) : e;
}
const Fl = { maverick: () => import("./Maverick-BTz1l3fK.js"), loyalty: () => import("./Loyalty-Cr5u3PrZ.js").then((e) => e.L), "gift-roulette": () => import("./Gift-CfVakPBz.js"), tailcare: () => import("./TailCare-Cqw22tMR.js") };
async function Dl(e) {
  try {
    const { default: t } = await Fl[e.dataset.productDemo]();
    Pl(t, { compact: e.dataset.compact === "true" }).mount(e), e.removeAttribute("aria-busy");
  } catch {
    e.innerHTML = "<p>Демо не загрузилось. Обновите страницу, чтобы попробовать ещё раз.</p>", e.removeAttribute("aria-busy");
  }
}
const Xr = new IntersectionObserver((e) => {
  e.filter((t) => t.isIntersecting).forEach((t) => {
    Xr.unobserve(t.target), Dl(t.target);
  });
}, { rootMargin: "300px" });
document.querySelectorAll("[data-product-demo]").forEach((e) => Xr.observe(e));
export {
  $l as A,
  zl as B,
  Jl as C,
  wn as D,
  Pe as F,
  oo as a,
  Br as b,
  Ul as c,
  k as d,
  Bo as e,
  Bl as f,
  Vl as g,
  qn as h,
  Vi as i,
  Ko as j,
  Zi as k,
  Wl as l,
  ql as m,
  Bn as n,
  so as o,
  tl as p,
  jl as q,
  Sn as r,
  Ll as s,
  ui as t,
  Di as u,
  Gl as v,
  Hl as w,
  Yl as x,
  Vo as y,
  Kl as z
};
