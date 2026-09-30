/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const Ue = "srgb", qi = "srgb-linear", Yi = "linear", ee = "srgb";
const fs = "300 es";
function eo(i) {
  for (let t = i.length - 1; t >= 0; --t)
    if (i[t] >= 65535) return !0;
  return !1;
}
function Zi(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function no() {
  const i = Zi("canvas");
  return i.style.display = "block", i;
}
const ds = {};
function ps(...i) {
  const t = "THREE." + i.shift();
  console.log(t, ...i);
}
function _a(i) {
  const t = i[0];
  if (typeof t == "string" && t.startsWith("TSL:")) {
    const e = i[1];
    e && e.isStackTrace ? i[0] += " " + e.getLocation() : i[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return i;
}
function Ut(...i) {
  i = _a(i);
  const t = "THREE." + i.shift();
  {
    const e = i[0];
    e && e.isStackTrace ? console.warn(e.getError(t)) : console.warn(t, ...i);
  }
}
function Jt(...i) {
  i = _a(i);
  const t = "THREE." + i.shift();
  {
    const e = i[0];
    e && e.isStackTrace ? console.error(e.getError(t)) : console.error(t, ...i);
  }
}
function Wn(...i) {
  const t = i.join(" ");
  t in ds || (ds[t] = !0, Ut(...i));
}
function io(i, t, e) {
  return new Promise(function(n, r) {
    function s() {
      switch (i.clientWaitSync(t, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          r();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(s, e);
          break;
        default:
          n();
      }
    }
    setTimeout(s, e);
  });
}
const ro = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
};
class Tn {
  /**
   * Adds the given event listener to the given event type.
   *
   * @param {string} type - The type of event to listen to.
   * @param {Function} listener - The function that gets called when the event is fired.
   */
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e);
  }
  /**
   * Returns `true` if the given event listener has been added to the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to check.
   * @return {boolean} Whether the given event listener has been added to the given event type.
   */
  hasEventListener(t, e) {
    const n = this._listeners;
    return n === void 0 ? !1 : n[t] !== void 0 && n[t].indexOf(e) !== -1;
  }
  /**
   * Removes the given event listener from the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to remove.
   */
  removeEventListener(t, e) {
    const n = this._listeners;
    if (n === void 0) return;
    const r = n[t];
    if (r !== void 0) {
      const s = r.indexOf(e);
      s !== -1 && r.splice(s, 1);
    }
  }
  /**
   * Dispatches an event object.
   *
   * @param {Object} event - The event that gets fired.
   */
  dispatchEvent(t) {
    const e = this._listeners;
    if (e === void 0) return;
    const n = e[t.type];
    if (n !== void 0) {
      t.target = this;
      const r = n.slice(0);
      for (let s = 0, a = r.length; s < a; s++)
        r[s].call(this, t);
      t.target = null;
    }
  }
}
const Te = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], er = Math.PI / 180, Nr = 180 / Math.PI;
function Kn() {
  const i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Te[i & 255] + Te[i >> 8 & 255] + Te[i >> 16 & 255] + Te[i >> 24 & 255] + "-" + Te[t & 255] + Te[t >> 8 & 255] + "-" + Te[t >> 16 & 15 | 64] + Te[t >> 24 & 255] + "-" + Te[e & 63 | 128] + Te[e >> 8 & 255] + "-" + Te[e >> 16 & 255] + Te[e >> 24 & 255] + Te[n & 255] + Te[n >> 8 & 255] + Te[n >> 16 & 255] + Te[n >> 24 & 255]).toLowerCase();
}
function Zt(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function so(i, t) {
  return (i % t + t) % t;
}
function nr(i, t, e) {
  return (1 - e) * i + e * t;
}
function ti(i, t) {
  switch (t.constructor) {
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
function Ce(i, t) {
  switch (t.constructor) {
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
const Qr = class Qr {
  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(t = 0, e = 0) {
    this.x = t, this.y = e;
  }
  /**
   * Alias for {@link Vector2#x}.
   *
   * @type {number}
   */
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  /**
   * Alias for {@link Vector2#y}.
   *
   * @type {number}
   */
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @return {Vector2} A reference to this vector.
   */
  set(t, e) {
    return this.x = t, this.y = e, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector2} A reference to this vector.
   */
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setX(t) {
    return this.x = t, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setY(t) {
    return this.y = t, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @param {number} value - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + t);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @return {number} A vector component value.
   */
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + t);
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
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector2} v - The vector to add.
   * @return {Vector2} A reference to this vector.
   */
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector2} A reference to this vector.
   */
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector2} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector2} A reference to this vector.
   */
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector2} v - The vector to subtract.
   * @return {Vector2} A reference to this vector.
   */
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector2} A reference to this vector.
   */
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector2} v - The vector to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector2} v - The vector to divide.
   * @return {Vector2} A reference to this vector.
   */
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2} A reference to this vector.
   */
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by
   * the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {Vector2} A reference to this vector.
   */
  applyMatrix3(t) {
    const e = this.x, n = this.y, r = t.elements;
    return this.x = r[0] * e + r[3] * n + r[6], this.y = r[1] * e + r[4] * n + r[7], this;
  }
  /**
   * If this vector's x or y value is greater than the given vector's x or y
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  /**
   * If this vector's x or y value is less than the given vector's x or y
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
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
  clamp(t, e) {
    return this.x = Zt(this.x, t.x, e.x), this.y = Zt(this.y, t.y, e.y), this;
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
  clampScalar(t, e) {
    return this.x = Zt(this.x, t, e), this.y = Zt(this.y, t, e), this;
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
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Zt(n, t, e));
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
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the cross product with.
   * @return {number} The result of the cross product.
   */
  cross(t) {
    return this.x * t.y - this.y * t.x;
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
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Zt(n, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector2} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y;
    return e * e + n * n;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector2} A reference to this vector.
   */
  setLength(t) {
    return this.normalize().multiplyScalar(t);
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
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
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
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector2} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]` and y
   * value to be `array[ offset + 1 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector2} A reference to this vector.
   */
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector2} A reference to this vector.
   */
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this;
  }
  /**
   * Rotates this vector around the given center by the given angle.
   *
   * @param {Vector2} center - The point around which to rotate.
   * @param {number} angle - The angle to rotate, in radians.
   * @return {Vector2} A reference to this vector.
   */
  rotateAround(t, e) {
    const n = Math.cos(e), r = Math.sin(e), s = this.x - t.x, a = this.y - t.y;
    return this.x = s * n - a * r + t.x, this.y = s * r + a * n + t.y, this;
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
Qr.prototype.isVector2 = !0;
let ut = Qr;
class Jn {
  /**
   * Constructs a new quaternion.
   *
   * @param {number} [x=0] - The x value of this quaternion.
   * @param {number} [y=0] - The y value of this quaternion.
   * @param {number} [z=0] - The z value of this quaternion.
   * @param {number} [w=1] - The w value of this quaternion.
   */
  constructor(t = 0, e = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = t, this._y = e, this._z = n, this._w = r;
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
  static slerpFlat(t, e, n, r, s, a, o) {
    let l = n[r + 0], c = n[r + 1], h = n[r + 2], f = n[r + 3], u = s[a + 0], p = s[a + 1], _ = s[a + 2], y = s[a + 3];
    if (f !== y || l !== u || c !== p || h !== _) {
      let m = l * u + c * p + h * _ + f * y;
      m < 0 && (u = -u, p = -p, _ = -_, y = -y, m = -m);
      let d = 1 - o;
      if (m < 0.9995) {
        const b = Math.acos(m), A = Math.sin(b);
        d = Math.sin(d * b) / A, o = Math.sin(o * b) / A, l = l * d + u * o, c = c * d + p * o, h = h * d + _ * o, f = f * d + y * o;
      } else {
        l = l * d + u * o, c = c * d + p * o, h = h * d + _ * o, f = f * d + y * o;
        const b = 1 / Math.sqrt(l * l + c * c + h * h + f * f);
        l *= b, c *= b, h *= b, f *= b;
      }
    }
    t[e] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = f;
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
  static multiplyQuaternionsFlat(t, e, n, r, s, a) {
    const o = n[r], l = n[r + 1], c = n[r + 2], h = n[r + 3], f = s[a], u = s[a + 1], p = s[a + 2], _ = s[a + 3];
    return t[e] = o * _ + h * f + l * p - c * u, t[e + 1] = l * _ + h * u + c * f - o * p, t[e + 2] = c * _ + h * p + o * u - l * f, t[e + 3] = h * _ - o * f - l * u - c * p, t;
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
  set x(t) {
    this._x = t, this._onChangeCallback();
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
  set y(t) {
    this._y = t, this._onChangeCallback();
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
  set z(t) {
    this._z = t, this._onChangeCallback();
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
  set w(t) {
    this._w = t, this._onChangeCallback();
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
  set(t, e, n, r) {
    return this._x = t, this._y = e, this._z = n, this._w = r, this._onChangeCallback(), this;
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
  copy(t) {
    return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the rotation specified by the given
   * Euler angles.
   *
   * @param {Euler} euler - The Euler angles.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromEuler(t, e = !0) {
    const n = t._x, r = t._y, s = t._z, a = t._order, o = Math.cos, l = Math.sin, c = o(n / 2), h = o(r / 2), f = o(s / 2), u = l(n / 2), p = l(r / 2), _ = l(s / 2);
    switch (a) {
      case "XYZ":
        this._x = u * h * f + c * p * _, this._y = c * p * f - u * h * _, this._z = c * h * _ + u * p * f, this._w = c * h * f - u * p * _;
        break;
      case "YXZ":
        this._x = u * h * f + c * p * _, this._y = c * p * f - u * h * _, this._z = c * h * _ - u * p * f, this._w = c * h * f + u * p * _;
        break;
      case "ZXY":
        this._x = u * h * f - c * p * _, this._y = c * p * f + u * h * _, this._z = c * h * _ + u * p * f, this._w = c * h * f - u * p * _;
        break;
      case "ZYX":
        this._x = u * h * f - c * p * _, this._y = c * p * f + u * h * _, this._z = c * h * _ - u * p * f, this._w = c * h * f + u * p * _;
        break;
      case "YZX":
        this._x = u * h * f + c * p * _, this._y = c * p * f + u * h * _, this._z = c * h * _ - u * p * f, this._w = c * h * f - u * p * _;
        break;
      case "XZY":
        this._x = u * h * f - c * p * _, this._y = c * p * f - u * h * _, this._z = c * h * _ + u * p * f, this._w = c * h * f + u * p * _;
        break;
      default:
        Ut("Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return e === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given axis and angle.
   *
   * @param {Vector3} axis - The normalized axis.
   * @param {number} angle - The angle in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromAxisAngle(t, e) {
    const n = e / 2, r = Math.sin(n);
    return this._x = t.x * r, this._y = t.y * r, this._z = t.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromRotationMatrix(t) {
    const e = t.elements, n = e[0], r = e[4], s = e[8], a = e[1], o = e[5], l = e[9], c = e[2], h = e[6], f = e[10], u = n + o + f;
    if (u > 0) {
      const p = 0.5 / Math.sqrt(u + 1);
      this._w = 0.25 / p, this._x = (h - l) * p, this._y = (s - c) * p, this._z = (a - r) * p;
    } else if (n > o && n > f) {
      const p = 2 * Math.sqrt(1 + n - o - f);
      this._w = (h - l) / p, this._x = 0.25 * p, this._y = (r + a) / p, this._z = (s + c) / p;
    } else if (o > f) {
      const p = 2 * Math.sqrt(1 + o - n - f);
      this._w = (s - c) / p, this._x = (r + a) / p, this._y = 0.25 * p, this._z = (l + h) / p;
    } else {
      const p = 2 * Math.sqrt(1 + f - n - o);
      this._w = (a - r) / p, this._x = (s + c) / p, this._y = (l + h) / p, this._z = 0.25 * p;
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
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return n < 1e-8 ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
  }
  /**
   * Returns the angle between this quaternion and the given one in radians.
   *
   * @param {Quaternion} q - The quaternion to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(t) {
    return 2 * Math.acos(Math.abs(Zt(this.dot(t), -1, 1)));
  }
  /**
   * Rotates this quaternion by a given angular step to the given quaternion.
   * The method ensures that the final quaternion will not overshoot `q`.
   *
   * @param {Quaternion} q - The target quaternion.
   * @param {number} step - The angular step in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  rotateTowards(t, e) {
    const n = this.angleTo(t);
    if (n === 0) return this;
    const r = Math.min(1, e / n);
    return this.slerp(t, r), this;
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
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
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
    let t = this.length();
    return t === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
  }
  /**
   * Multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  /**
   * Pre-multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  /**
   * Multiplies the given quaternions and stores the result in this instance.
   *
   * @param {Quaternion} a - The first quaternion.
   * @param {Quaternion} b - The second quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiplyQuaternions(t, e) {
    const n = t._x, r = t._y, s = t._z, a = t._w, o = e._x, l = e._y, c = e._z, h = e._w;
    return this._x = n * h + a * o + r * c - s * l, this._y = r * h + a * l + s * o - n * c, this._z = s * h + a * c + n * l - r * o, this._w = a * h - n * o - r * l - s * c, this._onChangeCallback(), this;
  }
  /**
   * Performs a spherical linear interpolation between this quaternion and the target quaternion.
   *
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerp(t, e) {
    let n = t._x, r = t._y, s = t._z, a = t._w, o = this.dot(t);
    o < 0 && (n = -n, r = -r, s = -s, a = -a, o = -o);
    let l = 1 - e;
    if (o < 0.9995) {
      const c = Math.acos(o), h = Math.sin(c);
      l = Math.sin(l * c) / h, e = Math.sin(e * c) / h, this._x = this._x * l + n * e, this._y = this._y * l + r * e, this._z = this._z * l + s * e, this._w = this._w * l + a * e, this._onChangeCallback();
    } else
      this._x = this._x * l + n * e, this._y = this._y * l + r * e, this._z = this._z * l + s * e, this._w = this._w * l + a * e, this.normalize();
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
  slerpQuaternions(t, e, n) {
    return this.copy(t).slerp(e, n);
  }
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  random() {
    const t = 2 * Math.PI * Math.random(), e = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(
      r * Math.sin(t),
      r * Math.cos(t),
      s * Math.sin(e),
      s * Math.cos(e)
    );
  }
  /**
   * Returns `true` if this quaternion is equal with the given one.
   *
   * @param {Quaternion} quaternion - The quaternion to test for equality.
   * @return {boolean} Whether this quaternion is equal with the given one.
   */
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  /**
   * Sets this quaternion's components from the given array.
   *
   * @param {Array<number>} array - An array holding the quaternion component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromArray(t, e = 0) {
    return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this quaternion to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The quaternion components.
   */
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
  }
  /**
   * Sets the components of this quaternion from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
   * @param {number} index - The index into the attribute.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromBufferAttribute(t, e) {
    return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this;
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
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
const jr = class jr {
  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(t = 0, e = 0, n = 0) {
    this.x = t, this.y = e, this.z = n;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @return {Vector3} A reference to this vector.
   */
  set(t, e, n) {
    return n === void 0 && (n = this.z), this.x = t, this.y = e, this.z = n, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector3} A reference to this vector.
   */
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  /**
   * Sets the vector's x component to the given value.
   *
   * @param {number} x - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setX(t) {
    return this.x = t, this;
  }
  /**
   * Sets the vector's y component to the given value.
   *
   * @param {number} y - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setY(t) {
    return this.y = t, this;
  }
  /**
   * Sets the vector's z component to the given value.
   *
   * @param {number} z - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setZ(t) {
    return this.z = t, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @param {number} value - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + t);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @return {number} A vector component value.
   */
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + t);
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
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector3} v - The vector to add.
   * @return {Vector3} A reference to this vector.
   */
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector3} A reference to this vector.
   */
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector3|Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector3} A reference to this vector.
   */
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector3} v - The vector to subtract.
   * @return {Vector3} A reference to this vector.
   */
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector3} A reference to this vector.
   */
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector3} v - The vector to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  /**
   * Multiplies the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  multiplyVectors(t, e) {
    return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
  }
  /**
   * Applies the given Euler rotation to this vector.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Vector3} A reference to this vector.
   */
  applyEuler(t) {
    return this.applyQuaternion(ms.setFromEuler(t));
  }
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   *
   * @param {Vector3} axis - A normalized vector representing the rotation axis.
   * @param {number} angle - The angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  applyAxisAngle(t, e) {
    return this.applyQuaternion(ms.setFromAxisAngle(t, e));
  }
  /**
   * Multiplies this vector with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix3(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * e + s[3] * n + s[6] * r, this.y = s[1] * e + s[4] * n + s[7] * r, this.z = s[2] * e + s[5] * n + s[8] * r, this;
  }
  /**
   * Multiplies this vector by the given normal matrix and normalizes
   * the result.
   *
   * @param {Matrix3} m - The normal matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
   * divides by perspective.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix4(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements, a = 1 / (s[3] * e + s[7] * n + s[11] * r + s[15]);
    return this.x = (s[0] * e + s[4] * n + s[8] * r + s[12]) * a, this.y = (s[1] * e + s[5] * n + s[9] * r + s[13]) * a, this.z = (s[2] * e + s[6] * n + s[10] * r + s[14]) * a, this;
  }
  /**
   * Applies the given Quaternion to this vector.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Vector3} A reference to this vector.
   */
  applyQuaternion(t) {
    const e = this.x, n = this.y, r = this.z, s = t.x, a = t.y, o = t.z, l = t.w, c = 2 * (a * r - o * n), h = 2 * (o * e - s * r), f = 2 * (s * n - a * e);
    return this.x = e + l * c + a * f - o * h, this.y = n + l * h + o * c - s * f, this.z = r + l * f + s * h - a * c, this;
  }
  /**
   * Projects this vector from world space into the camera's normalized
   * device coordinate (NDC) space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  /**
   * Unprojects this vector from the camera's normalized device coordinate (NDC)
   * space into world space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  /**
   * Transforms the direction of this vector by a matrix (the upper left 3 x 3
   * subset of the given 4x4 matrix and then normalizes the result.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Vector3} A reference to this vector.
   */
  transformDirection(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * e + s[4] * n + s[8] * r, this.y = s[1] * e + s[5] * n + s[9] * r, this.z = s[2] * e + s[6] * n + s[10] * r, this.normalize();
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector3} v - The vector to divide.
   * @return {Vector3} A reference to this vector.
   */
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector3} A reference to this vector.
   */
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  /**
   * If this vector's x, y or z value is greater than the given vector's x, y or z
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  /**
   * If this vector's x, y or z value is less than the given vector's x, y or z
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
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
  clamp(t, e) {
    return this.x = Zt(this.x, t.x, e.x), this.y = Zt(this.y, t.y, e.y), this.z = Zt(this.z, t.z, e.z), this;
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
  clampScalar(t, e) {
    return this.x = Zt(this.x, t, e), this.y = Zt(this.y, t, e), this.z = Zt(this.z, t, e), this;
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
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Zt(n, t, e));
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
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
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
  setLength(t) {
    return this.normalize().multiplyScalar(t);
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
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
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
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the cross product with.
   * @return {Vector3} The result of the cross product.
   */
  cross(t) {
    return this.crossVectors(this, t);
  }
  /**
   * Calculates the cross product of the given vectors and stores the result
   * in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  crossVectors(t, e) {
    const n = t.x, r = t.y, s = t.z, a = e.x, o = e.y, l = e.z;
    return this.x = r * l - s * o, this.y = s * a - n * l, this.z = n * o - r * a, this;
  }
  /**
   * Projects this vector onto the given one.
   *
   * @param {Vector3} v - The vector to project to.
   * @return {Vector3} A reference to this vector.
   */
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  /**
   * Projects this vector onto a plane by subtracting this
   * vector projected onto the plane's normal from this vector.
   *
   * @param {Vector3} planeNormal - The plane normal.
   * @return {Vector3} A reference to this vector.
   */
  projectOnPlane(t) {
    return ir.copy(this).projectOnVector(t), this.sub(ir);
  }
  /**
   * Reflects this vector off a plane orthogonal to the given normal vector.
   *
   * @param {Vector3} normal - The (normalized) normal vector.
   * @return {Vector3} A reference to this vector.
   */
  reflect(t) {
    return this.sub(ir.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector3} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Zt(n, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector3} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y, r = this.z - t.z;
    return e * e + n * n + r * r;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {Spherical} s - The spherical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The phi angle in radians.
   * @param {number} theta - The theta angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  setFromSphericalCoords(t, e, n) {
    const r = Math.sin(e) * t;
    return this.x = r * Math.sin(n), this.y = Math.cos(e) * t, this.z = r * Math.cos(n), this;
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {Cylindrical} c - The cylindrical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle in radians.
   * @param {number} y - The y value.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindricalCoords(t, e, n) {
    return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this;
  }
  /**
   * Sets the vector components to the scale elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(), r = this.setFromMatrixColumn(t, 2).length();
    return this.x = e, this.y = n, this.z = r, this;
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  /**
   * Sets the vector components from the given Euler angles.
   *
   * @param {Euler} e - The Euler angles to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  /**
   * Sets the vector components from the RGB components of the
   * given color.
   *
   * @param {Color} c - The color to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector3} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
   * and z value to be `array[ offset + 2 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector3} A reference to this vector.
   */
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector3} A reference to this vector.
   */
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
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
    const t = Math.random() * Math.PI * 2, e = Math.random() * 2 - 1, n = Math.sqrt(1 - e * e);
    return this.x = n * Math.cos(t), this.y = e, this.z = n * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
};
jr.prototype.isVector3 = !0;
let N = jr;
const ir = /* @__PURE__ */ new N(), ms = /* @__PURE__ */ new Jn(), ts = class ts {
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
  constructor(t, e, n, r, s, a, o, l, c) {
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
    ], t !== void 0 && this.set(t, e, n, r, s, a, o, l, c);
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
  set(t, e, n, r, s, a, o, l, c) {
    const h = this.elements;
    return h[0] = t, h[1] = r, h[2] = o, h[3] = e, h[4] = s, h[5] = l, h[6] = n, h[7] = a, h[8] = c, this;
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
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix3} A reference to this matrix.
   */
  extractBasis(t, e, n) {
    return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  /**
   * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  setFromMatrix4(t) {
    const e = t.elements;
    return this.set(
      e[0],
      e[4],
      e[8],
      e[1],
      e[5],
      e[9],
      e[2],
      e[6],
      e[10]
    ), this;
  }
  /**
   * Post-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  /**
   * Pre-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  /**
   * Multiples the given 3x3 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix3} a - The first matrix.
   * @param {Matrix3} b - The second matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyMatrices(t, e) {
    const n = t.elements, r = e.elements, s = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], h = n[4], f = n[7], u = n[2], p = n[5], _ = n[8], y = r[0], m = r[3], d = r[6], b = r[1], A = r[4], M = r[7], R = r[2], T = r[5], C = r[8];
    return s[0] = a * y + o * b + l * R, s[3] = a * m + o * A + l * T, s[6] = a * d + o * M + l * C, s[1] = c * y + h * b + f * R, s[4] = c * m + h * A + f * T, s[7] = c * d + h * M + f * C, s[2] = u * y + p * b + _ * R, s[5] = u * m + p * A + _ * T, s[8] = u * d + p * M + _ * C, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8];
    return e * a * h - e * o * c - n * s * h + n * o * l + r * s * c - r * a * l;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  invert() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], f = h * a - o * c, u = o * l - h * s, p = c * s - a * l, _ = e * f + n * u + r * p;
    if (_ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const y = 1 / _;
    return t[0] = f * y, t[1] = (r * c - h * n) * y, t[2] = (o * n - r * a) * y, t[3] = u * y, t[4] = (h * e - r * l) * y, t[5] = (r * s - o * e) * y, t[6] = p * y, t[7] = (n * l - c * e) * y, t[8] = (a * e - n * s) * y, this;
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  transpose() {
    let t;
    const e = this.elements;
    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
  }
  /**
   * Computes the normal matrix which is the inverse transpose of the upper
   * left 3x3 portion of the given 4x4 matrix.
   *
   * @param {Matrix4} matrix4 - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   *
   * @param {Array<number>} r - An array to store the transposed matrix elements.
   * @return {Matrix3} A reference to this matrix.
   */
  transposeIntoArray(t) {
    const e = this.elements;
    return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
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
  setUvTransform(t, e, n, r, s, a, o) {
    const l = Math.cos(s), c = Math.sin(s);
    return this.set(
      n * l,
      n * c,
      -n * (l * a + c * o) + a + t,
      -r * c,
      r * l,
      -r * (-c * a + l * o) + o + e,
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
  scale(t, e) {
    return Wn("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(rr.makeScale(t, e)), this;
  }
  /**
   * Rotates this matrix by the given angle.
   *
   * @deprecated
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  rotate(t) {
    return Wn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(rr.makeRotation(-t)), this;
  }
  /**
   * Translates this matrix by the given scalar values.
   *
   * @deprecated
   * @param {number} tx - The amount to translate in the X axis.
   * @param {number} ty - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  translate(t, e) {
    return Wn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(rr.makeTranslation(t, e)), this;
  }
  // for 2D Transforms
  /**
   * Sets this matrix as a 2D translation transform.
   *
   * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeTranslation(t, e) {
    return t.isVector2 ? this.set(
      1,
      0,
      t.x,
      0,
      1,
      t.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      t,
      0,
      1,
      e,
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
  makeRotation(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      -n,
      0,
      n,
      e,
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
  makeScale(t, e) {
    return this.set(
      t,
      0,
      0,
      0,
      e,
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
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let r = 0; r < 9; r++)
      if (e[r] !== n[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix3} A reference to this matrix.
   */
  fromArray(t, e = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = t[n + e];
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
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t;
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
ts.prototype.isMatrix3 = !0;
let Vt = ts;
const rr = /* @__PURE__ */ new Vt(), gs = /* @__PURE__ */ new Vt().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), _s = /* @__PURE__ */ new Vt().set(
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
function ao() {
  const i = {
    enabled: !0,
    workingColorSpace: qi,
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
      return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === ee && (r.r = rn(r.r), r.g = rn(r.g), r.b = rn(r.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === ee && (r.r = Xn(r.r), r.g = Xn(r.g), r.b = Xn(r.b))), r;
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
      return r === "" ? Yi : this.spaces[r].transfer;
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
      return Wn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), i.workingToColorSpace(r, s);
    },
    toWorkingColorSpace: function(r, s) {
      return Wn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), i.colorSpaceToWorking(r, s);
    }
  }, t = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], e = [0.2126, 0.7152, 0.0722], n = [0.3127, 0.329];
  return i.define({
    [qi]: {
      primaries: t,
      whitePoint: n,
      transfer: Yi,
      toXYZ: gs,
      fromXYZ: _s,
      luminanceCoefficients: e,
      workingColorSpaceConfig: { unpackColorSpace: Ue },
      outputColorSpaceConfig: { drawingBufferColorSpace: Ue }
    },
    [Ue]: {
      primaries: t,
      whitePoint: n,
      transfer: ee,
      toXYZ: gs,
      fromXYZ: _s,
      luminanceCoefficients: e,
      outputColorSpaceConfig: { drawingBufferColorSpace: Ue }
    }
  }), i;
}
const $t = /* @__PURE__ */ ao();
function rn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function Xn(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let Cn;
class oo {
  /**
   * Returns a data URI containing a representation of the given image.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
   * @param {string} [type='image/png'] - Indicates the image format.
   * @return {string} The data URI.
   */
  static getDataURL(t, e = "image/png") {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u")
      return t.src;
    let n;
    if (t instanceof HTMLCanvasElement)
      n = t;
    else {
      Cn === void 0 && (Cn = Zi("canvas")), Cn.width = t.width, Cn.height = t.height;
      const r = Cn.getContext("2d");
      t instanceof ImageData ? r.putImageData(t, 0, 0) : r.drawImage(t, 0, 0, t.width, t.height), n = Cn;
    }
    return n.toDataURL(e);
  }
  /**
   * Converts the given sRGB image data to linear color space.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
   * @return {HTMLCanvasElement|Object} The converted image.
   */
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const e = Zi("canvas");
      e.width = t.width, e.height = t.height;
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const r = n.getImageData(0, 0, t.width, t.height), s = r.data;
      for (let a = 0; a < s.length; a++)
        s[a] = rn(s[a] / 255) * 255;
      return n.putImageData(r, 0, 0), e;
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++)
        e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(rn(e[n] / 255) * 255) : e[n] = rn(e[n]);
      return {
        data: e,
        width: t.width,
        height: t.height
      };
    } else
      return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}
let lo = 0;
class kr {
  /**
   * Constructs a new video texture.
   *
   * @param {any} [data=null] - The data definition of a texture.
   */
  constructor(t = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: lo++ }), this.uuid = Kn(), this.data = t, this.dataReady = !0, this.version = 0;
  }
  /**
   * Returns the dimensions of the source into the given target vector.
   *
   * @param {(Vector2|Vector3)} target - The target object the result is written into.
   * @return {(Vector2|Vector3)} The dimensions of the source.
   */
  getSize(t) {
    const e = this.data;
    return typeof HTMLVideoElement < "u" && e instanceof HTMLVideoElement ? t.set(e.videoWidth, e.videoHeight, 0) : typeof VideoFrame < "u" && e instanceof VideoFrame ? t.set(e.displayWidth, e.displayHeight, 0) : e !== null ? t.set(e.width, e.height, e.depth || 0) : t.set(0, 0, 0), t;
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
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  /**
   * Serializes the source into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized source.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.images[this.uuid] !== void 0)
      return t.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let a = 0, o = r.length; a < o; a++)
          r[a].isDataTexture ? s.push(sr(r[a].image)) : s.push(sr(r[a]));
      } else
        s = sr(r);
      n.url = s;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function sr(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? oo.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (Ut("Texture: Unable to serialize Texture."), {});
}
let co = 0;
const ar = /* @__PURE__ */ new N();
class Re extends Tn {
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
  constructor(t = Re.DEFAULT_IMAGE, e = Re.DEFAULT_MAPPING, n = 1001, r = 1001, s = 1006, a = 1008, o = 1023, l = 1009, c = Re.DEFAULT_ANISOTROPY, h = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: co++ }), this.uuid = Kn(), this.name = "", this.source = new kr(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new ut(0, 0), this.repeat = new ut(1, 1), this.center = new ut(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Vt(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(t && t.depth && t.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  /**
   * The width of the texture in pixels.
   */
  get width() {
    return this.source.getSize(ar).x;
  }
  /**
   * The height of the texture in pixels.
   */
  get height() {
    return this.source.getSize(ar).y;
  }
  /**
   * The depth of the texture in pixels.
   */
  get depth() {
    return this.source.getSize(ar).z;
  }
  /**
   * The image object holding the texture data.
   *
   * @type {?Object}
   */
  get image() {
    return this.source.data;
  }
  set image(t) {
    this.source.data = t;
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
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
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
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.normalized = t.normalized, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.renderTarget = t.renderTarget, this.isRenderTargetTexture = t.isRenderTargetTexture, this.isArrayTexture = t.isArrayTexture, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this;
  }
  /**
   * Sets this texture's properties based on `values`.
   * @param {Object} values - A container with texture parameters.
   */
  setValues(t) {
    for (const e in t) {
      const n = t[e];
      if (n === void 0) {
        Ut(`Texture.setValues(): parameter '${e}' has value of undefined.`);
        continue;
      }
      const r = this[e];
      if (r === void 0) {
        Ut(`Texture.setValues(): property '${e}' does not exist.`);
        continue;
      }
      r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[e] = n;
    }
  }
  /**
   * Serializes the texture into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized texture.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.textures[this.uuid] !== void 0)
      return t.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
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
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n;
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
  transformUv(t) {
    if (this.mapping !== 300) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1)
      switch (this.wrapS) {
        case 1e3:
          t.x = t.x - Math.floor(t.x);
          break;
        case 1001:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
          break;
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case 1e3:
          t.y = t.y - Math.floor(t.y);
          break;
        case 1001:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
          break;
      }
    return this.flipY && (t.y = 1 - t.y), t;
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
  set needsUpdate(t) {
    t === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  /**
   * Setting this property to `true` indicates the engine the PMREM
   * must be regenerated.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
}
Re.DEFAULT_IMAGE = null;
Re.DEFAULT_MAPPING = 300;
Re.DEFAULT_ANISOTROPY = 1;
const es = class es {
  /**
   * Constructs a new 4D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   * @param {number} [w=1] - The w value of this vector.
   */
  constructor(t = 0, e = 0, n = 0, r = 1) {
    this.x = t, this.y = e, this.z = n, this.w = r;
  }
  /**
   * Alias for {@link Vector4#z}.
   *
   * @type {number}
   */
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  /**
   * Alias for {@link Vector4#w}.
   *
   * @type {number}
   */
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
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
  set(t, e, n, r) {
    return this.x = t, this.y = e, this.z = n, this.w = r, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector4} A reference to this vector.
   */
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setX(t) {
    return this.x = t, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setY(t) {
    return this.y = t, this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setZ(t) {
    return this.z = t, this;
  }
  /**
   * Sets the vector's w component to the given value
   *
   * @param {number} w - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setW(t) {
    return this.w = t, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @param {number} value - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + t);
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
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + t);
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
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector4} v - The vector to add.
   * @return {Vector4} A reference to this vector.
   */
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector4} A reference to this vector.
   */
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector4} A reference to this vector.
   */
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector4} v - The vector to subtract.
   * @return {Vector4} A reference to this vector.
   */
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector4} A reference to this vector.
   */
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector4} v - The vector to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  /**
   * Multiplies this vector with the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  applyMatrix4(t) {
    const e = this.x, n = this.y, r = this.z, s = this.w, a = t.elements;
    return this.x = a[0] * e + a[4] * n + a[8] * r + a[12] * s, this.y = a[1] * e + a[5] * n + a[9] * r + a[13] * s, this.z = a[2] * e + a[6] * n + a[10] * r + a[14] * s, this.w = a[3] * e + a[7] * n + a[11] * r + a[15] * s, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector4} v - The vector to divide.
   * @return {Vector4} A reference to this vector.
   */
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector4} A reference to this vector.
   */
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  /**
   * Sets the x, y and z components of this
   * vector to the quaternion's axis and w to the angle.
   *
   * @param {Quaternion} q - The Quaternion to set.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const e = Math.sqrt(1 - t.w * t.w);
    return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
  }
  /**
   * Sets the x, y and z components of this
   * vector to the axis of rotation and w to the angle.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromRotationMatrix(t) {
    let e, n, r, s;
    const l = t.elements, c = l[0], h = l[4], f = l[8], u = l[1], p = l[5], _ = l[9], y = l[2], m = l[6], d = l[10];
    if (Math.abs(h - u) < 0.01 && Math.abs(f - y) < 0.01 && Math.abs(_ - m) < 0.01) {
      if (Math.abs(h + u) < 0.1 && Math.abs(f + y) < 0.1 && Math.abs(_ + m) < 0.1 && Math.abs(c + p + d - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const A = (c + 1) / 2, M = (p + 1) / 2, R = (d + 1) / 2, T = (h + u) / 4, C = (f + y) / 4, x = (_ + m) / 4;
      return A > M && A > R ? A < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(A), r = T / n, s = C / n) : M > R ? M < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(M), n = T / r, s = x / r) : R < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(R), n = C / s, r = x / s), this.set(n, r, s, e), this;
    }
    let b = Math.sqrt((m - _) * (m - _) + (f - y) * (f - y) + (u - h) * (u - h));
    return Math.abs(b) < 1e-3 && (b = 1), this.x = (m - _) / b, this.y = (f - y) / b, this.z = (u - h) / b, this.w = Math.acos((c + p + d - 1) / 2), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  /**
   * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
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
  clamp(t, e) {
    return this.x = Zt(this.x, t.x, e.x), this.y = Zt(this.y, t.y, e.y), this.z = Zt(this.z, t.z, e.z), this.w = Zt(this.w, t.w, e.w), this;
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
  clampScalar(t, e) {
    return this.x = Zt(this.x, t, e), this.y = Zt(this.y, t, e), this.z = Zt(this.z, t, e), this.w = Zt(this.w, t, e), this;
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
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Zt(n, t, e));
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
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
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
  setLength(t) {
    return this.normalize().multiplyScalar(t);
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
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
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
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector4} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
   * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector4} A reference to this vector.
   */
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector4} A reference to this vector.
   */
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
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
es.prototype.isVector4 = !0;
let ue = es;
class uo extends Tn {
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
  constructor(t = 1, e = 1, n = {}) {
    super(), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: 1006,
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
    }, n), this.isRenderTarget = !0, this.width = t, this.height = e, this.depth = n.depth, this.scissor = new ue(0, 0, t, e), this.scissorTest = !1, this.viewport = new ue(0, 0, t, e), this.textures = [];
    const r = { width: t, height: e, depth: n.depth }, s = new Re(r), a = n.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = !0, this.textures[o].renderTarget = this;
    this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
  }
  _setTextureOptions(t = {}) {
    const e = {
      minFilter: 1006,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    t.mapping !== void 0 && (e.mapping = t.mapping), t.wrapS !== void 0 && (e.wrapS = t.wrapS), t.wrapT !== void 0 && (e.wrapT = t.wrapT), t.wrapR !== void 0 && (e.wrapR = t.wrapR), t.magFilter !== void 0 && (e.magFilter = t.magFilter), t.minFilter !== void 0 && (e.minFilter = t.minFilter), t.format !== void 0 && (e.format = t.format), t.type !== void 0 && (e.type = t.type), t.anisotropy !== void 0 && (e.anisotropy = t.anisotropy), t.colorSpace !== void 0 && (e.colorSpace = t.colorSpace), t.flipY !== void 0 && (e.flipY = t.flipY), t.generateMipmaps !== void 0 && (e.generateMipmaps = t.generateMipmaps), t.internalFormat !== void 0 && (e.internalFormat = t.internalFormat);
    for (let n = 0; n < this.textures.length; n++)
      this.textures[n].setValues(e);
  }
  /**
   * The texture representing the default color attachment.
   *
   * @type {Texture}
   */
  get texture() {
    return this.textures[0];
  }
  set texture(t) {
    this.textures[0] = t;
  }
  set depthTexture(t) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), t !== null && (t.renderTarget = this), this._depthTexture = t;
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
  setSize(t, e, n = 1) {
    if (this.width !== t || this.height !== e || this.depth !== n) {
      this.width = t, this.height = e, this.depth = n;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = t, this.textures[r].image.height = e, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
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
  copy(t) {
    this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
    for (let e = 0, n = t.textures.length; e < n; e++) {
      this.textures[e] = t.textures[e].clone(), this.textures[e].isRenderTargetTexture = !0, this.textures[e].renderTarget = this;
      const r = Object.assign({}, t.textures[e].image);
      this.textures[e].source = new kr(r);
    }
    return this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this.multiview = t.multiview, this.useArrayDepthTexture = t.useArrayDepthTexture, this;
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
class Je extends uo {
  /**
   * Constructs a new 3D render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), this.isWebGLRenderTarget = !0;
  }
}
class xa extends Re {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(t = null, e = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: t, width: e, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
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
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  /**
   * Resets the layer updates registry.
   */
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class ho extends Re {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(t = null, e = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: t, width: e, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const Ji = class Ji {
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
  constructor(t, e, n, r, s, a, o, l, c, h, f, u, p, _, y, m) {
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
    ], t !== void 0 && this.set(t, e, n, r, s, a, o, l, c, h, f, u, p, _, y, m);
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
  set(t, e, n, r, s, a, o, l, c, h, f, u, p, _, y, m) {
    const d = this.elements;
    return d[0] = t, d[4] = e, d[8] = n, d[12] = r, d[1] = s, d[5] = a, d[9] = o, d[13] = l, d[2] = c, d[6] = h, d[10] = f, d[14] = u, d[3] = p, d[7] = _, d[11] = y, d[15] = m, this;
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
    return new Ji().fromArray(this.elements);
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix4} m - The matrix to copy.
   * @return {Matrix4} A reference to this matrix.
   */
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this;
  }
  /**
   * Copies the translation component of the given matrix
   * into this matrix's translation component.
   *
   * @param {Matrix4} m - The matrix to copy the translation component.
   * @return {Matrix4} A reference to this matrix.
   */
  copyPosition(t) {
    const e = this.elements, n = t.elements;
    return e[12] = n[12], e[13] = n[13], e[14] = n[14], this;
  }
  /**
   * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  setFromMatrix3(t) {
    const e = t.elements;
    return this.set(
      e[0],
      e[3],
      e[6],
      0,
      e[1],
      e[4],
      e[7],
      0,
      e[2],
      e[5],
      e[8],
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
  extractBasis(t, e, n) {
    return this.determinantAffine() === 0 ? (t.set(1, 0, 0), e.set(0, 1, 0), n.set(0, 0, 1), this) : (t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
  }
  /**
   * Sets the given basis vectors to this matrix.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeBasis(t, e, n) {
    return this.set(
      t.x,
      e.x,
      n.x,
      0,
      t.y,
      e.y,
      n.y,
      0,
      t.z,
      e.z,
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
  extractRotation(t) {
    if (t.determinantAffine() === 0)
      return this.identity();
    const e = this.elements, n = t.elements, r = 1 / wn.setFromMatrixColumn(t, 0).length(), s = 1 / wn.setFromMatrixColumn(t, 1).length(), a = 1 / wn.setFromMatrixColumn(t, 2).length();
    return e[0] = n[0] * r, e[1] = n[1] * r, e[2] = n[2] * r, e[3] = 0, e[4] = n[4] * s, e[5] = n[5] * s, e[6] = n[6] * s, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
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
  makeRotationFromEuler(t) {
    const e = this.elements, n = t.x, r = t.y, s = t.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(r), c = Math.sin(r), h = Math.cos(s), f = Math.sin(s);
    if (t.order === "XYZ") {
      const u = a * h, p = a * f, _ = o * h, y = o * f;
      e[0] = l * h, e[4] = -l * f, e[8] = c, e[1] = p + _ * c, e[5] = u - y * c, e[9] = -o * l, e[2] = y - u * c, e[6] = _ + p * c, e[10] = a * l;
    } else if (t.order === "YXZ") {
      const u = l * h, p = l * f, _ = c * h, y = c * f;
      e[0] = u + y * o, e[4] = _ * o - p, e[8] = a * c, e[1] = a * f, e[5] = a * h, e[9] = -o, e[2] = p * o - _, e[6] = y + u * o, e[10] = a * l;
    } else if (t.order === "ZXY") {
      const u = l * h, p = l * f, _ = c * h, y = c * f;
      e[0] = u - y * o, e[4] = -a * f, e[8] = _ + p * o, e[1] = p + _ * o, e[5] = a * h, e[9] = y - u * o, e[2] = -a * c, e[6] = o, e[10] = a * l;
    } else if (t.order === "ZYX") {
      const u = a * h, p = a * f, _ = o * h, y = o * f;
      e[0] = l * h, e[4] = _ * c - p, e[8] = u * c + y, e[1] = l * f, e[5] = y * c + u, e[9] = p * c - _, e[2] = -c, e[6] = o * l, e[10] = a * l;
    } else if (t.order === "YZX") {
      const u = a * l, p = a * c, _ = o * l, y = o * c;
      e[0] = l * h, e[4] = y - u * f, e[8] = _ * f + p, e[1] = f, e[5] = a * h, e[9] = -o * h, e[2] = -c * h, e[6] = p * f + _, e[10] = u - y * f;
    } else if (t.order === "XZY") {
      const u = a * l, p = a * c, _ = o * l, y = o * c;
      e[0] = l * h, e[4] = -f, e[8] = c * h, e[1] = u * f + y, e[5] = a * h, e[9] = p * f - _, e[2] = _ * f - p, e[6] = o * h, e[10] = y * f + u;
    }
    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  /**
   * Sets the rotation component of this matrix to the rotation specified by
   * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
   * The rest of the matrix is set to the identity.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromQuaternion(t) {
    return this.compose(fo, t, po);
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
  lookAt(t, e, n) {
    const r = this.elements;
    return Le.subVectors(t, e), Le.lengthSq() === 0 && (Le.z = 1), Le.normalize(), cn.crossVectors(n, Le), cn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Le.x += 1e-4 : Le.z += 1e-4, Le.normalize(), cn.crossVectors(n, Le)), cn.normalize(), Si.crossVectors(Le, cn), r[0] = cn.x, r[4] = Si.x, r[8] = Le.x, r[1] = cn.y, r[5] = Si.y, r[9] = Le.y, r[2] = cn.z, r[6] = Si.z, r[10] = Le.z, this;
  }
  /**
   * Post-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  /**
   * Pre-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  /**
   * Multiples the given 4x4 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix4} a - The first matrix.
   * @param {Matrix4} b - The second matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyMatrices(t, e) {
    const n = t.elements, r = e.elements, s = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], h = n[1], f = n[5], u = n[9], p = n[13], _ = n[2], y = n[6], m = n[10], d = n[14], b = n[3], A = n[7], M = n[11], R = n[15], T = r[0], C = r[4], x = r[8], E = r[12], P = r[1], w = r[5], B = r[9], q = r[13], $ = r[2], D = r[6], k = r[10], U = r[14], Y = r[3], tt = r[7], st = r[11], ot = r[15];
    return s[0] = a * T + o * P + l * $ + c * Y, s[4] = a * C + o * w + l * D + c * tt, s[8] = a * x + o * B + l * k + c * st, s[12] = a * E + o * q + l * U + c * ot, s[1] = h * T + f * P + u * $ + p * Y, s[5] = h * C + f * w + u * D + p * tt, s[9] = h * x + f * B + u * k + p * st, s[13] = h * E + f * q + u * U + p * ot, s[2] = _ * T + y * P + m * $ + d * Y, s[6] = _ * C + y * w + m * D + d * tt, s[10] = _ * x + y * B + m * k + d * st, s[14] = _ * E + y * q + m * U + d * ot, s[3] = b * T + A * P + M * $ + R * Y, s[7] = b * C + A * w + M * D + R * tt, s[11] = b * x + A * B + M * k + R * st, s[15] = b * E + A * q + M * U + R * ot, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html).
   *
   * @return {number} The determinant.
   */
  determinant() {
    const t = this.elements, e = t[0], n = t[4], r = t[8], s = t[12], a = t[1], o = t[5], l = t[9], c = t[13], h = t[2], f = t[6], u = t[10], p = t[14], _ = t[3], y = t[7], m = t[11], d = t[15], b = l * p - c * u, A = o * p - c * f, M = o * u - l * f, R = a * p - c * h, T = a * u - l * h, C = a * f - o * h;
    return e * (y * b - m * A + d * M) - n * (_ * b - m * R + d * T) + r * (_ * A - y * R + d * C) - s * (_ * M - y * T + m * C);
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
    const t = this.elements, e = t[0], n = t[4], r = t[8], s = t[1], a = t[5], o = t[9], l = t[2], c = t[6], h = t[10];
    return e * (a * h - o * c) - n * (s * h - o * l) + r * (s * c - a * l);
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  transpose() {
    const t = this.elements;
    let e;
    return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
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
  setPosition(t, e, n) {
    const r = this.elements;
    return t.isVector3 ? (r[12] = t.x, r[13] = t.y, r[14] = t.z) : (r[12] = t, r[13] = e, r[14] = n), this;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  invert() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], f = t[9], u = t[10], p = t[11], _ = t[12], y = t[13], m = t[14], d = t[15], b = e * o - n * a, A = e * l - r * a, M = e * c - s * a, R = n * l - r * o, T = n * c - s * o, C = r * c - s * l, x = h * y - f * _, E = h * m - u * _, P = h * d - p * _, w = f * m - u * y, B = f * d - p * y, q = u * d - p * m, $ = b * q - A * B + M * w + R * P - T * E + C * x;
    if ($ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const D = 1 / $;
    return t[0] = (o * q - l * B + c * w) * D, t[1] = (r * B - n * q - s * w) * D, t[2] = (y * C - m * T + d * R) * D, t[3] = (u * T - f * C - p * R) * D, t[4] = (l * P - a * q - c * E) * D, t[5] = (e * q - r * P + s * E) * D, t[6] = (m * M - _ * C - d * A) * D, t[7] = (h * C - u * M + p * A) * D, t[8] = (a * B - o * P + c * x) * D, t[9] = (n * P - e * B - s * x) * D, t[10] = (_ * T - y * M + d * b) * D, t[11] = (f * M - h * T - p * b) * D, t[12] = (o * E - a * w - l * x) * D, t[13] = (e * w - n * E + r * x) * D, t[14] = (y * A - _ * R - m * b) * D, t[15] = (h * R - f * A + u * b) * D, this;
  }
  /**
   * Multiplies the columns of this matrix by the given vector.
   *
   * @param {Vector3} v - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  scale(t) {
    const e = this.elements, n = t.x, r = t.y, s = t.z;
    return e[0] *= n, e[4] *= r, e[8] *= s, e[1] *= n, e[5] *= r, e[9] *= s, e[2] *= n, e[6] *= r, e[10] *= s, e[3] *= n, e[7] *= r, e[11] *= s, this;
  }
  /**
   * Gets the maximum scale value of the three axes.
   *
   * @return {number} The maximum scale.
   */
  getMaxScaleOnAxis() {
    const t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, n, r));
  }
  /**
   * Sets this matrix as a translation transform from the given vector.
   *
   * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @param {number} z - The amount to translate in the z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeTranslation(t, e, n) {
    return t.isVector3 ? this.set(
      1,
      0,
      0,
      t.x,
      0,
      1,
      0,
      t.y,
      0,
      0,
      1,
      t.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      t,
      0,
      1,
      0,
      e,
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
  makeRotationX(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      e,
      -n,
      0,
      0,
      n,
      e,
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
  makeRotationY(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      e,
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
  makeRotationZ(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      -n,
      0,
      0,
      n,
      e,
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
  makeRotationAxis(t, e) {
    const n = Math.cos(e), r = Math.sin(e), s = 1 - n, a = t.x, o = t.y, l = t.z, c = s * a, h = s * o;
    return this.set(
      c * a + n,
      c * o - r * l,
      c * l + r * o,
      0,
      c * o + r * l,
      h * o + n,
      h * l - r * a,
      0,
      c * l - r * o,
      h * l + r * a,
      s * l * l + n,
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
  makeScale(t, e, n) {
    return this.set(
      t,
      0,
      0,
      0,
      0,
      e,
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
  makeShear(t, e, n, r, s, a) {
    return this.set(
      1,
      n,
      s,
      0,
      t,
      1,
      a,
      0,
      e,
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
  compose(t, e, n) {
    const r = this.elements, s = e._x, a = e._y, o = e._z, l = e._w, c = s + s, h = a + a, f = o + o, u = s * c, p = s * h, _ = s * f, y = a * h, m = a * f, d = o * f, b = l * c, A = l * h, M = l * f, R = n.x, T = n.y, C = n.z;
    return r[0] = (1 - (y + d)) * R, r[1] = (p + M) * R, r[2] = (_ - A) * R, r[3] = 0, r[4] = (p - M) * T, r[5] = (1 - (u + d)) * T, r[6] = (m + b) * T, r[7] = 0, r[8] = (_ + A) * C, r[9] = (m - b) * C, r[10] = (1 - (u + y)) * C, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
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
  decompose(t, e, n) {
    const r = this.elements;
    t.x = r[12], t.y = r[13], t.z = r[14];
    const s = this.determinantAffine();
    if (s === 0)
      return n.set(1, 1, 1), e.identity(), this;
    let a = wn.set(r[0], r[1], r[2]).length();
    const o = wn.set(r[4], r[5], r[6]).length(), l = wn.set(r[8], r[9], r[10]).length();
    s < 0 && (a = -a), Oe.copy(this);
    const c = 1 / a, h = 1 / o, f = 1 / l;
    return Oe.elements[0] *= c, Oe.elements[1] *= c, Oe.elements[2] *= c, Oe.elements[4] *= h, Oe.elements[5] *= h, Oe.elements[6] *= h, Oe.elements[8] *= f, Oe.elements[9] *= f, Oe.elements[10] *= f, e.setFromRotationMatrix(Oe), n.x = a, n.y = o, n.z = l, this;
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
  makePerspective(t, e, n, r, s, a, o = 2e3, l = !1) {
    const c = this.elements, h = 2 * s / (e - t), f = 2 * s / (n - r), u = (e + t) / (e - t), p = (n + r) / (n - r);
    let _, y;
    if (l)
      _ = s / (a - s), y = a * s / (a - s);
    else if (o === 2e3)
      _ = -(a + s) / (a - s), y = -2 * a * s / (a - s);
    else if (o === 2001)
      _ = -a / (a - s), y = -a * s / (a - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return c[0] = h, c[4] = 0, c[8] = u, c[12] = 0, c[1] = 0, c[5] = f, c[9] = p, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = _, c[14] = y, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
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
  makeOrthographic(t, e, n, r, s, a, o = 2e3, l = !1) {
    const c = this.elements, h = 2 / (e - t), f = 2 / (n - r), u = -(e + t) / (e - t), p = -(n + r) / (n - r);
    let _, y;
    if (l)
      _ = 1 / (a - s), y = a / (a - s);
    else if (o === 2e3)
      _ = -2 / (a - s), y = -(a + s) / (a - s);
    else if (o === 2001)
      _ = -1 / (a - s), y = -s / (a - s);
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return c[0] = h, c[4] = 0, c[8] = 0, c[12] = u, c[1] = 0, c[5] = f, c[9] = 0, c[13] = p, c[2] = 0, c[6] = 0, c[10] = _, c[14] = y, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix4} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let r = 0; r < 16; r++)
      if (e[r] !== n[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix4} A reference to this matrix.
   */
  fromArray(t, e = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = t[n + e];
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
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t;
  }
};
Ji.prototype.isMatrix4 = !0;
let oe = Ji;
const wn = /* @__PURE__ */ new N(), Oe = /* @__PURE__ */ new oe(), fo = /* @__PURE__ */ new N(0, 0, 0), po = /* @__PURE__ */ new N(1, 1, 1), cn = /* @__PURE__ */ new N(), Si = /* @__PURE__ */ new N(), Le = /* @__PURE__ */ new N(), xs = /* @__PURE__ */ new oe(), vs = /* @__PURE__ */ new Jn();
class sn {
  /**
   * Constructs a new euler instance.
   *
   * @param {number} [x=0] - The angle of the x axis in radians.
   * @param {number} [y=0] - The angle of the y axis in radians.
   * @param {number} [z=0] - The angle of the z axis in radians.
   * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
   */
  constructor(t = 0, e = 0, n = 0, r = sn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = e, this._z = n, this._order = r;
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
  set x(t) {
    this._x = t, this._onChangeCallback();
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
  set y(t) {
    this._y = t, this._onChangeCallback();
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
  set z(t) {
    this._z = t, this._onChangeCallback();
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
  set order(t) {
    this._order = t, this._onChangeCallback();
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
  set(t, e, n, r = this._order) {
    return this._x = t, this._y = e, this._z = n, this._order = r, this._onChangeCallback(), this;
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
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a pure rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromRotationMatrix(t, e = this._order, n = !0) {
    const r = t.elements, s = r[0], a = r[4], o = r[8], l = r[1], c = r[5], h = r[9], f = r[2], u = r[6], p = r[10];
    switch (e) {
      case "XYZ":
        this._y = Math.asin(Zt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(u, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Zt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-f, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Zt(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(-f, p), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Zt(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(u, p), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(Zt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-f, s)) : (this._x = 0, this._y = Math.atan2(o, p));
        break;
      case "XZY":
        this._z = Math.asin(-Zt(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(u, c), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-h, p), this._y = 0);
        break;
      default:
        Ut("Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return this._order = e, n === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a normalized quaternion.
   *
   * @param {Quaternion} q - A normalized Quaternion.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromQuaternion(t, e, n) {
    return xs.makeRotationFromQuaternion(t), this.setFromRotationMatrix(xs, e, n);
  }
  /**
   * Sets the angles of this Euler instance from the given vector.
   *
   * @param {Vector3} v - The vector.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
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
  reorder(t) {
    return vs.setFromEuler(this), this.setFromQuaternion(vs, t);
  }
  /**
   * Returns `true` if this Euler instance is equal with the given one.
   *
   * @param {Euler} euler - The Euler instance to test for equality.
   * @return {boolean} Whether this Euler instance is equal with the given one.
   */
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  /**
   * Sets this Euler instance's components to values from the given array. The first three
   * entries of the array are assign to the x,y and z components. An optional fourth entry
   * defines the Euler order.
   *
   * @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
   * @return {Euler} A reference to this Euler instance.
   */
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this Euler instance to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number,number,number,string>} The Euler components.
   */
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
sn.DEFAULT_ORDER = "XYZ";
class Wr {
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
  set(t) {
    this.mask = (1 << t | 0) >>> 0;
  }
  /**
   * Adds membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  enable(t) {
    this.mask |= 1 << t | 0;
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
  toggle(t) {
    this.mask ^= 1 << t | 0;
  }
  /**
   * Removes membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  disable(t) {
    this.mask &= ~(1 << t | 0);
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
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  /**
   * Returns `true` if the given layer is enabled.
   *
   * @param {number} layer - The layer to test.
   * @return {boolean } Whether the given layer is enabled or not.
   */
  isEnabled(t) {
    return (this.mask & (1 << t | 0)) !== 0;
  }
}
let mo = 0;
const Ms = /* @__PURE__ */ new N(), Pn = /* @__PURE__ */ new Jn(), Qe = /* @__PURE__ */ new oe(), yi = /* @__PURE__ */ new N(), ei = /* @__PURE__ */ new N(), go = /* @__PURE__ */ new N(), _o = /* @__PURE__ */ new Jn(), Ss = /* @__PURE__ */ new N(1, 0, 0), ys = /* @__PURE__ */ new N(0, 1, 0), Es = /* @__PURE__ */ new N(0, 0, 1), Ts = { type: "added" }, xo = { type: "removed" }, Ln = { type: "childadded", child: null }, or = { type: "childremoved", child: null };
class ye extends Tn {
  /**
   * Constructs a new 3D object.
   */
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: mo++ }), this.uuid = Kn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ye.DEFAULT_UP.clone();
    const t = new N(), e = new sn(), n = new Jn(), r = new N(1, 1, 1);
    function s() {
      n.setFromEuler(e, !1);
    }
    function a() {
      e.setFromQuaternion(n, void 0, !1);
    }
    e._onChange(s), n._onChange(a), Object.defineProperties(this, {
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
        value: t
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
        value: e
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
        value: new oe()
      },
      /**
       * Represents the object's normal matrix.
       *
       * @name Object3D#normalMatrix
       * @type {Matrix3}
       */
      normalMatrix: {
        value: new Vt()
      }
    }), this.matrix = new oe(), this.matrixWorld = new oe(), this.matrixAutoUpdate = ye.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Wr(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
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
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  /**
   * Applies a rotation represented by given the quaternion to the 3D object.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Object3D} A reference to this instance.
   */
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  /**
   * Sets the given rotation represented as an axis/angle couple to the 3D object.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   */
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  /**
   * Sets the given rotation represented as Euler angles to the 3D object.
   *
   * @param {Euler} euler - The Euler angles.
   */
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  /**
   * Sets the given rotation represented as rotation matrix to the 3D object.
   *
   * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
   * a pure rotation matrix (i.e, unscaled).
   */
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  /**
   * Sets the given rotation represented as a Quaternion to the 3D object.
   *
   * @param {Quaternion} q - The Quaternion
   */
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  /**
   * Rotates the 3D object along an axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnAxis(t, e) {
    return Pn.setFromAxisAngle(t, e), this.quaternion.multiply(Pn), this;
  }
  /**
   * Rotates the 3D object along an axis in world space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnWorldAxis(t, e) {
    return Pn.setFromAxisAngle(t, e), this.quaternion.premultiply(Pn), this;
  }
  /**
   * Rotates the 3D object around its X axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateX(t) {
    return this.rotateOnAxis(Ss, t);
  }
  /**
   * Rotates the 3D object around its Y axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateY(t) {
    return this.rotateOnAxis(ys, t);
  }
  /**
   * Rotates the 3D object around its Z axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateZ(t) {
    return this.rotateOnAxis(Es, t);
  }
  /**
   * Translate the 3D object by a distance along the given axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateOnAxis(t, e) {
    return Ms.copy(t).applyQuaternion(this.quaternion), this.position.add(Ms.multiplyScalar(e)), this;
  }
  /**
   * Translate the 3D object by a distance along its X-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateX(t) {
    return this.translateOnAxis(Ss, t);
  }
  /**
   * Translate the 3D object by a distance along its Y-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateY(t) {
    return this.translateOnAxis(ys, t);
  }
  /**
   * Translate the 3D object by a distance along its Z-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateZ(t) {
    return this.translateOnAxis(Es, t);
  }
  /**
   * Converts the given vector from this 3D object's local space to world space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  /**
   * Converts the given vector from this 3D object's world space to local space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(Qe.copy(this.matrixWorld).invert());
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
  lookAt(t, e, n) {
    t.isVector3 ? yi.copy(t) : yi.set(t, e, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), ei.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Qe.lookAt(ei, yi, this.up) : Qe.lookAt(yi, ei, this.up), this.quaternion.setFromRotationMatrix(Qe), r && (Qe.extractRotation(r.matrixWorld), Pn.setFromRotationMatrix(Qe), this.quaternion.premultiply(Pn.invert()));
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
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++)
        this.add(arguments[e]);
      return this;
    }
    return t === this ? (Jt("Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(Ts), Ln.child = t, this.dispatchEvent(Ln), Ln.child = null) : Jt("Object3D.add: object not an instance of THREE.Object3D.", t), this);
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
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(xo), or.child = t, this.dispatchEvent(or), or.child = null), this;
  }
  /**
   * Removes this 3D object from its current parent.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
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
  attach(t) {
    return this.updateWorldMatrix(!0, !1), Qe.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), Qe.multiply(t.parent.matrixWorld)), t.applyMatrix4(Qe), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(Ts), Ln.child = t, this.dispatchEvent(Ln), Ln.child = null, this;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching ID.
   *
   * @param {number} id - The id.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching name.
   *
   * @param {string} name - The name.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByProperty(t, e) {
    if (this[t] === e) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const a = this.children[n].getObjectByProperty(t, e);
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
  getObjectsByProperty(t, e, n = []) {
    this[t] === e && n.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++)
      r[s].getObjectsByProperty(t, e, n);
    return n;
  }
  /**
   * Returns a vector representing the position of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's position in world space.
   */
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  /**
   * Returns a Quaternion representing the position of the 3D object in world space.
   *
   * @param {Quaternion} target - The target Quaternion the result is stored to.
   * @return {Quaternion} The 3D object's rotation in world space.
   */
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ei, t, go), t;
  }
  /**
   * Returns a vector representing the scale of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's scale in world space.
   */
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ei, _o, t), t;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
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
  traverse(t) {
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++)
      e[n].traverse(t);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
   * Descendants of invisible 3D objects are not traversed.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++)
      e[n].traverseVisible(t);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseAncestors(t) {
    const e = this.parent;
    e !== null && (t(e), e.traverseAncestors(t));
  }
  /**
   * Updates the transformation matrix in local space by computing it from the current
   * position, rotation and scale values.
   */
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const t = this.pivot;
    if (t !== null) {
      const e = t.x, n = t.y, r = t.z, s = this.matrix.elements;
      s[12] += e - s[0] * e - s[4] * n - s[8] * r, s[13] += n - s[1] * e - s[5] * n - s[9] * r, s[14] += r - s[2] * e - s[6] * n - s[10] * r;
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
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++)
      e[n].updateMatrixWorld(t);
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
  updateWorldMatrix(t, e, n = !1) {
    const r = this.parent;
    if (t === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), e === !0) {
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
  toJSON(t) {
    const e = t === void 0 || typeof t == "string", n = {};
    e && (t = {
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
    })), r.instanceInfo = this._instanceInfo.map((o) => ({ ...o })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(t), r.indirectTexture = this._indirectTexture.toJSON(t), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function s(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(t.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l))
          for (let c = 0, h = l.length; c < h; c++) {
            const f = l[c];
            s(t.shapes, f);
          }
        else
          s(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(t.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          o.push(s(t.materials, this.material[l]));
        r.material = o;
      } else
        r.material = s(t.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++)
        r.children.push(this.children[o].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        r.animations.push(s(t.animations, l));
      }
    }
    if (e) {
      const o = a(t.geometries), l = a(t.materials), c = a(t.textures), h = a(t.images), f = a(t.shapes), u = a(t.skeletons), p = a(t.animations), _ = a(t.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), f.length > 0 && (n.shapes = f), u.length > 0 && (n.skeletons = u), p.length > 0 && (n.animations = p), _.length > 0 && (n.nodes = _);
    }
    return n.object = r, n;
    function a(o) {
      const l = [];
      for (const c in o) {
        const h = o[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  /**
   * Returns a new 3D object with copied values from this instance.
   *
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
   * @return {Object3D} A clone of this instance.
   */
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  /**
   * Copies the values of the given 3D object to this instance.
   *
   * @param {Object3D} source - The 3D object to copy.
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
   * @return {Object3D} A reference to this instance.
   */
  copy(t, e = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.pivot = t.pivot !== null ? t.pivot.clone() : null, this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.static = t.static, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), e === !0)
      for (let n = 0; n < t.children.length; n++) {
        const r = t.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
ye.DEFAULT_UP = /* @__PURE__ */ new N(0, 1, 0);
ye.DEFAULT_MATRIX_AUTO_UPDATE = !0;
ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class ci extends ye {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const vo = { type: "move" };
class lr {
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
    return this._hand === null && (this._hand = new ci(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  /**
   * Returns a group representing the target ray space of the XR controller.
   *
   * @return {Group} A group representing the target ray space of the XR controller.
   */
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new ci(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new N(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new N()), this._targetRay;
  }
  /**
   * Returns a group representing the grip space of the XR controller.
   *
   * @return {Group} A group representing the grip space of the XR controller.
   */
  getGripSpace() {
    return this._grip === null && (this._grip = new ci(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new N(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new N(), this._grip.eventsEnabled = !1), this._grip;
  }
  /**
   * Dispatches the given event to the groups representing
   * the different coordinate spaces of the XR controller.
   *
   * @param {Object} event - The event to dispatch.
   * @return {WebXRController} A reference to this instance.
   */
  dispatchEvent(t) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(t), this._grip !== null && this._grip.dispatchEvent(t), this._hand !== null && this._hand.dispatchEvent(t), this;
  }
  /**
   * Connects the controller with the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  connect(t) {
    if (t && t.hand) {
      const e = this._hand;
      if (e)
        for (const n of t.hand.values())
          this._getHandJoint(e, n);
    }
    return this.dispatchEvent({ type: "connected", data: t }), this;
  }
  /**
   * Disconnects the controller from the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  disconnect(t) {
    return this.dispatchEvent({ type: "disconnected", data: t }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
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
  update(t, e, n) {
    let r = null, s = null, a = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (c && t.hand) {
        a = !0;
        for (const y of t.hand.values()) {
          const m = e.getJointPose(y, n), d = this._getHandJoint(c, y);
          m !== null && (d.matrix.fromArray(m.transform.matrix), d.matrix.decompose(d.position, d.rotation, d.scale), d.matrixWorldNeedsUpdate = !0, d.jointRadius = m.radius), d.visible = m !== null;
        }
        const h = c.joints["index-finger-tip"], f = c.joints["thumb-tip"], u = h.position.distanceTo(f.position), p = 0.02, _ = 5e-3;
        c.inputState.pinching && u > p + _ ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: t.handedness,
          target: this
        })) : !c.inputState.pinching && u <= p - _ && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: t.handedness,
          target: this
        }));
      } else
        l !== null && t.gripSpace && (s = e.getPose(t.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1, l.eventsEnabled && l.dispatchEvent({
          type: "gripUpdated",
          data: t,
          target: this
        })));
      o !== null && (r = e.getPose(t.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(vo)));
    }
    return o !== null && (o.visible = r !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = a !== null), this;
  }
  /**
   * Returns a group representing the hand joint for the given input joint.
   *
   * @private
   * @param {Group} hand - The group representing the hand space.
   * @param {XRJointSpace} inputjoint - The hand joint data.
   * @return {Group} A group representing the hand joint for the given input joint.
   */
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new ci();
      n.matrixAutoUpdate = !1, n.visible = !1, t.joints[e.jointName] = n, t.add(n);
    }
    return t.joints[e.jointName];
  }
}
const va = {
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
}, un = { h: 0, s: 0, l: 0 }, Ei = { h: 0, s: 0, l: 0 };
function cr(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
}
class Yt {
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
  constructor(t, e, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, n);
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
  set(t, e, n) {
    if (e === void 0 && n === void 0) {
      const r = t;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(t, e, n);
    return this;
  }
  /**
   * Sets the colors's components to the given scalar value.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} A reference to this color.
   */
  setScalar(t) {
    return this.r = t, this.g = t, this.b = t, this;
  }
  /**
   * Sets this color from a hexadecimal value.
   *
   * @param {number} hex - The hexadecimal value.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHex(t, e = Ue) {
    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, $t.colorSpaceToWorking(this, e), this;
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
  setRGB(t, e, n, r = $t.workingColorSpace) {
    return this.r = t, this.g = e, this.b = n, $t.colorSpaceToWorking(this, r), this;
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
  setHSL(t, e, n, r = $t.workingColorSpace) {
    if (t = so(t, 1), e = Zt(e, 0, 1), n = Zt(n, 0, 1), e === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + e) : n + e - n * e, a = 2 * n - s;
      this.r = cr(a, s, t + 1 / 3), this.g = cr(a, s, t), this.b = cr(a, s, t - 1 / 3);
    }
    return $t.colorSpaceToWorking(this, r), this;
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
  setStyle(t, e = Ue) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && Ut("Color: Alpha component of " + t + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(t)) {
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
              e
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              e
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              e
            );
          break;
        default:
          Ut("Color: Unknown color model " + t);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(t)) {
      const s = r[1], a = s.length;
      if (a === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          e
        );
      if (a === 6)
        return this.setHex(parseInt(s, 16), e);
      Ut("Color: Invalid hex color " + t);
    } else if (t && t.length > 0)
      return this.setColorName(t, e);
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
  setColorName(t, e = Ue) {
    const n = va[t.toLowerCase()];
    return n !== void 0 ? this.setHex(n, e) : Ut("Color: Unknown color " + t), this;
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
  copy(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copySRGBToLinear(t) {
    return this.r = rn(t.r), this.g = rn(t.g), this.b = rn(t.b), this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copyLinearToSRGB(t) {
    return this.r = Xn(t.r), this.g = Xn(t.g), this.b = Xn(t.b), this;
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
  getHex(t = Ue) {
    return $t.workingToColorSpace(Ae.copy(this), t), Math.round(Zt(Ae.r * 255, 0, 255)) * 65536 + Math.round(Zt(Ae.g * 255, 0, 255)) * 256 + Math.round(Zt(Ae.b * 255, 0, 255));
  }
  /**
   * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The hexadecimal value as a string.
   */
  getHexString(t = Ue) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  /**
   * Converts the colors RGB values into the HSL format and stores them into the
   * given target object.
   *
   * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {{h:number,s:number,l:number}} The HSL representation of this color.
   */
  getHSL(t, e = $t.workingColorSpace) {
    $t.workingToColorSpace(Ae.copy(this), e);
    const n = Ae.r, r = Ae.g, s = Ae.b, a = Math.max(n, r, s), o = Math.min(n, r, s);
    let l, c;
    const h = (o + a) / 2;
    if (o === a)
      l = 0, c = 0;
    else {
      const f = a - o;
      switch (c = h <= 0.5 ? f / (a + o) : f / (2 - a - o), a) {
        case n:
          l = (r - s) / f + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - n) / f + 2;
          break;
        case s:
          l = (n - r) / f + 4;
          break;
      }
      l /= 6;
    }
    return t.h = l, t.s = c, t.l = h, t;
  }
  /**
   * Returns the RGB values of this color and stores them into the given target object.
   *
   * @param {Color} target - The target color that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} The RGB representation of this color.
   */
  getRGB(t, e = $t.workingColorSpace) {
    return $t.workingToColorSpace(Ae.copy(this), e), t.r = Ae.r, t.g = Ae.g, t.b = Ae.b, t;
  }
  /**
   * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The CSS representation of this color.
   */
  getStyle(t = Ue) {
    $t.workingToColorSpace(Ae.copy(this), t);
    const e = Ae.r, n = Ae.g, r = Ae.b;
    return t !== Ue ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
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
  offsetHSL(t, e, n) {
    return this.getHSL(un), this.setHSL(un.h + t, un.s + e, un.l + n);
  }
  /**
   * Adds the RGB values of the given color to the RGB values of this color.
   *
   * @param {Color} color - The color to add.
   * @return {Color} A reference to this color.
   */
  add(t) {
    return this.r += t.r, this.g += t.g, this.b += t.b, this;
  }
  /**
   * Adds the RGB values of the given colors and stores the result in this instance.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @return {Color} A reference to this color.
   */
  addColors(t, e) {
    return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
  }
  /**
   * Adds the given scalar value to the RGB values of this color.
   *
   * @param {number} s - The scalar to add.
   * @return {Color} A reference to this color.
   */
  addScalar(t) {
    return this.r += t, this.g += t, this.b += t, this;
  }
  /**
   * Subtracts the RGB values of the given color from the RGB values of this color.
   *
   * @param {Color} color - The color to subtract.
   * @return {Color} A reference to this color.
   */
  sub(t) {
    return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
  }
  /**
   * Multiplies the RGB values of the given color with the RGB values of this color.
   *
   * @param {Color} color - The color to multiply.
   * @return {Color} A reference to this color.
   */
  multiply(t) {
    return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
  }
  /**
   * Multiplies the given scalar value with the RGB values of this color.
   *
   * @param {number} s - The scalar to multiply.
   * @return {Color} A reference to this color.
   */
  multiplyScalar(t) {
    return this.r *= t, this.g *= t, this.b *= t, this;
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
  lerp(t, e) {
    return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
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
  lerpColors(t, e, n) {
    return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this;
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
  lerpHSL(t, e) {
    this.getHSL(un), t.getHSL(Ei);
    const n = nr(un.h, Ei.h, e), r = nr(un.s, Ei.s, e), s = nr(un.l, Ei.l, e);
    return this.setHSL(n, r, s), this;
  }
  /**
   * Sets the color's RGB components from the given 3D vector.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Color} A reference to this color.
   */
  setFromVector3(t) {
    return this.r = t.x, this.g = t.y, this.b = t.z, this;
  }
  /**
   * Transforms this color with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix.
   * @return {Color} A reference to this color.
   */
  applyMatrix3(t) {
    const e = this.r, n = this.g, r = this.b, s = t.elements;
    return this.r = s[0] * e + s[3] * n + s[6] * r, this.g = s[1] * e + s[4] * n + s[7] * r, this.b = s[2] * e + s[5] * n + s[8] * r, this;
  }
  /**
   * Returns `true` if this color is equal with the given one.
   *
   * @param {Color} c - The color to test for equality.
   * @return {boolean} Whether this bounding color is equal with the given one.
   */
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  /**
   * Sets this color's RGB components from the given array.
   *
   * @param {Array<number>} array - An array holding the RGB values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Color} A reference to this color.
   */
  fromArray(t, e = 0) {
    return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
  }
  /**
   * Writes the RGB components of this color to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the color components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The color components.
   */
  toArray(t = [], e = 0) {
    return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
  }
  /**
   * Sets the components of this color from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding color data.
   * @param {number} index - The index into the attribute.
   * @return {Color} A reference to this color.
   */
  fromBufferAttribute(t, e) {
    return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this;
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
const Ae = /* @__PURE__ */ new Yt();
Yt.NAMES = va;
class Ma extends ye {
  /**
   * Constructs a new scene.
   */
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new sn(), this.environmentIntensity = 1, this.environmentRotation = new sn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(t, e) {
    return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
  }
}
const Be = /* @__PURE__ */ new N(), je = /* @__PURE__ */ new N(), ur = /* @__PURE__ */ new N(), tn = /* @__PURE__ */ new N(), Dn = /* @__PURE__ */ new N(), In = /* @__PURE__ */ new N(), As = /* @__PURE__ */ new N(), hr = /* @__PURE__ */ new N(), fr = /* @__PURE__ */ new N(), dr = /* @__PURE__ */ new N(), pr = /* @__PURE__ */ new ue(), mr = /* @__PURE__ */ new ue(), gr = /* @__PURE__ */ new ue();
class Ge {
  /**
   * Constructs a new triangle.
   *
   * @param {Vector3} [a=(0,0,0)] - The first corner of the triangle.
   * @param {Vector3} [b=(0,0,0)] - The second corner of the triangle.
   * @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
   */
  constructor(t = new N(), e = new N(), n = new N()) {
    this.a = t, this.b = e, this.c = n;
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
  static getNormal(t, e, n, r) {
    r.subVectors(n, e), Be.subVectors(t, e), r.cross(Be);
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
  static getBarycoord(t, e, n, r, s) {
    Be.subVectors(r, e), je.subVectors(n, e), ur.subVectors(t, e);
    const a = Be.dot(Be), o = Be.dot(je), l = Be.dot(ur), c = je.dot(je), h = je.dot(ur), f = a * c - o * o;
    if (f === 0)
      return s.set(0, 0, 0), null;
    const u = 1 / f, p = (c * l - o * h) * u, _ = (a * h - o * l) * u;
    return s.set(1 - p - _, _, p);
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
  static containsPoint(t, e, n, r) {
    return this.getBarycoord(t, e, n, r, tn) === null ? !1 : tn.x >= 0 && tn.y >= 0 && tn.x + tn.y <= 1;
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
  static getInterpolation(t, e, n, r, s, a, o, l) {
    return this.getBarycoord(t, e, n, r, tn) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, tn.x), l.addScaledVector(a, tn.y), l.addScaledVector(o, tn.z), l);
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
  static getInterpolatedAttribute(t, e, n, r, s, a) {
    return pr.setScalar(0), mr.setScalar(0), gr.setScalar(0), pr.fromBufferAttribute(t, e), mr.fromBufferAttribute(t, n), gr.fromBufferAttribute(t, r), a.setScalar(0), a.addScaledVector(pr, s.x), a.addScaledVector(mr, s.y), a.addScaledVector(gr, s.z), a;
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
  static isFrontFacing(t, e, n, r) {
    return Be.subVectors(n, e), je.subVectors(t, e), Be.cross(je).dot(r) < 0;
  }
  /**
   * Sets the triangle's vertices by copying the given values.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  set(t, e, n) {
    return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
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
  setFromPointsAndIndices(t, e, n, r) {
    return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[r]), this;
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
  setFromAttributeAndIndices(t, e, n, r) {
    return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, r), this;
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
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  /**
   * Computes the area of the triangle.
   *
   * @return {number} The triangle's area.
   */
  getArea() {
    return Be.subVectors(this.c, this.b), je.subVectors(this.a, this.b), Be.cross(je).length() * 0.5;
  }
  /**
   * Computes the midpoint of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's midpoint.
   */
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  /**
   * Computes the normal of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  getNormal(t) {
    return Ge.getNormal(this.a, this.b, this.c, t);
  }
  /**
   * Computes a plane the triangle lies within.
   *
   * @param {Plane} target - The target vector that is used to store the method's result.
   * @return {Plane} The plane the triangle lies within.
   */
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  getBarycoord(t, e) {
    return Ge.getBarycoord(t, this.a, this.b, this.c, e);
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
  getInterpolation(t, e, n, r, s) {
    return Ge.getInterpolation(t, this.a, this.b, this.c, e, n, r, s);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  containsPoint(t) {
    return Ge.containsPoint(t, this.a, this.b, this.c);
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  isFrontFacing(t) {
    return Ge.isFrontFacing(this.a, this.b, this.c, t);
  }
  /**
   * Returns `true` if this triangle intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this triangle intersects with the given box or not.
   */
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  /**
   * Returns the closest point on the triangle to the given point.
   *
   * @param {Vector3} p - The point to compute the closest point for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on the triangle.
   */
  closestPointToPoint(t, e) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    Dn.subVectors(r, n), In.subVectors(s, n), hr.subVectors(t, n);
    const l = Dn.dot(hr), c = In.dot(hr);
    if (l <= 0 && c <= 0)
      return e.copy(n);
    fr.subVectors(t, r);
    const h = Dn.dot(fr), f = In.dot(fr);
    if (h >= 0 && f <= h)
      return e.copy(r);
    const u = l * f - h * c;
    if (u <= 0 && l >= 0 && h <= 0)
      return a = l / (l - h), e.copy(n).addScaledVector(Dn, a);
    dr.subVectors(t, s);
    const p = Dn.dot(dr), _ = In.dot(dr);
    if (_ >= 0 && p <= _)
      return e.copy(s);
    const y = p * c - l * _;
    if (y <= 0 && c >= 0 && _ <= 0)
      return o = c / (c - _), e.copy(n).addScaledVector(In, o);
    const m = h * _ - p * f;
    if (m <= 0 && f - h >= 0 && p - _ >= 0)
      return As.subVectors(s, r), o = (f - h) / (f - h + (p - _)), e.copy(r).addScaledVector(As, o);
    const d = 1 / (m + y + u);
    return a = y * d, o = u * d, e.copy(n).addScaledVector(Dn, a).addScaledVector(In, o);
  }
  /**
   * Returns `true` if this triangle is equal with the given one.
   *
   * @param {Triangle} triangle - The triangle to test for equality.
   * @return {boolean} Whether this triangle is equal with the given one.
   */
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
class An {
  /**
   * Constructs a new bounding box.
   *
   * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.
   * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
   */
  constructor(t = new N(1 / 0, 1 / 0, 1 / 0), e = new N(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = t, this.max = e;
  }
  /**
   * Sets the lower and upper boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector3} min - The lower boundary of the box.
   * @param {Vector3} max - The upper boundary of the box.
   * @return {Box3} A reference to this bounding box.
   */
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<number>} array - An array holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3)
      this.expandByPoint(ze.fromArray(t, e));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++)
      this.expandByPoint(ze.fromBufferAttribute(t, e));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.
   * @return {Box3} A reference to this bounding box.
   */
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++)
      this.expandByPoint(t[e]);
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
  setFromCenterAndSize(t, e) {
    const n = ze.copy(e).multiplyScalar(0.5);
    return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
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
  setFromObject(t, e = !1) {
    return this.makeEmpty(), this.expandByObject(t, e);
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
  copy(t) {
    return this.min.copy(t.min), this.max.copy(t.max), this;
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
  getCenter(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  /**
   * Returns the dimensions of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The size.
   */
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  /**
   * Expands the boundaries of this box to include the given point.
   *
   * @param {Vector3} point - The point that should be included by the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByPoint(t) {
    return this.min.min(t), this.max.max(t), this;
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
  expandByVector(t) {
    return this.min.sub(t), this.max.add(t), this;
  }
  /**
   * Expands each dimension of the box by the given scalar. If negative, the
   * dimensions of the box will be contracted.
   *
   * @param {number} scalar - The scalar value that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByScalar(t) {
    return this.min.addScalar(-t), this.max.addScalar(t), this;
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
  expandByObject(t, e = !1) {
    t.updateWorldMatrix(!1, !1);
    const n = t.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (e === !0 && s !== void 0 && t.isInstancedMesh !== !0)
        for (let a = 0, o = s.count; a < o; a++)
          t.isMesh === !0 ? t.getVertexPosition(a, ze) : ze.fromBufferAttribute(s, a), ze.applyMatrix4(t.matrixWorld), this.expandByPoint(ze);
      else
        t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), Ti.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Ti.copy(n.boundingBox)), Ti.applyMatrix4(t.matrixWorld), this.union(Ti);
    }
    const r = t.children;
    for (let s = 0, a = r.length; s < a; s++)
      this.expandByObject(r[s], e);
    return this;
  }
  /**
   * Returns `true` if the given point lies within or on the boundaries of this box.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the bounding box contains the given point or not.
   */
  containsPoint(t) {
    return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
  }
  /**
   * Returns `true` if this bounding box includes the entirety of the given bounding box.
   * If this box and the given one are identical, this function also returns `true`.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box contains the given bounding box or not.
   */
  containsBox(t) {
    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
  }
  /**
   * Returns a point as a proportion of this box's width, height and depth.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A point as a proportion of this box's width, height and depth.
   */
  getParameter(t, e) {
    return e.set(
      (t.x - this.min.x) / (this.max.x - this.min.x),
      (t.y - this.min.y) / (this.max.y - this.min.y),
      (t.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  /**
   * Returns `true` if the given bounding box intersects with this bounding box.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this bounding box.
   */
  intersectsBox(t) {
    return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z;
  }
  /**
   * Returns `true` if the given bounding sphere intersects with this bounding box.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
   */
  intersectsSphere(t) {
    return this.clampPoint(t.center, ze), ze.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  /**
   * Returns `true` if the given plane intersects with this bounding box.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether the given plane intersects with this bounding box.
   */
  intersectsPlane(t) {
    let e, n;
    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
  }
  /**
   * Returns `true` if the given triangle intersects with this bounding box.
   *
   * @param {Triangle} triangle - The triangle to test.
   * @return {boolean} Whether the given triangle intersects with this bounding box.
   */
  intersectsTriangle(t) {
    if (this.isEmpty())
      return !1;
    this.getCenter(ni), Ai.subVectors(this.max, ni), Fn.subVectors(t.a, ni), Nn.subVectors(t.b, ni), Un.subVectors(t.c, ni), hn.subVectors(Nn, Fn), fn.subVectors(Un, Nn), _n.subVectors(Fn, Un);
    let e = [
      0,
      -hn.z,
      hn.y,
      0,
      -fn.z,
      fn.y,
      0,
      -_n.z,
      _n.y,
      hn.z,
      0,
      -hn.x,
      fn.z,
      0,
      -fn.x,
      _n.z,
      0,
      -_n.x,
      -hn.y,
      hn.x,
      0,
      -fn.y,
      fn.x,
      0,
      -_n.y,
      _n.x,
      0
    ];
    return !_r(e, Fn, Nn, Un, Ai) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !_r(e, Fn, Nn, Un, Ai)) ? !1 : (bi.crossVectors(hn, fn), e = [bi.x, bi.y, bi.z], _r(e, Fn, Nn, Un, Ai));
  }
  /**
   * Clamps the given point within the bounds of this box.
   *
   * @param {Vector3} point - The point to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  /**
   * Returns the euclidean distance from any edge of this box to the specified point. If
   * the given point lies inside of this box, the distance will be `0`.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The euclidean distance.
   */
  distanceToPoint(t) {
    return this.clampPoint(t, ze).distanceTo(t);
  }
  /**
   * Returns a bounding sphere that encloses this bounding box.
   *
   * @param {Sphere} target - The target sphere that is used to store the method's result.
   * @return {Sphere} The bounding sphere that encloses this bounding box.
   */
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(ze).length() * 0.5), t;
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
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  /**
   * Computes the union of this box and another and the given one, setting the upper
   * bound of this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   *
   * @param {Box3} box - The bounding box that will be unioned with this instance.
   * @return {Box3} A reference to this bounding box.
   */
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  /**
   * Transforms this bounding box by the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Box3} A reference to this bounding box.
   */
  applyMatrix4(t) {
    return this.isEmpty() ? this : (en[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), en[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), en[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), en[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), en[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), en[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), en[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), en[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(en), this);
  }
  /**
   * Adds the given offset to both the upper and lower bounds of this bounding box,
   * effectively moving it in 3D space.
   *
   * @param {Vector3} offset - The offset that should be used to translate the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  /**
   * Returns `true` if this bounding box is equal with the given one.
   *
   * @param {Box3} box - The box to test for equality.
   * @return {boolean} Whether this bounding box is equal with the given one.
   */
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
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
  fromJSON(t) {
    return this.min.fromArray(t.min), this.max.fromArray(t.max), this;
  }
}
const en = [
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N(),
  /* @__PURE__ */ new N()
], ze = /* @__PURE__ */ new N(), Ti = /* @__PURE__ */ new An(), Fn = /* @__PURE__ */ new N(), Nn = /* @__PURE__ */ new N(), Un = /* @__PURE__ */ new N(), hn = /* @__PURE__ */ new N(), fn = /* @__PURE__ */ new N(), _n = /* @__PURE__ */ new N(), ni = /* @__PURE__ */ new N(), Ai = /* @__PURE__ */ new N(), bi = /* @__PURE__ */ new N(), xn = /* @__PURE__ */ new N();
function _r(i, t, e, n, r) {
  for (let s = 0, a = i.length - 3; s <= a; s += 3) {
    xn.fromArray(i, s);
    const o = r.x * Math.abs(xn.x) + r.y * Math.abs(xn.y) + r.z * Math.abs(xn.z), l = t.dot(xn), c = e.dot(xn), h = n.dot(xn);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o)
      return !1;
  }
  return !0;
}
const _e = /* @__PURE__ */ new N(), Ri = /* @__PURE__ */ new ut();
let Mo = 0;
class Ve extends Tn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {TypedArray} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(t, e, n = !1) {
    if (super(), Array.isArray(t))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Mo++ }), this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = 35044, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
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
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  /**
   * Sets the usage of this buffer attribute.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {BufferAttribute} A reference to this buffer attribute.
   */
  setUsage(t) {
    return this.usage = t, this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
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
  copy(t) {
    return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
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
  copyAt(t, e, n) {
    t *= this.itemSize, n *= e.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[t + r] = e.array[n + r];
    return this;
  }
  /**
   * Copies the given array data into this buffer attribute.
   *
   * @param {(TypedArray|Array)} array - The array to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyArray(t) {
    return this.array.set(t), this;
  }
  /**
   * Applies the given 3x3 matrix to the given attribute. Works with
   * item size `2` and `3`.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix3(t) {
    if (this.itemSize === 2)
      for (let e = 0, n = this.count; e < n; e++)
        Ri.fromBufferAttribute(this, e), Ri.applyMatrix3(t), this.setXY(e, Ri.x, Ri.y);
    else if (this.itemSize === 3)
      for (let e = 0, n = this.count; e < n; e++)
        _e.fromBufferAttribute(this, e), _e.applyMatrix3(t), this.setXYZ(e, _e.x, _e.y, _e.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++)
      _e.fromBufferAttribute(this, e), _e.applyMatrix4(t), this.setXYZ(e, _e.x, _e.y, _e.z);
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      _e.fromBufferAttribute(this, e), _e.applyNormalMatrix(t), this.setXYZ(e, _e.x, _e.y, _e.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      _e.fromBufferAttribute(this, e), _e.transformDirection(t), this.setXYZ(e, _e.x, _e.y, _e.z);
    return this;
  }
  /**
   * Sets the given array data in the buffer attribute.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this buffer attribute's array.
   * @return {BufferAttribute} A reference to this instance.
   */
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return this.normalized && (n = ti(n, this.array)), n;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setComponent(t, e, n) {
    return this.normalized && (n = Ce(n, this.array)), this.array[t * this.itemSize + e] = n, this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = ti(e, this.array)), e;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setX(t, e) {
    return this.normalized && (e = Ce(e, this.array)), this.array[t * this.itemSize] = e, this;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = ti(e, this.array)), e;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setY(t, e) {
    return this.normalized && (e = Ce(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = ti(e, this.array)), e;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setZ(t, e) {
    return this.normalized && (e = Ce(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = ti(e, this.array)), e;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setW(t, e) {
    return this.normalized && (e = Ce(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXY(t, e, n) {
    return t *= this.itemSize, this.normalized && (e = Ce(e, this.array), n = Ce(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
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
  setXYZ(t, e, n, r) {
    return t *= this.itemSize, this.normalized && (e = Ce(e, this.array), n = Ce(n, this.array), r = Ce(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = r, this;
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
  setXYZW(t, e, n, r, s) {
    return t *= this.itemSize, this.normalized && (e = Ce(e, this.array), n = Ce(n, this.array), r = Ce(r, this.array), s = Ce(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = r, this.array[t + 3] = s, this;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the attribute array data to the GPU. Can be used to perform clean-up operations after
   * the upload when attribute data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {BufferAttribute} A reference to this instance.
   */
  onUpload(t) {
    return this.onUploadCallback = t, this;
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
    const t = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (t.name = this.name), this.usage !== 35044 && (t.usage = this.usage), t;
  }
  /**
   * Disposes of the buffer attribute. Available only in {@link WebGPURenderer}.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Sa extends Ve {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class ya extends Ve {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class we extends Ve {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Float32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
const So = /* @__PURE__ */ new An(), ii = /* @__PURE__ */ new N(), xr = /* @__PURE__ */ new N();
class _i {
  /**
   * Constructs a new sphere.
   *
   * @param {Vector3} [center=(0,0,0)] - The center of the sphere
   * @param {number} [radius=-1] - The radius of the sphere.
   */
  constructor(t = new N(), e = -1) {
    this.isSphere = !0, this.center = t, this.radius = e;
  }
  /**
   * Sets the sphere's components by copying the given values.
   *
   * @param {Vector3} center - The center.
   * @param {number} radius - The radius.
   * @return {Sphere} A reference to this sphere.
   */
  set(t, e) {
    return this.center.copy(t), this.radius = e, this;
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
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : So.setFromPoints(t).getCenter(n);
    let r = 0;
    for (let s = 0, a = t.length; s < a; s++)
      r = Math.max(r, n.distanceToSquared(t[s]));
    return this.radius = Math.sqrt(r), this;
  }
  /**
   * Copies the values of the given sphere to this instance.
   *
   * @param {Sphere} sphere - The sphere to copy.
   * @return {Sphere} A reference to this sphere.
   */
  copy(t) {
    return this.center.copy(t.center), this.radius = t.radius, this;
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
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  /**
   * Returns the closest distance from the boundary of the sphere to the
   * given point. If the sphere contains the point, the distance will
   * be negative.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The distance to the point.
   */
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  /**
   * Returns `true` if this sphere intersects with the given one.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @return {boolean} Whether this sphere intersects with the given one or not.
   */
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  /**
   * Returns `true` if this sphere intersects with the given box.
   *
   * @param {Box3} box - The box to test.
   * @return {boolean} Whether this sphere intersects with the given box or not.
   */
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  /**
   * Returns `true` if this sphere intersects with the given plane.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether this sphere intersects with the given plane or not.
   */
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
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
  clampPoint(t, e) {
    const n = this.center.distanceToSquared(t);
    return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
  }
  /**
   * Returns a bounding box that encloses this sphere.
   *
   * @param {Box3} target - The target box that is used to store the method's result.
   * @return {Box3} The bounding box that encloses this sphere.
   */
  getBoundingBox(t) {
    return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  /**
   * Transforms this sphere with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Sphere} A reference to this sphere.
   */
  applyMatrix4(t) {
    return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
  }
  /**
   * Translates the sphere's center by the given offset.
   *
   * @param {Vector3} offset - The offset.
   * @return {Sphere} A reference to this sphere.
   */
  translate(t) {
    return this.center.add(t), this;
  }
  /**
   * Expands the boundaries of this sphere to include the given point.
   *
   * @param {Vector3} point - The point to include.
   * @return {Sphere} A reference to this sphere.
   */
  expandByPoint(t) {
    if (this.isEmpty())
      return this.center.copy(t), this.radius = 0, this;
    ii.subVectors(t, this.center);
    const e = ii.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(ii, r / n), this.radius += r;
    }
    return this;
  }
  /**
   * Expands this sphere to enclose both the original sphere and the given sphere.
   *
   * @param {Sphere} sphere - The sphere to include.
   * @return {Sphere} A reference to this sphere.
   */
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === !0 ? this.radius = Math.max(this.radius, t.radius) : (xr.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(ii.copy(t.center).add(xr)), this.expandByPoint(ii.copy(t.center).sub(xr))), this);
  }
  /**
   * Returns `true` if this sphere is equal with the given one.
   *
   * @param {Sphere} sphere - The sphere to test for equality.
   * @return {boolean} Whether this bounding sphere is equal with the given one.
   */
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
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
  fromJSON(t) {
    return this.radius = t.radius, this.center.fromArray(t.center), this;
  }
}
let yo = 0;
const Ne = /* @__PURE__ */ new oe(), vr = /* @__PURE__ */ new ye(), On = /* @__PURE__ */ new N(), De = /* @__PURE__ */ new An(), ri = /* @__PURE__ */ new An(), Se = /* @__PURE__ */ new N();
class ke extends Tn {
  /**
   * Constructs a new geometry.
   */
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: yo++ }), this.uuid = Kn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {}, this._transformed = !1;
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
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (eo(t) ? ya : Sa)(t, 1) : this.index = t, this;
  }
  /**
   * Sets the given indirect attribute to this geometry.
   *
   * @param {BufferAttribute} indirect - The attribute holding indirect draw calls.
   * @param {number|Array<number>} [indirectOffset=0] - The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndirect(t, e = 0) {
    return this.indirect = t, this.indirectOffset = e, this;
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
  getAttribute(t) {
    return this.attributes[t];
  }
  /**
   * Sets the given attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @param {BufferAttribute|InterleavedBufferAttribute} attribute - The attribute to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setAttribute(t, e) {
    return this.attributes[t] = e, this;
  }
  /**
   * Deletes the attribute for the given name.
   *
   * @param {string} name - The attribute name to delete.
   * @return {BufferGeometry} A reference to this instance.
   */
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  /**
   * Returns `true` if this geometry has an attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {boolean} Whether this geometry has an attribute for the given name or not.
   */
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  /**
   * Adds a group to this geometry.
   *
   * @param {number} start - The first element in this draw call. That is the first
   * vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - Specifies how many vertices (or indices) are part of this group.
   * @param {number} [materialIndex=0] - The material array index to use.
   */
  addGroup(t, e, n = 0) {
    this.groups.push({
      start: t,
      count: e,
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
  setDrawRange(t, e) {
    this.drawRange.start = t, this.drawRange.count = e;
  }
  /**
   * Applies the given 4x4 transformation matrix to the geometry.
   *
   * @param {Matrix4} matrix - The matrix to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyMatrix4(t) {
    const e = this.attributes.position;
    e !== void 0 && (e.applyMatrix4(t), e.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Vt().getNormalMatrix(t);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(t), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
  }
  /**
   * Applies the rotation represented by the Quaternion to the geometry.
   *
   * @param {Quaternion} q - The Quaternion to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyQuaternion(t) {
    return Ne.makeRotationFromQuaternion(t), this.applyMatrix4(Ne), this;
  }
  /**
   * Rotates the geometry about the X axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateX(t) {
    return Ne.makeRotationX(t), this.applyMatrix4(Ne), this;
  }
  /**
   * Rotates the geometry about the Y axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateY(t) {
    return Ne.makeRotationY(t), this.applyMatrix4(Ne), this;
  }
  /**
   * Rotates the geometry about the Z axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateZ(t) {
    return Ne.makeRotationZ(t), this.applyMatrix4(Ne), this;
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
  translate(t, e, n) {
    return Ne.makeTranslation(t, e, n), this.applyMatrix4(Ne), this;
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
  scale(t, e, n) {
    return Ne.makeScale(t, e, n), this.applyMatrix4(Ne), this;
  }
  /**
   * Rotates the geometry to face a point in 3D space. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#lookAt} for typical
   * real-time mesh rotation.
   *
   * @param {Vector3} vector - The target point.
   * @return {BufferGeometry} A reference to this instance.
   */
  lookAt(t) {
    return vr.lookAt(t), vr.updateMatrix(), this.applyMatrix4(vr.matrix), this;
  }
  /**
   * Center the geometry based on its bounding box.
   *
   * @return {BufferGeometry} A reference to this instance.
   */
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(On).negate(), this.translate(On.x, On.y, On.z), this;
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
  setFromPoints(t) {
    const e = this.getAttribute("position");
    if (e === void 0) {
      const n = [];
      for (let r = 0, s = t.length; r < s; r++) {
        const a = t[r];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new we(n, 3));
    } else {
      const n = Math.min(t.length, e.count);
      for (let r = 0; r < n; r++) {
        const s = t[r];
        e.setXYZ(r, s.x, s.y, s.z || 0);
      }
      t.length > e.count && Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), e.needsUpdate = !0;
    }
    return this;
  }
  /**
   * Computes the bounding box of the geometry, and updates the `boundingBox` member.
   * The bounding box is not computed by the engine; it must be computed by your app.
   * You may need to recompute the bounding box if the geometry vertices are modified.
   */
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new An());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new N(-1 / 0, -1 / 0, -1 / 0),
        new N(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), e)
        for (let n = 0, r = e.length; n < r; n++) {
          const s = e[n];
          De.setFromBufferAttribute(s), this.morphTargetsRelative ? (Se.addVectors(this.boundingBox.min, De.min), this.boundingBox.expandByPoint(Se), Se.addVectors(this.boundingBox.max, De.max), this.boundingBox.expandByPoint(Se)) : (this.boundingBox.expandByPoint(De.min), this.boundingBox.expandByPoint(De.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  /**
   * Computes the bounding sphere of the geometry, and updates the `boundingSphere` member.
   * The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
   * You may need to recompute the bounding sphere if the geometry vertices are modified.
   */
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new _i());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new N(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (De.setFromBufferAttribute(t), e)
        for (let s = 0, a = e.length; s < a; s++) {
          const o = e[s];
          ri.setFromBufferAttribute(o), this.morphTargetsRelative ? (Se.addVectors(De.min, ri.min), De.expandByPoint(Se), Se.addVectors(De.max, ri.max), De.expandByPoint(Se)) : (De.expandByPoint(ri.min), De.expandByPoint(ri.max));
        }
      De.getCenter(n);
      let r = 0;
      for (let s = 0, a = t.count; s < a; s++)
        Se.fromBufferAttribute(t, s), r = Math.max(r, n.distanceToSquared(Se));
      if (e)
        for (let s = 0, a = e.length; s < a; s++) {
          const o = e[s], l = this.morphTargetsRelative;
          for (let c = 0, h = o.count; c < h; c++)
            Se.fromBufferAttribute(o, c), l && (On.fromBufferAttribute(t, c), Se.add(On)), r = Math.max(r, n.distanceToSquared(Se));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
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
    const t = this.index, e = this.attributes;
    if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
      Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = e.position, r = e.normal, s = e.uv;
    let a = this.getAttribute("tangent");
    (a === void 0 || a.count !== n.count) && (a = new Ve(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
    const o = [], l = [];
    for (let x = 0; x < n.count; x++)
      o[x] = new N(), l[x] = new N();
    const c = new N(), h = new N(), f = new N(), u = new ut(), p = new ut(), _ = new ut(), y = new N(), m = new N();
    function d(x, E, P) {
      c.fromBufferAttribute(n, x), h.fromBufferAttribute(n, E), f.fromBufferAttribute(n, P), u.fromBufferAttribute(s, x), p.fromBufferAttribute(s, E), _.fromBufferAttribute(s, P), h.sub(c), f.sub(c), p.sub(u), _.sub(u);
      const w = 1 / (p.x * _.y - _.x * p.y);
      isFinite(w) && (y.copy(h).multiplyScalar(_.y).addScaledVector(f, -p.y).multiplyScalar(w), m.copy(f).multiplyScalar(p.x).addScaledVector(h, -_.x).multiplyScalar(w), o[x].add(y), o[E].add(y), o[P].add(y), l[x].add(m), l[E].add(m), l[P].add(m));
    }
    let b = this.groups;
    b.length === 0 && (b = [{
      start: 0,
      count: t.count
    }]);
    for (let x = 0, E = b.length; x < E; ++x) {
      const P = b[x], w = P.start, B = P.count;
      for (let q = w, $ = w + B; q < $; q += 3)
        d(
          t.getX(q + 0),
          t.getX(q + 1),
          t.getX(q + 2)
        );
    }
    const A = new N(), M = new N(), R = new N(), T = new N();
    function C(x) {
      R.fromBufferAttribute(r, x), T.copy(R);
      const E = o[x];
      A.copy(E), A.sub(R.multiplyScalar(R.dot(E))).normalize(), M.crossVectors(T, E);
      const w = M.dot(l[x]) < 0 ? -1 : 1;
      a.setXYZW(x, A.x, A.y, A.z, w);
    }
    for (let x = 0, E = b.length; x < E; ++x) {
      const P = b[x], w = P.start, B = P.count;
      for (let q = w, $ = w + B; q < $; q += 3)
        C(t.getX(q + 0)), C(t.getX(q + 1)), C(t.getX(q + 2));
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
    const t = this.index, e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0 || n.count !== e.count)
        n = new Ve(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let u = 0, p = n.count; u < p; u++)
          n.setXYZ(u, 0, 0, 0);
      const r = new N(), s = new N(), a = new N(), o = new N(), l = new N(), c = new N(), h = new N(), f = new N();
      if (t)
        for (let u = 0, p = t.count; u < p; u += 3) {
          const _ = t.getX(u + 0), y = t.getX(u + 1), m = t.getX(u + 2);
          r.fromBufferAttribute(e, _), s.fromBufferAttribute(e, y), a.fromBufferAttribute(e, m), h.subVectors(a, s), f.subVectors(r, s), h.cross(f), o.fromBufferAttribute(n, _), l.fromBufferAttribute(n, y), c.fromBufferAttribute(n, m), o.add(h), l.add(h), c.add(h), n.setXYZ(_, o.x, o.y, o.z), n.setXYZ(y, l.x, l.y, l.z), n.setXYZ(m, c.x, c.y, c.z);
        }
      else
        for (let u = 0, p = e.count; u < p; u += 3)
          r.fromBufferAttribute(e, u + 0), s.fromBufferAttribute(e, u + 1), a.fromBufferAttribute(e, u + 2), h.subVectors(a, s), f.subVectors(r, s), h.cross(f), n.setXYZ(u + 0, h.x, h.y, h.z), n.setXYZ(u + 1, h.x, h.y, h.z), n.setXYZ(u + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  /**
   * Ensures every normal vector in a geometry will have a magnitude of `1`. This will
   * correct lighting on the geometry surfaces.
   */
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++)
      Se.fromBufferAttribute(t, e), Se.normalize(), t.setXYZ(e, Se.x, Se.y, Se.z);
  }
  /**
   * Return a new non-index version of this indexed geometry. If the geometry
   * is already non-indexed, the method is a NOOP.
   *
   * @return {BufferGeometry} The non-indexed version of this indexed geometry.
   */
  toNonIndexed() {
    function t(o, l) {
      const c = o.array, h = o.itemSize, f = o.normalized, u = new c.constructor(l.length * h);
      let p = 0, _ = 0;
      for (let y = 0, m = l.length; y < m; y++) {
        o.isInterleavedBufferAttribute ? p = l[y] * o.data.stride + o.offset : p = l[y] * h;
        for (let d = 0; d < h; d++)
          u[_++] = c[p++];
      }
      return new Ve(u, h, f);
    }
    if (this.index === null)
      return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new ke(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const l = r[o], c = t(l, n);
      e.setAttribute(o, c);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const l = [], c = s[o];
      for (let h = 0, f = c.length; h < f; h++) {
        const u = c[h], p = t(u, n);
        l.push(p);
      }
      e.morphAttributes[o] = l;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      e.addGroup(c.start, c.count, c.materialIndex);
    }
    return e;
  }
  /**
   * Serializes the geometry into JSON.
   *
   * @return {Object} A JSON object representing the serialized geometry.
   */
  toJSON() {
    const t = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (t.uuid = this.uuid, t.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null && (t.data.index = {
      type: e.array.constructor.name,
      array: Array.prototype.slice.call(e.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let f = 0, u = c.length; f < u; f++) {
        const p = c[f];
        h.push(p.toJSON(t.data));
      }
      h.length > 0 && (r[l] = h, s = !0);
    }
    s && (t.data.morphAttributes = r, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (t.data.boundingSphere = o.toJSON()), t;
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
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const e = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone());
    const r = t.attributes;
    for (const c in r) {
      const h = r[c];
      this.setAttribute(c, h.clone(e));
    }
    const s = t.morphAttributes;
    for (const c in s) {
      const h = [], f = s[c];
      for (let u = 0, p = f.length; u < p; u++)
        h.push(f[u].clone(e));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let c = 0, h = a.length; c < h; c++) {
      const f = a[c];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const o = t.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this._transformed = t._transformed, this;
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
let Eo = 0;
class $n extends Tn {
  /**
   * Constructs a new material.
   */
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Eo++ }), this.uuid = Kn(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Yt(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
  set alphaTest(t) {
    this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
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
  setValues(t) {
    if (t !== void 0)
      for (const e in t) {
        const n = t[e];
        if (n === void 0) {
          Ut(`Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        const r = this[e];
        if (r === void 0) {
          Ut(`Material: '${e}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[e] = n;
      }
  }
  /**
   * Serializes the material into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized material.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    e && (t = {
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
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(t).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(t).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.allowOverride === !1 && (n.allowOverride = !1), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(s) {
      const a = [];
      for (const o in s) {
        const l = s[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (e) {
      const s = r(t.textures), a = r(t.images);
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
  fromJSON(t, e) {
    if (t.uuid !== void 0 && (this.uuid = t.uuid), t.name !== void 0 && (this.name = t.name), t.color !== void 0 && this.color !== void 0 && this.color.setHex(t.color), t.roughness !== void 0 && (this.roughness = t.roughness), t.metalness !== void 0 && (this.metalness = t.metalness), t.sheen !== void 0 && (this.sheen = t.sheen), t.sheenColor !== void 0 && (this.sheenColor = new Yt().setHex(t.sheenColor)), t.sheenRoughness !== void 0 && (this.sheenRoughness = t.sheenRoughness), t.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(t.emissive), t.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(t.specular), t.specularIntensity !== void 0 && (this.specularIntensity = t.specularIntensity), t.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(t.specularColor), t.shininess !== void 0 && (this.shininess = t.shininess), t.clearcoat !== void 0 && (this.clearcoat = t.clearcoat), t.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = t.clearcoatRoughness), t.dispersion !== void 0 && (this.dispersion = t.dispersion), t.iridescence !== void 0 && (this.iridescence = t.iridescence), t.iridescenceIOR !== void 0 && (this.iridescenceIOR = t.iridescenceIOR), t.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = t.iridescenceThicknessRange), t.transmission !== void 0 && (this.transmission = t.transmission), t.thickness !== void 0 && (this.thickness = t.thickness), t.attenuationDistance !== void 0 && (this.attenuationDistance = t.attenuationDistance), t.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(t.attenuationColor), t.anisotropy !== void 0 && (this.anisotropy = t.anisotropy), t.anisotropyRotation !== void 0 && (this.anisotropyRotation = t.anisotropyRotation), t.fog !== void 0 && (this.fog = t.fog), t.flatShading !== void 0 && (this.flatShading = t.flatShading), t.blending !== void 0 && (this.blending = t.blending), t.combine !== void 0 && (this.combine = t.combine), t.side !== void 0 && (this.side = t.side), t.shadowSide !== void 0 && (this.shadowSide = t.shadowSide), t.opacity !== void 0 && (this.opacity = t.opacity), t.transparent !== void 0 && (this.transparent = t.transparent), t.alphaTest !== void 0 && (this.alphaTest = t.alphaTest), t.alphaHash !== void 0 && (this.alphaHash = t.alphaHash), t.depthFunc !== void 0 && (this.depthFunc = t.depthFunc), t.depthTest !== void 0 && (this.depthTest = t.depthTest), t.depthWrite !== void 0 && (this.depthWrite = t.depthWrite), t.colorWrite !== void 0 && (this.colorWrite = t.colorWrite), t.blendSrc !== void 0 && (this.blendSrc = t.blendSrc), t.blendDst !== void 0 && (this.blendDst = t.blendDst), t.blendEquation !== void 0 && (this.blendEquation = t.blendEquation), t.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = t.blendSrcAlpha), t.blendDstAlpha !== void 0 && (this.blendDstAlpha = t.blendDstAlpha), t.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = t.blendEquationAlpha), t.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(t.blendColor), t.blendAlpha !== void 0 && (this.blendAlpha = t.blendAlpha), t.stencilWriteMask !== void 0 && (this.stencilWriteMask = t.stencilWriteMask), t.stencilFunc !== void 0 && (this.stencilFunc = t.stencilFunc), t.stencilRef !== void 0 && (this.stencilRef = t.stencilRef), t.stencilFuncMask !== void 0 && (this.stencilFuncMask = t.stencilFuncMask), t.stencilFail !== void 0 && (this.stencilFail = t.stencilFail), t.stencilZFail !== void 0 && (this.stencilZFail = t.stencilZFail), t.stencilZPass !== void 0 && (this.stencilZPass = t.stencilZPass), t.stencilWrite !== void 0 && (this.stencilWrite = t.stencilWrite), t.wireframe !== void 0 && (this.wireframe = t.wireframe), t.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = t.wireframeLinewidth), t.wireframeLinecap !== void 0 && (this.wireframeLinecap = t.wireframeLinecap), t.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = t.wireframeLinejoin), t.rotation !== void 0 && (this.rotation = t.rotation), t.linewidth !== void 0 && (this.linewidth = t.linewidth), t.dashSize !== void 0 && (this.dashSize = t.dashSize), t.gapSize !== void 0 && (this.gapSize = t.gapSize), t.scale !== void 0 && (this.scale = t.scale), t.polygonOffset !== void 0 && (this.polygonOffset = t.polygonOffset), t.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = t.polygonOffsetFactor), t.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = t.polygonOffsetUnits), t.dithering !== void 0 && (this.dithering = t.dithering), t.alphaToCoverage !== void 0 && (this.alphaToCoverage = t.alphaToCoverage), t.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = t.premultipliedAlpha), t.forceSinglePass !== void 0 && (this.forceSinglePass = t.forceSinglePass), t.allowOverride !== void 0 && (this.allowOverride = t.allowOverride), t.visible !== void 0 && (this.visible = t.visible), t.toneMapped !== void 0 && (this.toneMapped = t.toneMapped), t.userData !== void 0 && (this.userData = t.userData), t.vertexColors !== void 0 && (typeof t.vertexColors == "number" ? this.vertexColors = t.vertexColors > 0 : this.vertexColors = t.vertexColors), t.size !== void 0 && (this.size = t.size), t.sizeAttenuation !== void 0 && (this.sizeAttenuation = t.sizeAttenuation), t.map !== void 0 && (this.map = e[t.map] || null), t.matcap !== void 0 && (this.matcap = e[t.matcap] || null), t.alphaMap !== void 0 && (this.alphaMap = e[t.alphaMap] || null), t.bumpMap !== void 0 && (this.bumpMap = e[t.bumpMap] || null), t.bumpScale !== void 0 && (this.bumpScale = t.bumpScale), t.normalMap !== void 0 && (this.normalMap = e[t.normalMap] || null), t.normalMapType !== void 0 && (this.normalMapType = t.normalMapType), t.normalScale !== void 0) {
      let n = t.normalScale;
      Array.isArray(n) === !1 && (n = [n, n]), this.normalScale = new ut().fromArray(n);
    }
    return t.displacementMap !== void 0 && (this.displacementMap = e[t.displacementMap] || null), t.displacementScale !== void 0 && (this.displacementScale = t.displacementScale), t.displacementBias !== void 0 && (this.displacementBias = t.displacementBias), t.roughnessMap !== void 0 && (this.roughnessMap = e[t.roughnessMap] || null), t.metalnessMap !== void 0 && (this.metalnessMap = e[t.metalnessMap] || null), t.emissiveMap !== void 0 && (this.emissiveMap = e[t.emissiveMap] || null), t.emissiveIntensity !== void 0 && (this.emissiveIntensity = t.emissiveIntensity), t.specularMap !== void 0 && (this.specularMap = e[t.specularMap] || null), t.specularIntensityMap !== void 0 && (this.specularIntensityMap = e[t.specularIntensityMap] || null), t.specularColorMap !== void 0 && (this.specularColorMap = e[t.specularColorMap] || null), t.envMap !== void 0 && (this.envMap = e[t.envMap] || null), t.envMapRotation !== void 0 && this.envMapRotation.fromArray(t.envMapRotation), t.envMapIntensity !== void 0 && (this.envMapIntensity = t.envMapIntensity), t.reflectivity !== void 0 && (this.reflectivity = t.reflectivity), t.refractionRatio !== void 0 && (this.refractionRatio = t.refractionRatio), t.lightMap !== void 0 && (this.lightMap = e[t.lightMap] || null), t.lightMapIntensity !== void 0 && (this.lightMapIntensity = t.lightMapIntensity), t.aoMap !== void 0 && (this.aoMap = e[t.aoMap] || null), t.aoMapIntensity !== void 0 && (this.aoMapIntensity = t.aoMapIntensity), t.gradientMap !== void 0 && (this.gradientMap = e[t.gradientMap] || null), t.clearcoatMap !== void 0 && (this.clearcoatMap = e[t.clearcoatMap] || null), t.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = e[t.clearcoatRoughnessMap] || null), t.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = e[t.clearcoatNormalMap] || null), t.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new ut().fromArray(t.clearcoatNormalScale)), t.iridescenceMap !== void 0 && (this.iridescenceMap = e[t.iridescenceMap] || null), t.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = e[t.iridescenceThicknessMap] || null), t.transmissionMap !== void 0 && (this.transmissionMap = e[t.transmissionMap] || null), t.thicknessMap !== void 0 && (this.thicknessMap = e[t.thicknessMap] || null), t.anisotropyMap !== void 0 && (this.anisotropyMap = e[t.anisotropyMap] || null), t.sheenColorMap !== void 0 && (this.sheenColorMap = e[t.sheenColorMap] || null), t.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = e[t.sheenRoughnessMap] || null), this;
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
  copy(t) {
    this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
    const e = t.clippingPlanes;
    let n = null;
    if (e !== null) {
      const r = e.length;
      n = new Array(r);
      for (let s = 0; s !== r; ++s)
        n[s] = e[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.allowOverride = t.allowOverride, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
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
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
}
const nn = /* @__PURE__ */ new N(), Mr = /* @__PURE__ */ new N(), Ci = /* @__PURE__ */ new N(), dn = /* @__PURE__ */ new N(), Sr = /* @__PURE__ */ new N(), wi = /* @__PURE__ */ new N(), yr = /* @__PURE__ */ new N();
class Ea {
  /**
   * Constructs a new ray.
   *
   * @param {Vector3} [origin=(0,0,0)] - The origin of the ray.
   * @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
   */
  constructor(t = new N(), e = new N(0, 0, -1)) {
    this.origin = t, this.direction = e;
  }
  /**
   * Sets the ray's components by copying the given values.
   *
   * @param {Vector3} origin - The origin.
   * @param {Vector3} direction - The direction.
   * @return {Ray} A reference to this ray.
   */
  set(t, e) {
    return this.origin.copy(t), this.direction.copy(e), this;
  }
  /**
   * Copies the values of the given ray to this instance.
   *
   * @param {Ray} ray - The ray to copy.
   * @return {Ray} A reference to this ray.
   */
  copy(t) {
    return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
  }
  /**
   * Returns a vector that is located at a given distance along this ray.
   *
   * @param {number} t - The distance along the ray to retrieve a position for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A position on the ray.
   */
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t);
  }
  /**
   * Adjusts the direction of the ray to point at the given vector in world space.
   *
   * @param {Vector3} v - The target position.
   * @return {Ray} A reference to this ray.
   */
  lookAt(t) {
    return this.direction.copy(t).sub(this.origin).normalize(), this;
  }
  /**
   * Shift the origin of this ray along its direction by the given distance.
   *
   * @param {number} t - The distance along the ray to interpolate.
   * @return {Ray} A reference to this ray.
   */
  recast(t) {
    return this.origin.copy(this.at(t, nn)), this;
  }
  /**
   * Returns the point along this ray that is closest to the given point.
   *
   * @param {Vector3} point - A point in 3D space to get the closet location on the ray for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on this ray.
   */
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const n = e.dot(this.direction);
    return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n);
  }
  /**
   * Returns the distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The distance.
   */
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  /**
   * Returns the squared distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The squared distance.
   */
  distanceSqToPoint(t) {
    const e = nn.subVectors(t, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(t) : (nn.copy(this.origin).addScaledVector(this.direction, e), nn.distanceToSquared(t));
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
  distanceSqToSegment(t, e, n, r) {
    Mr.copy(t).add(e).multiplyScalar(0.5), Ci.copy(e).sub(t).normalize(), dn.copy(this.origin).sub(Mr);
    const s = t.distanceTo(e) * 0.5, a = -this.direction.dot(Ci), o = dn.dot(this.direction), l = -dn.dot(Ci), c = dn.lengthSq(), h = Math.abs(1 - a * a);
    let f, u, p, _;
    if (h > 0)
      if (f = a * l - o, u = a * o - l, _ = s * h, f >= 0)
        if (u >= -_)
          if (u <= _) {
            const y = 1 / h;
            f *= y, u *= y, p = f * (f + a * u + 2 * o) + u * (a * f + u + 2 * l) + c;
          } else
            u = s, f = Math.max(0, -(a * u + o)), p = -f * f + u * (u + 2 * l) + c;
        else
          u = -s, f = Math.max(0, -(a * u + o)), p = -f * f + u * (u + 2 * l) + c;
      else
        u <= -_ ? (f = Math.max(0, -(-a * s + o)), u = f > 0 ? -s : Math.min(Math.max(-s, -l), s), p = -f * f + u * (u + 2 * l) + c) : u <= _ ? (f = 0, u = Math.min(Math.max(-s, -l), s), p = u * (u + 2 * l) + c) : (f = Math.max(0, -(a * s + o)), u = f > 0 ? s : Math.min(Math.max(-s, -l), s), p = -f * f + u * (u + 2 * l) + c);
    else
      u = a > 0 ? -s : s, f = Math.max(0, -(a * u + o)), p = -f * f + u * (u + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, f), r && r.copy(Mr).addScaledVector(Ci, u), p;
  }
  /**
   * Intersects this ray with the given sphere, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectSphere(t, e) {
    nn.subVectors(t.center, this.origin);
    const n = nn.dot(this.direction), r = nn.dot(nn) - n * n, s = t.radius * t.radius;
    if (r > s) return null;
    const a = Math.sqrt(s - r), o = n - a, l = n + a;
    return l < 0 ? null : o < 0 ? this.at(l, e) : this.at(o, e);
  }
  /**
   * Returns `true` if this ray intersects with the given sphere.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @return {boolean} Whether this ray intersects with the given sphere or not.
   */
  intersectsSphere(t) {
    return t.radius < 0 ? !1 : this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  /**
   * Computes the distance from the ray's origin to the given plane. Returns `null` if the ray
   * does not intersect with the plane.
   *
   * @param {Plane} plane - The plane to compute the distance to.
   * @return {?number} Whether this ray intersects with the given sphere or not.
   */
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0)
      return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(t.normal) + t.constant) / e;
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
  intersectPlane(t, e) {
    const n = this.distanceToPlane(t);
    return n === null ? null : this.at(n, e);
  }
  /**
   * Returns `true` if this ray intersects with the given plane.
   *
   * @param {Plane} plane - The plane to intersect.
   * @return {boolean} Whether this ray intersects with the given plane or not.
   */
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    return e === 0 || t.normal.dot(this.direction) * e < 0;
  }
  /**
   * Intersects this ray with the given bounding box, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Box3} box - The box to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectBox(t, e) {
    let n, r, s, a, o, l;
    const c = 1 / this.direction.x, h = 1 / this.direction.y, f = 1 / this.direction.z, u = this.origin;
    return c >= 0 ? (n = (t.min.x - u.x) * c, r = (t.max.x - u.x) * c) : (n = (t.max.x - u.x) * c, r = (t.min.x - u.x) * c), h >= 0 ? (s = (t.min.y - u.y) * h, a = (t.max.y - u.y) * h) : (s = (t.max.y - u.y) * h, a = (t.min.y - u.y) * h), n > a || s > r || ((s > n || isNaN(n)) && (n = s), (a < r || isNaN(r)) && (r = a), f >= 0 ? (o = (t.min.z - u.z) * f, l = (t.max.z - u.z) * f) : (o = (t.max.z - u.z) * f, l = (t.min.z - u.z) * f), n > l || o > r) || ((o > n || n !== n) && (n = o), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, e);
  }
  /**
   * Returns `true` if this ray intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this ray intersects with the given box or not.
   */
  intersectsBox(t) {
    return this.intersectBox(t, nn) !== null;
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
  intersectTriangle(t, e, n, r, s) {
    Sr.subVectors(e, t), wi.subVectors(n, t), yr.crossVectors(Sr, wi);
    let a = this.direction.dot(yr), o;
    if (a > 0) {
      if (r) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    dn.subVectors(this.origin, t);
    const l = o * this.direction.dot(wi.crossVectors(dn, wi));
    if (l < 0)
      return null;
    const c = o * this.direction.dot(Sr.cross(dn));
    if (c < 0 || l + c > a)
      return null;
    const h = -o * dn.dot(yr);
    return h < 0 ? null : this.at(h / a, s);
  }
  /**
   * Transforms this ray with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix4 - The transformation matrix.
   * @return {Ray} A reference to this ray.
   */
  applyMatrix4(t) {
    return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
  }
  /**
   * Returns `true` if this ray is equal with the given one.
   *
   * @param {Ray} ray - The ray to test for equality.
   * @return {boolean} Whether this ray is equal with the given one.
   */
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
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
class Ta extends $n {
  /**
   * Constructs a new mesh basic material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(t) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Yt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new sn(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}
const bs = /* @__PURE__ */ new oe(), vn = /* @__PURE__ */ new Ea(), Pi = /* @__PURE__ */ new _i(), Rs = /* @__PURE__ */ new N(), Li = /* @__PURE__ */ new N(), Di = /* @__PURE__ */ new N(), Ii = /* @__PURE__ */ new N(), Er = /* @__PURE__ */ new N(), Fi = /* @__PURE__ */ new N(), Cs = /* @__PURE__ */ new N(), Ni = /* @__PURE__ */ new N();
class pe extends ye {
  /**
   * Constructs a new mesh.
   *
   * @param {BufferGeometry} [geometry] - The mesh geometry.
   * @param {Material|Array<Material>} [material] - The mesh material.
   */
  constructor(t = new ke(), e = new Ta()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = t, this.material = e, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  /**
   * Sets the values of {@link Mesh#morphTargetDictionary} and {@link Mesh#morphTargetInfluences}
   * to make sure existing morph targets can influence this 3D object.
   */
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const r = e[n[0]];
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
  getVertexPosition(t, e) {
    const n = this.geometry, r = n.attributes.position, s = n.morphAttributes.position, a = n.morphTargetsRelative;
    e.fromBufferAttribute(r, t);
    const o = this.morphTargetInfluences;
    if (s && o) {
      Fi.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const h = o[l], f = s[l];
        h !== 0 && (Er.fromBufferAttribute(f, t), a ? Fi.addScaledVector(Er, h) : Fi.addScaledVector(Er.sub(e), h));
      }
      e.add(Fi);
    }
    return e;
  }
  /**
   * Computes intersection points between a casted ray and this line.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(t, e) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Pi.copy(n.boundingSphere), Pi.applyMatrix4(s), vn.copy(t.ray).recast(t.near), !(Pi.containsPoint(vn.origin) === !1 && (vn.intersectSphere(Pi, Rs) === null || vn.origin.distanceToSquared(Rs) > (t.far - t.near) ** 2)) && (bs.copy(s).invert(), vn.copy(t.ray).applyMatrix4(bs), !(n.boundingBox !== null && vn.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(t, e, vn)));
  }
  _computeIntersections(t, e, n) {
    let r;
    const s = this.geometry, a = this.material, o = s.index, l = s.attributes.position, c = s.attributes.uv, h = s.attributes.uv1, f = s.attributes.normal, u = s.groups, p = s.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let _ = 0, y = u.length; _ < y; _++) {
          const m = u[_], d = a[m.materialIndex], b = Math.max(m.start, p.start), A = Math.min(o.count, Math.min(m.start + m.count, p.start + p.count));
          for (let M = b, R = A; M < R; M += 3) {
            const T = o.getX(M), C = o.getX(M + 1), x = o.getX(M + 2);
            r = Ui(this, d, t, n, c, h, f, T, C, x), r && (r.faceIndex = Math.floor(M / 3), r.face.materialIndex = m.materialIndex, e.push(r));
          }
        }
      else {
        const _ = Math.max(0, p.start), y = Math.min(o.count, p.start + p.count);
        for (let m = _, d = y; m < d; m += 3) {
          const b = o.getX(m), A = o.getX(m + 1), M = o.getX(m + 2);
          r = Ui(this, a, t, n, c, h, f, b, A, M), r && (r.faceIndex = Math.floor(m / 3), e.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(a))
        for (let _ = 0, y = u.length; _ < y; _++) {
          const m = u[_], d = a[m.materialIndex], b = Math.max(m.start, p.start), A = Math.min(l.count, Math.min(m.start + m.count, p.start + p.count));
          for (let M = b, R = A; M < R; M += 3) {
            const T = M, C = M + 1, x = M + 2;
            r = Ui(this, d, t, n, c, h, f, T, C, x), r && (r.faceIndex = Math.floor(M / 3), r.face.materialIndex = m.materialIndex, e.push(r));
          }
        }
      else {
        const _ = Math.max(0, p.start), y = Math.min(l.count, p.start + p.count);
        for (let m = _, d = y; m < d; m += 3) {
          const b = m, A = m + 1, M = m + 2;
          r = Ui(this, a, t, n, c, h, f, b, A, M), r && (r.faceIndex = Math.floor(m / 3), e.push(r));
        }
      }
  }
}
function To(i, t, e, n, r, s, a, o) {
  let l;
  if (t.side === 1 ? l = n.intersectTriangle(a, s, r, !0, o) : l = n.intersectTriangle(r, s, a, t.side === 0, o), l === null) return null;
  Ni.copy(o), Ni.applyMatrix4(i.matrixWorld);
  const c = e.ray.origin.distanceTo(Ni);
  return c < e.near || c > e.far ? null : {
    distance: c,
    point: Ni.clone(),
    object: i
  };
}
function Ui(i, t, e, n, r, s, a, o, l, c) {
  i.getVertexPosition(o, Li), i.getVertexPosition(l, Di), i.getVertexPosition(c, Ii);
  const h = To(i, t, e, n, Li, Di, Ii, Cs);
  if (h) {
    const f = new N();
    Ge.getBarycoord(Cs, Li, Di, Ii, f), r && (h.uv = Ge.getInterpolatedAttribute(r, o, l, c, f, new ut())), s && (h.uv1 = Ge.getInterpolatedAttribute(s, o, l, c, f, new ut())), a && (h.normal = Ge.getInterpolatedAttribute(a, o, l, c, f, new N()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const u = {
      a: o,
      b: l,
      c,
      normal: new N(),
      materialIndex: 0
    };
    Ge.getNormal(Li, Di, Ii, u.normal), h.face = u, h.barycoord = f;
  }
  return h;
}
class Aa extends Re {
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
  constructor(t = null, e = 1, n = 1, r, s, a, o, l, c = 1003, h = 1003, f, u) {
    super(null, a, o, l, c, h, r, s, f, u), this.isDataTexture = !0, this.image = { data: t, width: e, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class ws extends Ve {
  /**
   * Constructs a new instanced buffer attribute.
   *
   * @param {TypedArray} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   * @param {number} [meshPerAttribute=1] - How often a value of this buffer attribute should be repeated.
   */
  constructor(t, e, n, r = 1) {
    super(t, e, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = r;
  }
  copy(t) {
    return super.copy(t), this.meshPerAttribute = t.meshPerAttribute, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.meshPerAttribute = this.meshPerAttribute, t.isInstancedBufferAttribute = !0, t;
  }
}
const Bn = /* @__PURE__ */ new oe(), Ps = /* @__PURE__ */ new oe(), Oi = [], Ls = /* @__PURE__ */ new An(), Ao = /* @__PURE__ */ new oe(), si = /* @__PURE__ */ new pe(), ai = /* @__PURE__ */ new _i();
class bo extends pe {
  /**
   * Constructs a new instanced mesh.
   *
   * @param {BufferGeometry} [geometry] - The mesh geometry.
   * @param {Material|Array<Material>} [material] - The mesh material.
   * @param {number} count - The number of instances.
   */
  constructor(t, e, n) {
    super(t, e), this.isInstancedMesh = !0, this.instanceMatrix = new ws(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let r = 0; r < n; r++)
      this.setMatrixAt(r, Ao);
  }
  /**
   * Computes the bounding box of the instanced mesh, and updates {@link InstancedMesh#boundingBox}.
   * The bounding box is not automatically computed by the engine; this method must be called by your app.
   * You may need to recompute the bounding box if an instance is transformed via {@link InstancedMesh#setMatrixAt}.
   */
  computeBoundingBox() {
    const t = this.geometry, e = this.count;
    this.boundingBox === null && (this.boundingBox = new An()), t.boundingBox === null && t.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < e; n++)
      this.getMatrixAt(n, Bn), Ls.copy(t.boundingBox).applyMatrix4(Bn), this.boundingBox.union(Ls);
  }
  /**
   * Computes the bounding sphere of the instanced mesh, and updates {@link InstancedMesh#boundingSphere}
   * The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
   * You may need to recompute the bounding sphere if an instance is transformed via {@link InstancedMesh#setMatrixAt}.
   */
  computeBoundingSphere() {
    const t = this.geometry, e = this.count;
    this.boundingSphere === null && (this.boundingSphere = new _i()), t.boundingSphere === null && t.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < e; n++)
      this.getMatrixAt(n, Bn), ai.copy(t.boundingSphere).applyMatrix4(Bn), this.boundingSphere.union(ai);
  }
  copy(t, e) {
    return super.copy(t, e), this.instanceMatrix.copy(t.instanceMatrix), t.morphTexture !== null && (this.morphTexture = t.morphTexture.clone()), t.instanceColor !== null && (this.instanceColor = t.instanceColor.clone()), this.count = t.count, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
  }
  /**
   * Gets the color of the defined instance.
   *
   * @param {number} index - The instance index.
   * @param {Color} color - The target object that is used to store the method's result.
   * @return {Color} A reference to the target color.
   */
  getColorAt(t, e) {
    return this.instanceColor === null ? e.setRGB(1, 1, 1) : e.fromArray(this.instanceColor.array, t * 3);
  }
  /**
   * Gets the local transformation matrix of the defined instance.
   *
   * @param {number} index - The instance index.
   * @param {Matrix4} matrix - The target object that is used to store the method's result.
   * @return {Matrix4} A reference to the target matrix.
   */
  getMatrixAt(t, e) {
    return e.fromArray(this.instanceMatrix.array, t * 16);
  }
  /**
   * Gets the morph target weights of the defined instance.
   *
   * @param {number} index - The instance index.
   * @param {Mesh} object - The target object that is used to store the method's result.
   */
  getMorphAt(t, e) {
    const n = e.morphTargetInfluences, r = this.morphTexture.source.data.data, s = n.length + 1, a = t * s + 1;
    for (let o = 0; o < n.length; o++)
      n[o] = r[a + o];
  }
  raycast(t, e) {
    const n = this.matrixWorld, r = this.count;
    if (si.geometry = this.geometry, si.material = this.material, si.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), ai.copy(this.boundingSphere), ai.applyMatrix4(n), t.ray.intersectsSphere(ai) !== !1))
      for (let s = 0; s < r; s++) {
        this.getMatrixAt(s, Bn), Ps.multiplyMatrices(n, Bn), si.matrixWorld = Ps, si.raycast(t, Oi);
        for (let a = 0, o = Oi.length; a < o; a++) {
          const l = Oi[a];
          l.instanceId = s, l.object = this, e.push(l);
        }
        Oi.length = 0;
      }
  }
  /**
   * Sets the given color to the defined instance. Make sure you set the `needsUpdate` flag of
   * {@link InstancedMesh#instanceColor} to `true` after updating all the colors.
   *
   * @param {number} index - The instance index.
   * @param {Color} color - The instance color.
   * @return {InstancedMesh} A reference to this instanced mesh.
   */
  setColorAt(t, e) {
    return this.instanceColor === null && (this.instanceColor = new ws(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), e.toArray(this.instanceColor.array, t * 3), this;
  }
  /**
   * Sets the given local transformation matrix to the defined instance. Make sure you set the `needsUpdate` flag of
   * {@link InstancedMesh#instanceMatrix} to `true` after updating all the matrices.
   *
   * @param {number} index - The instance index.
   * @param {Matrix4} matrix - The local transformation.
   * @return {InstancedMesh} A reference to this instanced mesh.
   */
  setMatrixAt(t, e) {
    return e.toArray(this.instanceMatrix.array, t * 16), this;
  }
  /**
   * Sets the morph target weights to the defined instance. Make sure you set the `needsUpdate` flag of
   * {@link InstancedMesh#morphTexture} to `true` after updating all the influences.
   *
   * @param {number} index - The instance index.
   * @param {Mesh} object -  A mesh which `morphTargetInfluences` property containing the morph target weights
   * of a single instance.
   * @return {InstancedMesh} A reference to this instanced mesh.
   */
  setMorphAt(t, e) {
    const n = e.morphTargetInfluences, r = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new Aa(new Float32Array(r * this.count), r, this.count, 1028, 1015));
    const s = this.morphTexture.source.data.data;
    let a = 0;
    for (let c = 0; c < n.length; c++)
      a += n[c];
    const o = this.geometry.morphTargetsRelative ? 1 : 1 - a, l = r * t;
    return s[l] = o, s.set(n, l + 1), this;
  }
  updateMorphTargets() {
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
  }
}
const Tr = /* @__PURE__ */ new N(), Ro = /* @__PURE__ */ new N(), Co = /* @__PURE__ */ new Vt();
class Sn {
  /**
   * Constructs a new plane.
   *
   * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
   * @param {number} [constant=0] - The signed distance from the origin to the plane.
   */
  constructor(t = new N(1, 0, 0), e = 0) {
    this.isPlane = !0, this.normal = t, this.constant = e;
  }
  /**
   * Sets the plane components by copying the given values.
   *
   * @param {Vector3} normal - The normal.
   * @param {number} constant - The constant.
   * @return {Plane} A reference to this plane.
   */
  set(t, e) {
    return this.normal.copy(t), this.constant = e, this;
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
  setComponents(t, e, n, r) {
    return this.normal.set(t, e, n), this.constant = r, this;
  }
  /**
   * Sets the plane from the given normal and coplanar point (that is a point
   * that lies onto the plane).
   *
   * @param {Vector3} normal - The normal.
   * @param {Vector3} point - A coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromNormalAndCoplanarPoint(t, e) {
    return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
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
  setFromCoplanarPoints(t, e, n) {
    const r = Tr.subVectors(n, e).cross(Ro.subVectors(t, e)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, t), this;
  }
  /**
   * Copies the values of the given plane to this instance.
   *
   * @param {Plane} plane - The plane to copy.
   * @return {Plane} A reference to this plane.
   */
  copy(t) {
    return this.normal.copy(t.normal), this.constant = t.constant, this;
  }
  /**
   * Normalizes the plane normal and adjusts the constant accordingly.
   *
   * @return {Plane} A reference to this plane.
   */
  normalize() {
    const t = 1 / this.normal.length();
    return this.normal.multiplyScalar(t), this.constant *= t, this;
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
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  /**
   * Returns the signed distance from the given sphere to this plane.
   *
   * @param {Sphere} sphere - The sphere to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  /**
   * Projects a the given point onto the plane.
   *
   * @param {Vector3} point - The point to project.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The projected point on the plane.
   */
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
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
  intersectLine(t, e, n = !0) {
    const r = t.delta(Tr), s = this.normal.dot(r);
    if (s === 0)
      return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
    const a = -(t.start.dot(this.normal) + this.constant) / s;
    return n === !0 && (a < 0 || a > 1) ? null : e.copy(t.start).addScaledVector(r, a);
  }
  /**
   * Returns `true` if the given line segment intersects with (passes through) the plane.
   *
   * @param {Line3} line - The line to test.
   * @return {boolean} Whether the given line segment intersects with the plane or not.
   */
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
    return e < 0 && n > 0 || n < 0 && e > 0;
  }
  /**
   * Returns `true` if the given bounding box intersects with the plane.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with the plane or not.
   */
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  /**
   * Returns `true` if the given bounding sphere intersects with the plane.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
   */
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  /**
   * Returns a coplanar vector to the plane, by calculating the
   * projection of the normal at the origin onto the plane.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The coplanar point.
   */
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
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
  applyMatrix4(t, e) {
    const n = e || Co.getNormalMatrix(t), r = this.coplanarPoint(Tr).applyMatrix4(t), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(s), this;
  }
  /**
   * Translates the plane by the distance defined by the given offset vector.
   * Note that this only affects the plane constant and will not affect the normal vector.
   *
   * @param {Vector3} offset - The offset vector.
   * @return {Plane} A reference to this plane.
   */
  translate(t) {
    return this.constant -= t.dot(this.normal), this;
  }
  /**
   * Returns `true` if this plane is equal with the given one.
   *
   * @param {Plane} plane - The plane to test for equality.
   * @return {boolean} Whether this plane is equal with the given one.
   */
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
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
const Mn = /* @__PURE__ */ new _i(), wo = /* @__PURE__ */ new ut(0.5, 0.5), Bi = /* @__PURE__ */ new N();
class Xr {
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
  constructor(t = new Sn(), e = new Sn(), n = new Sn(), r = new Sn(), s = new Sn(), a = new Sn()) {
    this.planes = [t, e, n, r, s, a];
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
  set(t, e, n, r, s, a) {
    const o = this.planes;
    return o[0].copy(t), o[1].copy(e), o[2].copy(n), o[3].copy(r), o[4].copy(s), o[5].copy(a), this;
  }
  /**
   * Copies the values of the given frustum to this instance.
   *
   * @param {Frustum} frustum - The frustum to copy.
   * @return {Frustum} A reference to this frustum.
   */
  copy(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++)
      e[n].copy(t.planes[n]);
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
  setFromProjectionMatrix(t, e = 2e3, n = !1) {
    const r = this.planes, s = t.elements, a = s[0], o = s[1], l = s[2], c = s[3], h = s[4], f = s[5], u = s[6], p = s[7], _ = s[8], y = s[9], m = s[10], d = s[11], b = s[12], A = s[13], M = s[14], R = s[15];
    if (r[0].setComponents(c - a, p - h, d - _, R - b).normalize(), r[1].setComponents(c + a, p + h, d + _, R + b).normalize(), r[2].setComponents(c + o, p + f, d + y, R + A).normalize(), r[3].setComponents(c - o, p - f, d - y, R - A).normalize(), n)
      r[4].setComponents(l, u, m, M).normalize(), r[5].setComponents(c - l, p - u, d - m, R - M).normalize();
    else if (r[4].setComponents(c - l, p - u, d - m, R - M).normalize(), e === 2e3)
      r[5].setComponents(c + l, p + u, d + m, R + M).normalize();
    else if (e === 2001)
      r[5].setComponents(l, u, m, M).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
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
  intersectsObject(t) {
    if (t.boundingSphere !== void 0)
      t.boundingSphere === null && t.computeBoundingSphere(), Mn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), Mn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(Mn);
  }
  /**
   * Returns `true` if the given sprite is intersecting this frustum.
   *
   * @param {Sprite} sprite - The sprite to test.
   * @return {boolean} Whether the sprite is intersecting this frustum or not.
   */
  intersectsSprite(t) {
    Mn.center.set(0, 0, 0);
    const e = wo.distanceTo(t.center);
    return Mn.radius = 0.7071067811865476 + e, Mn.applyMatrix4(t.matrixWorld), this.intersectsSphere(Mn);
  }
  /**
   * Returns `true` if the given bounding sphere is intersecting this frustum.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the bounding sphere is intersecting this frustum or not.
   */
  intersectsSphere(t) {
    const e = this.planes, n = t.center, r = -t.radius;
    for (let s = 0; s < 6; s++)
      if (e[s].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  /**
   * Returns `true` if the given bounding box is intersecting this frustum.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box is intersecting this frustum or not.
   */
  intersectsBox(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = e[n];
      if (Bi.x = r.normal.x > 0 ? t.max.x : t.min.x, Bi.y = r.normal.y > 0 ? t.max.y : t.min.y, Bi.z = r.normal.z > 0 ? t.max.z : t.min.z, r.distanceToPoint(Bi) < 0)
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
  containsPoint(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++)
      if (e[n].distanceToPoint(t) < 0)
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
class ba extends Re {
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
  constructor(t = [], e = 301, n, r, s, a, o, l, c, h) {
    super(t, e, n, r, s, a, o, l, c, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  /**
   * Alias for {@link CubeTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class qn extends Re {
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
  constructor(t, e, n = 1014, r, s, a, o = 1003, l = 1003, c, h = 1026, f = 1) {
    if (h !== 1026 && h !== 1027)
      throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    const u = { width: t, height: e, depth: f };
    super(u, r, s, a, o, l, h, n, c), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.source = new kr(Object.assign({}, t.image)), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
class Po extends qn {
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
  constructor(t, e = 1014, n = 301, r, s, a = 1003, o = 1003, l, c = 1026) {
    const h = { width: t, height: t, depth: 1 }, f = [h, h, h, h, h, h];
    super(t, t, e, n, r, s, a, o, l, c), this.image = f, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  /**
   * Alias for {@link CubeDepthTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class Ra extends Re {
  /**
   * Creates a new raw texture.
   *
   * @param {?(WebGLTexture|GPUTexture)} [sourceTexture=null] - The external texture.
   */
  constructor(t = null) {
    super(), this.sourceTexture = t, this.isExternalTexture = !0;
  }
  copy(t) {
    return super.copy(t), this.sourceTexture = t.sourceTexture, this;
  }
}
class Qn extends ke {
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
  constructor(t = 1, e = 1, n = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: e,
      depth: n,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const l = [], c = [], h = [], f = [];
    let u = 0, p = 0;
    _("z", "y", "x", -1, -1, n, e, t, a, s, 0), _("z", "y", "x", 1, -1, n, e, -t, a, s, 1), _("x", "z", "y", 1, 1, t, n, e, r, a, 2), _("x", "z", "y", 1, -1, t, n, -e, r, a, 3), _("x", "y", "z", 1, -1, t, e, n, r, s, 4), _("x", "y", "z", -1, -1, t, e, -n, r, s, 5), this.setIndex(l), this.setAttribute("position", new we(c, 3)), this.setAttribute("normal", new we(h, 3)), this.setAttribute("uv", new we(f, 2));
    function _(y, m, d, b, A, M, R, T, C, x, E) {
      const P = M / C, w = R / x, B = M / 2, q = R / 2, $ = T / 2, D = C + 1, k = x + 1;
      let U = 0, Y = 0;
      const tt = new N();
      for (let st = 0; st < k; st++) {
        const ot = st * w - q;
        for (let St = 0; St < D; St++) {
          const Xt = St * P - B;
          tt[y] = Xt * b, tt[m] = ot * A, tt[d] = $, c.push(tt.x, tt.y, tt.z), tt[y] = 0, tt[m] = 0, tt[d] = T > 0 ? 1 : -1, h.push(tt.x, tt.y, tt.z), f.push(St / C), f.push(1 - st / x), U += 1;
        }
      }
      for (let st = 0; st < x; st++)
        for (let ot = 0; ot < C; ot++) {
          const St = u + ot + D * st, Xt = u + ot + D * (st + 1), re = u + (ot + 1) + D * (st + 1), Qt = u + (ot + 1) + D * st;
          l.push(St, Xt, Qt), l.push(Xt, re, Qt), Y += 6;
        }
      o.addGroup(p, Y, E), p += Y, u += U;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {BoxGeometry} A new instance.
   */
  static fromJSON(t) {
    return new Qn(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
class qr extends ke {
  /**
   * Constructs a new capsule geometry.
   *
   * @param {number} [radius=1] - Radius of the capsule.
   * @param {number} [height=1] - Height of the middle section.
   * @param {number} [capSegments=4] - Number of curve segments used to build each cap.
   * @param {number} [radialSegments=8] - Number of segmented faces around the circumference of the capsule. Must be an integer >= 3.
   * @param {number} [heightSegments=1] - Number of rows of faces along the height of the middle section. Must be an integer >= 1.
   */
  constructor(t = 1, e = 1, n = 4, r = 8, s = 1) {
    super(), this.type = "CapsuleGeometry", this.parameters = {
      radius: t,
      height: e,
      capSegments: n,
      radialSegments: r,
      heightSegments: s
    }, e = Math.max(0, e), n = Math.max(1, Math.floor(n)), r = Math.max(3, Math.floor(r)), s = Math.max(1, Math.floor(s));
    const a = [], o = [], l = [], c = [], h = e / 2, f = Math.PI / 2 * t, u = e, p = 2 * f + u, _ = n * 2 + s, y = r + 1, m = new N(), d = new N();
    for (let b = 0; b <= _; b++) {
      let A = 0, M = 0, R = 0, T = 0;
      if (b <= n) {
        const E = b / n, P = E * Math.PI / 2;
        M = -h - t * Math.cos(P), R = t * Math.sin(P), T = -t * Math.cos(P), A = E * f;
      } else if (b <= n + s) {
        const E = (b - n) / s;
        M = -h + E * e, R = t, T = 0, A = f + E * u;
      } else {
        const E = (b - n - s) / n, P = E * Math.PI / 2;
        M = h + t * Math.sin(P), R = t * Math.cos(P), T = t * Math.sin(P), A = f + u + E * f;
      }
      const C = Math.max(0, Math.min(1, A / p));
      let x = 0;
      b === 0 ? x = 0.5 / r : b === _ && (x = -0.5 / r);
      for (let E = 0; E <= r; E++) {
        const P = E / r, w = P * Math.PI * 2, B = Math.sin(w), q = Math.cos(w);
        d.x = -R * q, d.y = M, d.z = R * B, o.push(d.x, d.y, d.z), m.set(
          -R * q,
          T,
          R * B
        ), m.normalize(), l.push(m.x, m.y, m.z), c.push(P + x, C);
      }
      if (b > 0) {
        const E = (b - 1) * y;
        for (let P = 0; P < r; P++) {
          const w = E + P, B = E + P + 1, q = b * y + P, $ = b * y + P + 1;
          a.push(w, B, q), a.push(B, $, q);
        }
      }
    }
    this.setIndex(a), this.setAttribute("position", new we(o, 3)), this.setAttribute("normal", new we(l, 3)), this.setAttribute("uv", new we(c, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {CapsuleGeometry} A new instance.
   */
  static fromJSON(t) {
    return new qr(t.radius, t.height, t.capSegments, t.radialSegments, t.heightSegments);
  }
}
class $e {
  /**
   * Constructs a new curve.
   */
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = !1, this.cacheArcLengths = null;
  }
  /**
   * This method returns a vector in 2D or 3D space (depending on the curve definition)
   * for the given interpolation factor.
   *
   * @abstract
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {(Vector2|Vector3)} [optionalTarget] - The optional target vector the result is written to.
   * @return {(Vector2|Vector3)} The position on the curve. It can be a 2D or 3D vector depending on the curve definition.
   */
  getPoint() {
    Ut("Curve: .getPoint() not implemented.");
  }
  /**
   * This method returns a vector in 2D or 3D space (depending on the curve definition)
   * for the given interpolation factor. Unlike {@link Curve#getPoint}, this method honors the length
   * of the curve which equidistant samples.
   *
   * @param {number} u - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {(Vector2|Vector3)} [optionalTarget] - The optional target vector the result is written to.
   * @return {(Vector2|Vector3)} The position on the curve. It can be a 2D or 3D vector depending on the curve definition.
   */
  getPointAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getPoint(n, e);
  }
  /**
   * This method samples the curve via {@link Curve#getPoint} and returns an array of points representing
   * the curve shape.
   *
   * @param {number} [divisions=5] - The number of divisions.
   * @return {Array<(Vector2|Vector3)>} An array holding the sampled curve values. The number of points is `divisions + 1`.
   */
  getPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPoint(n / t));
    return e;
  }
  // Get sequence of points using getPointAt( u )
  /**
   * This method samples the curve via {@link Curve#getPointAt} and returns an array of points representing
   * the curve shape. Unlike {@link Curve#getPoints}, this method returns equi-spaced points across the entire
   * curve.
   *
   * @param {number} [divisions=5] - The number of divisions.
   * @return {Array<(Vector2|Vector3)>} An array holding the sampled curve values. The number of points is `divisions + 1`.
   */
  getSpacedPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPointAt(n / t));
    return e;
  }
  /**
   * Returns the total arc length of the curve.
   *
   * @return {number} The length of the curve.
   */
  getLength() {
    const t = this.getLengths();
    return t[t.length - 1];
  }
  /**
   * Returns an array of cumulative segment lengths of the curve.
   *
   * @param {number} [divisions=this.arcLengthDivisions] - The number of divisions.
   * @return {Array<number>} An array holding the cumulative segment lengths.
   */
  getLengths(t = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const e = [];
    let n, r = this.getPoint(0), s = 0;
    e.push(0);
    for (let a = 1; a <= t; a++)
      n = this.getPoint(a / t), s += n.distanceTo(r), e.push(s), r = n;
    return this.cacheArcLengths = e, e;
  }
  /**
   * Update the cumulative segment distance cache. The method must be called
   * every time curve parameters are changed. If an updated curve is part of a
   * composed curve like {@link CurvePath}, this method must be called on the
   * composed curve, too.
   */
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  /**
   * Given an interpolation factor in the range `[0,1]`, this method returns an updated
   * interpolation factor in the same range that can be ued to sample equidistant points
   * from a curve.
   *
   * @param {number} u - The interpolation factor.
   * @param {?number} distance - An optional distance on the curve.
   * @return {number} The updated interpolation factor.
   */
  getUtoTmapping(t, e = null) {
    const n = this.getLengths();
    let r = 0;
    const s = n.length;
    let a;
    e ? a = e : a = t * n[s - 1];
    let o = 0, l = s - 1, c;
    for (; o <= l; )
      if (r = Math.floor(o + (l - o) / 2), c = n[r] - a, c < 0)
        o = r + 1;
      else if (c > 0)
        l = r - 1;
      else {
        l = r;
        break;
      }
    if (r = l, n[r] === a)
      return r / (s - 1);
    const h = n[r], u = n[r + 1] - h, p = (a - h) / u;
    return (r + p) / (s - 1);
  }
  /**
   * Returns a unit vector tangent for the given interpolation factor.
   * If the derived curve does not implement its tangent derivation,
   * two points a small delta apart will be used to find its gradient
   * which seems to give a reasonable approximation.
   *
   * @param {number} t - The interpolation factor.
   * @param {(Vector2|Vector3)} [optionalTarget] - The optional target vector the result is written to.
   * @return {(Vector2|Vector3)} The tangent vector.
   */
  getTangent(t, e) {
    let r = t - 1e-4, s = t + 1e-4;
    r < 0 && (r = 0), s > 1 && (s = 1);
    const a = this.getPoint(r), o = this.getPoint(s), l = e || (a.isVector2 ? new ut() : new N());
    return l.copy(o).sub(a).normalize(), l;
  }
  /**
   * Same as {@link Curve#getTangent} but with equidistant samples.
   *
   * @param {number} u - The interpolation factor.
   * @param {(Vector2|Vector3)} [optionalTarget] - The optional target vector the result is written to.
   * @return {(Vector2|Vector3)} The tangent vector.
   * @see {@link Curve#getPointAt}
   */
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  /**
   * Generates the Frenet Frames. Requires a curve definition in 3D space. Used
   * in geometries like {@link TubeGeometry} or {@link ExtrudeGeometry}.
   *
   * @param {number} segments - The number of segments.
   * @param {boolean} [closed=false] - Whether the curve is closed or not.
   * @return {{tangents: Array<Vector3>, normals: Array<Vector3>, binormals: Array<Vector3>}} The Frenet Frames.
   */
  computeFrenetFrames(t, e = !1) {
    const n = new N(), r = [], s = [], a = [], o = new N(), l = new oe();
    for (let p = 0; p <= t; p++) {
      const _ = p / t;
      r[p] = this.getTangentAt(_, new N());
    }
    s[0] = new N(), a[0] = new N();
    let c = Number.MAX_VALUE;
    const h = Math.abs(r[0].x), f = Math.abs(r[0].y), u = Math.abs(r[0].z);
    h <= c && (c = h, n.set(1, 0, 0)), f <= c && (c = f, n.set(0, 1, 0)), u <= c && n.set(0, 0, 1), o.crossVectors(r[0], n).normalize(), s[0].crossVectors(r[0], o), a[0].crossVectors(r[0], s[0]);
    for (let p = 1; p <= t; p++) {
      if (s[p] = s[p - 1].clone(), a[p] = a[p - 1].clone(), o.crossVectors(r[p - 1], r[p]), o.length() > Number.EPSILON) {
        o.normalize();
        const _ = Math.acos(Zt(r[p - 1].dot(r[p]), -1, 1));
        s[p].applyMatrix4(l.makeRotationAxis(o, _));
      }
      a[p].crossVectors(r[p], s[p]);
    }
    if (e === !0) {
      let p = Math.acos(Zt(s[0].dot(s[t]), -1, 1));
      p /= t, r[0].dot(o.crossVectors(s[0], s[t])) > 0 && (p = -p);
      for (let _ = 1; _ <= t; _++)
        s[_].applyMatrix4(l.makeRotationAxis(r[_], p * _)), a[_].crossVectors(r[_], s[_]);
    }
    return {
      tangents: r,
      normals: s,
      binormals: a
    };
  }
  /**
   * Returns a new curve with copied values from this instance.
   *
   * @return {Curve} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given curve to this instance.
   *
   * @param {Curve} source - The curve to copy.
   * @return {Curve} A reference to this curve.
   */
  copy(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
  /**
   * Serializes the curve into JSON.
   *
   * @return {Object} A JSON object representing the serialized curve.
   * @see {@link ObjectLoader#parse}
   */
  toJSON() {
    const t = {
      metadata: {
        version: 4.7,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t;
  }
  /**
   * Deserializes the curve from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized curve.
   * @return {Curve} A reference to this curve.
   */
  fromJSON(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
}
class Yr extends $e {
  /**
   * Constructs a new ellipse curve.
   *
   * @param {number} [aX=0] - The X center of the ellipse.
   * @param {number} [aY=0] - The Y center of the ellipse.
   * @param {number} [xRadius=1] - The radius of the ellipse in the x direction.
   * @param {number} [yRadius=1] - The radius of the ellipse in the y direction.
   * @param {number} [aStartAngle=0] - The start angle of the curve in radians starting from the positive X axis.
   * @param {number} [aEndAngle=Math.PI*2] - The end angle of the curve in radians starting from the positive X axis.
   * @param {boolean} [aClockwise=false] - Whether the ellipse is drawn clockwise or not.
   * @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis.
   */
  constructor(t = 0, e = 0, n = 1, r = 1, s = 0, a = Math.PI * 2, o = !1, l = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = r, this.aStartAngle = s, this.aEndAngle = a, this.aClockwise = o, this.aRotation = l;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector2} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector2} The position on the curve.
   */
  getPoint(t, e = new ut()) {
    const n = e, r = Math.PI * 2;
    let s = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(s) < Number.EPSILON;
    for (; s < 0; ) s += r;
    for (; s > r; ) s -= r;
    s < Number.EPSILON && (a ? s = 0 : s = r), this.aClockwise === !0 && !a && (s === r ? s = -r : s = s - r);
    const o = this.aStartAngle + t * s;
    let l = this.aX + this.xRadius * Math.cos(o), c = this.aY + this.yRadius * Math.sin(o);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation), f = Math.sin(this.aRotation), u = l - this.aX, p = c - this.aY;
      l = u * h - p * f + this.aX, c = u * f + p * h + this.aY;
    }
    return n.set(l, c);
  }
  copy(t) {
    return super.copy(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
}
class Lo extends Yr {
  /**
   * Constructs a new arc curve.
   *
   * @param {number} [aX=0] - The X center of the ellipse.
   * @param {number} [aY=0] - The Y center of the ellipse.
   * @param {number} [aRadius=1] - The radius of the ellipse in the x direction.
   * @param {number} [aStartAngle=0] - The start angle of the curve in radians starting from the positive X axis.
   * @param {number} [aEndAngle=Math.PI*2] - The end angle of the curve in radians starting from the positive X axis.
   * @param {boolean} [aClockwise=false] - Whether the ellipse is drawn clockwise or not.
   */
  constructor(t, e, n, r, s, a) {
    super(t, e, n, n, r, s, a), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Zr() {
  let i = 0, t = 0, e = 0, n = 0;
  function r(s, a, o, l) {
    i = s, t = o, e = -3 * s + 3 * a - 2 * o - l, n = 2 * s - 2 * a + o + l;
  }
  return {
    initCatmullRom: function(s, a, o, l, c) {
      r(a, o, c * (o - s), c * (l - a));
    },
    initNonuniformCatmullRom: function(s, a, o, l, c, h, f) {
      let u = (a - s) / c - (o - s) / (c + h) + (o - a) / h, p = (o - a) / h - (l - a) / (h + f) + (l - o) / f;
      u *= h, p *= h, r(a, o, u, p);
    },
    calc: function(s) {
      const a = s * s, o = a * s;
      return i + t * s + e * a + n * o;
    }
  };
}
const Ds = /* @__PURE__ */ new N(), Is = /* @__PURE__ */ new N(), Ar = /* @__PURE__ */ new Zr(), br = /* @__PURE__ */ new Zr(), Rr = /* @__PURE__ */ new Zr();
class Do extends $e {
  /**
   * Constructs a new Catmull-Rom curve.
   *
   * @param {Array<Vector3>} [points] - An array of 3D points defining the curve.
   * @param {boolean} [closed=false] - Whether the curve is closed or not.
   * @param {('centripetal'|'chordal'|'catmullrom')} [curveType='centripetal'] - The curve type.
   * @param {number} [tension=0.5] - Tension of the curve.
   */
  constructor(t = [], e = !1, n = "centripetal", r = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = n, this.tension = r;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector3} The position on the curve.
   */
  getPoint(t, e = new N()) {
    const n = e, r = this.points, s = r.length, a = (s - (this.closed ? 0 : 1)) * t;
    let o = Math.floor(a), l = a - o;
    this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / s) + 1) * s : l === 0 && o === s - 1 && (o = s - 2, l = 1);
    let c, h;
    this.closed || o > 0 ? c = r[(o - 1) % s] : (Is.subVectors(r[0], r[1]).add(r[0]), c = Is);
    const f = r[o % s], u = r[(o + 1) % s];
    if (this.closed || o + 2 < s ? h = r[(o + 2) % s] : (Ds.subVectors(r[s - 1], r[s - 2]).add(r[s - 1]), h = Ds), this.curveType === "centripetal" || this.curveType === "chordal") {
      const p = this.curveType === "chordal" ? 0.5 : 0.25;
      let _ = Math.pow(c.distanceToSquared(f), p), y = Math.pow(f.distanceToSquared(u), p), m = Math.pow(u.distanceToSquared(h), p);
      y < 1e-4 && (y = 1), _ < 1e-4 && (_ = y), m < 1e-4 && (m = y), Ar.initNonuniformCatmullRom(c.x, f.x, u.x, h.x, _, y, m), br.initNonuniformCatmullRom(c.y, f.y, u.y, h.y, _, y, m), Rr.initNonuniformCatmullRom(c.z, f.z, u.z, h.z, _, y, m);
    } else this.curveType === "catmullrom" && (Ar.initCatmullRom(c.x, f.x, u.x, h.x, this.tension), br.initCatmullRom(c.y, f.y, u.y, h.y, this.tension), Rr.initCatmullRom(c.z, f.z, u.z, h.z, this.tension));
    return n.set(
      Ar.calc(l),
      br.calc(l),
      Rr.calc(l)
    ), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(r.clone());
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const r = this.points[e];
      t.points.push(r.toArray());
    }
    return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(new N().fromArray(r));
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
}
function Fs(i, t, e, n, r) {
  const s = (n - t) * 0.5, a = (r - e) * 0.5, o = i * i, l = i * o;
  return (2 * e - 2 * n + s + a) * l + (-3 * e + 3 * n - 2 * s - a) * o + s * i + e;
}
function Io(i, t) {
  const e = 1 - i;
  return e * e * t;
}
function Fo(i, t) {
  return 2 * (1 - i) * i * t;
}
function No(i, t) {
  return i * i * t;
}
function fi(i, t, e, n) {
  return Io(i, t) + Fo(i, e) + No(i, n);
}
function Uo(i, t) {
  const e = 1 - i;
  return e * e * e * t;
}
function Oo(i, t) {
  const e = 1 - i;
  return 3 * e * e * i * t;
}
function Bo(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function zo(i, t) {
  return i * i * i * t;
}
function di(i, t, e, n, r) {
  return Uo(i, t) + Oo(i, e) + Bo(i, n) + zo(i, r);
}
class Ca extends $e {
  /**
   * Constructs a new Cubic Bezier curve.
   *
   * @param {Vector2} [v0] - The start point.
   * @param {Vector2} [v1] - The first control point.
   * @param {Vector2} [v2] - The second control point.
   * @param {Vector2} [v3] - The end point.
   */
  constructor(t = new ut(), e = new ut(), n = new ut(), r = new ut()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = r;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector2} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector2} The position on the curve.
   */
  getPoint(t, e = new ut()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2, o = this.v3;
    return n.set(
      di(t, r.x, s.x, a.x, o.x),
      di(t, r.y, s.y, a.y, o.y)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class Go extends $e {
  /**
   * Constructs a new Cubic Bezier curve.
   *
   * @param {Vector3} [v0] - The start point.
   * @param {Vector3} [v1] - The first control point.
   * @param {Vector3} [v2] - The second control point.
   * @param {Vector3} [v3] - The end point.
   */
  constructor(t = new N(), e = new N(), n = new N(), r = new N()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = r;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector3} The position on the curve.
   */
  getPoint(t, e = new N()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2, o = this.v3;
    return n.set(
      di(t, r.x, s.x, a.x, o.x),
      di(t, r.y, s.y, a.y, o.y),
      di(t, r.z, s.z, a.z, o.z)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class wa extends $e {
  /**
   * Constructs a new line curve.
   *
   * @param {Vector2} [v1] - The start point.
   * @param {Vector2} [v2] - The end point.
   */
  constructor(t = new ut(), e = new ut()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = t, this.v2 = e;
  }
  /**
   * Returns a point on the line.
   *
   * @param {number} t - A interpolation factor representing a position on the line. Must be in the range `[0,1]`.
   * @param {Vector2} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector2} The position on the line.
   */
  getPoint(t, e = new ut()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new ut()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class Vo extends $e {
  /**
   * Constructs a new line curve.
   *
   * @param {Vector3} [v1] - The start point.
   * @param {Vector3} [v2] - The end point.
   */
  constructor(t = new N(), e = new N()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = t, this.v2 = e;
  }
  /**
   * Returns a point on the line.
   *
   * @param {number} t - A interpolation factor representing a position on the line. Must be in the range `[0,1]`.
   * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector3} The position on the line.
   */
  getPoint(t, e = new N()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new N()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class Pa extends $e {
  /**
   * Constructs a new Quadratic Bezier curve.
   *
   * @param {Vector2} [v0] - The start point.
   * @param {Vector2} [v1] - The control point.
   * @param {Vector2} [v2] - The end point.
   */
  constructor(t = new ut(), e = new ut(), n = new ut()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector2} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector2} The position on the curve.
   */
  getPoint(t, e = new ut()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2;
    return n.set(
      fi(t, r.x, s.x, a.x),
      fi(t, r.y, s.y, a.y)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class Ho extends $e {
  /**
   * Constructs a new Quadratic Bezier curve.
   *
   * @param {Vector3} [v0] - The start point.
   * @param {Vector3} [v1] - The control point.
   * @param {Vector3} [v2] - The end point.
   */
  constructor(t = new N(), e = new N(), n = new N()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector3} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector3} The position on the curve.
   */
  getPoint(t, e = new N()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2;
    return n.set(
      fi(t, r.x, s.x, a.x),
      fi(t, r.y, s.y, a.y),
      fi(t, r.z, s.z, a.z)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class La extends $e {
  /**
   * Constructs a new 2D spline curve.
   *
   * @param {Array<Vector2>} [points] -  An array of 2D points defining the curve.
   */
  constructor(t = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = t;
  }
  /**
   * Returns a point on the curve.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {Vector2} [optionalTarget] - The optional target vector the result is written to.
   * @return {Vector2} The position on the curve.
   */
  getPoint(t, e = new ut()) {
    const n = e, r = this.points, s = (r.length - 1) * t, a = Math.floor(s), o = s - a, l = r[a === 0 ? a : a - 1], c = r[a], h = r[a > r.length - 2 ? r.length - 1 : a + 1], f = r[a > r.length - 3 ? r.length - 1 : a + 2];
    return n.set(
      Fs(o, l.x, c.x, h.x, f.x),
      Fs(o, l.y, c.y, h.y, f.y)
    ), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const r = this.points[e];
      t.points.push(r.toArray());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(new ut().fromArray(r));
    }
    return this;
  }
}
var Ur = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: Lo,
  CatmullRomCurve3: Do,
  CubicBezierCurve: Ca,
  CubicBezierCurve3: Go,
  EllipseCurve: Yr,
  LineCurve: wa,
  LineCurve3: Vo,
  QuadraticBezierCurve: Pa,
  QuadraticBezierCurve3: Ho,
  SplineCurve: La
});
class ko extends $e {
  /**
   * Constructs a new curve path.
   */
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  /**
   * Adds a curve to this curve path.
   *
   * @param {Curve} curve - The curve to add.
   */
  add(t) {
    this.curves.push(t);
  }
  /**
   * Adds a line curve to close the path.
   *
   * @return {CurvePath} A reference to this curve path.
   */
  closePath() {
    const t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
    if (!t.equals(e)) {
      const n = t.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new Ur[n](e, t));
    }
    return this;
  }
  /**
   * This method returns a vector in 2D or 3D space (depending on the curve definitions)
   * for the given interpolation factor.
   *
   * @param {number} t - A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.
   * @param {(Vector2|Vector3)} [optionalTarget] - The optional target vector the result is written to.
   * @return {?(Vector2|Vector3)} The position on the curve. It can be a 2D or 3D vector depending on the curve definition.
   */
  getPoint(t, e) {
    const n = t * this.getLength(), r = this.getCurveLengths();
    let s = 0;
    for (; s < r.length; ) {
      if (r[s] >= n) {
        const a = r[s] - n, o = this.curves[s], l = o.getLength(), c = l === 0 ? 0 : 1 - a / l;
        return o.getPointAt(c, e);
      }
      s++;
    }
    return null;
  }
  getLength() {
    const t = this.getCurveLengths();
    return t[t.length - 1];
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  /**
   * Returns list of cumulative curve lengths of the defined curves.
   *
   * @return {Array<number>} The curve lengths.
   */
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const t = [];
    let e = 0;
    for (let n = 0, r = this.curves.length; n < r; n++)
      e += this.curves[n].getLength(), t.push(e);
    return this.cacheLengths = t, t;
  }
  getSpacedPoints(t = 40) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPoint(n / t));
    return this.autoClose && e.push(e[0]), e;
  }
  getPoints(t = 12) {
    const e = [];
    let n;
    for (let r = 0, s = this.curves; r < s.length; r++) {
      const a = s[r], o = a.isEllipseCurve ? t * 2 : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? t * a.points.length : t, l = a.getPoints(o);
      for (let c = 0; c < l.length; c++) {
        const h = l[c];
        n && n.equals(h) || (e.push(h), n = h);
      }
    }
    return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e;
  }
  copy(t) {
    super.copy(t), this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const r = t.curves[e];
      this.curves.push(r.clone());
    }
    return this.autoClose = t.autoClose, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.autoClose = this.autoClose, t.curves = [];
    for (let e = 0, n = this.curves.length; e < n; e++) {
      const r = this.curves[e];
      t.curves.push(r.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.autoClose = t.autoClose, this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const r = t.curves[e];
      this.curves.push(new Ur[r.type]().fromJSON(r));
    }
    return this;
  }
}
class Ns extends ko {
  /**
   * Constructs a new path.
   *
   * @param {Array<Vector2>} [points] - An array of 2D points defining the path.
   */
  constructor(t) {
    super(), this.type = "Path", this.currentPoint = new ut(), t && this.setFromPoints(t);
  }
  /**
   * Creates a path from the given list of points. The points are added
   * to the path as instances of {@link LineCurve}.
   *
   * @param {Array<Vector2>} points - An array of 2D points.
   * @return {Path} A reference to this path.
   */
  setFromPoints(t) {
    this.moveTo(t[0].x, t[0].y);
    for (let e = 1, n = t.length; e < n; e++)
      this.lineTo(t[e].x, t[e].y);
    return this;
  }
  /**
   * Moves {@link Path#currentPoint} to the given point.
   *
   * @param {number} x - The x coordinate.
   * @param {number} y - The y coordinate.
   * @return {Path} A reference to this path.
   */
  moveTo(t, e) {
    return this.currentPoint.set(t, e), this;
  }
  /**
   * Adds an instance of {@link LineCurve} to the path by connecting
   * the current point with the given one.
   *
   * @param {number} x - The x coordinate of the end point.
   * @param {number} y - The y coordinate of the end point.
   * @return {Path} A reference to this path.
   */
  lineTo(t, e) {
    const n = new wa(this.currentPoint.clone(), new ut(t, e));
    return this.curves.push(n), this.currentPoint.set(t, e), this;
  }
  /**
   * Adds an instance of {@link QuadraticBezierCurve} to the path by connecting
   * the current point with the given one.
   *
   * @param {number} aCPx - The x coordinate of the control point.
   * @param {number} aCPy - The y coordinate of the control point.
   * @param {number} aX - The x coordinate of the end point.
   * @param {number} aY - The y coordinate of the end point.
   * @return {Path} A reference to this path.
   */
  quadraticCurveTo(t, e, n, r) {
    const s = new Pa(
      this.currentPoint.clone(),
      new ut(t, e),
      new ut(n, r)
    );
    return this.curves.push(s), this.currentPoint.set(n, r), this;
  }
  /**
   * Adds an instance of {@link CubicBezierCurve} to the path by connecting
   * the current point with the given one.
   *
   * @param {number} aCP1x - The x coordinate of the first control point.
   * @param {number} aCP1y - The y coordinate of the first control point.
   * @param {number} aCP2x - The x coordinate of the second control point.
   * @param {number} aCP2y - The y coordinate of the second control point.
   * @param {number} aX - The x coordinate of the end point.
   * @param {number} aY - The y coordinate of the end point.
   * @return {Path} A reference to this path.
   */
  bezierCurveTo(t, e, n, r, s, a) {
    const o = new Ca(
      this.currentPoint.clone(),
      new ut(t, e),
      new ut(n, r),
      new ut(s, a)
    );
    return this.curves.push(o), this.currentPoint.set(s, a), this;
  }
  /**
   * Adds an instance of {@link SplineCurve} to the path by connecting
   * the current point with the given list of points.
   *
   * @param {Array<Vector2>} pts - An array of points in 2D space.
   * @return {Path} A reference to this path.
   */
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t), n = new La(e);
    return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this;
  }
  /**
   * Adds an arc as an instance of {@link EllipseCurve} to the path, positioned relative
   * to the current point.
   *
   * @param {number} [aX=0] - The x coordinate of the center of the arc offsetted from the previous curve.
   * @param {number} [aY=0] - The y coordinate of the center of the arc offsetted from the previous curve.
   * @param {number} [aRadius=1] - The radius of the arc.
   * @param {number} [aStartAngle=0] - The start angle in radians.
   * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
   * @param {boolean} [aClockwise=false] - Whether to sweep the arc clockwise or not.
   * @return {Path} A reference to this path.
   */
  arc(t, e, n, r, s, a) {
    const o = this.currentPoint.x, l = this.currentPoint.y;
    return this.absarc(
      t + o,
      e + l,
      n,
      r,
      s,
      a
    ), this;
  }
  /**
   * Adds an absolutely positioned arc as an instance of {@link EllipseCurve} to the path.
   *
   * @param {number} [aX=0] - The x coordinate of the center of the arc.
   * @param {number} [aY=0] - The y coordinate of the center of the arc.
   * @param {number} [aRadius=1] - The radius of the arc.
   * @param {number} [aStartAngle=0] - The start angle in radians.
   * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
   * @param {boolean} [aClockwise=false] - Whether to sweep the arc clockwise or not.
   * @return {Path} A reference to this path.
   */
  absarc(t, e, n, r, s, a) {
    return this.absellipse(t, e, n, n, r, s, a), this;
  }
  /**
   * Adds an ellipse as an instance of {@link EllipseCurve} to the path, positioned relative
   * to the current point
   *
   * @param {number} [aX=0] - The x coordinate of the center of the ellipse offsetted from the previous curve.
   * @param {number} [aY=0] - The y coordinate of the center of the ellipse offsetted from the previous curve.
   * @param {number} [xRadius=1] - The radius of the ellipse in the x axis.
   * @param {number} [yRadius=1] - The radius of the ellipse in the y axis.
   * @param {number} [aStartAngle=0] - The start angle in radians.
   * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
   * @param {boolean} [aClockwise=false] - Whether to sweep the ellipse clockwise or not.
   * @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis.
   * @return {Path} A reference to this path.
   */
  ellipse(t, e, n, r, s, a, o, l) {
    const c = this.currentPoint.x, h = this.currentPoint.y;
    return this.absellipse(t + c, e + h, n, r, s, a, o, l), this;
  }
  /**
   * Adds an absolutely positioned ellipse as an instance of {@link EllipseCurve} to the path.
   *
   * @param {number} [aX=0] - The x coordinate of the absolute center of the ellipse.
   * @param {number} [aY=0] - The y coordinate of the absolute center of the ellipse.
   * @param {number} [xRadius=1] - The radius of the ellipse in the x axis.
   * @param {number} [yRadius=1] - The radius of the ellipse in the y axis.
   * @param {number} [aStartAngle=0] - The start angle in radians.
   * @param {number} [aEndAngle=Math.PI*2] - The end angle in radians.
   * @param {boolean} [aClockwise=false] - Whether to sweep the ellipse clockwise or not.
   * @param {number} [aRotation=0] - The rotation angle of the ellipse in radians, counterclockwise from the positive X axis.
   * @return {Path} A reference to this path.
   */
  absellipse(t, e, n, r, s, a, o, l) {
    const c = new Yr(t, e, n, r, s, a, o, l);
    if (this.curves.length > 0) {
      const f = c.getPoint(0);
      f.equals(this.currentPoint) || this.lineTo(f.x, f.y);
    }
    this.curves.push(c);
    const h = c.getPoint(1);
    return this.currentPoint.copy(h), this;
  }
  copy(t) {
    return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.currentPoint = this.currentPoint.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this;
  }
}
class Da extends Ns {
  /**
   * Constructs a new shape.
   *
   * @param {Array<Vector2>} [points] - An array of 2D points defining the shape.
   */
  constructor(t) {
    super(t), this.uuid = Kn(), this.type = "Shape", this.holes = [];
  }
  /**
   * Returns an array representing each contour of the holes
   * as a list of 2D points.
   *
   * @param {number} divisions - The fineness of the result.
   * @return {Array<Array<Vector2>>} The holes as a series of 2D points.
   */
  getPointsHoles(t) {
    const e = [];
    for (let n = 0, r = this.holes.length; n < r; n++)
      e[n] = this.holes[n].getPoints(t);
    return e;
  }
  // get points of shape and holes (keypoints based on segments parameter)
  /**
   * Returns an object that holds contour data for the shape and its holes as
   * arrays of 2D points.
   *
   * @param {number} divisions - The fineness of the result.
   * @return {{shape:Array<Vector2>,holes:Array<Array<Vector2>>}} An object with contour data.
   */
  extractPoints(t) {
    return {
      shape: this.getPoints(t),
      holes: this.getPointsHoles(t)
    };
  }
  copy(t) {
    super.copy(t), this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const r = t.holes[e];
      this.holes.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.uuid = this.uuid, t.holes = [];
    for (let e = 0, n = this.holes.length; e < n; e++) {
      const r = this.holes[e];
      t.holes.push(r.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.uuid = t.uuid, this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const r = t.holes[e];
      this.holes.push(new Ns().fromJSON(r));
    }
    return this;
  }
}
function Wo(i, t, e = 2) {
  const n = t && t.length, r = n ? t[0] * e : i.length;
  let s = Ia(i, 0, r, e, !0);
  const a = [];
  if (!s || s.next === s.prev) return a;
  let o, l, c;
  if (n && (s = Ko(i, t, s, e)), i.length > 80 * e) {
    o = i[0], l = i[1];
    let h = o, f = l;
    for (let u = e; u < r; u += e) {
      const p = i[u], _ = i[u + 1];
      p < o && (o = p), _ < l && (l = _), p > h && (h = p), _ > f && (f = _);
    }
    c = Math.max(h - o, f - l), c = c !== 0 ? 32767 / c : 0;
  }
  return pi(s, a, e, o, l, c, 0), a;
}
function Ia(i, t, e, n, r) {
  let s;
  if (r === al(i, t, e, n) > 0)
    for (let a = t; a < e; a += n) s = Us(a / n | 0, i[a], i[a + 1], s);
  else
    for (let a = e - n; a >= t; a -= n) s = Us(a / n | 0, i[a], i[a + 1], s);
  return s && Yn(s, s.next) && (gi(s), s = s.next), s;
}
function En(i, t) {
  if (!i) return i;
  t || (t = i);
  let e = i, n;
  do
    if (n = !1, !e.steiner && (Yn(e, e.next) || he(e.prev, e, e.next) === 0)) {
      if (gi(e), e = t = e.prev, e === e.next) break;
      n = !0;
    } else
      e = e.next;
  while (n || e !== t);
  return t;
}
function pi(i, t, e, n, r, s, a) {
  if (!i) return;
  !a && s && tl(i, n, r, s);
  let o = i;
  for (; i.prev !== i.next; ) {
    const l = i.prev, c = i.next;
    if (s ? qo(i, n, r, s) : Xo(i)) {
      t.push(l.i, i.i, c.i), gi(i), i = c.next, o = c.next;
      continue;
    }
    if (i = c, i === o) {
      a ? a === 1 ? (i = Yo(En(i), t), pi(i, t, e, n, r, s, 2)) : a === 2 && Zo(i, t, e, n, r, s) : pi(En(i), t, e, n, r, s, 1);
      break;
    }
  }
}
function Xo(i) {
  const t = i.prev, e = i, n = i.next;
  if (he(t, e, n) >= 0) return !1;
  const r = t.x, s = e.x, a = n.x, o = t.y, l = e.y, c = n.y, h = Math.min(r, s, a), f = Math.min(o, l, c), u = Math.max(r, s, a), p = Math.max(o, l, c);
  let _ = n.next;
  for (; _ !== t; ) {
    if (_.x >= h && _.x <= u && _.y >= f && _.y <= p && ui(r, o, s, l, a, c, _.x, _.y) && he(_.prev, _, _.next) >= 0) return !1;
    _ = _.next;
  }
  return !0;
}
function qo(i, t, e, n) {
  const r = i.prev, s = i, a = i.next;
  if (he(r, s, a) >= 0) return !1;
  const o = r.x, l = s.x, c = a.x, h = r.y, f = s.y, u = a.y, p = Math.min(o, l, c), _ = Math.min(h, f, u), y = Math.max(o, l, c), m = Math.max(h, f, u), d = Or(p, _, t, e, n), b = Or(y, m, t, e, n);
  let A = i.prevZ, M = i.nextZ;
  for (; A && A.z >= d && M && M.z <= b; ) {
    if (A.x >= p && A.x <= y && A.y >= _ && A.y <= m && A !== r && A !== a && ui(o, h, l, f, c, u, A.x, A.y) && he(A.prev, A, A.next) >= 0 || (A = A.prevZ, M.x >= p && M.x <= y && M.y >= _ && M.y <= m && M !== r && M !== a && ui(o, h, l, f, c, u, M.x, M.y) && he(M.prev, M, M.next) >= 0)) return !1;
    M = M.nextZ;
  }
  for (; A && A.z >= d; ) {
    if (A.x >= p && A.x <= y && A.y >= _ && A.y <= m && A !== r && A !== a && ui(o, h, l, f, c, u, A.x, A.y) && he(A.prev, A, A.next) >= 0) return !1;
    A = A.prevZ;
  }
  for (; M && M.z <= b; ) {
    if (M.x >= p && M.x <= y && M.y >= _ && M.y <= m && M !== r && M !== a && ui(o, h, l, f, c, u, M.x, M.y) && he(M.prev, M, M.next) >= 0) return !1;
    M = M.nextZ;
  }
  return !0;
}
function Yo(i, t) {
  let e = i;
  do {
    const n = e.prev, r = e.next.next;
    !Yn(n, r) && Na(n, e, e.next, r) && mi(n, r) && mi(r, n) && (t.push(n.i, e.i, r.i), gi(e), gi(e.next), e = i = r), e = e.next;
  } while (e !== i);
  return En(e);
}
function Zo(i, t, e, n, r, s) {
  let a = i;
  do {
    let o = a.next.next;
    for (; o !== a.prev; ) {
      if (a.i !== o.i && il(a, o)) {
        let l = Ua(a, o);
        a = En(a, a.next), l = En(l, l.next), pi(a, t, e, n, r, s, 0), pi(l, t, e, n, r, s, 0);
        return;
      }
      o = o.next;
    }
    a = a.next;
  } while (a !== i);
}
function Ko(i, t, e, n) {
  const r = [];
  for (let s = 0, a = t.length; s < a; s++) {
    const o = t[s] * n, l = s < a - 1 ? t[s + 1] * n : i.length, c = Ia(i, o, l, n, !1);
    c === c.next && (c.steiner = !0), r.push(nl(c));
  }
  r.sort(Jo);
  for (let s = 0; s < r.length; s++)
    e = $o(r[s], e);
  return e;
}
function Jo(i, t) {
  let e = i.x - t.x;
  if (e === 0 && (e = i.y - t.y, e === 0)) {
    const n = (i.next.y - i.y) / (i.next.x - i.x), r = (t.next.y - t.y) / (t.next.x - t.x);
    e = n - r;
  }
  return e;
}
function $o(i, t) {
  const e = Qo(i, t);
  if (!e)
    return t;
  const n = Ua(e, i);
  return En(n, n.next), En(e, e.next);
}
function Qo(i, t) {
  let e = t;
  const n = i.x, r = i.y;
  let s = -1 / 0, a;
  if (Yn(i, e)) return e;
  do {
    if (Yn(i, e.next)) return e.next;
    if (r <= e.y && r >= e.next.y && e.next.y !== e.y) {
      const f = e.x + (r - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
      if (f <= n && f > s && (s = f, a = e.x < e.next.x ? e : e.next, f === n))
        return a;
    }
    e = e.next;
  } while (e !== t);
  if (!a) return null;
  const o = a, l = a.x, c = a.y;
  let h = 1 / 0;
  e = a;
  do {
    if (n >= e.x && e.x >= l && n !== e.x && Fa(r < c ? n : s, r, l, c, r < c ? s : n, r, e.x, e.y)) {
      const f = Math.abs(r - e.y) / (n - e.x);
      mi(e, i) && (f < h || f === h && (e.x > a.x || e.x === a.x && jo(a, e))) && (a = e, h = f);
    }
    e = e.next;
  } while (e !== o);
  return a;
}
function jo(i, t) {
  return he(i.prev, i, t.prev) < 0 && he(t.next, i, i.next) < 0;
}
function tl(i, t, e, n) {
  let r = i;
  do
    r.z === 0 && (r.z = Or(r.x, r.y, t, e, n)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next;
  while (r !== i);
  r.prevZ.nextZ = null, r.prevZ = null, el(r);
}
function el(i) {
  let t, e = 1;
  do {
    let n = i, r;
    i = null;
    let s = null;
    for (t = 0; n; ) {
      t++;
      let a = n, o = 0;
      for (let c = 0; c < e && (o++, a = a.nextZ, !!a); c++)
        ;
      let l = e;
      for (; o > 0 || l > 0 && a; )
        o !== 0 && (l === 0 || !a || n.z <= a.z) ? (r = n, n = n.nextZ, o--) : (r = a, a = a.nextZ, l--), s ? s.nextZ = r : i = r, r.prevZ = s, s = r;
      n = a;
    }
    s.nextZ = null, e *= 2;
  } while (t > 1);
  return i;
}
function Or(i, t, e, n, r) {
  return i = (i - e) * r | 0, t = (t - n) * r | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, i | t << 1;
}
function nl(i) {
  let t = i, e = i;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== i);
  return e;
}
function Fa(i, t, e, n, r, s, a, o) {
  return (r - a) * (t - o) >= (i - a) * (s - o) && (i - a) * (n - o) >= (e - a) * (t - o) && (e - a) * (s - o) >= (r - a) * (n - o);
}
function ui(i, t, e, n, r, s, a, o) {
  return !(i === a && t === o) && Fa(i, t, e, n, r, s, a, o);
}
function il(i, t) {
  return i.next.i !== t.i && i.prev.i !== t.i && !rl(i, t) && // doesn't intersect other edges
  (mi(i, t) && mi(t, i) && sl(i, t) && // locally visible
  (he(i.prev, i, t.prev) || he(i, t.prev, t)) || // does not create opposite-facing sectors
  Yn(i, t) && he(i.prev, i, i.next) > 0 && he(t.prev, t, t.next) > 0);
}
function he(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function Yn(i, t) {
  return i.x === t.x && i.y === t.y;
}
function Na(i, t, e, n) {
  const r = Gi(he(i, t, e)), s = Gi(he(i, t, n)), a = Gi(he(e, n, i)), o = Gi(he(e, n, t));
  return !!(r !== s && a !== o || r === 0 && zi(i, e, t) || s === 0 && zi(i, n, t) || a === 0 && zi(e, i, n) || o === 0 && zi(e, t, n));
}
function zi(i, t, e) {
  return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
}
function Gi(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function rl(i, t) {
  let e = i;
  do {
    if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && Na(e, e.next, i, t)) return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function mi(i, t) {
  return he(i.prev, i, i.next) < 0 ? he(i, t, i.next) >= 0 && he(i, i.prev, t) >= 0 : he(i, t, i.prev) < 0 || he(i, i.next, t) < 0;
}
function sl(i, t) {
  let e = i, n = !1;
  const r = (i.x + t.x) / 2, s = (i.y + t.y) / 2;
  do
    e.y > s != e.next.y > s && e.next.y !== e.y && r < (e.next.x - e.x) * (s - e.y) / (e.next.y - e.y) + e.x && (n = !n), e = e.next;
  while (e !== i);
  return n;
}
function Ua(i, t) {
  const e = Br(i.i, i.x, i.y), n = Br(t.i, t.x, t.y), r = i.next, s = t.prev;
  return i.next = t, t.prev = i, e.next = r, r.prev = e, n.next = e, e.prev = n, s.next = n, n.prev = s, n;
}
function Us(i, t, e, n) {
  const r = Br(i, t, e);
  return n ? (r.next = n.next, r.prev = n, n.next.prev = r, n.next = r) : (r.prev = r, r.next = r), r;
}
function gi(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function Br(i, t, e) {
  return {
    i,
    // vertex index in coordinates array
    x: t,
    y: e,
    // vertex coordinates
    prev: null,
    // previous and next vertex nodes in a polygon ring
    next: null,
    z: 0,
    // z-order curve value
    prevZ: null,
    // previous and next nodes in z-order
    nextZ: null,
    steiner: !1
    // indicates whether this is a steiner point
  };
}
function al(i, t, e, n) {
  let r = 0;
  for (let s = t, a = e - n; s < e; s += n)
    r += (i[a] - i[s]) * (i[s + 1] + i[a + 1]), a = s;
  return r;
}
class ol {
  /**
   * Triangulates the given shape definition by returning an array of triangles.
   *
   * @param {Array<number>} data - An array with 2D points.
   * @param {Array<number>} holeIndices - An array with indices defining holes.
   * @param {number} [dim=2] - The number of coordinates per vertex in the input array.
   * @return {Array<number>} An array representing the triangulated faces. Each face is defined by three consecutive numbers
   * representing vertex indices.
   */
  static triangulate(t, e, n = 2) {
    return Wo(t, e, n);
  }
}
class kn {
  /**
   * Calculate area of a ( 2D ) contour polygon.
   *
   * @param {Array<Vector2>} contour - An array of 2D points.
   * @return {number} The area.
   */
  static area(t) {
    const e = t.length;
    let n = 0;
    for (let r = e - 1, s = 0; s < e; r = s++)
      n += t[r].x * t[s].y - t[s].x * t[r].y;
    return n * 0.5;
  }
  /**
   * Returns `true` if the given contour uses a clockwise winding order.
   *
   * @param {Array<Vector2>} pts - An array of 2D points defining a polygon.
   * @return {boolean} Whether the given contour uses a clockwise winding order or not.
   */
  static isClockWise(t) {
    return kn.area(t) < 0;
  }
  /**
   * Triangulates the given shape definition.
   *
   * @param {Array<Vector2>} contour - An array of 2D points defining the contour.
   * @param {Array<Array<Vector2>>} holes - An array that holds arrays of 2D points defining the holes.
   * @return {Array<Array<number>>} An array that holds for each face definition an array with three indices.
   */
  static triangulateShape(t, e) {
    const n = [], r = [], s = [];
    Os(t), Bs(n, t);
    let a = t.length;
    e.forEach(Os);
    for (let l = 0; l < e.length; l++)
      r.push(a), a += e[l].length, Bs(n, e[l]);
    const o = ol.triangulate(n, r);
    for (let l = 0; l < o.length; l += 3)
      s.push(o.slice(l, l + 3));
    return s;
  }
}
function Os(i) {
  const t = i.length;
  t > 2 && i[t - 1].equals(i[0]) && i.pop();
}
function Bs(i, t) {
  for (let e = 0; e < t.length; e++)
    i.push(t[e].x), i.push(t[e].y);
}
class Kr extends ke {
  /**
   * Constructs a new extrude geometry.
   *
   * @param {Shape|Array<Shape>} [shapes] - A shape or an array of shapes.
   * @param {ExtrudeGeometry~Options} [options] - The extrude settings.
   */
  constructor(t = new Da([new ut(0.5, 0.5), new ut(-0.5, 0.5), new ut(-0.5, -0.5), new ut(0.5, -0.5)]), e = {}) {
    super(), this.type = "ExtrudeGeometry", this.parameters = {
      shapes: t,
      options: e
    }, t = Array.isArray(t) ? t : [t];
    const n = this, r = [], s = [];
    for (let o = 0, l = t.length; o < l; o++) {
      const c = t[o];
      a(c);
    }
    this.setAttribute("position", new we(r, 3)), this.setAttribute("uv", new we(s, 2)), this.computeVertexNormals();
    function a(o) {
      const l = [], c = e.curveSegments !== void 0 ? e.curveSegments : 12, h = e.steps !== void 0 ? e.steps : 1, f = e.depth !== void 0 ? e.depth : 1;
      let u = e.bevelEnabled !== void 0 ? e.bevelEnabled : !0, p = e.bevelThickness !== void 0 ? e.bevelThickness : 0.2, _ = e.bevelSize !== void 0 ? e.bevelSize : p - 0.1, y = e.bevelOffset !== void 0 ? e.bevelOffset : 0, m = e.bevelSegments !== void 0 ? e.bevelSegments : 3;
      const d = e.extrudePath, b = e.UVGenerator !== void 0 ? e.UVGenerator : ll;
      let A, M = !1, R, T, C, x;
      if (d) {
        A = d.getSpacedPoints(h), M = !0, u = !1;
        const Q = d.isCatmullRomCurve3 ? d.closed : !1;
        R = d.computeFrenetFrames(h, Q), T = new N(), C = new N(), x = new N();
      }
      u || (m = 0, p = 0, _ = 0, y = 0);
      const E = o.extractPoints(c);
      let P = E.shape;
      const w = E.holes;
      if (!kn.isClockWise(P)) {
        P = P.reverse();
        for (let Q = 0, nt = w.length; Q < nt; Q++) {
          const et = w[Q];
          kn.isClockWise(et) && (w[Q] = et.reverse());
        }
      }
      function q(Q) {
        const et = 10000000000000001e-36;
        let _t = Q[0];
        for (let pt = 1; pt <= Q.length; pt++) {
          const Ft = pt % Q.length, Rt = Q[Ft], Bt = Rt.x - _t.x, Gt = Rt.y - _t.y, L = Bt * Bt + Gt * Gt, ne = Math.max(
            Math.abs(Rt.x),
            Math.abs(Rt.y),
            Math.abs(_t.x),
            Math.abs(_t.y)
          ), Kt = et * ne * ne;
          if (L <= Kt) {
            Q.splice(Ft, 1), pt--;
            continue;
          }
          _t = Rt;
        }
      }
      q(P), w.forEach(q);
      const $ = w.length, D = P;
      for (let Q = 0; Q < $; Q++) {
        const nt = w[Q];
        P = P.concat(nt);
      }
      function k(Q, nt, et) {
        return nt || Jt("ExtrudeGeometry: vec does not exist"), Q.clone().addScaledVector(nt, et);
      }
      const U = P.length;
      function Y(Q, nt, et) {
        let _t, pt, Ft;
        const Rt = Q.x - nt.x, Bt = Q.y - nt.y, Gt = et.x - Q.x, L = et.y - Q.y, ne = Rt * Rt + Bt * Bt, Kt = Rt * L - Bt * Gt;
        if (Math.abs(Kt) > Number.EPSILON) {
          const S = Math.sqrt(ne), g = Math.sqrt(Gt * Gt + L * L), O = nt.x - Bt / S, V = nt.y + Rt / S, W = et.x - L / g, rt = et.y + Gt / g, at = ((W - O) * L - (rt - V) * Gt) / (Rt * L - Bt * Gt);
          _t = O + Rt * at - Q.x, pt = V + Bt * at - Q.y;
          const X = _t * _t + pt * pt;
          if (X <= 2)
            return new ut(_t, pt);
          Ft = Math.sqrt(X / 2);
        } else {
          let S = !1;
          Rt > Number.EPSILON ? Gt > Number.EPSILON && (S = !0) : Rt < -Number.EPSILON ? Gt < -Number.EPSILON && (S = !0) : Math.sign(Bt) === Math.sign(L) && (S = !0), S ? (_t = -Bt, pt = Rt, Ft = Math.sqrt(ne)) : (_t = Rt, pt = Bt, Ft = Math.sqrt(ne / 2));
        }
        return new ut(_t / Ft, pt / Ft);
      }
      const tt = [];
      for (let Q = 0, nt = D.length, et = nt - 1, _t = Q + 1; Q < nt; Q++, et++, _t++)
        et === nt && (et = 0), _t === nt && (_t = 0), tt[Q] = Y(D[Q], D[et], D[_t]);
      const st = [];
      let ot, St = tt.concat();
      for (let Q = 0, nt = $; Q < nt; Q++) {
        const et = w[Q];
        ot = [];
        for (let _t = 0, pt = et.length, Ft = pt - 1, Rt = _t + 1; _t < pt; _t++, Ft++, Rt++)
          Ft === pt && (Ft = 0), Rt === pt && (Rt = 0), ot[_t] = Y(et[_t], et[Ft], et[Rt]);
        st.push(ot), St = St.concat(ot);
      }
      let Xt;
      if (m === 0)
        Xt = kn.triangulateShape(D, w);
      else {
        const Q = [], nt = [];
        for (let et = 0; et < m; et++) {
          const _t = et / m, pt = p * Math.cos(_t * Math.PI / 2), Ft = _ * Math.sin(_t * Math.PI / 2) + y;
          for (let Rt = 0, Bt = D.length; Rt < Bt; Rt++) {
            const Gt = k(D[Rt], tt[Rt], Ft);
            Pt(Gt.x, Gt.y, -pt), _t === 0 && Q.push(Gt);
          }
          for (let Rt = 0, Bt = $; Rt < Bt; Rt++) {
            const Gt = w[Rt];
            ot = st[Rt];
            const L = [];
            for (let ne = 0, Kt = Gt.length; ne < Kt; ne++) {
              const S = k(Gt[ne], ot[ne], Ft);
              Pt(S.x, S.y, -pt), _t === 0 && L.push(S);
            }
            _t === 0 && nt.push(L);
          }
        }
        Xt = kn.triangulateShape(Q, nt);
      }
      const re = Xt.length, Qt = _ + y;
      for (let Q = 0; Q < U; Q++) {
        const nt = u ? k(P[Q], St[Q], Qt) : P[Q];
        M ? (C.copy(R.normals[0]).multiplyScalar(nt.x), T.copy(R.binormals[0]).multiplyScalar(nt.y), x.copy(A[0]).add(C).add(T), Pt(x.x, x.y, x.z)) : Pt(nt.x, nt.y, 0);
      }
      for (let Q = 1; Q <= h; Q++)
        for (let nt = 0; nt < U; nt++) {
          const et = u ? k(P[nt], St[nt], Qt) : P[nt];
          M ? (C.copy(R.normals[Q]).multiplyScalar(et.x), T.copy(R.binormals[Q]).multiplyScalar(et.y), x.copy(A[Q]).add(C).add(T), Pt(x.x, x.y, x.z)) : Pt(et.x, et.y, f / h * Q);
        }
      for (let Q = m - 1; Q >= 0; Q--) {
        const nt = Q / m, et = p * Math.cos(nt * Math.PI / 2), _t = _ * Math.sin(nt * Math.PI / 2) + y;
        for (let pt = 0, Ft = D.length; pt < Ft; pt++) {
          const Rt = k(D[pt], tt[pt], _t);
          Pt(Rt.x, Rt.y, f + et);
        }
        for (let pt = 0, Ft = w.length; pt < Ft; pt++) {
          const Rt = w[pt];
          ot = st[pt];
          for (let Bt = 0, Gt = Rt.length; Bt < Gt; Bt++) {
            const L = k(Rt[Bt], ot[Bt], _t);
            M ? Pt(L.x, L.y + A[h - 1].y, A[h - 1].x + et) : Pt(L.x, L.y, f + et);
          }
        }
      }
      K(), lt();
      function K() {
        const Q = r.length / 3;
        if (u) {
          let nt = 0, et = U * nt;
          for (let _t = 0; _t < re; _t++) {
            const pt = Xt[_t];
            Ot(pt[2] + et, pt[1] + et, pt[0] + et);
          }
          nt = h + m * 2, et = U * nt;
          for (let _t = 0; _t < re; _t++) {
            const pt = Xt[_t];
            Ot(pt[0] + et, pt[1] + et, pt[2] + et);
          }
        } else {
          for (let nt = 0; nt < re; nt++) {
            const et = Xt[nt];
            Ot(et[2], et[1], et[0]);
          }
          for (let nt = 0; nt < re; nt++) {
            const et = Xt[nt];
            Ot(et[0] + U * h, et[1] + U * h, et[2] + U * h);
          }
        }
        n.addGroup(Q, r.length / 3 - Q, 0);
      }
      function lt() {
        const Q = r.length / 3;
        let nt = 0;
        it(D, nt), nt += D.length;
        for (let et = 0, _t = w.length; et < _t; et++) {
          const pt = w[et];
          it(pt, nt), nt += pt.length;
        }
        n.addGroup(Q, r.length / 3 - Q, 1);
      }
      function it(Q, nt) {
        let et = Q.length;
        for (; --et >= 0; ) {
          const _t = et;
          let pt = et - 1;
          pt < 0 && (pt = Q.length - 1);
          for (let Ft = 0, Rt = h + m * 2; Ft < Rt; Ft++) {
            const Bt = U * Ft, Gt = U * (Ft + 1), L = nt + _t + Bt, ne = nt + pt + Bt, Kt = nt + pt + Gt, S = nt + _t + Gt;
            It(L, ne, Kt, S);
          }
        }
      }
      function Pt(Q, nt, et) {
        l.push(Q), l.push(nt), l.push(et);
      }
      function Ot(Q, nt, et) {
        te(Q), te(nt), te(et);
        const _t = r.length / 3, pt = b.generateTopUV(n, r, _t - 3, _t - 2, _t - 1);
        zt(pt[0]), zt(pt[1]), zt(pt[2]);
      }
      function It(Q, nt, et, _t) {
        te(Q), te(nt), te(_t), te(nt), te(et), te(_t);
        const pt = r.length / 3, Ft = b.generateSideWallUV(n, r, pt - 6, pt - 3, pt - 2, pt - 1);
        zt(Ft[0]), zt(Ft[1]), zt(Ft[3]), zt(Ft[1]), zt(Ft[2]), zt(Ft[3]);
      }
      function te(Q) {
        r.push(l[Q * 3 + 0]), r.push(l[Q * 3 + 1]), r.push(l[Q * 3 + 2]);
      }
      function zt(Q) {
        s.push(Q.x), s.push(Q.y);
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(), e = this.parameters.shapes, n = this.parameters.options;
    return cl(e, n, t);
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @param {Array<Shape>} shapes - An array of shapes.
   * @return {ExtrudeGeometry} A new instance.
   */
  static fromJSON(t, e) {
    const n = [];
    for (let s = 0, a = t.shapes.length; s < a; s++) {
      const o = e[t.shapes[s]];
      n.push(o);
    }
    const r = t.options.extrudePath;
    return r !== void 0 && (t.options.extrudePath = new Ur[r.type]().fromJSON(r)), new Kr(n, t.options);
  }
}
const ll = {
  generateTopUV: function(i, t, e, n, r) {
    const s = t[e * 3], a = t[e * 3 + 1], o = t[n * 3], l = t[n * 3 + 1], c = t[r * 3], h = t[r * 3 + 1];
    return [
      new ut(s, a),
      new ut(o, l),
      new ut(c, h)
    ];
  },
  generateSideWallUV: function(i, t, e, n, r, s) {
    const a = t[e * 3], o = t[e * 3 + 1], l = t[e * 3 + 2], c = t[n * 3], h = t[n * 3 + 1], f = t[n * 3 + 2], u = t[r * 3], p = t[r * 3 + 1], _ = t[r * 3 + 2], y = t[s * 3], m = t[s * 3 + 1], d = t[s * 3 + 2];
    return Math.abs(o - h) < Math.abs(a - c) ? [
      new ut(a, 1 - l),
      new ut(c, 1 - f),
      new ut(u, 1 - _),
      new ut(y, 1 - d)
    ] : [
      new ut(o, 1 - l),
      new ut(h, 1 - f),
      new ut(p, 1 - _),
      new ut(m, 1 - d)
    ];
  }
};
function cl(i, t, e) {
  if (e.shapes = [], Array.isArray(i))
    for (let n = 0, r = i.length; n < r; n++) {
      const s = i[n];
      e.shapes.push(s.uuid);
    }
  else
    e.shapes.push(i.uuid);
  return e.options = Object.assign({}, t), t.extrudePath !== void 0 && (e.options.extrudePath = t.extrudePath.toJSON()), e;
}
class xi extends ke {
  /**
   * Constructs a new plane geometry.
   *
   * @param {number} [width=1] - The width along the X axis.
   * @param {number} [height=1] - The height along the Y axis
   * @param {number} [widthSegments=1] - The number of segments along the X axis.
   * @param {number} [heightSegments=1] - The number of segments along the Y axis.
   */
  constructor(t = 1, e = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: e,
      widthSegments: n,
      heightSegments: r
    };
    const s = t / 2, a = e / 2, o = Math.floor(n), l = Math.floor(r), c = o + 1, h = l + 1, f = t / o, u = e / l, p = [], _ = [], y = [], m = [];
    for (let d = 0; d < h; d++) {
      const b = d * u - a;
      for (let A = 0; A < c; A++) {
        const M = A * f - s;
        _.push(M, -b, 0), y.push(0, 0, 1), m.push(A / o), m.push(1 - d / l);
      }
    }
    for (let d = 0; d < l; d++)
      for (let b = 0; b < o; b++) {
        const A = b + c * d, M = b + c * (d + 1), R = b + 1 + c * (d + 1), T = b + 1 + c * d;
        p.push(A, M, T), p.push(M, R, T);
      }
    this.setIndex(p), this.setAttribute("position", new we(_, 3)), this.setAttribute("normal", new we(y, 3)), this.setAttribute("uv", new we(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {PlaneGeometry} A new instance.
   */
  static fromJSON(t) {
    return new xi(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
function Zn(i) {
  const t = {};
  for (const e in i) {
    t[e] = {};
    for (const n in i[e]) {
      const r = i[e][n];
      if (zs(r))
        r.isRenderTargetTexture ? (Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[e][n] = null) : t[e][n] = r.clone();
      else if (Array.isArray(r))
        if (zs(r[0])) {
          const s = [];
          for (let a = 0, o = r.length; a < o; a++)
            s[a] = r[a].clone();
          t[e][n] = s;
        } else
          t[e][n] = r.slice();
      else
        t[e][n] = r;
    }
  }
  return t;
}
function be(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = Zn(i[e]);
    for (const r in n)
      t[r] = n[r];
  }
  return t;
}
function zs(i) {
  return i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture || i.isQuaternion);
}
function ul(i) {
  const t = [];
  for (let e = 0; e < i.length; e++)
    t.push(i[e].clone());
  return t;
}
function Oa(i) {
  const t = i.getRenderTarget();
  return t === null ? i.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : $t.workingColorSpace;
}
const hl = { clone: Zn, merge: be };
var fl = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, dl = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class He extends $n {
  /**
   * Constructs a new shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(t) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = fl, this.fragmentShader = dl, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, t !== void 0 && this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = Zn(t.uniforms), this.uniformsGroups = ul(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this.defaultAttributeValues = Object.assign({}, t.defaultAttributeValues), this.index0AttributeName = t.index0AttributeName, this.uniformsNeedUpdate = t.uniformsNeedUpdate, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.glslVersion = this.glslVersion, e.uniforms = {};
    for (const r in this.uniforms) {
      const a = this.uniforms[r].value;
      a && a.isTexture ? e.uniforms[r] = {
        type: "t",
        value: a.toJSON(t).uuid
      } : a && a.isColor ? e.uniforms[r] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? e.uniforms[r] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? e.uniforms[r] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? e.uniforms[r] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? e.uniforms[r] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? e.uniforms[r] = {
        type: "m4",
        value: a.toArray()
      } : e.uniforms[r] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (e.extensions = n), e;
  }
  /**
   * Deserializes the material from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized material.
   * @param {Object<string,Texture>} textures - A dictionary holding textures referenced by the material.
   * @return {ShaderMaterial} A reference to this material.
   */
  fromJSON(t, e) {
    if (super.fromJSON(t, e), t.uniforms !== void 0)
      for (const n in t.uniforms) {
        const r = t.uniforms[n];
        switch (this.uniforms[n] = {}, r.type) {
          case "t":
            this.uniforms[n].value = e[r.value] || null;
            break;
          case "c":
            this.uniforms[n].value = new Yt().setHex(r.value);
            break;
          case "v2":
            this.uniforms[n].value = new ut().fromArray(r.value);
            break;
          case "v3":
            this.uniforms[n].value = new N().fromArray(r.value);
            break;
          case "v4":
            this.uniforms[n].value = new ue().fromArray(r.value);
            break;
          case "m3":
            this.uniforms[n].value = new Vt().fromArray(r.value);
            break;
          case "m4":
            this.uniforms[n].value = new oe().fromArray(r.value);
            break;
          default:
            this.uniforms[n].value = r.value;
        }
      }
    if (t.defines !== void 0 && (this.defines = t.defines), t.vertexShader !== void 0 && (this.vertexShader = t.vertexShader), t.fragmentShader !== void 0 && (this.fragmentShader = t.fragmentShader), t.glslVersion !== void 0 && (this.glslVersion = t.glslVersion), t.extensions !== void 0)
      for (const n in t.extensions)
        this.extensions[n] = t.extensions[n];
    return t.lights !== void 0 && (this.lights = t.lights), t.clipping !== void 0 && (this.clipping = t.clipping), this;
  }
}
class pl extends He {
  /**
   * Constructs a new raw shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(t) {
    super(t), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class Ki extends $n {
  /**
   * Constructs a new mesh standard material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(t) {
    super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new Yt(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Yt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new ut(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new sn(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class ml extends Ki {
  /**
   * Constructs a new mesh physical material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(t) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new ut(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function() {
        return Zt(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function(e) {
        this.ior = (1 + 0.4 * e) / (1 - 0.4 * e);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Yt(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Yt(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Yt(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(t);
  }
  /**
   * The anisotropy strength, from `0.0` to `1.0`.
   *
   * @type {number}
   * @default 0
   */
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(t) {
    this._anisotropy > 0 != t > 0 && this.version++, this._anisotropy = t;
  }
  /**
   * Represents the intensity of the clear coat layer, from `0.0` to `1.0`. Use
   * clear coat related properties to enable multilayer materials that have a
   * thin translucent layer over the base layer.
   *
   * @type {number}
   * @default 0
   */
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(t) {
    this._clearcoat > 0 != t > 0 && this.version++, this._clearcoat = t;
  }
  /**
   * The intensity of the iridescence layer, simulating RGB color shift based on the angle between
   * the surface and the viewer, from `0.0` to `1.0`.
   *
   * @type {number}
   * @default 0
   */
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(t) {
    this._iridescence > 0 != t > 0 && this.version++, this._iridescence = t;
  }
  /**
   * Defines the strength of the angular separation of colors (chromatic aberration) transmitting
   * through a relatively clear volume. Any value zero or larger is valid, the typical range of
   * realistic values is `[0, 1]`. This property can be only be used with transmissive objects.
   *
   * @type {number}
   * @default 0
   */
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(t) {
    this._dispersion > 0 != t > 0 && this.version++, this._dispersion = t;
  }
  /**
   * The intensity of the sheen layer, from `0.0` to `1.0`.
   *
   * @type {number}
   * @default 0
   */
  get sheen() {
    return this._sheen;
  }
  set sheen(t) {
    this._sheen > 0 != t > 0 && this.version++, this._sheen = t;
  }
  /**
   * Degree of transmission (or optical transparency), from `0.0` to `1.0`.
   *
   * Thin, transparent or semitransparent, plastic or glass materials remain
   * largely reflective even if they are fully transmissive. The transmission
   * property can be used to model these materials.
   *
   * When transmission is non-zero, `opacity` should be  set to `1`.
   *
   * @type {number}
   * @default 0
   */
  get transmission() {
    return this._transmission;
  }
  set transmission(t) {
    this._transmission > 0 != t > 0 && this.version++, this._transmission = t;
  }
  copy(t) {
    return super.copy(t), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropy = t.anisotropy, this.anisotropyRotation = t.anisotropyRotation, this.anisotropyMap = t.anisotropyMap, this.clearcoat = t.clearcoat, this.clearcoatMap = t.clearcoatMap, this.clearcoatRoughness = t.clearcoatRoughness, this.clearcoatRoughnessMap = t.clearcoatRoughnessMap, this.clearcoatNormalMap = t.clearcoatNormalMap, this.clearcoatNormalScale.copy(t.clearcoatNormalScale), this.dispersion = t.dispersion, this.ior = t.ior, this.iridescence = t.iridescence, this.iridescenceMap = t.iridescenceMap, this.iridescenceIOR = t.iridescenceIOR, this.iridescenceThicknessRange = [...t.iridescenceThicknessRange], this.iridescenceThicknessMap = t.iridescenceThicknessMap, this.sheen = t.sheen, this.sheenColor.copy(t.sheenColor), this.sheenColorMap = t.sheenColorMap, this.sheenRoughness = t.sheenRoughness, this.sheenRoughnessMap = t.sheenRoughnessMap, this.transmission = t.transmission, this.transmissionMap = t.transmissionMap, this.thickness = t.thickness, this.thicknessMap = t.thicknessMap, this.attenuationDistance = t.attenuationDistance, this.attenuationColor.copy(t.attenuationColor), this.specularIntensity = t.specularIntensity, this.specularIntensityMap = t.specularIntensityMap, this.specularColor.copy(t.specularColor), this.specularColorMap = t.specularColorMap, this;
  }
}
class gl extends $n {
  /**
   * Constructs a new mesh lambert material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(t) {
    super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new Yt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Yt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new ut(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new sn(), this.combine = 0, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.envMapIntensity = t.envMapIntensity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class _l extends $n {
  /**
   * Constructs a new mesh depth material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(t) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}
class xl extends $n {
  /**
   * Constructs a new mesh distance material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(t) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
  }
}
class Jr extends ye {
  /**
   * Constructs a new light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(t, e = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Yt(t), this.intensity = e;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  copy(t, e) {
    return super.copy(t, e), this.color.copy(t.color), this.intensity = t.intensity, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, e;
  }
}
class vl extends Jr {
  /**
   * Constructs a new hemisphere light.
   *
   * @param {(number|Color|string)} [skyColor=0xffffff] - The light's sky color.
   * @param {(number|Color|string)} [groundColor=0xffffff] - The light's ground color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(t, e, n) {
    super(t, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(ye.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Yt(e);
  }
  copy(t, e) {
    return super.copy(t, e), this.groundColor.copy(t.groundColor), this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.groundColor = this.groundColor.getHex(), e;
  }
}
const Cr = /* @__PURE__ */ new oe(), Gs = /* @__PURE__ */ new N(), Vs = /* @__PURE__ */ new N();
class Ba {
  /**
   * Constructs a new light shadow.
   *
   * @param {Camera} camera - The light's view of the world.
   */
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new ut(512, 512), this.mapType = 1009, this.map = null, this.mapPass = null, this.matrix = new oe(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Xr(), this._frameExtents = new ut(1, 1), this._viewportCount = 1, this._viewports = [
      new ue(0, 0, 1, 1)
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
  updateMatrices(t) {
    const e = this.camera, n = this.matrix;
    Gs.setFromMatrixPosition(t.matrixWorld), e.position.copy(Gs), Vs.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(Vs), e.updateMatrixWorld(), Cr.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Cr, e.coordinateSystem, e.reversedDepth), e.coordinateSystem === 2001 || e.reversedDepth ? n.set(
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
    ), n.multiply(Cr);
  }
  /**
   * Returns a viewport definition for the given viewport index.
   *
   * @param {number} viewportIndex - The viewport index.
   * @return {Vector4} The viewport.
   */
  getViewport(t) {
    return this._viewports[t];
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
  copy(t) {
    return this.camera = t.camera.clone(), this.intensity = t.intensity, this.bias = t.bias, this.radius = t.radius, this.autoUpdate = t.autoUpdate, this.needsUpdate = t.needsUpdate, this.normalBias = t.normalBias, this.blurSamples = t.blurSamples, this.mapSize.copy(t.mapSize), this.biasNode = t.biasNode, this;
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
    const t = {};
    return this.intensity !== 1 && (t.intensity = this.intensity), this.bias !== 0 && (t.bias = this.bias), this.normalBias !== 0 && (t.normalBias = this.normalBias), this.radius !== 1 && (t.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t;
  }
}
const Vi = /* @__PURE__ */ new N(), Hi = /* @__PURE__ */ new Jn(), Ye = /* @__PURE__ */ new N();
class za extends ye {
  /**
   * Constructs a new camera.
   */
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new oe(), this.projectionMatrix = new oe(), this.projectionMatrixInverse = new oe(), this.coordinateSystem = 2e3, this._reversedDepth = !1;
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
  copy(t, e) {
    return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
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
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.matrixWorld.decompose(Vi, Hi, Ye), Ye.x === 1 && Ye.y === 1 && Ye.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Vi, Hi, Ye.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(t, e, n = !1) {
    super.updateWorldMatrix(t, e, n), this.matrixWorld.decompose(Vi, Hi, Ye), Ye.x === 1 && Ye.y === 1 && Ye.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Vi, Hi, Ye.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const pn = /* @__PURE__ */ new N(), Hs = /* @__PURE__ */ new ut(), ks = /* @__PURE__ */ new ut();
class Ie extends za {
  /**
   * Constructs a new perspective camera.
   *
   * @param {number} [fov=50] - The vertical field of view.
   * @param {number} [aspect=1] - The aspect ratio.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(t = 50, e = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current {@link PerspectiveCamera#filmGauge}.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * @param {number} focalLength - Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(t) {
    const e = 0.5 * this.getFilmHeight() / t;
    this.fov = Nr * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  /**
   * Returns the focal length from the current {@link PerspectiveCamera#fov} and
   * {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The computed focal length.
   */
  getFocalLength() {
    const t = Math.tan(er * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / t;
  }
  /**
   * Returns the current vertical field of view angle in degrees considering {@link PerspectiveCamera#zoom}.
   *
   * @return {number} The effective FOV.
   */
  getEffectiveFOV() {
    return Nr * 2 * Math.atan(
      Math.tan(er * 0.5 * this.fov) / this.zoom
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
  getViewBounds(t, e, n) {
    pn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(pn.x, pn.y).multiplyScalar(-t / pn.z), pn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(pn.x, pn.y).multiplyScalar(-t / pn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} target - The target vector that is used to store result where x is width and y is height.
   * @returns {Vector2} The view size.
   */
  getViewSize(t, e) {
    return this.getViewBounds(t, Hs, ks), e.subVectors(ks, Hs);
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
  setViewOffset(t, e, n, r, s, a) {
    this.aspect = t / e, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
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
    const t = this.near;
    let e = t * Math.tan(er * 0.5 * this.fov) / this.zoom, n = 2 * e, r = this.aspect * n, s = -0.5 * r;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, c = a.fullHeight;
      s += a.offsetX * r / l, e -= a.offsetY * n / c, r *= a.width / l, n *= a.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (s += t * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, e, e - n, t, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
  }
}
class Ml extends Ba {
  /**
   * Constructs a new point light shadow.
   */
  constructor() {
    super(new Ie(90, 1, 0.5, 500)), this.isPointLightShadow = !0;
  }
}
class Sl extends Jr {
  /**
   * Constructs a new point light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity measured in candela (cd).
   * @param {number} [distance=0] - Maximum range of the light. `0` means no limit.
   * @param {number} [decay=2] - The amount the light dims along the distance of the light.
   */
  constructor(t, e, n = 0, r = 2) {
    super(t, e), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = r, this.shadow = new Ml();
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
  set power(t) {
    this.intensity = t / (4 * Math.PI);
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(t, e) {
    return super.copy(t, e), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.distance = this.distance, e.object.decay = this.decay, e.object.shadow = this.shadow.toJSON(), e;
  }
}
class $r extends za {
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
  constructor(t = -1, e = 1, n = 1, r = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = r, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = t.view === null ? null : Object.assign({}, t.view), this;
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
  setViewOffset(t, e, n, r, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
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
    const t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = n - t, a = n + t, o = r + e, l = r - e;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += c * this.view.offsetX, a = s + c * this.view.width, o -= h * this.view.offsetY, l = o - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, l, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
  }
}
class yl extends Ba {
  /**
   * Constructs a new directional light shadow.
   */
  constructor() {
    super(new $r(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class Ws extends Jr {
  /**
   * Constructs a new directional light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(t, e) {
    super(t, e), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(ye.DEFAULT_UP), this.updateMatrix(), this.target = new ye(), this.shadow = new yl();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.shadow = this.shadow.toJSON(), e.object.target = this.target.uuid, e;
  }
}
const zn = -90, Gn = 1;
class El extends ye {
  /**
   * Constructs a new cube camera.
   *
   * @param {number} near - The camera's near plane.
   * @param {number} far - The camera's far plane.
   * @param {WebGLCubeRenderTarget} renderTarget - The cube render target.
   */
  constructor(t, e, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new Ie(zn, Gn, t, e);
    r.layers = this.layers, this.add(r);
    const s = new Ie(zn, Gn, t, e);
    s.layers = this.layers, this.add(s);
    const a = new Ie(zn, Gn, t, e);
    a.layers = this.layers, this.add(a);
    const o = new Ie(zn, Gn, t, e);
    o.layers = this.layers, this.add(o);
    const l = new Ie(zn, Gn, t, e);
    l.layers = this.layers, this.add(l);
    const c = new Ie(zn, Gn, t, e);
    c.layers = this.layers, this.add(c);
  }
  /**
   * Must be called when the coordinate system of the cube camera is changed.
   */
  updateCoordinateSystem() {
    const t = this.coordinateSystem, e = this.children.concat(), [n, r, s, a, o, l] = e;
    for (const c of e) this.remove(c);
    if (t === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (t === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const c of e)
      this.add(c), c.updateMatrixWorld();
  }
  /**
   * Calling this method will render the given scene with the given renderer
   * into the cube render target of the camera.
   *
   * @param {(Renderer|WebGLRenderer)} renderer - The renderer.
   * @param {Scene} scene - The scene to render.
   */
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, l, c, h] = this.children, f = t.getRenderTarget(), u = t.getActiveCubeFace(), p = t.getActiveMipmapLevel(), _ = t.xr.enabled;
    t.xr.enabled = !1;
    const y = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1;
    let m = !1;
    t.isWebGLRenderer === !0 ? m = t.state.buffers.depth.getReversed() : m = t.reversedDepthBuffer, t.setRenderTarget(n, 0, r), m && t.autoClear === !1 && t.clearDepth(), t.render(e, s), t.setRenderTarget(n, 1, r), m && t.autoClear === !1 && t.clearDepth(), t.render(e, a), t.setRenderTarget(n, 2, r), m && t.autoClear === !1 && t.clearDepth(), t.render(e, o), t.setRenderTarget(n, 3, r), m && t.autoClear === !1 && t.clearDepth(), t.render(e, l), t.setRenderTarget(n, 4, r), m && t.autoClear === !1 && t.clearDepth(), t.render(e, c), n.texture.generateMipmaps = y, t.setRenderTarget(n, 5, r), m && t.autoClear === !1 && t.clearDepth(), t.render(e, h), t.setRenderTarget(f, u, p), t.xr.enabled = _, n.texture.needsPMREMUpdate = !0;
  }
}
class Tl extends Ie {
  /**
   * Constructs a new array camera.
   *
   * @param {Array<PerspectiveCamera>} [array=[]] - An array of perspective sub cameras.
   */
  constructor(t = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = t;
  }
}
const Xs = /* @__PURE__ */ new oe();
class Al {
  /**
   * Constructs a new raycaster.
   *
   * @param {Vector3} origin - The origin vector where the ray casts from.
   * @param {Vector3} direction - The (normalized) direction vector that gives direction to the ray.
   * @param {number} [near=0] - All results returned are further away than near. Near can't be negative.
   * @param {number} [far=Infinity] - All results returned are closer than far. Far can't be lower than near.
   */
  constructor(t, e, n = 0, r = 1 / 0) {
    this.ray = new Ea(t, e), this.near = n, this.far = r, this.camera = null, this.layers = new Wr(), this.params = {
      Mesh: {},
      Line: { threshold: 1 },
      LOD: {},
      Points: { threshold: 1 },
      Sprite: {}
    };
  }
  /**
   * Updates the ray with a new origin and direction by copying the values from the arguments.
   *
   * @param {Vector3} origin - The origin vector where the ray casts from.
   * @param {Vector3} direction - The (normalized) direction vector that gives direction to the ray.
   */
  set(t, e) {
    this.ray.set(t, e);
  }
  /**
   * Uses the given coordinates and camera to compute a new origin and direction for the internal ray.
   *
   * @param {Vector2} coords - 2D coordinates of the mouse, in normalized device coordinates (NDC).
   * X and Y components should be between `-1` and `1`.
   * @param {Camera} camera - The camera from which the ray should originate.
   */
  setFromCamera(t, e) {
    e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(t.x, t.y, 0.5).unproject(e).sub(this.ray.origin).normalize(), this.camera = e) : e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, e.projectionMatrix.elements[14]).unproject(e), this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld), this.camera = e) : Jt("Raycaster: Unsupported camera type: " + e.type);
  }
  /**
   * Uses the given WebXR controller to compute a new origin and direction for the internal ray.
   *
   * @param {WebXRController} controller - The controller to copy the position and direction from.
   * @return {Raycaster} A reference to this raycaster.
   */
  setFromXRController(t) {
    return Xs.identity().extractRotation(t.matrixWorld), this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Xs), this;
  }
  /**
   * The intersection point of a raycaster intersection test.
   * @typedef {Object} Raycaster~Intersection
   * @property {number} distance - The distance from the ray's origin to the intersection point.
   * @property {number} distanceToRay -  Some 3D objects e.g. {@link Points} provide the distance of the
   * intersection to the nearest point on the ray. For other objects it will be `undefined`.
   * @property {Vector3} point - The intersection point, in world coordinates.
   * @property {Object} face - The face that has been intersected.
   * @property {number} faceIndex - The face index.
   * @property {Object3D} object - The 3D object that has been intersected.
   * @property {Vector2} uv - U,V coordinates at point of intersection.
   * @property {Vector2} uv1 - Second set of U,V coordinates at point of intersection.
   * @property {Vector3} normal - Interpolated normal vector at point of intersection.
   * @property {number} instanceId - The index number of the instance where the ray
   * intersects the {@link InstancedMesh}.
   */
  /**
   * Checks all intersection between the ray and the object with or without the
   * descendants. Intersections are returned sorted by distance, closest first.
   *
   * `Raycaster` delegates to the `raycast()` method of the passed 3D object, when
   * evaluating whether the ray intersects the object or not. This allows meshes to respond
   * differently to ray casting than lines or points.
   *
   * Note that for meshes, faces must be pointed towards the origin of the ray in order
   * to be detected; intersections of the ray passing through the back of a face will not
   * be detected. To raycast against both faces of an object, you'll want to set  {@link Material#side}
   * to `THREE.DoubleSide`.
   *
   * @param {Object3D} object - The 3D object to check for intersection with the ray.
   * @param {boolean} [recursive=true] - If set to `true`, it also checks all descendants.
   * Otherwise it only checks intersection with the object.
   * @param {Array<Raycaster~Intersection>} [intersects=[]] The target array that holds the result of the method.
   * @return {Array<Raycaster~Intersection>} An array holding the intersection points.
   */
  intersectObject(t, e = !0, n = []) {
    return zr(t, this, n, e), n.sort(qs), n;
  }
  /**
   * Checks all intersection between the ray and the objects with or without
   * the descendants. Intersections are returned sorted by distance, closest first.
   *
   * @param {Array<Object3D>} objects - The 3D objects to check for intersection with the ray.
   * @param {boolean} [recursive=true] - If set to `true`, it also checks all descendants.
   * Otherwise it only checks intersection with the object.
   * @param {Array<Raycaster~Intersection>} [intersects=[]] The target array that holds the result of the method.
   * @return {Array<Raycaster~Intersection>} An array holding the intersection points.
   */
  intersectObjects(t, e = !0, n = []) {
    for (let r = 0, s = t.length; r < s; r++)
      zr(t[r], this, n, e);
    return n.sort(qs), n;
  }
}
function qs(i, t) {
  return i.distance - t.distance;
}
function zr(i, t, e, n) {
  let r = !0;
  if (i.layers.test(t.layers) && i.raycast(t, e) === !1 && (r = !1), r === !0 && n === !0) {
    const s = i.children;
    for (let a = 0, o = s.length; a < o; a++)
      zr(s[a], t, e, !0);
  }
}
const ns = class ns {
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
  constructor(t, e, n, r) {
    this.elements = [
      1,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, e, n, r);
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
  fromArray(t, e = 0) {
    for (let n = 0; n < 4; n++)
      this.elements[n] = t[n + e];
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
  set(t, e, n, r) {
    const s = this.elements;
    return s[0] = t, s[2] = e, s[1] = n, s[3] = r, this;
  }
};
ns.prototype.isMatrix2 = !0;
let Ys = ns;
function Zs(i, t, e, n) {
  const r = bl(n);
  switch (e) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case 1021:
      return i * t;
    case 1028:
      return i * t / r.components * r.byteLength;
    case 1029:
      return i * t / r.components * r.byteLength;
    case 1030:
      return i * t * 2 / r.components * r.byteLength;
    case 1031:
      return i * t * 2 / r.components * r.byteLength;
    case 1022:
      return i * t * 3 / r.components * r.byteLength;
    case 1023:
      return i * t * 4 / r.components * r.byteLength;
    case 1033:
      return i * t * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case 33776:
    case 33777:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case 33778:
    case 33779:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case 35841:
    case 35843:
      return Math.max(i, 16) * Math.max(t, 8) / 4;
    case 35840:
    case 35842:
      return Math.max(i, 8) * Math.max(t, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case 36196:
    case 37492:
    case 37488:
    case 37489:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case 37496:
    case 37490:
    case 37491:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case 37808:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case 37809:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case 37810:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case 37811:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case 37812:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case 37813:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case 37814:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case 37815:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case 37816:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case 37817:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case 37818:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case 37819:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case 37820:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case 37821:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case 36492:
    case 36494:
    case 36495:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case 36283:
    case 36284:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case 36285:
    case 36286:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${e} format.`
  );
}
function bl(i) {
  switch (i) {
    case 1009:
    case 1010:
      return { byteLength: 1, components: 1 };
    case 1012:
    case 1011:
    case 1016:
      return { byteLength: 2, components: 1 };
    case 1017:
    case 1018:
      return { byteLength: 2, components: 4 };
    case 1014:
    case 1013:
    case 1015:
      return { byteLength: 4, components: 1 };
    case 35902:
    case 35899:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: "185"
} }));
typeof window < "u" && (window.__THREE__ ? Ut("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "185");
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
function Ga() {
  let i = null, t = !1, e = null, n = null;
  function r(s, a) {
    e(s, a), n = i.requestAnimationFrame(r);
  }
  return {
    start: function() {
      t !== !0 && e !== null && i !== null && (n = i.requestAnimationFrame(r), t = !0);
    },
    stop: function() {
      i !== null && i.cancelAnimationFrame(n), t = !1;
    },
    setAnimationLoop: function(s) {
      e = s;
    },
    setContext: function(s) {
      i = s;
    }
  };
}
function Rl(i) {
  const t = /* @__PURE__ */ new WeakMap();
  function e(o, l) {
    const c = o.array, h = o.usage, f = c.byteLength, u = i.createBuffer();
    i.bindBuffer(l, u), i.bufferData(l, c, h), o.onUploadCallback();
    let p;
    if (c instanceof Float32Array)
      p = i.FLOAT;
    else if (typeof Float16Array < "u" && c instanceof Float16Array)
      p = i.HALF_FLOAT;
    else if (c instanceof Uint16Array)
      o.isFloat16BufferAttribute ? p = i.HALF_FLOAT : p = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      p = i.SHORT;
    else if (c instanceof Uint32Array)
      p = i.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      p = i.INT;
    else if (c instanceof Int8Array)
      p = i.BYTE;
    else if (c instanceof Uint8Array)
      p = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      p = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: u,
      type: p,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: f
    };
  }
  function n(o, l, c) {
    const h = l.array, f = l.updateRanges;
    if (i.bindBuffer(c, o), f.length === 0)
      i.bufferSubData(c, 0, h);
    else {
      f.sort((p, _) => p.start - _.start);
      let u = 0;
      for (let p = 1; p < f.length; p++) {
        const _ = f[u], y = f[p];
        y.start <= _.start + _.count + 1 ? _.count = Math.max(
          _.count,
          y.start + y.count - _.start
        ) : (++u, f[u] = y);
      }
      f.length = u + 1;
      for (let p = 0, _ = f.length; p < _; p++) {
        const y = f[p];
        i.bufferSubData(
          c,
          y.start * h.BYTES_PER_ELEMENT,
          h,
          y.start,
          y.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), t.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = t.get(o);
    l && (i.deleteBuffer(l.buffer), t.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const h = t.get(o);
      (!h || h.version < o.version) && t.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = t.get(o);
    if (c === void 0)
      t.set(o, e(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
var Cl = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, wl = `#ifdef USE_ALPHAHASH
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
#endif`, Pl = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, Ll = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Dl = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Il = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Fl = `#ifdef USE_AOMAP
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
#endif`, Nl = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, Ul = `#ifdef USE_BATCHING
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
#endif`, Ol = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Bl = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, zl = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Gl = `float G_BlinnPhong_Implicit( ) {
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
} // validated`, Vl = `#ifdef USE_IRIDESCENCE
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
#endif`, Hl = `#ifdef USE_BUMPMAP
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
#endif`, kl = `#if NUM_CLIPPING_PLANES > 0
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
#endif`, Wl = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Xl = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, ql = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Yl = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`, Zl = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`, Kl = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`, Jl = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`, $l = `#define PI 3.141592653589793
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
} // validated`, Ql = `#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`, jl = `vec3 transformedNormal = objectNormal;
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
#endif`, tc = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, ec = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, nc = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, ic = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, rc = "gl_FragColor = linearToOutputTexel( gl_FragColor );", sc = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, ac = `#ifdef USE_ENVMAP
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
#endif`, oc = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`, lc = `#ifdef USE_ENVMAP
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
#endif`, cc = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, uc = `#ifdef USE_ENVMAP
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
#endif`, hc = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, fc = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, dc = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, pc = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, mc = `#ifdef USE_GRADIENTMAP
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
}`, gc = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, _c = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, xc = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, vc = `uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`, Mc = `#ifdef USE_ENVMAP
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
#endif`, Sc = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, yc = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Ec = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Tc = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Ac = `PhysicalMaterial material;
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
#endif`, bc = `uniform sampler2D dfgLUT;
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
}`, Rc = `
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
#endif`, Cc = `#if defined( RE_IndirectDiffuse )
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
#endif`, wc = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Pc = `#ifdef USE_LIGHT_PROBES_GRID
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
#endif`, Lc = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Dc = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Ic = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Fc = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Nc = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Uc = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Oc = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`, Bc = `#if defined( USE_POINTS_UV )
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
#endif`, zc = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Gc = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Vc = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Hc = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, kc = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Wc = `#ifdef USE_MORPHTARGETS
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
#endif`, Xc = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, qc = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`, Yc = `#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`, Zc = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Kc = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Jc = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`, $c = `#ifdef USE_NORMALMAP
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
#endif`, Qc = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, jc = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, tu = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, eu = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, nu = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, iu = `vec3 packNormalToRGB( const in vec3 normal ) {
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
}`, ru = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, su = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, au = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, ou = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, lu = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, cu = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, uu = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, hu = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, fu = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`, du = `float getShadowMask() {
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
}`, pu = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, mu = `#ifdef USE_SKINNING
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
#endif`, gu = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, _u = `#ifdef USE_SKINNING
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
#endif`, xu = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, vu = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Mu = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Su = `#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`, yu = `#ifdef USE_TRANSMISSION
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
#endif`, Eu = `#ifdef USE_TRANSMISSION
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
#endif`, Tu = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Au = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, bu = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Ru = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Cu = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, wu = `uniform sampler2D t2D;
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
}`, Pu = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Lu = `#ifdef ENVMAP_TYPE_CUBE
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
}`, Du = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Iu = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Fu = `#include <common>
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
}`, Nu = `#if DEPTH_PACKING == 3200
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
}`, Uu = `#define DISTANCE
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
}`, Ou = `#define DISTANCE
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
}`, Bu = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, zu = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Gu = `uniform float scale;
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
}`, Vu = `uniform vec3 diffuse;
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
}`, Hu = `#include <common>
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
}`, ku = `uniform vec3 diffuse;
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
}`, Wu = `#define LAMBERT
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
}`, Xu = `#define LAMBERT
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
}`, qu = `#define MATCAP
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
}`, Yu = `#define MATCAP
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
}`, Zu = `#define NORMAL
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
}`, Ku = `#define NORMAL
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
}`, Ju = `#define PHONG
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
}`, $u = `#define PHONG
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
}`, Qu = `#define STANDARD
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
}`, ju = `#define STANDARD
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
}`, th = `#define TOON
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
}`, eh = `#define TOON
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
}`, nh = `uniform float size;
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
}`, ih = `uniform vec3 diffuse;
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
}`, rh = `#include <common>
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
}`, sh = `uniform vec3 color;
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
}`, ah = `uniform float rotation;
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
}`, oh = `uniform vec3 diffuse;
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
}`, Wt = {
  alphahash_fragment: Cl,
  alphahash_pars_fragment: wl,
  alphamap_fragment: Pl,
  alphamap_pars_fragment: Ll,
  alphatest_fragment: Dl,
  alphatest_pars_fragment: Il,
  aomap_fragment: Fl,
  aomap_pars_fragment: Nl,
  batching_pars_vertex: Ul,
  batching_vertex: Ol,
  begin_vertex: Bl,
  beginnormal_vertex: zl,
  bsdfs: Gl,
  iridescence_fragment: Vl,
  bumpmap_pars_fragment: Hl,
  clipping_planes_fragment: kl,
  clipping_planes_pars_fragment: Wl,
  clipping_planes_pars_vertex: Xl,
  clipping_planes_vertex: ql,
  color_fragment: Yl,
  color_pars_fragment: Zl,
  color_pars_vertex: Kl,
  color_vertex: Jl,
  common: $l,
  cube_uv_reflection_fragment: Ql,
  defaultnormal_vertex: jl,
  displacementmap_pars_vertex: tc,
  displacementmap_vertex: ec,
  emissivemap_fragment: nc,
  emissivemap_pars_fragment: ic,
  colorspace_fragment: rc,
  colorspace_pars_fragment: sc,
  envmap_fragment: ac,
  envmap_common_pars_fragment: oc,
  envmap_pars_fragment: lc,
  envmap_pars_vertex: cc,
  envmap_physical_pars_fragment: Mc,
  envmap_vertex: uc,
  fog_vertex: hc,
  fog_pars_vertex: fc,
  fog_fragment: dc,
  fog_pars_fragment: pc,
  gradientmap_pars_fragment: mc,
  lightmap_pars_fragment: gc,
  lights_lambert_fragment: _c,
  lights_lambert_pars_fragment: xc,
  lights_pars_begin: vc,
  lights_toon_fragment: Sc,
  lights_toon_pars_fragment: yc,
  lights_phong_fragment: Ec,
  lights_phong_pars_fragment: Tc,
  lights_physical_fragment: Ac,
  lights_physical_pars_fragment: bc,
  lights_fragment_begin: Rc,
  lights_fragment_maps: Cc,
  lights_fragment_end: wc,
  lightprobes_pars_fragment: Pc,
  logdepthbuf_fragment: Lc,
  logdepthbuf_pars_fragment: Dc,
  logdepthbuf_pars_vertex: Ic,
  logdepthbuf_vertex: Fc,
  map_fragment: Nc,
  map_pars_fragment: Uc,
  map_particle_fragment: Oc,
  map_particle_pars_fragment: Bc,
  metalnessmap_fragment: zc,
  metalnessmap_pars_fragment: Gc,
  morphinstance_vertex: Vc,
  morphcolor_vertex: Hc,
  morphnormal_vertex: kc,
  morphtarget_pars_vertex: Wc,
  morphtarget_vertex: Xc,
  normal_fragment_begin: qc,
  normal_fragment_maps: Yc,
  normal_pars_fragment: Zc,
  normal_pars_vertex: Kc,
  normal_vertex: Jc,
  normalmap_pars_fragment: $c,
  clearcoat_normal_fragment_begin: Qc,
  clearcoat_normal_fragment_maps: jc,
  clearcoat_pars_fragment: tu,
  iridescence_pars_fragment: eu,
  opaque_fragment: nu,
  packing: iu,
  premultiplied_alpha_fragment: ru,
  project_vertex: su,
  dithering_fragment: au,
  dithering_pars_fragment: ou,
  roughnessmap_fragment: lu,
  roughnessmap_pars_fragment: cu,
  shadowmap_pars_fragment: uu,
  shadowmap_pars_vertex: hu,
  shadowmap_vertex: fu,
  shadowmask_pars_fragment: du,
  skinbase_vertex: pu,
  skinning_pars_vertex: mu,
  skinning_vertex: gu,
  skinnormal_vertex: _u,
  specularmap_fragment: xu,
  specularmap_pars_fragment: vu,
  tonemapping_fragment: Mu,
  tonemapping_pars_fragment: Su,
  transmission_fragment: yu,
  transmission_pars_fragment: Eu,
  uv_pars_fragment: Tu,
  uv_pars_vertex: Au,
  uv_vertex: bu,
  worldpos_vertex: Ru,
  background_vert: Cu,
  background_frag: wu,
  backgroundCube_vert: Pu,
  backgroundCube_frag: Lu,
  cube_vert: Du,
  cube_frag: Iu,
  depth_vert: Fu,
  depth_frag: Nu,
  distance_vert: Uu,
  distance_frag: Ou,
  equirect_vert: Bu,
  equirect_frag: zu,
  linedashed_vert: Gu,
  linedashed_frag: Vu,
  meshbasic_vert: Hu,
  meshbasic_frag: ku,
  meshlambert_vert: Wu,
  meshlambert_frag: Xu,
  meshmatcap_vert: qu,
  meshmatcap_frag: Yu,
  meshnormal_vert: Zu,
  meshnormal_frag: Ku,
  meshphong_vert: Ju,
  meshphong_frag: $u,
  meshphysical_vert: Qu,
  meshphysical_frag: ju,
  meshtoon_vert: th,
  meshtoon_frag: eh,
  points_vert: nh,
  points_frag: ih,
  shadow_vert: rh,
  shadow_frag: sh,
  sprite_vert: ah,
  sprite_frag: oh
}, gt = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Yt(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Vt() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Vt() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Vt() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Vt() },
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
    aoMapTransform: { value: /* @__PURE__ */ new Vt() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Vt() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Vt() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Vt() },
    normalScale: { value: /* @__PURE__ */ new ut(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Vt() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Vt() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Vt() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Vt() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Yt(16777215) }
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
    probesMin: { value: /* @__PURE__ */ new N() },
    probesMax: { value: /* @__PURE__ */ new N() },
    probesResolution: { value: /* @__PURE__ */ new N() }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Yt(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Vt() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Vt() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Yt(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new ut(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Vt() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Vt() },
    alphaTest: { value: 0 }
  }
}, Ke = {
  basic: {
    uniforms: /* @__PURE__ */ be([
      gt.common,
      gt.specularmap,
      gt.envmap,
      gt.aomap,
      gt.lightmap,
      gt.fog
    ]),
    vertexShader: Wt.meshbasic_vert,
    fragmentShader: Wt.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ be([
      gt.common,
      gt.specularmap,
      gt.envmap,
      gt.aomap,
      gt.lightmap,
      gt.emissivemap,
      gt.bumpmap,
      gt.normalmap,
      gt.displacementmap,
      gt.fog,
      gt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Yt(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Wt.meshlambert_vert,
    fragmentShader: Wt.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ be([
      gt.common,
      gt.specularmap,
      gt.envmap,
      gt.aomap,
      gt.lightmap,
      gt.emissivemap,
      gt.bumpmap,
      gt.normalmap,
      gt.displacementmap,
      gt.fog,
      gt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Yt(0) },
        specular: { value: /* @__PURE__ */ new Yt(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Wt.meshphong_vert,
    fragmentShader: Wt.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ be([
      gt.common,
      gt.envmap,
      gt.aomap,
      gt.lightmap,
      gt.emissivemap,
      gt.bumpmap,
      gt.normalmap,
      gt.displacementmap,
      gt.roughnessmap,
      gt.metalnessmap,
      gt.fog,
      gt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Yt(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Wt.meshphysical_vert,
    fragmentShader: Wt.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ be([
      gt.common,
      gt.aomap,
      gt.lightmap,
      gt.emissivemap,
      gt.bumpmap,
      gt.normalmap,
      gt.displacementmap,
      gt.gradientmap,
      gt.fog,
      gt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Yt(0) }
      }
    ]),
    vertexShader: Wt.meshtoon_vert,
    fragmentShader: Wt.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ be([
      gt.common,
      gt.bumpmap,
      gt.normalmap,
      gt.displacementmap,
      gt.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Wt.meshmatcap_vert,
    fragmentShader: Wt.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ be([
      gt.points,
      gt.fog
    ]),
    vertexShader: Wt.points_vert,
    fragmentShader: Wt.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ be([
      gt.common,
      gt.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Wt.linedashed_vert,
    fragmentShader: Wt.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ be([
      gt.common,
      gt.displacementmap
    ]),
    vertexShader: Wt.depth_vert,
    fragmentShader: Wt.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ be([
      gt.common,
      gt.bumpmap,
      gt.normalmap,
      gt.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Wt.meshnormal_vert,
    fragmentShader: Wt.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ be([
      gt.sprite,
      gt.fog
    ]),
    vertexShader: Wt.sprite_vert,
    fragmentShader: Wt.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Vt() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Wt.background_vert,
    fragmentShader: Wt.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Vt() }
    },
    vertexShader: Wt.backgroundCube_vert,
    fragmentShader: Wt.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Wt.cube_vert,
    fragmentShader: Wt.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Wt.equirect_vert,
    fragmentShader: Wt.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ be([
      gt.common,
      gt.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new N() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Wt.distance_vert,
    fragmentShader: Wt.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ be([
      gt.lights,
      gt.fog,
      {
        color: { value: /* @__PURE__ */ new Yt(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Wt.shadow_vert,
    fragmentShader: Wt.shadow_frag
  }
};
Ke.physical = {
  uniforms: /* @__PURE__ */ be([
    Ke.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Vt() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Vt() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new ut(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Vt() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Vt() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Vt() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Yt(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Vt() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Vt() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Vt() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new ut() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Vt() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Yt(0) },
      specularColor: { value: /* @__PURE__ */ new Yt(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Vt() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Vt() },
      anisotropyVector: { value: /* @__PURE__ */ new ut() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Vt() }
    }
  ]),
  vertexShader: Wt.meshphysical_vert,
  fragmentShader: Wt.meshphysical_frag
};
const ki = { r: 0, b: 0, g: 0 }, lh = /* @__PURE__ */ new oe(), Va = /* @__PURE__ */ new Vt();
Va.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function ch(i, t, e, n, r, s) {
  const a = new Yt(0);
  let o = r === !0 ? 0 : 1, l, c, h = null, f = 0, u = null;
  function p(b) {
    let A = b.isScene === !0 ? b.background : null;
    if (A && A.isTexture) {
      const M = b.backgroundBlurriness > 0;
      A = t.get(A, M);
    }
    return A;
  }
  function _(b) {
    let A = !1;
    const M = p(b);
    M === null ? m(a, o) : M && M.isColor && (m(M, 1), A = !0);
    const R = i.xr.getEnvironmentBlendMode();
    R === "additive" ? e.buffers.color.setClear(0, 0, 0, 1, s) : R === "alpha-blend" && e.buffers.color.setClear(0, 0, 0, 0, s), (i.autoClear || A) && (e.buffers.depth.setTest(!0), e.buffers.depth.setMask(!0), e.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function y(b, A) {
    const M = p(A);
    M && (M.isCubeTexture || M.mapping === 306) ? (c === void 0 && (c = new pe(
      new Qn(1, 1, 1),
      new He({
        name: "BackgroundCubeMaterial",
        uniforms: Zn(Ke.backgroundCube.uniforms),
        vertexShader: Ke.backgroundCube.vertexShader,
        fragmentShader: Ke.backgroundCube.fragmentShader,
        side: 1,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), c.geometry.deleteAttribute("normal"), c.geometry.deleteAttribute("uv"), c.onBeforeRender = function(R, T, C) {
      this.matrixWorld.copyPosition(C.matrixWorld);
    }, Object.defineProperty(c.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), n.update(c)), c.material.uniforms.envMap.value = M, c.material.uniforms.backgroundBlurriness.value = A.backgroundBlurriness, c.material.uniforms.backgroundIntensity.value = A.backgroundIntensity, c.material.uniforms.backgroundRotation.value.setFromMatrix4(lh.makeRotationFromEuler(A.backgroundRotation)).transpose(), M.isCubeTexture && M.isRenderTargetTexture === !1 && c.material.uniforms.backgroundRotation.value.premultiply(Va), c.material.toneMapped = $t.getTransfer(M.colorSpace) !== ee, (h !== M || f !== M.version || u !== i.toneMapping) && (c.material.needsUpdate = !0, h = M, f = M.version, u = i.toneMapping), c.layers.enableAll(), b.unshift(c, c.geometry, c.material, 0, 0, null)) : M && M.isTexture && (l === void 0 && (l = new pe(
      new xi(2, 2),
      new He({
        name: "BackgroundMaterial",
        uniforms: Zn(Ke.background.uniforms),
        vertexShader: Ke.background.vertexShader,
        fragmentShader: Ke.background.fragmentShader,
        side: 0,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), n.update(l)), l.material.uniforms.t2D.value = M, l.material.uniforms.backgroundIntensity.value = A.backgroundIntensity, l.material.toneMapped = $t.getTransfer(M.colorSpace) !== ee, M.matrixAutoUpdate === !0 && M.updateMatrix(), l.material.uniforms.uvTransform.value.copy(M.matrix), (h !== M || f !== M.version || u !== i.toneMapping) && (l.material.needsUpdate = !0, h = M, f = M.version, u = i.toneMapping), l.layers.enableAll(), b.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function m(b, A) {
    b.getRGB(ki, Oa(i)), e.buffers.color.setClear(ki.r, ki.g, ki.b, A, s);
  }
  function d() {
    c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0), l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(b, A = 1) {
      a.set(b), o = A, m(a, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(b) {
      o = b, m(a, o);
    },
    render: _,
    addToRenderList: y,
    dispose: d
  };
}
function uh(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = u(null);
  let s = r, a = !1;
  function o(w, B, q, $, D) {
    let k = !1;
    const U = f(w, $, q, B);
    s !== U && (s = U, c(s.object)), k = p(w, $, q, D), k && _(w, $, q, D), D !== null && t.update(D, i.ELEMENT_ARRAY_BUFFER), (k || a) && (a = !1, M(w, B, q, $), D !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(D).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(w) {
    return i.bindVertexArray(w);
  }
  function h(w) {
    return i.deleteVertexArray(w);
  }
  function f(w, B, q, $) {
    const D = $.wireframe === !0;
    let k = n[B.id];
    k === void 0 && (k = {}, n[B.id] = k);
    const U = w.isInstancedMesh === !0 ? w.id : 0;
    let Y = k[U];
    Y === void 0 && (Y = {}, k[U] = Y);
    let tt = Y[q.id];
    tt === void 0 && (tt = {}, Y[q.id] = tt);
    let st = tt[D];
    return st === void 0 && (st = u(l()), tt[D] = st), st;
  }
  function u(w) {
    const B = [], q = [], $ = [];
    for (let D = 0; D < e; D++)
      B[D] = 0, q[D] = 0, $[D] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: B,
      enabledAttributes: q,
      attributeDivisors: $,
      object: w,
      attributes: {},
      index: null
    };
  }
  function p(w, B, q, $) {
    const D = s.attributes, k = B.attributes;
    let U = 0;
    const Y = q.getAttributes();
    for (const tt in Y)
      if (Y[tt].location >= 0) {
        const ot = D[tt];
        let St = k[tt];
        if (St === void 0 && (tt === "instanceMatrix" && w.instanceMatrix && (St = w.instanceMatrix), tt === "instanceColor" && w.instanceColor && (St = w.instanceColor)), ot === void 0 || ot.attribute !== St || St && ot.data !== St.data) return !0;
        U++;
      }
    return s.attributesNum !== U || s.index !== $;
  }
  function _(w, B, q, $) {
    const D = {}, k = B.attributes;
    let U = 0;
    const Y = q.getAttributes();
    for (const tt in Y)
      if (Y[tt].location >= 0) {
        let ot = k[tt];
        ot === void 0 && (tt === "instanceMatrix" && w.instanceMatrix && (ot = w.instanceMatrix), tt === "instanceColor" && w.instanceColor && (ot = w.instanceColor));
        const St = {};
        St.attribute = ot, ot && ot.data && (St.data = ot.data), D[tt] = St, U++;
      }
    s.attributes = D, s.attributesNum = U, s.index = $;
  }
  function y() {
    const w = s.newAttributes;
    for (let B = 0, q = w.length; B < q; B++)
      w[B] = 0;
  }
  function m(w) {
    d(w, 0);
  }
  function d(w, B) {
    const q = s.newAttributes, $ = s.enabledAttributes, D = s.attributeDivisors;
    q[w] = 1, $[w] === 0 && (i.enableVertexAttribArray(w), $[w] = 1), D[w] !== B && (i.vertexAttribDivisor(w, B), D[w] = B);
  }
  function b() {
    const w = s.newAttributes, B = s.enabledAttributes;
    for (let q = 0, $ = B.length; q < $; q++)
      B[q] !== w[q] && (i.disableVertexAttribArray(q), B[q] = 0);
  }
  function A(w, B, q, $, D, k, U) {
    U === !0 ? i.vertexAttribIPointer(w, B, q, D, k) : i.vertexAttribPointer(w, B, q, $, D, k);
  }
  function M(w, B, q, $) {
    y();
    const D = $.attributes, k = q.getAttributes(), U = B.defaultAttributeValues;
    for (const Y in k) {
      const tt = k[Y];
      if (tt.location >= 0) {
        let st = D[Y];
        if (st === void 0 && (Y === "instanceMatrix" && w.instanceMatrix && (st = w.instanceMatrix), Y === "instanceColor" && w.instanceColor && (st = w.instanceColor)), st !== void 0) {
          const ot = st.normalized, St = st.itemSize, Xt = t.get(st);
          if (Xt === void 0) continue;
          const re = Xt.buffer, Qt = Xt.type, K = Xt.bytesPerElement, lt = Qt === i.INT || Qt === i.UNSIGNED_INT || st.gpuType === 1013;
          if (st.isInterleavedBufferAttribute) {
            const it = st.data, Pt = it.stride, Ot = st.offset;
            if (it.isInstancedInterleavedBuffer) {
              for (let It = 0; It < tt.locationSize; It++)
                d(tt.location + It, it.meshPerAttribute);
              w.isInstancedMesh !== !0 && $._maxInstanceCount === void 0 && ($._maxInstanceCount = it.meshPerAttribute * it.count);
            } else
              for (let It = 0; It < tt.locationSize; It++)
                m(tt.location + It);
            i.bindBuffer(i.ARRAY_BUFFER, re);
            for (let It = 0; It < tt.locationSize; It++)
              A(
                tt.location + It,
                St / tt.locationSize,
                Qt,
                ot,
                Pt * K,
                (Ot + St / tt.locationSize * It) * K,
                lt
              );
          } else {
            if (st.isInstancedBufferAttribute) {
              for (let it = 0; it < tt.locationSize; it++)
                d(tt.location + it, st.meshPerAttribute);
              w.isInstancedMesh !== !0 && $._maxInstanceCount === void 0 && ($._maxInstanceCount = st.meshPerAttribute * st.count);
            } else
              for (let it = 0; it < tt.locationSize; it++)
                m(tt.location + it);
            i.bindBuffer(i.ARRAY_BUFFER, re);
            for (let it = 0; it < tt.locationSize; it++)
              A(
                tt.location + it,
                St / tt.locationSize,
                Qt,
                ot,
                St * K,
                St / tt.locationSize * it * K,
                lt
              );
          }
        } else if (U !== void 0) {
          const ot = U[Y];
          if (ot !== void 0)
            switch (ot.length) {
              case 2:
                i.vertexAttrib2fv(tt.location, ot);
                break;
              case 3:
                i.vertexAttrib3fv(tt.location, ot);
                break;
              case 4:
                i.vertexAttrib4fv(tt.location, ot);
                break;
              default:
                i.vertexAttrib1fv(tt.location, ot);
            }
        }
      }
    }
    b();
  }
  function R() {
    E();
    for (const w in n) {
      const B = n[w];
      for (const q in B) {
        const $ = B[q];
        for (const D in $) {
          const k = $[D];
          for (const U in k)
            h(k[U].object), delete k[U];
          delete $[D];
        }
      }
      delete n[w];
    }
  }
  function T(w) {
    if (n[w.id] === void 0) return;
    const B = n[w.id];
    for (const q in B) {
      const $ = B[q];
      for (const D in $) {
        const k = $[D];
        for (const U in k)
          h(k[U].object), delete k[U];
        delete $[D];
      }
    }
    delete n[w.id];
  }
  function C(w) {
    for (const B in n) {
      const q = n[B];
      for (const $ in q) {
        const D = q[$];
        if (D[w.id] === void 0) continue;
        const k = D[w.id];
        for (const U in k)
          h(k[U].object), delete k[U];
        delete D[w.id];
      }
    }
  }
  function x(w) {
    for (const B in n) {
      const q = n[B], $ = w.isInstancedMesh === !0 ? w.id : 0, D = q[$];
      if (D !== void 0) {
        for (const k in D) {
          const U = D[k];
          for (const Y in U)
            h(U[Y].object), delete U[Y];
          delete D[k];
        }
        delete q[$], Object.keys(q).length === 0 && delete n[B];
      }
    }
  }
  function E() {
    P(), a = !0, s !== r && (s = r, c(s.object));
  }
  function P() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: E,
    resetDefaultState: P,
    dispose: R,
    releaseStatesOfGeometry: T,
    releaseStatesOfObject: x,
    releaseStatesOfProgram: C,
    initAttributes: y,
    enableAttribute: m,
    disableUnusedAttributes: b
  };
}
function hh(i, t, e) {
  let n;
  function r(l) {
    n = l;
  }
  function s(l, c) {
    i.drawArrays(n, l, c), e.update(c, n, 1);
  }
  function a(l, c, h) {
    h !== 0 && (i.drawArraysInstanced(n, l, c, h), e.update(c, n, h));
  }
  function o(l, c, h) {
    if (h === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, l, 0, c, 0, h);
    let u = 0;
    for (let p = 0; p < h; p++)
      u += c[p];
    e.update(u, n, 1);
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o;
}
function fh(i, t, e, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const C = t.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function a(C) {
    return !(C !== 1023 && n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(C) {
    const x = C === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(C !== 1009 && n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    C !== 1015 && !x);
  }
  function l(C) {
    if (C === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      C = "mediump";
    }
    return C === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = e.precision !== void 0 ? e.precision : "highp";
  const h = l(c);
  h !== c && (Ut("WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const f = e.logarithmicDepthBuffer === !0, u = e.reversedDepthBuffer === !0 && t.has("EXT_clip_control");
  e.reversedDepthBuffer === !0 && u === !1 && Ut("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  const p = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), y = i.getParameter(i.MAX_TEXTURE_SIZE), m = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), d = i.getParameter(i.MAX_VERTEX_ATTRIBS), b = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), A = i.getParameter(i.MAX_VARYING_VECTORS), M = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), R = i.getParameter(i.MAX_SAMPLES), T = i.getParameter(i.SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: c,
    logarithmicDepthBuffer: f,
    reversedDepthBuffer: u,
    maxTextures: p,
    maxVertexTextures: _,
    maxTextureSize: y,
    maxCubemapSize: m,
    maxAttributes: d,
    maxVertexUniforms: b,
    maxVaryings: A,
    maxFragmentUniforms: M,
    maxSamples: R,
    samples: T
  };
}
function dh(i) {
  const t = this;
  let e = null, n = 0, r = !1, s = !1;
  const a = new Sn(), o = new Vt(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, u) {
    const p = f.length !== 0 || u || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = u, n = f.length, p;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(f, u) {
    e = h(f, u, 0);
  }, this.setState = function(f, u, p) {
    const _ = f.clippingPlanes, y = f.clipIntersection, m = f.clipShadows, d = i.get(f);
    if (!r || _ === null || _.length === 0 || s && !m)
      s ? h(null) : c();
    else {
      const b = s ? 0 : n, A = b * 4;
      let M = d.clippingState || null;
      l.value = M, M = h(_, u, A, p);
      for (let R = 0; R !== A; ++R)
        M[R] = e[R];
      d.clippingState = M, this.numIntersection = y ? this.numPlanes : 0, this.numPlanes += b;
    }
  };
  function c() {
    l.value !== e && (l.value = e, l.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function h(f, u, p, _) {
    const y = f !== null ? f.length : 0;
    let m = null;
    if (y !== 0) {
      if (m = l.value, _ !== !0 || m === null) {
        const d = p + y * 4, b = u.matrixWorldInverse;
        o.getNormalMatrix(b), (m === null || m.length < d) && (m = new Float32Array(d));
        for (let A = 0, M = p; A !== y; ++A, M += 4)
          a.copy(f[A]).applyMatrix4(b, o), a.normal.toArray(m, M), m[M + 3] = a.constant;
      }
      l.value = m, l.needsUpdate = !0;
    }
    return t.numPlanes = y, t.numIntersection = 0, m;
  }
}
const mn = 4, Ks = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], yn = 20, ph = 256, oi = /* @__PURE__ */ new $r(), Js = /* @__PURE__ */ new Yt();
let wr = null, Pr = 0, Lr = 0, Dr = !1;
const mh = /* @__PURE__ */ new N();
class Gr {
  /**
   * Constructs a new PMREM generator.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  constructor(t) {
    this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
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
  fromScene(t, e = 0, n = 0.1, r = 100, s = {}) {
    const {
      size: a = 256,
      position: o = mh
    } = s;
    wr = this._renderer.getRenderTarget(), Pr = this._renderer.getActiveCubeFace(), Lr = this._renderer.getActiveMipmapLevel(), Dr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
    const l = this._allocateTargets();
    return l.depthBuffer = !0, this._sceneToCubeUV(t, n, r, l, o), e > 0 && this._blur(l, 0, 0, e), this._applyPMREM(l), this._cleanup(l), l;
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
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e);
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
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = js(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Qs(), this._compileMaterial(this._equirectMaterial));
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
  _setSize(t) {
    this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let t = 0; t < this._lodMeshes.length; t++)
      this._lodMeshes[t].geometry.dispose();
  }
  _cleanup(t) {
    this._renderer.setRenderTarget(wr, Pr, Lr), this._renderer.xr.enabled = Dr, t.scissorTest = !1, Vn(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === 301 || t.mapping === 302 ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), wr = this._renderer.getRenderTarget(), Pr = this._renderer.getActiveCubeFace(), Lr = this._renderer.getActiveMipmapLevel(), Dr = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = {
      magFilter: 1006,
      minFilter: 1006,
      generateMipmaps: !1,
      type: 1016,
      format: 1023,
      colorSpace: qi,
      depthBuffer: !1
    }, r = $s(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = $s(t, e, n);
      const { _lodMax: s } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = gh(s)), this._blurMaterial = xh(s, t, e), this._ggxMaterial = _h(s, t, e);
    }
    return r;
  }
  _compileMaterial(t) {
    const e = new pe(new ke(), t);
    this._renderer.compile(e, oi);
  }
  _sceneToCubeUV(t, e, n, r, s) {
    const l = new Ie(90, 1, e, n), c = [1, -1, 1, 1, 1, 1], h = [1, 1, 1, -1, -1, -1], f = this._renderer, u = f.autoClear, p = f.toneMapping;
    f.getClearColor(Js), f.toneMapping = 0, f.autoClear = !1, f.state.buffers.depth.getReversed() && (f.setRenderTarget(r), f.clearDepth(), f.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new pe(
      new Qn(),
      new Ta({
        name: "PMREM.Background",
        side: 1,
        depthWrite: !1,
        depthTest: !1
      })
    ));
    const y = this._backgroundBox, m = y.material;
    let d = !1;
    const b = t.background;
    b ? b.isColor && (m.color.copy(b), t.background = null, d = !0) : (m.color.copy(Js), d = !0);
    for (let A = 0; A < 6; A++) {
      const M = A % 3;
      M === 0 ? (l.up.set(0, c[A], 0), l.position.set(s.x, s.y, s.z), l.lookAt(s.x + h[A], s.y, s.z)) : M === 1 ? (l.up.set(0, 0, c[A]), l.position.set(s.x, s.y, s.z), l.lookAt(s.x, s.y + h[A], s.z)) : (l.up.set(0, c[A], 0), l.position.set(s.x, s.y, s.z), l.lookAt(s.x, s.y, s.z + h[A]));
      const R = this._cubeSize;
      Vn(r, M * R, A > 2 ? R : 0, R, R), f.setRenderTarget(r), d && f.render(y, l), f.render(t, l);
    }
    f.toneMapping = p, f.autoClear = u, t.background = b;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer, r = t.mapping === 301 || t.mapping === 302;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = js()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Qs());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0];
    a.material = s;
    const o = s.uniforms;
    o.envMap.value = t;
    const l = this._cubeSize;
    Vn(e, 0, 0, 3 * l, 2 * l), n.setRenderTarget(e), n.render(a, oi);
  }
  _applyPMREM(t) {
    const e = this._renderer, n = e.autoClear;
    e.autoClear = !1;
    const r = this._lodMeshes.length;
    for (let s = 1; s < r; s++)
      this._applyGGXFilter(t, s - 1, s);
    e.autoClear = n;
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
  _applyGGXFilter(t, e, n) {
    const r = this._renderer, s = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[n];
    o.material = a;
    const l = a.uniforms, c = n / (this._lodMeshes.length - 1), h = e / (this._lodMeshes.length - 1), f = Math.sqrt(c * c - h * h), u = 0 + c * 1.25, p = f * u, { _lodMax: _ } = this, y = this._sizeLods[n], m = 3 * y * (n > _ - mn ? n - _ + mn : 0), d = 4 * (this._cubeSize - y);
    l.envMap.value = t.texture, l.roughness.value = p, l.mipInt.value = _ - e, Vn(s, m, d, 3 * y, 2 * y), r.setRenderTarget(s), r.render(o, oi), l.envMap.value = s.texture, l.roughness.value = 0, l.mipInt.value = _ - n, Vn(t, m, d, 3 * y, 2 * y), r.setRenderTarget(t), r.render(o, oi);
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
  _blur(t, e, n, r, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      t,
      a,
      e,
      n,
      r,
      "latitudinal",
      s
    ), this._halfBlur(
      a,
      t,
      n,
      n,
      r,
      "longitudinal",
      s
    );
  }
  _halfBlur(t, e, n, r, s, a, o) {
    const l = this._renderer, c = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && Jt(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, f = this._lodMeshes[r];
    f.material = c;
    const u = c.uniforms, p = this._sizeLods[n] - 1, _ = isFinite(s) ? Math.PI / (2 * p) : 2 * Math.PI / (2 * yn - 1), y = s / _, m = isFinite(s) ? 1 + Math.floor(h * y) : yn;
    m > yn && Ut(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${yn}`);
    const d = [];
    let b = 0;
    for (let C = 0; C < yn; ++C) {
      const x = C / y, E = Math.exp(-x * x / 2);
      d.push(E), C === 0 ? b += E : C < m && (b += 2 * E);
    }
    for (let C = 0; C < d.length; C++)
      d[C] = d[C] / b;
    u.envMap.value = t.texture, u.samples.value = m, u.weights.value = d, u.latitudinal.value = a === "latitudinal", o && (u.poleAxis.value = o);
    const { _lodMax: A } = this;
    u.dTheta.value = _, u.mipInt.value = A - n;
    const M = this._sizeLods[r], R = 3 * M * (r > A - mn ? r - A + mn : 0), T = 4 * (this._cubeSize - M);
    Vn(e, R, T, 3 * M, 2 * M), l.setRenderTarget(e), l.render(f, oi);
  }
}
function gh(i) {
  const t = [], e = [], n = [];
  let r = i;
  const s = i - mn + 1 + Ks.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    t.push(o);
    let l = 1 / o;
    a > i - mn ? l = Ks[a - i + mn - 1] : a === 0 && (l = 0), e.push(l);
    const c = 1 / (o - 2), h = -c, f = 1 + c, u = [h, h, f, h, f, f, h, h, f, f, h, f], p = 6, _ = 6, y = 3, m = 2, d = 1, b = new Float32Array(y * _ * p), A = new Float32Array(m * _ * p), M = new Float32Array(d * _ * p);
    for (let T = 0; T < p; T++) {
      const C = T % 3 * 2 / 3 - 1, x = T > 2 ? 0 : -1, E = [
        C,
        x,
        0,
        C + 2 / 3,
        x,
        0,
        C + 2 / 3,
        x + 1,
        0,
        C,
        x,
        0,
        C + 2 / 3,
        x + 1,
        0,
        C,
        x + 1,
        0
      ];
      b.set(E, y * _ * T), A.set(u, m * _ * T);
      const P = [T, T, T, T, T, T];
      M.set(P, d * _ * T);
    }
    const R = new ke();
    R.setAttribute("position", new Ve(b, y)), R.setAttribute("uv", new Ve(A, m)), R.setAttribute("faceIndex", new Ve(M, d)), n.push(new pe(R, null)), r > mn && r--;
  }
  return { lodMeshes: n, sizeLods: t, sigmas: e };
}
function $s(i, t, e) {
  const n = new Je(i, t, e);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function Vn(i, t, e, n, r) {
  i.viewport.set(t, e, n, r), i.scissor.set(t, e, n, r);
}
function _h(i, t, e) {
  return new He({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: ph,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / e,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: $i(),
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
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function xh(i, t, e) {
  const n = new Float32Array(yn), r = new N(0, 1, 0);
  return new He({
    name: "SphericalGaussianBlur",
    defines: {
      n: yn,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / e,
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
    vertexShader: $i(),
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
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Qs() {
  return new He({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: $i(),
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
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function js() {
  return new He({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: $i(),
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
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function $i() {
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
class Ha extends Je {
  /**
   * Constructs a new cube render target.
   *
   * @param {number} [size=1] - The size of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(t = 1, e = {}) {
    super(t, t, e), this.isWebGLCubeRenderTarget = !0;
    const n = { width: t, height: t, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new ba(r), this._setTextureOptions(e), this.texture.isRenderTargetTexture = !0;
  }
  /**
   * Converts the given equirectangular texture to a cube map.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Texture} texture - The equirectangular texture.
   * @return {WebGLCubeRenderTarget} A reference to this cube render target.
   */
  fromEquirectangularTexture(t, e) {
    this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
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
    }, r = new Qn(5, 5, 5), s = new He({
      name: "CubemapFromEquirect",
      uniforms: Zn(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    s.uniforms.tEquirect.value = e;
    const a = new pe(r, s), o = e.minFilter;
    return e.minFilter === 1008 && (e.minFilter = 1006), new El(1, 10, this).update(t, a), e.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  /**
   * Clears this cube render target.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
   * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
   * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
   */
  clear(t, e = !0, n = !0, r = !0) {
    const s = t.getRenderTarget();
    for (let a = 0; a < 6; a++)
      t.setRenderTarget(this, a), t.clear(e, n, r);
    t.setRenderTarget(s);
  }
}
function vh(i) {
  let t = /* @__PURE__ */ new WeakMap(), e = /* @__PURE__ */ new WeakMap(), n = null;
  function r(u, p = !1) {
    return u == null ? null : p ? a(u) : s(u);
  }
  function s(u) {
    if (u && u.isTexture) {
      const p = u.mapping;
      if (p === 303 || p === 304)
        if (t.has(u)) {
          const _ = t.get(u).texture;
          return o(_, u.mapping);
        } else {
          const _ = u.image;
          if (_ && _.height > 0) {
            const y = new Ha(_.height);
            return y.fromEquirectangularTexture(i, u), t.set(u, y), u.addEventListener("dispose", c), o(y.texture, u.mapping);
          } else
            return null;
        }
    }
    return u;
  }
  function a(u) {
    if (u && u.isTexture) {
      const p = u.mapping, _ = p === 303 || p === 304, y = p === 301 || p === 302;
      if (_ || y) {
        let m = e.get(u);
        const d = m !== void 0 ? m.texture.pmremVersion : 0;
        if (u.isRenderTargetTexture && u.pmremVersion !== d)
          return n === null && (n = new Gr(i)), m = _ ? n.fromEquirectangular(u, m) : n.fromCubemap(u, m), m.texture.pmremVersion = u.pmremVersion, e.set(u, m), m.texture;
        if (m !== void 0)
          return m.texture;
        {
          const b = u.image;
          return _ && b && b.height > 0 || y && b && l(b) ? (n === null && (n = new Gr(i)), m = _ ? n.fromEquirectangular(u) : n.fromCubemap(u), m.texture.pmremVersion = u.pmremVersion, e.set(u, m), u.addEventListener("dispose", h), m.texture) : null;
        }
      }
    }
    return u;
  }
  function o(u, p) {
    return p === 303 ? u.mapping = 301 : p === 304 && (u.mapping = 302), u;
  }
  function l(u) {
    let p = 0;
    const _ = 6;
    for (let y = 0; y < _; y++)
      u[y] !== void 0 && p++;
    return p === _;
  }
  function c(u) {
    const p = u.target;
    p.removeEventListener("dispose", c);
    const _ = t.get(p);
    _ !== void 0 && (t.delete(p), _.dispose());
  }
  function h(u) {
    const p = u.target;
    p.removeEventListener("dispose", h);
    const _ = e.get(p);
    _ !== void 0 && (e.delete(p), _.dispose());
  }
  function f() {
    t = /* @__PURE__ */ new WeakMap(), e = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: r,
    dispose: f
  };
}
function Mh(i) {
  const t = {};
  function e(n) {
    if (t[n] !== void 0)
      return t[n];
    const r = i.getExtension(n);
    return t[n] = r, r;
  }
  return {
    has: function(n) {
      return e(n) !== null;
    },
    init: function() {
      e("EXT_color_buffer_float"), e("WEBGL_clip_cull_distance"), e("OES_texture_float_linear"), e("EXT_color_buffer_half_float"), e("WEBGL_multisampled_render_to_texture"), e("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const r = e(n);
      return r === null && Wn("WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function Sh(i, t, e, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(f) {
    const u = f.target;
    u.index !== null && t.remove(u.index);
    for (const _ in u.attributes)
      t.remove(u.attributes[_]);
    u.removeEventListener("dispose", a), delete r[u.id];
    const p = s.get(u);
    p && (t.remove(p), s.delete(u)), n.releaseStatesOfGeometry(u), u.isInstancedBufferGeometry === !0 && delete u._maxInstanceCount, e.memory.geometries--;
  }
  function o(f, u) {
    return r[u.id] === !0 || (u.addEventListener("dispose", a), r[u.id] = !0, e.memory.geometries++), u;
  }
  function l(f) {
    const u = f.attributes;
    for (const p in u)
      t.update(u[p], i.ARRAY_BUFFER);
  }
  function c(f) {
    const u = [], p = f.index, _ = f.attributes.position;
    let y = 0;
    if (_ === void 0)
      return;
    if (p !== null) {
      const b = p.array;
      y = p.version;
      for (let A = 0, M = b.length; A < M; A += 3) {
        const R = b[A + 0], T = b[A + 1], C = b[A + 2];
        u.push(R, T, T, C, C, R);
      }
    } else {
      const b = _.array;
      y = _.version;
      for (let A = 0, M = b.length / 3 - 1; A < M; A += 3) {
        const R = A + 0, T = A + 1, C = A + 2;
        u.push(R, T, T, C, C, R);
      }
    }
    const m = new (_.count >= 65535 ? ya : Sa)(u, 1);
    m.version = y;
    const d = s.get(f);
    d && t.remove(d), s.set(f, m);
  }
  function h(f) {
    const u = s.get(f);
    if (u) {
      const p = f.index;
      p !== null && u.version < p.version && c(f);
    } else
      c(f);
    return s.get(f);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: h
  };
}
function yh(i, t, e) {
  let n;
  function r(f) {
    n = f;
  }
  let s, a;
  function o(f) {
    s = f.type, a = f.bytesPerElement;
  }
  function l(f, u) {
    i.drawElements(n, u, s, f * a), e.update(u, n, 1);
  }
  function c(f, u, p) {
    p !== 0 && (i.drawElementsInstanced(n, u, s, f * a, p), e.update(u, n, p));
  }
  function h(f, u, p) {
    if (p === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, u, 0, s, f, 0, p);
    let y = 0;
    for (let m = 0; m < p; m++)
      y += u[m];
    e.update(y, n, 1);
  }
  this.setMode = r, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = h;
}
function Eh(i) {
  const t = {
    geometries: 0,
    textures: 0
  }, e = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, a, o) {
    switch (e.calls++, a) {
      case i.TRIANGLES:
        e.triangles += o * (s / 3);
        break;
      case i.LINES:
        e.lines += o * (s / 2);
        break;
      case i.LINE_STRIP:
        e.lines += o * (s - 1);
        break;
      case i.LINE_LOOP:
        e.lines += o * s;
        break;
      case i.POINTS:
        e.points += o * s;
        break;
      default:
        Jt("WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0;
  }
  return {
    memory: t,
    render: e,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function Th(i, t, e) {
  const n = /* @__PURE__ */ new WeakMap(), r = new ue();
  function s(a, o, l) {
    const c = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, f = h !== void 0 ? h.length : 0;
    let u = n.get(o);
    if (u === void 0 || u.count !== f) {
      let P = function() {
        x.dispose(), n.delete(o), o.removeEventListener("dispose", P);
      };
      var p = P;
      u !== void 0 && u.texture.dispose();
      const _ = o.morphAttributes.position !== void 0, y = o.morphAttributes.normal !== void 0, m = o.morphAttributes.color !== void 0, d = o.morphAttributes.position || [], b = o.morphAttributes.normal || [], A = o.morphAttributes.color || [];
      let M = 0;
      _ === !0 && (M = 1), y === !0 && (M = 2), m === !0 && (M = 3);
      let R = o.attributes.position.count * M, T = 1;
      R > t.maxTextureSize && (T = Math.ceil(R / t.maxTextureSize), R = t.maxTextureSize);
      const C = new Float32Array(R * T * 4 * f), x = new xa(C, R, T, f);
      x.type = 1015, x.needsUpdate = !0;
      const E = M * 4;
      for (let w = 0; w < f; w++) {
        const B = d[w], q = b[w], $ = A[w], D = R * T * 4 * w;
        for (let k = 0; k < B.count; k++) {
          const U = k * E;
          _ === !0 && (r.fromBufferAttribute(B, k), C[D + U + 0] = r.x, C[D + U + 1] = r.y, C[D + U + 2] = r.z, C[D + U + 3] = 0), y === !0 && (r.fromBufferAttribute(q, k), C[D + U + 4] = r.x, C[D + U + 5] = r.y, C[D + U + 6] = r.z, C[D + U + 7] = 0), m === !0 && (r.fromBufferAttribute($, k), C[D + U + 8] = r.x, C[D + U + 9] = r.y, C[D + U + 10] = r.z, C[D + U + 11] = $.itemSize === 4 ? r.w : 1);
        }
      }
      u = {
        count: f,
        texture: x,
        size: new ut(R, T)
      }, n.set(o, u), o.addEventListener("dispose", P);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", a.morphTexture, e);
    else {
      let _ = 0;
      for (let m = 0; m < c.length; m++)
        _ += c[m];
      const y = o.morphTargetsRelative ? 1 : 1 - _;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", y), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", u.texture, e), l.getUniforms().setValue(i, "morphTargetsTextureSize", u.size);
  }
  return {
    update: s
  };
}
function Ah(i, t, e, n, r) {
  let s = /* @__PURE__ */ new WeakMap();
  function a(c) {
    const h = r.render.frame, f = c.geometry, u = t.get(c, f);
    if (s.get(u) !== h && (t.update(u), s.set(u, h)), c.isInstancedMesh && (c.hasEventListener("dispose", l) === !1 && c.addEventListener("dispose", l), s.get(c) !== h && (e.update(c.instanceMatrix, i.ARRAY_BUFFER), c.instanceColor !== null && e.update(c.instanceColor, i.ARRAY_BUFFER), s.set(c, h))), c.isSkinnedMesh) {
      const p = c.skeleton;
      s.get(p) !== h && (p.update(), s.set(p, h));
    }
    return u;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function l(c) {
    const h = c.target;
    h.removeEventListener("dispose", l), n.releaseStatesOfObject(h), e.remove(h.instanceMatrix), h.instanceColor !== null && e.remove(h.instanceColor);
  }
  return {
    update: a,
    dispose: o
  };
}
const bh = {
  1: "LINEAR_TONE_MAPPING",
  2: "REINHARD_TONE_MAPPING",
  3: "CINEON_TONE_MAPPING",
  4: "ACES_FILMIC_TONE_MAPPING",
  6: "AGX_TONE_MAPPING",
  7: "NEUTRAL_TONE_MAPPING",
  5: "CUSTOM_TONE_MAPPING"
};
function Rh(i, t, e, n, r, s) {
  const a = new Je(t, e, {
    type: i,
    depthBuffer: r,
    stencilBuffer: s,
    samples: n ? 4 : 0,
    depthTexture: r ? new qn(t, e) : void 0
  }), o = new Je(t, e, {
    type: 1016,
    depthBuffer: !1,
    stencilBuffer: !1
  }), l = new ke();
  l.setAttribute("position", new we([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), l.setAttribute("uv", new we([0, 2, 0, 0, 2, 0], 2));
  const c = new pl({
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
  }), h = new pe(l, c), f = new $r(-1, 1, 1, -1, 0, 1);
  let u = null, p = null, _ = !1, y, m = null, d = [], b = !1;
  this.setSize = function(A, M) {
    a.setSize(A, M), o.setSize(A, M);
    for (let R = 0; R < d.length; R++) {
      const T = d[R];
      T.setSize && T.setSize(A, M);
    }
  }, this.setEffects = function(A) {
    d = A, b = d.length > 0 && d[0].isRenderPass === !0;
    const M = a.width, R = a.height;
    for (let T = 0; T < d.length; T++) {
      const C = d[T];
      C.setSize && C.setSize(M, R);
    }
  }, this.begin = function(A, M) {
    if (_ || A.toneMapping === 0 && d.length === 0) return !1;
    if (m = M, M !== null) {
      const R = M.width, T = M.height;
      (a.width !== R || a.height !== T) && this.setSize(R, T);
    }
    return b === !1 && A.setRenderTarget(a), y = A.toneMapping, A.toneMapping = 0, !0;
  }, this.hasRenderPass = function() {
    return b;
  }, this.end = function(A, M) {
    A.toneMapping = y, _ = !0;
    let R = a, T = o;
    for (let C = 0; C < d.length; C++) {
      const x = d[C];
      if (x.enabled !== !1 && (x.render(A, T, R, M), x.needsSwap !== !1)) {
        const E = R;
        R = T, T = E;
      }
    }
    if (u !== A.outputColorSpace || p !== A.toneMapping) {
      u = A.outputColorSpace, p = A.toneMapping, c.defines = {}, $t.getTransfer(u) === ee && (c.defines.SRGB_TRANSFER = "");
      const C = bh[p];
      C && (c.defines[C] = ""), c.needsUpdate = !0;
    }
    c.uniforms.tDiffuse.value = R.texture, A.setRenderTarget(m), A.render(h, f), m = null, _ = !1;
  }, this.isCompositing = function() {
    return _;
  }, this.dispose = function() {
    a.depthTexture && a.depthTexture.dispose(), a.dispose(), o.dispose(), l.dispose(), c.dispose();
  };
}
const ka = /* @__PURE__ */ new Re(), Vr = /* @__PURE__ */ new qn(1, 1), Wa = /* @__PURE__ */ new xa(), Xa = /* @__PURE__ */ new ho(), qa = /* @__PURE__ */ new ba(), ta = [], ea = [], na = new Float32Array(16), ia = new Float32Array(9), ra = new Float32Array(4);
function jn(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = t * e;
  let s = ta[r];
  if (s === void 0 && (s = new Float32Array(r), ta[r] = s), t !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== t; ++a)
      o += e, i[a].toArray(s, o);
  }
  return s;
}
function ve(i, t) {
  if (i.length !== t.length) return !1;
  for (let e = 0, n = i.length; e < n; e++)
    if (i[e] !== t[e]) return !1;
  return !0;
}
function Me(i, t) {
  for (let e = 0, n = t.length; e < n; e++)
    i[e] = t[e];
}
function Qi(i, t) {
  let e = ea[t];
  e === void 0 && (e = new Int32Array(t), ea[t] = e);
  for (let n = 0; n !== t; ++n)
    e[n] = i.allocateTextureUnit();
  return e;
}
function Ch(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
}
function wh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ve(e, t)) return;
    i.uniform2fv(this.addr, t), Me(e, t);
  }
}
function Ph(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
  else {
    if (ve(e, t)) return;
    i.uniform3fv(this.addr, t), Me(e, t);
  }
}
function Lh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ve(e, t)) return;
    i.uniform4fv(this.addr, t), Me(e, t);
  }
}
function Dh(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ve(e, t)) return;
    i.uniformMatrix2fv(this.addr, !1, t), Me(e, t);
  } else {
    if (ve(e, n)) return;
    ra.set(n), i.uniformMatrix2fv(this.addr, !1, ra), Me(e, n);
  }
}
function Ih(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ve(e, t)) return;
    i.uniformMatrix3fv(this.addr, !1, t), Me(e, t);
  } else {
    if (ve(e, n)) return;
    ia.set(n), i.uniformMatrix3fv(this.addr, !1, ia), Me(e, n);
  }
}
function Fh(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ve(e, t)) return;
    i.uniformMatrix4fv(this.addr, !1, t), Me(e, t);
  } else {
    if (ve(e, n)) return;
    na.set(n), i.uniformMatrix4fv(this.addr, !1, na), Me(e, n);
  }
}
function Nh(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
}
function Uh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ve(e, t)) return;
    i.uniform2iv(this.addr, t), Me(e, t);
  }
}
function Oh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (ve(e, t)) return;
    i.uniform3iv(this.addr, t), Me(e, t);
  }
}
function Bh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ve(e, t)) return;
    i.uniform4iv(this.addr, t), Me(e, t);
  }
}
function zh(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
}
function Gh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ve(e, t)) return;
    i.uniform2uiv(this.addr, t), Me(e, t);
  }
}
function Vh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (ve(e, t)) return;
    i.uniform3uiv(this.addr, t), Me(e, t);
  }
}
function Hh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ve(e, t)) return;
    i.uniform4uiv(this.addr, t), Me(e, t);
  }
}
function kh(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (Vr.compareFunction = e.isReversedDepthBuffer() ? 518 : 515, s = Vr) : s = ka, e.setTexture2D(t || s, r);
}
function Wh(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTexture3D(t || Xa, r);
}
function Xh(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTextureCube(t || qa, r);
}
function qh(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTexture2DArray(t || Wa, r);
}
function Yh(i) {
  switch (i) {
    case 5126:
      return Ch;
    // FLOAT
    case 35664:
      return wh;
    // _VEC2
    case 35665:
      return Ph;
    // _VEC3
    case 35666:
      return Lh;
    // _VEC4
    case 35674:
      return Dh;
    // _MAT2
    case 35675:
      return Ih;
    // _MAT3
    case 35676:
      return Fh;
    // _MAT4
    case 5124:
    case 35670:
      return Nh;
    // INT, BOOL
    case 35667:
    case 35671:
      return Uh;
    // _VEC2
    case 35668:
    case 35672:
      return Oh;
    // _VEC3
    case 35669:
    case 35673:
      return Bh;
    // _VEC4
    case 5125:
      return zh;
    // UINT
    case 36294:
      return Gh;
    // _VEC2
    case 36295:
      return Vh;
    // _VEC3
    case 36296:
      return Hh;
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
      return kh;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Wh;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Xh;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return qh;
  }
}
function Zh(i, t) {
  i.uniform1fv(this.addr, t);
}
function Kh(i, t) {
  const e = jn(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function Jh(i, t) {
  const e = jn(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function $h(i, t) {
  const e = jn(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function Qh(i, t) {
  const e = jn(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, e);
}
function jh(i, t) {
  const e = jn(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, e);
}
function tf(i, t) {
  const e = jn(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, e);
}
function ef(i, t) {
  i.uniform1iv(this.addr, t);
}
function nf(i, t) {
  i.uniform2iv(this.addr, t);
}
function rf(i, t) {
  i.uniform3iv(this.addr, t);
}
function sf(i, t) {
  i.uniform4iv(this.addr, t);
}
function af(i, t) {
  i.uniform1uiv(this.addr, t);
}
function of(i, t) {
  i.uniform2uiv(this.addr, t);
}
function lf(i, t) {
  i.uniform3uiv(this.addr, t);
}
function cf(i, t) {
  i.uniform4uiv(this.addr, t);
}
function uf(i, t, e) {
  const n = this.cache, r = t.length, s = Qi(e, r);
  ve(n, s) || (i.uniform1iv(this.addr, s), Me(n, s));
  let a;
  this.type === i.SAMPLER_2D_SHADOW ? a = Vr : a = ka;
  for (let o = 0; o !== r; ++o)
    e.setTexture2D(t[o] || a, s[o]);
}
function hf(i, t, e) {
  const n = this.cache, r = t.length, s = Qi(e, r);
  ve(n, s) || (i.uniform1iv(this.addr, s), Me(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTexture3D(t[a] || Xa, s[a]);
}
function ff(i, t, e) {
  const n = this.cache, r = t.length, s = Qi(e, r);
  ve(n, s) || (i.uniform1iv(this.addr, s), Me(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTextureCube(t[a] || qa, s[a]);
}
function df(i, t, e) {
  const n = this.cache, r = t.length, s = Qi(e, r);
  ve(n, s) || (i.uniform1iv(this.addr, s), Me(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTexture2DArray(t[a] || Wa, s[a]);
}
function pf(i) {
  switch (i) {
    case 5126:
      return Zh;
    // FLOAT
    case 35664:
      return Kh;
    // _VEC2
    case 35665:
      return Jh;
    // _VEC3
    case 35666:
      return $h;
    // _VEC4
    case 35674:
      return Qh;
    // _MAT2
    case 35675:
      return jh;
    // _MAT3
    case 35676:
      return tf;
    // _MAT4
    case 5124:
    case 35670:
      return ef;
    // INT, BOOL
    case 35667:
    case 35671:
      return nf;
    // _VEC2
    case 35668:
    case 35672:
      return rf;
    // _VEC3
    case 35669:
    case 35673:
      return sf;
    // _VEC4
    case 5125:
      return af;
    // UINT
    case 36294:
      return of;
    // _VEC2
    case 36295:
      return lf;
    // _VEC3
    case 36296:
      return cf;
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
      return uf;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return hf;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return ff;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return df;
  }
}
class mf {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = Yh(e.type);
  }
}
class gf {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = pf(e.type);
  }
}
class _f {
  constructor(t) {
    this.id = t, this.seq = [], this.map = {};
  }
  setValue(t, e, n) {
    const r = this.seq;
    for (let s = 0, a = r.length; s !== a; ++s) {
      const o = r[s];
      o.setValue(t, e[o.id], n);
    }
  }
}
const Ir = /(\w+)(\])?(\[|\.)?/g;
function sa(i, t) {
  i.seq.push(t), i.map[t.id] = t;
}
function xf(i, t, e) {
  const n = i.name, r = n.length;
  for (Ir.lastIndex = 0; ; ) {
    const s = Ir.exec(n), a = Ir.lastIndex;
    let o = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === r) {
      sa(e, c === void 0 ? new mf(o, i, t) : new gf(o, i, t));
      break;
    } else {
      let f = e.map[o];
      f === void 0 && (f = new _f(o), sa(e, f)), e = f;
    }
  }
}
class Xi {
  constructor(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let a = 0; a < n; ++a) {
      const o = t.getActiveUniform(e, a), l = t.getUniformLocation(e, o.name);
      xf(o, l, this);
    }
    const r = [], s = [];
    for (const a of this.seq)
      a.type === t.SAMPLER_2D_SHADOW || a.type === t.SAMPLER_CUBE_SHADOW || a.type === t.SAMPLER_2D_ARRAY_SHADOW ? r.push(a) : s.push(a);
    r.length > 0 && (this.seq = r.concat(s));
  }
  setValue(t, e, n, r) {
    const s = this.map[e];
    s !== void 0 && s.setValue(t, n, r);
  }
  setOptional(t, e, n) {
    const r = e[n];
    r !== void 0 && this.setValue(t, n, r);
  }
  static upload(t, e, n, r) {
    for (let s = 0, a = e.length; s !== a; ++s) {
      const o = e[s], l = n[o.id];
      l.needsUpdate !== !1 && o.setValue(t, l.value, r);
    }
  }
  static seqWithValue(t, e) {
    const n = [];
    for (let r = 0, s = t.length; r !== s; ++r) {
      const a = t[r];
      a.id in e && n.push(a);
    }
    return n;
  }
}
function aa(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const vf = 37297;
let Mf = 0;
function Sf(i, t) {
  const e = i.split(`
`), n = [], r = Math.max(t - 6, 0), s = Math.min(t + 6, e.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    n.push(`${o === t ? ">" : " "} ${o}: ${e[a]}`);
  }
  return n.join(`
`);
}
const oa = /* @__PURE__ */ new Vt();
function yf(i) {
  $t._getMatrix(oa, $t.workingColorSpace, i);
  const t = `mat3( ${oa.elements.map((e) => e.toFixed(4))} )`;
  switch ($t.getTransfer(i)) {
    case Yi:
      return [t, "LinearTransferOETF"];
    case ee:
      return [t, "sRGBTransferOETF"];
    default:
      return Ut("WebGLProgram: Unsupported color space: ", i), [t, "LinearTransferOETF"];
  }
}
function la(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS), s = (i.getShaderInfoLog(t) || "").trim();
  if (n && s === "") return "";
  const a = /ERROR: 0:(\d+)/.exec(s);
  if (a) {
    const o = parseInt(a[1]);
    return e.toUpperCase() + `

` + s + `

` + Sf(i.getShaderSource(t), o);
  } else
    return s;
}
function Ef(i, t) {
  const e = yf(t);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
const Tf = {
  1: "Linear",
  2: "Reinhard",
  3: "Cineon",
  4: "ACESFilmic",
  6: "AgX",
  7: "Neutral",
  5: "Custom"
};
function Af(i, t) {
  const e = Tf[t];
  return e === void 0 ? (Ut("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + i + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
const Wi = /* @__PURE__ */ new N();
function bf() {
  $t.getLuminanceCoefficients(Wi);
  const i = Wi.x.toFixed(4), t = Wi.y.toFixed(4), e = Wi.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function Rf(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(hi).join(`
`);
}
function Cf(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== !1 && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function wf(i, t) {
  const e = {}, n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = i.getActiveAttrib(t, r), a = s.name;
    let o = 1;
    s.type === i.FLOAT_MAT2 && (o = 2), s.type === i.FLOAT_MAT3 && (o = 3), s.type === i.FLOAT_MAT4 && (o = 4), e[a] = {
      type: s.type,
      location: i.getAttribLocation(t, a),
      locationSize: o
    };
  }
  return e;
}
function hi(i) {
  return i !== "";
}
function ca(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function ua(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const Pf = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Hr(i) {
  return i.replace(Pf, Df);
}
const Lf = /* @__PURE__ */ new Map();
function Df(i, t) {
  let e = Wt[t];
  if (e === void 0) {
    const n = Lf.get(t);
    if (n !== void 0)
      e = Wt[n], Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else
      throw new Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
  }
  return Hr(e);
}
const If = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function ha(i) {
  return i.replace(If, Ff);
}
function Ff(i, t, e, n) {
  let r = "";
  for (let s = parseInt(t); s < parseInt(e); s++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function fa(i) {
  let t = `precision ${i.precision} float;
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
  return i.precision === "highp" ? t += `
#define HIGH_PRECISION` : i.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
}
const Nf = {
  1: "SHADOWMAP_TYPE_PCF",
  3: "SHADOWMAP_TYPE_VSM"
};
function Uf(i) {
  return Nf[i.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
const Of = {
  301: "ENVMAP_TYPE_CUBE",
  302: "ENVMAP_TYPE_CUBE",
  306: "ENVMAP_TYPE_CUBE_UV"
};
function Bf(i) {
  return i.envMap === !1 ? "ENVMAP_TYPE_CUBE" : Of[i.envMapMode] || "ENVMAP_TYPE_CUBE";
}
const zf = {
  302: "ENVMAP_MODE_REFRACTION"
};
function Gf(i) {
  return i.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : zf[i.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
const Vf = {
  0: "ENVMAP_BLENDING_MULTIPLY",
  1: "ENVMAP_BLENDING_MIX",
  2: "ENVMAP_BLENDING_ADD"
};
function Hf(i) {
  return i.envMap === !1 ? "ENVMAP_BLENDING_NONE" : Vf[i.combine] || "ENVMAP_BLENDING_NONE";
}
function kf(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2, n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 112)), texelHeight: n, maxMip: e };
}
function Wf(i, t, e, n) {
  const r = i.getContext(), s = e.defines;
  let a = e.vertexShader, o = e.fragmentShader;
  const l = Uf(e), c = Bf(e), h = Gf(e), f = Hf(e), u = kf(e), p = Rf(e), _ = Cf(s), y = r.createProgram();
  let m, d, b = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
  e.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    _
  ].filter(hi).join(`
`), m.length > 0 && (m += `
`), d = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    _
  ].filter(hi).join(`
`), d.length > 0 && (d += `
`)) : (m = [
    fa(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    _,
    e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    e.batching ? "#define USE_BATCHING" : "",
    e.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    e.instancing ? "#define USE_INSTANCING" : "",
    e.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.map ? "#define USE_MAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + h : "",
    e.lightMap ? "#define USE_LIGHTMAP" : "",
    e.aoMap ? "#define USE_AOMAP" : "",
    e.bumpMap ? "#define USE_BUMPMAP" : "",
    e.normalMap ? "#define USE_NORMALMAP" : "",
    e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    e.anisotropy ? "#define USE_ANISOTROPY" : "",
    e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    e.specularMap ? "#define USE_SPECULARMAP" : "",
    e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    e.metalnessMap ? "#define USE_METALNESSMAP" : "",
    e.alphaMap ? "#define USE_ALPHAMAP" : "",
    e.alphaHash ? "#define USE_ALPHAHASH" : "",
    e.transmission ? "#define USE_TRANSMISSION" : "",
    e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    e.mapUv ? "#define MAP_UV " + e.mapUv : "",
    e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "",
    e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "",
    e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "",
    e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "",
    e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "",
    e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "",
    e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "",
    e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "",
    e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "",
    e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "",
    e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "",
    e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "",
    e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "",
    e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "",
    e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "",
    e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "",
    e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "",
    e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "",
    e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "",
    e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "",
    e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "",
    e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "",
    //
    e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
    e.vertexNormals ? "#define HAS_NORMAL" : "",
    e.vertexColors ? "#define USE_COLOR" : "",
    e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    e.vertexUv1s ? "#define USE_UV1" : "",
    e.vertexUv2s ? "#define USE_UV2" : "",
    e.vertexUv3s ? "#define USE_UV3" : "",
    e.pointsUvs ? "#define USE_POINTS_UV" : "",
    e.flatShading ? "#define FLAT_SHADED" : "",
    e.skinning ? "#define USE_SKINNING" : "",
    e.morphTargets ? "#define USE_MORPHTARGETS" : "",
    e.morphNormals && e.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    e.morphColors ? "#define USE_MORPHCOLORS" : "",
    e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "",
    e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "",
    e.doubleSided ? "#define DOUBLE_SIDED" : "",
    e.flipSided ? "#define FLIP_SIDED" : "",
    e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    e.shadowMapEnabled ? "#define " + l : "",
    e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    e.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
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
  ].filter(hi).join(`
`), d = [
    fa(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    _,
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    e.map ? "#define USE_MAP" : "",
    e.matcap ? "#define USE_MATCAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + c : "",
    e.envMap ? "#define " + h : "",
    e.envMap ? "#define " + f : "",
    u ? "#define CUBEUV_TEXEL_WIDTH " + u.texelWidth : "",
    u ? "#define CUBEUV_TEXEL_HEIGHT " + u.texelHeight : "",
    u ? "#define CUBEUV_MAX_MIP " + u.maxMip + ".0" : "",
    e.lightMap ? "#define USE_LIGHTMAP" : "",
    e.aoMap ? "#define USE_AOMAP" : "",
    e.bumpMap ? "#define USE_BUMPMAP" : "",
    e.normalMap ? "#define USE_NORMALMAP" : "",
    e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    e.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
    e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    e.anisotropy ? "#define USE_ANISOTROPY" : "",
    e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    e.clearcoat ? "#define USE_CLEARCOAT" : "",
    e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    e.dispersion ? "#define USE_DISPERSION" : "",
    e.iridescence ? "#define USE_IRIDESCENCE" : "",
    e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    e.specularMap ? "#define USE_SPECULARMAP" : "",
    e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    e.metalnessMap ? "#define USE_METALNESSMAP" : "",
    e.alphaMap ? "#define USE_ALPHAMAP" : "",
    e.alphaTest ? "#define USE_ALPHATEST" : "",
    e.alphaHash ? "#define USE_ALPHAHASH" : "",
    e.sheen ? "#define USE_SHEEN" : "",
    e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    e.transmission ? "#define USE_TRANSMISSION" : "",
    e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
    e.vertexColors || e.instancingColor ? "#define USE_COLOR" : "",
    e.vertexAlphas || e.batchingColor ? "#define USE_COLOR_ALPHA" : "",
    e.vertexUv1s ? "#define USE_UV1" : "",
    e.vertexUv2s ? "#define USE_UV2" : "",
    e.vertexUv3s ? "#define USE_UV3" : "",
    e.pointsUvs ? "#define USE_POINTS_UV" : "",
    e.gradientMap ? "#define USE_GRADIENTMAP" : "",
    e.flatShading ? "#define FLAT_SHADED" : "",
    e.doubleSided ? "#define DOUBLE_SIDED" : "",
    e.flipSided ? "#define FLIP_SIDED" : "",
    e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    e.shadowMapEnabled ? "#define " + l : "",
    e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
    e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    e.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    e.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    e.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    e.toneMapping !== 0 ? Wt.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    e.toneMapping !== 0 ? Af("toneMapping", e.toneMapping) : "",
    e.dithering ? "#define DITHERING" : "",
    e.opaque ? "#define OPAQUE" : "",
    Wt.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Ef("linearToOutputTexel", e.outputColorSpace),
    bf(),
    e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
    `
`
  ].filter(hi).join(`
`)), a = Hr(a), a = ca(a, e), a = ua(a, e), o = Hr(o), o = ca(o, e), o = ua(o, e), a = ha(a), o = ha(o), e.isRawShaderMaterial !== !0 && (b = `#version 300 es
`, m = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, d = [
    "#define varying in",
    e.glslVersion === fs ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    e.glslVersion === fs ? "" : "#define gl_FragColor pc_fragColor",
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
` + d);
  const A = b + m + a, M = b + d + o, R = aa(r, r.VERTEX_SHADER, A), T = aa(r, r.FRAGMENT_SHADER, M);
  r.attachShader(y, R), r.attachShader(y, T), e.index0AttributeName !== void 0 ? r.bindAttribLocation(y, 0, e.index0AttributeName) : e.hasPositionAttribute === !0 && r.bindAttribLocation(y, 0, "position"), r.linkProgram(y);
  function C(w) {
    if (i.debug.checkShaderErrors) {
      const B = r.getProgramInfoLog(y) || "", q = r.getShaderInfoLog(R) || "", $ = r.getShaderInfoLog(T) || "", D = B.trim(), k = q.trim(), U = $.trim();
      let Y = !0, tt = !0;
      if (r.getProgramParameter(y, r.LINK_STATUS) === !1)
        if (Y = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, y, R, T);
        else {
          const st = la(r, R, "vertex"), ot = la(r, T, "fragment");
          Jt(
            "WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(y, r.VALIDATE_STATUS) + `

Material Name: ` + w.name + `
Material Type: ` + w.type + `

Program Info Log: ` + D + `
` + st + `
` + ot
          );
        }
      else D !== "" ? Ut("WebGLProgram: Program Info Log:", D) : (k === "" || U === "") && (tt = !1);
      tt && (w.diagnostics = {
        runnable: Y,
        programLog: D,
        vertexShader: {
          log: k,
          prefix: m
        },
        fragmentShader: {
          log: U,
          prefix: d
        }
      });
    }
    r.deleteShader(R), r.deleteShader(T), x = new Xi(r, y), E = wf(r, y);
  }
  let x;
  this.getUniforms = function() {
    return x === void 0 && C(this), x;
  };
  let E;
  this.getAttributes = function() {
    return E === void 0 && C(this), E;
  };
  let P = e.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return P === !1 && (P = r.getProgramParameter(y, vf)), P;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(y), this.program = void 0;
  }, this.type = e.shaderType, this.name = e.shaderName, this.id = Mf++, this.cacheKey = t, this.usedTimes = 1, this.program = y, this.vertexShader = R, this.fragmentShader = T, this;
}
let Xf = 0;
class qf {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(t, e, n) {
    const r = this._getShaderCacheForMaterial(t);
    return r.has(e) === !1 && (r.add(e), e.usedTimes++), r.has(n) === !1 && (r.add(n), n.usedTimes++), this;
  }
  remove(t) {
    const e = this.materialCache.get(t);
    for (const n of e)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(t), this;
  }
  getVertexShaderStage(t) {
    return this._getShaderStage(t.vertexShader);
  }
  getFragmentShaderStage(t) {
    return this._getShaderStage(t.fragmentShader);
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache;
    let n = e.get(t);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), e.set(t, n)), n;
  }
  _getShaderStage(t) {
    const e = this.shaderCache;
    let n = e.get(t);
    return n === void 0 && (n = new Yf(t), e.set(t, n)), n;
  }
}
class Yf {
  constructor(t) {
    this.id = Xf++, this.code = t, this.usedTimes = 0;
  }
}
function Zf(i) {
  return i === 1030 || i === 37490 || i === 36285;
}
function Kf(i, t, e, n, r, s) {
  const a = new Wr(), o = new qf(), l = /* @__PURE__ */ new Set(), c = [], h = /* @__PURE__ */ new Map(), f = n.logarithmicDepthBuffer;
  let u = n.precision;
  const p = {
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
  function _(x) {
    return l.add(x), x === 0 ? "uv" : `uv${x}`;
  }
  function y(x, E, P, w, B, q) {
    const $ = w.fog, D = B.geometry, k = x.isMeshStandardMaterial || x.isMeshLambertMaterial || x.isMeshPhongMaterial ? w.environment : null, U = x.isMeshStandardMaterial || x.isMeshLambertMaterial && !x.envMap || x.isMeshPhongMaterial && !x.envMap, Y = t.get(x.envMap || k, U), tt = Y && Y.mapping === 306 ? Y.image.height : null, st = p[x.type];
    x.precision !== null && (u = n.getMaxPrecision(x.precision), u !== x.precision && Ut("WebGLProgram.getParameters:", x.precision, "not supported, using", u, "instead."));
    const ot = D.morphAttributes.position || D.morphAttributes.normal || D.morphAttributes.color, St = ot !== void 0 ? ot.length : 0;
    let Xt = 0;
    D.morphAttributes.position !== void 0 && (Xt = 1), D.morphAttributes.normal !== void 0 && (Xt = 2), D.morphAttributes.color !== void 0 && (Xt = 3);
    let re, Qt, K, lt;
    if (st) {
      const Tt = Ke[st];
      re = Tt.vertexShader, Qt = Tt.fragmentShader;
    } else {
      re = x.vertexShader, Qt = x.fragmentShader;
      const Tt = o.getVertexShaderStage(x), fe = o.getFragmentShaderStage(x);
      o.update(x, Tt, fe), K = Tt.id, lt = fe.id;
    }
    const it = i.getRenderTarget(), Pt = i.state.buffers.depth.getReversed(), Ot = B.isInstancedMesh === !0, It = B.isBatchedMesh === !0, te = !!x.map, zt = !!x.matcap, Q = !!Y, nt = !!x.aoMap, et = !!x.lightMap, _t = !!x.bumpMap && x.wireframe === !1, pt = !!x.normalMap, Ft = !!x.displacementMap, Rt = !!x.emissiveMap, Bt = !!x.metalnessMap, Gt = !!x.roughnessMap, L = x.anisotropy > 0, ne = x.clearcoat > 0, Kt = x.dispersion > 0, S = x.iridescence > 0, g = x.sheen > 0, O = x.transmission > 0, V = L && !!x.anisotropyMap, W = ne && !!x.clearcoatMap, rt = ne && !!x.clearcoatNormalMap, at = ne && !!x.clearcoatRoughnessMap, X = S && !!x.iridescenceMap, J = S && !!x.iridescenceThicknessMap, ht = g && !!x.sheenColorMap, Ct = g && !!x.sheenRoughnessMap, mt = !!x.specularMap, ft = !!x.specularColorMap, Dt = !!x.specularIntensityMap, Nt = O && !!x.transmissionMap, Ht = O && !!x.thicknessMap, I = !!x.gradientMap, ct = !!x.alphaMap, Z = x.alphaTest > 0, dt = !!x.alphaHash, Mt = !!x.extensions;
    let j = 0;
    x.toneMapped && (it === null || it.isXRRenderTarget === !0) && (j = i.toneMapping);
    const bt = {
      shaderID: st,
      shaderType: x.type,
      shaderName: x.name,
      vertexShader: re,
      fragmentShader: Qt,
      defines: x.defines,
      customVertexShaderID: K,
      customFragmentShaderID: lt,
      isRawShaderMaterial: x.isRawShaderMaterial === !0,
      glslVersion: x.glslVersion,
      precision: u,
      batching: It,
      batchingColor: It && B._colorsTexture !== null,
      instancing: Ot,
      instancingColor: Ot && B.instanceColor !== null,
      instancingMorph: Ot && B.morphTexture !== null,
      outputColorSpace: it === null ? i.outputColorSpace : it.isXRRenderTarget === !0 ? it.texture.colorSpace : $t.workingColorSpace,
      alphaToCoverage: !!x.alphaToCoverage,
      map: te,
      matcap: zt,
      envMap: Q,
      envMapMode: Q && Y.mapping,
      envMapCubeUVHeight: tt,
      aoMap: nt,
      lightMap: et,
      bumpMap: _t,
      normalMap: pt,
      displacementMap: Ft,
      emissiveMap: Rt,
      normalMapObjectSpace: pt && x.normalMapType === 1,
      normalMapTangentSpace: pt && x.normalMapType === 0,
      packedNormalMap: pt && x.normalMapType === 0 && Zf(x.normalMap.format),
      metalnessMap: Bt,
      roughnessMap: Gt,
      anisotropy: L,
      anisotropyMap: V,
      clearcoat: ne,
      clearcoatMap: W,
      clearcoatNormalMap: rt,
      clearcoatRoughnessMap: at,
      dispersion: Kt,
      iridescence: S,
      iridescenceMap: X,
      iridescenceThicknessMap: J,
      sheen: g,
      sheenColorMap: ht,
      sheenRoughnessMap: Ct,
      specularMap: mt,
      specularColorMap: ft,
      specularIntensityMap: Dt,
      transmission: O,
      transmissionMap: Nt,
      thicknessMap: Ht,
      gradientMap: I,
      opaque: x.transparent === !1 && x.blending === 1 && x.alphaToCoverage === !1,
      alphaMap: ct,
      alphaTest: Z,
      alphaHash: dt,
      combine: x.combine,
      //
      mapUv: te && _(x.map.channel),
      aoMapUv: nt && _(x.aoMap.channel),
      lightMapUv: et && _(x.lightMap.channel),
      bumpMapUv: _t && _(x.bumpMap.channel),
      normalMapUv: pt && _(x.normalMap.channel),
      displacementMapUv: Ft && _(x.displacementMap.channel),
      emissiveMapUv: Rt && _(x.emissiveMap.channel),
      metalnessMapUv: Bt && _(x.metalnessMap.channel),
      roughnessMapUv: Gt && _(x.roughnessMap.channel),
      anisotropyMapUv: V && _(x.anisotropyMap.channel),
      clearcoatMapUv: W && _(x.clearcoatMap.channel),
      clearcoatNormalMapUv: rt && _(x.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: at && _(x.clearcoatRoughnessMap.channel),
      iridescenceMapUv: X && _(x.iridescenceMap.channel),
      iridescenceThicknessMapUv: J && _(x.iridescenceThicknessMap.channel),
      sheenColorMapUv: ht && _(x.sheenColorMap.channel),
      sheenRoughnessMapUv: Ct && _(x.sheenRoughnessMap.channel),
      specularMapUv: mt && _(x.specularMap.channel),
      specularColorMapUv: ft && _(x.specularColorMap.channel),
      specularIntensityMapUv: Dt && _(x.specularIntensityMap.channel),
      transmissionMapUv: Nt && _(x.transmissionMap.channel),
      thicknessMapUv: Ht && _(x.thicknessMap.channel),
      alphaMapUv: ct && _(x.alphaMap.channel),
      //
      vertexTangents: !!D.attributes.tangent && (pt || L),
      vertexNormals: !!D.attributes.normal,
      vertexColors: x.vertexColors,
      vertexAlphas: x.vertexColors === !0 && !!D.attributes.color && D.attributes.color.itemSize === 4,
      pointsUvs: B.isPoints === !0 && !!D.attributes.uv && (te || ct),
      fog: !!$,
      useFog: x.fog === !0,
      fogExp2: !!$ && $.isFogExp2,
      flatShading: x.wireframe === !1 && (x.flatShading === !0 || D.attributes.normal === void 0 && pt === !1 && (x.isMeshLambertMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isMeshPhysicalMaterial)),
      sizeAttenuation: x.sizeAttenuation === !0,
      logarithmicDepthBuffer: f,
      reversedDepthBuffer: Pt,
      skinning: B.isSkinnedMesh === !0,
      hasPositionAttribute: D.attributes.position !== void 0,
      morphTargets: D.morphAttributes.position !== void 0,
      morphNormals: D.morphAttributes.normal !== void 0,
      morphColors: D.morphAttributes.color !== void 0,
      morphTargetsCount: St,
      morphTextureStride: Xt,
      numDirLights: E.directional.length,
      numPointLights: E.point.length,
      numSpotLights: E.spot.length,
      numSpotLightMaps: E.spotLightMap.length,
      numRectAreaLights: E.rectArea.length,
      numHemiLights: E.hemi.length,
      numDirLightShadows: E.directionalShadowMap.length,
      numPointLightShadows: E.pointShadowMap.length,
      numSpotLightShadows: E.spotShadowMap.length,
      numSpotLightShadowsWithMaps: E.numSpotLightShadowsWithMaps,
      numLightProbes: E.numLightProbes,
      numLightProbeGrids: q.length,
      numClippingPlanes: s.numPlanes,
      numClipIntersection: s.numIntersection,
      dithering: x.dithering,
      shadowMapEnabled: i.shadowMap.enabled && P.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: j,
      decodeVideoTexture: te && x.map.isVideoTexture === !0 && $t.getTransfer(x.map.colorSpace) === ee,
      decodeVideoTextureEmissive: Rt && x.emissiveMap.isVideoTexture === !0 && $t.getTransfer(x.emissiveMap.colorSpace) === ee,
      premultipliedAlpha: x.premultipliedAlpha,
      doubleSided: x.side === 2,
      flipSided: x.side === 1,
      useDepthPacking: x.depthPacking >= 0,
      depthPacking: x.depthPacking || 0,
      index0AttributeName: x.index0AttributeName,
      extensionClipCullDistance: Mt && x.extensions.clipCullDistance === !0 && e.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Mt && x.extensions.multiDraw === !0 || It) && e.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: e.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: x.customProgramCacheKey()
    };
    return bt.vertexUv1s = l.has(1), bt.vertexUv2s = l.has(2), bt.vertexUv3s = l.has(3), l.clear(), bt;
  }
  function m(x) {
    const E = [];
    if (x.shaderID ? E.push(x.shaderID) : (E.push(x.customVertexShaderID), E.push(x.customFragmentShaderID)), x.defines !== void 0)
      for (const P in x.defines)
        E.push(P), E.push(x.defines[P]);
    return x.isRawShaderMaterial === !1 && (d(E, x), b(E, x), E.push(i.outputColorSpace)), E.push(x.customProgramCacheKey), E.join();
  }
  function d(x, E) {
    x.push(E.precision), x.push(E.outputColorSpace), x.push(E.envMapMode), x.push(E.envMapCubeUVHeight), x.push(E.mapUv), x.push(E.alphaMapUv), x.push(E.lightMapUv), x.push(E.aoMapUv), x.push(E.bumpMapUv), x.push(E.normalMapUv), x.push(E.displacementMapUv), x.push(E.emissiveMapUv), x.push(E.metalnessMapUv), x.push(E.roughnessMapUv), x.push(E.anisotropyMapUv), x.push(E.clearcoatMapUv), x.push(E.clearcoatNormalMapUv), x.push(E.clearcoatRoughnessMapUv), x.push(E.iridescenceMapUv), x.push(E.iridescenceThicknessMapUv), x.push(E.sheenColorMapUv), x.push(E.sheenRoughnessMapUv), x.push(E.specularMapUv), x.push(E.specularColorMapUv), x.push(E.specularIntensityMapUv), x.push(E.transmissionMapUv), x.push(E.thicknessMapUv), x.push(E.combine), x.push(E.fogExp2), x.push(E.sizeAttenuation), x.push(E.morphTargetsCount), x.push(E.morphAttributeCount), x.push(E.numDirLights), x.push(E.numPointLights), x.push(E.numSpotLights), x.push(E.numSpotLightMaps), x.push(E.numHemiLights), x.push(E.numRectAreaLights), x.push(E.numDirLightShadows), x.push(E.numPointLightShadows), x.push(E.numSpotLightShadows), x.push(E.numSpotLightShadowsWithMaps), x.push(E.numLightProbes), x.push(E.shadowMapType), x.push(E.toneMapping), x.push(E.numClippingPlanes), x.push(E.numClipIntersection), x.push(E.depthPacking);
  }
  function b(x, E) {
    a.disableAll(), E.instancing && a.enable(0), E.instancingColor && a.enable(1), E.instancingMorph && a.enable(2), E.matcap && a.enable(3), E.envMap && a.enable(4), E.normalMapObjectSpace && a.enable(5), E.normalMapTangentSpace && a.enable(6), E.clearcoat && a.enable(7), E.iridescence && a.enable(8), E.alphaTest && a.enable(9), E.vertexColors && a.enable(10), E.vertexAlphas && a.enable(11), E.vertexUv1s && a.enable(12), E.vertexUv2s && a.enable(13), E.vertexUv3s && a.enable(14), E.vertexTangents && a.enable(15), E.anisotropy && a.enable(16), E.alphaHash && a.enable(17), E.batching && a.enable(18), E.dispersion && a.enable(19), E.batchingColor && a.enable(20), E.gradientMap && a.enable(21), E.packedNormalMap && a.enable(22), E.vertexNormals && a.enable(23), x.push(a.mask), a.disableAll(), E.fog && a.enable(0), E.useFog && a.enable(1), E.flatShading && a.enable(2), E.logarithmicDepthBuffer && a.enable(3), E.reversedDepthBuffer && a.enable(4), E.skinning && a.enable(5), E.morphTargets && a.enable(6), E.morphNormals && a.enable(7), E.morphColors && a.enable(8), E.premultipliedAlpha && a.enable(9), E.shadowMapEnabled && a.enable(10), E.doubleSided && a.enable(11), E.flipSided && a.enable(12), E.useDepthPacking && a.enable(13), E.dithering && a.enable(14), E.transmission && a.enable(15), E.sheen && a.enable(16), E.opaque && a.enable(17), E.pointsUvs && a.enable(18), E.decodeVideoTexture && a.enable(19), E.decodeVideoTextureEmissive && a.enable(20), E.alphaToCoverage && a.enable(21), E.numLightProbeGrids > 0 && a.enable(22), E.hasPositionAttribute && a.enable(23), x.push(a.mask);
  }
  function A(x) {
    const E = p[x.type];
    let P;
    if (E) {
      const w = Ke[E];
      P = hl.clone(w.uniforms);
    } else
      P = x.uniforms;
    return P;
  }
  function M(x, E) {
    let P = h.get(E);
    return P !== void 0 ? ++P.usedTimes : (P = new Wf(i, E, x, r), c.push(P), h.set(E, P)), P;
  }
  function R(x) {
    if (--x.usedTimes === 0) {
      const E = c.indexOf(x);
      c[E] = c[c.length - 1], c.pop(), h.delete(x.cacheKey), x.destroy();
    }
  }
  function T(x) {
    o.remove(x);
  }
  function C() {
    o.dispose();
  }
  return {
    getParameters: y,
    getProgramCacheKey: m,
    getUniforms: A,
    acquireProgram: M,
    releaseProgram: R,
    releaseShaderCache: T,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: c,
    dispose: C
  };
}
function Jf() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(a) {
    return i.has(a);
  }
  function e(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function r(a, o, l) {
    i.get(a)[o] = l;
  }
  function s() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: t,
    get: e,
    remove: n,
    update: r,
    dispose: s
  };
}
function $f(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.materialVariant !== t.materialVariant ? i.materialVariant - t.materialVariant : i.z !== t.z ? i.z - t.z : i.id - t.id;
}
function da(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
}
function pa() {
  const i = [];
  let t = 0;
  const e = [], n = [], r = [];
  function s() {
    t = 0, e.length = 0, n.length = 0, r.length = 0;
  }
  function a(u) {
    let p = 0;
    return u.isInstancedMesh && (p += 2), u.isSkinnedMesh && (p += 1), p;
  }
  function o(u, p, _, y, m, d) {
    let b = i[t];
    return b === void 0 ? (b = {
      id: u.id,
      object: u,
      geometry: p,
      material: _,
      materialVariant: a(u),
      groupOrder: y,
      renderOrder: u.renderOrder,
      z: m,
      group: d
    }, i[t] = b) : (b.id = u.id, b.object = u, b.geometry = p, b.material = _, b.materialVariant = a(u), b.groupOrder = y, b.renderOrder = u.renderOrder, b.z = m, b.group = d), t++, b;
  }
  function l(u, p, _, y, m, d) {
    const b = o(u, p, _, y, m, d);
    _.transmission > 0 ? n.push(b) : _.transparent === !0 ? r.push(b) : e.push(b);
  }
  function c(u, p, _, y, m, d) {
    const b = o(u, p, _, y, m, d);
    _.transmission > 0 ? n.unshift(b) : _.transparent === !0 ? r.unshift(b) : e.unshift(b);
  }
  function h(u, p, _) {
    e.length > 1 && e.sort(u || $f), n.length > 1 && n.sort(p || da), r.length > 1 && r.sort(p || da), _ && (e.reverse(), n.reverse(), r.reverse());
  }
  function f() {
    for (let u = t, p = i.length; u < p; u++) {
      const _ = i[u];
      if (_.id === null) break;
      _.id = null, _.object = null, _.geometry = null, _.material = null, _.group = null;
    }
  }
  return {
    opaque: e,
    transmissive: n,
    transparent: r,
    init: s,
    push: l,
    unshift: c,
    finish: f,
    sort: h
  };
}
function Qf() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(n, r) {
    const s = i.get(n);
    let a;
    return s === void 0 ? (a = new pa(), i.set(n, [a])) : r >= s.length ? (a = new pa(), s.push(a)) : a = s[r], a;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: e
  };
}
function jf() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            direction: new N(),
            color: new Yt()
          };
          break;
        case "SpotLight":
          e = {
            position: new N(),
            direction: new N(),
            color: new Yt(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          e = {
            position: new N(),
            color: new Yt(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          e = {
            direction: new N(),
            skyColor: new Yt(),
            groundColor: new Yt()
          };
          break;
        case "RectAreaLight":
          e = {
            color: new Yt(),
            position: new N(),
            halfWidth: new N(),
            halfHeight: new N()
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
function td() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new ut()
          };
          break;
        case "SpotLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new ut()
          };
          break;
        case "PointLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new ut(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
let ed = 0;
function nd(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function id(i) {
  const t = new jf(), e = td(), n = {
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
  for (let c = 0; c < 9; c++) n.probe.push(new N());
  const r = new N(), s = new oe(), a = new oe();
  function o(c) {
    let h = 0, f = 0, u = 0;
    for (let E = 0; E < 9; E++) n.probe[E].set(0, 0, 0);
    let p = 0, _ = 0, y = 0, m = 0, d = 0, b = 0, A = 0, M = 0, R = 0, T = 0, C = 0;
    c.sort(nd);
    for (let E = 0, P = c.length; E < P; E++) {
      const w = c[E], B = w.color, q = w.intensity, $ = w.distance;
      let D = null;
      if (w.shadow && w.shadow.map && (w.shadow.map.texture.format === 1030 ? D = w.shadow.map.texture : D = w.shadow.map.depthTexture || w.shadow.map.texture), w.isAmbientLight)
        h += B.r * q, f += B.g * q, u += B.b * q;
      else if (w.isLightProbe) {
        for (let k = 0; k < 9; k++)
          n.probe[k].addScaledVector(w.sh.coefficients[k], q);
        C++;
      } else if (w.isDirectionalLight) {
        const k = t.get(w);
        if (k.color.copy(w.color).multiplyScalar(w.intensity), w.castShadow) {
          const U = w.shadow, Y = e.get(w);
          Y.shadowIntensity = U.intensity, Y.shadowBias = U.bias, Y.shadowNormalBias = U.normalBias, Y.shadowRadius = U.radius, Y.shadowMapSize = U.mapSize, n.directionalShadow[p] = Y, n.directionalShadowMap[p] = D, n.directionalShadowMatrix[p] = w.shadow.matrix, b++;
        }
        n.directional[p] = k, p++;
      } else if (w.isSpotLight) {
        const k = t.get(w);
        k.position.setFromMatrixPosition(w.matrixWorld), k.color.copy(B).multiplyScalar(q), k.distance = $, k.coneCos = Math.cos(w.angle), k.penumbraCos = Math.cos(w.angle * (1 - w.penumbra)), k.decay = w.decay, n.spot[y] = k;
        const U = w.shadow;
        if (w.map && (n.spotLightMap[R] = w.map, R++, U.updateMatrices(w), w.castShadow && T++), n.spotLightMatrix[y] = U.matrix, w.castShadow) {
          const Y = e.get(w);
          Y.shadowIntensity = U.intensity, Y.shadowBias = U.bias, Y.shadowNormalBias = U.normalBias, Y.shadowRadius = U.radius, Y.shadowMapSize = U.mapSize, n.spotShadow[y] = Y, n.spotShadowMap[y] = D, M++;
        }
        y++;
      } else if (w.isRectAreaLight) {
        const k = t.get(w);
        k.color.copy(B).multiplyScalar(q), k.halfWidth.set(w.width * 0.5, 0, 0), k.halfHeight.set(0, w.height * 0.5, 0), n.rectArea[m] = k, m++;
      } else if (w.isPointLight) {
        const k = t.get(w);
        if (k.color.copy(w.color).multiplyScalar(w.intensity), k.distance = w.distance, k.decay = w.decay, w.castShadow) {
          const U = w.shadow, Y = e.get(w);
          Y.shadowIntensity = U.intensity, Y.shadowBias = U.bias, Y.shadowNormalBias = U.normalBias, Y.shadowRadius = U.radius, Y.shadowMapSize = U.mapSize, Y.shadowCameraNear = U.camera.near, Y.shadowCameraFar = U.camera.far, n.pointShadow[_] = Y, n.pointShadowMap[_] = D, n.pointShadowMatrix[_] = w.shadow.matrix, A++;
        }
        n.point[_] = k, _++;
      } else if (w.isHemisphereLight) {
        const k = t.get(w);
        k.skyColor.copy(w.color).multiplyScalar(q), k.groundColor.copy(w.groundColor).multiplyScalar(q), n.hemi[d] = k, d++;
      }
    }
    m > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = gt.LTC_FLOAT_1, n.rectAreaLTC2 = gt.LTC_FLOAT_2) : (n.rectAreaLTC1 = gt.LTC_HALF_1, n.rectAreaLTC2 = gt.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = f, n.ambient[2] = u;
    const x = n.hash;
    (x.directionalLength !== p || x.pointLength !== _ || x.spotLength !== y || x.rectAreaLength !== m || x.hemiLength !== d || x.numDirectionalShadows !== b || x.numPointShadows !== A || x.numSpotShadows !== M || x.numSpotMaps !== R || x.numLightProbes !== C) && (n.directional.length = p, n.spot.length = y, n.rectArea.length = m, n.point.length = _, n.hemi.length = d, n.directionalShadow.length = b, n.directionalShadowMap.length = b, n.pointShadow.length = A, n.pointShadowMap.length = A, n.spotShadow.length = M, n.spotShadowMap.length = M, n.directionalShadowMatrix.length = b, n.pointShadowMatrix.length = A, n.spotLightMatrix.length = M + R - T, n.spotLightMap.length = R, n.numSpotLightShadowsWithMaps = T, n.numLightProbes = C, x.directionalLength = p, x.pointLength = _, x.spotLength = y, x.rectAreaLength = m, x.hemiLength = d, x.numDirectionalShadows = b, x.numPointShadows = A, x.numSpotShadows = M, x.numSpotMaps = R, x.numLightProbes = C, n.version = ed++);
  }
  function l(c, h) {
    let f = 0, u = 0, p = 0, _ = 0, y = 0;
    const m = h.matrixWorldInverse;
    for (let d = 0, b = c.length; d < b; d++) {
      const A = c[d];
      if (A.isDirectionalLight) {
        const M = n.directional[f];
        M.direction.setFromMatrixPosition(A.matrixWorld), r.setFromMatrixPosition(A.target.matrixWorld), M.direction.sub(r), M.direction.transformDirection(m), f++;
      } else if (A.isSpotLight) {
        const M = n.spot[p];
        M.position.setFromMatrixPosition(A.matrixWorld), M.position.applyMatrix4(m), M.direction.setFromMatrixPosition(A.matrixWorld), r.setFromMatrixPosition(A.target.matrixWorld), M.direction.sub(r), M.direction.transformDirection(m), p++;
      } else if (A.isRectAreaLight) {
        const M = n.rectArea[_];
        M.position.setFromMatrixPosition(A.matrixWorld), M.position.applyMatrix4(m), a.identity(), s.copy(A.matrixWorld), s.premultiply(m), a.extractRotation(s), M.halfWidth.set(A.width * 0.5, 0, 0), M.halfHeight.set(0, A.height * 0.5, 0), M.halfWidth.applyMatrix4(a), M.halfHeight.applyMatrix4(a), _++;
      } else if (A.isPointLight) {
        const M = n.point[u];
        M.position.setFromMatrixPosition(A.matrixWorld), M.position.applyMatrix4(m), u++;
      } else if (A.isHemisphereLight) {
        const M = n.hemi[y];
        M.direction.setFromMatrixPosition(A.matrixWorld), M.direction.transformDirection(m), y++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: n
  };
}
function ma(i) {
  const t = new id(i), e = [], n = [], r = [];
  function s(u) {
    f.camera = u, e.length = 0, n.length = 0, r.length = 0;
  }
  function a(u) {
    e.push(u);
  }
  function o(u) {
    n.push(u);
  }
  function l(u) {
    r.push(u);
  }
  function c() {
    t.setup(e);
  }
  function h(u) {
    t.setupView(e, u);
  }
  const f = {
    lightsArray: e,
    shadowsArray: n,
    lightProbeGridArray: r,
    camera: null,
    lights: t,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: s,
    state: f,
    setupLights: c,
    setupLightsView: h,
    pushLight: a,
    pushShadow: o,
    pushLightProbeGrid: l
  };
}
function rd(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(r, s = 0) {
    const a = t.get(r);
    let o;
    return a === void 0 ? (o = new ma(i), t.set(r, [o])) : s >= a.length ? (o = new ma(i), a.push(o)) : o = a[s], o;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: n
  };
}
const sd = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, ad = `uniform sampler2D shadow_pass;
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
}`, od = [
  /* @__PURE__ */ new N(1, 0, 0),
  /* @__PURE__ */ new N(-1, 0, 0),
  /* @__PURE__ */ new N(0, 1, 0),
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, 0, 1),
  /* @__PURE__ */ new N(0, 0, -1)
], ld = [
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, 0, 1),
  /* @__PURE__ */ new N(0, 0, -1),
  /* @__PURE__ */ new N(0, -1, 0),
  /* @__PURE__ */ new N(0, -1, 0)
], ga = /* @__PURE__ */ new oe(), li = /* @__PURE__ */ new N(), Fr = /* @__PURE__ */ new N();
function cd(i, t, e) {
  let n = new Xr();
  const r = new ut(), s = new ut(), a = new ue(), o = new _l(), l = new xl(), c = {}, h = e.maxTextureSize, f = { 0: 1, 1: 0, 2: 2 }, u = new He({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new ut() },
      radius: { value: 4 }
    },
    vertexShader: sd,
    fragmentShader: ad
  }), p = u.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const _ = new ke();
  _.setAttribute(
    "position",
    new Ve(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const y = new pe(_, u), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let d = this.type;
  this.render = function(T, C, x) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || T.length === 0) return;
    this.type === 2 && (Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = 1);
    const E = i.getRenderTarget(), P = i.getActiveCubeFace(), w = i.getActiveMipmapLevel(), B = i.state;
    B.setBlending(0), B.buffers.depth.getReversed() === !0 ? B.buffers.color.setClear(0, 0, 0, 0) : B.buffers.color.setClear(1, 1, 1, 1), B.buffers.depth.setTest(!0), B.setScissorTest(!1);
    const q = d !== this.type;
    q && C.traverse(function($) {
      $.material && (Array.isArray($.material) ? $.material.forEach((D) => D.needsUpdate = !0) : $.material.needsUpdate = !0);
    });
    for (let $ = 0, D = T.length; $ < D; $++) {
      const k = T[$], U = k.shadow;
      if (U === void 0) {
        Ut("WebGLShadowMap:", k, "has no shadow.");
        continue;
      }
      if (U.autoUpdate === !1 && U.needsUpdate === !1) continue;
      r.copy(U.mapSize);
      const Y = U.getFrameExtents();
      r.multiply(Y), s.copy(U.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / Y.x), r.x = s.x * Y.x, U.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / Y.y), r.y = s.y * Y.y, U.mapSize.y = s.y));
      const tt = i.state.buffers.depth.getReversed();
      if (U.camera._reversedDepth = tt, U.map === null || q === !0) {
        if (U.map !== null && (U.map.depthTexture !== null && (U.map.depthTexture.dispose(), U.map.depthTexture = null), U.map.dispose()), this.type === 3) {
          if (k.isPointLight) {
            Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          U.map = new Je(r.x, r.y, {
            format: 1030,
            type: 1016,
            minFilter: 1006,
            magFilter: 1006,
            generateMipmaps: !1
          }), U.map.texture.name = k.name + ".shadowMap", U.map.depthTexture = new qn(r.x, r.y, 1015), U.map.depthTexture.name = k.name + ".shadowMapDepth", U.map.depthTexture.format = 1026, U.map.depthTexture.compareFunction = null, U.map.depthTexture.minFilter = 1003, U.map.depthTexture.magFilter = 1003;
        } else
          k.isPointLight ? (U.map = new Ha(r.x), U.map.depthTexture = new Po(r.x, 1014)) : (U.map = new Je(r.x, r.y), U.map.depthTexture = new qn(r.x, r.y, 1014)), U.map.depthTexture.name = k.name + ".shadowMap", U.map.depthTexture.format = 1026, this.type === 1 ? (U.map.depthTexture.compareFunction = tt ? 518 : 515, U.map.depthTexture.minFilter = 1006, U.map.depthTexture.magFilter = 1006) : (U.map.depthTexture.compareFunction = null, U.map.depthTexture.minFilter = 1003, U.map.depthTexture.magFilter = 1003);
        U.camera.updateProjectionMatrix();
      }
      const st = U.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let ot = 0; ot < st; ot++) {
        if (U.map.isWebGLCubeRenderTarget)
          i.setRenderTarget(U.map, ot), i.clear();
        else {
          ot === 0 && (i.setRenderTarget(U.map), i.clear());
          const St = U.getViewport(ot);
          a.set(
            s.x * St.x,
            s.y * St.y,
            s.x * St.z,
            s.y * St.w
          ), B.viewport(a);
        }
        if (k.isPointLight) {
          const St = U.camera, Xt = U.matrix, re = k.distance || St.far;
          re !== St.far && (St.far = re, St.updateProjectionMatrix()), li.setFromMatrixPosition(k.matrixWorld), St.position.copy(li), Fr.copy(St.position), Fr.add(od[ot]), St.up.copy(ld[ot]), St.lookAt(Fr), St.updateMatrixWorld(), Xt.makeTranslation(-li.x, -li.y, -li.z), ga.multiplyMatrices(St.projectionMatrix, St.matrixWorldInverse), U._frustum.setFromProjectionMatrix(ga, St.coordinateSystem, St.reversedDepth);
        } else
          U.updateMatrices(k);
        n = U.getFrustum(), M(C, x, U.camera, k, this.type);
      }
      U.isPointLightShadow !== !0 && this.type === 3 && b(U, x), U.needsUpdate = !1;
    }
    d = this.type, m.needsUpdate = !1, i.setRenderTarget(E, P, w);
  };
  function b(T, C) {
    const x = t.update(y);
    u.defines.VSM_SAMPLES !== T.blurSamples && (u.defines.VSM_SAMPLES = T.blurSamples, p.defines.VSM_SAMPLES = T.blurSamples, u.needsUpdate = !0, p.needsUpdate = !0), T.mapPass === null && (T.mapPass = new Je(r.x, r.y, {
      format: 1030,
      type: 1016
    })), u.uniforms.shadow_pass.value = T.map.depthTexture, u.uniforms.resolution.value = T.mapSize, u.uniforms.radius.value = T.radius, i.setRenderTarget(T.mapPass), i.clear(), i.renderBufferDirect(C, null, x, u, y, null), p.uniforms.shadow_pass.value = T.mapPass.texture, p.uniforms.resolution.value = T.mapSize, p.uniforms.radius.value = T.radius, i.setRenderTarget(T.map), i.clear(), i.renderBufferDirect(C, null, x, p, y, null);
  }
  function A(T, C, x, E) {
    let P = null;
    const w = x.isPointLight === !0 ? T.customDistanceMaterial : T.customDepthMaterial;
    if (w !== void 0)
      P = w;
    else if (P = x.isPointLight === !0 ? l : o, i.localClippingEnabled && C.clipShadows === !0 && Array.isArray(C.clippingPlanes) && C.clippingPlanes.length !== 0 || C.displacementMap && C.displacementScale !== 0 || C.alphaMap && C.alphaTest > 0 || C.map && C.alphaTest > 0 || C.alphaToCoverage === !0) {
      const B = P.uuid, q = C.uuid;
      let $ = c[B];
      $ === void 0 && ($ = {}, c[B] = $);
      let D = $[q];
      D === void 0 && (D = P.clone(), $[q] = D, C.addEventListener("dispose", R)), P = D;
    }
    if (P.visible = C.visible, P.wireframe = C.wireframe, E === 3 ? P.side = C.shadowSide !== null ? C.shadowSide : C.side : P.side = C.shadowSide !== null ? C.shadowSide : f[C.side], P.alphaMap = C.alphaMap, P.alphaTest = C.alphaToCoverage === !0 ? 0.5 : C.alphaTest, P.map = C.map, P.clipShadows = C.clipShadows, P.clippingPlanes = C.clippingPlanes, P.clipIntersection = C.clipIntersection, P.displacementMap = C.displacementMap, P.displacementScale = C.displacementScale, P.displacementBias = C.displacementBias, P.wireframeLinewidth = C.wireframeLinewidth, P.linewidth = C.linewidth, x.isPointLight === !0 && P.isMeshDistanceMaterial === !0) {
      const B = i.properties.get(P);
      B.light = x;
    }
    return P;
  }
  function M(T, C, x, E, P) {
    if (T.visible === !1) return;
    if (T.layers.test(C.layers) && (T.isMesh || T.isLine || T.isPoints) && (T.castShadow || T.receiveShadow && P === 3) && (!T.frustumCulled || n.intersectsObject(T))) {
      T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse, T.matrixWorld);
      const q = t.update(T), $ = T.material;
      if (Array.isArray($)) {
        const D = q.groups;
        for (let k = 0, U = D.length; k < U; k++) {
          const Y = D[k], tt = $[Y.materialIndex];
          if (tt && tt.visible) {
            const st = A(T, tt, E, P);
            T.onBeforeShadow(i, T, C, x, q, st, Y), i.renderBufferDirect(x, null, q, st, T, Y), T.onAfterShadow(i, T, C, x, q, st, Y);
          }
        }
      } else if ($.visible) {
        const D = A(T, $, E, P);
        T.onBeforeShadow(i, T, C, x, q, D, null), i.renderBufferDirect(x, null, q, D, T, null), T.onAfterShadow(i, T, C, x, q, D, null);
      }
    }
    const B = T.children;
    for (let q = 0, $ = B.length; q < $; q++)
      M(B[q], C, x, E, P);
  }
  function R(T) {
    T.target.removeEventListener("dispose", R);
    for (const x in c) {
      const E = c[x], P = T.target.uuid;
      P in E && (E[P].dispose(), delete E[P]);
    }
  }
}
function ud(i, t) {
  function e() {
    let I = !1;
    const ct = new ue();
    let Z = null;
    const dt = new ue(0, 0, 0, 0);
    return {
      setMask: function(Mt) {
        Z !== Mt && !I && (i.colorMask(Mt, Mt, Mt, Mt), Z = Mt);
      },
      setLocked: function(Mt) {
        I = Mt;
      },
      setClear: function(Mt, j, bt, Tt, fe) {
        fe === !0 && (Mt *= Tt, j *= Tt, bt *= Tt), ct.set(Mt, j, bt, Tt), dt.equals(ct) === !1 && (i.clearColor(Mt, j, bt, Tt), dt.copy(ct));
      },
      reset: function() {
        I = !1, Z = null, dt.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let I = !1, ct = !1, Z = null, dt = null, Mt = null;
    return {
      setReversed: function(j) {
        if (ct !== j) {
          const bt = t.get("EXT_clip_control");
          j ? bt.clipControlEXT(bt.LOWER_LEFT_EXT, bt.ZERO_TO_ONE_EXT) : bt.clipControlEXT(bt.LOWER_LEFT_EXT, bt.NEGATIVE_ONE_TO_ONE_EXT), ct = j;
          const Tt = Mt;
          Mt = null, this.setClear(Tt);
        }
      },
      getReversed: function() {
        return ct;
      },
      setTest: function(j) {
        j ? it(i.DEPTH_TEST) : Pt(i.DEPTH_TEST);
      },
      setMask: function(j) {
        Z !== j && !I && (i.depthMask(j), Z = j);
      },
      setFunc: function(j) {
        if (ct && (j = ro[j]), dt !== j) {
          switch (j) {
            case 0:
              i.depthFunc(i.NEVER);
              break;
            case 1:
              i.depthFunc(i.ALWAYS);
              break;
            case 2:
              i.depthFunc(i.LESS);
              break;
            case 3:
              i.depthFunc(i.LEQUAL);
              break;
            case 4:
              i.depthFunc(i.EQUAL);
              break;
            case 5:
              i.depthFunc(i.GEQUAL);
              break;
            case 6:
              i.depthFunc(i.GREATER);
              break;
            case 7:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          dt = j;
        }
      },
      setLocked: function(j) {
        I = j;
      },
      setClear: function(j) {
        Mt !== j && (Mt = j, ct && (j = 1 - j), i.clearDepth(j));
      },
      reset: function() {
        I = !1, Z = null, dt = null, Mt = null, ct = !1;
      }
    };
  }
  function r() {
    let I = !1, ct = null, Z = null, dt = null, Mt = null, j = null, bt = null, Tt = null, fe = null;
    return {
      setTest: function(le) {
        I || (le ? it(i.STENCIL_TEST) : Pt(i.STENCIL_TEST));
      },
      setMask: function(le) {
        ct !== le && !I && (i.stencilMask(le), ct = le);
      },
      setFunc: function(le, We, Xe) {
        (Z !== le || dt !== We || Mt !== Xe) && (i.stencilFunc(le, We, Xe), Z = le, dt = We, Mt = Xe);
      },
      setOp: function(le, We, Xe) {
        (j !== le || bt !== We || Tt !== Xe) && (i.stencilOp(le, We, Xe), j = le, bt = We, Tt = Xe);
      },
      setLocked: function(le) {
        I = le;
      },
      setClear: function(le) {
        fe !== le && (i.clearStencil(le), fe = le);
      },
      reset: function() {
        I = !1, ct = null, Z = null, dt = null, Mt = null, j = null, bt = null, Tt = null, fe = null;
      }
    };
  }
  const s = new e(), a = new n(), o = new r(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, f = {}, u = {}, p = /* @__PURE__ */ new WeakMap(), _ = [], y = null, m = !1, d = null, b = null, A = null, M = null, R = null, T = null, C = null, x = new Yt(0, 0, 0), E = 0, P = !1, w = null, B = null, q = null, $ = null, D = null;
  const k = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let U = !1, Y = 0;
  const tt = i.getParameter(i.VERSION);
  tt.indexOf("WebGL") !== -1 ? (Y = parseFloat(/^WebGL (\d)/.exec(tt)[1]), U = Y >= 1) : tt.indexOf("OpenGL ES") !== -1 && (Y = parseFloat(/^OpenGL ES (\d)/.exec(tt)[1]), U = Y >= 2);
  let st = null, ot = {};
  const St = i.getParameter(i.SCISSOR_BOX), Xt = i.getParameter(i.VIEWPORT), re = new ue().fromArray(St), Qt = new ue().fromArray(Xt);
  function K(I, ct, Z, dt) {
    const Mt = new Uint8Array(4), j = i.createTexture();
    i.bindTexture(I, j), i.texParameteri(I, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(I, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let bt = 0; bt < Z; bt++)
      I === i.TEXTURE_3D || I === i.TEXTURE_2D_ARRAY ? i.texImage3D(ct, 0, i.RGBA, 1, 1, dt, 0, i.RGBA, i.UNSIGNED_BYTE, Mt) : i.texImage2D(ct + bt, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, Mt);
    return j;
  }
  const lt = {};
  lt[i.TEXTURE_2D] = K(i.TEXTURE_2D, i.TEXTURE_2D, 1), lt[i.TEXTURE_CUBE_MAP] = K(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), lt[i.TEXTURE_2D_ARRAY] = K(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), lt[i.TEXTURE_3D] = K(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), it(i.DEPTH_TEST), a.setFunc(3), _t(!1), pt(1), it(i.CULL_FACE), nt(0);
  function it(I) {
    h[I] !== !0 && (i.enable(I), h[I] = !0);
  }
  function Pt(I) {
    h[I] !== !1 && (i.disable(I), h[I] = !1);
  }
  function Ot(I, ct) {
    return u[I] !== ct ? (i.bindFramebuffer(I, ct), u[I] = ct, I === i.DRAW_FRAMEBUFFER && (u[i.FRAMEBUFFER] = ct), I === i.FRAMEBUFFER && (u[i.DRAW_FRAMEBUFFER] = ct), !0) : !1;
  }
  function It(I, ct) {
    let Z = _, dt = !1;
    if (I) {
      Z = p.get(ct), Z === void 0 && (Z = [], p.set(ct, Z));
      const Mt = I.textures;
      if (Z.length !== Mt.length || Z[0] !== i.COLOR_ATTACHMENT0) {
        for (let j = 0, bt = Mt.length; j < bt; j++)
          Z[j] = i.COLOR_ATTACHMENT0 + j;
        Z.length = Mt.length, dt = !0;
      }
    } else
      Z[0] !== i.BACK && (Z[0] = i.BACK, dt = !0);
    dt && i.drawBuffers(Z);
  }
  function te(I) {
    return y !== I ? (i.useProgram(I), y = I, !0) : !1;
  }
  const zt = {
    100: i.FUNC_ADD,
    101: i.FUNC_SUBTRACT,
    102: i.FUNC_REVERSE_SUBTRACT
  };
  zt[103] = i.MIN, zt[104] = i.MAX;
  const Q = {
    200: i.ZERO,
    201: i.ONE,
    202: i.SRC_COLOR,
    204: i.SRC_ALPHA,
    210: i.SRC_ALPHA_SATURATE,
    208: i.DST_COLOR,
    206: i.DST_ALPHA,
    203: i.ONE_MINUS_SRC_COLOR,
    205: i.ONE_MINUS_SRC_ALPHA,
    209: i.ONE_MINUS_DST_COLOR,
    207: i.ONE_MINUS_DST_ALPHA,
    211: i.CONSTANT_COLOR,
    212: i.ONE_MINUS_CONSTANT_COLOR,
    213: i.CONSTANT_ALPHA,
    214: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function nt(I, ct, Z, dt, Mt, j, bt, Tt, fe, le) {
    if (I === 0) {
      m === !0 && (Pt(i.BLEND), m = !1);
      return;
    }
    if (m === !1 && (it(i.BLEND), m = !0), I !== 5) {
      if (I !== d || le !== P) {
        if ((b !== 100 || R !== 100) && (i.blendEquation(i.FUNC_ADD), b = 100, R = 100), le)
          switch (I) {
            case 1:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFuncSeparate(i.DST_COLOR, i.ONE_MINUS_SRC_ALPHA, i.ZERO, i.ONE);
              break;
            default:
              Jt("WebGLState: Invalid blending: ", I);
              break;
          }
        else
          switch (I) {
            case 1:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE, i.ONE, i.ONE);
              break;
            case 3:
              Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
              break;
            case 4:
              Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
              break;
            default:
              Jt("WebGLState: Invalid blending: ", I);
              break;
          }
        A = null, M = null, T = null, C = null, x.set(0, 0, 0), E = 0, d = I, P = le;
      }
      return;
    }
    Mt = Mt || ct, j = j || Z, bt = bt || dt, (ct !== b || Mt !== R) && (i.blendEquationSeparate(zt[ct], zt[Mt]), b = ct, R = Mt), (Z !== A || dt !== M || j !== T || bt !== C) && (i.blendFuncSeparate(Q[Z], Q[dt], Q[j], Q[bt]), A = Z, M = dt, T = j, C = bt), (Tt.equals(x) === !1 || fe !== E) && (i.blendColor(Tt.r, Tt.g, Tt.b, fe), x.copy(Tt), E = fe), d = I, P = !1;
  }
  function et(I, ct) {
    I.side === 2 ? Pt(i.CULL_FACE) : it(i.CULL_FACE);
    let Z = I.side === 1;
    ct && (Z = !Z), _t(Z), I.blending === 1 && I.transparent === !1 ? nt(0) : nt(I.blending, I.blendEquation, I.blendSrc, I.blendDst, I.blendEquationAlpha, I.blendSrcAlpha, I.blendDstAlpha, I.blendColor, I.blendAlpha, I.premultipliedAlpha), a.setFunc(I.depthFunc), a.setTest(I.depthTest), a.setMask(I.depthWrite), s.setMask(I.colorWrite);
    const dt = I.stencilWrite;
    o.setTest(dt), dt && (o.setMask(I.stencilWriteMask), o.setFunc(I.stencilFunc, I.stencilRef, I.stencilFuncMask), o.setOp(I.stencilFail, I.stencilZFail, I.stencilZPass)), Rt(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits), I.alphaToCoverage === !0 ? it(i.SAMPLE_ALPHA_TO_COVERAGE) : Pt(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function _t(I) {
    w !== I && (I ? i.frontFace(i.CW) : i.frontFace(i.CCW), w = I);
  }
  function pt(I) {
    I !== 0 ? (it(i.CULL_FACE), I !== B && (I === 1 ? i.cullFace(i.BACK) : I === 2 ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : Pt(i.CULL_FACE), B = I;
  }
  function Ft(I) {
    I !== q && (U && i.lineWidth(I), q = I);
  }
  function Rt(I, ct, Z) {
    I ? (it(i.POLYGON_OFFSET_FILL), ($ !== ct || D !== Z) && ($ = ct, D = Z, a.getReversed() && (ct = -ct), i.polygonOffset(ct, Z))) : Pt(i.POLYGON_OFFSET_FILL);
  }
  function Bt(I) {
    I ? it(i.SCISSOR_TEST) : Pt(i.SCISSOR_TEST);
  }
  function Gt(I) {
    I === void 0 && (I = i.TEXTURE0 + k - 1), st !== I && (i.activeTexture(I), st = I);
  }
  function L(I, ct, Z) {
    Z === void 0 && (st === null ? Z = i.TEXTURE0 + k - 1 : Z = st);
    let dt = ot[Z];
    dt === void 0 && (dt = { type: void 0, texture: void 0 }, ot[Z] = dt), (dt.type !== I || dt.texture !== ct) && (st !== Z && (i.activeTexture(Z), st = Z), i.bindTexture(I, ct || lt[I]), dt.type = I, dt.texture = ct);
  }
  function ne() {
    const I = ot[st];
    I !== void 0 && I.type !== void 0 && (i.bindTexture(I.type, null), I.type = void 0, I.texture = void 0);
  }
  function Kt() {
    try {
      i.compressedTexImage2D(...arguments);
    } catch (I) {
      Jt("WebGLState:", I);
    }
  }
  function S() {
    try {
      i.compressedTexImage3D(...arguments);
    } catch (I) {
      Jt("WebGLState:", I);
    }
  }
  function g() {
    try {
      i.texSubImage2D(...arguments);
    } catch (I) {
      Jt("WebGLState:", I);
    }
  }
  function O() {
    try {
      i.texSubImage3D(...arguments);
    } catch (I) {
      Jt("WebGLState:", I);
    }
  }
  function V() {
    try {
      i.compressedTexSubImage2D(...arguments);
    } catch (I) {
      Jt("WebGLState:", I);
    }
  }
  function W() {
    try {
      i.compressedTexSubImage3D(...arguments);
    } catch (I) {
      Jt("WebGLState:", I);
    }
  }
  function rt() {
    try {
      i.texStorage2D(...arguments);
    } catch (I) {
      Jt("WebGLState:", I);
    }
  }
  function at() {
    try {
      i.texStorage3D(...arguments);
    } catch (I) {
      Jt("WebGLState:", I);
    }
  }
  function X() {
    try {
      i.texImage2D(...arguments);
    } catch (I) {
      Jt("WebGLState:", I);
    }
  }
  function J() {
    try {
      i.texImage3D(...arguments);
    } catch (I) {
      Jt("WebGLState:", I);
    }
  }
  function ht(I) {
    return f[I] !== void 0 ? f[I] : i.getParameter(I);
  }
  function Ct(I, ct) {
    f[I] !== ct && (i.pixelStorei(I, ct), f[I] = ct);
  }
  function mt(I) {
    re.equals(I) === !1 && (i.scissor(I.x, I.y, I.z, I.w), re.copy(I));
  }
  function ft(I) {
    Qt.equals(I) === !1 && (i.viewport(I.x, I.y, I.z, I.w), Qt.copy(I));
  }
  function Dt(I, ct) {
    let Z = c.get(ct);
    Z === void 0 && (Z = /* @__PURE__ */ new WeakMap(), c.set(ct, Z));
    let dt = Z.get(I);
    dt === void 0 && (dt = i.getUniformBlockIndex(ct, I.name), Z.set(I, dt));
  }
  function Nt(I, ct) {
    const dt = c.get(ct).get(I);
    l.get(ct) !== dt && (i.uniformBlockBinding(ct, dt, I.__bindingPointIndex), l.set(ct, dt));
  }
  function Ht() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), a.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), i.pixelStorei(i.PACK_ALIGNMENT, 4), i.pixelStorei(i.UNPACK_ALIGNMENT, 4), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, !1), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, i.BROWSER_DEFAULT_WEBGL), i.pixelStorei(i.PACK_ROW_LENGTH, 0), i.pixelStorei(i.PACK_SKIP_PIXELS, 0), i.pixelStorei(i.PACK_SKIP_ROWS, 0), i.pixelStorei(i.UNPACK_ROW_LENGTH, 0), i.pixelStorei(i.UNPACK_IMAGE_HEIGHT, 0), i.pixelStorei(i.UNPACK_SKIP_PIXELS, 0), i.pixelStorei(i.UNPACK_SKIP_ROWS, 0), i.pixelStorei(i.UNPACK_SKIP_IMAGES, 0), h = {}, f = {}, st = null, ot = {}, u = {}, p = /* @__PURE__ */ new WeakMap(), _ = [], y = null, m = !1, d = null, b = null, A = null, M = null, R = null, T = null, C = null, x = new Yt(0, 0, 0), E = 0, P = !1, w = null, B = null, q = null, $ = null, D = null, re.set(0, 0, i.canvas.width, i.canvas.height), Qt.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: it,
    disable: Pt,
    bindFramebuffer: Ot,
    drawBuffers: It,
    useProgram: te,
    setBlending: nt,
    setMaterial: et,
    setFlipSided: _t,
    setCullFace: pt,
    setLineWidth: Ft,
    setPolygonOffset: Rt,
    setScissorTest: Bt,
    activeTexture: Gt,
    bindTexture: L,
    unbindTexture: ne,
    compressedTexImage2D: Kt,
    compressedTexImage3D: S,
    texImage2D: X,
    texImage3D: J,
    pixelStorei: Ct,
    getParameter: ht,
    updateUBOMapping: Dt,
    uniformBlockBinding: Nt,
    texStorage2D: rt,
    texStorage3D: at,
    texSubImage2D: g,
    texSubImage3D: O,
    compressedTexSubImage2D: V,
    compressedTexSubImage3D: W,
    scissor: mt,
    viewport: ft,
    reset: Ht
  };
}
function hd(i, t, e, n, r, s, a) {
  const o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new ut(), h = /* @__PURE__ */ new WeakMap(), f = /* @__PURE__ */ new Set();
  let u;
  const p = /* @__PURE__ */ new WeakMap();
  let _ = !1;
  try {
    _ = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function y(S, g) {
    return _ ? new OffscreenCanvas(S, g) : Zi("canvas");
  }
  function m(S, g, O) {
    let V = 1;
    const W = Kt(S);
    if ((W.width > O || W.height > O) && (V = O / Math.max(W.width, W.height)), V < 1)
      if (typeof HTMLImageElement < "u" && S instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && S instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && S instanceof ImageBitmap || typeof VideoFrame < "u" && S instanceof VideoFrame) {
        const rt = Math.floor(V * W.width), at = Math.floor(V * W.height);
        u === void 0 && (u = y(rt, at));
        const X = g ? y(rt, at) : u;
        return X.width = rt, X.height = at, X.getContext("2d").drawImage(S, 0, 0, rt, at), Ut("WebGLRenderer: Texture has been resized from (" + W.width + "x" + W.height + ") to (" + rt + "x" + at + ")."), X;
      } else
        return "data" in S && Ut("WebGLRenderer: Image in DataTexture is too big (" + W.width + "x" + W.height + ")."), S;
    return S;
  }
  function d(S) {
    return S.generateMipmaps;
  }
  function b(S) {
    i.generateMipmap(S);
  }
  function A(S) {
    return S.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : S.isWebGL3DRenderTarget ? i.TEXTURE_3D : S.isWebGLArrayRenderTarget || S.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function M(S, g, O, V, W, rt = !1) {
    if (S !== null) {
      if (i[S] !== void 0) return i[S];
      Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + S + "'");
    }
    let at;
    V && (at = t.get("EXT_texture_norm16"), at || Ut("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let X = g;
    if (g === i.RED && (O === i.FLOAT && (X = i.R32F), O === i.HALF_FLOAT && (X = i.R16F), O === i.UNSIGNED_BYTE && (X = i.R8), O === i.UNSIGNED_SHORT && at && (X = at.R16_EXT), O === i.SHORT && at && (X = at.R16_SNORM_EXT)), g === i.RED_INTEGER && (O === i.UNSIGNED_BYTE && (X = i.R8UI), O === i.UNSIGNED_SHORT && (X = i.R16UI), O === i.UNSIGNED_INT && (X = i.R32UI), O === i.BYTE && (X = i.R8I), O === i.SHORT && (X = i.R16I), O === i.INT && (X = i.R32I)), g === i.RG && (O === i.FLOAT && (X = i.RG32F), O === i.HALF_FLOAT && (X = i.RG16F), O === i.UNSIGNED_BYTE && (X = i.RG8), O === i.UNSIGNED_SHORT && at && (X = at.RG16_EXT), O === i.SHORT && at && (X = at.RG16_SNORM_EXT)), g === i.RG_INTEGER && (O === i.UNSIGNED_BYTE && (X = i.RG8UI), O === i.UNSIGNED_SHORT && (X = i.RG16UI), O === i.UNSIGNED_INT && (X = i.RG32UI), O === i.BYTE && (X = i.RG8I), O === i.SHORT && (X = i.RG16I), O === i.INT && (X = i.RG32I)), g === i.RGB_INTEGER && (O === i.UNSIGNED_BYTE && (X = i.RGB8UI), O === i.UNSIGNED_SHORT && (X = i.RGB16UI), O === i.UNSIGNED_INT && (X = i.RGB32UI), O === i.BYTE && (X = i.RGB8I), O === i.SHORT && (X = i.RGB16I), O === i.INT && (X = i.RGB32I)), g === i.RGBA_INTEGER && (O === i.UNSIGNED_BYTE && (X = i.RGBA8UI), O === i.UNSIGNED_SHORT && (X = i.RGBA16UI), O === i.UNSIGNED_INT && (X = i.RGBA32UI), O === i.BYTE && (X = i.RGBA8I), O === i.SHORT && (X = i.RGBA16I), O === i.INT && (X = i.RGBA32I)), g === i.RGB && (O === i.UNSIGNED_SHORT && at && (X = at.RGB16_EXT), O === i.SHORT && at && (X = at.RGB16_SNORM_EXT), O === i.UNSIGNED_INT_5_9_9_9_REV && (X = i.RGB9_E5), O === i.UNSIGNED_INT_10F_11F_11F_REV && (X = i.R11F_G11F_B10F)), g === i.RGBA) {
      const J = rt ? Yi : $t.getTransfer(W);
      O === i.FLOAT && (X = i.RGBA32F), O === i.HALF_FLOAT && (X = i.RGBA16F), O === i.UNSIGNED_BYTE && (X = J === ee ? i.SRGB8_ALPHA8 : i.RGBA8), O === i.UNSIGNED_SHORT && at && (X = at.RGBA16_EXT), O === i.SHORT && at && (X = at.RGBA16_SNORM_EXT), O === i.UNSIGNED_SHORT_4_4_4_4 && (X = i.RGBA4), O === i.UNSIGNED_SHORT_5_5_5_1 && (X = i.RGB5_A1);
    }
    return (X === i.R16F || X === i.R32F || X === i.RG16F || X === i.RG32F || X === i.RGBA16F || X === i.RGBA32F) && t.get("EXT_color_buffer_float"), X;
  }
  function R(S, g) {
    let O;
    return S ? g === null || g === 1014 || g === 1020 ? O = i.DEPTH24_STENCIL8 : g === 1015 ? O = i.DEPTH32F_STENCIL8 : g === 1012 && (O = i.DEPTH24_STENCIL8, Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : g === null || g === 1014 || g === 1020 ? O = i.DEPTH_COMPONENT24 : g === 1015 ? O = i.DEPTH_COMPONENT32F : g === 1012 && (O = i.DEPTH_COMPONENT16), O;
  }
  function T(S, g) {
    return d(S) === !0 || S.isFramebufferTexture && S.minFilter !== 1003 && S.minFilter !== 1006 ? Math.log2(Math.max(g.width, g.height)) + 1 : S.mipmaps !== void 0 && S.mipmaps.length > 0 ? S.mipmaps.length : S.isCompressedTexture && Array.isArray(S.image) ? g.mipmaps.length : 1;
  }
  function C(S) {
    const g = S.target;
    g.removeEventListener("dispose", C), E(g), g.isVideoTexture && h.delete(g), g.isHTMLTexture && f.delete(g);
  }
  function x(S) {
    const g = S.target;
    g.removeEventListener("dispose", x), w(g);
  }
  function E(S) {
    const g = n.get(S);
    if (g.__webglInit === void 0) return;
    const O = S.source, V = p.get(O);
    if (V) {
      const W = V[g.__cacheKey];
      W.usedTimes--, W.usedTimes === 0 && P(S), Object.keys(V).length === 0 && p.delete(O);
    }
    n.remove(S);
  }
  function P(S) {
    const g = n.get(S);
    i.deleteTexture(g.__webglTexture);
    const O = S.source, V = p.get(O);
    delete V[g.__cacheKey], a.memory.textures--;
  }
  function w(S) {
    const g = n.get(S);
    if (S.depthTexture && (S.depthTexture.dispose(), n.remove(S.depthTexture)), S.isWebGLCubeRenderTarget)
      for (let V = 0; V < 6; V++) {
        if (Array.isArray(g.__webglFramebuffer[V]))
          for (let W = 0; W < g.__webglFramebuffer[V].length; W++) i.deleteFramebuffer(g.__webglFramebuffer[V][W]);
        else
          i.deleteFramebuffer(g.__webglFramebuffer[V]);
        g.__webglDepthbuffer && i.deleteRenderbuffer(g.__webglDepthbuffer[V]);
      }
    else {
      if (Array.isArray(g.__webglFramebuffer))
        for (let V = 0; V < g.__webglFramebuffer.length; V++) i.deleteFramebuffer(g.__webglFramebuffer[V]);
      else
        i.deleteFramebuffer(g.__webglFramebuffer);
      if (g.__webglDepthbuffer && i.deleteRenderbuffer(g.__webglDepthbuffer), g.__webglMultisampledFramebuffer && i.deleteFramebuffer(g.__webglMultisampledFramebuffer), g.__webglColorRenderbuffer)
        for (let V = 0; V < g.__webglColorRenderbuffer.length; V++)
          g.__webglColorRenderbuffer[V] && i.deleteRenderbuffer(g.__webglColorRenderbuffer[V]);
      g.__webglDepthRenderbuffer && i.deleteRenderbuffer(g.__webglDepthRenderbuffer);
    }
    const O = S.textures;
    for (let V = 0, W = O.length; V < W; V++) {
      const rt = n.get(O[V]);
      rt.__webglTexture && (i.deleteTexture(rt.__webglTexture), a.memory.textures--), n.remove(O[V]);
    }
    n.remove(S);
  }
  let B = 0;
  function q() {
    B = 0;
  }
  function $() {
    return B;
  }
  function D(S) {
    B = S;
  }
  function k() {
    const S = B;
    return S >= r.maxTextures && Ut("WebGLTextures: Trying to use " + S + " texture units while this GPU supports only " + r.maxTextures), B += 1, S;
  }
  function U(S) {
    const g = [];
    return g.push(S.wrapS), g.push(S.wrapT), g.push(S.wrapR || 0), g.push(S.magFilter), g.push(S.minFilter), g.push(S.anisotropy), g.push(S.internalFormat), g.push(S.format), g.push(S.type), g.push(S.generateMipmaps), g.push(S.premultiplyAlpha), g.push(S.flipY), g.push(S.unpackAlignment), g.push(S.colorSpace), g.join();
  }
  function Y(S, g) {
    const O = n.get(S);
    if (S.isVideoTexture && L(S), S.isRenderTargetTexture === !1 && S.isExternalTexture !== !0 && S.version > 0 && O.__version !== S.version) {
      const V = S.image;
      if (V === null)
        Ut("WebGLRenderer: Texture marked for update but no image data found.");
      else if (V.complete === !1)
        Ut("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Pt(O, S, g);
        return;
      }
    } else S.isExternalTexture && (O.__webglTexture = S.sourceTexture ? S.sourceTexture : null);
    e.bindTexture(i.TEXTURE_2D, O.__webglTexture, i.TEXTURE0 + g);
  }
  function tt(S, g) {
    const O = n.get(S);
    if (S.isRenderTargetTexture === !1 && S.version > 0 && O.__version !== S.version) {
      Pt(O, S, g);
      return;
    } else S.isExternalTexture && (O.__webglTexture = S.sourceTexture ? S.sourceTexture : null);
    e.bindTexture(i.TEXTURE_2D_ARRAY, O.__webglTexture, i.TEXTURE0 + g);
  }
  function st(S, g) {
    const O = n.get(S);
    if (S.isRenderTargetTexture === !1 && S.version > 0 && O.__version !== S.version) {
      Pt(O, S, g);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, O.__webglTexture, i.TEXTURE0 + g);
  }
  function ot(S, g) {
    const O = n.get(S);
    if (S.isCubeDepthTexture !== !0 && S.version > 0 && O.__version !== S.version) {
      Ot(O, S, g);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, O.__webglTexture, i.TEXTURE0 + g);
  }
  const St = {
    1e3: i.REPEAT,
    1001: i.CLAMP_TO_EDGE,
    1002: i.MIRRORED_REPEAT
  }, Xt = {
    1003: i.NEAREST,
    1004: i.NEAREST_MIPMAP_NEAREST,
    1005: i.NEAREST_MIPMAP_LINEAR,
    1006: i.LINEAR,
    1007: i.LINEAR_MIPMAP_NEAREST,
    1008: i.LINEAR_MIPMAP_LINEAR
  }, re = {
    512: i.NEVER,
    519: i.ALWAYS,
    513: i.LESS,
    515: i.LEQUAL,
    514: i.EQUAL,
    518: i.GEQUAL,
    516: i.GREATER,
    517: i.NOTEQUAL
  };
  function Qt(S, g) {
    if (g.type === 1015 && t.has("OES_texture_float_linear") === !1 && (g.magFilter === 1006 || g.magFilter === 1007 || g.magFilter === 1005 || g.magFilter === 1008 || g.minFilter === 1006 || g.minFilter === 1007 || g.minFilter === 1005 || g.minFilter === 1008) && Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(S, i.TEXTURE_WRAP_S, St[g.wrapS]), i.texParameteri(S, i.TEXTURE_WRAP_T, St[g.wrapT]), (S === i.TEXTURE_3D || S === i.TEXTURE_2D_ARRAY) && i.texParameteri(S, i.TEXTURE_WRAP_R, St[g.wrapR]), i.texParameteri(S, i.TEXTURE_MAG_FILTER, Xt[g.magFilter]), i.texParameteri(S, i.TEXTURE_MIN_FILTER, Xt[g.minFilter]), g.compareFunction && (i.texParameteri(S, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(S, i.TEXTURE_COMPARE_FUNC, re[g.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (g.magFilter === 1003 || g.minFilter !== 1005 && g.minFilter !== 1008 || g.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
      if (g.anisotropy > 1 || n.get(g).__currentAnisotropy) {
        const O = t.get("EXT_texture_filter_anisotropic");
        i.texParameterf(S, O.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(g.anisotropy, r.getMaxAnisotropy())), n.get(g).__currentAnisotropy = g.anisotropy;
      }
    }
  }
  function K(S, g) {
    let O = !1;
    S.__webglInit === void 0 && (S.__webglInit = !0, g.addEventListener("dispose", C));
    const V = g.source;
    let W = p.get(V);
    W === void 0 && (W = {}, p.set(V, W));
    const rt = U(g);
    if (rt !== S.__cacheKey) {
      W[rt] === void 0 && (W[rt] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, O = !0), W[rt].usedTimes++;
      const at = W[S.__cacheKey];
      at !== void 0 && (W[S.__cacheKey].usedTimes--, at.usedTimes === 0 && P(g)), S.__cacheKey = rt, S.__webglTexture = W[rt].texture;
    }
    return O;
  }
  function lt(S, g, O) {
    return Math.floor(Math.floor(S / O) / g);
  }
  function it(S, g, O, V) {
    const rt = S.updateRanges;
    if (rt.length === 0)
      e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, g.width, g.height, O, V, g.data);
    else {
      rt.sort((Ct, mt) => Ct.start - mt.start);
      let at = 0;
      for (let Ct = 1; Ct < rt.length; Ct++) {
        const mt = rt[at], ft = rt[Ct], Dt = mt.start + mt.count, Nt = lt(ft.start, g.width, 4), Ht = lt(mt.start, g.width, 4);
        ft.start <= Dt + 1 && Nt === Ht && lt(ft.start + ft.count - 1, g.width, 4) === Nt ? mt.count = Math.max(
          mt.count,
          ft.start + ft.count - mt.start
        ) : (++at, rt[at] = ft);
      }
      rt.length = at + 1;
      const X = e.getParameter(i.UNPACK_ROW_LENGTH), J = e.getParameter(i.UNPACK_SKIP_PIXELS), ht = e.getParameter(i.UNPACK_SKIP_ROWS);
      e.pixelStorei(i.UNPACK_ROW_LENGTH, g.width);
      for (let Ct = 0, mt = rt.length; Ct < mt; Ct++) {
        const ft = rt[Ct], Dt = Math.floor(ft.start / 4), Nt = Math.ceil(ft.count / 4), Ht = Dt % g.width, I = Math.floor(Dt / g.width), ct = Nt, Z = 1;
        e.pixelStorei(i.UNPACK_SKIP_PIXELS, Ht), e.pixelStorei(i.UNPACK_SKIP_ROWS, I), e.texSubImage2D(i.TEXTURE_2D, 0, Ht, I, ct, Z, O, V, g.data);
      }
      S.clearUpdateRanges(), e.pixelStorei(i.UNPACK_ROW_LENGTH, X), e.pixelStorei(i.UNPACK_SKIP_PIXELS, J), e.pixelStorei(i.UNPACK_SKIP_ROWS, ht);
    }
  }
  function Pt(S, g, O) {
    let V = i.TEXTURE_2D;
    (g.isDataArrayTexture || g.isCompressedArrayTexture) && (V = i.TEXTURE_2D_ARRAY), g.isData3DTexture && (V = i.TEXTURE_3D);
    const W = K(S, g), rt = g.source;
    e.bindTexture(V, S.__webglTexture, i.TEXTURE0 + O);
    const at = n.get(rt);
    if (rt.version !== at.__version || W === !0) {
      if (e.activeTexture(i.TEXTURE0 + O), (typeof ImageBitmap < "u" && g.image instanceof ImageBitmap) === !1) {
        const Z = $t.getPrimaries($t.workingColorSpace), dt = g.colorSpace === "" ? null : $t.getPrimaries(g.colorSpace), Mt = g.colorSpace === "" || Z === dt ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
        e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, g.flipY), e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Mt);
      }
      e.pixelStorei(i.UNPACK_ALIGNMENT, g.unpackAlignment);
      let J = m(g.image, !1, r.maxTextureSize);
      J = ne(g, J);
      const ht = s.convert(g.format, g.colorSpace), Ct = s.convert(g.type);
      let mt = M(g.internalFormat, ht, Ct, g.normalized, g.colorSpace, g.isVideoTexture);
      Qt(V, g);
      let ft;
      const Dt = g.mipmaps, Nt = g.isVideoTexture !== !0, Ht = at.__version === void 0 || W === !0, I = rt.dataReady, ct = T(g, J);
      if (g.isDepthTexture)
        mt = R(g.format === 1027, g.type), Ht && (Nt ? e.texStorage2D(i.TEXTURE_2D, 1, mt, J.width, J.height) : e.texImage2D(i.TEXTURE_2D, 0, mt, J.width, J.height, 0, ht, Ct, null));
      else if (g.isDataTexture)
        if (Dt.length > 0) {
          Nt && Ht && e.texStorage2D(i.TEXTURE_2D, ct, mt, Dt[0].width, Dt[0].height);
          for (let Z = 0, dt = Dt.length; Z < dt; Z++)
            ft = Dt[Z], Nt ? I && e.texSubImage2D(i.TEXTURE_2D, Z, 0, 0, ft.width, ft.height, ht, Ct, ft.data) : e.texImage2D(i.TEXTURE_2D, Z, mt, ft.width, ft.height, 0, ht, Ct, ft.data);
          g.generateMipmaps = !1;
        } else
          Nt ? (Ht && e.texStorage2D(i.TEXTURE_2D, ct, mt, J.width, J.height), I && it(g, J, ht, Ct)) : e.texImage2D(i.TEXTURE_2D, 0, mt, J.width, J.height, 0, ht, Ct, J.data);
      else if (g.isCompressedTexture)
        if (g.isCompressedArrayTexture) {
          Nt && Ht && e.texStorage3D(i.TEXTURE_2D_ARRAY, ct, mt, Dt[0].width, Dt[0].height, J.depth);
          for (let Z = 0, dt = Dt.length; Z < dt; Z++)
            if (ft = Dt[Z], g.format !== 1023)
              if (ht !== null)
                if (Nt) {
                  if (I)
                    if (g.layerUpdates.size > 0) {
                      const Mt = Zs(ft.width, ft.height, g.format, g.type);
                      for (const j of g.layerUpdates) {
                        const bt = ft.data.subarray(
                          j * Mt / ft.data.BYTES_PER_ELEMENT,
                          (j + 1) * Mt / ft.data.BYTES_PER_ELEMENT
                        );
                        e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, Z, 0, 0, j, ft.width, ft.height, 1, ht, bt);
                      }
                      g.clearLayerUpdates();
                    } else
                      e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, Z, 0, 0, 0, ft.width, ft.height, J.depth, ht, ft.data);
                } else
                  e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, Z, mt, ft.width, ft.height, J.depth, 0, ft.data, 0, 0);
              else
                Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Nt ? I && e.texSubImage3D(i.TEXTURE_2D_ARRAY, Z, 0, 0, 0, ft.width, ft.height, J.depth, ht, Ct, ft.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, Z, mt, ft.width, ft.height, J.depth, 0, ht, Ct, ft.data);
        } else {
          Nt && Ht && e.texStorage2D(i.TEXTURE_2D, ct, mt, Dt[0].width, Dt[0].height);
          for (let Z = 0, dt = Dt.length; Z < dt; Z++)
            ft = Dt[Z], g.format !== 1023 ? ht !== null ? Nt ? I && e.compressedTexSubImage2D(i.TEXTURE_2D, Z, 0, 0, ft.width, ft.height, ht, ft.data) : e.compressedTexImage2D(i.TEXTURE_2D, Z, mt, ft.width, ft.height, 0, ft.data) : Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Nt ? I && e.texSubImage2D(i.TEXTURE_2D, Z, 0, 0, ft.width, ft.height, ht, Ct, ft.data) : e.texImage2D(i.TEXTURE_2D, Z, mt, ft.width, ft.height, 0, ht, Ct, ft.data);
        }
      else if (g.isDataArrayTexture)
        if (Nt) {
          if (Ht && e.texStorage3D(i.TEXTURE_2D_ARRAY, ct, mt, J.width, J.height, J.depth), I)
            if (g.layerUpdates.size > 0) {
              const Z = Zs(J.width, J.height, g.format, g.type);
              for (const dt of g.layerUpdates) {
                const Mt = J.data.subarray(
                  dt * Z / J.data.BYTES_PER_ELEMENT,
                  (dt + 1) * Z / J.data.BYTES_PER_ELEMENT
                );
                e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, dt, J.width, J.height, 1, ht, Ct, Mt);
              }
              g.clearLayerUpdates();
            } else
              e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, ht, Ct, J.data);
        } else
          e.texImage3D(i.TEXTURE_2D_ARRAY, 0, mt, J.width, J.height, J.depth, 0, ht, Ct, J.data);
      else if (g.isData3DTexture)
        Nt ? (Ht && e.texStorage3D(i.TEXTURE_3D, ct, mt, J.width, J.height, J.depth), I && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, ht, Ct, J.data)) : e.texImage3D(i.TEXTURE_3D, 0, mt, J.width, J.height, J.depth, 0, ht, Ct, J.data);
      else if (g.isFramebufferTexture) {
        if (Ht)
          if (Nt)
            e.texStorage2D(i.TEXTURE_2D, ct, mt, J.width, J.height);
          else {
            let Z = J.width, dt = J.height;
            for (let Mt = 0; Mt < ct; Mt++)
              e.texImage2D(i.TEXTURE_2D, Mt, mt, Z, dt, 0, ht, Ct, null), Z >>= 1, dt >>= 1;
          }
      } else if (g.isHTMLTexture) {
        if ("texElementImage2D" in i) {
          const Z = i.canvas;
          if (Z.hasAttribute("layoutsubtree") || Z.setAttribute("layoutsubtree", "true"), J.parentNode !== Z) {
            Z.appendChild(J), f.add(g), Z.onpaint = (dt) => {
              const Mt = dt.changedElements;
              for (const j of f)
                Mt.includes(j.image) && (j.needsUpdate = !0);
            }, Z.requestPaint();
            return;
          }
          if (i.texElementImage2D.length === 3)
            i.texElementImage2D(i.TEXTURE_2D, i.RGBA8, J);
          else {
            const Mt = i.RGBA, j = i.RGBA, bt = i.UNSIGNED_BYTE;
            i.texElementImage2D(i.TEXTURE_2D, 0, Mt, j, bt, J);
          }
          i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE);
        }
      } else if (Dt.length > 0) {
        if (Nt && Ht) {
          const Z = Kt(Dt[0]);
          e.texStorage2D(i.TEXTURE_2D, ct, mt, Z.width, Z.height);
        }
        for (let Z = 0, dt = Dt.length; Z < dt; Z++)
          ft = Dt[Z], Nt ? I && e.texSubImage2D(i.TEXTURE_2D, Z, 0, 0, ht, Ct, ft) : e.texImage2D(i.TEXTURE_2D, Z, mt, ht, Ct, ft);
        g.generateMipmaps = !1;
      } else if (Nt) {
        if (Ht) {
          const Z = Kt(J);
          e.texStorage2D(i.TEXTURE_2D, ct, mt, Z.width, Z.height);
        }
        I && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, ht, Ct, J);
      } else
        e.texImage2D(i.TEXTURE_2D, 0, mt, ht, Ct, J);
      d(g) && b(V), at.__version = rt.version, g.onUpdate && g.onUpdate(g);
    }
    S.__version = g.version;
  }
  function Ot(S, g, O) {
    if (g.image.length !== 6) return;
    const V = K(S, g), W = g.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, S.__webglTexture, i.TEXTURE0 + O);
    const rt = n.get(W);
    if (W.version !== rt.__version || V === !0) {
      e.activeTexture(i.TEXTURE0 + O);
      const at = $t.getPrimaries($t.workingColorSpace), X = g.colorSpace === "" ? null : $t.getPrimaries(g.colorSpace), J = g.colorSpace === "" || at === X ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, g.flipY), e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), e.pixelStorei(i.UNPACK_ALIGNMENT, g.unpackAlignment), e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, J);
      const ht = g.isCompressedTexture || g.image[0].isCompressedTexture, Ct = g.image[0] && g.image[0].isDataTexture, mt = [];
      for (let j = 0; j < 6; j++)
        !ht && !Ct ? mt[j] = m(g.image[j], !0, r.maxCubemapSize) : mt[j] = Ct ? g.image[j].image : g.image[j], mt[j] = ne(g, mt[j]);
      const ft = mt[0], Dt = s.convert(g.format, g.colorSpace), Nt = s.convert(g.type), Ht = M(g.internalFormat, Dt, Nt, g.normalized, g.colorSpace), I = g.isVideoTexture !== !0, ct = rt.__version === void 0 || V === !0, Z = W.dataReady;
      let dt = T(g, ft);
      Qt(i.TEXTURE_CUBE_MAP, g);
      let Mt;
      if (ht) {
        I && ct && e.texStorage2D(i.TEXTURE_CUBE_MAP, dt, Ht, ft.width, ft.height);
        for (let j = 0; j < 6; j++) {
          Mt = mt[j].mipmaps;
          for (let bt = 0; bt < Mt.length; bt++) {
            const Tt = Mt[bt];
            g.format !== 1023 ? Dt !== null ? I ? Z && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, bt, 0, 0, Tt.width, Tt.height, Dt, Tt.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, bt, Ht, Tt.width, Tt.height, 0, Tt.data) : Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : I ? Z && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, bt, 0, 0, Tt.width, Tt.height, Dt, Nt, Tt.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, bt, Ht, Tt.width, Tt.height, 0, Dt, Nt, Tt.data);
          }
        }
      } else {
        if (Mt = g.mipmaps, I && ct) {
          Mt.length > 0 && dt++;
          const j = Kt(mt[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, dt, Ht, j.width, j.height);
        }
        for (let j = 0; j < 6; j++)
          if (Ct) {
            I ? Z && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, mt[j].width, mt[j].height, Dt, Nt, mt[j].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, Ht, mt[j].width, mt[j].height, 0, Dt, Nt, mt[j].data);
            for (let bt = 0; bt < Mt.length; bt++) {
              const fe = Mt[bt].image[j].image;
              I ? Z && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, bt + 1, 0, 0, fe.width, fe.height, Dt, Nt, fe.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, bt + 1, Ht, fe.width, fe.height, 0, Dt, Nt, fe.data);
            }
          } else {
            I ? Z && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, 0, 0, Dt, Nt, mt[j]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, 0, Ht, Dt, Nt, mt[j]);
            for (let bt = 0; bt < Mt.length; bt++) {
              const Tt = Mt[bt];
              I ? Z && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, bt + 1, 0, 0, Dt, Nt, Tt.image[j]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + j, bt + 1, Ht, Dt, Nt, Tt.image[j]);
            }
          }
      }
      d(g) && b(i.TEXTURE_CUBE_MAP), rt.__version = W.version, g.onUpdate && g.onUpdate(g);
    }
    S.__version = g.version;
  }
  function It(S, g, O, V, W, rt) {
    const at = s.convert(O.format, O.colorSpace), X = s.convert(O.type), J = M(O.internalFormat, at, X, O.normalized, O.colorSpace), ht = n.get(g), Ct = n.get(O);
    if (Ct.__renderTarget = g, !ht.__hasExternalTextures) {
      const mt = Math.max(1, g.width >> rt), ft = Math.max(1, g.height >> rt);
      W === i.TEXTURE_3D || W === i.TEXTURE_2D_ARRAY ? e.texImage3D(W, rt, J, mt, ft, g.depth, 0, at, X, null) : e.texImage2D(W, rt, J, mt, ft, 0, at, X, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, S), Gt(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, V, W, Ct.__webglTexture, 0, Bt(g)) : (W === i.TEXTURE_2D || W >= i.TEXTURE_CUBE_MAP_POSITIVE_X && W <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, V, W, Ct.__webglTexture, rt), e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function te(S, g, O) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, S), g.depthBuffer) {
      const V = g.depthTexture, W = V && V.isDepthTexture ? V.type : null, rt = R(g.stencilBuffer, W), at = g.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
      Gt(g) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Bt(g), rt, g.width, g.height) : O ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Bt(g), rt, g.width, g.height) : i.renderbufferStorage(i.RENDERBUFFER, rt, g.width, g.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, at, i.RENDERBUFFER, S);
    } else {
      const V = g.textures;
      for (let W = 0; W < V.length; W++) {
        const rt = V[W], at = s.convert(rt.format, rt.colorSpace), X = s.convert(rt.type), J = M(rt.internalFormat, at, X, rt.normalized, rt.colorSpace);
        Gt(g) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Bt(g), J, g.width, g.height) : O ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Bt(g), J, g.width, g.height) : i.renderbufferStorage(i.RENDERBUFFER, J, g.width, g.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function zt(S, g, O) {
    const V = g.isWebGLCubeRenderTarget === !0;
    if (e.bindFramebuffer(i.FRAMEBUFFER, S), !(g.depthTexture && g.depthTexture.isDepthTexture))
      throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
    const W = n.get(g.depthTexture);
    if (W.__renderTarget = g, (!W.__webglTexture || g.depthTexture.image.width !== g.width || g.depthTexture.image.height !== g.height) && (g.depthTexture.image.width = g.width, g.depthTexture.image.height = g.height, g.depthTexture.needsUpdate = !0), V) {
      if (W.__webglInit === void 0 && (W.__webglInit = !0, g.depthTexture.addEventListener("dispose", C)), W.__webglTexture === void 0) {
        W.__webglTexture = i.createTexture(), e.bindTexture(i.TEXTURE_CUBE_MAP, W.__webglTexture), Qt(i.TEXTURE_CUBE_MAP, g.depthTexture);
        const ht = s.convert(g.depthTexture.format), Ct = s.convert(g.depthTexture.type);
        let mt;
        g.depthTexture.format === 1026 ? mt = i.DEPTH_COMPONENT24 : g.depthTexture.format === 1027 && (mt = i.DEPTH24_STENCIL8);
        for (let ft = 0; ft < 6; ft++)
          i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ft, 0, mt, g.width, g.height, 0, ht, Ct, null);
      }
    } else
      Y(g.depthTexture, 0);
    const rt = W.__webglTexture, at = Bt(g), X = V ? i.TEXTURE_CUBE_MAP_POSITIVE_X + O : i.TEXTURE_2D, J = g.depthTexture.format === 1027 ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
    if (g.depthTexture.format === 1026)
      Gt(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, J, X, rt, 0, at) : i.framebufferTexture2D(i.FRAMEBUFFER, J, X, rt, 0);
    else if (g.depthTexture.format === 1027)
      Gt(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, J, X, rt, 0, at) : i.framebufferTexture2D(i.FRAMEBUFFER, J, X, rt, 0);
    else
      throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
  }
  function Q(S) {
    const g = n.get(S), O = S.isWebGLCubeRenderTarget === !0;
    if (g.__boundDepthTexture !== S.depthTexture) {
      const V = S.depthTexture;
      if (g.__depthDisposeCallback && g.__depthDisposeCallback(), V) {
        const W = () => {
          delete g.__boundDepthTexture, delete g.__depthDisposeCallback, V.removeEventListener("dispose", W);
        };
        V.addEventListener("dispose", W), g.__depthDisposeCallback = W;
      }
      g.__boundDepthTexture = V;
    }
    if (S.depthTexture && !g.__autoAllocateDepthBuffer)
      if (O)
        for (let V = 0; V < 6; V++)
          zt(g.__webglFramebuffer[V], S, V);
      else {
        const V = S.texture.mipmaps;
        V && V.length > 0 ? zt(g.__webglFramebuffer[0], S, 0) : zt(g.__webglFramebuffer, S, 0);
      }
    else if (O) {
      g.__webglDepthbuffer = [];
      for (let V = 0; V < 6; V++)
        if (e.bindFramebuffer(i.FRAMEBUFFER, g.__webglFramebuffer[V]), g.__webglDepthbuffer[V] === void 0)
          g.__webglDepthbuffer[V] = i.createRenderbuffer(), te(g.__webglDepthbuffer[V], S, !1);
        else {
          const W = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, rt = g.__webglDepthbuffer[V];
          i.bindRenderbuffer(i.RENDERBUFFER, rt), i.framebufferRenderbuffer(i.FRAMEBUFFER, W, i.RENDERBUFFER, rt);
        }
    } else {
      const V = S.texture.mipmaps;
      if (V && V.length > 0 ? e.bindFramebuffer(i.FRAMEBUFFER, g.__webglFramebuffer[0]) : e.bindFramebuffer(i.FRAMEBUFFER, g.__webglFramebuffer), g.__webglDepthbuffer === void 0)
        g.__webglDepthbuffer = i.createRenderbuffer(), te(g.__webglDepthbuffer, S, !1);
      else {
        const W = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, rt = g.__webglDepthbuffer;
        i.bindRenderbuffer(i.RENDERBUFFER, rt), i.framebufferRenderbuffer(i.FRAMEBUFFER, W, i.RENDERBUFFER, rt);
      }
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function nt(S, g, O) {
    const V = n.get(S);
    g !== void 0 && It(V.__webglFramebuffer, S, S.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), O !== void 0 && Q(S);
  }
  function et(S) {
    const g = S.texture, O = n.get(S), V = n.get(g);
    S.addEventListener("dispose", x);
    const W = S.textures, rt = S.isWebGLCubeRenderTarget === !0, at = W.length > 1;
    if (at || (V.__webglTexture === void 0 && (V.__webglTexture = i.createTexture()), V.__version = g.version, a.memory.textures++), rt) {
      O.__webglFramebuffer = [];
      for (let X = 0; X < 6; X++)
        if (g.mipmaps && g.mipmaps.length > 0) {
          O.__webglFramebuffer[X] = [];
          for (let J = 0; J < g.mipmaps.length; J++)
            O.__webglFramebuffer[X][J] = i.createFramebuffer();
        } else
          O.__webglFramebuffer[X] = i.createFramebuffer();
    } else {
      if (g.mipmaps && g.mipmaps.length > 0) {
        O.__webglFramebuffer = [];
        for (let X = 0; X < g.mipmaps.length; X++)
          O.__webglFramebuffer[X] = i.createFramebuffer();
      } else
        O.__webglFramebuffer = i.createFramebuffer();
      if (at)
        for (let X = 0, J = W.length; X < J; X++) {
          const ht = n.get(W[X]);
          ht.__webglTexture === void 0 && (ht.__webglTexture = i.createTexture(), a.memory.textures++);
        }
      if (S.samples > 0 && Gt(S) === !1) {
        O.__webglMultisampledFramebuffer = i.createFramebuffer(), O.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, O.__webglMultisampledFramebuffer);
        for (let X = 0; X < W.length; X++) {
          const J = W[X];
          O.__webglColorRenderbuffer[X] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, O.__webglColorRenderbuffer[X]);
          const ht = s.convert(J.format, J.colorSpace), Ct = s.convert(J.type), mt = M(J.internalFormat, ht, Ct, J.normalized, J.colorSpace, S.isXRRenderTarget === !0), ft = Bt(S);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, ft, mt, S.width, S.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + X, i.RENDERBUFFER, O.__webglColorRenderbuffer[X]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), S.depthBuffer && (O.__webglDepthRenderbuffer = i.createRenderbuffer(), te(O.__webglDepthRenderbuffer, S, !0)), e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (rt) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, V.__webglTexture), Qt(i.TEXTURE_CUBE_MAP, g);
      for (let X = 0; X < 6; X++)
        if (g.mipmaps && g.mipmaps.length > 0)
          for (let J = 0; J < g.mipmaps.length; J++)
            It(O.__webglFramebuffer[X][J], S, g, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + X, J);
        else
          It(O.__webglFramebuffer[X], S, g, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + X, 0);
      d(g) && b(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (at) {
      for (let X = 0, J = W.length; X < J; X++) {
        const ht = W[X], Ct = n.get(ht);
        let mt = i.TEXTURE_2D;
        (S.isWebGL3DRenderTarget || S.isWebGLArrayRenderTarget) && (mt = S.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(mt, Ct.__webglTexture), Qt(mt, ht), It(O.__webglFramebuffer, S, ht, i.COLOR_ATTACHMENT0 + X, mt, 0), d(ht) && b(mt);
      }
      e.unbindTexture();
    } else {
      let X = i.TEXTURE_2D;
      if ((S.isWebGL3DRenderTarget || S.isWebGLArrayRenderTarget) && (X = S.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(X, V.__webglTexture), Qt(X, g), g.mipmaps && g.mipmaps.length > 0)
        for (let J = 0; J < g.mipmaps.length; J++)
          It(O.__webglFramebuffer[J], S, g, i.COLOR_ATTACHMENT0, X, J);
      else
        It(O.__webglFramebuffer, S, g, i.COLOR_ATTACHMENT0, X, 0);
      d(g) && b(X), e.unbindTexture();
    }
    S.depthBuffer && Q(S);
  }
  function _t(S) {
    const g = S.textures;
    for (let O = 0, V = g.length; O < V; O++) {
      const W = g[O];
      if (d(W)) {
        const rt = A(S), at = n.get(W).__webglTexture;
        e.bindTexture(rt, at), b(rt), e.unbindTexture();
      }
    }
  }
  const pt = [], Ft = [];
  function Rt(S) {
    if (S.samples > 0) {
      if (Gt(S) === !1) {
        const g = S.textures, O = S.width, V = S.height;
        let W = i.COLOR_BUFFER_BIT;
        const rt = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, at = n.get(S), X = g.length > 1;
        if (X)
          for (let ht = 0; ht < g.length; ht++)
            e.bindFramebuffer(i.FRAMEBUFFER, at.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ht, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, at.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ht, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, at.__webglMultisampledFramebuffer);
        const J = S.texture.mipmaps;
        J && J.length > 0 ? e.bindFramebuffer(i.DRAW_FRAMEBUFFER, at.__webglFramebuffer[0]) : e.bindFramebuffer(i.DRAW_FRAMEBUFFER, at.__webglFramebuffer);
        for (let ht = 0; ht < g.length; ht++) {
          if (S.resolveDepthBuffer && (S.depthBuffer && (W |= i.DEPTH_BUFFER_BIT), S.stencilBuffer && S.resolveStencilBuffer && (W |= i.STENCIL_BUFFER_BIT)), X) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, at.__webglColorRenderbuffer[ht]);
            const Ct = n.get(g[ht]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Ct, 0);
          }
          i.blitFramebuffer(0, 0, O, V, 0, 0, O, V, W, i.NEAREST), l === !0 && (pt.length = 0, Ft.length = 0, pt.push(i.COLOR_ATTACHMENT0 + ht), S.depthBuffer && S.resolveDepthBuffer === !1 && (pt.push(rt), Ft.push(rt), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, Ft)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, pt));
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), X)
          for (let ht = 0; ht < g.length; ht++) {
            e.bindFramebuffer(i.FRAMEBUFFER, at.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ht, i.RENDERBUFFER, at.__webglColorRenderbuffer[ht]);
            const Ct = n.get(g[ht]).__webglTexture;
            e.bindFramebuffer(i.FRAMEBUFFER, at.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ht, i.TEXTURE_2D, Ct, 0);
          }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, at.__webglMultisampledFramebuffer);
      } else if (S.depthBuffer && S.resolveDepthBuffer === !1 && l) {
        const g = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [g]);
      }
    }
  }
  function Bt(S) {
    return Math.min(r.maxSamples, S.samples);
  }
  function Gt(S) {
    const g = n.get(S);
    return S.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && g.__useRenderToTexture !== !1;
  }
  function L(S) {
    const g = a.render.frame;
    h.get(S) !== g && (h.set(S, g), S.update());
  }
  function ne(S, g) {
    const O = S.colorSpace, V = S.format, W = S.type;
    return S.isCompressedTexture === !0 || S.isVideoTexture === !0 || O !== qi && O !== "" && ($t.getTransfer(O) === ee ? (V !== 1023 || W !== 1009) && Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Jt("WebGLTextures: Unsupported texture color space:", O)), g;
  }
  function Kt(S) {
    return typeof HTMLImageElement < "u" && S instanceof HTMLImageElement ? (c.width = S.naturalWidth || S.width, c.height = S.naturalHeight || S.height) : typeof VideoFrame < "u" && S instanceof VideoFrame ? (c.width = S.displayWidth, c.height = S.displayHeight) : (c.width = S.width, c.height = S.height), c;
  }
  this.allocateTextureUnit = k, this.resetTextureUnits = q, this.getTextureUnits = $, this.setTextureUnits = D, this.setTexture2D = Y, this.setTexture2DArray = tt, this.setTexture3D = st, this.setTextureCube = ot, this.rebindTextures = nt, this.setupRenderTarget = et, this.updateRenderTargetMipmap = _t, this.updateMultisampleRenderTarget = Rt, this.setupDepthRenderbuffer = Q, this.setupFrameBufferTexture = It, this.useMultisampledRTT = Gt, this.isReversedDepthBuffer = function() {
    return e.buffers.depth.getReversed();
  };
}
function fd(i, t) {
  function e(n, r = "") {
    let s;
    const a = $t.getTransfer(r);
    if (n === 1009) return i.UNSIGNED_BYTE;
    if (n === 1017) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === 1018) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === 35902) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === 35899) return i.UNSIGNED_INT_10F_11F_11F_REV;
    if (n === 1010) return i.BYTE;
    if (n === 1011) return i.SHORT;
    if (n === 1012) return i.UNSIGNED_SHORT;
    if (n === 1013) return i.INT;
    if (n === 1014) return i.UNSIGNED_INT;
    if (n === 1015) return i.FLOAT;
    if (n === 1016) return i.HALF_FLOAT;
    if (n === 1021) return i.ALPHA;
    if (n === 1022) return i.RGB;
    if (n === 1023) return i.RGBA;
    if (n === 1026) return i.DEPTH_COMPONENT;
    if (n === 1027) return i.DEPTH_STENCIL;
    if (n === 1028) return i.RED;
    if (n === 1029) return i.RED_INTEGER;
    if (n === 1030) return i.RG;
    if (n === 1031) return i.RG_INTEGER;
    if (n === 1033) return i.RGBA_INTEGER;
    if (n === 33776 || n === 33777 || n === 33778 || n === 33779)
      if (a === ee)
        if (s = t.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = t.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === 35840 || n === 35841 || n === 35842 || n === 35843)
      if (s = t.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491)
      if (s = t.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === 36196 || n === 37492) return a === ee ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === 37496) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === 37488) return s.COMPRESSED_R11_EAC;
        if (n === 37489) return s.COMPRESSED_SIGNED_R11_EAC;
        if (n === 37490) return s.COMPRESSED_RG11_EAC;
        if (n === 37491) return s.COMPRESSED_SIGNED_RG11_EAC;
      } else
        return null;
    if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821)
      if (s = t.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === 37808) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === 37809) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === 37810) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === 37811) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === 37812) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === 37813) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === 37814) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === 37815) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === 37816) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === 37817) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === 37818) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === 37819) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === 37820) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === 37821) return a === ee ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === 36492 || n === 36494 || n === 36495)
      if (s = t.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === 36492) return a === ee ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === 36283 || n === 36284 || n === 36285 || n === 36286)
      if (s = t.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === 36283) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === 1020 ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
const dd = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, pd = `
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
class md {
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
  init(t, e) {
    if (this.texture === null) {
      const n = new Ra(t.texture);
      (t.depthNear !== e.depthNear || t.depthFar !== e.depthFar) && (this.depthNear = t.depthNear, this.depthFar = t.depthFar), this.texture = n;
    }
  }
  /**
   * Returns a plane mesh that visualizes the depth texture.
   *
   * @param {ArrayCamera} cameraXR - The XR camera.
   * @return {?Mesh} The plane mesh.
   */
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport, n = new He({
        vertexShader: dd,
        fragmentShader: pd,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: e.z },
          depthHeight: { value: e.w }
        }
      });
      this.mesh = new pe(new xi(20, 20), n);
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
class gd extends Tn {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGL2RenderingContext} gl - The rendering context.
   */
  constructor(t, e) {
    super();
    const n = this;
    let r = null, s = 1, a = null, o = "local-floor", l = 1, c = null, h = null, f = null, u = null, p = null, _ = null;
    const y = typeof XRWebGLBinding < "u", m = new md(), d = {}, b = e.getContextAttributes();
    let A = null, M = null;
    const R = [], T = [], C = new ut();
    let x = null;
    const E = new Ie();
    E.viewport = new ue();
    const P = new Ie();
    P.viewport = new ue();
    const w = [E, P], B = new Tl();
    let q = null, $ = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(K) {
      let lt = R[K];
      return lt === void 0 && (lt = new lr(), R[K] = lt), lt.getTargetRaySpace();
    }, this.getControllerGrip = function(K) {
      let lt = R[K];
      return lt === void 0 && (lt = new lr(), R[K] = lt), lt.getGripSpace();
    }, this.getHand = function(K) {
      let lt = R[K];
      return lt === void 0 && (lt = new lr(), R[K] = lt), lt.getHandSpace();
    };
    function D(K) {
      const lt = T.indexOf(K.inputSource);
      if (lt === -1)
        return;
      const it = R[lt];
      it !== void 0 && (it.update(K.inputSource, K.frame, c || a), it.dispatchEvent({ type: K.type, data: K.inputSource }));
    }
    function k() {
      r.removeEventListener("select", D), r.removeEventListener("selectstart", D), r.removeEventListener("selectend", D), r.removeEventListener("squeeze", D), r.removeEventListener("squeezestart", D), r.removeEventListener("squeezeend", D), r.removeEventListener("end", k), r.removeEventListener("inputsourceschange", U);
      for (let K = 0; K < R.length; K++) {
        const lt = T[K];
        lt !== null && (T[K] = null, R[K].disconnect(lt));
      }
      q = null, $ = null, m.reset();
      for (const K in d)
        delete d[K];
      t.setRenderTarget(A), p = null, u = null, f = null, r = null, M = null, Qt.stop(), n.isPresenting = !1, t.setPixelRatio(x), t.setSize(C.width, C.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(K) {
      s = K, n.isPresenting === !0 && Ut("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(K) {
      o = K, n.isPresenting === !0 && Ut("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function(K) {
      c = K;
    }, this.getBaseLayer = function() {
      return u !== null ? u : p;
    }, this.getBinding = function() {
      return f === null && y && (f = new XRWebGLBinding(r, e)), f;
    }, this.getFrame = function() {
      return _;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(K) {
      if (r = K, r !== null) {
        if (A = t.getRenderTarget(), r.addEventListener("select", D), r.addEventListener("selectstart", D), r.addEventListener("selectend", D), r.addEventListener("squeeze", D), r.addEventListener("squeezestart", D), r.addEventListener("squeezeend", D), r.addEventListener("end", k), r.addEventListener("inputsourceschange", U), b.xrCompatible !== !0 && await e.makeXRCompatible(), x = t.getPixelRatio(), t.getSize(C), y && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let it = null, Pt = null, Ot = null;
          b.depth && (Ot = b.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, it = b.stencil ? 1027 : 1026, Pt = b.stencil ? 1020 : 1014);
          const It = {
            colorFormat: e.RGBA8,
            depthFormat: Ot,
            scaleFactor: s
          };
          f = this.getBinding(), u = f.createProjectionLayer(It), r.updateRenderState({ layers: [u] }), t.setPixelRatio(1), t.setSize(u.textureWidth, u.textureHeight, !1), M = new Je(
            u.textureWidth,
            u.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new qn(u.textureWidth, u.textureHeight, Pt, void 0, void 0, void 0, void 0, void 0, void 0, it),
              stencilBuffer: b.stencil,
              colorSpace: t.outputColorSpace,
              samples: b.antialias ? 4 : 0,
              resolveDepthBuffer: u.ignoreDepthValues === !1,
              resolveStencilBuffer: u.ignoreDepthValues === !1
            }
          );
        } else {
          const it = {
            antialias: b.antialias,
            alpha: !0,
            depth: b.depth,
            stencil: b.stencil,
            framebufferScaleFactor: s
          };
          p = new XRWebGLLayer(r, e, it), r.updateRenderState({ baseLayer: p }), t.setPixelRatio(1), t.setSize(p.framebufferWidth, p.framebufferHeight, !1), M = new Je(
            p.framebufferWidth,
            p.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: t.outputColorSpace,
              stencilBuffer: b.stencil,
              resolveDepthBuffer: p.ignoreDepthValues === !1,
              resolveStencilBuffer: p.ignoreDepthValues === !1
            }
          );
        }
        M.isXRRenderTarget = !0, this.setFoveation(l), c = null, a = await r.requestReferenceSpace(o), Qt.setContext(r), Qt.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return m.getDepthTexture();
    };
    function U(K) {
      for (let lt = 0; lt < K.removed.length; lt++) {
        const it = K.removed[lt], Pt = T.indexOf(it);
        Pt >= 0 && (T[Pt] = null, R[Pt].disconnect(it));
      }
      for (let lt = 0; lt < K.added.length; lt++) {
        const it = K.added[lt];
        let Pt = T.indexOf(it);
        if (Pt === -1) {
          for (let It = 0; It < R.length; It++)
            if (It >= T.length) {
              T.push(it), Pt = It;
              break;
            } else if (T[It] === null) {
              T[It] = it, Pt = It;
              break;
            }
          if (Pt === -1) break;
        }
        const Ot = R[Pt];
        Ot && Ot.connect(it);
      }
    }
    const Y = new N(), tt = new N();
    function st(K, lt, it) {
      Y.setFromMatrixPosition(lt.matrixWorld), tt.setFromMatrixPosition(it.matrixWorld);
      const Pt = Y.distanceTo(tt), Ot = lt.projectionMatrix.elements, It = it.projectionMatrix.elements, te = Ot[14] / (Ot[10] - 1), zt = Ot[14] / (Ot[10] + 1), Q = (Ot[9] + 1) / Ot[5], nt = (Ot[9] - 1) / Ot[5], et = (Ot[8] - 1) / Ot[0], _t = (It[8] + 1) / It[0], pt = te * et, Ft = te * _t, Rt = Pt / (-et + _t), Bt = Rt * -et;
      if (lt.matrixWorld.decompose(K.position, K.quaternion, K.scale), K.translateX(Bt), K.translateZ(Rt), K.matrixWorld.compose(K.position, K.quaternion, K.scale), K.matrixWorldInverse.copy(K.matrixWorld).invert(), Ot[10] === -1)
        K.projectionMatrix.copy(lt.projectionMatrix), K.projectionMatrixInverse.copy(lt.projectionMatrixInverse);
      else {
        const Gt = te + Rt, L = zt + Rt, ne = pt - Bt, Kt = Ft + (Pt - Bt), S = Q * zt / L * Gt, g = nt * zt / L * Gt;
        K.projectionMatrix.makePerspective(ne, Kt, S, g, Gt, L), K.projectionMatrixInverse.copy(K.projectionMatrix).invert();
      }
    }
    function ot(K, lt) {
      lt === null ? K.matrixWorld.copy(K.matrix) : K.matrixWorld.multiplyMatrices(lt.matrixWorld, K.matrix), K.matrixWorldInverse.copy(K.matrixWorld).invert();
    }
    this.updateCamera = function(K) {
      if (r === null) return;
      let lt = K.near, it = K.far;
      m.texture !== null && (m.depthNear > 0 && (lt = m.depthNear), m.depthFar > 0 && (it = m.depthFar)), B.near = P.near = E.near = lt, B.far = P.far = E.far = it, (q !== B.near || $ !== B.far) && (r.updateRenderState({
        depthNear: B.near,
        depthFar: B.far
      }), q = B.near, $ = B.far), B.layers.mask = K.layers.mask | 6, E.layers.mask = B.layers.mask & -5, P.layers.mask = B.layers.mask & -3;
      const Pt = K.parent, Ot = B.cameras;
      ot(B, Pt);
      for (let It = 0; It < Ot.length; It++)
        ot(Ot[It], Pt);
      Ot.length === 2 ? st(B, E, P) : B.projectionMatrix.copy(E.projectionMatrix), St(K, B, Pt);
    };
    function St(K, lt, it) {
      it === null ? K.matrix.copy(lt.matrixWorld) : (K.matrix.copy(it.matrixWorld), K.matrix.invert(), K.matrix.multiply(lt.matrixWorld)), K.matrix.decompose(K.position, K.quaternion, K.scale), K.updateMatrixWorld(!0), K.projectionMatrix.copy(lt.projectionMatrix), K.projectionMatrixInverse.copy(lt.projectionMatrixInverse), K.isPerspectiveCamera && (K.fov = Nr * 2 * Math.atan(1 / K.projectionMatrix.elements[5]), K.zoom = 1);
    }
    this.getCamera = function() {
      return B;
    }, this.getFoveation = function() {
      if (!(u === null && p === null))
        return l;
    }, this.setFoveation = function(K) {
      l = K, u !== null && (u.fixedFoveation = K), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = K);
    }, this.hasDepthSensing = function() {
      return m.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return m.getMesh(B);
    }, this.getCameraTexture = function(K) {
      return d[K];
    };
    let Xt = null;
    function re(K, lt) {
      if (h = lt.getViewerPose(c || a), _ = lt, h !== null) {
        const it = h.views;
        p !== null && (t.setRenderTargetFramebuffer(M, p.framebuffer), t.setRenderTarget(M));
        let Pt = !1;
        it.length !== B.cameras.length && (B.cameras.length = 0, Pt = !0);
        for (let zt = 0; zt < it.length; zt++) {
          const Q = it[zt];
          let nt = null;
          if (p !== null)
            nt = p.getViewport(Q);
          else {
            const _t = f.getViewSubImage(u, Q);
            nt = _t.viewport, zt === 0 && (t.setRenderTargetTextures(
              M,
              _t.colorTexture,
              _t.depthStencilTexture
            ), t.setRenderTarget(M));
          }
          let et = w[zt];
          et === void 0 && (et = new Ie(), et.layers.enable(zt), et.viewport = new ue(), w[zt] = et), et.matrix.fromArray(Q.transform.matrix), et.matrix.decompose(et.position, et.quaternion, et.scale), et.projectionMatrix.fromArray(Q.projectionMatrix), et.projectionMatrixInverse.copy(et.projectionMatrix).invert(), et.viewport.set(nt.x, nt.y, nt.width, nt.height), zt === 0 && (B.matrix.copy(et.matrix), B.matrix.decompose(B.position, B.quaternion, B.scale)), Pt === !0 && B.cameras.push(et);
        }
        const Ot = r.enabledFeatures;
        if (Ot && Ot.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && y) {
          f = n.getBinding();
          const zt = f.getDepthInformation(it[0]);
          zt && zt.isValid && zt.texture && m.init(zt, r.renderState);
        }
        if (Ot && Ot.includes("camera-access") && y) {
          t.state.unbindTexture(), f = n.getBinding();
          for (let zt = 0; zt < it.length; zt++) {
            const Q = it[zt].camera;
            if (Q) {
              let nt = d[Q];
              nt || (nt = new Ra(), d[Q] = nt);
              const et = f.getCameraImage(Q);
              nt.sourceTexture = et;
            }
          }
        }
      }
      for (let it = 0; it < R.length; it++) {
        const Pt = T[it], Ot = R[it];
        Pt !== null && Ot !== void 0 && Ot.update(Pt, lt, c || a);
      }
      Xt && Xt(K, lt), lt.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: lt }), _ = null;
    }
    const Qt = new Ga();
    Qt.setAnimationLoop(re), this.setAnimationLoop = function(K) {
      Xt = K;
    }, this.dispose = function() {
    };
  }
}
const _d = /* @__PURE__ */ new oe(), Ya = /* @__PURE__ */ new Vt();
Ya.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function xd(i, t) {
  function e(m, d) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), d.value.copy(m.matrix);
  }
  function n(m, d) {
    d.color.getRGB(m.fogColor.value, Oa(i)), d.isFog ? (m.fogNear.value = d.near, m.fogFar.value = d.far) : d.isFogExp2 && (m.fogDensity.value = d.density);
  }
  function r(m, d, b, A, M) {
    d.isNodeMaterial ? d.uniformsNeedUpdate = !1 : d.isMeshBasicMaterial ? s(m, d) : d.isMeshLambertMaterial ? (s(m, d), d.envMap && (m.envMapIntensity.value = d.envMapIntensity)) : d.isMeshToonMaterial ? (s(m, d), f(m, d)) : d.isMeshPhongMaterial ? (s(m, d), h(m, d), d.envMap && (m.envMapIntensity.value = d.envMapIntensity)) : d.isMeshStandardMaterial ? (s(m, d), u(m, d), d.isMeshPhysicalMaterial && p(m, d, M)) : d.isMeshMatcapMaterial ? (s(m, d), _(m, d)) : d.isMeshDepthMaterial ? s(m, d) : d.isMeshDistanceMaterial ? (s(m, d), y(m, d)) : d.isMeshNormalMaterial ? s(m, d) : d.isLineBasicMaterial ? (a(m, d), d.isLineDashedMaterial && o(m, d)) : d.isPointsMaterial ? l(m, d, b, A) : d.isSpriteMaterial ? c(m, d) : d.isShadowMaterial ? (m.color.value.copy(d.color), m.opacity.value = d.opacity) : d.isShaderMaterial && (d.uniformsNeedUpdate = !1);
  }
  function s(m, d) {
    m.opacity.value = d.opacity, d.color && m.diffuse.value.copy(d.color), d.emissive && m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity), d.map && (m.map.value = d.map, e(d.map, m.mapTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, e(d.alphaMap, m.alphaMapTransform)), d.bumpMap && (m.bumpMap.value = d.bumpMap, e(d.bumpMap, m.bumpMapTransform), m.bumpScale.value = d.bumpScale, d.side === 1 && (m.bumpScale.value *= -1)), d.normalMap && (m.normalMap.value = d.normalMap, e(d.normalMap, m.normalMapTransform), m.normalScale.value.copy(d.normalScale), d.side === 1 && m.normalScale.value.negate()), d.displacementMap && (m.displacementMap.value = d.displacementMap, e(d.displacementMap, m.displacementMapTransform), m.displacementScale.value = d.displacementScale, m.displacementBias.value = d.displacementBias), d.emissiveMap && (m.emissiveMap.value = d.emissiveMap, e(d.emissiveMap, m.emissiveMapTransform)), d.specularMap && (m.specularMap.value = d.specularMap, e(d.specularMap, m.specularMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
    const b = t.get(d), A = b.envMap, M = b.envMapRotation;
    A && (m.envMap.value = A, m.envMapRotation.value.setFromMatrix4(_d.makeRotationFromEuler(M)).transpose(), A.isCubeTexture && A.isRenderTargetTexture === !1 && m.envMapRotation.value.premultiply(Ya), m.reflectivity.value = d.reflectivity, m.ior.value = d.ior, m.refractionRatio.value = d.refractionRatio), d.lightMap && (m.lightMap.value = d.lightMap, m.lightMapIntensity.value = d.lightMapIntensity, e(d.lightMap, m.lightMapTransform)), d.aoMap && (m.aoMap.value = d.aoMap, m.aoMapIntensity.value = d.aoMapIntensity, e(d.aoMap, m.aoMapTransform));
  }
  function a(m, d) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, d.map && (m.map.value = d.map, e(d.map, m.mapTransform));
  }
  function o(m, d) {
    m.dashSize.value = d.dashSize, m.totalSize.value = d.dashSize + d.gapSize, m.scale.value = d.scale;
  }
  function l(m, d, b, A) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, m.size.value = d.size * b, m.scale.value = A * 0.5, d.map && (m.map.value = d.map, e(d.map, m.uvTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, e(d.alphaMap, m.alphaMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
  }
  function c(m, d) {
    m.diffuse.value.copy(d.color), m.opacity.value = d.opacity, m.rotation.value = d.rotation, d.map && (m.map.value = d.map, e(d.map, m.mapTransform)), d.alphaMap && (m.alphaMap.value = d.alphaMap, e(d.alphaMap, m.alphaMapTransform)), d.alphaTest > 0 && (m.alphaTest.value = d.alphaTest);
  }
  function h(m, d) {
    m.specular.value.copy(d.specular), m.shininess.value = Math.max(d.shininess, 1e-4);
  }
  function f(m, d) {
    d.gradientMap && (m.gradientMap.value = d.gradientMap);
  }
  function u(m, d) {
    m.metalness.value = d.metalness, d.metalnessMap && (m.metalnessMap.value = d.metalnessMap, e(d.metalnessMap, m.metalnessMapTransform)), m.roughness.value = d.roughness, d.roughnessMap && (m.roughnessMap.value = d.roughnessMap, e(d.roughnessMap, m.roughnessMapTransform)), d.envMap && (m.envMapIntensity.value = d.envMapIntensity);
  }
  function p(m, d, b) {
    m.ior.value = d.ior, d.sheen > 0 && (m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen), m.sheenRoughness.value = d.sheenRoughness, d.sheenColorMap && (m.sheenColorMap.value = d.sheenColorMap, e(d.sheenColorMap, m.sheenColorMapTransform)), d.sheenRoughnessMap && (m.sheenRoughnessMap.value = d.sheenRoughnessMap, e(d.sheenRoughnessMap, m.sheenRoughnessMapTransform))), d.clearcoat > 0 && (m.clearcoat.value = d.clearcoat, m.clearcoatRoughness.value = d.clearcoatRoughness, d.clearcoatMap && (m.clearcoatMap.value = d.clearcoatMap, e(d.clearcoatMap, m.clearcoatMapTransform)), d.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = d.clearcoatRoughnessMap, e(d.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), d.clearcoatNormalMap && (m.clearcoatNormalMap.value = d.clearcoatNormalMap, e(d.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale), d.side === 1 && m.clearcoatNormalScale.value.negate())), d.dispersion > 0 && (m.dispersion.value = d.dispersion), d.iridescence > 0 && (m.iridescence.value = d.iridescence, m.iridescenceIOR.value = d.iridescenceIOR, m.iridescenceThicknessMinimum.value = d.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = d.iridescenceThicknessRange[1], d.iridescenceMap && (m.iridescenceMap.value = d.iridescenceMap, e(d.iridescenceMap, m.iridescenceMapTransform)), d.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = d.iridescenceThicknessMap, e(d.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), d.transmission > 0 && (m.transmission.value = d.transmission, m.transmissionSamplerMap.value = b.texture, m.transmissionSamplerSize.value.set(b.width, b.height), d.transmissionMap && (m.transmissionMap.value = d.transmissionMap, e(d.transmissionMap, m.transmissionMapTransform)), m.thickness.value = d.thickness, d.thicknessMap && (m.thicknessMap.value = d.thicknessMap, e(d.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = d.attenuationDistance, m.attenuationColor.value.copy(d.attenuationColor)), d.anisotropy > 0 && (m.anisotropyVector.value.set(d.anisotropy * Math.cos(d.anisotropyRotation), d.anisotropy * Math.sin(d.anisotropyRotation)), d.anisotropyMap && (m.anisotropyMap.value = d.anisotropyMap, e(d.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = d.specularIntensity, m.specularColor.value.copy(d.specularColor), d.specularColorMap && (m.specularColorMap.value = d.specularColorMap, e(d.specularColorMap, m.specularColorMapTransform)), d.specularIntensityMap && (m.specularIntensityMap.value = d.specularIntensityMap, e(d.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function _(m, d) {
    d.matcap && (m.matcap.value = d.matcap);
  }
  function y(m, d) {
    const b = t.get(d).light;
    m.referencePosition.value.setFromMatrixPosition(b.matrixWorld), m.nearDistance.value = b.shadow.camera.near, m.farDistance.value = b.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function vd(i, t, e, n) {
  let r = {}, s = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(M, R) {
    const T = R.program;
    n.uniformBlockBinding(M, T);
  }
  function c(M, R) {
    let T = r[M.id];
    T === void 0 && (m(M), T = h(M), r[M.id] = T, M.addEventListener("dispose", b));
    const C = R.program;
    n.updateUBOMapping(M, C);
    const x = t.render.frame;
    s[M.id] !== x && (u(M), s[M.id] = x);
  }
  function h(M) {
    const R = f();
    M.__bindingPointIndex = R;
    const T = i.createBuffer(), C = M.__size, x = M.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, T), i.bufferData(i.UNIFORM_BUFFER, C, x), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, R, T), T;
  }
  function f() {
    for (let M = 0; M < o; M++)
      if (a.indexOf(M) === -1)
        return a.push(M), M;
    return Jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function u(M) {
    const R = r[M.id], T = M.uniforms, C = M.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, R);
    for (let x = 0, E = T.length; x < E; x++) {
      const P = T[x];
      if (Array.isArray(P))
        for (let w = 0, B = P.length; w < B; w++)
          p(P[w], x, w, C);
      else
        p(P, x, 0, C);
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function p(M, R, T, C) {
    if (y(M, R, T, C) === !0) {
      const x = M.__offset, E = M.value;
      if (Array.isArray(E)) {
        let P = 0;
        for (let w = 0; w < E.length; w++) {
          const B = E[w], q = d(B);
          _(B, M.__data, P), typeof B != "number" && typeof B != "boolean" && !B.isMatrix3 && !ArrayBuffer.isView(B) && (P += q.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else
        _(E, M.__data, 0);
      i.bufferSubData(i.UNIFORM_BUFFER, x, M.__data);
    }
  }
  function _(M, R, T) {
    typeof M == "number" || typeof M == "boolean" ? R[0] = M : M.isMatrix3 ? (R[0] = M.elements[0], R[1] = M.elements[1], R[2] = M.elements[2], R[3] = 0, R[4] = M.elements[3], R[5] = M.elements[4], R[6] = M.elements[5], R[7] = 0, R[8] = M.elements[6], R[9] = M.elements[7], R[10] = M.elements[8], R[11] = 0) : ArrayBuffer.isView(M) ? R.set(new M.constructor(M.buffer, M.byteOffset, R.length)) : M.toArray(R, T);
  }
  function y(M, R, T, C) {
    const x = M.value, E = R + "_" + T;
    if (C[E] === void 0)
      return typeof x == "number" || typeof x == "boolean" ? C[E] = x : ArrayBuffer.isView(x) ? C[E] = x.slice() : C[E] = x.clone(), !0;
    {
      const P = C[E];
      if (typeof x == "number" || typeof x == "boolean") {
        if (P !== x)
          return C[E] = x, !0;
      } else {
        if (ArrayBuffer.isView(x))
          return !0;
        if (P.equals(x) === !1)
          return P.copy(x), !0;
      }
    }
    return !1;
  }
  function m(M) {
    const R = M.uniforms;
    let T = 0;
    const C = 16;
    for (let E = 0, P = R.length; E < P; E++) {
      const w = Array.isArray(R[E]) ? R[E] : [R[E]];
      for (let B = 0, q = w.length; B < q; B++) {
        const $ = w[B], D = Array.isArray($.value) ? $.value : [$.value];
        for (let k = 0, U = D.length; k < U; k++) {
          const Y = D[k], tt = d(Y), st = T % C, ot = st % tt.boundary, St = st + ot;
          T += ot, St !== 0 && C - St < tt.storage && (T += C - St), $.__data = new Float32Array(tt.storage / Float32Array.BYTES_PER_ELEMENT), $.__offset = T, T += tt.storage;
        }
      }
    }
    const x = T % C;
    return x > 0 && (T += C - x), M.__size = T, M.__cache = {}, this;
  }
  function d(M) {
    const R = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof M == "number" || typeof M == "boolean" ? (R.boundary = 4, R.storage = 4) : M.isVector2 ? (R.boundary = 8, R.storage = 8) : M.isVector3 || M.isColor ? (R.boundary = 16, R.storage = 12) : M.isVector4 ? (R.boundary = 16, R.storage = 16) : M.isMatrix3 ? (R.boundary = 48, R.storage = 48) : M.isMatrix4 ? (R.boundary = 64, R.storage = 64) : M.isTexture ? Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(M) ? (R.boundary = 16, R.storage = M.byteLength) : Ut("WebGLRenderer: Unsupported uniform value type.", M), R;
  }
  function b(M) {
    const R = M.target;
    R.removeEventListener("dispose", b);
    const T = a.indexOf(R.__bindingPointIndex);
    a.splice(T, 1), i.deleteBuffer(r[R.id]), delete r[R.id], delete s[R.id];
  }
  function A() {
    for (const M in r)
      i.deleteBuffer(r[M]);
    a = [], r = {}, s = {};
  }
  return {
    bind: l,
    update: c,
    dispose: A
  };
}
const Md = new Uint16Array([
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
let Ze = null;
function Sd() {
  return Ze === null && (Ze = new Aa(Md, 16, 16, 1030, 1016), Ze.name = "DFG_LUT", Ze.minFilter = 1006, Ze.magFilter = 1006, Ze.wrapS = 1001, Ze.wrapT = 1001, Ze.generateMipmaps = !1, Ze.needsUpdate = !0), Ze;
}
class yd {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer~Options} [parameters] - The configuration parameter.
   */
  constructor(t = {}) {
    const {
      canvas: e = no(),
      context: n = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: f = !1,
      reversedDepthBuffer: u = !1,
      outputBufferType: p = 1009
    } = t;
    this.isWebGLRenderer = !0;
    let _;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      _ = n.getContextAttributes().alpha;
    } else
      _ = a;
    const y = p, m = /* @__PURE__ */ new Set([
      1033,
      1031,
      1029
    ]), d = /* @__PURE__ */ new Set([
      1009,
      1014,
      1012,
      1020,
      1017,
      1018
    ]), b = new Uint32Array(4), A = new Int32Array(4), M = new N();
    let R = null, T = null;
    const C = [], x = [];
    let E = null;
    this.domElement = e, this.debug = {
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
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const P = this;
    let w = !1, B = null, q = null, $ = null, D = null;
    this._outputColorSpace = Ue;
    let k = 0, U = 0, Y = null, tt = -1, st = null;
    const ot = new ue(), St = new ue();
    let Xt = null;
    const re = new Yt(0);
    let Qt = 0, K = e.width, lt = e.height, it = 1, Pt = null, Ot = null;
    const It = new ue(0, 0, K, lt), te = new ue(0, 0, K, lt);
    let zt = !1;
    const Q = new Xr();
    let nt = !1, et = !1;
    const _t = new oe(), pt = new N(), Ft = new ue(), Rt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let Bt = !1;
    function Gt() {
      return Y === null ? it : 1;
    }
    let L = n;
    function ne(v, F) {
      return e.getContext(v, F);
    }
    try {
      const v = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: o,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: h,
        failIfMajorPerformanceCaveat: f
      };
      if ("setAttribute" in e && e.setAttribute("data-engine", "three.js r185"), e.addEventListener("webglcontextlost", fe, !1), e.addEventListener("webglcontextrestored", le, !1), e.addEventListener("webglcontextcreationerror", We, !1), L === null) {
        const F = "webgl2";
        if (L = ne(F, v), L === null)
          throw ne(F) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
    } catch (v) {
      throw Jt("WebGLRenderer: " + v.message), v;
    }
    let Kt, S, g, O, V, W, rt, at, X, J, ht, Ct, mt, ft, Dt, Nt, Ht, I, ct, Z, dt, Mt, j;
    function bt() {
      Kt = new Mh(L), Kt.init(), dt = new fd(L, Kt), S = new fh(L, Kt, t, dt), g = new ud(L, Kt), S.reversedDepthBuffer && u && g.buffers.depth.setReversed(!0), q = L.createFramebuffer(), $ = L.createFramebuffer(), D = L.createFramebuffer(), O = new Eh(L), V = new Jf(), W = new hd(L, Kt, g, V, S, dt, O), rt = new vh(P), at = new Rl(L), Mt = new uh(L, at), X = new Sh(L, at, O, Mt), J = new Ah(L, X, at, Mt, O), I = new Th(L, S, W), Dt = new dh(V), ht = new Kf(P, rt, Kt, S, Mt, Dt), Ct = new xd(P, V), mt = new Qf(), ft = new rd(Kt), Ht = new ch(P, rt, g, J, _, l), Nt = new cd(P, J, S), j = new vd(L, O, S, g), ct = new hh(L, Kt, O), Z = new yh(L, Kt, O), O.programs = ht.programs, P.capabilities = S, P.extensions = Kt, P.properties = V, P.renderLists = mt, P.shadowMap = Nt, P.state = g, P.info = O;
    }
    bt(), y !== 1009 && (E = new Rh(y, e.width, e.height, o, r, s));
    const Tt = new gd(P, L);
    this.xr = Tt, this.getContext = function() {
      return L;
    }, this.getContextAttributes = function() {
      return L.getContextAttributes();
    }, this.forceContextLoss = function() {
      const v = Kt.get("WEBGL_lose_context");
      v && v.loseContext();
    }, this.forceContextRestore = function() {
      const v = Kt.get("WEBGL_lose_context");
      v && v.restoreContext();
    }, this.getPixelRatio = function() {
      return it;
    }, this.setPixelRatio = function(v) {
      v !== void 0 && (it = v, this.setSize(K, lt, !1));
    }, this.getSize = function(v) {
      return v.set(K, lt);
    }, this.setSize = function(v, F, H = !0) {
      if (Tt.isPresenting) {
        Ut("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      K = v, lt = F, e.width = Math.floor(v * it), e.height = Math.floor(F * it), H === !0 && (e.style.width = v + "px", e.style.height = F + "px"), E !== null && E.setSize(e.width, e.height), this.setViewport(0, 0, v, F);
    }, this.getDrawingBufferSize = function(v) {
      return v.set(K * it, lt * it).floor();
    }, this.setDrawingBufferSize = function(v, F, H) {
      K = v, lt = F, it = H, e.width = Math.floor(v * H), e.height = Math.floor(F * H), this.setViewport(0, 0, v, F);
    }, this.setEffects = function(v) {
      if (y === 1009) {
        Jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (v) {
        for (let F = 0; F < v.length; F++)
          if (v[F].isOutputPass === !0) {
            Ut("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
            break;
          }
      }
      E.setEffects(v || []);
    }, this.getCurrentViewport = function(v) {
      return v.copy(ot);
    }, this.getViewport = function(v) {
      return v.copy(It);
    }, this.setViewport = function(v, F, H, z) {
      v.isVector4 ? It.set(v.x, v.y, v.z, v.w) : It.set(v, F, H, z), g.viewport(ot.copy(It).multiplyScalar(it).round());
    }, this.getScissor = function(v) {
      return v.copy(te);
    }, this.setScissor = function(v, F, H, z) {
      v.isVector4 ? te.set(v.x, v.y, v.z, v.w) : te.set(v, F, H, z), g.scissor(St.copy(te).multiplyScalar(it).round());
    }, this.getScissorTest = function() {
      return zt;
    }, this.setScissorTest = function(v) {
      g.setScissorTest(zt = v);
    }, this.setOpaqueSort = function(v) {
      Pt = v;
    }, this.setTransparentSort = function(v) {
      Ot = v;
    }, this.getClearColor = function(v) {
      return v.copy(Ht.getClearColor());
    }, this.setClearColor = function() {
      Ht.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return Ht.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ht.setClearAlpha(...arguments);
    }, this.clear = function(v = !0, F = !0, H = !0) {
      let z = 0;
      if (v) {
        let G = !1;
        if (Y !== null) {
          const vt = Y.texture.format;
          G = m.has(vt);
        }
        if (G) {
          const vt = Y.texture.type, Et = d.has(vt), xt = Ht.getClearColor(), At = Ht.getClearAlpha(), wt = xt.r, kt = xt.g, qt = xt.b;
          Et ? (b[0] = wt, b[1] = kt, b[2] = qt, b[3] = At, L.clearBufferuiv(L.COLOR, 0, b)) : (A[0] = wt, A[1] = kt, A[2] = qt, A[3] = At, L.clearBufferiv(L.COLOR, 0, A));
        } else
          z |= L.COLOR_BUFFER_BIT;
      }
      F && (z |= L.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), H && (z |= L.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), z !== 0 && L.clear(z);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function(v) {
      v.setRenderer(this), B = v;
    }, this.dispose = function() {
      e.removeEventListener("webglcontextlost", fe, !1), e.removeEventListener("webglcontextrestored", le, !1), e.removeEventListener("webglcontextcreationerror", We, !1), Ht.dispose(), mt.dispose(), ft.dispose(), V.dispose(), rt.dispose(), J.dispose(), Mt.dispose(), j.dispose(), ht.dispose(), Tt.dispose(), Tt.removeEventListener("sessionstart", rs), Tt.removeEventListener("sessionend", ss), gn.stop();
    };
    function fe(v) {
      v.preventDefault(), ps("WebGLRenderer: Context Lost."), w = !0;
    }
    function le() {
      ps("WebGLRenderer: Context Restored."), w = !1;
      const v = O.autoReset, F = Nt.enabled, H = Nt.autoUpdate, z = Nt.needsUpdate, G = Nt.type;
      bt(), O.autoReset = v, Nt.enabled = F, Nt.autoUpdate = H, Nt.needsUpdate = z, Nt.type = G;
    }
    function We(v) {
      Jt("WebGLRenderer: A WebGL context could not be created. Reason: ", v.statusMessage);
    }
    function Xe(v) {
      const F = v.target;
      F.removeEventListener("dispose", Xe), Za(F);
    }
    function Za(v) {
      Ka(v), V.remove(v);
    }
    function Ka(v) {
      const F = V.get(v).programs;
      F !== void 0 && (F.forEach(function(H) {
        ht.releaseProgram(H);
      }), v.isShaderMaterial && ht.releaseShaderCache(v));
    }
    this.renderBufferDirect = function(v, F, H, z, G, vt) {
      F === null && (F = Rt);
      const Et = G.isMesh && G.matrixWorld.determinantAffine() < 0, xt = Qa(v, F, H, z, G);
      g.setMaterial(z, Et);
      let At = H.index, wt = 1;
      if (z.wireframe === !0) {
        if (At = X.getWireframeAttribute(H), At === void 0) return;
        wt = 2;
      }
      const kt = H.drawRange, qt = H.attributes.position;
      let Lt = kt.start * wt, ie = (kt.start + kt.count) * wt;
      vt !== null && (Lt = Math.max(Lt, vt.start * wt), ie = Math.min(ie, (vt.start + vt.count) * wt)), At !== null ? (Lt = Math.max(Lt, 0), ie = Math.min(ie, At.count)) : qt != null && (Lt = Math.max(Lt, 0), ie = Math.min(ie, qt.count));
      const me = ie - Lt;
      if (me < 0 || me === 1 / 0) return;
      Mt.setup(G, z, xt, H, At);
      let de, se = ct;
      if (At !== null && (de = at.get(At), se = Z, se.setIndex(de)), G.isMesh)
        z.wireframe === !0 ? (g.setLineWidth(z.wireframeLinewidth * Gt()), se.setMode(L.LINES)) : se.setMode(L.TRIANGLES);
      else if (G.isLine) {
        let Ee = z.linewidth;
        Ee === void 0 && (Ee = 1), g.setLineWidth(Ee * Gt()), G.isLineSegments ? se.setMode(L.LINES) : G.isLineLoop ? se.setMode(L.LINE_LOOP) : se.setMode(L.LINE_STRIP);
      } else G.isPoints ? se.setMode(L.POINTS) : G.isSprite && se.setMode(L.TRIANGLES);
      if (G.isBatchedMesh)
        if (Kt.get("WEBGL_multi_draw"))
          se.renderMultiDraw(G._multiDrawStarts, G._multiDrawCounts, G._multiDrawCount);
        else {
          const Ee = G._multiDrawStarts, yt = G._multiDrawCounts, Pe = G._multiDrawCount, jt = At ? at.get(At).bytesPerElement : 1, Fe = V.get(z).currentProgram.getUniforms();
          for (let qe = 0; qe < Pe; qe++)
            Fe.setValue(L, "_gl_DrawID", qe), se.render(Ee[qe] / jt, yt[qe]);
        }
      else if (G.isInstancedMesh)
        se.renderInstances(Lt, me, G.count);
      else if (H.isInstancedBufferGeometry) {
        const Ee = H._maxInstanceCount !== void 0 ? H._maxInstanceCount : 1 / 0, yt = Math.min(H.instanceCount, Ee);
        se.renderInstances(Lt, me, yt);
      } else
        se.render(Lt, me);
    };
    function is(v, F, H) {
      v.transparent === !0 && v.side === 2 && v.forceSinglePass === !1 ? (v.side = 1, v.needsUpdate = !0, Mi(v, F, H), v.side = 0, v.needsUpdate = !0, Mi(v, F, H), v.side = 2) : Mi(v, F, H);
    }
    this.compile = function(v, F, H = null) {
      H === null && (H = v), T = ft.get(H), T.init(F), x.push(T), H.traverseVisible(function(G) {
        G.isLight && G.layers.test(F.layers) && (T.pushLight(G), G.castShadow && T.pushShadow(G));
      }), v !== H && v.traverseVisible(function(G) {
        G.isLight && G.layers.test(F.layers) && (T.pushLight(G), G.castShadow && T.pushShadow(G));
      }), T.setupLights();
      const z = /* @__PURE__ */ new Set();
      return v.traverse(function(G) {
        if (!(G.isMesh || G.isPoints || G.isLine || G.isSprite))
          return;
        const vt = G.material;
        if (vt)
          if (Array.isArray(vt))
            for (let Et = 0; Et < vt.length; Et++) {
              const xt = vt[Et];
              is(xt, H, G), z.add(xt);
            }
          else
            is(vt, H, G), z.add(vt);
      }), T = x.pop(), z;
    }, this.compileAsync = function(v, F, H = null) {
      const z = this.compile(v, F, H);
      return new Promise((G) => {
        function vt() {
          if (z.forEach(function(Et) {
            V.get(Et).currentProgram.isReady() && z.delete(Et);
          }), z.size === 0) {
            G(v);
            return;
          }
          setTimeout(vt, 10);
        }
        Kt.get("KHR_parallel_shader_compile") !== null ? vt() : setTimeout(vt, 10);
      });
    };
    let ji = null;
    function Ja(v) {
      ji && ji(v);
    }
    function rs() {
      gn.stop();
    }
    function ss() {
      gn.start();
    }
    const gn = new Ga();
    gn.setAnimationLoop(Ja), typeof self < "u" && gn.setContext(self), this.setAnimationLoop = function(v) {
      ji = v, Tt.setAnimationLoop(v), v === null ? gn.stop() : gn.start();
    }, Tt.addEventListener("sessionstart", rs), Tt.addEventListener("sessionend", ss), this.render = function(v, F) {
      if (F !== void 0 && F.isCamera !== !0) {
        Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (w === !0) return;
      B !== null && B.renderStart(v, F);
      const H = Tt.enabled === !0 && Tt.isPresenting === !0, z = E !== null && (Y === null || H) && E.begin(P, Y);
      if (v.matrixWorldAutoUpdate === !0 && v.updateMatrixWorld(), F.parent === null && F.matrixWorldAutoUpdate === !0 && F.updateMatrixWorld(), Tt.enabled === !0 && Tt.isPresenting === !0 && (E === null || E.isCompositing() === !1) && (Tt.cameraAutoUpdate === !0 && Tt.updateCamera(F), F = Tt.getCamera()), v.isScene === !0 && v.onBeforeRender(P, v, F, Y), T = ft.get(v, x.length), T.init(F), T.state.textureUnits = W.getTextureUnits(), x.push(T), _t.multiplyMatrices(F.projectionMatrix, F.matrixWorldInverse), Q.setFromProjectionMatrix(_t, 2e3, F.reversedDepth), et = this.localClippingEnabled, nt = Dt.init(this.clippingPlanes, et), R = mt.get(v, C.length), R.init(), C.push(R), Tt.enabled === !0 && Tt.isPresenting === !0) {
        const Et = P.xr.getDepthSensingMesh();
        Et !== null && tr(Et, F, -1 / 0, P.sortObjects);
      }
      tr(v, F, 0, P.sortObjects), R.finish(), P.sortObjects === !0 && R.sort(Pt, Ot, F.reversedDepth), Bt = Tt.enabled === !1 || Tt.isPresenting === !1 || Tt.hasDepthSensing() === !1, Bt && Ht.addToRenderList(R, v), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), nt === !0 && Dt.beginShadows();
      const G = T.state.shadowsArray;
      if (Nt.render(G, v, F), nt === !0 && Dt.endShadows(), (z && E.hasRenderPass()) === !1) {
        const Et = R.opaque, xt = R.transmissive;
        if (T.setupLights(), F.isArrayCamera) {
          const At = F.cameras;
          if (xt.length > 0)
            for (let wt = 0, kt = At.length; wt < kt; wt++) {
              const qt = At[wt];
              os(Et, xt, v, qt);
            }
          Bt && Ht.render(v);
          for (let wt = 0, kt = At.length; wt < kt; wt++) {
            const qt = At[wt];
            as(R, v, qt, qt.viewport);
          }
        } else
          xt.length > 0 && os(Et, xt, v, F), Bt && Ht.render(v), as(R, v, F);
      }
      Y !== null && U === 0 && (W.updateMultisampleRenderTarget(Y), W.updateRenderTargetMipmap(Y)), z && E.end(P), v.isScene === !0 && v.onAfterRender(P, v, F), Mt.resetDefaultState(), tt = -1, st = null, x.pop(), x.length > 0 ? (T = x[x.length - 1], W.setTextureUnits(T.state.textureUnits), nt === !0 && Dt.setGlobalState(P.clippingPlanes, T.state.camera)) : T = null, C.pop(), C.length > 0 ? R = C[C.length - 1] : R = null, B !== null && B.renderEnd();
    };
    function tr(v, F, H, z) {
      if (v.visible === !1) return;
      if (v.layers.test(F.layers)) {
        if (v.isGroup)
          H = v.renderOrder;
        else if (v.isLOD)
          v.autoUpdate === !0 && v.update(F);
        else if (v.isLightProbeGrid)
          T.pushLightProbeGrid(v);
        else if (v.isLight)
          T.pushLight(v), v.castShadow && T.pushShadow(v);
        else if (v.isSprite) {
          if (!v.frustumCulled || Q.intersectsSprite(v)) {
            z && Ft.setFromMatrixPosition(v.matrixWorld).applyMatrix4(_t);
            const Et = J.update(v), xt = v.material;
            xt.visible && R.push(v, Et, xt, H, Ft.z, null);
          }
        } else if ((v.isMesh || v.isLine || v.isPoints) && (!v.frustumCulled || Q.intersectsObject(v))) {
          const Et = J.update(v), xt = v.material;
          if (z && (v.boundingSphere !== void 0 ? (v.boundingSphere === null && v.computeBoundingSphere(), Ft.copy(v.boundingSphere.center)) : (Et.boundingSphere === null && Et.computeBoundingSphere(), Ft.copy(Et.boundingSphere.center)), Ft.applyMatrix4(v.matrixWorld).applyMatrix4(_t)), Array.isArray(xt)) {
            const At = Et.groups;
            for (let wt = 0, kt = At.length; wt < kt; wt++) {
              const qt = At[wt], Lt = xt[qt.materialIndex];
              Lt && Lt.visible && R.push(v, Et, Lt, H, Ft.z, qt);
            }
          } else xt.visible && R.push(v, Et, xt, H, Ft.z, null);
        }
      }
      const vt = v.children;
      for (let Et = 0, xt = vt.length; Et < xt; Et++)
        tr(vt[Et], F, H, z);
    }
    function as(v, F, H, z) {
      const { opaque: G, transmissive: vt, transparent: Et } = v;
      T.setupLightsView(H), nt === !0 && Dt.setGlobalState(P.clippingPlanes, H), z && g.viewport(ot.copy(z)), G.length > 0 && vi(G, F, H), vt.length > 0 && vi(vt, F, H), Et.length > 0 && vi(Et, F, H), g.buffers.depth.setTest(!0), g.buffers.depth.setMask(!0), g.buffers.color.setMask(!0), g.setPolygonOffset(!1);
    }
    function os(v, F, H, z) {
      if ((H.isScene === !0 ? H.overrideMaterial : null) !== null)
        return;
      if (T.state.transmissionRenderTarget[z.id] === void 0) {
        const Lt = Kt.has("EXT_color_buffer_half_float") || Kt.has("EXT_color_buffer_float");
        T.state.transmissionRenderTarget[z.id] = new Je(1, 1, {
          generateMipmaps: !0,
          type: Lt ? 1016 : 1009,
          minFilter: 1008,
          samples: Math.max(4, S.samples),
          // to avoid feedback loops, the transmission render target requires a resolve, see #26177
          stencilBuffer: s,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: $t.workingColorSpace
        });
      }
      const vt = T.state.transmissionRenderTarget[z.id], Et = z.viewport || ot;
      vt.setSize(Et.z * P.transmissionResolutionScale, Et.w * P.transmissionResolutionScale);
      const xt = P.getRenderTarget(), At = P.getActiveCubeFace(), wt = P.getActiveMipmapLevel();
      P.setRenderTarget(vt), P.getClearColor(re), Qt = P.getClearAlpha(), Qt < 1 && P.setClearColor(16777215, 0.5), P.clear(), Bt && Ht.render(H);
      const kt = P.toneMapping;
      P.toneMapping = 0;
      const qt = z.viewport;
      if (z.viewport !== void 0 && (z.viewport = void 0), T.setupLightsView(z), nt === !0 && Dt.setGlobalState(P.clippingPlanes, z), vi(v, H, z), W.updateMultisampleRenderTarget(vt), W.updateRenderTargetMipmap(vt), Kt.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Lt = !1;
        for (let ie = 0, me = F.length; ie < me; ie++) {
          const de = F[ie], { object: se, geometry: Ee, material: yt, group: Pe } = de;
          if (yt.side === 2 && se.layers.test(z.layers)) {
            const jt = yt.side;
            yt.side = 1, yt.needsUpdate = !0, ls(se, H, z, Ee, yt, Pe), yt.side = jt, yt.needsUpdate = !0, Lt = !0;
          }
        }
        Lt === !0 && (W.updateMultisampleRenderTarget(vt), W.updateRenderTargetMipmap(vt));
      }
      P.setRenderTarget(xt, At, wt), P.setClearColor(re, Qt), qt !== void 0 && (z.viewport = qt), P.toneMapping = kt;
    }
    function vi(v, F, H) {
      const z = F.isScene === !0 ? F.overrideMaterial : null;
      for (let G = 0, vt = v.length; G < vt; G++) {
        const Et = v[G], { object: xt, geometry: At, group: wt } = Et;
        let kt = Et.material;
        kt.allowOverride === !0 && z !== null && (kt = z), xt.layers.test(H.layers) && ls(xt, F, H, At, kt, wt);
      }
    }
    function ls(v, F, H, z, G, vt) {
      v.onBeforeRender(P, F, H, z, G, vt), v.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse, v.matrixWorld), v.normalMatrix.getNormalMatrix(v.modelViewMatrix), G.onBeforeRender(P, F, H, z, v, vt), G.transparent === !0 && G.side === 2 && G.forceSinglePass === !1 ? (G.side = 1, G.needsUpdate = !0, P.renderBufferDirect(H, F, z, G, v, vt), G.side = 0, G.needsUpdate = !0, P.renderBufferDirect(H, F, z, G, v, vt), G.side = 2) : P.renderBufferDirect(H, F, z, G, v, vt), v.onAfterRender(P, F, H, z, G, vt);
    }
    function Mi(v, F, H) {
      F.isScene !== !0 && (F = Rt);
      const z = V.get(v), G = T.state.lights, vt = T.state.shadowsArray, Et = G.state.version, xt = ht.getParameters(v, G.state, vt, F, H, T.state.lightProbeGridArray), At = ht.getProgramCacheKey(xt);
      let wt = z.programs;
      z.environment = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? F.environment : null, z.fog = F.fog;
      const kt = v.isMeshStandardMaterial || v.isMeshLambertMaterial && !v.envMap || v.isMeshPhongMaterial && !v.envMap;
      z.envMap = rt.get(v.envMap || z.environment, kt), z.envMapRotation = z.environment !== null && v.envMap === null ? F.environmentRotation : v.envMapRotation, wt === void 0 && (v.addEventListener("dispose", Xe), wt = /* @__PURE__ */ new Map(), z.programs = wt);
      let qt = wt.get(At);
      if (qt !== void 0) {
        if (z.currentProgram === qt && z.lightsStateVersion === Et)
          return us(v, xt), qt;
      } else
        xt.uniforms = ht.getUniforms(v), B !== null && v.isNodeMaterial && B.build(v, H, xt), v.onBeforeCompile(xt, P), qt = ht.acquireProgram(xt, At), wt.set(At, qt), z.uniforms = xt.uniforms;
      const Lt = z.uniforms;
      return (!v.isShaderMaterial && !v.isRawShaderMaterial || v.clipping === !0) && (Lt.clippingPlanes = Dt.uniform), us(v, xt), z.needsLights = to(v), z.lightsStateVersion = Et, z.needsLights && (Lt.ambientLightColor.value = G.state.ambient, Lt.lightProbe.value = G.state.probe, Lt.directionalLights.value = G.state.directional, Lt.directionalLightShadows.value = G.state.directionalShadow, Lt.spotLights.value = G.state.spot, Lt.spotLightShadows.value = G.state.spotShadow, Lt.rectAreaLights.value = G.state.rectArea, Lt.ltc_1.value = G.state.rectAreaLTC1, Lt.ltc_2.value = G.state.rectAreaLTC2, Lt.pointLights.value = G.state.point, Lt.pointLightShadows.value = G.state.pointShadow, Lt.hemisphereLights.value = G.state.hemi, Lt.directionalShadowMatrix.value = G.state.directionalShadowMatrix, Lt.spotLightMatrix.value = G.state.spotLightMatrix, Lt.spotLightMap.value = G.state.spotLightMap, Lt.pointShadowMatrix.value = G.state.pointShadowMatrix), z.lightProbeGrid = T.state.lightProbeGridArray.length > 0, z.currentProgram = qt, z.uniformsList = null, qt;
    }
    function cs(v) {
      if (v.uniformsList === null) {
        const F = v.currentProgram.getUniforms();
        v.uniformsList = Xi.seqWithValue(F.seq, v.uniforms);
      }
      return v.uniformsList;
    }
    function us(v, F) {
      const H = V.get(v);
      H.outputColorSpace = F.outputColorSpace, H.batching = F.batching, H.batchingColor = F.batchingColor, H.instancing = F.instancing, H.instancingColor = F.instancingColor, H.instancingMorph = F.instancingMorph, H.skinning = F.skinning, H.morphTargets = F.morphTargets, H.morphNormals = F.morphNormals, H.morphColors = F.morphColors, H.morphTargetsCount = F.morphTargetsCount, H.numClippingPlanes = F.numClippingPlanes, H.numIntersection = F.numClipIntersection, H.vertexAlphas = F.vertexAlphas, H.vertexTangents = F.vertexTangents, H.toneMapping = F.toneMapping;
    }
    function $a(v, F) {
      if (v.length === 0) return null;
      if (v.length === 1)
        return v[0].texture !== null ? v[0] : null;
      M.setFromMatrixPosition(F.matrixWorld);
      for (let H = 0, z = v.length; H < z; H++) {
        const G = v[H];
        if (G.texture !== null && G.boundingBox.containsPoint(M)) return G;
      }
      return null;
    }
    function Qa(v, F, H, z, G) {
      F.isScene !== !0 && (F = Rt), W.resetTextureUnits();
      const vt = F.fog, Et = z.isMeshStandardMaterial || z.isMeshLambertMaterial || z.isMeshPhongMaterial ? F.environment : null, xt = Y === null ? P.outputColorSpace : Y.isXRRenderTarget === !0 ? Y.texture.colorSpace : $t.workingColorSpace, At = z.isMeshStandardMaterial || z.isMeshLambertMaterial && !z.envMap || z.isMeshPhongMaterial && !z.envMap, wt = rt.get(z.envMap || Et, At), kt = z.vertexColors === !0 && !!H.attributes.color && H.attributes.color.itemSize === 4, qt = !!H.attributes.tangent && (!!z.normalMap || z.anisotropy > 0), Lt = !!H.morphAttributes.position, ie = !!H.morphAttributes.normal, me = !!H.morphAttributes.color;
      let de = 0;
      z.toneMapped && (Y === null || Y.isXRRenderTarget === !0) && (de = P.toneMapping);
      const se = H.morphAttributes.position || H.morphAttributes.normal || H.morphAttributes.color, Ee = se !== void 0 ? se.length : 0, yt = V.get(z), Pe = T.state.lights;
      if (nt === !0 && (et === !0 || v !== st)) {
        const ce = v === st && z.id === tt;
        Dt.setState(z, v, ce);
      }
      let jt = !1;
      z.version === yt.__version ? (yt.needsLights && yt.lightsStateVersion !== Pe.state.version || yt.outputColorSpace !== xt || G.isBatchedMesh && yt.batching === !1 || !G.isBatchedMesh && yt.batching === !0 || G.isBatchedMesh && yt.batchingColor === !0 && G.colorTexture === null || G.isBatchedMesh && yt.batchingColor === !1 && G.colorTexture !== null || G.isInstancedMesh && yt.instancing === !1 || !G.isInstancedMesh && yt.instancing === !0 || G.isSkinnedMesh && yt.skinning === !1 || !G.isSkinnedMesh && yt.skinning === !0 || G.isInstancedMesh && yt.instancingColor === !0 && G.instanceColor === null || G.isInstancedMesh && yt.instancingColor === !1 && G.instanceColor !== null || G.isInstancedMesh && yt.instancingMorph === !0 && G.morphTexture === null || G.isInstancedMesh && yt.instancingMorph === !1 && G.morphTexture !== null || yt.envMap !== wt || z.fog === !0 && yt.fog !== vt || yt.numClippingPlanes !== void 0 && (yt.numClippingPlanes !== Dt.numPlanes || yt.numIntersection !== Dt.numIntersection) || yt.vertexAlphas !== kt || yt.vertexTangents !== qt || yt.morphTargets !== Lt || yt.morphNormals !== ie || yt.morphColors !== me || yt.toneMapping !== de || yt.morphTargetsCount !== Ee || !!yt.lightProbeGrid != T.state.lightProbeGridArray.length > 0) && (jt = !0) : (jt = !0, yt.__version = z.version);
      let Fe = yt.currentProgram;
      jt === !0 && (Fe = Mi(z, F, G), B && z.isNodeMaterial && B.onUpdateProgram(z, Fe, yt));
      let qe = !1, an = !1, bn = !1;
      const ae = Fe.getUniforms(), ge = yt.uniforms;
      if (g.useProgram(Fe.program) && (qe = !0, an = !0, bn = !0), z.id !== tt && (tt = z.id, an = !0), yt.needsLights) {
        const ce = $a(T.state.lightProbeGridArray, G);
        yt.lightProbeGrid !== ce && (yt.lightProbeGrid = ce, an = !0);
      }
      if (qe || st !== v) {
        g.buffers.depth.getReversed() && v.reversedDepth !== !0 && (v._reversedDepth = !0, v.updateProjectionMatrix()), ae.setValue(L, "projectionMatrix", v.projectionMatrix), ae.setValue(L, "viewMatrix", v.matrixWorldInverse);
        const ln = ae.map.cameraPosition;
        ln !== void 0 && ln.setValue(L, pt.setFromMatrixPosition(v.matrixWorld)), S.logarithmicDepthBuffer && ae.setValue(
          L,
          "logDepthBufFC",
          2 / (Math.log(v.far + 1) / Math.LN2)
        ), (z.isMeshPhongMaterial || z.isMeshToonMaterial || z.isMeshLambertMaterial || z.isMeshBasicMaterial || z.isMeshStandardMaterial || z.isShaderMaterial) && ae.setValue(L, "isOrthographic", v.isOrthographicCamera === !0), st !== v && (st = v, an = !0, bn = !0);
      }
      if (yt.needsLights && (Pe.state.directionalShadowMap.length > 0 && ae.setValue(L, "directionalShadowMap", Pe.state.directionalShadowMap, W), Pe.state.spotShadowMap.length > 0 && ae.setValue(L, "spotShadowMap", Pe.state.spotShadowMap, W), Pe.state.pointShadowMap.length > 0 && ae.setValue(L, "pointShadowMap", Pe.state.pointShadowMap, W)), G.isSkinnedMesh) {
        ae.setOptional(L, G, "bindMatrix"), ae.setOptional(L, G, "bindMatrixInverse");
        const ce = G.skeleton;
        ce && (ce.boneTexture === null && ce.computeBoneTexture(), ae.setValue(L, "boneTexture", ce.boneTexture, W));
      }
      G.isBatchedMesh && (ae.setOptional(L, G, "batchingTexture"), ae.setValue(L, "batchingTexture", G._matricesTexture, W), ae.setOptional(L, G, "batchingIdTexture"), ae.setValue(L, "batchingIdTexture", G._indirectTexture, W), ae.setOptional(L, G, "batchingColorTexture"), G._colorsTexture !== null && ae.setValue(L, "batchingColorTexture", G._colorsTexture, W));
      const on = H.morphAttributes;
      if ((on.position !== void 0 || on.normal !== void 0 || on.color !== void 0) && I.update(G, H, Fe), (an || yt.receiveShadow !== G.receiveShadow) && (yt.receiveShadow = G.receiveShadow, ae.setValue(L, "receiveShadow", G.receiveShadow)), (z.isMeshStandardMaterial || z.isMeshLambertMaterial || z.isMeshPhongMaterial) && z.envMap === null && F.environment !== null && (ge.envMapIntensity.value = F.environmentIntensity), ge.dfgLUT !== void 0 && (ge.dfgLUT.value = Sd()), an) {
        if (ae.setValue(L, "toneMappingExposure", P.toneMappingExposure), yt.needsLights && ja(ge, bn), vt && z.fog === !0 && Ct.refreshFogUniforms(ge, vt), Ct.refreshMaterialUniforms(ge, z, it, lt, T.state.transmissionRenderTarget[v.id]), yt.needsLights && yt.lightProbeGrid) {
          const ce = yt.lightProbeGrid;
          ge.probesSH.value = ce.texture, ge.probesMin.value.copy(ce.boundingBox.min), ge.probesMax.value.copy(ce.boundingBox.max), ge.probesResolution.value.copy(ce.resolution);
        }
        Xi.upload(L, cs(yt), ge, W);
      }
      if (z.isShaderMaterial && z.uniformsNeedUpdate === !0 && (Xi.upload(L, cs(yt), ge, W), z.uniformsNeedUpdate = !1), z.isSpriteMaterial && ae.setValue(L, "center", G.center), ae.setValue(L, "modelViewMatrix", G.modelViewMatrix), ae.setValue(L, "normalMatrix", G.normalMatrix), ae.setValue(L, "modelMatrix", G.matrixWorld), z.uniformsGroups !== void 0) {
        const ce = z.uniformsGroups;
        for (let ln = 0, Rn = ce.length; ln < Rn; ln++) {
          const hs = ce[ln];
          j.update(hs, Fe), j.bind(hs, Fe);
        }
      }
      return Fe;
    }
    function ja(v, F) {
      v.ambientLightColor.needsUpdate = F, v.lightProbe.needsUpdate = F, v.directionalLights.needsUpdate = F, v.directionalLightShadows.needsUpdate = F, v.pointLights.needsUpdate = F, v.pointLightShadows.needsUpdate = F, v.spotLights.needsUpdate = F, v.spotLightShadows.needsUpdate = F, v.rectAreaLights.needsUpdate = F, v.hemisphereLights.needsUpdate = F;
    }
    function to(v) {
      return v.isMeshLambertMaterial || v.isMeshToonMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isShadowMaterial || v.isShaderMaterial && v.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return k;
    }, this.getActiveMipmapLevel = function() {
      return U;
    }, this.getRenderTarget = function() {
      return Y;
    }, this.setRenderTargetTextures = function(v, F, H) {
      const z = V.get(v);
      z.__autoAllocateDepthBuffer = v.resolveDepthBuffer === !1, z.__autoAllocateDepthBuffer === !1 && (z.__useRenderToTexture = !1), V.get(v.texture).__webglTexture = F, V.get(v.depthTexture).__webglTexture = z.__autoAllocateDepthBuffer ? void 0 : H, z.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(v, F) {
      const H = V.get(v);
      H.__webglFramebuffer = F, H.__useDefaultFramebuffer = F === void 0;
    }, this.setRenderTarget = function(v, F = 0, H = 0) {
      Y = v, k = F, U = H;
      let z = null, G = !1, vt = !1;
      if (v) {
        const xt = V.get(v);
        if (xt.__useDefaultFramebuffer !== void 0) {
          g.bindFramebuffer(L.FRAMEBUFFER, xt.__webglFramebuffer), ot.copy(v.viewport), St.copy(v.scissor), Xt = v.scissorTest, g.viewport(ot), g.scissor(St), g.setScissorTest(Xt), tt = -1;
          return;
        } else if (xt.__webglFramebuffer === void 0)
          W.setupRenderTarget(v);
        else if (xt.__hasExternalTextures)
          W.rebindTextures(v, V.get(v.texture).__webglTexture, V.get(v.depthTexture).__webglTexture);
        else if (v.depthBuffer) {
          const kt = v.depthTexture;
          if (xt.__boundDepthTexture !== kt) {
            if (kt !== null && V.has(kt) && (v.width !== kt.image.width || v.height !== kt.image.height))
              throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
            W.setupDepthRenderbuffer(v);
          }
        }
        const At = v.texture;
        (At.isData3DTexture || At.isDataArrayTexture || At.isCompressedArrayTexture) && (vt = !0);
        const wt = V.get(v).__webglFramebuffer;
        v.isWebGLCubeRenderTarget ? (Array.isArray(wt[F]) ? z = wt[F][H] : z = wt[F], G = !0) : v.samples > 0 && W.useMultisampledRTT(v) === !1 ? z = V.get(v).__webglMultisampledFramebuffer : Array.isArray(wt) ? z = wt[H] : z = wt, ot.copy(v.viewport), St.copy(v.scissor), Xt = v.scissorTest;
      } else
        ot.copy(It).multiplyScalar(it).floor(), St.copy(te).multiplyScalar(it).floor(), Xt = zt;
      if (H !== 0 && (z = q), g.bindFramebuffer(L.FRAMEBUFFER, z) && g.drawBuffers(v, z), g.viewport(ot), g.scissor(St), g.setScissorTest(Xt), G) {
        const xt = V.get(v.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_CUBE_MAP_POSITIVE_X + F, xt.__webglTexture, H);
      } else if (vt) {
        const xt = F;
        for (let At = 0; At < v.textures.length; At++) {
          const wt = V.get(v.textures[At]);
          L.framebufferTextureLayer(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0 + At, wt.__webglTexture, H, xt);
        }
      } else if (v !== null && H !== 0) {
        const xt = V.get(v.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, xt.__webglTexture, H);
      }
      tt = -1;
    }, this.readRenderTargetPixels = function(v, F, H, z, G, vt, Et, xt = 0) {
      if (!(v && v.isWebGLRenderTarget)) {
        Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let At = V.get(v).__webglFramebuffer;
      if (v.isWebGLCubeRenderTarget && Et !== void 0 && (At = At[Et]), At) {
        g.bindFramebuffer(L.FRAMEBUFFER, At);
        try {
          const wt = v.textures[xt], kt = wt.format, qt = wt.type;
          if (v.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + xt), !S.textureFormatReadable(kt)) {
            Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!S.textureTypeReadable(qt)) {
            Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          F >= 0 && F <= v.width - z && H >= 0 && H <= v.height - G && L.readPixels(F, H, z, G, dt.convert(kt), dt.convert(qt), vt);
        } finally {
          const wt = Y !== null ? V.get(Y).__webglFramebuffer : null;
          g.bindFramebuffer(L.FRAMEBUFFER, wt);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(v, F, H, z, G, vt, Et, xt = 0) {
      if (!(v && v.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let At = V.get(v).__webglFramebuffer;
      if (v.isWebGLCubeRenderTarget && Et !== void 0 && (At = At[Et]), At)
        if (F >= 0 && F <= v.width - z && H >= 0 && H <= v.height - G) {
          g.bindFramebuffer(L.FRAMEBUFFER, At);
          const wt = v.textures[xt], kt = wt.format, qt = wt.type;
          if (v.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + xt), !S.textureFormatReadable(kt))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!S.textureTypeReadable(qt))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          const Lt = L.createBuffer();
          L.bindBuffer(L.PIXEL_PACK_BUFFER, Lt), L.bufferData(L.PIXEL_PACK_BUFFER, vt.byteLength, L.STREAM_READ), L.readPixels(F, H, z, G, dt.convert(kt), dt.convert(qt), 0);
          const ie = Y !== null ? V.get(Y).__webglFramebuffer : null;
          g.bindFramebuffer(L.FRAMEBUFFER, ie);
          const me = L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return L.flush(), await io(L, me, 4), L.bindBuffer(L.PIXEL_PACK_BUFFER, Lt), L.getBufferSubData(L.PIXEL_PACK_BUFFER, 0, vt), L.deleteBuffer(Lt), L.deleteSync(me), vt;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(v, F = null, H = 0) {
      const z = Math.pow(2, -H), G = Math.floor(v.image.width * z), vt = Math.floor(v.image.height * z), Et = F !== null ? F.x : 0, xt = F !== null ? F.y : 0;
      W.setTexture2D(v, 0), L.copyTexSubImage2D(L.TEXTURE_2D, H, 0, 0, Et, xt, G, vt), g.unbindTexture();
    }, this.copyTextureToTexture = function(v, F, H = null, z = null, G = 0, vt = 0) {
      let Et, xt, At, wt, kt, qt, Lt, ie, me;
      const de = v.isCompressedTexture ? v.mipmaps[vt] : v.image;
      if (H !== null)
        Et = H.max.x - H.min.x, xt = H.max.y - H.min.y, At = H.isBox3 ? H.max.z - H.min.z : 1, wt = H.min.x, kt = H.min.y, qt = H.isBox3 ? H.min.z : 0;
      else {
        const ge = Math.pow(2, -G);
        Et = Math.floor(de.width * ge), xt = Math.floor(de.height * ge), v.isDataArrayTexture ? At = de.depth : v.isData3DTexture ? At = Math.floor(de.depth * ge) : At = 1, wt = 0, kt = 0, qt = 0;
      }
      z !== null ? (Lt = z.x, ie = z.y, me = z.z) : (Lt = 0, ie = 0, me = 0);
      const se = dt.convert(F.format), Ee = dt.convert(F.type);
      let yt;
      F.isData3DTexture ? (W.setTexture3D(F, 0), yt = L.TEXTURE_3D) : F.isDataArrayTexture || F.isCompressedArrayTexture ? (W.setTexture2DArray(F, 0), yt = L.TEXTURE_2D_ARRAY) : (W.setTexture2D(F, 0), yt = L.TEXTURE_2D), g.activeTexture(L.TEXTURE0), g.pixelStorei(L.UNPACK_FLIP_Y_WEBGL, F.flipY), g.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL, F.premultiplyAlpha), g.pixelStorei(L.UNPACK_ALIGNMENT, F.unpackAlignment);
      const Pe = g.getParameter(L.UNPACK_ROW_LENGTH), jt = g.getParameter(L.UNPACK_IMAGE_HEIGHT), Fe = g.getParameter(L.UNPACK_SKIP_PIXELS), qe = g.getParameter(L.UNPACK_SKIP_ROWS), an = g.getParameter(L.UNPACK_SKIP_IMAGES);
      g.pixelStorei(L.UNPACK_ROW_LENGTH, de.width), g.pixelStorei(L.UNPACK_IMAGE_HEIGHT, de.height), g.pixelStorei(L.UNPACK_SKIP_PIXELS, wt), g.pixelStorei(L.UNPACK_SKIP_ROWS, kt), g.pixelStorei(L.UNPACK_SKIP_IMAGES, qt);
      const bn = v.isDataArrayTexture || v.isData3DTexture, ae = F.isDataArrayTexture || F.isData3DTexture;
      if (v.isDepthTexture) {
        const ge = V.get(v), on = V.get(F), ce = V.get(ge.__renderTarget), ln = V.get(on.__renderTarget);
        g.bindFramebuffer(L.READ_FRAMEBUFFER, ce.__webglFramebuffer), g.bindFramebuffer(L.DRAW_FRAMEBUFFER, ln.__webglFramebuffer);
        for (let Rn = 0; Rn < At; Rn++)
          bn && (L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, V.get(v).__webglTexture, G, qt + Rn), L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, V.get(F).__webglTexture, vt, me + Rn)), L.blitFramebuffer(wt, kt, Et, xt, Lt, ie, Et, xt, L.DEPTH_BUFFER_BIT, L.NEAREST);
        g.bindFramebuffer(L.READ_FRAMEBUFFER, null), g.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else if (G !== 0 || v.isRenderTargetTexture || V.has(v)) {
        const ge = V.get(v), on = V.get(F);
        g.bindFramebuffer(L.READ_FRAMEBUFFER, $), g.bindFramebuffer(L.DRAW_FRAMEBUFFER, D);
        for (let ce = 0; ce < At; ce++)
          bn ? L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, ge.__webglTexture, G, qt + ce) : L.framebufferTexture2D(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, ge.__webglTexture, G), ae ? L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, on.__webglTexture, vt, me + ce) : L.framebufferTexture2D(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, on.__webglTexture, vt), G !== 0 ? L.blitFramebuffer(wt, kt, Et, xt, Lt, ie, Et, xt, L.COLOR_BUFFER_BIT, L.NEAREST) : ae ? L.copyTexSubImage3D(yt, vt, Lt, ie, me + ce, wt, kt, Et, xt) : L.copyTexSubImage2D(yt, vt, Lt, ie, wt, kt, Et, xt);
        g.bindFramebuffer(L.READ_FRAMEBUFFER, null), g.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else
        ae ? v.isDataTexture || v.isData3DTexture ? L.texSubImage3D(yt, vt, Lt, ie, me, Et, xt, At, se, Ee, de.data) : F.isCompressedArrayTexture ? L.compressedTexSubImage3D(yt, vt, Lt, ie, me, Et, xt, At, se, de.data) : L.texSubImage3D(yt, vt, Lt, ie, me, Et, xt, At, se, Ee, de) : v.isDataTexture ? L.texSubImage2D(L.TEXTURE_2D, vt, Lt, ie, Et, xt, se, Ee, de.data) : v.isCompressedTexture ? L.compressedTexSubImage2D(L.TEXTURE_2D, vt, Lt, ie, de.width, de.height, se, de.data) : L.texSubImage2D(L.TEXTURE_2D, vt, Lt, ie, Et, xt, se, Ee, de);
      g.pixelStorei(L.UNPACK_ROW_LENGTH, Pe), g.pixelStorei(L.UNPACK_IMAGE_HEIGHT, jt), g.pixelStorei(L.UNPACK_SKIP_PIXELS, Fe), g.pixelStorei(L.UNPACK_SKIP_ROWS, qe), g.pixelStorei(L.UNPACK_SKIP_IMAGES, an), vt === 0 && F.generateMipmaps && L.generateMipmap(yt), g.unbindTexture();
    }, this.initRenderTarget = function(v) {
      V.get(v).__webglFramebuffer === void 0 && W.setupRenderTarget(v);
    }, this.initTexture = function(v) {
      v.isCubeTexture ? W.setTextureCube(v, 0) : v.isData3DTexture ? W.setTexture3D(v, 0) : v.isDataArrayTexture || v.isCompressedArrayTexture ? W.setTexture2DArray(v, 0) : W.setTexture2D(v, 0), g.unbindTexture();
    }, this.resetState = function() {
      k = 0, U = 0, Y = null, g.reset(), Mt.reset();
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
    return 2e3;
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
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    e.drawingBufferColorSpace = $t._getDrawingBufferColorSpace(t), e.unpackColorSpace = $t._getUnpackColorSpace();
  }
}
class Ed extends Ma {
  constructor() {
    super(), this.name = "RoomEnvironment", this.position.y = -3.5;
    const t = new Qn();
    t.deleteAttribute("uv");
    const e = new Ki({ side: 1 }), n = new Ki(), r = new Sl(16777215, 900, 28, 2);
    r.position.set(0.418, 16.199, 0.3), this.add(r);
    const s = new pe(t, e);
    s.position.set(-0.757, 13.219, 0.717), s.scale.set(31.713, 28.305, 28.591), this.add(s);
    const a = new bo(t, n, 6), o = new ye();
    o.position.set(-10.906, 2.009, 1.846), o.rotation.set(0, -0.195, 0), o.scale.set(2.328, 7.905, 4.651), o.updateMatrix(), a.setMatrixAt(0, o.matrix), o.position.set(-5.607, -0.754, -0.758), o.rotation.set(0, 0.994, 0), o.scale.set(1.97, 1.534, 3.955), o.updateMatrix(), a.setMatrixAt(1, o.matrix), o.position.set(6.167, 0.857, 7.803), o.rotation.set(0, 0.561, 0), o.scale.set(3.927, 6.285, 3.687), o.updateMatrix(), a.setMatrixAt(2, o.matrix), o.position.set(-2.017, 0.018, 6.124), o.rotation.set(0, 0.333, 0), o.scale.set(2.002, 4.566, 2.064), o.updateMatrix(), a.setMatrixAt(3, o.matrix), o.position.set(2.291, -0.756, -2.621), o.rotation.set(0, -0.286, 0), o.scale.set(1.546, 1.552, 1.496), o.updateMatrix(), a.setMatrixAt(4, o.matrix), o.position.set(-2.193, -0.369, -5.547), o.rotation.set(0, 0.516, 0), o.scale.set(3.875, 3.487, 2.986), o.updateMatrix(), a.setMatrixAt(5, o.matrix), this.add(a);
    const l = new pe(t, Hn(50));
    l.position.set(-16.116, 14.37, 8.208), l.scale.set(0.1, 2.428, 2.739), this.add(l);
    const c = new pe(t, Hn(50));
    c.position.set(-16.109, 18.021, -8.207), c.scale.set(0.1, 2.425, 2.751), this.add(c);
    const h = new pe(t, Hn(17));
    h.position.set(14.904, 12.198, -1.832), h.scale.set(0.15, 4.265, 6.331), this.add(h);
    const f = new pe(t, Hn(43));
    f.position.set(-0.462, 8.89, 14.52), f.scale.set(4.38, 5.441, 0.088), this.add(f);
    const u = new pe(t, Hn(20));
    u.position.set(3.235, 11.486, -12.541), u.scale.set(2.5, 2, 0.1), this.add(u);
    const p = new pe(t, Hn(100));
    p.position.set(0, 20, 0), p.scale.set(1, 0.1, 1), this.add(p);
  }
  /**
   * Frees internal resources. This method should be called
   * when the environment is no longer required.
   */
  dispose() {
    const t = /* @__PURE__ */ new Set();
    this.traverse((e) => {
      e.isMesh && (t.add(e.geometry), t.add(e.material));
    });
    for (const e of t)
      e.dispose();
  }
}
function Hn(i) {
  return new gl({
    color: 0,
    emissive: 16777215,
    emissiveIntensity: i
  });
}
const Td = `//\r
					// GLSL textureless classic 3D noise "cnoise",\r
					// with an RSL-style periodic variant "pnoise".\r
					// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\r
					// Version: 2011-10-11\r
					//\r
					// Many thanks to Ian McEwan of Ashima Arts for the\r
					// ideas for permutation and gradient selection.\r
					//\r
					// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\r
					// Distributed under the MIT license. See LICENSE file.\r
					// https://github.com/stegu/webgl-noise\r
					//\r
				\r
					vec3 mod289(vec3 x)\r
					{\r
						return x - floor(x * (1.0 / 289.0)) * 289.0;\r
					}\r
				\r
					vec4 mod289(vec4 x)\r
					{\r
						return x - floor(x * (1.0 / 289.0)) * 289.0;\r
					}\r
				\r
					vec4 permute(vec4 x)\r
					{\r
						return mod289(((x*34.0)+1.0)*x);\r
					}\r
				\r
					vec4 taylorInvSqrt(vec4 r)\r
					{\r
						return 1.79284291400159 - 0.85373472095314 * r;\r
					}\r
				\r
					vec3 fade(vec3 t) {\r
						return t*t*t*(t*(t*6.0-15.0)+10.0);\r
					}\r
				\r
					// Classic Perlin noise\r
					float cnoise(vec3 P)\r
					{\r
						vec3 Pi0 = floor(P); // Integer part for indexing\r
						vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\r
						Pi0 = mod289(Pi0);\r
						Pi1 = mod289(Pi1);\r
						vec3 Pf0 = fract(P); // Fractional part for interpolation\r
						vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\r
						vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\r
						vec4 iy = vec4(Pi0.yy, Pi1.yy);\r
						vec4 iz0 = Pi0.zzzz;\r
						vec4 iz1 = Pi1.zzzz;\r
				\r
						vec4 ixy = permute(permute(ix) + iy);\r
						vec4 ixy0 = permute(ixy + iz0);\r
						vec4 ixy1 = permute(ixy + iz1);\r
				\r
						vec4 gx0 = ixy0 * (1.0 / 7.0);\r
						vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\r
						gx0 = fract(gx0);\r
						vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\r
						vec4 sz0 = step(gz0, vec4(0.0));\r
						gx0 -= sz0 * (step(0.0, gx0) - 0.5);\r
						gy0 -= sz0 * (step(0.0, gy0) - 0.5);\r
				\r
						vec4 gx1 = ixy1 * (1.0 / 7.0);\r
						vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\r
						gx1 = fract(gx1);\r
						vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\r
						vec4 sz1 = step(gz1, vec4(0.0));\r
						gx1 -= sz1 * (step(0.0, gx1) - 0.5);\r
						gy1 -= sz1 * (step(0.0, gy1) - 0.5);\r
				\r
						vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\r
						vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\r
						vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\r
						vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\r
						vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\r
						vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\r
						vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\r
						vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\r
				\r
						vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\r
						g000 *= norm0.x;\r
						g010 *= norm0.y;\r
						g100 *= norm0.z;\r
						g110 *= norm0.w;\r
						vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\r
						g001 *= norm1.x;\r
						g011 *= norm1.y;\r
						g101 *= norm1.z;\r
						g111 *= norm1.w;\r
				\r
						float n000 = dot(g000, Pf0);\r
						float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\r
						float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\r
						float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\r
						float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\r
						float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\r
						float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\r
						float n111 = dot(g111, Pf1);\r
				\r
						vec3 fade_xyz = fade(Pf0);\r
						vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\r
						vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\r
						float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \r
						return 2.2 * n_xyz;\r
					}\r
				\r
					// Classic Perlin noise, periodic variant\r
					float pnoise(vec3 P, vec3 rep)\r
					{\r
						vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\r
						vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\r
						Pi0 = mod289(Pi0);\r
						Pi1 = mod289(Pi1);\r
						vec3 Pf0 = fract(P); // Fractional part for interpolation\r
						vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\r
						vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\r
						vec4 iy = vec4(Pi0.yy, Pi1.yy);\r
						vec4 iz0 = Pi0.zzzz;\r
						vec4 iz1 = Pi1.zzzz;\r
				\r
						vec4 ixy = permute(permute(ix) + iy);\r
						vec4 ixy0 = permute(ixy + iz0);\r
						vec4 ixy1 = permute(ixy + iz1);\r
				\r
						vec4 gx0 = ixy0 * (1.0 / 7.0);\r
						vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\r
						gx0 = fract(gx0);\r
						vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\r
						vec4 sz0 = step(gz0, vec4(0.0));\r
						gx0 -= sz0 * (step(0.0, gx0) - 0.5);\r
						gy0 -= sz0 * (step(0.0, gy0) - 0.5);\r
				\r
						vec4 gx1 = ixy1 * (1.0 / 7.0);\r
						vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\r
						gx1 = fract(gx1);\r
						vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\r
						vec4 sz1 = step(gz1, vec4(0.0));\r
						gx1 -= sz1 * (step(0.0, gx1) - 0.5);\r
						gy1 -= sz1 * (step(0.0, gy1) - 0.5);\r
				\r
						vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\r
						vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\r
						vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\r
						vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\r
						vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\r
						vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\r
						vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\r
						vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\r
				\r
						vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\r
						g000 *= norm0.x;\r
						g010 *= norm0.y;\r
						g100 *= norm0.z;\r
						g110 *= norm0.w;\r
						vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\r
						g001 *= norm1.x;\r
						g011 *= norm1.y;\r
						g101 *= norm1.z;\r
						g111 *= norm1.w;\r
				\r
						float n000 = dot(g000, Pf0);\r
						float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\r
						float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\r
						float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\r
						float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\r
						float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\r
						float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\r
						float n111 = dot(g111, Pf1);\r
				\r
						vec3 fade_xyz = fade(Pf0);\r
						vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\r
						vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\r
						float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \r
						return 2.2 * n_xyz;\r
					}\r
\r
					#define PI 3.1415926535897932384626433832795`, xe = document.querySelector(".sculpture-stage");
xe && Ad().catch((i) => {
  xe.dataset.state = "fallback", xe.querySelector(".sculpture-hint").textContent = "Интерактивная сцена недоступна в этом браузере", xe.querySelector(".sculpture-react").hidden = !0, console.warn("3D scene unavailable", i.message);
});
async function Ad() {
  const i = xe.querySelector(".sculpture-canvas"), t = new yd({ antialias: !0, alpha: !0, powerPreference: "low-power" });
  t.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 700 ? 1.25 : 1.6)), t.setClearColor(1315860, 1), t.toneMapping = 4, t.toneMappingExposure = 1.25, i.append(t.domElement), t.domElement.setAttribute("aria-hidden", "true");
  const e = new Ma(), n = new Ie(40, 1, 0.1, 100), r = new Gr(t), s = new Ed(), a = r.fromScene(s, 0.04);
  e.environment = a.texture, s.dispose(), r.dispose(), e.add(new vl(14543605, 2697258, 2.4));
  const o = new Ws(16777215, 3);
  o.position.set(-5, 8, 4), e.add(o);
  const l = new Ws(7912929, 2);
  l.position.set(8, 3, -3), e.add(l);
  const c = { time: { value: 0 }, pointer: { value: new ut() }, pulse: { value: 0 } }, h = new He({ uniforms: c, side: 2, vertexShader: Td + `
 uniform float time;uniform vec2 pointer;uniform float pulse;varying vec3 vWorld;varying float vH;
 void main(){
 float t=time*.035;
 float angleCenter=uv.y*3.14159265*4.0+t*.9;
 float centerOff=(sin(angleCenter)+sin(angleCenter*.5))*.14;
 vec3 noiseIn=vec3(uv,1.0)*3.0;
 float n=cnoise(vec3(noiseIn.x,noiseIn.y+t,noiseIn.z))+1.0;
 float f=abs(cos((uv.x-centerOff)*3.14159265));
 float h=n*pow(f,2.0)*2.9;
 h+=sin(uv.x*14.0+uv.y*9.0+t)*.2;
 h+=pulse*.12*sin(uv.x*20.0+time*2.0);
 vec3 transformed=vec3(position.xy,position.z+h);
 vec4 world=modelMatrix*vec4(transformed,1.0);vWorld=world.xyz;vH=h;
 gl_Position=projectionMatrix*viewMatrix*world;
 }`, fragmentShader: `
 varying vec3 vWorld;varying float vH;
 void main(){
 vec3 normal=normalize(cross(dFdx(vWorld),dFdy(vWorld)));
 if(!gl_FrontFacing)normal=-normal;
 vec3 light=normalize(vec3(-.5,1.0,.7));
 float diffuse=max(0.0,dot(normal,light));
 vec3 viewDir=normalize(cameraPosition-vWorld);
 float spec=pow(max(dot(normal,normalize(light+viewDir)),0.0),36.0);
 float fresnel=pow(1.0-abs(dot(normal,viewDir)),3.0);
 float grain=fract(sin(dot(vWorld.xz*550.0,vec2(12.9898,78.233)))*43758.5453);
 vec3 base=mix(vec3(.038,.042,.047),vec3(.20,.22,.24),clamp(vH/3.5,0.0,1.0));
 vec3 color=base*(.45+diffuse*1.6)+spec*.22+fresnel*vec3(.07,.11,.14);
 color*=.88+grain*.16;
 float fog=smoothstep(6.0,14.0,-vWorld.z);
 color=mix(color,vec3(.007),fog);
 gl_FragColor=vec4(color,1.0);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }` }), f = new pe(new xi(32, 24, 220, 140), h);
  f.rotation.x = -Math.PI / 2, f.position.set(0, -1, -4), e.add(f);
  const u = [], p = [], _ = new Da();
  _.moveTo(0, 0), _.bezierCurveTo(0.15, 0.42, 0.8, 0.62, 0.72, 0.16), _.bezierCurveTo(0.7, -0.04, 0.47, -0.04, 0.4, -0.08), _.bezierCurveTo(0.67, -0.27, 0.38, -0.6, 0.14, -0.3), _.quadraticCurveTo(0.07, -0.15, 0, 0);
  const y = new Kr(_, { depth: 0.012, bevelEnabled: !0, bevelSegments: 2, steps: 1, bevelSize: 0.012, bevelThickness: 8e-3, curveSegments: 20 });
  for (let D = 0; D < 5; D++) {
    const k = new ci(), U = new ml({ color: D % 2 ? 14209733 : 9947620, metalness: 0.82, roughness: 0.2, clearcoat: 1, side: 2 }), Y = [new pe(y, U), new pe(y, U)];
    Y[1].scale.x = -1, Y.forEach((st) => {
      k.add(st), p.push(st), st.userData.butterfly = D;
    });
    const tt = new pe(new qr(0.035, 0.4, 4, 8), new Ki({ color: 2632237, metalness: 0.9, roughness: 0.3 }));
    k.add(tt), k.rotation.x = -0.65, k.scale.setScalar(0.42 + D * 0.025), e.add(k), u.push({ group: k, wings: Y, base: new N(-5 + D * 2.6, 1.6 + D % 2 * 0.6, -0.6 - D % 3 * 1.3), flight: 0, seed: D * 1.7 });
  }
  const m = matchMedia("(prefers-reduced-motion: reduce)");
  let d = !0, b = !1, A = 0, M = 0, R = 0;
  const T = new ut(), C = new Al();
  let x = !1;
  function E(D = -1) {
    m.matches || b || (u.forEach((k, U) => {
      (D < 0 || U === D) && (k.flight = 1);
    }), c.pulse.value = 1, xe.querySelector(".sculpture-status").textContent = "Бабочки взлетают над ландшафтом.");
  }
  xe.querySelector(".sculpture-react").addEventListener("click", () => E()), xe.addEventListener("pointermove", (D) => {
    if (D.pointerType === "touch" || b || m.matches) return;
    const k = xe.getBoundingClientRect();
    T.set((D.clientX - k.left) / k.width * 2 - 1, -((D.clientY - k.top) / k.height * 2 - 1)), x = !0, B();
  }, { passive: !0 }), xe.addEventListener("pointerleave", () => T.set(0, 0)), xe.addEventListener("click", (D) => {
    D.target === t.domElement && E();
  }), document.querySelector(".garden-motion");
  function P() {
    b = document.body.classList.contains("motion-paused"), b || m.matches || !d || document.hidden ? (cancelAnimationFrame(A), A = 0, xe.dataset.motion = "paused") : B(), w();
  }
  new MutationObserver(P).observe(document.body, { attributes: !0, attributeFilter: ["class"] }), new IntersectionObserver(([D]) => {
    d = D.isIntersecting, P();
  }, { threshold: 0.01 }).observe(xe), document.addEventListener("visibilitychange", P), m.addEventListener("change", P);
  function w() {
    t.render(e, n);
  }
  function B() {
    !A && d && !document.hidden && !b && !m.matches && (M = performance.now(), A = requestAnimationFrame(q), xe.dataset.motion = "running");
  }
  function q(D) {
    if (A = 0, !d || document.hidden || b || m.matches) return;
    const k = Math.min((D - M) / 1e3, 0.05);
    if (D - M < 32) {
      A = requestAnimationFrame(q);
      return;
    }
    if (M = D, R += k, c.time.value = R, c.pulse.value *= 0.96, n.position.x += (T.x * 0.7 - n.position.x) * 0.04, n.lookAt(0, 0.4, -2), x) {
      C.setFromCamera(T, n);
      const U = C.intersectObjects(p);
      U.length && E(U[0].object.userData.butterfly), x = !1;
    }
    u.forEach((U) => {
      U.flight = Math.max(0, U.flight - k * 0.18);
      const Y = R + U.seed, tt = Math.sin(U.flight * Math.PI);
      U.group.position.copy(U.base), U.group.position.x += Math.sin(Y * 0.8) * 0.2 + tt * Math.sin(Y * 1.7) * 1.4, U.group.position.y += Math.sin(Y) * 0.1 + tt * 1.8, U.group.position.z += tt * Math.cos(Y) * 1.2, U.group.rotation.z = Math.sin(Y) * 0.1 + tt * 0.2;
      const st = Math.sin(Y * (U.flight > 0 ? 18 : 3)) * (U.flight > 0 ? 1.1 : 0.4);
      U.wings[0].rotation.y = st, U.wings[1].rotation.y = -st;
    }), w(), A = requestAnimationFrame(q);
  }
  function $() {
    const { width: D, height: k } = xe.getBoundingClientRect();
    t.setSize(D, k, !1), n.aspect = D / k, n.position.set(0, D < 650 ? 8 : 5, D < 650 ? 15 : 10.8), n.lookAt(0, 0.4, -2), n.updateProjectionMatrix(), w();
  }
  new ResizeObserver($).observe(xe), $(), u.forEach((D) => D.group.position.copy(D.base)), xe.dataset.state = "ready", P(), t.domElement.addEventListener("webglcontextlost", (D) => {
    D.preventDefault(), cancelAnimationFrame(A), A = 0, xe.dataset.state = "fallback", xe.querySelector(".sculpture-hint").textContent = "3D-сцена приостановлена. Обновите страницу для восстановления.";
  }), addEventListener("pagehide", (D) => {
    cancelAnimationFrame(A), A = 0, D.persisted || (t.dispose(), a.dispose());
  }), addEventListener("pageshow", P);
}
