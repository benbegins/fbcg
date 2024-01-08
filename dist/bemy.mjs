var Bt = Object.defineProperty, Rt = (e, t, i) => t in e ? Bt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i, j = (e, t, i) => (Rt(e, typeof t != "symbol" ? t + "" : t, i), i);
function Ht(e, t) {
  const i = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    i[s[r]] = !0;
  return t ? (r) => !!i[r.toLowerCase()] : (r) => !!i[r];
}
function at(e) {
  if (z(e)) {
    const t = {};
    for (let i = 0; i < e.length; i++) {
      const s = e[i], r = X(s) ? Yt(s) : at(s);
      if (r)
        for (const n in r)
          t[n] = r[n];
    }
    return t;
  } else if (X(e) || R(e))
    return e;
}
const jt = /;(?![^(]*\))/g, Wt = /:(.+)/;
function Yt(e) {
  const t = {};
  return e.split(jt).forEach((i) => {
    if (i) {
      const s = i.split(Wt);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function dt(e) {
  let t = "";
  if (X(e))
    t = e;
  else if (z(e))
    for (let i = 0; i < e.length; i++) {
      const s = dt(e[i]);
      s && (t += s + " ");
    }
  else if (R(e))
    for (const i in e)
      e[i] && (t += i + " ");
  return t.trim();
}
function qt(e, t) {
  if (e.length !== t.length)
    return !1;
  let i = !0;
  for (let s = 0; i && s < e.length; s++)
    i = q(e[s], t[s]);
  return i;
}
function q(e, t) {
  if (e === t)
    return !0;
  let i = Fe(e), s = Fe(t);
  if (i || s)
    return i && s ? e.getTime() === t.getTime() : !1;
  if (i = z(e), s = z(t), i || s)
    return i && s ? qt(e, t) : !1;
  if (i = R(e), s = R(t), i || s) {
    if (!i || !s)
      return !1;
    const r = Object.keys(e).length, n = Object.keys(t).length;
    if (r !== n)
      return !1;
    for (const l in e) {
      const o = e.hasOwnProperty(l), a = t.hasOwnProperty(l);
      if (o && !a || !o && a || !q(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function ce(e, t) {
  return e.findIndex((i) => q(i, t));
}
const Xt = Object.assign, Kt = (e, t) => {
  const i = e.indexOf(t);
  i > -1 && e.splice(i, 1);
}, Ut = Object.prototype.hasOwnProperty, Le = (e, t) => Ut.call(e, t), z = Array.isArray, fe = (e) => ct(e) === "[object Map]", Fe = (e) => e instanceof Date, X = (e) => typeof e == "string", ze = (e) => typeof e == "symbol", R = (e) => e !== null && typeof e == "object", Jt = Object.prototype.toString, ct = (e) => Jt.call(e), Zt = (e) => ct(e).slice(8, -1), ke = (e) => X(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ft = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (i) => t[i] || (t[i] = e(i));
}, Qt = /-(\w)/g, ei = ft((e) => e.replace(Qt, (t, i) => i ? i.toUpperCase() : "")), ti = /\B([A-Z])/g, ut = ft((e) => e.replace(ti, "-$1").toLowerCase()), ii = (e, t) => !Object.is(e, t), Be = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let si;
function pt(e, t) {
  t = t || si, t && t.active && t.effects.push(e);
}
const ht = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, mt = (e) => (e.w & H) > 0, gt = (e) => (e.n & H) > 0, ri = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= H;
}, ni = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let i = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      mt(r) && !gt(r) ? r.delete(e) : t[i++] = r, r.w &= ~H, r.n &= ~H;
    }
    t.length = i;
  }
}, Se = /* @__PURE__ */ new WeakMap();
let Z = 0, H = 1;
const Te = 30, J = [];
let W;
const ie = Symbol(""), Re = Symbol("");
class li {
  constructor(t, i = null, s) {
    this.fn = t, this.scheduler = i, this.active = !0, this.deps = [], pt(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    if (!J.includes(this))
      try {
        return J.push(W = this), ci(), H = 1 << ++Z, Z <= Te ? ri(this) : He(this), this.fn();
      } finally {
        Z <= Te && ni(this), H = 1 << --Z, vt(), J.pop();
        const t = J.length;
        W = t > 0 ? J[t - 1] : void 0;
      }
  }
  stop() {
    this.active && (He(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function He(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let i = 0; i < t.length; i++)
      t[i].delete(e);
    t.length = 0;
  }
}
function oi(e, t) {
  e.effect && (e = e.effect.fn);
  const i = new li(e);
  t && (Xt(i, t), t.scope && pt(i, t.scope)), (!t || !t.lazy) && i.run();
  const s = i.run.bind(i);
  return s.effect = i, s;
}
function ai(e) {
  e.effect.stop();
}
let K = !0;
const _e = [];
function di() {
  _e.push(K), K = !1;
}
function ci() {
  _e.push(K), K = !0;
}
function vt() {
  const e = _e.pop();
  K = e === void 0 ? !0 : e;
}
function oe(e, t, i) {
  if (!fi())
    return;
  let s = Se.get(e);
  s || Se.set(e, s = /* @__PURE__ */ new Map());
  let r = s.get(i);
  r || s.set(i, r = ht()), ui(r);
}
function fi() {
  return K && W !== void 0;
}
function ui(e, t) {
  let i = !1;
  Z <= Te ? gt(e) || (e.n |= H, i = !mt(e)) : i = !e.has(W), i && (e.add(W), W.deps.push(e));
}
function be(e, t, i, s, r, n) {
  const l = Se.get(e);
  if (!l)
    return;
  let o = [];
  if (t === "clear")
    o = [...l.values()];
  else if (i === "length" && z(e))
    l.forEach((a, d) => {
      (d === "length" || d >= s) && o.push(a);
    });
  else
    switch (i !== void 0 && o.push(l.get(i)), t) {
      case "add":
        z(e) ? ke(i) && o.push(l.get("length")) : (o.push(l.get(ie)), fe(e) && o.push(l.get(Re)));
        break;
      case "delete":
        z(e) || (o.push(l.get(ie)), fe(e) && o.push(l.get(Re)));
        break;
      case "set":
        fe(e) && o.push(l.get(ie));
        break;
    }
  if (o.length === 1)
    o[0] && je(o[0]);
  else {
    const a = [];
    for (const d of o)
      d && a.push(...d);
    je(ht(a));
  }
}
function je(e, t) {
  for (const i of z(e) ? e : [...e])
    (i !== W || i.allowRecurse) && (i.scheduler ? i.scheduler() : i.run());
}
const pi = Ht("__proto__,__v_isRef,__isVue"), wt = new Set(Object.getOwnPropertyNames(Symbol).map((e) => Symbol[e]).filter(ze)), hi = St(), mi = St(!0), We = gi();
function gi() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...i) {
      const s = Y(this);
      for (let n = 0, l = this.length; n < l; n++)
        oe(s, "get", n + "");
      const r = s[t](...i);
      return r === -1 || r === !1 ? s[t](...i.map(Y)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...i) {
      di();
      const s = Y(this)[t].apply(this, i);
      return vt(), s;
    };
  }), e;
}
function St(e = !1, t = !1) {
  return function(i, s, r) {
    if (s === "__v_isReactive")
      return !e;
    if (s === "__v_isReadonly")
      return e;
    if (s === "__v_raw" && r === (e ? t ? Pi : bt : t ? Ei : Tt).get(i))
      return i;
    const n = z(i);
    if (!e && n && Le(We, s))
      return Reflect.get(We, s, r);
    const l = Reflect.get(i, s, r);
    return (ze(s) ? wt.has(s) : pi(s)) || (e || oe(i, "get", s), t) ? l : xe(l) ? !n || !ke(s) ? l.value : l : R(l) ? e ? Ii(l) : ae(l) : l;
  };
}
const vi = wi();
function wi(e = !1) {
  return function(t, i, s, r) {
    let n = t[i];
    if (!e && !Oi(s) && (s = Y(s), n = Y(n), !z(t) && xe(n) && !xe(s)))
      return n.value = s, !0;
    const l = z(t) && ke(i) ? Number(i) < t.length : Le(t, i), o = Reflect.set(t, i, s, r);
    return t === Y(r) && (l ? ii(s, n) && be(t, "set", i, s) : be(t, "add", i, s)), o;
  };
}
function Si(e, t) {
  const i = Le(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && i && be(e, "delete", t, void 0), s;
}
function Ti(e, t) {
  const i = Reflect.has(e, t);
  return (!ze(t) || !wt.has(t)) && oe(e, "has", t), i;
}
function bi(e) {
  return oe(e, "iterate", z(e) ? "length" : ie), Reflect.ownKeys(e);
}
const xi = { get: hi, set: vi, deleteProperty: Si, has: Ti, ownKeys: bi }, yi = { get: mi, set(e, t) {
  return !0;
}, deleteProperty(e, t) {
  return !0;
} }, Tt = /* @__PURE__ */ new WeakMap(), Ei = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), Pi = /* @__PURE__ */ new WeakMap();
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
function Ci(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Mi(Zt(e));
}
function ae(e) {
  return e && e.__v_isReadonly ? e : xt(e, !1, xi, null, Tt);
}
function Ii(e) {
  return xt(e, !0, yi, null, bt);
}
function xt(e, t, i, s, r) {
  if (!R(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const n = r.get(e);
  if (n)
    return n;
  const l = Ci(e);
  if (l === 0)
    return e;
  const o = new Proxy(e, l === 2 ? s : i);
  return r.set(e, o), o;
}
function Oi(e) {
  return !!(e && e.__v_isReadonly);
}
function Y(e) {
  const t = e && e.__v_raw;
  return t ? Y(t) : e;
}
function xe(e) {
  return !!(e && e.__v_isRef === !0);
}
Promise.resolve();
let ye = !1;
const re = [], Ai = Promise.resolve(), de = (e) => Ai.then(e), Ye = (e) => {
  re.includes(e) || re.push(e), ye || (ye = !0, de(Li));
}, Li = () => {
  for (const e of re)
    e();
  re.length = 0, ye = !1;
}, zi = /^(spellcheck|draggable|form|list|type)$/, Ee = ({ el: e, get: t, effect: i, arg: s, modifiers: r }) => {
  let n;
  s === "class" && (e._class = e.className), i(() => {
    let l = t();
    if (s)
      r != null && r.camel && (s = ei(s)), ue(e, s, l, n);
    else {
      for (const o in l)
        ue(e, o, l[o], n && n[o]);
      for (const o in n)
        (!l || !(o in l)) && ue(e, o, null);
    }
    n = l;
  });
}, ue = (e, t, i, s) => {
  if (t === "class")
    e.setAttribute("class", dt(e._class ? [e._class, i] : i) || "");
  else if (t === "style") {
    i = at(i);
    const { style: r } = e;
    if (!i)
      e.removeAttribute("style");
    else if (X(i))
      i !== s && (r.cssText = i);
    else {
      for (const n in i)
        Pe(r, n, i[n]);
      if (s && !X(s))
        for (const n in s)
          i[n] == null && Pe(r, n, "");
    }
  } else
    !(e instanceof SVGElement) && t in e && !zi.test(t) ? (e[t] = i, t === "value" && (e._value = i)) : t === "true-value" ? e._trueValue = i : t === "false-value" ? e._falseValue = i : i != null ? e.setAttribute(t, i) : e.removeAttribute(t);
}, qe = /\s*!important$/, Pe = (e, t, i) => {
  z(i) ? i.forEach((s) => Pe(e, t, s)) : t.startsWith("--") ? e.setProperty(t, i) : qe.test(i) ? e.setProperty(ut(t), i.replace(qe, ""), "important") : e[t] = i;
}, F = (e, t) => {
  const i = e.getAttribute(t);
  return i != null && e.removeAttribute(t), i;
}, N = (e, t, i, s) => {
  e.addEventListener(t, i, s);
}, ki = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, _i = ["ctrl", "shift", "alt", "meta"], Gi = { stop: (e) => e.stopPropagation(), prevent: (e) => e.preventDefault(), self: (e) => e.target !== e.currentTarget, ctrl: (e) => !e.ctrlKey, shift: (e) => !e.shiftKey, alt: (e) => !e.altKey, meta: (e) => !e.metaKey, left: (e) => "button" in e && e.button !== 0, middle: (e) => "button" in e && e.button !== 1, right: (e) => "button" in e && e.button !== 2, exact: (e, t) => _i.some((i) => e[`${i}Key`] && !t[i]) }, yt = ({ el: e, get: t, exp: i, arg: s, modifiers: r }) => {
  if (!s)
    return;
  let n = ki.test(i) ? t(`(e => ${i}(e))`) : t(`($event => { ${i} })`);
  if (s === "vue:mounted") {
    de(n);
    return;
  } else if (s === "vue:unmounted")
    return () => n();
  if (r) {
    s === "click" && (r.right && (s = "contextmenu"), r.middle && (s = "mouseup"));
    const l = n;
    n = (o) => {
      if (!("key" in o && !(ut(o.key) in r))) {
        for (const a in r) {
          const d = Gi[a];
          if (d && d(o, r))
            return;
        }
        return l(o);
      }
    };
  }
  N(e, s, n, r);
}, Vi = ({ el: e, get: t, effect: i }) => {
  const s = e.style.display;
  i(() => {
    e.style.display = t() ? s : "none";
  });
}, Et = ({ el: e, get: t, effect: i }) => {
  i(() => {
    e.textContent = Pt(t());
  });
}, Pt = (e) => e == null ? "" : R(e) ? JSON.stringify(e, null, 2) : String(e), Di = ({ el: e, get: t, effect: i }) => {
  i(() => {
    e.innerHTML = t();
  });
}, $i = ({ el: e, exp: t, get: i, effect: s, modifiers: r }) => {
  const n = e.type, l = i(`(val) => { ${t} = val }`), { trim: o, number: a = n === "number" } = r || {};
  if (e.tagName === "SELECT") {
    const d = e;
    N(e, "change", () => {
      const c = Array.prototype.filter.call(d.options, (f) => f.selected).map((f) => a ? Be($(f)) : $(f));
      l(d.multiple ? c : c[0]);
    }), s(() => {
      const c = i(), f = d.multiple;
      for (let u = 0, p = d.options.length; u < p; u++) {
        const h = d.options[u], v = $(h);
        if (f)
          z(c) ? h.selected = ce(c, v) > -1 : h.selected = c.has(v);
        else if (q($(h), c)) {
          d.selectedIndex !== u && (d.selectedIndex = u);
          return;
        }
      }
      !f && d.selectedIndex !== -1 && (d.selectedIndex = -1);
    });
  } else if (n === "checkbox") {
    N(e, "change", () => {
      const c = i(), f = e.checked;
      if (z(c)) {
        const u = $(e), p = ce(c, u), h = p !== -1;
        if (f && !h)
          l(c.concat(u));
        else if (!f && h) {
          const v = [...c];
          v.splice(p, 1), l(v);
        }
      } else
        l(Xe(e, f));
    });
    let d;
    s(() => {
      const c = i();
      z(c) ? e.checked = ce(c, $(e)) > -1 : c !== d && (e.checked = q(c, Xe(e, !0))), d = c;
    });
  } else if (n === "radio") {
    N(e, "change", () => {
      l($(e));
    });
    let d;
    s(() => {
      const c = i();
      c !== d && (e.checked = q(c, $(e)));
    });
  } else {
    const d = (c) => o ? c.trim() : a ? Be(c) : c;
    N(e, "compositionstart", Ni), N(e, "compositionend", Fi), N(e, r != null && r.lazy ? "change" : "input", () => {
      e.composing || l(d(e.value));
    }), o && N(e, "change", () => {
      e.value = e.value.trim();
    }), s(() => {
      if (e.composing)
        return;
      const c = e.value, f = i();
      document.activeElement === e && d(c) === f || c !== f && (e.value = f);
    });
  }
}, $ = (e) => "_value" in e ? e._value : e.value, Xe = (e, t) => {
  const i = t ? "_trueValue" : "_falseValue";
  return i in e ? e[i] : t;
}, Ni = (e) => {
  e.target.composing = !0;
}, Fi = (e) => {
  const t = e.target;
  t.composing && (t.composing = !1, Bi(t, "input"));
}, Bi = (e, t) => {
  const i = document.createEvent("HTMLEvents");
  i.initEvent(t, !0, !0), e.dispatchEvent(i);
}, Ke = /* @__PURE__ */ Object.create(null), Q = (e, t, i) => Mt(e, `return(${t})`, i), Mt = (e, t, i) => {
  const s = Ke[t] || (Ke[t] = Ri(t));
  try {
    return s(e, i);
  } catch (r) {
    console.error(r);
  }
}, Ri = (e) => {
  try {
    return new Function("$data", "$el", `with($data){${e}}`);
  } catch (t) {
    return console.error(`${t.message} in expression: ${e}`), () => {
    };
  }
}, Hi = ({ el: e, ctx: t, exp: i, effect: s }) => {
  de(() => s(() => Mt(t.scope, i, e)));
}, ji = { bind: Ee, on: yt, show: Vi, text: Et, html: Di, model: $i, effect: Hi }, Wi = (e, t, i) => {
  const s = e.parentElement, r = new Comment("v-if");
  s.insertBefore(r, e);
  const n = [{ exp: t, el: e }];
  let l, o;
  for (; (l = e.nextElementSibling) && (o = null, F(l, "v-else") === "" || (o = F(l, "v-else-if"))); )
    s.removeChild(l), n.push({ exp: o, el: l });
  const a = e.nextSibling;
  s.removeChild(e);
  let d, c = -1;
  const f = () => {
    d && (s.insertBefore(r, d.el), d.remove(), d = void 0);
  };
  return i.effect(() => {
    for (let u = 0; u < n.length; u++) {
      const { exp: p, el: h } = n[u];
      if (!p || Q(i.scope, p)) {
        u !== c && (f(), d = new Ge(h, i), d.insert(s, r), s.removeChild(r), c = u);
        return;
      }
    }
    c = -1, f();
  }), a;
}, Yi = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, Ue = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, qi = /^\(|\)$/g, Xi = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/, Ki = (e, t, i) => {
  const s = t.match(Yi);
  if (!s)
    return;
  const r = e.nextSibling, n = e.parentElement, l = new Text("");
  n.insertBefore(l, e), n.removeChild(e);
  const o = s[2].trim();
  let a = s[1].trim().replace(qi, "").trim(), d, c = !1, f, u, p = "key", h = e.getAttribute(p) || e.getAttribute(p = ":key") || e.getAttribute(p = "v-bind:key");
  h && (e.removeAttribute(p), p === "key" && (h = JSON.stringify(h)));
  let v;
  (v = a.match(Ue)) && (a = a.replace(Ue, "").trim(), f = v[1].trim(), v[2] && (u = v[2].trim())), (v = a.match(Xi)) && (d = v[1].split(",").map((I) => I.trim()), c = a[0] === "[");
  let y = !1, g, x, w;
  const S = (I) => {
    const P = /* @__PURE__ */ new Map(), O = [];
    if (z(I))
      for (let m = 0; m < I.length; m++)
        O.push(M(P, I[m], m));
    else if (typeof I == "number")
      for (let m = 0; m < I; m++)
        O.push(M(P, m + 1, m));
    else if (R(I)) {
      let m = 0;
      for (const T in I)
        O.push(M(P, I[T], m++, T));
    }
    return [O, P];
  }, M = (I, P, O, m) => {
    const T = {};
    d ? d.forEach((C, L) => T[C] = P[c ? L : C]) : T[a] = P, m ? (f && (T[f] = m), u && (T[u] = O)) : f && (T[f] = O);
    const E = At(i, T), b = h ? Q(E.scope, h) : O;
    return I.set(b, O), E.key = b, E;
  }, A = (I, P) => {
    const O = new Ge(e, I);
    return O.key = I.key, O.insert(n, P), O;
  };
  return i.effect(() => {
    const I = Q(i.scope, o), P = w;
    if ([x, w] = S(I), !y)
      g = x.map((O) => A(O, l)), y = !0;
    else {
      for (let b = 0; b < g.length; b++)
        w.has(g[b].key) || g[b].remove();
      const O = [];
      let m = x.length, T, E;
      for (; m--; ) {
        const b = x[m], C = P.get(b.key);
        let L;
        C == null ? L = A(b, T ? T.el : l) : (L = g[C], Object.assign(L.ctx.scope, b.scope), C !== m && (g[C + 1] !== T || E === T) && (E = L, L.insert(n, T ? T.el : l))), O.unshift(T = L);
      }
      g = O;
    }
  }), r;
}, Ct = ({ el: e, ctx: { scope: { $refs: t } }, get: i, effect: s }) => {
  let r;
  return s(() => {
    const n = i();
    t[n] = e, r && n !== r && delete t[r], r = n;
  }), () => {
    r && delete t[r];
  };
}, Ui = /^(?:v-|:|@)/, Ji = /\.([\w-]+)/g;
let Me = !1;
const It = (e, t) => {
  const i = e.nodeType;
  if (i === 1) {
    const s = e;
    if (s.hasAttribute("v-pre"))
      return;
    F(s, "v-cloak");
    let r;
    if (r = F(s, "v-if"))
      return Wi(s, r, t);
    if (r = F(s, "v-for"))
      return Ki(s, r, t);
    if ((r = F(s, "v-scope")) || r === "") {
      const o = r ? Q(t.scope, r) : {};
      t = At(t, o), o.$template && Zi(s, o.$template);
    }
    const n = F(s, "v-once") != null;
    n && (Me = !0), (r = F(s, "ref")) && Ce(s, Ct, `"${r}"`, t), Je(s, t);
    const l = [];
    for (const { name: o, value: a } of [...s.attributes])
      Ui.test(o) && o !== "v-cloak" && (o === "v-model" ? l.unshift([o, a]) : o[0] === "@" || /^v-on\b/.test(o) ? l.push([o, a]) : Ze(s, o, a, t));
    for (const [o, a] of l)
      Ze(s, o, a, t);
    n && (Me = !1);
  } else if (i === 3) {
    const s = e.data;
    if (s.includes(t.delimiters[0])) {
      let r = [], n = 0, l;
      for (; l = t.delimitersRE.exec(s); ) {
        const o = s.slice(n, l.index);
        o && r.push(JSON.stringify(o)), r.push(`$s(${l[1]})`), n = l.index + l[0].length;
      }
      n < s.length && r.push(JSON.stringify(s.slice(n))), Ce(e, Et, r.join("+"), t);
    }
  } else
    i === 11 && Je(e, t);
}, Je = (e, t) => {
  let i = e.firstChild;
  for (; i; )
    i = It(i, t) || i.nextSibling;
}, Ze = (e, t, i, s) => {
  let r, n, l;
  if (t = t.replace(Ji, (o, a) => ((l || (l = {}))[a] = !0, "")), t[0] === ":")
    r = Ee, n = t.slice(1);
  else if (t[0] === "@")
    r = yt, n = t.slice(1);
  else {
    const o = t.indexOf(":"), a = o > 0 ? t.slice(2, o) : t.slice(2);
    r = ji[a] || s.dirs[a], n = o > 0 ? t.slice(o + 1) : void 0;
  }
  r && (r === Ee && n === "ref" && (r = Ct), Ce(e, r, i, s, n, l), e.removeAttribute(t));
}, Ce = (e, t, i, s, r, n) => {
  const l = t({ el: e, get: (o = i) => Q(s.scope, o, e), effect: s.effect, ctx: s, exp: i, arg: r, modifiers: n });
  l && s.cleanups.push(l);
}, Zi = (e, t) => {
  if (t[0] === "#") {
    const i = document.querySelector(t);
    e.appendChild(i.content.cloneNode(!0));
    return;
  }
  e.innerHTML = t;
}, Ot = (e) => {
  const t = { delimiters: ["{{", "}}"], delimitersRE: /\{\{([^]+?)\}\}/g, ...e, scope: e ? e.scope : ae({}), dirs: e ? e.dirs : {}, effects: [], blocks: [], cleanups: [], effect: (i) => {
    if (Me)
      return Ye(i), i;
    const s = oi(i, { scheduler: () => Ye(s) });
    return t.effects.push(s), s;
  } };
  return t;
}, At = (e, t = {}) => {
  const i = e.scope, s = Object.create(i);
  Object.defineProperties(s, Object.getOwnPropertyDescriptors(t)), s.$refs = Object.create(i.$refs);
  const r = ae(new Proxy(s, { set(n, l, o, a) {
    return a === r && !n.hasOwnProperty(l) ? Reflect.set(i, l, o) : Reflect.set(n, l, o, a);
  } }));
  return Lt(r), { ...e, scope: r };
}, Lt = (e) => {
  for (const t of Object.keys(e))
    typeof e[t] == "function" && (e[t] = e[t].bind(e));
};
class Ge {
  constructor(t, i, s = !1) {
    j(this, "template"), j(this, "ctx"), j(this, "key"), j(this, "parentCtx"), j(this, "isFragment"), j(this, "start"), j(this, "end"), this.isFragment = t instanceof HTMLTemplateElement, s ? this.template = t : this.isFragment ? this.template = t.content.cloneNode(!0) : this.template = t.cloneNode(!0), s ? this.ctx = i : (this.parentCtx = i, i.blocks.push(this), this.ctx = Ot(i)), It(this.template, this.ctx);
  }
  get el() {
    return this.start || this.template;
  }
  insert(t, i = null) {
    if (this.isFragment)
      if (this.start) {
        let s = this.start, r;
        for (; s && (r = s.nextSibling, t.insertBefore(s, i), s !== this.end); )
          s = r;
      } else
        this.start = new Text(""), this.end = new Text(""), t.insertBefore(this.end, i), t.insertBefore(this.start, this.end), t.insertBefore(this.template, this.end);
    else
      t.insertBefore(this.template, i);
  }
  remove() {
    if (this.parentCtx && Kt(this.parentCtx.blocks, this), this.start) {
      const t = this.start.parentNode;
      let i = this.start, s;
      for (; i && (s = i.nextSibling, t.removeChild(i), i !== this.end); )
        i = s;
    } else
      this.template.parentNode.removeChild(this.template);
    this.teardown();
  }
  teardown() {
    this.ctx.blocks.forEach((t) => {
      t.teardown();
    }), this.ctx.effects.forEach(ai), this.ctx.cleanups.forEach((t) => t());
  }
}
const Qe = (e) => e.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), zt = (e) => {
  const t = Ot();
  if (e && (t.scope = ae(e), Lt(t.scope), e.$delimiters)) {
    const [s, r] = t.delimiters = e.$delimiters;
    t.delimitersRE = new RegExp(Qe(s) + "([^]+?)" + Qe(r), "g");
  }
  t.scope.$s = Pt, t.scope.$nextTick = de, t.scope.$refs = /* @__PURE__ */ Object.create(null);
  let i;
  return { directive(s, r) {
    return r ? (t.dirs[s] = r, this) : t.dirs[s];
  }, mount(s) {
    if (typeof s == "string" && (s = document.querySelector(s), !s))
      return;
    s = s || document.documentElement;
    let r;
    return s.hasAttribute("v-scope") ? r = [s] : r = [...s.querySelectorAll("[v-scope]")].filter((n) => !n.matches("[v-scope] [v-scope]")), r.length || (r = [s]), i = r.map((n) => new Ge(n, t, !0)), this;
  }, unmount() {
    i.forEach((s) => s.teardown());
  } };
}, et = document.currentScript;
et && et.hasAttribute("init") && zt().mount();
function Qi(e) {
  return {
    siteHeader: null,
    menuOpen: !1,
    submenuOpen: !1,
    toggleMenu() {
      this.menuOpen = !this.menuOpen, this.menuOpen || this.closeAllSubmenus();
    },
    scrollEvent(t) {
      this.siteHeader = t, window.addEventListener("scroll", () => {
        window.scrollY > 50 ? t.classList.add("is-scrolling") : t.classList.remove("is-scrolling"), this.submenuOpen && this.closeAllSubmenus();
      }), window.addEventListener("resize", () => {
        window.innerWidth >= 1024 && this.closeAllSubmenus();
      });
    },
    toggleSubmenu(t) {
      const i = t.nextElementSibling, s = t.getAttribute("aria-expanded") === "true" || !1;
      if (this.submenuOpen && window.innerWidth >= 1024 && this.closeAllSubmenus(), s)
        this.submenuOpen = !1, i.style.height = 0, i.style.opacity = 0, i.setAttribute("aria-hidden", !0);
      else {
        this.submenuOpen = !0;
        const r = i.scrollHeight;
        i.style.height = r + "px", i.style.opacity = 1, i.setAttribute("aria-hidden", !1), t.classList.add("active");
      }
      t.setAttribute("aria-expanded", !s);
    },
    closeAllSubmenus() {
      const t = this.siteHeader.querySelectorAll(".site-header__submenu"), i = this.siteHeader.querySelectorAll(".btn-submenu");
      t.length !== 0 && i.length !== 0 && (t.forEach((s) => {
        s.style.height = 0, s.style.opacity = 0, s.setAttribute("aria-hidden", !0);
      }), i.forEach((s) => {
        s.setAttribute("aria-expanded", !1), s.classList.remove("active");
      }));
    }
  };
}
function tt(e) {
  return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object;
}
function Ve(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = {}), Object.keys(t).forEach((i) => {
    typeof e[i] > "u" ? e[i] = t[i] : tt(t[i]) && tt(e[i]) && Object.keys(t[i]).length > 0 && Ve(e[i], t[i]);
  });
}
const kt = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function U() {
  const e = typeof document < "u" ? document : {};
  return Ve(e, kt), e;
}
const es = {
  document: kt,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e);
  }
};
function _() {
  const e = typeof window < "u" ? window : {};
  return Ve(e, es), e;
}
function ts(e) {
  return e === void 0 && (e = ""), e.trim().split(" ").filter((t) => !!t.trim());
}
function is(e) {
  const t = e;
  Object.keys(t).forEach((i) => {
    try {
      t[i] = null;
    } catch {
    }
    try {
      delete t[i];
    } catch {
    }
  });
}
function Ie(e, t) {
  return t === void 0 && (t = 0), setTimeout(e, t);
}
function ne() {
  return Date.now();
}
function ss(e) {
  const t = _();
  let i;
  return t.getComputedStyle && (i = t.getComputedStyle(e, null)), !i && e.currentStyle && (i = e.currentStyle), i || (i = e.style), i;
}
function rs(e, t) {
  t === void 0 && (t = "x");
  const i = _();
  let s, r, n;
  const l = ss(e);
  return i.WebKitCSSMatrix ? (r = l.transform || l.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map((o) => o.replace(",", ".")).join(", ")), n = new i.WebKitCSSMatrix(r === "none" ? "" : r)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = n.toString().split(",")), t === "x" && (i.WebKitCSSMatrix ? r = n.m41 : s.length === 16 ? r = parseFloat(s[12]) : r = parseFloat(s[4])), t === "y" && (i.WebKitCSSMatrix ? r = n.m42 : s.length === 16 ? r = parseFloat(s[13]) : r = parseFloat(s[5])), r || 0;
}
function ee(e) {
  return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object";
}
function ns(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? e instanceof HTMLElement : e && (e.nodeType === 1 || e.nodeType === 11);
}
function k() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < arguments.length; i += 1) {
    const s = i < 0 || arguments.length <= i ? void 0 : arguments[i];
    if (s != null && !ns(s)) {
      const r = Object.keys(Object(s)).filter((n) => t.indexOf(n) < 0);
      for (let n = 0, l = r.length; n < l; n += 1) {
        const o = r[n], a = Object.getOwnPropertyDescriptor(s, o);
        a !== void 0 && a.enumerable && (ee(e[o]) && ee(s[o]) ? s[o].__swiper__ ? e[o] = s[o] : k(e[o], s[o]) : !ee(e[o]) && ee(s[o]) ? (e[o] = {}, s[o].__swiper__ ? e[o] = s[o] : k(e[o], s[o])) : e[o] = s[o]);
      }
    }
  }
  return e;
}
function te(e, t, i) {
  e.style.setProperty(t, i);
}
function _t(e) {
  let {
    swiper: t,
    targetPosition: i,
    side: s
  } = e;
  const r = _(), n = -t.translate;
  let l = null, o;
  const a = t.params.speed;
  t.wrapperEl.style.scrollSnapType = "none", r.cancelAnimationFrame(t.cssModeFrameID);
  const d = i > n ? "next" : "prev", c = (u, p) => d === "next" && u >= p || d === "prev" && u <= p, f = () => {
    o = (/* @__PURE__ */ new Date()).getTime(), l === null && (l = o);
    const u = Math.max(Math.min((o - l) / a, 1), 0), p = 0.5 - Math.cos(u * Math.PI) / 2;
    let h = n + p * (i - n);
    if (c(h, i) && (h = i), t.wrapperEl.scrollTo({
      [s]: h
    }), c(h, i)) {
      t.wrapperEl.style.overflow = "hidden", t.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        t.wrapperEl.style.overflow = "", t.wrapperEl.scrollTo({
          [s]: h
        });
      }), r.cancelAnimationFrame(t.cssModeFrameID);
      return;
    }
    t.cssModeFrameID = r.requestAnimationFrame(f);
  };
  f();
}
function V(e, t) {
  return t === void 0 && (t = ""), [...e.children].filter((i) => i.matches(t));
}
function le(e) {
  try {
    console.warn(e);
    return;
  } catch {
  }
}
function Oe(e, t) {
  t === void 0 && (t = []);
  const i = document.createElement(e);
  return i.classList.add(...Array.isArray(t) ? t : ts(t)), i;
}
function ls(e, t) {
  const i = [];
  for (; e.previousElementSibling; ) {
    const s = e.previousElementSibling;
    t ? s.matches(t) && i.push(s) : i.push(s), e = s;
  }
  return i;
}
function os(e, t) {
  const i = [];
  for (; e.nextElementSibling; ) {
    const s = e.nextElementSibling;
    t ? s.matches(t) && i.push(s) : i.push(s), e = s;
  }
  return i;
}
function B(e, t) {
  return _().getComputedStyle(e, null).getPropertyValue(t);
}
function it(e) {
  let t = e, i;
  if (t) {
    for (i = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (i += 1);
    return i;
  }
}
function as(e, t) {
  const i = [];
  let s = e.parentElement;
  for (; s; )
    t ? s.matches(t) && i.push(s) : i.push(s), s = s.parentElement;
  return i;
}
function st(e, t, i) {
  const s = _();
  return i ? e[t === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getComputedStyle(e, null).getPropertyValue(t === "width" ? "margin-right" : "margin-top")) + parseFloat(s.getComputedStyle(e, null).getPropertyValue(t === "width" ? "margin-left" : "margin-bottom")) : e.offsetWidth;
}
let pe;
function ds() {
  const e = _(), t = U();
  return {
    smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior" in t.documentElement.style,
    touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch)
  };
}
function Gt() {
  return pe || (pe = ds()), pe;
}
let he;
function cs(e) {
  let {
    userAgent: t
  } = e === void 0 ? {} : e;
  const i = Gt(), s = _(), r = s.navigator.platform, n = t || s.navigator.userAgent, l = {
    ios: !1,
    android: !1
  }, o = s.screen.width, a = s.screen.height, d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let c = n.match(/(iPad).*OS\s([\d_]+)/);
  const f = n.match(/(iPod)(.*OS\s([\d_]+))?/), u = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/), p = r === "Win32";
  let h = r === "MacIntel";
  const v = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !c && h && i.touch && v.indexOf(`${o}x${a}`) >= 0 && (c = n.match(/(Version)\/([\d.]+)/), c || (c = [0, 1, "13_0_0"]), h = !1), d && !p && (l.os = "android", l.android = !0), (c || u || f) && (l.os = "ios", l.ios = !0), l;
}
function fs(e) {
  return e === void 0 && (e = {}), he || (he = cs(e)), he;
}
let me;
function us() {
  const e = _();
  let t = !1;
  function i() {
    const s = e.navigator.userAgent.toLowerCase();
    return s.indexOf("safari") >= 0 && s.indexOf("chrome") < 0 && s.indexOf("android") < 0;
  }
  if (i()) {
    const s = String(e.navigator.userAgent);
    if (s.includes("Version/")) {
      const [r, n] = s.split("Version/")[1].split(" ")[0].split(".").map((l) => Number(l));
      t = r < 16 || r === 16 && n < 2;
    }
  }
  return {
    isSafari: t || i(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
  };
}
function ps() {
  return me || (me = us()), me;
}
function hs(e) {
  let {
    swiper: t,
    on: i,
    emit: s
  } = e;
  const r = _();
  let n = null, l = null;
  const o = () => {
    !t || t.destroyed || !t.initialized || (s("beforeResize"), s("resize"));
  }, a = () => {
    !t || t.destroyed || !t.initialized || (n = new ResizeObserver((f) => {
      l = r.requestAnimationFrame(() => {
        const {
          width: u,
          height: p
        } = t;
        let h = u, v = p;
        f.forEach((y) => {
          let {
            contentBoxSize: g,
            contentRect: x,
            target: w
          } = y;
          w && w !== t.el || (h = x ? x.width : (g[0] || g).inlineSize, v = x ? x.height : (g[0] || g).blockSize);
        }), (h !== u || v !== p) && o();
      });
    }), n.observe(t.el));
  }, d = () => {
    l && r.cancelAnimationFrame(l), n && n.unobserve && t.el && (n.unobserve(t.el), n = null);
  }, c = () => {
    !t || t.destroyed || !t.initialized || s("orientationchange");
  };
  i("init", () => {
    if (t.params.resizeObserver && typeof r.ResizeObserver < "u") {
      a();
      return;
    }
    r.addEventListener("resize", o), r.addEventListener("orientationchange", c);
  }), i("destroy", () => {
    d(), r.removeEventListener("resize", o), r.removeEventListener("orientationchange", c);
  });
}
function ms(e) {
  let {
    swiper: t,
    extendParams: i,
    on: s,
    emit: r
  } = e;
  const n = [], l = _(), o = function(c, f) {
    f === void 0 && (f = {});
    const u = l.MutationObserver || l.WebkitMutationObserver, p = new u((h) => {
      if (t.__preventObserver__)
        return;
      if (h.length === 1) {
        r("observerUpdate", h[0]);
        return;
      }
      const v = function() {
        r("observerUpdate", h[0]);
      };
      l.requestAnimationFrame ? l.requestAnimationFrame(v) : l.setTimeout(v, 0);
    });
    p.observe(c, {
      attributes: typeof f.attributes > "u" ? !0 : f.attributes,
      childList: typeof f.childList > "u" ? !0 : f.childList,
      characterData: typeof f.characterData > "u" ? !0 : f.characterData
    }), n.push(p);
  }, a = () => {
    if (t.params.observer) {
      if (t.params.observeParents) {
        const c = as(t.hostEl);
        for (let f = 0; f < c.length; f += 1)
          o(c[f]);
      }
      o(t.hostEl, {
        childList: t.params.observeSlideChildren
      }), o(t.wrapperEl, {
        attributes: !1
      });
    }
  }, d = () => {
    n.forEach((c) => {
      c.disconnect();
    }), n.splice(0, n.length);
  };
  i({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), s("init", a), s("destroy", d);
}
var gs = {
  on(e, t, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != "function")
      return s;
    const r = i ? "unshift" : "push";
    return e.split(" ").forEach((n) => {
      s.eventsListeners[n] || (s.eventsListeners[n] = []), s.eventsListeners[n][r](t);
    }), s;
  },
  once(e, t, i) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof t != "function")
      return s;
    function r() {
      s.off(e, r), r.__emitterProxy && delete r.__emitterProxy;
      for (var n = arguments.length, l = new Array(n), o = 0; o < n; o++)
        l[o] = arguments[o];
      t.apply(s, l);
    }
    return r.__emitterProxy = t, s.on(e, r, i);
  },
  onAny(e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function")
      return i;
    const s = t ? "unshift" : "push";
    return i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners)
      return t;
    const i = t.eventsAnyListeners.indexOf(e);
    return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
  },
  off(e, t) {
    const i = this;
    return !i.eventsListeners || i.destroyed || !i.eventsListeners || e.split(" ").forEach((s) => {
      typeof t > "u" ? i.eventsListeners[s] = [] : i.eventsListeners[s] && i.eventsListeners[s].forEach((r, n) => {
        (r === t || r.__emitterProxy && r.__emitterProxy === t) && i.eventsListeners[s].splice(n, 1);
      });
    }), i;
  },
  emit() {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsListeners)
      return e;
    let t, i, s;
    for (var r = arguments.length, n = new Array(r), l = 0; l < r; l++)
      n[l] = arguments[l];
    return typeof n[0] == "string" || Array.isArray(n[0]) ? (t = n[0], i = n.slice(1, n.length), s = e) : (t = n[0].events, i = n[0].data, s = n[0].context || e), i.unshift(s), (Array.isArray(t) ? t : t.split(" ")).forEach((a) => {
      e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((d) => {
        d.apply(s, [a, ...i]);
      }), e.eventsListeners && e.eventsListeners[a] && e.eventsListeners[a].forEach((d) => {
        d.apply(s, i);
      });
    }), e;
  }
};
function vs() {
  const e = this;
  let t, i;
  const s = e.el;
  typeof e.params.width < "u" && e.params.width !== null ? t = e.params.width : t = s.clientWidth, typeof e.params.height < "u" && e.params.height !== null ? i = e.params.height : i = s.clientHeight, !(t === 0 && e.isHorizontal() || i === 0 && e.isVertical()) && (t = t - parseInt(B(s, "padding-left") || 0, 10) - parseInt(B(s, "padding-right") || 0, 10), i = i - parseInt(B(s, "padding-top") || 0, 10) - parseInt(B(s, "padding-bottom") || 0, 10), Number.isNaN(t) && (t = 0), Number.isNaN(i) && (i = 0), Object.assign(e, {
    width: t,
    height: i,
    size: e.isHorizontal() ? t : i
  }));
}
function ws() {
  const e = this;
  function t(m, T) {
    return parseFloat(m.getPropertyValue(e.getDirectionLabel(T)) || 0);
  }
  const i = e.params, {
    wrapperEl: s,
    slidesEl: r,
    size: n,
    rtlTranslate: l,
    wrongRTL: o
  } = e, a = e.virtual && i.virtual.enabled, d = a ? e.virtual.slides.length : e.slides.length, c = V(r, `.${e.params.slideClass}, swiper-slide`), f = a ? e.virtual.slides.length : c.length;
  let u = [];
  const p = [], h = [];
  let v = i.slidesOffsetBefore;
  typeof v == "function" && (v = i.slidesOffsetBefore.call(e));
  let y = i.slidesOffsetAfter;
  typeof y == "function" && (y = i.slidesOffsetAfter.call(e));
  const g = e.snapGrid.length, x = e.slidesGrid.length;
  let w = i.spaceBetween, S = -v, M = 0, A = 0;
  if (typeof n > "u")
    return;
  typeof w == "string" && w.indexOf("%") >= 0 ? w = parseFloat(w.replace("%", "")) / 100 * n : typeof w == "string" && (w = parseFloat(w)), e.virtualSize = -w, c.forEach((m) => {
    l ? m.style.marginLeft = "" : m.style.marginRight = "", m.style.marginBottom = "", m.style.marginTop = "";
  }), i.centeredSlides && i.cssMode && (te(s, "--swiper-centered-offset-before", ""), te(s, "--swiper-centered-offset-after", ""));
  const I = i.grid && i.grid.rows > 1 && e.grid;
  I ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
  let P;
  const O = i.slidesPerView === "auto" && i.breakpoints && Object.keys(i.breakpoints).filter((m) => typeof i.breakpoints[m].slidesPerView < "u").length > 0;
  for (let m = 0; m < f; m += 1) {
    P = 0;
    let T;
    if (c[m] && (T = c[m]), I && e.grid.updateSlide(m, T, c), !(c[m] && B(T, "display") === "none")) {
      if (i.slidesPerView === "auto") {
        O && (c[m].style[e.getDirectionLabel("width")] = "");
        const E = getComputedStyle(T), b = T.style.transform, C = T.style.webkitTransform;
        if (b && (T.style.transform = "none"), C && (T.style.webkitTransform = "none"), i.roundLengths)
          P = e.isHorizontal() ? st(T, "width", !0) : st(T, "height", !0);
        else {
          const L = t(E, "width"), D = t(E, "padding-left"), $t = t(E, "padding-right"), De = t(E, "margin-left"), $e = t(E, "margin-right"), Ne = E.getPropertyValue("box-sizing");
          if (Ne && Ne === "border-box")
            P = L + De + $e;
          else {
            const {
              clientWidth: Nt,
              offsetWidth: Ft
            } = T;
            P = L + D + $t + De + $e + (Ft - Nt);
          }
        }
        b && (T.style.transform = b), C && (T.style.webkitTransform = C), i.roundLengths && (P = Math.floor(P));
      } else
        P = (n - (i.slidesPerView - 1) * w) / i.slidesPerView, i.roundLengths && (P = Math.floor(P)), c[m] && (c[m].style[e.getDirectionLabel("width")] = `${P}px`);
      c[m] && (c[m].swiperSlideSize = P), h.push(P), i.centeredSlides ? (S = S + P / 2 + M / 2 + w, M === 0 && m !== 0 && (S = S - n / 2 - w), m === 0 && (S = S - n / 2 - w), Math.abs(S) < 1 / 1e3 && (S = 0), i.roundLengths && (S = Math.floor(S)), A % i.slidesPerGroup === 0 && u.push(S), p.push(S)) : (i.roundLengths && (S = Math.floor(S)), (A - Math.min(e.params.slidesPerGroupSkip, A)) % e.params.slidesPerGroup === 0 && u.push(S), p.push(S), S = S + P + w), e.virtualSize += P + w, M = P, A += 1;
    }
  }
  if (e.virtualSize = Math.max(e.virtualSize, n) + y, l && o && (i.effect === "slide" || i.effect === "coverflow") && (s.style.width = `${e.virtualSize + w}px`), i.setWrapperSize && (s.style[e.getDirectionLabel("width")] = `${e.virtualSize + w}px`), I && e.grid.updateWrapperSize(P, u), !i.centeredSlides) {
    const m = [];
    for (let T = 0; T < u.length; T += 1) {
      let E = u[T];
      i.roundLengths && (E = Math.floor(E)), u[T] <= e.virtualSize - n && m.push(E);
    }
    u = m, Math.floor(e.virtualSize - n) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - n);
  }
  if (a && i.loop) {
    const m = h[0] + w;
    if (i.slidesPerGroup > 1) {
      const T = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup), E = m * i.slidesPerGroup;
      for (let b = 0; b < T; b += 1)
        u.push(u[u.length - 1] + E);
    }
    for (let T = 0; T < e.virtual.slidesBefore + e.virtual.slidesAfter; T += 1)
      i.slidesPerGroup === 1 && u.push(u[u.length - 1] + m), p.push(p[p.length - 1] + m), e.virtualSize += m;
  }
  if (u.length === 0 && (u = [0]), w !== 0) {
    const m = e.isHorizontal() && l ? "marginLeft" : e.getDirectionLabel("marginRight");
    c.filter((T, E) => !i.cssMode || i.loop ? !0 : E !== c.length - 1).forEach((T) => {
      T.style[m] = `${w}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let m = 0;
    h.forEach((E) => {
      m += E + (w || 0);
    }), m -= w;
    const T = m - n;
    u = u.map((E) => E <= 0 ? -v : E > T ? T + y : E);
  }
  if (i.centerInsufficientSlides) {
    let m = 0;
    if (h.forEach((T) => {
      m += T + (w || 0);
    }), m -= w, m < n) {
      const T = (n - m) / 2;
      u.forEach((E, b) => {
        u[b] = E - T;
      }), p.forEach((E, b) => {
        p[b] = E + T;
      });
    }
  }
  if (Object.assign(e, {
    slides: c,
    snapGrid: u,
    slidesGrid: p,
    slidesSizesGrid: h
  }), i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
    te(s, "--swiper-centered-offset-before", `${-u[0]}px`), te(s, "--swiper-centered-offset-after", `${e.size / 2 - h[h.length - 1] / 2}px`);
    const m = -e.snapGrid[0], T = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map((E) => E + m), e.slidesGrid = e.slidesGrid.map((E) => E + T);
  }
  if (f !== d && e.emit("slidesLengthChange"), u.length !== g && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), p.length !== x && e.emit("slidesGridLengthChange"), i.watchSlidesProgress && e.updateSlidesOffset(), !a && !i.cssMode && (i.effect === "slide" || i.effect === "fade")) {
    const m = `${i.containerModifierClass}backface-hidden`, T = e.el.classList.contains(m);
    f <= i.maxBackfaceHiddenSlides ? T || e.el.classList.add(m) : T && e.el.classList.remove(m);
  }
}
function Ss(e) {
  const t = this, i = [], s = t.virtual && t.params.virtual.enabled;
  let r = 0, n;
  typeof e == "number" ? t.setTransition(e) : e === !0 && t.setTransition(t.params.speed);
  const l = (o) => s ? t.slides[t.getSlideIndexByData(o)] : t.slides[o];
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((o) => {
        i.push(o);
      });
    else
      for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
        const o = t.activeIndex + n;
        if (o > t.slides.length && !s)
          break;
        i.push(l(o));
      }
  else
    i.push(l(t.activeIndex));
  for (n = 0; n < i.length; n += 1)
    if (typeof i[n] < "u") {
      const o = i[n].offsetHeight;
      r = o > r ? o : r;
    }
  (r || r === 0) && (t.wrapperEl.style.height = `${r}px`);
}
function Ts() {
  const e = this, t = e.slides, i = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
  for (let s = 0; s < t.length; s += 1)
    t[s].swiperSlideOffset = (e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) - i - e.cssOverflowAdjustment();
}
function bs(e) {
  e === void 0 && (e = this && this.translate || 0);
  const t = this, i = t.params, {
    slides: s,
    rtlTranslate: r,
    snapGrid: n
  } = t;
  if (s.length === 0)
    return;
  typeof s[0].swiperSlideOffset > "u" && t.updateSlidesOffset();
  let l = -e;
  r && (l = e), s.forEach((a) => {
    a.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass);
  }), t.visibleSlidesIndexes = [], t.visibleSlides = [];
  let o = i.spaceBetween;
  typeof o == "string" && o.indexOf("%") >= 0 ? o = parseFloat(o.replace("%", "")) / 100 * t.size : typeof o == "string" && (o = parseFloat(o));
  for (let a = 0; a < s.length; a += 1) {
    const d = s[a];
    let c = d.swiperSlideOffset;
    i.cssMode && i.centeredSlides && (c -= s[0].swiperSlideOffset);
    const f = (l + (i.centeredSlides ? t.minTranslate() : 0) - c) / (d.swiperSlideSize + o), u = (l - n[0] + (i.centeredSlides ? t.minTranslate() : 0) - c) / (d.swiperSlideSize + o), p = -(l - c), h = p + t.slidesSizesGrid[a], v = p >= 0 && p <= t.size - t.slidesSizesGrid[a];
    (p >= 0 && p < t.size - 1 || h > 1 && h <= t.size || p <= 0 && h >= t.size) && (t.visibleSlides.push(d), t.visibleSlidesIndexes.push(a), s[a].classList.add(i.slideVisibleClass)), v && s[a].classList.add(i.slideFullyVisibleClass), d.progress = r ? -f : f, d.originalProgress = r ? -u : u;
  }
}
function xs(e) {
  const t = this;
  if (typeof e > "u") {
    const c = t.rtlTranslate ? -1 : 1;
    e = t && t.translate && t.translate * c || 0;
  }
  const i = t.params, s = t.maxTranslate() - t.minTranslate();
  let {
    progress: r,
    isBeginning: n,
    isEnd: l,
    progressLoop: o
  } = t;
  const a = n, d = l;
  if (s === 0)
    r = 0, n = !0, l = !0;
  else {
    r = (e - t.minTranslate()) / s;
    const c = Math.abs(e - t.minTranslate()) < 1, f = Math.abs(e - t.maxTranslate()) < 1;
    n = c || r <= 0, l = f || r >= 1, c && (r = 0), f && (r = 1);
  }
  if (i.loop) {
    const c = t.getSlideIndexByData(0), f = t.getSlideIndexByData(t.slides.length - 1), u = t.slidesGrid[c], p = t.slidesGrid[f], h = t.slidesGrid[t.slidesGrid.length - 1], v = Math.abs(e);
    v >= u ? o = (v - u) / h : o = (v + h - p) / h, o > 1 && (o -= 1);
  }
  Object.assign(t, {
    progress: r,
    progressLoop: o,
    isBeginning: n,
    isEnd: l
  }), (i.watchSlidesProgress || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), n && !a && t.emit("reachBeginning toEdge"), l && !d && t.emit("reachEnd toEdge"), (a && !n || d && !l) && t.emit("fromEdge"), t.emit("progress", r);
}
function ys() {
  const e = this, {
    slides: t,
    params: i,
    slidesEl: s,
    activeIndex: r
  } = e, n = e.virtual && i.virtual.enabled, l = e.grid && i.grid && i.grid.rows > 1, o = (f) => V(s, `.${i.slideClass}${f}, swiper-slide${f}`)[0];
  t.forEach((f) => {
    f.classList.remove(i.slideActiveClass, i.slideNextClass, i.slidePrevClass);
  });
  let a, d, c;
  if (n)
    if (i.loop) {
      let f = r - e.virtual.slidesBefore;
      f < 0 && (f = e.virtual.slides.length + f), f >= e.virtual.slides.length && (f -= e.virtual.slides.length), a = o(`[data-swiper-slide-index="${f}"]`);
    } else
      a = o(`[data-swiper-slide-index="${r}"]`);
  else
    l ? (a = t.filter((f) => f.column === r)[0], c = t.filter((f) => f.column === r + 1)[0], d = t.filter((f) => f.column === r - 1)[0]) : a = t[r];
  a && (a.classList.add(i.slideActiveClass), l ? (c && c.classList.add(i.slideNextClass), d && d.classList.add(i.slidePrevClass)) : (c = os(a, `.${i.slideClass}, swiper-slide`)[0], i.loop && !c && (c = t[0]), c && c.classList.add(i.slideNextClass), d = ls(a, `.${i.slideClass}, swiper-slide`)[0], i.loop && !d === 0 && (d = t[t.length - 1]), d && d.classList.add(i.slidePrevClass))), e.emitSlidesClasses();
}
const se = (e, t) => {
  if (!e || e.destroyed || !e.params)
    return;
  const i = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`, s = t.closest(i());
  if (s) {
    let r = s.querySelector(`.${e.params.lazyPreloaderClass}`);
    !r && e.isElement && (s.shadowRoot ? r = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      s.shadowRoot && (r = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`), r && r.remove());
    })), r && r.remove();
  }
}, ge = (e, t) => {
  if (!e.slides[t])
    return;
  const i = e.slides[t].querySelector('[loading="lazy"]');
  i && i.removeAttribute("loading");
}, Ae = (e) => {
  if (!e || e.destroyed || !e.params)
    return;
  let t = e.params.lazyPreloadPrevNext;
  const i = e.slides.length;
  if (!i || !t || t < 0)
    return;
  t = Math.min(t, i);
  const s = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), r = e.activeIndex;
  if (e.params.grid && e.params.grid.rows > 1) {
    const l = r, o = [l - t];
    o.push(...Array.from({
      length: t
    }).map((a, d) => l + s + d)), e.slides.forEach((a, d) => {
      o.includes(a.column) && ge(e, d);
    });
    return;
  }
  const n = r + s - 1;
  if (e.params.rewind || e.params.loop)
    for (let l = r - t; l <= n + t; l += 1) {
      const o = (l % i + i) % i;
      (o < r || o > n) && ge(e, o);
    }
  else
    for (let l = Math.max(r - t, 0); l <= Math.min(n + t, i - 1); l += 1)
      l !== r && (l > n || l < r) && ge(e, l);
};
function Es(e) {
  const {
    slidesGrid: t,
    params: i
  } = e, s = e.rtlTranslate ? e.translate : -e.translate;
  let r;
  for (let n = 0; n < t.length; n += 1)
    typeof t[n + 1] < "u" ? s >= t[n] && s < t[n + 1] - (t[n + 1] - t[n]) / 2 ? r = n : s >= t[n] && s < t[n + 1] && (r = n + 1) : s >= t[n] && (r = n);
  return i.normalizeSlideIndex && (r < 0 || typeof r > "u") && (r = 0), r;
}
function Ps(e) {
  const t = this, i = t.rtlTranslate ? t.translate : -t.translate, {
    snapGrid: s,
    params: r,
    activeIndex: n,
    realIndex: l,
    snapIndex: o
  } = t;
  let a = e, d;
  const c = (p) => {
    let h = p - t.virtual.slidesBefore;
    return h < 0 && (h = t.virtual.slides.length + h), h >= t.virtual.slides.length && (h -= t.virtual.slides.length), h;
  };
  if (typeof a > "u" && (a = Es(t)), s.indexOf(i) >= 0)
    d = s.indexOf(i);
  else {
    const p = Math.min(r.slidesPerGroupSkip, a);
    d = p + Math.floor((a - p) / r.slidesPerGroup);
  }
  if (d >= s.length && (d = s.length - 1), a === n && !t.params.loop) {
    d !== o && (t.snapIndex = d, t.emit("snapIndexChange"));
    return;
  }
  if (a === n && t.params.loop && t.virtual && t.params.virtual.enabled) {
    t.realIndex = c(a);
    return;
  }
  const f = t.grid && r.grid && r.grid.rows > 1;
  let u;
  if (t.virtual && r.virtual.enabled && r.loop)
    u = c(a);
  else if (f) {
    const p = t.slides.filter((v) => v.column === a)[0];
    let h = parseInt(p.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(h) && (h = Math.max(t.slides.indexOf(p), 0)), u = Math.floor(h / r.grid.rows);
  } else if (t.slides[a]) {
    const p = t.slides[a].getAttribute("data-swiper-slide-index");
    p ? u = parseInt(p, 10) : u = a;
  } else
    u = a;
  Object.assign(t, {
    previousSnapIndex: o,
    snapIndex: d,
    previousRealIndex: l,
    realIndex: u,
    previousIndex: n,
    activeIndex: a
  }), t.initialized && Ae(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && (l !== u && t.emit("realIndexChange"), t.emit("slideChange"));
}
function Ms(e, t) {
  const i = this, s = i.params;
  let r = e.closest(`.${s.slideClass}, swiper-slide`);
  !r && i.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((o) => {
    !r && o.matches && o.matches(`.${s.slideClass}, swiper-slide`) && (r = o);
  });
  let n = !1, l;
  if (r) {
    for (let o = 0; o < i.slides.length; o += 1)
      if (i.slides[o] === r) {
        n = !0, l = o;
        break;
      }
  }
  if (r && n)
    i.clickedSlide = r, i.virtual && i.params.virtual.enabled ? i.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : i.clickedIndex = l;
  else {
    i.clickedSlide = void 0, i.clickedIndex = void 0;
    return;
  }
  s.slideToClickedSlide && i.clickedIndex !== void 0 && i.clickedIndex !== i.activeIndex && i.slideToClickedSlide();
}
var Cs = {
  updateSize: vs,
  updateSlides: ws,
  updateAutoHeight: Ss,
  updateSlidesOffset: Ts,
  updateSlidesProgress: bs,
  updateProgress: xs,
  updateSlidesClasses: ys,
  updateActiveIndex: Ps,
  updateClickedSlide: Ms
};
function Is(e) {
  e === void 0 && (e = this.isHorizontal() ? "x" : "y");
  const t = this, {
    params: i,
    rtlTranslate: s,
    translate: r,
    wrapperEl: n
  } = t;
  if (i.virtualTranslate)
    return s ? -r : r;
  if (i.cssMode)
    return r;
  let l = rs(n, e);
  return l += t.cssOverflowAdjustment(), s && (l = -l), l || 0;
}
function Os(e, t) {
  const i = this, {
    rtlTranslate: s,
    params: r,
    wrapperEl: n,
    progress: l
  } = i;
  let o = 0, a = 0;
  const d = 0;
  i.isHorizontal() ? o = s ? -e : e : a = e, r.roundLengths && (o = Math.floor(o), a = Math.floor(a)), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? o : a, r.cssMode ? n[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal() ? -o : -a : r.virtualTranslate || (i.isHorizontal() ? o -= i.cssOverflowAdjustment() : a -= i.cssOverflowAdjustment(), n.style.transform = `translate3d(${o}px, ${a}px, ${d}px)`);
  let c;
  const f = i.maxTranslate() - i.minTranslate();
  f === 0 ? c = 0 : c = (e - i.minTranslate()) / f, c !== l && i.updateProgress(e), i.emit("setTranslate", i.translate, t);
}
function As() {
  return -this.snapGrid[0];
}
function Ls() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function zs(e, t, i, s, r) {
  e === void 0 && (e = 0), t === void 0 && (t = this.params.speed), i === void 0 && (i = !0), s === void 0 && (s = !0);
  const n = this, {
    params: l,
    wrapperEl: o
  } = n;
  if (n.animating && l.preventInteractionOnTransition)
    return !1;
  const a = n.minTranslate(), d = n.maxTranslate();
  let c;
  if (s && e > a ? c = a : s && e < d ? c = d : c = e, n.updateProgress(c), l.cssMode) {
    const f = n.isHorizontal();
    if (t === 0)
      o[f ? "scrollLeft" : "scrollTop"] = -c;
    else {
      if (!n.support.smoothScroll)
        return _t({
          swiper: n,
          targetPosition: -c,
          side: f ? "left" : "top"
        }), !0;
      o.scrollTo({
        [f ? "left" : "top"]: -c,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return t === 0 ? (n.setTransition(0), n.setTranslate(c), i && (n.emit("beforeTransitionStart", t, r), n.emit("transitionEnd"))) : (n.setTransition(t), n.setTranslate(c), i && (n.emit("beforeTransitionStart", t, r), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(u) {
    !n || n.destroyed || u.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, i && n.emit("transitionEnd"));
  }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0;
}
var ks = {
  getTranslate: Is,
  setTranslate: Os,
  minTranslate: As,
  maxTranslate: Ls,
  translateTo: zs
};
function _s(e, t) {
  const i = this;
  i.params.cssMode || (i.wrapperEl.style.transitionDuration = `${e}ms`, i.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""), i.emit("setTransition", e, t);
}
function Vt(e) {
  let {
    swiper: t,
    runCallbacks: i,
    direction: s,
    step: r
  } = e;
  const {
    activeIndex: n,
    previousIndex: l
  } = t;
  let o = s;
  if (o || (n > l ? o = "next" : n < l ? o = "prev" : o = "reset"), t.emit(`transition${r}`), i && n !== l) {
    if (o === "reset") {
      t.emit(`slideResetTransition${r}`);
      return;
    }
    t.emit(`slideChangeTransition${r}`), o === "next" ? t.emit(`slideNextTransition${r}`) : t.emit(`slidePrevTransition${r}`);
  }
}
function Gs(e, t) {
  e === void 0 && (e = !0);
  const i = this, {
    params: s
  } = i;
  s.cssMode || (s.autoHeight && i.updateAutoHeight(), Vt({
    swiper: i,
    runCallbacks: e,
    direction: t,
    step: "Start"
  }));
}
function Vs(e, t) {
  e === void 0 && (e = !0);
  const i = this, {
    params: s
  } = i;
  i.animating = !1, !s.cssMode && (i.setTransition(0), Vt({
    swiper: i,
    runCallbacks: e,
    direction: t,
    step: "End"
  }));
}
var Ds = {
  setTransition: _s,
  transitionStart: Gs,
  transitionEnd: Vs
};
function $s(e, t, i, s, r) {
  e === void 0 && (e = 0), t === void 0 && (t = this.params.speed), i === void 0 && (i = !0), typeof e == "string" && (e = parseInt(e, 10));
  const n = this;
  let l = e;
  l < 0 && (l = 0);
  const {
    params: o,
    snapGrid: a,
    slidesGrid: d,
    previousIndex: c,
    activeIndex: f,
    rtlTranslate: u,
    wrapperEl: p,
    enabled: h
  } = n;
  if (n.animating && o.preventInteractionOnTransition || !h && !s && !r)
    return !1;
  const v = Math.min(n.params.slidesPerGroupSkip, l);
  let y = v + Math.floor((l - v) / n.params.slidesPerGroup);
  y >= a.length && (y = a.length - 1);
  const g = -a[y];
  if (o.normalizeSlideIndex)
    for (let w = 0; w < d.length; w += 1) {
      const S = -Math.floor(g * 100), M = Math.floor(d[w] * 100), A = Math.floor(d[w + 1] * 100);
      typeof d[w + 1] < "u" ? S >= M && S < A - (A - M) / 2 ? l = w : S >= M && S < A && (l = w + 1) : S >= M && (l = w);
    }
  if (n.initialized && l !== f && (!n.allowSlideNext && (u ? g > n.translate && g > n.minTranslate() : g < n.translate && g < n.minTranslate()) || !n.allowSlidePrev && g > n.translate && g > n.maxTranslate() && (f || 0) !== l))
    return !1;
  l !== (c || 0) && i && n.emit("beforeSlideChangeStart"), n.updateProgress(g);
  let x;
  if (l > f ? x = "next" : l < f ? x = "prev" : x = "reset", u && -g === n.translate || !u && g === n.translate)
    return n.updateActiveIndex(l), o.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), o.effect !== "slide" && n.setTranslate(g), x !== "reset" && (n.transitionStart(i, x), n.transitionEnd(i, x)), !1;
  if (o.cssMode) {
    const w = n.isHorizontal(), S = u ? g : -g;
    if (t === 0) {
      const M = n.virtual && n.params.virtual.enabled;
      M && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), M && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        p[w ? "scrollLeft" : "scrollTop"] = S;
      })) : p[w ? "scrollLeft" : "scrollTop"] = S, M && requestAnimationFrame(() => {
        n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1;
      });
    } else {
      if (!n.support.smoothScroll)
        return _t({
          swiper: n,
          targetPosition: S,
          side: w ? "left" : "top"
        }), !0;
      p.scrollTo({
        [w ? "left" : "top"]: S,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return n.setTransition(t), n.setTranslate(g), n.updateActiveIndex(l), n.updateSlidesClasses(), n.emit("beforeTransitionStart", t, s), n.transitionStart(i, x), t === 0 ? n.transitionEnd(i, x) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(S) {
    !n || n.destroyed || S.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(i, x));
  }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0;
}
function Ns(e, t, i, s) {
  e === void 0 && (e = 0), t === void 0 && (t = this.params.speed), i === void 0 && (i = !0), typeof e == "string" && (e = parseInt(e, 10));
  const r = this, n = r.grid && r.params.grid && r.params.grid.rows > 1;
  let l = e;
  if (r.params.loop)
    if (r.virtual && r.params.virtual.enabled)
      l = l + r.virtual.slidesBefore;
    else {
      let o;
      if (n) {
        const u = l * r.params.grid.rows;
        o = r.slides.filter((p) => p.getAttribute("data-swiper-slide-index") * 1 === u)[0].column;
      } else
        o = r.getSlideIndexByData(l);
      const a = n ? Math.ceil(r.slides.length / r.params.grid.rows) : r.slides.length, {
        centeredSlides: d
      } = r.params;
      let c = r.params.slidesPerView;
      c === "auto" ? c = r.slidesPerViewDynamic() : (c = Math.ceil(parseFloat(r.params.slidesPerView, 10)), d && c % 2 === 0 && (c = c + 1));
      let f = a - o < c;
      if (d && (f = f || o < Math.ceil(c / 2)), f) {
        const u = d ? o < r.activeIndex ? "prev" : "next" : o - r.activeIndex - 1 < r.params.slidesPerView ? "next" : "prev";
        r.loopFix({
          direction: u,
          slideTo: !0,
          activeSlideIndex: u === "next" ? o + 1 : o - a + 1,
          slideRealIndex: u === "next" ? r.realIndex : void 0
        });
      }
      if (n) {
        const u = l * r.params.grid.rows;
        l = r.slides.filter((p) => p.getAttribute("data-swiper-slide-index") * 1 === u)[0].column;
      } else
        l = r.getSlideIndexByData(l);
    }
  return requestAnimationFrame(() => {
    r.slideTo(l, t, i, s);
  }), r;
}
function Fs(e, t, i) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0);
  const s = this, {
    enabled: r,
    params: n,
    animating: l
  } = s;
  if (!r)
    return s;
  let o = n.slidesPerGroup;
  n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (o = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const a = s.activeIndex < n.slidesPerGroupSkip ? 1 : o, d = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (l && !d && n.loopPreventsSliding)
      return !1;
    if (s.loopFix({
      direction: "next"
    }), s._clientLeft = s.wrapperEl.clientLeft, s.activeIndex === s.slides.length - 1 && n.cssMode)
      return requestAnimationFrame(() => {
        s.slideTo(s.activeIndex + a, e, t, i);
      }), !0;
  }
  return n.rewind && s.isEnd ? s.slideTo(0, e, t, i) : s.slideTo(s.activeIndex + a, e, t, i);
}
function Bs(e, t, i) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0);
  const s = this, {
    params: r,
    snapGrid: n,
    slidesGrid: l,
    rtlTranslate: o,
    enabled: a,
    animating: d
  } = s;
  if (!a)
    return s;
  const c = s.virtual && r.virtual.enabled;
  if (r.loop) {
    if (d && !c && r.loopPreventsSliding)
      return !1;
    s.loopFix({
      direction: "prev"
    }), s._clientLeft = s.wrapperEl.clientLeft;
  }
  const f = o ? s.translate : -s.translate;
  function u(g) {
    return g < 0 ? -Math.floor(Math.abs(g)) : Math.floor(g);
  }
  const p = u(f), h = n.map((g) => u(g));
  let v = n[h.indexOf(p) - 1];
  if (typeof v > "u" && r.cssMode) {
    let g;
    n.forEach((x, w) => {
      p >= x && (g = w);
    }), typeof g < "u" && (v = n[g > 0 ? g - 1 : g]);
  }
  let y = 0;
  if (typeof v < "u" && (y = l.indexOf(v), y < 0 && (y = s.activeIndex - 1), r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (y = y - s.slidesPerViewDynamic("previous", !0) + 1, y = Math.max(y, 0))), r.rewind && s.isBeginning) {
    const g = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(g, e, t, i);
  } else if (r.loop && s.activeIndex === 0 && r.cssMode)
    return requestAnimationFrame(() => {
      s.slideTo(y, e, t, i);
    }), !0;
  return s.slideTo(y, e, t, i);
}
function Rs(e, t, i) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0);
  const s = this;
  return s.slideTo(s.activeIndex, e, t, i);
}
function Hs(e, t, i, s) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0), s === void 0 && (s = 0.5);
  const r = this;
  let n = r.activeIndex;
  const l = Math.min(r.params.slidesPerGroupSkip, n), o = l + Math.floor((n - l) / r.params.slidesPerGroup), a = r.rtlTranslate ? r.translate : -r.translate;
  if (a >= r.snapGrid[o]) {
    const d = r.snapGrid[o], c = r.snapGrid[o + 1];
    a - d > (c - d) * s && (n += r.params.slidesPerGroup);
  } else {
    const d = r.snapGrid[o - 1], c = r.snapGrid[o];
    a - d <= (c - d) * s && (n -= r.params.slidesPerGroup);
  }
  return n = Math.max(n, 0), n = Math.min(n, r.slidesGrid.length - 1), r.slideTo(n, e, t, i);
}
function js() {
  const e = this, {
    params: t,
    slidesEl: i
  } = e, s = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
  let r = e.clickedIndex, n;
  const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
  if (t.loop) {
    if (e.animating)
      return;
    n = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? r < e.loopedSlides - s / 2 || r > e.slides.length - e.loopedSlides + s / 2 ? (e.loopFix(), r = e.getSlideIndex(V(i, `${l}[data-swiper-slide-index="${n}"]`)[0]), Ie(() => {
      e.slideTo(r);
    })) : e.slideTo(r) : r > e.slides.length - s ? (e.loopFix(), r = e.getSlideIndex(V(i, `${l}[data-swiper-slide-index="${n}"]`)[0]), Ie(() => {
      e.slideTo(r);
    })) : e.slideTo(r);
  } else
    e.slideTo(r);
}
var Ws = {
  slideTo: $s,
  slideToLoop: Ns,
  slideNext: Fs,
  slidePrev: Bs,
  slideReset: Rs,
  slideToClosest: Hs,
  slideToClickedSlide: js
};
function Ys(e) {
  const t = this, {
    params: i,
    slidesEl: s
  } = t;
  if (!i.loop || t.virtual && t.params.virtual.enabled)
    return;
  const r = () => {
    V(s, `.${i.slideClass}, swiper-slide`).forEach((f, u) => {
      f.setAttribute("data-swiper-slide-index", u);
    });
  }, n = t.grid && i.grid && i.grid.rows > 1, l = i.slidesPerGroup * (n ? i.grid.rows : 1), o = t.slides.length % l !== 0, a = n && t.slides.length % i.grid.rows !== 0, d = (c) => {
    for (let f = 0; f < c; f += 1) {
      const u = t.isElement ? Oe("swiper-slide", [i.slideBlankClass]) : Oe("div", [i.slideClass, i.slideBlankClass]);
      t.slidesEl.append(u);
    }
  };
  if (o) {
    if (i.loopAddBlankSlides) {
      const c = l - t.slides.length % l;
      d(c), t.recalcSlides(), t.updateSlides();
    } else
      le("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    r();
  } else if (a) {
    if (i.loopAddBlankSlides) {
      const c = i.grid.rows - t.slides.length % i.grid.rows;
      d(c), t.recalcSlides(), t.updateSlides();
    } else
      le("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    r();
  } else
    r();
  t.loopFix({
    slideRealIndex: e,
    direction: i.centeredSlides ? void 0 : "next"
  });
}
function qs(e) {
  let {
    slideRealIndex: t,
    slideTo: i = !0,
    direction: s,
    setTranslate: r,
    activeSlideIndex: n,
    byController: l,
    byMousewheel: o
  } = e === void 0 ? {} : e;
  const a = this;
  if (!a.params.loop)
    return;
  a.emit("beforeLoopFix");
  const {
    slides: d,
    allowSlidePrev: c,
    allowSlideNext: f,
    slidesEl: u,
    params: p
  } = a, {
    centeredSlides: h
  } = p;
  if (a.allowSlidePrev = !0, a.allowSlideNext = !0, a.virtual && p.virtual.enabled) {
    i && (!p.centeredSlides && a.snapIndex === 0 ? a.slideTo(a.virtual.slides.length, 0, !1, !0) : p.centeredSlides && a.snapIndex < p.slidesPerView ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0) : a.snapIndex === a.snapGrid.length - 1 && a.slideTo(a.virtual.slidesBefore, 0, !1, !0)), a.allowSlidePrev = c, a.allowSlideNext = f, a.emit("loopFix");
    return;
  }
  let v = p.slidesPerView;
  v === "auto" ? v = a.slidesPerViewDynamic() : (v = Math.ceil(parseFloat(p.slidesPerView, 10)), h && v % 2 === 0 && (v = v + 1));
  const y = p.slidesPerGroupAuto ? v : p.slidesPerGroup;
  let g = y;
  g % y !== 0 && (g += y - g % y), g += p.loopAdditionalSlides, a.loopedSlides = g;
  const x = a.grid && p.grid && p.grid.rows > 1;
  d.length < v + g ? le("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : x && p.grid.fill === "row" && le("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const w = [], S = [];
  let M = a.activeIndex;
  typeof n > "u" ? n = a.getSlideIndex(d.filter((b) => b.classList.contains(p.slideActiveClass))[0]) : M = n;
  const A = s === "next" || !s, I = s === "prev" || !s;
  let P = 0, O = 0;
  const m = x ? Math.ceil(d.length / p.grid.rows) : d.length, E = (x ? d[n].column : n) + (h && typeof r > "u" ? -v / 2 + 0.5 : 0);
  if (E < g) {
    P = Math.max(g - E, y);
    for (let b = 0; b < g - E; b += 1) {
      const C = b - Math.floor(b / m) * m;
      if (x) {
        const L = m - C - 1;
        for (let D = d.length - 1; D >= 0; D -= 1)
          d[D].column === L && w.push(D);
      } else
        w.push(m - C - 1);
    }
  } else if (E + v > m - g) {
    O = Math.max(E - (m - g * 2), y);
    for (let b = 0; b < O; b += 1) {
      const C = b - Math.floor(b / m) * m;
      x ? d.forEach((L, D) => {
        L.column === C && S.push(D);
      }) : S.push(C);
    }
  }
  if (a.__preventObserver__ = !0, requestAnimationFrame(() => {
    a.__preventObserver__ = !1;
  }), I && w.forEach((b) => {
    d[b].swiperLoopMoveDOM = !0, u.prepend(d[b]), d[b].swiperLoopMoveDOM = !1;
  }), A && S.forEach((b) => {
    d[b].swiperLoopMoveDOM = !0, u.append(d[b]), d[b].swiperLoopMoveDOM = !1;
  }), a.recalcSlides(), p.slidesPerView === "auto" ? a.updateSlides() : x && (w.length > 0 && I || S.length > 0 && A) && a.slides.forEach((b, C) => {
    a.grid.updateSlide(C, b, a.slides);
  }), p.watchSlidesProgress && a.updateSlidesOffset(), i) {
    if (w.length > 0 && I) {
      if (typeof t > "u") {
        const b = a.slidesGrid[M], L = a.slidesGrid[M + P] - b;
        o ? a.setTranslate(a.translate - L) : (a.slideTo(M + P, 0, !1, !0), r && (a.touchEventsData.startTranslate = a.touchEventsData.startTranslate - L, a.touchEventsData.currentTranslate = a.touchEventsData.currentTranslate - L));
      } else if (r) {
        const b = x ? w.length / p.grid.rows : w.length;
        a.slideTo(a.activeIndex + b, 0, !1, !0), a.touchEventsData.currentTranslate = a.translate;
      }
    } else if (S.length > 0 && A)
      if (typeof t > "u") {
        const b = a.slidesGrid[M], L = a.slidesGrid[M - O] - b;
        o ? a.setTranslate(a.translate - L) : (a.slideTo(M - O, 0, !1, !0), r && (a.touchEventsData.startTranslate = a.touchEventsData.startTranslate - L, a.touchEventsData.currentTranslate = a.touchEventsData.currentTranslate - L));
      } else {
        const b = x ? S.length / p.grid.rows : S.length;
        a.slideTo(a.activeIndex - b, 0, !1, !0);
      }
  }
  if (a.allowSlidePrev = c, a.allowSlideNext = f, a.controller && a.controller.control && !l) {
    const b = {
      slideRealIndex: t,
      direction: s,
      setTranslate: r,
      activeSlideIndex: n,
      byController: !0
    };
    Array.isArray(a.controller.control) ? a.controller.control.forEach((C) => {
      !C.destroyed && C.params.loop && C.loopFix({
        ...b,
        slideTo: C.params.slidesPerView === p.slidesPerView ? i : !1
      });
    }) : a.controller.control instanceof a.constructor && a.controller.control.params.loop && a.controller.control.loopFix({
      ...b,
      slideTo: a.controller.control.params.slidesPerView === p.slidesPerView ? i : !1
    });
  }
  a.emit("loopFix");
}
function Xs() {
  const e = this, {
    params: t,
    slidesEl: i
  } = e;
  if (!t.loop || e.virtual && e.params.virtual.enabled)
    return;
  e.recalcSlides();
  const s = [];
  e.slides.forEach((r) => {
    const n = typeof r.swiperSlideIndex > "u" ? r.getAttribute("data-swiper-slide-index") * 1 : r.swiperSlideIndex;
    s[n] = r;
  }), e.slides.forEach((r) => {
    r.removeAttribute("data-swiper-slide-index");
  }), s.forEach((r) => {
    i.append(r);
  }), e.recalcSlides(), e.slideTo(e.realIndex, 0);
}
var Ks = {
  loopCreate: Ys,
  loopFix: qs,
  loopDestroy: Xs
};
function Us(e) {
  const t = this;
  if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
    return;
  const i = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
  t.isElement && (t.__preventObserver__ = !0), i.style.cursor = "move", i.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame(() => {
    t.__preventObserver__ = !1;
  });
}
function Js() {
  const e = this;
  e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  }));
}
var Zs = {
  setGrabCursor: Us,
  unsetGrabCursor: Js
};
function Qs(e, t) {
  t === void 0 && (t = this);
  function i(s) {
    if (!s || s === U() || s === _())
      return null;
    s.assignedSlot && (s = s.assignedSlot);
    const r = s.closest(e);
    return !r && !s.getRootNode ? null : r || i(s.getRootNode().host);
  }
  return i(t);
}
function rt(e, t, i) {
  const s = _(), {
    params: r
  } = e, n = r.edgeSwipeDetection, l = r.edgeSwipeThreshold;
  return n && (i <= l || i >= s.innerWidth - l) ? n === "prevent" ? (t.preventDefault(), !0) : !1 : !0;
}
function er(e) {
  const t = this, i = U();
  let s = e;
  s.originalEvent && (s = s.originalEvent);
  const r = t.touchEventsData;
  if (s.type === "pointerdown") {
    if (r.pointerId !== null && r.pointerId !== s.pointerId)
      return;
    r.pointerId = s.pointerId;
  } else
    s.type === "touchstart" && s.targetTouches.length === 1 && (r.touchId = s.targetTouches[0].identifier);
  if (s.type === "touchstart") {
    rt(t, s, s.targetTouches[0].pageX);
    return;
  }
  const {
    params: n,
    touches: l,
    enabled: o
  } = t;
  if (!o || !n.simulateTouch && s.pointerType === "mouse" || t.animating && n.preventInteractionOnTransition)
    return;
  !t.animating && n.cssMode && n.loop && t.loopFix();
  let a = s.target;
  if (n.touchEventsTarget === "wrapper" && !t.wrapperEl.contains(a) || "which" in s && s.which === 3 || "button" in s && s.button > 0 || r.isTouched && r.isMoved)
    return;
  const d = !!n.noSwipingClass && n.noSwipingClass !== "", c = s.composedPath ? s.composedPath() : s.path;
  d && s.target && s.target.shadowRoot && c && (a = c[0]);
  const f = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`, u = !!(s.target && s.target.shadowRoot);
  if (n.noSwiping && (u ? Qs(f, a) : a.closest(f))) {
    t.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !a.closest(n.swipeHandler))
    return;
  l.currentX = s.pageX, l.currentY = s.pageY;
  const p = l.currentX, h = l.currentY;
  if (!rt(t, s, p))
    return;
  Object.assign(r, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), l.startX = p, l.startY = h, r.touchStartTime = ne(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, n.threshold > 0 && (r.allowThresholdMove = !1);
  let v = !0;
  a.matches(r.focusableElements) && (v = !1, a.nodeName === "SELECT" && (r.isTouched = !1)), i.activeElement && i.activeElement.matches(r.focusableElements) && i.activeElement !== a && i.activeElement.blur();
  const y = v && t.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || y) && !a.isContentEditable && s.preventDefault(), n.freeMode && n.freeMode.enabled && t.freeMode && t.animating && !n.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", s);
}
function tr(e) {
  const t = U(), i = this, s = i.touchEventsData, {
    params: r,
    touches: n,
    rtlTranslate: l,
    enabled: o
  } = i;
  if (!o || !r.simulateTouch && e.pointerType === "mouse")
    return;
  let a = e;
  if (a.originalEvent && (a = a.originalEvent), a.type === "pointermove" && (s.touchId !== null || a.pointerId !== s.pointerId))
    return;
  let d;
  if (a.type === "touchmove") {
    if (d = [...a.changedTouches].filter((A) => A.identifier === s.touchId)[0], !d || d.identifier !== s.touchId)
      return;
  } else
    d = a;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && i.emit("touchMoveOpposite", a);
    return;
  }
  const c = d.pageX, f = d.pageY;
  if (a.preventedByNestedSwiper) {
    n.startX = c, n.startY = f;
    return;
  }
  if (!i.allowTouchMove) {
    a.target.matches(s.focusableElements) || (i.allowClick = !1), s.isTouched && (Object.assign(n, {
      startX: c,
      startY: f,
      currentX: c,
      currentY: f
    }), s.touchStartTime = ne());
    return;
  }
  if (r.touchReleaseOnEdges && !r.loop) {
    if (i.isVertical()) {
      if (f < n.startY && i.translate <= i.maxTranslate() || f > n.startY && i.translate >= i.minTranslate()) {
        s.isTouched = !1, s.isMoved = !1;
        return;
      }
    } else if (c < n.startX && i.translate <= i.maxTranslate() || c > n.startX && i.translate >= i.minTranslate())
      return;
  }
  if (t.activeElement && a.target === t.activeElement && a.target.matches(s.focusableElements)) {
    s.isMoved = !0, i.allowClick = !1;
    return;
  }
  s.allowTouchCallbacks && i.emit("touchMove", a), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = c, n.currentY = f;
  const u = n.currentX - n.startX, p = n.currentY - n.startY;
  if (i.params.threshold && Math.sqrt(u ** 2 + p ** 2) < i.params.threshold)
    return;
  if (typeof s.isScrolling > "u") {
    let A;
    i.isHorizontal() && n.currentY === n.startY || i.isVertical() && n.currentX === n.startX ? s.isScrolling = !1 : u * u + p * p >= 25 && (A = Math.atan2(Math.abs(p), Math.abs(u)) * 180 / Math.PI, s.isScrolling = i.isHorizontal() ? A > r.touchAngle : 90 - A > r.touchAngle);
  }
  if (s.isScrolling && i.emit("touchMoveOpposite", a), typeof s.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (s.startMoving = !0), s.isScrolling) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving)
    return;
  i.allowClick = !1, !r.cssMode && a.cancelable && a.preventDefault(), r.touchMoveStopPropagation && !r.nested && a.stopPropagation();
  let h = i.isHorizontal() ? u : p, v = i.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  r.oneWayMovement && (h = Math.abs(h) * (l ? 1 : -1), v = Math.abs(v) * (l ? 1 : -1)), n.diff = h, h *= r.touchRatio, l && (h = -h, v = -v);
  const y = i.touchesDirection;
  i.swipeDirection = h > 0 ? "prev" : "next", i.touchesDirection = v > 0 ? "prev" : "next";
  const g = i.params.loop && !r.cssMode, x = i.touchesDirection === "next" && i.allowSlideNext || i.touchesDirection === "prev" && i.allowSlidePrev;
  if (!s.isMoved) {
    if (g && x && i.loopFix({
      direction: i.swipeDirection
    }), s.startTranslate = i.getTranslate(), i.setTransition(0), i.animating) {
      const A = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0
      });
      i.wrapperEl.dispatchEvent(A);
    }
    s.allowMomentumBounce = !1, r.grabCursor && (i.allowSlideNext === !0 || i.allowSlidePrev === !0) && i.setGrabCursor(!0), i.emit("sliderFirstMove", a);
  }
  let w;
  if ((/* @__PURE__ */ new Date()).getTime(), s.isMoved && s.allowThresholdMove && y !== i.touchesDirection && g && x && Math.abs(h) >= 1) {
    Object.assign(n, {
      startX: c,
      startY: f,
      currentX: c,
      currentY: f,
      startTranslate: s.currentTranslate
    }), s.loopSwapReset = !0, s.startTranslate = s.currentTranslate;
    return;
  }
  i.emit("sliderMove", a), s.isMoved = !0, s.currentTranslate = h + s.startTranslate;
  let S = !0, M = r.resistanceRatio;
  if (r.touchReleaseOnEdges && (M = 0), h > 0 ? (g && x && !w && s.allowThresholdMove && s.currentTranslate > (r.centeredSlides ? i.minTranslate() - i.slidesSizesGrid[i.activeIndex + 1] : i.minTranslate()) && i.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), s.currentTranslate > i.minTranslate() && (S = !1, r.resistance && (s.currentTranslate = i.minTranslate() - 1 + (-i.minTranslate() + s.startTranslate + h) ** M))) : h < 0 && (g && x && !w && s.allowThresholdMove && s.currentTranslate < (r.centeredSlides ? i.maxTranslate() + i.slidesSizesGrid[i.slidesSizesGrid.length - 1] : i.maxTranslate()) && i.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: i.slides.length - (r.slidesPerView === "auto" ? i.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
  }), s.currentTranslate < i.maxTranslate() && (S = !1, r.resistance && (s.currentTranslate = i.maxTranslate() + 1 - (i.maxTranslate() - s.startTranslate - h) ** M))), S && (a.preventedByNestedSwiper = !0), !i.allowSlideNext && i.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !i.allowSlidePrev && i.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), !i.allowSlidePrev && !i.allowSlideNext && (s.currentTranslate = s.startTranslate), r.threshold > 0)
    if (Math.abs(h) > r.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        s.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, s.currentTranslate = s.startTranslate, n.diff = i.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !r.followFinger || r.cssMode || ((r.freeMode && r.freeMode.enabled && i.freeMode || r.watchSlidesProgress) && (i.updateActiveIndex(), i.updateSlidesClasses()), r.freeMode && r.freeMode.enabled && i.freeMode && i.freeMode.onTouchMove(), i.updateProgress(s.currentTranslate), i.setTranslate(s.currentTranslate));
}
function ir(e) {
  const t = this, i = t.touchEventsData;
  let s = e;
  s.originalEvent && (s = s.originalEvent);
  let r;
  if (s.type === "touchend" || s.type === "touchcancel") {
    if (r = [...s.changedTouches].filter((S) => S.identifier === i.touchId)[0], !r || r.identifier !== i.touchId)
      return;
  } else {
    if (i.touchId !== null || s.pointerId !== i.pointerId)
      return;
    r = s;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(s.type) && !(["pointercancel", "contextmenu"].includes(s.type) && (t.browser.isSafari || t.browser.isWebView)))
    return;
  i.pointerId = null, i.touchId = null;
  const {
    params: l,
    touches: o,
    rtlTranslate: a,
    slidesGrid: d,
    enabled: c
  } = t;
  if (!c || !l.simulateTouch && s.pointerType === "mouse")
    return;
  if (i.allowTouchCallbacks && t.emit("touchEnd", s), i.allowTouchCallbacks = !1, !i.isTouched) {
    i.isMoved && l.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, i.startMoving = !1;
    return;
  }
  l.grabCursor && i.isMoved && i.isTouched && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!1);
  const f = ne(), u = f - i.touchStartTime;
  if (t.allowClick) {
    const S = s.path || s.composedPath && s.composedPath();
    t.updateClickedSlide(S && S[0] || s.target, S), t.emit("tap click", s), u < 300 && f - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", s);
  }
  if (i.lastClickTime = ne(), Ie(() => {
    t.destroyed || (t.allowClick = !0);
  }), !i.isTouched || !i.isMoved || !t.swipeDirection || o.diff === 0 && !i.loopSwapReset || i.currentTranslate === i.startTranslate && !i.loopSwapReset) {
    i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
    return;
  }
  i.isTouched = !1, i.isMoved = !1, i.startMoving = !1;
  let p;
  if (l.followFinger ? p = a ? t.translate : -t.translate : p = -i.currentTranslate, l.cssMode)
    return;
  if (l.freeMode && l.freeMode.enabled) {
    t.freeMode.onTouchEnd({
      currentPos: p
    });
    return;
  }
  let h = 0, v = t.slidesSizesGrid[0];
  for (let S = 0; S < d.length; S += S < l.slidesPerGroupSkip ? 1 : l.slidesPerGroup) {
    const M = S < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
    typeof d[S + M] < "u" ? p >= d[S] && p < d[S + M] && (h = S, v = d[S + M] - d[S]) : p >= d[S] && (h = S, v = d[d.length - 1] - d[d.length - 2]);
  }
  let y = null, g = null;
  l.rewind && (t.isBeginning ? g = l.virtual && l.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (y = 0));
  const x = (p - d[h]) / v, w = h < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
  if (u > l.longSwipesMs) {
    if (!l.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.swipeDirection === "next" && (x >= l.longSwipesRatio ? t.slideTo(l.rewind && t.isEnd ? y : h + w) : t.slideTo(h)), t.swipeDirection === "prev" && (x > 1 - l.longSwipesRatio ? t.slideTo(h + w) : g !== null && x < 0 && Math.abs(x) > l.longSwipesRatio ? t.slideTo(g) : t.slideTo(h));
  } else {
    if (!l.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation && (s.target === t.navigation.nextEl || s.target === t.navigation.prevEl) ? s.target === t.navigation.nextEl ? t.slideTo(h + w) : t.slideTo(h) : (t.swipeDirection === "next" && t.slideTo(y !== null ? y : h + w), t.swipeDirection === "prev" && t.slideTo(g !== null ? g : h));
  }
}
function nt() {
  const e = this, {
    params: t,
    el: i
  } = e;
  if (i && i.offsetWidth === 0)
    return;
  t.breakpoints && e.setBreakpoint();
  const {
    allowSlideNext: s,
    allowSlidePrev: r,
    snapGrid: n
  } = e, l = e.virtual && e.params.virtual.enabled;
  e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
  const o = l && t.loop;
  (t.slidesPerView === "auto" || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !o ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.params.loop && !l ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout), e.autoplay.resizeTimeout = setTimeout(() => {
    e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
  }, 500)), e.allowSlidePrev = r, e.allowSlideNext = s, e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
}
function sr(e) {
  const t = this;
  t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function rr() {
  const e = this, {
    wrapperEl: t,
    rtlTranslate: i,
    enabled: s
  } = e;
  if (!s)
    return;
  e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
  let r;
  const n = e.maxTranslate() - e.minTranslate();
  n === 0 ? r = 0 : r = (e.translate - e.minTranslate()) / n, r !== e.progress && e.updateProgress(i ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function nr(e) {
  const t = this;
  se(t, e.target), !(t.params.cssMode || t.params.slidesPerView !== "auto" && !t.params.autoHeight) && t.update();
}
function lr() {
  const e = this;
  e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
const Dt = (e, t) => {
  const i = U(), {
    params: s,
    el: r,
    wrapperEl: n,
    device: l
  } = e, o = !!s.nested, a = t === "on" ? "addEventListener" : "removeEventListener", d = t;
  i[a]("touchstart", e.onDocumentTouchStart, {
    passive: !1,
    capture: o
  }), r[a]("touchstart", e.onTouchStart, {
    passive: !1
  }), r[a]("pointerdown", e.onTouchStart, {
    passive: !1
  }), i[a]("touchmove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), i[a]("pointermove", e.onTouchMove, {
    passive: !1,
    capture: o
  }), i[a]("touchend", e.onTouchEnd, {
    passive: !0
  }), i[a]("pointerup", e.onTouchEnd, {
    passive: !0
  }), i[a]("pointercancel", e.onTouchEnd, {
    passive: !0
  }), i[a]("touchcancel", e.onTouchEnd, {
    passive: !0
  }), i[a]("pointerout", e.onTouchEnd, {
    passive: !0
  }), i[a]("pointerleave", e.onTouchEnd, {
    passive: !0
  }), i[a]("contextmenu", e.onTouchEnd, {
    passive: !0
  }), (s.preventClicks || s.preventClicksPropagation) && r[a]("click", e.onClick, !0), s.cssMode && n[a]("scroll", e.onScroll), s.updateOnWindowResize ? e[d](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", nt, !0) : e[d]("observerUpdate", nt, !0), r[a]("load", e.onLoad, {
    capture: !0
  });
};
function or() {
  const e = this, {
    params: t
  } = e;
  e.onTouchStart = er.bind(e), e.onTouchMove = tr.bind(e), e.onTouchEnd = ir.bind(e), e.onDocumentTouchStart = lr.bind(e), t.cssMode && (e.onScroll = rr.bind(e)), e.onClick = sr.bind(e), e.onLoad = nr.bind(e), Dt(e, "on");
}
function ar() {
  Dt(this, "off");
}
var dr = {
  attachEvents: or,
  detachEvents: ar
};
const lt = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function cr() {
  const e = this, {
    realIndex: t,
    initialized: i,
    params: s,
    el: r
  } = e, n = s.breakpoints;
  if (!n || n && Object.keys(n).length === 0)
    return;
  const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
  if (!l || e.currentBreakpoint === l)
    return;
  const a = (l in n ? n[l] : void 0) || e.originalParams, d = lt(e, s), c = lt(e, a), f = s.enabled;
  d && !c ? (r.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && c && (r.classList.add(`${s.containerModifierClass}grid`), (a.grid.fill && a.grid.fill === "column" || !a.grid.fill && s.grid.fill === "column") && r.classList.add(`${s.containerModifierClass}grid-column`), e.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((g) => {
    if (typeof a[g] > "u")
      return;
    const x = s[g] && s[g].enabled, w = a[g] && a[g].enabled;
    x && !w && e[g].disable(), !x && w && e[g].enable();
  });
  const u = a.direction && a.direction !== s.direction, p = s.loop && (a.slidesPerView !== s.slidesPerView || u), h = s.loop;
  u && i && e.changeDirection(), k(e.params, a);
  const v = e.params.enabled, y = e.params.loop;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  }), f && !v ? e.disable() : !f && v && e.enable(), e.currentBreakpoint = l, e.emit("_beforeBreakpoint", a), i && (p ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides()) : !h && y ? (e.loopCreate(t), e.updateSlides()) : h && !y && e.loopDestroy()), e.emit("breakpoint", a);
}
function fr(e, t, i) {
  if (t === void 0 && (t = "window"), !e || t === "container" && !i)
    return;
  let s = !1;
  const r = _(), n = t === "window" ? r.innerHeight : i.clientHeight, l = Object.keys(e).map((o) => {
    if (typeof o == "string" && o.indexOf("@") === 0) {
      const a = parseFloat(o.substr(1));
      return {
        value: n * a,
        point: o
      };
    }
    return {
      value: o,
      point: o
    };
  });
  l.sort((o, a) => parseInt(o.value, 10) - parseInt(a.value, 10));
  for (let o = 0; o < l.length; o += 1) {
    const {
      point: a,
      value: d
    } = l[o];
    t === "window" ? r.matchMedia(`(min-width: ${d}px)`).matches && (s = a) : d <= i.clientWidth && (s = a);
  }
  return s || "max";
}
var ur = {
  setBreakpoint: cr,
  getBreakpoint: fr
};
function pr(e, t) {
  const i = [];
  return e.forEach((s) => {
    typeof s == "object" ? Object.keys(s).forEach((r) => {
      s[r] && i.push(t + r);
    }) : typeof s == "string" && i.push(t + s);
  }), i;
}
function hr() {
  const e = this, {
    classNames: t,
    params: i,
    rtl: s,
    el: r,
    device: n
  } = e, l = pr(["initialized", i.direction, {
    "free-mode": e.params.freeMode && i.freeMode.enabled
  }, {
    autoheight: i.autoHeight
  }, {
    rtl: s
  }, {
    grid: i.grid && i.grid.rows > 1
  }, {
    "grid-column": i.grid && i.grid.rows > 1 && i.grid.fill === "column"
  }, {
    android: n.android
  }, {
    ios: n.ios
  }, {
    "css-mode": i.cssMode
  }, {
    centered: i.cssMode && i.centeredSlides
  }, {
    "watch-progress": i.watchSlidesProgress
  }], i.containerModifierClass);
  t.push(...l), r.classList.add(...t), e.emitContainerClasses();
}
function mr() {
  const e = this, {
    el: t,
    classNames: i
  } = e;
  t.classList.remove(...i), e.emitContainerClasses();
}
var gr = {
  addClasses: hr,
  removeClasses: mr
};
function vr() {
  const e = this, {
    isLocked: t,
    params: i
  } = e, {
    slidesOffsetBefore: s
  } = i;
  if (s) {
    const r = e.slides.length - 1, n = e.slidesGrid[r] + e.slidesSizesGrid[r] + s * 2;
    e.isLocked = e.size > n;
  } else
    e.isLocked = e.snapGrid.length === 1;
  i.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), i.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var wr = {
  checkOverflow: vr
}, ot = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  eventsPrefix: "swiper",
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: !1,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: !1,
  // Set wrapper width
  setWrapperSize: !1,
  // Virtual Translate
  virtualTranslate: !1,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: !0,
  // Round length
  roundLengths: !1,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  // Unique Navigation Elements
  uniqueNavElements: !0,
  // Resistance
  resistance: !0,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: !1,
  // Cursor
  grabCursor: !1,
  // Clicks
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  // loop
  loop: !1,
  loopAddBlankSlides: !0,
  loopAdditionalSlides: 0,
  loopPreventsSliding: !0,
  // rewind
  rewind: !1,
  // Swiping/no swiping
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: !0,
  // Internals
  _emitClasses: !1
};
function Sr(e, t) {
  return function(s) {
    s === void 0 && (s = {});
    const r = Object.keys(s)[0], n = s[r];
    if (typeof n != "object" || n === null) {
      k(t, s);
      return;
    }
    if (e[r] === !0 && (e[r] = {
      enabled: !0
    }), r === "navigation" && e[r] && e[r].enabled && !e[r].prevEl && !e[r].nextEl && (e[r].auto = !0), ["pagination", "scrollbar"].indexOf(r) >= 0 && e[r] && e[r].enabled && !e[r].el && (e[r].auto = !0), !(r in e && "enabled" in n)) {
      k(t, s);
      return;
    }
    typeof e[r] == "object" && !("enabled" in e[r]) && (e[r].enabled = !0), e[r] || (e[r] = {
      enabled: !1
    }), k(t, s);
  };
}
const ve = {
  eventsEmitter: gs,
  update: Cs,
  translate: ks,
  transition: Ds,
  slide: Ws,
  loop: Ks,
  grabCursor: Zs,
  events: dr,
  breakpoints: ur,
  checkOverflow: wr,
  classes: gr
}, we = {};
class G {
  constructor() {
    let t, i;
    for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
      r[n] = arguments[n];
    r.length === 1 && r[0].constructor && Object.prototype.toString.call(r[0]).slice(8, -1) === "Object" ? i = r[0] : [t, i] = r, i || (i = {}), i = k({}, i), t && !i.el && (i.el = t);
    const l = U();
    if (i.el && typeof i.el == "string" && l.querySelectorAll(i.el).length > 1) {
      const c = [];
      return l.querySelectorAll(i.el).forEach((f) => {
        const u = k({}, i, {
          el: f
        });
        c.push(new G(u));
      }), c;
    }
    const o = this;
    o.__swiper__ = !0, o.support = Gt(), o.device = fs({
      userAgent: i.userAgent
    }), o.browser = ps(), o.eventsListeners = {}, o.eventsAnyListeners = [], o.modules = [...o.__modules__], i.modules && Array.isArray(i.modules) && o.modules.push(...i.modules);
    const a = {};
    o.modules.forEach((c) => {
      c({
        params: i,
        swiper: o,
        extendParams: Sr(i, a),
        on: o.on.bind(o),
        once: o.once.bind(o),
        off: o.off.bind(o),
        emit: o.emit.bind(o)
      });
    });
    const d = k({}, ot, a);
    return o.params = k({}, d, we, i), o.originalParams = k({}, o.params), o.passedParams = k({}, i), o.params && o.params.on && Object.keys(o.params.on).forEach((c) => {
      o.on(c, o.params.on[c]);
    }), o.params && o.params.onAny && o.onAny(o.params.onAny), Object.assign(o, {
      enabled: o.params.enabled,
      el: t,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return o.params.direction === "horizontal";
      },
      isVertical() {
        return o.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: !0,
      isEnd: !1,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: o.params.allowSlideNext,
      allowSlidePrev: o.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: o.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: !0,
      // Touches
      allowTouchMove: o.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    }), o.emit("_swiper"), o.params.init && o.init(), o;
  }
  getDirectionLabel(t) {
    return this.isHorizontal() ? t : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[t];
  }
  getSlideIndex(t) {
    const {
      slidesEl: i,
      params: s
    } = this, r = V(i, `.${s.slideClass}, swiper-slide`), n = it(r[0]);
    return it(t) - n;
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(this.slides.filter((i) => i.getAttribute("data-swiper-slide-index") * 1 === t)[0]);
  }
  recalcSlides() {
    const t = this, {
      slidesEl: i,
      params: s
    } = t;
    t.slides = V(i, `.${s.slideClass}, swiper-slide`);
  }
  enable() {
    const t = this;
    t.enabled || (t.enabled = !0, t.params.grabCursor && t.setGrabCursor(), t.emit("enable"));
  }
  disable() {
    const t = this;
    t.enabled && (t.enabled = !1, t.params.grabCursor && t.unsetGrabCursor(), t.emit("disable"));
  }
  setProgress(t, i) {
    const s = this;
    t = Math.min(Math.max(t, 0), 1);
    const r = s.minTranslate(), l = (s.maxTranslate() - r) * t + r;
    s.translateTo(l, typeof i > "u" ? 0 : i), s.updateActiveIndex(), s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el)
      return;
    const i = t.el.className.split(" ").filter((s) => s.indexOf("swiper") === 0 || s.indexOf(t.params.containerModifierClass) === 0);
    t.emit("_containerClasses", i.join(" "));
  }
  getSlideClasses(t) {
    const i = this;
    return i.destroyed ? "" : t.className.split(" ").filter((s) => s.indexOf("swiper-slide") === 0 || s.indexOf(i.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el)
      return;
    const i = [];
    t.slides.forEach((s) => {
      const r = t.getSlideClasses(s);
      i.push({
        slideEl: s,
        classNames: r
      }), t.emit("_slideClass", s, r);
    }), t.emit("_slideClasses", i);
  }
  slidesPerViewDynamic(t, i) {
    t === void 0 && (t = "current"), i === void 0 && (i = !1);
    const s = this, {
      params: r,
      slides: n,
      slidesGrid: l,
      slidesSizesGrid: o,
      size: a,
      activeIndex: d
    } = s;
    let c = 1;
    if (typeof r.slidesPerView == "number")
      return r.slidesPerView;
    if (r.centeredSlides) {
      let f = n[d] ? n[d].swiperSlideSize : 0, u;
      for (let p = d + 1; p < n.length; p += 1)
        n[p] && !u && (f += n[p].swiperSlideSize, c += 1, f > a && (u = !0));
      for (let p = d - 1; p >= 0; p -= 1)
        n[p] && !u && (f += n[p].swiperSlideSize, c += 1, f > a && (u = !0));
    } else if (t === "current")
      for (let f = d + 1; f < n.length; f += 1)
        (i ? l[f] + o[f] - l[d] < a : l[f] - l[d] < a) && (c += 1);
    else
      for (let f = d - 1; f >= 0; f -= 1)
        l[d] - l[f] < a && (c += 1);
    return c;
  }
  update() {
    const t = this;
    if (!t || t.destroyed)
      return;
    const {
      snapGrid: i,
      params: s
    } = t;
    s.breakpoints && t.setBreakpoint(), [...t.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
      l.complete && se(t, l);
    }), t.updateSize(), t.updateSlides(), t.updateProgress(), t.updateSlidesClasses();
    function r() {
      const l = t.rtlTranslate ? t.translate * -1 : t.translate, o = Math.min(Math.max(l, t.maxTranslate()), t.minTranslate());
      t.setTranslate(o), t.updateActiveIndex(), t.updateSlidesClasses();
    }
    let n;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      r(), s.autoHeight && t.updateAutoHeight();
    else {
      if ((s.slidesPerView === "auto" || s.slidesPerView > 1) && t.isEnd && !s.centeredSlides) {
        const l = t.virtual && s.virtual.enabled ? t.virtual.slides : t.slides;
        n = t.slideTo(l.length - 1, 0, !1, !0);
      } else
        n = t.slideTo(t.activeIndex, 0, !1, !0);
      n || r();
    }
    s.watchOverflow && i !== t.snapGrid && t.checkOverflow(), t.emit("update");
  }
  changeDirection(t, i) {
    i === void 0 && (i = !0);
    const s = this, r = s.params.direction;
    return t || (t = r === "horizontal" ? "vertical" : "horizontal"), t === r || t !== "horizontal" && t !== "vertical" || (s.el.classList.remove(`${s.params.containerModifierClass}${r}`), s.el.classList.add(`${s.params.containerModifierClass}${t}`), s.emitContainerClasses(), s.params.direction = t, s.slides.forEach((n) => {
      t === "vertical" ? n.style.width = "" : n.style.height = "";
    }), s.emit("changeDirection"), i && s.update()), s;
  }
  changeLanguageDirection(t) {
    const i = this;
    i.rtl && t === "rtl" || !i.rtl && t === "ltr" || (i.rtl = t === "rtl", i.rtlTranslate = i.params.direction === "horizontal" && i.rtl, i.rtl ? (i.el.classList.add(`${i.params.containerModifierClass}rtl`), i.el.dir = "rtl") : (i.el.classList.remove(`${i.params.containerModifierClass}rtl`), i.el.dir = "ltr"), i.update());
  }
  mount(t) {
    const i = this;
    if (i.mounted)
      return !0;
    let s = t || i.params.el;
    if (typeof s == "string" && (s = document.querySelector(s)), !s)
      return !1;
    s.swiper = i, s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === "SWIPER-CONTAINER" && (i.isElement = !0);
    const r = () => `.${(i.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let l = (() => s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(r()) : V(s, r())[0])();
    return !l && i.params.createElements && (l = Oe("div", i.params.wrapperClass), s.append(l), V(s, `.${i.params.slideClass}`).forEach((o) => {
      l.append(o);
    })), Object.assign(i, {
      el: s,
      wrapperEl: l,
      slidesEl: i.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : l,
      hostEl: i.isElement ? s.parentNode.host : s,
      mounted: !0,
      // RTL
      rtl: s.dir.toLowerCase() === "rtl" || B(s, "direction") === "rtl",
      rtlTranslate: i.params.direction === "horizontal" && (s.dir.toLowerCase() === "rtl" || B(s, "direction") === "rtl"),
      wrongRTL: B(l, "display") === "-webkit-box"
    }), !0;
  }
  init(t) {
    const i = this;
    if (i.initialized || i.mount(t) === !1)
      return i;
    i.emit("beforeInit"), i.params.breakpoints && i.setBreakpoint(), i.addClasses(), i.updateSize(), i.updateSlides(), i.params.watchOverflow && i.checkOverflow(), i.params.grabCursor && i.enabled && i.setGrabCursor(), i.params.loop && i.virtual && i.params.virtual.enabled ? i.slideTo(i.params.initialSlide + i.virtual.slidesBefore, 0, i.params.runCallbacksOnInit, !1, !0) : i.slideTo(i.params.initialSlide, 0, i.params.runCallbacksOnInit, !1, !0), i.params.loop && i.loopCreate(), i.attachEvents();
    const r = [...i.el.querySelectorAll('[loading="lazy"]')];
    return i.isElement && r.push(...i.hostEl.querySelectorAll('[loading="lazy"]')), r.forEach((n) => {
      n.complete ? se(i, n) : n.addEventListener("load", (l) => {
        se(i, l.target);
      });
    }), Ae(i), i.initialized = !0, Ae(i), i.emit("init"), i.emit("afterInit"), i;
  }
  destroy(t, i) {
    t === void 0 && (t = !0), i === void 0 && (i = !0);
    const s = this, {
      params: r,
      el: n,
      wrapperEl: l,
      slides: o
    } = s;
    return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), r.loop && s.loopDestroy(), i && (s.removeClasses(), n.removeAttribute("style"), l.removeAttribute("style"), o && o.length && o.forEach((a) => {
      a.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass), a.removeAttribute("style"), a.removeAttribute("data-swiper-slide-index");
    })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((a) => {
      s.off(a);
    }), t !== !1 && (s.el.swiper = null, is(s)), s.destroyed = !0), null;
  }
  static extendDefaults(t) {
    k(we, t);
  }
  static get extendedDefaults() {
    return we;
  }
  static get defaults() {
    return ot;
  }
  static installModule(t) {
    G.prototype.__modules__ || (G.prototype.__modules__ = []);
    const i = G.prototype.__modules__;
    typeof t == "function" && i.indexOf(t) < 0 && i.push(t);
  }
  static use(t) {
    return Array.isArray(t) ? (t.forEach((i) => G.installModule(i)), G) : (G.installModule(t), G);
  }
}
Object.keys(ve).forEach((e) => {
  Object.keys(ve[e]).forEach((t) => {
    G.prototype[t] = ve[e][t];
  });
});
G.use([hs, ms]);
function Tr(e) {
  return {};
}
zt({
  $delimiters: ["[[", "]]"],
  Menu: Qi,
  Slider: Tr
}).mount();
