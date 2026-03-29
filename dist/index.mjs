import Q, { useRef as P, useEffect as $, useCallback as M, useState as C, useMemo as W } from "react";
var Me = { exports: {} }, pe = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xe;
function Pt() {
  if (Xe) return pe;
  Xe = 1;
  var e = Q, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, s = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(l, c, p) {
    var f, d = {}, h = null, x = null;
    p !== void 0 && (h = "" + p), c.key !== void 0 && (h = "" + c.key), c.ref !== void 0 && (x = c.ref);
    for (f in c) r.call(c, f) && !i.hasOwnProperty(f) && (d[f] = c[f]);
    if (l && l.defaultProps) for (f in c = l.defaultProps, c) d[f] === void 0 && (d[f] = c[f]);
    return { $$typeof: t, type: l, key: h, ref: x, props: d, _owner: s.current };
  }
  return pe.Fragment = n, pe.jsx = a, pe.jsxs = a, pe;
}
var he = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Je;
function Mt() {
  return Je || (Je = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Q, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), l = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), x = Symbol.for("react.offscreen"), y = Symbol.iterator, b = "@@iterator";
    function g(u) {
      if (u === null || typeof u != "object")
        return null;
      var j = y && u[y] || u[b];
      return typeof j == "function" ? j : null;
    }
    var m = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(u) {
      {
        for (var j = arguments.length, k = new Array(j > 1 ? j - 1 : 0), I = 1; I < j; I++)
          k[I - 1] = arguments[I];
        w("error", u, k);
      }
    }
    function w(u, j, k) {
      {
        var I = m.ReactDebugCurrentFrame, z = I.getStackAddendum();
        z !== "" && (j += "%s", k = k.concat([z]));
        var V = k.map(function(D) {
          return String(D);
        });
        V.unshift("Warning: " + j), Function.prototype.apply.call(console[u], console, V);
      }
    }
    var S = !1, R = !1, T = !1, L = !1, E = !1, A;
    A = Symbol.for("react.module.reference");
    function F(u) {
      return !!(typeof u == "string" || typeof u == "function" || u === r || u === i || E || u === s || u === p || u === f || L || u === x || S || R || T || typeof u == "object" && u !== null && (u.$$typeof === h || u.$$typeof === d || u.$$typeof === a || u.$$typeof === l || u.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      u.$$typeof === A || u.getModuleId !== void 0));
    }
    function _(u, j, k) {
      var I = u.displayName;
      if (I)
        return I;
      var z = j.displayName || j.name || "";
      return z !== "" ? k + "(" + z + ")" : k;
    }
    function K(u) {
      return u.displayName || "Context";
    }
    function B(u) {
      if (u == null)
        return null;
      if (typeof u.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof u == "function")
        return u.displayName || u.name || null;
      if (typeof u == "string")
        return u;
      switch (u) {
        case r:
          return "Fragment";
        case n:
          return "Portal";
        case i:
          return "Profiler";
        case s:
          return "StrictMode";
        case p:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof u == "object")
        switch (u.$$typeof) {
          case l:
            var j = u;
            return K(j) + ".Consumer";
          case a:
            var k = u;
            return K(k._context) + ".Provider";
          case c:
            return _(u, u.render, "ForwardRef");
          case d:
            var I = u.displayName || null;
            return I !== null ? I : B(u.type) || "Memo";
          case h: {
            var z = u, V = z._payload, D = z._init;
            try {
              return B(D(V));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Y = Object.assign, N = 0, te, X, ie, ae, Z, oe, le;
    function ce() {
    }
    ce.__reactDisabledLog = !0;
    function de() {
      {
        if (N === 0) {
          te = console.log, X = console.info, ie = console.warn, ae = console.error, Z = console.group, oe = console.groupCollapsed, le = console.groupEnd;
          var u = {
            configurable: !0,
            enumerable: !0,
            value: ce,
            writable: !0
          };
          Object.defineProperties(console, {
            info: u,
            log: u,
            warn: u,
            error: u,
            group: u,
            groupCollapsed: u,
            groupEnd: u
          });
        }
        N++;
      }
    }
    function ue() {
      {
        if (N--, N === 0) {
          var u = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Y({}, u, {
              value: te
            }),
            info: Y({}, u, {
              value: X
            }),
            warn: Y({}, u, {
              value: ie
            }),
            error: Y({}, u, {
              value: ae
            }),
            group: Y({}, u, {
              value: Z
            }),
            groupCollapsed: Y({}, u, {
              value: oe
            }),
            groupEnd: Y({}, u, {
              value: le
            })
          });
        }
        N < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var je = m.ReactCurrentDispatcher, we;
    function xe(u, j, k) {
      {
        if (we === void 0)
          try {
            throw Error();
          } catch (z) {
            var I = z.stack.trim().match(/\n( *(at )?)/);
            we = I && I[1] || "";
          }
        return `
` + we + u;
      }
    }
    var Se = !1, ge;
    {
      var at = typeof WeakMap == "function" ? WeakMap : Map;
      ge = new at();
    }
    function _e(u, j) {
      if (!u || Se)
        return "";
      {
        var k = ge.get(u);
        if (k !== void 0)
          return k;
      }
      var I;
      Se = !0;
      var z = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var V;
      V = je.current, je.current = null, de();
      try {
        if (j) {
          var D = function() {
            throw Error();
          };
          if (Object.defineProperty(D.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(D, []);
            } catch (H) {
              I = H;
            }
            Reflect.construct(u, [], D);
          } else {
            try {
              D.call();
            } catch (H) {
              I = H;
            }
            u.call(D.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (H) {
            I = H;
          }
          u();
        }
      } catch (H) {
        if (H && I && typeof H.stack == "string") {
          for (var O = H.stack.split(`
`), G = I.stack.split(`
`), q = O.length - 1, U = G.length - 1; q >= 1 && U >= 0 && O[q] !== G[U]; )
            U--;
          for (; q >= 1 && U >= 0; q--, U--)
            if (O[q] !== G[U]) {
              if (q !== 1 || U !== 1)
                do
                  if (q--, U--, U < 0 || O[q] !== G[U]) {
                    var J = `
` + O[q].replace(" at new ", " at ");
                    return u.displayName && J.includes("<anonymous>") && (J = J.replace("<anonymous>", u.displayName)), typeof u == "function" && ge.set(u, J), J;
                  }
                while (q >= 1 && U >= 0);
              break;
            }
        }
      } finally {
        Se = !1, je.current = V, ue(), Error.prepareStackTrace = z;
      }
      var se = u ? u.displayName || u.name : "", re = se ? xe(se) : "";
      return typeof u == "function" && ge.set(u, re), re;
    }
    function ot(u, j, k) {
      return _e(u, !1);
    }
    function lt(u) {
      var j = u.prototype;
      return !!(j && j.isReactComponent);
    }
    function me(u, j, k) {
      if (u == null)
        return "";
      if (typeof u == "function")
        return _e(u, lt(u));
      if (typeof u == "string")
        return xe(u);
      switch (u) {
        case p:
          return xe("Suspense");
        case f:
          return xe("SuspenseList");
      }
      if (typeof u == "object")
        switch (u.$$typeof) {
          case c:
            return ot(u.render);
          case d:
            return me(u.type, j, k);
          case h: {
            var I = u, z = I._payload, V = I._init;
            try {
              return me(V(z), j, k);
            } catch {
            }
          }
        }
      return "";
    }
    var fe = Object.prototype.hasOwnProperty, Oe = {}, De = m.ReactDebugCurrentFrame;
    function ye(u) {
      if (u) {
        var j = u._owner, k = me(u.type, u._source, j ? j.type : null);
        De.setExtraStackFrame(k);
      } else
        De.setExtraStackFrame(null);
    }
    function ct(u, j, k, I, z) {
      {
        var V = Function.call.bind(fe);
        for (var D in u)
          if (V(u, D)) {
            var O = void 0;
            try {
              if (typeof u[D] != "function") {
                var G = Error((I || "React class") + ": " + k + " type `" + D + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof u[D] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw G.name = "Invariant Violation", G;
              }
              O = u[D](j, D, I, k, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (q) {
              O = q;
            }
            O && !(O instanceof Error) && (ye(z), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", I || "React class", k, D, typeof O), ye(null)), O instanceof Error && !(O.message in Oe) && (Oe[O.message] = !0, ye(z), v("Failed %s type: %s", k, O.message), ye(null));
          }
      }
    }
    var dt = Array.isArray;
    function ke(u) {
      return dt(u);
    }
    function ut(u) {
      {
        var j = typeof Symbol == "function" && Symbol.toStringTag, k = j && u[Symbol.toStringTag] || u.constructor.name || "Object";
        return k;
      }
    }
    function ft(u) {
      try {
        return We(u), !1;
      } catch {
        return !0;
      }
    }
    function We(u) {
      return "" + u;
    }
    function ze(u) {
      if (ft(u))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ut(u)), We(u);
    }
    var Fe = m.ReactCurrentOwner, pt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Be, Ve;
    function ht(u) {
      if (fe.call(u, "ref")) {
        var j = Object.getOwnPropertyDescriptor(u, "ref").get;
        if (j && j.isReactWarning)
          return !1;
      }
      return u.ref !== void 0;
    }
    function xt(u) {
      if (fe.call(u, "key")) {
        var j = Object.getOwnPropertyDescriptor(u, "key").get;
        if (j && j.isReactWarning)
          return !1;
      }
      return u.key !== void 0;
    }
    function gt(u, j) {
      typeof u.ref == "string" && Fe.current;
    }
    function mt(u, j) {
      {
        var k = function() {
          Be || (Be = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", j));
        };
        k.isReactWarning = !0, Object.defineProperty(u, "key", {
          get: k,
          configurable: !0
        });
      }
    }
    function yt(u, j) {
      {
        var k = function() {
          Ve || (Ve = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", j));
        };
        k.isReactWarning = !0, Object.defineProperty(u, "ref", {
          get: k,
          configurable: !0
        });
      }
    }
    var bt = function(u, j, k, I, z, V, D) {
      var O = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: u,
        key: j,
        ref: k,
        props: D,
        // Record the component responsible for creating this element.
        _owner: V
      };
      return O._store = {}, Object.defineProperty(O._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(O, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: I
      }), Object.defineProperty(O, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: z
      }), Object.freeze && (Object.freeze(O.props), Object.freeze(O)), O;
    };
    function vt(u, j, k, I, z) {
      {
        var V, D = {}, O = null, G = null;
        k !== void 0 && (ze(k), O = "" + k), xt(j) && (ze(j.key), O = "" + j.key), ht(j) && (G = j.ref, gt(j, z));
        for (V in j)
          fe.call(j, V) && !pt.hasOwnProperty(V) && (D[V] = j[V]);
        if (u && u.defaultProps) {
          var q = u.defaultProps;
          for (V in q)
            D[V] === void 0 && (D[V] = q[V]);
        }
        if (O || G) {
          var U = typeof u == "function" ? u.displayName || u.name || "Unknown" : u;
          O && mt(D, U), G && yt(D, U);
        }
        return bt(u, O, G, z, I, Fe.current, D);
      }
    }
    var Re = m.ReactCurrentOwner, Ne = m.ReactDebugCurrentFrame;
    function ne(u) {
      if (u) {
        var j = u._owner, k = me(u.type, u._source, j ? j.type : null);
        Ne.setExtraStackFrame(k);
      } else
        Ne.setExtraStackFrame(null);
    }
    var Ce;
    Ce = !1;
    function Te(u) {
      return typeof u == "object" && u !== null && u.$$typeof === t;
    }
    function Ye() {
      {
        if (Re.current) {
          var u = B(Re.current.type);
          if (u)
            return `

Check the render method of \`` + u + "`.";
        }
        return "";
      }
    }
    function jt(u) {
      return "";
    }
    var qe = {};
    function wt(u) {
      {
        var j = Ye();
        if (!j) {
          var k = typeof u == "string" ? u : u.displayName || u.name;
          k && (j = `

Check the top-level render call using <` + k + ">.");
        }
        return j;
      }
    }
    function Ke(u, j) {
      {
        if (!u._store || u._store.validated || u.key != null)
          return;
        u._store.validated = !0;
        var k = wt(j);
        if (qe[k])
          return;
        qe[k] = !0;
        var I = "";
        u && u._owner && u._owner !== Re.current && (I = " It was passed a child from " + B(u._owner.type) + "."), ne(u), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', k, I), ne(null);
      }
    }
    function Ue(u, j) {
      {
        if (typeof u != "object")
          return;
        if (ke(u))
          for (var k = 0; k < u.length; k++) {
            var I = u[k];
            Te(I) && Ke(I, j);
          }
        else if (Te(u))
          u._store && (u._store.validated = !0);
        else if (u) {
          var z = g(u);
          if (typeof z == "function" && z !== u.entries)
            for (var V = z.call(u), D; !(D = V.next()).done; )
              Te(D.value) && Ke(D.value, j);
        }
      }
    }
    function St(u) {
      {
        var j = u.type;
        if (j == null || typeof j == "string")
          return;
        var k;
        if (typeof j == "function")
          k = j.propTypes;
        else if (typeof j == "object" && (j.$$typeof === c || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        j.$$typeof === d))
          k = j.propTypes;
        else
          return;
        if (k) {
          var I = B(j);
          ct(k, u.props, "prop", I, u);
        } else if (j.PropTypes !== void 0 && !Ce) {
          Ce = !0;
          var z = B(j);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", z || "Unknown");
        }
        typeof j.getDefaultProps == "function" && !j.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function kt(u) {
      {
        for (var j = Object.keys(u.props), k = 0; k < j.length; k++) {
          var I = j[k];
          if (I !== "children" && I !== "key") {
            ne(u), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", I), ne(null);
            break;
          }
        }
        u.ref !== null && (ne(u), v("Invalid attribute `ref` supplied to `React.Fragment`."), ne(null));
      }
    }
    var Ge = {};
    function He(u, j, k, I, z, V) {
      {
        var D = F(u);
        if (!D) {
          var O = "";
          (u === void 0 || typeof u == "object" && u !== null && Object.keys(u).length === 0) && (O += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var G = jt();
          G ? O += G : O += Ye();
          var q;
          u === null ? q = "null" : ke(u) ? q = "array" : u !== void 0 && u.$$typeof === t ? (q = "<" + (B(u.type) || "Unknown") + " />", O = " Did you accidentally export a JSX literal instead of a component?") : q = typeof u, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", q, O);
        }
        var U = vt(u, j, k, z, V);
        if (U == null)
          return U;
        if (D) {
          var J = j.children;
          if (J !== void 0)
            if (I)
              if (ke(J)) {
                for (var se = 0; se < J.length; se++)
                  Ue(J[se], u);
                Object.freeze && Object.freeze(J);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ue(J, u);
        }
        if (fe.call(j, "key")) {
          var re = B(u), H = Object.keys(j).filter(function(Et) {
            return Et !== "key";
          }), $e = H.length > 0 ? "{key: someKey, " + H.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ge[re + $e]) {
            var It = H.length > 0 ? "{" + H.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, $e, re, It, re), Ge[re + $e] = !0;
          }
        }
        return u === r ? kt(U) : St(U), U;
      }
    }
    function Rt(u, j, k) {
      return He(u, j, k, !0);
    }
    function Ct(u, j, k) {
      return He(u, j, k, !1);
    }
    var Tt = Ct, $t = Rt;
    he.Fragment = r, he.jsx = Tt, he.jsxs = $t;
  }()), he;
}
process.env.NODE_ENV === "production" ? Me.exports = Pt() : Me.exports = Mt();
var o = Me.exports;
function Lt(e, t, n, r) {
  const i = document.createElement("canvas").getContext("2d");
  if (!i)
    return { height: 0, lines: [], totalWidth: 0 };
  i.font = t;
  const a = [], l = e.split(`
`);
  let c = r, p = 0;
  for (const f of l) {
    if (f.trim() === "") {
      c += r * 0.5;
      continue;
    }
    const d = f.split(" ");
    let h = "", x = 0;
    for (const y of d) {
      const b = i.measureText(y).width, g = h ? `${h} ${y}` : y, m = i.measureText(g).width;
      m > n && h ? (a.push({
        text: h,
        x: 0,
        y: c,
        width: x,
        baseline: r * 0.85
      }), p = Math.max(p, x), c += r, h = y, x = b) : (h = g, x = m);
    }
    h && (a.push({
      text: h,
      x: 0,
      y: c,
      width: x,
      baseline: r * 0.85
    }), p = Math.max(p, x), c += r);
  }
  return {
    height: c,
    lines: a,
    totalWidth: p
  };
}
function be(e, t, n, r) {
  const [s, i] = C(null);
  return $(() => {
    if (!e) {
      i(null);
      return;
    }
    const a = Lt(e, t, n, r);
    i(a);
  }, [e, t, n, r]), s;
}
const hr = ({
  text: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: r = 22,
  color: s = "#ffffff",
  x: i = 0,
  y: a = 0,
  align: l = "left",
  verticalAlign: c = "top",
  className: p,
  style: f,
  onMeasure: d
}) => {
  const h = P(null), x = be(e, t, n, r);
  return $(() => {
    x && d && d(x);
  }, [x, d]), $(() => {
    const y = h.current;
    if (!y || !x) return;
    const b = y.getContext("2d");
    if (!b) return;
    const g = 10;
    y.width = n + g * 2, y.height = x.height + g * 2, b.clearRect(0, 0, y.width, y.height), b.font = t, b.fillStyle = s, b.textBaseline = "top";
    let m = g;
    (c === "bottom" || c === "middle") && (m = g);
    for (const v of x.lines) {
      let w = g + i;
      l === "center" ? w = g + (n - v.width) / 2 + i : l === "right" && (w = g + n - v.width + i), b.fillText(v.text, w, m + v.y);
    }
  }, [x, t, n, s, i, a, l, c]), /* @__PURE__ */ o.jsx(
    "canvas",
    {
      ref: h,
      className: p,
      style: {
        display: "block",
        maxWidth: "100%",
        ...f
      }
    }
  );
}, xr = ({
  text: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: r = 22,
  color: s = "#ffffff",
  measurement: i,
  style: a,
  className: l
}) => {
  const c = be(e, t, n, r), p = i || c;
  if (!p) return null;
  const f = M((d, h = "left") => {
    switch (h) {
      case "center":
        return (n - d) / 2;
      case "right":
        return n - d;
      default:
        return 0;
    }
  }, [n]);
  return /* @__PURE__ */ o.jsx(
    "div",
    {
      className: l,
      style: {
        font: t,
        color: s,
        lineHeight: `${r}px`,
        maxWidth: `${n}px`,
        ...a
      },
      children: p.lines.map((d, h) => /* @__PURE__ */ o.jsx(
        "div",
        {
          style: {
            height: `${r}px`,
            display: "flex",
            alignItems: "flex-start"
          },
          children: /* @__PURE__ */ o.jsx("span", { style: { paddingLeft: f(d.width) }, children: d.text })
        },
        h
      ))
    }
  );
};
function gr(e, t) {
  const {
    direction: n = "row",
    gap: r = 0,
    padding: s = 0,
    align: i = "stretch",
    justify: a = "start",
    wrap: l = !1,
    maxWidth: c = 1 / 0,
    maxHeight: p = 1 / 0
  } = t, f = [];
  let d = s, h = s, x = 0;
  return Q.Children.toArray(e).forEach((b, g) => {
    n === "row" ? (!l && d + 100 > c && (d = s, h += x + r, x = 0), f.push({
      x: d,
      y: h,
      width: 100,
      height: 50
    }), d += 100 + r, x = Math.max(x, 50)) : (f.push({
      x: s,
      y: h,
      width: 100,
      height: 50
    }), h += 50 + r);
  }), f;
}
const mr = ({
  children: e,
  options: t = {},
  className: n,
  style: r
}) => {
  const {
    direction: s = "row",
    gap: i = 0,
    padding: a = 0,
    align: l = "stretch",
    justify: c = "start",
    wrap: p = !1,
    maxWidth: f = 1 / 0,
    maxHeight: d = 1 / 0
  } = t, h = W(() => ({
    display: "flex",
    flexDirection: s,
    gap: `${i}px`,
    padding: `${a}px`,
    flexWrap: p ? "wrap" : "nowrap",
    alignItems: l,
    justifyContent: c,
    maxWidth: f === 1 / 0 ? void 0 : f,
    maxHeight: d === 1 / 0 ? void 0 : d,
    ...r
  }), [s, i, a, l, c, p, f, d, r]);
  return /* @__PURE__ */ o.jsx("div", { className: n, style: h, children: e });
}, yr = ({
  children: e,
  direction: t = "column",
  gap: n = 8,
  align: r = "stretch",
  justify: s = "start",
  className: i,
  style: a
}) => {
  const l = W(() => ({
    display: "flex",
    flexDirection: t,
    gap: `${n}px`,
    alignItems: r,
    justifyContent: s
  }), [t, n, r, s]);
  return /* @__PURE__ */ o.jsx("div", { className: i, style: { ...l, ...a }, children: e });
}, At = ({
  children: e,
  columns: t = 3,
  rows: n,
  gap: r = 16,
  columnGap: s,
  rowGap: i,
  alignItems: a = "stretch",
  justifyItems: l = "stretch",
  className: c,
  style: p
}) => {
  const f = W(() => ({
    display: "grid",
    gridTemplateColumns: typeof t == "number" ? `repeat(${t}, 1fr)` : t,
    gridTemplateRows: n ? typeof n == "number" ? `repeat(${n}, 1fr)` : n : void 0,
    gap: `${r}px`,
    columnGap: s !== void 0 ? `${s}px` : void 0,
    rowGap: i !== void 0 ? `${i}px` : void 0,
    alignItems: a,
    justifyItems: l
  }), [t, n, r, s, i, a, l]);
  return /* @__PURE__ */ o.jsx("div", { className: c, style: { ...f, ...p }, children: e });
}, br = ({
  children: e,
  columns: t = 3,
  gap: n = 16,
  className: r,
  style: s
}) => {
  const i = P(null), [a, l] = C(Array(t).fill(0)), c = W(() => Q.Children.toArray(e), [e]);
  M(() => {
    let f = 1 / 0, d = 0;
    return a.forEach((h, x) => {
      h < f && (f = h, d = x);
    }), d;
  }, [a]);
  const p = W(() => {
    const f = Array(t).fill(0), d = [];
    return c.forEach((h, x) => {
      const y = x % t, b = y * (100 / t), g = f[y], m = 150 + x % 3 * 50;
      d.push({
        x: b,
        y: g,
        width: 100 / t
      }), f[y] += m + n;
    }), l(f), d;
  }, [c, t, n]);
  return /* @__PURE__ */ o.jsx(
    "div",
    {
      ref: i,
      className: r,
      style: {
        position: "relative",
        width: "100%",
        height: `${Math.max(...a)}px`,
        ...s
      },
      children: c.map((f, d) => /* @__PURE__ */ o.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: `${p[d].x}%`,
            top: `${p[d].y}px`,
            width: `calc(${p[d].width}% - ${n}px)`,
            marginLeft: n / 2,
            marginRight: n / 2
          },
          children: f
        },
        d
      ))
    }
  );
}, vr = ({
  children: e,
  breakpoints: t = [
    { minWidth: 1200, columns: 4 },
    { minWidth: 900, columns: 3 },
    { minWidth: 600, columns: 2 },
    { minWidth: 0, columns: 1 }
  ],
  gap: n = 16,
  className: r,
  style: s
}) => {
  const i = P(null), [a, l] = C(3);
  return $(() => {
    const c = () => {
      var d;
      const p = ((d = i.current) == null ? void 0 : d.clientWidth) || 1e3, f = t.filter((h) => p >= h.minWidth).sort((h, x) => x.minWidth - h.minWidth)[0];
      l((f == null ? void 0 : f.columns) || 1);
    };
    return c(), window.addEventListener("resize", c), () => window.removeEventListener("resize", c);
  }, [t]), /* @__PURE__ */ o.jsx(
    "div",
    {
      ref: i,
      className: r,
      style: { ...s },
      children: /* @__PURE__ */ o.jsx(At, { columns: a, gap: n, children: e })
    }
  );
}, _t = ({
  char: e = "▋",
  blinkSpeed: t = 500,
  color: n = "currentColor",
  className: r
}) => {
  const [s, i] = C(!0);
  return $(() => {
    const a = setInterval(() => {
      i((l) => !l);
    }, t);
    return () => clearInterval(a);
  }, [t]), /* @__PURE__ */ o.jsx(
    "span",
    {
      className: r,
      style: {
        opacity: s ? 1 : 0,
        color: n,
        transition: "opacity 0.1s"
      },
      children: e
    }
  );
}, jr = ({
  text: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: r = 22,
  color: s = "#ffffff",
  config: i = {},
  onComplete: a,
  onProgress: l,
  className: c,
  style: p
}) => {
  const {
    speed: f = 20,
    startDelay: d = 0,
    chunkSize: h = 1,
    chunkDelay: x = 0,
    enableCursor: y = !0,
    cursorChar: b = "▋",
    cursorBlinkSpeed: g = 500
  } = i, [m, v] = C(""), [w, S] = C(!1), [R, T] = C(!1), L = be(e, t, n, r), E = be(m, t, n, r);
  $(() => {
    if (!e) {
      v(""), S(!1), T(!1);
      return;
    }
    v(""), S(!1), T(!1);
    const F = setTimeout(() => {
      S(!0);
      let _ = 0;
      const K = setInterval(() => {
        if (_ < e.length) {
          const B = Math.min(_ + h, e.length);
          v(e.slice(0, B)), _ = B, l && l(_ / e.length);
        } else
          clearInterval(K), S(!1), T(!0), a && a();
      }, h > 1 && x || f);
      return () => clearInterval(K);
    }, d);
    return () => clearTimeout(F);
  }, [e, f, d, h, x, a, l]);
  const A = W(() => L ? L.height + r : "auto", [L, r]);
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: c,
      style: {
        position: "relative",
        font: t,
        color: s,
        lineHeight: `${r}px`,
        maxWidth: `${n}px`,
        minHeight: typeof A == "number" ? `${A}px` : void 0,
        ...p
      },
      children: [
        E == null ? void 0 : E.lines.map((F, _) => /* @__PURE__ */ o.jsx(
          "div",
          {
            style: {
              height: `${r}px`,
              display: "flex",
              alignItems: "flex-start"
            },
            children: /* @__PURE__ */ o.jsx("span", { children: F.text })
          },
          _
        )),
        y && w && /* @__PURE__ */ o.jsx(
          _t,
          {
            char: b,
            blinkSpeed: g,
            color: s
          }
        )
      ]
    }
  );
};
function Ot(e, t = {}) {
  const {
    speed: n = 20,
    chunkSize: r = 1,
    chunkDelay: s = 0
  } = t, [i, a] = C(""), [l, c] = C(!1), [p, f] = C(!1), [d, h] = C(0), x = P(null), y = P(e), b = P(0);
  $(() => {
    y.current = e, b.current = 0, a(""), h(0), f(!1);
  }, [e]);
  const g = M(() => {
    p || !y.current || (c(!0), x.current = setInterval(() => {
      const w = y.current;
      if (w)
        if (b.current < w.length) {
          const S = Math.min(b.current + r, w.length);
          a(w.slice(0, S)), b.current = S, h(S / w.length);
        } else
          c(!1), f(!0), x.current && clearInterval(x.current);
    }, r > 1 && s || n));
  }, [n, r, s, p]), m = M(() => {
    c(!1), x.current && clearInterval(x.current);
  }, []), v = M(() => {
    m(), b.current = 0, a(""), h(0), f(!1);
  }, [m]);
  return $(() => () => {
    x.current && clearInterval(x.current);
  }, []), {
    displayedText: i,
    isStreaming: l,
    isComplete: p,
    progress: d,
    start: g,
    pause: m,
    reset: v
  };
}
const wr = ({
  chunks: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: r = 22,
  color: s = "#ffffff",
  chunkDelay: i = 500,
  onChunkComplete: a,
  onComplete: l,
  className: c,
  style: p
}) => {
  const [f, d] = C(0), [h, x] = C(""), [y, b] = C(!1), { displayedText: g, isComplete: m } = Ot(
    e[f] || "",
    { speed: 15, chunkSize: 3 }
  );
  return $(() => {
    m && g === e[f] && (a && a(f), f < e.length - 1 ? setTimeout(() => {
      d((v) => v + 1);
    }, i) : l && l());
  }, [m, g, e, f, i, a, l]), /* @__PURE__ */ o.jsx(
    "div",
    {
      className: c,
      style: {
        font: t,
        color: s,
        lineHeight: `${r}px`,
        maxWidth: `${n}px`,
        ...p
      },
      children: g
    }
  );
};
function ve(e) {
  const t = e.trim();
  if (!t)
    return { type: "normal", confidence: 1 };
  if (/<vote>|<\/vote>/i.test(t) || /\b(vote|ayes?|nays?|motion|amendment)\b/i.test(t))
    return {
      type: "vote",
      confidence: 0.9,
      metadata: { hasVoteTags: /<vote>/i.test(t) }
    };
  if (/```[\s\S]*?```/.test(t) || /^`[\s\S]*`$/m.test(t)) {
    const n = t.match(/```(\w+)/);
    return {
      type: "code",
      confidence: 0.95,
      metadata: { language: (n == null ? void 0 : n[1]) || "plain" }
    };
  }
  return /^(\d+\.|[-*•]|\•)\s/m.test(t) || /^\[[\s|x]\]\s/m.test(t) ? {
    type: "list",
    confidence: 0.85,
    metadata: { style: /^\d+\./.test(t) ? "numbered" : "bullet" }
  } : /^\|.*\|$/m.test(t) && t.split(`
`).length >= 2 ? {
    type: "table",
    confidence: 0.9,
    metadata: { rows: t.split(`
`).length }
  } : /chart|graph|plot|diagram|visualization|data point|axis|series/i.test(t) ? {
    type: "chart",
    confidence: 0.7,
    metadata: { keywords: ["chart", "graph", "plot"] }
  } : /\?\s*$/.test(t) || /^(what|who|where|when|why|how|should|could|would)\b/i.test(t) ? {
    type: "question",
    confidence: 0.85,
    metadata: { endsWithQuestion: /\?$/.test(t) }
  } : /in summary|to summarize|in conclusion|key points|main takeaways|bottom line/i.test(t) ? {
    type: "summary",
    confidence: 0.8
  } : /^error|failed|exception|uncaught|typeerror|referenceerror/i.test(t) ? {
    type: "error",
    confidence: 0.9
  } : /^warning|warn|caution|notice|deprecated/i.test(t) ? {
    type: "warning",
    confidence: 0.9
  } : /^success|completed|done|saved|created|updated|installed/i.test(t) ? {
    type: "success",
    confidence: 0.85
  } : /^info|note|tip|hint|did you know/i.test(t) ? {
    type: "info",
    confidence: 0.8
  } : { type: "normal", confidence: 1 };
}
function Sr(e) {
  const t = [], n = e.split(/\n\n+/);
  for (const r of n)
    r.trim() && t.push(ve(r));
  return t;
}
function kr(e) {
  const t = [], n = [], r = [], s = [], i = [], a = /^#{1,6}\s+(.+)$/gm;
  let l;
  for (; (l = a.exec(e)) !== null; )
    t.push(l[1]);
  const c = /^[-*•]\s+(.+)$/gm;
  for (; (l = c.exec(e)) !== null; )
    n.push(l[1]);
  const p = /^\d+\.\s+(.+)$/gm;
  for (; (l = p.exec(e)) !== null; )
    n.push(l[1]);
  const f = /```[\s\S]*?```/g;
  for (; (l = f.exec(e)) !== null; )
    r.push(l[0]);
  const d = /\[([^\]]+)\]\(([^)]+)\)/g;
  for (; (l = d.exec(e)) !== null; )
    s.push({ text: l[1], url: l[2] });
  const h = /\b\d+\.?\d*\b/g;
  for (; (l = h.exec(e)) !== null; ) {
    const x = parseFloat(l[0]);
    !isNaN(x) && isFinite(x) && i.push(x);
  }
  return { headings: t, bulletPoints: n, codeBlocks: r, links: s, numbers: i };
}
function Dt(e) {
  const t = {
    normal: "#ffffff",
    vote: "#f59e0b",
    code: "#8b5cf6",
    list: "#3b82f6",
    table: "#10b981",
    chart: "#ec4899",
    question: "#06b6d4",
    summary: "#6366f1",
    error: "#ef4444",
    warning: "#f59e0b",
    success: "#10b981",
    info: "#3b82f6"
  };
  return t[e] || t.normal;
}
function Wt(e) {
  const t = {
    normal: "💬",
    vote: "🗳️",
    code: "💻",
    list: "📋",
    table: "📊",
    chart: "📈",
    question: "❓",
    summary: "📝",
    error: "❌",
    warning: "⚠️",
    success: "✅",
    info: "ℹ️"
  };
  return t[e] || t.normal;
}
const zt = ({
  content: e,
  councilor: t,
  showIcon: n = !0,
  timestamp: r,
  className: s,
  style: i
}) => {
  const a = r == null ? void 0 : r.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: s,
      style: {
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        ...i
      },
      children: [
        t && /* @__PURE__ */ o.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px"
        }, children: [
          /* @__PURE__ */ o.jsx("div", { style: {
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: t.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 600,
            color: "#fff"
          }, children: t.avatar || t.name.charAt(0) }),
          /* @__PURE__ */ o.jsx("span", { style: {
            fontWeight: 600,
            color: t.color,
            fontSize: "14px"
          }, children: t.name }),
          a && /* @__PURE__ */ o.jsx("span", { style: {
            fontSize: "11px",
            color: "#6b7280",
            marginLeft: "auto"
          }, children: a })
        ] }),
        /* @__PURE__ */ o.jsx("div", { style: {
          fontSize: "15px",
          lineHeight: 1.5,
          color: "#e5e7eb",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }, children: e })
      ]
    }
  );
}, Rr = ({
  content: e,
  councilor: t,
  streaming: n = !1,
  showIcon: r = !0,
  timestamp: s,
  className: i,
  style: a
}) => {
  const l = W(() => ve(e), [e]), c = l.type, p = r ? Wt(c) : null, f = Dt(c), d = M(() => {
    var h, x, y, b;
    switch (c) {
      case "vote":
        const { VoteCard: g } = require("./VoteCard");
        return /* @__PURE__ */ o.jsx(g, { content: e, councilor: t });
      case "code":
        const { CodeBlock: m } = require("./CodeBlock");
        return /* @__PURE__ */ o.jsx(
          m,
          {
            content: e,
            language: (h = l.metadata) == null ? void 0 : h.language,
            councilor: t
          }
        );
      case "list":
        const { ListCard: v } = require("./ListCard");
        return /* @__PURE__ */ o.jsx(
          v,
          {
            content: e,
            style: (x = l.metadata) == null ? void 0 : x.style,
            councilor: t
          }
        );
      case "table":
        const { DataTable: w } = require("./DataTable");
        return /* @__PURE__ */ o.jsx(
          w,
          {
            content: e,
            headers: (y = l.metadata) == null ? void 0 : y.headers,
            councilor: t
          }
        );
      case "chart":
        const { DataChart: S } = require("./DataChart");
        return /* @__PURE__ */ o.jsx(
          S,
          {
            content: e,
            chartType: (b = l.metadata) == null ? void 0 : b.chartType,
            councilor: t
          }
        );
      case "question":
        const { QuestionBubble: R } = require("./QuestionBubble");
        return /* @__PURE__ */ o.jsx(
          R,
          {
            content: e,
            councilor: t
          }
        );
      case "summary":
        const { SummaryCard: T } = require("./SummaryCard");
        return /* @__PURE__ */ o.jsx(
          T,
          {
            content: e,
            councilor: t
          }
        );
      case "error":
        return /* @__PURE__ */ o.jsxs("div", { style: {
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#fca5a5"
        }, children: [
          /* @__PURE__ */ o.jsx("div", { style: { marginBottom: "4px" }, children: "❌ Error" }),
          /* @__PURE__ */ o.jsx("div", { style: { color: "#e5e7eb" }, children: e })
        ] });
      case "warning":
        return /* @__PURE__ */ o.jsxs("div", { style: {
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(245, 158, 11, 0.1)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          color: "#fcd34d"
        }, children: [
          /* @__PURE__ */ o.jsx("div", { style: { marginBottom: "4px" }, children: "⚠️ Warning" }),
          /* @__PURE__ */ o.jsx("div", { style: { color: "#e5e7eb" }, children: e })
        ] });
      case "success":
        return /* @__PURE__ */ o.jsxs("div", { style: {
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          color: "#6ee7b7"
        }, children: [
          /* @__PURE__ */ o.jsx("div", { style: { marginBottom: "4px" }, children: "✅ Success" }),
          /* @__PURE__ */ o.jsx("div", { style: { color: "#e5e7eb" }, children: e })
        ] });
      case "info":
        return /* @__PURE__ */ o.jsxs("div", { style: {
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(59, 130, 246, 0.1)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          color: "#93c5fd"
        }, children: [
          /* @__PURE__ */ o.jsx("div", { style: { marginBottom: "4px" }, children: "ℹ️ Info" }),
          /* @__PURE__ */ o.jsx("div", { style: { color: "#e5e7eb" }, children: e })
        ] });
      default:
        return /* @__PURE__ */ o.jsx(
          zt,
          {
            content: e,
            councilor: t,
            showIcon: r,
            timestamp: s
          }
        );
    }
  }, [c, e, t, r, s, l]);
  return /* @__PURE__ */ o.jsxs("div", { className: i, style: a, children: [
    c !== "normal" && c !== "success" && c !== "error" && c !== "warning" && c !== "info" && /* @__PURE__ */ o.jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "6px",
      fontSize: "12px",
      color: f
    }, children: [
      /* @__PURE__ */ o.jsx("span", { children: p }),
      /* @__PURE__ */ o.jsx("span", { style: {
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontWeight: 600
      }, children: c })
    ] }),
    d()
  ] });
};
function Ft(e) {
  const t = [], n = e.split(`
`);
  for (const r of n) {
    const s = r.match(/^[-*•]?\s*\[?\s*(\d+)\s*\]?\s*(.+)$/);
    s && t.push({
      id: s[1],
      label: s[2].trim()
    });
  }
  return t.length === 0 ? [
    { id: "yes", label: "Yes" },
    { id: "no", label: "No" },
    { id: "abstain", label: "Abstain" }
  ] : t;
}
const Cr = ({
  content: e,
  options: t,
  showResults: n = !1,
  allowMultiple: r = !1,
  onVote: s,
  onComplete: i,
  councilor: a,
  className: l,
  style: c
}) => {
  const [p, f] = C([]), [d, h] = C(!1), [x, y] = C({}), b = W(
    () => t || Ft(e),
    [e, t]
  ), g = W(
    () => Object.values(x).reduce((S, R) => S + R, 0),
    [x]
  ), m = M((S) => {
    d || f((R) => {
      if (r) {
        const T = R.includes(S) ? R.filter((L) => L !== S) : [...R, S];
        return s && s(T), T;
      } else {
        const T = [S];
        return s && s(T), setTimeout(() => {
          h(!0), i && i();
        }, 500), T;
      }
    });
  }, [d, r, s, i]), v = M(() => {
    if (p.length === 0) return;
    const S = { ...x };
    p.forEach((R) => {
      S[R] = (S[R] || 0) + 1;
    }), y(S), h(!0), i && i();
  }, [p, x, i]), w = (S) => {
    const R = x[S] || 0;
    return g > 0 ? Math.round(R / g * 100) : 0;
  };
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: l,
      style: {
        padding: "16px",
        borderRadius: "12px",
        background: "rgba(245, 158, 11, 0.05)",
        border: "1px solid rgba(245, 158, 11, 0.2)",
        ...c
      },
      children: [
        /* @__PURE__ */ o.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px"
        }, children: [
          /* @__PURE__ */ o.jsx("span", { style: { fontSize: "20px" }, children: "🗳️" }),
          /* @__PURE__ */ o.jsx("span", { style: {
            fontWeight: 600,
            color: "#f59e0b",
            fontSize: "16px"
          }, children: "Vote" }),
          a && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
            /* @__PURE__ */ o.jsx("span", { style: { color: "#6b7280" }, children: "by" }),
            /* @__PURE__ */ o.jsx("span", { style: {
              color: a.color,
              fontWeight: 600
            }, children: a.name })
          ] })
        ] }),
        /* @__PURE__ */ o.jsx("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }, children: b.map((S) => {
          const R = p.includes(S.id), T = w(S.id), L = n || d;
          return /* @__PURE__ */ o.jsxs(
            "div",
            {
              onClick: () => m(S.id),
              style: {
                padding: "12px 16px",
                borderRadius: "8px",
                border: R ? "2px solid #f59e0b" : "2px solid rgba(255, 255, 255, 0.1)",
                background: R ? "rgba(245, 158, 11, 0.1)" : "rgba(255, 255, 255, 0.03)",
                cursor: d ? "default" : "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden"
              },
              children: [
                L && /* @__PURE__ */ o.jsx("div", { style: {
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${T}%`,
                  background: "rgba(245, 158, 11, 0.2)",
                  transition: "width 0.5s ease"
                } }),
                /* @__PURE__ */ o.jsxs("div", { style: {
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }, children: [
                  /* @__PURE__ */ o.jsxs("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }, children: [
                    /* @__PURE__ */ o.jsx("div", { style: {
                      width: "20px",
                      height: "20px",
                      borderRadius: r ? "4px" : "50%",
                      border: R ? "2px solid #f59e0b" : "2px solid #6b7280",
                      background: R ? "#f59e0b" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }, children: R && /* @__PURE__ */ o.jsx("span", { style: { color: "#fff", fontSize: "12px" }, children: "✓" }) }),
                    /* @__PURE__ */ o.jsx("span", { style: {
                      color: R ? "#f59e0b" : "#e5e7eb",
                      fontWeight: R ? 600 : 400
                    }, children: S.label })
                  ] }),
                  (n || d) && /* @__PURE__ */ o.jsxs("span", { style: {
                    color: "#9ca3af",
                    fontSize: "14px",
                    fontWeight: 600
                  }, children: [
                    T,
                    "%"
                  ] })
                ] })
              ]
            },
            S.id
          );
        }) }),
        r && p.length > 0 && !d && /* @__PURE__ */ o.jsxs(
          "button",
          {
            onClick: v,
            style: {
              marginTop: "16px",
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#f59e0b",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease"
            },
            children: [
              "Submit Vote (",
              p.length,
              ")"
            ]
          }
        ),
        (n || d) && g > 0 && /* @__PURE__ */ o.jsxs("div", { style: {
          marginTop: "12px",
          textAlign: "center",
          fontSize: "12px",
          color: "#6b7280"
        }, children: [
          g,
          " vote",
          g !== 1 ? "s" : "",
          " total"
        ] })
      ]
    }
  );
}, Bt = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  py: "Python",
  python: "Python",
  rb: "Ruby",
  ruby: "Ruby",
  go: "Go",
  rust: "Rust",
  rs: "Rust",
  java: "Java",
  cpp: "C++",
  c: "C",
  cs: "C#",
  csharp: "C#",
  php: "PHP",
  swift: "Swift",
  kt: "Kotlin",
  kotlin: "Kotlin",
  tsx: "TSX",
  jsx: "JSX",
  html: "HTML",
  css: "CSS",
  sql: "SQL",
  bash: "Bash",
  sh: "Shell",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  xml: "XML",
  md: "Markdown",
  graphql: "GraphQL",
  dockerfile: "Dockerfile",
  plain: "Plain Text"
};
function Vt(e, t) {
  let n = e.replace(/^```\w*\n?/, "").replace(/\n?```$/, "").trim();
  const s = [
    // Strings
    [/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, "token-string"],
    // Comments
    [/\/\/.*$/gm, "token-comment"],
    [/\/\*[\s\S]*?\*\//g, "token-comment"],
    [/#.*$/gm, "token-comment"],
    // Keywords
    [/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|static|public|private|extends|implements)\b/g, "token-keyword"],
    // Types
    [/\b(string|number|boolean|void|null|undefined|any|object|array|interface|type|enum)\b/g, "token-type"],
    // Numbers
    [/\b\d+\.?\d*\b/g, "token-number"],
    // Functions
    [/\b[a-zA-Z_]\w*(?=\s*\()/g, "token-function"],
    // HTML tags
    [/<\/?[\w-]+/g, "token-tag"],
    [/\/?>/g, "token-tag"],
    // CSS properties
    [/[\w-]+(?=\s*:)/g, "token-property"]
  ].map(([i, a]) => ({
    pattern: i,
    className: a
  }));
  for (const { pattern: i, className: a } of s)
    n = n.replace(i, (l) => `<span class="${a}">${l}</span>`);
  return n;
}
const Tr = ({
  content: e,
  language: t = "plain",
  showLineNumbers: n = !0,
  showCopyButton: r = !0,
  theme: s = "dark",
  maxHeight: i,
  onCopy: a,
  councilor: l,
  className: c,
  style: p
}) => {
  const [f, d] = C(!1), h = W(() => e.replace(/^```\w*\n?/, "").replace(/\n?```$/, "").trim(), [e]), x = W(() => Bt[t.toLowerCase()] || t.toUpperCase(), [t]), y = W(() => h.split(`
`), [h]), b = M(async () => {
    try {
      await navigator.clipboard.writeText(h), d(!0), setTimeout(() => d(!1), 2e3), a && a();
    } catch (v) {
      console.error("Failed to copy:", v);
    }
  }, [h, a]), g = s === "dark" ? "#1e1e1e" : "#f5f5f5", m = s === "dark" ? "#d4d4d4" : "#24292e";
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: c,
      style: {
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${s === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        ...p
      },
      children: [
        /* @__PURE__ */ o.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          background: s === "dark" ? "#2d2d2d" : "#eaeaea",
          borderBottom: `1px solid ${s === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
        }, children: [
          /* @__PURE__ */ o.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }, children: [
            /* @__PURE__ */ o.jsx("span", { style: { fontSize: "16px" }, children: "💻" }),
            /* @__PURE__ */ o.jsx("span", { style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "#8b5cf6",
              textTransform: "uppercase"
            }, children: x })
          ] }),
          r && /* @__PURE__ */ o.jsx(
            "button",
            {
              onClick: b,
              style: {
                padding: "4px 8px",
                borderRadius: "4px",
                border: "none",
                background: f ? "#10b981" : "rgba(255,255,255,0.1)",
                color: f ? "#fff" : m,
                fontSize: "11px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              },
              children: f ? "✓ Copied" : "📋 Copy"
            }
          )
        ] }),
        /* @__PURE__ */ o.jsx("div", { style: {
          background: g,
          maxHeight: i,
          overflow: "auto",
          padding: "12px"
        }, children: /* @__PURE__ */ o.jsx("pre", { style: {
          margin: 0,
          fontFamily: 'Monaco, Menlo, "Courier New", monospace',
          fontSize: "13px",
          lineHeight: 1.5,
          color: m
        }, children: /* @__PURE__ */ o.jsx("code", { children: y.map((v, w) => /* @__PURE__ */ o.jsxs("div", { style: {
          display: "flex",
          gap: "16px"
        }, children: [
          n && /* @__PURE__ */ o.jsx("span", { style: {
            color: "#6b7280",
            userSelect: "none",
            minWidth: "24px",
            textAlign: "right",
            flexShrink: 0
          }, children: w + 1 }),
          /* @__PURE__ */ o.jsx("span", { dangerouslySetInnerHTML: { __html: Vt(v) } })
        ] }, w)) }) }) }),
        l && /* @__PURE__ */ o.jsxs("div", { style: {
          padding: "8px 12px",
          background: s === "dark" ? "#2d2d2d" : "#eaeaea",
          borderTop: `1px solid ${s === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "12px",
          color: "#9ca3af"
        }, children: [
          /* @__PURE__ */ o.jsx("span", { children: "Shared by" }),
          /* @__PURE__ */ o.jsx("span", { style: {
            color: l.color,
            fontWeight: 600
          }, children: l.name })
        ] })
      ]
    }
  );
};
function Nt(e, t) {
  const n = [], r = e.split(`
`);
  for (const s of r) {
    const i = s.trim();
    if (!i) continue;
    const a = i.match(/^\[([\s|x])\]\s*(.+)$/i);
    if (a) {
      n.push({
        text: a[2],
        checked: a[1].toLowerCase() === "x"
      });
      continue;
    }
    const l = i.match(/^(\d+)\.\s*(.+)$/);
    if (l) {
      n.push({
        id: l[1],
        text: l[2]
      });
      continue;
    }
    const c = i.match(/^[-*•]\s+(.+)$/);
    if (c) {
      n.push({
        text: c[1]
      });
      continue;
    }
  }
  return n;
}
const $r = ({
  content: e,
  items: t,
  style: n = "bullet",
  columns: r = 1,
  onItemClick: s,
  councilor: i,
  className: a,
  style: l
}) => {
  const c = W(
    () => t || Nt(e || ""),
    [e, t, n]
  ), p = (f) => {
    switch (n) {
      case "numbered":
        return `${f + 1}.`;
      case "checkbox":
        return null;
      default:
        return "•";
    }
  };
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: a,
      style: {
        padding: "16px",
        borderRadius: "12px",
        background: "rgba(59, 130, 246, 0.05)",
        border: "1px solid rgba(59, 130, 246, 0.2)",
        ...l
      },
      children: [
        /* @__PURE__ */ o.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px"
        }, children: [
          /* @__PURE__ */ o.jsx("span", { style: { fontSize: "18px" }, children: "📋" }),
          /* @__PURE__ */ o.jsxs("span", { style: {
            fontWeight: 600,
            color: "#3b82f6",
            fontSize: "14px"
          }, children: [
            c.length,
            " item",
            c.length !== 1 ? "s" : ""
          ] }),
          i && /* @__PURE__ */ o.jsxs("span", { style: {
            color: "#6b7280",
            fontSize: "12px"
          }, children: [
            "from ",
            i.name
          ] })
        ] }),
        /* @__PURE__ */ o.jsx("div", { style: {
          display: r > 1 ? "grid" : "flex",
          gridTemplateColumns: `repeat(${r}, 1fr)`,
          flexDirection: "column",
          gap: "8px"
        }, children: c.map((f, d) => /* @__PURE__ */ o.jsxs(
          "div",
          {
            onClick: () => s == null ? void 0 : s(f, d),
            style: {
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "8px 12px",
              borderRadius: "8px",
              background: s ? "rgba(255,255,255,0.03)" : "transparent",
              cursor: s ? "pointer" : "default",
              transition: "background 0.2s ease"
            },
            children: [
              /* @__PURE__ */ o.jsx("div", { style: {
                flexShrink: 0,
                color: "#3b82f6",
                fontWeight: 600,
                minWidth: "24px"
              }, children: n === "checkbox" ? /* @__PURE__ */ o.jsx("div", { style: {
                width: "18px",
                height: "18px",
                borderRadius: "4px",
                border: `2px solid ${f.checked ? "#10b981" : "#6b7280"}`,
                background: f.checked ? "#10b981" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }, children: f.checked && /* @__PURE__ */ o.jsx("span", { style: { color: "#fff", fontSize: "10px" }, children: "✓" }) }) : p(d) }),
              /* @__PURE__ */ o.jsxs("div", { style: { flex: 1 }, children: [
                /* @__PURE__ */ o.jsxs("div", { style: {
                  color: f.checked !== void 0 && f.checked ? "#9ca3af" : "#e5e7eb",
                  textDecoration: f.checked ? "line-through" : "none",
                  fontSize: "14px",
                  lineHeight: 1.4
                }, children: [
                  f.icon && /* @__PURE__ */ o.jsx("span", { style: { marginRight: "6px" }, children: f.icon }),
                  f.text
                ] }),
                f.subtext && /* @__PURE__ */ o.jsx("div", { style: {
                  color: "#6b7280",
                  fontSize: "12px",
                  marginTop: "2px"
                }, children: f.subtext })
              ] })
            ]
          },
          f.id || d
        )) })
      ]
    }
  );
};
function Yt(e) {
  const t = e.split(`
`).filter((s) => s.trim() && /^\|/.test(s));
  if (t.length < 2)
    return { headers: [], rows: [] };
  const n = t[0].split("|").filter((s) => s.trim() && !/^-+$/.test(s.trim())).map((s) => s.trim()), r = [];
  for (let s = 1; s < t.length; s++) {
    if (/^\|[-:\s]+\|$/.test(t[s])) continue;
    const i = t[s].split("|").filter((a) => a.trim()).map((a) => a.trim());
    i.length > 0 && r.push(i);
  }
  return { headers: n, rows: r };
}
const Ir = ({
  content: e,
  headers: t,
  rows: n,
  columns: r,
  data: s,
  sortable: i = !0,
  striped: a = !0,
  hoverable: l = !0,
  maxHeight: c,
  councilor: p,
  className: f,
  style: d
}) => {
  const [h, x] = C(null), [y, b] = C("asc"), { headers: g, rows: m } = W(() => n && t ? { headers: t, rows: n } : e ? Yt(e) : { headers: [], rows: [] }, [e, t, n]), v = W(() => r || g.map((R, T) => ({
    key: `col-${T}`,
    header: R,
    sortable: i
  })), [g, r, i]), w = W(() => {
    if (!h) return m;
    const R = v.findIndex((T) => T.key === h);
    return R === -1 ? m : [...m].sort((T, L) => {
      const E = T[R] || "", A = L[R] || "", F = parseFloat(E), _ = parseFloat(A);
      if (!isNaN(F) && !isNaN(_))
        return y === "asc" ? F - _ : _ - F;
      const K = E.localeCompare(A);
      return y === "asc" ? K : -K;
    });
  }, [m, h, y, v]), S = (R) => {
    i && (h === R ? b((T) => T === "asc" ? "desc" : "asc") : (x(R), b("asc")));
  };
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: f,
      style: {
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(16, 185, 129, 0.2)",
        background: "rgba(16, 185, 129, 0.03)",
        ...d
      },
      children: [
        /* @__PURE__ */ o.jsxs("div", { style: {
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }, children: [
          /* @__PURE__ */ o.jsx("span", { style: { fontSize: "18px" }, children: "📊" }),
          /* @__PURE__ */ o.jsx("span", { style: {
            fontWeight: 600,
            color: "#10b981",
            fontSize: "14px"
          }, children: "Table" }),
          p && /* @__PURE__ */ o.jsxs("span", { style: {
            color: "#6b7280",
            fontSize: "12px"
          }, children: [
            "from ",
            p.name
          ] })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { style: {
          maxHeight: c,
          overflow: "auto"
        }, children: [
          /* @__PURE__ */ o.jsxs("table", { style: {
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px"
          }, children: [
            /* @__PURE__ */ o.jsx("thead", { children: /* @__PURE__ */ o.jsx("tr", { style: {
              background: "rgba(255,255,255,0.05)",
              position: "sticky",
              top: 0
            }, children: v.map((R, T) => /* @__PURE__ */ o.jsxs(
              "th",
              {
                onClick: () => S(R.key),
                style: {
                  padding: "10px 12px",
                  textAlign: R.align || "left",
                  fontWeight: 600,
                  color: h === R.key ? "#10b981" : "#9ca3af",
                  cursor: i ? "pointer" : "default",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid rgba(255,255,255,0.1)"
                },
                children: [
                  R.header,
                  i && /* @__PURE__ */ o.jsx("span", { style: { marginLeft: "4px", opacity: h === R.key ? 1 : 0.3 }, children: h === R.key ? y === "asc" ? "↑" : "↓" : "↕" })
                ]
              },
              R.key
            )) }) }),
            /* @__PURE__ */ o.jsx("tbody", { children: w.map((R, T) => /* @__PURE__ */ o.jsx(
              "tr",
              {
                style: {
                  background: a && T % 2 === 1 ? "rgba(255,255,255,0.02)" : "transparent",
                  transition: "background 0.15s ease"
                },
                onMouseEnter: (L) => l && (L.currentTarget.style.background = "rgba(16, 185, 129, 0.1)"),
                onMouseLeave: (L) => l && (L.currentTarget.style.background = a && T % 2 === 1 ? "rgba(255,255,255,0.02)" : "transparent"),
                children: R.map((L, E) => {
                  const A = v[E];
                  return /* @__PURE__ */ o.jsx(
                    "td",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: A.align || "left",
                        color: "#e5e7eb",
                        borderBottom: "1px solid rgba(255,255,255,0.05)"
                      },
                      children: L
                    },
                    E
                  );
                })
              },
              T
            )) })
          ] }),
          w.length === 0 && /* @__PURE__ */ o.jsx("div", { style: {
            padding: "24px",
            textAlign: "center",
            color: "#6b7280"
          }, children: "No data available" })
        ] })
      ]
    }
  );
}, ee = [
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#3b82f6",
  "#ef4444",
  "#6366f1",
  "#14b8a6",
  "#f97316"
];
function qt(e) {
  const t = [], n = /(\w+):\s*(\d+\.?\d*)/g;
  let r;
  for (; (r = n.exec(e)) !== null; )
    t.push({
      label: r[1],
      value: parseFloat(r[2])
    });
  return t;
}
function Kt({ data: e, showValues: t, height: n }) {
  const r = Math.max(...e.map((i) => i.value)), s = 100 / e.length;
  return /* @__PURE__ */ o.jsx("div", { style: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: n,
    padding: "20px 10px 40px"
  }, children: e.map((i, a) => {
    const l = i.value / r * (n - 60);
    return /* @__PURE__ */ o.jsxs(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: `${s}%`
        },
        children: [
          t && /* @__PURE__ */ o.jsx("div", { style: {
            color: "#9ca3af",
            fontSize: "11px",
            marginBottom: "4px"
          }, children: i.value }),
          /* @__PURE__ */ o.jsx("div", { style: {
            width: "70%",
            maxWidth: "60px",
            height: `${l}px`,
            background: `linear-gradient(to top, ${i.color || ee[a % ee.length]}, ${i.color || ee[a % ee.length]}aa)`,
            borderRadius: "4px 4px 0 0",
            transition: "height 0.5s ease"
          } }),
          /* @__PURE__ */ o.jsx("div", { style: {
            color: "#9ca3af",
            fontSize: "11px",
            marginTop: "8px",
            textAlign: "center",
            maxWidth: "80px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }, children: i.label })
        ]
      },
      a
    );
  }) });
}
function Ut({ data: e, showValues: t, height: n }) {
  const r = e.reduce((p, f) => p + f.value, 0), s = Math.min(n - 40, 200), i = s / 2, a = i - 10;
  let l = -90;
  const c = e.map((p, f) => {
    const d = p.value / r * 360, h = l;
    l += d;
    const x = h * Math.PI / 180, y = l * Math.PI / 180, b = i + a * Math.cos(x), g = i + a * Math.sin(x), m = i + a * Math.cos(y), v = i + a * Math.sin(y), w = d > 180 ? 1 : 0;
    return {
      path: `
      M ${i} ${i}
      L ${b} ${g}
      A ${a} ${a} 0 ${w} 1 ${m} ${v}
      Z
    `,
      color: p.color || ee[f % ee.length],
      point: p,
      percentage: Math.round(p.value / r * 100)
    };
  });
  return /* @__PURE__ */ o.jsxs("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    padding: "20px"
  }, children: [
    /* @__PURE__ */ o.jsx("svg", { width: s, height: s, children: c.map((p, f) => /* @__PURE__ */ o.jsx(
      "path",
      {
        d: p.path,
        fill: p.color,
        style: { transition: "opacity 0.2s ease" }
      },
      f
    )) }),
    t && /* @__PURE__ */ o.jsx("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    }, children: e.map((p, f) => /* @__PURE__ */ o.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px"
        },
        children: [
          /* @__PURE__ */ o.jsx("div", { style: {
            width: "12px",
            height: "12px",
            borderRadius: "2px",
            background: p.color || ee[f % ee.length]
          } }),
          /* @__PURE__ */ o.jsx("span", { style: { color: "#e5e7eb" }, children: p.label }),
          /* @__PURE__ */ o.jsxs("span", { style: { color: "#6b7280" }, children: [
            Math.round(p.value / r * 100),
            "%"
          ] })
        ]
      },
      f
    )) })
  ] });
}
function Gt({ data: e, showValues: t, height: n }) {
  const r = P(null), s = Math.max(...e.map((l) => l.value)), i = Math.min(...e.map((l) => l.value)), a = s - i || 1;
  return $(() => {
    const l = r.current;
    if (!l) return;
    const c = l.getContext("2d");
    if (!c) return;
    const p = l.width, f = n - 40, d = 30;
    c.clearRect(0, 0, p, n), c.beginPath(), c.strokeStyle = "#8b5cf6", c.lineWidth = 2, e.forEach((h, x) => {
      const y = d + x / (e.length - 1) * (p - d * 2), b = d + (1 - (h.value - i) / a) * (f - d);
      x === 0 ? c.moveTo(y, b) : c.lineTo(y, b);
    }), c.stroke(), e.forEach((h, x) => {
      const y = d + x / (e.length - 1) * (p - d * 2), b = d + (1 - (h.value - i) / a) * (f - d);
      c.beginPath(), c.arc(y, b, 4, 0, Math.PI * 2), c.fillStyle = "#8b5cf6", c.fill();
    });
  }, [e, n, s, i, a]), /* @__PURE__ */ o.jsxs("div", { children: [
    /* @__PURE__ */ o.jsx(
      "canvas",
      {
        ref: r,
        width: 300,
        height: n - 40,
        style: { width: "100%", height: `${n - 40}px` }
      }
    ),
    /* @__PURE__ */ o.jsx("div", { style: {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "10px"
    }, children: e.map((l, c) => /* @__PURE__ */ o.jsxs(
      "div",
      {
        style: {
          fontSize: "10px",
          color: "#6b7280",
          textAlign: "center"
        },
        children: [
          t && /* @__PURE__ */ o.jsx("div", { style: { color: "#9ca3af" }, children: l.value }),
          l.label
        ]
      },
      c
    )) })
  ] });
}
const Er = ({
  content: e,
  data: t,
  chartType: n = "bar",
  title: r,
  showLegend: s = !0,
  showValues: i = !0,
  height: a = 250,
  councilor: l,
  className: c,
  style: p
}) => {
  const f = W(
    () => t || qt(e || ""),
    [e, t]
  );
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: c,
      style: {
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(236, 72, 153, 0.2)",
        background: "rgba(236, 72, 153, 0.03)",
        ...p
      },
      children: [
        /* @__PURE__ */ o.jsxs("div", { style: {
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }, children: [
          /* @__PURE__ */ o.jsx("span", { style: { fontSize: "18px" }, children: "📈" }),
          /* @__PURE__ */ o.jsx("span", { style: {
            fontWeight: 600,
            color: "#ec4899",
            fontSize: "14px"
          }, children: r || "Chart" }),
          l && /* @__PURE__ */ o.jsxs("span", { style: {
            color: "#6b7280",
            fontSize: "12px",
            marginLeft: "auto"
          }, children: [
            "from ",
            l.name
          ] })
        ] }),
        f.length > 0 ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          n === "bar" && /* @__PURE__ */ o.jsx(Kt, { data: f, showValues: i, height: a }),
          n === "pie" && /* @__PURE__ */ o.jsx(Ut, { data: f, showValues: i, height: a }),
          n === "line" && /* @__PURE__ */ o.jsx(Gt, { data: f, showValues: i, height: a })
        ] }) : /* @__PURE__ */ o.jsx("div", { style: {
          padding: "40px",
          textAlign: "center",
          color: "#6b7280"
        }, children: "No data available" })
      ]
    }
  );
};
function Ht(e) {
  const t = [], n = e.split(`
`);
  for (const r of n) {
    const s = r.trim();
    if (/^(in summary|to summarize|in conclusion|key points|bottom line):?/i.test(s))
      continue;
    const i = s.replace(/^[-*•]\s*/, "").replace(/^\d+\.\s*/, "").trim();
    i && i.length > 5 && t.push(i);
  }
  return t;
}
const Pr = ({
  content: e,
  points: t,
  title: n = "Summary",
  collapsible: r = !1,
  defaultExpanded: s = !0,
  onPointClick: i,
  councilor: a,
  className: l,
  style: c
}) => {
  const [p, f] = Q.useState(s), d = W(
    () => t || Ht(e),
    [e, t]
  );
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: l,
      style: {
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        background: "rgba(99, 102, 241, 0.03)",
        ...c
      },
      children: [
        /* @__PURE__ */ o.jsxs(
          "div",
          {
            onClick: r ? () => f((h) => !h) : void 0,
            style: {
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: r ? "pointer" : "default",
              background: "rgba(99, 102, 241, 0.05)",
              borderBottom: p ? "1px solid rgba(255,255,255,0.1)" : "none"
            },
            children: [
              /* @__PURE__ */ o.jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }, children: [
                /* @__PURE__ */ o.jsx("span", { style: { fontSize: "18px" }, children: "📝" }),
                /* @__PURE__ */ o.jsx("span", { style: {
                  fontWeight: 600,
                  color: "#6366f1",
                  fontSize: "14px"
                }, children: n }),
                /* @__PURE__ */ o.jsxs("span", { style: {
                  color: "#6b7280",
                  fontSize: "12px",
                  marginLeft: "8px"
                }, children: [
                  d.length,
                  " point",
                  d.length !== 1 ? "s" : ""
                ] })
              ] }),
              /* @__PURE__ */ o.jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }, children: [
                a && /* @__PURE__ */ o.jsxs("span", { style: {
                  color: "#6b7280",
                  fontSize: "12px"
                }, children: [
                  "from ",
                  a.name
                ] }),
                r && /* @__PURE__ */ o.jsx("span", { style: {
                  color: "#6b7280",
                  fontSize: "14px",
                  transition: "transform 0.2s ease",
                  transform: p ? "rotate(180deg)" : "rotate(0deg)"
                }, children: "▼" })
              ] })
            ]
          }
        ),
        p && /* @__PURE__ */ o.jsxs("div", { style: {
          padding: "16px"
        }, children: [
          d.map((h, x) => /* @__PURE__ */ o.jsxs(
            "div",
            {
              onClick: () => i == null ? void 0 : i(h, x),
              style: {
                display: "flex",
                gap: "12px",
                padding: "10px 12px",
                marginBottom: x < d.length - 1 ? "8px" : 0,
                borderRadius: "8px",
                background: "rgba(255,255,255,0.03)",
                cursor: i ? "pointer" : "default",
                transition: "background 0.2s ease"
              },
              children: [
                /* @__PURE__ */ o.jsx("div", { style: {
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "rgba(99, 102, 241, 0.2)",
                  color: "#6366f1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                  flexShrink: 0
                }, children: x + 1 }),
                /* @__PURE__ */ o.jsx("div", { style: {
                  flex: 1,
                  color: "#e5e7eb",
                  fontSize: "14px",
                  lineHeight: 1.5
                }, children: h })
              ]
            },
            x
          )),
          d.length === 0 && /* @__PURE__ */ o.jsx("div", { style: {
            color: "#6b7280",
            textAlign: "center",
            padding: "20px"
          }, children: "No summary points available" })
        ] })
      ]
    }
  );
}, Mr = ({
  content: e,
  answer: t,
  showAnswer: n = !1,
  allowReveal: r = !0,
  onReveal: s,
  councilor: i,
  className: a,
  style: l
}) => {
  const [c, p] = C(n || !r), f = () => {
    c || (p(!0), s && s());
  };
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: a,
      style: {
        borderRadius: "16px",
        overflow: "hidden",
        ...l
      },
      children: [
        /* @__PURE__ */ o.jsx("div", { style: {
          padding: "16px 20px",
          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)",
          borderRadius: "16px 16px 0 0",
          border: "1px solid rgba(6, 182, 212, 0.3)",
          borderBottom: t && !c ? "none" : "1px solid rgba(6, 182, 212, 0.3)"
        }, children: /* @__PURE__ */ o.jsxs("div", { style: {
          display: "flex",
          alignItems: "flex-start",
          gap: "12px"
        }, children: [
          /* @__PURE__ */ o.jsx("div", { style: {
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0
          }, children: "?" }),
          /* @__PURE__ */ o.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ o.jsxs("div", { style: {
              color: "#06b6d4",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "6px"
            }, children: [
              "Question",
              i && /* @__PURE__ */ o.jsxs("span", { style: {
                color: "#6b7280",
                fontWeight: 400,
                marginLeft: "8px"
              }, children: [
                "from ",
                i.name
              ] })
            ] }),
            /* @__PURE__ */ o.jsx("div", { style: {
              color: "#e5e7eb",
              fontSize: "15px",
              lineHeight: 1.5,
              fontWeight: 500
            }, children: e })
          ] })
        ] }) }),
        t && /* @__PURE__ */ o.jsx("div", { style: {
          padding: "16px 20px",
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: c ? "0 0 16px 16px" : 0,
          border: "1px solid rgba(6, 182, 212, 0.3)",
          borderTop: c ? "none" : "1px dashed rgba(6, 182, 212, 0.3)",
          transition: "all 0.3s ease"
        }, children: c ? /* @__PURE__ */ o.jsxs("div", { style: {
          display: "flex",
          alignItems: "flex-start",
          gap: "12px"
        }, children: [
          /* @__PURE__ */ o.jsx("div", { style: {
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            flexShrink: 0
          }, children: "💡" }),
          /* @__PURE__ */ o.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ o.jsx("div", { style: {
              color: "#10b981",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "6px"
            }, children: "Answer" }),
            /* @__PURE__ */ o.jsx("div", { style: {
              color: "#e5e7eb",
              fontSize: "14px",
              lineHeight: 1.6
            }, children: t })
          ] })
        ] }) : r ? /* @__PURE__ */ o.jsxs(
          "button",
          {
            onClick: f,
            style: {
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px dashed rgba(6, 182, 212, 0.5)",
              background: "rgba(6, 182, 212, 0.05)",
              color: "#06b6d4",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease"
            },
            children: [
              /* @__PURE__ */ o.jsx("span", { children: "👆" }),
              /* @__PURE__ */ o.jsx("span", { children: "Click to reveal answer" })
            ]
          }
        ) : /* @__PURE__ */ o.jsx("div", { style: {
          color: "#6b7280",
          textAlign: "center",
          fontSize: "13px",
          fontStyle: "italic"
        }, children: "Answer hidden" }) })
      ]
    }
  );
}, Lr = ({
  content: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: r = 22,
  speed: s = 20,
  showCursor: i = !0,
  onComplete: a,
  onProgress: l,
  councilor: c,
  className: p,
  style: f
}) => {
  const [d, h] = C(""), [x, y] = C(!0), [b, g] = C(0), m = P(null);
  return $(() => {
    if (!e) {
      h("");
      return;
    }
    h(""), y(!0), g(0);
    let v = 0;
    const w = setInterval(() => {
      v < e.length ? (v++, h(e.slice(0, v)), g(v / e.length), l && l(v / e.length)) : (y(!1), clearInterval(w), a && a());
    }, s);
    return () => clearInterval(w);
  }, [e, s, a, l]), $(() => {
    const v = m.current;
    if (!v || !d) return;
    const w = v.getContext("2d");
    if (!w) return;
    w.font = t;
    const S = w.measureText(d);
    v.width = Math.min(n, S.width + 40), v.height = r * 3, w.clearRect(0, 0, v.width, v.height);
    const R = d.split(" ");
    let T = "", L = r;
    const E = 20;
    for (const A of R) {
      const F = T + A + " ";
      if (w.measureText(F).width > n - 40 && T) {
        if (w.fillText(T, E, L), T = A + " ", L += r, L > v.height) break;
      } else
        T = F;
    }
    L <= v.height && w.fillText(T, E, L);
  }, [d, t, n, r]), /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: p,
      style: {
        padding: "16px",
        borderRadius: "12px",
        background: c ? `linear-gradient(135deg, ${c.color}10 0%, rgba(255,255,255,0.05) 100%)` : "rgba(255, 255, 255, 0.05)",
        border: c ? `1px solid ${c.color}30` : "1px solid rgba(255, 255, 255, 0.1)",
        ...f
      },
      children: [
        c && /* @__PURE__ */ o.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px"
        }, children: [
          /* @__PURE__ */ o.jsx("div", { style: {
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: c.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 600,
            color: "#fff"
          }, children: c.avatar || c.name.charAt(0) }),
          /* @__PURE__ */ o.jsx("span", { style: {
            fontWeight: 600,
            color: c.color,
            fontSize: "14px"
          }, children: c.name }),
          x && /* @__PURE__ */ o.jsxs("span", { style: {
            marginLeft: "auto",
            fontSize: "11px",
            color: "#6b7280",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }, children: [
            /* @__PURE__ */ o.jsx("span", { style: {
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#10b981",
              animation: "pulse 1s infinite"
            } }),
            "Streaming"
          ] })
        ] }),
        x && /* @__PURE__ */ o.jsx("div", { style: {
          height: "2px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "1px",
          marginBottom: "12px",
          overflow: "hidden"
        }, children: /* @__PURE__ */ o.jsx("div", { style: {
          height: "100%",
          width: `${b * 100}%`,
          background: (c == null ? void 0 : c.color) || "#8b5cf6",
          transition: "width 0.1s linear"
        } }) }),
        /* @__PURE__ */ o.jsxs("div", { style: {
          font: t,
          color: "#e5e7eb",
          lineHeight: `${r}px`,
          maxWidth: `${n}px`,
          minHeight: `${r * 2}px`
        }, children: [
          d,
          x && i && /* @__PURE__ */ o.jsx("span", { style: {
            color: (c == null ? void 0 : c.color) || "#8b5cf6",
            animation: "blink 1s infinite"
          }, children: "▋" })
        ] }),
        /* @__PURE__ */ o.jsx(
          "canvas",
          {
            ref: m,
            style: { display: "none" }
          }
        ),
        /* @__PURE__ */ o.jsx("style", { children: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      ` })
      ]
    }
  );
};
function Qe(e, t, n) {
  const {
    colors: r = ["#8b5cf6", "#a78bfa", "#c4b5fd"],
    minSize: s = 2,
    maxSize: i = 6,
    minLife: a = 50,
    maxLife: l = 150,
    minSpeed: c = 0.5,
    maxSpeed: p = 3,
    gravity: f = 0.1,
    friction: d = 0.99,
    decay: h = 0.98,
    emitX: x,
    emitY: y,
    emitRadius: b = 50
  } = e, g = Math.random() * Math.PI * 2, m = c + Math.random() * (p - c), v = x !== void 0 ? x + (Math.random() - 0.5) * b * 2 : Math.random() * t, w = y !== void 0 ? y + (Math.random() - 0.5) * b * 2 : Math.random() * n;
  return {
    x: v,
    y: w,
    vx: Math.cos(g) * m,
    vy: Math.sin(g) * m,
    life: a + Math.random() * (l - a),
    maxLife: a + Math.random() * (l - a),
    size: s + Math.random() * (i - s),
    color: r[Math.floor(Math.random() * r.length)]
  };
}
const Ar = ({
  count: e = 50,
  colors: t = ["#8b5cf6", "#a78bfa", "#c4b5fd"],
  minSize: n = 2,
  maxSize: r = 6,
  minLife: s = 50,
  maxLife: i = 150,
  minSpeed: a = 0.5,
  maxSpeed: l = 3,
  gravity: c = 0.1,
  friction: p = 0.99,
  decay: f = 0.98,
  emitX: d,
  emitY: h,
  emitRadius: x = 50,
  width: y = 300,
  height: b = 200,
  className: g,
  style: m
}) => {
  const v = P(null), w = P([]), S = P(null);
  return $(() => {
    w.current = Array.from(
      { length: e },
      () => Qe(
        { colors: t, minSize: n, maxSize: r, minLife: s, maxLife: i, minSpeed: a, maxSpeed: l, gravity: c, friction: p, decay: f, emitX: d, emitY: h, emitRadius: x },
        y,
        b
      )
    );
  }, [e, t, n, r, s, i, a, l, c, p, f, d, h, x, y, b]), $(() => {
    const R = v.current;
    if (!R) return;
    const T = R.getContext("2d");
    if (!T) return;
    const L = () => {
      T.clearRect(0, 0, y, b), w.current.forEach((E, A) => {
        if (E.vy += c, E.vx *= p, E.vy *= p, E.x += E.vx, E.y += E.vy, E.life--, E.life <= 0) {
          w.current[A] = Qe(
            { colors: t, minSize: n, maxSize: r, minLife: s, maxLife: i, minSpeed: a, maxSpeed: l, gravity: c, friction: p, decay: f, emitX: d, emitY: h, emitRadius: x },
            y,
            b
          );
          return;
        }
        const F = Math.min(E.life / E.maxLife * f, 1);
        T.beginPath(), T.arc(E.x, E.y, E.size, 0, Math.PI * 2), T.fillStyle = E.color, T.globalAlpha = F, T.fill(), T.globalAlpha = 1;
      }), S.current = requestAnimationFrame(L);
    };
    return L(), () => {
      S.current && cancelAnimationFrame(S.current);
    };
  }, [y, b, t, n, r, s, i, a, l, c, p, f, d, h, x]), /* @__PURE__ */ o.jsx(
    "canvas",
    {
      ref: v,
      width: y,
      height: b,
      className: g,
      style: {
        display: "block",
        borderRadius: "8px",
        ...m
      }
    }
  );
}, _r = ({
  colors: e = ["#8b5cf6", "#06b6d4", "#ec4899", "#f59e0b"],
  speed: t = 0.5,
  blendMode: n = "screen",
  opacity: r = 0.6,
  width: s = "100%",
  height: i = 200,
  className: a,
  style: l
}) => {
  const c = P(null), p = P(0), f = P(null), d = W(() => [
    { x: 0.2, y: 0.3, vx: 1e-3, vy: 1e-3 },
    { x: 0.7, y: 0.6, vx: -1e-3, vy: 15e-4 },
    { x: 0.5, y: 0.8, vx: 12e-4, vy: -1e-3 },
    { x: 0.3, y: 0.5, vx: -1e-3, vy: -12e-4 }
  ], []);
  return $(() => {
    const h = c.current;
    if (!h) return;
    const x = h.getContext("2d");
    if (!x) return;
    let y = h.width, b = h.height;
    const g = () => {
      x.clearRect(0, 0, y, b), p.current += t * 0.01, d.forEach((m, v) => {
        m.x += m.vx, m.y += m.vy, (m.x < 0 || m.x > 1) && (m.vx *= -1), (m.y < 0 || m.y > 1) && (m.vy *= -1);
        const w = m.x + Math.sin(p.current * (v + 1)) * 0.1, S = m.y + Math.cos(p.current * (v + 1)) * 0.1, R = w * y, T = S * b, L = Math.min(y, b) * 0.4, E = x.createRadialGradient(
          R,
          T,
          0,
          R,
          T,
          L
        );
        E.addColorStop(0, e[v % e.length]), E.addColorStop(1, "transparent"), x.globalCompositeOperation = n, x.globalAlpha = r * 0.5, x.fillStyle = E, x.fillRect(0, 0, y, b);
      }), x.globalCompositeOperation = "source-over", x.globalAlpha = 1, f.current = requestAnimationFrame(g);
    };
    return g(), () => {
      f.current && cancelAnimationFrame(f.current);
    };
  }, [e, t, n, r, d]), /* @__PURE__ */ o.jsx(
    "canvas",
    {
      ref: c,
      width: typeof s == "number" ? s : 800,
      height: typeof i == "number" ? i : 200,
      className: a,
      style: {
        width: typeof s == "string" ? s : void 0,
        height: typeof i == "string" ? i : void 0,
        display: "block",
        borderRadius: "12px",
        ...l
      }
    }
  );
}, Or = ({
  children: e,
  color: t = "#8b5cf6",
  intensity: n = 0.8,
  blurRadius: r = 20,
  borderRadius: s = 12,
  animate: i = !0,
  speed: a = 2,
  className: l,
  style: c
}) => {
  const [p, f] = C(0);
  $(() => {
    if (!i) return;
    const h = setInterval(() => {
      f((x) => (x + a) % 360);
    }, 50);
    return () => clearInterval(h);
  }, [i, a]);
  const d = W(() => {
    if (!i) return t;
    const h = t.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    return h ? `hsl(${(parseInt(h[1]) + p) % 360}, ${h[2]}%, ${h[3]}%)` : t;
  }, [t, i, p]);
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: l,
      style: {
        position: "relative",
        borderRadius: `${s}px`,
        padding: "2px",
        background: `linear-gradient(135deg, ${d}80, ${d}40)`,
        boxShadow: `
          0 0 ${r}px ${d}${Math.round(n * 255).toString(16).padStart(2, "0")},
          inset 0 0 ${r / 2}px ${d}40
        `,
        ...c
      },
      children: [
        /* @__PURE__ */ o.jsx("div", { style: {
          borderRadius: `${s - 2}px`,
          background: "rgba(15, 15, 25, 0.95)",
          height: "100%",
          width: "100%"
        }, children: e }),
        i && /* @__PURE__ */ o.jsx(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              borderRadius: `${s}px`,
              background: `conic-gradient(from ${p}deg, transparent, ${d}40, transparent)`,
              opacity: 0.3,
              animation: `spin ${10 / a}s linear infinite`,
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ o.jsx("style", { children: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      ` })
      ]
    }
  );
}, Ie = ({
  width: e = "100%",
  height: t = 20,
  speed: n = 1.5,
  color: r = "#3b82f6",
  gradientWidth: s = 200,
  borderRadius: i = 4,
  className: a,
  style: l
}) => {
  const c = W(() => ({
    width: typeof e == "number" ? `${e}px` : e,
    height: typeof t == "number" ? `${t}px` : t,
    borderRadius: `${i}px`,
    background: `linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0.1) ${s / 2}px,
      rgba(255, 255, 255, 0.2) ${s}px,
      rgba(255, 255, 255, 0.1) ${s + s / 2}px,
      rgba(255, 255, 255, 0.03) ${s * 2}px
    )`,
    backgroundSize: `${s * 2}px 100%`,
    animation: `shimmer ${n}s ease-in-out infinite`,
    ...l
  }), [e, t, n, s, i, l]);
  return /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsx("div", { className: a, style: c }),
    /* @__PURE__ */ o.jsx("style", { children: `
        @keyframes shimmer {
          0% { background-position: ${-s * 2}px 0; }
          100% { background-position: ${s * 2}px 0; }
        }
      ` })
  ] });
}, Dr = ({
  variant: e = "text",
  lines: t = 3,
  lastLineWidth: n = "60%",
  spacing: r = 8,
  children: s,
  className: i,
  style: a
}) => e === "circular" ? /* @__PURE__ */ o.jsx(
  Ie,
  {
    width: (a == null ? void 0 : a.width) || 40,
    height: (a == null ? void 0 : a.height) || 40,
    borderRadius: "50%",
    className: i,
    style: a
  }
) : e === "rectangular" ? /* @__PURE__ */ o.jsx(
  Ie,
  {
    width: "100%",
    height: (a == null ? void 0 : a.height) || 100,
    borderRadius: 8,
    className: i,
    style: a
  }
) : /* @__PURE__ */ o.jsx(
  "div",
  {
    className: i,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: `${r}px`,
      ...a
    },
    children: Array.from({ length: t }).map((l, c) => /* @__PURE__ */ o.jsx(
      Ie,
      {
        width: c === t - 1 ? n : "100%",
        height: 16,
        borderRadius: 4
      },
      c
    ))
  }
), Wr = ({
  content: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: r = 22,
  speed: s = 20,
  autoStart: i = !0,
  showCursor: a = !0,
  cursorChar: l = "▋",
  cursorBlinkSpeed: c = 500,
  onComplete: p,
  onProgress: f,
  className: d,
  style: h
}) => {
  const [x, y] = C(""), [b, g] = C(i), [m, v] = C(0), { displayedText: w } = Jt(e, { speed: s, autoStart: i, onComplete: p, onProgress: f });
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: d,
      style: {
        font: t,
        color: "#e5e7eb",
        lineHeight: `${r}px`,
        maxWidth: `${n}px`,
        ...h
      },
      children: [
        w,
        b && a && /* @__PURE__ */ o.jsx(Xt, { char: l, blinkSpeed: c })
      ]
    }
  );
}, Xt = ({
  char: e = "▋",
  blinkSpeed: t = 500,
  color: n = "currentColor"
}) => {
  const [r, s] = C(!0);
  return $(() => {
    const i = setInterval(() => {
      s((a) => !a);
    }, t);
    return () => clearInterval(i);
  }, [t]), /* @__PURE__ */ o.jsx(
    "span",
    {
      style: {
        opacity: r ? 1 : 0,
        color: n,
        transition: "opacity 0.1s"
      },
      children: e
    }
  );
};
function Jt(e, t = {}) {
  const { speed: n = 20, autoStart: r = !0, onComplete: s, onProgress: i } = t, [a, l] = C(""), [c, p] = C(r), [f, d] = C(0), h = P(0), x = P(null);
  $(() => {
    if (!e) {
      l(""), p(!1);
      return;
    }
    return h.current = 0, l(""), d(0), p(r), r && (x.current = setInterval(() => {
      if (h.current < e.length) {
        h.current++, l(e.slice(0, h.current));
        const m = h.current / e.length;
        d(m), i && i(m);
      } else
        p(!1), clearInterval(x.current), s && s();
    }, n)), () => {
      x.current && clearInterval(x.current);
    };
  }, [e, n, r, s, i]);
  const y = M(() => {
    h.current >= e.length || (p(!0), x.current = setInterval(() => {
      if (h.current < e.length) {
        h.current++, l(e.slice(0, h.current));
        const m = h.current / e.length;
        d(m), i && i(m);
      } else
        p(!1), clearInterval(x.current), s && s();
    }, n));
  }, [e, n, s, i]), b = M(() => {
    p(!1), x.current && clearInterval(x.current);
  }, []), g = M(() => {
    b(), h.current = 0, l(""), d(0);
  }, [b]);
  return {
    displayedText: a,
    isStreaming: c,
    progress: f,
    start: y,
    pause: b,
    reset: g
  };
}
const zr = ({
  count: e = 3,
  size: t = 8,
  color: n = "#8b5cf6",
  speed: r = 0.15,
  className: s,
  style: i
}) => {
  const [a, l] = C(0);
  return $(() => {
    const c = setInterval(() => {
      l((p) => (p + 1) % e);
    }, r * 1e3);
    return () => clearInterval(c);
  }, [e, r]), /* @__PURE__ */ o.jsx(
    "div",
    {
      className: s,
      style: {
        display: "flex",
        gap: `${t / 2}px`,
        alignItems: "center",
        ...i
      },
      children: Array.from({ length: e }).map((c, p) => /* @__PURE__ */ o.jsx(
        "div",
        {
          style: {
            width: `${t}px`,
            height: `${t}px`,
            borderRadius: "50%",
            background: n,
            opacity: a === p ? 1 : 0.3,
            transform: a === p ? "scale(1.2)" : "scale(1)",
            transition: `all ${r}s ease`,
            animation: a === p ? `pulse ${r}s ease infinite` : "none"
          }
        },
        p
      ))
    }
  );
}, Fr = ({
  size: e = 40,
  color: t = "#8b5cf6",
  strokeWidth: n = 3,
  className: r,
  style: s
}) => /* @__PURE__ */ o.jsx(
  "div",
  {
    className: r,
    style: {
      width: `${e}px`,
      height: `${e}px`,
      border: `${n}px solid ${t}20`,
      borderTopColor: t,
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      ...s
    },
    children: /* @__PURE__ */ o.jsx("style", { children: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1.2); }
          50% { opacity: 0.5; transform: scale(1); }
        }
      ` })
  }
), Br = ({
  count: e = 5,
  width: t = 4,
  height: n = 24,
  gap: r = 4,
  color: s = "#8b5cf6",
  speed: i = 0.1,
  className: a,
  style: l
}) => /* @__PURE__ */ o.jsxs(
  "div",
  {
    className: a,
    style: {
      display: "flex",
      alignItems: "center",
      gap: `${r}px`,
      ...l
    },
    children: [
      Array.from({ length: e }).map((c, p) => /* @__PURE__ */ o.jsx(
        "div",
        {
          style: {
            width: `${t}px`,
            height: `${n}px`,
            background: s,
            borderRadius: "2px",
            animation: `bounce ${i}s ease-in-out infinite`,
            animationDelay: `${p * i}s`
          }
        },
        p
      )),
      /* @__PURE__ */ o.jsx("style", { children: `
        @keyframes bounce {
          0%, 100% { height: ${n * 0.4}px; }
          50% { height: ${n}px; }
        }
      ` })
    ]
  }
), Vr = ({
  width: e = "100%",
  height: t = 20,
  color: n = "#8b5cf6",
  className: r,
  style: s
}) => /* @__PURE__ */ o.jsx(
  "div",
  {
    className: r,
    style: {
      width: typeof e == "number" ? `${e}px` : e,
      height: `${t}px`,
      background: `linear-gradient(90deg, ${n}40 0%, ${n} 50%, ${n}40 100%)`,
      backgroundSize: "200% 100%",
      borderRadius: "4px",
      animation: "shimmer 1.5s ease-in-out infinite",
      ...s
    },
    children: /* @__PURE__ */ o.jsx("style", { children: `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      ` })
  }
), Nr = ({
  size: e = 60,
  color: t = "#8b5cf6",
  className: n,
  style: r
}) => /* @__PURE__ */ o.jsx(
  "div",
  {
    className: n,
    style: {
      width: `${e}px`,
      height: `${e}px`,
      borderRadius: "50%",
      background: `radial-gradient(circle at 30% 30%, ${t}, transparent)`,
      boxShadow: `0 0 ${e / 2}px ${t}40`,
      animation: "orb 2s ease-in-out infinite",
      ...r
    },
    children: /* @__PURE__ */ o.jsx("style", { children: `
        @keyframes orb {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      ` })
  }
);
function Ze(e, t = {}) {
  const { font: n = "16px Inter, system-ui, sans-serif", maxWidth: r = 500, lineHeight: s = 22 } = t, [i, a] = C(null);
  return $(() => {
    if (!e) {
      a(null);
      return;
    }
    const c = document.createElement("canvas").getContext("2d");
    if (!c) return;
    c.font = n;
    const p = [], f = e.split(`
`);
    let d = s, h = 0;
    for (const x of f) {
      if (x.trim() === "") {
        d += s * 0.5;
        continue;
      }
      const y = x.split(" ");
      let b = "", g = 0;
      for (const m of y) {
        const v = c.measureText(m).width, w = b ? `${b} ${m}` : m, S = c.measureText(w).width;
        S > r && b ? (p.push({
          text: b,
          x: 0,
          y: d,
          width: g,
          baseline: s * 0.85
        }), h = Math.max(h, g), d += s, b = m, g = v) : (b = w, g = S);
      }
      b && (p.push({
        text: b,
        x: 0,
        y: d,
        width: g,
        baseline: s * 0.85
      }), h = Math.max(h, g), d += s);
    }
    a({
      height: d,
      lines: p,
      totalWidth: h
    });
  }, [e, n, r, s]), i;
}
function Yr(e, t = {}) {
  const { font: n = "16px Inter", maxWidth: r = 500, lineHeight: s = 22, speed: i = 20, autoStart: a = !0 } = t, [l, c] = C(""), [p, f] = C(a), [d, h] = C(0), x = P(e), y = P(0), b = P(null);
  $(() => {
    x.current = e, y.current = 0, c(""), h(0);
  }, [e]);
  const g = Ze(e, { font: n, maxWidth: r, lineHeight: s }), m = Ze(l, { font: n, maxWidth: r, lineHeight: s });
  $(() => {
    if (!(!p || !x.current))
      return b.current = setInterval(() => {
        y.current < x.current.length ? (y.current++, c(x.current.slice(0, y.current)), h(y.current / x.current.length)) : (f(!1), b.current && clearInterval(b.current));
      }, i), () => {
        b.current && clearInterval(b.current);
      };
  }, [p, i]);
  const v = M(() => f(!0), []), w = M(() => f(!1), []), S = M(() => {
    f(!1), y.current = 0, c(""), h(0);
  }, []);
  return {
    displayedText: l,
    isStreaming: p,
    progress: d,
    start: v,
    pause: w,
    reset: S,
    measurement: m,
    finalMeasurement: g,
    height: (g == null ? void 0 : g.height) ?? 0
  };
}
function qr(e = {}) {
  const { width: t = 300, height: n = 150, devicePixelRatio: r = window.devicePixelRatio || 1, willReadFrequently: s = !1 } = e, i = P(null), [a, l] = C({
    width: t,
    height: n,
    context: null
  });
  return $(() => {
    const c = i.current;
    if (!c) return;
    const p = c.getContext("2d", { willReadFrequently: s });
    p && (c.width = t * r, c.height = n * r, c.style.width = `${t}px`, c.style.height = `${n}px`, p.scale(r, r), l({ width: t, height: n, context: p }));
  }, [t, n, r, s]), { canvasRef: i, ...a };
}
function et(e, t, n) {
  const {
    colors: r = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"],
    minSize: s = 2,
    maxSize: i = 6,
    minLife: a = 50,
    maxLife: l = 150,
    minSpeed: c = 0.5,
    maxSpeed: p = 3,
    gravity: f = 0.1,
    friction: d = 0.99,
    decay: h = 0.98
  } = e, x = Math.random() * Math.PI * 2, y = c + Math.random() * (p - c);
  return {
    x: Math.random() * t,
    y: Math.random() * n,
    vx: Math.cos(x) * y,
    vy: Math.sin(x) * y,
    life: a + Math.random() * (l - a),
    maxLife: a + Math.random() * (l - a),
    size: s + Math.random() * (i - s),
    color: r[Math.floor(Math.random() * r.length)],
    gravity: f,
    friction: d,
    decay: h
  };
}
function Kr(e, t = {}) {
  const { count: n = 50 } = t, r = P([]), s = P(null);
  return $(() => {
    const i = e.current;
    if (!i) return;
    const a = i.width, l = i.height;
    r.current = Array.from(
      { length: n },
      () => et(t, a, l)
    );
  }, [n, t, e]), $(() => {
    const i = e.current;
    if (!i) return;
    const a = i.getContext("2d");
    if (!a) return;
    const l = i.width, c = i.height, p = () => {
      a.clearRect(0, 0, l, c), r.current.forEach((f, d) => {
        if (f.vy += f.gravity || 0.1, f.vx *= f.friction || 0.99, f.vy *= f.friction || 0.99, f.x += f.vx, f.y += f.vy, f.life--, f.life <= 0) {
          r.current[d] = et(t, l, c);
          return;
        }
        const h = f.life / f.maxLife;
        a.beginPath(), a.arc(f.x, f.y, f.size, 0, Math.PI * 2), a.fillStyle = f.color, a.globalAlpha = h * (f.decay || 0.98), a.fill(), a.globalAlpha = 1;
      }), s.current = requestAnimationFrame(p);
    };
    return p(), () => {
      s.current && cancelAnimationFrame(s.current);
    };
  }, [e, t]), r;
}
function Ur() {
  const e = M((r, s, i, a, l = {}) => {
    const {
      font: c = "16px Inter, sans-serif",
      color: p = "#ffffff",
      align: f = "left",
      baseline: d = "top",
      maxWidth: h
    } = l;
    r.font = c, r.fillStyle = p, r.textAlign = f, r.textBaseline = d, h !== void 0 ? r.fillText(s, i, a, h) : r.fillText(s, i, a);
  }, []), t = M((r, s, i) => (i && (r.font = i), r.measureText(s)), []), n = M((r, s, i, a, l, c, p = {}) => {
    const { font: f = "16px Inter", color: d = "#ffffff", align: h = "left" } = p;
    r.font = f, r.fillStyle = d, r.textAlign = h, r.textBaseline = "top";
    const x = s.split(`
`);
    let y = a;
    for (const b of x) {
      if (b.trim() === "") {
        y += c * 0.5;
        continue;
      }
      const g = b.split(" ");
      let m = "";
      for (const v of g) {
        const w = m ? `${m} ${v}` : v;
        r.measureText(w).width > l && m ? (r.fillText(m, i, y), m = v, y += c) : m = w;
      }
      m && (r.fillText(m, i, y), y += c);
    }
  }, []);
  return { drawText: e, measureText: t, drawWrappedText: n };
}
function Qt(e, t = {}) {
  const {
    speed: n = 20,
    startDelay: r = 0,
    autoStart: s = !0,
    onComplete: i,
    onProgress: a
  } = t, [l, c] = C(""), [p, f] = C(!1), [d, h] = C(!1), [x, y] = C(0), b = P(e), g = P(0), m = P(null), v = P(null);
  $(() => {
    b.current = e, g.current = 0, c(""), y(0), h(!1);
  }, [e]);
  const w = M(() => {
    m.current && (clearInterval(m.current), m.current = null), v.current && (clearTimeout(v.current), v.current = null);
  }, []), S = M(() => {
    if (w(), !b.current) {
      f(!1);
      return;
    }
    f(!0), v.current = setTimeout(() => {
      m.current = setInterval(() => {
        if (g.current < b.current.length) {
          g.current++, c(b.current.slice(0, g.current));
          const A = g.current / b.current.length;
          y(A), a && a(A);
        } else
          w(), f(!1), h(!0), i && i();
      }, n);
    }, r);
  }, [n, r, w, i, a]), R = M(() => {
    d && L(), S();
  }, [d, S]), T = M(() => {
    w(), f(!1);
  }, [w]), L = M(() => {
    w(), g.current = 0, c(""), y(0), f(!1), h(!1);
  }, [w]), E = M(() => {
    L(), setTimeout(() => S(), 100);
  }, [L, S]);
  return $(() => (s && e && !p && !d && S(), w), [e, s, p, d, S, w]), $(() => () => w(), [w]), {
    displayedText: l,
    isStreaming: p,
    isComplete: d,
    progress: x,
    start: R,
    pause: T,
    reset: L,
    restart: E
  };
}
function Gr(e, t = {}) {
  const { speed: n = 20, chunkDelay: r = 500, autoStart: s = !0, onComplete: i, onProgress: a } = t, [l, c] = C(0), [p, f] = C(""), [d, h] = C(!1), [x, y] = C(!1), [b, g] = C(0), m = e[l] || "", v = e.reduce((B, Y) => B + Y.length, 0), {
    displayedText: w,
    isStreaming: S,
    isComplete: R,
    progress: T,
    start: L,
    pause: E,
    reset: A
  } = Qt(m, { speed: n, autoStart: !1 });
  $(() => {
    f(w);
    let B = 0;
    for (let N = 0; N < l; N++)
      B += e[N].length;
    B += Math.floor(w.length * T);
    const Y = v > 0 ? B / v : 0;
    g(Y), a && a(Y);
  }, [w, T, l, e, v, a]), $(() => {
    if (R && l < e.length - 1) {
      const B = setTimeout(() => {
        c((Y) => Y + 1);
      }, r);
      return () => clearTimeout(B);
    } else R && l === e.length - 1 && (y(!0), h(!1), i && i());
  }, [R, l, e.length, r, i]), $(() => {
    s && e.length > 0 && !d && !x && (h(!0), L());
  }, [e, s, d, x, L]);
  const F = M(() => {
    x ? (K(), setTimeout(() => {
      h(!0), L();
    }, 100)) : (h(!0), L());
  }, [x, K, L]), _ = M(() => {
    h(!1), E();
  }, [E]), K = M(() => {
    c(0), f(""), y(!1), h(!1), g(0), A();
  }, [A]);
  return {
    displayedText: p,
    currentChunkIndex: l,
    isStreaming: d,
    isComplete: x,
    overallProgress: b,
    chunkProgress: T,
    start: F,
    pause: _,
    reset: K
  };
}
function Hr(e, t) {
  const [n, r] = C(e);
  return $(() => {
    const s = setTimeout(() => {
      r(e);
    }, t);
    return () => {
      clearTimeout(s);
    };
  }, [e, t]), n;
}
function Xr(e, t) {
  const n = P(null), r = P(e);
  $(() => {
    r.current = e;
  }, [e]);
  const s = M((...i) => {
    n.current && clearTimeout(n.current), n.current = setTimeout(() => {
      r.current(...i);
    }, t);
  }, [t]);
  return $(() => () => {
    n.current && clearTimeout(n.current);
  }, []), s;
}
function Jr(e, t) {
  const [n, r] = C(e), s = P({});
  return $(() => {
    const i = { ...n };
    let a = !1;
    return Object.keys(e).forEach((l) => {
      const c = t[l] ?? 0, p = e[l], f = n[l];
      c === 0 ? (i[l] = p, a = !0) : p !== f && (s.current[l] && clearTimeout(s.current[l]), s.current[l] = setTimeout(() => {
        r((d) => ({ ...d, [l]: p }));
      }, c));
    }), a && r(i), () => {
      Object.values(s.current).forEach((l) => {
        l && clearTimeout(l);
      });
    };
  }, [e, t, n]), n;
}
function tt(e = {}) {
  const {
    threshold: t = 0,
    root: n = null,
    rootMargin: r = "0px",
    freezeOnceVisible: s = !1
  } = e, i = P(null), [a, l] = C(null), [c, p] = C(!1), f = P(!1), d = P(null);
  $(() => {
    s && c && (f.current = !0);
  }, [s, c]), $(() => {
    const y = i.current;
    if (!(!y || f.current))
      return d.current = new IntersectionObserver(
        ([b]) => {
          l(b), p(b.isIntersecting), s && b.isIntersecting && (f.current = !0, d.current && d.current.disconnect());
        },
        { threshold: t, root: n, rootMargin: r }
      ), d.current.observe(y), () => {
        d.current && d.current.disconnect();
      };
  }, [t, n, r, s]);
  const h = M(() => {
    i.current && d.current && d.current.observe(i.current);
  }, []), x = M(() => {
    i.current && d.current && d.current.unobserve(i.current);
  }, []);
  return {
    ref: i,
    isIntersecting: c,
    entry: a,
    observe: h,
    unobserve: x
  };
}
function Qr(e = {}) {
  const { fallbackSrc: t, ...n } = e, [r, s] = C(!1), [i, a] = C(!1), { ref: l, isIntersecting: c } = tt({
    threshold: 0.1,
    freezeOnceVisible: !0,
    ...n
  });
  $(() => {
    a(c);
  }, [c]);
  const p = M(() => {
    s(!0);
  }, []);
  return {
    ref: l,
    isInView: i,
    isLoaded: r,
    handleLoad: p,
    shouldLoad: c || !t
  };
}
function Zr(e, t = {}) {
  const { enabled: n = !0, distance: r = 100, ...s } = t, i = P(!1), { ref: a, isIntersecting: l } = tt({
    rootMargin: `${r}px`,
    threshold: 0,
    ...s
  });
  return $(() => {
    l && n && !i.current && (i.current = !0, e(), setTimeout(() => {
      i.current = !1;
    }, 1e3));
  }, [l, n, r, e]), { triggerRef: a };
}
function Zt(e) {
  const t = e.toLowerCase().split("+");
  return {
    key: t[t.length - 1],
    ctrl: t.includes("ctrl"),
    alt: t.includes("alt"),
    shift: t.includes("shift"),
    meta: t.includes("meta") || t.includes("cmd") || t.includes("command")
  };
}
function er(e, t) {
  const n = t.ctrl ? e.ctrlKey : !e.ctrlKey, r = t.alt ? e.altKey : !e.altKey, s = t.shift ? e.shiftKey : !e.shiftKey, i = t.meta ? e.metaKey : !e.metaKey;
  let a = e.key.toLowerCase(), l = t.key.toLowerCase();
  const c = {
    escape: "esc",
    arrowup: "up",
    arrowdown: "down",
    arrowleft: "left",
    arrowright: "right"
  };
  return a = c[a] || a, l = c[l] || l, a === l && n && r && s && i;
}
function en(e, t = {}) {
  const { enableOnInput: n = !1, preventDefault: r = !0 } = t, s = P(e);
  $(() => {
    s.current = e;
  }, [e]), $(() => {
    const i = (a) => {
      if (!n) {
        const l = a.target;
        if (l.tagName === "INPUT" || l.tagName === "TEXTAREA" || l.isContentEditable) return;
      }
      for (const l of s.current) {
        const c = typeof l == "string" ? Zt(l) : { key: l.key, ctrl: l.ctrl, alt: l.alt, shift: l.shift, meta: l.meta };
        if (er(a, c)) {
          r && (a.preventDefault(), a.stopPropagation()), (typeof l == "string" ? () => {
          } : l.handler)(a);
          break;
        }
      }
    };
    return window.addEventListener("keydown", i), () => window.removeEventListener("keydown", i);
  }, [n, r]);
}
function tn(e, t = {}) {
  const { enableOnInput: n = !1 } = t, [r, s] = C(!1);
  return $(() => {
    const i = (l) => {
      if (l.key.toLowerCase() === e.toLowerCase()) {
        if (!n) {
          const c = l.target;
          if (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable) return;
        }
        s(!0);
      }
    }, a = (l) => {
      l.key.toLowerCase() === e.toLowerCase() && s(!1);
    };
    return window.addEventListener("keydown", i), window.addEventListener("keyup", a), () => {
      window.removeEventListener("keydown", i), window.removeEventListener("keyup", a);
    };
  }, [e, n]), r;
}
function rn() {
  const [e, t] = C({});
  return $(() => {
    const n = (i) => {
      t((a) => ({
        ...a,
        [i.key.toLowerCase()]: !0
      }));
    }, r = (i) => {
      t((a) => ({
        ...a,
        [i.key.toLowerCase()]: !1
      }));
    }, s = () => {
      t({});
    };
    return window.addEventListener("keydown", n), window.addEventListener("keyup", r), window.addEventListener("blur", s), () => {
      window.removeEventListener("keydown", n), window.removeEventListener("keyup", r), window.removeEventListener("blur", s);
    };
  }, []), e;
}
function Ee(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Pe(e, t) {
  return Math.atan2(t.y - e.y, t.x - e.x);
}
function nn(e, t = {}) {
  const {
    onTap: n,
    onDoubleTap: r,
    onPan: s,
    onPanStart: i,
    onPanEnd: a,
    onPinch: l,
    onRotate: c,
    onSwipe: p,
    threshold: f = {
      tap: 10,
      pan: 10,
      swipe: 50
    }
  } = t, [d, h] = C({
    isActive: !1,
    startPoint: null,
    currentPoint: null,
    delta: null,
    distance: 0,
    angle: 0,
    scale: 1,
    rotation: 0
  }), x = P(null), y = P(0), b = P(0), g = P(0), m = P(1), v = P(0), w = P({ x: 0, y: 0 }), S = P({ x: 0, y: 0 }), R = P(0), T = M((A) => {
    if (x.current !== null) return;
    const F = A.touches[0];
    x.current = F.identifier;
    const _ = { x: F.clientX, y: F.clientY };
    S.current = _, R.current = Date.now(), h({
      isActive: !0,
      startPoint: _,
      currentPoint: _,
      delta: null,
      distance: 0,
      angle: 0,
      scale: 1,
      rotation: 0
    }), i && i(_);
  }, [i]), L = M((A) => {
    var ie, ae;
    if (x.current === null) return;
    const F = Array.from(A.touches).find((Z) => Z.identifier === x.current);
    if (!F) return;
    const _ = { x: F.clientX, y: F.clientY }, K = d.startPoint, B = {
      x: _.x - (((ie = d.currentPoint) == null ? void 0 : ie.x) || _.x),
      y: _.y - (((ae = d.currentPoint) == null ? void 0 : ae.y) || _.y)
    }, Y = Ee(K, _), N = Pe(K, _), te = Date.now(), X = te - R.current;
    if (X > 0 && (w.current = {
      x: (_.x - S.current.x) / X,
      y: (_.y - S.current.y) / X
    }), S.current = _, R.current = te, A.touches.length >= 2) {
      const Z = Array.from(A.touches)[0].identifier === x.current ? Array.from(A.touches)[1] : Array.from(A.touches)[0];
      if (Z) {
        const oe = { x: Z.clientX, y: Z.clientY }, le = Ee(_, oe), ce = Pe(_, oe);
        b.current === 0 && (b.current = le, g.current = ce);
        const de = le / b.current, ue = (ce - g.current) * (180 / Math.PI);
        l && l({
          ...d,
          currentPoint: _,
          delta: B,
          distance: Y,
          angle: N,
          scale: de,
          rotation: ue
        }), c && c({
          ...d,
          currentPoint: _,
          delta: B,
          distance: Y,
          angle: N,
          scale: de,
          rotation: ue
        }), m.current = de, v.current = ue;
      }
    }
    h((Z) => ({
      ...Z,
      currentPoint: _,
      delta: B,
      distance: Y,
      angle: N
    })), s && s({
      ...d,
      currentPoint: _,
      delta: B,
      distance: Y,
      angle: N
    });
  }, [d, s, l, c]), E = M((A) => {
    if (x.current === null) return;
    const F = Array.from(A.changedTouches).find((N) => N.identifier === x.current);
    if (!F) return;
    const _ = { x: F.clientX, y: F.clientY }, K = d.startPoint;
    x.current = null, b.current = 0;
    const B = Ee(K, _), Y = Date.now() - R.current;
    if (B < (f.tap || 10) && Y < 300) {
      const N = Date.now();
      N - y.current < 300 ? (r && r(K), y.current = 0) : (n && n(K), y.current = N);
    }
    if (B > (f.swipe || 50)) {
      const N = Pe(K, _), te = w.current;
      let X;
      N > -Math.PI / 4 && N < Math.PI / 4 ? X = "right" : N >= Math.PI / 4 && N < 3 * Math.PI / 4 ? X = "down" : N >= -3 * Math.PI / 4 && N < -Math.PI / 4 ? X = "up" : X = "left", p && p(X, te);
    }
    a && a({
      ...d,
      currentPoint: _,
      isActive: !1
    }), h({
      isActive: !1,
      startPoint: null,
      currentPoint: null,
      delta: null,
      distance: 0,
      angle: 0,
      scale: 1,
      rotation: 0
    });
  }, [d, n, r, a, p, f]);
  return $(() => {
    const A = e.current;
    if (A)
      return A.addEventListener("touchstart", T, { passive: !0 }), A.addEventListener("touchmove", L, { passive: !0 }), A.addEventListener("touchend", E, { passive: !0 }), A.addEventListener("touchcancel", E, { passive: !0 }), () => {
        A.removeEventListener("touchstart", T), A.removeEventListener("touchmove", L), A.removeEventListener("touchend", E), A.removeEventListener("touchcancel", E);
      };
  }, [e, T, L, E]), {
    gestureState: d,
    isActive: d.isActive
  };
}
function rt(e, t, n) {
  var s, i;
  const r = {
    content: e,
    confidence: n.confidence
  };
  switch (t) {
    case "vote":
      return {
        ...r,
        options: tr(e),
        showResults: !1
      };
    case "code":
      return {
        ...r,
        language: ((s = n.metadata) == null ? void 0 : s.language) || "plain",
        showLineNumbers: !0,
        theme: "dark"
      };
    case "list":
      return {
        ...r,
        items: rr(e),
        style: ((i = n.metadata) == null ? void 0 : i.style) || "bullet"
      };
    case "table":
      return {
        ...r,
        headers: nr(e),
        rows: sr(e)
      };
    case "chart":
      return {
        ...r,
        chartType: ir(e),
        data: ar(e)
      };
    case "question":
      return {
        ...r,
        question: e,
        showAnswer: !1
      };
    case "summary":
      return {
        ...r,
        points: or(e)
      };
    default:
      return r;
  }
}
function tr(e) {
  const t = [], n = e.split(`
`);
  for (const r of n) {
    const s = r.match(/^[-*•]?\s*\[?\s*\d+\s*\]?\s*(.+)$/);
    s && t.push(s[1].trim());
  }
  return t.length > 0 ? t : ["Yes", "No", "Abstain"];
}
function rr(e) {
  const t = [], n = e.split(`
`);
  for (const r of n) {
    const s = r.match(/^(\d+\.|[-*•])\s+(.+)$/);
    s && t.push(s[2].trim());
  }
  return t;
}
function nr(e) {
  const t = e.split(`
`).filter((r) => r.trim());
  if (t.length < 2) return [];
  const n = t.find((r) => /^\|/.test(r));
  return n ? n.split("|").filter((r) => r.trim() && !/^-+$/.test(r.trim())).map((r) => r.trim()) : [];
}
function sr(e) {
  const t = e.split(`
`).filter((r) => r.trim() && /^\|/.test(r)), n = [];
  for (let r = 1; r < t.length; r++) {
    if (/^\|[-:\s]+\|$/.test(t[r])) continue;
    const s = t[r].split("|").filter((i) => i.trim()).map((i) => i.trim());
    s.length > 0 && n.push(s);
  }
  return n;
}
function ir(e) {
  const t = e.toLowerCase();
  return /bar|compare|category/i.test(t) ? "bar" : /line|trend|time|over/i.test(t) ? "line" : /pie|distribution|percentage/i.test(t) ? "pie" : "scatter";
}
function ar(e) {
  const t = [], n = /(\w+):\s*(\d+\.?\d*)/g;
  let r;
  for (; (r = n.exec(e)) !== null; )
    t.push({
      label: r[1],
      value: parseFloat(r[2])
    });
  return t;
}
function or(e) {
  const t = [], n = e.split(`
`);
  for (const r of n) {
    const s = r.trim();
    if (s && !/^(in summary|to summarize|in conclusion|key points):/i.test(s)) {
      const i = s.replace(/^[-*•]?\s*\d+\.\s*/, "");
      i && t.push(i);
    }
  }
  return t;
}
const sn = ({
  content: e,
  options: t = {},
  onComponentGenerated: n,
  councilor: r,
  className: s,
  style: i
}) => {
  const [a, l] = C("auto"), c = W(() => ve(e), [e]), p = a === "auto" ? c.type : a, f = W(
    () => rt(e, p, c),
    [e, p, c]
  );
  Q.useEffect(() => {
    n && n({
      type: p,
      props: f
    });
  }, [p, f, n]);
  const d = M(() => {
    const { SmartMessage: h, VoteCard: x, CodeBlock: y, ListCard: b, DataTable: g, DataChart: m, QuestionBubble: v, SummaryCard: w } = require("../components"), S = {
      ...f,
      councilor: r,
      streaming: t.streaming
    };
    switch (p) {
      case "vote":
        return /* @__PURE__ */ o.jsx(x, { ...S });
      case "code":
        return /* @__PURE__ */ o.jsx(y, { ...S });
      case "list":
        return /* @__PURE__ */ o.jsx(b, { ...S });
      case "table":
        return /* @__PURE__ */ o.jsx(g, { ...S });
      case "chart":
        return /* @__PURE__ */ o.jsx(m, { ...S });
      case "question":
        return /* @__PURE__ */ o.jsx(v, { ...S });
      case "summary":
        return /* @__PURE__ */ o.jsx(w, { ...S });
      default:
        return /* @__PURE__ */ o.jsx(h, { ...S });
    }
  }, [p, f, r, t.streaming]);
  return /* @__PURE__ */ o.jsx("div", { className: s, style: i, children: d() });
};
function an(e = {}) {
  const [t, n] = C(""), [r, s] = C(!1), i = W(() => ve(t), [t]), a = W(
    () => rt(t, i.type, i),
    [t, i]
  ), l = M((c) => {
    s(!0), n(c), setTimeout(() => {
      s(!1);
    }, 100);
  }, []);
  return {
    content: t,
    detection: i,
    componentProps: a,
    isGenerating: r,
    generate: l
  };
}
function nt(e) {
  const t = [];
  return e.itemCount > 3 && !e.hasMixedMedia && t.push({
    type: "grid",
    config: {
      columns: Math.min(e.itemCount, 4),
      gap: 16
    },
    reason: "Grid layout works well for multiple uniform items",
    score: 0.9
  }), (e.hasMixedMedia || e.contentTypes.length > 2) && t.push({
    type: "masonry",
    config: {
      columns: e.viewportWidth > 768 ? 3 : 2,
      gap: 16
    },
    reason: "Masonry handles variable-height content gracefully",
    score: 0.85
  }), e.viewportWidth < 600 && t.push({
    type: "adaptive",
    config: {
      breakpoints: [
        { minWidth: 1200, columns: 4 },
        { minWidth: 900, columns: 3 },
        { minWidth: 600, columns: 2 },
        { minWidth: 0, columns: 1 }
      ]
    },
    reason: "Adaptive layout ensures good mobile experience",
    score: 0.95
  }), (e.contentLength > 2e3 || e.itemCount <= 2) && t.push({
    type: "stack",
    config: {
      direction: "column",
      gap: 16,
      align: "stretch"
    },
    reason: "Stack layout is best for long-form or minimal content",
    score: 0.8
  }), e.contentTypes.includes("table") && e.itemCount === 2 && t.push({
    type: "split",
    config: {
      direction: "row",
      ratio: [1, 1],
      gap: 24
    },
    reason: "Split view allows easy comparison of two items",
    score: 0.88
  }), t.sort((n, r) => r.score - n.score);
}
function st(e) {
  return nt(e)[0] || {
    type: "stack",
    config: { direction: "column", gap: 16 },
    reason: "Default to stack layout",
    score: 0.5
  };
}
function lr(e, t, n = 200, r = 400) {
  const s = Math.max(n, Math.min(r, e / t));
  return Math.max(1, Math.floor(e / s));
}
const on = ({
  children: e,
  context: t,
  onSuggestion: n,
  className: r,
  style: s
}) => {
  const [i, a] = C(null);
  $(() => {
    const c = st(t);
    a(c), n && n(c);
  }, [t, n]);
  const l = M(() => {
    if (!i) return e;
    const { PretextLayout: c, StackLayout: p, GridLayout: f, MasonryLayout: d, AdaptiveLayout: h } = require("../pretext");
    switch (i.type) {
      case "grid":
        return /* @__PURE__ */ o.jsx(
          f,
          {
            columns: i.config.columns,
            gap: i.config.gap,
            children: e
          }
        );
      case "masonry":
        return /* @__PURE__ */ o.jsx(
          d,
          {
            columns: i.config.columns,
            gap: i.config.gap,
            children: e
          }
        );
      case "adaptive":
        return /* @__PURE__ */ o.jsx(
          h,
          {
            breakpoints: i.config.breakpoints,
            gap: i.config.gap,
            children: e
          }
        );
      case "split":
        return /* @__PURE__ */ o.jsx(
          p,
          {
            direction: i.config.direction,
            gap: i.config.gap,
            justify: "space-between",
            children: e
          }
        );
      case "stack":
      default:
        return /* @__PURE__ */ o.jsx(
          p,
          {
            direction: i.config.direction || "column",
            gap: i.config.gap || 16,
            align: i.config.align || "stretch",
            children: e
          }
        );
    }
  }, [i, e]);
  return /* @__PURE__ */ o.jsx("div", { className: r, style: s, children: l() });
};
function ln(e) {
  const t = W(() => nt(e), [e]), n = W(() => st(e), [e]);
  return {
    suggestions: t,
    best: n,
    getSuggestion: (r) => t.find((s) => s.type === r) || n,
    calculateColumns: (r, s) => lr(e.viewportWidth, e.itemCount, r, s)
  };
}
const Le = [
  {
    mode: "legislative",
    label: "Legislative",
    description: "Debate proposals, vote on policies, reach consensus",
    icon: "⚖️",
    color: "#f59e0b",
    defaultCouncilors: 5
  },
  {
    mode: "research",
    label: "Deep Research",
    description: "Multi-vector investigation, fact-finding, analysis",
    icon: "🔬",
    color: "#3b82f6",
    defaultCouncilors: 3
  },
  {
    mode: "coding",
    label: "Swarm Coding",
    description: "Parallel software development, code review",
    icon: "💻",
    color: "#8b5cf6",
    defaultCouncilors: 4
  },
  {
    mode: "creative",
    label: "Creative",
    description: "Brainstorming, ideation, creative writing",
    icon: "🎨",
    color: "#ec4899",
    defaultCouncilors: 3
  },
  {
    mode: "general",
    label: "General",
    description: "Open discussion, Q&A, general advice",
    icon: "💬",
    color: "#6b7280",
    defaultCouncilors: 3
  }
];
function Ae(e) {
  const t = e.toLowerCase();
  return /\b(vote|proposal|bill|law|policy|amendment|regulation|legislat|congress|parliament)\b/.test(t) ? "legislative" : /\b(research|study|investigate|analyze|fact|evidence|data|report|survey)\b/.test(t) ? "research" : /\b(code|program|implement|function|class|api|algorithm|bug|feature|refactor)\b/.test(t) ? "coding" : /\b(brainstorm|ideas?|creative|design|innovat|imagine|story|art)\b/.test(t) ? "creative" : "general";
}
function it(e) {
  return Le.find((t) => t.mode === e) || Le[4];
}
const cr = ({
  selectedMode: e = "general",
  onModeChange: t,
  showDescription: n = !0,
  className: r,
  style: s
}) => {
  const i = M((a) => {
    t && t(a);
  }, [t]);
  return /* @__PURE__ */ o.jsxs("div", { className: r, style: s, children: [
    /* @__PURE__ */ o.jsx("div", { style: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap"
    }, children: Le.map((a) => /* @__PURE__ */ o.jsxs(
      "button",
      {
        onClick: () => i(a.mode),
        style: {
          padding: "8px 16px",
          borderRadius: "8px",
          border: e === a.mode ? `2px solid ${a.color}` : "2px solid transparent",
          background: e === a.mode ? `${a.color}20` : "rgba(255, 255, 255, 0.05)",
          color: e === a.mode ? a.color : "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          transition: "all 0.2s ease",
          fontSize: "14px",
          fontWeight: e === a.mode ? 600 : 400
        },
        children: [
          /* @__PURE__ */ o.jsx("span", { children: a.icon }),
          /* @__PURE__ */ o.jsx("span", { children: a.label })
        ]
      },
      a.mode
    )) }),
    n && /* @__PURE__ */ o.jsx("div", { style: {
      marginTop: "12px",
      padding: "12px",
      background: "rgba(255, 255, 255, 0.03)",
      borderRadius: "8px",
      fontSize: "13px",
      color: "#9ca3af"
    }, children: it(e).description })
  ] });
}, cn = ({
  input: e,
  onAutoSelect: t,
  ...n
}) => {
  const r = W(() => Ae(e), [e]);
  return Q.useEffect(() => {
    t && t(r);
  }, [r, t]), /* @__PURE__ */ o.jsx(
    cr,
    {
      selectedMode: r,
      ...n
    }
  );
};
function dn(e = "general") {
  const [t, n] = C(e), [r, s] = C(""), i = W(() => r ? Ae(r) : t, [r, t]);
  return {
    selectedMode: t,
    setSelectedMode: n,
    input: r,
    setInput: s,
    detectedMode: i,
    option: it(t),
    detectMode: Ae
  };
}
const un = {
  analyst: {
    name: "The Analyst",
    title: "Data Strategist",
    persona: "Logical, methodical, evidence-based decision maker",
    expertise: ["data analysis", "statistics", "research", "problem solving"],
    color: "#3b82f6",
    votingStyle: "analytical"
  },
  pragmatist: {
    name: "The Pragmatist",
    title: "Realist",
    persona: "Practical, outcome-focused, cost-benefit driven",
    expertise: ["implementation", "project management", "risk assessment", "resource allocation"],
    color: "#10b981",
    votingStyle: "pragmatic"
  },
  creative: {
    name: "The Creative",
    title: "Innovation Specialist",
    persona: "Imaginative, unconventional thinker, idea generator",
    expertise: ["brainstorming", "design thinking", "innovation", "creative writing"],
    color: "#ec4899",
    votingStyle: "idealistic"
  },
  skeptic: {
    name: "The Skeptic",
    title: "Critical Thinker",
    persona: "Questioning, devil's advocate, risk identifier",
    expertise: ["critical thinking", "risk analysis", "quality assurance", "security"],
    color: "#f59e0b",
    votingStyle: "cautious"
  },
  ethicist: {
    name: "The Ethicist",
    title: "Moral Philosopher",
    persona: "Principled, values-driven, fairness focused",
    expertise: ["ethics", "philosophy", "policy analysis", "social impact"],
    color: "#6366f1",
    votingStyle: "idealistic"
  },
  technologist: {
    name: "The Technologist",
    title: "Tech Visionary",
    persona: "Forward-thinking, tech-savvy, innovation advocate",
    expertise: ["technology", "software development", "AI", "digital transformation"],
    color: "#8b5cf6",
    votingStyle: "analytical"
  }
};
function dr(e, t, n = 3) {
  const r = t.toLowerCase();
  return e.map((i) => {
    let a = 0;
    for (const l of i.expertise)
      r.includes(l.toLowerCase()) && (a += 2);
    return r.includes("data") && i.votingStyle === "analytical" && (a += 1), r.includes("risk") && i.votingStyle === "cautious" && (a += 1), r.includes("creative") && i.votingStyle === "idealistic" && (a += 1), a += Math.random() * 0.5, { councilor: i, score: a };
  }).sort((i, a) => a.score - i.score).slice(0, n).map((i) => i.councilor);
}
const fn = ({
  availableCouncilors: e,
  selectedIds: t = [],
  maxSelections: n = 5,
  minSelections: r = 1,
  onSelectionChange: s,
  showExpertise: i = !0,
  groupByExpertise: a = !1,
  className: l,
  style: c
}) => {
  const [p, f] = C(t), d = t.length > 0 ? t : p, h = s ? (g) => {
    f(g);
    const m = e.filter((v) => g.includes(v.id));
    s(m);
  } : f, x = M((g) => {
    const m = d.includes(g) ? d.filter((v) => v !== g) : d.length < n ? [...d, g] : d;
    (m.length >= r || !d.includes(g)) && h(m);
  }, [d, n, r, h]), y = W(() => {
    if (!a) return { ungrouped: e };
    const g = {};
    for (const m of e)
      for (const v of m.expertise.slice(0, 2))
        g[v] || (g[v] = []), g[v].push(m);
    return g;
  }, [e, a]), b = (g) => {
    const m = d.includes(g.id);
    return /* @__PURE__ */ o.jsxs(
      "div",
      {
        onClick: () => x(g.id),
        style: {
          padding: "12px",
          borderRadius: "8px",
          border: m ? `2px solid ${g.color}` : "2px solid transparent",
          background: m ? `${g.color}15` : "rgba(255, 255, 255, 0.03)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          gap: "12px",
          alignItems: "flex-start"
        },
        children: [
          /* @__PURE__ */ o.jsx("div", { style: {
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: g.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: 600,
            color: "#fff",
            flexShrink: 0
          }, children: g.avatar || g.name.charAt(0) }),
          /* @__PURE__ */ o.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ o.jsx("div", { style: {
              fontWeight: 600,
              color: m ? g.color : "#fff",
              marginBottom: "2px"
            }, children: g.name }),
            /* @__PURE__ */ o.jsx("div", { style: {
              fontSize: "12px",
              color: "#9ca3af",
              marginBottom: i ? "6px" : 0
            }, children: g.title }),
            i && /* @__PURE__ */ o.jsx("div", { style: { display: "flex", gap: "4px", flexWrap: "wrap" }, children: g.expertise.slice(0, 3).map((v) => /* @__PURE__ */ o.jsx(
              "span",
              {
                style: {
                  fontSize: "10px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#9ca3af"
                },
                children: v
              },
              v
            )) })
          ] }),
          /* @__PURE__ */ o.jsx("div", { style: {
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            border: `2px solid ${m ? g.color : "#4b5563"}`,
            background: m ? g.color : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }, children: m && /* @__PURE__ */ o.jsx("span", { style: { color: "#fff", fontSize: "12px" }, children: "✓" }) })
        ]
      },
      g.id
    );
  };
  return /* @__PURE__ */ o.jsxs("div", { className: l, style: c, children: [
    /* @__PURE__ */ o.jsxs("div", { style: {
      marginBottom: "12px",
      fontSize: "13px",
      color: "#9ca3af"
    }, children: [
      "Selected: ",
      d.length,
      " / ",
      n,
      r > 1 && ` (min: ${r})`
    ] }),
    /* @__PURE__ */ o.jsx("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }, children: Object.entries(y).map(([g, m]) => /* @__PURE__ */ o.jsxs("div", { children: [
      a && g !== "ungrouped" && /* @__PURE__ */ o.jsx("div", { style: {
        fontSize: "12px",
        color: "#6b7280",
        marginBottom: "4px",
        marginTop: "8px",
        textTransform: "uppercase",
        letterSpacing: "0.05em"
      }, children: g }),
      Array.isArray(m) && m.map(b)
    ] }, g)) })
  ] });
};
function pn(e, t = []) {
  const [n, r] = C(t), s = W(
    () => e.filter((f) => n.includes(f.id)),
    [e, n]
  ), i = M((f) => {
    r((d) => [...d, f]);
  }, []), a = M((f) => {
    r((d) => d.filter((h) => h !== f));
  }, []), l = M((f) => {
    r(
      (d) => d.includes(f) ? d.filter((h) => h !== f) : [...d, f]
    );
  }, []), c = M((f, d = 3) => {
    const h = dr(e, f, d);
    return r(h.map((x) => x.id)), h;
  }, [e]), p = M(() => {
    r([]);
  }, []);
  return {
    selectedIds: n,
    selectedCouncilors: s,
    select: i,
    deselect: a,
    toggle: l,
    selectForContext: c,
    clear: p,
    setSelectedIds: r
  };
}
const hn = ({
  children: e,
  variant: t = "primary",
  size: n = "md",
  isLoading: r = !1,
  leftIcon: s,
  rightIcon: i,
  className: a,
  disabled: l,
  style: c,
  ...p
}) => {
  const f = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    cursor: l || r ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    opacity: l || r ? 0.6 : 1
  }, d = {
    sm: { padding: "6px 12px", fontSize: "13px" },
    md: { padding: "10px 16px", fontSize: "14px" },
    lg: { padding: "14px 24px", fontSize: "16px" }
  }, h = {
    primary: {
      background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
      color: "#fff",
      boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)"
    },
    secondary: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "#e5e7eb",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    outline: {
      background: "transparent",
      color: "#8b5cf6",
      border: "2px solid #8b5cf6"
    },
    ghost: {
      background: "transparent",
      color: "#e5e7eb"
    },
    destructive: {
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      color: "#fff",
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
    }
  };
  return /* @__PURE__ */ o.jsxs(
    "button",
    {
      className: a,
      disabled: l || r,
      style: {
        ...f,
        ...d[n],
        ...h[t],
        ...c
      },
      ...p,
      children: [
        r ? /* @__PURE__ */ o.jsx(ur, { size: 16 }) : s || null,
        e,
        !r && i
      ]
    }
  );
}, ur = ({ size: e }) => /* @__PURE__ */ o.jsx("div", { style: {
  width: `${e}px`,
  height: `${e}px`,
  border: "2px solid currentColor",
  borderTopColor: "transparent",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite"
}, children: /* @__PURE__ */ o.jsx("style", { children: `
      @keyframes spin { to { transform: rotate(360deg); } }
    ` }) }), xn = ({
  children: e,
  hover: t = !1,
  glass: n = !1,
  padding: r = 16,
  className: s,
  style: i,
  onClick: a
}) => /* @__PURE__ */ o.jsx(
  "div",
  {
    className: s,
    onClick: a,
    style: {
      background: n ? "rgba(255, 255, 255, 0.05)" : "rgba(20, 20, 30, 0.95)",
      backdropFilter: n ? "blur(20px)" : void 0,
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      padding: typeof r == "number" ? `${r}px` : r,
      transition: "all 0.2s ease",
      cursor: a ? "pointer" : "default",
      ...t && {
        ":hover": {
          borderColor: "rgba(139, 92, 246, 0.5)",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)"
        }
      },
      ...i
    },
    children: e
  }
), gn = ({
  children: e,
  className: t,
  style: n
}) => /* @__PURE__ */ o.jsx(
  "div",
  {
    className: t,
    style: {
      marginBottom: "12px",
      ...n
    },
    children: e
  }
), mn = ({
  children: e,
  className: t,
  style: n
}) => /* @__PURE__ */ o.jsx(
  "h3",
  {
    className: t,
    style: {
      fontSize: "18px",
      fontWeight: 600,
      color: "#fff",
      margin: 0,
      ...n
    },
    children: e
  }
), yn = ({
  children: e,
  className: t,
  style: n
}) => /* @__PURE__ */ o.jsx(
  "div",
  {
    className: t,
    style: {
      color: "#9ca3af",
      fontSize: "14px",
      lineHeight: 1.5,
      ...n
    },
    children: e
  }
), bn = ({
  children: e,
  variant: t = "default",
  size: n = "md",
  className: r,
  style: s
}) => {
  const i = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    borderRadius: "9999px",
    whiteSpace: "nowrap"
  }, a = {
    sm: { padding: "2px 8px", fontSize: "10px" },
    md: { padding: "4px 12px", fontSize: "12px" }
  }, l = {
    default: { background: "rgba(255, 255, 255, 0.1)", color: "#e5e7eb" },
    primary: { background: "rgba(139, 92, 246, 0.2)", color: "#a78bfa" },
    secondary: { background: "rgba(59, 130, 246, 0.2)", color: "#60a5fa" },
    success: { background: "rgba(16, 185, 129, 0.2)", color: "#34d399" },
    warning: { background: "rgba(245, 158, 11, 0.2)", color: "#fbbf24" },
    destructive: { background: "rgba(239, 68, 68, 0.2)", color: "#f87171" }
  };
  return /* @__PURE__ */ o.jsx(
    "span",
    {
      className: r,
      style: {
        ...i,
        ...a[n],
        ...l[t],
        ...s
      },
      children: e
    }
  );
}, fr = Q.forwardRef(({
  label: e,
  error: t,
  leftIcon: n,
  rightIcon: r,
  className: s,
  style: i,
  ...a
}, l) => {
  const [c, p] = Q.useState(!1);
  return /* @__PURE__ */ o.jsxs("div", { style: { width: "100%" }, children: [
    e && /* @__PURE__ */ o.jsx("label", { style: {
      display: "block",
      fontSize: "14px",
      fontWeight: 500,
      color: "#e5e7eb",
      marginBottom: "6px"
    }, children: e }),
    /* @__PURE__ */ o.jsxs("div", { style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }, children: [
      n && /* @__PURE__ */ o.jsx("div", { style: {
        position: "absolute",
        left: "12px",
        color: "#6b7280",
        display: "flex",
        alignItems: "center"
      }, children: n }),
      /* @__PURE__ */ o.jsx(
        "input",
        {
          ref: l,
          className: s,
          onFocus: (f) => {
            var d;
            p(!0), (d = a.onFocus) == null || d.call(a, f);
          },
          onBlur: (f) => {
            var d;
            p(!1), (d = a.onBlur) == null || d.call(a, f);
          },
          style: {
            width: "100%",
            padding: n ? "10px 12px 10px 40px" : "10px 12px",
            background: "rgba(255, 255, 255, 0.05)",
            border: `2px solid ${t ? "#ef4444" : c ? "#8b5cf6" : "rgba(255, 255, 255, 0.1)"}`,
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            transition: "all 0.2s ease",
            ...i
          },
          ...a
        }
      ),
      r && /* @__PURE__ */ o.jsx("div", { style: {
        position: "absolute",
        right: "12px",
        color: "#6b7280",
        display: "flex",
        alignItems: "center"
      }, children: r })
    ] }),
    t && /* @__PURE__ */ o.jsx("p", { style: {
      marginTop: "4px",
      fontSize: "12px",
      color: "#ef4444"
    }, children: t })
  ] });
});
fr.displayName = "Input";
const vn = ({
  rows: e = 5,
  cols: t = 5,
  gap: n = 20,
  color: r = "#8b5cf6",
  animate: s = !0,
  className: i,
  style: a
}) => /* @__PURE__ */ o.jsxs(
  "div",
  {
    className: i,
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${t}, 1fr)`,
      gridTemplateRows: `repeat(${e}, 1fr)`,
      gap: `${n}px`,
      ...a
    },
    children: [
      Array.from({ length: e * t }).map((l, c) => /* @__PURE__ */ o.jsx(
        "div",
        {
          className: s ? `grid-item-${c % 4}` : "",
          style: {
            aspectRatio: "1",
            borderRadius: "8px",
            background: r,
            opacity: 0.1 + c % 5 * 0.15,
            animation: s ? "gridFade 2s ease-in-out infinite" : "none",
            animationDelay: `${c % 4 * 0.5}s`
          }
        },
        c
      )),
      /* @__PURE__ */ o.jsx("style", { children: `
        @keyframes gridFade {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      ` })
    ]
  }
), jn = ({
  children: e,
  delay: t = 0,
  duration: n = 0.5,
  direction: r = "up",
  distance: s = 20,
  className: i,
  style: a
}) => {
  const [l, c] = C(!1);
  $(() => {
    const f = setTimeout(() => c(!0), t * 1e3);
    return () => clearTimeout(f);
  }, [t]);
  const p = {
    up: `translateY(${s}px)`,
    down: `translateY(-${s}px)`,
    left: `translateX(${s}px)`,
    right: `translateX(-${s}px)`,
    none: "none"
  };
  return /* @__PURE__ */ o.jsx(
    "div",
    {
      className: i,
      style: {
        opacity: l ? 1 : 0,
        transform: l ? "none" : p[r],
        transition: `opacity ${n}s ease, transform ${n}s ease`,
        ...a
      },
      children: e
    }
  );
}, wn = ({
  children: e,
  cols: t = 4,
  gap: n = 16,
  className: r,
  style: s
}) => /* @__PURE__ */ o.jsx(
  "div",
  {
    className: r,
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${t}, 1fr)`,
      gap: `${n}px`,
      ...s
    },
    children: Q.Children.map(e, (i, a) => {
      if (!Q.isValidElement(i)) return i;
      const { colSpan: l = 1, rowSpan: c = 1, ...p } = i.props;
      return /* @__PURE__ */ o.jsx(
        "div",
        {
          ...p,
          style: {
            gridColumn: `span ${l}`,
            gridRow: `span ${c}`,
            ...p.style
          }
        }
      );
    })
  }
), Sn = ({
  title: e,
  children: t,
  className: n,
  style: r
}) => /* @__PURE__ */ o.jsxs(
  "div",
  {
    className: n,
    style: {
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      ...r
    },
    children: [
      e && /* @__PURE__ */ o.jsx("h3", { style: {
        fontSize: "16px",
        fontWeight: 600,
        color: "#fff",
        margin: 0
      }, children: e }),
      t
    ]
  }
), kn = ({
  words: e,
  duration: t = 2e3,
  className: n,
  style: r
}) => {
  const [s, i] = C(0);
  return $(() => {
    const a = setInterval(() => {
      i((l) => (l + 1) % e.length);
    }, t);
    return () => clearInterval(a);
  }, [e.length, t]), /* @__PURE__ */ o.jsx(
    "span",
    {
      className: n,
      style: {
        display: "inline-block",
        minWidth: "100px",
        ...r
      },
      children: e.map((a, l) => /* @__PURE__ */ o.jsx(
        "span",
        {
          style: {
            display: "inline-block",
            opacity: s === l ? 1 : 0,
            transform: s === l ? "translateY(0)" : "translateY(-20px)",
            transition: "all 0.3s ease",
            position: s === l ? "relative" : "absolute"
          },
          children: a
        },
        a
      ))
    }
  );
}, Rn = ({
  children: e,
  from: t = "#8b5cf6",
  to: n = "#06b6d4",
  direction: r = "135deg",
  animate: s = !1,
  className: i,
  style: a
}) => /* @__PURE__ */ o.jsxs(
  "span",
  {
    className: i,
    style: {
      background: s ? `linear-gradient(${r}, ${t}, ${n}, ${t})` : `linear-gradient(${r}, ${t}, ${n})`,
      backgroundSize: s ? "200% 200%" : void 0,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      animation: s ? "gradientShift 3s ease infinite" : void 0,
      ...a
    },
    children: [
      e,
      s && /* @__PURE__ */ o.jsx("style", { children: `
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        ` })
    ]
  }
), Cn = ({
  count: e = 5,
  size: t = 200,
  colors: n = ["#8b5cf6", "#06b6d4", "#ec4899", "#f59e0b", "#10b981"],
  orbitRadius: r = 80,
  shapeSize: s = 10,
  speed: i = 20,
  shape: a = "circle",
  className: l,
  style: c
}) => {
  const p = P(null);
  return $(() => {
    const f = p.current;
    if (!f) return;
    const d = f.getContext("2d");
    if (!d) return;
    let h;
    const x = () => {
      d.clearRect(0, 0, t, t);
      const y = t / 2, b = t / 2, g = Date.now() / 1e3;
      for (let v = 0; v < e; v++) {
        const w = v / e * Math.PI * 2 + g * i / 10, S = y + Math.cos(w) * r, R = b + Math.sin(w) * r;
        d.fillStyle = n[v % n.length], d.globalAlpha = 0.8, d.beginPath(), a === "circle" ? d.arc(S, R, s, 0, Math.PI * 2) : a === "square" ? d.rect(S - s / 2, R - s / 2, s, s) : a === "triangle" && (d.moveTo(S, R - s), d.lineTo(S + s, R + s / 2), d.lineTo(S - s, R + s / 2), d.closePath()), d.fill();
      }
      const m = d.createRadialGradient(y, b, 0, y, b, 30);
      m.addColorStop(0, n[0]), m.addColorStop(1, "transparent"), d.fillStyle = m, d.globalAlpha = 0.5, d.beginPath(), d.arc(y, b, 30, 0, Math.PI * 2), d.fill(), h = requestAnimationFrame(x);
    };
    return x(), () => cancelAnimationFrame(h);
  }, [e, t, n, r, s, i, a]), /* @__PURE__ */ o.jsx(
    "canvas",
    {
      ref: p,
      width: t,
      height: t,
      className: l,
      style: {
        display: "block",
        ...c
      }
    }
  );
};
export {
  sn as AIGenerator,
  vr as AdaptiveLayout,
  vn as AnimatedGrid,
  cn as AutoModeSelector,
  bn as Badge,
  wn as BentoGrid,
  Sn as BentoItem,
  hn as Button,
  un as COUNCILOR_ARCHETYPES,
  xn as Card,
  yn as CardContent,
  gn as CardHeader,
  mn as CardTitle,
  wr as ChunkStream,
  Tr as CodeBlock,
  fn as CouncilorSelector,
  Er as DataChart,
  Ir as DataTable,
  jn as FadeIn,
  Or as GlowBorder,
  _r as GradientMesh,
  At as GridLayout,
  fr as Input,
  on as LayoutOptimizer,
  $r as ListCard,
  Br as LoadingBars,
  zr as LoadingDots,
  Nr as LoadingOrb,
  Vr as LoadingPulse,
  Fr as LoadingSpinner,
  br as MasonryLayout,
  cr as ModeSelector,
  Cn as OrbitingShapes,
  Ar as ParticleEmitter,
  hr as PretextCanvas,
  mr as PretextLayout,
  jr as PretextStream,
  xr as PretextText,
  Mr as QuestionBubble,
  Ie as Shimmer,
  Dr as Skeleton,
  Rr as SmartMessage,
  yr as StackLayout,
  Wr as StreamableText,
  Lr as StreamingCard,
  Pr as SummaryCard,
  Rn as TextGradient,
  Cr as VoteCard,
  kn as WordRotate,
  nt as analyzeLayout,
  gr as calculateLayout,
  lr as calculateOptimalColumns,
  ve as detectContentType,
  Sr as detectMixedContent,
  Ae as detectOptimalMode,
  kr as extractStructuredData,
  rt as generateComponentProps,
  st as getBestLayout,
  Dt as getContentTypeColor,
  Wt as getContentTypeIcon,
  it as getModeOption,
  dr as selectCouncilorsForContext,
  an as useAIGeneration,
  qr as useCanvas,
  Ur as useCanvasText,
  pn as useCouncilorSelector,
  Hr as useDebounce,
  Xr as useDebouncedCallback,
  Jr as useDebouncedValues,
  nn as useGestures,
  Zr as useInfiniteScroll,
  tt as useIntersection,
  tn as useKeyPress,
  en as useKeyboard,
  rn as useKeysPressed,
  ln as useLayoutOptimizer,
  Qr as useLazyLoad,
  dn as useModeSelector,
  Kr as useParticleEmitter,
  Ze as usePretext,
  Yr as usePretextStream,
  Qt as useStreaming,
  Gr as useStreamingChunks,
  be as useTextMeasurement
};
//# sourceMappingURL=index.mjs.map
