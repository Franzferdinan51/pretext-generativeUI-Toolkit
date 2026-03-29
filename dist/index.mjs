import le, { useRef as A, useEffect as N, useCallback as L, useState as C, useMemo as H } from "react";
var Ae = { exports: {} }, ye = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ke;
function $t() {
  if (Ke) return ye;
  Ke = 1;
  var e = le, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, o = { key: !0, ref: !0, __self: !0, __source: !0 };
  function l(c, a, p) {
    var f, u = {}, x = null, h = null;
    p !== void 0 && (x = "" + p), a.key !== void 0 && (x = "" + a.key), a.ref !== void 0 && (h = a.ref);
    for (f in a) s.call(a, f) && !o.hasOwnProperty(f) && (u[f] = a[f]);
    if (c && c.defaultProps) for (f in a = c.defaultProps, a) u[f] === void 0 && (u[f] = a[f]);
    return { $$typeof: t, type: c, key: x, ref: h, props: u, _owner: i.current };
  }
  return ye.Fragment = n, ye.jsx = l, ye.jsxs = l, ye;
}
var be = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qe;
function It() {
  return qe || (qe = 1, process.env.NODE_ENV !== "production" && function() {
    var e = le, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), l = Symbol.for("react.provider"), c = Symbol.for("react.context"), a = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), u = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), y = Symbol.iterator, m = "@@iterator";
    function k(d) {
      if (d === null || typeof d != "object")
        return null;
      var w = y && d[y] || d[m];
      return typeof w == "function" ? w : null;
    }
    var b = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(d) {
      {
        for (var w = arguments.length, R = new Array(w > 1 ? w - 1 : 0), O = 1; O < w; O++)
          R[O - 1] = arguments[O];
        g("error", d, R);
      }
    }
    function g(d, w, R) {
      {
        var O = b.ReactDebugCurrentFrame, J = O.getStackAddendum();
        J !== "" && (w += "%s", R = R.concat([J]));
        var U = R.map(function(F) {
          return String(F);
        });
        U.unshift("Warning: " + w), Function.prototype.apply.call(console[d], console, U);
      }
    }
    var j = !1, S = !1, T = !1, $ = !1, I = !1, E;
    E = Symbol.for("react.module.reference");
    function M(d) {
      return !!(typeof d == "string" || typeof d == "function" || d === s || d === o || I || d === i || d === p || d === f || $ || d === h || j || S || T || typeof d == "object" && d !== null && (d.$$typeof === x || d.$$typeof === u || d.$$typeof === l || d.$$typeof === c || d.$$typeof === a || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      d.$$typeof === E || d.getModuleId !== void 0));
    }
    function P(d, w, R) {
      var O = d.displayName;
      if (O)
        return O;
      var J = w.displayName || w.name || "";
      return J !== "" ? R + "(" + J + ")" : R;
    }
    function z(d) {
      return d.displayName || "Context";
    }
    function _(d) {
      if (d == null)
        return null;
      if (typeof d.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof d == "function")
        return d.displayName || d.name || null;
      if (typeof d == "string")
        return d;
      switch (d) {
        case s:
          return "Fragment";
        case n:
          return "Portal";
        case o:
          return "Profiler";
        case i:
          return "StrictMode";
        case p:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case c:
            var w = d;
            return z(w) + ".Consumer";
          case l:
            var R = d;
            return z(R._context) + ".Provider";
          case a:
            return P(d, d.render, "ForwardRef");
          case u:
            var O = d.displayName || null;
            return O !== null ? O : _(d.type) || "Memo";
          case x: {
            var J = d, U = J._payload, F = J._init;
            try {
              return _(F(U));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Y = Object.assign, W = 0, q, B, Q, se, X, ie, K;
    function Z() {
    }
    Z.__reactDisabledLog = !0;
    function re() {
      {
        if (W === 0) {
          q = console.log, B = console.info, Q = console.warn, se = console.error, X = console.group, ie = console.groupCollapsed, K = console.groupEnd;
          var d = {
            configurable: !0,
            enumerable: !0,
            value: Z,
            writable: !0
          };
          Object.defineProperties(console, {
            info: d,
            log: d,
            warn: d,
            error: d,
            group: d,
            groupCollapsed: d,
            groupEnd: d
          });
        }
        W++;
      }
    }
    function oe() {
      {
        if (W--, W === 0) {
          var d = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Y({}, d, {
              value: q
            }),
            info: Y({}, d, {
              value: B
            }),
            warn: Y({}, d, {
              value: Q
            }),
            error: Y({}, d, {
              value: se
            }),
            group: Y({}, d, {
              value: X
            }),
            groupCollapsed: Y({}, d, {
              value: ie
            }),
            groupEnd: Y({}, d, {
              value: K
            })
          });
        }
        W < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ee = b.ReactCurrentDispatcher, pe;
    function de(d, w, R) {
      {
        if (pe === void 0)
          try {
            throw Error();
          } catch (J) {
            var O = J.stack.trim().match(/\n( *(at )?)/);
            pe = O && O[1] || "";
          }
        return `
` + pe + d;
      }
    }
    var xe = !1, ue;
    {
      var nt = typeof WeakMap == "function" ? WeakMap : Map;
      ue = new nt();
    }
    function Oe(d, w) {
      if (!d || xe)
        return "";
      {
        var R = ue.get(d);
        if (R !== void 0)
          return R;
      }
      var O;
      xe = !0;
      var J = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var U;
      U = ee.current, ee.current = null, re();
      try {
        if (w) {
          var F = function() {
            throw Error();
          };
          if (Object.defineProperty(F.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(F, []);
            } catch (ne) {
              O = ne;
            }
            Reflect.construct(d, [], F);
          } else {
            try {
              F.call();
            } catch (ne) {
              O = ne;
            }
            d.call(F.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ne) {
            O = ne;
          }
          d();
        }
      } catch (ne) {
        if (ne && O && typeof ne.stack == "string") {
          for (var D = ne.stack.split(`
`), te = O.stack.split(`
`), V = D.length - 1, G = te.length - 1; V >= 1 && G >= 0 && D[V] !== te[G]; )
            G--;
          for (; V >= 1 && G >= 0; V--, G--)
            if (D[V] !== te[G]) {
              if (V !== 1 || G !== 1)
                do
                  if (V--, G--, G < 0 || D[V] !== te[G]) {
                    var ae = `
` + D[V].replace(" at new ", " at ");
                    return d.displayName && ae.includes("<anonymous>") && (ae = ae.replace("<anonymous>", d.displayName)), typeof d == "function" && ue.set(d, ae), ae;
                  }
                while (V >= 1 && G >= 0);
              break;
            }
        }
      } finally {
        xe = !1, ee.current = U, oe(), Error.prepareStackTrace = J;
      }
      var ge = d ? d.displayName || d.name : "", fe = ge ? de(ge) : "";
      return typeof d == "function" && ue.set(d, fe), fe;
    }
    function st(d, w, R) {
      return Oe(d, !1);
    }
    function at(d) {
      var w = d.prototype;
      return !!(w && w.isReactComponent);
    }
    function ve(d, w, R) {
      if (d == null)
        return "";
      if (typeof d == "function")
        return Oe(d, at(d));
      if (typeof d == "string")
        return de(d);
      switch (d) {
        case p:
          return de("Suspense");
        case f:
          return de("SuspenseList");
      }
      if (typeof d == "object")
        switch (d.$$typeof) {
          case a:
            return st(d.render);
          case u:
            return ve(d.type, w, R);
          case x: {
            var O = d, J = O._payload, U = O._init;
            try {
              return ve(U(J), w, R);
            } catch {
            }
          }
        }
      return "";
    }
    var me = Object.prototype.hasOwnProperty, Me = {}, Le = b.ReactDebugCurrentFrame;
    function je(d) {
      if (d) {
        var w = d._owner, R = ve(d.type, d._source, w ? w.type : null);
        Le.setExtraStackFrame(R);
      } else
        Le.setExtraStackFrame(null);
    }
    function it(d, w, R, O, J) {
      {
        var U = Function.call.bind(me);
        for (var F in d)
          if (U(d, F)) {
            var D = void 0;
            try {
              if (typeof d[F] != "function") {
                var te = Error((O || "React class") + ": " + R + " type `" + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof d[F] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw te.name = "Invariant Violation", te;
              }
              D = d[F](w, F, O, R, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (V) {
              D = V;
            }
            D && !(D instanceof Error) && (je(J), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", O || "React class", R, F, typeof D), je(null)), D instanceof Error && !(D.message in Me) && (Me[D.message] = !0, je(J), v("Failed %s type: %s", R, D.message), je(null));
          }
      }
    }
    var ot = Array.isArray;
    function Te(d) {
      return ot(d);
    }
    function lt(d) {
      {
        var w = typeof Symbol == "function" && Symbol.toStringTag, R = w && d[Symbol.toStringTag] || d.constructor.name || "Object";
        return R;
      }
    }
    function ct(d) {
      try {
        return _e(d), !1;
      } catch {
        return !0;
      }
    }
    function _e(d) {
      return "" + d;
    }
    function De(d) {
      if (ct(d))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", lt(d)), _e(d);
    }
    var We = b.ReactCurrentOwner, dt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Fe, ze;
    function ut(d) {
      if (me.call(d, "ref")) {
        var w = Object.getOwnPropertyDescriptor(d, "ref").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return d.ref !== void 0;
    }
    function ft(d) {
      if (me.call(d, "key")) {
        var w = Object.getOwnPropertyDescriptor(d, "key").get;
        if (w && w.isReactWarning)
          return !1;
      }
      return d.key !== void 0;
    }
    function pt(d, w) {
      typeof d.ref == "string" && We.current;
    }
    function xt(d, w) {
      {
        var R = function() {
          Fe || (Fe = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        R.isReactWarning = !0, Object.defineProperty(d, "key", {
          get: R,
          configurable: !0
        });
      }
    }
    function ht(d, w) {
      {
        var R = function() {
          ze || (ze = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", w));
        };
        R.isReactWarning = !0, Object.defineProperty(d, "ref", {
          get: R,
          configurable: !0
        });
      }
    }
    var gt = function(d, w, R, O, J, U, F) {
      var D = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: d,
        key: w,
        ref: R,
        props: F,
        // Record the component responsible for creating this element.
        _owner: U
      };
      return D._store = {}, Object.defineProperty(D._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(D, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: O
      }), Object.defineProperty(D, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: J
      }), Object.freeze && (Object.freeze(D.props), Object.freeze(D)), D;
    };
    function mt(d, w, R, O, J) {
      {
        var U, F = {}, D = null, te = null;
        R !== void 0 && (De(R), D = "" + R), ft(w) && (De(w.key), D = "" + w.key), ut(w) && (te = w.ref, pt(w, J));
        for (U in w)
          me.call(w, U) && !dt.hasOwnProperty(U) && (F[U] = w[U]);
        if (d && d.defaultProps) {
          var V = d.defaultProps;
          for (U in V)
            F[U] === void 0 && (F[U] = V[U]);
        }
        if (D || te) {
          var G = typeof d == "function" ? d.displayName || d.name || "Unknown" : d;
          D && xt(F, G), te && ht(F, G);
        }
        return gt(d, D, te, J, O, We.current, F);
      }
    }
    var Re = b.ReactCurrentOwner, Be = b.ReactDebugCurrentFrame;
    function he(d) {
      if (d) {
        var w = d._owner, R = ve(d.type, d._source, w ? w.type : null);
        Be.setExtraStackFrame(R);
      } else
        Be.setExtraStackFrame(null);
    }
    var Ce;
    Ce = !1;
    function $e(d) {
      return typeof d == "object" && d !== null && d.$$typeof === t;
    }
    function Ye() {
      {
        if (Re.current) {
          var d = _(Re.current.type);
          if (d)
            return `

Check the render method of \`` + d + "`.";
        }
        return "";
      }
    }
    function yt(d) {
      return "";
    }
    var Je = {};
    function bt(d) {
      {
        var w = Ye();
        if (!w) {
          var R = typeof d == "string" ? d : d.displayName || d.name;
          R && (w = `

Check the top-level render call using <` + R + ">.");
        }
        return w;
      }
    }
    function Ue(d, w) {
      {
        if (!d._store || d._store.validated || d.key != null)
          return;
        d._store.validated = !0;
        var R = bt(w);
        if (Je[R])
          return;
        Je[R] = !0;
        var O = "";
        d && d._owner && d._owner !== Re.current && (O = " It was passed a child from " + _(d._owner.type) + "."), he(d), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', R, O), he(null);
      }
    }
    function Ve(d, w) {
      {
        if (typeof d != "object")
          return;
        if (Te(d))
          for (var R = 0; R < d.length; R++) {
            var O = d[R];
            $e(O) && Ue(O, w);
          }
        else if ($e(d))
          d._store && (d._store.validated = !0);
        else if (d) {
          var J = k(d);
          if (typeof J == "function" && J !== d.entries)
            for (var U = J.call(d), F; !(F = U.next()).done; )
              $e(F.value) && Ue(F.value, w);
        }
      }
    }
    function vt(d) {
      {
        var w = d.type;
        if (w == null || typeof w == "string")
          return;
        var R;
        if (typeof w == "function")
          R = w.propTypes;
        else if (typeof w == "object" && (w.$$typeof === a || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        w.$$typeof === u))
          R = w.propTypes;
        else
          return;
        if (R) {
          var O = _(w);
          it(R, d.props, "prop", O, d);
        } else if (w.PropTypes !== void 0 && !Ce) {
          Ce = !0;
          var J = _(w);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", J || "Unknown");
        }
        typeof w.getDefaultProps == "function" && !w.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function jt(d) {
      {
        for (var w = Object.keys(d.props), R = 0; R < w.length; R++) {
          var O = w[R];
          if (O !== "children" && O !== "key") {
            he(d), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", O), he(null);
            break;
          }
        }
        d.ref !== null && (he(d), v("Invalid attribute `ref` supplied to `React.Fragment`."), he(null));
      }
    }
    var He = {};
    function Ge(d, w, R, O, J, U) {
      {
        var F = M(d);
        if (!F) {
          var D = "";
          (d === void 0 || typeof d == "object" && d !== null && Object.keys(d).length === 0) && (D += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var te = yt();
          te ? D += te : D += Ye();
          var V;
          d === null ? V = "null" : Te(d) ? V = "array" : d !== void 0 && d.$$typeof === t ? (V = "<" + (_(d.type) || "Unknown") + " />", D = " Did you accidentally export a JSX literal instead of a component?") : V = typeof d, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", V, D);
        }
        var G = mt(d, w, R, J, U);
        if (G == null)
          return G;
        if (F) {
          var ae = w.children;
          if (ae !== void 0)
            if (O)
              if (Te(ae)) {
                for (var ge = 0; ge < ae.length; ge++)
                  Ve(ae[ge], d);
                Object.freeze && Object.freeze(ae);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ve(ae, d);
        }
        if (me.call(w, "key")) {
          var fe = _(d), ne = Object.keys(w).filter(function(Ct) {
            return Ct !== "key";
          }), Ie = ne.length > 0 ? "{key: someKey, " + ne.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!He[fe + Ie]) {
            var Rt = ne.length > 0 ? "{" + ne.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ie, fe, Rt, fe), He[fe + Ie] = !0;
          }
        }
        return d === s ? jt(G) : vt(G), G;
      }
    }
    function wt(d, w, R) {
      return Ge(d, w, R, !0);
    }
    function St(d, w, R) {
      return Ge(d, w, R, !1);
    }
    var kt = St, Tt = wt;
    be.Fragment = s, be.jsx = kt, be.jsxs = Tt;
  }()), be;
}
process.env.NODE_ENV === "production" ? Ae.exports = $t() : Ae.exports = It();
var r = Ae.exports;
function Et(e, t, n, s) {
  const o = document.createElement("canvas").getContext("2d");
  if (!o)
    return { height: 0, lines: [], totalWidth: 0 };
  o.font = t;
  const l = [], c = e.split(`
`);
  let a = s, p = 0;
  for (const f of c) {
    if (f.trim() === "") {
      a += s * 0.5;
      continue;
    }
    const u = f.split(" ");
    let x = "", h = 0;
    for (const y of u) {
      const m = o.measureText(y).width, k = x ? `${x} ${y}` : y, b = o.measureText(k).width;
      b > n && x ? (l.push({
        text: x,
        x: 0,
        y: a,
        width: h,
        baseline: s * 0.85
      }), p = Math.max(p, h), a += s, x = y, h = m) : (x = k, h = b);
    }
    x && (l.push({
      text: x,
      x: 0,
      y: a,
      width: h,
      baseline: s * 0.85
    }), p = Math.max(p, h), a += s);
  }
  return {
    height: a,
    lines: l,
    totalWidth: p
  };
}
function ke(e, t, n, s) {
  const [i, o] = C(null);
  return N(() => {
    if (!e) {
      o(null);
      return;
    }
    const l = Et(e, t, n, s);
    o(l);
  }, [e, t, n, s]), i;
}
const wr = ({
  text: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: s = 22,
  color: i = "#ffffff",
  x: o = 0,
  y: l = 0,
  align: c = "left",
  verticalAlign: a = "top",
  className: p,
  style: f,
  onMeasure: u
}) => {
  const x = A(null), h = ke(e, t, n, s);
  return N(() => {
    h && u && u(h);
  }, [h, u]), N(() => {
    const y = x.current;
    if (!y || !h) return;
    const m = y.getContext("2d");
    if (!m) return;
    const k = 10;
    y.width = n + k * 2, y.height = h.height + k * 2, m.clearRect(0, 0, y.width, y.height), m.font = t, m.fillStyle = i, m.textBaseline = "top";
    let b = k;
    (a === "bottom" || a === "middle") && (b = k);
    for (const v of h.lines) {
      let g = k + o;
      c === "center" ? g = k + (n - v.width) / 2 + o : c === "right" && (g = k + n - v.width + o), m.fillText(v.text, g, b + v.y);
    }
  }, [h, t, n, i, o, l, c, a]), /* @__PURE__ */ r.jsx(
    "canvas",
    {
      ref: x,
      className: p,
      style: {
        display: "block",
        maxWidth: "100%",
        ...f
      }
    }
  );
}, Sr = ({
  text: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: s = 22,
  color: i = "#ffffff",
  measurement: o,
  style: l,
  className: c
}) => {
  const a = ke(e, t, n, s), p = o || a;
  if (!p) return null;
  const f = L((u, x = "left") => {
    switch (x) {
      case "center":
        return (n - u) / 2;
      case "right":
        return n - u;
      default:
        return 0;
    }
  }, [n]);
  return /* @__PURE__ */ r.jsx(
    "div",
    {
      className: c,
      style: {
        font: t,
        color: i,
        lineHeight: `${s}px`,
        maxWidth: `${n}px`,
        ...l
      },
      children: p.lines.map((u, x) => /* @__PURE__ */ r.jsx(
        "div",
        {
          style: {
            height: `${s}px`,
            display: "flex",
            alignItems: "flex-start"
          },
          children: /* @__PURE__ */ r.jsx("span", { style: { paddingLeft: f(u.width) }, children: u.text })
        },
        x
      ))
    }
  );
};
function kr(e, t) {
  const {
    direction: n = "row",
    gap: s = 0,
    padding: i = 0,
    align: o = "stretch",
    justify: l = "start",
    wrap: c = !1,
    maxWidth: a = 1 / 0,
    maxHeight: p = 1 / 0
  } = t, f = [];
  let u = i, x = i, h = 0;
  return le.Children.toArray(e).forEach((m, k) => {
    n === "row" ? (!c && u + 100 > a && (u = i, x += h + s, h = 0), f.push({
      x: u,
      y: x,
      width: 100,
      height: 50
    }), u += 100 + s, h = Math.max(h, 50)) : (f.push({
      x: i,
      y: x,
      width: 100,
      height: 50
    }), x += 50 + s);
  }), f;
}
const Tr = ({
  children: e,
  options: t = {},
  className: n,
  style: s
}) => {
  const {
    direction: i = "row",
    gap: o = 0,
    padding: l = 0,
    align: c = "stretch",
    justify: a = "start",
    wrap: p = !1,
    maxWidth: f = 1 / 0,
    maxHeight: u = 1 / 0
  } = t, x = H(() => ({
    display: "flex",
    flexDirection: i,
    gap: `${o}px`,
    padding: `${l}px`,
    flexWrap: p ? "wrap" : "nowrap",
    alignItems: c,
    justifyContent: a,
    maxWidth: f === 1 / 0 ? void 0 : f,
    maxHeight: u === 1 / 0 ? void 0 : u,
    ...s
  }), [i, o, l, c, a, p, f, u, s]);
  return /* @__PURE__ */ r.jsx("div", { className: n, style: x, children: e });
}, Rr = ({
  children: e,
  direction: t = "column",
  gap: n = 8,
  align: s = "stretch",
  justify: i = "start",
  className: o,
  style: l
}) => {
  const c = H(() => ({
    display: "flex",
    flexDirection: t,
    gap: `${n}px`,
    alignItems: s,
    justifyContent: i
  }), [t, n, s, i]);
  return /* @__PURE__ */ r.jsx("div", { className: o, style: { ...c, ...l }, children: e });
}, Pt = ({
  children: e,
  columns: t = 3,
  rows: n,
  gap: s = 16,
  columnGap: i,
  rowGap: o,
  alignItems: l = "stretch",
  justifyItems: c = "stretch",
  className: a,
  style: p
}) => {
  const f = H(() => ({
    display: "grid",
    gridTemplateColumns: typeof t == "number" ? `repeat(${t}, 1fr)` : t,
    gridTemplateRows: n ? typeof n == "number" ? `repeat(${n}, 1fr)` : n : void 0,
    gap: `${s}px`,
    columnGap: i !== void 0 ? `${i}px` : void 0,
    rowGap: o !== void 0 ? `${o}px` : void 0,
    alignItems: l,
    justifyItems: c
  }), [t, n, s, i, o, l, c]);
  return /* @__PURE__ */ r.jsx("div", { className: a, style: { ...f, ...p }, children: e });
}, Cr = ({
  children: e,
  columns: t = 3,
  gap: n = 16,
  className: s,
  style: i
}) => {
  const o = A(null), [l, c] = C(Array(t).fill(0)), a = H(() => le.Children.toArray(e), [e]);
  L(() => {
    let f = 1 / 0, u = 0;
    return l.forEach((x, h) => {
      x < f && (f = x, u = h);
    }), u;
  }, [l]);
  const p = H(() => {
    const f = Array(t).fill(0), u = [];
    return a.forEach((x, h) => {
      const y = h % t, m = y * (100 / t), k = f[y], b = 150 + h % 3 * 50;
      u.push({
        x: m,
        y: k,
        width: 100 / t
      }), f[y] += b + n;
    }), c(f), u;
  }, [a, t, n]);
  return /* @__PURE__ */ r.jsx(
    "div",
    {
      ref: o,
      className: s,
      style: {
        position: "relative",
        width: "100%",
        height: `${Math.max(...l)}px`,
        ...i
      },
      children: a.map((f, u) => /* @__PURE__ */ r.jsx(
        "div",
        {
          style: {
            position: "absolute",
            left: `${p[u].x}%`,
            top: `${p[u].y}px`,
            width: `calc(${p[u].width}% - ${n}px)`,
            marginLeft: n / 2,
            marginRight: n / 2
          },
          children: f
        },
        u
      ))
    }
  );
}, $r = ({
  children: e,
  breakpoints: t = [
    { minWidth: 1200, columns: 4 },
    { minWidth: 900, columns: 3 },
    { minWidth: 600, columns: 2 },
    { minWidth: 0, columns: 1 }
  ],
  gap: n = 16,
  className: s,
  style: i
}) => {
  const o = A(null), [l, c] = C(3);
  return N(() => {
    const a = () => {
      var u;
      const p = ((u = o.current) == null ? void 0 : u.clientWidth) || 1e3, f = t.filter((x) => p >= x.minWidth).sort((x, h) => h.minWidth - x.minWidth)[0];
      c((f == null ? void 0 : f.columns) || 1);
    };
    return a(), window.addEventListener("resize", a), () => window.removeEventListener("resize", a);
  }, [t]), /* @__PURE__ */ r.jsx(
    "div",
    {
      ref: o,
      className: s,
      style: { ...i },
      children: /* @__PURE__ */ r.jsx(Pt, { columns: l, gap: n, children: e })
    }
  );
}, Nt = ({
  char: e = "▋",
  blinkSpeed: t = 500,
  color: n = "currentColor",
  className: s
}) => {
  const [i, o] = C(!0);
  return N(() => {
    const l = setInterval(() => {
      o((c) => !c);
    }, t);
    return () => clearInterval(l);
  }, [t]), /* @__PURE__ */ r.jsx(
    "span",
    {
      className: s,
      style: {
        opacity: i ? 1 : 0,
        color: n,
        transition: "opacity 0.1s"
      },
      children: e
    }
  );
}, Ir = ({
  text: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: s = 22,
  color: i = "#ffffff",
  config: o = {},
  onComplete: l,
  onProgress: c,
  className: a,
  style: p
}) => {
  const {
    speed: f = 20,
    startDelay: u = 0,
    chunkSize: x = 1,
    chunkDelay: h = 0,
    enableCursor: y = !0,
    cursorChar: m = "▋",
    cursorBlinkSpeed: k = 500
  } = o, [b, v] = C(""), [g, j] = C(!1), [S, T] = C(!1), $ = ke(e, t, n, s), I = ke(b, t, n, s);
  N(() => {
    if (!e) {
      v(""), j(!1), T(!1);
      return;
    }
    v(""), j(!1), T(!1);
    const M = setTimeout(() => {
      j(!0);
      let P = 0;
      const z = setInterval(() => {
        if (P < e.length) {
          const _ = Math.min(P + x, e.length);
          v(e.slice(0, _)), P = _, c && c(P / e.length);
        } else
          clearInterval(z), j(!1), T(!0), l && l();
      }, x > 1 && h || f);
      return () => clearInterval(z);
    }, u);
    return () => clearTimeout(M);
  }, [e, f, u, x, h, l, c]);
  const E = H(() => $ ? $.height + s : "auto", [$, s]);
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: a,
      style: {
        position: "relative",
        font: t,
        color: i,
        lineHeight: `${s}px`,
        maxWidth: `${n}px`,
        minHeight: typeof E == "number" ? `${E}px` : void 0,
        ...p
      },
      children: [
        I == null ? void 0 : I.lines.map((M, P) => /* @__PURE__ */ r.jsx(
          "div",
          {
            style: {
              height: `${s}px`,
              display: "flex",
              alignItems: "flex-start"
            },
            children: /* @__PURE__ */ r.jsx("span", { children: M.text })
          },
          P
        )),
        y && g && /* @__PURE__ */ r.jsx(
          Nt,
          {
            char: m,
            blinkSpeed: k,
            color: i
          }
        )
      ]
    }
  );
};
function At(e, t = {}) {
  const {
    speed: n = 20,
    chunkSize: s = 1,
    chunkDelay: i = 0
  } = t, [o, l] = C(""), [c, a] = C(!1), [p, f] = C(!1), [u, x] = C(0), h = A(null), y = A(e), m = A(0);
  N(() => {
    y.current = e, m.current = 0, l(""), x(0), f(!1);
  }, [e]);
  const k = L(() => {
    p || !y.current || (a(!0), h.current = setInterval(() => {
      const g = y.current;
      if (g)
        if (m.current < g.length) {
          const j = Math.min(m.current + s, g.length);
          l(g.slice(0, j)), m.current = j, x(j / g.length);
        } else
          a(!1), f(!0), h.current && clearInterval(h.current);
    }, s > 1 && i || n));
  }, [n, s, i, p]), b = L(() => {
    a(!1), h.current && clearInterval(h.current);
  }, []), v = L(() => {
    b(), m.current = 0, l(""), x(0), f(!1);
  }, [b]);
  return N(() => () => {
    h.current && clearInterval(h.current);
  }, []), {
    displayedText: o,
    isStreaming: c,
    isComplete: p,
    progress: u,
    start: k,
    pause: b,
    reset: v
  };
}
const Er = ({
  chunks: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: s = 22,
  color: i = "#ffffff",
  chunkDelay: o = 500,
  onChunkComplete: l,
  onComplete: c,
  className: a,
  style: p
}) => {
  const [f, u] = C(0), [x, h] = C(""), [y, m] = C(!1), { displayedText: k, isComplete: b } = At(
    e[f] || "",
    { speed: 15, chunkSize: 3 }
  );
  return N(() => {
    b && k === e[f] && (l && l(f), f < e.length - 1 ? setTimeout(() => {
      u((v) => v + 1);
    }, o) : c && c());
  }, [b, k, e, f, o, l, c]), /* @__PURE__ */ r.jsx(
    "div",
    {
      className: a,
      style: {
        font: t,
        color: i,
        lineHeight: `${s}px`,
        maxWidth: `${n}px`,
        ...p
      },
      children: k
    }
  );
};
function Ot(e) {
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
function Mt(e) {
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
function Lt(e) {
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
function _t(e) {
  const t = [], n = e.split(`
`);
  for (const s of n) {
    const i = s.match(/^[-*•]?\s*\[?\s*(\d+)\s*\]?\s*(.+)$/);
    i && t.push({
      id: i[1],
      label: i[2].trim()
    });
  }
  return t.length === 0 ? [
    { id: "yes", label: "Yes" },
    { id: "no", label: "No" },
    { id: "abstain", label: "Abstain" }
  ] : t;
}
const Dt = ({
  content: e,
  options: t,
  showResults: n = !1,
  allowMultiple: s = !1,
  onVote: i,
  onComplete: o,
  councilor: l,
  className: c,
  style: a
}) => {
  const [p, f] = C([]), [u, x] = C(!1), [h, y] = C({}), m = H(
    () => t || _t(e),
    [e, t]
  ), k = H(
    () => Object.values(h).reduce((j, S) => j + S, 0),
    [h]
  ), b = L((j) => {
    u || f((S) => {
      if (s) {
        const T = S.includes(j) ? S.filter(($) => $ !== j) : [...S, j];
        return i && i(T), T;
      } else {
        const T = [j];
        return i && i(T), setTimeout(() => {
          x(!0), o && o();
        }, 500), T;
      }
    });
  }, [u, s, i, o]), v = L(() => {
    if (p.length === 0) return;
    const j = { ...h };
    p.forEach((S) => {
      j[S] = (j[S] || 0) + 1;
    }), y(j), x(!0), o && o();
  }, [p, h, o]), g = (j) => {
    const S = h[j] || 0;
    return k > 0 ? Math.round(S / k * 100) : 0;
  };
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: c,
      style: {
        padding: "16px",
        borderRadius: "12px",
        background: "rgba(245, 158, 11, 0.05)",
        border: "1px solid rgba(245, 158, 11, 0.2)",
        ...a
      },
      children: [
        /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px"
        }, children: [
          /* @__PURE__ */ r.jsx("span", { style: { fontSize: "20px" }, children: "🗳️" }),
          /* @__PURE__ */ r.jsx("span", { style: {
            fontWeight: 600,
            color: "#f59e0b",
            fontSize: "16px"
          }, children: "Vote" }),
          l && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
            /* @__PURE__ */ r.jsx("span", { style: { color: "#6b7280" }, children: "by" }),
            /* @__PURE__ */ r.jsx("span", { style: {
              color: l.color,
              fontWeight: 600
            }, children: l.name })
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: {
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }, children: m.map((j) => {
          const S = p.includes(j.id), T = g(j.id), $ = n || u;
          return /* @__PURE__ */ r.jsxs(
            "div",
            {
              onClick: () => b(j.id),
              style: {
                padding: "12px 16px",
                borderRadius: "8px",
                border: S ? "2px solid #f59e0b" : "2px solid rgba(255, 255, 255, 0.1)",
                background: S ? "rgba(245, 158, 11, 0.1)" : "rgba(255, 255, 255, 0.03)",
                cursor: u ? "default" : "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden"
              },
              children: [
                $ && /* @__PURE__ */ r.jsx("div", { style: {
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${T}%`,
                  background: "rgba(245, 158, 11, 0.2)",
                  transition: "width 0.5s ease"
                } }),
                /* @__PURE__ */ r.jsxs("div", { style: {
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }, children: [
                  /* @__PURE__ */ r.jsxs("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }, children: [
                    /* @__PURE__ */ r.jsx("div", { style: {
                      width: "20px",
                      height: "20px",
                      borderRadius: s ? "4px" : "50%",
                      border: S ? "2px solid #f59e0b" : "2px solid #6b7280",
                      background: S ? "#f59e0b" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }, children: S && /* @__PURE__ */ r.jsx("span", { style: { color: "#fff", fontSize: "12px" }, children: "✓" }) }),
                    /* @__PURE__ */ r.jsx("span", { style: {
                      color: S ? "#f59e0b" : "#e5e7eb",
                      fontWeight: S ? 600 : 400
                    }, children: j.label })
                  ] }),
                  (n || u) && /* @__PURE__ */ r.jsxs("span", { style: {
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
            j.id
          );
        }) }),
        s && p.length > 0 && !u && /* @__PURE__ */ r.jsxs(
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
        (n || u) && k > 0 && /* @__PURE__ */ r.jsxs("div", { style: {
          marginTop: "12px",
          textAlign: "center",
          fontSize: "12px",
          color: "#6b7280"
        }, children: [
          k,
          " vote",
          k !== 1 ? "s" : "",
          " total"
        ] })
      ]
    }
  );
}, Wt = {
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
function Ft(e, t) {
  let n = e.replace(/^```\w*\n?/, "").replace(/\n?```$/, "").trim();
  const i = [
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
  ].map(([o, l]) => ({
    pattern: o,
    className: l
  }));
  for (const { pattern: o, className: l } of i)
    n = n.replace(o, (c) => `<span class="${l}">${c}</span>`);
  return n;
}
const zt = ({
  content: e,
  language: t = "plain",
  showLineNumbers: n = !0,
  showCopyButton: s = !0,
  theme: i = "dark",
  maxHeight: o,
  onCopy: l,
  councilor: c,
  className: a,
  style: p
}) => {
  const [f, u] = C(!1), x = H(() => e.replace(/^```\w*\n?/, "").replace(/\n?```$/, "").trim(), [e]), h = H(() => Wt[t.toLowerCase()] || t.toUpperCase(), [t]), y = H(() => x.split(`
`), [x]), m = L(async () => {
    try {
      await navigator.clipboard.writeText(x), u(!0), setTimeout(() => u(!1), 2e3), l && l();
    } catch (v) {
      console.error("Failed to copy:", v);
    }
  }, [x, l]), k = i === "dark" ? "#1e1e1e" : "#f5f5f5", b = i === "dark" ? "#d4d4d4" : "#24292e";
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: a,
      style: {
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${i === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        ...p
      },
      children: [
        /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          background: i === "dark" ? "#2d2d2d" : "#eaeaea",
          borderBottom: `1px solid ${i === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`
        }, children: [
          /* @__PURE__ */ r.jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }, children: [
            /* @__PURE__ */ r.jsx("span", { style: { fontSize: "16px" }, children: "💻" }),
            /* @__PURE__ */ r.jsx("span", { style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "#8b5cf6",
              textTransform: "uppercase"
            }, children: h })
          ] }),
          s && /* @__PURE__ */ r.jsx(
            "button",
            {
              onClick: m,
              style: {
                padding: "4px 8px",
                borderRadius: "4px",
                border: "none",
                background: f ? "#10b981" : "rgba(255,255,255,0.1)",
                color: f ? "#fff" : b,
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
        /* @__PURE__ */ r.jsx("div", { style: {
          background: k,
          maxHeight: o,
          overflow: "auto",
          padding: "12px"
        }, children: /* @__PURE__ */ r.jsx("pre", { style: {
          margin: 0,
          fontFamily: 'Monaco, Menlo, "Courier New", monospace',
          fontSize: "13px",
          lineHeight: 1.5,
          color: b
        }, children: /* @__PURE__ */ r.jsx("code", { children: y.map((v, g) => /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          gap: "16px"
        }, children: [
          n && /* @__PURE__ */ r.jsx("span", { style: {
            color: "#6b7280",
            userSelect: "none",
            minWidth: "24px",
            textAlign: "right",
            flexShrink: 0
          }, children: g + 1 }),
          /* @__PURE__ */ r.jsx("span", { dangerouslySetInnerHTML: { __html: Ft(v) } })
        ] }, g)) }) }) }),
        c && /* @__PURE__ */ r.jsxs("div", { style: {
          padding: "8px 12px",
          background: i === "dark" ? "#2d2d2d" : "#eaeaea",
          borderTop: `1px solid ${i === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "12px",
          color: "#9ca3af"
        }, children: [
          /* @__PURE__ */ r.jsx("span", { children: "Shared by" }),
          /* @__PURE__ */ r.jsx("span", { style: {
            color: c.color,
            fontWeight: 600
          }, children: c.name })
        ] })
      ]
    }
  );
};
function Bt(e) {
  const t = e.split(`
`).filter((i) => i.trim() && /^\|/.test(i));
  if (t.length < 2)
    return { headers: [], rows: [] };
  const n = t[0].split("|").filter((i) => i.trim() && !/^-+$/.test(i.trim())).map((i) => i.trim()), s = [];
  for (let i = 1; i < t.length; i++) {
    if (/^\|[-:\s]+\|$/.test(t[i])) continue;
    const o = t[i].split("|").filter((l) => l.trim()).map((l) => l.trim());
    o.length > 0 && s.push(o);
  }
  return { headers: n, rows: s };
}
const Yt = ({
  content: e,
  headers: t,
  rows: n,
  columns: s,
  data: i,
  sortable: o = !0,
  striped: l = !0,
  hoverable: c = !0,
  maxHeight: a,
  councilor: p,
  className: f,
  style: u
}) => {
  const [x, h] = C(null), [y, m] = C("asc"), { headers: k, rows: b } = H(() => n && t ? { headers: t, rows: n } : e ? Bt(e) : { headers: [], rows: [] }, [e, t, n]), v = H(() => s || k.map((S, T) => ({
    key: `col-${T}`,
    header: S,
    sortable: o
  })), [k, s, o]), g = H(() => {
    if (!x) return b;
    const S = v.findIndex((T) => T.key === x);
    return S === -1 ? b : [...b].sort((T, $) => {
      const I = T[S] || "", E = $[S] || "", M = parseFloat(I), P = parseFloat(E);
      if (!isNaN(M) && !isNaN(P))
        return y === "asc" ? M - P : P - M;
      const z = I.localeCompare(E);
      return y === "asc" ? z : -z;
    });
  }, [b, x, y, v]), j = (S) => {
    o && (x === S ? m((T) => T === "asc" ? "desc" : "asc") : (h(S), m("asc")));
  };
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: f,
      style: {
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(16, 185, 129, 0.2)",
        background: "rgba(16, 185, 129, 0.03)",
        ...u
      },
      children: [
        /* @__PURE__ */ r.jsxs("div", { style: {
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }, children: [
          /* @__PURE__ */ r.jsx("span", { style: { fontSize: "18px" }, children: "📊" }),
          /* @__PURE__ */ r.jsx("span", { style: {
            fontWeight: 600,
            color: "#10b981",
            fontSize: "14px"
          }, children: "Table" }),
          p && /* @__PURE__ */ r.jsxs("span", { style: {
            color: "#6b7280",
            fontSize: "12px"
          }, children: [
            "from ",
            p.name
          ] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { style: {
          maxHeight: a,
          overflow: "auto"
        }, children: [
          /* @__PURE__ */ r.jsxs("table", { style: {
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px"
          }, children: [
            /* @__PURE__ */ r.jsx("thead", { children: /* @__PURE__ */ r.jsx("tr", { style: {
              background: "rgba(255,255,255,0.05)",
              position: "sticky",
              top: 0
            }, children: v.map((S, T) => /* @__PURE__ */ r.jsxs(
              "th",
              {
                onClick: () => j(S.key),
                style: {
                  padding: "10px 12px",
                  textAlign: S.align || "left",
                  fontWeight: 600,
                  color: x === S.key ? "#10b981" : "#9ca3af",
                  cursor: o ? "pointer" : "default",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid rgba(255,255,255,0.1)"
                },
                children: [
                  S.header,
                  o && /* @__PURE__ */ r.jsx("span", { style: { marginLeft: "4px", opacity: x === S.key ? 1 : 0.3 }, children: x === S.key ? y === "asc" ? "↑" : "↓" : "↕" })
                ]
              },
              S.key
            )) }) }),
            /* @__PURE__ */ r.jsx("tbody", { children: g.map((S, T) => /* @__PURE__ */ r.jsx(
              "tr",
              {
                style: {
                  background: l && T % 2 === 1 ? "rgba(255,255,255,0.02)" : "transparent",
                  transition: "background 0.15s ease"
                },
                onMouseEnter: ($) => c && ($.currentTarget.style.background = "rgba(16, 185, 129, 0.1)"),
                onMouseLeave: ($) => c && ($.currentTarget.style.background = l && T % 2 === 1 ? "rgba(255,255,255,0.02)" : "transparent"),
                children: S.map(($, I) => {
                  const E = v[I];
                  return /* @__PURE__ */ r.jsx(
                    "td",
                    {
                      style: {
                        padding: "10px 12px",
                        textAlign: E.align || "left",
                        color: "#e5e7eb",
                        borderBottom: "1px solid rgba(255,255,255,0.05)"
                      },
                      children: $
                    },
                    I
                  );
                })
              },
              T
            )) })
          ] }),
          g.length === 0 && /* @__PURE__ */ r.jsx("div", { style: {
            padding: "24px",
            textAlign: "center",
            color: "#6b7280"
          }, children: "No data available" })
        ] })
      ]
    }
  );
}, ce = [
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
function Jt(e) {
  const t = [], n = /(\w+):\s*(\d+\.?\d*)/g;
  let s;
  for (; (s = n.exec(e)) !== null; )
    t.push({
      label: s[1],
      value: parseFloat(s[2])
    });
  return t;
}
function Ut({ data: e, showValues: t, height: n }) {
  const s = Math.max(...e.map((o) => o.value)), i = 100 / e.length;
  return /* @__PURE__ */ r.jsx("div", { style: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: n,
    padding: "20px 10px 40px"
  }, children: e.map((o, l) => {
    const c = o.value / s * (n - 60);
    return /* @__PURE__ */ r.jsxs(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: `${i}%`
        },
        children: [
          t && /* @__PURE__ */ r.jsx("div", { style: {
            color: "#9ca3af",
            fontSize: "11px",
            marginBottom: "4px"
          }, children: o.value }),
          /* @__PURE__ */ r.jsx("div", { style: {
            width: "70%",
            maxWidth: "60px",
            height: `${c}px`,
            background: `linear-gradient(to top, ${o.color || ce[l % ce.length]}, ${o.color || ce[l % ce.length]}aa)`,
            borderRadius: "4px 4px 0 0",
            transition: "height 0.5s ease"
          } }),
          /* @__PURE__ */ r.jsx("div", { style: {
            color: "#9ca3af",
            fontSize: "11px",
            marginTop: "8px",
            textAlign: "center",
            maxWidth: "80px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }, children: o.label })
        ]
      },
      l
    );
  }) });
}
function Vt({ data: e, showValues: t, height: n }) {
  const s = e.reduce((p, f) => p + f.value, 0), i = Math.min(n - 40, 200), o = i / 2, l = o - 10;
  let c = -90;
  const a = e.map((p, f) => {
    const u = p.value / s * 360, x = c;
    c += u;
    const h = x * Math.PI / 180, y = c * Math.PI / 180, m = o + l * Math.cos(h), k = o + l * Math.sin(h), b = o + l * Math.cos(y), v = o + l * Math.sin(y), g = u > 180 ? 1 : 0;
    return {
      path: `
      M ${o} ${o}
      L ${m} ${k}
      A ${l} ${l} 0 ${g} 1 ${b} ${v}
      Z
    `,
      color: p.color || ce[f % ce.length],
      point: p,
      percentage: Math.round(p.value / s * 100)
    };
  });
  return /* @__PURE__ */ r.jsxs("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    padding: "20px"
  }, children: [
    /* @__PURE__ */ r.jsx("svg", { width: i, height: i, children: a.map((p, f) => /* @__PURE__ */ r.jsx(
      "path",
      {
        d: p.path,
        fill: p.color,
        style: { transition: "opacity 0.2s ease" }
      },
      f
    )) }),
    t && /* @__PURE__ */ r.jsx("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    }, children: e.map((p, f) => /* @__PURE__ */ r.jsxs(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px"
        },
        children: [
          /* @__PURE__ */ r.jsx("div", { style: {
            width: "12px",
            height: "12px",
            borderRadius: "2px",
            background: p.color || ce[f % ce.length]
          } }),
          /* @__PURE__ */ r.jsx("span", { style: { color: "#e5e7eb" }, children: p.label }),
          /* @__PURE__ */ r.jsxs("span", { style: { color: "#6b7280" }, children: [
            Math.round(p.value / s * 100),
            "%"
          ] })
        ]
      },
      f
    )) })
  ] });
}
function Ht({ data: e, showValues: t, height: n }) {
  const s = A(null), i = Math.max(...e.map((c) => c.value)), o = Math.min(...e.map((c) => c.value)), l = i - o || 1;
  return N(() => {
    const c = s.current;
    if (!c) return;
    const a = c.getContext("2d");
    if (!a) return;
    const p = c.width, f = n - 40, u = 30;
    a.clearRect(0, 0, p, n), a.beginPath(), a.strokeStyle = "#8b5cf6", a.lineWidth = 2, e.forEach((x, h) => {
      const y = u + h / (e.length - 1) * (p - u * 2), m = u + (1 - (x.value - o) / l) * (f - u);
      h === 0 ? a.moveTo(y, m) : a.lineTo(y, m);
    }), a.stroke(), e.forEach((x, h) => {
      const y = u + h / (e.length - 1) * (p - u * 2), m = u + (1 - (x.value - o) / l) * (f - u);
      a.beginPath(), a.arc(y, m, 4, 0, Math.PI * 2), a.fillStyle = "#8b5cf6", a.fill();
    });
  }, [e, n, i, o, l]), /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx(
      "canvas",
      {
        ref: s,
        width: 300,
        height: n - 40,
        style: { width: "100%", height: `${n - 40}px` }
      }
    ),
    /* @__PURE__ */ r.jsx("div", { style: {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "10px"
    }, children: e.map((c, a) => /* @__PURE__ */ r.jsxs(
      "div",
      {
        style: {
          fontSize: "10px",
          color: "#6b7280",
          textAlign: "center"
        },
        children: [
          t && /* @__PURE__ */ r.jsx("div", { style: { color: "#9ca3af" }, children: c.value }),
          c.label
        ]
      },
      a
    )) })
  ] });
}
const Gt = ({
  content: e,
  data: t,
  chartType: n = "bar",
  title: s,
  showLegend: i = !0,
  showValues: o = !0,
  height: l = 250,
  councilor: c,
  className: a,
  style: p
}) => {
  const f = H(
    () => t || Jt(e || ""),
    [e, t]
  );
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: a,
      style: {
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(236, 72, 153, 0.2)",
        background: "rgba(236, 72, 153, 0.03)",
        ...p
      },
      children: [
        /* @__PURE__ */ r.jsxs("div", { style: {
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }, children: [
          /* @__PURE__ */ r.jsx("span", { style: { fontSize: "18px" }, children: "📈" }),
          /* @__PURE__ */ r.jsx("span", { style: {
            fontWeight: 600,
            color: "#ec4899",
            fontSize: "14px"
          }, children: s || "Chart" }),
          c && /* @__PURE__ */ r.jsxs("span", { style: {
            color: "#6b7280",
            fontSize: "12px",
            marginLeft: "auto"
          }, children: [
            "from ",
            c.name
          ] })
        ] }),
        f.length > 0 ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
          n === "bar" && /* @__PURE__ */ r.jsx(Ut, { data: f, showValues: o, height: l }),
          n === "pie" && /* @__PURE__ */ r.jsx(Vt, { data: f, showValues: o, height: l }),
          n === "line" && /* @__PURE__ */ r.jsx(Ht, { data: f, showValues: o, height: l })
        ] }) : /* @__PURE__ */ r.jsx("div", { style: {
          padding: "40px",
          textAlign: "center",
          color: "#6b7280"
        }, children: "No data available" })
      ]
    }
  );
};
function Kt(e, t) {
  const n = [], s = e.split(`
`);
  for (const i of s) {
    const o = i.trim();
    if (!o) continue;
    const l = o.match(/^\[([\s|x])\]\s*(.+)$/i);
    if (l) {
      n.push({
        text: l[2],
        checked: l[1].toLowerCase() === "x"
      });
      continue;
    }
    const c = o.match(/^(\d+)\.\s*(.+)$/);
    if (c) {
      n.push({
        id: c[1],
        text: c[2]
      });
      continue;
    }
    const a = o.match(/^[-*•]\s+(.+)$/);
    if (a) {
      n.push({
        text: a[1]
      });
      continue;
    }
  }
  return n;
}
const qt = ({
  content: e,
  items: t,
  style: n = "bullet",
  columns: s = 1,
  onItemClick: i,
  councilor: o,
  className: l,
  style: c
}) => {
  const a = H(
    () => t || Kt(e || ""),
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
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: l,
      style: {
        padding: "16px",
        borderRadius: "12px",
        background: "rgba(59, 130, 246, 0.05)",
        border: "1px solid rgba(59, 130, 246, 0.2)",
        ...c
      },
      children: [
        /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px"
        }, children: [
          /* @__PURE__ */ r.jsx("span", { style: { fontSize: "18px" }, children: "📋" }),
          /* @__PURE__ */ r.jsxs("span", { style: {
            fontWeight: 600,
            color: "#3b82f6",
            fontSize: "14px"
          }, children: [
            a.length,
            " item",
            a.length !== 1 ? "s" : ""
          ] }),
          o && /* @__PURE__ */ r.jsxs("span", { style: {
            color: "#6b7280",
            fontSize: "12px"
          }, children: [
            "from ",
            o.name
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: {
          display: s > 1 ? "grid" : "flex",
          gridTemplateColumns: `repeat(${s}, 1fr)`,
          flexDirection: "column",
          gap: "8px"
        }, children: a.map((f, u) => /* @__PURE__ */ r.jsxs(
          "div",
          {
            onClick: () => i == null ? void 0 : i(f, u),
            style: {
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "8px 12px",
              borderRadius: "8px",
              background: i ? "rgba(255,255,255,0.03)" : "transparent",
              cursor: i ? "pointer" : "default",
              transition: "background 0.2s ease"
            },
            children: [
              /* @__PURE__ */ r.jsx("div", { style: {
                flexShrink: 0,
                color: "#3b82f6",
                fontWeight: 600,
                minWidth: "24px"
              }, children: n === "checkbox" ? /* @__PURE__ */ r.jsx("div", { style: {
                width: "18px",
                height: "18px",
                borderRadius: "4px",
                border: `2px solid ${f.checked ? "#10b981" : "#6b7280"}`,
                background: f.checked ? "#10b981" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }, children: f.checked && /* @__PURE__ */ r.jsx("span", { style: { color: "#fff", fontSize: "10px" }, children: "✓" }) }) : p(u) }),
              /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
                /* @__PURE__ */ r.jsxs("div", { style: {
                  color: f.checked !== void 0 && f.checked ? "#9ca3af" : "#e5e7eb",
                  textDecoration: f.checked ? "line-through" : "none",
                  fontSize: "14px",
                  lineHeight: 1.4
                }, children: [
                  f.icon && /* @__PURE__ */ r.jsx("span", { style: { marginRight: "6px" }, children: f.icon }),
                  f.text
                ] }),
                f.subtext && /* @__PURE__ */ r.jsx("div", { style: {
                  color: "#6b7280",
                  fontSize: "12px",
                  marginTop: "2px"
                }, children: f.subtext })
              ] })
            ]
          },
          f.id || u
        )) })
      ]
    }
  );
};
function Xt(e) {
  const t = [], n = e.split(`
`);
  for (const s of n) {
    const i = s.trim();
    if (/^(in summary|to summarize|in conclusion|key points|bottom line):?/i.test(i))
      continue;
    const o = i.replace(/^[-*•]\s*/, "").replace(/^\d+\.\s*/, "").trim();
    o && o.length > 5 && t.push(o);
  }
  return t;
}
const Qt = ({
  content: e,
  points: t,
  title: n = "Summary",
  collapsible: s = !1,
  defaultExpanded: i = !0,
  onPointClick: o,
  councilor: l,
  className: c,
  style: a
}) => {
  const [p, f] = le.useState(i), u = H(
    () => t || Xt(e),
    [e, t]
  );
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: c,
      style: {
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        background: "rgba(99, 102, 241, 0.03)",
        ...a
      },
      children: [
        /* @__PURE__ */ r.jsxs(
          "div",
          {
            onClick: s ? () => f((x) => !x) : void 0,
            style: {
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: s ? "pointer" : "default",
              background: "rgba(99, 102, 241, 0.05)",
              borderBottom: p ? "1px solid rgba(255,255,255,0.1)" : "none"
            },
            children: [
              /* @__PURE__ */ r.jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }, children: [
                /* @__PURE__ */ r.jsx("span", { style: { fontSize: "18px" }, children: "📝" }),
                /* @__PURE__ */ r.jsx("span", { style: {
                  fontWeight: 600,
                  color: "#6366f1",
                  fontSize: "14px"
                }, children: n }),
                /* @__PURE__ */ r.jsxs("span", { style: {
                  color: "#6b7280",
                  fontSize: "12px",
                  marginLeft: "8px"
                }, children: [
                  u.length,
                  " point",
                  u.length !== 1 ? "s" : ""
                ] })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }, children: [
                l && /* @__PURE__ */ r.jsxs("span", { style: {
                  color: "#6b7280",
                  fontSize: "12px"
                }, children: [
                  "from ",
                  l.name
                ] }),
                s && /* @__PURE__ */ r.jsx("span", { style: {
                  color: "#6b7280",
                  fontSize: "14px",
                  transition: "transform 0.2s ease",
                  transform: p ? "rotate(180deg)" : "rotate(0deg)"
                }, children: "▼" })
              ] })
            ]
          }
        ),
        p && /* @__PURE__ */ r.jsxs("div", { style: {
          padding: "16px"
        }, children: [
          u.map((x, h) => /* @__PURE__ */ r.jsxs(
            "div",
            {
              onClick: () => o == null ? void 0 : o(x, h),
              style: {
                display: "flex",
                gap: "12px",
                padding: "10px 12px",
                marginBottom: h < u.length - 1 ? "8px" : 0,
                borderRadius: "8px",
                background: "rgba(255,255,255,0.03)",
                cursor: o ? "pointer" : "default",
                transition: "background 0.2s ease"
              },
              children: [
                /* @__PURE__ */ r.jsx("div", { style: {
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
                }, children: h + 1 }),
                /* @__PURE__ */ r.jsx("div", { style: {
                  flex: 1,
                  color: "#e5e7eb",
                  fontSize: "14px",
                  lineHeight: 1.5
                }, children: x })
              ]
            },
            h
          )),
          u.length === 0 && /* @__PURE__ */ r.jsx("div", { style: {
            color: "#6b7280",
            textAlign: "center",
            padding: "20px"
          }, children: "No summary points available" })
        ] })
      ]
    }
  );
}, Zt = ({
  content: e,
  answer: t,
  showAnswer: n = !1,
  allowReveal: s = !0,
  onReveal: i,
  councilor: o,
  className: l,
  style: c
}) => {
  const [a, p] = C(n || !s), f = () => {
    a || (p(!0), i && i());
  };
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: l,
      style: {
        borderRadius: "16px",
        overflow: "hidden",
        ...c
      },
      children: [
        /* @__PURE__ */ r.jsx("div", { style: {
          padding: "16px 20px",
          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)",
          borderRadius: "16px 16px 0 0",
          border: "1px solid rgba(6, 182, 212, 0.3)",
          borderBottom: t && !a ? "none" : "1px solid rgba(6, 182, 212, 0.3)"
        }, children: /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          alignItems: "flex-start",
          gap: "12px"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: {
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
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ r.jsxs("div", { style: {
              color: "#06b6d4",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "6px"
            }, children: [
              "Question",
              o && /* @__PURE__ */ r.jsxs("span", { style: {
                color: "#6b7280",
                fontWeight: 400,
                marginLeft: "8px"
              }, children: [
                "from ",
                o.name
              ] })
            ] }),
            /* @__PURE__ */ r.jsx("div", { style: {
              color: "#e5e7eb",
              fontSize: "15px",
              lineHeight: 1.5,
              fontWeight: 500
            }, children: e })
          ] })
        ] }) }),
        t && /* @__PURE__ */ r.jsx("div", { style: {
          padding: "16px 20px",
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: a ? "0 0 16px 16px" : 0,
          border: "1px solid rgba(6, 182, 212, 0.3)",
          borderTop: a ? "none" : "1px dashed rgba(6, 182, 212, 0.3)",
          transition: "all 0.3s ease"
        }, children: a ? /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          alignItems: "flex-start",
          gap: "12px"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: {
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
          /* @__PURE__ */ r.jsxs("div", { style: { flex: 1 }, children: [
            /* @__PURE__ */ r.jsx("div", { style: {
              color: "#10b981",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "6px"
            }, children: "Answer" }),
            /* @__PURE__ */ r.jsx("div", { style: {
              color: "#e5e7eb",
              fontSize: "14px",
              lineHeight: 1.6
            }, children: t })
          ] })
        ] }) : s ? /* @__PURE__ */ r.jsxs(
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
              /* @__PURE__ */ r.jsx("span", { children: "👆" }),
              /* @__PURE__ */ r.jsx("span", { children: "Click to reveal answer" })
            ]
          }
        ) : /* @__PURE__ */ r.jsx("div", { style: {
          color: "#6b7280",
          textAlign: "center",
          fontSize: "13px",
          fontStyle: "italic"
        }, children: "Answer hidden" }) })
      ]
    }
  );
}, er = ({
  content: e,
  councilor: t,
  showIcon: n = !0,
  timestamp: s,
  className: i,
  style: o
}) => {
  const l = s == null ? void 0 : s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: i,
      style: {
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        ...o
      },
      children: [
        t && /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: {
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
          /* @__PURE__ */ r.jsx("span", { style: {
            fontWeight: 600,
            color: t.color,
            fontSize: "14px"
          }, children: t.name }),
          l && /* @__PURE__ */ r.jsx("span", { style: {
            fontSize: "11px",
            color: "#6b7280",
            marginLeft: "auto"
          }, children: l })
        ] }),
        /* @__PURE__ */ r.jsx("div", { style: {
          fontSize: "15px",
          lineHeight: 1.5,
          color: "#e5e7eb",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }, children: e })
      ]
    }
  );
}, Pr = ({
  content: e,
  councilor: t,
  streaming: n = !1,
  showIcon: s = !0,
  timestamp: i,
  className: o,
  style: l
}) => {
  const c = H(() => Ot(e), [e]), a = c.type, p = s ? Lt(a) : null, f = Mt(a), u = L(() => {
    var x, h, y, m;
    switch (a) {
      case "vote":
        return /* @__PURE__ */ r.jsx(Dt, { content: e, councilor: t });
      case "code":
        return /* @__PURE__ */ r.jsx(
          zt,
          {
            content: e,
            language: (x = c.metadata) == null ? void 0 : x.language,
            councilor: t
          }
        );
      case "list":
        return /* @__PURE__ */ r.jsx(
          qt,
          {
            content: e,
            style: (h = c.metadata) == null ? void 0 : h.style,
            councilor: t
          }
        );
      case "table":
        return /* @__PURE__ */ r.jsx(
          Yt,
          {
            content: e,
            headers: (y = c.metadata) == null ? void 0 : y.headers,
            councilor: t
          }
        );
      case "chart":
        return /* @__PURE__ */ r.jsx(
          Gt,
          {
            content: e,
            chartType: (m = c.metadata) == null ? void 0 : m.chartType,
            councilor: t
          }
        );
      case "question":
        return /* @__PURE__ */ r.jsx(
          Zt,
          {
            content: e,
            councilor: t
          }
        );
      case "summary":
        return /* @__PURE__ */ r.jsx(
          Qt,
          {
            content: e,
            councilor: t
          }
        );
      case "error":
        return /* @__PURE__ */ r.jsxs("div", { style: {
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(239, 68, 68, 0.1)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          color: "#fca5a5"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { marginBottom: "4px" }, children: "❌ Error" }),
          /* @__PURE__ */ r.jsx("div", { style: { color: "#e5e7eb" }, children: e })
        ] });
      case "warning":
        return /* @__PURE__ */ r.jsxs("div", { style: {
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(245, 158, 11, 0.1)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          color: "#fcd34d"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { marginBottom: "4px" }, children: "⚠️ Warning" }),
          /* @__PURE__ */ r.jsx("div", { style: { color: "#e5e7eb" }, children: e })
        ] });
      case "success":
        return /* @__PURE__ */ r.jsxs("div", { style: {
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          color: "#6ee7b7"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { marginBottom: "4px" }, children: "✅ Success" }),
          /* @__PURE__ */ r.jsx("div", { style: { color: "#e5e7eb" }, children: e })
        ] });
      case "info":
        return /* @__PURE__ */ r.jsxs("div", { style: {
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(59, 130, 246, 0.1)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          color: "#93c5fd"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: { marginBottom: "4px" }, children: "ℹ️ Info" }),
          /* @__PURE__ */ r.jsx("div", { style: { color: "#e5e7eb" }, children: e })
        ] });
      default:
        return /* @__PURE__ */ r.jsx(
          er,
          {
            content: e,
            councilor: t,
            showIcon: s,
            timestamp: i
          }
        );
    }
  }, [a, e, t, s, i, c]);
  return /* @__PURE__ */ r.jsxs("div", { className: o, style: l, children: [
    a !== "normal" && a !== "success" && a !== "error" && a !== "warning" && a !== "info" && /* @__PURE__ */ r.jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "6px",
      fontSize: "12px",
      color: f
    }, children: [
      /* @__PURE__ */ r.jsx("span", { children: p }),
      /* @__PURE__ */ r.jsx("span", { style: {
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontWeight: 600
      }, children: a })
    ] }),
    u()
  ] });
}, Nr = ({
  content: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: s = 22,
  speed: i = 20,
  showCursor: o = !0,
  onComplete: l,
  onProgress: c,
  councilor: a,
  className: p,
  style: f
}) => {
  const [u, x] = C(""), [h, y] = C(!0), [m, k] = C(0), b = A(null);
  return N(() => {
    if (!e) {
      x("");
      return;
    }
    x(""), y(!0), k(0);
    let v = 0;
    const g = setInterval(() => {
      v < e.length ? (v++, x(e.slice(0, v)), k(v / e.length), c && c(v / e.length)) : (y(!1), clearInterval(g), l && l());
    }, i);
    return () => clearInterval(g);
  }, [e, i, l, c]), N(() => {
    const v = b.current;
    if (!v || !u) return;
    const g = v.getContext("2d");
    if (!g) return;
    g.font = t;
    const j = g.measureText(u);
    v.width = Math.min(n, j.width + 40), v.height = s * 3, g.clearRect(0, 0, v.width, v.height);
    const S = u.split(" ");
    let T = "", $ = s;
    const I = 20;
    for (const E of S) {
      const M = T + E + " ";
      if (g.measureText(M).width > n - 40 && T) {
        if (g.fillText(T, I, $), T = E + " ", $ += s, $ > v.height) break;
      } else
        T = M;
    }
    $ <= v.height && g.fillText(T, I, $);
  }, [u, t, n, s]), /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: p,
      style: {
        padding: "16px",
        borderRadius: "12px",
        background: a ? `linear-gradient(135deg, ${a.color}10 0%, rgba(255,255,255,0.05) 100%)` : "rgba(255, 255, 255, 0.05)",
        border: a ? `1px solid ${a.color}30` : "1px solid rgba(255, 255, 255, 0.1)",
        ...f
      },
      children: [
        a && /* @__PURE__ */ r.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px"
        }, children: [
          /* @__PURE__ */ r.jsx("div", { style: {
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: a.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 600,
            color: "#fff"
          }, children: a.avatar || a.name.charAt(0) }),
          /* @__PURE__ */ r.jsx("span", { style: {
            fontWeight: 600,
            color: a.color,
            fontSize: "14px"
          }, children: a.name }),
          h && /* @__PURE__ */ r.jsxs("span", { style: {
            marginLeft: "auto",
            fontSize: "11px",
            color: "#6b7280",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }, children: [
            /* @__PURE__ */ r.jsx("span", { style: {
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#10b981",
              animation: "pulse 1s infinite"
            } }),
            "Streaming"
          ] })
        ] }),
        h && /* @__PURE__ */ r.jsx("div", { style: {
          height: "2px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "1px",
          marginBottom: "12px",
          overflow: "hidden"
        }, children: /* @__PURE__ */ r.jsx("div", { style: {
          height: "100%",
          width: `${m * 100}%`,
          background: (a == null ? void 0 : a.color) || "#8b5cf6",
          transition: "width 0.1s linear"
        } }) }),
        /* @__PURE__ */ r.jsxs("div", { style: {
          font: t,
          color: "#e5e7eb",
          lineHeight: `${s}px`,
          maxWidth: `${n}px`,
          minHeight: `${s * 2}px`
        }, children: [
          u,
          h && o && /* @__PURE__ */ r.jsx("span", { style: {
            color: (a == null ? void 0 : a.color) || "#8b5cf6",
            animation: "blink 1s infinite"
          }, children: "▋" })
        ] }),
        /* @__PURE__ */ r.jsx(
          "canvas",
          {
            ref: b,
            style: { display: "none" }
          }
        ),
        /* @__PURE__ */ r.jsx("style", { children: `
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
function Xe(e, t, n) {
  const {
    colors: s = ["#8b5cf6", "#a78bfa", "#c4b5fd"],
    minSize: i = 2,
    maxSize: o = 6,
    minLife: l = 50,
    maxLife: c = 150,
    minSpeed: a = 0.5,
    maxSpeed: p = 3,
    gravity: f = 0.1,
    friction: u = 0.99,
    decay: x = 0.98,
    emitX: h,
    emitY: y,
    emitRadius: m = 50
  } = e, k = Math.random() * Math.PI * 2, b = a + Math.random() * (p - a), v = h !== void 0 ? h + (Math.random() - 0.5) * m * 2 : Math.random() * t, g = y !== void 0 ? y + (Math.random() - 0.5) * m * 2 : Math.random() * n;
  return {
    x: v,
    y: g,
    vx: Math.cos(k) * b,
    vy: Math.sin(k) * b,
    life: l + Math.random() * (c - l),
    maxLife: l + Math.random() * (c - l),
    size: i + Math.random() * (o - i),
    color: s[Math.floor(Math.random() * s.length)]
  };
}
const Ar = ({
  count: e = 50,
  colors: t = ["#8b5cf6", "#a78bfa", "#c4b5fd"],
  minSize: n = 2,
  maxSize: s = 6,
  minLife: i = 50,
  maxLife: o = 150,
  minSpeed: l = 0.5,
  maxSpeed: c = 3,
  gravity: a = 0.1,
  friction: p = 0.99,
  decay: f = 0.98,
  emitX: u,
  emitY: x,
  emitRadius: h = 50,
  width: y = 300,
  height: m = 200,
  className: k,
  style: b
}) => {
  const v = A(null), g = A([]), j = A(null);
  return N(() => {
    g.current = Array.from(
      { length: e },
      () => Xe(
        { colors: t, minSize: n, maxSize: s, minLife: i, maxLife: o, minSpeed: l, maxSpeed: c, gravity: a, friction: p, decay: f, emitX: u, emitY: x, emitRadius: h },
        y,
        m
      )
    );
  }, [e, t, n, s, i, o, l, c, a, p, f, u, x, h, y, m]), N(() => {
    const S = v.current;
    if (!S) return;
    const T = S.getContext("2d");
    if (!T) return;
    const $ = () => {
      T.clearRect(0, 0, y, m), g.current.forEach((I, E) => {
        if (I.vy += a, I.vx *= p, I.vy *= p, I.x += I.vx, I.y += I.vy, I.life--, I.life <= 0) {
          g.current[E] = Xe(
            { colors: t, minSize: n, maxSize: s, minLife: i, maxLife: o, minSpeed: l, maxSpeed: c, gravity: a, friction: p, decay: f, emitX: u, emitY: x, emitRadius: h },
            y,
            m
          );
          return;
        }
        const M = Math.min(I.life / I.maxLife * f, 1);
        T.beginPath(), T.arc(I.x, I.y, I.size, 0, Math.PI * 2), T.fillStyle = I.color, T.globalAlpha = M, T.fill(), T.globalAlpha = 1;
      }), j.current = requestAnimationFrame($);
    };
    return $(), () => {
      j.current && cancelAnimationFrame(j.current);
    };
  }, [y, m, t, n, s, i, o, l, c, a, p, f, u, x, h]), /* @__PURE__ */ r.jsx(
    "canvas",
    {
      ref: v,
      width: y,
      height: m,
      className: k,
      style: {
        display: "block",
        borderRadius: "8px",
        ...b
      }
    }
  );
}, Or = ({
  colors: e = ["#8b5cf6", "#06b6d4", "#ec4899", "#f59e0b"],
  speed: t = 0.5,
  blendMode: n = "screen",
  opacity: s = 0.6,
  width: i = "100%",
  height: o = 200,
  className: l,
  style: c
}) => {
  const a = A(null), p = A(0), f = A(null), u = H(() => [
    { x: 0.2, y: 0.3, vx: 1e-3, vy: 1e-3 },
    { x: 0.7, y: 0.6, vx: -1e-3, vy: 15e-4 },
    { x: 0.5, y: 0.8, vx: 12e-4, vy: -1e-3 },
    { x: 0.3, y: 0.5, vx: -1e-3, vy: -12e-4 }
  ], []);
  return N(() => {
    const x = a.current;
    if (!x) return;
    const h = x.getContext("2d");
    if (!h) return;
    let y = x.width, m = x.height;
    const k = () => {
      h.clearRect(0, 0, y, m), p.current += t * 0.01, u.forEach((b, v) => {
        b.x += b.vx, b.y += b.vy, (b.x < 0 || b.x > 1) && (b.vx *= -1), (b.y < 0 || b.y > 1) && (b.vy *= -1);
        const g = b.x + Math.sin(p.current * (v + 1)) * 0.1, j = b.y + Math.cos(p.current * (v + 1)) * 0.1, S = g * y, T = j * m, $ = Math.min(y, m) * 0.4, I = h.createRadialGradient(
          S,
          T,
          0,
          S,
          T,
          $
        );
        I.addColorStop(0, e[v % e.length]), I.addColorStop(1, "transparent"), h.globalCompositeOperation = n, h.globalAlpha = s * 0.5, h.fillStyle = I, h.fillRect(0, 0, y, m);
      }), h.globalCompositeOperation = "source-over", h.globalAlpha = 1, f.current = requestAnimationFrame(k);
    };
    return k(), () => {
      f.current && cancelAnimationFrame(f.current);
    };
  }, [e, t, n, s, u]), /* @__PURE__ */ r.jsx(
    "canvas",
    {
      ref: a,
      width: typeof i == "number" ? i : 800,
      height: typeof o == "number" ? o : 200,
      className: l,
      style: {
        width: typeof i == "string" ? i : void 0,
        height: typeof o == "string" ? o : void 0,
        display: "block",
        borderRadius: "12px",
        ...c
      }
    }
  );
}, Mr = ({
  children: e,
  color: t = "#8b5cf6",
  intensity: n = 0.8,
  blurRadius: s = 20,
  borderRadius: i = 12,
  animate: o = !0,
  speed: l = 2,
  className: c,
  style: a
}) => {
  const [p, f] = C(0);
  N(() => {
    if (!o) return;
    const x = setInterval(() => {
      f((h) => (h + l) % 360);
    }, 50);
    return () => clearInterval(x);
  }, [o, l]);
  const u = H(() => {
    if (!o) return t;
    const x = t.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    return x ? `hsl(${(parseInt(x[1]) + p) % 360}, ${x[2]}%, ${x[3]}%)` : t;
  }, [t, o, p]);
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: c,
      style: {
        position: "relative",
        borderRadius: `${i}px`,
        padding: "2px",
        background: `linear-gradient(135deg, ${u}80, ${u}40)`,
        boxShadow: `
          0 0 ${s}px ${u}${Math.round(n * 255).toString(16).padStart(2, "0")},
          inset 0 0 ${s / 2}px ${u}40
        `,
        ...a
      },
      children: [
        /* @__PURE__ */ r.jsx("div", { style: {
          borderRadius: `${i - 2}px`,
          background: "rgba(15, 15, 25, 0.95)",
          height: "100%",
          width: "100%"
        }, children: e }),
        o && /* @__PURE__ */ r.jsx(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              borderRadius: `${i}px`,
              background: `conic-gradient(from ${p}deg, transparent, ${u}40, transparent)`,
              opacity: 0.3,
              animation: `spin ${10 / l}s linear infinite`,
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ r.jsx("style", { children: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      ` })
      ]
    }
  );
}, Ee = ({
  width: e = "100%",
  height: t = 20,
  speed: n = 1.5,
  color: s = "#3b82f6",
  gradientWidth: i = 200,
  borderRadius: o = 4,
  className: l,
  style: c
}) => {
  const a = H(() => ({
    width: typeof e == "number" ? `${e}px` : e,
    height: typeof t == "number" ? `${t}px` : t,
    borderRadius: `${o}px`,
    background: `linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0.1) ${i / 2}px,
      rgba(255, 255, 255, 0.2) ${i}px,
      rgba(255, 255, 255, 0.1) ${i + i / 2}px,
      rgba(255, 255, 255, 0.03) ${i * 2}px
    )`,
    backgroundSize: `${i * 2}px 100%`,
    animation: `shimmer ${n}s ease-in-out infinite`,
    ...c
  }), [e, t, n, i, o, c]);
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx("div", { className: l, style: a }),
    /* @__PURE__ */ r.jsx("style", { children: `
        @keyframes shimmer {
          0% { background-position: ${-i * 2}px 0; }
          100% { background-position: ${i * 2}px 0; }
        }
      ` })
  ] });
}, Lr = ({
  variant: e = "text",
  lines: t = 3,
  lastLineWidth: n = "60%",
  spacing: s = 8,
  children: i,
  className: o,
  style: l
}) => e === "circular" ? /* @__PURE__ */ r.jsx(
  Ee,
  {
    width: (l == null ? void 0 : l.width) || 40,
    height: (l == null ? void 0 : l.height) || 40,
    borderRadius: "50%",
    className: o,
    style: l
  }
) : e === "rectangular" ? /* @__PURE__ */ r.jsx(
  Ee,
  {
    width: "100%",
    height: (l == null ? void 0 : l.height) || 100,
    borderRadius: 8,
    className: o,
    style: l
  }
) : /* @__PURE__ */ r.jsx(
  "div",
  {
    className: o,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: `${s}px`,
      ...l
    },
    children: Array.from({ length: t }).map((c, a) => /* @__PURE__ */ r.jsx(
      Ee,
      {
        width: a === t - 1 ? n : "100%",
        height: 16,
        borderRadius: 4
      },
      a
    ))
  }
), _r = ({
  content: e,
  font: t = "16px Inter, system-ui, sans-serif",
  maxWidth: n = 500,
  lineHeight: s = 22,
  speed: i = 20,
  autoStart: o = !0,
  showCursor: l = !0,
  cursorChar: c = "▋",
  cursorBlinkSpeed: a = 500,
  onComplete: p,
  onProgress: f,
  className: u,
  style: x
}) => {
  const [h, y] = C(""), [m, k] = C(o), [b, v] = C(0), { displayedText: g } = rr(e, { speed: i, autoStart: o, onComplete: p, onProgress: f });
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: u,
      style: {
        font: t,
        color: "#e5e7eb",
        lineHeight: `${s}px`,
        maxWidth: `${n}px`,
        ...x
      },
      children: [
        g,
        m && l && /* @__PURE__ */ r.jsx(tr, { char: c, blinkSpeed: a })
      ]
    }
  );
}, tr = ({
  char: e = "▋",
  blinkSpeed: t = 500,
  color: n = "currentColor"
}) => {
  const [s, i] = C(!0);
  return N(() => {
    const o = setInterval(() => {
      i((l) => !l);
    }, t);
    return () => clearInterval(o);
  }, [t]), /* @__PURE__ */ r.jsx(
    "span",
    {
      style: {
        opacity: s ? 1 : 0,
        color: n,
        transition: "opacity 0.1s"
      },
      children: e
    }
  );
};
function rr(e, t = {}) {
  const { speed: n = 20, autoStart: s = !0, onComplete: i, onProgress: o } = t, [l, c] = C(""), [a, p] = C(s), [f, u] = C(0), x = A(0), h = A(null);
  N(() => {
    if (!e) {
      c(""), p(!1);
      return;
    }
    return x.current = 0, c(""), u(0), p(s), s && (h.current = setInterval(() => {
      if (x.current < e.length) {
        x.current++, c(e.slice(0, x.current));
        const b = x.current / e.length;
        u(b), o && o(b);
      } else
        p(!1), clearInterval(h.current), i && i();
    }, n)), () => {
      h.current && clearInterval(h.current);
    };
  }, [e, n, s, i, o]);
  const y = L(() => {
    x.current >= e.length || (p(!0), h.current = setInterval(() => {
      if (x.current < e.length) {
        x.current++, c(e.slice(0, x.current));
        const b = x.current / e.length;
        u(b), o && o(b);
      } else
        p(!1), clearInterval(h.current), i && i();
    }, n));
  }, [e, n, i, o]), m = L(() => {
    p(!1), h.current && clearInterval(h.current);
  }, []), k = L(() => {
    m(), x.current = 0, c(""), u(0);
  }, [m]);
  return {
    displayedText: l,
    isStreaming: a,
    progress: f,
    start: y,
    pause: m,
    reset: k
  };
}
const Dr = ({
  count: e = 3,
  size: t = 8,
  color: n = "#8b5cf6",
  speed: s = 0.15,
  className: i,
  style: o
}) => {
  const [l, c] = C(0);
  return N(() => {
    const a = setInterval(() => {
      c((p) => (p + 1) % e);
    }, s * 1e3);
    return () => clearInterval(a);
  }, [e, s]), /* @__PURE__ */ r.jsx(
    "div",
    {
      className: i,
      style: {
        display: "flex",
        gap: `${t / 2}px`,
        alignItems: "center",
        ...o
      },
      children: Array.from({ length: e }).map((a, p) => /* @__PURE__ */ r.jsx(
        "div",
        {
          style: {
            width: `${t}px`,
            height: `${t}px`,
            borderRadius: "50%",
            background: n,
            opacity: l === p ? 1 : 0.3,
            transform: l === p ? "scale(1.2)" : "scale(1)",
            transition: `all ${s}s ease`,
            animation: l === p ? `pulse ${s}s ease infinite` : "none"
          }
        },
        p
      ))
    }
  );
}, Wr = ({
  size: e = 40,
  color: t = "#8b5cf6",
  strokeWidth: n = 3,
  className: s,
  style: i
}) => /* @__PURE__ */ r.jsx(
  "div",
  {
    className: s,
    style: {
      width: `${e}px`,
      height: `${e}px`,
      border: `${n}px solid ${t}20`,
      borderTopColor: t,
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      ...i
    },
    children: /* @__PURE__ */ r.jsx("style", { children: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1.2); }
          50% { opacity: 0.5; transform: scale(1); }
        }
      ` })
  }
), Fr = ({
  count: e = 5,
  width: t = 4,
  height: n = 24,
  gap: s = 4,
  color: i = "#8b5cf6",
  speed: o = 0.1,
  className: l,
  style: c
}) => /* @__PURE__ */ r.jsxs(
  "div",
  {
    className: l,
    style: {
      display: "flex",
      alignItems: "center",
      gap: `${s}px`,
      ...c
    },
    children: [
      Array.from({ length: e }).map((a, p) => /* @__PURE__ */ r.jsx(
        "div",
        {
          style: {
            width: `${t}px`,
            height: `${n}px`,
            background: i,
            borderRadius: "2px",
            animation: `bounce ${o}s ease-in-out infinite`,
            animationDelay: `${p * o}s`
          }
        },
        p
      )),
      /* @__PURE__ */ r.jsx("style", { children: `
        @keyframes bounce {
          0%, 100% { height: ${n * 0.4}px; }
          50% { height: ${n}px; }
        }
      ` })
    ]
  }
), zr = ({
  width: e = "100%",
  height: t = 20,
  color: n = "#8b5cf6",
  className: s,
  style: i
}) => /* @__PURE__ */ r.jsx(
  "div",
  {
    className: s,
    style: {
      width: typeof e == "number" ? `${e}px` : e,
      height: `${t}px`,
      background: `linear-gradient(90deg, ${n}40 0%, ${n} 50%, ${n}40 100%)`,
      backgroundSize: "200% 100%",
      borderRadius: "4px",
      animation: "shimmer 1.5s ease-in-out infinite",
      ...i
    },
    children: /* @__PURE__ */ r.jsx("style", { children: `
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      ` })
  }
), Br = ({
  size: e = 60,
  color: t = "#8b5cf6",
  className: n,
  style: s
}) => /* @__PURE__ */ r.jsx(
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
      ...s
    },
    children: /* @__PURE__ */ r.jsx("style", { children: `
        @keyframes orb {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
      ` })
  }
);
function Qe(e, t = {}) {
  const { font: n = "16px Inter, system-ui, sans-serif", maxWidth: s = 500, lineHeight: i = 22 } = t, [o, l] = C(null);
  return N(() => {
    if (!e) {
      l(null);
      return;
    }
    const a = document.createElement("canvas").getContext("2d");
    if (!a) return;
    a.font = n;
    const p = [], f = e.split(`
`);
    let u = i, x = 0;
    for (const h of f) {
      if (h.trim() === "") {
        u += i * 0.5;
        continue;
      }
      const y = h.split(" ");
      let m = "", k = 0;
      for (const b of y) {
        const v = a.measureText(b).width, g = m ? `${m} ${b}` : b, j = a.measureText(g).width;
        j > s && m ? (p.push({
          text: m,
          x: 0,
          y: u,
          width: k,
          baseline: i * 0.85
        }), x = Math.max(x, k), u += i, m = b, k = v) : (m = g, k = j);
      }
      m && (p.push({
        text: m,
        x: 0,
        y: u,
        width: k,
        baseline: i * 0.85
      }), x = Math.max(x, k), u += i);
    }
    l({
      height: u,
      lines: p,
      totalWidth: x
    });
  }, [e, n, s, i]), o;
}
function Yr(e, t = {}) {
  const { font: n = "16px Inter", maxWidth: s = 500, lineHeight: i = 22, speed: o = 20, autoStart: l = !0 } = t, [c, a] = C(""), [p, f] = C(l), [u, x] = C(0), h = A(e), y = A(0), m = A(null);
  N(() => {
    h.current = e, y.current = 0, a(""), x(0);
  }, [e]);
  const k = Qe(e, { font: n, maxWidth: s, lineHeight: i }), b = Qe(c, { font: n, maxWidth: s, lineHeight: i });
  N(() => {
    if (!(!p || !h.current))
      return m.current = setInterval(() => {
        y.current < h.current.length ? (y.current++, a(h.current.slice(0, y.current)), x(y.current / h.current.length)) : (f(!1), m.current && clearInterval(m.current));
      }, o), () => {
        m.current && clearInterval(m.current);
      };
  }, [p, o]);
  const v = L(() => f(!0), []), g = L(() => f(!1), []), j = L(() => {
    f(!1), y.current = 0, a(""), x(0);
  }, []);
  return {
    displayedText: c,
    isStreaming: p,
    progress: u,
    start: v,
    pause: g,
    reset: j,
    measurement: b,
    finalMeasurement: k,
    height: (k == null ? void 0 : k.height) ?? 0
  };
}
function Jr(e = {}) {
  const { width: t = 300, height: n = 150, devicePixelRatio: s = window.devicePixelRatio || 1, willReadFrequently: i = !1 } = e, o = A(null), [l, c] = C({
    width: t,
    height: n,
    context: null
  });
  return N(() => {
    const a = o.current;
    if (!a) return;
    const p = a.getContext("2d", { willReadFrequently: i });
    p && (a.width = t * s, a.height = n * s, a.style.width = `${t}px`, a.style.height = `${n}px`, p.scale(s, s), c({ width: t, height: n, context: p }));
  }, [t, n, s, i]), { canvasRef: o, ...l };
}
function Ze(e, t, n) {
  const {
    colors: s = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"],
    minSize: i = 2,
    maxSize: o = 6,
    minLife: l = 50,
    maxLife: c = 150,
    minSpeed: a = 0.5,
    maxSpeed: p = 3,
    gravity: f = 0.1,
    friction: u = 0.99,
    decay: x = 0.98
  } = e, h = Math.random() * Math.PI * 2, y = a + Math.random() * (p - a);
  return {
    x: Math.random() * t,
    y: Math.random() * n,
    vx: Math.cos(h) * y,
    vy: Math.sin(h) * y,
    life: l + Math.random() * (c - l),
    maxLife: l + Math.random() * (c - l),
    size: i + Math.random() * (o - i),
    color: s[Math.floor(Math.random() * s.length)],
    gravity: f,
    friction: u,
    decay: x
  };
}
function Ur(e, t = {}) {
  const { count: n = 50 } = t, s = A([]), i = A(null);
  return N(() => {
    const o = e.current;
    if (!o) return;
    const l = o.width, c = o.height;
    s.current = Array.from(
      { length: n },
      () => Ze(t, l, c)
    );
  }, [n, t, e]), N(() => {
    const o = e.current;
    if (!o) return;
    const l = o.getContext("2d");
    if (!l) return;
    const c = o.width, a = o.height, p = () => {
      l.clearRect(0, 0, c, a), s.current.forEach((f, u) => {
        if (f.vy += f.gravity || 0.1, f.vx *= f.friction || 0.99, f.vy *= f.friction || 0.99, f.x += f.vx, f.y += f.vy, f.life--, f.life <= 0) {
          s.current[u] = Ze(t, c, a);
          return;
        }
        const x = f.life / f.maxLife;
        l.beginPath(), l.arc(f.x, f.y, f.size, 0, Math.PI * 2), l.fillStyle = f.color, l.globalAlpha = x * (f.decay || 0.98), l.fill(), l.globalAlpha = 1;
      }), i.current = requestAnimationFrame(p);
    };
    return p(), () => {
      i.current && cancelAnimationFrame(i.current);
    };
  }, [e, t]), s;
}
function Vr() {
  const e = L((s, i, o, l, c = {}) => {
    const {
      font: a = "16px Inter, sans-serif",
      color: p = "#ffffff",
      align: f = "left",
      baseline: u = "top",
      maxWidth: x
    } = c;
    s.font = a, s.fillStyle = p, s.textAlign = f, s.textBaseline = u, x !== void 0 ? s.fillText(i, o, l, x) : s.fillText(i, o, l);
  }, []), t = L((s, i, o) => (o && (s.font = o), s.measureText(i)), []), n = L((s, i, o, l, c, a, p = {}) => {
    const { font: f = "16px Inter", color: u = "#ffffff", align: x = "left" } = p;
    s.font = f, s.fillStyle = u, s.textAlign = x, s.textBaseline = "top";
    const h = i.split(`
`);
    let y = l;
    for (const m of h) {
      if (m.trim() === "") {
        y += a * 0.5;
        continue;
      }
      const k = m.split(" ");
      let b = "";
      for (const v of k) {
        const g = b ? `${b} ${v}` : v;
        s.measureText(g).width > c && b ? (s.fillText(b, o, y), b = v, y += a) : b = g;
      }
      b && (s.fillText(b, o, y), y += a);
    }
  }, []);
  return { drawText: e, measureText: t, drawWrappedText: n };
}
function nr(e, t = {}) {
  const {
    speed: n = 20,
    startDelay: s = 0,
    autoStart: i = !0,
    onComplete: o,
    onProgress: l
  } = t, [c, a] = C(""), [p, f] = C(!1), [u, x] = C(!1), [h, y] = C(0), m = A(e), k = A(0), b = A(null), v = A(null);
  N(() => {
    m.current = e, k.current = 0, a(""), y(0), x(!1);
  }, [e]);
  const g = L(() => {
    b.current && (clearInterval(b.current), b.current = null), v.current && (clearTimeout(v.current), v.current = null);
  }, []), j = L(() => {
    if (g(), !m.current) {
      f(!1);
      return;
    }
    f(!0), v.current = setTimeout(() => {
      b.current = setInterval(() => {
        if (k.current < m.current.length) {
          k.current++, a(m.current.slice(0, k.current));
          const E = k.current / m.current.length;
          y(E), l && l(E);
        } else
          g(), f(!1), x(!0), o && o();
      }, n);
    }, s);
  }, [n, s, g, o, l]), S = L(() => {
    u && $(), j();
  }, [u, j]), T = L(() => {
    g(), f(!1);
  }, [g]), $ = L(() => {
    g(), k.current = 0, a(""), y(0), f(!1), x(!1);
  }, [g]), I = L(() => {
    $(), setTimeout(() => j(), 100);
  }, [$, j]);
  return N(() => (i && e && !p && !u && j(), g), [e, i, p, u, j, g]), N(() => () => g(), [g]), {
    displayedText: c,
    isStreaming: p,
    isComplete: u,
    progress: h,
    start: S,
    pause: T,
    reset: $,
    restart: I
  };
}
function Hr(e, t = {}) {
  const { speed: n = 20, chunkDelay: s = 500, autoStart: i = !0, onComplete: o, onProgress: l } = t, [c, a] = C(0), [p, f] = C(""), [u, x] = C(!1), [h, y] = C(!1), [m, k] = C(0), b = e[c] || "", v = e.reduce((_, Y) => _ + Y.length, 0), {
    displayedText: g,
    isStreaming: j,
    isComplete: S,
    progress: T,
    start: $,
    pause: I,
    reset: E
  } = nr(b, { speed: n, autoStart: !1 });
  N(() => {
    f(g);
    let _ = 0;
    for (let W = 0; W < c; W++)
      _ += e[W].length;
    _ += Math.floor(g.length * T);
    const Y = v > 0 ? _ / v : 0;
    k(Y), l && l(Y);
  }, [g, T, c, e, v, l]), N(() => {
    if (S && c < e.length - 1) {
      const _ = setTimeout(() => {
        a((Y) => Y + 1);
      }, s);
      return () => clearTimeout(_);
    } else S && c === e.length - 1 && (y(!0), x(!1), o && o());
  }, [S, c, e.length, s, o]), N(() => {
    i && e.length > 0 && !u && !h && (x(!0), $());
  }, [e, i, u, h, $]);
  const M = L(() => {
    h ? (z(), setTimeout(() => {
      x(!0), $();
    }, 100)) : (x(!0), $());
  }, [h, z, $]), P = L(() => {
    x(!1), I();
  }, [I]), z = L(() => {
    a(0), f(""), y(!1), x(!1), k(0), E();
  }, [E]);
  return {
    displayedText: p,
    currentChunkIndex: c,
    isStreaming: u,
    isComplete: h,
    overallProgress: m,
    chunkProgress: T,
    start: M,
    pause: P,
    reset: z
  };
}
function Gr(e, t) {
  const [n, s] = C(e);
  return N(() => {
    const i = setTimeout(() => {
      s(e);
    }, t);
    return () => {
      clearTimeout(i);
    };
  }, [e, t]), n;
}
function Kr(e, t) {
  const n = A(null), s = A(e);
  N(() => {
    s.current = e;
  }, [e]);
  const i = L((...o) => {
    n.current && clearTimeout(n.current), n.current = setTimeout(() => {
      s.current(...o);
    }, t);
  }, [t]);
  return N(() => () => {
    n.current && clearTimeout(n.current);
  }, []), i;
}
function qr(e, t) {
  const [n, s] = C(e), i = A({});
  return N(() => {
    const o = { ...n };
    let l = !1;
    return Object.keys(e).forEach((c) => {
      const a = t[c] ?? 0, p = e[c], f = n[c];
      a === 0 ? (o[c] = p, l = !0) : p !== f && (i.current[c] && clearTimeout(i.current[c]), i.current[c] = setTimeout(() => {
        s((u) => ({ ...u, [c]: p }));
      }, a));
    }), l && s(o), () => {
      Object.values(i.current).forEach((c) => {
        c && clearTimeout(c);
      });
    };
  }, [e, t, n]), n;
}
function rt(e = {}) {
  const {
    threshold: t = 0,
    root: n = null,
    rootMargin: s = "0px",
    freezeOnceVisible: i = !1
  } = e, o = A(null), [l, c] = C(null), [a, p] = C(!1), f = A(!1), u = A(null);
  N(() => {
    i && a && (f.current = !0);
  }, [i, a]), N(() => {
    const y = o.current;
    if (!(!y || f.current))
      return u.current = new IntersectionObserver(
        ([m]) => {
          c(m), p(m.isIntersecting), i && m.isIntersecting && (f.current = !0, u.current && u.current.disconnect());
        },
        { threshold: t, root: n, rootMargin: s }
      ), u.current.observe(y), () => {
        u.current && u.current.disconnect();
      };
  }, [t, n, s, i]);
  const x = L(() => {
    o.current && u.current && u.current.observe(o.current);
  }, []), h = L(() => {
    o.current && u.current && u.current.unobserve(o.current);
  }, []);
  return {
    ref: o,
    isIntersecting: a,
    entry: l,
    observe: x,
    unobserve: h
  };
}
function Xr(e = {}) {
  const { fallbackSrc: t, ...n } = e, [s, i] = C(!1), [o, l] = C(!1), { ref: c, isIntersecting: a } = rt({
    threshold: 0.1,
    freezeOnceVisible: !0,
    ...n
  });
  N(() => {
    l(a);
  }, [a]);
  const p = L(() => {
    i(!0);
  }, []);
  return {
    ref: c,
    isInView: o,
    isLoaded: s,
    handleLoad: p,
    shouldLoad: a || !t
  };
}
function Qr(e, t = {}) {
  const { enabled: n = !0, distance: s = 100, ...i } = t, o = A(!1), { ref: l, isIntersecting: c } = rt({
    rootMargin: `${s}px`,
    threshold: 0,
    ...i
  });
  return N(() => {
    c && n && !o.current && (o.current = !0, e(), setTimeout(() => {
      o.current = !1;
    }, 1e3));
  }, [c, n, s, e]), { triggerRef: l };
}
function sr(e) {
  const t = e.toLowerCase().split("+");
  return {
    key: t[t.length - 1],
    ctrl: t.includes("ctrl"),
    alt: t.includes("alt"),
    shift: t.includes("shift"),
    meta: t.includes("meta") || t.includes("cmd") || t.includes("command")
  };
}
function ar(e, t) {
  const n = t.ctrl ? e.ctrlKey : !e.ctrlKey, s = t.alt ? e.altKey : !e.altKey, i = t.shift ? e.shiftKey : !e.shiftKey, o = t.meta ? e.metaKey : !e.metaKey;
  let l = e.key.toLowerCase(), c = t.key.toLowerCase();
  const a = {
    escape: "esc",
    arrowup: "up",
    arrowdown: "down",
    arrowleft: "left",
    arrowright: "right"
  };
  return l = a[l] || l, c = a[c] || c, l === c && n && s && i && o;
}
function Zr(e, t = {}) {
  const { enableOnInput: n = !1, preventDefault: s = !0 } = t, i = A(e);
  N(() => {
    i.current = e;
  }, [e]), N(() => {
    const o = (l) => {
      if (!n) {
        const c = l.target;
        if (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable) return;
      }
      for (const c of i.current) {
        const a = typeof c == "string" ? sr(c) : { key: c.key, ctrl: c.ctrl, alt: c.alt, shift: c.shift, meta: c.meta };
        if (ar(l, a)) {
          s && (l.preventDefault(), l.stopPropagation()), (typeof c == "string" ? () => {
          } : c.handler)(l);
          break;
        }
      }
    };
    return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
  }, [n, s]);
}
function en(e, t = {}) {
  const { enableOnInput: n = !1 } = t, [s, i] = C(!1);
  return N(() => {
    const o = (c) => {
      if (c.key.toLowerCase() === e.toLowerCase()) {
        if (!n) {
          const a = c.target;
          if (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.isContentEditable) return;
        }
        i(!0);
      }
    }, l = (c) => {
      c.key.toLowerCase() === e.toLowerCase() && i(!1);
    };
    return window.addEventListener("keydown", o), window.addEventListener("keyup", l), () => {
      window.removeEventListener("keydown", o), window.removeEventListener("keyup", l);
    };
  }, [e, n]), s;
}
function tn() {
  const [e, t] = C({});
  return N(() => {
    const n = (o) => {
      t((l) => ({
        ...l,
        [o.key.toLowerCase()]: !0
      }));
    }, s = (o) => {
      t((l) => ({
        ...l,
        [o.key.toLowerCase()]: !1
      }));
    }, i = () => {
      t({});
    };
    return window.addEventListener("keydown", n), window.addEventListener("keyup", s), window.addEventListener("blur", i), () => {
      window.removeEventListener("keydown", n), window.removeEventListener("keyup", s), window.removeEventListener("blur", i);
    };
  }, []), e;
}
function Pe(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function Ne(e, t) {
  return Math.atan2(t.y - e.y, t.x - e.x);
}
function rn(e, t = {}) {
  const {
    onTap: n,
    onDoubleTap: s,
    onPan: i,
    onPanStart: o,
    onPanEnd: l,
    onPinch: c,
    onRotate: a,
    onSwipe: p,
    threshold: f = {
      tap: 10,
      pan: 10,
      swipe: 50
    }
  } = t, [u, x] = C({
    isActive: !1,
    startPoint: null,
    currentPoint: null,
    delta: null,
    distance: 0,
    angle: 0,
    scale: 1,
    rotation: 0
  }), h = A(null), y = A(0), m = A(0), k = A(0), b = A(1), v = A(0), g = A({ x: 0, y: 0 }), j = A({ x: 0, y: 0 }), S = A(0), T = L((E) => {
    if (h.current !== null) return;
    const M = E.touches[0];
    h.current = M.identifier;
    const P = { x: M.clientX, y: M.clientY };
    j.current = P, S.current = Date.now(), x({
      isActive: !0,
      startPoint: P,
      currentPoint: P,
      delta: null,
      distance: 0,
      angle: 0,
      scale: 1,
      rotation: 0
    }), o && o(P);
  }, [o]), $ = L((E) => {
    var Q, se;
    if (h.current === null) return;
    const M = Array.from(E.touches).find((X) => X.identifier === h.current);
    if (!M) return;
    const P = { x: M.clientX, y: M.clientY }, z = u.startPoint, _ = {
      x: P.x - (((Q = u.currentPoint) == null ? void 0 : Q.x) || P.x),
      y: P.y - (((se = u.currentPoint) == null ? void 0 : se.y) || P.y)
    }, Y = Pe(z, P), W = Ne(z, P), q = Date.now(), B = q - S.current;
    if (B > 0 && (g.current = {
      x: (P.x - j.current.x) / B,
      y: (P.y - j.current.y) / B
    }), j.current = P, S.current = q, E.touches.length >= 2) {
      const X = Array.from(E.touches)[0].identifier === h.current ? Array.from(E.touches)[1] : Array.from(E.touches)[0];
      if (X) {
        const ie = { x: X.clientX, y: X.clientY }, K = Pe(P, ie), Z = Ne(P, ie);
        m.current === 0 && (m.current = K, k.current = Z);
        const re = K / m.current, oe = (Z - k.current) * (180 / Math.PI);
        c && c({
          ...u,
          currentPoint: P,
          delta: _,
          distance: Y,
          angle: W,
          scale: re,
          rotation: oe
        }), a && a({
          ...u,
          currentPoint: P,
          delta: _,
          distance: Y,
          angle: W,
          scale: re,
          rotation: oe
        }), b.current = re, v.current = oe;
      }
    }
    x((X) => ({
      ...X,
      currentPoint: P,
      delta: _,
      distance: Y,
      angle: W
    })), i && i({
      ...u,
      currentPoint: P,
      delta: _,
      distance: Y,
      angle: W
    });
  }, [u, i, c, a]), I = L((E) => {
    if (h.current === null) return;
    const M = Array.from(E.changedTouches).find((W) => W.identifier === h.current);
    if (!M) return;
    const P = { x: M.clientX, y: M.clientY }, z = u.startPoint;
    h.current = null, m.current = 0;
    const _ = Pe(z, P), Y = Date.now() - S.current;
    if (_ < (f.tap || 10) && Y < 300) {
      const W = Date.now();
      W - y.current < 300 ? (s && s(z), y.current = 0) : (n && n(z), y.current = W);
    }
    if (_ > (f.swipe || 50)) {
      const W = Ne(z, P), q = g.current;
      let B;
      W > -Math.PI / 4 && W < Math.PI / 4 ? B = "right" : W >= Math.PI / 4 && W < 3 * Math.PI / 4 ? B = "down" : W >= -3 * Math.PI / 4 && W < -Math.PI / 4 ? B = "up" : B = "left", p && p(B, q);
    }
    l && l({
      ...u,
      currentPoint: P,
      isActive: !1
    }), x({
      isActive: !1,
      startPoint: null,
      currentPoint: null,
      delta: null,
      distance: 0,
      angle: 0,
      scale: 1,
      rotation: 0
    });
  }, [u, n, s, l, p, f]);
  return N(() => {
    const E = e.current;
    if (E)
      return E.addEventListener("touchstart", T, { passive: !0 }), E.addEventListener("touchmove", $, { passive: !0 }), E.addEventListener("touchend", I, { passive: !0 }), E.addEventListener("touchcancel", I, { passive: !0 }), () => {
        E.removeEventListener("touchstart", T), E.removeEventListener("touchmove", $), E.removeEventListener("touchend", I), E.removeEventListener("touchcancel", I);
      };
  }, [e, T, $, I]), {
    gestureState: u,
    isActive: u.isActive
  };
}
function ir(e) {
  let t = e;
  t = t.replace(/```(?:json|html|typescript)?\n?/gi, ""), t = t.replace(/```\n?$/gi, "");
  const n = t.indexOf("[");
  n > 0 && (t = t.slice(n));
  const s = t.lastIndexOf("]");
  return s > 0 && s < t.length - 1 && (t = t.slice(0, s + 1)), t = t.replace(/,\s*\]/g, "]"), t = t.replace(/,\s*}/g, "}"), t = t.replace(/(['"])?:\s*(['"])?/g, (i, o, l) => o && l ? i : ":"), t;
}
function et(e) {
  try {
    return JSON.parse(e);
  } catch {
    const n = ir(e);
    try {
      return JSON.parse(n);
    } catch {
      return null;
    }
  }
}
function or(e) {
  const [t, n] = C([]), [s, i] = C([]), [o, l] = C(""), [c, a] = C(!1), [p, f] = C(!1), u = A(/* @__PURE__ */ new Map()), x = L((g) => {
    var j;
    i((S) => [...S, g]), (j = e.onError) == null || j.call(e, g), e.autoHeal && h(g);
  }, [e.autoHeal, e.onError]), h = L(async (g) => {
    var $, I, E, M, P, z, _, Y, W, q;
    const j = u.current.get(g.message) || 0;
    if (j >= e.maxRetries) {
      console.error("Max heal attempts reached for:", g.message);
      return;
    }
    u.current.set(g.message, j + 1), a(!0);
    const S = `🔧 Detected error: ${g.message}
🩹 AI healing...`;
    l(S), ($ = e.onThinking) == null || $.call(e, S);
    const T = `You are an AI UI auto-healer. Fix errors in real-time.

Current components:
${JSON.stringify(t, null, 2)}

Error to fix:
- Type: ${g.type}
- Message: ${g.message}
- Component: ${g.componentId || "unknown"}
- Timestamp: ${new Date(g.timestamp).toISOString()}

Your job:
1. Analyze the error
2. Generate a JSON array of components to FIX the issue
3. You can add, remove, or modify components
4. Keep working components intact
5. Output ONLY valid JSON array
6. Preserve component IDs that are working
7. Fix only the broken parts

Output ONLY valid JSON array of UIComponent objects.`;
    try {
      const B = await fetch(`${e.lmStudioUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e.lmStudioKey}`
        },
        body: JSON.stringify({
          model: e.model,
          messages: [
            { role: "system", content: T },
            { role: "user", content: `Fix this error: ${g.message}` }
          ],
          stream: !0,
          max_tokens: 2048
        })
      });
      if (!B.ok)
        throw new Error(`HTTP ${B.status}: ${B.statusText}`);
      const Q = (I = B.body) == null ? void 0 : I.getReader(), se = new TextDecoder();
      let X = "";
      for (; ; ) {
        const { done: K, value: Z } = await Q.read();
        if (K) break;
        const oe = se.decode(Z, { stream: !0 }).split(`
`);
        for (const ee of oe)
          if (ee.startsWith("data: ")) {
            const pe = ee.slice(6);
            if (pe === "[DONE]") continue;
            try {
              const de = JSON.parse(pe);
              if ((P = (M = (E = de.choices) == null ? void 0 : E[0]) == null ? void 0 : M.delta) != null && P.content) {
                const xe = de.choices[0].delta.content;
                X += xe;
                const ue = S + xe;
                l(ue), (z = e.onThinking) == null || z.call(e, ue);
              }
            } catch {
            }
          }
      }
      const ie = X.match(/\[[\s\S]*\]/);
      if (ie)
        try {
          const K = JSON.parse(ie[0]);
          n(K), (_ = e.onComponentUpdate) == null || _.call(e, K);
          const Z = `
✅ Error healed!`;
          l((re) => re + Z), (Y = e.onThinking) == null || Y.call(e, (re) => re + Z), (W = e.onHeal) == null || W.call(e, X);
        } catch (K) {
          console.error("Failed to parse healed components:", K), l((Z) => Z + `
❌ Parse error: ${K}`);
        }
      else
        l((K) => K + `
❌ No valid JSON in response`);
    } catch (B) {
      console.error("Healing failed:", B);
      const Q = `
❌ Healing failed: ${B.message || B}`;
      l((se) => se + Q), (q = e.onThinking) == null || q.call(e, (se) => se + Q);
    } finally {
      a(!1);
    }
  }, [t, e]), y = L(async (g) => {
    var S, T, $, I, E, M, P;
    f(!0), i([]), l(""), u.current.clear();
    const j = `You are an expert web developer AI. Generate complete, beautiful websites.

## OUTPUT RULES (CRITICAL):
1. Output ONLY valid JSON array - NO markdown, NO explanations, NO text outside JSON
2. Start with [ and end with ]
3. Each component MUST have: id, type, content, x, y, width, height, style, visible
4. No trailing commas, no comments, no invalid syntax

## COMPONENT TYPES:
- header: Navigation bar (height:60)
- text: Paragraph text (multi-line supported)
- button: Clickable button (width:150, height:44)
- card: Container card (various sizes)
- input: Text input field
- container: Generic container for grouping
- image: Image placeholder

## DESIGN RULES:
- Dark theme: background #0a0a0f
- Accents: #8b5cf6 (purple), #ec4899 (pink), #06b6d4 (cyan)
- Modern gradients, rounded corners (8-12px)
- Hover effects on buttons
- Professional spacing

## LAYOUT RULES:
- Canvas size: 1200x800 pixels
- Header: y:0, width:1200, height:60
- Content starts at y:80
- Max content width: 1000px centered
- Vertical spacing: 40-60px between sections
- Card width: 280-350px
- Button width: 150-200px

## GENERATION ORDER:
1. Header with logo and nav links
2. Hero section (large text + CTA button)
3. Features section (3-4 cards in row)
4. Content section (text + optional image)
5. CTA section (centered button)
6. Footer (small text, links)

## EXAMPLE OUTPUT:
[{"id":"1","type":"header","content":"🎨 MyApp","x":0,"y":0,"width":1200,"height":60,"style":{"background":"rgba(0,0,0,0.8)"},"visible":true},
{"id":"2","type":"text","content":"Welcome to the future","x":100,"y":100,"width":1000,"height":80,"style":{"fontSize":"32","color":"#fff"},"visible":true}]

Generate a complete website now. Output ONLY the JSON array.`;
    try {
      const z = await fetch(`${e.lmStudioUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${e.lmStudioKey}`
        },
        body: JSON.stringify({
          model: e.model,
          messages: [
            { role: "system", content: j },
            { role: "user", content: g }
          ],
          stream: !0,
          max_tokens: 2048
        })
      });
      if (!z.ok)
        throw new Error(`HTTP ${z.status}: ${z.statusText}`);
      const _ = (S = z.body) == null ? void 0 : S.getReader(), Y = new TextDecoder();
      let W = "";
      for (; ; ) {
        const { done: B, value: Q } = await _.read();
        if (B) break;
        const X = Y.decode(Q, { stream: !0 }).split(`
`);
        for (const ie of X)
          if (ie.startsWith("data: ")) {
            const K = ie.slice(6);
            if (K === "[DONE]") continue;
            try {
              const Z = JSON.parse(K);
              if ((I = ($ = (T = Z.choices) == null ? void 0 : T[0]) == null ? void 0 : $.delta) != null && I.content) {
                const re = Z.choices[0].delta.content;
                W += re, l((ee) => ee + re), (E = e.onThinking) == null || E.call(e, (ee) => ee + re);
                const oe = W.match(/\[[\s\S]*\]/);
                if (oe)
                  try {
                    const ee = et(oe[0]);
                    n(ee), (M = e.onComponentUpdate) == null || M.call(e, ee);
                  } catch (ee) {
                    x({
                      type: "parse",
                      message: `JSON parse error: ${ee}`,
                      timestamp: Date.now()
                    });
                  }
              }
            } catch {
            }
          }
      }
      const q = W.match(/\[[\s\S]*\]/);
      if (q)
        try {
          const B = et(q[0]);
          n(B), (P = e.onComponentUpdate) == null || P.call(e, B);
        } catch (B) {
          x({
            type: "parse",
            message: `Final JSON parse error: ${B}`,
            timestamp: Date.now()
          });
        }
    } catch (z) {
      x({
        type: "network",
        message: `Network error: ${z.message || z}`,
        timestamp: Date.now()
      });
    } finally {
      f(!1);
    }
  }, [e, x]), m = L(() => {
    n([]), i([]), l(""), u.current.clear();
  }, []), k = L((g) => {
    n((j) => j.filter((S) => S.id !== g));
  }, []), b = L((g, j) => {
    n((S) => S.map((T) => T.id === g ? { ...T, ...j } : T));
  }, []), v = L(() => {
    s.length > 0 && h(s[s.length - 1]);
  }, [s, h]);
  return {
    components: t,
    setComponents: n,
    errors: s,
    aiThinking: o,
    isHealing: c,
    isGenerating: p,
    generateUI: y,
    reportError: x,
    healError: h,
    clearComponents: m,
    removeComponent: k,
    updateComponent: b,
    forceHeal: v
  };
}
class nn extends le.Component {
  constructor(t) {
    super(t), this.state = { hasError: !1, error: null };
  }
  static getDerivedStateFromError(t) {
    return { hasError: !0, error: t.message };
  }
  componentDidCatch(t, n) {
    this.props.onError({
      type: "react",
      message: t.message,
      stack: n.componentStack,
      timestamp: Date.now()
    });
  }
  render() {
    return this.state.hasError ? this.props.fallback ? this.props.fallback : /* @__PURE__ */ r.jsxs("div", { className: "p-4 bg-red-500/20 border border-red-500/50 rounded-lg", children: [
      /* @__PURE__ */ r.jsxs("p", { className: "text-red-400", children: [
        "⚠️ Error detected: ",
        this.state.error
      ] }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-gray-400 mt-2", children: "AI is healing..." })
    ] }) : this.props.children;
  }
}
const sn = ({
  components: e,
  width: t = 800,
  height: n = 600,
  className: s,
  onClick: i
}) => {
  const o = A(null);
  N(() => {
    var p, f, u, x, h, y, m, k, b, v;
    const c = o.current;
    if (!c) return;
    const a = c.getContext("2d");
    if (a) {
      a.clearRect(0, 0, t, n);
      for (const g of e) {
        if (!g.visible) continue;
        const j = g.x, S = g.y, T = g.width, $ = g.height, I = ((p = g.style) == null ? void 0 : p.backgroundColor) || "#1a1a2e", E = ((f = g.style) == null ? void 0 : f.color) || "#ffffff", M = parseInt(((u = g.style) == null ? void 0 : u.borderRadius) || "8"), P = parseInt(((x = g.style) == null ? void 0 : x.fontSize) || "16");
        switch (g.type) {
          case "header":
          case "text":
            a.fillStyle = I, a.fillRect(j, S, T, $), a.fillStyle = E, a.font = `${P}px Inter, sans-serif`, a.textBaseline = "top";
            const z = g.content.split(" ");
            let _ = "", Y = S + 8;
            const W = T - 16;
            for (const B of z) {
              const Q = _ + B + " ";
              a.measureText(Q).width > W && _ !== "" ? (a.fillText(_, j + 8, Y), _ = B + " ", Y += P * 1.4) : _ = Q;
            }
            a.fillText(_, j + 8, Y);
            break;
          case "button":
            a.fillStyle = ((h = g.style) == null ? void 0 : h.background) || "#8b5cf6", a.beginPath(), a.roundRect(j, S, T, $, M), a.fill(), a.fillStyle = ((y = g.style) == null ? void 0 : y.color) || "#ffffff", a.font = `bold ${P}px Inter, sans-serif`, a.textAlign = "center", a.textBaseline = "middle", a.fillText(g.content, j + T / 2, S + $ / 2), a.textAlign = "left";
            break;
          case "card":
            const q = a.createLinearGradient(j, S, j + T, S + $);
            q.addColorStop(0, ((m = g.style) == null ? void 0 : m.background) || "#1e1e3f"), q.addColorStop(1, ((k = g.style) == null ? void 0 : k.backgroundEnd) || "#2d2d5f"), a.fillStyle = q, a.beginPath(), a.roundRect(j, S, T, $, M), a.fill(), (b = g.style) != null && b.boxShadow && (a.shadowColor = g.style.boxShadow, a.shadowBlur = 20, a.fill(), a.shadowBlur = 0), a.fillStyle = E, a.font = `${P}px Inter, sans-serif`, a.textAlign = "center", a.textBaseline = "middle", a.fillText(g.content, j + T / 2, S + $ / 2), a.textAlign = "left";
            break;
          case "container":
            a.fillStyle = I, a.fillRect(j, S, T, $);
            break;
          case "input":
            a.fillStyle = "#0a0a1a", a.strokeStyle = ((v = g.style) == null ? void 0 : v.borderColor) || "#4a4a6a", a.lineWidth = 2, a.beginPath(), a.roundRect(j, S, T, $, M), a.fill(), a.stroke(), a.fillStyle = "#6a6a8a", a.font = `${P}px Inter, sans-serif`, a.textBaseline = "middle", a.fillText(g.content || "Enter text...", j + 12, S + $ / 2);
            break;
          case "image":
            a.fillStyle = I, a.fillRect(j, S, T, $), a.strokeStyle = "#4a4a6a", a.lineWidth = 1, a.strokeRect(j, S, T, $), a.fillStyle = "#6a6a8a", a.font = "24px Inter", a.textAlign = "center", a.textBaseline = "middle", a.fillText("🖼️", j + T / 2, S + $ / 2), a.textAlign = "left";
            break;
        }
      }
    }
  }, [e, t, n]);
  const l = L((c) => {
    if (!i) return;
    const a = o.current;
    if (!a) return;
    const p = a.getBoundingClientRect(), f = c.clientX - p.left, u = c.clientY - p.top;
    for (const x of [...e].reverse())
      if (x.visible && f >= x.x && f <= x.x + x.width && u >= x.y && u <= x.y + x.height) {
        i(x, f, u);
        break;
      }
  }, [e, i]);
  return /* @__PURE__ */ r.jsx(
    "canvas",
    {
      ref: o,
      width: t,
      height: n,
      className: s,
      onClick: l,
      style: { display: "block", backgroundColor: "#0a0a0f", cursor: "pointer" }
    }
  );
}, lr = {
  lmStudioUrl: "http://100.116.54.125:1234",
  lmStudioKey: "sk-lm-zO7bswIc:WkHEMTUfVNkq5WYNyFOW",
  model: "qwen3.5-27b",
  autoHeal: !0,
  maxRetries: 3
};
function an() {
  return or(lr);
}
const on = ({
  children: e,
  variant: t = "primary",
  size: n = "md",
  isLoading: s = !1,
  leftIcon: i,
  rightIcon: o,
  className: l,
  disabled: c,
  style: a,
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
    cursor: c || s ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    opacity: c || s ? 0.6 : 1
  }, u = {
    sm: { padding: "6px 12px", fontSize: "13px" },
    md: { padding: "10px 16px", fontSize: "14px" },
    lg: { padding: "14px 24px", fontSize: "16px" }
  }, x = {
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
  return /* @__PURE__ */ r.jsxs(
    "button",
    {
      className: l,
      disabled: c || s,
      style: {
        ...f,
        ...u[n],
        ...x[t],
        ...a
      },
      ...p,
      children: [
        s ? /* @__PURE__ */ r.jsx(cr, { size: 16 }) : i || null,
        e,
        !s && o
      ]
    }
  );
}, cr = ({ size: e }) => /* @__PURE__ */ r.jsx("div", { style: {
  width: `${e}px`,
  height: `${e}px`,
  border: "2px solid currentColor",
  borderTopColor: "transparent",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite"
}, children: /* @__PURE__ */ r.jsx("style", { children: `
      @keyframes spin { to { transform: rotate(360deg); } }
    ` }) }), ln = ({
  children: e,
  hover: t = !1,
  glass: n = !1,
  padding: s = 16,
  className: i,
  style: o,
  onClick: l
}) => /* @__PURE__ */ r.jsx(
  "div",
  {
    className: i,
    onClick: l,
    style: {
      background: n ? "rgba(255, 255, 255, 0.05)" : "rgba(20, 20, 30, 0.95)",
      backdropFilter: n ? "blur(20px)" : void 0,
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      padding: typeof s == "number" ? `${s}px` : s,
      transition: "all 0.2s ease",
      cursor: l ? "pointer" : "default",
      ...t && {
        ":hover": {
          borderColor: "rgba(139, 92, 246, 0.5)",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)"
        }
      },
      ...o
    },
    children: e
  }
), cn = ({
  children: e,
  className: t,
  style: n
}) => /* @__PURE__ */ r.jsx(
  "div",
  {
    className: t,
    style: {
      marginBottom: "12px",
      ...n
    },
    children: e
  }
), dn = ({
  children: e,
  className: t,
  style: n
}) => /* @__PURE__ */ r.jsx(
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
), un = ({
  children: e,
  className: t,
  style: n
}) => /* @__PURE__ */ r.jsx(
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
), fn = ({
  children: e,
  variant: t = "default",
  size: n = "md",
  className: s,
  style: i
}) => {
  const o = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    borderRadius: "9999px",
    whiteSpace: "nowrap"
  }, l = {
    sm: { padding: "2px 8px", fontSize: "10px" },
    md: { padding: "4px 12px", fontSize: "12px" }
  }, c = {
    default: { background: "rgba(255, 255, 255, 0.1)", color: "#e5e7eb" },
    primary: { background: "rgba(139, 92, 246, 0.2)", color: "#a78bfa" },
    secondary: { background: "rgba(59, 130, 246, 0.2)", color: "#60a5fa" },
    success: { background: "rgba(16, 185, 129, 0.2)", color: "#34d399" },
    warning: { background: "rgba(245, 158, 11, 0.2)", color: "#fbbf24" },
    destructive: { background: "rgba(239, 68, 68, 0.2)", color: "#f87171" }
  };
  return /* @__PURE__ */ r.jsx(
    "span",
    {
      className: s,
      style: {
        ...o,
        ...l[n],
        ...c[t],
        ...i
      },
      children: e
    }
  );
}, dr = le.forwardRef(({
  label: e,
  error: t,
  leftIcon: n,
  rightIcon: s,
  className: i,
  style: o,
  ...l
}, c) => {
  const [a, p] = le.useState(!1);
  return /* @__PURE__ */ r.jsxs("div", { style: { width: "100%" }, children: [
    e && /* @__PURE__ */ r.jsx("label", { style: {
      display: "block",
      fontSize: "14px",
      fontWeight: 500,
      color: "#e5e7eb",
      marginBottom: "6px"
    }, children: e }),
    /* @__PURE__ */ r.jsxs("div", { style: {
      position: "relative",
      display: "flex",
      alignItems: "center"
    }, children: [
      n && /* @__PURE__ */ r.jsx("div", { style: {
        position: "absolute",
        left: "12px",
        color: "#6b7280",
        display: "flex",
        alignItems: "center"
      }, children: n }),
      /* @__PURE__ */ r.jsx(
        "input",
        {
          ref: c,
          className: i,
          onFocus: (f) => {
            var u;
            p(!0), (u = l.onFocus) == null || u.call(l, f);
          },
          onBlur: (f) => {
            var u;
            p(!1), (u = l.onBlur) == null || u.call(l, f);
          },
          style: {
            width: "100%",
            padding: n ? "10px 12px 10px 40px" : "10px 12px",
            background: "rgba(255, 255, 255, 0.05)",
            border: `2px solid ${t ? "#ef4444" : a ? "#8b5cf6" : "rgba(255, 255, 255, 0.1)"}`,
            borderRadius: "8px",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            transition: "all 0.2s ease",
            ...o
          },
          ...l
        }
      ),
      s && /* @__PURE__ */ r.jsx("div", { style: {
        position: "absolute",
        right: "12px",
        color: "#6b7280",
        display: "flex",
        alignItems: "center"
      }, children: s })
    ] }),
    t && /* @__PURE__ */ r.jsx("p", { style: {
      marginTop: "4px",
      fontSize: "12px",
      color: "#ef4444"
    }, children: t })
  ] });
});
dr.displayName = "Input";
const pn = ({
  rows: e = 5,
  cols: t = 5,
  gap: n = 20,
  color: s = "#8b5cf6",
  animate: i = !0,
  className: o,
  style: l
}) => /* @__PURE__ */ r.jsxs(
  "div",
  {
    className: o,
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${t}, 1fr)`,
      gridTemplateRows: `repeat(${e}, 1fr)`,
      gap: `${n}px`,
      ...l
    },
    children: [
      Array.from({ length: e * t }).map((c, a) => /* @__PURE__ */ r.jsx(
        "div",
        {
          className: i ? `grid-item-${a % 4}` : "",
          style: {
            aspectRatio: "1",
            borderRadius: "8px",
            background: s,
            opacity: 0.1 + a % 5 * 0.15,
            animation: i ? "gridFade 2s ease-in-out infinite" : "none",
            animationDelay: `${a % 4 * 0.5}s`
          }
        },
        a
      )),
      /* @__PURE__ */ r.jsx("style", { children: `
        @keyframes gridFade {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      ` })
    ]
  }
), xn = ({
  children: e,
  delay: t = 0,
  duration: n = 0.5,
  direction: s = "up",
  distance: i = 20,
  className: o,
  style: l
}) => {
  const [c, a] = C(!1);
  N(() => {
    const f = setTimeout(() => a(!0), t * 1e3);
    return () => clearTimeout(f);
  }, [t]);
  const p = {
    up: `translateY(${i}px)`,
    down: `translateY(-${i}px)`,
    left: `translateX(${i}px)`,
    right: `translateX(-${i}px)`,
    none: "none"
  };
  return /* @__PURE__ */ r.jsx(
    "div",
    {
      className: o,
      style: {
        opacity: c ? 1 : 0,
        transform: c ? "none" : p[s],
        transition: `opacity ${n}s ease, transform ${n}s ease`,
        ...l
      },
      children: e
    }
  );
}, hn = ({
  children: e,
  cols: t = 4,
  gap: n = 16,
  className: s,
  style: i
}) => /* @__PURE__ */ r.jsx(
  "div",
  {
    className: s,
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${t}, 1fr)`,
      gap: `${n}px`,
      ...i
    },
    children: le.Children.map(e, (o, l) => {
      if (!le.isValidElement(o)) return o;
      const { colSpan: c = 1, rowSpan: a = 1, ...p } = o.props;
      return /* @__PURE__ */ r.jsx(
        "div",
        {
          ...p,
          style: {
            gridColumn: `span ${c}`,
            gridRow: `span ${a}`,
            ...p.style
          }
        }
      );
    })
  }
), gn = ({
  title: e,
  children: t,
  className: n,
  style: s
}) => /* @__PURE__ */ r.jsxs(
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
      ...s
    },
    children: [
      e && /* @__PURE__ */ r.jsx("h3", { style: {
        fontSize: "16px",
        fontWeight: 600,
        color: "#fff",
        margin: 0
      }, children: e }),
      t
    ]
  }
), mn = ({
  words: e,
  duration: t = 2e3,
  className: n,
  style: s
}) => {
  const [i, o] = C(0);
  return N(() => {
    const l = setInterval(() => {
      o((c) => (c + 1) % e.length);
    }, t);
    return () => clearInterval(l);
  }, [e.length, t]), /* @__PURE__ */ r.jsx(
    "span",
    {
      className: n,
      style: {
        display: "inline-block",
        minWidth: "100px",
        ...s
      },
      children: e.map((l, c) => /* @__PURE__ */ r.jsx(
        "span",
        {
          style: {
            display: "inline-block",
            opacity: i === c ? 1 : 0,
            transform: i === c ? "translateY(0)" : "translateY(-20px)",
            transition: "all 0.3s ease",
            position: i === c ? "relative" : "absolute"
          },
          children: l
        },
        l
      ))
    }
  );
}, yn = ({
  children: e,
  from: t = "#8b5cf6",
  to: n = "#06b6d4",
  direction: s = "135deg",
  animate: i = !1,
  className: o,
  style: l
}) => /* @__PURE__ */ r.jsxs(
  "span",
  {
    className: o,
    style: {
      background: i ? `linear-gradient(${s}, ${t}, ${n}, ${t})` : `linear-gradient(${s}, ${t}, ${n})`,
      backgroundSize: i ? "200% 200%" : void 0,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      animation: i ? "gradientShift 3s ease infinite" : void 0,
      ...l
    },
    children: [
      e,
      i && /* @__PURE__ */ r.jsx("style", { children: `
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        ` })
    ]
  }
), bn = ({
  count: e = 5,
  size: t = 200,
  colors: n = ["#8b5cf6", "#06b6d4", "#ec4899", "#f59e0b", "#10b981"],
  orbitRadius: s = 80,
  shapeSize: i = 10,
  speed: o = 20,
  shape: l = "circle",
  className: c,
  style: a
}) => {
  const p = A(null);
  return N(() => {
    const f = p.current;
    if (!f) return;
    const u = f.getContext("2d");
    if (!u) return;
    let x;
    const h = () => {
      u.clearRect(0, 0, t, t);
      const y = t / 2, m = t / 2, k = Date.now() / 1e3;
      for (let v = 0; v < e; v++) {
        const g = v / e * Math.PI * 2 + k * o / 10, j = y + Math.cos(g) * s, S = m + Math.sin(g) * s;
        u.fillStyle = n[v % n.length], u.globalAlpha = 0.8, u.beginPath(), l === "circle" ? u.arc(j, S, i, 0, Math.PI * 2) : l === "square" ? u.rect(j - i / 2, S - i / 2, i, i) : l === "triangle" && (u.moveTo(j, S - i), u.lineTo(j + i, S + i / 2), u.lineTo(j - i, S + i / 2), u.closePath()), u.fill();
      }
      const b = u.createRadialGradient(y, m, 0, y, m, 30);
      b.addColorStop(0, n[0]), b.addColorStop(1, "transparent"), u.fillStyle = b, u.globalAlpha = 0.5, u.beginPath(), u.arc(y, m, 30, 0, Math.PI * 2), u.fill(), x = requestAnimationFrame(h);
    };
    return h(), () => cancelAnimationFrame(x);
  }, [e, t, n, s, i, o, l]), /* @__PURE__ */ r.jsx(
    "canvas",
    {
      ref: p,
      width: t,
      height: t,
      className: c,
      style: {
        display: "block",
        ...a
      }
    }
  );
};
function tt(e) {
  try {
    return JSON.parse(e);
  } catch {
    return { headline: e, subtext: "", copyright: "" };
  }
}
function ur(e) {
  try {
    const t = JSON.parse(e);
    return Array.isArray(t) ? t : Array.isArray(t.features) ? t.features : [];
  } catch {
    return [
      { icon: "✨", title: "Feature 1", description: e },
      { icon: "🚀", title: "Feature 2", description: "Another great feature" },
      { icon: "🔒", title: "Feature 3", description: "Secure and reliable" }
    ];
  }
}
function fr(e) {
  try {
    const t = JSON.parse(e);
    return Array.isArray(t) ? t : Array.isArray(t.tiers) ? t.tiers : [];
  } catch {
    return [
      { name: "Basic", price: "9", features: ["Feature 1", "Feature 2", "Feature 3"] },
      { name: "Pro", price: "29", features: ["All Basic", "Feature 4", "Feature 5"] },
      { name: "Enterprise", price: "99", features: ["All Pro", "Feature 6", "Priority Support"] }
    ];
  }
}
function pr() {
  return /* @__PURE__ */ r.jsx("div", { className: "logo text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent", children: "BrandName" });
}
function xr({ content: e }) {
  let t = ["Features", "Pricing", "About", "Contact"];
  try {
    const n = JSON.parse(e);
    Array.isArray(n.links) ? t = n.links : Array.isArray(n) && (t = n);
  } catch {
  }
  return /* @__PURE__ */ r.jsx("div", { className: "nav-links flex gap-6", children: t.map((n, s) => /* @__PURE__ */ r.jsx("a", { href: "#", className: "text-gray-600 hover:text-purple-500 transition-colors text-sm", children: n }, s)) });
}
function we({ text: e, primary: t, large: n }) {
  return /* @__PURE__ */ r.jsx("button", { className: `${t ? "btn-primary" : "btn-secondary"} ${n ? "px-8 py-3 text-lg" : ""}`, children: e });
}
function hr({ icon: e, title: t, description: n, delay: s }) {
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: "feature-card p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10",
      style: { animationDelay: `${s}ms` },
      children: [
        /* @__PURE__ */ r.jsx("div", { className: "feature-icon text-3xl mb-4", children: e }),
        /* @__PURE__ */ r.jsx("h3", { className: "font-semibold text-lg mb-2", children: t }),
        /* @__PURE__ */ r.jsx("p", { className: "text-gray-400 text-sm", children: n })
      ]
    }
  );
}
function gr({ name: e, price: t, features: n, popular: s, delay: i }) {
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: `pricing-card p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 ${s ? "border-purple-500 bg-purple-500/10 scale-105" : "border-white/10 bg-white/5"}`,
      style: { animationDelay: `${i}ms` },
      children: [
        s && /* @__PURE__ */ r.jsx("span", { className: "badge badge-purple mb-4 inline-block", children: "Most Popular" }),
        /* @__PURE__ */ r.jsx("h3", { className: "font-semibold text-xl mb-2", children: e }),
        /* @__PURE__ */ r.jsxs("div", { className: "price mb-4", children: [
          /* @__PURE__ */ r.jsxs("span", { className: "text-4xl font-bold", children: [
            "$",
            t
          ] }),
          /* @__PURE__ */ r.jsx("span", { className: "text-gray-400", children: "/month" })
        ] }),
        /* @__PURE__ */ r.jsx("ul", { className: "features space-y-2 mb-6", children: n.map((o, l) => /* @__PURE__ */ r.jsxs("li", { className: "text-sm text-gray-300 flex items-center gap-2", children: [
          /* @__PURE__ */ r.jsx("span", { className: "text-green-400", children: "✓" }),
          " ",
          o
        ] }, l)) }),
        /* @__PURE__ */ r.jsx("button", { className: `w-full py-2 rounded-lg font-medium transition-all ${s ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-white/10 hover:bg-white/20"}`, children: s ? "Start Trial" : "Get Started" })
      ]
    }
  );
}
function mr() {
  return /* @__PURE__ */ r.jsxs("div", { className: "hero-graphic relative w-64 h-64", children: [
    /* @__PURE__ */ r.jsx("div", { className: "floating-shape absolute w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-xl", style: { top: "10%", left: "20%", animation: "float 6s ease-in-out infinite" } }),
    /* @__PURE__ */ r.jsx("div", { className: "floating-shape absolute w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-lg", style: { top: "50%", right: "10%", animation: "float 8s ease-in-out infinite 1s" } }),
    /* @__PURE__ */ r.jsx("div", { className: "floating-shape absolute w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/30 to-orange-500/30 blur-lg", style: { bottom: "10%", left: "30%", animation: "float 7s ease-in-out infinite 2s" } })
  ] });
}
function Se({ title: e, links: t }) {
  return /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("h4", { className: "font-semibold mb-3", children: e }),
    /* @__PURE__ */ r.jsx("ul", { className: "space-y-2", children: t.map((n, s) => /* @__PURE__ */ r.jsx("li", { children: /* @__PURE__ */ r.jsx("a", { href: "#", className: "text-gray-400 hover:text-white text-sm transition-colors", children: n }) }, s)) })
  ] });
}
function yr({ section: e, index: t }) {
  const n = A(null);
  N(() => {
    n.current && n.current.classList.add("animate-in");
  }, []);
  const s = e.styles || {};
  switch (e.type) {
    case "nav":
      return /* @__PURE__ */ r.jsx("nav", { ref: n, className: "nav-section sticky top-0 z-50 border-b border-white/10", style: s, children: /* @__PURE__ */ r.jsxs("div", { className: "container mx-auto px-6 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ r.jsx(pr, {}),
        /* @__PURE__ */ r.jsx(xr, { content: e.content }),
        /* @__PURE__ */ r.jsx(we, { text: "Get Started" })
      ] }) });
    case "hero":
      const i = tt(e.content);
      return /* @__PURE__ */ r.jsx("section", { ref: n, className: "hero-section py-24 px-6", style: s, children: /* @__PURE__ */ r.jsxs("div", { className: "container mx-auto flex items-center gap-12", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ r.jsx("h1", { className: "text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight", children: i.headline || e.content }),
          /* @__PURE__ */ r.jsx("p", { className: "text-xl text-gray-400 mb-8", children: i.subtext || "Build something amazing with AI" }),
          /* @__PURE__ */ r.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ r.jsx(we, { text: "Start Free", primary: !0 }),
            /* @__PURE__ */ r.jsx(we, { text: "Learn More" })
          ] })
        ] }),
        /* @__PURE__ */ r.jsx(mr, {})
      ] }) });
    case "features":
      const o = ur(e.content);
      return /* @__PURE__ */ r.jsx("section", { ref: n, className: "features-section py-20 px-6 bg-black/30", style: s, children: /* @__PURE__ */ r.jsxs("div", { className: "container mx-auto", children: [
        /* @__PURE__ */ r.jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: "Features" }),
        /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-3 gap-6", children: o.map((a, p) => /* @__PURE__ */ r.jsx(hr, { ...a, delay: p * 100 }, p)) })
      ] }) });
    case "pricing":
      const l = fr(e.content);
      return /* @__PURE__ */ r.jsx("section", { ref: n, className: "pricing-section py-20 px-6", style: s, children: /* @__PURE__ */ r.jsxs("div", { className: "container mx-auto", children: [
        /* @__PURE__ */ r.jsx("h2", { className: "text-3xl font-bold text-center mb-4", children: "Pricing" }),
        /* @__PURE__ */ r.jsx("p", { className: "text-gray-400 text-center mb-12 max-w-2xl mx-auto", children: "Choose the plan that fits your needs" }),
        /* @__PURE__ */ r.jsx("div", { className: "grid grid-cols-3 gap-6 max-w-4xl mx-auto", children: l.map((a, p) => /* @__PURE__ */ r.jsx(gr, { ...a, popular: p === 1, delay: p * 100 }, p)) })
      ] }) });
    case "cta":
      return /* @__PURE__ */ r.jsx("section", { ref: n, className: "cta-section py-24 px-6 text-center bg-gradient-to-r from-purple-600 to-pink-600", style: s, children: /* @__PURE__ */ r.jsxs("div", { className: "container mx-auto", children: [
        /* @__PURE__ */ r.jsx("h2", { className: "text-3xl font-bold mb-6", children: e.content }),
        /* @__PURE__ */ r.jsx(we, { text: "Get Started Now", primary: !0, large: !0 })
      ] }) });
    case "footer":
      const c = tt(e.content);
      return /* @__PURE__ */ r.jsx("footer", { ref: n, className: "footer-section py-16 px-6 border-t border-white/10", style: s, children: /* @__PURE__ */ r.jsxs("div", { className: "container mx-auto", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "grid grid-cols-4 gap-12 mb-12", children: [
          /* @__PURE__ */ r.jsx(Se, { title: "Product", links: ["Features", "Pricing", "Docs", "API"] }),
          /* @__PURE__ */ r.jsx(Se, { title: "Company", links: ["About", "Blog", "Careers", "Press"] }),
          /* @__PURE__ */ r.jsx(Se, { title: "Resources", links: ["Help", "Community", "Status", "Contact"] }),
          /* @__PURE__ */ r.jsx(Se, { title: "Legal", links: ["Privacy", "Terms", "Security"] })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "text-center text-gray-500 text-sm border-t border-white/10 pt-8", children: [
          "© 2026 ",
          c.copyright || "BrandName",
          ". All rights reserved."
        ] })
      ] }) });
    default:
      return /* @__PURE__ */ r.jsx("section", { ref: n, className: "content-section py-16 px-6", style: s, children: /* @__PURE__ */ r.jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ r.jsx("p", { className: "text-gray-300", children: e.content }) }) });
  }
}
function br({ website: e }) {
  return /* @__PURE__ */ r.jsxs("div", { className: "generated-website bg-gray-950 text-white min-h-full", children: [
    /* @__PURE__ */ r.jsx("style", { children: `
        .generated-website {
          font-family: Inter, system-ui, -apple-system, sans-serif;
        }
        .animate-in {
          animation: fadeSlideIn 0.6s ease forwards;
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      ` }),
    e.title && /* @__PURE__ */ r.jsxs("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 py-3 px-6 text-center", children: [
      /* @__PURE__ */ r.jsx("h1", { className: "text-lg font-semibold", children: e.title }),
      e.description && /* @__PURE__ */ r.jsx("p", { className: "text-sm text-white/70", children: e.description })
    ] }),
    e.sections.map((t, n) => /* @__PURE__ */ r.jsx(yr, { section: t, index: n }, t.id || n))
  ] });
}
function vr(e) {
  try {
    const t = e.indexOf("{");
    if (t === -1) return {};
    const n = e.slice(t);
    try {
      return JSON.parse(n);
    } catch {
    }
    const s = n.match(/"sections"\s*:\s*\[(.*?)\]/s);
    if (s) {
      const i = { sections: [] }, o = s[1], l = /\{[^}]+\}/g, c = o.match(l) || [];
      for (const a of c)
        try {
          const p = JSON.parse(a);
          p.id && p.type && i.sections.push(p);
        } catch {
        }
      return i;
    }
    return {};
  } catch {
    return {};
  }
}
function vn() {
  const [e, t] = C(""), [n, s] = C(!1), [i, o] = C(null), [l, c] = C(""), [a, p] = C(null);
  async function f(u) {
    var x, h, y;
    if (u.trim()) {
      s(!0), o(null), c(""), p(null);
      try {
        const m = await fetch("http://100.116.54.125:1234/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer lm-studio"
          },
          body: JSON.stringify({
            model: "qwen3.5-27b",
            messages: [{
              role: "user",
              content: `Generate a complete website structure for: ${u}
            
            Return ONLY valid JSON in this exact format (no markdown, no explanation):
            {
              "title": "Website Title",
              "description": "Brief description",
              "sections": [
                {"id": "nav1", "type": "nav", "content": "Navigation links JSON string"},
                {"id": "hero1", "type": "hero", "content": "JSON with headline and subtext"},
                {"id": "features1", "type": "features", "content": "JSON array of features"},
                {"id": "pricing1", "type": "pricing", "content": "JSON array of pricing tiers"},
                {"id": "cta1", "type": "cta", "content": "Call to action text"},
                {"id": "footer1", "type": "footer", "content": "Footer JSON with copyright"}
              ]
            }`
            }],
            stream: !0
          })
        });
        if (!m.ok)
          throw new Error(`HTTP error: ${m.status}`);
        const k = m.body.getReader(), b = new TextDecoder();
        let v = "";
        for (; ; ) {
          const { done: g, value: j } = await k.read();
          if (g) break;
          const T = b.decode(j).split(`
`);
          for (const $ of T)
            if ($.startsWith("data: ")) {
              const I = JSON.parse($.slice(6));
              if ((y = (h = (x = I.choices) == null ? void 0 : x[0]) == null ? void 0 : h.delta) != null && y.content) {
                v += I.choices[0].delta.content, c(v);
                try {
                  const E = vr(v);
                  E.sections && E.sections.length > 0 && o((M) => M ? { ...M, sections: E.sections } : { title: "", description: "", sections: E.sections }), E.title && !(i != null && i.title) && o((M) => M ? { ...M, title: E.title } : { title: E.title, description: "", sections: [] });
                } catch {
                }
              }
            }
        }
        try {
          const g = v.match(/\{[\s\S]*\}/);
          if (g) {
            const j = JSON.parse(g[0]);
            o(j);
          } else
            throw new Error("No JSON found in response");
        } catch (g) {
          console.error("Failed to parse website JSON:", g), p("Failed to parse website structure. Please try again.");
        }
      } catch (m) {
        p(`Error: ${m instanceof Error ? m.message : "Unknown error"}`);
      }
      s(!1);
    }
  }
  return /* @__PURE__ */ r.jsxs("div", { className: "live-website-generator flex flex-col h-full", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "prompt-bar flex gap-3 mb-4", children: [
      /* @__PURE__ */ r.jsx(
        "input",
        {
          type: "text",
          value: e,
          onChange: (u) => t(u.target.value),
          placeholder: "Describe the website you want to generate...",
          className: "input flex-1",
          onKeyDown: (u) => u.key === "Enter" && !n && f(e)
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          onClick: () => f(e),
          disabled: n || !e.trim(),
          className: "btn btn-primary",
          children: n ? "⏳ Generating..." : "🌐 Generate"
        }
      )
    ] }),
    a && /* @__PURE__ */ r.jsx("div", { className: "bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 text-red-400", children: a }),
    /* @__PURE__ */ r.jsx("div", { className: "preview-area flex-1 overflow-auto bg-gray-900/50 rounded-xl border border-white/10", children: i && i.sections.length > 0 ? /* @__PURE__ */ r.jsx(br, { website: i }) : /* @__PURE__ */ r.jsx("div", { className: "placeholder h-full flex flex-col items-center justify-center p-8 text-gray-400", children: l ? /* @__PURE__ */ r.jsxs("div", { className: "w-full max-w-2xl", children: [
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-gray-500 mb-2", children: "Streaming JSON..." }),
      /* @__PURE__ */ r.jsx("pre", { className: "bg-black/50 p-4 rounded-lg text-xs overflow-auto max-h-60 text-purple-400", children: l.slice(-500) })
    ] }) : /* @__PURE__ */ r.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ r.jsx("div", { className: "text-4xl mb-4", children: "🌐" }),
      /* @__PURE__ */ r.jsx("p", { className: "text-gray-400", children: "Enter a prompt to generate a website..." }),
      /* @__PURE__ */ r.jsx("p", { className: "text-sm text-gray-500 mt-2", children: 'Try: "AI startup landing page" or "E-commerce store"' })
    ] }) }) })
  ] });
}
export {
  $r as AdaptiveLayout,
  pn as AnimatedGrid,
  fn as Badge,
  hn as BentoGrid,
  gn as BentoItem,
  on as Button,
  sn as CanvasRenderer,
  ln as Card,
  un as CardContent,
  cn as CardHeader,
  dn as CardTitle,
  Er as ChunkStream,
  zt as CodeBlock,
  Gt as DataChart,
  Yt as DataTable,
  xn as FadeIn,
  Mr as GlowBorder,
  Or as GradientMesh,
  Pt as GridLayout,
  dr as Input,
  qt as ListCard,
  vn as LiveWebsiteGenerator,
  Fr as LoadingBars,
  Dr as LoadingDots,
  Br as LoadingOrb,
  zr as LoadingPulse,
  Wr as LoadingSpinner,
  Cr as MasonryLayout,
  bn as OrbitingShapes,
  Ar as ParticleEmitter,
  wr as PretextCanvas,
  Tr as PretextLayout,
  Ir as PretextStream,
  Sr as PretextText,
  Zt as QuestionBubble,
  Ee as Shimmer,
  Lr as Skeleton,
  Pr as SmartMessage,
  Rr as StackLayout,
  _r as StreamableText,
  Nr as StreamingCard,
  Qt as SummaryCard,
  yn as TextGradient,
  nn as UIErrorBoundary,
  Dt as VoteCard,
  br as WebsitePreview,
  mn as WordRotate,
  kr as calculateLayout,
  lr as defaultConfig,
  or as useAutoHealingUI,
  an as useAutoHealingUIDefault,
  Jr as useCanvas,
  Vr as useCanvasText,
  Gr as useDebounce,
  Kr as useDebouncedCallback,
  qr as useDebouncedValues,
  rn as useGestures,
  Qr as useInfiniteScroll,
  rt as useIntersection,
  en as useKeyPress,
  Zr as useKeyboard,
  tn as useKeysPressed,
  Xr as useLazyLoad,
  Ur as useParticleEmitter,
  Qe as usePretext,
  Yr as usePretextStream,
  nr as useStreaming,
  Hr as useStreamingChunks,
  ke as useTextMeasurement
};
//# sourceMappingURL=index.mjs.map
