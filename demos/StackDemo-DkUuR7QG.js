import { k as Ll, r as Ft, D as Cr, o as Oo, i as Dl, a as Bo, j as mr, c as gr, h as Il, b as Vt, B as La, x as Pr, f as zo, t as Ci, p as Da, d as Ul, e as Nl } from "./mount-D_cTBYQE.js";
import { r as Fl } from "./Loyalty-B47s-lUX.js";
import { _ as Go } from "./_plugin-vue_export-helper-D7VY89rh.js";
function Lr(i) {
  return {
    status: "READY",
    rules: i,
    blocks: [],
    events: [],
    centres: { X: 0, Z: 0 },
    sizes: { X: i.baseSizeMilli, Z: i.baseSizeMilli }
  };
}
function Ol(i, e, t, n = 0) {
  const r = Math.floor(i * e / 1e3), s = t * 2, a = ((n + r) % (s * 2) + s * 2) % (s * 2), o = a <= s ? a : s * 2 - a;
  return -t + o;
}
function Ia(i, e, t, n) {
  const r = i.movementRangeMilli * 4, s = Bl(e, t, r);
  return Ol(
    n,
    zl(i, t - 1),
    i.movementRangeMilli,
    s
  );
}
function Bl(i, e, t) {
  let n = i >>> 0 ^ Math.imul(e, 2654435769) >>> 0;
  return n = (n ^ n >>> 16) >>> 0, n = Math.imul(n, 2246822507) >>> 0, n = (n ^ n >>> 13) >>> 0, n = Math.imul(n, 3266489909) >>> 0, n = (n ^ n >>> 16) >>> 0, n % t;
}
function zl(i, e) {
  return Math.min(
    i.initialSpeedMilliPerSecond + e * i.speedStepMilliPerSecond,
    i.maxSpeedMilliPerSecond
  );
}
function Gl(i, e, t) {
  if (i.status === "ENDED" || i.events.length >= i.rules.maxEvents) return i;
  const n = i.events.length + 1, r = n % 2 ? "X" : "Z", s = e - i.centres[r], a = Math.max(i.sizes[r] - Math.abs(s), 0), o = a < i.rules.minOverlapMilli, c = !o && Math.abs(s) <= i.rules.perfectToleranceMilli, l = { ...i.centres }, h = { ...i.sizes }, p = {
    centerXMilli: r === "X" ? e : i.centres.X,
    centerZMilli: r === "Z" ? e : i.centres.Z,
    sizeXMilli: i.sizes.X,
    sizeZMilli: i.sizes.Z
  };
  !o && !c && (h[r] = a, l[r] = Math.trunc((i.centres[r] + e) / 2));
  const u = o ? null : {
    centerXMilli: l.X,
    centerZMilli: l.Z,
    sizeXMilli: h.X,
    sizeZMilli: h.Z
  }, g = o ? p : c ? null : Vl(p, r, s, a);
  return {
    ...i,
    status: o || n >= i.rules.maxEvents ? "ENDED" : "PLAYING",
    centres: l,
    sizes: h,
    events: [
      ...i.events,
      { ordinal: n, elapsedMs: t, axis: r, position: Hl(e) }
    ],
    blocks: [
      ...i.blocks,
      {
        axis: r,
        centerMilli: e,
        sizeMilli: i.sizes[r],
        overlapMilli: a,
        isPerfect: c,
        isMiss: o,
        placed: u,
        overhang: g
      }
    ]
  };
}
function Vl(i, e, t, n) {
  const r = { ...i }, s = t < 0 ? -1 : 1;
  return e === "X" ? (r.centerXMilli = Math.trunc(i.centerXMilli + s * n / 2), r.sizeXMilli = i.sizeXMilli - n) : (r.centerZMilli = Math.trunc(i.centerZMilli + s * n / 2), r.sizeZMilli = i.sizeZMilli - n), r;
}
function Hl(i) {
  const e = i < 0 ? "-" : "", t = Math.abs(Math.trunc(i));
  return `${e}${Math.floor(t / 1e3)}.${String(t % 1e3).padStart(3, "0")}`;
}
class kl {
  constructor(e) {
    this.canvas = e, this.width = 1, this.height = 1, this.animationFrame = 0, this.previousTimestamp = 0, this.disposed = !1;
    const t = e.getContext("2d", { alpha: !1 });
    if (!t) throw new Error("Canvas2D is unavailable");
    this.context = t;
  }
  resize(e, t, n) {
    this.width = Math.max(e, 1), this.height = Math.max(t, 1), this.canvas.width = Math.round(this.width * n), this.canvas.height = Math.round(this.height * n), this.context.setTransform(n, 0, 0, n, 0, 0);
  }
  start(e) {
    this.stop();
    const t = (n) => {
      if (this.disposed) return;
      const r = this.previousTimestamp ? Math.min((n - this.previousTimestamp) / 1e3, 0.05) : 0;
      this.previousTimestamp = n, e(n, r), this.animationFrame = requestAnimationFrame(t);
    };
    this.animationFrame = requestAnimationFrame(t);
  }
  stop() {
    this.animationFrame && cancelAnimationFrame(this.animationFrame), this.animationFrame = 0, this.previousTimestamp = 0;
  }
  render(e) {
    if (this.disposed) return;
    const t = this.context;
    t.fillStyle = "#050505", t.fillRect(0, 0, this.width, this.height);
    const n = e.state.blocks.flatMap((h) => h.placed ? [h.placed] : []), r = Math.max(n.length - 18, 0), s = n.slice(r), a = this.height * 0.72, o = Math.min(Math.max(this.height * 0.035, 16), 28), c = Math.min(this.width / 10, 44), l = {
      centerXMilli: 0,
      centerZMilli: 0,
      sizeXMilli: e.rules.baseSizeMilli,
      sizeZMilli: e.rules.baseSizeMilli
    };
    if (this.drawBlock(l, a + r * o, c, o, "#0062c4"), s.forEach((h, p) => {
      const u = r + p + 1;
      this.drawBlock(
        h,
        a - (p + 1) * o,
        c,
        o,
        u % 3 === 0 ? "#e9e9e9" : u % 2 ? "#1478c9" : "#4d4d4d"
      );
    }), e.running) {
      const h = (e.state.events.length + 1) % 2 ? "X" : "Z";
      this.drawBlock({
        centerXMilli: h === "X" ? e.movingPositionMilli : e.state.centres.X,
        centerZMilli: h === "Z" ? e.movingPositionMilli : e.state.centres.Z,
        sizeXMilli: e.state.sizes.X,
        sizeZMilli: e.state.sizes.Z
      }, a - (s.length + 1) * o, c, o, "#1688dd");
    }
  }
  dispose() {
    this.disposed || (this.stop(), this.disposed = !0, this.context.clearRect(0, 0, this.width, this.height));
  }
  drawBlock(e, t, n, r, s) {
    const a = e.centerXMilli / 1e3, o = e.centerZMilli / 1e3, c = e.sizeXMilli / 2e3, l = e.sizeZMilli / 2e3, h = [
      this.project(a - c, o - l, t, n),
      this.project(a + c, o - l, t, n),
      this.project(a + c, o + l, t, n),
      this.project(a - c, o + l, t, n)
    ], p = h.map((u) => ({ x: u.x, y: u.y + r }));
    this.polygon([h[3], h[2], p[2], p[3]], Ua(s, -24)), this.polygon([h[1], h[2], p[2], p[1]], Ua(s, -42)), this.polygon(h, s);
  }
  project(e, t, n, r) {
    return {
      x: this.width / 2 + (e - t) * r * 0.68,
      y: n + (e + t) * r * 0.28
    };
  }
  polygon(e, t) {
    const n = e[0];
    if (n) {
      this.context.beginPath(), this.context.moveTo(n.x, n.y);
      for (const r of e.slice(1)) this.context.lineTo(r.x, r.y);
      this.context.closePath(), this.context.fillStyle = t, this.context.fill();
    }
  }
}
function Ua(i, e) {
  const t = Number.parseInt(i.slice(1), 16), n = Math.max(0, Math.min(255, (t >> 16) + e)), r = Math.max(0, Math.min(255, (t >> 8 & 255) + e)), s = Math.max(0, Math.min(255, (t & 255) + e));
  return `rgb(${n} ${r} ${s})`;
}
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const ia = "185", Wl = 0, Na = 1, Xl = 2, Di = 1, ql = 2, Pi = 3, Ln = 0, Rt = 1, fn = 2, pn = 0, hi = 1, Fa = 2, Oa = 3, Ba = 4, Yl = 5, zn = 100, Zl = 101, Kl = 102, $l = 103, Jl = 104, Ql = 200, jl = 201, ec = 202, tc = 203, fs = 204, ds = 205, nc = 206, ic = 207, rc = 208, sc = 209, ac = 210, oc = 211, lc = 212, cc = 213, uc = 214, ps = 0, ms = 1, gs = 2, pi = 3, _s = 4, xs = 5, vs = 6, Ms = 7, Vo = 0, hc = 1, fc = 2, jt = 0, Ho = 1, ko = 2, Wo = 3, Xo = 4, qo = 5, Yo = 6, Zo = 7, Ko = 300, kn = 301, mi = 302, Dr = 303, Ir = 304, yr = 306, Ss = 1e3, dn = 1001, Es = 1002, xt = 1003, dc = 1004, Hi = 1005, yt = 1006, Ur = 1007, Vn = 1008, Dt = 1009, $o = 1010, Jo = 1011, Ii = 1012, ra = 1013, nn = 1014, Jt = 1015, _n = 1016, sa = 1017, aa = 1018, Ui = 1020, Qo = 35902, jo = 35899, el = 1021, tl = 1022, kt = 1023, xn = 1026, Hn = 1027, nl = 1028, oa = 1029, Wn = 1030, la = 1031, ca = 1033, ur = 33776, hr = 33777, fr = 33778, dr = 33779, ys = 35840, Ts = 35841, bs = 35842, As = 35843, ws = 36196, Rs = 37492, Cs = 37496, Ps = 37488, Ls = 37489, _r = 37490, Ds = 37491, Is = 37808, Us = 37809, Ns = 37810, Fs = 37811, Os = 37812, Bs = 37813, zs = 37814, Gs = 37815, Vs = 37816, Hs = 37817, ks = 37818, Ws = 37819, Xs = 37820, qs = 37821, Ys = 36492, Zs = 36494, Ks = 36495, $s = 36283, Js = 36284, xr = 36285, Qs = 36286, pc = 3200, js = 0, mc = 1, Cn = "", Nt = "srgb", vr = "srgb-linear", Mr = "linear", Ze = "srgb", Zn = 7680, za = 519, gc = 512, _c = 513, xc = 514, ua = 515, vc = 516, Mc = 517, ha = 518, Sc = 519, Ga = 35044, Va = "300 es", Qt = 2e3, Ni = 2001;
function Ec(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function Sr(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function yc() {
  const i = Sr("canvas");
  return i.style.display = "block", i;
}
const Ha = {};
function ka(...i) {
  const e = "THREE." + i.shift();
  console.log(e, ...i);
}
function il(i) {
  const e = i[0];
  if (typeof e == "string" && e.startsWith("TSL:")) {
    const t = i[1];
    t && t.isStackTrace ? i[0] += " " + t.getLocation() : i[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return i;
}
function Ce(...i) {
  i = il(i);
  const e = "THREE." + i.shift();
  {
    const t = i[0];
    t && t.isStackTrace ? console.warn(t.getError(e)) : console.warn(e, ...i);
  }
}
function Xe(...i) {
  i = il(i);
  const e = "THREE." + i.shift();
  {
    const t = i[0];
    t && t.isStackTrace ? console.error(t.getError(e)) : console.error(e, ...i);
  }
}
function fi(...i) {
  const e = i.join(" ");
  e in Ha || (Ha[e] = !0, Ce(...i));
}
function Tc(i, e, t) {
  return new Promise(function(n, r) {
    function s() {
      switch (i.clientWaitSync(e, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          r();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(s, t);
          break;
        default:
          n();
      }
    }
    setTimeout(s, t);
  });
}
const bc = {
  [ps]: ms,
  [gs]: vs,
  [_s]: Ms,
  [pi]: xs,
  [ms]: ps,
  [vs]: gs,
  [Ms]: _s,
  [xs]: pi
};
class Xn {
  /**
   * Adds the given event listener to the given event type.
   *
   * @param {string} type - The type of event to listen to.
   * @param {Function} listener - The function that gets called when the event is fired.
   */
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  /**
   * Returns `true` if the given event listener has been added to the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to check.
   * @return {boolean} Whether the given event listener has been added to the given event type.
   */
  hasEventListener(e, t) {
    const n = this._listeners;
    return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  /**
   * Removes the given event listener from the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to remove.
   */
  removeEventListener(e, t) {
    const n = this._listeners;
    if (n === void 0) return;
    const r = n[e];
    if (r !== void 0) {
      const s = r.indexOf(t);
      s !== -1 && r.splice(s, 1);
    }
  }
  /**
   * Dispatches an event object.
   *
   * @param {Object} event - The event that gets fired.
   */
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const n = t[e.type];
    if (n !== void 0) {
      e.target = this;
      const r = n.slice(0);
      for (let s = 0, a = r.length; s < a; s++)
        r[s].call(this, e);
      e.target = null;
    }
  }
}
const St = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], Nr = Math.PI / 180, ea = 180 / Math.PI;
function Fi() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (St[i & 255] + St[i >> 8 & 255] + St[i >> 16 & 255] + St[i >> 24 & 255] + "-" + St[e & 255] + St[e >> 8 & 255] + "-" + St[e >> 16 & 15 | 64] + St[e >> 24 & 255] + "-" + St[t & 63 | 128] + St[t >> 8 & 255] + "-" + St[t >> 16 & 255] + St[t >> 24 & 255] + St[n & 255] + St[n >> 8 & 255] + St[n >> 16 & 255] + St[n >> 24 & 255]).toLowerCase();
}
function Ve(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function Ac(i, e) {
  return (i % e + e) % e;
}
function Fr(i, e, t) {
  return (1 - t) * i + t * e;
}
function Si(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function wt(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
const _a = class _a {
  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(e = 0, t = 0) {
    this.x = e, this.y = t;
  }
  /**
   * Alias for {@link Vector2#x}.
   *
   * @type {number}
   */
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  /**
   * Alias for {@link Vector2#y}.
   *
   * @type {number}
   */
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @return {Vector2} A reference to this vector.
   */
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector2} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @param {number} value - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector2} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector2} v - The vector to copy.
   * @return {Vector2} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector2} v - The vector to add.
   * @return {Vector2} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector2} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector2} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector2} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector2} v - The vector to subtract.
   * @return {Vector2} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector2} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector2} v - The vector to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector2} v - The vector to divide.
   * @return {Vector2} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by
   * the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {Vector2} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
  }
  /**
   * If this vector's x or y value is greater than the given vector's x or y
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is less than the given vector's x or y
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is greater than the max vector's x or y
   * value, it is replaced by the corresponding value.
   * If this vector's x or y value is less than the min vector's x or y value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector2} min - The minimum x and y values.
   * @param {Vector2} max - The maximum x and y values in the desired range.
   * @return {Vector2} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Ve(this.x, e.x, t.x), this.y = Ve(this.y, e.y, t.y), this;
  }
  /**
   * If this vector's x or y values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x or y values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Ve(this.x, e, t), this.y = Ve(this.y, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Ve(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector2} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x and y = -y.
   *
   * @return {Vector2} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the cross product with.
   * @return {number} The result of the cross product.
   */
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Computes the angle in radians of this vector with respect to the positive x-axis.
   *
   * @return {number} The angle in radians.
   */
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector2} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Ve(n, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector2} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector2} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector2} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector2} v1 - The first vector.
   * @param {Vector2} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector2} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]` and y
   * value to be `array[ offset + 1 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector2} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector2} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  /**
   * Rotates this vector around the given center by the given angle.
   *
   * @param {Vector2} center - The point around which to rotate.
   * @param {number} angle - The angle to rotate, in radians.
   * @return {Vector2} A reference to this vector.
   */
  rotateAround(e, t) {
    const n = Math.cos(t), r = Math.sin(t), s = this.x - e.x, a = this.y - e.y;
    return this.x = s * n - a * r + e.x, this.y = s * r + a * n + e.y, this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
};
_a.prototype.isVector2 = !0;
let He = _a;
class xi {
  /**
   * Constructs a new quaternion.
   *
   * @param {number} [x=0] - The x value of this quaternion.
   * @param {number} [y=0] - The y value of this quaternion.
   * @param {number} [z=0] - The z value of this quaternion.
   * @param {number} [w=1] - The w value of this quaternion.
   */
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  /**
   * Interpolates between two quaternions via SLERP. This implementation assumes the
   * quaternion data are managed in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @see {@link Quaternion#slerp}
   */
  static slerpFlat(e, t, n, r, s, a, o) {
    let c = n[r + 0], l = n[r + 1], h = n[r + 2], p = n[r + 3], u = s[a + 0], g = s[a + 1], v = s[a + 2], E = s[a + 3];
    if (p !== E || c !== u || l !== g || h !== v) {
      let m = c * u + l * g + h * v + p * E;
      m < 0 && (u = -u, g = -g, v = -v, E = -E, m = -m);
      let f = 1 - o;
      if (m < 0.9995) {
        const A = Math.acos(m), w = Math.sin(A);
        f = Math.sin(f * A) / w, o = Math.sin(o * A) / w, c = c * f + u * o, l = l * f + g * o, h = h * f + v * o, p = p * f + E * o;
      } else {
        c = c * f + u * o, l = l * f + g * o, h = h * f + v * o, p = p * f + E * o;
        const A = 1 / Math.sqrt(c * c + l * l + h * h + p * p);
        c *= A, l *= A, h *= A, p *= A;
      }
    }
    e[t] = c, e[t + 1] = l, e[t + 2] = h, e[t + 3] = p;
  }
  /**
   * Multiplies two quaternions. This implementation assumes the quaternion data are managed
   * in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @return {Array<number>} The destination array.
   * @see {@link Quaternion#multiplyQuaternions}.
   */
  static multiplyQuaternionsFlat(e, t, n, r, s, a) {
    const o = n[r], c = n[r + 1], l = n[r + 2], h = n[r + 3], p = s[a], u = s[a + 1], g = s[a + 2], v = s[a + 3];
    return e[t] = o * v + h * p + c * g - l * u, e[t + 1] = c * v + h * u + l * p - o * g, e[t + 2] = l * v + h * g + o * u - c * p, e[t + 3] = h * v - o * p - c * u - l * g, e;
  }
  /**
   * The x value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The y value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The z value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * The w value of this quaternion.
   *
   * @type {number}
   * @default 1
   */
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  /**
   * Sets the quaternion components.
   *
   * @param {number} x - The x value of this quaternion.
   * @param {number} y - The y value of this quaternion.
   * @param {number} z - The z value of this quaternion.
   * @param {number} w - The w value of this quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  set(e, t, n, r) {
    return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  /**
   * Returns a new quaternion with copied values from this instance.
   *
   * @return {Quaternion} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  /**
   * Copies the values of the given quaternion to this instance.
   *
   * @param {Quaternion} quaternion - The quaternion to copy.
   * @return {Quaternion} A reference to this quaternion.
   */
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the rotation specified by the given
   * Euler angles.
   *
   * @param {Euler} euler - The Euler angles.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromEuler(e, t = !0) {
    const n = e._x, r = e._y, s = e._z, a = e._order, o = Math.cos, c = Math.sin, l = o(n / 2), h = o(r / 2), p = o(s / 2), u = c(n / 2), g = c(r / 2), v = c(s / 2);
    switch (a) {
      case "XYZ":
        this._x = u * h * p + l * g * v, this._y = l * g * p - u * h * v, this._z = l * h * v + u * g * p, this._w = l * h * p - u * g * v;
        break;
      case "YXZ":
        this._x = u * h * p + l * g * v, this._y = l * g * p - u * h * v, this._z = l * h * v - u * g * p, this._w = l * h * p + u * g * v;
        break;
      case "ZXY":
        this._x = u * h * p - l * g * v, this._y = l * g * p + u * h * v, this._z = l * h * v + u * g * p, this._w = l * h * p - u * g * v;
        break;
      case "ZYX":
        this._x = u * h * p - l * g * v, this._y = l * g * p + u * h * v, this._z = l * h * v - u * g * p, this._w = l * h * p + u * g * v;
        break;
      case "YZX":
        this._x = u * h * p + l * g * v, this._y = l * g * p + u * h * v, this._z = l * h * v - u * g * p, this._w = l * h * p - u * g * v;
        break;
      case "XZY":
        this._x = u * h * p - l * g * v, this._y = l * g * p - u * h * v, this._z = l * h * v + u * g * p, this._w = l * h * p + u * g * v;
        break;
      default:
        Ce("Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given axis and angle.
   *
   * @param {Vector3} axis - The normalized axis.
   * @param {number} angle - The angle in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromAxisAngle(e, t) {
    const n = t / 2, r = Math.sin(n);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], r = t[4], s = t[8], a = t[1], o = t[5], c = t[9], l = t[2], h = t[6], p = t[10], u = n + o + p;
    if (u > 0) {
      const g = 0.5 / Math.sqrt(u + 1);
      this._w = 0.25 / g, this._x = (h - c) * g, this._y = (s - l) * g, this._z = (a - r) * g;
    } else if (n > o && n > p) {
      const g = 2 * Math.sqrt(1 + n - o - p);
      this._w = (h - c) / g, this._x = 0.25 * g, this._y = (r + a) / g, this._z = (s + l) / g;
    } else if (o > p) {
      const g = 2 * Math.sqrt(1 + o - n - p);
      this._w = (s - l) / g, this._x = (r + a) / g, this._y = 0.25 * g, this._z = (c + h) / g;
    } else {
      const g = 2 * Math.sqrt(1 + p - n - o);
      this._w = (a - r) / g, this._x = (s + l) / g, this._y = (c + h) / g, this._z = 0.25 * g;
    }
    return this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion to the rotation required to rotate the direction vector
   * `vFrom` to the direction vector `vTo`.
   *
   * @param {Vector3} vFrom - The first (normalized) direction vector.
   * @param {Vector3} vTo - The second (normalized) direction vector.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  /**
   * Returns the angle between this quaternion and the given one in radians.
   *
   * @param {Quaternion} q - The quaternion to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Ve(this.dot(e), -1, 1)));
  }
  /**
   * Rotates this quaternion by a given angular step to the given quaternion.
   * The method ensures that the final quaternion will not overshoot `q`.
   *
   * @param {Quaternion} q - The target quaternion.
   * @param {number} step - The angular step in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const r = Math.min(1, t / n);
    return this.slerp(e, r), this;
  }
  /**
   * Sets this quaternion to the identity quaternion; that is, to the
   * quaternion that represents "no rotation".
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  identity() {
    return this.set(0, 0, 0, 1);
  }
  /**
   * Inverts this quaternion via {@link Quaternion#conjugate}. The
   * quaternion is assumed to have unit length.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  invert() {
    return this.conjugate();
  }
  /**
   * Returns the rotational conjugate of this quaternion. The conjugate of a
   * quaternion represents the same rotation in the opposite direction about
   * the rotational axis.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  /**
   * Calculates the dot product of this quaternion and the given one.
   *
   * @param {Quaternion} v - The quaternion to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  /**
   * Computes the squared Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector. This can be useful if you are comparing the
   * lengths of two quaternions, as this is a slightly more efficient calculation than
   * {@link Quaternion#length}.
   *
   * @return {number} The squared Euclidean length.
   */
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   *
   * @return {number} The Euclidean length.
   */
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  /**
   * Normalizes this quaternion - that is, calculated the quaternion that performs
   * the same rotation as this one, but has a length equal to `1`.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  /**
   * Multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  /**
   * Pre-multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  /**
   * Multiplies the given quaternions and stores the result in this instance.
   *
   * @param {Quaternion} a - The first quaternion.
   * @param {Quaternion} b - The second quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiplyQuaternions(e, t) {
    const n = e._x, r = e._y, s = e._z, a = e._w, o = t._x, c = t._y, l = t._z, h = t._w;
    return this._x = n * h + a * o + r * l - s * c, this._y = r * h + a * c + s * o - n * l, this._z = s * h + a * l + n * c - r * o, this._w = a * h - n * o - r * c - s * l, this._onChangeCallback(), this;
  }
  /**
   * Performs a spherical linear interpolation between this quaternion and the target quaternion.
   *
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerp(e, t) {
    let n = e._x, r = e._y, s = e._z, a = e._w, o = this.dot(e);
    o < 0 && (n = -n, r = -r, s = -s, a = -a, o = -o);
    let c = 1 - t;
    if (o < 0.9995) {
      const l = Math.acos(o), h = Math.sin(l);
      c = Math.sin(c * l) / h, t = Math.sin(t * l) / h, this._x = this._x * c + n * t, this._y = this._y * c + r * t, this._z = this._z * c + s * t, this._w = this._w * c + a * t, this._onChangeCallback();
    } else
      this._x = this._x * c + n * t, this._y = this._y * c + r * t, this._z = this._z * c + s * t, this._w = this._w * c + a * t, this.normalize();
    return this;
  }
  /**
   * Performs a spherical linear interpolation between the given quaternions
   * and stores the result in this quaternion.
   *
   * @param {Quaternion} qa - The source quaternion.
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(
      r * Math.sin(e),
      r * Math.cos(e),
      s * Math.sin(t),
      s * Math.cos(t)
    );
  }
  /**
   * Returns `true` if this quaternion is equal with the given one.
   *
   * @param {Quaternion} quaternion - The quaternion to test for equality.
   * @return {boolean} Whether this quaternion is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  /**
   * Sets this quaternion's components from the given array.
   *
   * @param {Array<number>} array - An array holding the quaternion component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this quaternion to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The quaternion components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  /**
   * Sets the components of this quaternion from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
   * @param {number} index - The index into the attribute.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the
   * numerical elements of this quaternion in an array of format `[x, y, z, w]`.
   *
   * @return {Array<number>} The serialized quaternion.
   */
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
const xa = class xa {
  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(e = 0, t = 0, n = 0) {
    this.x = e, this.y = t, this.z = n;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @return {Vector3} A reference to this vector.
   */
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector3} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  /**
   * Sets the vector's x component to the given value.
   *
   * @param {number} x - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value.
   *
   * @param {number} y - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value.
   *
   * @param {number} z - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @param {number} value - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector3} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3} v - The vector to copy.
   * @return {Vector3} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector3} v - The vector to add.
   * @return {Vector3} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector3} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector3|Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector3} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector3} v - The vector to subtract.
   * @return {Vector3} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector3} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector3} v - The vector to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  /**
   * Multiplies the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  /**
   * Applies the given Euler rotation to this vector.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Vector3} A reference to this vector.
   */
  applyEuler(e) {
    return this.applyQuaternion(Wa.setFromEuler(e));
  }
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   *
   * @param {Vector3} axis - A normalized vector representing the rotation axis.
   * @param {number} angle - The angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  applyAxisAngle(e, t) {
    return this.applyQuaternion(Wa.setFromAxisAngle(e, t));
  }
  /**
   * Multiplies this vector with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[3] * n + s[6] * r, this.y = s[1] * t + s[4] * n + s[7] * r, this.z = s[2] * t + s[5] * n + s[8] * r, this;
  }
  /**
   * Multiplies this vector by the given normal matrix and normalizes
   * the result.
   *
   * @param {Matrix3} m - The normal matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
   * divides by perspective.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements, a = 1 / (s[3] * t + s[7] * n + s[11] * r + s[15]);
    return this.x = (s[0] * t + s[4] * n + s[8] * r + s[12]) * a, this.y = (s[1] * t + s[5] * n + s[9] * r + s[13]) * a, this.z = (s[2] * t + s[6] * n + s[10] * r + s[14]) * a, this;
  }
  /**
   * Applies the given Quaternion to this vector.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Vector3} A reference to this vector.
   */
  applyQuaternion(e) {
    const t = this.x, n = this.y, r = this.z, s = e.x, a = e.y, o = e.z, c = e.w, l = 2 * (a * r - o * n), h = 2 * (o * t - s * r), p = 2 * (s * n - a * t);
    return this.x = t + c * l + a * p - o * h, this.y = n + c * h + o * l - s * p, this.z = r + c * p + s * h - a * l, this;
  }
  /**
   * Projects this vector from world space into the camera's normalized
   * device coordinate (NDC) space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  /**
   * Unprojects this vector from the camera's normalized device coordinate (NDC)
   * space into world space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  /**
   * Transforms the direction of this vector by a matrix (the upper left 3 x 3
   * subset of the given 4x4 matrix and then normalizes the result.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Vector3} A reference to this vector.
   */
  transformDirection(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[4] * n + s[8] * r, this.y = s[1] * t + s[5] * n + s[9] * r, this.z = s[2] * t + s[6] * n + s[10] * r, this.normalize();
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector3} v - The vector to divide.
   * @return {Vector3} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector3} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * If this vector's x, y or z value is greater than the given vector's x, y or z
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is less than the given vector's x, y or z
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is greater than the max vector's x, y or z
   * value, it is replaced by the corresponding value.
   * If this vector's x, y or z value is less than the min vector's x, y or z value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector3} min - The minimum x, y and z values.
   * @param {Vector3} max - The maximum x, y and z values in the desired range.
   * @return {Vector3} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Ve(this.x, e.x, t.x), this.y = Ve(this.y, e.y, t.y), this.z = Ve(this.z, e.z, t.z), this;
  }
  /**
   * If this vector's x, y or z values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y or z values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Ve(this.x, e, t), this.y = Ve(this.y, e, t), this.z = Ve(this.z, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Ve(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector3} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   *
   * @return {Vector3} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector3} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector3} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector3} v1 - The first vector.
   * @param {Vector3} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the cross product with.
   * @return {Vector3} The result of the cross product.
   */
  cross(e) {
    return this.crossVectors(this, e);
  }
  /**
   * Calculates the cross product of the given vectors and stores the result
   * in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  crossVectors(e, t) {
    const n = e.x, r = e.y, s = e.z, a = t.x, o = t.y, c = t.z;
    return this.x = r * c - s * o, this.y = s * a - n * c, this.z = n * o - r * a, this;
  }
  /**
   * Projects this vector onto the given one.
   *
   * @param {Vector3} v - The vector to project to.
   * @return {Vector3} A reference to this vector.
   */
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  /**
   * Projects this vector onto a plane by subtracting this
   * vector projected onto the plane's normal from this vector.
   *
   * @param {Vector3} planeNormal - The plane normal.
   * @return {Vector3} A reference to this vector.
   */
  projectOnPlane(e) {
    return Or.copy(this).projectOnVector(e), this.sub(Or);
  }
  /**
   * Reflects this vector off a plane orthogonal to the given normal vector.
   *
   * @param {Vector3} normal - The (normalized) normal vector.
   * @return {Vector3} A reference to this vector.
   */
  reflect(e) {
    return this.sub(Or.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector3} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Ve(n, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector3} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
    return t * t + n * n + r * r;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {Spherical} s - The spherical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The phi angle in radians.
   * @param {number} theta - The theta angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  setFromSphericalCoords(e, t, n) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {Cylindrical} c - The cylindrical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle in radians.
   * @param {number} y - The y value.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  /**
   * Sets the vector components to the scale elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = r, this;
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  /**
   * Sets the vector components from the given Euler angles.
   *
   * @param {Euler} e - The Euler angles to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  /**
   * Sets the vector components from the RGB components of the
   * given color.
   *
   * @param {Color} c - The color to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector3} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
   * and z value to be `array[ offset + 2 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector3} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector3} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  /**
   * Sets this vector to a uniformly random point on a unit sphere.
   *
   * @return {Vector3} A reference to this vector.
   */
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
};
xa.prototype.isVector3 = !0;
let z = xa;
const Or = /* @__PURE__ */ new z(), Wa = /* @__PURE__ */ new xi(), va = class va {
  /**
   * Constructs a new 3x3 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   */
  constructor(e, t, n, r, s, a, o, c, l) {
    this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, s, a, o, c, l);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @return {Matrix3} A reference to this matrix.
   */
  set(e, t, n, r, s, a, o, c, l) {
    const h = this.elements;
    return h[0] = e, h[1] = r, h[2] = o, h[3] = t, h[4] = s, h[5] = c, h[6] = n, h[7] = a, h[8] = l, this;
  }
  /**
   * Sets this matrix to the 3x3 identity matrix.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix3} m - The matrix to copy.
   * @return {Matrix3} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix3} A reference to this matrix.
   */
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  /**
   * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  /**
   * Post-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 3x3 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix3} a - The first matrix.
   * @param {Matrix3} b - The second matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, a = n[0], o = n[3], c = n[6], l = n[1], h = n[4], p = n[7], u = n[2], g = n[5], v = n[8], E = r[0], m = r[3], f = r[6], A = r[1], w = r[4], M = r[7], b = r[2], y = r[5], R = r[8];
    return s[0] = a * E + o * A + c * b, s[3] = a * m + o * w + c * y, s[6] = a * f + o * M + c * R, s[1] = l * E + h * A + p * b, s[4] = l * m + h * w + p * y, s[7] = l * f + h * M + p * R, s[2] = u * E + g * A + v * b, s[5] = u * m + g * w + v * y, s[8] = u * f + g * M + v * R, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], h = e[8];
    return t * a * h - t * o * l - n * s * h + n * o * c + r * s * l - r * a * c;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], h = e[8], p = h * a - o * l, u = o * c - h * s, g = l * s - a * c, v = t * p + n * u + r * g;
    if (v === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const E = 1 / v;
    return e[0] = p * E, e[1] = (r * l - h * n) * E, e[2] = (o * n - r * a) * E, e[3] = u * E, e[4] = (h * t - r * c) * E, e[5] = (r * s - o * t) * E, e[6] = g * E, e[7] = (n * c - l * t) * E, e[8] = (a * t - n * s) * E, this;
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  /**
   * Computes the normal matrix which is the inverse transpose of the upper
   * left 3x3 portion of the given 4x4 matrix.
   *
   * @param {Matrix4} matrix4 - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   *
   * @param {Array<number>} r - An array to store the transposed matrix elements.
   * @return {Matrix3} A reference to this matrix.
   */
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  /**
   * Sets the UV transform matrix from offset, repeat, rotation, and center.
   *
   * @param {number} tx - Offset x.
   * @param {number} ty - Offset y.
   * @param {number} sx - Repeat x.
   * @param {number} sy - Repeat y.
   * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
   * @param {number} cx - Center x of rotation.
   * @param {number} cy - Center y of rotation
   * @return {Matrix3} A reference to this matrix.
   */
  setUvTransform(e, t, n, r, s, a, o) {
    const c = Math.cos(s), l = Math.sin(s);
    return this.set(
      n * c,
      n * l,
      -n * (c * a + l * o) + a + e,
      -r * l,
      r * c,
      -r * (-l * a + c * o) + o + t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Scales this matrix with the given scalar values.
   *
   * @deprecated
   * @param {number} sx - The amount to scale in the X axis.
   * @param {number} sy - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  scale(e, t) {
    return fi("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(Br.makeScale(e, t)), this;
  }
  /**
   * Rotates this matrix by the given angle.
   *
   * @deprecated
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  rotate(e) {
    return fi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(Br.makeRotation(-e)), this;
  }
  /**
   * Translates this matrix by the given scalar values.
   *
   * @deprecated
   * @param {number} tx - The amount to translate in the X axis.
   * @param {number} ty - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  translate(e, t) {
    return fi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(Br.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  /**
   * Sets this matrix as a 2D translation transform.
   *
   * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D rotational transformation.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D scale transform.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix3} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 9; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix3} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix3} A clone of this instance.
   */
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
};
va.prototype.isMatrix3 = !0;
let De = va;
const Br = /* @__PURE__ */ new De(), Xa = /* @__PURE__ */ new De().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), qa = /* @__PURE__ */ new De().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
function wc() {
  const i = {
    enabled: !0,
    workingColorSpace: vr,
    /**
     * Implementations of supported color spaces.
     *
     * Required:
     *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
     *	- whitePoint: reference white [ x y ]
     *	- transfer: transfer function (pre-defined)
     *	- toXYZ: Matrix3 RGB to XYZ transform
     *	- fromXYZ: Matrix3 XYZ to RGB transform
     *	- luminanceCoefficients: RGB luminance coefficients
     *
     * Optional:
     *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
     *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
     *
     * Reference:
     * - https://www.russellcottrell.com/photo/matrixCalculator.htm
     */
    spaces: {},
    convert: function(r, s, a) {
      return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === Ze && (r.r = mn(r.r), r.g = mn(r.g), r.b = mn(r.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === Ze && (r.r = di(r.r), r.g = di(r.g), r.b = di(r.b))), r;
    },
    workingToColorSpace: function(r, s) {
      return this.convert(r, this.workingColorSpace, s);
    },
    colorSpaceToWorking: function(r, s) {
      return this.convert(r, s, this.workingColorSpace);
    },
    getPrimaries: function(r) {
      return this.spaces[r].primaries;
    },
    getTransfer: function(r) {
      return r === Cn ? Mr : this.spaces[r].transfer;
    },
    getToneMappingMode: function(r) {
      return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(r, s = this.workingColorSpace) {
      return r.fromArray(this.spaces[s].luminanceCoefficients);
    },
    define: function(r) {
      Object.assign(this.spaces, r);
    },
    // Internal APIs
    _getMatrix: function(r, s, a) {
      return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(r) {
      return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(r = this.workingColorSpace) {
      return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
    },
    // Deprecated
    fromWorkingColorSpace: function(r, s) {
      return fi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), i.workingToColorSpace(r, s);
    },
    toWorkingColorSpace: function(r, s) {
      return fi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), i.colorSpaceToWorking(r, s);
    }
  }, e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], t = [0.2126, 0.7152, 0.0722], n = [0.3127, 0.329];
  return i.define({
    [vr]: {
      primaries: e,
      whitePoint: n,
      transfer: Mr,
      toXYZ: Xa,
      fromXYZ: qa,
      luminanceCoefficients: t,
      workingColorSpaceConfig: { unpackColorSpace: Nt },
      outputColorSpaceConfig: { drawingBufferColorSpace: Nt }
    },
    [Nt]: {
      primaries: e,
      whitePoint: n,
      transfer: Ze,
      toXYZ: Xa,
      fromXYZ: qa,
      luminanceCoefficients: t,
      outputColorSpaceConfig: { drawingBufferColorSpace: Nt }
    }
  }), i;
}
const Ge = /* @__PURE__ */ wc();
function mn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function di(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let Kn;
class Rc {
  /**
   * Returns a data URI containing a representation of the given image.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
   * @param {string} [type='image/png'] - Indicates the image format.
   * @return {string} The data URI.
   */
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let n;
    if (e instanceof HTMLCanvasElement)
      n = e;
    else {
      Kn === void 0 && (Kn = Sr("canvas")), Kn.width = e.width, Kn.height = e.height;
      const r = Kn.getContext("2d");
      e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height), n = Kn;
    }
    return n.toDataURL(t);
  }
  /**
   * Converts the given sRGB image data to linear color space.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
   * @return {HTMLCanvasElement|Object} The converted image.
   */
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = Sr("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height), s = r.data;
      for (let a = 0; a < s.length; a++)
        s[a] = mn(s[a] / 255) * 255;
      return n.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(mn(t[n] / 255) * 255) : t[n] = mn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Cc = 0;
class fa {
  /**
   * Constructs a new video texture.
   *
   * @param {any} [data=null] - The data definition of a texture.
   */
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Cc++ }), this.uuid = Fi(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  /**
   * Returns the dimensions of the source into the given target vector.
   *
   * @param {(Vector2|Vector3)} target - The target object the result is written into.
   * @return {(Vector2|Vector3)} The dimensions of the source.
   */
  getSize(e) {
    const t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  /**
   * When the property is set to `true`, the engine allocates the memory
   * for the texture (if necessary) and triggers the actual texture upload
   * to the GPU next time the source is used.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Serializes the source into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized source.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let a = 0, o = r.length; a < o; a++)
          r[a].isDataTexture ? s.push(zr(r[a].image)) : s.push(zr(r[a]));
      } else
        s = zr(r);
      n.url = s;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function zr(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Rc.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (Ce("Texture: Unable to serialize Texture."), {});
}
let Pc = 0;
const Gr = /* @__PURE__ */ new z();
class bt extends Xn {
  /**
   * Constructs a new texture.
   *
   * @param {?Object} [image=Texture.DEFAULT_IMAGE] - The image holding the texture data.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = bt.DEFAULT_IMAGE, t = bt.DEFAULT_MAPPING, n = dn, r = dn, s = yt, a = Vn, o = kt, c = Dt, l = bt.DEFAULT_ANISOTROPY, h = Cn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Pc++ }), this.uuid = Fi(), this.name = "", this.source = new fa(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = l, this.format = o, this.internalFormat = null, this.type = c, this.offset = new He(0, 0), this.repeat = new He(1, 1), this.center = new He(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new De(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  /**
   * The width of the texture in pixels.
   */
  get width() {
    return this.source.getSize(Gr).x;
  }
  /**
   * The height of the texture in pixels.
   */
  get height() {
    return this.source.getSize(Gr).y;
  }
  /**
   * The depth of the texture in pixels.
   */
  get depth() {
    return this.source.getSize(Gr).z;
  }
  /**
   * The image object holding the texture data.
   *
   * @type {?Object}
   */
  get image() {
    return this.source.data;
  }
  set image(e) {
    this.source.data = e;
  }
  /**
   * Updates the texture transformation matrix from the properties {@link Texture#offset},
   * {@link Texture#repeat}, {@link Texture#rotation}, and {@link Texture#center}.
   */
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  /**
   * Adds a range of data in the data texture to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Returns a new texture with copied values from this instance.
   *
   * @return {Texture} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {Texture} source - The texture to copy.
   * @return {Texture} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  /**
   * Sets this texture's properties based on `values`.
   * @param {Object} values - A container with texture parameters.
   */
  setValues(e) {
    for (const t in e) {
      const n = e[t];
      if (n === void 0) {
        Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      const r = this[t];
      if (r === void 0) {
        Ce(`Texture.setValues(): property '${t}' does not exist.`);
        continue;
      }
      r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n;
    }
  }
  /**
   * Serializes the texture into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized texture.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Texture#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Transforms the given uv vector with the textures uv transformation matrix.
   *
   * @param {Vector2} uv - The uv vector.
   * @return {Vector2} The transformed uv vector.
   */
  transformUv(e) {
    if (this.mapping !== Ko) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case Ss:
          e.x = e.x - Math.floor(e.x);
          break;
        case dn:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case Es:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case Ss:
          e.y = e.y - Math.floor(e.y);
          break;
        case dn:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case Es:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  /**
   * Setting this property to `true` indicates the engine the texture
   * must be updated in the next render. This triggers a texture upload
   * to the GPU and ensures correct texture parameter configuration.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  /**
   * Setting this property to `true` indicates the engine the PMREM
   * must be regenerated.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
bt.DEFAULT_IMAGE = null;
bt.DEFAULT_MAPPING = Ko;
bt.DEFAULT_ANISOTROPY = 1;
const Ma = class Ma {
  /**
   * Constructs a new 4D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   * @param {number} [w=1] - The w value of this vector.
   */
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.x = e, this.y = t, this.z = n, this.w = r;
  }
  /**
   * Alias for {@link Vector4#z}.
   *
   * @type {number}
   */
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  /**
   * Alias for {@link Vector4#w}.
   *
   * @type {number}
   */
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @param {number} w - The value of the w component.
   * @return {Vector4} A reference to this vector.
   */
  set(e, t, n, r) {
    return this.x = e, this.y = t, this.z = n, this.w = r, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector4} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Sets the vector's w component to the given value
   *
   * @param {number} w - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setW(e) {
    return this.w = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @param {number} value - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector4} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3|Vector4} v - The vector to copy.
   * @return {Vector4} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector4} v - The vector to add.
   * @return {Vector4} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector4} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector4} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector4} v - The vector to subtract.
   * @return {Vector4} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector4} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector4} v - The vector to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  /**
   * Multiplies this vector with the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, s = this.w, a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * s, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * s, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * s, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * s, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector4} v - The vector to divide.
   * @return {Vector4} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector4} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Sets the x, y and z components of this
   * vector to the quaternion's axis and w to the angle.
   *
   * @param {Quaternion} q - The Quaternion to set.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  /**
   * Sets the x, y and z components of this
   * vector to the axis of rotation and w to the angle.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromRotationMatrix(e) {
    let t, n, r, s;
    const c = e.elements, l = c[0], h = c[4], p = c[8], u = c[1], g = c[5], v = c[9], E = c[2], m = c[6], f = c[10];
    if (Math.abs(h - u) < 0.01 && Math.abs(p - E) < 0.01 && Math.abs(v - m) < 0.01) {
      if (Math.abs(h + u) < 0.1 && Math.abs(p + E) < 0.1 && Math.abs(v + m) < 0.1 && Math.abs(l + g + f - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const w = (l + 1) / 2, M = (g + 1) / 2, b = (f + 1) / 2, y = (h + u) / 4, R = (p + E) / 4, _ = (v + m) / 4;
      return w > M && w > b ? w < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(w), r = y / n, s = R / n) : M > b ? M < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(M), n = y / r, s = _ / r) : b < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(b), n = R / s, r = _ / s), this.set(n, r, s, t), this;
    }
    let A = Math.sqrt((m - v) * (m - v) + (p - E) * (p - E) + (u - h) * (u - h));
    return Math.abs(A) < 1e-3 && (A = 1), this.x = (m - v) / A, this.y = (p - E) / A, this.z = (u - h) / A, this.w = Math.acos((l + g + f - 1) / 2), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
   * value, it is replaced by the corresponding value.
   * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector4} min - The minimum x, y and z values.
   * @param {Vector4} max - The maximum x, y and z values in the desired range.
   * @return {Vector4} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Ve(this.x, e.x, t.x), this.y = Ve(this.y, e.y, t.y), this.z = Ve(this.z, e.z, t.z), this.w = Ve(this.w, e.w, t.w), this;
  }
  /**
   * If this vector's x, y, z or w values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y, z or w values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Ve(this.x, e, t), this.y = Ve(this.y, e, t), this.z = Ve(this.z, e, t), this.w = Ve(this.w, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Ve(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector4} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
   *
   * @return {Vector4} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector4} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector4} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector4} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector4} v1 - The first vector.
   * @param {Vector4} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector4} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
   * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector4} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector4} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
};
Ma.prototype.isVector4 = !0;
let tt = Ma;
class Lc extends Xn {
  /**
   * Render target options.
   *
   * @typedef {Object} RenderTarget~Options
   * @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not.
   * @property {number} [magFilter=LinearFilter] - The mag filter.
   * @property {number} [minFilter=LinearFilter] - The min filter.
   * @property {number} [format=RGBAFormat] - The texture format.
   * @property {number} [type=UnsignedByteType] - The texture type.
   * @property {?string} [internalFormat=null] - The texture's internal format.
   * @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [anisotropy=1] - The texture's anisotropy value.
   * @property {string} [colorSpace=NoColorSpace] - The texture's color space.
   * @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not.
   * @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not.
   * @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not.
   * @property {boolean} [resolveStencilBuffer=true] - Whether  to resolve the stencil buffer or not.
   * @property {?Texture} [depthTexture=null] - Reference to a depth texture.
   * @property {number} [samples=0] - The MSAA samples count.
   * @property {number} [count=1] - Defines the number of color attachments . Must be at least `1`.
   * @property {number} [depth=1] - The texture depth.
   * @property {boolean} [multiview=false] - Whether this target is used for multiview rendering (WebGL OVR_multiview2 extension).
   * @property {boolean} [useArrayDepthTexture=false] - Whether to create the depth texture as an array texture for per-layer depth testing. This is separate from multiview so layered render targets can use array depth without the multiview extension.
   */
  /**
   * Constructs a new render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, n = {}) {
    super(), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: yt,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1,
      useArrayDepthTexture: !1
    }, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new tt(0, 0, e, t), this.scissorTest = !1, this.viewport = new tt(0, 0, e, t), this.textures = [];
    const r = { width: e, height: t, depth: n.depth }, s = new bt(r), a = n.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = !0, this.textures[o].renderTarget = this;
    this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: yt,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
    for (let n = 0; n < this.textures.length; n++)
      this.textures[n].setValues(t);
  }
  /**
   * The texture representing the default color attachment.
   *
   * @type {Texture}
   */
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
  }
  /**
   * Instead of saving the depth in a renderbuffer, a texture
   * can be used instead which is useful for further processing
   * e.g. in context of post-processing.
   *
   * @type {?DepthTexture}
   * @default null
   */
  get depthTexture() {
    return this._depthTexture;
  }
  /**
   * Sets the size of this render target.
   *
   * @param {number} width - The width.
   * @param {number} height - The height.
   * @param {number} [depth=1] - The depth.
   */
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  /**
   * Returns a new render target with copied values from this instance.
   *
   * @return {RenderTarget} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the settings of the given render target. This is a structural copy so
   * no resources are shared between render targets after the copy. That includes
   * all MRT textures and the depth texture.
   *
   * @param {RenderTarget} source - The render target to copy.
   * @return {RenderTarget} A reference to this instance.
   */
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, n = e.textures.length; t < n; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const r = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new fa(r);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires RenderTarget#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class en extends Lc {
  /**
   * Constructs a new 3D render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class rl extends bt {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = xt, this.minFilter = xt, this.wrapR = dn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  /**
   * Describes that a specific layer of the texture needs to be updated.
   * Normally when {@link Texture#needsUpdate} is set to `true`, the
   * entire data texture array is sent to the GPU. Marking specific
   * layers will only transmit subsets of all mipmaps associated with a
   * specific depth in the array which is often much more performant.
   *
   * @param {number} layerIndex - The layer index that should be updated.
   */
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  /**
   * Resets the layer updates registry.
   */
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class Dc extends bt {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = xt, this.minFilter = xt, this.wrapR = dn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const Er = class Er {
  /**
   * Constructs a new 4x4 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   */
  constructor(e, t, n, r, s, a, o, c, l, h, p, u, g, v, E, m) {
    this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, s, a, o, c, l, h, p, u, g, v, E, m);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   * @return {Matrix4} A reference to this matrix.
   */
  set(e, t, n, r, s, a, o, c, l, h, p, u, g, v, E, m) {
    const f = this.elements;
    return f[0] = e, f[4] = t, f[8] = n, f[12] = r, f[1] = s, f[5] = a, f[9] = o, f[13] = c, f[2] = l, f[6] = h, f[10] = p, f[14] = u, f[3] = g, f[7] = v, f[11] = E, f[15] = m, this;
  }
  /**
   * Sets this matrix to the 4x4 identity matrix.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix4} A clone of this instance.
   */
  clone() {
    return new Er().fromArray(this.elements);
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix4} m - The matrix to copy.
   * @return {Matrix4} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  /**
   * Copies the translation component of the given matrix
   * into this matrix's translation component.
   *
   * @param {Matrix4} m - The matrix to copy the translation component.
   * @return {Matrix4} A reference to this matrix.
   */
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  /**
   * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  extractBasis(e, t, n) {
    return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
  }
  /**
   * Sets the given basis vectors to this matrix.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the rotation component of the given matrix
   * into this matrix's rotation component.
   *
   * Note: This method does not support reflection matrices.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  extractRotation(e) {
    if (e.determinantAffine() === 0)
      return this.identity();
    const t = this.elements, n = e.elements, r = 1 / $n.setFromMatrixColumn(e, 0).length(), s = 1 / $n.setFromMatrixColumn(e, 1).length(), a = 1 / $n.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * s, t[5] = n[5] * s, t[6] = n[6] * s, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component (the upper left 3x3 matrix) of this matrix to
   * the rotation specified by the given Euler angles. The rest of
   * the matrix is set to the identity. Depending on the {@link Euler#order},
   * there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
   * for a complete list.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z, a = Math.cos(n), o = Math.sin(n), c = Math.cos(r), l = Math.sin(r), h = Math.cos(s), p = Math.sin(s);
    if (e.order === "XYZ") {
      const u = a * h, g = a * p, v = o * h, E = o * p;
      t[0] = c * h, t[4] = -c * p, t[8] = l, t[1] = g + v * l, t[5] = u - E * l, t[9] = -o * c, t[2] = E - u * l, t[6] = v + g * l, t[10] = a * c;
    } else if (e.order === "YXZ") {
      const u = c * h, g = c * p, v = l * h, E = l * p;
      t[0] = u + E * o, t[4] = v * o - g, t[8] = a * l, t[1] = a * p, t[5] = a * h, t[9] = -o, t[2] = g * o - v, t[6] = E + u * o, t[10] = a * c;
    } else if (e.order === "ZXY") {
      const u = c * h, g = c * p, v = l * h, E = l * p;
      t[0] = u - E * o, t[4] = -a * p, t[8] = v + g * o, t[1] = g + v * o, t[5] = a * h, t[9] = E - u * o, t[2] = -a * l, t[6] = o, t[10] = a * c;
    } else if (e.order === "ZYX") {
      const u = a * h, g = a * p, v = o * h, E = o * p;
      t[0] = c * h, t[4] = v * l - g, t[8] = u * l + E, t[1] = c * p, t[5] = E * l + u, t[9] = g * l - v, t[2] = -l, t[6] = o * c, t[10] = a * c;
    } else if (e.order === "YZX") {
      const u = a * c, g = a * l, v = o * c, E = o * l;
      t[0] = c * h, t[4] = E - u * p, t[8] = v * p + g, t[1] = p, t[5] = a * h, t[9] = -o * h, t[2] = -l * h, t[6] = g * p + v, t[10] = u - E * p;
    } else if (e.order === "XZY") {
      const u = a * c, g = a * l, v = o * c, E = o * l;
      t[0] = c * h, t[4] = -p, t[8] = l * h, t[1] = u * p + E, t[5] = a * h, t[9] = g * p - v, t[2] = v * p - g, t[6] = o * h, t[10] = E * p + u;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component of this matrix to the rotation specified by
   * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
   * The rest of the matrix is set to the identity.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromQuaternion(e) {
    return this.compose(Ic, e, Uc);
  }
  /**
   * Sets the rotation component of the transformation matrix, looking from `eye` towards
   * `target`, and oriented by the up-direction.
   *
   * @param {Vector3} eye - The eye vector.
   * @param {Vector3} target - The target vector.
   * @param {Vector3} up - The up vector.
   * @return {Matrix4} A reference to this matrix.
   */
  lookAt(e, t, n) {
    const r = this.elements;
    return Pt.subVectors(e, t), Pt.lengthSq() === 0 && (Pt.z = 1), Pt.normalize(), yn.crossVectors(n, Pt), yn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Pt.x += 1e-4 : Pt.z += 1e-4, Pt.normalize(), yn.crossVectors(n, Pt)), yn.normalize(), ki.crossVectors(Pt, yn), r[0] = yn.x, r[4] = ki.x, r[8] = Pt.x, r[1] = yn.y, r[5] = ki.y, r[9] = Pt.y, r[2] = yn.z, r[6] = ki.z, r[10] = Pt.z, this;
  }
  /**
   * Post-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 4x4 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix4} a - The first matrix.
   * @param {Matrix4} b - The second matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, a = n[0], o = n[4], c = n[8], l = n[12], h = n[1], p = n[5], u = n[9], g = n[13], v = n[2], E = n[6], m = n[10], f = n[14], A = n[3], w = n[7], M = n[11], b = n[15], y = r[0], R = r[4], _ = r[8], T = r[12], I = r[1], P = r[5], N = r[9], q = r[13], Y = r[2], O = r[6], X = r[10], V = r[14], J = r[3], ee = r[7], oe = r[11], se = r[15];
    return s[0] = a * y + o * I + c * Y + l * J, s[4] = a * R + o * P + c * O + l * ee, s[8] = a * _ + o * N + c * X + l * oe, s[12] = a * T + o * q + c * V + l * se, s[1] = h * y + p * I + u * Y + g * J, s[5] = h * R + p * P + u * O + g * ee, s[9] = h * _ + p * N + u * X + g * oe, s[13] = h * T + p * q + u * V + g * se, s[2] = v * y + E * I + m * Y + f * J, s[6] = v * R + E * P + m * O + f * ee, s[10] = v * _ + E * N + m * X + f * oe, s[14] = v * T + E * q + m * V + f * se, s[3] = A * y + w * I + M * Y + b * J, s[7] = A * R + w * P + M * O + b * ee, s[11] = A * _ + w * N + M * X + b * oe, s[15] = A * T + w * q + M * V + b * se, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html).
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], s = e[12], a = e[1], o = e[5], c = e[9], l = e[13], h = e[2], p = e[6], u = e[10], g = e[14], v = e[3], E = e[7], m = e[11], f = e[15], A = c * g - l * u, w = o * g - l * p, M = o * u - c * p, b = a * g - l * h, y = a * u - c * h, R = a * p - o * h;
    return t * (E * A - m * w + f * M) - n * (v * A - m * b + f * y) + r * (v * w - E * b + f * R) - s * (v * M - E * y + m * R);
  }
  /**
   * Computes and returns the determinant of the 4x4 matrix, but assumes the
   * matrix is affine, saving some computations.
   *
   * For affine matrices (like an object's world matrix), this value equals the
   * full 4x4 {@link Matrix4#determinant} but is cheaper to compute.
   *
   * Assumes the bottom row is [0, 0, 0, 1].
   *
   * @return {number} The determinant of the matrix.
   */
  determinantAffine() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], s = e[1], a = e[5], o = e[9], c = e[2], l = e[6], h = e[10];
    return t * (a * h - o * l) - n * (s * h - o * c) + r * (s * l - a * c);
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  /**
   * Sets the position component for this matrix from the given vector,
   * without affecting the rest of the matrix.
   *
   * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
   * @param {number} y - The y component of the vector.
   * @param {number} z - The z component of the vector.
   * @return {Matrix4} A reference to this matrix.
   */
  setPosition(e, t, n) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], h = e[8], p = e[9], u = e[10], g = e[11], v = e[12], E = e[13], m = e[14], f = e[15], A = t * o - n * a, w = t * c - r * a, M = t * l - s * a, b = n * c - r * o, y = n * l - s * o, R = r * l - s * c, _ = h * E - p * v, T = h * m - u * v, I = h * f - g * v, P = p * m - u * E, N = p * f - g * E, q = u * f - g * m, Y = A * q - w * N + M * P + b * I - y * T + R * _;
    if (Y === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const O = 1 / Y;
    return e[0] = (o * q - c * N + l * P) * O, e[1] = (r * N - n * q - s * P) * O, e[2] = (E * R - m * y + f * b) * O, e[3] = (u * y - p * R - g * b) * O, e[4] = (c * I - a * q - l * T) * O, e[5] = (t * q - r * I + s * T) * O, e[6] = (m * M - v * R - f * w) * O, e[7] = (h * R - u * M + g * w) * O, e[8] = (a * N - o * I + l * _) * O, e[9] = (n * I - t * N - s * _) * O, e[10] = (v * y - E * M + f * A) * O, e[11] = (p * M - h * y - g * A) * O, e[12] = (o * T - a * P - c * _) * O, e[13] = (t * P - n * T + r * _) * O, e[14] = (E * w - v * b - m * A) * O, e[15] = (h * b - p * w + u * A) * O, this;
  }
  /**
   * Multiplies the columns of this matrix by the given vector.
   *
   * @param {Vector3} v - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  scale(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z;
    return t[0] *= n, t[4] *= r, t[8] *= s, t[1] *= n, t[5] *= r, t[9] *= s, t[2] *= n, t[6] *= r, t[10] *= s, t[3] *= n, t[7] *= r, t[11] *= s, this;
  }
  /**
   * Gets the maximum scale value of the three axes.
   *
   * @return {number} The maximum scale.
   */
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, r));
  }
  /**
   * Sets this matrix as a translation transform from the given vector.
   *
   * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @param {number} z - The amount to translate in the z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the X axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Y axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Z axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the given axis by
   * the given angle.
   *
   * This is a somewhat controversial but mathematically sound alternative to
   * rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199).
   *
   * @param {Vector3} axis - The normalized rotation axis.
   * @param {number} angle - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationAxis(e, t) {
    const n = Math.cos(t), r = Math.sin(t), s = 1 - n, a = e.x, o = e.y, c = e.z, l = s * a, h = s * o;
    return this.set(
      l * a + n,
      l * o - r * c,
      l * c + r * o,
      0,
      l * o + r * c,
      h * o + n,
      h * c - r * a,
      0,
      l * c - r * o,
      h * c + r * a,
      s * c * c + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a scale transformation.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @param {number} z - The amount to scale in the Z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a shear transformation.
   *
   * @param {number} xy - The amount to shear X by Y.
   * @param {number} xz - The amount to shear X by Z.
   * @param {number} yx - The amount to shear Y by X.
   * @param {number} yz - The amount to shear Y by Z.
   * @param {number} zx - The amount to shear Z by X.
   * @param {number} zy - The amount to shear Z by Y.
   * @return {Matrix4} A reference to this matrix.
   */
  makeShear(e, t, n, r, s, a) {
    return this.set(
      1,
      n,
      s,
      0,
      e,
      1,
      a,
      0,
      t,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix to the transformation composed of the given position,
   * rotation (Quaternion) and scale.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  compose(e, t, n) {
    const r = this.elements, s = t._x, a = t._y, o = t._z, c = t._w, l = s + s, h = a + a, p = o + o, u = s * l, g = s * h, v = s * p, E = a * h, m = a * p, f = o * p, A = c * l, w = c * h, M = c * p, b = n.x, y = n.y, R = n.z;
    return r[0] = (1 - (E + f)) * b, r[1] = (g + M) * b, r[2] = (v - w) * b, r[3] = 0, r[4] = (g - M) * y, r[5] = (1 - (u + f)) * y, r[6] = (m + A) * y, r[7] = 0, r[8] = (v + w) * R, r[9] = (m - A) * R, r[10] = (1 - (u + E)) * R, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  /**
   * Decomposes this matrix into its position, rotation and scale components
   * and provides the result in the given objects.
   *
   * Note: Not all matrices are decomposable in this way. For example, if an
   * object has a non-uniformly scaled parent, then the object's world matrix
   * may not be decomposable, and this method may not be appropriate.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  decompose(e, t, n) {
    const r = this.elements;
    e.x = r[12], e.y = r[13], e.z = r[14];
    const s = this.determinantAffine();
    if (s === 0)
      return n.set(1, 1, 1), t.identity(), this;
    let a = $n.set(r[0], r[1], r[2]).length();
    const o = $n.set(r[4], r[5], r[6]).length(), c = $n.set(r[8], r[9], r[10]).length();
    s < 0 && (a = -a), Bt.copy(this);
    const l = 1 / a, h = 1 / o, p = 1 / c;
    return Bt.elements[0] *= l, Bt.elements[1] *= l, Bt.elements[2] *= l, Bt.elements[4] *= h, Bt.elements[5] *= h, Bt.elements[6] *= h, Bt.elements[8] *= p, Bt.elements[9] *= p, Bt.elements[10] *= p, t.setFromRotationMatrix(Bt), n.x = a, n.y = o, n.z = c, this;
  }
  /**
  	 * Creates a perspective projection matrix. This is used internally by
  	 * {@link PerspectiveCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makePerspective(e, t, n, r, s, a, o = Qt, c = !1) {
    const l = this.elements, h = 2 * s / (t - e), p = 2 * s / (n - r), u = (t + e) / (t - e), g = (n + r) / (n - r);
    let v, E;
    if (c)
      v = s / (a - s), E = a * s / (a - s);
    else if (o === Qt)
      v = -(a + s) / (a - s), E = -2 * a * s / (a - s);
    else if (o === Ni)
      v = -a / (a - s), E = -a * s / (a - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = h, l[4] = 0, l[8] = u, l[12] = 0, l[1] = 0, l[5] = p, l[9] = g, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = v, l[14] = E, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  /**
  	 * Creates a orthographic projection matrix. This is used internally by
  	 * {@link OrthographicCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makeOrthographic(e, t, n, r, s, a, o = Qt, c = !1) {
    const l = this.elements, h = 2 / (t - e), p = 2 / (n - r), u = -(t + e) / (t - e), g = -(n + r) / (n - r);
    let v, E;
    if (c)
      v = 1 / (a - s), E = a / (a - s);
    else if (o === Qt)
      v = -2 / (a - s), E = -(a + s) / (a - s);
    else if (o === Ni)
      v = -1 / (a - s), E = -s / (a - s);
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = h, l[4] = 0, l[8] = 0, l[12] = u, l[1] = 0, l[5] = p, l[9] = 0, l[13] = g, l[2] = 0, l[6] = 0, l[10] = v, l[14] = E, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix4} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 16; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix4} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
};
Er.prototype.isMatrix4 = !0;
let st = Er;
const $n = /* @__PURE__ */ new z(), Bt = /* @__PURE__ */ new st(), Ic = /* @__PURE__ */ new z(0, 0, 0), Uc = /* @__PURE__ */ new z(1, 1, 1), yn = /* @__PURE__ */ new z(), ki = /* @__PURE__ */ new z(), Pt = /* @__PURE__ */ new z(), Ya = /* @__PURE__ */ new st(), Za = /* @__PURE__ */ new xi();
class Dn {
  /**
   * Constructs a new euler instance.
   *
   * @param {number} [x=0] - The angle of the x axis in radians.
   * @param {number} [y=0] - The angle of the y axis in radians.
   * @param {number} [z=0] - The angle of the z axis in radians.
   * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
   */
  constructor(e = 0, t = 0, n = 0, r = Dn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = r;
  }
  /**
   * The angle of the x axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The angle of the y axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The angle of the z axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * A string representing the order that the rotations are applied.
   *
   * @type {string}
   * @default 'XYZ'
   */
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  /**
   * Sets the Euler components.
   *
   * @param {number} x - The angle of the x axis in radians.
   * @param {number} y - The angle of the y axis in radians.
   * @param {number} z - The angle of the z axis in radians.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  set(e, t, n, r = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  /**
   * Returns a new Euler instance with copied values from this instance.
   *
   * @return {Euler} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  /**
   * Copies the values of the given Euler instance to this instance.
   *
   * @param {Euler} euler - The Euler instance to copy.
   * @return {Euler} A reference to this Euler instance.
   */
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a pure rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const r = e.elements, s = r[0], a = r[4], o = r[8], c = r[1], l = r[5], h = r[9], p = r[2], u = r[6], g = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(Ve(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, g), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(u, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Ve(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, g), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-p, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Ve(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(-p, g), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(c, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Ve(p, -1, 1)), Math.abs(p) < 0.9999999 ? (this._x = Math.atan2(u, g), this._z = Math.atan2(c, s)) : (this._x = 0, this._z = Math.atan2(-a, l));
        break;
      case "YZX":
        this._z = Math.asin(Ve(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-p, s)) : (this._x = 0, this._y = Math.atan2(o, g));
        break;
      case "XZY":
        this._z = Math.asin(-Ve(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(u, l), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-h, g), this._y = 0);
        break;
      default:
        Ce("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a normalized quaternion.
   *
   * @param {Quaternion} q - A normalized Quaternion.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromQuaternion(e, t, n) {
    return Ya.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Ya, t, n);
  }
  /**
   * Sets the angles of this Euler instance from the given vector.
   *
   * @param {Vector3} v - The vector.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  /**
   * Resets the euler angle with a new order by creating a quaternion from this
   * euler angle and then setting this euler angle with the quaternion and the
   * new order.
   *
   * Warning: This discards revolution information.
   *
   * @param {string} [newOrder] - A string representing the new order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  reorder(e) {
    return Za.setFromEuler(this), this.setFromQuaternion(Za, e);
  }
  /**
   * Returns `true` if this Euler instance is equal with the given one.
   *
   * @param {Euler} euler - The Euler instance to test for equality.
   * @return {boolean} Whether this Euler instance is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  /**
   * Sets this Euler instance's components to values from the given array. The first three
   * entries of the array are assign to the x,y and z components. An optional fourth entry
   * defines the Euler order.
   *
   * @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
   * @return {Euler} A reference to this Euler instance.
   */
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this Euler instance to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number,number,number,string>} The Euler components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Dn.DEFAULT_ORDER = "XYZ";
class sl {
  /**
   * Constructs a new layers instance, with membership
   * initially set to layer `0`.
   */
  constructor() {
    this.mask = 1;
  }
  /**
   * Sets membership to the given layer, and remove membership all other layers.
   *
   * @param {number} layer - The layer to set.
   */
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  /**
   * Adds membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  /**
   * Adds membership to all layers.
   */
  enableAll() {
    this.mask = -1;
  }
  /**
   * Toggles the membership of the given layer.
   *
   * @param {number} layer - The layer to toggle.
   */
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  /**
   * Removes membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  /**
   * Removes the membership from all layers.
   */
  disableAll() {
    this.mask = 0;
  }
  /**
   * Returns `true` if this and the given layers object have at least one
   * layer in common.
   *
   * @param {Layers} layers - The layers to test.
   * @return {boolean } Whether this and the given layers object have at least one layer in common or not.
   */
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  /**
   * Returns `true` if the given layer is enabled.
   *
   * @param {number} layer - The layer to test.
   * @return {boolean } Whether the given layer is enabled or not.
   */
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Nc = 0;
const Ka = /* @__PURE__ */ new z(), Jn = /* @__PURE__ */ new xi(), sn = /* @__PURE__ */ new st(), Wi = /* @__PURE__ */ new z(), Ei = /* @__PURE__ */ new z(), Fc = /* @__PURE__ */ new z(), Oc = /* @__PURE__ */ new xi(), $a = /* @__PURE__ */ new z(1, 0, 0), Ja = /* @__PURE__ */ new z(0, 1, 0), Qa = /* @__PURE__ */ new z(0, 0, 1), ja = { type: "added" }, Bc = { type: "removed" }, Qn = { type: "childadded", child: null }, Vr = { type: "childremoved", child: null };
class vt extends Xn {
  /**
   * Constructs a new 3D object.
   */
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Nc++ }), this.uuid = Fi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = vt.DEFAULT_UP.clone();
    const e = new z(), t = new Dn(), n = new xi(), r = new z(1, 1, 1);
    function s() {
      n.setFromEuler(t, !1);
    }
    function a() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(s), n._onChange(a), Object.defineProperties(this, {
      /**
       * Represents the object's local position.
       *
       * @name Object3D#position
       * @type {Vector3}
       * @default (0,0,0)
       */
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      /**
       * Represents the object's local rotation as Euler angles, in radians.
       *
       * @name Object3D#rotation
       * @type {Euler}
       * @default (0,0,0)
       */
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      /**
       * Represents the object's local rotation as Quaternions.
       *
       * @name Object3D#quaternion
       * @type {Quaternion}
       */
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      /**
       * Represents the object's local scale.
       *
       * @name Object3D#scale
       * @type {Vector3}
       * @default (1,1,1)
       */
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      /**
       * Represents the object's model-view matrix.
       *
       * @name Object3D#modelViewMatrix
       * @type {Matrix4}
       */
      modelViewMatrix: {
        value: new st()
      },
      /**
       * Represents the object's normal matrix.
       *
       * @name Object3D#normalMatrix
       * @type {Matrix3}
       */
      normalMatrix: {
        value: new De()
      }
    }), this.matrix = new st(), this.matrixWorld = new st(), this.matrixAutoUpdate = vt.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new sl(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeShadow() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onAfterShadow() {
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onAfterRender() {
  }
  /**
   * Applies the given transformation matrix to the object and updates the object's position,
   * rotation and scale.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   */
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  /**
   * Applies a rotation represented by given the quaternion to the 3D object.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Object3D} A reference to this instance.
   */
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  /**
   * Sets the given rotation represented as an axis/angle couple to the 3D object.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   */
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  /**
   * Sets the given rotation represented as Euler angles to the 3D object.
   *
   * @param {Euler} euler - The Euler angles.
   */
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  /**
   * Sets the given rotation represented as rotation matrix to the 3D object.
   *
   * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
   * a pure rotation matrix (i.e, unscaled).
   */
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  /**
   * Sets the given rotation represented as a Quaternion to the 3D object.
   *
   * @param {Quaternion} q - The Quaternion
   */
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  /**
   * Rotates the 3D object along an axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnAxis(e, t) {
    return Jn.setFromAxisAngle(e, t), this.quaternion.multiply(Jn), this;
  }
  /**
   * Rotates the 3D object along an axis in world space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnWorldAxis(e, t) {
    return Jn.setFromAxisAngle(e, t), this.quaternion.premultiply(Jn), this;
  }
  /**
   * Rotates the 3D object around its X axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateX(e) {
    return this.rotateOnAxis($a, e);
  }
  /**
   * Rotates the 3D object around its Y axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateY(e) {
    return this.rotateOnAxis(Ja, e);
  }
  /**
   * Rotates the 3D object around its Z axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateZ(e) {
    return this.rotateOnAxis(Qa, e);
  }
  /**
   * Translate the 3D object by a distance along the given axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateOnAxis(e, t) {
    return Ka.copy(e).applyQuaternion(this.quaternion), this.position.add(Ka.multiplyScalar(t)), this;
  }
  /**
   * Translate the 3D object by a distance along its X-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateX(e) {
    return this.translateOnAxis($a, e);
  }
  /**
   * Translate the 3D object by a distance along its Y-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateY(e) {
    return this.translateOnAxis(Ja, e);
  }
  /**
   * Translate the 3D object by a distance along its Z-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateZ(e) {
    return this.translateOnAxis(Qa, e);
  }
  /**
   * Converts the given vector from this 3D object's local space to world space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  /**
   * Converts the given vector from this 3D object's world space to local space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(sn.copy(this.matrixWorld).invert());
  }
  /**
   * Rotates the object to face a point in world space.
   *
   * This method does not support objects having non-uniformly-scaled parent(s).
   *
   * @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
   * @param {number} [y] - The y coordinate in world space.
   * @param {number} [z] - The z coordinate in world space.
   */
  lookAt(e, t, n) {
    e.isVector3 ? Wi.copy(e) : Wi.set(e, t, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Ei.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? sn.lookAt(Ei, Wi, this.up) : sn.lookAt(Wi, Ei, this.up), this.quaternion.setFromRotationMatrix(sn), r && (sn.extractRotation(r.matrixWorld), Jn.setFromRotationMatrix(sn), this.quaternion.premultiply(Jn.invert()));
  }
  /**
   * Adds the given 3D object as a child to this 3D object. An arbitrary number of
   * objects may be added. Any current parent on an object passed in here will be
   * removed, since an object can have at most one parent.
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to add.
   * @return {Object3D} A reference to this instance.
   */
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (Xe("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(ja), Qn.child = e, this.dispatchEvent(Qn), Qn.child = null) : Xe("Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  /**
   * Removes the given 3D object as child from this 3D object.
   * An arbitrary number of objects may be removed.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @param {Object3D} object - The 3D object to remove.
   * @return {Object3D} A reference to this instance.
   */
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Bc), Vr.child = e, this.dispatchEvent(Vr), Vr.child = null), this;
  }
  /**
   * Removes this 3D object from its current parent.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  /**
   * Removes all child objects.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  clear() {
    return this.remove(...this.children);
  }
  /**
   * Adds the given 3D object as a child of this 3D object, while maintaining the object's world
   * transform. This method does not support scene graphs having non-uniformly-scaled nodes(s).
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to attach.
   * @return {Object3D} A reference to this instance.
   */
  attach(e) {
    return this.updateWorldMatrix(!0, !1), sn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), sn.multiply(e.parent.matrixWorld)), e.applyMatrix4(sn), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(ja), Qn.child = e, this.dispatchEvent(Qn), Qn.child = null, this;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching ID.
   *
   * @param {number} id - The id.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching name.
   *
   * @param {string} name - The name.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const a = this.children[n].getObjectByProperty(e, t);
      if (a !== void 0)
        return a;
    }
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns all 3D objects with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @param {Array<Object3D>} result - The method stores the result in this array.
   * @return {Array<Object3D>} The found 3D objects.
   */
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++)
      r[s].getObjectsByProperty(e, t, n);
    return n;
  }
  /**
   * Returns a vector representing the position of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's position in world space.
   */
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  /**
   * Returns a Quaternion representing the position of the 3D object in world space.
   *
   * @param {Quaternion} target - The target Quaternion the result is stored to.
   * @return {Quaternion} The 3D object's rotation in world space.
   */
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ei, e, Fc), e;
  }
  /**
   * Returns a vector representing the scale of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's scale in world space.
   */
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ei, Oc, e), e;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  /**
   * Abstract method to get intersections between a casted ray and this
   * 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
   * implement this method in order to use raycasting.
   *
   * @abstract
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - An array holding the result of the method.
   */
  raycast() {
  }
  /**
   * Executes the callback on this 3D object and all descendants.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverse(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
   * Descendants of invisible 3D objects are not traversed.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverseVisible(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  /**
   * Updates the transformation matrix in local space by computing it from the current
   * position, rotation and scale values.
   */
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const e = this.pivot;
    if (e !== null) {
      const t = e.x, n = e.y, r = e.z, s = this.matrix.elements;
      s[12] += t - s[0] * t - s[4] * n - s[8] * r, s[13] += n - s[1] * t - s[5] * n - s[9] * r, s[14] += r - s[2] * t - s[6] * n - s[10] * r;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  /**
   * Updates the transformation matrix in world space of this 3D objects and its descendants.
   *
   * To ensure correct results, this method also recomputes the 3D object's transformation matrix in
   * local space. The computation of the local and world matrix can be controlled with the
   * {@link Object3D#matrixAutoUpdate} and {@link Object3D#matrixWorldAutoUpdate} flags which are both
   * `true` by default.  Set these flags to `false` if you need more control over the update matrix process.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].updateMatrixWorld(e);
  }
  /**
   * An alternative version of {@link Object3D#updateMatrixWorld} with more control over the
   * update of ancestor and descendant nodes.
   *
   * @param {boolean} [updateParents=false] Whether ancestor nodes should be updated or not.
   * @param {boolean} [updateChildren=false] Whether descendant nodes should be updated or not.
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateWorldMatrix(e, t, n = !1) {
    const r = this.parent;
    if (e === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), t === !0) {
      const s = this.children;
      for (let a = 0, o = s.length; a < o; a++)
        s[a].updateWorldMatrix(!1, !0, n);
    }
  }
  /**
   * Serializes the 3D object into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized 3D object.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), this.static !== !1 && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((o) => ({
      ...o,
      boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
      boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map((o) => ({ ...o })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function s(o, c) {
      return o[c.uuid] === void 0 && (o[c.uuid] = c.toJSON(e)), c.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const c = o.shapes;
        if (Array.isArray(c))
          for (let l = 0, h = c.length; l < h; l++) {
            const p = c[l];
            s(e.shapes, p);
          }
        else
          s(e.shapes, c);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let c = 0, l = this.material.length; c < l; c++)
          o.push(s(e.materials, this.material[c]));
        r.material = o;
      } else
        r.material = s(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++)
        r.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const c = this.animations[o];
        r.animations.push(s(e.animations, c));
      }
    }
    if (t) {
      const o = a(e.geometries), c = a(e.materials), l = a(e.textures), h = a(e.images), p = a(e.shapes), u = a(e.skeletons), g = a(e.animations), v = a(e.nodes);
      o.length > 0 && (n.geometries = o), c.length > 0 && (n.materials = c), l.length > 0 && (n.textures = l), h.length > 0 && (n.images = h), p.length > 0 && (n.shapes = p), u.length > 0 && (n.skeletons = u), g.length > 0 && (n.animations = g), v.length > 0 && (n.nodes = v);
    }
    return n.object = r, n;
    function a(o) {
      const c = [];
      for (const l in o) {
        const h = o[l];
        delete h.metadata, c.push(h);
      }
      return c;
    }
  }
  /**
   * Returns a new 3D object with copied values from this instance.
   *
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
   * @return {Object3D} A clone of this instance.
   */
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  /**
   * Copies the values of the given 3D object to this instance.
   *
   * @param {Object3D} source - The 3D object to copy.
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
   * @return {Object3D} A reference to this instance.
   */
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot !== null ? e.pivot.clone() : null, this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const r = e.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
vt.DEFAULT_UP = /* @__PURE__ */ new z(0, 1, 0);
vt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class ui extends vt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const zc = { type: "move" };
class Hr {
  /**
   * Constructs a new XR controller.
   */
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  /**
   * Returns a group representing the hand space of the XR controller.
   *
   * @return {Group} A group representing the hand space of the XR controller.
   */
  getHandSpace() {
    return this._hand === null && (this._hand = new ui(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  /**
   * Returns a group representing the target ray space of the XR controller.
   *
   * @return {Group} A group representing the target ray space of the XR controller.
   */
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new ui(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new z(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new z()), this._targetRay;
  }
  /**
   * Returns a group representing the grip space of the XR controller.
   *
   * @return {Group} A group representing the grip space of the XR controller.
   */
  getGripSpace() {
    return this._grip === null && (this._grip = new ui(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new z(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new z(), this._grip.eventsEnabled = !1), this._grip;
  }
  /**
   * Dispatches the given event to the groups representing
   * the different coordinate spaces of the XR controller.
   *
   * @param {Object} event - The event to dispatch.
   * @return {WebXRController} A reference to this instance.
   */
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  /**
   * Connects the controller with the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  /**
   * Disconnects the controller from the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  /**
   * Updates the controller with the given input source, XR frame and reference space.
   * This updates the transformations of the groups that represent the different
   * coordinate systems of the controller.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @param {XRFrame} frame - The XR frame.
   * @param {XRReferenceSpace} referenceSpace - The reference space.
   * @return {WebXRController} A reference to this instance.
   */
  update(e, t, n) {
    let r = null, s = null, a = null;
    const o = this._targetRay, c = this._grip, l = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        a = !0;
        for (const E of e.hand.values()) {
          const m = t.getJointPose(E, n), f = this._getHandJoint(l, E);
          m !== null && (f.matrix.fromArray(m.transform.matrix), f.matrix.decompose(f.position, f.rotation, f.scale), f.matrixWorldNeedsUpdate = !0, f.jointRadius = m.radius), f.visible = m !== null;
        }
        const h = l.joints["index-finger-tip"], p = l.joints["thumb-tip"], u = h.position.distanceTo(p.position), g = 0.02, v = 5e-3;
        l.inputState.pinching && u > g + v ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && u <= g - v && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        c !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (c.matrix.fromArray(s.transform.matrix), c.matrix.decompose(c.position, c.rotation, c.scale), c.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (c.hasLinearVelocity = !0, c.linearVelocity.copy(s.linearVelocity)) : c.hasLinearVelocity = !1, s.angularVelocity ? (c.hasAngularVelocity = !0, c.angularVelocity.copy(s.angularVelocity)) : c.hasAngularVelocity = !1, c.eventsEnabled && c.dispatchEvent({
          type: "gripUpdated",
          data: e,
          target: this
        })));
      o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(zc)));
    }
    return o !== null && (o.visible = r !== null), c !== null && (c.visible = s !== null), l !== null && (l.visible = a !== null), this;
  }
  /**
   * Returns a group representing the hand joint for the given input joint.
   *
   * @private
   * @param {Group} hand - The group representing the hand space.
   * @param {XRJointSpace} inputjoint - The hand joint data.
   * @return {Group} A group representing the hand joint for the given input joint.
   */
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new ui();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const al = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Tn = { h: 0, s: 0, l: 0 }, Xi = { h: 0, s: 0, l: 0 };
function kr(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class Be {
  /**
   * Constructs a new color.
   *
   * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
   * and that method is used throughout the rest of the documentation.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   */
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  /**
   * Sets the colors's components from the given values.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   * @return {Color} A reference to this color.
   */
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  /**
   * Sets the colors's components to the given scalar value.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} A reference to this color.
   */
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  /**
   * Sets this color from a hexadecimal value.
   *
   * @param {number} hex - The hexadecimal value.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHex(e, t = Nt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Ge.colorSpaceToWorking(this, t), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} r - Red channel value between `0.0` and `1.0`.
   * @param {number} g - Green channel value between `0.0` and `1.0`.
   * @param {number} b - Blue channel value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setRGB(e, t, n, r = Ge.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, Ge.colorSpaceToWorking(this, r), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHSL(e, t, n, r = Ge.workingColorSpace) {
    if (e = Ac(e, 1), t = Ve(t, 0, 1), n = Ve(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + t) : n + t - n * t, a = 2 * n - s;
      this.r = kr(a, s, e + 1 / 3), this.g = kr(a, s, e), this.b = kr(a, s, e - 1 / 3);
    }
    return Ge.colorSpaceToWorking(this, r), this;
  }
  /**
   * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
   * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
   * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
   * all 140 color names are supported).
   *
   * @param {string} style - Color as a CSS-style string.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setStyle(e, t = Nt) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && Ce("Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let s;
      const a = r[1], o = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              t
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              t
            );
          break;
        default:
          Ce("Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = r[1], a = s.length;
      if (a === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          t
        );
      if (a === 6)
        return this.setHex(parseInt(s, 16), t);
      Ce("Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  /**
   * Sets this color from a color name. Faster than {@link Color#setStyle} if
   * you don't need the other CSS-style formats.
   *
   * For convenience, the list of names is exposed in `Color.NAMES` as a hash.
   * ```js
   * Color.NAMES.aliceblue // returns 0xF0F8FF
   * ```
   *
   * @param {string} style - The color name.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setColorName(e, t = Nt) {
    const n = al[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : Ce("Color: Unknown color " + e), this;
  }
  /**
   * Returns a new color with copied values from this instance.
   *
   * @return {Color} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  /**
   * Copies the values of the given color to this instance.
   *
   * @param {Color} color - The color to copy.
   * @return {Color} A reference to this color.
   */
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copySRGBToLinear(e) {
    return this.r = mn(e.r), this.g = mn(e.g), this.b = mn(e.b), this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copyLinearToSRGB(e) {
    return this.r = di(e.r), this.g = di(e.g), this.b = di(e.b), this;
  }
  /**
   * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  /**
   * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  /**
   * Returns the hexadecimal value of this color.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {number} The hexadecimal value.
   */
  getHex(e = Nt) {
    return Ge.workingToColorSpace(Et.copy(this), e), Math.round(Ve(Et.r * 255, 0, 255)) * 65536 + Math.round(Ve(Et.g * 255, 0, 255)) * 256 + Math.round(Ve(Et.b * 255, 0, 255));
  }
  /**
   * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The hexadecimal value as a string.
   */
  getHexString(e = Nt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  /**
   * Converts the colors RGB values into the HSL format and stores them into the
   * given target object.
   *
   * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {{h:number,s:number,l:number}} The HSL representation of this color.
   */
  getHSL(e, t = Ge.workingColorSpace) {
    Ge.workingToColorSpace(Et.copy(this), t);
    const n = Et.r, r = Et.g, s = Et.b, a = Math.max(n, r, s), o = Math.min(n, r, s);
    let c, l;
    const h = (o + a) / 2;
    if (o === a)
      c = 0, l = 0;
    else {
      const p = a - o;
      switch (l = h <= 0.5 ? p / (a + o) : p / (2 - a - o), a) {
        case n:
          c = (r - s) / p + (r < s ? 6 : 0);
          break;
        case r:
          c = (s - n) / p + 2;
          break;
        case s:
          c = (n - r) / p + 4;
          break;
      }
      c /= 6;
    }
    return e.h = c, e.s = l, e.l = h, e;
  }
  /**
   * Returns the RGB values of this color and stores them into the given target object.
   *
   * @param {Color} target - The target color that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} The RGB representation of this color.
   */
  getRGB(e, t = Ge.workingColorSpace) {
    return Ge.workingToColorSpace(Et.copy(this), t), e.r = Et.r, e.g = Et.g, e.b = Et.b, e;
  }
  /**
   * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The CSS representation of this color.
   */
  getStyle(e = Nt) {
    Ge.workingToColorSpace(Et.copy(this), e);
    const t = Et.r, n = Et.g, r = Et.b;
    return e !== Nt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  /**
   * Adds the given HSL values to this color's values.
   * Internally, this converts the color's RGB values to HSL, adds HSL
   * and then converts the color back to RGB.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @return {Color} A reference to this color.
   */
  offsetHSL(e, t, n) {
    return this.getHSL(Tn), this.setHSL(Tn.h + e, Tn.s + t, Tn.l + n);
  }
  /**
   * Adds the RGB values of the given color to the RGB values of this color.
   *
   * @param {Color} color - The color to add.
   * @return {Color} A reference to this color.
   */
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  /**
   * Adds the RGB values of the given colors and stores the result in this instance.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @return {Color} A reference to this color.
   */
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  /**
   * Adds the given scalar value to the RGB values of this color.
   *
   * @param {number} s - The scalar to add.
   * @return {Color} A reference to this color.
   */
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  /**
   * Subtracts the RGB values of the given color from the RGB values of this color.
   *
   * @param {Color} color - The color to subtract.
   * @return {Color} A reference to this color.
   */
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  /**
   * Multiplies the RGB values of the given color with the RGB values of this color.
   *
   * @param {Color} color - The color to multiply.
   * @return {Color} A reference to this color.
   */
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  /**
   * Multiplies the given scalar value with the RGB values of this color.
   *
   * @param {number} s - The scalar to multiply.
   * @return {Color} A reference to this color.
   */
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  /**
   * Linearly interpolates this color's RGB values toward the RGB values of the
   * given color. The alpha argument can be thought of as the ratio between
   * the two colors, where `0.0` is this color and `1.0` is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  /**
   * Linearly interpolates between the given colors and stores the result in this instance.
   * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
   * is the first and `1.0` is the second color.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  /**
   * Linearly interpolates this color's HSL values toward the HSL values of the
   * given color. It differs from {@link Color#lerp} by not interpolating straight
   * from one color to the other, but instead going through all the hues in between
   * those two colors. The alpha argument can be thought of as the ratio between
   * the two colors, where 0.0 is this color and 1.0 is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpHSL(e, t) {
    this.getHSL(Tn), e.getHSL(Xi);
    const n = Fr(Tn.h, Xi.h, t), r = Fr(Tn.s, Xi.s, t), s = Fr(Tn.l, Xi.l, t);
    return this.setHSL(n, r, s), this;
  }
  /**
   * Sets the color's RGB components from the given 3D vector.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Color} A reference to this color.
   */
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  /**
   * Transforms this color with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix.
   * @return {Color} A reference to this color.
   */
  applyMatrix3(e) {
    const t = this.r, n = this.g, r = this.b, s = e.elements;
    return this.r = s[0] * t + s[3] * n + s[6] * r, this.g = s[1] * t + s[4] * n + s[7] * r, this.b = s[2] * t + s[5] * n + s[8] * r, this;
  }
  /**
   * Returns `true` if this color is equal with the given one.
   *
   * @param {Color} c - The color to test for equality.
   * @return {boolean} Whether this bounding color is equal with the given one.
   */
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  /**
   * Sets this color's RGB components from the given array.
   *
   * @param {Array<number>} array - An array holding the RGB values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Color} A reference to this color.
   */
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  /**
   * Writes the RGB components of this color to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the color components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The color components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  /**
   * Sets the components of this color from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding color data.
   * @param {number} index - The index into the attribute.
   * @return {Color} A reference to this color.
   */
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the color
   * as a hexadecimal value.
   *
   * @return {number} The hexadecimal value.
   */
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const Et = /* @__PURE__ */ new Be();
Be.NAMES = al;
class da {
  /**
   * Constructs a new fog.
   *
   * @param {number|Color} color - The fog's color.
   * @param {number} [near=1] - The minimum distance to start applying fog.
   * @param {number} [far=1000] - The maximum distance at which fog stops being calculated and applied.
   */
  constructor(e, t = 1, n = 1e3) {
    this.isFog = !0, this.name = "", this.color = new Be(e), this.near = t, this.far = n;
  }
  /**
   * Returns a new fog with copied values from this instance.
   *
   * @return {Fog} A clone of this instance.
   */
  clone() {
    return new da(this.color, this.near, this.far);
  }
  /**
   * Serializes the fog into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized fog
   */
  toJSON() {
    return {
      type: "Fog",
      name: this.name,
      color: this.color.getHex(),
      near: this.near,
      far: this.far
    };
  }
}
class Gc extends vt {
  /**
   * Constructs a new scene.
   */
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Dn(), this.environmentIntensity = 1, this.environmentRotation = new Dn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
const zt = /* @__PURE__ */ new z(), an = /* @__PURE__ */ new z(), Wr = /* @__PURE__ */ new z(), on = /* @__PURE__ */ new z(), jn = /* @__PURE__ */ new z(), ei = /* @__PURE__ */ new z(), eo = /* @__PURE__ */ new z(), Xr = /* @__PURE__ */ new z(), qr = /* @__PURE__ */ new z(), Yr = /* @__PURE__ */ new z(), Zr = /* @__PURE__ */ new tt(), Kr = /* @__PURE__ */ new tt(), $r = /* @__PURE__ */ new tt();
class Ht {
  /**
   * Constructs a new triangle.
   *
   * @param {Vector3} [a=(0,0,0)] - The first corner of the triangle.
   * @param {Vector3} [b=(0,0,0)] - The second corner of the triangle.
   * @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
   */
  constructor(e = new z(), t = new z(), n = new z()) {
    this.a = e, this.b = t, this.c = n;
  }
  /**
   * Computes the normal vector of a triangle.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), zt.subVectors(e, t), r.cross(zt);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  static getBarycoord(e, t, n, r, s) {
    zt.subVectors(r, t), an.subVectors(n, t), Wr.subVectors(e, t);
    const a = zt.dot(zt), o = zt.dot(an), c = zt.dot(Wr), l = an.dot(an), h = an.dot(Wr), p = a * l - o * o;
    if (p === 0)
      return s.set(0, 0, 0), null;
    const u = 1 / p, g = (l * c - o * h) * u, v = (a * h - o * c) * u;
    return s.set(1 - g - v, v, g);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  static containsPoint(e, t, n, r) {
    return this.getBarycoord(e, t, n, r, on) === null ? !1 : on.x >= 0 && on.y >= 0 && on.x + on.y <= 1;
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} p1 - The first corner of the triangle.
   * @param {Vector3} p2 - The second corner of the triangle.
   * @param {Vector3} p3 - The third corner of the triangle.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  static getInterpolation(e, t, n, r, s, a, o, c) {
    return this.getBarycoord(e, t, n, r, on) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(s, on.x), c.addScaledVector(a, on.y), c.addScaledVector(o, on.z), c);
  }
  /**
   * Computes the value barycentrically interpolated for the given attribute and indices.
   *
   * @param {BufferAttribute} attr - The attribute to interpolate.
   * @param {number} i1 - Index of first vertex.
   * @param {number} i2 - Index of second vertex.
   * @param {number} i3 - Index of third vertex.
   * @param {Vector3} barycoord - The barycoordinate value to use to interpolate.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The interpolated attribute value.
   */
  static getInterpolatedAttribute(e, t, n, r, s, a) {
    return Zr.setScalar(0), Kr.setScalar(0), $r.setScalar(0), Zr.fromBufferAttribute(e, t), Kr.fromBufferAttribute(e, n), $r.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(Zr, s.x), a.addScaledVector(Kr, s.y), a.addScaledVector($r, s.z), a;
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  static isFrontFacing(e, t, n, r) {
    return zt.subVectors(n, t), an.subVectors(e, t), zt.cross(an).dot(r) < 0;
  }
  /**
   * Sets the triangle's vertices by copying the given values.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  /**
   * Sets the triangle's vertices by copying the given array values.
   *
   * @param {Array<Vector3>} points - An array with 3D points.
   * @param {number} i0 - The array index representing the first corner of the triangle.
   * @param {number} i1 - The array index representing the second corner of the triangle.
   * @param {number} i2 - The array index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromPointsAndIndices(e, t, n, r) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
  }
  /**
   * Sets the triangle's vertices by copying the given attribute values.
   *
   * @param {BufferAttribute} attribute - A buffer attribute with 3D points data.
   * @param {number} i0 - The attribute index representing the first corner of the triangle.
   * @param {number} i1 - The attribute index representing the second corner of the triangle.
   * @param {number} i2 - The attribute index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromAttributeAndIndices(e, t, n, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
  }
  /**
   * Returns a new triangle with copied values from this instance.
   *
   * @return {Triangle} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given triangle to this instance.
   *
   * @param {Triangle} triangle - The triangle to copy.
   * @return {Triangle} A reference to this triangle.
   */
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  /**
   * Computes the area of the triangle.
   *
   * @return {number} The triangle's area.
   */
  getArea() {
    return zt.subVectors(this.c, this.b), an.subVectors(this.a, this.b), zt.cross(an).length() * 0.5;
  }
  /**
   * Computes the midpoint of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's midpoint.
   */
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  /**
   * Computes the normal of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  getNormal(e) {
    return Ht.getNormal(this.a, this.b, this.c, e);
  }
  /**
   * Computes a plane the triangle lies within.
   *
   * @param {Plane} target - The target vector that is used to store the method's result.
   * @return {Plane} The plane the triangle lies within.
   */
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  getBarycoord(e, t) {
    return Ht.getBarycoord(e, this.a, this.b, this.c, t);
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  getInterpolation(e, t, n, r, s) {
    return Ht.getInterpolation(e, this.a, this.b, this.c, t, n, r, s);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  containsPoint(e) {
    return Ht.containsPoint(e, this.a, this.b, this.c);
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  isFrontFacing(e) {
    return Ht.isFrontFacing(this.a, this.b, this.c, e);
  }
  /**
   * Returns `true` if this triangle intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this triangle intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  /**
   * Returns the closest point on the triangle to the given point.
   *
   * @param {Vector3} p - The point to compute the closest point for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on the triangle.
   */
  closestPointToPoint(e, t) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    jn.subVectors(r, n), ei.subVectors(s, n), Xr.subVectors(e, n);
    const c = jn.dot(Xr), l = ei.dot(Xr);
    if (c <= 0 && l <= 0)
      return t.copy(n);
    qr.subVectors(e, r);
    const h = jn.dot(qr), p = ei.dot(qr);
    if (h >= 0 && p <= h)
      return t.copy(r);
    const u = c * p - h * l;
    if (u <= 0 && c >= 0 && h <= 0)
      return a = c / (c - h), t.copy(n).addScaledVector(jn, a);
    Yr.subVectors(e, s);
    const g = jn.dot(Yr), v = ei.dot(Yr);
    if (v >= 0 && g <= v)
      return t.copy(s);
    const E = g * l - c * v;
    if (E <= 0 && l >= 0 && v <= 0)
      return o = l / (l - v), t.copy(n).addScaledVector(ei, o);
    const m = h * v - g * p;
    if (m <= 0 && p - h >= 0 && g - v >= 0)
      return eo.subVectors(s, r), o = (p - h) / (p - h + (g - v)), t.copy(r).addScaledVector(eo, o);
    const f = 1 / (m + E + u);
    return a = E * f, o = u * f, t.copy(n).addScaledVector(jn, a).addScaledVector(ei, o);
  }
  /**
   * Returns `true` if this triangle is equal with the given one.
   *
   * @param {Triangle} triangle - The triangle to test for equality.
   * @return {boolean} Whether this triangle is equal with the given one.
   */
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
class Oi {
  /**
   * Constructs a new bounding box.
   *
   * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.
   * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
   */
  constructor(e = new z(1 / 0, 1 / 0, 1 / 0), t = new z(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  /**
   * Sets the lower and upper boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector3} min - The lower boundary of the box.
   * @param {Vector3} max - The upper boundary of the box.
   * @return {Box3} A reference to this bounding box.
   */
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<number>} array - An array holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(Gt.fromArray(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(Gt.fromBufferAttribute(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.
   * @return {Box3} A reference to this bounding box.
   */
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  /**
   * Centers this box on the given center vector and sets this box's width, height and
   * depth to the given size values.
   *
   * @param {Vector3} center - The center of the box.
   * @param {Vector3} size - The x, y and z dimensions of the box.
   * @return {Box3} A reference to this bounding box.
   */
  setFromCenterAndSize(e, t) {
    const n = Gt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  /**
   * Computes the world-axis-aligned bounding box for the given 3D object
   * (including its children), accounting for the object's, and children's,
   * world transforms. The function may result in a larger box than strictly necessary.
   *
   * Note: To compute the correct bounding box, make sure the given 3D object
   * has an up-to-date world matrix that reflects the current transformation of its
   * ancestor nodes. Call `object.updateWorldMatrix( true, false )` beforehand if
   * you're unsure.
   *
   * @param {Object3D} object - The 3D object to compute the bounding box for.
   * @param {boolean} [precise=false] - If set to `true`, the method computes the smallest
   * world-axis-aligned bounding box at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  /**
   * Returns a new box with copied values from this instance.
   *
   * @return {Box3} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given box to this instance.
   *
   * @param {Box3} box - The box to copy.
   * @return {Box3} A reference to this bounding box.
   */
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  /**
   * Makes this box empty which means in encloses a zero space in 3D.
   *
   * @return {Box3} A reference to this bounding box.
   */
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes one
   * point, the one both bounds share.
   *
   * @return {boolean} Whether this box is empty or not.
   */
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  /**
   * Returns the center point of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The center point.
   */
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  /**
   * Returns the dimensions of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The size.
   */
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  /**
   * Expands the boundaries of this box to include the given point.
   *
   * @param {Vector3} point - The point that should be included by the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  /**
   * Expands this box equilaterally by the given vector. The width of this
   * box will be expanded by the x component of the vector in both
   * directions. The height of this box will be expanded by the y component of
   * the vector in both directions. The depth of this box will be
   * expanded by the z component of the vector in both directions.
   *
   * @param {Vector3} vector - The vector that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  /**
   * Expands each dimension of the box by the given scalar. If negative, the
   * dimensions of the box will be contracted.
   *
   * @param {number} scalar - The scalar value that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  /**
   * Expands the boundaries of this box to include the given 3D object and
   * its children, accounting for the object's, and children's, world
   * transforms. The function may result in a larger box than strictly
   * necessary (unless the precise parameter is set to true).
   *
   * @param {Object3D} object - The 3D object that should expand the bounding box.
   * @param {boolean} precise - If set to `true`, the method expands the bounding box
   * as little as necessary at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0)
        for (let a = 0, o = s.count; a < o; a++)
          e.isMesh === !0 ? e.getVertexPosition(a, Gt) : Gt.fromBufferAttribute(s, a), Gt.applyMatrix4(e.matrixWorld), this.expandByPoint(Gt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), qi.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), qi.copy(n.boundingBox)), qi.applyMatrix4(e.matrixWorld), this.union(qi);
    }
    const r = e.children;
    for (let s = 0, a = r.length; s < a; s++)
      this.expandByObject(r[s], t);
    return this;
  }
  /**
   * Returns `true` if the given point lies within or on the boundaries of this box.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the bounding box contains the given point or not.
   */
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  /**
   * Returns `true` if this bounding box includes the entirety of the given bounding box.
   * If this box and the given one are identical, this function also returns `true`.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box contains the given bounding box or not.
   */
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  /**
   * Returns a point as a proportion of this box's width, height and depth.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A point as a proportion of this box's width, height and depth.
   */
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  /**
   * Returns `true` if the given bounding box intersects with this bounding box.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this bounding box.
   */
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  /**
   * Returns `true` if the given bounding sphere intersects with this bounding box.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
   */
  intersectsSphere(e) {
    return this.clampPoint(e.center, Gt), Gt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  /**
   * Returns `true` if the given plane intersects with this bounding box.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether the given plane intersects with this bounding box.
   */
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  /**
   * Returns `true` if the given triangle intersects with this bounding box.
   *
   * @param {Triangle} triangle - The triangle to test.
   * @return {boolean} Whether the given triangle intersects with this bounding box.
   */
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(yi), Yi.subVectors(this.max, yi), ti.subVectors(e.a, yi), ni.subVectors(e.b, yi), ii.subVectors(e.c, yi), bn.subVectors(ni, ti), An.subVectors(ii, ni), Un.subVectors(ti, ii);
    let t = [
      0,
      -bn.z,
      bn.y,
      0,
      -An.z,
      An.y,
      0,
      -Un.z,
      Un.y,
      bn.z,
      0,
      -bn.x,
      An.z,
      0,
      -An.x,
      Un.z,
      0,
      -Un.x,
      -bn.y,
      bn.x,
      0,
      -An.y,
      An.x,
      0,
      -Un.y,
      Un.x,
      0
    ];
    return !Jr(t, ti, ni, ii, Yi) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Jr(t, ti, ni, ii, Yi)) ? !1 : (Zi.crossVectors(bn, An), t = [Zi.x, Zi.y, Zi.z], Jr(t, ti, ni, ii, Yi));
  }
  /**
   * Clamps the given point within the bounds of this box.
   *
   * @param {Vector3} point - The point to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  /**
   * Returns the euclidean distance from any edge of this box to the specified point. If
   * the given point lies inside of this box, the distance will be `0`.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The euclidean distance.
   */
  distanceToPoint(e) {
    return this.clampPoint(e, Gt).distanceTo(e);
  }
  /**
   * Returns a bounding sphere that encloses this bounding box.
   *
   * @param {Sphere} target - The target sphere that is used to store the method's result.
   * @return {Sphere} The bounding sphere that encloses this bounding box.
   */
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Gt).length() * 0.5), e;
  }
  /**
   * Computes the intersection of this bounding box and the given one, setting the upper
   * bound of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds. If
   * there's no overlap, makes this box empty.
   *
   * @param {Box3} box - The bounding box to intersect with.
   * @return {Box3} A reference to this bounding box.
   */
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  /**
   * Computes the union of this box and another and the given one, setting the upper
   * bound of this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   *
   * @param {Box3} box - The bounding box that will be unioned with this instance.
   * @return {Box3} A reference to this bounding box.
   */
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  /**
   * Transforms this bounding box by the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Box3} A reference to this bounding box.
   */
  applyMatrix4(e) {
    return this.isEmpty() ? this : (ln[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), ln[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), ln[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), ln[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), ln[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), ln[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), ln[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), ln[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(ln), this);
  }
  /**
   * Adds the given offset to both the upper and lower bounds of this bounding box,
   * effectively moving it in 3D space.
   *
   * @param {Vector3} offset - The offset that should be used to translate the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  /**
   * Returns `true` if this bounding box is equal with the given one.
   *
   * @param {Box3} box - The box to test for equality.
   * @return {boolean} Whether this bounding box is equal with the given one.
   */
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @param {Object} json - The serialized json to set the box from.
   * @return {Box3} A reference to this bounding box.
   */
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}
const ln = [
  /* @__PURE__ */ new z(),
  /* @__PURE__ */ new z(),
  /* @__PURE__ */ new z(),
  /* @__PURE__ */ new z(),
  /* @__PURE__ */ new z(),
  /* @__PURE__ */ new z(),
  /* @__PURE__ */ new z(),
  /* @__PURE__ */ new z()
], Gt = /* @__PURE__ */ new z(), qi = /* @__PURE__ */ new Oi(), ti = /* @__PURE__ */ new z(), ni = /* @__PURE__ */ new z(), ii = /* @__PURE__ */ new z(), bn = /* @__PURE__ */ new z(), An = /* @__PURE__ */ new z(), Un = /* @__PURE__ */ new z(), yi = /* @__PURE__ */ new z(), Yi = /* @__PURE__ */ new z(), Zi = /* @__PURE__ */ new z(), Nn = /* @__PURE__ */ new z();
function Jr(i, e, t, n, r) {
  for (let s = 0, a = i.length - 3; s <= a; s += 3) {
    Nn.fromArray(i, s);
    const o = r.x * Math.abs(Nn.x) + r.y * Math.abs(Nn.y) + r.z * Math.abs(Nn.z), c = e.dot(Nn), l = t.dot(Nn), h = n.dot(Nn);
    if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > o)
      return !1;
  }
  return !0;
}
const ht = /* @__PURE__ */ new z(), Ki = /* @__PURE__ */ new He();
let Vc = 0;
class tn extends Xn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {TypedArray} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n = !1) {
    if (super(), Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Vc++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = Ga, this.updateRanges = [], this.gpuType = Jt, this.version = 0;
  }
  /**
   * A callback function that is executed after the renderer has transferred the attribute
   * array data to the GPU.
   */
  onUploadCallback() {
  }
  /**
   * Flag to indicate that this attribute has changed and should be re-sent to
   * the GPU. Set this to `true` when you modify the value of the array.
   *
   * @type {number}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Sets the usage of this buffer attribute.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {BufferAttribute} A reference to this buffer attribute.
   */
  setUsage(e) {
    return this.usage = e, this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Copies the values of the given buffer attribute to this instance.
   *
   * @param {BufferAttribute} source - The buffer attribute to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  /**
   * Copies a vector from the given buffer attribute to this one. The start
   * and destination position in the attribute buffers are represented by the
   * given indices.
   *
   * @param {number} index1 - The destination index into this buffer attribute.
   * @param {BufferAttribute} attribute - The buffer attribute to copy from.
   * @param {number} index2 - The source index into the given buffer attribute.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[e + r] = t.array[n + r];
    return this;
  }
  /**
   * Copies the given array data into this buffer attribute.
   *
   * @param {(TypedArray|Array)} array - The array to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyArray(e) {
    return this.array.set(e), this;
  }
  /**
   * Applies the given 3x3 matrix to the given attribute. Works with
   * item size `2` and `3`.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        Ki.fromBufferAttribute(this, t), Ki.applyMatrix3(e), this.setXY(t, Ki.x, Ki.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        ht.fromBufferAttribute(this, t), ht.applyMatrix3(e), this.setXYZ(t, ht.x, ht.y, ht.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ht.fromBufferAttribute(this, t), ht.applyMatrix4(e), this.setXYZ(t, ht.x, ht.y, ht.z);
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ht.fromBufferAttribute(this, t), ht.applyNormalMatrix(e), this.setXYZ(t, ht.x, ht.y, ht.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      ht.fromBufferAttribute(this, t), ht.transformDirection(e), this.setXYZ(t, ht.x, ht.y, ht.z);
    return this;
  }
  /**
   * Sets the given array data in the buffer attribute.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this buffer attribute's array.
   * @return {BufferAttribute} A reference to this instance.
   */
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = Si(n, this.array)), n;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setComponent(e, t, n) {
    return this.normalized && (n = wt(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Si(t, this.array)), t;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setX(e, t) {
    return this.normalized && (t = wt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Si(t, this.array)), t;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setY(e, t) {
    return this.normalized && (t = wt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Si(t, this.array)), t;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setZ(e, t) {
    return this.normalized && (t = wt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Si(t, this.array)), t;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setW(e, t) {
    return this.normalized && (t = wt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = wt(t, this.array), n = wt(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  /**
   * Sets the x, y and z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = wt(t, this.array), n = wt(n, this.array), r = wt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  /**
   * Sets the x, y, z and w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @param {number} w - The value for the w component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZW(e, t, n, r, s) {
    return e *= this.itemSize, this.normalized && (t = wt(t, this.array), n = wt(n, this.array), r = wt(r, this.array), s = wt(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = s, this;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the attribute array data to the GPU. Can be used to perform clean-up operations after
   * the upload when attribute data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {BufferAttribute} A reference to this instance.
   */
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  /**
   * Returns a new buffer attribute with copied values from this instance.
   *
   * @return {BufferAttribute} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  /**
   * Serializes the buffer attribute into JSON.
   *
   * @return {Object} A JSON object representing the serialized buffer attribute.
   */
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== Ga && (e.usage = this.usage), e;
  }
  /**
   * Disposes of the buffer attribute. Available only in {@link WebGPURenderer}.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class ol extends tn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class ll extends tn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class gn extends tn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Float32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
const Hc = /* @__PURE__ */ new Oi(), Ti = /* @__PURE__ */ new z(), Qr = /* @__PURE__ */ new z();
class pa {
  /**
   * Constructs a new sphere.
   *
   * @param {Vector3} [center=(0,0,0)] - The center of the sphere
   * @param {number} [radius=-1] - The radius of the sphere.
   */
  constructor(e = new z(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  /**
   * Sets the sphere's components by copying the given values.
   *
   * @param {Vector3} center - The center.
   * @param {number} radius - The radius.
   * @return {Sphere} A reference to this sphere.
   */
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  /**
   * Computes the minimum bounding sphere for list of points.
   * If the optional center point is given, it is used as the sphere's
   * center. Otherwise, the center of the axis-aligned bounding box
   * encompassing the points is calculated.
   *
   * @param {Array<Vector3>} points - A list of points in 3D space.
   * @param {Vector3} [optionalCenter] - The center of the sphere.
   * @return {Sphere} A reference to this sphere.
   */
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : Hc.setFromPoints(e).getCenter(n);
    let r = 0;
    for (let s = 0, a = e.length; s < a; s++)
      r = Math.max(r, n.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(r), this;
  }
  /**
   * Copies the values of the given sphere to this instance.
   *
   * @param {Sphere} sphere - The sphere to copy.
   * @return {Sphere} A reference to this sphere.
   */
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  /**
   * Returns `true` if the sphere is empty (the radius set to a negative number).
   *
   * Spheres with a radius of `0` contain only their center point and are not
   * considered to be empty.
   *
   * @return {boolean} Whether this sphere is empty or not.
   */
  isEmpty() {
    return this.radius < 0;
  }
  /**
   * Makes this sphere empty which means in encloses a zero space in 3D.
   *
   * @return {Sphere} A reference to this sphere.
   */
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  /**
   * Returns `true` if this sphere contains the given point inclusive of
   * the surface of the sphere.
   *
   * @param {Vector3} point - The point to check.
   * @return {boolean} Whether this sphere contains the given point or not.
   */
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  /**
   * Returns the closest distance from the boundary of the sphere to the
   * given point. If the sphere contains the point, the distance will
   * be negative.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The distance to the point.
   */
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  /**
   * Returns `true` if this sphere intersects with the given one.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @return {boolean} Whether this sphere intersects with the given one or not.
   */
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  /**
   * Returns `true` if this sphere intersects with the given box.
   *
   * @param {Box3} box - The box to test.
   * @return {boolean} Whether this sphere intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  /**
   * Returns `true` if this sphere intersects with the given plane.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether this sphere intersects with the given plane or not.
   */
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  /**
   * Clamps a point within the sphere. If the point is outside the sphere, it
   * will clamp it to the closest point on the edge of the sphere. Points
   * already inside the sphere will not be affected.
   *
   * @param {Vector3} point - The plane to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  /**
   * Returns a bounding box that encloses this sphere.
   *
   * @param {Box3} target - The target box that is used to store the method's result.
   * @return {Box3} The bounding box that encloses this sphere.
   */
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  /**
   * Transforms this sphere with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Sphere} A reference to this sphere.
   */
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  /**
   * Translates the sphere's center by the given offset.
   *
   * @param {Vector3} offset - The offset.
   * @return {Sphere} A reference to this sphere.
   */
  translate(e) {
    return this.center.add(e), this;
  }
  /**
   * Expands the boundaries of this sphere to include the given point.
   *
   * @param {Vector3} point - The point to include.
   * @return {Sphere} A reference to this sphere.
   */
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    Ti.subVectors(e, this.center);
    const t = Ti.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(Ti, r / n), this.radius += r;
    }
    return this;
  }
  /**
   * Expands this sphere to enclose both the original sphere and the given sphere.
   *
   * @param {Sphere} sphere - The sphere to include.
   * @return {Sphere} A reference to this sphere.
   */
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Qr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Ti.copy(e.center).add(Qr)), this.expandByPoint(Ti.copy(e.center).sub(Qr))), this);
  }
  /**
   * Returns `true` if this sphere is equal with the given one.
   *
   * @param {Sphere} sphere - The sphere to test for equality.
   * @return {boolean} Whether this bounding sphere is equal with the given one.
   */
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  /**
   * Returns a new sphere with copied values from this instance.
   *
   * @return {Sphere} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @param {Object} json - The serialized json to set the sphere from.
   * @return {Sphere} A reference to this bounding sphere.
   */
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}
let kc = 0;
const Ut = /* @__PURE__ */ new st(), jr = /* @__PURE__ */ new vt(), ri = /* @__PURE__ */ new z(), Lt = /* @__PURE__ */ new Oi(), bi = /* @__PURE__ */ new Oi(), gt = /* @__PURE__ */ new z();
class vn extends Xn {
  /**
   * Constructs a new geometry.
   */
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: kc++ }), this.uuid = Fi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {}, this._transformed = !1;
  }
  /**
   * Returns the index of this geometry.
   *
   * @return {?BufferAttribute} The index. Returns `null` if no index is defined.
   */
  getIndex() {
    return this.index;
  }
  /**
   * Sets the given index to this geometry.
   *
   * @param {Array<number>|BufferAttribute} index - The index to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (Ec(e) ? ll : ol)(e, 1) : this.index = e, this;
  }
  /**
   * Sets the given indirect attribute to this geometry.
   *
   * @param {BufferAttribute} indirect - The attribute holding indirect draw calls.
   * @param {number|Array<number>} [indirectOffset=0] - The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndirect(e, t = 0) {
    return this.indirect = e, this.indirectOffset = t, this;
  }
  /**
   * Returns the indirect attribute of this geometry.
   *
   * @return {?BufferAttribute} The indirect attribute. Returns `null` if no indirect attribute is defined.
   */
  getIndirect() {
    return this.indirect;
  }
  /**
   * Returns the buffer attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {BufferAttribute|InterleavedBufferAttribute|undefined} The buffer attribute.
   * Returns `undefined` if not attribute has been found.
   */
  getAttribute(e) {
    return this.attributes[e];
  }
  /**
   * Sets the given attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @param {BufferAttribute|InterleavedBufferAttribute} attribute - The attribute to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  /**
   * Deletes the attribute for the given name.
   *
   * @param {string} name - The attribute name to delete.
   * @return {BufferGeometry} A reference to this instance.
   */
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  /**
   * Returns `true` if this geometry has an attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {boolean} Whether this geometry has an attribute for the given name or not.
   */
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  /**
   * Adds a group to this geometry.
   *
   * @param {number} start - The first element in this draw call. That is the first
   * vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - Specifies how many vertices (or indices) are part of this group.
   * @param {number} [materialIndex=0] - The material array index to use.
   */
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  /**
   * Clears all groups.
   */
  clearGroups() {
    this.groups = [];
  }
  /**
   * Sets the draw range for this geometry.
   *
   * @param {number} start - The first vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - For non-indexed BufferGeometry, `count` is the number of vertices to render.
   * For indexed BufferGeometry, `count` is the number of indices to render.
   */
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  /**
   * Applies the given 4x4 transformation matrix to the geometry.
   *
   * @param {Matrix4} matrix - The matrix to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new De().getNormalMatrix(e);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
  }
  /**
   * Applies the rotation represented by the Quaternion to the geometry.
   *
   * @param {Quaternion} q - The Quaternion to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyQuaternion(e) {
    return Ut.makeRotationFromQuaternion(e), this.applyMatrix4(Ut), this;
  }
  /**
   * Rotates the geometry about the X axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateX(e) {
    return Ut.makeRotationX(e), this.applyMatrix4(Ut), this;
  }
  /**
   * Rotates the geometry about the Y axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateY(e) {
    return Ut.makeRotationY(e), this.applyMatrix4(Ut), this;
  }
  /**
   * Rotates the geometry about the Z axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateZ(e) {
    return Ut.makeRotationZ(e), this.applyMatrix4(Ut), this;
  }
  /**
   * Translates the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#position} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x offset.
   * @param {number} y - The y offset.
   * @param {number} z - The z offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  translate(e, t, n) {
    return Ut.makeTranslation(e, t, n), this.applyMatrix4(Ut), this;
  }
  /**
   * Scales the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#scale} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x scale.
   * @param {number} y - The y scale.
   * @param {number} z - The z scale.
   * @return {BufferGeometry} A reference to this instance.
   */
  scale(e, t, n) {
    return Ut.makeScale(e, t, n), this.applyMatrix4(Ut), this;
  }
  /**
   * Rotates the geometry to face a point in 3D space. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#lookAt} for typical
   * real-time mesh rotation.
   *
   * @param {Vector3} vector - The target point.
   * @return {BufferGeometry} A reference to this instance.
   */
  lookAt(e) {
    return jr.lookAt(e), jr.updateMatrix(), this.applyMatrix4(jr.matrix), this;
  }
  /**
   * Center the geometry based on its bounding box.
   *
   * @return {BufferGeometry} A reference to this instance.
   */
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(ri).negate(), this.translate(ri.x, ri.y, ri.z), this;
  }
  /**
   * Defines a geometry by creating a `position` attribute based on the given array of points. The array
   * can hold 2D or 3D vectors. When using two-dimensional data, the `z` coordinate for all vertices is
   * set to `0`.
   *
   * If the method is used with an existing `position` attribute, the vertex data are overwritten with the
   * data from the array. The length of the array must match the vertex count.
   *
   * @param {Array<Vector2>|Array<Vector3>} points - The points.
   * @return {BufferGeometry} A reference to this instance.
   */
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const n = [];
      for (let r = 0, s = e.length; r < s; r++) {
        const a = e[r];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new gn(n, 3));
    } else {
      const n = Math.min(e.length, t.count);
      for (let r = 0; r < n; r++) {
        const s = e[r];
        t.setXYZ(r, s.x, s.y, s.z || 0);
      }
      e.length > t.count && Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  /**
   * Computes the bounding box of the geometry, and updates the `boundingBox` member.
   * The bounding box is not computed by the engine; it must be computed by your app.
   * You may need to recompute the bounding box if the geometry vertices are modified.
   */
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Oi());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new z(-1 / 0, -1 / 0, -1 / 0),
        new z(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, r = t.length; n < r; n++) {
          const s = t[n];
          Lt.setFromBufferAttribute(s), this.morphTargetsRelative ? (gt.addVectors(this.boundingBox.min, Lt.min), this.boundingBox.expandByPoint(gt), gt.addVectors(this.boundingBox.max, Lt.max), this.boundingBox.expandByPoint(gt)) : (this.boundingBox.expandByPoint(Lt.min), this.boundingBox.expandByPoint(Lt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  /**
   * Computes the bounding sphere of the geometry, and updates the `boundingSphere` member.
   * The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
   * You may need to recompute the bounding sphere if the geometry vertices are modified.
   */
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new pa());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new z(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Lt.setFromBufferAttribute(e), t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s];
          bi.setFromBufferAttribute(o), this.morphTargetsRelative ? (gt.addVectors(Lt.min, bi.min), Lt.expandByPoint(gt), gt.addVectors(Lt.max, bi.max), Lt.expandByPoint(gt)) : (Lt.expandByPoint(bi.min), Lt.expandByPoint(bi.max));
        }
      Lt.getCenter(n);
      let r = 0;
      for (let s = 0, a = e.count; s < a; s++)
        gt.fromBufferAttribute(e, s), r = Math.max(r, n.distanceToSquared(gt));
      if (t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s], c = this.morphTargetsRelative;
          for (let l = 0, h = o.count; l < h; l++)
            gt.fromBufferAttribute(o, l), c && (ri.fromBufferAttribute(e, l), gt.add(ri)), r = Math.max(r, n.distanceToSquared(gt));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  /**
   * Calculates and adds a tangent attribute to this geometry.
   *
   * The computation is only supported for indexed geometries and if position, normal, and uv attributes
   * are defined. When using a tangent space normal map, prefer the MikkTSpace algorithm provided by
   * {@link BufferGeometryUtils#computeMikkTSpaceTangents} instead.
   */
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.position, r = t.normal, s = t.uv;
    let a = this.getAttribute("tangent");
    (a === void 0 || a.count !== n.count) && (a = new tn(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
    const o = [], c = [];
    for (let _ = 0; _ < n.count; _++)
      o[_] = new z(), c[_] = new z();
    const l = new z(), h = new z(), p = new z(), u = new He(), g = new He(), v = new He(), E = new z(), m = new z();
    function f(_, T, I) {
      l.fromBufferAttribute(n, _), h.fromBufferAttribute(n, T), p.fromBufferAttribute(n, I), u.fromBufferAttribute(s, _), g.fromBufferAttribute(s, T), v.fromBufferAttribute(s, I), h.sub(l), p.sub(l), g.sub(u), v.sub(u);
      const P = 1 / (g.x * v.y - v.x * g.y);
      isFinite(P) && (E.copy(h).multiplyScalar(v.y).addScaledVector(p, -g.y).multiplyScalar(P), m.copy(p).multiplyScalar(g.x).addScaledVector(h, -v.x).multiplyScalar(P), o[_].add(E), o[T].add(E), o[I].add(E), c[_].add(m), c[T].add(m), c[I].add(m));
    }
    let A = this.groups;
    A.length === 0 && (A = [{
      start: 0,
      count: e.count
    }]);
    for (let _ = 0, T = A.length; _ < T; ++_) {
      const I = A[_], P = I.start, N = I.count;
      for (let q = P, Y = P + N; q < Y; q += 3)
        f(
          e.getX(q + 0),
          e.getX(q + 1),
          e.getX(q + 2)
        );
    }
    const w = new z(), M = new z(), b = new z(), y = new z();
    function R(_) {
      b.fromBufferAttribute(r, _), y.copy(b);
      const T = o[_];
      w.copy(T), w.sub(b.multiplyScalar(b.dot(T))).normalize(), M.crossVectors(y, T);
      const P = M.dot(c[_]) < 0 ? -1 : 1;
      a.setXYZW(_, w.x, w.y, w.z, P);
    }
    for (let _ = 0, T = A.length; _ < T; ++_) {
      const I = A[_], P = I.start, N = I.count;
      for (let q = P, Y = P + N; q < Y; q += 3)
        R(e.getX(q + 0)), R(e.getX(q + 1)), R(e.getX(q + 2));
    }
    this._transformed = !0;
  }
  /**
   * Computes vertex normals for the given vertex data. For indexed geometries, the method sets
   * each vertex normal to be the average of the face normals of the faces that share that vertex.
   * For non-indexed geometries, vertices are not shared, and the method sets each vertex normal
   * to be the same as the face normal.
   */
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0 || n.count !== t.count)
        n = new tn(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let u = 0, g = n.count; u < g; u++)
          n.setXYZ(u, 0, 0, 0);
      const r = new z(), s = new z(), a = new z(), o = new z(), c = new z(), l = new z(), h = new z(), p = new z();
      if (e)
        for (let u = 0, g = e.count; u < g; u += 3) {
          const v = e.getX(u + 0), E = e.getX(u + 1), m = e.getX(u + 2);
          r.fromBufferAttribute(t, v), s.fromBufferAttribute(t, E), a.fromBufferAttribute(t, m), h.subVectors(a, s), p.subVectors(r, s), h.cross(p), o.fromBufferAttribute(n, v), c.fromBufferAttribute(n, E), l.fromBufferAttribute(n, m), o.add(h), c.add(h), l.add(h), n.setXYZ(v, o.x, o.y, o.z), n.setXYZ(E, c.x, c.y, c.z), n.setXYZ(m, l.x, l.y, l.z);
        }
      else
        for (let u = 0, g = t.count; u < g; u += 3)
          r.fromBufferAttribute(t, u + 0), s.fromBufferAttribute(t, u + 1), a.fromBufferAttribute(t, u + 2), h.subVectors(a, s), p.subVectors(r, s), h.cross(p), n.setXYZ(u + 0, h.x, h.y, h.z), n.setXYZ(u + 1, h.x, h.y, h.z), n.setXYZ(u + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  /**
   * Ensures every normal vector in a geometry will have a magnitude of `1`. This will
   * correct lighting on the geometry surfaces.
   */
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      gt.fromBufferAttribute(e, t), gt.normalize(), e.setXYZ(t, gt.x, gt.y, gt.z);
  }
  /**
   * Return a new non-index version of this indexed geometry. If the geometry
   * is already non-indexed, the method is a NOOP.
   *
   * @return {BufferGeometry} The non-indexed version of this indexed geometry.
   */
  toNonIndexed() {
    function e(o, c) {
      const l = o.array, h = o.itemSize, p = o.normalized, u = new l.constructor(c.length * h);
      let g = 0, v = 0;
      for (let E = 0, m = c.length; E < m; E++) {
        o.isInterleavedBufferAttribute ? g = c[E] * o.data.stride + o.offset : g = c[E] * h;
        for (let f = 0; f < h; f++)
          u[v++] = l[g++];
      }
      return new tn(u, h, p);
    }
    if (this.index === null)
      return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new vn(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const c = r[o], l = e(c, n);
      t.setAttribute(o, l);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const c = [], l = s[o];
      for (let h = 0, p = l.length; h < p; h++) {
        const u = l[h], g = e(u, n);
        c.push(g);
      }
      t.morphAttributes[o] = c;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, c = a.length; o < c; o++) {
      const l = a[o];
      t.addGroup(l.start, l.count, l.materialIndex);
    }
    return t;
  }
  /**
   * Serializes the geometry into JSON.
   *
   * @return {Object} A JSON object representing the serialized geometry.
   */
  toJSON() {
    const e = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
      const c = this.parameters;
      for (const l in c)
        c[l] !== void 0 && (e[l] = c[l]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const c in n) {
      const l = n[c];
      e.data.attributes[c] = l.toJSON(e.data);
    }
    const r = {};
    let s = !1;
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c], h = [];
      for (let p = 0, u = l.length; p < u; p++) {
        const g = l[p];
        h.push(g.toJSON(e.data));
      }
      h.length > 0 && (r[c] = h, s = !0);
    }
    s && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (e.data.boundingSphere = o.toJSON()), e;
  }
  /**
   * Returns a new geometry with copied values from this instance.
   *
   * @return {BufferGeometry} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given geometry to this instance.
   *
   * @param {BufferGeometry} source - The geometry to copy.
   * @return {BufferGeometry} A reference to this instance.
   */
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone());
    const r = e.attributes;
    for (const l in r) {
      const h = r[l];
      this.setAttribute(l, h.clone(t));
    }
    const s = e.morphAttributes;
    for (const l in s) {
      const h = [], p = s[l];
      for (let u = 0, g = p.length; u < g; u++)
        h.push(p[u].clone(t));
      this.morphAttributes[l] = h;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let l = 0, h = a.length; l < h; l++) {
      const p = a[l];
      this.addGroup(p.start, p.count, p.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const c = e.boundingSphere;
    return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires BufferGeometry#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
let Wc = 0;
class Bi extends Xn {
  /**
   * Constructs a new material.
   */
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Wc++ }), this.uuid = Fi(), this.name = "", this.type = "Material", this.blending = hi, this.side = Ln, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = fs, this.blendDst = ds, this.blendEquation = zn, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Be(0, 0, 0), this.blendAlpha = 0, this.depthFunc = pi, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = za, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Zn, this.stencilZFail = Zn, this.stencilZPass = Zn, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  /**
   * Sets the alpha value to be used when running an alpha test. The material
   * will not be rendered if the opacity is lower than this value.
   *
   * @type {number}
   * @readonly
   * @default 0
   */
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  /**
   * An optional callback that is executed immediately before the material is used to render a 3D object.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Scene} scene - The scene.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Object3D} object - The 3D object.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * An optional callback that is executed immediately before the shader
   * program is compiled. This function is called with the shader source code
   * as a parameter. Useful for the modification of built-in materials.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}. The
   * recommended approach when customizing materials is to use `WebGPURenderer` with the new
   * Node Material system and [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language).
   *
   * @param {{vertexShader:string,fragmentShader:string,uniforms:Object}} shaderobject - The object holds the uniforms and the vertex and fragment shader source.
   * @param {WebGLRenderer} renderer - A reference to the renderer.
   */
  onBeforeCompile() {
  }
  /**
   * In case {@link Material#onBeforeCompile} is used, this callback can be used to identify
   * values of settings used in `onBeforeCompile()`, so three.js can reuse a cached
   * shader or recompile the shader for this material as needed.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @return {string} The custom program cache key.
   */
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  /**
   * This method can be used to set default values from parameter objects.
   * It is a generic implementation so it can be used with different types
   * of materials.
   *
   * @param {Object} [values] - The material values to set.
   */
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          Ce(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const r = this[t];
        if (r === void 0) {
          Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
      }
  }
  /**
   * Serializes the material into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized material.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== hi && (n.blending = this.blending), this.side !== Ln && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== fs && (n.blendSrc = this.blendSrc), this.blendDst !== ds && (n.blendDst = this.blendDst), this.blendEquation !== zn && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== pi && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== za && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Zn && (n.stencilFail = this.stencilFail), this.stencilZFail !== Zn && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== Zn && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.allowOverride === !1 && (n.allowOverride = !1), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(s) {
      const a = [];
      for (const o in s) {
        const c = s[o];
        delete c.metadata, a.push(c);
      }
      return a;
    }
    if (t) {
      const s = r(e.textures), a = r(e.images);
      s.length > 0 && (n.textures = s), a.length > 0 && (n.images = a);
    }
    return n;
  }
  /**
   * Deserializes the material from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized material.
   * @param {Object<string,Texture>} textures - A dictionary holding textures referenced by the material.
   * @return {Material} A reference to this material.
   */
  fromJSON(e, t) {
    if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new Be().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (typeof e.vertexColors == "number" ? this.vertexColors = e.vertexColors > 0 : this.vertexColors = e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
      let n = e.normalScale;
      Array.isArray(n) === !1 && (n = [n, n]), this.normalScale = new He().fromArray(n);
    }
    return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new He().fromArray(e.clearcoatNormalScale)), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
  }
  /**
   * Returns a new material with copied values from this instance.
   *
   * @return {Material} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given material to this instance.
   *
   * @param {Material} source - The material to copy.
   * @return {Material} A reference to this instance.
   */
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const r = t.length;
      n = new Array(r);
      for (let s = 0; s !== r; ++s)
        n[s] = t[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Material#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Setting this property to `true` indicates the engine the material
   * needs to be recompiled.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
const cn = /* @__PURE__ */ new z(), es = /* @__PURE__ */ new z(), $i = /* @__PURE__ */ new z(), wn = /* @__PURE__ */ new z(), ts = /* @__PURE__ */ new z(), Ji = /* @__PURE__ */ new z(), ns = /* @__PURE__ */ new z();
class Xc {
  /**
   * Constructs a new ray.
   *
   * @param {Vector3} [origin=(0,0,0)] - The origin of the ray.
   * @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
   */
  constructor(e = new z(), t = new z(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  /**
   * Sets the ray's components by copying the given values.
   *
   * @param {Vector3} origin - The origin.
   * @param {Vector3} direction - The direction.
   * @return {Ray} A reference to this ray.
   */
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  /**
   * Copies the values of the given ray to this instance.
   *
   * @param {Ray} ray - The ray to copy.
   * @return {Ray} A reference to this ray.
   */
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  /**
   * Returns a vector that is located at a given distance along this ray.
   *
   * @param {number} t - The distance along the ray to retrieve a position for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A position on the ray.
   */
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  /**
   * Adjusts the direction of the ray to point at the given vector in world space.
   *
   * @param {Vector3} v - The target position.
   * @return {Ray} A reference to this ray.
   */
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  /**
   * Shift the origin of this ray along its direction by the given distance.
   *
   * @param {number} t - The distance along the ray to interpolate.
   * @return {Ray} A reference to this ray.
   */
  recast(e) {
    return this.origin.copy(this.at(e, cn)), this;
  }
  /**
   * Returns the point along this ray that is closest to the given point.
   *
   * @param {Vector3} point - A point in 3D space to get the closet location on the ray for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on this ray.
   */
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  /**
   * Returns the distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The distance.
   */
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  /**
   * Returns the squared distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The squared distance.
   */
  distanceSqToPoint(e) {
    const t = cn.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (cn.copy(this.origin).addScaledVector(this.direction, t), cn.distanceToSquared(e));
  }
  /**
   * Returns the squared distance between this ray and the given line segment.
   *
   * @param {Vector3} v0 - The start point of the line segment.
   * @param {Vector3} v1 - The end point of the line segment.
   * @param {Vector3} [optionalPointOnRay] - When provided, it receives the point on this ray that is closest to the segment.
   * @param {Vector3} [optionalPointOnSegment] - When provided, it receives the point on the line segment that is closest to this ray.
   * @return {number} The squared distance.
   */
  distanceSqToSegment(e, t, n, r) {
    es.copy(e).add(t).multiplyScalar(0.5), $i.copy(t).sub(e).normalize(), wn.copy(this.origin).sub(es);
    const s = e.distanceTo(t) * 0.5, a = -this.direction.dot($i), o = wn.dot(this.direction), c = -wn.dot($i), l = wn.lengthSq(), h = Math.abs(1 - a * a);
    let p, u, g, v;
    if (h > 0)
      if (p = a * c - o, u = a * o - c, v = s * h, p >= 0)
        if (u >= -v)
          if (u <= v) {
            const E = 1 / h;
            p *= E, u *= E, g = p * (p + a * u + 2 * o) + u * (a * p + u + 2 * c) + l;
          } else
            u = s, p = Math.max(0, -(a * u + o)), g = -p * p + u * (u + 2 * c) + l;
        else
          u = -s, p = Math.max(0, -(a * u + o)), g = -p * p + u * (u + 2 * c) + l;
      else
        u <= -v ? (p = Math.max(0, -(-a * s + o)), u = p > 0 ? -s : Math.min(Math.max(-s, -c), s), g = -p * p + u * (u + 2 * c) + l) : u <= v ? (p = 0, u = Math.min(Math.max(-s, -c), s), g = u * (u + 2 * c) + l) : (p = Math.max(0, -(a * s + o)), u = p > 0 ? s : Math.min(Math.max(-s, -c), s), g = -p * p + u * (u + 2 * c) + l);
    else
      u = a > 0 ? -s : s, p = Math.max(0, -(a * u + o)), g = -p * p + u * (u + 2 * c) + l;
    return n && n.copy(this.origin).addScaledVector(this.direction, p), r && r.copy(es).addScaledVector($i, u), g;
  }
  /**
   * Intersects this ray with the given sphere, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectSphere(e, t) {
    cn.subVectors(e.center, this.origin);
    const n = cn.dot(this.direction), r = cn.dot(cn) - n * n, s = e.radius * e.radius;
    if (r > s) return null;
    const a = Math.sqrt(s - r), o = n - a, c = n + a;
    return c < 0 ? null : o < 0 ? this.at(c, t) : this.at(o, t);
  }
  /**
   * Returns `true` if this ray intersects with the given sphere.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @return {boolean} Whether this ray intersects with the given sphere or not.
   */
  intersectsSphere(e) {
    return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  /**
   * Computes the distance from the ray's origin to the given plane. Returns `null` if the ray
   * does not intersect with the plane.
   *
   * @param {Plane} plane - The plane to compute the distance to.
   * @return {?number} Whether this ray intersects with the given sphere or not.
   */
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  /**
   * Intersects this ray with the given plane, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Plane} plane - The plane to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  /**
   * Returns `true` if this ray intersects with the given plane.
   *
   * @param {Plane} plane - The plane to intersect.
   * @return {boolean} Whether this ray intersects with the given plane or not.
   */
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  /**
   * Intersects this ray with the given bounding box, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Box3} box - The box to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectBox(e, t) {
    let n, r, s, a, o, c;
    const l = 1 / this.direction.x, h = 1 / this.direction.y, p = 1 / this.direction.z, u = this.origin;
    return l >= 0 ? (n = (e.min.x - u.x) * l, r = (e.max.x - u.x) * l) : (n = (e.max.x - u.x) * l, r = (e.min.x - u.x) * l), h >= 0 ? (s = (e.min.y - u.y) * h, a = (e.max.y - u.y) * h) : (s = (e.max.y - u.y) * h, a = (e.min.y - u.y) * h), n > a || s > r || ((s > n || isNaN(n)) && (n = s), (a < r || isNaN(r)) && (r = a), p >= 0 ? (o = (e.min.z - u.z) * p, c = (e.max.z - u.z) * p) : (o = (e.max.z - u.z) * p, c = (e.min.z - u.z) * p), n > c || o > r) || ((o > n || n !== n) && (n = o), (c < r || r !== r) && (r = c), r < 0) ? null : this.at(n >= 0 ? n : r, t);
  }
  /**
   * Returns `true` if this ray intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this ray intersects with the given box or not.
   */
  intersectsBox(e) {
    return this.intersectBox(e, cn) !== null;
  }
  /**
   * Intersects this ray with the given triangle, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Vector3} a - The first vertex of the triangle.
   * @param {Vector3} b - The second vertex of the triangle.
   * @param {Vector3} c - The third vertex of the triangle.
   * @param {boolean} backfaceCulling - Whether to use backface culling or not.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectTriangle(e, t, n, r, s) {
    ts.subVectors(t, e), Ji.subVectors(n, e), ns.crossVectors(ts, Ji);
    let a = this.direction.dot(ns), o;
    if (a > 0) {
      if (r) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    wn.subVectors(this.origin, e);
    const c = o * this.direction.dot(Ji.crossVectors(wn, Ji));
    if (c < 0)
      return null;
    const l = o * this.direction.dot(ts.cross(wn));
    if (l < 0 || c + l > a)
      return null;
    const h = -o * wn.dot(ns);
    return h < 0 ? null : this.at(h / a, s);
  }
  /**
   * Transforms this ray with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix4 - The transformation matrix.
   * @return {Ray} A reference to this ray.
   */
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  /**
   * Returns `true` if this ray is equal with the given one.
   *
   * @param {Ray} ray - The ray to test for equality.
   * @return {boolean} Whether this ray is equal with the given one.
   */
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  /**
   * Returns a new ray with copied values from this instance.
   *
   * @return {Ray} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class cl extends Bi {
  /**
   * Constructs a new mesh basic material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Be(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Dn(), this.combine = Vo, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const to = /* @__PURE__ */ new st(), Fn = /* @__PURE__ */ new Xc(), Qi = /* @__PURE__ */ new pa(), no = /* @__PURE__ */ new z(), ji = /* @__PURE__ */ new z(), er = /* @__PURE__ */ new z(), tr = /* @__PURE__ */ new z(), is = /* @__PURE__ */ new z(), nr = /* @__PURE__ */ new z(), io = /* @__PURE__ */ new z(), ir = /* @__PURE__ */ new z();
class Wt extends vt {
  /**
   * Constructs a new mesh.
   *
   * @param {BufferGeometry} [geometry] - The mesh geometry.
   * @param {Material|Array<Material>} [material] - The mesh material.
   */
  constructor(e = new vn(), t = new cl()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  /**
   * Sets the values of {@link Mesh#morphTargetDictionary} and {@link Mesh#morphTargetInfluences}
   * to make sure existing morph targets can influence this 3D object.
   */
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  /**
   * Returns the local-space position of the vertex at the given index, taking into
   * account the current animation state of both morph targets and skinning.
   *
   * @param {number} index - The vertex index.
   * @param {Vector3} target - The target object that is used to store the method's result.
   * @return {Vector3} The vertex position in local space.
   */
  getVertexPosition(e, t) {
    const n = this.geometry, r = n.attributes.position, s = n.morphAttributes.position, a = n.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const o = this.morphTargetInfluences;
    if (s && o) {
      nr.set(0, 0, 0);
      for (let c = 0, l = s.length; c < l; c++) {
        const h = o[c], p = s[c];
        h !== 0 && (is.fromBufferAttribute(p, e), a ? nr.addScaledVector(is, h) : nr.addScaledVector(is.sub(t), h));
      }
      t.add(nr);
    }
    return t;
  }
  /**
   * Computes intersection points between a casted ray and this line.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(e, t) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Qi.copy(n.boundingSphere), Qi.applyMatrix4(s), Fn.copy(e.ray).recast(e.near), !(Qi.containsPoint(Fn.origin) === !1 && (Fn.intersectSphere(Qi, no) === null || Fn.origin.distanceToSquared(no) > (e.far - e.near) ** 2)) && (to.copy(s).invert(), Fn.copy(e.ray).applyMatrix4(to), !(n.boundingBox !== null && Fn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, Fn)));
  }
  _computeIntersections(e, t, n) {
    let r;
    const s = this.geometry, a = this.material, o = s.index, c = s.attributes.position, l = s.attributes.uv, h = s.attributes.uv1, p = s.attributes.normal, u = s.groups, g = s.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let v = 0, E = u.length; v < E; v++) {
          const m = u[v], f = a[m.materialIndex], A = Math.max(m.start, g.start), w = Math.min(o.count, Math.min(m.start + m.count, g.start + g.count));
          for (let M = A, b = w; M < b; M += 3) {
            const y = o.getX(M), R = o.getX(M + 1), _ = o.getX(M + 2);
            r = rr(this, f, e, n, l, h, p, y, R, _), r && (r.faceIndex = Math.floor(M / 3), r.face.materialIndex = m.materialIndex, t.push(r));
          }
        }
      else {
        const v = Math.max(0, g.start), E = Math.min(o.count, g.start + g.count);
        for (let m = v, f = E; m < f; m += 3) {
          const A = o.getX(m), w = o.getX(m + 1), M = o.getX(m + 2);
          r = rr(this, a, e, n, l, h, p, A, w, M), r && (r.faceIndex = Math.floor(m / 3), t.push(r));
        }
      }
    else if (c !== void 0)
      if (Array.isArray(a))
        for (let v = 0, E = u.length; v < E; v++) {
          const m = u[v], f = a[m.materialIndex], A = Math.max(m.start, g.start), w = Math.min(c.count, Math.min(m.start + m.count, g.start + g.count));
          for (let M = A, b = w; M < b; M += 3) {
            const y = M, R = M + 1, _ = M + 2;
            r = rr(this, f, e, n, l, h, p, y, R, _), r && (r.faceIndex = Math.floor(M / 3), r.face.materialIndex = m.materialIndex, t.push(r));
          }
        }
      else {
        const v = Math.max(0, g.start), E = Math.min(c.count, g.start + g.count);
        for (let m = v, f = E; m < f; m += 3) {
          const A = m, w = m + 1, M = m + 2;
          r = rr(this, a, e, n, l, h, p, A, w, M), r && (r.faceIndex = Math.floor(m / 3), t.push(r));
        }
      }
  }
}
function qc(i, e, t, n, r, s, a, o) {
  let c;
  if (e.side === Rt ? c = n.intersectTriangle(a, s, r, !0, o) : c = n.intersectTriangle(r, s, a, e.side === Ln, o), c === null) return null;
  ir.copy(o), ir.applyMatrix4(i.matrixWorld);
  const l = t.ray.origin.distanceTo(ir);
  return l < t.near || l > t.far ? null : {
    distance: l,
    point: ir.clone(),
    object: i
  };
}
function rr(i, e, t, n, r, s, a, o, c, l) {
  i.getVertexPosition(o, ji), i.getVertexPosition(c, er), i.getVertexPosition(l, tr);
  const h = qc(i, e, t, n, ji, er, tr, io);
  if (h) {
    const p = new z();
    Ht.getBarycoord(io, ji, er, tr, p), r && (h.uv = Ht.getInterpolatedAttribute(r, o, c, l, p, new He())), s && (h.uv1 = Ht.getInterpolatedAttribute(s, o, c, l, p, new He())), a && (h.normal = Ht.getInterpolatedAttribute(a, o, c, l, p, new z()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const u = {
      a: o,
      b: c,
      c: l,
      normal: new z(),
      materialIndex: 0
    };
    Ht.getNormal(ji, er, tr, u.normal), h.face = u, h.barycoord = p;
  }
  return h;
}
class Yc extends bt {
  /**
   * Constructs a new data texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = null, t = 1, n = 1, r, s, a, o, c, l = xt, h = xt, p, u) {
    super(null, a, o, c, l, h, r, s, p, u), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const rs = /* @__PURE__ */ new z(), Zc = /* @__PURE__ */ new z(), Kc = /* @__PURE__ */ new De();
class Bn {
  /**
   * Constructs a new plane.
   *
   * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
   * @param {number} [constant=0] - The signed distance from the origin to the plane.
   */
  constructor(e = new z(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  /**
   * Sets the plane components by copying the given values.
   *
   * @param {Vector3} normal - The normal.
   * @param {number} constant - The constant.
   * @return {Plane} A reference to this plane.
   */
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  /**
   * Sets the plane components by defining `x`, `y`, `z` as the
   * plane normal and `w` as the constant.
   *
   * @param {number} x - The value for the normal's x component.
   * @param {number} y - The value for the normal's y component.
   * @param {number} z - The value for the normal's z component.
   * @param {number} w - The constant value.
   * @return {Plane} A reference to this plane.
   */
  setComponents(e, t, n, r) {
    return this.normal.set(e, t, n), this.constant = r, this;
  }
  /**
   * Sets the plane from the given normal and coplanar point (that is a point
   * that lies onto the plane).
   *
   * @param {Vector3} normal - The normal.
   * @param {Vector3} point - A coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  /**
   * Sets the plane from three coplanar points. The winding order is
   * assumed to be counter-clockwise, and determines the direction of
   * the plane normal.
   *
   * @param {Vector3} a - The first coplanar point.
   * @param {Vector3} b - The second coplanar point.
   * @param {Vector3} c - The third coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromCoplanarPoints(e, t, n) {
    const r = rs.subVectors(n, t).cross(Zc.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  /**
   * Copies the values of the given plane to this instance.
   *
   * @param {Plane} plane - The plane to copy.
   * @return {Plane} A reference to this plane.
   */
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  /**
   * Normalizes the plane normal and adjusts the constant accordingly.
   *
   * @return {Plane} A reference to this plane.
   */
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  /**
   * Negates both the plane normal and the constant.
   *
   * @return {Plane} A reference to this plane.
   */
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  /**
   * Returns the signed distance from the given point to this plane.
   *
   * @param {Vector3} point - The point to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  /**
   * Returns the signed distance from the given sphere to this plane.
   *
   * @param {Sphere} sphere - The sphere to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  /**
   * Projects a the given point onto the plane.
   *
   * @param {Vector3} point - The point to project.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The projected point on the plane.
   */
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  /**
   * Returns the intersection point of the passed line and the plane. Returns
   * `null` if the line does not intersect. Returns the line's starting point if
   * the line is coplanar with the plane.
   *
   * @param {Line3} line - The line to compute the intersection for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @param {boolean} [clampToLine=true] - Whether to clamp the intersection to the line segment.
   * @return {?Vector3} The intersection point. Returns `null` if no intersection is detected.
   */
  intersectLine(e, t, n = !0) {
    const r = e.delta(rs), s = this.normal.dot(r);
    if (s === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const a = -(e.start.dot(this.normal) + this.constant) / s;
    return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a);
  }
  /**
   * Returns `true` if the given line segment intersects with (passes through) the plane.
   *
   * @param {Line3} line - The line to test.
   * @return {boolean} Whether the given line segment intersects with the plane or not.
   */
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  /**
   * Returns `true` if the given bounding box intersects with the plane.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with the plane or not.
   */
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns `true` if the given bounding sphere intersects with the plane.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
   */
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns a coplanar vector to the plane, by calculating the
   * projection of the normal at the origin onto the plane.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The coplanar point.
   */
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  /**
   * Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform.
   *
   * The optional normal matrix can be pre-computed like so:
   * ```js
   * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
   * ```
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix.
   * @return {Plane} A reference to this plane.
   */
  applyMatrix4(e, t) {
    const n = t || Kc.getNormalMatrix(e), r = this.coplanarPoint(rs).applyMatrix4(e), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(s), this;
  }
  /**
   * Translates the plane by the distance defined by the given offset vector.
   * Note that this only affects the plane constant and will not affect the normal vector.
   *
   * @param {Vector3} offset - The offset vector.
   * @return {Plane} A reference to this plane.
   */
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  /**
   * Returns `true` if this plane is equal with the given one.
   *
   * @param {Plane} plane - The plane to test for equality.
   * @return {boolean} Whether this plane is equal with the given one.
   */
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  /**
   * Returns a new plane with copied values from this instance.
   *
   * @return {Plane} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
const On = /* @__PURE__ */ new pa(), $c = /* @__PURE__ */ new He(0.5, 0.5), sr = /* @__PURE__ */ new z();
class ma {
  /**
   * Constructs a new frustum.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   */
  constructor(e = new Bn(), t = new Bn(), n = new Bn(), r = new Bn(), s = new Bn(), a = new Bn()) {
    this.planes = [e, t, n, r, s, a];
  }
  /**
   * Sets the frustum planes by copying the given planes.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   * @return {Frustum} A reference to this frustum.
   */
  set(e, t, n, r, s, a) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(s), o[5].copy(a), this;
  }
  /**
   * Copies the values of the given frustum to this instance.
   *
   * @param {Frustum} frustum - The frustum to copy.
   * @return {Frustum} A reference to this frustum.
   */
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  /**
   * Sets the frustum planes from the given projection matrix.
   *
   * @param {Matrix4} m - The projection matrix.
   * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} coordinateSystem - The coordinate system.
   * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
   * @return {Frustum} A reference to this frustum.
   */
  setFromProjectionMatrix(e, t = Qt, n = !1) {
    const r = this.planes, s = e.elements, a = s[0], o = s[1], c = s[2], l = s[3], h = s[4], p = s[5], u = s[6], g = s[7], v = s[8], E = s[9], m = s[10], f = s[11], A = s[12], w = s[13], M = s[14], b = s[15];
    if (r[0].setComponents(l - a, g - h, f - v, b - A).normalize(), r[1].setComponents(l + a, g + h, f + v, b + A).normalize(), r[2].setComponents(l + o, g + p, f + E, b + w).normalize(), r[3].setComponents(l - o, g - p, f - E, b - w).normalize(), n)
      r[4].setComponents(c, u, m, M).normalize(), r[5].setComponents(l - c, g - u, f - m, b - M).normalize();
    else if (r[4].setComponents(l - c, g - u, f - m, b - M).normalize(), t === Qt)
      r[5].setComponents(l + c, g + u, f + m, b + M).normalize();
    else if (t === Ni)
      r[5].setComponents(c, u, m, M).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  /**
   * Returns `true` if the 3D object's bounding sphere is intersecting this frustum.
   *
   * Note that the 3D object must have a geometry so that the bounding sphere can be calculated.
   *
   * @param {Object3D} object - The 3D object to test.
   * @return {boolean} Whether the 3D object's bounding sphere is intersecting this frustum or not.
   */
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), On.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), On.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(On);
  }
  /**
   * Returns `true` if the given sprite is intersecting this frustum.
   *
   * @param {Sprite} sprite - The sprite to test.
   * @return {boolean} Whether the sprite is intersecting this frustum or not.
   */
  intersectsSprite(e) {
    On.center.set(0, 0, 0);
    const t = $c.distanceTo(e.center);
    return On.radius = 0.7071067811865476 + t, On.applyMatrix4(e.matrixWorld), this.intersectsSphere(On);
  }
  /**
   * Returns `true` if the given bounding sphere is intersecting this frustum.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the bounding sphere is intersecting this frustum or not.
   */
  intersectsSphere(e) {
    const t = this.planes, n = e.center, r = -e.radius;
    for (let s = 0; s < 6; s++)
      if (t[s].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  /**
   * Returns `true` if the given bounding box is intersecting this frustum.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box is intersecting this frustum or not.
   */
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = t[n];
      if (sr.x = r.normal.x > 0 ? e.max.x : e.min.x, sr.y = r.normal.y > 0 ? e.max.y : e.min.y, sr.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(sr) < 0)
        return !1;
    }
    return !0;
  }
  /**
   * Returns `true` if the given point lies within the frustum.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the point lies within this frustum or not.
   */
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  /**
   * Returns a new frustum with copied values from this instance.
   *
   * @return {Frustum} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class ul extends bt {
  /**
   * Constructs a new cube texture.
   *
   * @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space value.
   */
  constructor(e = [], t = kn, n, r, s, a, o, c, l, h) {
    super(e, t, n, r, s, a, o, c, l, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  /**
   * Alias for {@link CubeTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class gi extends bt {
  /**
   * Constructs a new depth texture.
   *
   * @param {number} width - The width of the texture.
   * @param {number} height - The height of the texture.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e, t, n = nn, r, s, a, o = xt, c = xt, l, h = xn, p = 1) {
    if (h !== xn && h !== Hn)
      throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    const u = { width: e, height: t, depth: p };
    super(u, r, s, a, o, c, h, n, l), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new fa(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
class Jc extends gi {
  /**
   * Constructs a new cube depth texture.
   *
   * @param {number} size - The size (width and height) of each cube face.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   */
  constructor(e, t = nn, n = kn, r, s, a = xt, o = xt, c, l = xn) {
    const h = { width: e, height: e, depth: 1 }, p = [h, h, h, h, h, h];
    super(e, e, t, n, r, s, a, o, c, l), this.image = p, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  /**
   * Alias for {@link CubeDepthTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class hl extends bt {
  /**
   * Creates a new raw texture.
   *
   * @param {?(WebGLTexture|GPUTexture)} [sourceTexture=null] - The external texture.
   */
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}
class vi extends vn {
  /**
   * Constructs a new box geometry.
   *
   * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
   * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
   * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
   * @param {number} [widthSegments=1] - Number of segmented rectangular faces along the width of the sides.
   * @param {number} [heightSegments=1] - Number of segmented rectangular faces along the height of the sides.
   * @param {number} [depthSegments=1] - Number of segmented rectangular faces along the depth of the sides.
   */
  constructor(e = 1, t = 1, n = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const c = [], l = [], h = [], p = [];
    let u = 0, g = 0;
    v("z", "y", "x", -1, -1, n, t, e, a, s, 0), v("z", "y", "x", 1, -1, n, t, -e, a, s, 1), v("x", "z", "y", 1, 1, e, n, t, r, a, 2), v("x", "z", "y", 1, -1, e, n, -t, r, a, 3), v("x", "y", "z", 1, -1, e, t, n, r, s, 4), v("x", "y", "z", -1, -1, e, t, -n, r, s, 5), this.setIndex(c), this.setAttribute("position", new gn(l, 3)), this.setAttribute("normal", new gn(h, 3)), this.setAttribute("uv", new gn(p, 2));
    function v(E, m, f, A, w, M, b, y, R, _, T) {
      const I = M / R, P = b / _, N = M / 2, q = b / 2, Y = y / 2, O = R + 1, X = _ + 1;
      let V = 0, J = 0;
      const ee = new z();
      for (let oe = 0; oe < X; oe++) {
        const se = oe * P - q;
        for (let Q = 0; Q < O; Q++) {
          const be = Q * I - N;
          ee[E] = be * A, ee[m] = se * w, ee[f] = Y, l.push(ee.x, ee.y, ee.z), ee[E] = 0, ee[m] = 0, ee[f] = y > 0 ? 1 : -1, h.push(ee.x, ee.y, ee.z), p.push(Q / R), p.push(1 - oe / _), V += 1;
        }
      }
      for (let oe = 0; oe < _; oe++)
        for (let se = 0; se < R; se++) {
          const Q = u + se + O * oe, be = u + se + O * (oe + 1), Re = u + (se + 1) + O * (oe + 1), Pe = u + (se + 1) + O * oe;
          c.push(Q, be, Pe), c.push(be, Re, Pe), J += 6;
        }
      o.addGroup(g, J, T), g += J, u += V;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {BoxGeometry} A new instance.
   */
  static fromJSON(e) {
    return new vi(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
class zi extends vn {
  /**
   * Constructs a new plane geometry.
   *
   * @param {number} [width=1] - The width along the X axis.
   * @param {number} [height=1] - The height along the Y axis
   * @param {number} [widthSegments=1] - The number of segments along the X axis.
   * @param {number} [heightSegments=1] - The number of segments along the Y axis.
   */
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const s = e / 2, a = t / 2, o = Math.floor(n), c = Math.floor(r), l = o + 1, h = c + 1, p = e / o, u = t / c, g = [], v = [], E = [], m = [];
    for (let f = 0; f < h; f++) {
      const A = f * u - a;
      for (let w = 0; w < l; w++) {
        const M = w * p - s;
        v.push(M, -A, 0), E.push(0, 0, 1), m.push(w / o), m.push(1 - f / c);
      }
    }
    for (let f = 0; f < c; f++)
      for (let A = 0; A < o; A++) {
        const w = A + l * f, M = A + l * (f + 1), b = A + 1 + l * (f + 1), y = A + 1 + l * f;
        g.push(w, M, y), g.push(M, b, y);
      }
    this.setIndex(g), this.setAttribute("position", new gn(v, 3)), this.setAttribute("normal", new gn(E, 3)), this.setAttribute("uv", new gn(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {PlaneGeometry} A new instance.
   */
  static fromJSON(e) {
    return new zi(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
function _i(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const r = i[t][n];
      if (ro(r))
        r.isRenderTargetTexture ? (Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = r.clone();
      else if (Array.isArray(r))
        if (ro(r[0])) {
          const s = [];
          for (let a = 0, o = r.length; a < o; a++)
            s[a] = r[a].clone();
          e[t][n] = s;
        } else
          e[t][n] = r.slice();
      else
        e[t][n] = r;
    }
  }
  return e;
}
function Tt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = _i(i[t]);
    for (const r in n)
      e[r] = n[r];
  }
  return e;
}
function ro(i) {
  return i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture || i.isQuaternion);
}
function Qc(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function fl(i) {
  const e = i.getRenderTarget();
  return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Ge.workingColorSpace;
}
const jc = { clone: _i, merge: Tt };
var eu = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, tu = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class rn extends Bi {
  /**
   * Constructs a new shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = eu, this.fragmentShader = tu, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = _i(e.uniforms), this.uniformsGroups = Qc(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const r in this.uniforms) {
      const a = this.uniforms[r].value;
      a && a.isTexture ? t.uniforms[r] = {
        type: "t",
        value: a.toJSON(e).uuid
      } : a && a.isColor ? t.uniforms[r] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? t.uniforms[r] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? t.uniforms[r] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? t.uniforms[r] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? t.uniforms[r] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? t.uniforms[r] = {
        type: "m4",
        value: a.toArray()
      } : t.uniforms[r] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
  /**
   * Deserializes the material from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized material.
   * @param {Object<string,Texture>} textures - A dictionary holding textures referenced by the material.
   * @return {ShaderMaterial} A reference to this material.
   */
  fromJSON(e, t) {
    if (super.fromJSON(e, t), e.uniforms !== void 0)
      for (const n in e.uniforms) {
        const r = e.uniforms[n];
        switch (this.uniforms[n] = {}, r.type) {
          case "t":
            this.uniforms[n].value = t[r.value] || null;
            break;
          case "c":
            this.uniforms[n].value = new Be().setHex(r.value);
            break;
          case "v2":
            this.uniforms[n].value = new He().fromArray(r.value);
            break;
          case "v3":
            this.uniforms[n].value = new z().fromArray(r.value);
            break;
          case "v4":
            this.uniforms[n].value = new tt().fromArray(r.value);
            break;
          case "m3":
            this.uniforms[n].value = new De().fromArray(r.value);
            break;
          case "m4":
            this.uniforms[n].value = new st().fromArray(r.value);
            break;
          default:
            this.uniforms[n].value = r.value;
        }
      }
    if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0)
      for (const n in e.extensions)
        this.extensions[n] = e.extensions[n];
    return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
  }
}
class nu extends rn {
  /**
   * Constructs a new raw shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class si extends Bi {
  /**
   * Constructs a new mesh standard material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new Be(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Be(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = js, this.normalScale = new He(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Dn(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class iu extends Bi {
  /**
   * Constructs a new mesh depth material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = pc, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class ru extends Bi {
  /**
   * Constructs a new mesh distance material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
class ga extends vt {
  /**
   * Constructs a new light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Be(e), this.intensity = t;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
  }
}
class su extends ga {
  /**
   * Constructs a new hemisphere light.
   *
   * @param {(number|Color|string)} [skyColor=0xffffff] - The light's sky color.
   * @param {(number|Color|string)} [groundColor=0xffffff] - The light's ground color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(e, t, n) {
    super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(vt.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Be(t);
  }
  copy(e, t) {
    return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.groundColor = this.groundColor.getHex(), t;
  }
}
const ss = /* @__PURE__ */ new st(), so = /* @__PURE__ */ new z(), ao = /* @__PURE__ */ new z();
class dl {
  /**
   * Constructs a new light shadow.
   *
   * @param {Camera} camera - The light's view of the world.
   */
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new He(512, 512), this.mapType = Dt, this.map = null, this.mapPass = null, this.matrix = new st(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new ma(), this._frameExtents = new He(1, 1), this._viewportCount = 1, this._viewports = [
      new tt(0, 0, 1, 1)
    ];
  }
  /**
   * Used internally by the renderer to get the number of viewports that need
   * to be rendered for this shadow.
   *
   * @return {number} The viewport count.
   */
  getViewportCount() {
    return this._viewportCount;
  }
  /**
   * Gets the shadow cameras frustum. Used internally by the renderer to cull objects.
   *
   * @return {Frustum} The shadow camera frustum.
   */
  getFrustum() {
    return this._frustum;
  }
  /**
   * Update the matrices for the camera and shadow, used internally by the renderer.
   *
   * @param {Light} light - The light for which the shadow is being rendered.
   */
  updateMatrices(e) {
    const t = this.camera, n = this.matrix;
    so.setFromMatrixPosition(e.matrixWorld), t.position.copy(so), ao.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(ao), t.updateMatrixWorld(), ss.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(ss, t.coordinateSystem, t.reversedDepth), t.coordinateSystem === Ni || t.reversedDepth ? n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      1,
      0,
      // Identity Z (preserving the correct [0, 1] range from the projection matrix)
      0,
      0,
      0,
      1
    ) : n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), n.multiply(ss);
  }
  /**
   * Returns a viewport definition for the given viewport index.
   *
   * @param {number} viewportIndex - The viewport index.
   * @return {Vector4} The viewport.
   */
  getViewport(e) {
    return this._viewports[e];
  }
  /**
   * Returns the frame extends.
   *
   * @return {Vector2} The frame extends.
   */
  getFrameExtents() {
    return this._frameExtents;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   */
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  /**
   * Copies the values of the given light shadow instance to this instance.
   *
   * @param {LightShadow} source - The light shadow to copy.
   * @return {LightShadow} A reference to this light shadow instance.
   */
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this;
  }
  /**
   * Returns a new light shadow instance with copied values from this instance.
   *
   * @return {LightShadow} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Serializes the light shadow into JSON.
   *
   * @return {Object} A JSON object representing the serialized light shadow.
   * @see {@link ObjectLoader#parse}
   */
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
const ar = /* @__PURE__ */ new z(), or = /* @__PURE__ */ new xi(), Zt = /* @__PURE__ */ new z();
class pl extends vt {
  /**
   * Constructs a new camera.
   */
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new st(), this.projectionMatrix = new st(), this.projectionMatrixInverse = new st(), this.coordinateSystem = Qt, this._reversedDepth = !1;
  }
  /**
   * The flag that indicates whether the camera uses a reversed depth buffer.
   *
   * @type {boolean}
   * @default false
   */
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * This method is overwritten since cameras have a different forward vector compared to other
   * 3D objects. A camera looks down its local, negative z-axis by default.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorld.decompose(ar, or, Zt), Zt.x === 1 && Zt.y === 1 && Zt.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ar, or, Zt.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t, n = !1) {
    super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(ar, or, Zt), Zt.x === 1 && Zt.y === 1 && Zt.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(ar, or, Zt.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Rn = /* @__PURE__ */ new z(), oo = /* @__PURE__ */ new He(), lo = /* @__PURE__ */ new He();
class Ot extends pl {
  /**
   * Constructs a new perspective camera.
   *
   * @param {number} [fov=50] - The vertical field of view.
   * @param {number} [aspect=1] - The aspect ratio.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = 50, t = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current {@link PerspectiveCamera#filmGauge}.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * @param {number} focalLength - Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = ea * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Returns the focal length from the current {@link PerspectiveCamera#fov} and
   * {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The computed focal length.
   */
  getFocalLength() {
    const e = Math.tan(Nr * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  /**
   * Returns the current vertical field of view angle in degrees considering {@link PerspectiveCamera#zoom}.
   *
   * @return {number} The effective FOV.
   */
  getEffectiveFOV() {
    return ea * 2 * Math.atan(
      Math.tan(Nr * 0.5 * this.fov) / this.zoom
    );
  }
  /**
   * Returns the width of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  /**
   * Returns the height of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets `minTarget` and `maxTarget` to the coordinates of the lower-left and upper-right corners of the view rectangle.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} minTarget - The lower-left corner of the view rectangle is written into this vector.
   * @param {Vector2} maxTarget - The upper-right corner of the view rectangle is written into this vector.
   */
  getViewBounds(e, t, n) {
    Rn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Rn.x, Rn.y).multiplyScalar(-e / Rn.z), Rn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Rn.x, Rn.y).multiplyScalar(-e / Rn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} target - The target vector that is used to store result where x is width and y is height.
   * @returns {Vector2} The view size.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, oo, lo), t.subVectors(lo, oo);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *```
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *```
   * then for each monitor you would call it like this:
   *```js
   * const w = 1920;
   * const h = 1080;
   * const fullWidth = w * 3;
   * const fullHeight = h * 2;
   *
   * // --A--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   * // --B--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   * // --C--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   * // --D--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   * // --E--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   * // --F--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   * ```
   *
   * Note there is no reason monitors have to be the same size or in a grid.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   */
  setViewOffset(e, t, n, r, s, a) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(Nr * 0.5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, s = -0.5 * r;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const c = a.fullWidth, l = a.fullHeight;
      s += a.offsetX * r / c, t -= a.offsetY * n / l, r *= a.width / c, n *= a.height / l;
    }
    const o = this.filmOffset;
    o !== 0 && (s += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
class au extends dl {
  /**
   * Constructs a new point light shadow.
   */
  constructor() {
    super(new Ot(90, 1, 0.5, 500)), this.isPointLightShadow = !0;
  }
}
class ou extends ga {
  /**
   * Constructs a new point light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity measured in candela (cd).
   * @param {number} [distance=0] - Maximum range of the light. `0` means no limit.
   * @param {number} [decay=2] - The amount the light dims along the distance of the light.
   */
  constructor(e, t, n = 0, r = 2) {
    super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = r, this.shadow = new au();
  }
  /**
   * The light's power. Power is the luminous power of the light measured in lumens (lm).
   * Changing the power will also change the light's intensity.
   *
   * @type {number}
   */
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(e) {
    this.intensity = e / (4 * Math.PI);
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.distance = this.distance, t.object.decay = this.decay, t.object.shadow = this.shadow.toJSON(), t;
  }
}
class Tr extends pl {
  /**
   * Constructs a new orthographic camera.
   *
   * @param {number} [left=-1] - The left plane of the camera's frustum.
   * @param {number} [right=1] - The right plane of the camera's frustum.
   * @param {number} [top=1] - The top plane of the camera's frustum.
   * @param {number} [bottom=-1] - The bottom plane of the camera's frustum.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = -1, t = 1, n = 1, r = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   * @see {@link PerspectiveCamera#setViewOffset}
   */
  setViewOffset(e, t, n, r, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = n - e, a = n + e, o = r + t, c = r - t;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += l * this.view.offsetX, a = s + l * this.view.width, o -= h * this.view.offsetY, c = o - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, c, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
class lu extends dl {
  /**
   * Constructs a new directional light shadow.
   */
  constructor() {
    super(new Tr(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class cu extends ga {
  /**
   * Constructs a new directional light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(vt.DEFAULT_UP), this.updateMatrix(), this.target = new vt(), this.shadow = new lu();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
  }
}
const ai = -90, oi = 1;
class uu extends vt {
  /**
   * Constructs a new cube camera.
   *
   * @param {number} near - The camera's near plane.
   * @param {number} far - The camera's far plane.
   * @param {WebGLCubeRenderTarget} renderTarget - The cube render target.
   */
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new Ot(ai, oi, e, t);
    r.layers = this.layers, this.add(r);
    const s = new Ot(ai, oi, e, t);
    s.layers = this.layers, this.add(s);
    const a = new Ot(ai, oi, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Ot(ai, oi, e, t);
    o.layers = this.layers, this.add(o);
    const c = new Ot(ai, oi, e, t);
    c.layers = this.layers, this.add(c);
    const l = new Ot(ai, oi, e, t);
    l.layers = this.layers, this.add(l);
  }
  /**
   * Must be called when the coordinate system of the cube camera is changed.
   */
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, r, s, a, o, c] = t;
    for (const l of t) this.remove(l);
    if (e === Qt)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), c.up.set(0, 1, 0), c.lookAt(0, 0, -1);
    else if (e === Ni)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), c.up.set(0, -1, 0), c.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const l of t)
      this.add(l), l.updateMatrixWorld();
  }
  /**
   * Calling this method will render the given scene with the given renderer
   * into the cube render target of the camera.
   *
   * @param {(Renderer|WebGLRenderer)} renderer - The renderer.
   * @param {Scene} scene - The scene to render.
   */
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, c, l, h] = this.children, p = e.getRenderTarget(), u = e.getActiveCubeFace(), g = e.getActiveMipmapLevel(), v = e.xr.enabled;
    e.xr.enabled = !1;
    const E = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1;
    let m = !1;
    e.isWebGLRenderer === !0 ? m = e.state.buffers.depth.getReversed() : m = e.reversedDepthBuffer, e.setRenderTarget(n, 0, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 1, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, c), e.setRenderTarget(n, 4, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, l), n.texture.generateMipmaps = E, e.setRenderTarget(n, 5, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, h), e.setRenderTarget(p, u, g), e.xr.enabled = v, n.texture.needsPMREMUpdate = !0;
  }
}
class hu extends Ot {
  /**
   * Constructs a new array camera.
   *
   * @param {Array<PerspectiveCamera>} [array=[]] - An array of perspective sub cameras.
   */
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}
class fu {
  /**
   * Constructs a new timer.
   */
  constructor() {
    this._previousTime = 0, this._currentTime = 0, this._startTime = performance.now(), this._delta = 0, this._elapsed = 0, this._timescale = 1, this._document = null, this._pageVisibilityHandler = null;
  }
  /**
   * Connect the timer to the given document.Calling this method is not mandatory to
   * use the timer but enables the usage of the Page Visibility API to avoid large time
   * delta values.
   *
   * @param {Document} document - The document.
   */
  connect(e) {
    this._document = e, e.hidden !== void 0 && (this._pageVisibilityHandler = du.bind(this), e.addEventListener("visibilitychange", this._pageVisibilityHandler, !1));
  }
  /**
   * Disconnects the timer from the DOM and also disables the usage of the Page Visibility API.
   */
  disconnect() {
    this._pageVisibilityHandler !== null && (this._document.removeEventListener("visibilitychange", this._pageVisibilityHandler), this._pageVisibilityHandler = null), this._document = null;
  }
  /**
   * Returns the time delta in seconds.
   *
   * @return {number} The time delta in second.
   */
  getDelta() {
    return this._delta / 1e3;
  }
  /**
   * Returns the elapsed time in seconds.
   *
   * @return {number} The elapsed time in second.
   */
  getElapsed() {
    return this._elapsed / 1e3;
  }
  /**
   * Returns the timescale.
   *
   * @return {number} The timescale.
   */
  getTimescale() {
    return this._timescale;
  }
  /**
   * Sets the given timescale which scale the time delta computation
   * in `update()`.
   *
   * @param {number} timescale - The timescale to set.
   * @return {Timer} A reference to this timer.
   */
  setTimescale(e) {
    return this._timescale = e, this;
  }
  /**
   * Resets the time computation for the current simulation step.
   *
   * @return {Timer} A reference to this timer.
   */
  reset() {
    return this._currentTime = performance.now() - this._startTime, this;
  }
  /**
   * Can be used to free all internal resources. Usually called when
   * the timer instance isn't required anymore.
   */
  dispose() {
    this.disconnect();
  }
  /**
   * Updates the internal state of the timer. This method should be called
   * once per simulation step and before you perform queries against the timer
   * (e.g. via `getDelta()`).
   *
   * @param {number} timestamp - The current time in milliseconds. Can be obtained
   * from the `requestAnimationFrame` callback argument. If not provided, the current
   * time will be determined with `performance.now`.
   * @return {Timer} A reference to this timer.
   */
  update(e) {
    return this._pageVisibilityHandler !== null && this._document.hidden === !0 ? this._delta = 0 : (this._previousTime = this._currentTime, this._currentTime = (e !== void 0 ? e : performance.now()) - this._startTime, this._delta = (this._currentTime - this._previousTime) * this._timescale, this._elapsed += this._delta), this;
  }
}
function du() {
  this._document.hidden === !1 && this.reset();
}
const Sa = class Sa {
  /**
   * Constructs a new 2x2 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   */
  constructor(e, t, n, r) {
    this.elements = [
      1,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r);
  }
  /**
   * Sets this matrix to the 2x2 identity matrix.
   *
   * @return {Matrix2} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix2} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 4; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} n11 - 1-1 matrix element.
   * @param {number} n12 - 1-2 matrix element.
   * @param {number} n21 - 2-1 matrix element.
   * @param {number} n22 - 2-2 matrix element.
   * @return {Matrix2} A reference to this matrix.
   */
  set(e, t, n, r) {
    const s = this.elements;
    return s[0] = e, s[2] = t, s[1] = n, s[3] = r, this;
  }
};
Sa.prototype.isMatrix2 = !0;
let co = Sa;
function uo(i, e, t, n) {
  const r = pu(n);
  switch (t) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case el:
      return i * e;
    case nl:
      return i * e / r.components * r.byteLength;
    case oa:
      return i * e / r.components * r.byteLength;
    case Wn:
      return i * e * 2 / r.components * r.byteLength;
    case la:
      return i * e * 2 / r.components * r.byteLength;
    case tl:
      return i * e * 3 / r.components * r.byteLength;
    case kt:
      return i * e * 4 / r.components * r.byteLength;
    case ca:
      return i * e * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case ur:
    case hr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case fr:
    case dr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case Ts:
    case As:
      return Math.max(i, 16) * Math.max(e, 8) / 4;
    case ys:
    case bs:
      return Math.max(i, 8) * Math.max(e, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case ws:
    case Rs:
    case Ps:
    case Ls:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Cs:
    case _r:
    case Ds:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case Is:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case Us:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case Ns:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case Fs:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case Os:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case Bs:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case zs:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case Gs:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case Vs:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case Hs:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case ks:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case Ws:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case Xs:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case qs:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case Ys:
    case Zs:
    case Ks:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case $s:
    case Js:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case xr:
    case Qs:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function pu(i) {
  switch (i) {
    case Dt:
    case $o:
      return { byteLength: 1, components: 1 };
    case Ii:
    case Jo:
    case _n:
      return { byteLength: 2, components: 1 };
    case sa:
    case aa:
      return { byteLength: 2, components: 4 };
    case nn:
    case ra:
    case Jt:
      return { byteLength: 4, components: 1 };
    case Qo:
    case jo:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: ia
} }));
typeof window < "u" && (window.__THREE__ ? Ce("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = ia);
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
function ml() {
  let i = null, e = !1, t = null, n = null;
  function r(s, a) {
    t(s, a), n = i.requestAnimationFrame(r);
  }
  return {
    start: function() {
      e !== !0 && t !== null && i !== null && (n = i.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      i !== null && i.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(s) {
      t = s;
    },
    setContext: function(s) {
      i = s;
    }
  };
}
function mu(i) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(o, c) {
    const l = o.array, h = o.usage, p = l.byteLength, u = i.createBuffer();
    i.bindBuffer(c, u), i.bufferData(c, l, h), o.onUploadCallback();
    let g;
    if (l instanceof Float32Array)
      g = i.FLOAT;
    else if (typeof Float16Array < "u" && l instanceof Float16Array)
      g = i.HALF_FLOAT;
    else if (l instanceof Uint16Array)
      o.isFloat16BufferAttribute ? g = i.HALF_FLOAT : g = i.UNSIGNED_SHORT;
    else if (l instanceof Int16Array)
      g = i.SHORT;
    else if (l instanceof Uint32Array)
      g = i.UNSIGNED_INT;
    else if (l instanceof Int32Array)
      g = i.INT;
    else if (l instanceof Int8Array)
      g = i.BYTE;
    else if (l instanceof Uint8Array)
      g = i.UNSIGNED_BYTE;
    else if (l instanceof Uint8ClampedArray)
      g = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + l);
    return {
      buffer: u,
      type: g,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: o.version,
      size: p
    };
  }
  function n(o, c, l) {
    const h = c.array, p = c.updateRanges;
    if (i.bindBuffer(l, o), p.length === 0)
      i.bufferSubData(l, 0, h);
    else {
      p.sort((g, v) => g.start - v.start);
      let u = 0;
      for (let g = 1; g < p.length; g++) {
        const v = p[u], E = p[g];
        E.start <= v.start + v.count + 1 ? v.count = Math.max(
          v.count,
          E.start + E.count - v.start
        ) : (++u, p[u] = E);
      }
      p.length = u + 1;
      for (let g = 0, v = p.length; g < v; g++) {
        const E = p[g];
        i.bufferSubData(
          l,
          E.start * h.BYTES_PER_ELEMENT,
          h,
          E.start,
          E.count
        );
      }
      c.clearUpdateRanges();
    }
    c.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), e.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const c = e.get(o);
    c && (i.deleteBuffer(c.buffer), e.delete(o));
  }
  function a(o, c) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const h = e.get(o);
      (!h || h.version < o.version) && e.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const l = e.get(o);
    if (l === void 0)
      e.set(o, t(o, c));
    else if (l.version < o.version) {
      if (l.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(l.buffer, o, c), l.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
var gu = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, _u = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, xu = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, vu = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Mu = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Su = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Eu = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, yu = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, Tu = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`, bu = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Au = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, wu = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Ru = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, Cu = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, Pu = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Lu = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, Du = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Iu = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Uu = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Nu = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`, Fu = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`, Ou = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`, Bu = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`, zu = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Gu = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Vu = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`, Hu = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, ku = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Wu = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Xu = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, qu = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Yu = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Zu = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`, Ku = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`, $u = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Ju = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Qu = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, ju = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, eh = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, th = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, nh = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, ih = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, rh = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, sh = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, ah = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, oh = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`, lh = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, ch = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, uh = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, hh = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, fh = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, dh = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, ph = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, mh = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, gh = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, _h = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, xh = `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`, vh = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Mh = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Sh = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Eh = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, yh = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Th = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, bh = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, Ah = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, wh = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Rh = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Ch = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Ph = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Lh = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Dh = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, Ih = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Uh = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Nh = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Fh = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Oh = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Bh = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`, zh = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Gh = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Vh = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Hh = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, kh = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Wh = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Xh = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`, qh = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Yh = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Zh = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Kh = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, $h = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Jh = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Qh = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`, jh = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, ef = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, tf = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, nf = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, rf = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, sf = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, af = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, of = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, lf = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, cf = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, uf = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, hf = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, ff = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, df = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, pf = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, mf = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, gf = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const _f = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, xf = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, vf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Mf = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Sf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Ef = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, yf = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, Tf = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, bf = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, Af = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`, wf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, Rf = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Cf = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Pf = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Lf = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, Df = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, If = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Uf = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Nf = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Ff = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Of = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Bf = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, zf = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Gf = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Vf = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Hf = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, kf = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Wf = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Xf = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, qf = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Yf = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Zf = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Kf = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, $f = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Fe = {
  alphahash_fragment: gu,
  alphahash_pars_fragment: _u,
  alphamap_fragment: xu,
  alphamap_pars_fragment: vu,
  alphatest_fragment: Mu,
  alphatest_pars_fragment: Su,
  aomap_fragment: Eu,
  aomap_pars_fragment: yu,
  batching_pars_vertex: Tu,
  batching_vertex: bu,
  begin_vertex: Au,
  beginnormal_vertex: wu,
  bsdfs: Ru,
  iridescence_fragment: Cu,
  bumpmap_pars_fragment: Pu,
  clipping_planes_fragment: Lu,
  clipping_planes_pars_fragment: Du,
  clipping_planes_pars_vertex: Iu,
  clipping_planes_vertex: Uu,
  color_fragment: Nu,
  color_pars_fragment: Fu,
  color_pars_vertex: Ou,
  color_vertex: Bu,
  common: zu,
  cube_uv_reflection_fragment: Gu,
  defaultnormal_vertex: Vu,
  displacementmap_pars_vertex: Hu,
  displacementmap_vertex: ku,
  emissivemap_fragment: Wu,
  emissivemap_pars_fragment: Xu,
  colorspace_fragment: qu,
  colorspace_pars_fragment: Yu,
  envmap_fragment: Zu,
  envmap_common_pars_fragment: Ku,
  envmap_pars_fragment: $u,
  envmap_pars_vertex: Ju,
  envmap_physical_pars_fragment: lh,
  envmap_vertex: Qu,
  fog_vertex: ju,
  fog_pars_vertex: eh,
  fog_fragment: th,
  fog_pars_fragment: nh,
  gradientmap_pars_fragment: ih,
  lightmap_pars_fragment: rh,
  lights_lambert_fragment: sh,
  lights_lambert_pars_fragment: ah,
  lights_pars_begin: oh,
  lights_toon_fragment: ch,
  lights_toon_pars_fragment: uh,
  lights_phong_fragment: hh,
  lights_phong_pars_fragment: fh,
  lights_physical_fragment: dh,
  lights_physical_pars_fragment: ph,
  lights_fragment_begin: mh,
  lights_fragment_maps: gh,
  lights_fragment_end: _h,
  lightprobes_pars_fragment: xh,
  logdepthbuf_fragment: vh,
  logdepthbuf_pars_fragment: Mh,
  logdepthbuf_pars_vertex: Sh,
  logdepthbuf_vertex: Eh,
  map_fragment: yh,
  map_pars_fragment: Th,
  map_particle_fragment: bh,
  map_particle_pars_fragment: Ah,
  metalnessmap_fragment: wh,
  metalnessmap_pars_fragment: Rh,
  morphinstance_vertex: Ch,
  morphcolor_vertex: Ph,
  morphnormal_vertex: Lh,
  morphtarget_pars_vertex: Dh,
  morphtarget_vertex: Ih,
  normal_fragment_begin: Uh,
  normal_fragment_maps: Nh,
  normal_pars_fragment: Fh,
  normal_pars_vertex: Oh,
  normal_vertex: Bh,
  normalmap_pars_fragment: zh,
  clearcoat_normal_fragment_begin: Gh,
  clearcoat_normal_fragment_maps: Vh,
  clearcoat_pars_fragment: Hh,
  iridescence_pars_fragment: kh,
  opaque_fragment: Wh,
  packing: Xh,
  premultiplied_alpha_fragment: qh,
  project_vertex: Yh,
  dithering_fragment: Zh,
  dithering_pars_fragment: Kh,
  roughnessmap_fragment: $h,
  roughnessmap_pars_fragment: Jh,
  shadowmap_pars_fragment: Qh,
  shadowmap_pars_vertex: jh,
  shadowmap_vertex: ef,
  shadowmask_pars_fragment: tf,
  skinbase_vertex: nf,
  skinning_pars_vertex: rf,
  skinning_vertex: sf,
  skinnormal_vertex: af,
  specularmap_fragment: of,
  specularmap_pars_fragment: lf,
  tonemapping_fragment: cf,
  tonemapping_pars_fragment: uf,
  transmission_fragment: hf,
  transmission_pars_fragment: ff,
  uv_pars_fragment: df,
  uv_pars_vertex: pf,
  uv_vertex: mf,
  worldpos_vertex: gf,
  background_vert: _f,
  background_frag: xf,
  backgroundCube_vert: vf,
  backgroundCube_frag: Mf,
  cube_vert: Sf,
  cube_frag: Ef,
  depth_vert: yf,
  depth_frag: Tf,
  distance_vert: bf,
  distance_frag: Af,
  equirect_vert: wf,
  equirect_frag: Rf,
  linedashed_vert: Cf,
  linedashed_frag: Pf,
  meshbasic_vert: Lf,
  meshbasic_frag: Df,
  meshlambert_vert: If,
  meshlambert_frag: Uf,
  meshmatcap_vert: Nf,
  meshmatcap_frag: Ff,
  meshnormal_vert: Of,
  meshnormal_frag: Bf,
  meshphong_vert: zf,
  meshphong_frag: Gf,
  meshphysical_vert: Vf,
  meshphysical_frag: Hf,
  meshtoon_vert: kf,
  meshtoon_frag: Wf,
  points_vert: Xf,
  points_frag: qf,
  shadow_vert: Yf,
  shadow_frag: Zf,
  sprite_vert: Kf,
  sprite_frag: $f
}, fe = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Be(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new De() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new De() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new De() },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 },
    // basic, lambert, phong
    dfgLUT: { value: null }
    // DFG LUT for physically-based rendering
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new De() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new De() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new De() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new De() },
    normalScale: { value: /* @__PURE__ */ new He(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new De() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new De() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new De() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new De() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Be(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null },
    probesSH: { value: null },
    probesMin: { value: /* @__PURE__ */ new z() },
    probesMax: { value: /* @__PURE__ */ new z() },
    probesResolution: { value: /* @__PURE__ */ new z() }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Be(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new De() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Be(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new He(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new De() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 }
  }
}, $t = {
  basic: {
    uniforms: /* @__PURE__ */ Tt([
      fe.common,
      fe.specularmap,
      fe.envmap,
      fe.aomap,
      fe.lightmap,
      fe.fog
    ]),
    vertexShader: Fe.meshbasic_vert,
    fragmentShader: Fe.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Tt([
      fe.common,
      fe.specularmap,
      fe.envmap,
      fe.aomap,
      fe.lightmap,
      fe.emissivemap,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      fe.fog,
      fe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Be(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Fe.meshlambert_vert,
    fragmentShader: Fe.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Tt([
      fe.common,
      fe.specularmap,
      fe.envmap,
      fe.aomap,
      fe.lightmap,
      fe.emissivemap,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      fe.fog,
      fe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Be(0) },
        specular: { value: /* @__PURE__ */ new Be(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Fe.meshphong_vert,
    fragmentShader: Fe.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Tt([
      fe.common,
      fe.envmap,
      fe.aomap,
      fe.lightmap,
      fe.emissivemap,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      fe.roughnessmap,
      fe.metalnessmap,
      fe.fog,
      fe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Be(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Fe.meshphysical_vert,
    fragmentShader: Fe.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Tt([
      fe.common,
      fe.aomap,
      fe.lightmap,
      fe.emissivemap,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      fe.gradientmap,
      fe.fog,
      fe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Be(0) }
      }
    ]),
    vertexShader: Fe.meshtoon_vert,
    fragmentShader: Fe.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Tt([
      fe.common,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      fe.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Fe.meshmatcap_vert,
    fragmentShader: Fe.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Tt([
      fe.points,
      fe.fog
    ]),
    vertexShader: Fe.points_vert,
    fragmentShader: Fe.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Tt([
      fe.common,
      fe.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Fe.linedashed_vert,
    fragmentShader: Fe.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Tt([
      fe.common,
      fe.displacementmap
    ]),
    vertexShader: Fe.depth_vert,
    fragmentShader: Fe.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Tt([
      fe.common,
      fe.bumpmap,
      fe.normalmap,
      fe.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Fe.meshnormal_vert,
    fragmentShader: Fe.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Tt([
      fe.sprite,
      fe.fog
    ]),
    vertexShader: Fe.sprite_vert,
    fragmentShader: Fe.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new De() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Fe.background_vert,
    fragmentShader: Fe.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new De() }
    },
    vertexShader: Fe.backgroundCube_vert,
    fragmentShader: Fe.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Fe.cube_vert,
    fragmentShader: Fe.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Fe.equirect_vert,
    fragmentShader: Fe.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ Tt([
      fe.common,
      fe.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new z() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Fe.distance_vert,
    fragmentShader: Fe.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Tt([
      fe.lights,
      fe.fog,
      {
        color: { value: /* @__PURE__ */ new Be(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Fe.shadow_vert,
    fragmentShader: Fe.shadow_frag
  }
};
$t.physical = {
  uniforms: /* @__PURE__ */ Tt([
    $t.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new De() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new De() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new He(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new De() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new De() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new De() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Be(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new De() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new De() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new De() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new He() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new De() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Be(0) },
      specularColor: { value: /* @__PURE__ */ new Be(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new De() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new De() },
      anisotropyVector: { value: /* @__PURE__ */ new He() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new De() }
    }
  ]),
  vertexShader: Fe.meshphysical_vert,
  fragmentShader: Fe.meshphysical_frag
};
const lr = { r: 0, b: 0, g: 0 }, Jf = /* @__PURE__ */ new st(), gl = /* @__PURE__ */ new De();
gl.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Qf(i, e, t, n, r, s) {
  const a = new Be(0);
  let o = r === !0 ? 0 : 1, c, l, h = null, p = 0, u = null;
  function g(A) {
    let w = A.isScene === !0 ? A.background : null;
    if (w && w.isTexture) {
      const M = A.backgroundBlurriness > 0;
      w = e.get(w, M);
    }
    return w;
  }
  function v(A) {
    let w = !1;
    const M = g(A);
    M === null ? m(a, o) : M && M.isColor && (m(M, 1), w = !0);
    const b = i.xr.getEnvironmentBlendMode();
    b === "additive" ? t.buffers.color.setClear(0, 0, 0, 1, s) : b === "alpha-blend" && t.buffers.color.setClear(0, 0, 0, 0, s), (i.autoClear || w) && (t.buffers.depth.setTest(!0), t.buffers.depth.setMask(!0), t.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function E(A, w) {
    const M = g(w);
    M && (M.isCubeTexture || M.mapping === yr) ? (l === void 0 && (l = new Wt(
      new vi(1, 1, 1),
      new rn({
        name: "BackgroundCubeMaterial",
        uniforms: _i($t.backgroundCube.uniforms),
        vertexShader: $t.backgroundCube.vertexShader,
        fragmentShader: $t.backgroundCube.fragmentShader,
        side: Rt,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(b, y, R) {
      this.matrixWorld.copyPosition(R.matrixWorld);
    }, Object.defineProperty(l.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), n.update(l)), l.material.uniforms.envMap.value = M, l.material.uniforms.backgroundBlurriness.value = w.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = w.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(Jf.makeRotationFromEuler(w.backgroundRotation)).transpose(), M.isCubeTexture && M.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(gl), l.material.toneMapped = Ge.getTransfer(M.colorSpace) !== Ze, (h !== M || p !== M.version || u !== i.toneMapping) && (l.material.needsUpdate = !0, h = M, p = M.version, u = i.toneMapping), l.layers.enableAll(), A.unshift(l, l.geometry, l.material, 0, 0, null)) : M && M.isTexture && (c === void 0 && (c = new Wt(
      new zi(2, 2),
      new rn({
        name: "BackgroundMaterial",
        uniforms: _i($t.background.uniforms),
        vertexShader: $t.background.vertexShader,
        fragmentShader: $t.background.fragmentShader,
        side: Ln,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), n.update(c)), c.material.uniforms.t2D.value = M, c.material.uniforms.backgroundIntensity.value = w.backgroundIntensity, c.material.toneMapped = Ge.getTransfer(M.colorSpace) !== Ze, M.matrixAutoUpdate === !0 && M.updateMatrix(), c.material.uniforms.uvTransform.value.copy(M.matrix), (h !== M || p !== M.version || u !== i.toneMapping) && (c.material.needsUpdate = !0, h = M, p = M.version, u = i.toneMapping), c.layers.enableAll(), A.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function m(A, w) {
    A.getRGB(lr, fl(i)), t.buffers.color.setClear(lr.r, lr.g, lr.b, w, s);
  }
  function f() {
    l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(A, w = 1) {
      a.set(A), o = w, m(a, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(A) {
      o = A, m(a, o);
    },
    render: v,
    addToRenderList: E,
    dispose: f
  };
}
function jf(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = u(null);
  let s = r, a = !1;
  function o(P, N, q, Y, O) {
    let X = !1;
    const V = p(P, Y, q, N);
    s !== V && (s = V, l(s.object)), X = g(P, Y, q, O), X && v(P, Y, q, O), O !== null && e.update(O, i.ELEMENT_ARRAY_BUFFER), (X || a) && (a = !1, M(P, N, q, Y), O !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(O).buffer));
  }
  function c() {
    return i.createVertexArray();
  }
  function l(P) {
    return i.bindVertexArray(P);
  }
  function h(P) {
    return i.deleteVertexArray(P);
  }
  function p(P, N, q, Y) {
    const O = Y.wireframe === !0;
    let X = n[N.id];
    X === void 0 && (X = {}, n[N.id] = X);
    const V = P.isInstancedMesh === !0 ? P.id : 0;
    let J = X[V];
    J === void 0 && (J = {}, X[V] = J);
    let ee = J[q.id];
    ee === void 0 && (ee = {}, J[q.id] = ee);
    let oe = ee[O];
    return oe === void 0 && (oe = u(c()), ee[O] = oe), oe;
  }
  function u(P) {
    const N = [], q = [], Y = [];
    for (let O = 0; O < t; O++)
      N[O] = 0, q[O] = 0, Y[O] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: N,
      enabledAttributes: q,
      attributeDivisors: Y,
      object: P,
      attributes: {},
      index: null
    };
  }
  function g(P, N, q, Y) {
    const O = s.attributes, X = N.attributes;
    let V = 0;
    const J = q.getAttributes();
    for (const ee in J)
      if (J[ee].location >= 0) {
        const se = O[ee];
        let Q = X[ee];
        if (Q === void 0 && (ee === "instanceMatrix" && P.instanceMatrix && (Q = P.instanceMatrix), ee === "instanceColor" && P.instanceColor && (Q = P.instanceColor)), se === void 0 || se.attribute !== Q || Q && se.data !== Q.data) return !0;
        V++;
      }
    return s.attributesNum !== V || s.index !== Y;
  }
  function v(P, N, q, Y) {
    const O = {}, X = N.attributes;
    let V = 0;
    const J = q.getAttributes();
    for (const ee in J)
      if (J[ee].location >= 0) {
        let se = X[ee];
        se === void 0 && (ee === "instanceMatrix" && P.instanceMatrix && (se = P.instanceMatrix), ee === "instanceColor" && P.instanceColor && (se = P.instanceColor));
        const Q = {};
        Q.attribute = se, se && se.data && (Q.data = se.data), O[ee] = Q, V++;
      }
    s.attributes = O, s.attributesNum = V, s.index = Y;
  }
  function E() {
    const P = s.newAttributes;
    for (let N = 0, q = P.length; N < q; N++)
      P[N] = 0;
  }
  function m(P) {
    f(P, 0);
  }
  function f(P, N) {
    const q = s.newAttributes, Y = s.enabledAttributes, O = s.attributeDivisors;
    q[P] = 1, Y[P] === 0 && (i.enableVertexAttribArray(P), Y[P] = 1), O[P] !== N && (i.vertexAttribDivisor(P, N), O[P] = N);
  }
  function A() {
    const P = s.newAttributes, N = s.enabledAttributes;
    for (let q = 0, Y = N.length; q < Y; q++)
      N[q] !== P[q] && (i.disableVertexAttribArray(q), N[q] = 0);
  }
  function w(P, N, q, Y, O, X, V) {
    V === !0 ? i.vertexAttribIPointer(P, N, q, O, X) : i.vertexAttribPointer(P, N, q, Y, O, X);
  }
  function M(P, N, q, Y) {
    E();
    const O = Y.attributes, X = q.getAttributes(), V = N.defaultAttributeValues;
    for (const J in X) {
      const ee = X[J];
      if (ee.location >= 0) {
        let oe = O[J];
        if (oe === void 0 && (J === "instanceMatrix" && P.instanceMatrix && (oe = P.instanceMatrix), J === "instanceColor" && P.instanceColor && (oe = P.instanceColor)), oe !== void 0) {
          const se = oe.normalized, Q = oe.itemSize, be = e.get(oe);
          if (be === void 0) continue;
          const Re = be.buffer, Pe = be.type, Z = be.bytesPerElement, ie = Pe === i.INT || Pe === i.UNSIGNED_INT || oe.gpuType === ra;
          if (oe.isInterleavedBufferAttribute) {
            const te = oe.data, Le = te.stride, Ie = oe.offset;
            if (te.isInstancedInterleavedBuffer) {
              for (let Ae = 0; Ae < ee.locationSize; Ae++)
                f(ee.location + Ae, te.meshPerAttribute);
              P.isInstancedMesh !== !0 && Y._maxInstanceCount === void 0 && (Y._maxInstanceCount = te.meshPerAttribute * te.count);
            } else
              for (let Ae = 0; Ae < ee.locationSize; Ae++)
                m(ee.location + Ae);
            i.bindBuffer(i.ARRAY_BUFFER, Re);
            for (let Ae = 0; Ae < ee.locationSize; Ae++)
              w(
                ee.location + Ae,
                Q / ee.locationSize,
                Pe,
                se,
                Le * Z,
                (Ie + Q / ee.locationSize * Ae) * Z,
                ie
              );
          } else {
            if (oe.isInstancedBufferAttribute) {
              for (let te = 0; te < ee.locationSize; te++)
                f(ee.location + te, oe.meshPerAttribute);
              P.isInstancedMesh !== !0 && Y._maxInstanceCount === void 0 && (Y._maxInstanceCount = oe.meshPerAttribute * oe.count);
            } else
              for (let te = 0; te < ee.locationSize; te++)
                m(ee.location + te);
            i.bindBuffer(i.ARRAY_BUFFER, Re);
            for (let te = 0; te < ee.locationSize; te++)
              w(
                ee.location + te,
                Q / ee.locationSize,
                Pe,
                se,
                Q * Z,
                Q / ee.locationSize * te * Z,
                ie
              );
          }
        } else if (V !== void 0) {
          const se = V[J];
          if (se !== void 0)
            switch (se.length) {
              case 2:
                i.vertexAttrib2fv(ee.location, se);
                break;
              case 3:
                i.vertexAttrib3fv(ee.location, se);
                break;
              case 4:
                i.vertexAttrib4fv(ee.location, se);
                break;
              default:
                i.vertexAttrib1fv(ee.location, se);
            }
        }
      }
    }
    A();
  }
  function b() {
    T();
    for (const P in n) {
      const N = n[P];
      for (const q in N) {
        const Y = N[q];
        for (const O in Y) {
          const X = Y[O];
          for (const V in X)
            h(X[V].object), delete X[V];
          delete Y[O];
        }
      }
      delete n[P];
    }
  }
  function y(P) {
    if (n[P.id] === void 0) return;
    const N = n[P.id];
    for (const q in N) {
      const Y = N[q];
      for (const O in Y) {
        const X = Y[O];
        for (const V in X)
          h(X[V].object), delete X[V];
        delete Y[O];
      }
    }
    delete n[P.id];
  }
  function R(P) {
    for (const N in n) {
      const q = n[N];
      for (const Y in q) {
        const O = q[Y];
        if (O[P.id] === void 0) continue;
        const X = O[P.id];
        for (const V in X)
          h(X[V].object), delete X[V];
        delete O[P.id];
      }
    }
  }
  function _(P) {
    for (const N in n) {
      const q = n[N], Y = P.isInstancedMesh === !0 ? P.id : 0, O = q[Y];
      if (O !== void 0) {
        for (const X in O) {
          const V = O[X];
          for (const J in V)
            h(V[J].object), delete V[J];
          delete O[X];
        }
        delete q[Y], Object.keys(q).length === 0 && delete n[N];
      }
    }
  }
  function T() {
    I(), a = !0, s !== r && (s = r, l(s.object));
  }
  function I() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: T,
    resetDefaultState: I,
    dispose: b,
    releaseStatesOfGeometry: y,
    releaseStatesOfObject: _,
    releaseStatesOfProgram: R,
    initAttributes: E,
    enableAttribute: m,
    disableUnusedAttributes: A
  };
}
function ed(i, e, t) {
  let n;
  function r(c) {
    n = c;
  }
  function s(c, l) {
    i.drawArrays(n, c, l), t.update(l, n, 1);
  }
  function a(c, l, h) {
    h !== 0 && (i.drawArraysInstanced(n, c, l, h), t.update(l, n, h));
  }
  function o(c, l, h) {
    if (h === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, l, 0, h);
    let u = 0;
    for (let g = 0; g < h; g++)
      u += l[g];
    t.update(u, n, 1);
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o;
}
function td(i, e, t, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const R = e.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function a(R) {
    return !(R !== kt && n.convert(R) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(R) {
    const _ = R === _n && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(R !== Dt && n.convert(R) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    R !== Jt && !_);
  }
  function c(R) {
    if (R === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      R = "mediump";
    }
    return R === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let l = t.precision !== void 0 ? t.precision : "highp";
  const h = c(l);
  h !== l && (Ce("WebGLRenderer:", l, "not supported, using", h, "instead."), l = h);
  const p = t.logarithmicDepthBuffer === !0, u = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control");
  t.reversedDepthBuffer === !0 && u === !1 && Ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  const g = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), v = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), E = i.getParameter(i.MAX_TEXTURE_SIZE), m = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), f = i.getParameter(i.MAX_VERTEX_ATTRIBS), A = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), w = i.getParameter(i.MAX_VARYING_VECTORS), M = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), b = i.getParameter(i.MAX_SAMPLES), y = i.getParameter(i.SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: c,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: l,
    logarithmicDepthBuffer: p,
    reversedDepthBuffer: u,
    maxTextures: g,
    maxVertexTextures: v,
    maxTextureSize: E,
    maxCubemapSize: m,
    maxAttributes: f,
    maxVertexUniforms: A,
    maxVaryings: w,
    maxFragmentUniforms: M,
    maxSamples: b,
    samples: y
  };
}
function nd(i) {
  const e = this;
  let t = null, n = 0, r = !1, s = !1;
  const a = new Bn(), o = new De(), c = { value: null, needsUpdate: !1 };
  this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(p, u) {
    const g = p.length !== 0 || u || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = u, n = p.length, g;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(p, u) {
    t = h(p, u, 0);
  }, this.setState = function(p, u, g) {
    const v = p.clippingPlanes, E = p.clipIntersection, m = p.clipShadows, f = i.get(p);
    if (!r || v === null || v.length === 0 || s && !m)
      s ? h(null) : l();
    else {
      const A = s ? 0 : n, w = A * 4;
      let M = f.clippingState || null;
      c.value = M, M = h(v, u, w, g);
      for (let b = 0; b !== w; ++b)
        M[b] = t[b];
      f.clippingState = M, this.numIntersection = E ? this.numPlanes : 0, this.numPlanes += A;
    }
  };
  function l() {
    c.value !== t && (c.value = t, c.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(p, u, g, v) {
    const E = p !== null ? p.length : 0;
    let m = null;
    if (E !== 0) {
      if (m = c.value, v !== !0 || m === null) {
        const f = g + E * 4, A = u.matrixWorldInverse;
        o.getNormalMatrix(A), (m === null || m.length < f) && (m = new Float32Array(f));
        for (let w = 0, M = g; w !== E; ++w, M += 4)
          a.copy(p[w]).applyMatrix4(A, o), a.normal.toArray(m, M), m[M + 3] = a.constant;
      }
      c.value = m, c.needsUpdate = !0;
    }
    return e.numPlanes = E, e.numIntersection = 0, m;
  }
}
const Pn = 4, ho = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Gn = 20, id = 256, Ai = /* @__PURE__ */ new Tr(), fo = /* @__PURE__ */ new Be();
let as = null, os = 0, ls = 0, cs = !1;
const rd = /* @__PURE__ */ new z();
class po {
  /**
   * Constructs a new PMREM generator.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety.
   *
   * @param {Scene} scene - The scene to be captured.
   * @param {number} [sigma=0] - The blur radius in radians.
   * @param {number} [near=0.1] - The near plane distance.
   * @param {number} [far=100] - The far plane distance.
   * @param {Object} [options={}] - The configuration options.
   * @param {number} [options.size=256] - The texture size of the PMREM.
   * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromScene(e, t = 0, n = 0.1, r = 100, s = {}) {
    const {
      size: a = 256,
      position: o = rd
    } = s;
    as = this._renderer.getRenderTarget(), os = this._renderer.getActiveCubeFace(), ls = this._renderer.getActiveMipmapLevel(), cs = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
    const c = this._allocateTargets();
    return c.depthBuffer = !0, this._sceneToCubeUV(e, n, r, c, o), t > 0 && this._blur(c, 0, 0, t), this._applyPMREM(c), this._cleanup(c), c;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512), as this matches best
   * with the 256 x 256 cubemap output. The minimum supported input image size
   * is 64 x 32.
   *
   * @param {Texture} equirectangular - The equirectangular texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256, as this matches best
   * with the 256 x 256 cubemap output. The minimum supported input cube
   * size is 16 x 16 per face.
   *
   * @param {Texture} cubemap - The cubemap texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = _o(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = go(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodMeshes.length; e++)
      this._lodMeshes[e].geometry.dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(as, os, ls), this._renderer.xr.enabled = cs, e.scissorTest = !1, li(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === kn || e.mapping === mi ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), as = this._renderer.getRenderTarget(), os = this._renderer.getActiveCubeFace(), ls = this._renderer.getActiveMipmapLevel(), cs = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: yt,
      minFilter: yt,
      generateMipmaps: !1,
      type: _n,
      format: kt,
      colorSpace: vr,
      depthBuffer: !1
    }, r = mo(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = mo(e, t, n);
      const { _lodMax: s } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = sd(s)), this._blurMaterial = od(s, e, t), this._ggxMaterial = ad(s, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new Wt(new vn(), e);
    this._renderer.compile(t, Ai);
  }
  _sceneToCubeUV(e, t, n, r, s) {
    const c = new Ot(90, 1, t, n), l = [1, -1, 1, 1, 1, 1], h = [1, 1, 1, -1, -1, -1], p = this._renderer, u = p.autoClear, g = p.toneMapping;
    p.getClearColor(fo), p.toneMapping = jt, p.autoClear = !1, p.state.buffers.depth.getReversed() && (p.setRenderTarget(r), p.clearDepth(), p.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Wt(
      new vi(),
      new cl({
        name: "PMREM.Background",
        side: Rt,
        depthWrite: !1,
        depthTest: !1
      })
    ));
    const E = this._backgroundBox, m = E.material;
    let f = !1;
    const A = e.background;
    A ? A.isColor && (m.color.copy(A), e.background = null, f = !0) : (m.color.copy(fo), f = !0);
    for (let w = 0; w < 6; w++) {
      const M = w % 3;
      M === 0 ? (c.up.set(0, l[w], 0), c.position.set(s.x, s.y, s.z), c.lookAt(s.x + h[w], s.y, s.z)) : M === 1 ? (c.up.set(0, 0, l[w]), c.position.set(s.x, s.y, s.z), c.lookAt(s.x, s.y + h[w], s.z)) : (c.up.set(0, l[w], 0), c.position.set(s.x, s.y, s.z), c.lookAt(s.x, s.y, s.z + h[w]));
      const b = this._cubeSize;
      li(r, M * b, w > 2 ? b : 0, b, b), p.setRenderTarget(r), f && p.render(E, c), p.render(e, c);
    }
    p.toneMapping = g, p.autoClear = u, e.background = A;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, r = e.mapping === kn || e.mapping === mi;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = _o()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = go());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0];
    a.material = s;
    const o = s.uniforms;
    o.envMap.value = e;
    const c = this._cubeSize;
    li(t, 0, 0, 3 * c, 2 * c), n.setRenderTarget(t), n.render(a, Ai);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const r = this._lodMeshes.length;
    for (let s = 1; s < r; s++)
      this._applyGGXFilter(e, s - 1, s);
    t.autoClear = n;
  }
  /**
   * Applies GGX VNDF importance sampling filter to generate a prefiltered environment map.
   * Uses Monte Carlo integration with VNDF importance sampling to accurately represent the
   * GGX BRDF for physically-based rendering. Reads from the previous LOD level and
   * applies incremental roughness filtering to avoid over-blurring.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn - Source LOD level to read from
   * @param {number} lodOut - Target LOD level to write to
   */
  _applyGGXFilter(e, t, n) {
    const r = this._renderer, s = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[n];
    o.material = a;
    const c = a.uniforms, l = n / (this._lodMeshes.length - 1), h = t / (this._lodMeshes.length - 1), p = Math.sqrt(l * l - h * h), u = 0 + l * 1.25, g = p * u, { _lodMax: v } = this, E = this._sizeLods[n], m = 3 * E * (n > v - Pn ? n - v + Pn : 0), f = 4 * (this._cubeSize - E);
    c.envMap.value = e.texture, c.roughness.value = g, c.mipInt.value = v - t, li(s, m, f, 3 * E, 2 * E), r.setRenderTarget(s), r.render(o, Ai), c.envMap.value = s.texture, c.roughness.value = 0, c.mipInt.value = v - n, li(e, m, f, 3 * E, 2 * E), r.setRenderTarget(e), r.render(o, Ai);
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   *
   * Used for initial scene blur in fromScene() method when sigma > 0.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn
   * @param {number} lodOut
   * @param {number} sigma
   * @param {Vector3} [poleAxis]
   */
  _blur(e, t, n, r, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      a,
      t,
      n,
      r,
      "latitudinal",
      s
    ), this._halfBlur(
      a,
      e,
      n,
      n,
      r,
      "longitudinal",
      s
    );
  }
  _halfBlur(e, t, n, r, s, a, o) {
    const c = this._renderer, l = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && Xe(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, p = this._lodMeshes[r];
    p.material = l;
    const u = l.uniforms, g = this._sizeLods[n] - 1, v = isFinite(s) ? Math.PI / (2 * g) : 2 * Math.PI / (2 * Gn - 1), E = s / v, m = isFinite(s) ? 1 + Math.floor(h * E) : Gn;
    m > Gn && Ce(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gn}`);
    const f = [];
    let A = 0;
    for (let R = 0; R < Gn; ++R) {
      const _ = R / E, T = Math.exp(-_ * _ / 2);
      f.push(T), R === 0 ? A += T : R < m && (A += 2 * T);
    }
    for (let R = 0; R < f.length; R++)
      f[R] = f[R] / A;
    u.envMap.value = e.texture, u.samples.value = m, u.weights.value = f, u.latitudinal.value = a === "latitudinal", o && (u.poleAxis.value = o);
    const { _lodMax: w } = this;
    u.dTheta.value = v, u.mipInt.value = w - n;
    const M = this._sizeLods[r], b = 3 * M * (r > w - Pn ? r - w + Pn : 0), y = 4 * (this._cubeSize - M);
    li(t, b, y, 3 * M, 2 * M), c.setRenderTarget(t), c.render(p, Ai);
  }
}
function sd(i) {
  const e = [], t = [], n = [];
  let r = i;
  const s = i - Pn + 1 + ho.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    e.push(o);
    let c = 1 / o;
    a > i - Pn ? c = ho[a - i + Pn - 1] : a === 0 && (c = 0), t.push(c);
    const l = 1 / (o - 2), h = -l, p = 1 + l, u = [h, h, p, h, p, p, h, h, p, p, h, p], g = 6, v = 6, E = 3, m = 2, f = 1, A = new Float32Array(E * v * g), w = new Float32Array(m * v * g), M = new Float32Array(f * v * g);
    for (let y = 0; y < g; y++) {
      const R = y % 3 * 2 / 3 - 1, _ = y > 2 ? 0 : -1, T = [
        R,
        _,
        0,
        R + 2 / 3,
        _,
        0,
        R + 2 / 3,
        _ + 1,
        0,
        R,
        _,
        0,
        R + 2 / 3,
        _ + 1,
        0,
        R,
        _ + 1,
        0
      ];
      A.set(T, E * v * y), w.set(u, m * v * y);
      const I = [y, y, y, y, y, y];
      M.set(I, f * v * y);
    }
    const b = new vn();
    b.setAttribute("position", new tn(A, E)), b.setAttribute("uv", new tn(w, m)), b.setAttribute("faceIndex", new tn(M, f)), n.push(new Wt(b, null)), r > Pn && r--;
  }
  return { lodMeshes: n, sizeLods: e, sigmas: t };
}
function mo(i, e, t) {
  const n = new en(i, e, t);
  return n.texture.mapping = yr, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function li(i, e, t, n, r) {
  i.viewport.set(e, t, n, r), i.scissor.set(e, t, n, r);
}
function ad(i, e, t) {
  return new rn({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: id,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: br(),
    fragmentShader: (
      /* glsl */
      `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`
    ),
    blending: pn,
    depthTest: !1,
    depthWrite: !1
  });
}
function od(i, e, t) {
  const n = new Float32Array(Gn), r = new z(0, 1, 0);
  return new rn({
    name: "SphericalGaussianBlur",
    defines: {
      n: Gn,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: br(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: pn,
    depthTest: !1,
    depthWrite: !1
  });
}
function go() {
  return new rn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: br(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: pn,
    depthTest: !1,
    depthWrite: !1
  });
}
function _o() {
  return new rn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: br(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: pn,
    depthTest: !1,
    depthWrite: !1
  });
}
function br() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
class _l extends en {
  /**
   * Constructs a new cube render target.
   *
   * @param {number} [size=1] - The size of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new ul(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
  }
  /**
   * Converts the given equirectangular texture to a cube map.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Texture} texture - The equirectangular texture.
   * @return {WebGLCubeRenderTarget} A reference to this cube render target.
   */
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new vi(5, 5, 5), s = new rn({
      name: "CubemapFromEquirect",
      uniforms: _i(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: Rt,
      blending: pn
    });
    s.uniforms.tEquirect.value = t;
    const a = new Wt(r, s), o = t.minFilter;
    return t.minFilter === Vn && (t.minFilter = yt), new uu(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  /**
   * Clears this cube render target.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
   * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
   * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
   */
  clear(e, t = !0, n = !0, r = !0) {
    const s = e.getRenderTarget();
    for (let a = 0; a < 6; a++)
      e.setRenderTarget(this, a), e.clear(t, n, r);
    e.setRenderTarget(s);
  }
}
function ld(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), n = null;
  function r(u, g = !1) {
    return u == null ? null : g ? a(u) : s(u);
  }
  function s(u) {
    if (u && u.isTexture) {
      const g = u.mapping;
      if (g === Dr || g === Ir)
        if (e.has(u)) {
          const v = e.get(u).texture;
          return o(v, u.mapping);
        } else {
          const v = u.image;
          if (v && v.height > 0) {
            const E = new _l(v.height);
            return E.fromEquirectangularTexture(i, u), e.set(u, E), u.addEventListener("dispose", l), o(E.texture, u.mapping);
          } else
            return null;
        }
    }
    return u;
  }
  function a(u) {
    if (u && u.isTexture) {
      const g = u.mapping, v = g === Dr || g === Ir, E = g === kn || g === mi;
      if (v || E) {
        let m = t.get(u);
        const f = m !== void 0 ? m.texture.pmremVersion : 0;
        if (u.isRenderTargetTexture && u.pmremVersion !== f)
          return n === null && (n = new po(i)), m = v ? n.fromEquirectangular(u, m) : n.fromCubemap(u, m), m.texture.pmremVersion = u.pmremVersion, t.set(u, m), m.texture;
        if (m !== void 0)
          return m.texture;
        {
          const A = u.image;
          return v && A && A.height > 0 || E && A && c(A) ? (n === null && (n = new po(i)), m = v ? n.fromEquirectangular(u) : n.fromCubemap(u), m.texture.pmremVersion = u.pmremVersion, t.set(u, m), u.addEventListener("dispose", h), m.texture) : null;
        }
      }
    }
    return u;
  }
  function o(u, g) {
    return g === Dr ? u.mapping = kn : g === Ir && (u.mapping = mi), u;
  }
  function c(u) {
    let g = 0;
    const v = 6;
    for (let E = 0; E < v; E++)
      u[E] !== void 0 && g++;
    return g === v;
  }
  function l(u) {
    const g = u.target;
    g.removeEventListener("dispose", l);
    const v = e.get(g);
    v !== void 0 && (e.delete(g), v.dispose());
  }
  function h(u) {
    const g = u.target;
    g.removeEventListener("dispose", h);
    const v = t.get(g);
    v !== void 0 && (t.delete(g), v.dispose());
  }
  function p() {
    e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: r,
    dispose: p
  };
}
function cd(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    const r = i.getExtension(n);
    return e[n] = r, r;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const r = t(n);
      return r === null && fi("WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function ud(i, e, t, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(p) {
    const u = p.target;
    u.index !== null && e.remove(u.index);
    for (const v in u.attributes)
      e.remove(u.attributes[v]);
    u.removeEventListener("dispose", a), delete r[u.id];
    const g = s.get(u);
    g && (e.remove(g), s.delete(u)), n.releaseStatesOfGeometry(u), u.isInstancedBufferGeometry === !0 && delete u._maxInstanceCount, t.memory.geometries--;
  }
  function o(p, u) {
    return r[u.id] === !0 || (u.addEventListener("dispose", a), r[u.id] = !0, t.memory.geometries++), u;
  }
  function c(p) {
    const u = p.attributes;
    for (const g in u)
      e.update(u[g], i.ARRAY_BUFFER);
  }
  function l(p) {
    const u = [], g = p.index, v = p.attributes.position;
    let E = 0;
    if (v === void 0)
      return;
    if (g !== null) {
      const A = g.array;
      E = g.version;
      for (let w = 0, M = A.length; w < M; w += 3) {
        const b = A[w + 0], y = A[w + 1], R = A[w + 2];
        u.push(b, y, y, R, R, b);
      }
    } else {
      const A = v.array;
      E = v.version;
      for (let w = 0, M = A.length / 3 - 1; w < M; w += 3) {
        const b = w + 0, y = w + 1, R = w + 2;
        u.push(b, y, y, R, R, b);
      }
    }
    const m = new (v.count >= 65535 ? ll : ol)(u, 1);
    m.version = E;
    const f = s.get(p);
    f && e.remove(f), s.set(p, m);
  }
  function h(p) {
    const u = s.get(p);
    if (u) {
      const g = p.index;
      g !== null && u.version < g.version && l(p);
    } else
      l(p);
    return s.get(p);
  }
  return {
    get: o,
    update: c,
    getWireframeAttribute: h
  };
}
function hd(i, e, t) {
  let n;
  function r(p) {
    n = p;
  }
  let s, a;
  function o(p) {
    s = p.type, a = p.bytesPerElement;
  }
  function c(p, u) {
    i.drawElements(n, u, s, p * a), t.update(u, n, 1);
  }
  function l(p, u, g) {
    g !== 0 && (i.drawElementsInstanced(n, u, s, p * a, g), t.update(u, n, g));
  }
  function h(p, u, g) {
    if (g === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, u, 0, s, p, 0, g);
    let E = 0;
    for (let m = 0; m < g; m++)
      E += u[m];
    t.update(E, n, 1);
  }
  this.setMode = r, this.setIndex = o, this.render = c, this.renderInstances = l, this.renderMultiDraw = h;
}
function fd(i) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, a, o) {
    switch (t.calls++, a) {
      case i.TRIANGLES:
        t.triangles += o * (s / 3);
        break;
      case i.LINES:
        t.lines += o * (s / 2);
        break;
      case i.LINE_STRIP:
        t.lines += o * (s - 1);
        break;
      case i.LINE_LOOP:
        t.lines += o * s;
        break;
      case i.POINTS:
        t.points += o * s;
        break;
      default:
        Xe("WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function dd(i, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), r = new tt();
  function s(a, o, c) {
    const l = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, p = h !== void 0 ? h.length : 0;
    let u = n.get(o);
    if (u === void 0 || u.count !== p) {
      let T = function() {
        R.dispose(), n.delete(o), o.removeEventListener("dispose", T);
      };
      u !== void 0 && u.texture.dispose();
      const g = o.morphAttributes.position !== void 0, v = o.morphAttributes.normal !== void 0, E = o.morphAttributes.color !== void 0, m = o.morphAttributes.position || [], f = o.morphAttributes.normal || [], A = o.morphAttributes.color || [];
      let w = 0;
      g === !0 && (w = 1), v === !0 && (w = 2), E === !0 && (w = 3);
      let M = o.attributes.position.count * w, b = 1;
      M > e.maxTextureSize && (b = Math.ceil(M / e.maxTextureSize), M = e.maxTextureSize);
      const y = new Float32Array(M * b * 4 * p), R = new rl(y, M, b, p);
      R.type = Jt, R.needsUpdate = !0;
      const _ = w * 4;
      for (let I = 0; I < p; I++) {
        const P = m[I], N = f[I], q = A[I], Y = M * b * 4 * I;
        for (let O = 0; O < P.count; O++) {
          const X = O * _;
          g === !0 && (r.fromBufferAttribute(P, O), y[Y + X + 0] = r.x, y[Y + X + 1] = r.y, y[Y + X + 2] = r.z, y[Y + X + 3] = 0), v === !0 && (r.fromBufferAttribute(N, O), y[Y + X + 4] = r.x, y[Y + X + 5] = r.y, y[Y + X + 6] = r.z, y[Y + X + 7] = 0), E === !0 && (r.fromBufferAttribute(q, O), y[Y + X + 8] = r.x, y[Y + X + 9] = r.y, y[Y + X + 10] = r.z, y[Y + X + 11] = q.itemSize === 4 ? r.w : 1);
        }
      }
      u = {
        count: p,
        texture: R,
        size: new He(M, b)
      }, n.set(o, u), o.addEventListener("dispose", T);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      c.getUniforms().setValue(i, "morphTexture", a.morphTexture, t);
    else {
      let g = 0;
      for (let E = 0; E < l.length; E++)
        g += l[E];
      const v = o.morphTargetsRelative ? 1 : 1 - g;
      c.getUniforms().setValue(i, "morphTargetBaseInfluence", v), c.getUniforms().setValue(i, "morphTargetInfluences", l);
    }
    c.getUniforms().setValue(i, "morphTargetsTexture", u.texture, t), c.getUniforms().setValue(i, "morphTargetsTextureSize", u.size);
  }
  return {
    update: s
  };
}
function pd(i, e, t, n, r) {
  let s = /* @__PURE__ */ new WeakMap();
  function a(l) {
    const h = r.render.frame, p = l.geometry, u = e.get(l, p);
    if (s.get(u) !== h && (e.update(u), s.set(u, h)), l.isInstancedMesh && (l.hasEventListener("dispose", c) === !1 && l.addEventListener("dispose", c), s.get(l) !== h && (t.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER), s.set(l, h))), l.isSkinnedMesh) {
      const g = l.skeleton;
      s.get(g) !== h && (g.update(), s.set(g, h));
    }
    return u;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function c(l) {
    const h = l.target;
    h.removeEventListener("dispose", c), n.releaseStatesOfObject(h), t.remove(h.instanceMatrix), h.instanceColor !== null && t.remove(h.instanceColor);
  }
  return {
    update: a,
    dispose: o
  };
}
const md = {
  [Ho]: "LINEAR_TONE_MAPPING",
  [ko]: "REINHARD_TONE_MAPPING",
  [Wo]: "CINEON_TONE_MAPPING",
  [Xo]: "ACES_FILMIC_TONE_MAPPING",
  [Yo]: "AGX_TONE_MAPPING",
  [Zo]: "NEUTRAL_TONE_MAPPING",
  [qo]: "CUSTOM_TONE_MAPPING"
};
function gd(i, e, t, n, r, s) {
  const a = new en(e, t, {
    type: i,
    depthBuffer: r,
    stencilBuffer: s,
    samples: n ? 4 : 0,
    depthTexture: r ? new gi(e, t) : void 0
  }), o = new en(e, t, {
    type: _n,
    depthBuffer: !1,
    stencilBuffer: !1
  }), c = new vn();
  c.setAttribute("position", new gn([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), c.setAttribute("uv", new gn([0, 2, 0, 0, 2, 0], 2));
  const l = new nu({
    uniforms: {
      tDiffuse: { value: null }
    },
    vertexShader: (
      /* glsl */
      `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`
    ),
    fragmentShader: (
      /* glsl */
      `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`
    ),
    depthTest: !1,
    depthWrite: !1
  }), h = new Wt(c, l), p = new Tr(-1, 1, 1, -1, 0, 1);
  let u = null, g = null, v = !1, E, m = null, f = [], A = !1;
  this.setSize = function(w, M) {
    a.setSize(w, M), o.setSize(w, M);
    for (let b = 0; b < f.length; b++) {
      const y = f[b];
      y.setSize && y.setSize(w, M);
    }
  }, this.setEffects = function(w) {
    f = w, A = f.length > 0 && f[0].isRenderPass === !0;
    const M = a.width, b = a.height;
    for (let y = 0; y < f.length; y++) {
      const R = f[y];
      R.setSize && R.setSize(M, b);
    }
  }, this.begin = function(w, M) {
    if (v || w.toneMapping === jt && f.length === 0) return !1;
    if (m = M, M !== null) {
      const b = M.width, y = M.height;
      (a.width !== b || a.height !== y) && this.setSize(b, y);
    }
    return A === !1 && w.setRenderTarget(a), E = w.toneMapping, w.toneMapping = jt, !0;
  }, this.hasRenderPass = function() {
    return A;
  }, this.end = function(w, M) {
    w.toneMapping = E, v = !0;
    let b = a, y = o;
    for (let R = 0; R < f.length; R++) {
      const _ = f[R];
      if (_.enabled !== !1 && (_.render(w, y, b, M), _.needsSwap !== !1)) {
        const T = b;
        b = y, y = T;
      }
    }
    if (u !== w.outputColorSpace || g !== w.toneMapping) {
      u = w.outputColorSpace, g = w.toneMapping, l.defines = {}, Ge.getTransfer(u) === Ze && (l.defines.SRGB_TRANSFER = "");
      const R = md[g];
      R && (l.defines[R] = ""), l.needsUpdate = !0;
    }
    l.uniforms.tDiffuse.value = b.texture, w.setRenderTarget(m), w.render(h, p), m = null, v = !1;
  }, this.isCompositing = function() {
    return v;
  }, this.dispose = function() {
    a.depthTexture && a.depthTexture.dispose(), a.dispose(), o.dispose(), c.dispose(), l.dispose();
  };
}
const xl = /* @__PURE__ */ new bt(), ta = /* @__PURE__ */ new gi(1, 1), vl = /* @__PURE__ */ new rl(), Ml = /* @__PURE__ */ new Dc(), Sl = /* @__PURE__ */ new ul(), xo = [], vo = [], Mo = new Float32Array(16), So = new Float32Array(9), Eo = new Float32Array(4);
function Mi(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = e * t;
  let s = xo[r];
  if (s === void 0 && (s = new Float32Array(r), xo[r] = s), e !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== e; ++a)
      o += t, i[a].toArray(s, o);
  }
  return s;
}
function dt(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function pt(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function Ar(i, e) {
  let t = vo[e];
  t === void 0 && (t = new Int32Array(e), vo[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function _d(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function xd(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (dt(t, e)) return;
    i.uniform2fv(this.addr, e), pt(t, e);
  }
}
function vd(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (dt(t, e)) return;
    i.uniform3fv(this.addr, e), pt(t, e);
  }
}
function Md(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (dt(t, e)) return;
    i.uniform4fv(this.addr, e), pt(t, e);
  }
}
function Sd(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (dt(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), pt(t, e);
  } else {
    if (dt(t, n)) return;
    Eo.set(n), i.uniformMatrix2fv(this.addr, !1, Eo), pt(t, n);
  }
}
function Ed(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (dt(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), pt(t, e);
  } else {
    if (dt(t, n)) return;
    So.set(n), i.uniformMatrix3fv(this.addr, !1, So), pt(t, n);
  }
}
function yd(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (dt(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), pt(t, e);
  } else {
    if (dt(t, n)) return;
    Mo.set(n), i.uniformMatrix4fv(this.addr, !1, Mo), pt(t, n);
  }
}
function Td(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function bd(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (dt(t, e)) return;
    i.uniform2iv(this.addr, e), pt(t, e);
  }
}
function Ad(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (dt(t, e)) return;
    i.uniform3iv(this.addr, e), pt(t, e);
  }
}
function wd(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (dt(t, e)) return;
    i.uniform4iv(this.addr, e), pt(t, e);
  }
}
function Rd(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function Cd(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (dt(t, e)) return;
    i.uniform2uiv(this.addr, e), pt(t, e);
  }
}
function Pd(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (dt(t, e)) return;
    i.uniform3uiv(this.addr, e), pt(t, e);
  }
}
function Ld(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (dt(t, e)) return;
    i.uniform4uiv(this.addr, e), pt(t, e);
  }
}
function Dd(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (ta.compareFunction = t.isReversedDepthBuffer() ? ha : ua, s = ta) : s = xl, t.setTexture2D(e || s, r);
}
function Id(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture3D(e || Ml, r);
}
function Ud(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTextureCube(e || Sl, r);
}
function Nd(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture2DArray(e || vl, r);
}
function Fd(i) {
  switch (i) {
    case 5126:
      return _d;
    // FLOAT
    case 35664:
      return xd;
    // _VEC2
    case 35665:
      return vd;
    // _VEC3
    case 35666:
      return Md;
    // _VEC4
    case 35674:
      return Sd;
    // _MAT2
    case 35675:
      return Ed;
    // _MAT3
    case 35676:
      return yd;
    // _MAT4
    case 5124:
    case 35670:
      return Td;
    // INT, BOOL
    case 35667:
    case 35671:
      return bd;
    // _VEC2
    case 35668:
    case 35672:
      return Ad;
    // _VEC3
    case 35669:
    case 35673:
      return wd;
    // _VEC4
    case 5125:
      return Rd;
    // UINT
    case 36294:
      return Cd;
    // _VEC2
    case 36295:
      return Pd;
    // _VEC3
    case 36296:
      return Ld;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return Dd;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Id;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Ud;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return Nd;
  }
}
function Od(i, e) {
  i.uniform1fv(this.addr, e);
}
function Bd(i, e) {
  const t = Mi(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function zd(i, e) {
  const t = Mi(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function Gd(i, e) {
  const t = Mi(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function Vd(i, e) {
  const t = Mi(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function Hd(i, e) {
  const t = Mi(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function kd(i, e) {
  const t = Mi(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function Wd(i, e) {
  i.uniform1iv(this.addr, e);
}
function Xd(i, e) {
  i.uniform2iv(this.addr, e);
}
function qd(i, e) {
  i.uniform3iv(this.addr, e);
}
function Yd(i, e) {
  i.uniform4iv(this.addr, e);
}
function Zd(i, e) {
  i.uniform1uiv(this.addr, e);
}
function Kd(i, e) {
  i.uniform2uiv(this.addr, e);
}
function $d(i, e) {
  i.uniform3uiv(this.addr, e);
}
function Jd(i, e) {
  i.uniform4uiv(this.addr, e);
}
function Qd(i, e, t) {
  const n = this.cache, r = e.length, s = Ar(t, r);
  dt(n, s) || (i.uniform1iv(this.addr, s), pt(n, s));
  let a;
  this.type === i.SAMPLER_2D_SHADOW ? a = ta : a = xl;
  for (let o = 0; o !== r; ++o)
    t.setTexture2D(e[o] || a, s[o]);
}
function jd(i, e, t) {
  const n = this.cache, r = e.length, s = Ar(t, r);
  dt(n, s) || (i.uniform1iv(this.addr, s), pt(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture3D(e[a] || Ml, s[a]);
}
function ep(i, e, t) {
  const n = this.cache, r = e.length, s = Ar(t, r);
  dt(n, s) || (i.uniform1iv(this.addr, s), pt(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTextureCube(e[a] || Sl, s[a]);
}
function tp(i, e, t) {
  const n = this.cache, r = e.length, s = Ar(t, r);
  dt(n, s) || (i.uniform1iv(this.addr, s), pt(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture2DArray(e[a] || vl, s[a]);
}
function np(i) {
  switch (i) {
    case 5126:
      return Od;
    // FLOAT
    case 35664:
      return Bd;
    // _VEC2
    case 35665:
      return zd;
    // _VEC3
    case 35666:
      return Gd;
    // _VEC4
    case 35674:
      return Vd;
    // _MAT2
    case 35675:
      return Hd;
    // _MAT3
    case 35676:
      return kd;
    // _MAT4
    case 5124:
    case 35670:
      return Wd;
    // INT, BOOL
    case 35667:
    case 35671:
      return Xd;
    // _VEC2
    case 35668:
    case 35672:
      return qd;
    // _VEC3
    case 35669:
    case 35673:
      return Yd;
    // _VEC4
    case 5125:
      return Zd;
    // UINT
    case 36294:
      return Kd;
    // _VEC2
    case 36295:
      return $d;
    // _VEC3
    case 36296:
      return Jd;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return Qd;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return jd;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return ep;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return tp;
  }
}
class ip {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Fd(t.type);
  }
}
class rp {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = np(t.type);
  }
}
class sp {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const r = this.seq;
    for (let s = 0, a = r.length; s !== a; ++s) {
      const o = r[s];
      o.setValue(e, t[o.id], n);
    }
  }
}
const us = /(\w+)(\])?(\[|\.)?/g;
function yo(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function ap(i, e, t) {
  const n = i.name, r = n.length;
  for (us.lastIndex = 0; ; ) {
    const s = us.exec(n), a = us.lastIndex;
    let o = s[1];
    const c = s[2] === "]", l = s[3];
    if (c && (o = o | 0), l === void 0 || l === "[" && a + 2 === r) {
      yo(t, l === void 0 ? new ip(o, i, e) : new rp(o, i, e));
      break;
    } else {
      let p = t.map[o];
      p === void 0 && (p = new sp(o), yo(t, p)), t = p;
    }
  }
}
class pr {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let a = 0; a < n; ++a) {
      const o = e.getActiveUniform(t, a), c = e.getUniformLocation(t, o.name);
      ap(o, c, this);
    }
    const r = [], s = [];
    for (const a of this.seq)
      a.type === e.SAMPLER_2D_SHADOW || a.type === e.SAMPLER_CUBE_SHADOW || a.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(a) : s.push(a);
    r.length > 0 && (this.seq = r.concat(s));
  }
  setValue(e, t, n, r) {
    const s = this.map[t];
    s !== void 0 && s.setValue(e, n, r);
  }
  setOptional(e, t, n) {
    const r = t[n];
    r !== void 0 && this.setValue(e, n, r);
  }
  static upload(e, t, n, r) {
    for (let s = 0, a = t.length; s !== a; ++s) {
      const o = t[s], c = n[o.id];
      c.needsUpdate !== !1 && o.setValue(e, c.value, r);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let r = 0, s = e.length; r !== s; ++r) {
      const a = e[r];
      a.id in t && n.push(a);
    }
    return n;
  }
}
function To(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const op = 37297;
let lp = 0;
function cp(i, e) {
  const t = i.split(`
`), n = [], r = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    n.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`);
  }
  return n.join(`
`);
}
const bo = /* @__PURE__ */ new De();
function up(i) {
  Ge._getMatrix(bo, Ge.workingColorSpace, i);
  const e = `mat3( ${bo.elements.map((t) => t.toFixed(4))} )`;
  switch (Ge.getTransfer(i)) {
    case Mr:
      return [e, "LinearTransferOETF"];
    case Ze:
      return [e, "sRGBTransferOETF"];
    default:
      return Ce("WebGLProgram: Unsupported color space: ", i), [e, "LinearTransferOETF"];
  }
}
function Ao(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), s = (i.getShaderInfoLog(e) || "").trim();
  if (n && s === "") return "";
  const a = /ERROR: 0:(\d+)/.exec(s);
  if (a) {
    const o = parseInt(a[1]);
    return t.toUpperCase() + `

` + s + `

` + cp(i.getShaderSource(e), o);
  } else
    return s;
}
function hp(i, e) {
  const t = up(e);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
const fp = {
  [Ho]: "Linear",
  [ko]: "Reinhard",
  [Wo]: "Cineon",
  [Xo]: "ACESFilmic",
  [Yo]: "AgX",
  [Zo]: "Neutral",
  [qo]: "Custom"
};
function dp(i, e) {
  const t = fp[e];
  return t === void 0 ? (Ce("WebGLProgram: Unsupported toneMapping:", e), "vec3 " + i + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const cr = /* @__PURE__ */ new z();
function pp() {
  Ge.getLuminanceCoefficients(cr);
  const i = cr.x.toFixed(4), e = cr.y.toFixed(4), t = cr.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function mp(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Li).join(`
`);
}
function gp(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function _p(i, e) {
  const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = i.getActiveAttrib(e, r), a = s.name;
    let o = 1;
    s.type === i.FLOAT_MAT2 && (o = 2), s.type === i.FLOAT_MAT3 && (o = 3), s.type === i.FLOAT_MAT4 && (o = 4), t[a] = {
      type: s.type,
      location: i.getAttribLocation(e, a),
      locationSize: o
    };
  }
  return t;
}
function Li(i) {
  return i !== "";
}
function wo(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Ro(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const xp = /^[ \t]*#include +<([\w\d./]+)>/gm;
function na(i) {
  return i.replace(xp, Mp);
}
const vp = /* @__PURE__ */ new Map();
function Mp(i, e) {
  let t = Fe[e];
  if (t === void 0) {
    const n = vp.get(e);
    if (n !== void 0)
      t = Fe[n], Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("THREE.WebGLProgram: Can not resolve #include <" + e + ">");
  }
  return na(t);
}
const Sp = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Co(i) {
  return i.replace(Sp, Ep);
}
function Ep(i, e, t, n) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function Po(i) {
  let e = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
const yp = {
  [Di]: "SHADOWMAP_TYPE_PCF",
  [Pi]: "SHADOWMAP_TYPE_VSM"
};
function Tp(i) {
  return yp[i.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
const bp = {
  [kn]: "ENVMAP_TYPE_CUBE",
  [mi]: "ENVMAP_TYPE_CUBE",
  [yr]: "ENVMAP_TYPE_CUBE_UV"
};
function Ap(i) {
  return i.envMap === !1 ? "ENVMAP_TYPE_CUBE" : bp[i.envMapMode] || "ENVMAP_TYPE_CUBE";
}
const wp = {
  [mi]: "ENVMAP_MODE_REFRACTION"
};
function Rp(i) {
  return i.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : wp[i.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
const Cp = {
  [Vo]: "ENVMAP_BLENDING_MULTIPLY",
  [hc]: "ENVMAP_BLENDING_MIX",
  [fc]: "ENVMAP_BLENDING_ADD"
};
function Pp(i) {
  return i.envMap === !1 ? "ENVMAP_BLENDING_NONE" : Cp[i.combine] || "ENVMAP_BLENDING_NONE";
}
function Lp(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: n, maxMip: t };
}
function Dp(i, e, t, n) {
  const r = i.getContext(), s = t.defines;
  let a = t.vertexShader, o = t.fragmentShader;
  const c = Tp(t), l = Ap(t), h = Rp(t), p = Pp(t), u = Lp(t), g = mp(t), v = gp(s), E = r.createProgram();
  let m, f, A = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v
  ].filter(Li).join(`
`), m.length > 0 && (m += `
`), f = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v
  ].filter(Li).join(`
`), f.length > 0 && (f += `
`)) : (m = [
    Po(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + h : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexNormals ? "#define HAS_NORMAL" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + c : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Li).join(`
`), f = [
    Po(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + l : "",
    t.envMap ? "#define " + h : "",
    t.envMap ? "#define " + p : "",
    u ? "#define CUBEUV_TEXEL_WIDTH " + u.texelWidth : "",
    u ? "#define CUBEUV_TEXEL_HEIGHT " + u.texelHeight : "",
    u ? "#define CUBEUV_MAX_MIP " + u.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas || t.batchingColor ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + c : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== jt ? "#define TONE_MAPPING" : "",
    t.toneMapping !== jt ? Fe.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== jt ? dp("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Fe.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    hp("linearToOutputTexel", t.outputColorSpace),
    pp(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Li).join(`
`)), a = na(a), a = wo(a, t), a = Ro(a, t), o = na(o), o = wo(o, t), o = Ro(o, t), a = Co(a), o = Co(o), t.isRawShaderMaterial !== !0 && (A = `#version 300 es
`, m = [
    g,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, f = [
    "#define varying in",
    t.glslVersion === Va ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === Va ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + f);
  const w = A + m + a, M = A + f + o, b = To(r, r.VERTEX_SHADER, w), y = To(r, r.FRAGMENT_SHADER, M);
  r.attachShader(E, b), r.attachShader(E, y), t.index0AttributeName !== void 0 ? r.bindAttribLocation(E, 0, t.index0AttributeName) : t.hasPositionAttribute === !0 && r.bindAttribLocation(E, 0, "position"), r.linkProgram(E);
  function R(P) {
    if (i.debug.checkShaderErrors) {
      const N = r.getProgramInfoLog(E) || "", q = r.getShaderInfoLog(b) || "", Y = r.getShaderInfoLog(y) || "", O = N.trim(), X = q.trim(), V = Y.trim();
      let J = !0, ee = !0;
      if (r.getProgramParameter(E, r.LINK_STATUS) === !1)
        if (J = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, E, b, y);
        else {
          const oe = Ao(r, b, "vertex"), se = Ao(r, y, "fragment");
          Xe(
            "WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(E, r.VALIDATE_STATUS) + `

Material Name: ` + P.name + `
Material Type: ` + P.type + `

Program Info Log: ` + O + `
` + oe + `
` + se
          );
        }
      else O !== "" ? Ce("WebGLProgram: Program Info Log:", O) : (X === "" || V === "") && (ee = !1);
      ee && (P.diagnostics = {
        runnable: J,
        programLog: O,
        vertexShader: {
          log: X,
          prefix: m
        },
        fragmentShader: {
          log: V,
          prefix: f
        }
      });
    }
    r.deleteShader(b), r.deleteShader(y), _ = new pr(r, E), T = _p(r, E);
  }
  let _;
  this.getUniforms = function() {
    return _ === void 0 && R(this), _;
  };
  let T;
  this.getAttributes = function() {
    return T === void 0 && R(this), T;
  };
  let I = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return I === !1 && (I = r.getProgramParameter(E, op)), I;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(E), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = lp++, this.cacheKey = e, this.usedTimes = 1, this.program = E, this.vertexShader = b, this.fragmentShader = y, this;
}
let Ip = 0;
class Up {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e, t, n) {
    const r = this._getShaderCacheForMaterial(e);
    return r.has(t) === !1 && (r.add(t), t.usedTimes++), r.has(n) === !1 && (r.add(n), n.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderStage(e) {
    return this._getShaderStage(e.vertexShader);
  }
  getFragmentShaderStage(e) {
    return this._getShaderStage(e.fragmentShader);
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new Np(e), t.set(e, n)), n;
  }
}
class Np {
  constructor(e) {
    this.id = Ip++, this.code = e, this.usedTimes = 0;
  }
}
function Fp(i) {
  return i === Wn || i === _r || i === xr;
}
function Op(i, e, t, n, r, s) {
  const a = new sl(), o = new Up(), c = /* @__PURE__ */ new Set(), l = [], h = /* @__PURE__ */ new Map(), p = n.logarithmicDepthBuffer;
  let u = n.precision;
  const g = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distance",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function v(_) {
    return c.add(_), _ === 0 ? "uv" : `uv${_}`;
  }
  function E(_, T, I, P, N, q) {
    const Y = P.fog, O = N.geometry, X = _.isMeshStandardMaterial || _.isMeshLambertMaterial || _.isMeshPhongMaterial ? P.environment : null, V = _.isMeshStandardMaterial || _.isMeshLambertMaterial && !_.envMap || _.isMeshPhongMaterial && !_.envMap, J = e.get(_.envMap || X, V), ee = J && J.mapping === yr ? J.image.height : null, oe = g[_.type];
    _.precision !== null && (u = n.getMaxPrecision(_.precision), u !== _.precision && Ce("WebGLProgram.getParameters:", _.precision, "not supported, using", u, "instead."));
    const se = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, Q = se !== void 0 ? se.length : 0;
    let be = 0;
    O.morphAttributes.position !== void 0 && (be = 1), O.morphAttributes.normal !== void 0 && (be = 2), O.morphAttributes.color !== void 0 && (be = 3);
    let Re, Pe, Z, ie;
    if (oe) {
      const xe = $t[oe];
      Re = xe.vertexShader, Pe = xe.fragmentShader;
    } else {
      Re = _.vertexShader, Pe = _.fragmentShader;
      const xe = o.getVertexShaderStage(_), it = o.getFragmentShaderStage(_);
      o.update(_, xe, it), Z = xe.id, ie = it.id;
    }
    const te = i.getRenderTarget(), Le = i.state.buffers.depth.getReversed(), Ie = N.isInstancedMesh === !0, Ae = N.isBatchedMesh === !0, at = !!_.map, ze = !!_.matcap, $e = !!J, qe = !!_.aoMap, ke = !!_.lightMap, ct = !!_.bumpMap && _.wireframe === !1, ft = !!_.normalMap, mt = !!_.displacementMap, _t = !!_.emissiveMap, nt = !!_.metalnessMap, ut = !!_.roughnessMap, L = _.anisotropy > 0, At = _.clearcoat > 0, Ye = _.dispersion > 0, S = _.iridescence > 0, d = _.sheen > 0, U = _.transmission > 0, G = L && !!_.anisotropyMap, k = At && !!_.clearcoatMap, ne = At && !!_.clearcoatNormalMap, ae = At && !!_.clearcoatRoughnessMap, W = S && !!_.iridescenceMap, $ = S && !!_.iridescenceThicknessMap, le = d && !!_.sheenColorMap, Se = d && !!_.sheenRoughnessMap, he = !!_.specularMap, ce = !!_.specularColorMap, Te = !!_.specularIntensityMap, we = U && !!_.transmissionMap, Ue = U && !!_.thicknessMap, C = !!_.gradientMap, re = !!_.alphaMap, K = _.alphaTest > 0, ue = !!_.alphaHash, me = !!_.extensions;
    let j = jt;
    _.toneMapped && (te === null || te.isXRRenderTarget === !0) && (j = i.toneMapping);
    const Me = {
      shaderID: oe,
      shaderType: _.type,
      shaderName: _.name,
      vertexShader: Re,
      fragmentShader: Pe,
      defines: _.defines,
      customVertexShaderID: Z,
      customFragmentShaderID: ie,
      isRawShaderMaterial: _.isRawShaderMaterial === !0,
      glslVersion: _.glslVersion,
      precision: u,
      batching: Ae,
      batchingColor: Ae && N._colorsTexture !== null,
      instancing: Ie,
      instancingColor: Ie && N.instanceColor !== null,
      instancingMorph: Ie && N.morphTexture !== null,
      outputColorSpace: te === null ? i.outputColorSpace : te.isXRRenderTarget === !0 ? te.texture.colorSpace : Ge.workingColorSpace,
      alphaToCoverage: !!_.alphaToCoverage,
      map: at,
      matcap: ze,
      envMap: $e,
      envMapMode: $e && J.mapping,
      envMapCubeUVHeight: ee,
      aoMap: qe,
      lightMap: ke,
      bumpMap: ct,
      normalMap: ft,
      displacementMap: mt,
      emissiveMap: _t,
      normalMapObjectSpace: ft && _.normalMapType === mc,
      normalMapTangentSpace: ft && _.normalMapType === js,
      packedNormalMap: ft && _.normalMapType === js && Fp(_.normalMap.format),
      metalnessMap: nt,
      roughnessMap: ut,
      anisotropy: L,
      anisotropyMap: G,
      clearcoat: At,
      clearcoatMap: k,
      clearcoatNormalMap: ne,
      clearcoatRoughnessMap: ae,
      dispersion: Ye,
      iridescence: S,
      iridescenceMap: W,
      iridescenceThicknessMap: $,
      sheen: d,
      sheenColorMap: le,
      sheenRoughnessMap: Se,
      specularMap: he,
      specularColorMap: ce,
      specularIntensityMap: Te,
      transmission: U,
      transmissionMap: we,
      thicknessMap: Ue,
      gradientMap: C,
      opaque: _.transparent === !1 && _.blending === hi && _.alphaToCoverage === !1,
      alphaMap: re,
      alphaTest: K,
      alphaHash: ue,
      combine: _.combine,
      //
      mapUv: at && v(_.map.channel),
      aoMapUv: qe && v(_.aoMap.channel),
      lightMapUv: ke && v(_.lightMap.channel),
      bumpMapUv: ct && v(_.bumpMap.channel),
      normalMapUv: ft && v(_.normalMap.channel),
      displacementMapUv: mt && v(_.displacementMap.channel),
      emissiveMapUv: _t && v(_.emissiveMap.channel),
      metalnessMapUv: nt && v(_.metalnessMap.channel),
      roughnessMapUv: ut && v(_.roughnessMap.channel),
      anisotropyMapUv: G && v(_.anisotropyMap.channel),
      clearcoatMapUv: k && v(_.clearcoatMap.channel),
      clearcoatNormalMapUv: ne && v(_.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: ae && v(_.clearcoatRoughnessMap.channel),
      iridescenceMapUv: W && v(_.iridescenceMap.channel),
      iridescenceThicknessMapUv: $ && v(_.iridescenceThicknessMap.channel),
      sheenColorMapUv: le && v(_.sheenColorMap.channel),
      sheenRoughnessMapUv: Se && v(_.sheenRoughnessMap.channel),
      specularMapUv: he && v(_.specularMap.channel),
      specularColorMapUv: ce && v(_.specularColorMap.channel),
      specularIntensityMapUv: Te && v(_.specularIntensityMap.channel),
      transmissionMapUv: we && v(_.transmissionMap.channel),
      thicknessMapUv: Ue && v(_.thicknessMap.channel),
      alphaMapUv: re && v(_.alphaMap.channel),
      //
      vertexTangents: !!O.attributes.tangent && (ft || L),
      vertexNormals: !!O.attributes.normal,
      vertexColors: _.vertexColors,
      vertexAlphas: _.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4,
      pointsUvs: N.isPoints === !0 && !!O.attributes.uv && (at || re),
      fog: !!Y,
      useFog: _.fog === !0,
      fogExp2: !!Y && Y.isFogExp2,
      flatShading: _.wireframe === !1 && (_.flatShading === !0 || O.attributes.normal === void 0 && ft === !1 && (_.isMeshLambertMaterial || _.isMeshPhongMaterial || _.isMeshStandardMaterial || _.isMeshPhysicalMaterial)),
      sizeAttenuation: _.sizeAttenuation === !0,
      logarithmicDepthBuffer: p,
      reversedDepthBuffer: Le,
      skinning: N.isSkinnedMesh === !0,
      hasPositionAttribute: O.attributes.position !== void 0,
      morphTargets: O.morphAttributes.position !== void 0,
      morphNormals: O.morphAttributes.normal !== void 0,
      morphColors: O.morphAttributes.color !== void 0,
      morphTargetsCount: Q,
      morphTextureStride: be,
      numDirLights: T.directional.length,
      numPointLights: T.point.length,
      numSpotLights: T.spot.length,
      numSpotLightMaps: T.spotLightMap.length,
      numRectAreaLights: T.rectArea.length,
      numHemiLights: T.hemi.length,
      numDirLightShadows: T.directionalShadowMap.length,
      numPointLightShadows: T.pointShadowMap.length,
      numSpotLightShadows: T.spotShadowMap.length,
      numSpotLightShadowsWithMaps: T.numSpotLightShadowsWithMaps,
      numLightProbes: T.numLightProbes,
      numLightProbeGrids: q.length,
      numClippingPlanes: s.numPlanes,
      numClipIntersection: s.numIntersection,
      dithering: _.dithering,
      shadowMapEnabled: i.shadowMap.enabled && I.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: j,
      decodeVideoTexture: at && _.map.isVideoTexture === !0 && Ge.getTransfer(_.map.colorSpace) === Ze,
      decodeVideoTextureEmissive: _t && _.emissiveMap.isVideoTexture === !0 && Ge.getTransfer(_.emissiveMap.colorSpace) === Ze,
      premultipliedAlpha: _.premultipliedAlpha,
      doubleSided: _.side === fn,
      flipSided: _.side === Rt,
      useDepthPacking: _.depthPacking >= 0,
      depthPacking: _.depthPacking || 0,
      index0AttributeName: _.index0AttributeName,
      extensionClipCullDistance: me && _.extensions.clipCullDistance === !0 && t.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (me && _.extensions.multiDraw === !0 || Ae) && t.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: t.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: _.customProgramCacheKey()
    };
    return Me.vertexUv1s = c.has(1), Me.vertexUv2s = c.has(2), Me.vertexUv3s = c.has(3), c.clear(), Me;
  }
  function m(_) {
    const T = [];
    if (_.shaderID ? T.push(_.shaderID) : (T.push(_.customVertexShaderID), T.push(_.customFragmentShaderID)), _.defines !== void 0)
      for (const I in _.defines)
        T.push(I), T.push(_.defines[I]);
    return _.isRawShaderMaterial === !1 && (f(T, _), A(T, _), T.push(i.outputColorSpace)), T.push(_.customProgramCacheKey), T.join();
  }
  function f(_, T) {
    _.push(T.precision), _.push(T.outputColorSpace), _.push(T.envMapMode), _.push(T.envMapCubeUVHeight), _.push(T.mapUv), _.push(T.alphaMapUv), _.push(T.lightMapUv), _.push(T.aoMapUv), _.push(T.bumpMapUv), _.push(T.normalMapUv), _.push(T.displacementMapUv), _.push(T.emissiveMapUv), _.push(T.metalnessMapUv), _.push(T.roughnessMapUv), _.push(T.anisotropyMapUv), _.push(T.clearcoatMapUv), _.push(T.clearcoatNormalMapUv), _.push(T.clearcoatRoughnessMapUv), _.push(T.iridescenceMapUv), _.push(T.iridescenceThicknessMapUv), _.push(T.sheenColorMapUv), _.push(T.sheenRoughnessMapUv), _.push(T.specularMapUv), _.push(T.specularColorMapUv), _.push(T.specularIntensityMapUv), _.push(T.transmissionMapUv), _.push(T.thicknessMapUv), _.push(T.combine), _.push(T.fogExp2), _.push(T.sizeAttenuation), _.push(T.morphTargetsCount), _.push(T.morphAttributeCount), _.push(T.numDirLights), _.push(T.numPointLights), _.push(T.numSpotLights), _.push(T.numSpotLightMaps), _.push(T.numHemiLights), _.push(T.numRectAreaLights), _.push(T.numDirLightShadows), _.push(T.numPointLightShadows), _.push(T.numSpotLightShadows), _.push(T.numSpotLightShadowsWithMaps), _.push(T.numLightProbes), _.push(T.shadowMapType), _.push(T.toneMapping), _.push(T.numClippingPlanes), _.push(T.numClipIntersection), _.push(T.depthPacking);
  }
  function A(_, T) {
    a.disableAll(), T.instancing && a.enable(0), T.instancingColor && a.enable(1), T.instancingMorph && a.enable(2), T.matcap && a.enable(3), T.envMap && a.enable(4), T.normalMapObjectSpace && a.enable(5), T.normalMapTangentSpace && a.enable(6), T.clearcoat && a.enable(7), T.iridescence && a.enable(8), T.alphaTest && a.enable(9), T.vertexColors && a.enable(10), T.vertexAlphas && a.enable(11), T.vertexUv1s && a.enable(12), T.vertexUv2s && a.enable(13), T.vertexUv3s && a.enable(14), T.vertexTangents && a.enable(15), T.anisotropy && a.enable(16), T.alphaHash && a.enable(17), T.batching && a.enable(18), T.dispersion && a.enable(19), T.batchingColor && a.enable(20), T.gradientMap && a.enable(21), T.packedNormalMap && a.enable(22), T.vertexNormals && a.enable(23), _.push(a.mask), a.disableAll(), T.fog && a.enable(0), T.useFog && a.enable(1), T.flatShading && a.enable(2), T.logarithmicDepthBuffer && a.enable(3), T.reversedDepthBuffer && a.enable(4), T.skinning && a.enable(5), T.morphTargets && a.enable(6), T.morphNormals && a.enable(7), T.morphColors && a.enable(8), T.premultipliedAlpha && a.enable(9), T.shadowMapEnabled && a.enable(10), T.doubleSided && a.enable(11), T.flipSided && a.enable(12), T.useDepthPacking && a.enable(13), T.dithering && a.enable(14), T.transmission && a.enable(15), T.sheen && a.enable(16), T.opaque && a.enable(17), T.pointsUvs && a.enable(18), T.decodeVideoTexture && a.enable(19), T.decodeVideoTextureEmissive && a.enable(20), T.alphaToCoverage && a.enable(21), T.numLightProbeGrids > 0 && a.enable(22), T.hasPositionAttribute && a.enable(23), _.push(a.mask);
  }
  function w(_) {
    const T = g[_.type];
    let I;
    if (T) {
      const P = $t[T];
      I = jc.clone(P.uniforms);
    } else
      I = _.uniforms;
    return I;
  }
  function M(_, T) {
    let I = h.get(T);
    return I !== void 0 ? ++I.usedTimes : (I = new Dp(i, T, _, r), l.push(I), h.set(T, I)), I;
  }
  function b(_) {
    if (--_.usedTimes === 0) {
      const T = l.indexOf(_);
      l[T] = l[l.length - 1], l.pop(), h.delete(_.cacheKey), _.destroy();
    }
  }
  function y(_) {
    o.remove(_);
  }
  function R() {
    o.dispose();
  }
  return {
    getParameters: E,
    getProgramCacheKey: m,
    getUniforms: w,
    acquireProgram: M,
    releaseProgram: b,
    releaseShaderCache: y,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: l,
    dispose: R
  };
}
function Bp() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(a) {
    return i.has(a);
  }
  function t(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function r(a, o, c) {
    i.get(a)[o] = c;
  }
  function s() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: n,
    update: r,
    dispose: s
  };
}
function zp(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.materialVariant !== e.materialVariant ? i.materialVariant - e.materialVariant : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function Lo(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function Do() {
  const i = [];
  let e = 0;
  const t = [], n = [], r = [];
  function s() {
    e = 0, t.length = 0, n.length = 0, r.length = 0;
  }
  function a(u) {
    let g = 0;
    return u.isInstancedMesh && (g += 2), u.isSkinnedMesh && (g += 1), g;
  }
  function o(u, g, v, E, m, f) {
    let A = i[e];
    return A === void 0 ? (A = {
      id: u.id,
      object: u,
      geometry: g,
      material: v,
      materialVariant: a(u),
      groupOrder: E,
      renderOrder: u.renderOrder,
      z: m,
      group: f
    }, i[e] = A) : (A.id = u.id, A.object = u, A.geometry = g, A.material = v, A.materialVariant = a(u), A.groupOrder = E, A.renderOrder = u.renderOrder, A.z = m, A.group = f), e++, A;
  }
  function c(u, g, v, E, m, f) {
    const A = o(u, g, v, E, m, f);
    v.transmission > 0 ? n.push(A) : v.transparent === !0 ? r.push(A) : t.push(A);
  }
  function l(u, g, v, E, m, f) {
    const A = o(u, g, v, E, m, f);
    v.transmission > 0 ? n.unshift(A) : v.transparent === !0 ? r.unshift(A) : t.unshift(A);
  }
  function h(u, g, v) {
    t.length > 1 && t.sort(u || zp), n.length > 1 && n.sort(g || Lo), r.length > 1 && r.sort(g || Lo), v && (t.reverse(), n.reverse(), r.reverse());
  }
  function p() {
    for (let u = e, g = i.length; u < g; u++) {
      const v = i[u];
      if (v.id === null) break;
      v.id = null, v.object = null, v.geometry = null, v.material = null, v.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: r,
    init: s,
    push: c,
    unshift: l,
    finish: p,
    sort: h
  };
}
function Gp() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, r) {
    const s = i.get(n);
    let a;
    return s === void 0 ? (a = new Do(), i.set(n, [a])) : r >= s.length ? (a = new Do(), s.push(a)) : a = s[r], a;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function Vp() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new z(),
            color: new Be()
          };
          break;
        case "SpotLight":
          t = {
            position: new z(),
            direction: new z(),
            color: new Be(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new z(),
            color: new Be(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new z(),
            skyColor: new Be(),
            groundColor: new Be()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Be(),
            position: new z(),
            halfWidth: new z(),
            halfHeight: new z()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function Hp() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new He()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new He()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new He(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let kp = 0;
function Wp(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function Xp(i) {
  const e = new Vp(), t = Hp(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let l = 0; l < 9; l++) n.probe.push(new z());
  const r = new z(), s = new st(), a = new st();
  function o(l) {
    let h = 0, p = 0, u = 0;
    for (let T = 0; T < 9; T++) n.probe[T].set(0, 0, 0);
    let g = 0, v = 0, E = 0, m = 0, f = 0, A = 0, w = 0, M = 0, b = 0, y = 0, R = 0;
    l.sort(Wp);
    for (let T = 0, I = l.length; T < I; T++) {
      const P = l[T], N = P.color, q = P.intensity, Y = P.distance;
      let O = null;
      if (P.shadow && P.shadow.map && (P.shadow.map.texture.format === Wn ? O = P.shadow.map.texture : O = P.shadow.map.depthTexture || P.shadow.map.texture), P.isAmbientLight)
        h += N.r * q, p += N.g * q, u += N.b * q;
      else if (P.isLightProbe) {
        for (let X = 0; X < 9; X++)
          n.probe[X].addScaledVector(P.sh.coefficients[X], q);
        R++;
      } else if (P.isDirectionalLight) {
        const X = e.get(P);
        if (X.color.copy(P.color).multiplyScalar(P.intensity), P.castShadow) {
          const V = P.shadow, J = t.get(P);
          J.shadowIntensity = V.intensity, J.shadowBias = V.bias, J.shadowNormalBias = V.normalBias, J.shadowRadius = V.radius, J.shadowMapSize = V.mapSize, n.directionalShadow[g] = J, n.directionalShadowMap[g] = O, n.directionalShadowMatrix[g] = P.shadow.matrix, A++;
        }
        n.directional[g] = X, g++;
      } else if (P.isSpotLight) {
        const X = e.get(P);
        X.position.setFromMatrixPosition(P.matrixWorld), X.color.copy(N).multiplyScalar(q), X.distance = Y, X.coneCos = Math.cos(P.angle), X.penumbraCos = Math.cos(P.angle * (1 - P.penumbra)), X.decay = P.decay, n.spot[E] = X;
        const V = P.shadow;
        if (P.map && (n.spotLightMap[b] = P.map, b++, V.updateMatrices(P), P.castShadow && y++), n.spotLightMatrix[E] = V.matrix, P.castShadow) {
          const J = t.get(P);
          J.shadowIntensity = V.intensity, J.shadowBias = V.bias, J.shadowNormalBias = V.normalBias, J.shadowRadius = V.radius, J.shadowMapSize = V.mapSize, n.spotShadow[E] = J, n.spotShadowMap[E] = O, M++;
        }
        E++;
      } else if (P.isRectAreaLight) {
        const X = e.get(P);
        X.color.copy(N).multiplyScalar(q), X.halfWidth.set(P.width * 0.5, 0, 0), X.halfHeight.set(0, P.height * 0.5, 0), n.rectArea[m] = X, m++;
      } else if (P.isPointLight) {
        const X = e.get(P);
        if (X.color.copy(P.color).multiplyScalar(P.intensity), X.distance = P.distance, X.decay = P.decay, P.castShadow) {
          const V = P.shadow, J = t.get(P);
          J.shadowIntensity = V.intensity, J.shadowBias = V.bias, J.shadowNormalBias = V.normalBias, J.shadowRadius = V.radius, J.shadowMapSize = V.mapSize, J.shadowCameraNear = V.camera.near, J.shadowCameraFar = V.camera.far, n.pointShadow[v] = J, n.pointShadowMap[v] = O, n.pointShadowMatrix[v] = P.shadow.matrix, w++;
        }
        n.point[v] = X, v++;
      } else if (P.isHemisphereLight) {
        const X = e.get(P);
        X.skyColor.copy(P.color).multiplyScalar(q), X.groundColor.copy(P.groundColor).multiplyScalar(q), n.hemi[f] = X, f++;
      }
    }
    m > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = fe.LTC_FLOAT_1, n.rectAreaLTC2 = fe.LTC_FLOAT_2) : (n.rectAreaLTC1 = fe.LTC_HALF_1, n.rectAreaLTC2 = fe.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = p, n.ambient[2] = u;
    const _ = n.hash;
    (_.directionalLength !== g || _.pointLength !== v || _.spotLength !== E || _.rectAreaLength !== m || _.hemiLength !== f || _.numDirectionalShadows !== A || _.numPointShadows !== w || _.numSpotShadows !== M || _.numSpotMaps !== b || _.numLightProbes !== R) && (n.directional.length = g, n.spot.length = E, n.rectArea.length = m, n.point.length = v, n.hemi.length = f, n.directionalShadow.length = A, n.directionalShadowMap.length = A, n.pointShadow.length = w, n.pointShadowMap.length = w, n.spotShadow.length = M, n.spotShadowMap.length = M, n.directionalShadowMatrix.length = A, n.pointShadowMatrix.length = w, n.spotLightMatrix.length = M + b - y, n.spotLightMap.length = b, n.numSpotLightShadowsWithMaps = y, n.numLightProbes = R, _.directionalLength = g, _.pointLength = v, _.spotLength = E, _.rectAreaLength = m, _.hemiLength = f, _.numDirectionalShadows = A, _.numPointShadows = w, _.numSpotShadows = M, _.numSpotMaps = b, _.numLightProbes = R, n.version = kp++);
  }
  function c(l, h) {
    let p = 0, u = 0, g = 0, v = 0, E = 0;
    const m = h.matrixWorldInverse;
    for (let f = 0, A = l.length; f < A; f++) {
      const w = l[f];
      if (w.isDirectionalLight) {
        const M = n.directional[p];
        M.direction.setFromMatrixPosition(w.matrixWorld), r.setFromMatrixPosition(w.target.matrixWorld), M.direction.sub(r), M.direction.transformDirection(m), p++;
      } else if (w.isSpotLight) {
        const M = n.spot[g];
        M.position.setFromMatrixPosition(w.matrixWorld), M.position.applyMatrix4(m), M.direction.setFromMatrixPosition(w.matrixWorld), r.setFromMatrixPosition(w.target.matrixWorld), M.direction.sub(r), M.direction.transformDirection(m), g++;
      } else if (w.isRectAreaLight) {
        const M = n.rectArea[v];
        M.position.setFromMatrixPosition(w.matrixWorld), M.position.applyMatrix4(m), a.identity(), s.copy(w.matrixWorld), s.premultiply(m), a.extractRotation(s), M.halfWidth.set(w.width * 0.5, 0, 0), M.halfHeight.set(0, w.height * 0.5, 0), M.halfWidth.applyMatrix4(a), M.halfHeight.applyMatrix4(a), v++;
      } else if (w.isPointLight) {
        const M = n.point[u];
        M.position.setFromMatrixPosition(w.matrixWorld), M.position.applyMatrix4(m), u++;
      } else if (w.isHemisphereLight) {
        const M = n.hemi[E];
        M.direction.setFromMatrixPosition(w.matrixWorld), M.direction.transformDirection(m), E++;
      }
    }
  }
  return {
    setup: o,
    setupView: c,
    state: n
  };
}
function Io(i) {
  const e = new Xp(i), t = [], n = [], r = [];
  function s(u) {
    p.camera = u, t.length = 0, n.length = 0, r.length = 0;
  }
  function a(u) {
    t.push(u);
  }
  function o(u) {
    n.push(u);
  }
  function c(u) {
    r.push(u);
  }
  function l() {
    e.setup(t);
  }
  function h(u) {
    e.setupView(t, u);
  }
  const p = {
    lightsArray: t,
    shadowsArray: n,
    lightProbeGridArray: r,
    camera: null,
    lights: e,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: s,
    state: p,
    setupLights: l,
    setupLightsView: h,
    pushLight: a,
    pushShadow: o,
    pushLightProbeGrid: c
  };
}
function qp(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(r, s = 0) {
    const a = e.get(r);
    let o;
    return a === void 0 ? (o = new Io(i), e.set(r, [o])) : s >= a.length ? (o = new Io(i), a.push(o)) : o = a[s], o;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
const Yp = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Zp = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`, Kp = [
  /* @__PURE__ */ new z(1, 0, 0),
  /* @__PURE__ */ new z(-1, 0, 0),
  /* @__PURE__ */ new z(0, 1, 0),
  /* @__PURE__ */ new z(0, -1, 0),
  /* @__PURE__ */ new z(0, 0, 1),
  /* @__PURE__ */ new z(0, 0, -1)
], $p = [
  /* @__PURE__ */ new z(0, -1, 0),
  /* @__PURE__ */ new z(0, -1, 0),
  /* @__PURE__ */ new z(0, 0, 1),
  /* @__PURE__ */ new z(0, 0, -1),
  /* @__PURE__ */ new z(0, -1, 0),
  /* @__PURE__ */ new z(0, -1, 0)
], Uo = /* @__PURE__ */ new st(), wi = /* @__PURE__ */ new z(), hs = /* @__PURE__ */ new z();
function Jp(i, e, t) {
  let n = new ma();
  const r = new He(), s = new He(), a = new tt(), o = new iu(), c = new ru(), l = {}, h = t.maxTextureSize, p = { [Ln]: Rt, [Rt]: Ln, [fn]: fn }, u = new rn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new He() },
      radius: { value: 4 }
    },
    vertexShader: Yp,
    fragmentShader: Zp
  }), g = u.clone();
  g.defines.HORIZONTAL_PASS = 1;
  const v = new vn();
  v.setAttribute(
    "position",
    new tn(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const E = new Wt(v, u), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = Di;
  let f = this.type;
  this.render = function(y, R, _) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || y.length === 0) return;
    this.type === ql && (Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = Di);
    const T = i.getRenderTarget(), I = i.getActiveCubeFace(), P = i.getActiveMipmapLevel(), N = i.state;
    N.setBlending(pn), N.buffers.depth.getReversed() === !0 ? N.buffers.color.setClear(0, 0, 0, 0) : N.buffers.color.setClear(1, 1, 1, 1), N.buffers.depth.setTest(!0), N.setScissorTest(!1);
    const q = f !== this.type;
    q && R.traverse(function(Y) {
      Y.material && (Array.isArray(Y.material) ? Y.material.forEach((O) => O.needsUpdate = !0) : Y.material.needsUpdate = !0);
    });
    for (let Y = 0, O = y.length; Y < O; Y++) {
      const X = y[Y], V = X.shadow;
      if (V === void 0) {
        Ce("WebGLShadowMap:", X, "has no shadow.");
        continue;
      }
      if (V.autoUpdate === !1 && V.needsUpdate === !1) continue;
      r.copy(V.mapSize);
      const J = V.getFrameExtents();
      r.multiply(J), s.copy(V.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / J.x), r.x = s.x * J.x, V.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / J.y), r.y = s.y * J.y, V.mapSize.y = s.y));
      const ee = i.state.buffers.depth.getReversed();
      if (V.camera._reversedDepth = ee, V.map === null || q === !0) {
        if (V.map !== null && (V.map.depthTexture !== null && (V.map.depthTexture.dispose(), V.map.depthTexture = null), V.map.dispose()), this.type === Pi) {
          if (X.isPointLight) {
            Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          V.map = new en(r.x, r.y, {
            format: Wn,
            type: _n,
            minFilter: yt,
            magFilter: yt,
            generateMipmaps: !1
          }), V.map.texture.name = X.name + ".shadowMap", V.map.depthTexture = new gi(r.x, r.y, Jt), V.map.depthTexture.name = X.name + ".shadowMapDepth", V.map.depthTexture.format = xn, V.map.depthTexture.compareFunction = null, V.map.depthTexture.minFilter = xt, V.map.depthTexture.magFilter = xt;
        } else
          X.isPointLight ? (V.map = new _l(r.x), V.map.depthTexture = new Jc(r.x, nn)) : (V.map = new en(r.x, r.y), V.map.depthTexture = new gi(r.x, r.y, nn)), V.map.depthTexture.name = X.name + ".shadowMap", V.map.depthTexture.format = xn, this.type === Di ? (V.map.depthTexture.compareFunction = ee ? ha : ua, V.map.depthTexture.minFilter = yt, V.map.depthTexture.magFilter = yt) : (V.map.depthTexture.compareFunction = null, V.map.depthTexture.minFilter = xt, V.map.depthTexture.magFilter = xt);
        V.camera.updateProjectionMatrix();
      }
      const oe = V.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let se = 0; se < oe; se++) {
        if (V.map.isWebGLCubeRenderTarget)
          i.setRenderTarget(V.map, se), i.clear();
        else {
          se === 0 && (i.setRenderTarget(V.map), i.clear());
          const Q = V.getViewport(se);
          a.set(
            s.x * Q.x,
            s.y * Q.y,
            s.x * Q.z,
            s.y * Q.w
          ), N.viewport(a);
        }
        if (X.isPointLight) {
          const Q = V.camera, be = V.matrix, Re = X.distance || Q.far;
          Re !== Q.far && (Q.far = Re, Q.updateProjectionMatrix()), wi.setFromMatrixPosition(X.matrixWorld), Q.position.copy(wi), hs.copy(Q.position), hs.add(Kp[se]), Q.up.copy($p[se]), Q.lookAt(hs), Q.updateMatrixWorld(), be.makeTranslation(-wi.x, -wi.y, -wi.z), Uo.multiplyMatrices(Q.projectionMatrix, Q.matrixWorldInverse), V._frustum.setFromProjectionMatrix(Uo, Q.coordinateSystem, Q.reversedDepth);
        } else
          V.updateMatrices(X);
        n = V.getFrustum(), M(R, _, V.camera, X, this.type);
      }
      V.isPointLightShadow !== !0 && this.type === Pi && A(V, _), V.needsUpdate = !1;
    }
    f = this.type, m.needsUpdate = !1, i.setRenderTarget(T, I, P);
  };
  function A(y, R) {
    const _ = e.update(E);
    u.defines.VSM_SAMPLES !== y.blurSamples && (u.defines.VSM_SAMPLES = y.blurSamples, g.defines.VSM_SAMPLES = y.blurSamples, u.needsUpdate = !0, g.needsUpdate = !0), y.mapPass === null && (y.mapPass = new en(r.x, r.y, {
      format: Wn,
      type: _n
    })), u.uniforms.shadow_pass.value = y.map.depthTexture, u.uniforms.resolution.value = y.mapSize, u.uniforms.radius.value = y.radius, i.setRenderTarget(y.mapPass), i.clear(), i.renderBufferDirect(R, null, _, u, E, null), g.uniforms.shadow_pass.value = y.mapPass.texture, g.uniforms.resolution.value = y.mapSize, g.uniforms.radius.value = y.radius, i.setRenderTarget(y.map), i.clear(), i.renderBufferDirect(R, null, _, g, E, null);
  }
  function w(y, R, _, T) {
    let I = null;
    const P = _.isPointLight === !0 ? y.customDistanceMaterial : y.customDepthMaterial;
    if (P !== void 0)
      I = P;
    else if (I = _.isPointLight === !0 ? c : o, i.localClippingEnabled && R.clipShadows === !0 && Array.isArray(R.clippingPlanes) && R.clippingPlanes.length !== 0 || R.displacementMap && R.displacementScale !== 0 || R.alphaMap && R.alphaTest > 0 || R.map && R.alphaTest > 0 || R.alphaToCoverage === !0) {
      const N = I.uuid, q = R.uuid;
      let Y = l[N];
      Y === void 0 && (Y = {}, l[N] = Y);
      let O = Y[q];
      O === void 0 && (O = I.clone(), Y[q] = O, R.addEventListener("dispose", b)), I = O;
    }
    if (I.visible = R.visible, I.wireframe = R.wireframe, T === Pi ? I.side = R.shadowSide !== null ? R.shadowSide : R.side : I.side = R.shadowSide !== null ? R.shadowSide : p[R.side], I.alphaMap = R.alphaMap, I.alphaTest = R.alphaToCoverage === !0 ? 0.5 : R.alphaTest, I.map = R.map, I.clipShadows = R.clipShadows, I.clippingPlanes = R.clippingPlanes, I.clipIntersection = R.clipIntersection, I.displacementMap = R.displacementMap, I.displacementScale = R.displacementScale, I.displacementBias = R.displacementBias, I.wireframeLinewidth = R.wireframeLinewidth, I.linewidth = R.linewidth, _.isPointLight === !0 && I.isMeshDistanceMaterial === !0) {
      const N = i.properties.get(I);
      N.light = _;
    }
    return I;
  }
  function M(y, R, _, T, I) {
    if (y.visible === !1) return;
    if (y.layers.test(R.layers) && (y.isMesh || y.isLine || y.isPoints) && (y.castShadow || y.receiveShadow && I === Pi) && (!y.frustumCulled || n.intersectsObject(y))) {
      y.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse, y.matrixWorld);
      const q = e.update(y), Y = y.material;
      if (Array.isArray(Y)) {
        const O = q.groups;
        for (let X = 0, V = O.length; X < V; X++) {
          const J = O[X], ee = Y[J.materialIndex];
          if (ee && ee.visible) {
            const oe = w(y, ee, T, I);
            y.onBeforeShadow(i, y, R, _, q, oe, J), i.renderBufferDirect(_, null, q, oe, y, J), y.onAfterShadow(i, y, R, _, q, oe, J);
          }
        }
      } else if (Y.visible) {
        const O = w(y, Y, T, I);
        y.onBeforeShadow(i, y, R, _, q, O, null), i.renderBufferDirect(_, null, q, O, y, null), y.onAfterShadow(i, y, R, _, q, O, null);
      }
    }
    const N = y.children;
    for (let q = 0, Y = N.length; q < Y; q++)
      M(N[q], R, _, T, I);
  }
  function b(y) {
    y.target.removeEventListener("dispose", b);
    for (const _ in l) {
      const T = l[_], I = y.target.uuid;
      I in T && (T[I].dispose(), delete T[I]);
    }
  }
}
function Qp(i, e) {
  function t() {
    let C = !1;
    const re = new tt();
    let K = null;
    const ue = new tt(0, 0, 0, 0);
    return {
      setMask: function(me) {
        K !== me && !C && (i.colorMask(me, me, me, me), K = me);
      },
      setLocked: function(me) {
        C = me;
      },
      setClear: function(me, j, Me, xe, it) {
        it === !0 && (me *= xe, j *= xe, Me *= xe), re.set(me, j, Me, xe), ue.equals(re) === !1 && (i.clearColor(me, j, Me, xe), ue.copy(re));
      },
      reset: function() {
        C = !1, K = null, ue.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let C = !1, re = !1, K = null, ue = null, me = null;
    return {
      setReversed: function(j) {
        if (re !== j) {
          const Me = e.get("EXT_clip_control");
          j ? Me.clipControlEXT(Me.LOWER_LEFT_EXT, Me.ZERO_TO_ONE_EXT) : Me.clipControlEXT(Me.LOWER_LEFT_EXT, Me.NEGATIVE_ONE_TO_ONE_EXT), re = j;
          const xe = me;
          me = null, this.setClear(xe);
        }
      },
      getReversed: function() {
        return re;
      },
      setTest: function(j) {
        j ? te(i.DEPTH_TEST) : Le(i.DEPTH_TEST);
      },
      setMask: function(j) {
        K !== j && !C && (i.depthMask(j), K = j);
      },
      setFunc: function(j) {
        if (re && (j = bc[j]), ue !== j) {
          switch (j) {
            case ps:
              i.depthFunc(i.NEVER);
              break;
            case ms:
              i.depthFunc(i.ALWAYS);
              break;
            case gs:
              i.depthFunc(i.LESS);
              break;
            case pi:
              i.depthFunc(i.LEQUAL);
              break;
            case _s:
              i.depthFunc(i.EQUAL);
              break;
            case xs:
              i.depthFunc(i.GEQUAL);
              break;
            case vs:
              i.depthFunc(i.GREATER);
              break;
            case Ms:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          ue = j;
        }
      },
      setLocked: function(j) {
        C = j;
      },
      setClear: function(j) {
        me !== j && (me = j, re && (j = 1 - j), i.clearDepth(j));
      },
      reset: function() {
        C = !1, K = null, ue = null, me = null, re = !1;
      }
    };
  }
  function r() {
    let C = !1, re = null, K = null, ue = null, me = null, j = null, Me = null, xe = null, it = null;
    return {
      setTest: function(je) {
        C || (je ? te(i.STENCIL_TEST) : Le(i.STENCIL_TEST));
      },
      setMask: function(je) {
        re !== je && !C && (i.stencilMask(je), re = je);
      },
      setFunc: function(je, Xt, qt) {
        (K !== je || ue !== Xt || me !== qt) && (i.stencilFunc(je, Xt, qt), K = je, ue = Xt, me = qt);
      },
      setOp: function(je, Xt, qt) {
        (j !== je || Me !== Xt || xe !== qt) && (i.stencilOp(je, Xt, qt), j = je, Me = Xt, xe = qt);
      },
      setLocked: function(je) {
        C = je;
      },
      setClear: function(je) {
        it !== je && (i.clearStencil(je), it = je);
      },
      reset: function() {
        C = !1, re = null, K = null, ue = null, me = null, j = null, Me = null, xe = null, it = null;
      }
    };
  }
  const s = new t(), a = new n(), o = new r(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  let h = {}, p = {}, u = {}, g = /* @__PURE__ */ new WeakMap(), v = [], E = null, m = !1, f = null, A = null, w = null, M = null, b = null, y = null, R = null, _ = new Be(0, 0, 0), T = 0, I = !1, P = null, N = null, q = null, Y = null, O = null;
  const X = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let V = !1, J = 0;
  const ee = i.getParameter(i.VERSION);
  ee.indexOf("WebGL") !== -1 ? (J = parseFloat(/^WebGL (\d)/.exec(ee)[1]), V = J >= 1) : ee.indexOf("OpenGL ES") !== -1 && (J = parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]), V = J >= 2);
  let oe = null, se = {};
  const Q = i.getParameter(i.SCISSOR_BOX), be = i.getParameter(i.VIEWPORT), Re = new tt().fromArray(Q), Pe = new tt().fromArray(be);
  function Z(C, re, K, ue) {
    const me = new Uint8Array(4), j = i.createTexture();
    i.bindTexture(C, j), i.texParameteri(C, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(C, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Me = 0; Me < K; Me++)
      C === i.TEXTURE_3D || C === i.TEXTURE_2D_ARRAY ? i.texImage3D(re, 0, i.RGBA, 1, 1, ue, 0, i.RGBA, i.UNSIGNED_BYTE, me) : i.texImage2D(re + Me, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, me);
    return j;
  }
  const ie = {};
  ie[i.TEXTURE_2D] = Z(i.TEXTURE_2D, i.TEXTURE_2D, 1), ie[i.TEXTURE_CUBE_MAP] = Z(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), ie[i.TEXTURE_2D_ARRAY] = Z(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), ie[i.TEXTURE_3D] = Z(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), te(i.DEPTH_TEST), a.setFunc(pi), ct(!1), ft(Na), te(i.CULL_FACE), qe(pn);
  function te(C) {
    h[C] !== !0 && (i.enable(C), h[C] = !0);
  }
  function Le(C) {
    h[C] !== !1 && (i.disable(C), h[C] = !1);
  }
  function Ie(C, re) {
    return u[C] !== re ? (i.bindFramebuffer(C, re), u[C] = re, C === i.DRAW_FRAMEBUFFER && (u[i.FRAMEBUFFER] = re), C === i.FRAMEBUFFER && (u[i.DRAW_FRAMEBUFFER] = re), !0) : !1;
  }
  function Ae(C, re) {
    let K = v, ue = !1;
    if (C) {
      K = g.get(re), K === void 0 && (K = [], g.set(re, K));
      const me = C.textures;
      if (K.length !== me.length || K[0] !== i.COLOR_ATTACHMENT0) {
        for (let j = 0, Me = me.length; j < Me; j++)
          K[j] = i.COLOR_ATTACHMENT0 + j;
        K.length = me.length, ue = !0;
      }
    } else
      K[0] !== i.BACK && (K[0] = i.BACK, ue = !0);
    ue && i.drawBuffers(K);
  }
  function at(C) {
    return E !== C ? (i.useProgram(C), E = C, !0) : !1;
  }
  const ze = {
    [zn]: i.FUNC_ADD,
    [Zl]: i.FUNC_SUBTRACT,
    [Kl]: i.FUNC_REVERSE_SUBTRACT
  };
  ze[$l] = i.MIN, ze[Jl] = i.MAX;
  const $e = {
    [Ql]: i.ZERO,
    [jl]: i.ONE,
    [ec]: i.SRC_COLOR,
    [fs]: i.SRC_ALPHA,
    [ac]: i.SRC_ALPHA_SATURATE,
    [rc]: i.DST_COLOR,
    [nc]: i.DST_ALPHA,
    [tc]: i.ONE_MINUS_SRC_COLOR,
    [ds]: i.ONE_MINUS_SRC_ALPHA,
    [sc]: i.ONE_MINUS_DST_COLOR,
    [ic]: i.ONE_MINUS_DST_ALPHA,
    [oc]: i.CONSTANT_COLOR,
    [lc]: i.ONE_MINUS_CONSTANT_COLOR,
    [cc]: i.CONSTANT_ALPHA,
    [uc]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function qe(C, re, K, ue, me, j, Me, xe, it, je) {
    if (C === pn) {
      m === !0 && (Le(i.BLEND), m = !1);
      return;
    }
    if (m === !1 && (te(i.BLEND), m = !0), C !== Yl) {
      if (C !== f || je !== I) {
        if ((A !== zn || b !== zn) && (i.blendEquation(i.FUNC_ADD), A = zn, b = zn), je)
          switch (C) {
            case hi:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Fa:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case Oa:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case Ba:
              i.blendFuncSeparate(i.DST_COLOR, i.ONE_MINUS_SRC_ALPHA, i.ZERO, i.ONE);
              break;
            default:
              Xe("WebGLState: Invalid blending: ", C);
              break;
          }
        else
          switch (C) {
            case hi:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Fa:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE, i.ONE, i.ONE);
              break;
            case Oa:
              Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
              break;
            case Ba:
              Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
              break;
            default:
              Xe("WebGLState: Invalid blending: ", C);
              break;
          }
        w = null, M = null, y = null, R = null, _.set(0, 0, 0), T = 0, f = C, I = je;
      }
      return;
    }
    me = me || re, j = j || K, Me = Me || ue, (re !== A || me !== b) && (i.blendEquationSeparate(ze[re], ze[me]), A = re, b = me), (K !== w || ue !== M || j !== y || Me !== R) && (i.blendFuncSeparate($e[K], $e[ue], $e[j], $e[Me]), w = K, M = ue, y = j, R = Me), (xe.equals(_) === !1 || it !== T) && (i.blendColor(xe.r, xe.g, xe.b, it), _.copy(xe), T = it), f = C, I = !1;
  }
  function ke(C, re) {
    C.side === fn ? Le(i.CULL_FACE) : te(i.CULL_FACE);
    let K = C.side === Rt;
    re && (K = !K), ct(K), C.blending === hi && C.transparent === !1 ? qe(pn) : qe(C.blending, C.blendEquation, C.blendSrc, C.blendDst, C.blendEquationAlpha, C.blendSrcAlpha, C.blendDstAlpha, C.blendColor, C.blendAlpha, C.premultipliedAlpha), a.setFunc(C.depthFunc), a.setTest(C.depthTest), a.setMask(C.depthWrite), s.setMask(C.colorWrite);
    const ue = C.stencilWrite;
    o.setTest(ue), ue && (o.setMask(C.stencilWriteMask), o.setFunc(C.stencilFunc, C.stencilRef, C.stencilFuncMask), o.setOp(C.stencilFail, C.stencilZFail, C.stencilZPass)), _t(C.polygonOffset, C.polygonOffsetFactor, C.polygonOffsetUnits), C.alphaToCoverage === !0 ? te(i.SAMPLE_ALPHA_TO_COVERAGE) : Le(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function ct(C) {
    P !== C && (C ? i.frontFace(i.CW) : i.frontFace(i.CCW), P = C);
  }
  function ft(C) {
    C !== Wl ? (te(i.CULL_FACE), C !== N && (C === Na ? i.cullFace(i.BACK) : C === Xl ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : Le(i.CULL_FACE), N = C;
  }
  function mt(C) {
    C !== q && (V && i.lineWidth(C), q = C);
  }
  function _t(C, re, K) {
    C ? (te(i.POLYGON_OFFSET_FILL), (Y !== re || O !== K) && (Y = re, O = K, a.getReversed() && (re = -re), i.polygonOffset(re, K))) : Le(i.POLYGON_OFFSET_FILL);
  }
  function nt(C) {
    C ? te(i.SCISSOR_TEST) : Le(i.SCISSOR_TEST);
  }
  function ut(C) {
    C === void 0 && (C = i.TEXTURE0 + X - 1), oe !== C && (i.activeTexture(C), oe = C);
  }
  function L(C, re, K) {
    K === void 0 && (oe === null ? K = i.TEXTURE0 + X - 1 : K = oe);
    let ue = se[K];
    ue === void 0 && (ue = { type: void 0, texture: void 0 }, se[K] = ue), (ue.type !== C || ue.texture !== re) && (oe !== K && (i.activeTexture(K), oe = K), i.bindTexture(C, re || ie[C]), ue.type = C, ue.texture = re);
  }
  function At() {
    const C = se[oe];
    C !== void 0 && C.type !== void 0 && (i.bindTexture(C.type, null), C.type = void 0, C.texture = void 0);
  }
  function Ye() {
    try {
      i.compressedTexImage2D(...arguments);
    } catch (C) {
      Xe("WebGLState:", C);
    }
  }
  function S() {
    try {
      i.compressedTexImage3D(...arguments);
    } catch (C) {
      Xe("WebGLState:", C);
    }
  }
  function d() {
    try {
      i.texSubImage2D(...arguments);
    } catch (C) {
      Xe("WebGLState:", C);
    }
  }
  function U() {
    try {
      i.texSubImage3D(...arguments);
    } catch (C) {
      Xe("WebGLState:", C);
    }
  }
  function G() {
    try {
      i.compressedTexSubImage2D(...arguments);
    } catch (C) {
      Xe("WebGLState:", C);
    }
  }
  function k() {
    try {
      i.compressedTexSubImage3D(...arguments);
    } catch (C) {
      Xe("WebGLState:", C);
    }
  }
  function ne() {
    try {
      i.texStorage2D(...arguments);
    } catch (C) {
      Xe("WebGLState:", C);
    }
  }
  function ae() {
    try {
      i.texStorage3D(...arguments);
    } catch (C) {
      Xe("WebGLState:", C);
    }
  }
  function W() {
    try {
      i.texImage2D(...arguments);
    } catch (C) {
      Xe("WebGLState:", C);
    }
  }
  function $() {
    try {
      i.texImage3D(...arguments);
    } catch (C) {
      Xe("WebGLState:", C);
    }
  }
  function le(C) {
    return p[C] !== void 0 ? p[C] : i.getParameter(C);
  }
  function Se(C, re) {
    p[C] !== re && (i.pixelStorei(C, re), p[C] = re);
  }
  function he(C) {
    Re.equals(C) === !1 && (i.scissor(C.x, C.y, C.z, C.w), Re.copy(C));
  }
  function ce(C) {
    Pe.equals(C) === !1 && (i.viewport(C.x, C.y, C.z, C.w), Pe.copy(C));
  }
  function Te(C, re) {
    let K = l.get(re);
    K === void 0 && (K = /* @__PURE__ */ new WeakMap(), l.set(re, K));
    let ue = K.get(C);
    ue === void 0 && (ue = i.getUniformBlockIndex(re, C.name), K.set(C, ue));
  }
  function we(C, re) {
    const ue = l.get(re).get(C);
    c.get(re) !== ue && (i.uniformBlockBinding(re, ue, C.__bindingPointIndex), c.set(re, ue));
  }
  function Ue() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), a.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), i.pixelStorei(i.PACK_ALIGNMENT, 4), i.pixelStorei(i.UNPACK_ALIGNMENT, 4), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, !1), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, i.BROWSER_DEFAULT_WEBGL), i.pixelStorei(i.PACK_ROW_LENGTH, 0), i.pixelStorei(i.PACK_SKIP_PIXELS, 0), i.pixelStorei(i.PACK_SKIP_ROWS, 0), i.pixelStorei(i.UNPACK_ROW_LENGTH, 0), i.pixelStorei(i.UNPACK_IMAGE_HEIGHT, 0), i.pixelStorei(i.UNPACK_SKIP_PIXELS, 0), i.pixelStorei(i.UNPACK_SKIP_ROWS, 0), i.pixelStorei(i.UNPACK_SKIP_IMAGES, 0), h = {}, p = {}, oe = null, se = {}, u = {}, g = /* @__PURE__ */ new WeakMap(), v = [], E = null, m = !1, f = null, A = null, w = null, M = null, b = null, y = null, R = null, _ = new Be(0, 0, 0), T = 0, I = !1, P = null, N = null, q = null, Y = null, O = null, Re.set(0, 0, i.canvas.width, i.canvas.height), Pe.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: te,
    disable: Le,
    bindFramebuffer: Ie,
    drawBuffers: Ae,
    useProgram: at,
    setBlending: qe,
    setMaterial: ke,
    setFlipSided: ct,
    setCullFace: ft,
    setLineWidth: mt,
    setPolygonOffset: _t,
    setScissorTest: nt,
    activeTexture: ut,
    bindTexture: L,
    unbindTexture: At,
    compressedTexImage2D: Ye,
    compressedTexImage3D: S,
    texImage2D: W,
    texImage3D: $,
    pixelStorei: Se,
    getParameter: le,
    updateUBOMapping: Te,
    uniformBlockBinding: we,
    texStorage2D: ne,
    texStorage3D: ae,
    texSubImage2D: d,
    texSubImage3D: U,
    compressedTexSubImage2D: G,
    compressedTexSubImage3D: k,
    scissor: he,
    viewport: ce,
    reset: Ue
  };
}
function jp(i, e, t, n, r, s, a) {
  const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new He(), h = /* @__PURE__ */ new WeakMap(), p = /* @__PURE__ */ new Set();
  let u;
  const g = /* @__PURE__ */ new WeakMap();
  let v = !1;
  try {
    v = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function E(S, d) {
    return v ? new OffscreenCanvas(S, d) : Sr("canvas");
  }
  function m(S, d, U) {
    let G = 1;
    const k = Ye(S);
    if ((k.width > U || k.height > U) && (G = U / Math.max(k.width, k.height)), G < 1)
      if (typeof HTMLImageElement < "u" && S instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && S instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && S instanceof ImageBitmap || typeof VideoFrame < "u" && S instanceof VideoFrame) {
        const ne = Math.floor(G * k.width), ae = Math.floor(G * k.height);
        u === void 0 && (u = E(ne, ae));
        const W = d ? E(ne, ae) : u;
        return W.width = ne, W.height = ae, W.getContext("2d").drawImage(S, 0, 0, ne, ae), Ce("WebGLRenderer: Texture has been resized from (" + k.width + "x" + k.height + ") to (" + ne + "x" + ae + ")."), W;
      } else
        return "data" in S && Ce("WebGLRenderer: Image in DataTexture is too big (" + k.width + "x" + k.height + ")."), S;
    return S;
  }
  function f(S) {
    return S.generateMipmaps;
  }
  function A(S) {
    i.generateMipmap(S);
  }
  function w(S) {
    return S.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : S.isWebGL3DRenderTarget ? i.TEXTURE_3D : S.isWebGLArrayRenderTarget || S.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function M(S, d, U, G, k, ne = !1) {
    if (S !== null) {
      if (i[S] !== void 0) return i[S];
      Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + S + "'");
    }
    let ae;
    G && (ae = e.get("EXT_texture_norm16"), ae || Ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let W = d;
    if (d === i.RED && (U === i.FLOAT && (W = i.R32F), U === i.HALF_FLOAT && (W = i.R16F), U === i.UNSIGNED_BYTE && (W = i.R8), U === i.UNSIGNED_SHORT && ae && (W = ae.R16_EXT), U === i.SHORT && ae && (W = ae.R16_SNORM_EXT)), d === i.RED_INTEGER && (U === i.UNSIGNED_BYTE && (W = i.R8UI), U === i.UNSIGNED_SHORT && (W = i.R16UI), U === i.UNSIGNED_INT && (W = i.R32UI), U === i.BYTE && (W = i.R8I), U === i.SHORT && (W = i.R16I), U === i.INT && (W = i.R32I)), d === i.RG && (U === i.FLOAT && (W = i.RG32F), U === i.HALF_FLOAT && (W = i.RG16F), U === i.UNSIGNED_BYTE && (W = i.RG8), U === i.UNSIGNED_SHORT && ae && (W = ae.RG16_EXT), U === i.SHORT && ae && (W = ae.RG16_SNORM_EXT)), d === i.RG_INTEGER && (U === i.UNSIGNED_BYTE && (W = i.RG8UI), U === i.UNSIGNED_SHORT && (W = i.RG16UI), U === i.UNSIGNED_INT && (W = i.RG32UI), U === i.BYTE && (W = i.RG8I), U === i.SHORT && (W = i.RG16I), U === i.INT && (W = i.RG32I)), d === i.RGB_INTEGER && (U === i.UNSIGNED_BYTE && (W = i.RGB8UI), U === i.UNSIGNED_SHORT && (W = i.RGB16UI), U === i.UNSIGNED_INT && (W = i.RGB32UI), U === i.BYTE && (W = i.RGB8I), U === i.SHORT && (W = i.RGB16I), U === i.INT && (W = i.RGB32I)), d === i.RGBA_INTEGER && (U === i.UNSIGNED_BYTE && (W = i.RGBA8UI), U === i.UNSIGNED_SHORT && (W = i.RGBA16UI), U === i.UNSIGNED_INT && (W = i.RGBA32UI), U === i.BYTE && (W = i.RGBA8I), U === i.SHORT && (W = i.RGBA16I), U === i.INT && (W = i.RGBA32I)), d === i.RGB && (U === i.UNSIGNED_SHORT && ae && (W = ae.RGB16_EXT), U === i.SHORT && ae && (W = ae.RGB16_SNORM_EXT), U === i.UNSIGNED_INT_5_9_9_9_REV && (W = i.RGB9_E5), U === i.UNSIGNED_INT_10F_11F_11F_REV && (W = i.R11F_G11F_B10F)), d === i.RGBA) {
      const $ = ne ? Mr : Ge.getTransfer(k);
      U === i.FLOAT && (W = i.RGBA32F), U === i.HALF_FLOAT && (W = i.RGBA16F), U === i.UNSIGNED_BYTE && (W = $ === Ze ? i.SRGB8_ALPHA8 : i.RGBA8), U === i.UNSIGNED_SHORT && ae && (W = ae.RGBA16_EXT), U === i.SHORT && ae && (W = ae.RGBA16_SNORM_EXT), U === i.UNSIGNED_SHORT_4_4_4_4 && (W = i.RGBA4), U === i.UNSIGNED_SHORT_5_5_5_1 && (W = i.RGB5_A1);
    }
    return (W === i.R16F || W === i.R32F || W === i.RG16F || W === i.RG32F || W === i.RGBA16F || W === i.RGBA32F) && e.get("EXT_color_buffer_float"), W;
  }
  function b(S, d) {
    let U;
    return S ? d === null || d === nn || d === Ui ? U = i.DEPTH24_STENCIL8 : d === Jt ? U = i.DEPTH32F_STENCIL8 : d === Ii && (U = i.DEPTH24_STENCIL8, Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : d === null || d === nn || d === Ui ? U = i.DEPTH_COMPONENT24 : d === Jt ? U = i.DEPTH_COMPONENT32F : d === Ii && (U = i.DEPTH_COMPONENT16), U;
  }
  function y(S, d) {
    return f(S) === !0 || S.isFramebufferTexture && S.minFilter !== xt && S.minFilter !== yt ? Math.log2(Math.max(d.width, d.height)) + 1 : S.mipmaps !== void 0 && S.mipmaps.length > 0 ? S.mipmaps.length : S.isCompressedTexture && Array.isArray(S.image) ? d.mipmaps.length : 1;
  }
  function R(S) {
    const d = S.target;
    d.removeEventListener("dispose", R), T(d), d.isVideoTexture && h.delete(d), d.isHTMLTexture && p.delete(d);
  }
  function _(S) {
    const d = S.target;
    d.removeEventListener("dispose", _), P(d);
  }
  function T(S) {
    const d = n.get(S);
    if (d.__webglInit === void 0) return;
    const U = S.source, G = g.get(U);
    if (G) {
      const k = G[d.__cacheKey];
      k.usedTimes--, k.usedTimes === 0 && I(S), Object.keys(G).length === 0 && g.delete(U);
    }
    n.remove(S);
  }
  function I(S) {
    const d = n.get(S);
    i.deleteTexture(d.__webglTexture);
    const U = S.source, G = g.get(U);
    delete G[d.__cacheKey], a.memory.textures--;
  }
  function P(S) {
    const d = n.get(S);
    if (S.depthTexture && (S.depthTexture.dispose(), n.remove(S.depthTexture)), S.isWebGLCubeRenderTarget)
      for (let G = 0; G < 6; G++) {
        if (Array.isArray(d.__webglFramebuffer[G]))
          for (let k = 0; k < d.__webglFramebuffer[G].length; k++) i.deleteFramebuffer(d.__webglFramebuffer[G][k]);
        else
          i.deleteFramebuffer(d.__webglFramebuffer[G]);
        d.__webglDepthbuffer && i.deleteRenderbuffer(d.__webglDepthbuffer[G]);
      }
    else {
      if (Array.isArray(d.__webglFramebuffer))
        for (let G = 0; G < d.__webglFramebuffer.length; G++) i.deleteFramebuffer(d.__webglFramebuffer[G]);
      else
        i.deleteFramebuffer(d.__webglFramebuffer);
      if (d.__webglDepthbuffer && i.deleteRenderbuffer(d.__webglDepthbuffer), d.__webglMultisampledFramebuffer && i.deleteFramebuffer(d.__webglMultisampledFramebuffer), d.__webglColorRenderbuffer)
        for (let G = 0; G < d.__webglColorRenderbuffer.length; G++)
          d.__webglColorRenderbuffer[G] && i.deleteRenderbuffer(d.__webglColorRenderbuffer[G]);
      d.__webglDepthRenderbuffer && i.deleteRenderbuffer(d.__webglDepthRenderbuffer);
    }
    const U = S.textures;
    for (let G = 0, k = U.length; G < k; G++) {
      const ne = n.get(U[G]);
      ne.__webglTexture && (i.deleteTexture(ne.__webglTexture), a.memory.textures--), n.remove(U[G]);
    }
    n.remove(S);
  }
  let N = 0;
  function q() {
    N = 0;
  }
  function Y() {
    return N;
  }
  function O(S) {
    N = S;
  }
  function X() {
    const S = N;
    return S >= r.maxTextures && Ce("WebGLTextures: Trying to use " + S + " texture units while this GPU supports only " + r.maxTextures), N += 1, S;
  }
  function V(S) {
    const d = [];
    return d.push(S.wrapS), d.push(S.wrapT), d.push(S.wrapR || 0), d.push(S.magFilter), d.push(S.minFilter), d.push(S.anisotropy), d.push(S.internalFormat), d.push(S.format), d.push(S.type), d.push(S.generateMipmaps), d.push(S.premultiplyAlpha), d.push(S.flipY), d.push(S.unpackAlignment), d.push(S.colorSpace), d.join();
  }
  function J(S, d) {
    const U = n.get(S);
    if (S.isVideoTexture && L(S), S.isRenderTargetTexture === !1 && S.isExternalTexture !== !0 && S.version > 0 && U.__version !== S.version) {
      const G = S.image;
      if (G === null)
        Ce("WebGLRenderer: Texture marked for update but no image data found.");
      else if (G.complete === !1)
        Ce("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Le(U, S, d);
        return;
      }
    } else S.isExternalTexture && (U.__webglTexture = S.sourceTexture ? S.sourceTexture : null);
    t.bindTexture(i.TEXTURE_2D, U.__webglTexture, i.TEXTURE0 + d);
  }
  function ee(S, d) {
    const U = n.get(S);
    if (S.isRenderTargetTexture === !1 && S.version > 0 && U.__version !== S.version) {
      Le(U, S, d);
      return;
    } else S.isExternalTexture && (U.__webglTexture = S.sourceTexture ? S.sourceTexture : null);
    t.bindTexture(i.TEXTURE_2D_ARRAY, U.__webglTexture, i.TEXTURE0 + d);
  }
  function oe(S, d) {
    const U = n.get(S);
    if (S.isRenderTargetTexture === !1 && S.version > 0 && U.__version !== S.version) {
      Le(U, S, d);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, U.__webglTexture, i.TEXTURE0 + d);
  }
  function se(S, d) {
    const U = n.get(S);
    if (S.isCubeDepthTexture !== !0 && S.version > 0 && U.__version !== S.version) {
      Ie(U, S, d);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, U.__webglTexture, i.TEXTURE0 + d);
  }
  const Q = {
    [Ss]: i.REPEAT,
    [dn]: i.CLAMP_TO_EDGE,
    [Es]: i.MIRRORED_REPEAT
  }, be = {
    [xt]: i.NEAREST,
    [dc]: i.NEAREST_MIPMAP_NEAREST,
    [Hi]: i.NEAREST_MIPMAP_LINEAR,
    [yt]: i.LINEAR,
    [Ur]: i.LINEAR_MIPMAP_NEAREST,
    [Vn]: i.LINEAR_MIPMAP_LINEAR
  }, Re = {
    [gc]: i.NEVER,
    [Sc]: i.ALWAYS,
    [_c]: i.LESS,
    [ua]: i.LEQUAL,
    [xc]: i.EQUAL,
    [ha]: i.GEQUAL,
    [vc]: i.GREATER,
    [Mc]: i.NOTEQUAL
  };
  function Pe(S, d) {
    if (d.type === Jt && e.has("OES_texture_float_linear") === !1 && (d.magFilter === yt || d.magFilter === Ur || d.magFilter === Hi || d.magFilter === Vn || d.minFilter === yt || d.minFilter === Ur || d.minFilter === Hi || d.minFilter === Vn) && Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(S, i.TEXTURE_WRAP_S, Q[d.wrapS]), i.texParameteri(S, i.TEXTURE_WRAP_T, Q[d.wrapT]), (S === i.TEXTURE_3D || S === i.TEXTURE_2D_ARRAY) && i.texParameteri(S, i.TEXTURE_WRAP_R, Q[d.wrapR]), i.texParameteri(S, i.TEXTURE_MAG_FILTER, be[d.magFilter]), i.texParameteri(S, i.TEXTURE_MIN_FILTER, be[d.minFilter]), d.compareFunction && (i.texParameteri(S, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(S, i.TEXTURE_COMPARE_FUNC, Re[d.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (d.magFilter === xt || d.minFilter !== Hi && d.minFilter !== Vn || d.type === Jt && e.has("OES_texture_float_linear") === !1) return;
      if (d.anisotropy > 1 || n.get(d).__currentAnisotropy) {
        const U = e.get("EXT_texture_filter_anisotropic");
        i.texParameterf(S, U.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(d.anisotropy, r.getMaxAnisotropy())), n.get(d).__currentAnisotropy = d.anisotropy;
      }
    }
  }
  function Z(S, d) {
    let U = !1;
    S.__webglInit === void 0 && (S.__webglInit = !0, d.addEventListener("dispose", R));
    const G = d.source;
    let k = g.get(G);
    k === void 0 && (k = {}, g.set(G, k));
    const ne = V(d);
    if (ne !== S.__cacheKey) {
      k[ne] === void 0 && (k[ne] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, U = !0), k[ne].usedTimes++;
      const ae = k[S.__cacheKey];
      ae !== void 0 && (k[S.__cacheKey].usedTimes--, ae.usedTimes === 0 && I(d)), S.__cacheKey = ne, S.__webglTexture = k[ne].texture;
    }
    return U;
  }
  function ie(S, d, U) {
    return Math.floor(Math.floor(S / U) / d);
  }
  function te(S, d, U, G) {
    const ne = S.updateRanges;
    if (ne.length === 0)
      t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, d.width, d.height, U, G, d.data);
    else {
      ne.sort((Se, he) => Se.start - he.start);
      let ae = 0;
      for (let Se = 1; Se < ne.length; Se++) {
        const he = ne[ae], ce = ne[Se], Te = he.start + he.count, we = ie(ce.start, d.width, 4), Ue = ie(he.start, d.width, 4);
        ce.start <= Te + 1 && we === Ue && ie(ce.start + ce.count - 1, d.width, 4) === we ? he.count = Math.max(
          he.count,
          ce.start + ce.count - he.start
        ) : (++ae, ne[ae] = ce);
      }
      ne.length = ae + 1;
      const W = t.getParameter(i.UNPACK_ROW_LENGTH), $ = t.getParameter(i.UNPACK_SKIP_PIXELS), le = t.getParameter(i.UNPACK_SKIP_ROWS);
      t.pixelStorei(i.UNPACK_ROW_LENGTH, d.width);
      for (let Se = 0, he = ne.length; Se < he; Se++) {
        const ce = ne[Se], Te = Math.floor(ce.start / 4), we = Math.ceil(ce.count / 4), Ue = Te % d.width, C = Math.floor(Te / d.width), re = we, K = 1;
        t.pixelStorei(i.UNPACK_SKIP_PIXELS, Ue), t.pixelStorei(i.UNPACK_SKIP_ROWS, C), t.texSubImage2D(i.TEXTURE_2D, 0, Ue, C, re, K, U, G, d.data);
      }
      S.clearUpdateRanges(), t.pixelStorei(i.UNPACK_ROW_LENGTH, W), t.pixelStorei(i.UNPACK_SKIP_PIXELS, $), t.pixelStorei(i.UNPACK_SKIP_ROWS, le);
    }
  }
  function Le(S, d, U) {
    let G = i.TEXTURE_2D;
    (d.isDataArrayTexture || d.isCompressedArrayTexture) && (G = i.TEXTURE_2D_ARRAY), d.isData3DTexture && (G = i.TEXTURE_3D);
    const k = Z(S, d), ne = d.source;
    t.bindTexture(G, S.__webglTexture, i.TEXTURE0 + U);
    const ae = n.get(ne);
    if (ne.version !== ae.__version || k === !0) {
      if (t.activeTexture(i.TEXTURE0 + U), (typeof ImageBitmap < "u" && d.image instanceof ImageBitmap) === !1) {
        const K = Ge.getPrimaries(Ge.workingColorSpace), ue = d.colorSpace === Cn ? null : Ge.getPrimaries(d.colorSpace), me = d.colorSpace === Cn || K === ue ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
        t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, d.flipY), t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, d.premultiplyAlpha), t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, me);
      }
      t.pixelStorei(i.UNPACK_ALIGNMENT, d.unpackAlignment);
      let $ = m(d.image, !1, r.maxTextureSize);
      $ = At(d, $);
      const le = s.convert(d.format, d.colorSpace), Se = s.convert(d.type);
      let he = M(d.internalFormat, le, Se, d.normalized, d.colorSpace, d.isVideoTexture);
      Pe(G, d);
      let ce;
      const Te = d.mipmaps, we = d.isVideoTexture !== !0, Ue = ae.__version === void 0 || k === !0, C = ne.dataReady, re = y(d, $);
      if (d.isDepthTexture)
        he = b(d.format === Hn, d.type), Ue && (we ? t.texStorage2D(i.TEXTURE_2D, 1, he, $.width, $.height) : t.texImage2D(i.TEXTURE_2D, 0, he, $.width, $.height, 0, le, Se, null));
      else if (d.isDataTexture)
        if (Te.length > 0) {
          we && Ue && t.texStorage2D(i.TEXTURE_2D, re, he, Te[0].width, Te[0].height);
          for (let K = 0, ue = Te.length; K < ue; K++)
            ce = Te[K], we ? C && t.texSubImage2D(i.TEXTURE_2D, K, 0, 0, ce.width, ce.height, le, Se, ce.data) : t.texImage2D(i.TEXTURE_2D, K, he, ce.width, ce.height, 0, le, Se, ce.data);
          d.generateMipmaps = !1;
        } else
          we ? (Ue && t.texStorage2D(i.TEXTURE_2D, re, he, $.width, $.height), C && te(d, $, le, Se)) : t.texImage2D(i.TEXTURE_2D, 0, he, $.width, $.height, 0, le, Se, $.data);
      else if (d.isCompressedTexture)
        if (d.isCompressedArrayTexture) {
          we && Ue && t.texStorage3D(i.TEXTURE_2D_ARRAY, re, he, Te[0].width, Te[0].height, $.depth);
          for (let K = 0, ue = Te.length; K < ue; K++)
            if (ce = Te[K], d.format !== kt)
              if (le !== null)
                if (we) {
                  if (C)
                    if (d.layerUpdates.size > 0) {
                      const me = uo(ce.width, ce.height, d.format, d.type);
                      for (const j of d.layerUpdates) {
                        const Me = ce.data.subarray(
                          j * me / ce.data.BYTES_PER_ELEMENT,
                          (j + 1) * me / ce.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, K, 0, 0, j, ce.width, ce.height, 1, le, Me);
                      }
                      d.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, K, 0, 0, 0, ce.width, ce.height, $.depth, le, ce.data);
                } else
                  t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, K, he, ce.width, ce.height, $.depth, 0, ce.data, 0, 0);
              else
                Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              we ? C && t.texSubImage3D(i.TEXTURE_2D_ARRAY, K, 0, 0, 0, ce.width, ce.height, $.depth, le, Se, ce.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, K, he, ce.width, ce.height, $.depth, 0, le, Se, ce.data);
        } else {
          we && Ue && t.texStorage2D(i.TEXTURE_2D, re, he, Te[0].width, Te[0].height);
          for (let K = 0, ue = Te.length; K < ue; K++)
            ce = Te[K], d.format !== kt ? le !== null ? we ? C && t.compressedTexSubImage2D(i.TEXTURE_2D, K, 0, 0, ce.width, ce.height, le, ce.data) : t.compressedTexImage2D(i.TEXTURE_2D, K, he, ce.width, ce.height, 0, ce.data) : Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : we ? C && t.texSubImage2D(i.TEXTURE_2D, K, 0, 0, ce.width, ce.height, le, Se, ce.data) : t.texImage2D(i.TEXTURE_2D, K, he, ce.width, ce.height, 0, le, Se, ce.data);
        }
      else if (d.isDataArrayTexture)
        if (we) {
          if (Ue && t.texStorage3D(i.TEXTURE_2D_ARRAY, re, he, $.width, $.height, $.depth), C)
            if (d.layerUpdates.size > 0) {
              const K = uo($.width, $.height, d.format, d.type);
              for (const ue of d.layerUpdates) {
                const me = $.data.subarray(
                  ue * K / $.data.BYTES_PER_ELEMENT,
                  (ue + 1) * K / $.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, ue, $.width, $.height, 1, le, Se, me);
              }
              d.clearLayerUpdates();
            } else
              t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, $.width, $.height, $.depth, le, Se, $.data);
        } else
          t.texImage3D(i.TEXTURE_2D_ARRAY, 0, he, $.width, $.height, $.depth, 0, le, Se, $.data);
      else if (d.isData3DTexture)
        we ? (Ue && t.texStorage3D(i.TEXTURE_3D, re, he, $.width, $.height, $.depth), C && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, $.width, $.height, $.depth, le, Se, $.data)) : t.texImage3D(i.TEXTURE_3D, 0, he, $.width, $.height, $.depth, 0, le, Se, $.data);
      else if (d.isFramebufferTexture) {
        if (Ue)
          if (we)
            t.texStorage2D(i.TEXTURE_2D, re, he, $.width, $.height);
          else {
            let K = $.width, ue = $.height;
            for (let me = 0; me < re; me++)
              t.texImage2D(i.TEXTURE_2D, me, he, K, ue, 0, le, Se, null), K >>= 1, ue >>= 1;
          }
      } else if (d.isHTMLTexture) {
        if ("texElementImage2D" in i) {
          const K = i.canvas;
          if (K.hasAttribute("layoutsubtree") || K.setAttribute("layoutsubtree", "true"), $.parentNode !== K) {
            K.appendChild($), p.add(d), K.onpaint = (ue) => {
              const me = ue.changedElements;
              for (const j of p)
                me.includes(j.image) && (j.needsUpdate = !0);
            }, K.requestPaint();
            return;
          }
          if (i.texElementImage2D.length === 3)
            i.texElementImage2D(i.TEXTURE_2D, i.RGBA8, $);
          else {
            const me = i.RGBA, j = i.RGBA, Me = i.UNSIGNED_BYTE;
            i.texElementImage2D(i.TEXTURE_2D, 0, me, j, Me, $);
          }
          i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE);
        }
      } else if (Te.length > 0) {
        if (we && Ue) {
          const K = Ye(Te[0]);
          t.texStorage2D(i.TEXTURE_2D, re, he, K.width, K.height);
        }
        for (let K = 0, ue = Te.length; K < ue; K++)
          ce = Te[K], we ? C && t.texSubImage2D(i.TEXTURE_2D, K, 0, 0, le, Se, ce) : t.texImage2D(i.TEXTURE_2D, K, he, le, Se, ce);
        d.generateMipmaps = !1;
      } else if (we) {
        if (Ue) {
          const K = Ye($);
          t.texStorage2D(i.TEXTURE_2D, re, he, K.width, K.height);
        }
        C && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, le, Se, $);
      } else
        t.texImage2D(i.TEXTURE_2D, 0, he, le, Se, $);
      f(d) && A(G), ae.__version = ne.version, d.onUpdate && d.onUpdate(d);
    }
    S.__version = d.version;
  }
  function Ie(S, d, U) {
    if (d.image.length !== 6) return;
    const G = Z(S, d), k = d.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, S.__webglTexture, i.TEXTURE0 + U);
    const ne = n.get(k);
    if (k.version !== ne.__version || G === !0) {
      t.activeTexture(i.TEXTURE0 + U);
      const ae = Ge.getPrimaries(Ge.workingColorSpace), W = d.colorSpace === Cn ? null : Ge.getPrimaries(d.colorSpace), $ = d.colorSpace === Cn || ae === W ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, d.flipY), t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, d.premultiplyAlpha), t.pixelStorei(i.UNPACK_ALIGNMENT, d.unpackAlignment), t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, $);
      const le = d.isCompressedTexture || d.image[0].isCompressedTexture, Se = d.image[0] && d.image[0].isDataTexture, he = [];
      for (let j = 0; j < 6; j++)
        !le && !Se ? he[j] = m(d.image[j], !0, r.maxCubemapSize) : he[j] = Se ? d.image[j].image : d.image[j], he[j] = At(d, he[j]);
      const ce = he[0], Te = s.convert(d.format, d.colorSpace), we = s.convert(d.type), Ue = M(d.internalFormat, Te, we, d.normalized, d.colorSpace), C = d.isVideoTexture !== !0, re = ne.__version === void 0 || G === !0, K = k.dataReady;
      let ue = y(d, ce);
      Pe(i.TEXTURE_CUBE_MAP, d);
      let me;
      if (le) {
        C && re && t.texStorage2D(i.TEXTURE_CUBE_MAP, ue, Ue, ce.width, ce.height);
        for (let j = 0; j < 6; j++) {
          me = he[j].mipmaps;
          for (let Me = 0; Me < me.length; Me++) {
            const xe = me[Me];
            d.format !== kt ? Te !== null ? C ? K && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Me, 0, 0, xe.width, xe.height, Te, xe.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Me, Ue, xe.width, xe.height, 0, xe.data) : Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : C ? K && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Me, 0, 0, xe.width, xe.height, Te, we, xe.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Me, Ue, xe.width, xe.height, 0, Te, we, xe.data);
          }
        }
      } else {
        if (me = d.mipmaps, C && re) {
          me.length > 0 && ue++;
          const j = Ye(he[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, ue, Ue, j.width, j.height);
        }
        for (let j = 0; j < 6; j++)
          if (Se) {
            C ? K && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, he[j].width, he[j].height, Te, we, he[j].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, Ue, he[j].width, he[j].height, 0, Te, we, he[j].data);
            for (let Me = 0; Me < me.length; Me++) {
              const it = me[Me].image[j].image;
              C ? K && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Me + 1, 0, 0, it.width, it.height, Te, we, it.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Me + 1, Ue, it.width, it.height, 0, Te, we, it.data);
            }
          } else {
            C ? K && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, Te, we, he[j]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, Ue, Te, we, he[j]);
            for (let Me = 0; Me < me.length; Me++) {
              const xe = me[Me];
              C ? K && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Me + 1, 0, 0, Te, we, xe.image[j]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, Me + 1, Ue, Te, we, xe.image[j]);
            }
          }
      }
      f(d) && A(i.TEXTURE_CUBE_MAP), ne.__version = k.version, d.onUpdate && d.onUpdate(d);
    }
    S.__version = d.version;
  }
  function Ae(S, d, U, G, k, ne) {
    const ae = s.convert(U.format, U.colorSpace), W = s.convert(U.type), $ = M(U.internalFormat, ae, W, U.normalized, U.colorSpace), le = n.get(d), Se = n.get(U);
    if (Se.__renderTarget = d, !le.__hasExternalTextures) {
      const he = Math.max(1, d.width >> ne), ce = Math.max(1, d.height >> ne);
      k === i.TEXTURE_3D || k === i.TEXTURE_2D_ARRAY ? t.texImage3D(k, ne, $, he, ce, d.depth, 0, ae, W, null) : t.texImage2D(k, ne, $, he, ce, 0, ae, W, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, S), ut(d) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, G, k, Se.__webglTexture, 0, nt(d)) : (k === i.TEXTURE_2D || k >= i.TEXTURE_CUBE_MAP_POSITIVE_X && k <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, G, k, Se.__webglTexture, ne), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function at(S, d, U) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, S), d.depthBuffer) {
      const G = d.depthTexture, k = G && G.isDepthTexture ? G.type : null, ne = b(d.stencilBuffer, k), ae = d.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
      ut(d) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, nt(d), ne, d.width, d.height) : U ? i.renderbufferStorageMultisample(i.RENDERBUFFER, nt(d), ne, d.width, d.height) : i.renderbufferStorage(i.RENDERBUFFER, ne, d.width, d.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, ae, i.RENDERBUFFER, S);
    } else {
      const G = d.textures;
      for (let k = 0; k < G.length; k++) {
        const ne = G[k], ae = s.convert(ne.format, ne.colorSpace), W = s.convert(ne.type), $ = M(ne.internalFormat, ae, W, ne.normalized, ne.colorSpace);
        ut(d) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, nt(d), $, d.width, d.height) : U ? i.renderbufferStorageMultisample(i.RENDERBUFFER, nt(d), $, d.width, d.height) : i.renderbufferStorage(i.RENDERBUFFER, $, d.width, d.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function ze(S, d, U) {
    const G = d.isWebGLCubeRenderTarget === !0;
    if (t.bindFramebuffer(i.FRAMEBUFFER, S), !(d.depthTexture && d.depthTexture.isDepthTexture))
      throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
    const k = n.get(d.depthTexture);
    if (k.__renderTarget = d, (!k.__webglTexture || d.depthTexture.image.width !== d.width || d.depthTexture.image.height !== d.height) && (d.depthTexture.image.width = d.width, d.depthTexture.image.height = d.height, d.depthTexture.needsUpdate = !0), G) {
      if (k.__webglInit === void 0 && (k.__webglInit = !0, d.depthTexture.addEventListener("dispose", R)), k.__webglTexture === void 0) {
        k.__webglTexture = i.createTexture(), t.bindTexture(i.TEXTURE_CUBE_MAP, k.__webglTexture), Pe(i.TEXTURE_CUBE_MAP, d.depthTexture);
        const le = s.convert(d.depthTexture.format), Se = s.convert(d.depthTexture.type);
        let he;
        d.depthTexture.format === xn ? he = i.DEPTH_COMPONENT24 : d.depthTexture.format === Hn && (he = i.DEPTH24_STENCIL8);
        for (let ce = 0; ce < 6; ce++)
          i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ce, 0, he, d.width, d.height, 0, le, Se, null);
      }
    } else
      J(d.depthTexture, 0);
    const ne = k.__webglTexture, ae = nt(d), W = G ? i.TEXTURE_CUBE_MAP_POSITIVE_X + U : i.TEXTURE_2D, $ = d.depthTexture.format === Hn ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
    if (d.depthTexture.format === xn)
      ut(d) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, $, W, ne, 0, ae) : i.framebufferTexture2D(i.FRAMEBUFFER, $, W, ne, 0);
    else if (d.depthTexture.format === Hn)
      ut(d) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, $, W, ne, 0, ae) : i.framebufferTexture2D(i.FRAMEBUFFER, $, W, ne, 0);
    else
      throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
  }
  function $e(S) {
    const d = n.get(S), U = S.isWebGLCubeRenderTarget === !0;
    if (d.__boundDepthTexture !== S.depthTexture) {
      const G = S.depthTexture;
      if (d.__depthDisposeCallback && d.__depthDisposeCallback(), G) {
        const k = () => {
          delete d.__boundDepthTexture, delete d.__depthDisposeCallback, G.removeEventListener("dispose", k);
        };
        G.addEventListener("dispose", k), d.__depthDisposeCallback = k;
      }
      d.__boundDepthTexture = G;
    }
    if (S.depthTexture && !d.__autoAllocateDepthBuffer)
      if (U)
        for (let G = 0; G < 6; G++)
          ze(d.__webglFramebuffer[G], S, G);
      else {
        const G = S.texture.mipmaps;
        G && G.length > 0 ? ze(d.__webglFramebuffer[0], S, 0) : ze(d.__webglFramebuffer, S, 0);
      }
    else if (U) {
      d.__webglDepthbuffer = [];
      for (let G = 0; G < 6; G++)
        if (t.bindFramebuffer(i.FRAMEBUFFER, d.__webglFramebuffer[G]), d.__webglDepthbuffer[G] === void 0)
          d.__webglDepthbuffer[G] = i.createRenderbuffer(), at(d.__webglDepthbuffer[G], S, !1);
        else {
          const k = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ne = d.__webglDepthbuffer[G];
          i.bindRenderbuffer(i.RENDERBUFFER, ne), i.framebufferRenderbuffer(i.FRAMEBUFFER, k, i.RENDERBUFFER, ne);
        }
    } else {
      const G = S.texture.mipmaps;
      if (G && G.length > 0 ? t.bindFramebuffer(i.FRAMEBUFFER, d.__webglFramebuffer[0]) : t.bindFramebuffer(i.FRAMEBUFFER, d.__webglFramebuffer), d.__webglDepthbuffer === void 0)
        d.__webglDepthbuffer = i.createRenderbuffer(), at(d.__webglDepthbuffer, S, !1);
      else {
        const k = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ne = d.__webglDepthbuffer;
        i.bindRenderbuffer(i.RENDERBUFFER, ne), i.framebufferRenderbuffer(i.FRAMEBUFFER, k, i.RENDERBUFFER, ne);
      }
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function qe(S, d, U) {
    const G = n.get(S);
    d !== void 0 && Ae(G.__webglFramebuffer, S, S.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), U !== void 0 && $e(S);
  }
  function ke(S) {
    const d = S.texture, U = n.get(S), G = n.get(d);
    S.addEventListener("dispose", _);
    const k = S.textures, ne = S.isWebGLCubeRenderTarget === !0, ae = k.length > 1;
    if (ae || (G.__webglTexture === void 0 && (G.__webglTexture = i.createTexture()), G.__version = d.version, a.memory.textures++), ne) {
      U.__webglFramebuffer = [];
      for (let W = 0; W < 6; W++)
        if (d.mipmaps && d.mipmaps.length > 0) {
          U.__webglFramebuffer[W] = [];
          for (let $ = 0; $ < d.mipmaps.length; $++)
            U.__webglFramebuffer[W][$] = i.createFramebuffer();
        } else
          U.__webglFramebuffer[W] = i.createFramebuffer();
    } else {
      if (d.mipmaps && d.mipmaps.length > 0) {
        U.__webglFramebuffer = [];
        for (let W = 0; W < d.mipmaps.length; W++)
          U.__webglFramebuffer[W] = i.createFramebuffer();
      } else
        U.__webglFramebuffer = i.createFramebuffer();
      if (ae)
        for (let W = 0, $ = k.length; W < $; W++) {
          const le = n.get(k[W]);
          le.__webglTexture === void 0 && (le.__webglTexture = i.createTexture(), a.memory.textures++);
        }
      if (S.samples > 0 && ut(S) === !1) {
        U.__webglMultisampledFramebuffer = i.createFramebuffer(), U.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, U.__webglMultisampledFramebuffer);
        for (let W = 0; W < k.length; W++) {
          const $ = k[W];
          U.__webglColorRenderbuffer[W] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, U.__webglColorRenderbuffer[W]);
          const le = s.convert($.format, $.colorSpace), Se = s.convert($.type), he = M($.internalFormat, le, Se, $.normalized, $.colorSpace, S.isXRRenderTarget === !0), ce = nt(S);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, ce, he, S.width, S.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + W, i.RENDERBUFFER, U.__webglColorRenderbuffer[W]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), S.depthBuffer && (U.__webglDepthRenderbuffer = i.createRenderbuffer(), at(U.__webglDepthRenderbuffer, S, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (ne) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, G.__webglTexture), Pe(i.TEXTURE_CUBE_MAP, d);
      for (let W = 0; W < 6; W++)
        if (d.mipmaps && d.mipmaps.length > 0)
          for (let $ = 0; $ < d.mipmaps.length; $++)
            Ae(U.__webglFramebuffer[W][$], S, d, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + W, $);
        else
          Ae(U.__webglFramebuffer[W], S, d, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + W, 0);
      f(d) && A(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (ae) {
      for (let W = 0, $ = k.length; W < $; W++) {
        const le = k[W], Se = n.get(le);
        let he = i.TEXTURE_2D;
        (S.isWebGL3DRenderTarget || S.isWebGLArrayRenderTarget) && (he = S.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(he, Se.__webglTexture), Pe(he, le), Ae(U.__webglFramebuffer, S, le, i.COLOR_ATTACHMENT0 + W, he, 0), f(le) && A(he);
      }
      t.unbindTexture();
    } else {
      let W = i.TEXTURE_2D;
      if ((S.isWebGL3DRenderTarget || S.isWebGLArrayRenderTarget) && (W = S.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(W, G.__webglTexture), Pe(W, d), d.mipmaps && d.mipmaps.length > 0)
        for (let $ = 0; $ < d.mipmaps.length; $++)
          Ae(U.__webglFramebuffer[$], S, d, i.COLOR_ATTACHMENT0, W, $);
      else
        Ae(U.__webglFramebuffer, S, d, i.COLOR_ATTACHMENT0, W, 0);
      f(d) && A(W), t.unbindTexture();
    }
    S.depthBuffer && $e(S);
  }
  function ct(S) {
    const d = S.textures;
    for (let U = 0, G = d.length; U < G; U++) {
      const k = d[U];
      if (f(k)) {
        const ne = w(S), ae = n.get(k).__webglTexture;
        t.bindTexture(ne, ae), A(ne), t.unbindTexture();
      }
    }
  }
  const ft = [], mt = [];
  function _t(S) {
    if (S.samples > 0) {
      if (ut(S) === !1) {
        const d = S.textures, U = S.width, G = S.height;
        let k = i.COLOR_BUFFER_BIT;
        const ne = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ae = n.get(S), W = d.length > 1;
        if (W)
          for (let le = 0; le < d.length; le++)
            t.bindFramebuffer(i.FRAMEBUFFER, ae.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + le, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, ae.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + le, i.TEXTURE_2D, null, 0);
        t.bindFramebuffer(i.READ_FRAMEBUFFER, ae.__webglMultisampledFramebuffer);
        const $ = S.texture.mipmaps;
        $ && $.length > 0 ? t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ae.__webglFramebuffer[0]) : t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ae.__webglFramebuffer);
        for (let le = 0; le < d.length; le++) {
          if (S.resolveDepthBuffer && (S.depthBuffer && (k |= i.DEPTH_BUFFER_BIT), S.stencilBuffer && S.resolveStencilBuffer && (k |= i.STENCIL_BUFFER_BIT)), W) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, ae.__webglColorRenderbuffer[le]);
            const Se = n.get(d[le]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Se, 0);
          }
          i.blitFramebuffer(0, 0, U, G, 0, 0, U, G, k, i.NEAREST), c === !0 && (ft.length = 0, mt.length = 0, ft.push(i.COLOR_ATTACHMENT0 + le), S.depthBuffer && S.resolveDepthBuffer === !1 && (ft.push(ne), mt.push(ne), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, mt)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, ft));
        }
        if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), W)
          for (let le = 0; le < d.length; le++) {
            t.bindFramebuffer(i.FRAMEBUFFER, ae.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + le, i.RENDERBUFFER, ae.__webglColorRenderbuffer[le]);
            const Se = n.get(d[le]).__webglTexture;
            t.bindFramebuffer(i.FRAMEBUFFER, ae.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + le, i.TEXTURE_2D, Se, 0);
          }
        t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ae.__webglMultisampledFramebuffer);
      } else if (S.depthBuffer && S.resolveDepthBuffer === !1 && c) {
        const d = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [d]);
      }
    }
  }
  function nt(S) {
    return Math.min(r.maxSamples, S.samples);
  }
  function ut(S) {
    const d = n.get(S);
    return S.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && d.__useRenderToTexture !== !1;
  }
  function L(S) {
    const d = a.render.frame;
    h.get(S) !== d && (h.set(S, d), S.update());
  }
  function At(S, d) {
    const U = S.colorSpace, G = S.format, k = S.type;
    return S.isCompressedTexture === !0 || S.isVideoTexture === !0 || U !== vr && U !== Cn && (Ge.getTransfer(U) === Ze ? (G !== kt || k !== Dt) && Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Xe("WebGLTextures: Unsupported texture color space:", U)), d;
  }
  function Ye(S) {
    return typeof HTMLImageElement < "u" && S instanceof HTMLImageElement ? (l.width = S.naturalWidth || S.width, l.height = S.naturalHeight || S.height) : typeof VideoFrame < "u" && S instanceof VideoFrame ? (l.width = S.displayWidth, l.height = S.displayHeight) : (l.width = S.width, l.height = S.height), l;
  }
  this.allocateTextureUnit = X, this.resetTextureUnits = q, this.getTextureUnits = Y, this.setTextureUnits = O, this.setTexture2D = J, this.setTexture2DArray = ee, this.setTexture3D = oe, this.setTextureCube = se, this.rebindTextures = qe, this.setupRenderTarget = ke, this.updateRenderTargetMipmap = ct, this.updateMultisampleRenderTarget = _t, this.setupDepthRenderbuffer = $e, this.setupFrameBufferTexture = Ae, this.useMultisampledRTT = ut, this.isReversedDepthBuffer = function() {
    return t.buffers.depth.getReversed();
  };
}
function em(i, e) {
  function t(n, r = Cn) {
    let s;
    const a = Ge.getTransfer(r);
    if (n === Dt) return i.UNSIGNED_BYTE;
    if (n === sa) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === aa) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === Qo) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === jo) return i.UNSIGNED_INT_10F_11F_11F_REV;
    if (n === $o) return i.BYTE;
    if (n === Jo) return i.SHORT;
    if (n === Ii) return i.UNSIGNED_SHORT;
    if (n === ra) return i.INT;
    if (n === nn) return i.UNSIGNED_INT;
    if (n === Jt) return i.FLOAT;
    if (n === _n) return i.HALF_FLOAT;
    if (n === el) return i.ALPHA;
    if (n === tl) return i.RGB;
    if (n === kt) return i.RGBA;
    if (n === xn) return i.DEPTH_COMPONENT;
    if (n === Hn) return i.DEPTH_STENCIL;
    if (n === nl) return i.RED;
    if (n === oa) return i.RED_INTEGER;
    if (n === Wn) return i.RG;
    if (n === la) return i.RG_INTEGER;
    if (n === ca) return i.RGBA_INTEGER;
    if (n === ur || n === hr || n === fr || n === dr)
      if (a === Ze)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === ur) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === hr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === fr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === dr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === ur) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === hr) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === fr) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === dr) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === ys || n === Ts || n === bs || n === As)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === ys) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === Ts) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === bs) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === As) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === ws || n === Rs || n === Cs || n === Ps || n === Ls || n === _r || n === Ds)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === ws || n === Rs) return a === Ze ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === Cs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === Ps) return s.COMPRESSED_R11_EAC;
        if (n === Ls) return s.COMPRESSED_SIGNED_R11_EAC;
        if (n === _r) return s.COMPRESSED_RG11_EAC;
        if (n === Ds) return s.COMPRESSED_SIGNED_RG11_EAC;
      } else
        return null;
    if (n === Is || n === Us || n === Ns || n === Fs || n === Os || n === Bs || n === zs || n === Gs || n === Vs || n === Hs || n === ks || n === Ws || n === Xs || n === qs)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === Is) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === Us) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === Ns) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === Fs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === Os) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === Bs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === zs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === Gs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === Vs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === Hs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === ks) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === Ws) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === Xs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === qs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === Ys || n === Zs || n === Ks)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === Ys) return a === Ze ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === Zs) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === Ks) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === $s || n === Js || n === xr || n === Qs)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === $s) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === Js) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === xr) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === Qs) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === Ui ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
const tm = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, nm = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class im {
  /**
   * Constructs a new depth sensing module.
   */
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  /**
   * Inits the depth sensing module
   *
   * @param {XRWebGLDepthInformation} depthData - The XR depth data.
   * @param {XRRenderState} renderState - The XR render state.
   */
  init(e, t) {
    if (this.texture === null) {
      const n = new hl(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
    }
  }
  /**
   * Returns a plane mesh that visualizes the depth texture.
   *
   * @param {ArrayCamera} cameraXR - The XR camera.
   * @return {?Mesh} The plane mesh.
   */
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new rn({
        vertexShader: tm,
        fragmentShader: nm,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Wt(new zi(20, 20), n);
    }
    return this.mesh;
  }
  /**
   * Resets the module
   */
  reset() {
    this.texture = null, this.mesh = null;
  }
  /**
   * Returns a texture representing the depth of the user's environment.
   *
   * @return {?ExternalTexture} The depth texture.
   */
  getDepthTexture() {
    return this.texture;
  }
}
class rm extends Xn {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGL2RenderingContext} gl - The rendering context.
   */
  constructor(e, t) {
    super();
    const n = this;
    let r = null, s = 1, a = null, o = "local-floor", c = 1, l = null, h = null, p = null, u = null, g = null, v = null;
    const E = typeof XRWebGLBinding < "u", m = new im(), f = {}, A = t.getContextAttributes();
    let w = null, M = null;
    const b = [], y = [], R = new He();
    let _ = null;
    const T = new Ot();
    T.viewport = new tt();
    const I = new Ot();
    I.viewport = new tt();
    const P = [T, I], N = new hu();
    let q = null, Y = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Z) {
      let ie = b[Z];
      return ie === void 0 && (ie = new Hr(), b[Z] = ie), ie.getTargetRaySpace();
    }, this.getControllerGrip = function(Z) {
      let ie = b[Z];
      return ie === void 0 && (ie = new Hr(), b[Z] = ie), ie.getGripSpace();
    }, this.getHand = function(Z) {
      let ie = b[Z];
      return ie === void 0 && (ie = new Hr(), b[Z] = ie), ie.getHandSpace();
    };
    function O(Z) {
      const ie = y.indexOf(Z.inputSource);
      if (ie === -1)
        return;
      const te = b[ie];
      te !== void 0 && (te.update(Z.inputSource, Z.frame, l || a), te.dispatchEvent({ type: Z.type, data: Z.inputSource }));
    }
    function X() {
      r.removeEventListener("select", O), r.removeEventListener("selectstart", O), r.removeEventListener("selectend", O), r.removeEventListener("squeeze", O), r.removeEventListener("squeezestart", O), r.removeEventListener("squeezeend", O), r.removeEventListener("end", X), r.removeEventListener("inputsourceschange", V);
      for (let Z = 0; Z < b.length; Z++) {
        const ie = y[Z];
        ie !== null && (y[Z] = null, b[Z].disconnect(ie));
      }
      q = null, Y = null, m.reset();
      for (const Z in f)
        delete f[Z];
      e.setRenderTarget(w), g = null, u = null, p = null, r = null, M = null, Pe.stop(), n.isPresenting = !1, e.setPixelRatio(_), e.setSize(R.width, R.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(Z) {
      s = Z, n.isPresenting === !0 && Ce("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(Z) {
      o = Z, n.isPresenting === !0 && Ce("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return l || a;
    }, this.setReferenceSpace = function(Z) {
      l = Z;
    }, this.getBaseLayer = function() {
      return u !== null ? u : g;
    }, this.getBinding = function() {
      return p === null && E && (p = new XRWebGLBinding(r, t)), p;
    }, this.getFrame = function() {
      return v;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(Z) {
      if (r = Z, r !== null) {
        if (w = e.getRenderTarget(), r.addEventListener("select", O), r.addEventListener("selectstart", O), r.addEventListener("selectend", O), r.addEventListener("squeeze", O), r.addEventListener("squeezestart", O), r.addEventListener("squeezeend", O), r.addEventListener("end", X), r.addEventListener("inputsourceschange", V), A.xrCompatible !== !0 && await t.makeXRCompatible(), _ = e.getPixelRatio(), e.getSize(R), E && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let te = null, Le = null, Ie = null;
          A.depth && (Ie = A.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, te = A.stencil ? Hn : xn, Le = A.stencil ? Ui : nn);
          const Ae = {
            colorFormat: t.RGBA8,
            depthFormat: Ie,
            scaleFactor: s
          };
          p = this.getBinding(), u = p.createProjectionLayer(Ae), r.updateRenderState({ layers: [u] }), e.setPixelRatio(1), e.setSize(u.textureWidth, u.textureHeight, !1), M = new en(
            u.textureWidth,
            u.textureHeight,
            {
              format: kt,
              type: Dt,
              depthTexture: new gi(u.textureWidth, u.textureHeight, Le, void 0, void 0, void 0, void 0, void 0, void 0, te),
              stencilBuffer: A.stencil,
              colorSpace: e.outputColorSpace,
              samples: A.antialias ? 4 : 0,
              resolveDepthBuffer: u.ignoreDepthValues === !1,
              resolveStencilBuffer: u.ignoreDepthValues === !1
            }
          );
        } else {
          const te = {
            antialias: A.antialias,
            alpha: !0,
            depth: A.depth,
            stencil: A.stencil,
            framebufferScaleFactor: s
          };
          g = new XRWebGLLayer(r, t, te), r.updateRenderState({ baseLayer: g }), e.setPixelRatio(1), e.setSize(g.framebufferWidth, g.framebufferHeight, !1), M = new en(
            g.framebufferWidth,
            g.framebufferHeight,
            {
              format: kt,
              type: Dt,
              colorSpace: e.outputColorSpace,
              stencilBuffer: A.stencil,
              resolveDepthBuffer: g.ignoreDepthValues === !1,
              resolveStencilBuffer: g.ignoreDepthValues === !1
            }
          );
        }
        M.isXRRenderTarget = !0, this.setFoveation(c), l = null, a = await r.requestReferenceSpace(o), Pe.setContext(r), Pe.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return m.getDepthTexture();
    };
    function V(Z) {
      for (let ie = 0; ie < Z.removed.length; ie++) {
        const te = Z.removed[ie], Le = y.indexOf(te);
        Le >= 0 && (y[Le] = null, b[Le].disconnect(te));
      }
      for (let ie = 0; ie < Z.added.length; ie++) {
        const te = Z.added[ie];
        let Le = y.indexOf(te);
        if (Le === -1) {
          for (let Ae = 0; Ae < b.length; Ae++)
            if (Ae >= y.length) {
              y.push(te), Le = Ae;
              break;
            } else if (y[Ae] === null) {
              y[Ae] = te, Le = Ae;
              break;
            }
          if (Le === -1) break;
        }
        const Ie = b[Le];
        Ie && Ie.connect(te);
      }
    }
    const J = new z(), ee = new z();
    function oe(Z, ie, te) {
      J.setFromMatrixPosition(ie.matrixWorld), ee.setFromMatrixPosition(te.matrixWorld);
      const Le = J.distanceTo(ee), Ie = ie.projectionMatrix.elements, Ae = te.projectionMatrix.elements, at = Ie[14] / (Ie[10] - 1), ze = Ie[14] / (Ie[10] + 1), $e = (Ie[9] + 1) / Ie[5], qe = (Ie[9] - 1) / Ie[5], ke = (Ie[8] - 1) / Ie[0], ct = (Ae[8] + 1) / Ae[0], ft = at * ke, mt = at * ct, _t = Le / (-ke + ct), nt = _t * -ke;
      if (ie.matrixWorld.decompose(Z.position, Z.quaternion, Z.scale), Z.translateX(nt), Z.translateZ(_t), Z.matrixWorld.compose(Z.position, Z.quaternion, Z.scale), Z.matrixWorldInverse.copy(Z.matrixWorld).invert(), Ie[10] === -1)
        Z.projectionMatrix.copy(ie.projectionMatrix), Z.projectionMatrixInverse.copy(ie.projectionMatrixInverse);
      else {
        const ut = at + _t, L = ze + _t, At = ft - nt, Ye = mt + (Le - nt), S = $e * ze / L * ut, d = qe * ze / L * ut;
        Z.projectionMatrix.makePerspective(At, Ye, S, d, ut, L), Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert();
      }
    }
    function se(Z, ie) {
      ie === null ? Z.matrixWorld.copy(Z.matrix) : Z.matrixWorld.multiplyMatrices(ie.matrixWorld, Z.matrix), Z.matrixWorldInverse.copy(Z.matrixWorld).invert();
    }
    this.updateCamera = function(Z) {
      if (r === null) return;
      let ie = Z.near, te = Z.far;
      m.texture !== null && (m.depthNear > 0 && (ie = m.depthNear), m.depthFar > 0 && (te = m.depthFar)), N.near = I.near = T.near = ie, N.far = I.far = T.far = te, (q !== N.near || Y !== N.far) && (r.updateRenderState({
        depthNear: N.near,
        depthFar: N.far
      }), q = N.near, Y = N.far), N.layers.mask = Z.layers.mask | 6, T.layers.mask = N.layers.mask & -5, I.layers.mask = N.layers.mask & -3;
      const Le = Z.parent, Ie = N.cameras;
      se(N, Le);
      for (let Ae = 0; Ae < Ie.length; Ae++)
        se(Ie[Ae], Le);
      Ie.length === 2 ? oe(N, T, I) : N.projectionMatrix.copy(T.projectionMatrix), Q(Z, N, Le);
    };
    function Q(Z, ie, te) {
      te === null ? Z.matrix.copy(ie.matrixWorld) : (Z.matrix.copy(te.matrixWorld), Z.matrix.invert(), Z.matrix.multiply(ie.matrixWorld)), Z.matrix.decompose(Z.position, Z.quaternion, Z.scale), Z.updateMatrixWorld(!0), Z.projectionMatrix.copy(ie.projectionMatrix), Z.projectionMatrixInverse.copy(ie.projectionMatrixInverse), Z.isPerspectiveCamera && (Z.fov = ea * 2 * Math.atan(1 / Z.projectionMatrix.elements[5]), Z.zoom = 1);
    }
    this.getCamera = function() {
      return N;
    }, this.getFoveation = function() {
      if (!(u === null && g === null))
        return c;
    }, this.setFoveation = function(Z) {
      c = Z, u !== null && (u.fixedFoveation = Z), g !== null && g.fixedFoveation !== void 0 && (g.fixedFoveation = Z);
    }, this.hasDepthSensing = function() {
      return m.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return m.getMesh(N);
    }, this.getCameraTexture = function(Z) {
      return f[Z];
    };
    let be = null;
    function Re(Z, ie) {
      if (h = ie.getViewerPose(l || a), v = ie, h !== null) {
        const te = h.views;
        g !== null && (e.setRenderTargetFramebuffer(M, g.framebuffer), e.setRenderTarget(M));
        let Le = !1;
        te.length !== N.cameras.length && (N.cameras.length = 0, Le = !0);
        for (let ze = 0; ze < te.length; ze++) {
          const $e = te[ze];
          let qe = null;
          if (g !== null)
            qe = g.getViewport($e);
          else {
            const ct = p.getViewSubImage(u, $e);
            qe = ct.viewport, ze === 0 && (e.setRenderTargetTextures(
              M,
              ct.colorTexture,
              ct.depthStencilTexture
            ), e.setRenderTarget(M));
          }
          let ke = P[ze];
          ke === void 0 && (ke = new Ot(), ke.layers.enable(ze), ke.viewport = new tt(), P[ze] = ke), ke.matrix.fromArray($e.transform.matrix), ke.matrix.decompose(ke.position, ke.quaternion, ke.scale), ke.projectionMatrix.fromArray($e.projectionMatrix), ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(), ke.viewport.set(qe.x, qe.y, qe.width, qe.height), ze === 0 && (N.matrix.copy(ke.matrix), N.matrix.decompose(N.position, N.quaternion, N.scale)), Le === !0 && N.cameras.push(ke);
        }
        const Ie = r.enabledFeatures;
        if (Ie && Ie.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && E) {
          p = n.getBinding();
          const ze = p.getDepthInformation(te[0]);
          ze && ze.isValid && ze.texture && m.init(ze, r.renderState);
        }
        if (Ie && Ie.includes("camera-access") && E) {
          e.state.unbindTexture(), p = n.getBinding();
          for (let ze = 0; ze < te.length; ze++) {
            const $e = te[ze].camera;
            if ($e) {
              let qe = f[$e];
              qe || (qe = new hl(), f[$e] = qe);
              const ke = p.getCameraImage($e);
              qe.sourceTexture = ke;
            }
          }
        }
      }
      for (let te = 0; te < b.length; te++) {
        const Le = y[te], Ie = b[te];
        Le !== null && Ie !== void 0 && Ie.update(Le, ie, l || a);
      }
      be && be(Z, ie), ie.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: ie }), v = null;
    }
    const Pe = new ml();
    Pe.setAnimationLoop(Re), this.setAnimationLoop = function(Z) {
      be = Z;
    }, this.dispose = function() {
    };
  }
}
const sm = /* @__PURE__ */ new st(), El = /* @__PURE__ */ new De();
El.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function am(i, e) {
  function t(m, f) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), f.value.copy(m.matrix);
  }
  function n(m, f) {
    f.color.getRGB(m.fogColor.value, fl(i)), f.isFog ? (m.fogNear.value = f.near, m.fogFar.value = f.far) : f.isFogExp2 && (m.fogDensity.value = f.density);
  }
  function r(m, f, A, w, M) {
    f.isNodeMaterial ? f.uniformsNeedUpdate = !1 : f.isMeshBasicMaterial ? s(m, f) : f.isMeshLambertMaterial ? (s(m, f), f.envMap && (m.envMapIntensity.value = f.envMapIntensity)) : f.isMeshToonMaterial ? (s(m, f), p(m, f)) : f.isMeshPhongMaterial ? (s(m, f), h(m, f), f.envMap && (m.envMapIntensity.value = f.envMapIntensity)) : f.isMeshStandardMaterial ? (s(m, f), u(m, f), f.isMeshPhysicalMaterial && g(m, f, M)) : f.isMeshMatcapMaterial ? (s(m, f), v(m, f)) : f.isMeshDepthMaterial ? s(m, f) : f.isMeshDistanceMaterial ? (s(m, f), E(m, f)) : f.isMeshNormalMaterial ? s(m, f) : f.isLineBasicMaterial ? (a(m, f), f.isLineDashedMaterial && o(m, f)) : f.isPointsMaterial ? c(m, f, A, w) : f.isSpriteMaterial ? l(m, f) : f.isShadowMaterial ? (m.color.value.copy(f.color), m.opacity.value = f.opacity) : f.isShaderMaterial && (f.uniformsNeedUpdate = !1);
  }
  function s(m, f) {
    m.opacity.value = f.opacity, f.color && m.diffuse.value.copy(f.color), f.emissive && m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity), f.map && (m.map.value = f.map, t(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, t(f.alphaMap, m.alphaMapTransform)), f.bumpMap && (m.bumpMap.value = f.bumpMap, t(f.bumpMap, m.bumpMapTransform), m.bumpScale.value = f.bumpScale, f.side === Rt && (m.bumpScale.value *= -1)), f.normalMap && (m.normalMap.value = f.normalMap, t(f.normalMap, m.normalMapTransform), m.normalScale.value.copy(f.normalScale), f.side === Rt && m.normalScale.value.negate()), f.displacementMap && (m.displacementMap.value = f.displacementMap, t(f.displacementMap, m.displacementMapTransform), m.displacementScale.value = f.displacementScale, m.displacementBias.value = f.displacementBias), f.emissiveMap && (m.emissiveMap.value = f.emissiveMap, t(f.emissiveMap, m.emissiveMapTransform)), f.specularMap && (m.specularMap.value = f.specularMap, t(f.specularMap, m.specularMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
    const A = e.get(f), w = A.envMap, M = A.envMapRotation;
    w && (m.envMap.value = w, m.envMapRotation.value.setFromMatrix4(sm.makeRotationFromEuler(M)).transpose(), w.isCubeTexture && w.isRenderTargetTexture === !1 && m.envMapRotation.value.premultiply(El), m.reflectivity.value = f.reflectivity, m.ior.value = f.ior, m.refractionRatio.value = f.refractionRatio), f.lightMap && (m.lightMap.value = f.lightMap, m.lightMapIntensity.value = f.lightMapIntensity, t(f.lightMap, m.lightMapTransform)), f.aoMap && (m.aoMap.value = f.aoMap, m.aoMapIntensity.value = f.aoMapIntensity, t(f.aoMap, m.aoMapTransform));
  }
  function a(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, f.map && (m.map.value = f.map, t(f.map, m.mapTransform));
  }
  function o(m, f) {
    m.dashSize.value = f.dashSize, m.totalSize.value = f.dashSize + f.gapSize, m.scale.value = f.scale;
  }
  function c(m, f, A, w) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.size.value = f.size * A, m.scale.value = w * 0.5, f.map && (m.map.value = f.map, t(f.map, m.uvTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, t(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function l(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.rotation.value = f.rotation, f.map && (m.map.value = f.map, t(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, t(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function h(m, f) {
    m.specular.value.copy(f.specular), m.shininess.value = Math.max(f.shininess, 1e-4);
  }
  function p(m, f) {
    f.gradientMap && (m.gradientMap.value = f.gradientMap);
  }
  function u(m, f) {
    m.metalness.value = f.metalness, f.metalnessMap && (m.metalnessMap.value = f.metalnessMap, t(f.metalnessMap, m.metalnessMapTransform)), m.roughness.value = f.roughness, f.roughnessMap && (m.roughnessMap.value = f.roughnessMap, t(f.roughnessMap, m.roughnessMapTransform)), f.envMap && (m.envMapIntensity.value = f.envMapIntensity);
  }
  function g(m, f, A) {
    m.ior.value = f.ior, f.sheen > 0 && (m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen), m.sheenRoughness.value = f.sheenRoughness, f.sheenColorMap && (m.sheenColorMap.value = f.sheenColorMap, t(f.sheenColorMap, m.sheenColorMapTransform)), f.sheenRoughnessMap && (m.sheenRoughnessMap.value = f.sheenRoughnessMap, t(f.sheenRoughnessMap, m.sheenRoughnessMapTransform))), f.clearcoat > 0 && (m.clearcoat.value = f.clearcoat, m.clearcoatRoughness.value = f.clearcoatRoughness, f.clearcoatMap && (m.clearcoatMap.value = f.clearcoatMap, t(f.clearcoatMap, m.clearcoatMapTransform)), f.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap, t(f.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), f.clearcoatNormalMap && (m.clearcoatNormalMap.value = f.clearcoatNormalMap, t(f.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale), f.side === Rt && m.clearcoatNormalScale.value.negate())), f.dispersion > 0 && (m.dispersion.value = f.dispersion), f.iridescence > 0 && (m.iridescence.value = f.iridescence, m.iridescenceIOR.value = f.iridescenceIOR, m.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1], f.iridescenceMap && (m.iridescenceMap.value = f.iridescenceMap, t(f.iridescenceMap, m.iridescenceMapTransform)), f.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = f.iridescenceThicknessMap, t(f.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), f.transmission > 0 && (m.transmission.value = f.transmission, m.transmissionSamplerMap.value = A.texture, m.transmissionSamplerSize.value.set(A.width, A.height), f.transmissionMap && (m.transmissionMap.value = f.transmissionMap, t(f.transmissionMap, m.transmissionMapTransform)), m.thickness.value = f.thickness, f.thicknessMap && (m.thicknessMap.value = f.thicknessMap, t(f.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = f.attenuationDistance, m.attenuationColor.value.copy(f.attenuationColor)), f.anisotropy > 0 && (m.anisotropyVector.value.set(f.anisotropy * Math.cos(f.anisotropyRotation), f.anisotropy * Math.sin(f.anisotropyRotation)), f.anisotropyMap && (m.anisotropyMap.value = f.anisotropyMap, t(f.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = f.specularIntensity, m.specularColor.value.copy(f.specularColor), f.specularColorMap && (m.specularColorMap.value = f.specularColorMap, t(f.specularColorMap, m.specularColorMapTransform)), f.specularIntensityMap && (m.specularIntensityMap.value = f.specularIntensityMap, t(f.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function v(m, f) {
    f.matcap && (m.matcap.value = f.matcap);
  }
  function E(m, f) {
    const A = e.get(f).light;
    m.referencePosition.value.setFromMatrixPosition(A.matrixWorld), m.nearDistance.value = A.shadow.camera.near, m.farDistance.value = A.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function om(i, e, t, n) {
  let r = {}, s = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(M, b) {
    const y = b.program;
    n.uniformBlockBinding(M, y);
  }
  function l(M, b) {
    let y = r[M.id];
    y === void 0 && (m(M), y = h(M), r[M.id] = y, M.addEventListener("dispose", A));
    const R = b.program;
    n.updateUBOMapping(M, R);
    const _ = e.render.frame;
    s[M.id] !== _ && (u(M), s[M.id] = _);
  }
  function h(M) {
    const b = p();
    M.__bindingPointIndex = b;
    const y = i.createBuffer(), R = M.__size, _ = M.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, y), i.bufferData(i.UNIFORM_BUFFER, R, _), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, b, y), y;
  }
  function p() {
    for (let M = 0; M < o; M++)
      if (a.indexOf(M) === -1)
        return a.push(M), M;
    return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function u(M) {
    const b = r[M.id], y = M.uniforms, R = M.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, b);
    for (let _ = 0, T = y.length; _ < T; _++) {
      const I = y[_];
      if (Array.isArray(I))
        for (let P = 0, N = I.length; P < N; P++)
          g(I[P], _, P, R);
      else
        g(I, _, 0, R);
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function g(M, b, y, R) {
    if (E(M, b, y, R) === !0) {
      const _ = M.__offset, T = M.value;
      if (Array.isArray(T)) {
        let I = 0;
        for (let P = 0; P < T.length; P++) {
          const N = T[P], q = f(N);
          v(N, M.__data, I), typeof N != "number" && typeof N != "boolean" && !N.isMatrix3 && !ArrayBuffer.isView(N) && (I += q.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else
        v(T, M.__data, 0);
      i.bufferSubData(i.UNIFORM_BUFFER, _, M.__data);
    }
  }
  function v(M, b, y) {
    typeof M == "number" || typeof M == "boolean" ? b[0] = M : M.isMatrix3 ? (b[0] = M.elements[0], b[1] = M.elements[1], b[2] = M.elements[2], b[3] = 0, b[4] = M.elements[3], b[5] = M.elements[4], b[6] = M.elements[5], b[7] = 0, b[8] = M.elements[6], b[9] = M.elements[7], b[10] = M.elements[8], b[11] = 0) : ArrayBuffer.isView(M) ? b.set(new M.constructor(M.buffer, M.byteOffset, b.length)) : M.toArray(b, y);
  }
  function E(M, b, y, R) {
    const _ = M.value, T = b + "_" + y;
    if (R[T] === void 0)
      return typeof _ == "number" || typeof _ == "boolean" ? R[T] = _ : ArrayBuffer.isView(_) ? R[T] = _.slice() : R[T] = _.clone(), !0;
    {
      const I = R[T];
      if (typeof _ == "number" || typeof _ == "boolean") {
        if (I !== _)
          return R[T] = _, !0;
      } else {
        if (ArrayBuffer.isView(_))
          return !0;
        if (I.equals(_) === !1)
          return I.copy(_), !0;
      }
    }
    return !1;
  }
  function m(M) {
    const b = M.uniforms;
    let y = 0;
    const R = 16;
    for (let T = 0, I = b.length; T < I; T++) {
      const P = Array.isArray(b[T]) ? b[T] : [b[T]];
      for (let N = 0, q = P.length; N < q; N++) {
        const Y = P[N], O = Array.isArray(Y.value) ? Y.value : [Y.value];
        for (let X = 0, V = O.length; X < V; X++) {
          const J = O[X], ee = f(J), oe = y % R, se = oe % ee.boundary, Q = oe + se;
          y += se, Q !== 0 && R - Q < ee.storage && (y += R - Q), Y.__data = new Float32Array(ee.storage / Float32Array.BYTES_PER_ELEMENT), Y.__offset = y, y += ee.storage;
        }
      }
    }
    const _ = y % R;
    return _ > 0 && (y += R - _), M.__size = y, M.__cache = {}, this;
  }
  function f(M) {
    const b = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof M == "number" || typeof M == "boolean" ? (b.boundary = 4, b.storage = 4) : M.isVector2 ? (b.boundary = 8, b.storage = 8) : M.isVector3 || M.isColor ? (b.boundary = 16, b.storage = 12) : M.isVector4 ? (b.boundary = 16, b.storage = 16) : M.isMatrix3 ? (b.boundary = 48, b.storage = 48) : M.isMatrix4 ? (b.boundary = 64, b.storage = 64) : M.isTexture ? Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(M) ? (b.boundary = 16, b.storage = M.byteLength) : Ce("WebGLRenderer: Unsupported uniform value type.", M), b;
  }
  function A(M) {
    const b = M.target;
    b.removeEventListener("dispose", A);
    const y = a.indexOf(b.__bindingPointIndex);
    a.splice(y, 1), i.deleteBuffer(r[b.id]), delete r[b.id], delete s[b.id];
  }
  function w() {
    for (const M in r)
      i.deleteBuffer(r[M]);
    a = [], r = {}, s = {};
  }
  return {
    bind: c,
    update: l,
    dispose: w
  };
}
const lm = new Uint16Array([
  12469,
  15057,
  12620,
  14925,
  13266,
  14620,
  13807,
  14376,
  14323,
  13990,
  14545,
  13625,
  14713,
  13328,
  14840,
  12882,
  14931,
  12528,
  14996,
  12233,
  15039,
  11829,
  15066,
  11525,
  15080,
  11295,
  15085,
  10976,
  15082,
  10705,
  15073,
  10495,
  13880,
  14564,
  13898,
  14542,
  13977,
  14430,
  14158,
  14124,
  14393,
  13732,
  14556,
  13410,
  14702,
  12996,
  14814,
  12596,
  14891,
  12291,
  14937,
  11834,
  14957,
  11489,
  14958,
  11194,
  14943,
  10803,
  14921,
  10506,
  14893,
  10278,
  14858,
  9960,
  14484,
  14039,
  14487,
  14025,
  14499,
  13941,
  14524,
  13740,
  14574,
  13468,
  14654,
  13106,
  14743,
  12678,
  14818,
  12344,
  14867,
  11893,
  14889,
  11509,
  14893,
  11180,
  14881,
  10751,
  14852,
  10428,
  14812,
  10128,
  14765,
  9754,
  14712,
  9466,
  14764,
  13480,
  14764,
  13475,
  14766,
  13440,
  14766,
  13347,
  14769,
  13070,
  14786,
  12713,
  14816,
  12387,
  14844,
  11957,
  14860,
  11549,
  14868,
  11215,
  14855,
  10751,
  14825,
  10403,
  14782,
  10044,
  14729,
  9651,
  14666,
  9352,
  14599,
  9029,
  14967,
  12835,
  14966,
  12831,
  14963,
  12804,
  14954,
  12723,
  14936,
  12564,
  14917,
  12347,
  14900,
  11958,
  14886,
  11569,
  14878,
  11247,
  14859,
  10765,
  14828,
  10401,
  14784,
  10011,
  14727,
  9600,
  14660,
  9289,
  14586,
  8893,
  14508,
  8533,
  15111,
  12234,
  15110,
  12234,
  15104,
  12216,
  15092,
  12156,
  15067,
  12010,
  15028,
  11776,
  14981,
  11500,
  14942,
  11205,
  14902,
  10752,
  14861,
  10393,
  14812,
  9991,
  14752,
  9570,
  14682,
  9252,
  14603,
  8808,
  14519,
  8445,
  14431,
  8145,
  15209,
  11449,
  15208,
  11451,
  15202,
  11451,
  15190,
  11438,
  15163,
  11384,
  15117,
  11274,
  15055,
  10979,
  14994,
  10648,
  14932,
  10343,
  14871,
  9936,
  14803,
  9532,
  14729,
  9218,
  14645,
  8742,
  14556,
  8381,
  14461,
  8020,
  14365,
  7603,
  15273,
  10603,
  15272,
  10607,
  15267,
  10619,
  15256,
  10631,
  15231,
  10614,
  15182,
  10535,
  15118,
  10389,
  15042,
  10167,
  14963,
  9787,
  14883,
  9447,
  14800,
  9115,
  14710,
  8665,
  14615,
  8318,
  14514,
  7911,
  14411,
  7507,
  14279,
  7198,
  15314,
  9675,
  15313,
  9683,
  15309,
  9712,
  15298,
  9759,
  15277,
  9797,
  15229,
  9773,
  15166,
  9668,
  15084,
  9487,
  14995,
  9274,
  14898,
  8910,
  14800,
  8539,
  14697,
  8234,
  14590,
  7790,
  14479,
  7409,
  14367,
  7067,
  14178,
  6621,
  15337,
  8619,
  15337,
  8631,
  15333,
  8677,
  15325,
  8769,
  15305,
  8871,
  15264,
  8940,
  15202,
  8909,
  15119,
  8775,
  15022,
  8565,
  14916,
  8328,
  14804,
  8009,
  14688,
  7614,
  14569,
  7287,
  14448,
  6888,
  14321,
  6483,
  14088,
  6171,
  15350,
  7402,
  15350,
  7419,
  15347,
  7480,
  15340,
  7613,
  15322,
  7804,
  15287,
  7973,
  15229,
  8057,
  15148,
  8012,
  15046,
  7846,
  14933,
  7611,
  14810,
  7357,
  14682,
  7069,
  14552,
  6656,
  14421,
  6316,
  14251,
  5948,
  14007,
  5528,
  15356,
  5942,
  15356,
  5977,
  15353,
  6119,
  15348,
  6294,
  15332,
  6551,
  15302,
  6824,
  15249,
  7044,
  15171,
  7122,
  15070,
  7050,
  14949,
  6861,
  14818,
  6611,
  14679,
  6349,
  14538,
  6067,
  14398,
  5651,
  14189,
  5311,
  13935,
  4958,
  15359,
  4123,
  15359,
  4153,
  15356,
  4296,
  15353,
  4646,
  15338,
  5160,
  15311,
  5508,
  15263,
  5829,
  15188,
  6042,
  15088,
  6094,
  14966,
  6001,
  14826,
  5796,
  14678,
  5543,
  14527,
  5287,
  14377,
  4985,
  14133,
  4586,
  13869,
  4257,
  15360,
  1563,
  15360,
  1642,
  15358,
  2076,
  15354,
  2636,
  15341,
  3350,
  15317,
  4019,
  15273,
  4429,
  15203,
  4732,
  15105,
  4911,
  14981,
  4932,
  14836,
  4818,
  14679,
  4621,
  14517,
  4386,
  14359,
  4156,
  14083,
  3795,
  13808,
  3437,
  15360,
  122,
  15360,
  137,
  15358,
  285,
  15355,
  636,
  15344,
  1274,
  15322,
  2177,
  15281,
  2765,
  15215,
  3223,
  15120,
  3451,
  14995,
  3569,
  14846,
  3567,
  14681,
  3466,
  14511,
  3305,
  14344,
  3121,
  14037,
  2800,
  13753,
  2467,
  15360,
  0,
  15360,
  1,
  15359,
  21,
  15355,
  89,
  15346,
  253,
  15325,
  479,
  15287,
  796,
  15225,
  1148,
  15133,
  1492,
  15008,
  1749,
  14856,
  1882,
  14685,
  1886,
  14506,
  1783,
  14324,
  1608,
  13996,
  1398,
  13702,
  1183
]);
let Kt = null;
function cm() {
  return Kt === null && (Kt = new Yc(lm, 16, 16, Wn, _n), Kt.name = "DFG_LUT", Kt.minFilter = yt, Kt.magFilter = yt, Kt.wrapS = dn, Kt.wrapT = dn, Kt.generateMipmaps = !1, Kt.needsUpdate = !0), Kt;
}
class um {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer~Options} [parameters] - The configuration parameter.
   */
  constructor(e = {}) {
    const {
      canvas: t = yc(),
      context: n = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: c = !0,
      preserveDrawingBuffer: l = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: p = !1,
      reversedDepthBuffer: u = !1,
      outputBufferType: g = Dt
    } = e;
    this.isWebGLRenderer = !0;
    let v;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      v = n.getContextAttributes().alpha;
    } else
      v = a;
    const E = g, m = /* @__PURE__ */ new Set([
      ca,
      la,
      oa
    ]), f = /* @__PURE__ */ new Set([
      Dt,
      nn,
      Ii,
      Ui,
      sa,
      aa
    ]), A = new Uint32Array(4), w = new Int32Array(4), M = new z();
    let b = null, y = null;
    const R = [], _ = [];
    let T = null;
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled.
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = jt, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const I = this;
    let P = !1, N = null, q = null, Y = null, O = null;
    this._outputColorSpace = Nt;
    let X = 0, V = 0, J = null, ee = -1, oe = null;
    const se = new tt(), Q = new tt();
    let be = null;
    const Re = new Be(0);
    let Pe = 0, Z = t.width, ie = t.height, te = 1, Le = null, Ie = null;
    const Ae = new tt(0, 0, Z, ie), at = new tt(0, 0, Z, ie);
    let ze = !1;
    const $e = new ma();
    let qe = !1, ke = !1;
    const ct = new st(), ft = new z(), mt = new tt(), _t = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let nt = !1;
    function ut() {
      return J === null ? te : 1;
    }
    let L = n;
    function At(x, D) {
      return t.getContext(x, D);
    }
    try {
      const x = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: o,
        premultipliedAlpha: c,
        preserveDrawingBuffer: l,
        powerPreference: h,
        failIfMajorPerformanceCaveat: p
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${ia}`), t.addEventListener("webglcontextlost", it, !1), t.addEventListener("webglcontextrestored", je, !1), t.addEventListener("webglcontextcreationerror", Xt, !1), L === null) {
        const D = "webgl2";
        if (L = At(D, x), L === null)
          throw At(D) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
    } catch (x) {
      throw Xe("WebGLRenderer: " + x.message), x;
    }
    let Ye, S, d, U, G, k, ne, ae, W, $, le, Se, he, ce, Te, we, Ue, C, re, K, ue, me, j;
    function Me() {
      Ye = new cd(L), Ye.init(), ue = new em(L, Ye), S = new td(L, Ye, e, ue), d = new Qp(L, Ye), S.reversedDepthBuffer && u && d.buffers.depth.setReversed(!0), q = L.createFramebuffer(), Y = L.createFramebuffer(), O = L.createFramebuffer(), U = new fd(L), G = new Bp(), k = new jp(L, Ye, d, G, S, ue, U), ne = new ld(I), ae = new mu(L), me = new jf(L, ae), W = new ud(L, ae, U, me), $ = new pd(L, W, ae, me, U), C = new dd(L, S, k), Te = new nd(G), le = new Op(I, ne, Ye, S, me, Te), Se = new am(I, G), he = new Gp(), ce = new qp(Ye), Ue = new Qf(I, ne, d, $, v, c), we = new Jp(I, $, S), j = new om(L, U, S, d), re = new ed(L, Ye, U), K = new hd(L, Ye, U), U.programs = le.programs, I.capabilities = S, I.extensions = Ye, I.properties = G, I.renderLists = he, I.shadowMap = we, I.state = d, I.info = U;
    }
    Me(), E !== Dt && (T = new gd(E, t.width, t.height, o, r, s));
    const xe = new rm(I, L);
    this.xr = xe, this.getContext = function() {
      return L;
    }, this.getContextAttributes = function() {
      return L.getContextAttributes();
    }, this.forceContextLoss = function() {
      const x = Ye.get("WEBGL_lose_context");
      x && x.loseContext();
    }, this.forceContextRestore = function() {
      const x = Ye.get("WEBGL_lose_context");
      x && x.restoreContext();
    }, this.getPixelRatio = function() {
      return te;
    }, this.setPixelRatio = function(x) {
      x !== void 0 && (te = x, this.setSize(Z, ie, !1));
    }, this.getSize = function(x) {
      return x.set(Z, ie);
    }, this.setSize = function(x, D, H = !0) {
      if (xe.isPresenting) {
        Ce("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      Z = x, ie = D, t.width = Math.floor(x * te), t.height = Math.floor(D * te), H === !0 && (t.style.width = x + "px", t.style.height = D + "px"), T !== null && T.setSize(t.width, t.height), this.setViewport(0, 0, x, D);
    }, this.getDrawingBufferSize = function(x) {
      return x.set(Z * te, ie * te).floor();
    }, this.setDrawingBufferSize = function(x, D, H) {
      Z = x, ie = D, te = H, t.width = Math.floor(x * H), t.height = Math.floor(D * H), this.setViewport(0, 0, x, D);
    }, this.setEffects = function(x) {
      if (E === Dt) {
        Xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (x) {
        for (let D = 0; D < x.length; D++)
          if (x[D].isOutputPass === !0) {
            Ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
            break;
          }
      }
      T.setEffects(x || []);
    }, this.getCurrentViewport = function(x) {
      return x.copy(se);
    }, this.getViewport = function(x) {
      return x.copy(Ae);
    }, this.setViewport = function(x, D, H, F) {
      x.isVector4 ? Ae.set(x.x, x.y, x.z, x.w) : Ae.set(x, D, H, F), d.viewport(se.copy(Ae).multiplyScalar(te).round());
    }, this.getScissor = function(x) {
      return x.copy(at);
    }, this.setScissor = function(x, D, H, F) {
      x.isVector4 ? at.set(x.x, x.y, x.z, x.w) : at.set(x, D, H, F), d.scissor(Q.copy(at).multiplyScalar(te).round());
    }, this.getScissorTest = function() {
      return ze;
    }, this.setScissorTest = function(x) {
      d.setScissorTest(ze = x);
    }, this.setOpaqueSort = function(x) {
      Le = x;
    }, this.setTransparentSort = function(x) {
      Ie = x;
    }, this.getClearColor = function(x) {
      return x.copy(Ue.getClearColor());
    }, this.setClearColor = function() {
      Ue.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return Ue.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ue.setClearAlpha(...arguments);
    }, this.clear = function(x = !0, D = !0, H = !0) {
      let F = 0;
      if (x) {
        let B = !1;
        if (J !== null) {
          const pe = J.texture.format;
          B = m.has(pe);
        }
        if (B) {
          const pe = J.texture.type, _e = f.has(pe), de = Ue.getClearColor(), ve = Ue.getClearAlpha(), Ee = de.r, Ne = de.g, Oe = de.b;
          _e ? (A[0] = Ee, A[1] = Ne, A[2] = Oe, A[3] = ve, L.clearBufferuiv(L.COLOR, 0, A)) : (w[0] = Ee, w[1] = Ne, w[2] = Oe, w[3] = ve, L.clearBufferiv(L.COLOR, 0, w));
        } else
          F |= L.COLOR_BUFFER_BIT;
      }
      D && (F |= L.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), H && (F |= L.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), F !== 0 && L.clear(F);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function(x) {
      x.setRenderer(this), N = x;
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", it, !1), t.removeEventListener("webglcontextrestored", je, !1), t.removeEventListener("webglcontextcreationerror", Xt, !1), Ue.dispose(), he.dispose(), ce.dispose(), G.dispose(), ne.dispose(), $.dispose(), me.dispose(), j.dispose(), le.dispose(), xe.dispose(), xe.removeEventListener("sessionstart", ya), xe.removeEventListener("sessionend", Ta), In.stop();
    };
    function it(x) {
      x.preventDefault(), ka("WebGLRenderer: Context Lost."), P = !0;
    }
    function je() {
      ka("WebGLRenderer: Context Restored."), P = !1;
      const x = U.autoReset, D = we.enabled, H = we.autoUpdate, F = we.needsUpdate, B = we.type;
      Me(), U.autoReset = x, we.enabled = D, we.autoUpdate = H, we.needsUpdate = F, we.type = B;
    }
    function Xt(x) {
      Xe("WebGLRenderer: A WebGL context could not be created. Reason: ", x.statusMessage);
    }
    function qt(x) {
      const D = x.target;
      D.removeEventListener("dispose", qt), Tl(D);
    }
    function Tl(x) {
      bl(x), G.remove(x);
    }
    function bl(x) {
      const D = G.get(x).programs;
      D !== void 0 && (D.forEach(function(H) {
        le.releaseProgram(H);
      }), x.isShaderMaterial && le.releaseShaderCache(x));
    }
    this.renderBufferDirect = function(x, D, H, F, B, pe) {
      D === null && (D = _t);
      const _e = B.isMesh && B.matrixWorld.determinantAffine() < 0, de = Rl(x, D, H, F, B);
      d.setMaterial(F, _e);
      let ve = H.index, Ee = 1;
      if (F.wireframe === !0) {
        if (ve = W.getWireframeAttribute(H), ve === void 0) return;
        Ee = 2;
      }
      const Ne = H.drawRange, Oe = H.attributes.position;
      let ye = Ne.start * Ee, Ke = (Ne.start + Ne.count) * Ee;
      pe !== null && (ye = Math.max(ye, pe.start * Ee), Ke = Math.min(Ke, (pe.start + pe.count) * Ee)), ve !== null ? (ye = Math.max(ye, 0), Ke = Math.min(Ke, ve.count)) : Oe != null && (ye = Math.max(ye, 0), Ke = Math.min(Ke, Oe.count));
      const ot = Ke - ye;
      if (ot < 0 || ot === 1 / 0) return;
      me.setup(B, F, de, H, ve);
      let rt, Je = re;
      if (ve !== null && (rt = ae.get(ve), Je = K, Je.setIndex(rt)), B.isMesh)
        F.wireframe === !0 ? (d.setLineWidth(F.wireframeLinewidth * ut()), Je.setMode(L.LINES)) : Je.setMode(L.TRIANGLES);
      else if (B.isLine) {
        let Mt = F.linewidth;
        Mt === void 0 && (Mt = 1), d.setLineWidth(Mt * ut()), B.isLineSegments ? Je.setMode(L.LINES) : B.isLineLoop ? Je.setMode(L.LINE_LOOP) : Je.setMode(L.LINE_STRIP);
      } else B.isPoints ? Je.setMode(L.POINTS) : B.isSprite && Je.setMode(L.TRIANGLES);
      if (B.isBatchedMesh)
        if (Ye.get("WEBGL_multi_draw"))
          Je.renderMultiDraw(B._multiDrawStarts, B._multiDrawCounts, B._multiDrawCount);
        else {
          const Mt = B._multiDrawStarts, ge = B._multiDrawCounts, Ct = B._multiDrawCount, We = ve ? ae.get(ve).bytesPerElement : 1, It = G.get(F).currentProgram.getUniforms();
          for (let Yt = 0; Yt < Ct; Yt++)
            It.setValue(L, "_gl_DrawID", Yt), Je.render(Mt[Yt] / We, ge[Yt]);
        }
      else if (B.isInstancedMesh)
        Je.renderInstances(ye, ot, B.count);
      else if (H.isInstancedBufferGeometry) {
        const Mt = H._maxInstanceCount !== void 0 ? H._maxInstanceCount : 1 / 0, ge = Math.min(H.instanceCount, Mt);
        Je.renderInstances(ye, ot, ge);
      } else
        Je.render(ye, ot);
    };
    function Ea(x, D, H) {
      x.transparent === !0 && x.side === fn && x.forceSinglePass === !1 ? (x.side = Rt, x.needsUpdate = !0, Vi(x, D, H), x.side = Ln, x.needsUpdate = !0, Vi(x, D, H), x.side = fn) : Vi(x, D, H);
    }
    this.compile = function(x, D, H = null) {
      H === null && (H = x), y = ce.get(H), y.init(D), _.push(y), H.traverseVisible(function(B) {
        B.isLight && B.layers.test(D.layers) && (y.pushLight(B), B.castShadow && y.pushShadow(B));
      }), x !== H && x.traverseVisible(function(B) {
        B.isLight && B.layers.test(D.layers) && (y.pushLight(B), B.castShadow && y.pushShadow(B));
      }), y.setupLights();
      const F = /* @__PURE__ */ new Set();
      return x.traverse(function(B) {
        if (!(B.isMesh || B.isPoints || B.isLine || B.isSprite))
          return;
        const pe = B.material;
        if (pe)
          if (Array.isArray(pe))
            for (let _e = 0; _e < pe.length; _e++) {
              const de = pe[_e];
              Ea(de, H, B), F.add(de);
            }
          else
            Ea(pe, H, B), F.add(pe);
      }), y = _.pop(), F;
    }, this.compileAsync = function(x, D, H = null) {
      const F = this.compile(x, D, H);
      return new Promise((B) => {
        function pe() {
          if (F.forEach(function(_e) {
            G.get(_e).currentProgram.isReady() && F.delete(_e);
          }), F.size === 0) {
            B(x);
            return;
          }
          setTimeout(pe, 10);
        }
        Ye.get("KHR_parallel_shader_compile") !== null ? pe() : setTimeout(pe, 10);
      });
    };
    let wr = null;
    function Al(x) {
      wr && wr(x);
    }
    function ya() {
      In.stop();
    }
    function Ta() {
      In.start();
    }
    const In = new ml();
    In.setAnimationLoop(Al), typeof self < "u" && In.setContext(self), this.setAnimationLoop = function(x) {
      wr = x, xe.setAnimationLoop(x), x === null ? In.stop() : In.start();
    }, xe.addEventListener("sessionstart", ya), xe.addEventListener("sessionend", Ta), this.render = function(x, D) {
      if (D !== void 0 && D.isCamera !== !0) {
        Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (P === !0) return;
      N !== null && N.renderStart(x, D);
      const H = xe.enabled === !0 && xe.isPresenting === !0, F = T !== null && (J === null || H) && T.begin(I, J);
      if (x.matrixWorldAutoUpdate === !0 && x.updateMatrixWorld(), D.parent === null && D.matrixWorldAutoUpdate === !0 && D.updateMatrixWorld(), xe.enabled === !0 && xe.isPresenting === !0 && (T === null || T.isCompositing() === !1) && (xe.cameraAutoUpdate === !0 && xe.updateCamera(D), D = xe.getCamera()), x.isScene === !0 && x.onBeforeRender(I, x, D, J), y = ce.get(x, _.length), y.init(D), y.state.textureUnits = k.getTextureUnits(), _.push(y), ct.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), $e.setFromProjectionMatrix(ct, Qt, D.reversedDepth), ke = this.localClippingEnabled, qe = Te.init(this.clippingPlanes, ke), b = he.get(x, R.length), b.init(), R.push(b), xe.enabled === !0 && xe.isPresenting === !0) {
        const _e = I.xr.getDepthSensingMesh();
        _e !== null && Rr(_e, D, -1 / 0, I.sortObjects);
      }
      Rr(x, D, 0, I.sortObjects), b.finish(), I.sortObjects === !0 && b.sort(Le, Ie, D.reversedDepth), nt = xe.enabled === !1 || xe.isPresenting === !1 || xe.hasDepthSensing() === !1, nt && Ue.addToRenderList(b, x), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), qe === !0 && Te.beginShadows();
      const B = y.state.shadowsArray;
      if (we.render(B, x, D), qe === !0 && Te.endShadows(), (F && T.hasRenderPass()) === !1) {
        const _e = b.opaque, de = b.transmissive;
        if (y.setupLights(), D.isArrayCamera) {
          const ve = D.cameras;
          if (de.length > 0)
            for (let Ee = 0, Ne = ve.length; Ee < Ne; Ee++) {
              const Oe = ve[Ee];
              Aa(_e, de, x, Oe);
            }
          nt && Ue.render(x);
          for (let Ee = 0, Ne = ve.length; Ee < Ne; Ee++) {
            const Oe = ve[Ee];
            ba(b, x, Oe, Oe.viewport);
          }
        } else
          de.length > 0 && Aa(_e, de, x, D), nt && Ue.render(x), ba(b, x, D);
      }
      J !== null && V === 0 && (k.updateMultisampleRenderTarget(J), k.updateRenderTargetMipmap(J)), F && T.end(I), x.isScene === !0 && x.onAfterRender(I, x, D), me.resetDefaultState(), ee = -1, oe = null, _.pop(), _.length > 0 ? (y = _[_.length - 1], k.setTextureUnits(y.state.textureUnits), qe === !0 && Te.setGlobalState(I.clippingPlanes, y.state.camera)) : y = null, R.pop(), R.length > 0 ? b = R[R.length - 1] : b = null, N !== null && N.renderEnd();
    };
    function Rr(x, D, H, F) {
      if (x.visible === !1) return;
      if (x.layers.test(D.layers)) {
        if (x.isGroup)
          H = x.renderOrder;
        else if (x.isLOD)
          x.autoUpdate === !0 && x.update(D);
        else if (x.isLightProbeGrid)
          y.pushLightProbeGrid(x);
        else if (x.isLight)
          y.pushLight(x), x.castShadow && y.pushShadow(x);
        else if (x.isSprite) {
          if (!x.frustumCulled || $e.intersectsSprite(x)) {
            F && mt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(ct);
            const _e = $.update(x), de = x.material;
            de.visible && b.push(x, _e, de, H, mt.z, null);
          }
        } else if ((x.isMesh || x.isLine || x.isPoints) && (!x.frustumCulled || $e.intersectsObject(x))) {
          const _e = $.update(x), de = x.material;
          if (F && (x.boundingSphere !== void 0 ? (x.boundingSphere === null && x.computeBoundingSphere(), mt.copy(x.boundingSphere.center)) : (_e.boundingSphere === null && _e.computeBoundingSphere(), mt.copy(_e.boundingSphere.center)), mt.applyMatrix4(x.matrixWorld).applyMatrix4(ct)), Array.isArray(de)) {
            const ve = _e.groups;
            for (let Ee = 0, Ne = ve.length; Ee < Ne; Ee++) {
              const Oe = ve[Ee], ye = de[Oe.materialIndex];
              ye && ye.visible && b.push(x, _e, ye, H, mt.z, Oe);
            }
          } else de.visible && b.push(x, _e, de, H, mt.z, null);
        }
      }
      const pe = x.children;
      for (let _e = 0, de = pe.length; _e < de; _e++)
        Rr(pe[_e], D, H, F);
    }
    function ba(x, D, H, F) {
      const { opaque: B, transmissive: pe, transparent: _e } = x;
      y.setupLightsView(H), qe === !0 && Te.setGlobalState(I.clippingPlanes, H), F && d.viewport(se.copy(F)), B.length > 0 && Gi(B, D, H), pe.length > 0 && Gi(pe, D, H), _e.length > 0 && Gi(_e, D, H), d.buffers.depth.setTest(!0), d.buffers.depth.setMask(!0), d.buffers.color.setMask(!0), d.setPolygonOffset(!1);
    }
    function Aa(x, D, H, F) {
      if ((H.isScene === !0 ? H.overrideMaterial : null) !== null)
        return;
      if (y.state.transmissionRenderTarget[F.id] === void 0) {
        const ye = Ye.has("EXT_color_buffer_half_float") || Ye.has("EXT_color_buffer_float");
        y.state.transmissionRenderTarget[F.id] = new en(1, 1, {
          generateMipmaps: !0,
          type: ye ? _n : Dt,
          minFilter: Vn,
          samples: Math.max(4, S.samples),
          // to avoid feedback loops, the transmission render target requires a resolve, see #26177
          stencilBuffer: s,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: Ge.workingColorSpace
        });
      }
      const pe = y.state.transmissionRenderTarget[F.id], _e = F.viewport || se;
      pe.setSize(_e.z * I.transmissionResolutionScale, _e.w * I.transmissionResolutionScale);
      const de = I.getRenderTarget(), ve = I.getActiveCubeFace(), Ee = I.getActiveMipmapLevel();
      I.setRenderTarget(pe), I.getClearColor(Re), Pe = I.getClearAlpha(), Pe < 1 && I.setClearColor(16777215, 0.5), I.clear(), nt && Ue.render(H);
      const Ne = I.toneMapping;
      I.toneMapping = jt;
      const Oe = F.viewport;
      if (F.viewport !== void 0 && (F.viewport = void 0), y.setupLightsView(F), qe === !0 && Te.setGlobalState(I.clippingPlanes, F), Gi(x, H, F), k.updateMultisampleRenderTarget(pe), k.updateRenderTargetMipmap(pe), Ye.has("WEBGL_multisampled_render_to_texture") === !1) {
        let ye = !1;
        for (let Ke = 0, ot = D.length; Ke < ot; Ke++) {
          const rt = D[Ke], { object: Je, geometry: Mt, material: ge, group: Ct } = rt;
          if (ge.side === fn && Je.layers.test(F.layers)) {
            const We = ge.side;
            ge.side = Rt, ge.needsUpdate = !0, wa(Je, H, F, Mt, ge, Ct), ge.side = We, ge.needsUpdate = !0, ye = !0;
          }
        }
        ye === !0 && (k.updateMultisampleRenderTarget(pe), k.updateRenderTargetMipmap(pe));
      }
      I.setRenderTarget(de, ve, Ee), I.setClearColor(Re, Pe), Oe !== void 0 && (F.viewport = Oe), I.toneMapping = Ne;
    }
    function Gi(x, D, H) {
      const F = D.isScene === !0 ? D.overrideMaterial : null;
      for (let B = 0, pe = x.length; B < pe; B++) {
        const _e = x[B], { object: de, geometry: ve, group: Ee } = _e;
        let Ne = _e.material;
        Ne.allowOverride === !0 && F !== null && (Ne = F), de.layers.test(H.layers) && wa(de, D, H, ve, Ne, Ee);
      }
    }
    function wa(x, D, H, F, B, pe) {
      x.onBeforeRender(I, D, H, F, B, pe), x.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse, x.matrixWorld), x.normalMatrix.getNormalMatrix(x.modelViewMatrix), B.onBeforeRender(I, D, H, F, x, pe), B.transparent === !0 && B.side === fn && B.forceSinglePass === !1 ? (B.side = Rt, B.needsUpdate = !0, I.renderBufferDirect(H, D, F, B, x, pe), B.side = Ln, B.needsUpdate = !0, I.renderBufferDirect(H, D, F, B, x, pe), B.side = fn) : I.renderBufferDirect(H, D, F, B, x, pe), x.onAfterRender(I, D, H, F, B, pe);
    }
    function Vi(x, D, H) {
      D.isScene !== !0 && (D = _t);
      const F = G.get(x), B = y.state.lights, pe = y.state.shadowsArray, _e = B.state.version, de = le.getParameters(x, B.state, pe, D, H, y.state.lightProbeGridArray), ve = le.getProgramCacheKey(de);
      let Ee = F.programs;
      F.environment = x.isMeshStandardMaterial || x.isMeshLambertMaterial || x.isMeshPhongMaterial ? D.environment : null, F.fog = D.fog;
      const Ne = x.isMeshStandardMaterial || x.isMeshLambertMaterial && !x.envMap || x.isMeshPhongMaterial && !x.envMap;
      F.envMap = ne.get(x.envMap || F.environment, Ne), F.envMapRotation = F.environment !== null && x.envMap === null ? D.environmentRotation : x.envMapRotation, Ee === void 0 && (x.addEventListener("dispose", qt), Ee = /* @__PURE__ */ new Map(), F.programs = Ee);
      let Oe = Ee.get(ve);
      if (Oe !== void 0) {
        if (F.currentProgram === Oe && F.lightsStateVersion === _e)
          return Ca(x, de), Oe;
      } else
        de.uniforms = le.getUniforms(x), N !== null && x.isNodeMaterial && N.build(x, H, de), x.onBeforeCompile(de, I), Oe = le.acquireProgram(de, ve), Ee.set(ve, Oe), F.uniforms = de.uniforms;
      const ye = F.uniforms;
      return (!x.isShaderMaterial && !x.isRawShaderMaterial || x.clipping === !0) && (ye.clippingPlanes = Te.uniform), Ca(x, de), F.needsLights = Pl(x), F.lightsStateVersion = _e, F.needsLights && (ye.ambientLightColor.value = B.state.ambient, ye.lightProbe.value = B.state.probe, ye.directionalLights.value = B.state.directional, ye.directionalLightShadows.value = B.state.directionalShadow, ye.spotLights.value = B.state.spot, ye.spotLightShadows.value = B.state.spotShadow, ye.rectAreaLights.value = B.state.rectArea, ye.ltc_1.value = B.state.rectAreaLTC1, ye.ltc_2.value = B.state.rectAreaLTC2, ye.pointLights.value = B.state.point, ye.pointLightShadows.value = B.state.pointShadow, ye.hemisphereLights.value = B.state.hemi, ye.directionalShadowMatrix.value = B.state.directionalShadowMatrix, ye.spotLightMatrix.value = B.state.spotLightMatrix, ye.spotLightMap.value = B.state.spotLightMap, ye.pointShadowMatrix.value = B.state.pointShadowMatrix), F.lightProbeGrid = y.state.lightProbeGridArray.length > 0, F.currentProgram = Oe, F.uniformsList = null, Oe;
    }
    function Ra(x) {
      if (x.uniformsList === null) {
        const D = x.currentProgram.getUniforms();
        x.uniformsList = pr.seqWithValue(D.seq, x.uniforms);
      }
      return x.uniformsList;
    }
    function Ca(x, D) {
      const H = G.get(x);
      H.outputColorSpace = D.outputColorSpace, H.batching = D.batching, H.batchingColor = D.batchingColor, H.instancing = D.instancing, H.instancingColor = D.instancingColor, H.instancingMorph = D.instancingMorph, H.skinning = D.skinning, H.morphTargets = D.morphTargets, H.morphNormals = D.morphNormals, H.morphColors = D.morphColors, H.morphTargetsCount = D.morphTargetsCount, H.numClippingPlanes = D.numClippingPlanes, H.numIntersection = D.numClipIntersection, H.vertexAlphas = D.vertexAlphas, H.vertexTangents = D.vertexTangents, H.toneMapping = D.toneMapping;
    }
    function wl(x, D) {
      if (x.length === 0) return null;
      if (x.length === 1)
        return x[0].texture !== null ? x[0] : null;
      M.setFromMatrixPosition(D.matrixWorld);
      for (let H = 0, F = x.length; H < F; H++) {
        const B = x[H];
        if (B.texture !== null && B.boundingBox.containsPoint(M)) return B;
      }
      return null;
    }
    function Rl(x, D, H, F, B) {
      D.isScene !== !0 && (D = _t), k.resetTextureUnits();
      const pe = D.fog, _e = F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial ? D.environment : null, de = J === null ? I.outputColorSpace : J.isXRRenderTarget === !0 ? J.texture.colorSpace : Ge.workingColorSpace, ve = F.isMeshStandardMaterial || F.isMeshLambertMaterial && !F.envMap || F.isMeshPhongMaterial && !F.envMap, Ee = ne.get(F.envMap || _e, ve), Ne = F.vertexColors === !0 && !!H.attributes.color && H.attributes.color.itemSize === 4, Oe = !!H.attributes.tangent && (!!F.normalMap || F.anisotropy > 0), ye = !!H.morphAttributes.position, Ke = !!H.morphAttributes.normal, ot = !!H.morphAttributes.color;
      let rt = jt;
      F.toneMapped && (J === null || J.isXRRenderTarget === !0) && (rt = I.toneMapping);
      const Je = H.morphAttributes.position || H.morphAttributes.normal || H.morphAttributes.color, Mt = Je !== void 0 ? Je.length : 0, ge = G.get(F), Ct = y.state.lights;
      if (qe === !0 && (ke === !0 || x !== oe)) {
        const et = x === oe && F.id === ee;
        Te.setState(F, x, et);
      }
      let We = !1;
      F.version === ge.__version ? (ge.needsLights && ge.lightsStateVersion !== Ct.state.version || ge.outputColorSpace !== de || B.isBatchedMesh && ge.batching === !1 || !B.isBatchedMesh && ge.batching === !0 || B.isBatchedMesh && ge.batchingColor === !0 && B.colorTexture === null || B.isBatchedMesh && ge.batchingColor === !1 && B.colorTexture !== null || B.isInstancedMesh && ge.instancing === !1 || !B.isInstancedMesh && ge.instancing === !0 || B.isSkinnedMesh && ge.skinning === !1 || !B.isSkinnedMesh && ge.skinning === !0 || B.isInstancedMesh && ge.instancingColor === !0 && B.instanceColor === null || B.isInstancedMesh && ge.instancingColor === !1 && B.instanceColor !== null || B.isInstancedMesh && ge.instancingMorph === !0 && B.morphTexture === null || B.isInstancedMesh && ge.instancingMorph === !1 && B.morphTexture !== null || ge.envMap !== Ee || F.fog === !0 && ge.fog !== pe || ge.numClippingPlanes !== void 0 && (ge.numClippingPlanes !== Te.numPlanes || ge.numIntersection !== Te.numIntersection) || ge.vertexAlphas !== Ne || ge.vertexTangents !== Oe || ge.morphTargets !== ye || ge.morphNormals !== Ke || ge.morphColors !== ot || ge.toneMapping !== rt || ge.morphTargetsCount !== Mt || !!ge.lightProbeGrid != y.state.lightProbeGridArray.length > 0) && (We = !0) : (We = !0, ge.__version = F.version);
      let It = ge.currentProgram;
      We === !0 && (It = Vi(F, D, B), N && F.isNodeMaterial && N.onUpdateProgram(F, It, ge));
      let Yt = !1, Mn = !1, qn = !1;
      const Qe = It.getUniforms(), lt = ge.uniforms;
      if (d.useProgram(It.program) && (Yt = !0, Mn = !0, qn = !0), F.id !== ee && (ee = F.id, Mn = !0), ge.needsLights) {
        const et = wl(y.state.lightProbeGridArray, B);
        ge.lightProbeGrid !== et && (ge.lightProbeGrid = et, Mn = !0);
      }
      if (Yt || oe !== x) {
        d.buffers.depth.getReversed() && x.reversedDepth !== !0 && (x._reversedDepth = !0, x.updateProjectionMatrix()), Qe.setValue(L, "projectionMatrix", x.projectionMatrix), Qe.setValue(L, "viewMatrix", x.matrixWorldInverse);
        const En = Qe.map.cameraPosition;
        En !== void 0 && En.setValue(L, ft.setFromMatrixPosition(x.matrixWorld)), S.logarithmicDepthBuffer && Qe.setValue(
          L,
          "logDepthBufFC",
          2 / (Math.log(x.far + 1) / Math.LN2)
        ), (F.isMeshPhongMaterial || F.isMeshToonMaterial || F.isMeshLambertMaterial || F.isMeshBasicMaterial || F.isMeshStandardMaterial || F.isShaderMaterial) && Qe.setValue(L, "isOrthographic", x.isOrthographicCamera === !0), oe !== x && (oe = x, Mn = !0, qn = !0);
      }
      if (ge.needsLights && (Ct.state.directionalShadowMap.length > 0 && Qe.setValue(L, "directionalShadowMap", Ct.state.directionalShadowMap, k), Ct.state.spotShadowMap.length > 0 && Qe.setValue(L, "spotShadowMap", Ct.state.spotShadowMap, k), Ct.state.pointShadowMap.length > 0 && Qe.setValue(L, "pointShadowMap", Ct.state.pointShadowMap, k)), B.isSkinnedMesh) {
        Qe.setOptional(L, B, "bindMatrix"), Qe.setOptional(L, B, "bindMatrixInverse");
        const et = B.skeleton;
        et && (et.boneTexture === null && et.computeBoneTexture(), Qe.setValue(L, "boneTexture", et.boneTexture, k));
      }
      B.isBatchedMesh && (Qe.setOptional(L, B, "batchingTexture"), Qe.setValue(L, "batchingTexture", B._matricesTexture, k), Qe.setOptional(L, B, "batchingIdTexture"), Qe.setValue(L, "batchingIdTexture", B._indirectTexture, k), Qe.setOptional(L, B, "batchingColorTexture"), B._colorsTexture !== null && Qe.setValue(L, "batchingColorTexture", B._colorsTexture, k));
      const Sn = H.morphAttributes;
      if ((Sn.position !== void 0 || Sn.normal !== void 0 || Sn.color !== void 0) && C.update(B, H, It), (Mn || ge.receiveShadow !== B.receiveShadow) && (ge.receiveShadow = B.receiveShadow, Qe.setValue(L, "receiveShadow", B.receiveShadow)), (F.isMeshStandardMaterial || F.isMeshLambertMaterial || F.isMeshPhongMaterial) && F.envMap === null && D.environment !== null && (lt.envMapIntensity.value = D.environmentIntensity), lt.dfgLUT !== void 0 && (lt.dfgLUT.value = cm()), Mn) {
        if (Qe.setValue(L, "toneMappingExposure", I.toneMappingExposure), ge.needsLights && Cl(lt, qn), pe && F.fog === !0 && Se.refreshFogUniforms(lt, pe), Se.refreshMaterialUniforms(lt, F, te, ie, y.state.transmissionRenderTarget[x.id]), ge.needsLights && ge.lightProbeGrid) {
          const et = ge.lightProbeGrid;
          lt.probesSH.value = et.texture, lt.probesMin.value.copy(et.boundingBox.min), lt.probesMax.value.copy(et.boundingBox.max), lt.probesResolution.value.copy(et.resolution);
        }
        pr.upload(L, Ra(ge), lt, k);
      }
      if (F.isShaderMaterial && F.uniformsNeedUpdate === !0 && (pr.upload(L, Ra(ge), lt, k), F.uniformsNeedUpdate = !1), F.isSpriteMaterial && Qe.setValue(L, "center", B.center), Qe.setValue(L, "modelViewMatrix", B.modelViewMatrix), Qe.setValue(L, "normalMatrix", B.normalMatrix), Qe.setValue(L, "modelMatrix", B.matrixWorld), F.uniformsGroups !== void 0) {
        const et = F.uniformsGroups;
        for (let En = 0, Yn = et.length; En < Yn; En++) {
          const Pa = et[En];
          j.update(Pa, It), j.bind(Pa, It);
        }
      }
      return It;
    }
    function Cl(x, D) {
      x.ambientLightColor.needsUpdate = D, x.lightProbe.needsUpdate = D, x.directionalLights.needsUpdate = D, x.directionalLightShadows.needsUpdate = D, x.pointLights.needsUpdate = D, x.pointLightShadows.needsUpdate = D, x.spotLights.needsUpdate = D, x.spotLightShadows.needsUpdate = D, x.rectAreaLights.needsUpdate = D, x.hemisphereLights.needsUpdate = D;
    }
    function Pl(x) {
      return x.isMeshLambertMaterial || x.isMeshToonMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isShadowMaterial || x.isShaderMaterial && x.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return X;
    }, this.getActiveMipmapLevel = function() {
      return V;
    }, this.getRenderTarget = function() {
      return J;
    }, this.setRenderTargetTextures = function(x, D, H) {
      const F = G.get(x);
      F.__autoAllocateDepthBuffer = x.resolveDepthBuffer === !1, F.__autoAllocateDepthBuffer === !1 && (F.__useRenderToTexture = !1), G.get(x.texture).__webglTexture = D, G.get(x.depthTexture).__webglTexture = F.__autoAllocateDepthBuffer ? void 0 : H, F.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(x, D) {
      const H = G.get(x);
      H.__webglFramebuffer = D, H.__useDefaultFramebuffer = D === void 0;
    }, this.setRenderTarget = function(x, D = 0, H = 0) {
      J = x, X = D, V = H;
      let F = null, B = !1, pe = !1;
      if (x) {
        const de = G.get(x);
        if (de.__useDefaultFramebuffer !== void 0) {
          d.bindFramebuffer(L.FRAMEBUFFER, de.__webglFramebuffer), se.copy(x.viewport), Q.copy(x.scissor), be = x.scissorTest, d.viewport(se), d.scissor(Q), d.setScissorTest(be), ee = -1;
          return;
        } else if (de.__webglFramebuffer === void 0)
          k.setupRenderTarget(x);
        else if (de.__hasExternalTextures)
          k.rebindTextures(x, G.get(x.texture).__webglTexture, G.get(x.depthTexture).__webglTexture);
        else if (x.depthBuffer) {
          const Ne = x.depthTexture;
          if (de.__boundDepthTexture !== Ne) {
            if (Ne !== null && G.has(Ne) && (x.width !== Ne.image.width || x.height !== Ne.image.height))
              throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
            k.setupDepthRenderbuffer(x);
          }
        }
        const ve = x.texture;
        (ve.isData3DTexture || ve.isDataArrayTexture || ve.isCompressedArrayTexture) && (pe = !0);
        const Ee = G.get(x).__webglFramebuffer;
        x.isWebGLCubeRenderTarget ? (Array.isArray(Ee[D]) ? F = Ee[D][H] : F = Ee[D], B = !0) : x.samples > 0 && k.useMultisampledRTT(x) === !1 ? F = G.get(x).__webglMultisampledFramebuffer : Array.isArray(Ee) ? F = Ee[H] : F = Ee, se.copy(x.viewport), Q.copy(x.scissor), be = x.scissorTest;
      } else
        se.copy(Ae).multiplyScalar(te).floor(), Q.copy(at).multiplyScalar(te).floor(), be = ze;
      if (H !== 0 && (F = q), d.bindFramebuffer(L.FRAMEBUFFER, F) && d.drawBuffers(x, F), d.viewport(se), d.scissor(Q), d.setScissorTest(be), B) {
        const de = G.get(x.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_CUBE_MAP_POSITIVE_X + D, de.__webglTexture, H);
      } else if (pe) {
        const de = D;
        for (let ve = 0; ve < x.textures.length; ve++) {
          const Ee = G.get(x.textures[ve]);
          L.framebufferTextureLayer(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0 + ve, Ee.__webglTexture, H, de);
        }
      } else if (x !== null && H !== 0) {
        const de = G.get(x.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, de.__webglTexture, H);
      }
      ee = -1;
    }, this.readRenderTargetPixels = function(x, D, H, F, B, pe, _e, de = 0) {
      if (!(x && x.isWebGLRenderTarget)) {
        Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let ve = G.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && _e !== void 0 && (ve = ve[_e]), ve) {
        d.bindFramebuffer(L.FRAMEBUFFER, ve);
        try {
          const Ee = x.textures[de], Ne = Ee.format, Oe = Ee.type;
          if (x.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + de), !S.textureFormatReadable(Ne)) {
            Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!S.textureTypeReadable(Oe)) {
            Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          D >= 0 && D <= x.width - F && H >= 0 && H <= x.height - B && L.readPixels(D, H, F, B, ue.convert(Ne), ue.convert(Oe), pe);
        } finally {
          const Ee = J !== null ? G.get(J).__webglFramebuffer : null;
          d.bindFramebuffer(L.FRAMEBUFFER, Ee);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(x, D, H, F, B, pe, _e, de = 0) {
      if (!(x && x.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let ve = G.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && _e !== void 0 && (ve = ve[_e]), ve)
        if (D >= 0 && D <= x.width - F && H >= 0 && H <= x.height - B) {
          d.bindFramebuffer(L.FRAMEBUFFER, ve);
          const Ee = x.textures[de], Ne = Ee.format, Oe = Ee.type;
          if (x.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + de), !S.textureFormatReadable(Ne))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!S.textureTypeReadable(Oe))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          const ye = L.createBuffer();
          L.bindBuffer(L.PIXEL_PACK_BUFFER, ye), L.bufferData(L.PIXEL_PACK_BUFFER, pe.byteLength, L.STREAM_READ), L.readPixels(D, H, F, B, ue.convert(Ne), ue.convert(Oe), 0);
          const Ke = J !== null ? G.get(J).__webglFramebuffer : null;
          d.bindFramebuffer(L.FRAMEBUFFER, Ke);
          const ot = L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return L.flush(), await Tc(L, ot, 4), L.bindBuffer(L.PIXEL_PACK_BUFFER, ye), L.getBufferSubData(L.PIXEL_PACK_BUFFER, 0, pe), L.deleteBuffer(ye), L.deleteSync(ot), pe;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(x, D = null, H = 0) {
      const F = Math.pow(2, -H), B = Math.floor(x.image.width * F), pe = Math.floor(x.image.height * F), _e = D !== null ? D.x : 0, de = D !== null ? D.y : 0;
      k.setTexture2D(x, 0), L.copyTexSubImage2D(L.TEXTURE_2D, H, 0, 0, _e, de, B, pe), d.unbindTexture();
    }, this.copyTextureToTexture = function(x, D, H = null, F = null, B = 0, pe = 0) {
      let _e, de, ve, Ee, Ne, Oe, ye, Ke, ot;
      const rt = x.isCompressedTexture ? x.mipmaps[pe] : x.image;
      if (H !== null)
        _e = H.max.x - H.min.x, de = H.max.y - H.min.y, ve = H.isBox3 ? H.max.z - H.min.z : 1, Ee = H.min.x, Ne = H.min.y, Oe = H.isBox3 ? H.min.z : 0;
      else {
        const lt = Math.pow(2, -B);
        _e = Math.floor(rt.width * lt), de = Math.floor(rt.height * lt), x.isDataArrayTexture ? ve = rt.depth : x.isData3DTexture ? ve = Math.floor(rt.depth * lt) : ve = 1, Ee = 0, Ne = 0, Oe = 0;
      }
      F !== null ? (ye = F.x, Ke = F.y, ot = F.z) : (ye = 0, Ke = 0, ot = 0);
      const Je = ue.convert(D.format), Mt = ue.convert(D.type);
      let ge;
      D.isData3DTexture ? (k.setTexture3D(D, 0), ge = L.TEXTURE_3D) : D.isDataArrayTexture || D.isCompressedArrayTexture ? (k.setTexture2DArray(D, 0), ge = L.TEXTURE_2D_ARRAY) : (k.setTexture2D(D, 0), ge = L.TEXTURE_2D), d.activeTexture(L.TEXTURE0), d.pixelStorei(L.UNPACK_FLIP_Y_WEBGL, D.flipY), d.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha), d.pixelStorei(L.UNPACK_ALIGNMENT, D.unpackAlignment);
      const Ct = d.getParameter(L.UNPACK_ROW_LENGTH), We = d.getParameter(L.UNPACK_IMAGE_HEIGHT), It = d.getParameter(L.UNPACK_SKIP_PIXELS), Yt = d.getParameter(L.UNPACK_SKIP_ROWS), Mn = d.getParameter(L.UNPACK_SKIP_IMAGES);
      d.pixelStorei(L.UNPACK_ROW_LENGTH, rt.width), d.pixelStorei(L.UNPACK_IMAGE_HEIGHT, rt.height), d.pixelStorei(L.UNPACK_SKIP_PIXELS, Ee), d.pixelStorei(L.UNPACK_SKIP_ROWS, Ne), d.pixelStorei(L.UNPACK_SKIP_IMAGES, Oe);
      const qn = x.isDataArrayTexture || x.isData3DTexture, Qe = D.isDataArrayTexture || D.isData3DTexture;
      if (x.isDepthTexture) {
        const lt = G.get(x), Sn = G.get(D), et = G.get(lt.__renderTarget), En = G.get(Sn.__renderTarget);
        d.bindFramebuffer(L.READ_FRAMEBUFFER, et.__webglFramebuffer), d.bindFramebuffer(L.DRAW_FRAMEBUFFER, En.__webglFramebuffer);
        for (let Yn = 0; Yn < ve; Yn++)
          qn && (L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, G.get(x).__webglTexture, B, Oe + Yn), L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, G.get(D).__webglTexture, pe, ot + Yn)), L.blitFramebuffer(Ee, Ne, _e, de, ye, Ke, _e, de, L.DEPTH_BUFFER_BIT, L.NEAREST);
        d.bindFramebuffer(L.READ_FRAMEBUFFER, null), d.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else if (B !== 0 || x.isRenderTargetTexture || G.has(x)) {
        const lt = G.get(x), Sn = G.get(D);
        d.bindFramebuffer(L.READ_FRAMEBUFFER, Y), d.bindFramebuffer(L.DRAW_FRAMEBUFFER, O);
        for (let et = 0; et < ve; et++)
          qn ? L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, lt.__webglTexture, B, Oe + et) : L.framebufferTexture2D(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, lt.__webglTexture, B), Qe ? L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, Sn.__webglTexture, pe, ot + et) : L.framebufferTexture2D(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, Sn.__webglTexture, pe), B !== 0 ? L.blitFramebuffer(Ee, Ne, _e, de, ye, Ke, _e, de, L.COLOR_BUFFER_BIT, L.NEAREST) : Qe ? L.copyTexSubImage3D(ge, pe, ye, Ke, ot + et, Ee, Ne, _e, de) : L.copyTexSubImage2D(ge, pe, ye, Ke, Ee, Ne, _e, de);
        d.bindFramebuffer(L.READ_FRAMEBUFFER, null), d.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else
        Qe ? x.isDataTexture || x.isData3DTexture ? L.texSubImage3D(ge, pe, ye, Ke, ot, _e, de, ve, Je, Mt, rt.data) : D.isCompressedArrayTexture ? L.compressedTexSubImage3D(ge, pe, ye, Ke, ot, _e, de, ve, Je, rt.data) : L.texSubImage3D(ge, pe, ye, Ke, ot, _e, de, ve, Je, Mt, rt) : x.isDataTexture ? L.texSubImage2D(L.TEXTURE_2D, pe, ye, Ke, _e, de, Je, Mt, rt.data) : x.isCompressedTexture ? L.compressedTexSubImage2D(L.TEXTURE_2D, pe, ye, Ke, rt.width, rt.height, Je, rt.data) : L.texSubImage2D(L.TEXTURE_2D, pe, ye, Ke, _e, de, Je, Mt, rt);
      d.pixelStorei(L.UNPACK_ROW_LENGTH, Ct), d.pixelStorei(L.UNPACK_IMAGE_HEIGHT, We), d.pixelStorei(L.UNPACK_SKIP_PIXELS, It), d.pixelStorei(L.UNPACK_SKIP_ROWS, Yt), d.pixelStorei(L.UNPACK_SKIP_IMAGES, Mn), pe === 0 && D.generateMipmaps && L.generateMipmap(ge), d.unbindTexture();
    }, this.initRenderTarget = function(x) {
      G.get(x).__webglFramebuffer === void 0 && k.setupRenderTarget(x);
    }, this.initTexture = function(x) {
      x.isCubeTexture ? k.setTextureCube(x, 0) : x.isData3DTexture ? k.setTexture3D(x, 0) : x.isDataArrayTexture || x.isCompressedArrayTexture ? k.setTexture2DArray(x, 0) : k.setTexture2D(x, 0), d.unbindTexture();
    }, this.resetState = function() {
      X = 0, V = 0, J = null, d.reset(), me.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  /**
   * Defines the coordinate system of the renderer.
   *
   * In `WebGLRenderer`, the value is always `WebGLCoordinateSystem`.
   *
   * @type {WebGLCoordinateSystem|WebGPUCoordinateSystem}
   * @default WebGLCoordinateSystem
   * @readonly
   */
  get coordinateSystem() {
    return Qt;
  }
  /**
   * Defines the output color space of the renderer.
   *
   * @type {SRGBColorSpace|LinearSRGBColorSpace}
   * @default SRGBColorSpace
   */
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = Ge._getDrawingBufferColorSpace(e), t.unpackColorSpace = Ge._getUnpackColorSpace();
  }
}
class hm {
  /**
   * Returns `true` if WebGL 2 is available.
   *
   * @return {boolean} Whether WebGL 2 is available or not.
   */
  static isWebGL2Available() {
    try {
      const e = document.createElement("canvas");
      return !!(window.WebGL2RenderingContext && e.getContext("webgl2"));
    } catch {
      return !1;
    }
  }
  /**
   * Returns `true` if the given color space is available. This method can only be used
   * if WebGL 2 is supported.
   *
   * @param {string} colorSpace - The color space to test.
   * @return {boolean} Whether the given color space is available or not.
   */
  static isColorSpaceAvailable(e) {
    try {
      const t = document.createElement("canvas"), n = window.WebGL2RenderingContext && t.getContext("webgl2");
      return n.drawingBufferColorSpace = e, n.drawingBufferColorSpace === e;
    } catch {
      return !1;
    }
  }
  /**
   * Returns a `div` element representing a formatted error message that can be appended in
   * web sites if WebGL 2 isn't supported.
   *
   * @return {HTMLDivElement} A `div` element representing a formatted error message that WebGL 2 isn't supported.
   */
  static getWebGL2ErrorMessage() {
    return this._getErrorMessage(2);
  }
  // private
  static _getErrorMessage(e) {
    const t = {
      1: "WebGL",
      2: "WebGL 2"
    }, n = {
      1: window.WebGLRenderingContext,
      2: window.WebGL2RenderingContext
    };
    let r = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';
    const s = document.createElement("div");
    return s.id = "webglmessage", s.style.fontFamily = "monospace", s.style.fontSize = "13px", s.style.fontWeight = "normal", s.style.textAlign = "center", s.style.background = "#fff", s.style.color = "#000", s.style.padding = "1.5em", s.style.width = "400px", s.style.margin = "5em auto 0", n[e] ? r = r.replace("$0", "graphics card") : r = r.replace("$0", "browser"), r = r.replace("$1", t[e]), s.innerHTML = r, s;
  }
}
const No = [25284, 1341641, 15329769, 5066061];
function fm(i) {
  const e = Math.min(Math.max(i, 0), 1);
  return e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;
}
function yl(i) {
  const e = Math.max(Math.trunc(i), 1);
  return No[e % No.length];
}
function dm(i) {
  return yl(Math.max(Math.trunc(i), 0) + 1);
}
const un = 1e3, hn = 0.52, ci = 7.2, Ri = 0.62;
class Fo {
  constructor(e) {
    this.scene = new Gc(), this.camera = new Tr(-4, 4, 5, -5, 0.1, 80), this.timer = new fu(), this.tower = new ui(), this.effects = new ui(), this.boxGeometry = new vi(1, 1, 1), this.groundGeometry = new zi(80, 80), this.palette = [
      new si({ color: 25284, roughness: 0.58, metalness: 0.04 }),
      new si({ color: 1341641, roughness: 0.56, metalness: 0.04 }),
      new si({ color: 15329769, roughness: 0.62, metalness: 0.02 }),
      new si({ color: 5066061, roughness: 0.64, metalness: 0.02 })
    ], this.activeMaterial = new si({
      color: 1476829,
      emissive: 270906,
      emissiveIntensity: 0.15,
      roughness: 0.42
    }), this.groundMaterial = new si({
      color: 328965,
      roughness: 0.96,
      metalness: 0
    }), this.perfectLight = new ou(12576255, 0, 7, 1.8), this.placed = [], this.fragments = [], this.processedBlocks = 0, this.firstFrame = !0, this.perfectStreak = 0, this.perfectPulseAge = 10, this.cameraTarget = { x: 0, y: 1.3, z: 0 }, this.cameraLiftFromY = 1.3, this.cameraLiftToY = 1.3, this.cameraLiftElapsed = Ri, this.cameraLevel = 0, this.disposed = !1, this.renderer = new um({
      canvas: e,
      alpha: !1,
      antialias: !0,
      powerPreference: "high-performance",
      preserveDrawingBuffer: !1
    }), this.renderer.setClearColor(new Be(328965), 1), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = Di, this.scene.background = new Be(328965), this.scene.fog = new da(328965, 15, 35), this.scene.add(this.tower, this.effects);
    const t = new su(16251903, 1053722, 2.05), n = new cu(16777215, 2.6);
    n.position.set(-7, 11, 8), n.castShadow = !0, n.shadow.mapSize.set(512, 512), n.shadow.camera.left = -8, n.shadow.camera.right = 8, n.shadow.camera.top = 12, n.shadow.camera.bottom = -4, n.shadow.camera.near = 1, n.shadow.camera.far = 30, n.shadow.bias = -4e-4, this.scene.add(t, n, this.perfectLight);
    const r = new Wt(this.groundGeometry, this.groundMaterial);
    r.rotation.x = -Math.PI / 2, r.position.y = -hn / 2 - 0.02, r.receiveShadow = !0, this.scene.add(r), this.foundation = this.createMesh(
      { centerXMilli: 0, centerZMilli: 0, sizeXMilli: 3e3, sizeZMilli: 3e3 },
      0,
      this.palette[0]
    ), this.moving = this.createMesh(
      { centerXMilli: 0, centerZMilli: 0, sizeXMilli: 3e3, sizeZMilli: 3e3 },
      hn,
      this.activeMaterial
    ), this.moving.visible = !1, this.tower.add(this.foundation, this.moving), this.camera.position.set(ci, ci + 1, ci), this.camera.lookAt(0, 1, 0), this.timer.connect(document);
  }
  static isSupported() {
    return typeof document < "u" && hm.isWebGL2Available();
  }
  resize(e, t, n) {
    if (this.disposed) return;
    const r = Math.max(t, 1), s = Math.max(e, 1) / r, o = Math.max(s < 0.72 ? 5.2 : 4.4, 2.45 / s);
    this.camera.left = -o * s, this.camera.right = o * s, this.camera.top = o, this.camera.bottom = -o, this.camera.updateProjectionMatrix(), this.renderer.setPixelRatio(n), this.renderer.setSize(Math.max(e, 1), r, !1);
  }
  start(e) {
    this.disposed || this.renderer.setAnimationLoop((t) => {
      this.timer.update(t), e(t, Math.min(this.timer.getDelta(), 0.05));
    });
  }
  stop() {
    this.disposed || this.renderer.setAnimationLoop(null);
  }
  render(e, t) {
    this.disposed || (this.syncFoundation(e.rules), this.syncPlacedBlocks(e, !this.firstFrame), this.firstFrame = !1, this.syncMovingBlock(e), this.animateFragments(t, e.reducedMotion), this.animatePerfectEffect(e, t), this.followTower(e, t), this.renderer.render(this.scene, this.camera));
  }
  dispose(e = !0) {
    if (!this.disposed) {
      this.stop(), this.disposed = !0, this.timer.dispose(), this.boxGeometry.dispose(), this.groundGeometry.dispose();
      for (const t of [...this.palette, this.activeMaterial, this.groundMaterial])
        t.dispose();
      this.scene.clear(), this.renderer.renderLists.dispose(), this.renderer.dispose(), e && this.renderer.forceContextLoss();
    }
  }
  syncFoundation(e) {
    const t = e.baseSizeMilli / un;
    this.foundation.scale.set(t, hn, t);
  }
  syncPlacedBlocks(e, t) {
    e.state.blocks.length < this.processedBlocks && this.clearRunMeshes();
    for (let n = this.processedBlocks; n < e.state.blocks.length; n += 1) {
      const r = e.state.blocks[n];
      if (!r) continue;
      const s = this.placed.length + 1, a = this.palette[s % this.palette.length];
      if (a.color.setHex(yl(s)), r.placed) {
        const o = this.createMesh(r.placed, s * hn, a);
        this.placed.push(o), this.tower.add(o);
      }
      if (r.isPerfect && !r.isMiss ? (this.perfectStreak += 1, this.perfectPulseAge = 0) : this.perfectStreak = 0, r.overhang && t) {
        const o = this.createMesh(r.overhang, s * hn, a);
        this.effects.add(o);
        const c = r.centerMilli >= e.state.centres[r.axis] ? 1 : -1;
        this.fragments.push({
          mesh: o,
          velocityY: r.isMiss ? 0.2 : 0.6,
          spinX: r.axis === "Z" ? 1.8 * c : 0.55,
          spinZ: r.axis === "X" ? -1.8 * c : -0.55,
          age: 0
        });
      }
    }
    this.processedBlocks = e.state.blocks.length;
  }
  syncMovingBlock(e) {
    if (this.moving.visible = e.running, !e.running) return;
    const t = (e.state.events.length + 1) % 2 ? "X" : "Z", n = {
      centerXMilli: t === "X" ? e.movingPositionMilli : e.state.centres.X,
      centerZMilli: t === "Z" ? e.movingPositionMilli : e.state.centres.Z,
      sizeXMilli: e.state.sizes.X,
      sizeZMilli: e.state.sizes.Z
    }, r = dm(this.placed.length);
    this.activeMaterial.color.setHex(r), this.activeMaterial.emissive.setHex(r), this.applyFootprint(this.moving, n, (this.placed.length + 1) * hn);
  }
  animateFragments(e, t) {
    for (let n = this.fragments.length - 1; n >= 0; n -= 1) {
      const r = this.fragments[n];
      r && (r.age += e, t ? r.age = 2 : (r.velocityY -= 8.8 * e, r.mesh.position.y += r.velocityY * e, r.mesh.rotation.x += r.spinX * e, r.mesh.rotation.z += r.spinZ * e), (r.age > 1.45 || r.mesh.position.y < -4) && (this.effects.remove(r.mesh), this.fragments.splice(n, 1)));
    }
  }
  followTower(e, t) {
    const n = {
      x: e.state.centres.X / un,
      y: Math.max(1.25, (this.placed.length + 1) * hn - 1.25),
      z: e.state.centres.Z / un
    };
    if (this.cameraLevel !== this.placed.length && (this.cameraLevel = this.placed.length, this.cameraLiftFromY = this.cameraTarget.y, this.cameraLiftToY = n.y, this.cameraLiftElapsed = 0), e.reducedMotion || t <= 0)
      this.cameraLiftElapsed = Ri, this.cameraTarget.y = n.y;
    else {
      this.cameraLiftElapsed = Math.min(
        this.cameraLiftElapsed + t,
        Ri
      );
      const s = this.cameraLiftElapsed / Ri, a = fm(s);
      this.cameraTarget.y = this.cameraLiftFromY + (this.cameraLiftToY - this.cameraLiftFromY) * a;
    }
    const r = e.reducedMotion || t <= 0 ? 1 : 1 - Math.exp(-3.2 * t);
    this.cameraTarget.x += (n.x - this.cameraTarget.x) * r, this.cameraTarget.z += (n.z - this.cameraTarget.z) * r, this.camera.position.set(
      this.cameraTarget.x + ci,
      this.cameraTarget.y + ci * 0.9,
      this.cameraTarget.z + ci
    ), this.camera.lookAt(this.cameraTarget.x, this.cameraTarget.y, this.cameraTarget.z);
  }
  animatePerfectEffect(e, t) {
    this.perfectPulseAge += t;
    const n = e.reducedMotion ? 0 : 0.72, r = n > 0 ? Math.min(this.perfectPulseAge / n, 1) : 1, s = r < 1 ? Math.sin(r * Math.PI) : 0, a = Math.min(this.perfectStreak, 5);
    this.perfectLight.intensity = s * (2.4 + a * 0.8), this.perfectLight.position.set(
      e.state.centres.X / un,
      (this.placed.length + 1) * hn + 1.2,
      e.state.centres.Z / un
    ), this.activeMaterial.emissiveIntensity = 0.15 + s * (0.25 + a * 0.08);
  }
  createMesh(e, t, n) {
    const r = new Wt(this.boxGeometry, n);
    return r.castShadow = !0, r.receiveShadow = !0, this.applyFootprint(r, e, t), r;
  }
  applyFootprint(e, t, n) {
    e.position.set(t.centerXMilli / un, n, t.centerZMilli / un), e.scale.set(
      Math.max(t.sizeXMilli / un, 1e-3),
      hn,
      Math.max(t.sizeZMilli / un, 1e-3)
    );
  }
  clearRunMeshes() {
    for (const e of this.placed) this.tower.remove(e);
    for (const e of this.fragments) this.effects.remove(e.mesh);
    this.placed.length = 0, this.fragments.length = 0, this.processedBlocks = 0, this.perfectStreak = 0, this.perfectPulseAge = 10, this.perfectLight.intensity = 0, this.cameraTarget = { x: 0, y: 1.3, z: 0 }, this.cameraLiftFromY = 1.3, this.cameraLiftToY = 1.3, this.cameraLiftElapsed = Ri, this.cameraLevel = 0;
  }
}
const pm = ["disabled", "aria-describedby", "onKeydown"], mm = {
  key: 0,
  class: "stack-fallback-note"
}, gm = { class: "sr-only" }, _m = /* @__PURE__ */ Ll({
  __name: "StackCanvas",
  props: {
    rules: {},
    runId: {},
    seed: {},
    running: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["place", "ended", "timeout"],
  setup(i, { emit: e }) {
    const t = i, n = e, r = Ft(null), s = Ft(null), a = Ft(null), o = Ft(Lr(t.rules)), c = Ft(!1), l = Ft(!1);
    let h = null, p = null, u = null, g = 0, v = 0, E = 0, m = -t.rules.movementRangeMilli, f = null, A = 0, w = null, M = !1;
    const b = Da(() => o.value.events.length), y = Da(
      () => `${b.value} ${Fl(b.value, "блок", "блока", "блоков")}`
    );
    Cr(() => t.runId, (Q) => {
      !Q || Q === f || (f = Q, T(t.rules));
    }), Cr(() => t.rules, (Q) => {
      t.running && t.runId ? T(Q) : f || _(Q);
    }, { deep: !0 }), Cr(() => t.running, (Q) => {
      Q && o.value.status !== "ENDED" ? (O(), ee()) : A > performance.now() ? O() : (se(), h == null || h.stop(), V(performance.now(), 0));
    }), Oo(() => {
      var Q;
      u = window.matchMedia("(prefers-reduced-motion: reduce)"), c.value = u.matches, (Q = u.addEventListener) == null || Q.call(u, "change", P), R(), p = new ResizeObserver(X), r.value && p.observe(r.value), X(), document.addEventListener("visibilitychange", N), Dl(() => V(performance.now(), 0));
    }), Bo(() => {
      var Q, be, Re;
      se(), (Q = s.value) == null || Q.removeEventListener("webglcontextlost", q), (be = s.value) == null || be.removeEventListener("webglcontextrestored", Y), h == null || h.stop(), h == null || h.dispose(), h = null, p == null || p.disconnect(), (Re = u == null ? void 0 : u.removeEventListener) == null || Re.call(u, "change", P), document.removeEventListener("visibilitychange", N);
    });
    function R(Q = !1, be = !0) {
      const Re = s.value;
      Re == null || Re.removeEventListener("webglcontextlost", q), Re == null || Re.removeEventListener("webglcontextrestored", Y), h == null || h.stop(), h == null || h.dispose(be), h = null;
      const Pe = a.value;
      if (!Q && Re && Fo.isSupported())
        try {
          h = new Fo(Re), l.value = !1, Re.addEventListener("webglcontextlost", q), Re.addEventListener("webglcontextrestored", Y);
        } catch {
          h = null;
        }
      !h && Pe && (h = new kl(Pe), l.value = !0), Q && Re && Re.addEventListener("webglcontextrestored", Y), X(), t.running && !document.hidden && O();
    }
    function _(Q = t.rules) {
      o.value = Lr(Q), m = -Q.movementRangeMilli, V(performance.now(), 0);
    }
    function T(Q) {
      g = performance.now(), v = document.hidden ? g : 0, E = 0, m = -Q.movementRangeMilli, o.value = { ...Lr(Q), status: "PLAYING" }, A = 0, M = !1, t.running ? (O(), ee()) : V(performance.now(), 0);
    }
    function I(Q) {
      var Z;
      if (Q instanceof PointerEvent && (!Q.isPrimary || Q.button !== 0) || Q instanceof KeyboardEvent && Q.repeat || !t.running || t.disabled || M || o.value.status === "ENDED") return;
      const be = Math.max(Math.round(J(performance.now())), 1), Re = ((Z = o.value.events.at(-1)) == null ? void 0 : Z.elapsedMs) ?? 0, Pe = be - Re;
      if (!(Pe < t.rules.minEventIntervalMs)) {
        if (Pe > t.rules.maxEventIntervalMs) {
          oe();
          return;
        }
        m = Ia(
          t.rules,
          t.seed,
          o.value.events.length + 1,
          Pe
        ), o.value = Gl(o.value, m, be), n("place", o.value), V(performance.now(), 0), o.value.status === "ENDED" || o.value.events.length >= t.rules.maxEvents ? (se(), A = c.value ? 0 : performance.now() + 1500, A ? O() : h == null || h.stop(), n("ended", o.value)) : ee();
      }
    }
    function P(Q) {
      c.value = Q.matches, V(performance.now(), 0);
    }
    function N() {
      document.hidden ? (se(), v = performance.now(), h == null || h.stop()) : t.running && o.value.status !== "ENDED" ? (v && (E += performance.now() - v), v = 0, O(), ee()) : V(performance.now(), 0);
    }
    function q(Q) {
      Q.preventDefault(), R(!0, !1), V(performance.now(), 0);
    }
    function Y() {
      R(), V(performance.now(), 0);
    }
    function O() {
      !h || document.hidden || h.start((Q, be) => V(Q, be));
    }
    function X() {
      const Q = r.value;
      if (!Q || !h) return;
      const be = Math.max(Q.clientWidth, 1), Re = Math.max(Q.clientHeight, 1), Pe = Math.min(window.devicePixelRatio || 1, 1.75);
      h.resize(be, Re, Pe), V(performance.now(), 0);
    }
    function V(Q, be) {
      var Pe;
      if (!h) return;
      if (t.running && o.value.status !== "ENDED") {
        const Z = Math.max(J(Q), 0), ie = ((Pe = o.value.events.at(-1)) == null ? void 0 : Pe.elapsedMs) ?? 0, te = Math.max(Math.round(Z) - ie, 0);
        m = Ia(
          t.rules,
          t.seed,
          o.value.events.length + 1,
          te
        );
      }
      const Re = {
        rules: t.rules,
        state: o.value,
        movingPositionMilli: m,
        running: t.running && o.value.status !== "ENDED",
        reducedMotion: c.value
      };
      h.render(Re, be), !t.running && A && Q >= A && (A = 0, h.stop());
    }
    function J(Q) {
      const be = v ? Q - v : 0;
      return Q - g - E - be;
    }
    function ee() {
      var Pe;
      if (se(), !t.running || document.hidden || M || o.value.status === "ENDED") return;
      const Q = Math.max(Math.round(J(performance.now())), 0), be = ((Pe = o.value.events.at(-1)) == null ? void 0 : Pe.elapsedMs) ?? 0, Re = t.rules.maxEventIntervalMs - (Q - be);
      if (Re <= 0) {
        oe();
        return;
      }
      w = globalThis.setTimeout(() => {
        w = null, ee();
      }, Math.max(Re + 1, 1));
    }
    function oe() {
      M || !t.running || o.value.status === "ENDED" || (M = !0, se(), h == null || h.stop(), n("timeout"));
    }
    function se() {
      w !== null && globalThis.clearTimeout(w), w = null;
    }
    return (Q, be) => (mr(), gr("section", {
      ref_key: "stage",
      ref: r,
      class: Il(["stack-stage", { "is-fallback": l.value }])
    }, [
      Vt("canvas", {
        ref_key: "webglCanvas",
        ref: s,
        class: "stack-scene stack-scene--webgl",
        "aria-hidden": "true"
      }, null, 512),
      Vt("canvas", {
        ref_key: "fallbackCanvas",
        ref: a,
        class: "stack-scene stack-scene--fallback",
        "aria-hidden": "true"
      }, null, 512),
      Vt("button", {
        class: "stack-input",
        type: "button",
        disabled: i.disabled || !i.running,
        "aria-label": "Игровое поле Stack",
        "aria-describedby": i.running ? "stack-control-help" : void 0,
        onPointerdown: Pr(I, ["prevent"]),
        onKeydown: [
          La(Pr(I, ["prevent"]), ["space"]),
          La(Pr(I, ["prevent"]), ["enter"])
        ]
      }, [...be[0] || (be[0] = [
        Vt("span", { class: "sr-only" }, "Поставить движущийся блок", -1)
      ])], 40, pm),
      l.value ? (mr(), gr("span", mm, " Упрощённая графика: 3D недоступно на этом устройстве ")) : zo("", !0),
      Vt("span", gm, Ci(y.value), 1)
    ], 2));
  }
}), xm = /* @__PURE__ */ Go(_m, [["__scopeId", "data-v-8cfea91f"]]), vm = { class: "stack-box" }, Mm = {
  class: "stack-counter",
  "aria-live": "polite"
}, Sm = {
  key: 0,
  class: "stack-overlay"
}, Em = {
  id: "stack-control-help",
  class: "demo-status",
  role: "status"
}, ym = {
  __name: "StackDemo",
  setup(i) {
    const e = { rulesVersion: 1, baseSizeMilli: 3e3, minOverlapMilli: 120, perfectToleranceMilli: 90, movementRangeMilli: 4200, initialSpeedMilliPerSecond: 1800, speedStepMilliPerSecond: 85, maxSpeedMilliPerSecond: 3200, minEventIntervalMs: 180, maxEventIntervalMs: 15e3, runTtlSeconds: 300, maxEvents: 100 }, t = Ft(!1), n = Ft(null), r = Ft(1), s = Ft(0), a = Ft("Останавливайте блоки друг над другом."), o = Ft();
    let c;
    function l() {
      s.value = 0, r.value = Math.floor(Math.random() * 1e5), n.value = crypto.randomUUID(), t.value = !0, a.value = "Нажимайте на поле или используйте пробел.";
    }
    function h(u) {
      var g;
      s.value = u.blocks.filter((v) => !v.isMiss).length, (g = u.blocks.at(-1)) != null && g.isPerfect ? a.value = "Идеально! Размер блока сохранён." : a.value = "Следующий блок — по другой оси.";
    }
    function p() {
      t.value = !1, a.value = `Башня: ${s.value} блоков. Попробуем ещё?`;
    }
    return Oo(() => {
      c = new IntersectionObserver(([u]) => {
        !u.isIntersecting && t.value && (t.value = !1, a.value = "Раунд остановлен. Можно начать заново.");
      }), c.observe(o.value);
    }), Bo(() => c == null ? void 0 : c.disconnect()), (u, g) => (mr(), gr("div", {
      ref_key: "root",
      ref: o,
      class: "stack-demo"
    }, [
      Vt("div", vm, [
        Ul(xm, {
          rules: e,
          "run-id": n.value,
          seed: r.value,
          running: t.value,
          onPlace: h,
          onEnded: p,
          onTimeout: p
        }, null, 8, ["run-id", "seed", "running"]),
        Vt("div", Mm, [
          Nl(Ci(s.value), 1),
          g[0] || (g[0] = Vt("span", null, "БЛОКОВ", -1))
        ]),
        t.value ? zo("", !0) : (mr(), gr("div", Sm, [
          Vt("strong", null, Ci(n.value ? "Ещё выше?" : "STACK"), 1),
          Vt("button", {
            class: "demo-action",
            onClick: l
          }, Ci(n.value ? "Играть снова" : "Построить башню"), 1)
        ]))
      ]),
      Vt("p", Em, Ci(a.value), 1)
    ], 512));
  }
}, wm = /* @__PURE__ */ Go(ym, [["__scopeId", "data-v-5fe0561a"]]);
export {
  wm as default
};
