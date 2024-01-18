var pf = Object.defineProperty, gf = (n, e, t) => e in n ? pf(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, Hi = (n, e, t) => (gf(n, typeof e != "symbol" ? e + "" : e, t), t);
function mf(n, e) {
  const t = /* @__PURE__ */ Object.create(null), i = n.split(",");
  for (let r = 0; r < i.length; r++)
    t[i[r]] = !0;
  return e ? (r) => !!t[r.toLowerCase()] : (r) => !!t[r];
}
function dl(n) {
  if (Fe(n)) {
    const e = {};
    for (let t = 0; t < n.length; t++) {
      const i = n[t], r = Ir(i) ? wf(i) : dl(i);
      if (r)
        for (const s in r)
          e[s] = r[s];
    }
    return e;
  } else if (Ir(n) || ki(n))
    return n;
}
const _f = /;(?![^(]*\))/g, vf = /:(.+)/;
function wf(n) {
  const e = {};
  return n.split(_f).forEach((t) => {
    if (t) {
      const i = t.split(vf);
      i.length > 1 && (e[i[0].trim()] = i[1].trim());
    }
  }), e;
}
function hl(n) {
  let e = "";
  if (Ir(n))
    e = n;
  else if (Fe(n))
    for (let t = 0; t < n.length; t++) {
      const i = hl(n[t]);
      i && (e += i + " ");
    }
  else if (ki(n))
    for (const t in n)
      n[t] && (e += t + " ");
  return e.trim();
}
function yf(n, e) {
  if (n.length !== e.length)
    return !1;
  let t = !0;
  for (let i = 0; t && i < n.length; i++)
    t = Pr(n[i], e[i]);
  return t;
}
function Pr(n, e) {
  if (n === e)
    return !0;
  let t = ua(n), i = ua(e);
  if (t || i)
    return t && i ? n.getTime() === e.getTime() : !1;
  if (t = Fe(n), i = Fe(e), t || i)
    return t && i ? yf(n, e) : !1;
  if (t = ki(n), i = ki(e), t || i) {
    if (!t || !i)
      return !1;
    const r = Object.keys(n).length, s = Object.keys(e).length;
    if (r !== s)
      return !1;
    for (const o in n) {
      const a = n.hasOwnProperty(o), l = e.hasOwnProperty(o);
      if (a && !l || !a && l || !Pr(n[o], e[o]))
        return !1;
    }
  }
  return String(n) === String(e);
}
function Ss(n, e) {
  return n.findIndex((t) => Pr(t, e));
}
const xf = Object.assign, bf = (n, e) => {
  const t = n.indexOf(e);
  t > -1 && n.splice(t, 1);
}, Tf = Object.prototype.hasOwnProperty, Do = (n, e) => Tf.call(n, e), Fe = Array.isArray, Es = (n) => pl(n) === "[object Map]", ua = (n) => n instanceof Date, Ir = (n) => typeof n == "string", Io = (n) => typeof n == "symbol", ki = (n) => n !== null && typeof n == "object", Sf = Object.prototype.toString, pl = (n) => Sf.call(n), Ef = (n) => pl(n).slice(8, -1), zo = (n) => Ir(n) && n !== "NaN" && n[0] !== "-" && "" + parseInt(n, 10) === n, gl = (n) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (t) => e[t] || (e[t] = n(t));
}, Pf = /-(\w)/g, Cf = gl((n) => n.replace(Pf, (e, t) => t ? t.toUpperCase() : "")), Mf = /\B([A-Z])/g, ml = gl((n) => n.replace(Mf, "-$1").toLowerCase()), kf = (n, e) => !Object.is(n, e), fa = (n) => {
  const e = parseFloat(n);
  return isNaN(e) ? n : e;
};
let Of;
function _l(n, e) {
  e = e || Of, e && e.active && e.effects.push(n);
}
const vl = (n) => {
  const e = new Set(n);
  return e.w = 0, e.n = 0, e;
}, wl = (n) => (n.w & Oi) > 0, yl = (n) => (n.n & Oi) > 0, Af = ({ deps: n }) => {
  if (n.length)
    for (let e = 0; e < n.length; e++)
      n[e].w |= Oi;
}, Df = (n) => {
  const { deps: e } = n;
  if (e.length) {
    let t = 0;
    for (let i = 0; i < e.length; i++) {
      const r = e[i];
      wl(r) && !yl(r) ? r.delete(n) : e[t++] = r, r.w &= ~Oi, r.n &= ~Oi;
    }
    e.length = t;
  }
}, js = /* @__PURE__ */ new WeakMap();
let Kr = 0, Oi = 1;
const Ks = 30, Xr = [];
let Qi;
const $n = Symbol(""), ca = Symbol("");
class If {
  constructor(e, t = null, i) {
    this.fn = e, this.scheduler = t, this.active = !0, this.deps = [], _l(this, i);
  }
  run() {
    if (!this.active)
      return this.fn();
    if (!Xr.includes(this))
      try {
        return Xr.push(Qi = this), Ff(), Oi = 1 << ++Kr, Kr <= Ks ? Af(this) : da(this), this.fn();
      } finally {
        Kr <= Ks && Df(this), Oi = 1 << --Kr, xl(), Xr.pop();
        const e = Xr.length;
        Qi = e > 0 ? Xr[e - 1] : void 0;
      }
  }
  stop() {
    this.active && (da(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function da(n) {
  const { deps: e } = n;
  if (e.length) {
    for (let t = 0; t < e.length; t++)
      e[t].delete(n);
    e.length = 0;
  }
}
function zf(n, e) {
  n.effect && (n = n.effect.fn);
  const t = new If(n);
  e && (xf(t, e), e.scope && _l(t, e.scope)), (!e || !e.lazy) && t.run();
  const i = t.run.bind(t);
  return i.effect = t, i;
}
function Lf(n) {
  n.effect.stop();
}
let zr = !0;
const Lo = [];
function Rf() {
  Lo.push(zr), zr = !1;
}
function Ff() {
  Lo.push(zr), zr = !0;
}
function xl() {
  const n = Lo.pop();
  zr = n === void 0 ? !0 : n;
}
function ms(n, e, t) {
  if (!Nf())
    return;
  let i = js.get(n);
  i || js.set(n, i = /* @__PURE__ */ new Map());
  let r = i.get(t);
  r || i.set(t, r = vl()), Bf(r);
}
function Nf() {
  return zr && Qi !== void 0;
}
function Bf(n, e) {
  let t = !1;
  Kr <= Ks ? yl(n) || (n.n |= Oi, t = !wl(n)) : t = !n.has(Qi), t && (n.add(Qi), Qi.deps.push(n));
}
function Zs(n, e, t, i, r, s) {
  const o = js.get(n);
  if (!o)
    return;
  let a = [];
  if (e === "clear")
    a = [...o.values()];
  else if (t === "length" && Fe(n))
    o.forEach((l, u) => {
      (u === "length" || u >= i) && a.push(l);
    });
  else
    switch (t !== void 0 && a.push(o.get(t)), e) {
      case "add":
        Fe(n) ? zo(t) && a.push(o.get("length")) : (a.push(o.get($n)), Es(n) && a.push(o.get(ca)));
        break;
      case "delete":
        Fe(n) || (a.push(o.get($n)), Es(n) && a.push(o.get(ca)));
        break;
      case "set":
        Es(n) && a.push(o.get($n));
        break;
    }
  if (a.length === 1)
    a[0] && ha(a[0]);
  else {
    const l = [];
    for (const u of a)
      u && l.push(...u);
    ha(vl(l));
  }
}
function ha(n, e) {
  for (const t of Fe(n) ? n : [...n])
    (t !== Qi || t.allowRecurse) && (t.scheduler ? t.scheduler() : t.run());
}
const Vf = mf("__proto__,__v_isRef,__isVue"), bl = new Set(Object.getOwnPropertyNames(Symbol).map((n) => Symbol[n]).filter(Io)), Gf = Tl(), $f = Tl(!0), pa = Yf();
function Yf() {
  const n = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    n[e] = function(...t) {
      const i = Ji(this);
      for (let s = 0, o = this.length; s < o; s++)
        ms(i, "get", s + "");
      const r = i[e](...t);
      return r === -1 || r === !1 ? i[e](...t.map(Ji)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    n[e] = function(...t) {
      Rf();
      const i = Ji(this)[e].apply(this, t);
      return xl(), i;
    };
  }), n;
}
function Tl(n = !1, e = !1) {
  return function(t, i, r) {
    if (i === "__v_isReactive")
      return !n;
    if (i === "__v_isReadonly")
      return n;
    if (i === "__v_raw" && r === (n ? e ? Qf : El : e ? Zf : Sl).get(t))
      return t;
    const s = Fe(t);
    if (!n && s && Do(pa, i))
      return Reflect.get(pa, i, r);
    const o = Reflect.get(t, i, r);
    return (Io(i) ? bl.has(i) : Vf(i)) || (n || ms(t, "get", i), e) ? o : Qs(o) ? !s || !zo(i) ? o.value : o : ki(o) ? n ? tc(o) : _s(o) : o;
  };
}
const Hf = Wf();
function Wf(n = !1) {
  return function(e, t, i, r) {
    let s = e[t];
    if (!n && !ic(i) && (i = Ji(i), s = Ji(s), !Fe(e) && Qs(s) && !Qs(i)))
      return s.value = i, !0;
    const o = Fe(e) && zo(t) ? Number(t) < e.length : Do(e, t), a = Reflect.set(e, t, i, r);
    return e === Ji(r) && (o ? kf(i, s) && Zs(e, "set", t, i) : Zs(e, "add", t, i)), a;
  };
}
function Xf(n, e) {
  const t = Do(n, e);
  n[e];
  const i = Reflect.deleteProperty(n, e);
  return i && t && Zs(n, "delete", e, void 0), i;
}
function qf(n, e) {
  const t = Reflect.has(n, e);
  return (!Io(e) || !bl.has(e)) && ms(n, "has", e), t;
}
function Uf(n) {
  return ms(n, "iterate", Fe(n) ? "length" : $n), Reflect.ownKeys(n);
}
const jf = { get: Gf, set: Hf, deleteProperty: Xf, has: qf, ownKeys: Uf }, Kf = { get: $f, set(n, e) {
  return !0;
}, deleteProperty(n, e) {
  return !0;
} }, Sl = /* @__PURE__ */ new WeakMap(), Zf = /* @__PURE__ */ new WeakMap(), El = /* @__PURE__ */ new WeakMap(), Qf = /* @__PURE__ */ new WeakMap();
function Jf(n) {
  switch (n) {
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
function ec(n) {
  return n.__v_skip || !Object.isExtensible(n) ? 0 : Jf(Ef(n));
}
function _s(n) {
  return n && n.__v_isReadonly ? n : Pl(n, !1, jf, null, Sl);
}
function tc(n) {
  return Pl(n, !0, Kf, null, El);
}
function Pl(n, e, t, i, r) {
  if (!ki(n) || n.__v_raw && !(e && n.__v_isReactive))
    return n;
  const s = r.get(n);
  if (s)
    return s;
  const o = ec(n);
  if (o === 0)
    return n;
  const a = new Proxy(n, o === 2 ? i : t);
  return r.set(n, a), a;
}
function ic(n) {
  return !!(n && n.__v_isReadonly);
}
function Ji(n) {
  const e = n && n.__v_raw;
  return e ? Ji(e) : n;
}
function Qs(n) {
  return !!(n && n.__v_isRef === !0);
}
Promise.resolve();
let Js = !1;
const ts = [], rc = Promise.resolve(), vs = (n) => rc.then(n), ga = (n) => {
  ts.includes(n) || ts.push(n), Js || (Js = !0, vs(nc));
}, nc = () => {
  for (const n of ts)
    n();
  ts.length = 0, Js = !1;
}, sc = /^(spellcheck|draggable|form|list|type)$/, eo = ({ el: n, get: e, effect: t, arg: i, modifiers: r }) => {
  let s;
  i === "class" && (n._class = n.className), t(() => {
    let o = e();
    if (i)
      r != null && r.camel && (i = Cf(i)), Ps(n, i, o, s);
    else {
      for (const a in o)
        Ps(n, a, o[a], s && s[a]);
      for (const a in s)
        (!o || !(a in o)) && Ps(n, a, null);
    }
    s = o;
  });
}, Ps = (n, e, t, i) => {
  if (e === "class")
    n.setAttribute("class", hl(n._class ? [n._class, t] : t) || "");
  else if (e === "style") {
    t = dl(t);
    const { style: r } = n;
    if (!t)
      n.removeAttribute("style");
    else if (Ir(t))
      t !== i && (r.cssText = t);
    else {
      for (const s in t)
        to(r, s, t[s]);
      if (i && !Ir(i))
        for (const s in i)
          t[s] == null && to(r, s, "");
    }
  } else
    !(n instanceof SVGElement) && e in n && !sc.test(e) ? (n[e] = t, e === "value" && (n._value = t)) : e === "true-value" ? n._trueValue = t : e === "false-value" ? n._falseValue = t : t != null ? n.setAttribute(e, t) : n.removeAttribute(e);
}, ma = /\s*!important$/, to = (n, e, t) => {
  Fe(t) ? t.forEach((i) => to(n, e, i)) : e.startsWith("--") ? n.setProperty(e, t) : ma.test(t) ? n.setProperty(ml(e), t.replace(ma, ""), "important") : n[e] = t;
}, wi = (n, e) => {
  const t = n.getAttribute(e);
  return t != null && n.removeAttribute(e), t;
}, _i = (n, e, t, i) => {
  n.addEventListener(e, t, i);
}, oc = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, ac = ["ctrl", "shift", "alt", "meta"], lc = { stop: (n) => n.stopPropagation(), prevent: (n) => n.preventDefault(), self: (n) => n.target !== n.currentTarget, ctrl: (n) => !n.ctrlKey, shift: (n) => !n.shiftKey, alt: (n) => !n.altKey, meta: (n) => !n.metaKey, left: (n) => "button" in n && n.button !== 0, middle: (n) => "button" in n && n.button !== 1, right: (n) => "button" in n && n.button !== 2, exact: (n, e) => ac.some((t) => n[`${t}Key`] && !e[t]) }, Cl = ({ el: n, get: e, exp: t, arg: i, modifiers: r }) => {
  if (!i)
    return;
  let s = oc.test(t) ? e(`(e => ${t}(e))`) : e(`($event => { ${t} })`);
  if (i === "vue:mounted") {
    vs(s);
    return;
  } else if (i === "vue:unmounted")
    return () => s();
  if (r) {
    i === "click" && (r.right && (i = "contextmenu"), r.middle && (i = "mouseup"));
    const o = s;
    s = (a) => {
      if (!("key" in a && !(ml(a.key) in r))) {
        for (const l in r) {
          const u = lc[l];
          if (u && u(a, r))
            return;
        }
        return o(a);
      }
    };
  }
  _i(n, i, s, r);
}, uc = ({ el: n, get: e, effect: t }) => {
  const i = n.style.display;
  t(() => {
    n.style.display = e() ? i : "none";
  });
}, Ml = ({ el: n, get: e, effect: t }) => {
  t(() => {
    n.textContent = kl(e());
  });
}, kl = (n) => n == null ? "" : ki(n) ? JSON.stringify(n, null, 2) : String(n), fc = ({ el: n, get: e, effect: t }) => {
  t(() => {
    n.innerHTML = e();
  });
}, cc = ({ el: n, exp: e, get: t, effect: i, modifiers: r }) => {
  const s = n.type, o = t(`(val) => { ${e} = val }`), { trim: a, number: l = s === "number" } = r || {};
  if (n.tagName === "SELECT") {
    const u = n;
    _i(n, "change", () => {
      const f = Array.prototype.filter.call(u.options, (d) => d.selected).map((d) => l ? fa(mi(d)) : mi(d));
      o(u.multiple ? f : f[0]);
    }), i(() => {
      const f = t(), d = u.multiple;
      for (let h = 0, c = u.options.length; h < c; h++) {
        const g = u.options[h], p = mi(g);
        if (d)
          Fe(f) ? g.selected = Ss(f, p) > -1 : g.selected = f.has(p);
        else if (Pr(mi(g), f)) {
          u.selectedIndex !== h && (u.selectedIndex = h);
          return;
        }
      }
      !d && u.selectedIndex !== -1 && (u.selectedIndex = -1);
    });
  } else if (s === "checkbox") {
    _i(n, "change", () => {
      const f = t(), d = n.checked;
      if (Fe(f)) {
        const h = mi(n), c = Ss(f, h), g = c !== -1;
        if (d && !g)
          o(f.concat(h));
        else if (!d && g) {
          const p = [...f];
          p.splice(c, 1), o(p);
        }
      } else
        o(_a(n, d));
    });
    let u;
    i(() => {
      const f = t();
      Fe(f) ? n.checked = Ss(f, mi(n)) > -1 : f !== u && (n.checked = Pr(f, _a(n, !0))), u = f;
    });
  } else if (s === "radio") {
    _i(n, "change", () => {
      o(mi(n));
    });
    let u;
    i(() => {
      const f = t();
      f !== u && (n.checked = Pr(f, mi(n)));
    });
  } else {
    const u = (f) => a ? f.trim() : l ? fa(f) : f;
    _i(n, "compositionstart", dc), _i(n, "compositionend", hc), _i(n, r != null && r.lazy ? "change" : "input", () => {
      n.composing || o(u(n.value));
    }), a && _i(n, "change", () => {
      n.value = n.value.trim();
    }), i(() => {
      if (n.composing)
        return;
      const f = n.value, d = t();
      document.activeElement === n && u(f) === d || f !== d && (n.value = d);
    });
  }
}, mi = (n) => "_value" in n ? n._value : n.value, _a = (n, e) => {
  const t = e ? "_trueValue" : "_falseValue";
  return t in n ? n[t] : e;
}, dc = (n) => {
  n.target.composing = !0;
}, hc = (n) => {
  const e = n.target;
  e.composing && (e.composing = !1, pc(e, "input"));
}, pc = (n, e) => {
  const t = document.createEvent("HTMLEvents");
  t.initEvent(e, !0, !0), n.dispatchEvent(t);
}, va = /* @__PURE__ */ Object.create(null), pn = (n, e, t) => Ol(n, `return(${e})`, t), Ol = (n, e, t) => {
  const i = va[e] || (va[e] = gc(e));
  try {
    return i(n, t);
  } catch (r) {
    console.error(r);
  }
}, gc = (n) => {
  try {
    return new Function("$data", "$el", `with($data){${n}}`);
  } catch (e) {
    return console.error(`${e.message} in expression: ${n}`), () => {
    };
  }
}, mc = ({ el: n, ctx: e, exp: t, effect: i }) => {
  vs(() => i(() => Ol(e.scope, t, n)));
}, _c = { bind: eo, on: Cl, show: uc, text: Ml, html: fc, model: cc, effect: mc }, vc = (n, e, t) => {
  const i = n.parentElement, r = new Comment("v-if");
  i.insertBefore(r, n);
  const s = [{ exp: e, el: n }];
  let o, a;
  for (; (o = n.nextElementSibling) && (a = null, wi(o, "v-else") === "" || (a = wi(o, "v-else-if"))); )
    i.removeChild(o), s.push({ exp: a, el: o });
  const l = n.nextSibling;
  i.removeChild(n);
  let u, f = -1;
  const d = () => {
    u && (i.insertBefore(r, u.el), u.remove(), u = void 0);
  };
  return t.effect(() => {
    for (let h = 0; h < s.length; h++) {
      const { exp: c, el: g } = s[h];
      if (!c || pn(t.scope, c)) {
        h !== f && (d(), u = new Ro(g, t), u.insert(i, r), i.removeChild(r), f = h);
        return;
      }
    }
    f = -1, d();
  }), l;
}, wc = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, wa = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, yc = /^\(|\)$/g, xc = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/, bc = (n, e, t) => {
  const i = e.match(wc);
  if (!i)
    return;
  const r = n.nextSibling, s = n.parentElement, o = new Text("");
  s.insertBefore(o, n), s.removeChild(n);
  const a = i[2].trim();
  let l = i[1].trim().replace(yc, "").trim(), u, f = !1, d, h, c = "key", g = n.getAttribute(c) || n.getAttribute(c = ":key") || n.getAttribute(c = "v-bind:key");
  g && (n.removeAttribute(c), c === "key" && (g = JSON.stringify(g)));
  let p;
  (p = l.match(wa)) && (l = l.replace(wa, "").trim(), d = p[1].trim(), p[2] && (h = p[2].trim())), (p = l.match(xc)) && (u = p[1].split(",").map((S) => S.trim()), f = l[0] === "[");
  let m = !1, _, w, y;
  const v = (S) => {
    const M = /* @__PURE__ */ new Map(), P = [];
    if (Fe(S))
      for (let b = 0; b < S.length; b++)
        P.push(T(M, S[b], b));
    else if (typeof S == "number")
      for (let b = 0; b < S; b++)
        P.push(T(M, b + 1, b));
    else if (ki(S)) {
      let b = 0;
      for (const O in S)
        P.push(T(M, S[O], b++, O));
    }
    return [P, M];
  }, T = (S, M, P, b) => {
    const O = {};
    u ? u.forEach((z, L) => O[z] = M[f ? L : z]) : O[l] = M, b ? (d && (O[d] = b), h && (O[h] = P)) : d && (O[d] = P);
    const k = zl(t, O), A = g ? pn(k.scope, g) : P;
    return S.set(A, P), k.key = A, k;
  }, C = (S, M) => {
    const P = new Ro(n, S);
    return P.key = S.key, P.insert(s, M), P;
  };
  return t.effect(() => {
    const S = pn(t.scope, a), M = y;
    if ([w, y] = v(S), !m)
      _ = w.map((P) => C(P, o)), m = !0;
    else {
      for (let A = 0; A < _.length; A++)
        y.has(_[A].key) || _[A].remove();
      const P = [];
      let b = w.length, O, k;
      for (; b--; ) {
        const A = w[b], z = M.get(A.key);
        let L;
        z == null ? L = C(A, O ? O.el : o) : (L = _[z], Object.assign(L.ctx.scope, A.scope), z !== b && (_[z + 1] !== O || k === O) && (k = L, L.insert(s, O ? O.el : o))), P.unshift(O = L);
      }
      _ = P;
    }
  }), r;
}, Al = ({ el: n, ctx: { scope: { $refs: e } }, get: t, effect: i }) => {
  let r;
  return i(() => {
    const s = t();
    e[s] = n, r && s !== r && delete e[r], r = s;
  }), () => {
    r && delete e[r];
  };
}, Tc = /^(?:v-|:|@)/, Sc = /\.([\w-]+)/g;
let io = !1;
const Dl = (n, e) => {
  const t = n.nodeType;
  if (t === 1) {
    const i = n;
    if (i.hasAttribute("v-pre"))
      return;
    wi(i, "v-cloak");
    let r;
    if (r = wi(i, "v-if"))
      return vc(i, r, e);
    if (r = wi(i, "v-for"))
      return bc(i, r, e);
    if ((r = wi(i, "v-scope")) || r === "") {
      const a = r ? pn(e.scope, r) : {};
      e = zl(e, a), a.$template && Ec(i, a.$template);
    }
    const s = wi(i, "v-once") != null;
    s && (io = !0), (r = wi(i, "ref")) && ro(i, Al, `"${r}"`, e), ya(i, e);
    const o = [];
    for (const { name: a, value: l } of [...i.attributes])
      Tc.test(a) && a !== "v-cloak" && (a === "v-model" ? o.unshift([a, l]) : a[0] === "@" || /^v-on\b/.test(a) ? o.push([a, l]) : xa(i, a, l, e));
    for (const [a, l] of o)
      xa(i, a, l, e);
    s && (io = !1);
  } else if (t === 3) {
    const i = n.data;
    if (i.includes(e.delimiters[0])) {
      let r = [], s = 0, o;
      for (; o = e.delimitersRE.exec(i); ) {
        const a = i.slice(s, o.index);
        a && r.push(JSON.stringify(a)), r.push(`$s(${o[1]})`), s = o.index + o[0].length;
      }
      s < i.length && r.push(JSON.stringify(i.slice(s))), ro(n, Ml, r.join("+"), e);
    }
  } else
    t === 11 && ya(n, e);
}, ya = (n, e) => {
  let t = n.firstChild;
  for (; t; )
    t = Dl(t, e) || t.nextSibling;
}, xa = (n, e, t, i) => {
  let r, s, o;
  if (e = e.replace(Sc, (a, l) => ((o || (o = {}))[l] = !0, "")), e[0] === ":")
    r = eo, s = e.slice(1);
  else if (e[0] === "@")
    r = Cl, s = e.slice(1);
  else {
    const a = e.indexOf(":"), l = a > 0 ? e.slice(2, a) : e.slice(2);
    r = _c[l] || i.dirs[l], s = a > 0 ? e.slice(a + 1) : void 0;
  }
  r && (r === eo && s === "ref" && (r = Al), ro(n, r, t, i, s, o), n.removeAttribute(e));
}, ro = (n, e, t, i, r, s) => {
  const o = e({ el: n, get: (a = t) => pn(i.scope, a, n), effect: i.effect, ctx: i, exp: t, arg: r, modifiers: s });
  o && i.cleanups.push(o);
}, Ec = (n, e) => {
  if (e[0] === "#") {
    const t = document.querySelector(e);
    n.appendChild(t.content.cloneNode(!0));
    return;
  }
  n.innerHTML = e;
}, Il = (n) => {
  const e = { delimiters: ["{{", "}}"], delimitersRE: /\{\{([^]+?)\}\}/g, ...n, scope: n ? n.scope : _s({}), dirs: n ? n.dirs : {}, effects: [], blocks: [], cleanups: [], effect: (t) => {
    if (io)
      return ga(t), t;
    const i = zf(t, { scheduler: () => ga(i) });
    return e.effects.push(i), i;
  } };
  return e;
}, zl = (n, e = {}) => {
  const t = n.scope, i = Object.create(t);
  Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)), i.$refs = Object.create(t.$refs);
  const r = _s(new Proxy(i, { set(s, o, a, l) {
    return l === r && !s.hasOwnProperty(o) ? Reflect.set(t, o, a) : Reflect.set(s, o, a, l);
  } }));
  return Ll(r), { ...n, scope: r };
}, Ll = (n) => {
  for (const e of Object.keys(n))
    typeof n[e] == "function" && (n[e] = n[e].bind(n));
};
class Ro {
  constructor(e, t, i = !1) {
    Hi(this, "template"), Hi(this, "ctx"), Hi(this, "key"), Hi(this, "parentCtx"), Hi(this, "isFragment"), Hi(this, "start"), Hi(this, "end"), this.isFragment = e instanceof HTMLTemplateElement, i ? this.template = e : this.isFragment ? this.template = e.content.cloneNode(!0) : this.template = e.cloneNode(!0), i ? this.ctx = t : (this.parentCtx = t, t.blocks.push(this), this.ctx = Il(t)), Dl(this.template, this.ctx);
  }
  get el() {
    return this.start || this.template;
  }
  insert(e, t = null) {
    if (this.isFragment)
      if (this.start) {
        let i = this.start, r;
        for (; i && (r = i.nextSibling, e.insertBefore(i, t), i !== this.end); )
          i = r;
      } else
        this.start = new Text(""), this.end = new Text(""), e.insertBefore(this.end, t), e.insertBefore(this.start, this.end), e.insertBefore(this.template, this.end);
    else
      e.insertBefore(this.template, t);
  }
  remove() {
    if (this.parentCtx && bf(this.parentCtx.blocks, this), this.start) {
      const e = this.start.parentNode;
      let t = this.start, i;
      for (; t && (i = t.nextSibling, e.removeChild(t), t !== this.end); )
        t = i;
    } else
      this.template.parentNode.removeChild(this.template);
    this.teardown();
  }
  teardown() {
    this.ctx.blocks.forEach((e) => {
      e.teardown();
    }), this.ctx.effects.forEach(Lf), this.ctx.cleanups.forEach((e) => e());
  }
}
const ba = (n) => n.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), Rl = (n) => {
  const e = Il();
  if (n && (e.scope = _s(n), Ll(e.scope), n.$delimiters)) {
    const [i, r] = e.delimiters = n.$delimiters;
    e.delimitersRE = new RegExp(ba(i) + "([^]+?)" + ba(r), "g");
  }
  e.scope.$s = kl, e.scope.$nextTick = vs, e.scope.$refs = /* @__PURE__ */ Object.create(null);
  let t;
  return { directive(i, r) {
    return r ? (e.dirs[i] = r, this) : e.dirs[i];
  }, mount(i) {
    if (typeof i == "string" && (i = document.querySelector(i), !i))
      return;
    i = i || document.documentElement;
    let r;
    return i.hasAttribute("v-scope") ? r = [i] : r = [...i.querySelectorAll("[v-scope]")].filter((s) => !s.matches("[v-scope] [v-scope]")), r.length || (r = [i]), t = r.map((s) => new Ro(s, e, !0)), this;
  }, unmount() {
    t.forEach((i) => i.teardown());
  } };
}, Ta = document.currentScript;
Ta && Ta.hasAttribute("init") && Rl().mount();
function Pc(n) {
  return {
    siteHeader: null,
    menuOpen: !1,
    submenuOpen: !1,
    toggleMenu() {
      this.menuOpen = !this.menuOpen, this.menuOpen || this.closeAllSubmenus();
    },
    scrollEvent(e) {
      this.siteHeader = e, window.addEventListener("scroll", () => {
        window.scrollY > 50 ? e.classList.add("is-scrolling") : e.classList.remove("is-scrolling"), this.submenuOpen && this.closeAllSubmenus();
      }), window.addEventListener("resize", () => {
        window.innerWidth >= 1024 && this.closeAllSubmenus();
      });
    },
    toggleSubmenu(e) {
      const t = e.nextElementSibling, i = e.getAttribute("aria-expanded") === "true" || !1;
      if (this.submenuOpen && window.innerWidth >= 1024 && this.closeAllSubmenus(), i)
        this.submenuOpen = !1, t.style.height = 0, t.style.opacity = 0, t.setAttribute("aria-hidden", !0);
      else {
        this.submenuOpen = !0;
        const r = t.scrollHeight;
        t.style.height = r + "px", t.style.opacity = 1, t.setAttribute("aria-hidden", !1), e.classList.add("active");
      }
      e.setAttribute("aria-expanded", !i);
    },
    closeAllSubmenus() {
      const e = this.siteHeader.querySelectorAll(".site-header__submenu"), t = this.siteHeader.querySelectorAll(".btn-submenu");
      e.length !== 0 && t.length !== 0 && (e.forEach((i) => {
        i.style.height = 0, i.style.opacity = 0, i.setAttribute("aria-hidden", !0);
      }), t.forEach((i) => {
        i.setAttribute("aria-expanded", !1), i.classList.remove("active");
      }));
    }
  };
}
function Sa(n) {
  return n !== null && typeof n == "object" && "constructor" in n && n.constructor === Object;
}
function Fo(n, e) {
  n === void 0 && (n = {}), e === void 0 && (e = {}), Object.keys(e).forEach((t) => {
    typeof n[t] > "u" ? n[t] = e[t] : Sa(e[t]) && Sa(n[t]) && Object.keys(e[t]).length > 0 && Fo(n[t], e[t]);
  });
}
const Fl = {
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
function Gr() {
  const n = typeof document < "u" ? document : {};
  return Fo(n, Fl), n;
}
const Cc = {
  document: Fl,
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
  requestAnimationFrame(n) {
    return typeof setTimeout > "u" ? (n(), null) : setTimeout(n, 0);
  },
  cancelAnimationFrame(n) {
    typeof setTimeout > "u" || clearTimeout(n);
  }
};
function Et() {
  const n = typeof window < "u" ? window : {};
  return Fo(n, Cc), n;
}
function Mc(n) {
  return n === void 0 && (n = ""), n.trim().split(" ").filter((e) => !!e.trim());
}
function kc(n) {
  const e = n;
  Object.keys(e).forEach((t) => {
    try {
      e[t] = null;
    } catch {
    }
    try {
      delete e[t];
    } catch {
    }
  });
}
function no(n, e) {
  return e === void 0 && (e = 0), setTimeout(n, e);
}
function is() {
  return Date.now();
}
function Oc(n) {
  const e = Et();
  let t;
  return e.getComputedStyle && (t = e.getComputedStyle(n, null)), !t && n.currentStyle && (t = n.currentStyle), t || (t = n.style), t;
}
function Ac(n, e) {
  e === void 0 && (e = "x");
  const t = Et();
  let i, r, s;
  const o = Oc(n);
  return t.WebKitCSSMatrix ? (r = o.transform || o.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map((a) => a.replace(",", ".")).join(", ")), s = new t.WebKitCSSMatrix(r === "none" ? "" : r)) : (s = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), i = s.toString().split(",")), e === "x" && (t.WebKitCSSMatrix ? r = s.m41 : i.length === 16 ? r = parseFloat(i[12]) : r = parseFloat(i[4])), e === "y" && (t.WebKitCSSMatrix ? r = s.m42 : i.length === 16 ? r = parseFloat(i[13]) : r = parseFloat(i[5])), r || 0;
}
function Cn(n) {
  return typeof n == "object" && n !== null && n.constructor && Object.prototype.toString.call(n).slice(8, -1) === "Object";
}
function Dc(n) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? n instanceof HTMLElement : n && (n.nodeType === 1 || n.nodeType === 11);
}
function vt() {
  const n = Object(arguments.length <= 0 ? void 0 : arguments[0]), e = ["__proto__", "constructor", "prototype"];
  for (let t = 1; t < arguments.length; t += 1) {
    const i = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (i != null && !Dc(i)) {
      const r = Object.keys(Object(i)).filter((s) => e.indexOf(s) < 0);
      for (let s = 0, o = r.length; s < o; s += 1) {
        const a = r[s], l = Object.getOwnPropertyDescriptor(i, a);
        l !== void 0 && l.enumerable && (Cn(n[a]) && Cn(i[a]) ? i[a].__swiper__ ? n[a] = i[a] : vt(n[a], i[a]) : !Cn(n[a]) && Cn(i[a]) ? (n[a] = {}, i[a].__swiper__ ? n[a] = i[a] : vt(n[a], i[a])) : n[a] = i[a]);
      }
    }
  }
  return n;
}
function Mn(n, e, t) {
  n.style.setProperty(e, t);
}
function Nl(n) {
  let {
    swiper: e,
    targetPosition: t,
    side: i
  } = n;
  const r = Et(), s = -e.translate;
  let o = null, a;
  const l = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", r.cancelAnimationFrame(e.cssModeFrameID);
  const u = t > s ? "next" : "prev", f = (h, c) => u === "next" && h >= c || u === "prev" && h <= c, d = () => {
    a = (/* @__PURE__ */ new Date()).getTime(), o === null && (o = a);
    const h = Math.max(Math.min((a - o) / l, 1), 0), c = 0.5 - Math.cos(h * Math.PI) / 2;
    let g = s + c * (t - s);
    if (f(g, t) && (g = t), e.wrapperEl.scrollTo({
      [i]: g
    }), f(g, t)) {
      e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
          [i]: g
        });
      }), r.cancelAnimationFrame(e.cssModeFrameID);
      return;
    }
    e.cssModeFrameID = r.requestAnimationFrame(d);
  };
  d();
}
function Zt(n, e) {
  return e === void 0 && (e = ""), [...n.children].filter((t) => t.matches(e));
}
function rs(n) {
  try {
    console.warn(n);
    return;
  } catch {
  }
}
function ns(n, e) {
  e === void 0 && (e = []);
  const t = document.createElement(n);
  return t.classList.add(...Array.isArray(e) ? e : Mc(e)), t;
}
function Ic(n, e) {
  const t = [];
  for (; n.previousElementSibling; ) {
    const i = n.previousElementSibling;
    e ? i.matches(e) && t.push(i) : t.push(i), n = i;
  }
  return t;
}
function zc(n, e) {
  const t = [];
  for (; n.nextElementSibling; ) {
    const i = n.nextElementSibling;
    e ? i.matches(e) && t.push(i) : t.push(i), n = i;
  }
  return t;
}
function yi(n, e) {
  return Et().getComputedStyle(n, null).getPropertyValue(e);
}
function Ea(n) {
  let e = n, t;
  if (e) {
    for (t = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (t += 1);
    return t;
  }
}
function Lc(n, e) {
  const t = [];
  let i = n.parentElement;
  for (; i; )
    e ? i.matches(e) && t.push(i) : t.push(i), i = i.parentElement;
  return t;
}
function Pa(n, e, t) {
  const i = Et();
  return t ? n[e === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(n, null).getPropertyValue(e === "width" ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(n, null).getPropertyValue(e === "width" ? "margin-left" : "margin-bottom")) : n.offsetWidth;
}
let Cs;
function Rc() {
  const n = Et(), e = Gr();
  return {
    smoothScroll: e.documentElement && e.documentElement.style && "scrollBehavior" in e.documentElement.style,
    touch: !!("ontouchstart" in n || n.DocumentTouch && e instanceof n.DocumentTouch)
  };
}
function Bl() {
  return Cs || (Cs = Rc()), Cs;
}
let Ms;
function Fc(n) {
  let {
    userAgent: e
  } = n === void 0 ? {} : n;
  const t = Bl(), i = Et(), r = i.navigator.platform, s = e || i.navigator.userAgent, o = {
    ios: !1,
    android: !1
  }, a = i.screen.width, l = i.screen.height, u = s.match(/(Android);?[\s\/]+([\d.]+)?/);
  let f = s.match(/(iPad).*OS\s([\d_]+)/);
  const d = s.match(/(iPod)(.*OS\s([\d_]+))?/), h = !f && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/), c = r === "Win32";
  let g = r === "MacIntel";
  const p = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !f && g && t.touch && p.indexOf(`${a}x${l}`) >= 0 && (f = s.match(/(Version)\/([\d.]+)/), f || (f = [0, 1, "13_0_0"]), g = !1), u && !c && (o.os = "android", o.android = !0), (f || h || d) && (o.os = "ios", o.ios = !0), o;
}
function Nc(n) {
  return n === void 0 && (n = {}), Ms || (Ms = Fc(n)), Ms;
}
let ks;
function Bc() {
  const n = Et();
  let e = !1;
  function t() {
    const i = n.navigator.userAgent.toLowerCase();
    return i.indexOf("safari") >= 0 && i.indexOf("chrome") < 0 && i.indexOf("android") < 0;
  }
  if (t()) {
    const i = String(n.navigator.userAgent);
    if (i.includes("Version/")) {
      const [r, s] = i.split("Version/")[1].split(" ")[0].split(".").map((o) => Number(o));
      e = r < 16 || r === 16 && s < 2;
    }
  }
  return {
    isSafari: e || t(),
    needPerspectiveFix: e,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(n.navigator.userAgent)
  };
}
function Vc() {
  return ks || (ks = Bc()), ks;
}
function Gc(n) {
  let {
    swiper: e,
    on: t,
    emit: i
  } = n;
  const r = Et();
  let s = null, o = null;
  const a = () => {
    !e || e.destroyed || !e.initialized || (i("beforeResize"), i("resize"));
  }, l = () => {
    !e || e.destroyed || !e.initialized || (s = new ResizeObserver((d) => {
      o = r.requestAnimationFrame(() => {
        const {
          width: h,
          height: c
        } = e;
        let g = h, p = c;
        d.forEach((m) => {
          let {
            contentBoxSize: _,
            contentRect: w,
            target: y
          } = m;
          y && y !== e.el || (g = w ? w.width : (_[0] || _).inlineSize, p = w ? w.height : (_[0] || _).blockSize);
        }), (g !== h || p !== c) && a();
      });
    }), s.observe(e.el));
  }, u = () => {
    o && r.cancelAnimationFrame(o), s && s.unobserve && e.el && (s.unobserve(e.el), s = null);
  }, f = () => {
    !e || e.destroyed || !e.initialized || i("orientationchange");
  };
  t("init", () => {
    if (e.params.resizeObserver && typeof r.ResizeObserver < "u") {
      l();
      return;
    }
    r.addEventListener("resize", a), r.addEventListener("orientationchange", f);
  }), t("destroy", () => {
    u(), r.removeEventListener("resize", a), r.removeEventListener("orientationchange", f);
  });
}
function $c(n) {
  let {
    swiper: e,
    extendParams: t,
    on: i,
    emit: r
  } = n;
  const s = [], o = Et(), a = function(f, d) {
    d === void 0 && (d = {});
    const h = o.MutationObserver || o.WebkitMutationObserver, c = new h((g) => {
      if (e.__preventObserver__)
        return;
      if (g.length === 1) {
        r("observerUpdate", g[0]);
        return;
      }
      const p = function() {
        r("observerUpdate", g[0]);
      };
      o.requestAnimationFrame ? o.requestAnimationFrame(p) : o.setTimeout(p, 0);
    });
    c.observe(f, {
      attributes: typeof d.attributes > "u" ? !0 : d.attributes,
      childList: typeof d.childList > "u" ? !0 : d.childList,
      characterData: typeof d.characterData > "u" ? !0 : d.characterData
    }), s.push(c);
  }, l = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const f = Lc(e.hostEl);
        for (let d = 0; d < f.length; d += 1)
          a(f[d]);
      }
      a(e.hostEl, {
        childList: e.params.observeSlideChildren
      }), a(e.wrapperEl, {
        attributes: !1
      });
    }
  }, u = () => {
    s.forEach((f) => {
      f.disconnect();
    }), s.splice(0, s.length);
  };
  t({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), i("init", l), i("destroy", u);
}
var Yc = {
  on(n, e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function")
      return i;
    const r = t ? "unshift" : "push";
    return n.split(" ").forEach((s) => {
      i.eventsListeners[s] || (i.eventsListeners[s] = []), i.eventsListeners[s][r](e);
    }), i;
  },
  once(n, e, t) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof e != "function")
      return i;
    function r() {
      i.off(n, r), r.__emitterProxy && delete r.__emitterProxy;
      for (var s = arguments.length, o = new Array(s), a = 0; a < s; a++)
        o[a] = arguments[a];
      e.apply(i, o);
    }
    return r.__emitterProxy = e, i.on(n, r, t);
  },
  onAny(n, e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof n != "function")
      return t;
    const i = e ? "unshift" : "push";
    return t.eventsAnyListeners.indexOf(n) < 0 && t.eventsAnyListeners[i](n), t;
  },
  offAny(n) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners)
      return e;
    const t = e.eventsAnyListeners.indexOf(n);
    return t >= 0 && e.eventsAnyListeners.splice(t, 1), e;
  },
  off(n, e) {
    const t = this;
    return !t.eventsListeners || t.destroyed || !t.eventsListeners || n.split(" ").forEach((i) => {
      typeof e > "u" ? t.eventsListeners[i] = [] : t.eventsListeners[i] && t.eventsListeners[i].forEach((r, s) => {
        (r === e || r.__emitterProxy && r.__emitterProxy === e) && t.eventsListeners[i].splice(s, 1);
      });
    }), t;
  },
  emit() {
    const n = this;
    if (!n.eventsListeners || n.destroyed || !n.eventsListeners)
      return n;
    let e, t, i;
    for (var r = arguments.length, s = new Array(r), o = 0; o < r; o++)
      s[o] = arguments[o];
    return typeof s[0] == "string" || Array.isArray(s[0]) ? (e = s[0], t = s.slice(1, s.length), i = n) : (e = s[0].events, t = s[0].data, i = s[0].context || n), t.unshift(i), (Array.isArray(e) ? e : e.split(" ")).forEach((l) => {
      n.eventsAnyListeners && n.eventsAnyListeners.length && n.eventsAnyListeners.forEach((u) => {
        u.apply(i, [l, ...t]);
      }), n.eventsListeners && n.eventsListeners[l] && n.eventsListeners[l].forEach((u) => {
        u.apply(i, t);
      });
    }), n;
  }
};
function Hc() {
  const n = this;
  let e, t;
  const i = n.el;
  typeof n.params.width < "u" && n.params.width !== null ? e = n.params.width : e = i.clientWidth, typeof n.params.height < "u" && n.params.height !== null ? t = n.params.height : t = i.clientHeight, !(e === 0 && n.isHorizontal() || t === 0 && n.isVertical()) && (e = e - parseInt(yi(i, "padding-left") || 0, 10) - parseInt(yi(i, "padding-right") || 0, 10), t = t - parseInt(yi(i, "padding-top") || 0, 10) - parseInt(yi(i, "padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(t) && (t = 0), Object.assign(n, {
    width: e,
    height: t,
    size: n.isHorizontal() ? e : t
  }));
}
function Wc() {
  const n = this;
  function e(b, O) {
    return parseFloat(b.getPropertyValue(n.getDirectionLabel(O)) || 0);
  }
  const t = n.params, {
    wrapperEl: i,
    slidesEl: r,
    size: s,
    rtlTranslate: o,
    wrongRTL: a
  } = n, l = n.virtual && t.virtual.enabled, u = l ? n.virtual.slides.length : n.slides.length, f = Zt(r, `.${n.params.slideClass}, swiper-slide`), d = l ? n.virtual.slides.length : f.length;
  let h = [];
  const c = [], g = [];
  let p = t.slidesOffsetBefore;
  typeof p == "function" && (p = t.slidesOffsetBefore.call(n));
  let m = t.slidesOffsetAfter;
  typeof m == "function" && (m = t.slidesOffsetAfter.call(n));
  const _ = n.snapGrid.length, w = n.slidesGrid.length;
  let y = t.spaceBetween, v = -p, T = 0, C = 0;
  if (typeof s > "u")
    return;
  typeof y == "string" && y.indexOf("%") >= 0 ? y = parseFloat(y.replace("%", "")) / 100 * s : typeof y == "string" && (y = parseFloat(y)), n.virtualSize = -y, f.forEach((b) => {
    o ? b.style.marginLeft = "" : b.style.marginRight = "", b.style.marginBottom = "", b.style.marginTop = "";
  }), t.centeredSlides && t.cssMode && (Mn(i, "--swiper-centered-offset-before", ""), Mn(i, "--swiper-centered-offset-after", ""));
  const S = t.grid && t.grid.rows > 1 && n.grid;
  S ? n.grid.initSlides(f) : n.grid && n.grid.unsetSlides();
  let M;
  const P = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter((b) => typeof t.breakpoints[b].slidesPerView < "u").length > 0;
  for (let b = 0; b < d; b += 1) {
    M = 0;
    let O;
    if (f[b] && (O = f[b]), S && n.grid.updateSlide(b, O, f), !(f[b] && yi(O, "display") === "none")) {
      if (t.slidesPerView === "auto") {
        P && (f[b].style[n.getDirectionLabel("width")] = "");
        const k = getComputedStyle(O), A = O.style.transform, z = O.style.webkitTransform;
        if (A && (O.style.transform = "none"), z && (O.style.webkitTransform = "none"), t.roundLengths)
          M = n.isHorizontal() ? Pa(O, "width", !0) : Pa(O, "height", !0);
        else {
          const L = e(k, "width"), B = e(k, "padding-left"), F = e(k, "padding-right"), X = e(k, "margin-left"), J = e(k, "margin-right"), x = k.getPropertyValue("box-sizing");
          if (x && x === "border-box")
            M = L + X + J;
          else {
            const {
              clientWidth: ee,
              offsetWidth: Ie
            } = O;
            M = L + B + F + X + J + (Ie - ee);
          }
        }
        A && (O.style.transform = A), z && (O.style.webkitTransform = z), t.roundLengths && (M = Math.floor(M));
      } else
        M = (s - (t.slidesPerView - 1) * y) / t.slidesPerView, t.roundLengths && (M = Math.floor(M)), f[b] && (f[b].style[n.getDirectionLabel("width")] = `${M}px`);
      f[b] && (f[b].swiperSlideSize = M), g.push(M), t.centeredSlides ? (v = v + M / 2 + T / 2 + y, T === 0 && b !== 0 && (v = v - s / 2 - y), b === 0 && (v = v - s / 2 - y), Math.abs(v) < 1 / 1e3 && (v = 0), t.roundLengths && (v = Math.floor(v)), C % t.slidesPerGroup === 0 && h.push(v), c.push(v)) : (t.roundLengths && (v = Math.floor(v)), (C - Math.min(n.params.slidesPerGroupSkip, C)) % n.params.slidesPerGroup === 0 && h.push(v), c.push(v), v = v + M + y), n.virtualSize += M + y, T = M, C += 1;
    }
  }
  if (n.virtualSize = Math.max(n.virtualSize, s) + m, o && a && (t.effect === "slide" || t.effect === "coverflow") && (i.style.width = `${n.virtualSize + y}px`), t.setWrapperSize && (i.style[n.getDirectionLabel("width")] = `${n.virtualSize + y}px`), S && n.grid.updateWrapperSize(M, h), !t.centeredSlides) {
    const b = [];
    for (let O = 0; O < h.length; O += 1) {
      let k = h[O];
      t.roundLengths && (k = Math.floor(k)), h[O] <= n.virtualSize - s && b.push(k);
    }
    h = b, Math.floor(n.virtualSize - s) - Math.floor(h[h.length - 1]) > 1 && h.push(n.virtualSize - s);
  }
  if (l && t.loop) {
    const b = g[0] + y;
    if (t.slidesPerGroup > 1) {
      const O = Math.ceil((n.virtual.slidesBefore + n.virtual.slidesAfter) / t.slidesPerGroup), k = b * t.slidesPerGroup;
      for (let A = 0; A < O; A += 1)
        h.push(h[h.length - 1] + k);
    }
    for (let O = 0; O < n.virtual.slidesBefore + n.virtual.slidesAfter; O += 1)
      t.slidesPerGroup === 1 && h.push(h[h.length - 1] + b), c.push(c[c.length - 1] + b), n.virtualSize += b;
  }
  if (h.length === 0 && (h = [0]), y !== 0) {
    const b = n.isHorizontal() && o ? "marginLeft" : n.getDirectionLabel("marginRight");
    f.filter((O, k) => !t.cssMode || t.loop ? !0 : k !== f.length - 1).forEach((O) => {
      O.style[b] = `${y}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let b = 0;
    g.forEach((k) => {
      b += k + (y || 0);
    }), b -= y;
    const O = b - s;
    h = h.map((k) => k <= 0 ? -p : k > O ? O + m : k);
  }
  if (t.centerInsufficientSlides) {
    let b = 0;
    if (g.forEach((O) => {
      b += O + (y || 0);
    }), b -= y, b < s) {
      const O = (s - b) / 2;
      h.forEach((k, A) => {
        h[A] = k - O;
      }), c.forEach((k, A) => {
        c[A] = k + O;
      });
    }
  }
  if (Object.assign(n, {
    slides: f,
    snapGrid: h,
    slidesGrid: c,
    slidesSizesGrid: g
  }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
    Mn(i, "--swiper-centered-offset-before", `${-h[0]}px`), Mn(i, "--swiper-centered-offset-after", `${n.size / 2 - g[g.length - 1] / 2}px`);
    const b = -n.snapGrid[0], O = -n.slidesGrid[0];
    n.snapGrid = n.snapGrid.map((k) => k + b), n.slidesGrid = n.slidesGrid.map((k) => k + O);
  }
  if (d !== u && n.emit("slidesLengthChange"), h.length !== _ && (n.params.watchOverflow && n.checkOverflow(), n.emit("snapGridLengthChange")), c.length !== w && n.emit("slidesGridLengthChange"), t.watchSlidesProgress && n.updateSlidesOffset(), !l && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
    const b = `${t.containerModifierClass}backface-hidden`, O = n.el.classList.contains(b);
    d <= t.maxBackfaceHiddenSlides ? O || n.el.classList.add(b) : O && n.el.classList.remove(b);
  }
}
function Xc(n) {
  const e = this, t = [], i = e.virtual && e.params.virtual.enabled;
  let r = 0, s;
  typeof n == "number" ? e.setTransition(n) : n === !0 && e.setTransition(e.params.speed);
  const o = (a) => i ? e.slides[e.getSlideIndexByData(a)] : e.slides[a];
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((a) => {
        t.push(a);
      });
    else
      for (s = 0; s < Math.ceil(e.params.slidesPerView); s += 1) {
        const a = e.activeIndex + s;
        if (a > e.slides.length && !i)
          break;
        t.push(o(a));
      }
  else
    t.push(o(e.activeIndex));
  for (s = 0; s < t.length; s += 1)
    if (typeof t[s] < "u") {
      const a = t[s].offsetHeight;
      r = a > r ? a : r;
    }
  (r || r === 0) && (e.wrapperEl.style.height = `${r}px`);
}
function qc() {
  const n = this, e = n.slides, t = n.isElement ? n.isHorizontal() ? n.wrapperEl.offsetLeft : n.wrapperEl.offsetTop : 0;
  for (let i = 0; i < e.length; i += 1)
    e[i].swiperSlideOffset = (n.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) - t - n.cssOverflowAdjustment();
}
function Uc(n) {
  n === void 0 && (n = this && this.translate || 0);
  const e = this, t = e.params, {
    slides: i,
    rtlTranslate: r,
    snapGrid: s
  } = e;
  if (i.length === 0)
    return;
  typeof i[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
  let o = -n;
  r && (o = n), i.forEach((l) => {
    l.classList.remove(t.slideVisibleClass, t.slideFullyVisibleClass);
  }), e.visibleSlidesIndexes = [], e.visibleSlides = [];
  let a = t.spaceBetween;
  typeof a == "string" && a.indexOf("%") >= 0 ? a = parseFloat(a.replace("%", "")) / 100 * e.size : typeof a == "string" && (a = parseFloat(a));
  for (let l = 0; l < i.length; l += 1) {
    const u = i[l];
    let f = u.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (f -= i[0].swiperSlideOffset);
    const d = (o + (t.centeredSlides ? e.minTranslate() : 0) - f) / (u.swiperSlideSize + a), h = (o - s[0] + (t.centeredSlides ? e.minTranslate() : 0) - f) / (u.swiperSlideSize + a), c = -(o - f), g = c + e.slidesSizesGrid[l], p = c >= 0 && c <= e.size - e.slidesSizesGrid[l];
    (c >= 0 && c < e.size - 1 || g > 1 && g <= e.size || c <= 0 && g >= e.size) && (e.visibleSlides.push(u), e.visibleSlidesIndexes.push(l), i[l].classList.add(t.slideVisibleClass)), p && i[l].classList.add(t.slideFullyVisibleClass), u.progress = r ? -d : d, u.originalProgress = r ? -h : h;
  }
}
function jc(n) {
  const e = this;
  if (typeof n > "u") {
    const f = e.rtlTranslate ? -1 : 1;
    n = e && e.translate && e.translate * f || 0;
  }
  const t = e.params, i = e.maxTranslate() - e.minTranslate();
  let {
    progress: r,
    isBeginning: s,
    isEnd: o,
    progressLoop: a
  } = e;
  const l = s, u = o;
  if (i === 0)
    r = 0, s = !0, o = !0;
  else {
    r = (n - e.minTranslate()) / i;
    const f = Math.abs(n - e.minTranslate()) < 1, d = Math.abs(n - e.maxTranslate()) < 1;
    s = f || r <= 0, o = d || r >= 1, f && (r = 0), d && (r = 1);
  }
  if (t.loop) {
    const f = e.getSlideIndexByData(0), d = e.getSlideIndexByData(e.slides.length - 1), h = e.slidesGrid[f], c = e.slidesGrid[d], g = e.slidesGrid[e.slidesGrid.length - 1], p = Math.abs(n);
    p >= h ? a = (p - h) / g : a = (p + g - c) / g, a > 1 && (a -= 1);
  }
  Object.assign(e, {
    progress: r,
    progressLoop: a,
    isBeginning: s,
    isEnd: o
  }), (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && e.updateSlidesProgress(n), s && !l && e.emit("reachBeginning toEdge"), o && !u && e.emit("reachEnd toEdge"), (l && !s || u && !o) && e.emit("fromEdge"), e.emit("progress", r);
}
function Kc() {
  const n = this, {
    slides: e,
    params: t,
    slidesEl: i,
    activeIndex: r
  } = n, s = n.virtual && t.virtual.enabled, o = n.grid && t.grid && t.grid.rows > 1, a = (d) => Zt(i, `.${t.slideClass}${d}, swiper-slide${d}`)[0];
  e.forEach((d) => {
    d.classList.remove(t.slideActiveClass, t.slideNextClass, t.slidePrevClass);
  });
  let l, u, f;
  if (s)
    if (t.loop) {
      let d = r - n.virtual.slidesBefore;
      d < 0 && (d = n.virtual.slides.length + d), d >= n.virtual.slides.length && (d -= n.virtual.slides.length), l = a(`[data-swiper-slide-index="${d}"]`);
    } else
      l = a(`[data-swiper-slide-index="${r}"]`);
  else
    o ? (l = e.filter((d) => d.column === r)[0], f = e.filter((d) => d.column === r + 1)[0], u = e.filter((d) => d.column === r - 1)[0]) : l = e[r];
  l && (l.classList.add(t.slideActiveClass), o ? (f && f.classList.add(t.slideNextClass), u && u.classList.add(t.slidePrevClass)) : (f = zc(l, `.${t.slideClass}, swiper-slide`)[0], t.loop && !f && (f = e[0]), f && f.classList.add(t.slideNextClass), u = Ic(l, `.${t.slideClass}, swiper-slide`)[0], t.loop && !u === 0 && (u = e[e.length - 1]), u && u.classList.add(t.slidePrevClass))), n.emitSlidesClasses();
}
const Yn = (n, e) => {
  if (!n || n.destroyed || !n.params)
    return;
  const t = () => n.isElement ? "swiper-slide" : `.${n.params.slideClass}`, i = e.closest(t());
  if (i) {
    let r = i.querySelector(`.${n.params.lazyPreloaderClass}`);
    !r && n.isElement && (i.shadowRoot ? r = i.shadowRoot.querySelector(`.${n.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      i.shadowRoot && (r = i.shadowRoot.querySelector(`.${n.params.lazyPreloaderClass}`), r && r.remove());
    })), r && r.remove();
  }
}, Os = (n, e) => {
  if (!n.slides[e])
    return;
  const t = n.slides[e].querySelector('[loading="lazy"]');
  t && t.removeAttribute("loading");
}, so = (n) => {
  if (!n || n.destroyed || !n.params)
    return;
  let e = n.params.lazyPreloadPrevNext;
  const t = n.slides.length;
  if (!t || !e || e < 0)
    return;
  e = Math.min(e, t);
  const i = n.params.slidesPerView === "auto" ? n.slidesPerViewDynamic() : Math.ceil(n.params.slidesPerView), r = n.activeIndex;
  if (n.params.grid && n.params.grid.rows > 1) {
    const o = r, a = [o - e];
    a.push(...Array.from({
      length: e
    }).map((l, u) => o + i + u)), n.slides.forEach((l, u) => {
      a.includes(l.column) && Os(n, u);
    });
    return;
  }
  const s = r + i - 1;
  if (n.params.rewind || n.params.loop)
    for (let o = r - e; o <= s + e; o += 1) {
      const a = (o % t + t) % t;
      (a < r || a > s) && Os(n, a);
    }
  else
    for (let o = Math.max(r - e, 0); o <= Math.min(s + e, t - 1); o += 1)
      o !== r && (o > s || o < r) && Os(n, o);
};
function Zc(n) {
  const {
    slidesGrid: e,
    params: t
  } = n, i = n.rtlTranslate ? n.translate : -n.translate;
  let r;
  for (let s = 0; s < e.length; s += 1)
    typeof e[s + 1] < "u" ? i >= e[s] && i < e[s + 1] - (e[s + 1] - e[s]) / 2 ? r = s : i >= e[s] && i < e[s + 1] && (r = s + 1) : i >= e[s] && (r = s);
  return t.normalizeSlideIndex && (r < 0 || typeof r > "u") && (r = 0), r;
}
function Qc(n) {
  const e = this, t = e.rtlTranslate ? e.translate : -e.translate, {
    snapGrid: i,
    params: r,
    activeIndex: s,
    realIndex: o,
    snapIndex: a
  } = e;
  let l = n, u;
  const f = (c) => {
    let g = c - e.virtual.slidesBefore;
    return g < 0 && (g = e.virtual.slides.length + g), g >= e.virtual.slides.length && (g -= e.virtual.slides.length), g;
  };
  if (typeof l > "u" && (l = Zc(e)), i.indexOf(t) >= 0)
    u = i.indexOf(t);
  else {
    const c = Math.min(r.slidesPerGroupSkip, l);
    u = c + Math.floor((l - c) / r.slidesPerGroup);
  }
  if (u >= i.length && (u = i.length - 1), l === s && !e.params.loop) {
    u !== a && (e.snapIndex = u, e.emit("snapIndexChange"));
    return;
  }
  if (l === s && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = f(l);
    return;
  }
  const d = e.grid && r.grid && r.grid.rows > 1;
  let h;
  if (e.virtual && r.virtual.enabled && r.loop)
    h = f(l);
  else if (d) {
    const c = e.slides.filter((p) => p.column === l)[0];
    let g = parseInt(c.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(g) && (g = Math.max(e.slides.indexOf(c), 0)), h = Math.floor(g / r.grid.rows);
  } else if (e.slides[l]) {
    const c = e.slides[l].getAttribute("data-swiper-slide-index");
    c ? h = parseInt(c, 10) : h = l;
  } else
    h = l;
  Object.assign(e, {
    previousSnapIndex: a,
    snapIndex: u,
    previousRealIndex: o,
    realIndex: h,
    previousIndex: s,
    activeIndex: l
  }), e.initialized && so(e), e.emit("activeIndexChange"), e.emit("snapIndexChange"), (e.initialized || e.params.runCallbacksOnInit) && (o !== h && e.emit("realIndexChange"), e.emit("slideChange"));
}
function Jc(n, e) {
  const t = this, i = t.params;
  let r = n.closest(`.${i.slideClass}, swiper-slide`);
  !r && t.isElement && e && e.length > 1 && e.includes(n) && [...e.slice(e.indexOf(n) + 1, e.length)].forEach((a) => {
    !r && a.matches && a.matches(`.${i.slideClass}, swiper-slide`) && (r = a);
  });
  let s = !1, o;
  if (r) {
    for (let a = 0; a < t.slides.length; a += 1)
      if (t.slides[a] === r) {
        s = !0, o = a;
        break;
      }
  }
  if (r && s)
    t.clickedSlide = r, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = o;
  else {
    t.clickedSlide = void 0, t.clickedIndex = void 0;
    return;
  }
  i.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
}
var ed = {
  updateSize: Hc,
  updateSlides: Wc,
  updateAutoHeight: Xc,
  updateSlidesOffset: qc,
  updateSlidesProgress: Uc,
  updateProgress: jc,
  updateSlidesClasses: Kc,
  updateActiveIndex: Qc,
  updateClickedSlide: Jc
};
function td(n) {
  n === void 0 && (n = this.isHorizontal() ? "x" : "y");
  const e = this, {
    params: t,
    rtlTranslate: i,
    translate: r,
    wrapperEl: s
  } = e;
  if (t.virtualTranslate)
    return i ? -r : r;
  if (t.cssMode)
    return r;
  let o = Ac(s, n);
  return o += e.cssOverflowAdjustment(), i && (o = -o), o || 0;
}
function id(n, e) {
  const t = this, {
    rtlTranslate: i,
    params: r,
    wrapperEl: s,
    progress: o
  } = t;
  let a = 0, l = 0;
  const u = 0;
  t.isHorizontal() ? a = i ? -n : n : l = n, r.roundLengths && (a = Math.floor(a), l = Math.floor(l)), t.previousTranslate = t.translate, t.translate = t.isHorizontal() ? a : l, r.cssMode ? s[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -a : -l : r.virtualTranslate || (t.isHorizontal() ? a -= t.cssOverflowAdjustment() : l -= t.cssOverflowAdjustment(), s.style.transform = `translate3d(${a}px, ${l}px, ${u}px)`);
  let f;
  const d = t.maxTranslate() - t.minTranslate();
  d === 0 ? f = 0 : f = (n - t.minTranslate()) / d, f !== o && t.updateProgress(n), t.emit("setTranslate", t.translate, e);
}
function rd() {
  return -this.snapGrid[0];
}
function nd() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function sd(n, e, t, i, r) {
  n === void 0 && (n = 0), e === void 0 && (e = this.params.speed), t === void 0 && (t = !0), i === void 0 && (i = !0);
  const s = this, {
    params: o,
    wrapperEl: a
  } = s;
  if (s.animating && o.preventInteractionOnTransition)
    return !1;
  const l = s.minTranslate(), u = s.maxTranslate();
  let f;
  if (i && n > l ? f = l : i && n < u ? f = u : f = n, s.updateProgress(f), o.cssMode) {
    const d = s.isHorizontal();
    if (e === 0)
      a[d ? "scrollLeft" : "scrollTop"] = -f;
    else {
      if (!s.support.smoothScroll)
        return Nl({
          swiper: s,
          targetPosition: -f,
          side: d ? "left" : "top"
        }), !0;
      a.scrollTo({
        [d ? "left" : "top"]: -f,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return e === 0 ? (s.setTransition(0), s.setTranslate(f), t && (s.emit("beforeTransitionStart", e, r), s.emit("transitionEnd"))) : (s.setTransition(e), s.setTranslate(f), t && (s.emit("beforeTransitionStart", e, r), s.emit("transitionStart")), s.animating || (s.animating = !0, s.onTranslateToWrapperTransitionEnd || (s.onTranslateToWrapperTransitionEnd = function(h) {
    !s || s.destroyed || h.target === this && (s.wrapperEl.removeEventListener("transitionend", s.onTranslateToWrapperTransitionEnd), s.onTranslateToWrapperTransitionEnd = null, delete s.onTranslateToWrapperTransitionEnd, t && s.emit("transitionEnd"));
  }), s.wrapperEl.addEventListener("transitionend", s.onTranslateToWrapperTransitionEnd))), !0;
}
var od = {
  getTranslate: td,
  setTranslate: id,
  minTranslate: rd,
  maxTranslate: nd,
  translateTo: sd
};
function ad(n, e) {
  const t = this;
  t.params.cssMode || (t.wrapperEl.style.transitionDuration = `${n}ms`, t.wrapperEl.style.transitionDelay = n === 0 ? "0ms" : ""), t.emit("setTransition", n, e);
}
function Vl(n) {
  let {
    swiper: e,
    runCallbacks: t,
    direction: i,
    step: r
  } = n;
  const {
    activeIndex: s,
    previousIndex: o
  } = e;
  let a = i;
  if (a || (s > o ? a = "next" : s < o ? a = "prev" : a = "reset"), e.emit(`transition${r}`), t && s !== o) {
    if (a === "reset") {
      e.emit(`slideResetTransition${r}`);
      return;
    }
    e.emit(`slideChangeTransition${r}`), a === "next" ? e.emit(`slideNextTransition${r}`) : e.emit(`slidePrevTransition${r}`);
  }
}
function ld(n, e) {
  n === void 0 && (n = !0);
  const t = this, {
    params: i
  } = t;
  i.cssMode || (i.autoHeight && t.updateAutoHeight(), Vl({
    swiper: t,
    runCallbacks: n,
    direction: e,
    step: "Start"
  }));
}
function ud(n, e) {
  n === void 0 && (n = !0);
  const t = this, {
    params: i
  } = t;
  t.animating = !1, !i.cssMode && (t.setTransition(0), Vl({
    swiper: t,
    runCallbacks: n,
    direction: e,
    step: "End"
  }));
}
var fd = {
  setTransition: ad,
  transitionStart: ld,
  transitionEnd: ud
};
function cd(n, e, t, i, r) {
  n === void 0 && (n = 0), e === void 0 && (e = this.params.speed), t === void 0 && (t = !0), typeof n == "string" && (n = parseInt(n, 10));
  const s = this;
  let o = n;
  o < 0 && (o = 0);
  const {
    params: a,
    snapGrid: l,
    slidesGrid: u,
    previousIndex: f,
    activeIndex: d,
    rtlTranslate: h,
    wrapperEl: c,
    enabled: g
  } = s;
  if (s.animating && a.preventInteractionOnTransition || !g && !i && !r)
    return !1;
  const p = Math.min(s.params.slidesPerGroupSkip, o);
  let m = p + Math.floor((o - p) / s.params.slidesPerGroup);
  m >= l.length && (m = l.length - 1);
  const _ = -l[m];
  if (a.normalizeSlideIndex)
    for (let y = 0; y < u.length; y += 1) {
      const v = -Math.floor(_ * 100), T = Math.floor(u[y] * 100), C = Math.floor(u[y + 1] * 100);
      typeof u[y + 1] < "u" ? v >= T && v < C - (C - T) / 2 ? o = y : v >= T && v < C && (o = y + 1) : v >= T && (o = y);
    }
  if (s.initialized && o !== d && (!s.allowSlideNext && (h ? _ > s.translate && _ > s.minTranslate() : _ < s.translate && _ < s.minTranslate()) || !s.allowSlidePrev && _ > s.translate && _ > s.maxTranslate() && (d || 0) !== o))
    return !1;
  o !== (f || 0) && t && s.emit("beforeSlideChangeStart"), s.updateProgress(_);
  let w;
  if (o > d ? w = "next" : o < d ? w = "prev" : w = "reset", h && -_ === s.translate || !h && _ === s.translate)
    return s.updateActiveIndex(o), a.autoHeight && s.updateAutoHeight(), s.updateSlidesClasses(), a.effect !== "slide" && s.setTranslate(_), w !== "reset" && (s.transitionStart(t, w), s.transitionEnd(t, w)), !1;
  if (a.cssMode) {
    const y = s.isHorizontal(), v = h ? _ : -_;
    if (e === 0) {
      const T = s.virtual && s.params.virtual.enabled;
      T && (s.wrapperEl.style.scrollSnapType = "none", s._immediateVirtual = !0), T && !s._cssModeVirtualInitialSet && s.params.initialSlide > 0 ? (s._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        c[y ? "scrollLeft" : "scrollTop"] = v;
      })) : c[y ? "scrollLeft" : "scrollTop"] = v, T && requestAnimationFrame(() => {
        s.wrapperEl.style.scrollSnapType = "", s._immediateVirtual = !1;
      });
    } else {
      if (!s.support.smoothScroll)
        return Nl({
          swiper: s,
          targetPosition: v,
          side: y ? "left" : "top"
        }), !0;
      c.scrollTo({
        [y ? "left" : "top"]: v,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return s.setTransition(e), s.setTranslate(_), s.updateActiveIndex(o), s.updateSlidesClasses(), s.emit("beforeTransitionStart", e, i), s.transitionStart(t, w), e === 0 ? s.transitionEnd(t, w) : s.animating || (s.animating = !0, s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(v) {
    !s || s.destroyed || v.target === this && (s.wrapperEl.removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd), s.onSlideToWrapperTransitionEnd = null, delete s.onSlideToWrapperTransitionEnd, s.transitionEnd(t, w));
  }), s.wrapperEl.addEventListener("transitionend", s.onSlideToWrapperTransitionEnd)), !0;
}
function dd(n, e, t, i) {
  n === void 0 && (n = 0), e === void 0 && (e = this.params.speed), t === void 0 && (t = !0), typeof n == "string" && (n = parseInt(n, 10));
  const r = this, s = r.grid && r.params.grid && r.params.grid.rows > 1;
  let o = n;
  if (r.params.loop)
    if (r.virtual && r.params.virtual.enabled)
      o = o + r.virtual.slidesBefore;
    else {
      let a;
      if (s) {
        const h = o * r.params.grid.rows;
        a = r.slides.filter((c) => c.getAttribute("data-swiper-slide-index") * 1 === h)[0].column;
      } else
        a = r.getSlideIndexByData(o);
      const l = s ? Math.ceil(r.slides.length / r.params.grid.rows) : r.slides.length, {
        centeredSlides: u
      } = r.params;
      let f = r.params.slidesPerView;
      f === "auto" ? f = r.slidesPerViewDynamic() : (f = Math.ceil(parseFloat(r.params.slidesPerView, 10)), u && f % 2 === 0 && (f = f + 1));
      let d = l - a < f;
      if (u && (d = d || a < Math.ceil(f / 2)), d) {
        const h = u ? a < r.activeIndex ? "prev" : "next" : a - r.activeIndex - 1 < r.params.slidesPerView ? "next" : "prev";
        r.loopFix({
          direction: h,
          slideTo: !0,
          activeSlideIndex: h === "next" ? a + 1 : a - l + 1,
          slideRealIndex: h === "next" ? r.realIndex : void 0
        });
      }
      if (s) {
        const h = o * r.params.grid.rows;
        o = r.slides.filter((c) => c.getAttribute("data-swiper-slide-index") * 1 === h)[0].column;
      } else
        o = r.getSlideIndexByData(o);
    }
  return requestAnimationFrame(() => {
    r.slideTo(o, e, t, i);
  }), r;
}
function hd(n, e, t) {
  n === void 0 && (n = this.params.speed), e === void 0 && (e = !0);
  const i = this, {
    enabled: r,
    params: s,
    animating: o
  } = i;
  if (!r)
    return i;
  let a = s.slidesPerGroup;
  s.slidesPerView === "auto" && s.slidesPerGroup === 1 && s.slidesPerGroupAuto && (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
  const l = i.activeIndex < s.slidesPerGroupSkip ? 1 : a, u = i.virtual && s.virtual.enabled;
  if (s.loop) {
    if (o && !u && s.loopPreventsSliding)
      return !1;
    if (i.loopFix({
      direction: "next"
    }), i._clientLeft = i.wrapperEl.clientLeft, i.activeIndex === i.slides.length - 1 && s.cssMode)
      return requestAnimationFrame(() => {
        i.slideTo(i.activeIndex + l, n, e, t);
      }), !0;
  }
  return s.rewind && i.isEnd ? i.slideTo(0, n, e, t) : i.slideTo(i.activeIndex + l, n, e, t);
}
function pd(n, e, t) {
  n === void 0 && (n = this.params.speed), e === void 0 && (e = !0);
  const i = this, {
    params: r,
    snapGrid: s,
    slidesGrid: o,
    rtlTranslate: a,
    enabled: l,
    animating: u
  } = i;
  if (!l)
    return i;
  const f = i.virtual && r.virtual.enabled;
  if (r.loop) {
    if (u && !f && r.loopPreventsSliding)
      return !1;
    i.loopFix({
      direction: "prev"
    }), i._clientLeft = i.wrapperEl.clientLeft;
  }
  const d = a ? i.translate : -i.translate;
  function h(_) {
    return _ < 0 ? -Math.floor(Math.abs(_)) : Math.floor(_);
  }
  const c = h(d), g = s.map((_) => h(_));
  let p = s[g.indexOf(c) - 1];
  if (typeof p > "u" && r.cssMode) {
    let _;
    s.forEach((w, y) => {
      c >= w && (_ = y);
    }), typeof _ < "u" && (p = s[_ > 0 ? _ - 1 : _]);
  }
  let m = 0;
  if (typeof p < "u" && (m = o.indexOf(p), m < 0 && (m = i.activeIndex - 1), r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (m = m - i.slidesPerViewDynamic("previous", !0) + 1, m = Math.max(m, 0))), r.rewind && i.isBeginning) {
    const _ = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
    return i.slideTo(_, n, e, t);
  } else if (r.loop && i.activeIndex === 0 && r.cssMode)
    return requestAnimationFrame(() => {
      i.slideTo(m, n, e, t);
    }), !0;
  return i.slideTo(m, n, e, t);
}
function gd(n, e, t) {
  n === void 0 && (n = this.params.speed), e === void 0 && (e = !0);
  const i = this;
  return i.slideTo(i.activeIndex, n, e, t);
}
function md(n, e, t, i) {
  n === void 0 && (n = this.params.speed), e === void 0 && (e = !0), i === void 0 && (i = 0.5);
  const r = this;
  let s = r.activeIndex;
  const o = Math.min(r.params.slidesPerGroupSkip, s), a = o + Math.floor((s - o) / r.params.slidesPerGroup), l = r.rtlTranslate ? r.translate : -r.translate;
  if (l >= r.snapGrid[a]) {
    const u = r.snapGrid[a], f = r.snapGrid[a + 1];
    l - u > (f - u) * i && (s += r.params.slidesPerGroup);
  } else {
    const u = r.snapGrid[a - 1], f = r.snapGrid[a];
    l - u <= (f - u) * i && (s -= r.params.slidesPerGroup);
  }
  return s = Math.max(s, 0), s = Math.min(s, r.slidesGrid.length - 1), r.slideTo(s, n, e, t);
}
function _d() {
  const n = this, {
    params: e,
    slidesEl: t
  } = n, i = e.slidesPerView === "auto" ? n.slidesPerViewDynamic() : e.slidesPerView;
  let r = n.clickedIndex, s;
  const o = n.isElement ? "swiper-slide" : `.${e.slideClass}`;
  if (e.loop) {
    if (n.animating)
      return;
    s = parseInt(n.clickedSlide.getAttribute("data-swiper-slide-index"), 10), e.centeredSlides ? r < n.loopedSlides - i / 2 || r > n.slides.length - n.loopedSlides + i / 2 ? (n.loopFix(), r = n.getSlideIndex(Zt(t, `${o}[data-swiper-slide-index="${s}"]`)[0]), no(() => {
      n.slideTo(r);
    })) : n.slideTo(r) : r > n.slides.length - i ? (n.loopFix(), r = n.getSlideIndex(Zt(t, `${o}[data-swiper-slide-index="${s}"]`)[0]), no(() => {
      n.slideTo(r);
    })) : n.slideTo(r);
  } else
    n.slideTo(r);
}
var vd = {
  slideTo: cd,
  slideToLoop: dd,
  slideNext: hd,
  slidePrev: pd,
  slideReset: gd,
  slideToClosest: md,
  slideToClickedSlide: _d
};
function wd(n) {
  const e = this, {
    params: t,
    slidesEl: i
  } = e;
  if (!t.loop || e.virtual && e.params.virtual.enabled)
    return;
  const r = () => {
    Zt(i, `.${t.slideClass}, swiper-slide`).forEach((d, h) => {
      d.setAttribute("data-swiper-slide-index", h);
    });
  }, s = e.grid && t.grid && t.grid.rows > 1, o = t.slidesPerGroup * (s ? t.grid.rows : 1), a = e.slides.length % o !== 0, l = s && e.slides.length % t.grid.rows !== 0, u = (f) => {
    for (let d = 0; d < f; d += 1) {
      const h = e.isElement ? ns("swiper-slide", [t.slideBlankClass]) : ns("div", [t.slideClass, t.slideBlankClass]);
      e.slidesEl.append(h);
    }
  };
  if (a) {
    if (t.loopAddBlankSlides) {
      const f = o - e.slides.length % o;
      u(f), e.recalcSlides(), e.updateSlides();
    } else
      rs("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    r();
  } else if (l) {
    if (t.loopAddBlankSlides) {
      const f = t.grid.rows - e.slides.length % t.grid.rows;
      u(f), e.recalcSlides(), e.updateSlides();
    } else
      rs("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    r();
  } else
    r();
  e.loopFix({
    slideRealIndex: n,
    direction: t.centeredSlides ? void 0 : "next"
  });
}
function yd(n) {
  let {
    slideRealIndex: e,
    slideTo: t = !0,
    direction: i,
    setTranslate: r,
    activeSlideIndex: s,
    byController: o,
    byMousewheel: a
  } = n === void 0 ? {} : n;
  const l = this;
  if (!l.params.loop)
    return;
  l.emit("beforeLoopFix");
  const {
    slides: u,
    allowSlidePrev: f,
    allowSlideNext: d,
    slidesEl: h,
    params: c
  } = l, {
    centeredSlides: g
  } = c;
  if (l.allowSlidePrev = !0, l.allowSlideNext = !0, l.virtual && c.virtual.enabled) {
    t && (!c.centeredSlides && l.snapIndex === 0 ? l.slideTo(l.virtual.slides.length, 0, !1, !0) : c.centeredSlides && l.snapIndex < c.slidesPerView ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0) : l.snapIndex === l.snapGrid.length - 1 && l.slideTo(l.virtual.slidesBefore, 0, !1, !0)), l.allowSlidePrev = f, l.allowSlideNext = d, l.emit("loopFix");
    return;
  }
  let p = c.slidesPerView;
  p === "auto" ? p = l.slidesPerViewDynamic() : (p = Math.ceil(parseFloat(c.slidesPerView, 10)), g && p % 2 === 0 && (p = p + 1));
  const m = c.slidesPerGroupAuto ? p : c.slidesPerGroup;
  let _ = m;
  _ % m !== 0 && (_ += m - _ % m), _ += c.loopAdditionalSlides, l.loopedSlides = _;
  const w = l.grid && c.grid && c.grid.rows > 1;
  u.length < p + _ ? rs("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : w && c.grid.fill === "row" && rs("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const y = [], v = [];
  let T = l.activeIndex;
  typeof s > "u" ? s = l.getSlideIndex(u.filter((A) => A.classList.contains(c.slideActiveClass))[0]) : T = s;
  const C = i === "next" || !i, S = i === "prev" || !i;
  let M = 0, P = 0;
  const b = w ? Math.ceil(u.length / c.grid.rows) : u.length, k = (w ? u[s].column : s) + (g && typeof r > "u" ? -p / 2 + 0.5 : 0);
  if (k < _) {
    M = Math.max(_ - k, m);
    for (let A = 0; A < _ - k; A += 1) {
      const z = A - Math.floor(A / b) * b;
      if (w) {
        const L = b - z - 1;
        for (let B = u.length - 1; B >= 0; B -= 1)
          u[B].column === L && y.push(B);
      } else
        y.push(b - z - 1);
    }
  } else if (k + p > b - _) {
    P = Math.max(k - (b - _ * 2), m);
    for (let A = 0; A < P; A += 1) {
      const z = A - Math.floor(A / b) * b;
      w ? u.forEach((L, B) => {
        L.column === z && v.push(B);
      }) : v.push(z);
    }
  }
  if (l.__preventObserver__ = !0, requestAnimationFrame(() => {
    l.__preventObserver__ = !1;
  }), S && y.forEach((A) => {
    u[A].swiperLoopMoveDOM = !0, h.prepend(u[A]), u[A].swiperLoopMoveDOM = !1;
  }), C && v.forEach((A) => {
    u[A].swiperLoopMoveDOM = !0, h.append(u[A]), u[A].swiperLoopMoveDOM = !1;
  }), l.recalcSlides(), c.slidesPerView === "auto" ? l.updateSlides() : w && (y.length > 0 && S || v.length > 0 && C) && l.slides.forEach((A, z) => {
    l.grid.updateSlide(z, A, l.slides);
  }), c.watchSlidesProgress && l.updateSlidesOffset(), t) {
    if (y.length > 0 && S) {
      if (typeof e > "u") {
        const A = l.slidesGrid[T], L = l.slidesGrid[T + M] - A;
        a ? l.setTranslate(l.translate - L) : (l.slideTo(T + M, 0, !1, !0), r && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - L, l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - L));
      } else if (r) {
        const A = w ? y.length / c.grid.rows : y.length;
        l.slideTo(l.activeIndex + A, 0, !1, !0), l.touchEventsData.currentTranslate = l.translate;
      }
    } else if (v.length > 0 && C)
      if (typeof e > "u") {
        const A = l.slidesGrid[T], L = l.slidesGrid[T - P] - A;
        a ? l.setTranslate(l.translate - L) : (l.slideTo(T - P, 0, !1, !0), r && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - L, l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - L));
      } else {
        const A = w ? v.length / c.grid.rows : v.length;
        l.slideTo(l.activeIndex - A, 0, !1, !0);
      }
  }
  if (l.allowSlidePrev = f, l.allowSlideNext = d, l.controller && l.controller.control && !o) {
    const A = {
      slideRealIndex: e,
      direction: i,
      setTranslate: r,
      activeSlideIndex: s,
      byController: !0
    };
    Array.isArray(l.controller.control) ? l.controller.control.forEach((z) => {
      !z.destroyed && z.params.loop && z.loopFix({
        ...A,
        slideTo: z.params.slidesPerView === c.slidesPerView ? t : !1
      });
    }) : l.controller.control instanceof l.constructor && l.controller.control.params.loop && l.controller.control.loopFix({
      ...A,
      slideTo: l.controller.control.params.slidesPerView === c.slidesPerView ? t : !1
    });
  }
  l.emit("loopFix");
}
function xd() {
  const n = this, {
    params: e,
    slidesEl: t
  } = n;
  if (!e.loop || n.virtual && n.params.virtual.enabled)
    return;
  n.recalcSlides();
  const i = [];
  n.slides.forEach((r) => {
    const s = typeof r.swiperSlideIndex > "u" ? r.getAttribute("data-swiper-slide-index") * 1 : r.swiperSlideIndex;
    i[s] = r;
  }), n.slides.forEach((r) => {
    r.removeAttribute("data-swiper-slide-index");
  }), i.forEach((r) => {
    t.append(r);
  }), n.recalcSlides(), n.slideTo(n.realIndex, 0);
}
var bd = {
  loopCreate: wd,
  loopFix: yd,
  loopDestroy: xd
};
function Td(n) {
  const e = this;
  if (!e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode)
    return;
  const t = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0), t.style.cursor = "move", t.style.cursor = n ? "grabbing" : "grab", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  });
}
function Sd() {
  const n = this;
  n.params.watchOverflow && n.isLocked || n.params.cssMode || (n.isElement && (n.__preventObserver__ = !0), n[n.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", n.isElement && requestAnimationFrame(() => {
    n.__preventObserver__ = !1;
  }));
}
var Ed = {
  setGrabCursor: Td,
  unsetGrabCursor: Sd
};
function Pd(n, e) {
  e === void 0 && (e = this);
  function t(i) {
    if (!i || i === Gr() || i === Et())
      return null;
    i.assignedSlot && (i = i.assignedSlot);
    const r = i.closest(n);
    return !r && !i.getRootNode ? null : r || t(i.getRootNode().host);
  }
  return t(e);
}
function Ca(n, e, t) {
  const i = Et(), {
    params: r
  } = n, s = r.edgeSwipeDetection, o = r.edgeSwipeThreshold;
  return s && (t <= o || t >= i.innerWidth - o) ? s === "prevent" ? (e.preventDefault(), !0) : !1 : !0;
}
function Cd(n) {
  const e = this, t = Gr();
  let i = n;
  i.originalEvent && (i = i.originalEvent);
  const r = e.touchEventsData;
  if (i.type === "pointerdown") {
    if (r.pointerId !== null && r.pointerId !== i.pointerId)
      return;
    r.pointerId = i.pointerId;
  } else
    i.type === "touchstart" && i.targetTouches.length === 1 && (r.touchId = i.targetTouches[0].identifier);
  if (i.type === "touchstart") {
    Ca(e, i, i.targetTouches[0].pageX);
    return;
  }
  const {
    params: s,
    touches: o,
    enabled: a
  } = e;
  if (!a || !s.simulateTouch && i.pointerType === "mouse" || e.animating && s.preventInteractionOnTransition)
    return;
  !e.animating && s.cssMode && s.loop && e.loopFix();
  let l = i.target;
  if (s.touchEventsTarget === "wrapper" && !e.wrapperEl.contains(l) || "which" in i && i.which === 3 || "button" in i && i.button > 0 || r.isTouched && r.isMoved)
    return;
  const u = !!s.noSwipingClass && s.noSwipingClass !== "", f = i.composedPath ? i.composedPath() : i.path;
  u && i.target && i.target.shadowRoot && f && (l = f[0]);
  const d = s.noSwipingSelector ? s.noSwipingSelector : `.${s.noSwipingClass}`, h = !!(i.target && i.target.shadowRoot);
  if (s.noSwiping && (h ? Pd(d, l) : l.closest(d))) {
    e.allowClick = !0;
    return;
  }
  if (s.swipeHandler && !l.closest(s.swipeHandler))
    return;
  o.currentX = i.pageX, o.currentY = i.pageY;
  const c = o.currentX, g = o.currentY;
  if (!Ca(e, i, c))
    return;
  Object.assign(r, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), o.startX = c, o.startY = g, r.touchStartTime = is(), e.allowClick = !0, e.updateSize(), e.swipeDirection = void 0, s.threshold > 0 && (r.allowThresholdMove = !1);
  let p = !0;
  l.matches(r.focusableElements) && (p = !1, l.nodeName === "SELECT" && (r.isTouched = !1)), t.activeElement && t.activeElement.matches(r.focusableElements) && t.activeElement !== l && t.activeElement.blur();
  const m = p && e.allowTouchMove && s.touchStartPreventDefault;
  (s.touchStartForcePreventDefault || m) && !l.isContentEditable && i.preventDefault(), s.freeMode && s.freeMode.enabled && e.freeMode && e.animating && !s.cssMode && e.freeMode.onTouchStart(), e.emit("touchStart", i);
}
function Md(n) {
  const e = Gr(), t = this, i = t.touchEventsData, {
    params: r,
    touches: s,
    rtlTranslate: o,
    enabled: a
  } = t;
  if (!a || !r.simulateTouch && n.pointerType === "mouse")
    return;
  let l = n;
  if (l.originalEvent && (l = l.originalEvent), l.type === "pointermove" && (i.touchId !== null || l.pointerId !== i.pointerId))
    return;
  let u;
  if (l.type === "touchmove") {
    if (u = [...l.changedTouches].filter((C) => C.identifier === i.touchId)[0], !u || u.identifier !== i.touchId)
      return;
  } else
    u = l;
  if (!i.isTouched) {
    i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", l);
    return;
  }
  const f = u.pageX, d = u.pageY;
  if (l.preventedByNestedSwiper) {
    s.startX = f, s.startY = d;
    return;
  }
  if (!t.allowTouchMove) {
    l.target.matches(i.focusableElements) || (t.allowClick = !1), i.isTouched && (Object.assign(s, {
      startX: f,
      startY: d,
      currentX: f,
      currentY: d
    }), i.touchStartTime = is());
    return;
  }
  if (r.touchReleaseOnEdges && !r.loop) {
    if (t.isVertical()) {
      if (d < s.startY && t.translate <= t.maxTranslate() || d > s.startY && t.translate >= t.minTranslate()) {
        i.isTouched = !1, i.isMoved = !1;
        return;
      }
    } else if (f < s.startX && t.translate <= t.maxTranslate() || f > s.startX && t.translate >= t.minTranslate())
      return;
  }
  if (e.activeElement && l.target === e.activeElement && l.target.matches(i.focusableElements)) {
    i.isMoved = !0, t.allowClick = !1;
    return;
  }
  i.allowTouchCallbacks && t.emit("touchMove", l), s.previousX = s.currentX, s.previousY = s.currentY, s.currentX = f, s.currentY = d;
  const h = s.currentX - s.startX, c = s.currentY - s.startY;
  if (t.params.threshold && Math.sqrt(h ** 2 + c ** 2) < t.params.threshold)
    return;
  if (typeof i.isScrolling > "u") {
    let C;
    t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? i.isScrolling = !1 : h * h + c * c >= 25 && (C = Math.atan2(Math.abs(c), Math.abs(h)) * 180 / Math.PI, i.isScrolling = t.isHorizontal() ? C > r.touchAngle : 90 - C > r.touchAngle);
  }
  if (i.isScrolling && t.emit("touchMoveOpposite", l), typeof i.startMoving > "u" && (s.currentX !== s.startX || s.currentY !== s.startY) && (i.startMoving = !0), i.isScrolling) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving)
    return;
  t.allowClick = !1, !r.cssMode && l.cancelable && l.preventDefault(), r.touchMoveStopPropagation && !r.nested && l.stopPropagation();
  let g = t.isHorizontal() ? h : c, p = t.isHorizontal() ? s.currentX - s.previousX : s.currentY - s.previousY;
  r.oneWayMovement && (g = Math.abs(g) * (o ? 1 : -1), p = Math.abs(p) * (o ? 1 : -1)), s.diff = g, g *= r.touchRatio, o && (g = -g, p = -p);
  const m = t.touchesDirection;
  t.swipeDirection = g > 0 ? "prev" : "next", t.touchesDirection = p > 0 ? "prev" : "next";
  const _ = t.params.loop && !r.cssMode, w = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!i.isMoved) {
    if (_ && w && t.loopFix({
      direction: t.swipeDirection
    }), i.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const C = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0
      });
      t.wrapperEl.dispatchEvent(C);
    }
    i.allowMomentumBounce = !1, r.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", l);
  }
  let y;
  if ((/* @__PURE__ */ new Date()).getTime(), i.isMoved && i.allowThresholdMove && m !== t.touchesDirection && _ && w && Math.abs(g) >= 1) {
    Object.assign(s, {
      startX: f,
      startY: d,
      currentX: f,
      currentY: d,
      startTranslate: i.currentTranslate
    }), i.loopSwapReset = !0, i.startTranslate = i.currentTranslate;
    return;
  }
  t.emit("sliderMove", l), i.isMoved = !0, i.currentTranslate = g + i.startTranslate;
  let v = !0, T = r.resistanceRatio;
  if (r.touchReleaseOnEdges && (T = 0), g > 0 ? (_ && w && !y && i.allowThresholdMove && i.currentTranslate > (r.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] : t.minTranslate()) && t.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), i.currentTranslate > t.minTranslate() && (v = !1, r.resistance && (i.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + i.startTranslate + g) ** T))) : g < 0 && (_ && w && !y && i.allowThresholdMove && i.currentTranslate < (r.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] : t.maxTranslate()) && t.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: t.slides.length - (r.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
  }), i.currentTranslate < t.maxTranslate() && (v = !1, r.resistance && (i.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - i.startTranslate - g) ** T))), v && (l.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (i.currentTranslate = i.startTranslate), r.threshold > 0)
    if (Math.abs(g) > r.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        i.allowThresholdMove = !0, s.startX = s.currentX, s.startY = s.currentY, i.currentTranslate = i.startTranslate, s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY;
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !r.followFinger || r.cssMode || ((r.freeMode && r.freeMode.enabled && t.freeMode || r.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), r.freeMode && r.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(i.currentTranslate), t.setTranslate(i.currentTranslate));
}
function kd(n) {
  const e = this, t = e.touchEventsData;
  let i = n;
  i.originalEvent && (i = i.originalEvent);
  let r;
  if (i.type === "touchend" || i.type === "touchcancel") {
    if (r = [...i.changedTouches].filter((v) => v.identifier === t.touchId)[0], !r || r.identifier !== t.touchId)
      return;
  } else {
    if (t.touchId !== null || i.pointerId !== t.pointerId)
      return;
    r = i;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(i.type) && !(["pointercancel", "contextmenu"].includes(i.type) && (e.browser.isSafari || e.browser.isWebView)))
    return;
  t.pointerId = null, t.touchId = null;
  const {
    params: o,
    touches: a,
    rtlTranslate: l,
    slidesGrid: u,
    enabled: f
  } = e;
  if (!f || !o.simulateTouch && i.pointerType === "mouse")
    return;
  if (t.allowTouchCallbacks && e.emit("touchEnd", i), t.allowTouchCallbacks = !1, !t.isTouched) {
    t.isMoved && o.grabCursor && e.setGrabCursor(!1), t.isMoved = !1, t.startMoving = !1;
    return;
  }
  o.grabCursor && t.isMoved && t.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
  const d = is(), h = d - t.touchStartTime;
  if (e.allowClick) {
    const v = i.path || i.composedPath && i.composedPath();
    e.updateClickedSlide(v && v[0] || i.target, v), e.emit("tap click", i), h < 300 && d - t.lastClickTime < 300 && e.emit("doubleTap doubleClick", i);
  }
  if (t.lastClickTime = is(), no(() => {
    e.destroyed || (e.allowClick = !0);
  }), !t.isTouched || !t.isMoved || !e.swipeDirection || a.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
    t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
    return;
  }
  t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
  let c;
  if (o.followFinger ? c = l ? e.translate : -e.translate : c = -t.currentTranslate, o.cssMode)
    return;
  if (o.freeMode && o.freeMode.enabled) {
    e.freeMode.onTouchEnd({
      currentPos: c
    });
    return;
  }
  let g = 0, p = e.slidesSizesGrid[0];
  for (let v = 0; v < u.length; v += v < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
    const T = v < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    typeof u[v + T] < "u" ? c >= u[v] && c < u[v + T] && (g = v, p = u[v + T] - u[v]) : c >= u[v] && (g = v, p = u[u.length - 1] - u[u.length - 2]);
  }
  let m = null, _ = null;
  o.rewind && (e.isBeginning ? _ = o.virtual && o.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (m = 0));
  const w = (c - u[g]) / p, y = g < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
  if (h > o.longSwipesMs) {
    if (!o.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" && (w >= o.longSwipesRatio ? e.slideTo(o.rewind && e.isEnd ? m : g + y) : e.slideTo(g)), e.swipeDirection === "prev" && (w > 1 - o.longSwipesRatio ? e.slideTo(g + y) : _ !== null && w < 0 && Math.abs(w) > o.longSwipesRatio ? e.slideTo(_) : e.slideTo(g));
  } else {
    if (!o.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation && (i.target === e.navigation.nextEl || i.target === e.navigation.prevEl) ? i.target === e.navigation.nextEl ? e.slideTo(g + y) : e.slideTo(g) : (e.swipeDirection === "next" && e.slideTo(m !== null ? m : g + y), e.swipeDirection === "prev" && e.slideTo(_ !== null ? _ : g));
  }
}
function Ma() {
  const n = this, {
    params: e,
    el: t
  } = n;
  if (t && t.offsetWidth === 0)
    return;
  e.breakpoints && n.setBreakpoint();
  const {
    allowSlideNext: i,
    allowSlidePrev: r,
    snapGrid: s
  } = n, o = n.virtual && n.params.virtual.enabled;
  n.allowSlideNext = !0, n.allowSlidePrev = !0, n.updateSize(), n.updateSlides(), n.updateSlidesClasses();
  const a = o && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) && n.isEnd && !n.isBeginning && !n.params.centeredSlides && !a ? n.slideTo(n.slides.length - 1, 0, !1, !0) : n.params.loop && !o ? n.slideToLoop(n.realIndex, 0, !1, !0) : n.slideTo(n.activeIndex, 0, !1, !0), n.autoplay && n.autoplay.running && n.autoplay.paused && (clearTimeout(n.autoplay.resizeTimeout), n.autoplay.resizeTimeout = setTimeout(() => {
    n.autoplay && n.autoplay.running && n.autoplay.paused && n.autoplay.resume();
  }, 500)), n.allowSlidePrev = r, n.allowSlideNext = i, n.params.watchOverflow && s !== n.snapGrid && n.checkOverflow();
}
function Od(n) {
  const e = this;
  e.enabled && (e.allowClick || (e.params.preventClicks && n.preventDefault(), e.params.preventClicksPropagation && e.animating && (n.stopPropagation(), n.stopImmediatePropagation())));
}
function Ad() {
  const n = this, {
    wrapperEl: e,
    rtlTranslate: t,
    enabled: i
  } = n;
  if (!i)
    return;
  n.previousTranslate = n.translate, n.isHorizontal() ? n.translate = -e.scrollLeft : n.translate = -e.scrollTop, n.translate === 0 && (n.translate = 0), n.updateActiveIndex(), n.updateSlidesClasses();
  let r;
  const s = n.maxTranslate() - n.minTranslate();
  s === 0 ? r = 0 : r = (n.translate - n.minTranslate()) / s, r !== n.progress && n.updateProgress(t ? -n.translate : n.translate), n.emit("setTranslate", n.translate, !1);
}
function Dd(n) {
  const e = this;
  Yn(e, n.target), !(e.params.cssMode || e.params.slidesPerView !== "auto" && !e.params.autoHeight) && e.update();
}
function Id() {
  const n = this;
  n.documentTouchHandlerProceeded || (n.documentTouchHandlerProceeded = !0, n.params.touchReleaseOnEdges && (n.el.style.touchAction = "auto"));
}
const Gl = (n, e) => {
  const t = Gr(), {
    params: i,
    el: r,
    wrapperEl: s,
    device: o
  } = n, a = !!i.nested, l = e === "on" ? "addEventListener" : "removeEventListener", u = e;
  t[l]("touchstart", n.onDocumentTouchStart, {
    passive: !1,
    capture: a
  }), r[l]("touchstart", n.onTouchStart, {
    passive: !1
  }), r[l]("pointerdown", n.onTouchStart, {
    passive: !1
  }), t[l]("touchmove", n.onTouchMove, {
    passive: !1,
    capture: a
  }), t[l]("pointermove", n.onTouchMove, {
    passive: !1,
    capture: a
  }), t[l]("touchend", n.onTouchEnd, {
    passive: !0
  }), t[l]("pointerup", n.onTouchEnd, {
    passive: !0
  }), t[l]("pointercancel", n.onTouchEnd, {
    passive: !0
  }), t[l]("touchcancel", n.onTouchEnd, {
    passive: !0
  }), t[l]("pointerout", n.onTouchEnd, {
    passive: !0
  }), t[l]("pointerleave", n.onTouchEnd, {
    passive: !0
  }), t[l]("contextmenu", n.onTouchEnd, {
    passive: !0
  }), (i.preventClicks || i.preventClicksPropagation) && r[l]("click", n.onClick, !0), i.cssMode && s[l]("scroll", n.onScroll), i.updateOnWindowResize ? n[u](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Ma, !0) : n[u]("observerUpdate", Ma, !0), r[l]("load", n.onLoad, {
    capture: !0
  });
};
function zd() {
  const n = this, {
    params: e
  } = n;
  n.onTouchStart = Cd.bind(n), n.onTouchMove = Md.bind(n), n.onTouchEnd = kd.bind(n), n.onDocumentTouchStart = Id.bind(n), e.cssMode && (n.onScroll = Ad.bind(n)), n.onClick = Od.bind(n), n.onLoad = Dd.bind(n), Gl(n, "on");
}
function Ld() {
  Gl(this, "off");
}
var Rd = {
  attachEvents: zd,
  detachEvents: Ld
};
const ka = (n, e) => n.grid && e.grid && e.grid.rows > 1;
function Fd() {
  const n = this, {
    realIndex: e,
    initialized: t,
    params: i,
    el: r
  } = n, s = i.breakpoints;
  if (!s || s && Object.keys(s).length === 0)
    return;
  const o = n.getBreakpoint(s, n.params.breakpointsBase, n.el);
  if (!o || n.currentBreakpoint === o)
    return;
  const l = (o in s ? s[o] : void 0) || n.originalParams, u = ka(n, i), f = ka(n, l), d = i.enabled;
  u && !f ? (r.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`), n.emitContainerClasses()) : !u && f && (r.classList.add(`${i.containerModifierClass}grid`), (l.grid.fill && l.grid.fill === "column" || !l.grid.fill && i.grid.fill === "column") && r.classList.add(`${i.containerModifierClass}grid-column`), n.emitContainerClasses()), ["navigation", "pagination", "scrollbar"].forEach((_) => {
    if (typeof l[_] > "u")
      return;
    const w = i[_] && i[_].enabled, y = l[_] && l[_].enabled;
    w && !y && n[_].disable(), !w && y && n[_].enable();
  });
  const h = l.direction && l.direction !== i.direction, c = i.loop && (l.slidesPerView !== i.slidesPerView || h), g = i.loop;
  h && t && n.changeDirection(), vt(n.params, l);
  const p = n.params.enabled, m = n.params.loop;
  Object.assign(n, {
    allowTouchMove: n.params.allowTouchMove,
    allowSlideNext: n.params.allowSlideNext,
    allowSlidePrev: n.params.allowSlidePrev
  }), d && !p ? n.disable() : !d && p && n.enable(), n.currentBreakpoint = o, n.emit("_beforeBreakpoint", l), t && (c ? (n.loopDestroy(), n.loopCreate(e), n.updateSlides()) : !g && m ? (n.loopCreate(e), n.updateSlides()) : g && !m && n.loopDestroy()), n.emit("breakpoint", l);
}
function Nd(n, e, t) {
  if (e === void 0 && (e = "window"), !n || e === "container" && !t)
    return;
  let i = !1;
  const r = Et(), s = e === "window" ? r.innerHeight : t.clientHeight, o = Object.keys(n).map((a) => {
    if (typeof a == "string" && a.indexOf("@") === 0) {
      const l = parseFloat(a.substr(1));
      return {
        value: s * l,
        point: a
      };
    }
    return {
      value: a,
      point: a
    };
  });
  o.sort((a, l) => parseInt(a.value, 10) - parseInt(l.value, 10));
  for (let a = 0; a < o.length; a += 1) {
    const {
      point: l,
      value: u
    } = o[a];
    e === "window" ? r.matchMedia(`(min-width: ${u}px)`).matches && (i = l) : u <= t.clientWidth && (i = l);
  }
  return i || "max";
}
var Bd = {
  setBreakpoint: Fd,
  getBreakpoint: Nd
};
function Vd(n, e) {
  const t = [];
  return n.forEach((i) => {
    typeof i == "object" ? Object.keys(i).forEach((r) => {
      i[r] && t.push(e + r);
    }) : typeof i == "string" && t.push(e + i);
  }), t;
}
function Gd() {
  const n = this, {
    classNames: e,
    params: t,
    rtl: i,
    el: r,
    device: s
  } = n, o = Vd(["initialized", t.direction, {
    "free-mode": n.params.freeMode && t.freeMode.enabled
  }, {
    autoheight: t.autoHeight
  }, {
    rtl: i
  }, {
    grid: t.grid && t.grid.rows > 1
  }, {
    "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column"
  }, {
    android: s.android
  }, {
    ios: s.ios
  }, {
    "css-mode": t.cssMode
  }, {
    centered: t.cssMode && t.centeredSlides
  }, {
    "watch-progress": t.watchSlidesProgress
  }], t.containerModifierClass);
  e.push(...o), r.classList.add(...e), n.emitContainerClasses();
}
function $d() {
  const n = this, {
    el: e,
    classNames: t
  } = n;
  e.classList.remove(...t), n.emitContainerClasses();
}
var Yd = {
  addClasses: Gd,
  removeClasses: $d
};
function Hd() {
  const n = this, {
    isLocked: e,
    params: t
  } = n, {
    slidesOffsetBefore: i
  } = t;
  if (i) {
    const r = n.slides.length - 1, s = n.slidesGrid[r] + n.slidesSizesGrid[r] + i * 2;
    n.isLocked = n.size > s;
  } else
    n.isLocked = n.snapGrid.length === 1;
  t.allowSlideNext === !0 && (n.allowSlideNext = !n.isLocked), t.allowSlidePrev === !0 && (n.allowSlidePrev = !n.isLocked), e && e !== n.isLocked && (n.isEnd = !1), e !== n.isLocked && n.emit(n.isLocked ? "lock" : "unlock");
}
var Wd = {
  checkOverflow: Hd
}, Oa = {
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
function Xd(n, e) {
  return function(i) {
    i === void 0 && (i = {});
    const r = Object.keys(i)[0], s = i[r];
    if (typeof s != "object" || s === null) {
      vt(e, i);
      return;
    }
    if (n[r] === !0 && (n[r] = {
      enabled: !0
    }), r === "navigation" && n[r] && n[r].enabled && !n[r].prevEl && !n[r].nextEl && (n[r].auto = !0), ["pagination", "scrollbar"].indexOf(r) >= 0 && n[r] && n[r].enabled && !n[r].el && (n[r].auto = !0), !(r in n && "enabled" in s)) {
      vt(e, i);
      return;
    }
    typeof n[r] == "object" && !("enabled" in n[r]) && (n[r].enabled = !0), n[r] || (n[r] = {
      enabled: !1
    }), vt(e, i);
  };
}
const As = {
  eventsEmitter: Yc,
  update: ed,
  translate: od,
  transition: fd,
  slide: vd,
  loop: bd,
  grabCursor: Ed,
  events: Rd,
  breakpoints: Bd,
  checkOverflow: Wd,
  classes: Yd
}, Ds = {};
class Mt {
  constructor() {
    let e, t;
    for (var i = arguments.length, r = new Array(i), s = 0; s < i; s++)
      r[s] = arguments[s];
    r.length === 1 && r[0].constructor && Object.prototype.toString.call(r[0]).slice(8, -1) === "Object" ? t = r[0] : [e, t] = r, t || (t = {}), t = vt({}, t), e && !t.el && (t.el = e);
    const o = Gr();
    if (t.el && typeof t.el == "string" && o.querySelectorAll(t.el).length > 1) {
      const f = [];
      return o.querySelectorAll(t.el).forEach((d) => {
        const h = vt({}, t, {
          el: d
        });
        f.push(new Mt(h));
      }), f;
    }
    const a = this;
    a.__swiper__ = !0, a.support = Bl(), a.device = Nc({
      userAgent: t.userAgent
    }), a.browser = Vc(), a.eventsListeners = {}, a.eventsAnyListeners = [], a.modules = [...a.__modules__], t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
    const l = {};
    a.modules.forEach((f) => {
      f({
        params: t,
        swiper: a,
        extendParams: Xd(t, l),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a)
      });
    });
    const u = vt({}, Oa, l);
    return a.params = vt({}, u, Ds, t), a.originalParams = vt({}, a.params), a.passedParams = vt({}, t), a.params && a.params.on && Object.keys(a.params.on).forEach((f) => {
      a.on(f, a.params.on[f]);
    }), a.params && a.params.onAny && a.onAny(a.params.onAny), Object.assign(a, {
      enabled: a.params.enabled,
      el: e,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return a.params.direction === "horizontal";
      },
      isVertical() {
        return a.params.direction === "vertical";
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
      allowSlideNext: a.params.allowSlideNext,
      allowSlidePrev: a.params.allowSlidePrev,
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
        focusableElements: a.params.focusableElements,
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
      allowTouchMove: a.params.allowTouchMove,
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
    }), a.emit("_swiper"), a.params.init && a.init(), a;
  }
  getDirectionLabel(e) {
    return this.isHorizontal() ? e : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[e];
  }
  getSlideIndex(e) {
    const {
      slidesEl: t,
      params: i
    } = this, r = Zt(t, `.${i.slideClass}, swiper-slide`), s = Ea(r[0]);
    return Ea(e) - s;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(this.slides.filter((t) => t.getAttribute("data-swiper-slide-index") * 1 === e)[0]);
  }
  recalcSlides() {
    const e = this, {
      slidesEl: t,
      params: i
    } = e;
    e.slides = Zt(t, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
  }
  setProgress(e, t) {
    const i = this;
    e = Math.min(Math.max(e, 0), 1);
    const r = i.minTranslate(), o = (i.maxTranslate() - r) * e + r;
    i.translateTo(o, typeof t > "u" ? 0 : t), i.updateActiveIndex(), i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el)
      return;
    const t = e.el.className.split(" ").filter((i) => i.indexOf("swiper") === 0 || i.indexOf(e.params.containerModifierClass) === 0);
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed ? "" : e.className.split(" ").filter((i) => i.indexOf("swiper-slide") === 0 || i.indexOf(t.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el)
      return;
    const t = [];
    e.slides.forEach((i) => {
      const r = e.getSlideClasses(i);
      t.push({
        slideEl: i,
        classNames: r
      }), e.emit("_slideClass", i, r);
    }), e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e, t) {
    e === void 0 && (e = "current"), t === void 0 && (t = !1);
    const i = this, {
      params: r,
      slides: s,
      slidesGrid: o,
      slidesSizesGrid: a,
      size: l,
      activeIndex: u
    } = i;
    let f = 1;
    if (typeof r.slidesPerView == "number")
      return r.slidesPerView;
    if (r.centeredSlides) {
      let d = s[u] ? s[u].swiperSlideSize : 0, h;
      for (let c = u + 1; c < s.length; c += 1)
        s[c] && !h && (d += s[c].swiperSlideSize, f += 1, d > l && (h = !0));
      for (let c = u - 1; c >= 0; c -= 1)
        s[c] && !h && (d += s[c].swiperSlideSize, f += 1, d > l && (h = !0));
    } else if (e === "current")
      for (let d = u + 1; d < s.length; d += 1)
        (t ? o[d] + a[d] - o[u] < l : o[d] - o[u] < l) && (f += 1);
    else
      for (let d = u - 1; d >= 0; d -= 1)
        o[u] - o[d] < l && (f += 1);
    return f;
  }
  update() {
    const e = this;
    if (!e || e.destroyed)
      return;
    const {
      snapGrid: t,
      params: i
    } = e;
    i.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
      o.complete && Yn(e, o);
    }), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses();
    function r() {
      const o = e.rtlTranslate ? e.translate * -1 : e.translate, a = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
      e.setTranslate(a), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let s;
    if (i.freeMode && i.freeMode.enabled && !i.cssMode)
      r(), i.autoHeight && e.updateAutoHeight();
    else {
      if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && e.isEnd && !i.centeredSlides) {
        const o = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
        s = e.slideTo(o.length - 1, 0, !1, !0);
      } else
        s = e.slideTo(e.activeIndex, 0, !1, !0);
      s || r();
    }
    i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  changeDirection(e, t) {
    t === void 0 && (t = !0);
    const i = this, r = i.params.direction;
    return e || (e = r === "horizontal" ? "vertical" : "horizontal"), e === r || e !== "horizontal" && e !== "vertical" || (i.el.classList.remove(`${i.params.containerModifierClass}${r}`), i.el.classList.add(`${i.params.containerModifierClass}${e}`), i.emitContainerClasses(), i.params.direction = e, i.slides.forEach((s) => {
      e === "vertical" ? s.style.width = "" : s.style.height = "";
    }), i.emit("changeDirection"), t && i.update()), i;
  }
  changeLanguageDirection(e) {
    const t = this;
    t.rtl && e === "rtl" || !t.rtl && e === "ltr" || (t.rtl = e === "rtl", t.rtlTranslate = t.params.direction === "horizontal" && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update());
  }
  mount(e) {
    const t = this;
    if (t.mounted)
      return !0;
    let i = e || t.params.el;
    if (typeof i == "string" && (i = document.querySelector(i)), !i)
      return !1;
    i.swiper = t, i.parentNode && i.parentNode.host && i.parentNode.host.nodeName === "SWIPER-CONTAINER" && (t.isElement = !0);
    const r = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let o = (() => i && i.shadowRoot && i.shadowRoot.querySelector ? i.shadowRoot.querySelector(r()) : Zt(i, r())[0])();
    return !o && t.params.createElements && (o = ns("div", t.params.wrapperClass), i.append(o), Zt(i, `.${t.params.slideClass}`).forEach((a) => {
      o.append(a);
    })), Object.assign(t, {
      el: i,
      wrapperEl: o,
      slidesEl: t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : o,
      hostEl: t.isElement ? i.parentNode.host : i,
      mounted: !0,
      // RTL
      rtl: i.dir.toLowerCase() === "rtl" || yi(i, "direction") === "rtl",
      rtlTranslate: t.params.direction === "horizontal" && (i.dir.toLowerCase() === "rtl" || yi(i, "direction") === "rtl"),
      wrongRTL: yi(o, "display") === "-webkit-box"
    }), !0;
  }
  init(e) {
    const t = this;
    if (t.initialized || t.mount(e) === !1)
      return t;
    t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(), t.attachEvents();
    const r = [...t.el.querySelectorAll('[loading="lazy"]')];
    return t.isElement && r.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), r.forEach((s) => {
      s.complete ? Yn(t, s) : s.addEventListener("load", (o) => {
        Yn(t, o.target);
      });
    }), so(t), t.initialized = !0, so(t), t.emit("init"), t.emit("afterInit"), t;
  }
  destroy(e, t) {
    e === void 0 && (e = !0), t === void 0 && (t = !0);
    const i = this, {
      params: r,
      el: s,
      wrapperEl: o,
      slides: a
    } = i;
    return typeof i.params > "u" || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), r.loop && i.loopDestroy(), t && (i.removeClasses(), s.removeAttribute("style"), o.removeAttribute("style"), a && a.length && a.forEach((l) => {
      l.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass), l.removeAttribute("style"), l.removeAttribute("data-swiper-slide-index");
    })), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((l) => {
      i.off(l);
    }), e !== !1 && (i.el.swiper = null, kc(i)), i.destroyed = !0), null;
  }
  static extendDefaults(e) {
    vt(Ds, e);
  }
  static get extendedDefaults() {
    return Ds;
  }
  static get defaults() {
    return Oa;
  }
  static installModule(e) {
    Mt.prototype.__modules__ || (Mt.prototype.__modules__ = []);
    const t = Mt.prototype.__modules__;
    typeof e == "function" && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e) ? (e.forEach((t) => Mt.installModule(t)), Mt) : (Mt.installModule(e), Mt);
  }
}
Object.keys(As).forEach((n) => {
  Object.keys(As[n]).forEach((e) => {
    Mt.prototype[e] = As[n][e];
  });
});
Mt.use([Gc, $c]);
function qd(n, e, t, i) {
  return n.params.createElements && Object.keys(i).forEach((r) => {
    if (!t[r] && t.auto === !0) {
      let s = Zt(n.el, `.${i[r]}`)[0];
      s || (s = ns("div", i[r]), s.className = i[r], n.el.append(s)), t[r] = s, e[r] = s;
    }
  }), t;
}
function Ud(n) {
  let {
    swiper: e,
    extendParams: t,
    on: i,
    emit: r
  } = n;
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  }), e.navigation = {
    nextEl: null,
    prevEl: null
  };
  const s = (p) => (Array.isArray(p) ? p : [p]).filter((m) => !!m);
  function o(p) {
    let m;
    return p && typeof p == "string" && e.isElement && (m = e.el.querySelector(p), m) ? m : (p && (typeof p == "string" && (m = [...document.querySelectorAll(p)]), e.params.uniqueNavElements && typeof p == "string" && m.length > 1 && e.el.querySelectorAll(p).length === 1 && (m = e.el.querySelector(p))), p && !m ? p : m);
  }
  function a(p, m) {
    const _ = e.params.navigation;
    p = s(p), p.forEach((w) => {
      w && (w.classList[m ? "add" : "remove"](..._.disabledClass.split(" ")), w.tagName === "BUTTON" && (w.disabled = m), e.params.watchOverflow && e.enabled && w.classList[e.isLocked ? "add" : "remove"](_.lockClass));
    });
  }
  function l() {
    const {
      nextEl: p,
      prevEl: m
    } = e.navigation;
    if (e.params.loop) {
      a(m, !1), a(p, !1);
      return;
    }
    a(m, e.isBeginning && !e.params.rewind), a(p, e.isEnd && !e.params.rewind);
  }
  function u(p) {
    p.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), r("navigationPrev"));
  }
  function f(p) {
    p.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), r("navigationNext"));
  }
  function d() {
    const p = e.params.navigation;
    if (e.params.navigation = qd(e, e.originalParams.navigation, e.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    }), !(p.nextEl || p.prevEl))
      return;
    let m = o(p.nextEl), _ = o(p.prevEl);
    Object.assign(e.navigation, {
      nextEl: m,
      prevEl: _
    }), m = s(m), _ = s(_);
    const w = (y, v) => {
      y && y.addEventListener("click", v === "next" ? f : u), !e.enabled && y && y.classList.add(...p.lockClass.split(" "));
    };
    m.forEach((y) => w(y, "next")), _.forEach((y) => w(y, "prev"));
  }
  function h() {
    let {
      nextEl: p,
      prevEl: m
    } = e.navigation;
    p = s(p), m = s(m);
    const _ = (w, y) => {
      w.removeEventListener("click", y === "next" ? f : u), w.classList.remove(...e.params.navigation.disabledClass.split(" "));
    };
    p.forEach((w) => _(w, "next")), m.forEach((w) => _(w, "prev"));
  }
  i("init", () => {
    e.params.navigation.enabled === !1 ? g() : (d(), l());
  }), i("toEdge fromEdge lock unlock", () => {
    l();
  }), i("destroy", () => {
    h();
  }), i("enable disable", () => {
    let {
      nextEl: p,
      prevEl: m
    } = e.navigation;
    if (p = s(p), m = s(m), e.enabled) {
      l();
      return;
    }
    [...p, ...m].filter((_) => !!_).forEach((_) => _.classList.add(e.params.navigation.lockClass));
  }), i("click", (p, m) => {
    let {
      nextEl: _,
      prevEl: w
    } = e.navigation;
    _ = s(_), w = s(w);
    const y = m.target;
    if (e.params.navigation.hideOnClick && !w.includes(y) && !_.includes(y)) {
      if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === y || e.pagination.el.contains(y)))
        return;
      let v;
      _.length ? v = _[0].classList.contains(e.params.navigation.hiddenClass) : w.length && (v = w[0].classList.contains(e.params.navigation.hiddenClass)), r(v === !0 ? "navigationShow" : "navigationHide"), [..._, ...w].filter((T) => !!T).forEach((T) => T.classList.toggle(e.params.navigation.hiddenClass));
    }
  });
  const c = () => {
    e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), d(), l();
  }, g = () => {
    e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), h();
  };
  Object.assign(e.navigation, {
    enable: c,
    disable: g,
    update: l,
    init: d,
    destroy: h
  });
}
function jd(n) {
  return {
    slider: null,
    sliderContainer: null,
    slidesOnDesktop: n.slidesOnDesktop || 4.2,
    initSlider(e) {
      this.sliderContainer = e.querySelector(".swiper"), this.slider = new Mt(this.sliderContainer, {
        modules: [Ud],
        navigation: {
          nextEl: e.querySelector(".button-next"),
          prevEl: e.querySelector(".button-prev")
        },
        speed: 450,
        slidesPerView: 1.2,
        spaceBetween: 24,
        breakpoints: {
          640: {
            slidesPerView: 2.2,
            spaceBetween: 24
          },
          1024: {
            slidesPerView: this.slidesOnDesktop,
            spaceBetween: 24
          }
        }
      });
    }
  };
}
function oi(n) {
  if (n === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return n;
}
function $l(n, e) {
  n.prototype = Object.create(e.prototype), n.prototype.constructor = n, n.__proto__ = e;
}
/*!
 * GSAP 3.12.4
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Tt = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Lr = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, No, Ye, ce, At = 1e8, re = 1 / At, oo = Math.PI * 2, Kd = oo / 4, Zd = 0, Yl = Math.sqrt, Qd = Math.cos, Jd = Math.sin, De = function(e) {
  return typeof e == "string";
}, de = function(e) {
  return typeof e == "function";
}, ci = function(e) {
  return typeof e == "number";
}, Bo = function(e) {
  return typeof e > "u";
}, ii = function(e) {
  return typeof e == "object";
}, lt = function(e) {
  return e !== !1;
}, Vo = function() {
  return typeof window < "u";
}, kn = function(e) {
  return de(e) || De(e);
}, Hl = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, He = Array.isArray, ao = /(?:-?\.?\d|\.)+/gi, Wl = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, xr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Is = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Xl = /[+-]=-?[.\d]+/, ql = /[^,'"\[\]\s]+/gi, eh = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, le, Ct, lo, Go, St = {}, ss = {}, Ul, jl = function(e) {
  return (ss = ar(e, St)) && dt;
}, $o = function(e, t) {
  return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()");
}, gn = function(e, t) {
  return !t && console.warn(e);
}, Kl = function(e, t) {
  return e && (St[e] = t) && ss && (ss[e] = t) || St;
}, mn = function() {
  return 0;
}, th = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Hn = {
  suppressEvents: !0,
  kill: !1
}, ih = {
  suppressEvents: !0
}, Yo = {}, Pi = [], uo = {}, Zl, wt = {}, zs = {}, Aa = 30, Wn = [], Ho = "", Wo = function(e) {
  var t = e[0], i, r;
  if (ii(t) || de(t) || (e = [e]), !(i = (t._gsap || {}).harness)) {
    for (r = Wn.length; r-- && !Wn[r].targetTest(t); )
      ;
    i = Wn[r];
  }
  for (r = e.length; r--; )
    e[r] && (e[r]._gsap || (e[r]._gsap = new xu(e[r], i))) || e.splice(r, 1);
  return e;
}, er = function(e) {
  return e._gsap || Wo(Dt(e))[0]._gsap;
}, Ql = function(e, t, i) {
  return (i = e[t]) && de(i) ? e[t]() : Bo(i) && e.getAttribute && e.getAttribute(t) || i;
}, ut = function(e, t) {
  return (e = e.split(",")).forEach(t) || e;
}, ge = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, Ae = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, Cr = function(e, t) {
  var i = t.charAt(0), r = parseFloat(t.substr(2));
  return e = parseFloat(e), i === "+" ? e + r : i === "-" ? e - r : i === "*" ? e * r : e / r;
}, rh = function(e, t) {
  for (var i = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < i; )
    ;
  return r < i;
}, os = function() {
  var e = Pi.length, t = Pi.slice(0), i, r;
  for (uo = {}, Pi.length = 0, i = 0; i < e; i++)
    r = t[i], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0);
}, Jl = function(e, t, i, r) {
  Pi.length && !Ye && os(), e.render(t, i, r || Ye && t < 0 && (e._initted || e._startAt)), Pi.length && !Ye && os();
}, eu = function(e) {
  var t = parseFloat(e);
  return (t || t === 0) && (e + "").match(ql).length < 2 ? t : De(e) ? e.trim() : e;
}, tu = function(e) {
  return e;
}, zt = function(e, t) {
  for (var i in t)
    i in e || (e[i] = t[i]);
  return e;
}, nh = function(e) {
  return function(t, i) {
    for (var r in i)
      r in t || r === "duration" && e || r === "ease" || (t[r] = i[r]);
  };
}, ar = function(e, t) {
  for (var i in t)
    e[i] = t[i];
  return e;
}, Da = function n(e, t) {
  for (var i in t)
    i !== "__proto__" && i !== "constructor" && i !== "prototype" && (e[i] = ii(t[i]) ? n(e[i] || (e[i] = {}), t[i]) : t[i]);
  return e;
}, as = function(e, t) {
  var i = {}, r;
  for (r in e)
    r in t || (i[r] = e[r]);
  return i;
}, rn = function(e) {
  var t = e.parent || le, i = e.keyframes ? nh(He(e.keyframes)) : zt;
  if (lt(e.inherit))
    for (; t; )
      i(e, t.vars.defaults), t = t.parent || t._dp;
  return e;
}, sh = function(e, t) {
  for (var i = e.length, r = i === t.length; r && i-- && e[i] === t[i]; )
    ;
  return i < 0;
}, iu = function(e, t, i, r, s) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var o = e[r], a;
  if (s)
    for (a = t[s]; o && o[s] > a; )
      o = o._prev;
  return o ? (t._next = o._next, o._next = t) : (t._next = e[i], e[i] = t), t._next ? t._next._prev = t : e[r] = t, t._prev = o, t.parent = t._dp = e, t;
}, ws = function(e, t, i, r) {
  i === void 0 && (i = "_first"), r === void 0 && (r = "_last");
  var s = t._prev, o = t._next;
  s ? s._next = o : e[i] === t && (e[i] = o), o ? o._prev = s : e[r] === t && (e[r] = s), t._next = t._prev = t.parent = null;
}, Ai = function(e, t) {
  e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, tr = function(e, t) {
  if (e && (!t || t._end > e._dur || t._start < 0))
    for (var i = e; i; )
      i._dirty = 1, i = i.parent;
  return e;
}, oh = function(e) {
  for (var t = e.parent; t && t.parent; )
    t._dirty = 1, t.totalDuration(), t = t.parent;
  return e;
}, fo = function(e, t, i, r) {
  return e._startAt && (Ye ? e._startAt.revert(Hn) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, r));
}, ah = function n(e) {
  return !e || e._ts && n(e.parent);
}, Ia = function(e) {
  return e._repeat ? Rr(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, Rr = function(e, t) {
  var i = Math.floor(e /= t);
  return e && i === e ? i - 1 : i;
}, ls = function(e, t) {
  return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur);
}, ys = function(e) {
  return e._end = Ae(e._start + (e._tDur / Math.abs(e._ts || e._rts || re) || 0));
}, xs = function(e, t) {
  var i = e._dp;
  return i && i.smoothChildTiming && e._ts && (e._start = Ae(i._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)), ys(e), i._dirty || tr(i, e)), e;
}, ru = function(e, t) {
  var i;
  if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (i = ls(e.rawTime(), t), (!t._dur || Sn(0, t.totalDuration(), i) - t._tTime > re) && t.render(i, !0)), tr(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (i = e; i._dp; )
        i.rawTime() >= 0 && i.totalTime(i._tTime), i = i._dp;
    e._zTime = -re;
  }
}, Kt = function(e, t, i, r) {
  return t.parent && Ai(t), t._start = Ae((ci(i) ? i : i || e !== le ? Pt(e, i, t) : e._time) + t._delay), t._end = Ae(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)), iu(e, t, "_first", "_last", e._sort ? "_start" : 0), co(t) || (e._recent = t), r || ru(e, t), e._ts < 0 && xs(e, e._tTime), e;
}, nu = function(e, t) {
  return (St.ScrollTrigger || $o("scrollTrigger", t)) && St.ScrollTrigger.create(t, e);
}, su = function(e, t, i, r, s) {
  if (qo(e, t, s), !e._initted)
    return 1;
  if (!i && e._pt && !Ye && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && Zl !== yt.frame)
    return Pi.push(e), e._lazy = [s, r], 1;
}, lh = function n(e) {
  var t = e.parent;
  return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || n(t));
}, co = function(e) {
  var t = e.data;
  return t === "isFromStart" || t === "isStart";
}, uh = function(e, t, i, r) {
  var s = e.ratio, o = t < 0 || !t && (!e._start && lh(e) && !(!e._initted && co(e)) || (e._ts < 0 || e._dp._ts < 0) && !co(e)) ? 0 : 1, a = e._rDelay, l = 0, u, f, d;
  if (a && e._repeat && (l = Sn(0, e._tDur, t), f = Rr(l, a), e._yoyo && f & 1 && (o = 1 - o), f !== Rr(e._tTime, a) && (s = 1 - o, e.vars.repeatRefresh && e._initted && e.invalidate())), o !== s || Ye || r || e._zTime === re || !t && e._zTime) {
    if (!e._initted && su(e, t, r, i, l))
      return;
    for (d = e._zTime, e._zTime = t || (i ? re : 0), i || (i = t && !d), e.ratio = o, e._from && (o = 1 - o), e._time = 0, e._tTime = l, u = e._pt; u; )
      u.r(o, u.d), u = u._next;
    t < 0 && fo(e, t, i, !0), e._onUpdate && !i && bt(e, "onUpdate"), l && e._repeat && !i && e.parent && bt(e, "onRepeat"), (t >= e._tDur || t < 0) && e.ratio === o && (o && Ai(e, 1), !i && !Ye && (bt(e, o ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else
    e._zTime || (e._zTime = t);
}, fh = function(e, t, i) {
  var r;
  if (i > t)
    for (r = e._first; r && r._start <= i; ) {
      if (r.data === "isPause" && r._start > t)
        return r;
      r = r._next;
    }
  else
    for (r = e._last; r && r._start >= i; ) {
      if (r.data === "isPause" && r._start < t)
        return r;
      r = r._prev;
    }
}, Fr = function(e, t, i, r) {
  var s = e._repeat, o = Ae(t) || 0, a = e._tTime / e._tDur;
  return a && !r && (e._time *= o / e._dur), e._dur = o, e._tDur = s ? s < 0 ? 1e10 : Ae(o * (s + 1) + e._rDelay * s) : o, a > 0 && !r && xs(e, e._tTime = e._tDur * a), e.parent && ys(e), i || tr(e.parent, e), e;
}, za = function(e) {
  return e instanceof tt ? tr(e) : Fr(e, e._dur);
}, ch = {
  _start: 0,
  endTime: mn,
  totalDuration: mn
}, Pt = function n(e, t, i) {
  var r = e.labels, s = e._recent || ch, o = e.duration() >= At ? s.endTime(!1) : e._dur, a, l, u;
  return De(t) && (isNaN(t) || t in r) ? (l = t.charAt(0), u = t.substr(-1) === "%", a = t.indexOf("="), l === "<" || l === ">" ? (a >= 0 && (t = t.replace(/=/, "")), (l === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (u ? (a < 0 ? s : i).totalDuration() / 100 : 1)) : a < 0 ? (t in r || (r[t] = o), r[t]) : (l = parseFloat(t.charAt(a - 1) + t.substr(a + 1)), u && i && (l = l / 100 * (He(i) ? i[0] : i).totalDuration()), a > 1 ? n(e, t.substr(0, a - 1), i) + l : o + l)) : t == null ? o : +t;
}, nn = function(e, t, i) {
  var r = ci(t[1]), s = (r ? 2 : 1) + (e < 2 ? 0 : 1), o = t[s], a, l;
  if (r && (o.duration = t[1]), o.parent = i, e) {
    for (a = o, l = i; l && !("immediateRender" in a); )
      a = l.vars.defaults || {}, l = lt(l.vars.inherit) && l.parent;
    o.immediateRender = lt(a.immediateRender), e < 2 ? o.runBackwards = 1 : o.startAt = t[s - 1];
  }
  return new xe(t[0], o, t[s + 1]);
}, zi = function(e, t) {
  return e || e === 0 ? t(e) : t;
}, Sn = function(e, t, i) {
  return i < e ? e : i > t ? t : i;
}, $e = function(e, t) {
  return !De(e) || !(t = eh.exec(e)) ? "" : t[1];
}, dh = function(e, t, i) {
  return zi(i, function(r) {
    return Sn(e, t, r);
  });
}, ho = [].slice, ou = function(e, t) {
  return e && ii(e) && "length" in e && (!t && !e.length || e.length - 1 in e && ii(e[0])) && !e.nodeType && e !== Ct;
}, hh = function(e, t, i) {
  return i === void 0 && (i = []), e.forEach(function(r) {
    var s;
    return De(r) && !t || ou(r, 1) ? (s = i).push.apply(s, Dt(r)) : i.push(r);
  }) || i;
}, Dt = function(e, t, i) {
  return ce && !t && ce.selector ? ce.selector(e) : De(e) && !i && (lo || !Nr()) ? ho.call((t || Go).querySelectorAll(e), 0) : He(e) ? hh(e, i) : ou(e) ? ho.call(e, 0) : e ? [e] : [];
}, po = function(e) {
  return e = Dt(e)[0] || gn("Invalid scope") || {}, function(t) {
    var i = e.current || e.nativeElement || e;
    return Dt(t, i.querySelectorAll ? i : i === e ? gn("Invalid scope") || Go.createElement("div") : e);
  };
}, au = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, lu = function(e) {
  if (de(e))
    return e;
  var t = ii(e) ? e : {
    each: e
  }, i = ir(t.ease), r = t.from || 0, s = parseFloat(t.base) || 0, o = {}, a = r > 0 && r < 1, l = isNaN(r) || a, u = t.axis, f = r, d = r;
  return De(r) ? f = d = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[r] || 0 : !a && l && (f = r[0], d = r[1]), function(h, c, g) {
    var p = (g || t).length, m = o[p], _, w, y, v, T, C, S, M, P;
    if (!m) {
      if (P = t.grid === "auto" ? 0 : (t.grid || [1, At])[1], !P) {
        for (S = -At; S < (S = g[P++].getBoundingClientRect().left) && P < p; )
          ;
        P < p && P--;
      }
      for (m = o[p] = [], _ = l ? Math.min(P, p) * f - 0.5 : r % P, w = P === At ? 0 : l ? p * d / P - 0.5 : r / P | 0, S = 0, M = At, C = 0; C < p; C++)
        y = C % P - _, v = w - (C / P | 0), m[C] = T = u ? Math.abs(u === "y" ? v : y) : Yl(y * y + v * v), T > S && (S = T), T < M && (M = T);
      r === "random" && au(m), m.max = S - M, m.min = M, m.v = p = (parseFloat(t.amount) || parseFloat(t.each) * (P > p ? p - 1 : u ? u === "y" ? p / P : P : Math.max(P, p / P)) || 0) * (r === "edges" ? -1 : 1), m.b = p < 0 ? s - p : s, m.u = $e(t.amount || t.each) || 0, i = i && p < 0 ? vu(i) : i;
    }
    return p = (m[h] - m.min) / m.max || 0, Ae(m.b + (i ? i(p) : p) * m.v) + m.u;
  };
}, go = function(e) {
  var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(i) {
    var r = Ae(Math.round(parseFloat(i) / e) * e * t);
    return (r - r % 1) / t + (ci(i) ? 0 : $e(i));
  };
}, uu = function(e, t) {
  var i = He(e), r, s;
  return !i && ii(e) && (r = i = e.radius || At, e.values ? (e = Dt(e.values), (s = !ci(e[0])) && (r *= r)) : e = go(e.increment)), zi(t, i ? de(e) ? function(o) {
    return s = e(o), Math.abs(s - o) <= r ? s : o;
  } : function(o) {
    for (var a = parseFloat(s ? o.x : o), l = parseFloat(s ? o.y : 0), u = At, f = 0, d = e.length, h, c; d--; )
      s ? (h = e[d].x - a, c = e[d].y - l, h = h * h + c * c) : h = Math.abs(e[d] - a), h < u && (u = h, f = d);
    return f = !r || u <= r ? e[f] : o, s || f === o || ci(o) ? f : f + $e(o);
  } : go(e));
}, fu = function(e, t, i, r) {
  return zi(He(e) ? !t : i === !0 ? !!(i = 0) : !r, function() {
    return He(e) ? e[~~(Math.random() * e.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((e - i / 2 + Math.random() * (t - e + i * 0.99)) / i) * i * r) / r;
  });
}, ph = function() {
  for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
    t[i] = arguments[i];
  return function(r) {
    return t.reduce(function(s, o) {
      return o(s);
    }, r);
  };
}, gh = function(e, t) {
  return function(i) {
    return e(parseFloat(i)) + (t || $e(i));
  };
}, mh = function(e, t, i) {
  return du(e, t, 0, 1, i);
}, cu = function(e, t, i) {
  return zi(i, function(r) {
    return e[~~t(r)];
  });
}, _h = function n(e, t, i) {
  var r = t - e;
  return He(e) ? cu(e, n(0, e.length), t) : zi(i, function(s) {
    return (r + (s - e) % r) % r + e;
  });
}, vh = function n(e, t, i) {
  var r = t - e, s = r * 2;
  return He(e) ? cu(e, n(0, e.length - 1), t) : zi(i, function(o) {
    return o = (s + (o - e) % s) % s || 0, e + (o > r ? s - o : o);
  });
}, _n = function(e) {
  for (var t = 0, i = "", r, s, o, a; ~(r = e.indexOf("random(", t)); )
    o = e.indexOf(")", r), a = e.charAt(r + 7) === "[", s = e.substr(r + 7, o - r - 7).match(a ? ql : ao), i += e.substr(t, r - t) + fu(a ? s : +s[0], a ? 0 : +s[1], +s[2] || 1e-5), t = o + 1;
  return i + e.substr(t, e.length - t);
}, du = function(e, t, i, r, s) {
  var o = t - e, a = r - i;
  return zi(s, function(l) {
    return i + ((l - e) / o * a || 0);
  });
}, wh = function n(e, t, i, r) {
  var s = isNaN(e + t) ? 0 : function(c) {
    return (1 - c) * e + c * t;
  };
  if (!s) {
    var o = De(e), a = {}, l, u, f, d, h;
    if (i === !0 && (r = 1) && (i = null), o)
      e = {
        p: e
      }, t = {
        p: t
      };
    else if (He(e) && !He(t)) {
      for (f = [], d = e.length, h = d - 2, u = 1; u < d; u++)
        f.push(n(e[u - 1], e[u]));
      d--, s = function(g) {
        g *= d;
        var p = Math.min(h, ~~g);
        return f[p](g - p);
      }, i = t;
    } else
      r || (e = ar(He(e) ? [] : {}, e));
    if (!f) {
      for (l in t)
        Xo.call(a, e, l, "get", t[l]);
      s = function(g) {
        return Ko(g, a) || (o ? e.p : e);
      };
    }
  }
  return zi(i, s);
}, La = function(e, t, i) {
  var r = e.labels, s = At, o, a, l;
  for (o in r)
    a = r[o] - t, a < 0 == !!i && a && s > (a = Math.abs(a)) && (l = o, s = a);
  return l;
}, bt = function(e, t, i) {
  var r = e.vars, s = r[t], o = ce, a = e._ctx, l, u, f;
  if (s)
    return l = r[t + "Params"], u = r.callbackScope || e, i && Pi.length && os(), a && (ce = a), f = l ? s.apply(u, l) : s.call(u), ce = o, f;
}, Zr = function(e) {
  return Ai(e), e.scrollTrigger && e.scrollTrigger.kill(!!Ye), e.progress() < 1 && bt(e, "onInterrupt"), e;
}, br, hu = [], pu = function(e) {
  if (Vo() && e) {
    e = !e.name && e.default || e;
    var t = e.name, i = de(e), r = t && !i && e.init ? function() {
      this._props = [];
    } : e, s = {
      init: mn,
      render: Ko,
      add: Xo,
      kill: Lh,
      modifier: zh,
      rawVars: 0
    }, o = {
      targetTest: 0,
      get: 0,
      getSetter: jo,
      aliases: {},
      register: 0
    };
    if (Nr(), e !== r) {
      if (wt[t])
        return;
      zt(r, zt(as(e, s), o)), ar(r.prototype, ar(s, as(e, o))), wt[r.prop = t] = r, e.targetTest && (Wn.push(r), Yo[t] = 1), t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin";
    }
    Kl(t, r), e.register && e.register(dt, r, ft);
  } else
    e && hu.push(e);
}, ie = 255, Qr = {
  aqua: [0, ie, ie],
  lime: [0, ie, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, ie],
  navy: [0, 0, 128],
  white: [ie, ie, ie],
  olive: [128, 128, 0],
  yellow: [ie, ie, 0],
  orange: [ie, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [ie, 0, 0],
  pink: [ie, 192, 203],
  cyan: [0, ie, ie],
  transparent: [ie, ie, ie, 0]
}, Ls = function(e, t, i) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? t + (i - t) * e * 6 : e < 0.5 ? i : e * 3 < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) * ie + 0.5 | 0;
}, gu = function(e, t, i) {
  var r = e ? ci(e) ? [e >> 16, e >> 8 & ie, e & ie] : 0 : Qr.black, s, o, a, l, u, f, d, h, c, g;
  if (!r) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Qr[e])
      r = Qr[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (s = e.charAt(1), o = e.charAt(2), a = e.charAt(3), e = "#" + s + s + o + o + a + a + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return r = parseInt(e.substr(1, 6), 16), [r >> 16, r >> 8 & ie, r & ie, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), r = [e >> 16, e >> 8 & ie, e & ie];
    } else if (e.substr(0, 3) === "hsl") {
      if (r = g = e.match(ao), !t)
        l = +r[0] % 360 / 360, u = +r[1] / 100, f = +r[2] / 100, o = f <= 0.5 ? f * (u + 1) : f + u - f * u, s = f * 2 - o, r.length > 3 && (r[3] *= 1), r[0] = Ls(l + 1 / 3, s, o), r[1] = Ls(l, s, o), r[2] = Ls(l - 1 / 3, s, o);
      else if (~e.indexOf("="))
        return r = e.match(Wl), i && r.length < 4 && (r[3] = 1), r;
    } else
      r = e.match(ao) || Qr.transparent;
    r = r.map(Number);
  }
  return t && !g && (s = r[0] / ie, o = r[1] / ie, a = r[2] / ie, d = Math.max(s, o, a), h = Math.min(s, o, a), f = (d + h) / 2, d === h ? l = u = 0 : (c = d - h, u = f > 0.5 ? c / (2 - d - h) : c / (d + h), l = d === s ? (o - a) / c + (o < a ? 6 : 0) : d === o ? (a - s) / c + 2 : (s - o) / c + 4, l *= 60), r[0] = ~~(l + 0.5), r[1] = ~~(u * 100 + 0.5), r[2] = ~~(f * 100 + 0.5)), i && r.length < 4 && (r[3] = 1), r;
}, mu = function(e) {
  var t = [], i = [], r = -1;
  return e.split(Ci).forEach(function(s) {
    var o = s.match(xr) || [];
    t.push.apply(t, o), i.push(r += o.length + 1);
  }), t.c = i, t;
}, Ra = function(e, t, i) {
  var r = "", s = (e + r).match(Ci), o = t ? "hsla(" : "rgba(", a = 0, l, u, f, d;
  if (!s)
    return e;
  if (s = s.map(function(h) {
    return (h = gu(h, t, 1)) && o + (t ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3] : h.join(",")) + ")";
  }), i && (f = mu(e), l = i.c, l.join(r) !== f.c.join(r)))
    for (u = e.replace(Ci, "1").split(xr), d = u.length - 1; a < d; a++)
      r += u[a] + (~l.indexOf(a) ? s.shift() || o + "0,0,0,0)" : (f.length ? f : s.length ? s : i).shift());
  if (!u)
    for (u = e.split(Ci), d = u.length - 1; a < d; a++)
      r += u[a] + s[a];
  return r + u[d];
}, Ci = function() {
  var n = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in Qr)
    n += "|" + e + "\\b";
  return new RegExp(n + ")", "gi");
}(), yh = /hsl[a]?\(/, _u = function(e) {
  var t = e.join(" "), i;
  if (Ci.lastIndex = 0, Ci.test(t))
    return i = yh.test(t), e[1] = Ra(e[1], i), e[0] = Ra(e[0], i, mu(e[1])), !0;
}, vn, yt = function() {
  var n = Date.now, e = 500, t = 33, i = n(), r = i, s = 1e3 / 240, o = s, a = [], l, u, f, d, h, c, g = function p(m) {
    var _ = n() - r, w = m === !0, y, v, T, C;
    if (_ > e && (i += _ - t), r += _, T = r - i, y = T - o, (y > 0 || w) && (C = ++d.frame, h = T - d.time * 1e3, d.time = T = T / 1e3, o += y + (y >= s ? 4 : s - y), v = 1), w || (l = u(p)), v)
      for (c = 0; c < a.length; c++)
        a[c](T, h, C, m);
  };
  return d = {
    time: 0,
    frame: 0,
    tick: function() {
      g(!0);
    },
    deltaRatio: function(m) {
      return h / (1e3 / (m || 60));
    },
    wake: function() {
      Ul && (!lo && Vo() && (Ct = lo = window, Go = Ct.document || {}, St.gsap = dt, (Ct.gsapVersions || (Ct.gsapVersions = [])).push(dt.version), jl(ss || Ct.GreenSockGlobals || !Ct.gsap && Ct || {}), f = Ct.requestAnimationFrame, hu.forEach(pu)), l && d.sleep(), u = f || function(m) {
        return setTimeout(m, o - d.time * 1e3 + 1 | 0);
      }, vn = 1, g(2));
    },
    sleep: function() {
      (f ? Ct.cancelAnimationFrame : clearTimeout)(l), vn = 0, u = mn;
    },
    lagSmoothing: function(m, _) {
      e = m || 1 / 0, t = Math.min(_ || 33, e);
    },
    fps: function(m) {
      s = 1e3 / (m || 240), o = d.time * 1e3 + s;
    },
    add: function(m, _, w) {
      var y = _ ? function(v, T, C, S) {
        m(v, T, C, S), d.remove(y);
      } : m;
      return d.remove(m), a[w ? "unshift" : "push"](y), Nr(), y;
    },
    remove: function(m, _) {
      ~(_ = a.indexOf(m)) && a.splice(_, 1) && c >= _ && c--;
    },
    _listeners: a
  }, d;
}(), Nr = function() {
  return !vn && yt.wake();
}, U = {}, xh = /^[\d.\-M][\d.\-,\s]/, bh = /["']/g, Th = function(e) {
  for (var t = {}, i = e.substr(1, e.length - 3).split(":"), r = i[0], s = 1, o = i.length, a, l, u; s < o; s++)
    l = i[s], a = s !== o - 1 ? l.lastIndexOf(",") : l.length, u = l.substr(0, a), t[r] = isNaN(u) ? u.replace(bh, "").trim() : +u, r = l.substr(a + 1).trim();
  return t;
}, Sh = function(e) {
  var t = e.indexOf("(") + 1, i = e.indexOf(")"), r = e.indexOf("(", t);
  return e.substring(t, ~r && r < i ? e.indexOf(")", i + 1) : i);
}, Eh = function(e) {
  var t = (e + "").split("("), i = U[t[0]];
  return i && t.length > 1 && i.config ? i.config.apply(null, ~e.indexOf("{") ? [Th(t[1])] : Sh(e).split(",").map(eu)) : U._CE && xh.test(e) ? U._CE("", e) : i;
}, vu = function(e) {
  return function(t) {
    return 1 - e(1 - t);
  };
}, wu = function n(e, t) {
  for (var i = e._first, r; i; )
    i instanceof tt ? n(i, t) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== t && (i.timeline ? n(i.timeline, t) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = t)), i = i._next;
}, ir = function(e, t) {
  return e && (de(e) ? e : U[e] || Eh(e)) || t;
}, dr = function(e, t, i, r) {
  i === void 0 && (i = function(l) {
    return 1 - t(1 - l);
  }), r === void 0 && (r = function(l) {
    return l < 0.5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2;
  });
  var s = {
    easeIn: t,
    easeOut: i,
    easeInOut: r
  }, o;
  return ut(e, function(a) {
    U[a] = St[a] = s, U[o = a.toLowerCase()] = i;
    for (var l in s)
      U[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = U[a + "." + l] = s[l];
  }), s;
}, yu = function(e) {
  return function(t) {
    return t < 0.5 ? (1 - e(1 - t * 2)) / 2 : 0.5 + e((t - 0.5) * 2) / 2;
  };
}, Rs = function n(e, t, i) {
  var r = t >= 1 ? t : 1, s = (i || (e ? 0.3 : 0.45)) / (t < 1 ? t : 1), o = s / oo * (Math.asin(1 / r) || 0), a = function(f) {
    return f === 1 ? 1 : r * Math.pow(2, -10 * f) * Jd((f - o) * s) + 1;
  }, l = e === "out" ? a : e === "in" ? function(u) {
    return 1 - a(1 - u);
  } : yu(a);
  return s = oo / s, l.config = function(u, f) {
    return n(e, u, f);
  }, l;
}, Fs = function n(e, t) {
  t === void 0 && (t = 1.70158);
  var i = function(o) {
    return o ? --o * o * ((t + 1) * o + t) + 1 : 0;
  }, r = e === "out" ? i : e === "in" ? function(s) {
    return 1 - i(1 - s);
  } : yu(i);
  return r.config = function(s) {
    return n(e, s);
  }, r;
};
ut("Linear,Quad,Cubic,Quart,Quint,Strong", function(n, e) {
  var t = e < 5 ? e + 1 : e;
  dr(n + ",Power" + (t - 1), e ? function(i) {
    return Math.pow(i, t);
  } : function(i) {
    return i;
  }, function(i) {
    return 1 - Math.pow(1 - i, t);
  }, function(i) {
    return i < 0.5 ? Math.pow(i * 2, t) / 2 : 1 - Math.pow((1 - i) * 2, t) / 2;
  });
});
U.Linear.easeNone = U.none = U.Linear.easeIn;
dr("Elastic", Rs("in"), Rs("out"), Rs());
(function(n, e) {
  var t = 1 / e, i = 2 * t, r = 2.5 * t, s = function(a) {
    return a < t ? n * a * a : a < i ? n * Math.pow(a - 1.5 / e, 2) + 0.75 : a < r ? n * (a -= 2.25 / e) * a + 0.9375 : n * Math.pow(a - 2.625 / e, 2) + 0.984375;
  };
  dr("Bounce", function(o) {
    return 1 - s(1 - o);
  }, s);
})(7.5625, 2.75);
dr("Expo", function(n) {
  return n ? Math.pow(2, 10 * (n - 1)) : 0;
});
dr("Circ", function(n) {
  return -(Yl(1 - n * n) - 1);
});
dr("Sine", function(n) {
  return n === 1 ? 1 : -Qd(n * Kd) + 1;
});
dr("Back", Fs("in"), Fs("out"), Fs());
U.SteppedEase = U.steps = St.SteppedEase = {
  config: function(e, t) {
    e === void 0 && (e = 1);
    var i = 1 / e, r = e + (t ? 0 : 1), s = t ? 1 : 0, o = 1 - re;
    return function(a) {
      return ((r * Sn(0, o, a) | 0) + s) * i;
    };
  }
};
Lr.ease = U["quad.out"];
ut("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(n) {
  return Ho += n + "," + n + "Params,";
});
var xu = function(e, t) {
  this.id = Zd++, e._gsap = this, this.target = e, this.harness = t, this.get = t ? t.get : Ql, this.set = t ? t.getSetter : jo;
}, wn = /* @__PURE__ */ function() {
  function n(t) {
    this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Fr(this, +t.duration, 1, 1), this.data = t.data, ce && (this._ctx = ce, ce.data.push(this)), vn || yt.wake();
  }
  var e = n.prototype;
  return e.delay = function(i) {
    return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay), this._delay = i, this) : this._delay;
  }, e.duration = function(i) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(i) {
    return arguments.length ? (this._dirty = 0, Fr(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(i, r) {
    if (Nr(), !arguments.length)
      return this._tTime;
    var s = this._dp;
    if (s && s.smoothChildTiming && this._ts) {
      for (xs(this, i), !s._dp || s.parent || ru(s, this); s && s.parent; )
        s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0), s = s.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && Kt(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === re || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i), Jl(this, i, r)), this;
  }, e.time = function(i, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Ia(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time;
  }, e.totalProgress = function(i, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() > 0 ? 1 : 0;
  }, e.progress = function(i, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Ia(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(i, r) {
    var s = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (i - 1) * s, r) : this._repeat ? Rr(this._tTime, s) + 1 : 1;
  }, e.timeScale = function(i, r) {
    if (!arguments.length)
      return this._rts === -re ? 0 : this._rts;
    if (this._rts === i)
      return this;
    var s = this.parent && this._ts ? ls(this.parent._time, this) : this._tTime;
    return this._rts = +i || 0, this._ts = this._ps || i === -re ? 0 : this._rts, this.totalTime(Sn(-Math.abs(this._delay), this._tDur, s), r !== !1), ys(this), oh(this);
  }, e.paused = function(i) {
    return arguments.length ? (this._ps !== i && (this._ps = i, i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Nr(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== re && (this._tTime -= re)))), this) : this._ps;
  }, e.startTime = function(i) {
    if (arguments.length) {
      this._start = i;
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && Kt(r, this, i - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(i) {
    return this._start + (lt(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(i) {
    var r = this.parent || this._dp;
    return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ls(r.rawTime(i), this) : this._tTime : this._tTime;
  }, e.revert = function(i) {
    i === void 0 && (i = ih);
    var r = Ye;
    return Ye = i, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(i), this.totalTime(-0.01, i.suppressEvents)), this.data !== "nested" && i.kill !== !1 && this.kill(), Ye = r, this;
  }, e.globalTime = function(i) {
    for (var r = this, s = arguments.length ? i : r.rawTime(); r; )
      s = r._start + s / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(i) : s;
  }, e.repeat = function(i) {
    return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i, za(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(i) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = i, za(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(i) {
    return arguments.length ? (this._yoyo = i, this) : this._yoyo;
  }, e.seek = function(i, r) {
    return this.totalTime(Pt(this, i), lt(r));
  }, e.restart = function(i, r) {
    return this.play().totalTime(i ? -this._delay : 0, lt(r));
  }, e.play = function(i, r) {
    return i != null && this.seek(i, r), this.reversed(!1).paused(!1);
  }, e.reverse = function(i, r) {
    return i != null && this.seek(i || this.totalDuration(), r), this.reversed(!0).paused(!1);
  }, e.pause = function(i, r) {
    return i != null && this.seek(i, r), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(i) {
    return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -re : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -re, this;
  }, e.isActive = function() {
    var i = this.parent || this._dp, r = this._start, s;
    return !!(!i || this._ts && this._initted && i.isActive() && (s = i.rawTime(!0)) >= r && s < this.endTime(!0) - re);
  }, e.eventCallback = function(i, r, s) {
    var o = this.vars;
    return arguments.length > 1 ? (r ? (o[i] = r, s && (o[i + "Params"] = s), i === "onUpdate" && (this._onUpdate = r)) : delete o[i], this) : o[i];
  }, e.then = function(i) {
    var r = this;
    return new Promise(function(s) {
      var o = de(i) ? i : tu, a = function() {
        var u = r.then;
        r.then = null, de(o) && (o = o(r)) && (o.then || o === r) && (r.then = u), s(o), r.then = u;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? a() : r._prom = a;
    });
  }, e.kill = function() {
    Zr(this);
  }, n;
}();
zt(wn.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -re,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var tt = /* @__PURE__ */ function(n) {
  $l(e, n);
  function e(i, r) {
    var s;
    return i === void 0 && (i = {}), s = n.call(this, i) || this, s.labels = {}, s.smoothChildTiming = !!i.smoothChildTiming, s.autoRemoveChildren = !!i.autoRemoveChildren, s._sort = lt(i.sortChildren), le && Kt(i.parent || le, oi(s), r), i.reversed && s.reverse(), i.paused && s.paused(!0), i.scrollTrigger && nu(oi(s), i.scrollTrigger), s;
  }
  var t = e.prototype;
  return t.to = function(r, s, o) {
    return nn(0, arguments, this), this;
  }, t.from = function(r, s, o) {
    return nn(1, arguments, this), this;
  }, t.fromTo = function(r, s, o, a) {
    return nn(2, arguments, this), this;
  }, t.set = function(r, s, o) {
    return s.duration = 0, s.parent = this, rn(s).repeatDelay || (s.repeat = 0), s.immediateRender = !!s.immediateRender, new xe(r, s, Pt(this, o), 1), this;
  }, t.call = function(r, s, o) {
    return Kt(this, xe.delayedCall(0, r, s), o);
  }, t.staggerTo = function(r, s, o, a, l, u, f) {
    return o.duration = s, o.stagger = o.stagger || a, o.onComplete = u, o.onCompleteParams = f, o.parent = this, new xe(r, o, Pt(this, l)), this;
  }, t.staggerFrom = function(r, s, o, a, l, u, f) {
    return o.runBackwards = 1, rn(o).immediateRender = lt(o.immediateRender), this.staggerTo(r, s, o, a, l, u, f);
  }, t.staggerFromTo = function(r, s, o, a, l, u, f, d) {
    return a.startAt = o, rn(a).immediateRender = lt(a.immediateRender), this.staggerTo(r, s, a, l, u, f, d);
  }, t.render = function(r, s, o) {
    var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, u = this._dur, f = r <= 0 ? 0 : Ae(r), d = this._zTime < 0 != r < 0 && (this._initted || !u), h, c, g, p, m, _, w, y, v, T, C, S;
    if (this !== le && f > l && r >= 0 && (f = l), f !== this._tTime || o || d) {
      if (a !== this._time && u && (f += this._time - a, r += this._time - a), h = f, v = this._start, y = this._ts, _ = !y, d && (u || (a = this._zTime), (r || !s) && (this._zTime = r)), this._repeat) {
        if (C = this._yoyo, m = u + this._rDelay, this._repeat < -1 && r < 0)
          return this.totalTime(m * 100 + r, s, o);
        if (h = Ae(f % m), f === l ? (p = this._repeat, h = u) : (p = ~~(f / m), p && p === f / m && (h = u, p--), h > u && (h = u)), T = Rr(this._tTime, m), !a && this._tTime && T !== p && this._tTime - T * m - this._dur <= 0 && (T = p), C && p & 1 && (h = u - h, S = 1), p !== T && !this._lock) {
          var M = C && T & 1, P = M === (C && p & 1);
          if (p < T && (M = !M), a = M ? 0 : f % u ? u : f, this._lock = 1, this.render(a || (S ? 0 : Ae(p * m)), s, !u)._lock = 0, this._tTime = f, !s && this.parent && bt(this, "onRepeat"), this.vars.repeatRefresh && !S && (this.invalidate()._lock = 1), a && a !== this._time || _ !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (u = this._dur, l = this._tDur, P && (this._lock = 2, a = M ? u : -1e-4, this.render(a, !0), this.vars.repeatRefresh && !S && this.invalidate()), this._lock = 0, !this._ts && !_)
            return this;
          wu(this, S);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (w = fh(this, Ae(a), Ae(h)), w && (f -= h - (h = w._start))), this._tTime = f, this._time = h, this._act = !y, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, a = 0), !a && h && !s && !p && (bt(this, "onStart"), this._tTime !== f))
        return this;
      if (h >= a && r >= 0)
        for (c = this._first; c; ) {
          if (g = c._next, (c._act || h >= c._start) && c._ts && w !== c) {
            if (c.parent !== this)
              return this.render(r, s, o);
            if (c.render(c._ts > 0 ? (h - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (h - c._start) * c._ts, s, o), h !== this._time || !this._ts && !_) {
              w = 0, g && (f += this._zTime = -re);
              break;
            }
          }
          c = g;
        }
      else {
        c = this._last;
        for (var b = r < 0 ? r : h; c; ) {
          if (g = c._prev, (c._act || b <= c._end) && c._ts && w !== c) {
            if (c.parent !== this)
              return this.render(r, s, o);
            if (c.render(c._ts > 0 ? (b - c._start) * c._ts : (c._dirty ? c.totalDuration() : c._tDur) + (b - c._start) * c._ts, s, o || Ye && (c._initted || c._startAt)), h !== this._time || !this._ts && !_) {
              w = 0, g && (f += this._zTime = b ? -re : re);
              break;
            }
          }
          c = g;
        }
      }
      if (w && !s && (this.pause(), w.render(h >= a ? 0 : -re)._zTime = h >= a ? 1 : -1, this._ts))
        return this._start = v, ys(this), this.render(r, s, o);
      this._onUpdate && !s && bt(this, "onUpdate", !0), (f === l && this._tTime >= this.totalDuration() || !f && a) && (v === this._start || Math.abs(y) !== Math.abs(this._ts)) && (this._lock || ((r || !u) && (f === l && this._ts > 0 || !f && this._ts < 0) && Ai(this, 1), !s && !(r < 0 && !a) && (f || a || !l) && (bt(this, f === l && r >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(f < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, t.add = function(r, s) {
    var o = this;
    if (ci(s) || (s = Pt(this, s, r)), !(r instanceof wn)) {
      if (He(r))
        return r.forEach(function(a) {
          return o.add(a, s);
        }), this;
      if (De(r))
        return this.addLabel(r, s);
      if (de(r))
        r = xe.delayedCall(0, r);
      else
        return this;
    }
    return this !== r ? Kt(this, r, s) : this;
  }, t.getChildren = function(r, s, o, a) {
    r === void 0 && (r = !0), s === void 0 && (s = !0), o === void 0 && (o = !0), a === void 0 && (a = -At);
    for (var l = [], u = this._first; u; )
      u._start >= a && (u instanceof xe ? s && l.push(u) : (o && l.push(u), r && l.push.apply(l, u.getChildren(!0, s, o)))), u = u._next;
    return l;
  }, t.getById = function(r) {
    for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
      if (s[o].vars.id === r)
        return s[o];
  }, t.remove = function(r) {
    return De(r) ? this.removeLabel(r) : de(r) ? this.killTweensOf(r) : (ws(this, r), r === this._recent && (this._recent = this._last), tr(this));
  }, t.totalTime = function(r, s) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Ae(yt.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), n.prototype.totalTime.call(this, r, s), this._forcing = 0, this) : this._tTime;
  }, t.addLabel = function(r, s) {
    return this.labels[r] = Pt(this, s), this;
  }, t.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, t.addPause = function(r, s, o) {
    var a = xe.delayedCall(0, s || mn, o);
    return a.data = "isPause", this._hasPause = 1, Kt(this, a, Pt(this, r));
  }, t.removePause = function(r) {
    var s = this._first;
    for (r = Pt(this, r); s; )
      s._start === r && s.data === "isPause" && Ai(s), s = s._next;
  }, t.killTweensOf = function(r, s, o) {
    for (var a = this.getTweensOf(r, o), l = a.length; l--; )
      xi !== a[l] && a[l].kill(r, s);
    return this;
  }, t.getTweensOf = function(r, s) {
    for (var o = [], a = Dt(r), l = this._first, u = ci(s), f; l; )
      l instanceof xe ? rh(l._targets, a) && (u ? (!xi || l._initted && l._ts) && l.globalTime(0) <= s && l.globalTime(l.totalDuration()) > s : !s || l.isActive()) && o.push(l) : (f = l.getTweensOf(a, s)).length && o.push.apply(o, f), l = l._next;
    return o;
  }, t.tweenTo = function(r, s) {
    s = s || {};
    var o = this, a = Pt(o, r), l = s, u = l.startAt, f = l.onStart, d = l.onStartParams, h = l.immediateRender, c, g = xe.to(o, zt({
      ease: s.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: a,
      overwrite: "auto",
      duration: s.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale()) || re,
      onStart: function() {
        if (o.pause(), !c) {
          var m = s.duration || Math.abs((a - (u && "time" in u ? u.time : o._time)) / o.timeScale());
          g._dur !== m && Fr(g, m, 0, 1).render(g._time, !0, !0), c = 1;
        }
        f && f.apply(g, d || []);
      }
    }, s));
    return h ? g.render(0) : g;
  }, t.tweenFromTo = function(r, s, o) {
    return this.tweenTo(s, zt({
      startAt: {
        time: Pt(this, r)
      }
    }, o));
  }, t.recent = function() {
    return this._recent;
  }, t.nextLabel = function(r) {
    return r === void 0 && (r = this._time), La(this, Pt(this, r));
  }, t.previousLabel = function(r) {
    return r === void 0 && (r = this._time), La(this, Pt(this, r), 1);
  }, t.currentLabel = function(r) {
    return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + re);
  }, t.shiftChildren = function(r, s, o) {
    o === void 0 && (o = 0);
    for (var a = this._first, l = this.labels, u; a; )
      a._start >= o && (a._start += r, a._end += r), a = a._next;
    if (s)
      for (u in l)
        l[u] >= o && (l[u] += r);
    return tr(this);
  }, t.invalidate = function(r) {
    var s = this._first;
    for (this._lock = 0; s; )
      s.invalidate(r), s = s._next;
    return n.prototype.invalidate.call(this, r);
  }, t.clear = function(r) {
    r === void 0 && (r = !0);
    for (var s = this._first, o; s; )
      o = s._next, this.remove(s), s = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), tr(this);
  }, t.totalDuration = function(r) {
    var s = 0, o = this, a = o._last, l = At, u, f, d;
    if (arguments.length)
      return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -r : r));
    if (o._dirty) {
      for (d = o.parent; a; )
        u = a._prev, a._dirty && a.totalDuration(), f = a._start, f > l && o._sort && a._ts && !o._lock ? (o._lock = 1, Kt(o, a, f - a._delay, 1)._lock = 0) : l = f, f < 0 && a._ts && (s -= f, (!d && !o._dp || d && d.smoothChildTiming) && (o._start += f / o._ts, o._time -= f, o._tTime -= f), o.shiftChildren(-f, !1, -1 / 0), l = 0), a._end > s && a._ts && (s = a._end), a = u;
      Fr(o, o === le && o._time > s ? o._time : s, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, e.updateRoot = function(r) {
    if (le._ts && (Jl(le, ls(r, le)), Zl = yt.frame), yt.frame >= Aa) {
      Aa += Tt.autoSleep || 120;
      var s = le._first;
      if ((!s || !s._ts) && Tt.autoSleep && yt._listeners.length < 2) {
        for (; s && !s._ts; )
          s = s._next;
        s || yt.sleep();
      }
    }
  }, e;
}(wn);
zt(tt.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Ph = function(e, t, i, r, s, o, a) {
  var l = new ft(this._pt, e, t, 0, 1, Cu, null, s), u = 0, f = 0, d, h, c, g, p, m, _, w;
  for (l.b = i, l.e = r, i += "", r += "", (_ = ~r.indexOf("random(")) && (r = _n(r)), o && (w = [i, r], o(w, e, t), i = w[0], r = w[1]), h = i.match(Is) || []; d = Is.exec(r); )
    g = d[0], p = r.substring(u, d.index), c ? c = (c + 1) % 5 : p.substr(-5) === "rgba(" && (c = 1), g !== h[f++] && (m = parseFloat(h[f - 1]) || 0, l._pt = {
      _next: l._pt,
      p: p || f === 1 ? p : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: m,
      c: g.charAt(1) === "=" ? Cr(m, g) - m : parseFloat(g) - m,
      m: c && c < 4 ? Math.round : 0
    }, u = Is.lastIndex);
  return l.c = u < r.length ? r.substring(u, r.length) : "", l.fp = a, (Xl.test(r) || _) && (l.e = 0), this._pt = l, l;
}, Xo = function(e, t, i, r, s, o, a, l, u, f) {
  de(r) && (r = r(s || 0, e, o));
  var d = e[t], h = i !== "get" ? i : de(d) ? u ? e[t.indexOf("set") || !de(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](u) : e[t]() : d, c = de(d) ? u ? Ah : Eu : Uo, g;
  if (De(r) && (~r.indexOf("random(") && (r = _n(r)), r.charAt(1) === "=" && (g = Cr(h, r) + ($e(h) || 0), (g || g === 0) && (r = g))), !f || h !== r || mo)
    return !isNaN(h * r) && r !== "" ? (g = new ft(this._pt, e, t, +h || 0, r - (h || 0), typeof d == "boolean" ? Ih : Pu, 0, c), u && (g.fp = u), a && g.modifier(a, this, e), this._pt = g) : (!d && !(t in e) && $o(t, r), Ph.call(this, e, t, h, r, c, l || Tt.stringFilter, u));
}, Ch = function(e, t, i, r, s) {
  if (de(e) && (e = sn(e, s, t, i, r)), !ii(e) || e.style && e.nodeType || He(e) || Hl(e))
    return De(e) ? sn(e, s, t, i, r) : e;
  var o = {}, a;
  for (a in e)
    o[a] = sn(e[a], s, t, i, r);
  return o;
}, bu = function(e, t, i, r, s, o) {
  var a, l, u, f;
  if (wt[e] && (a = new wt[e]()).init(s, a.rawVars ? t[e] : Ch(t[e], r, s, o, i), i, r, o) !== !1 && (i._pt = l = new ft(i._pt, s, e, 0, 1, a.render, a, 0, a.priority), i !== br))
    for (u = i._ptLookup[i._targets.indexOf(s)], f = a._props.length; f--; )
      u[a._props[f]] = l;
  return a;
}, xi, mo, qo = function n(e, t, i) {
  var r = e.vars, s = r.ease, o = r.startAt, a = r.immediateRender, l = r.lazy, u = r.onUpdate, f = r.runBackwards, d = r.yoyoEase, h = r.keyframes, c = r.autoRevert, g = e._dur, p = e._startAt, m = e._targets, _ = e.parent, w = _ && _.data === "nested" ? _.vars.targets : m, y = e._overwrite === "auto" && !No, v = e.timeline, T, C, S, M, P, b, O, k, A, z, L, B, F;
  if (v && (!h || !s) && (s = "none"), e._ease = ir(s, Lr.ease), e._yEase = d ? vu(ir(d === !0 ? s : d, Lr.ease)) : 0, d && e._yoyo && !e._repeat && (d = e._yEase, e._yEase = e._ease, e._ease = d), e._from = !v && !!r.runBackwards, !v || h && !r.stagger) {
    if (k = m[0] ? er(m[0]).harness : 0, B = k && r[k.prop], T = as(r, Yo), p && (p._zTime < 0 && p.progress(1), t < 0 && f && a && !c ? p.render(-1, !0) : p.revert(f && g ? Hn : th), p._lazy = 0), o) {
      if (Ai(e._startAt = xe.set(m, zt({
        data: "isStart",
        overwrite: !1,
        parent: _,
        immediateRender: !0,
        lazy: !p && lt(l),
        startAt: null,
        delay: 0,
        onUpdate: u && function() {
          return bt(e, "onUpdate");
        },
        stagger: 0
      }, o))), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (Ye || !a && !c) && e._startAt.revert(Hn), a && g && t <= 0 && i <= 0) {
        t && (e._zTime = t);
        return;
      }
    } else if (f && g && !p) {
      if (t && (a = !1), S = zt({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: a && !p && lt(l),
        immediateRender: a,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: _
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, T), B && (S[k.prop] = B), Ai(e._startAt = xe.set(m, S)), e._startAt._dp = 0, e._startAt._sat = e, t < 0 && (Ye ? e._startAt.revert(Hn) : e._startAt.render(-1, !0)), e._zTime = t, !a)
        n(e._startAt, re, re);
      else if (!t)
        return;
    }
    for (e._pt = e._ptCache = 0, l = g && lt(l) || l && !g, C = 0; C < m.length; C++) {
      if (P = m[C], O = P._gsap || Wo(m)[C]._gsap, e._ptLookup[C] = z = {}, uo[O.id] && Pi.length && os(), L = w === m ? C : w.indexOf(P), k && (A = new k()).init(P, B || T, e, L, w) !== !1 && (e._pt = M = new ft(e._pt, P, A.name, 0, 1, A.render, A, 0, A.priority), A._props.forEach(function(X) {
        z[X] = M;
      }), A.priority && (b = 1)), !k || B)
        for (S in T)
          wt[S] && (A = bu(S, T, e, L, P, w)) ? A.priority && (b = 1) : z[S] = M = Xo.call(e, P, S, "get", T[S], L, w, 0, r.stringFilter);
      e._op && e._op[C] && e.kill(P, e._op[C]), y && e._pt && (xi = e, le.killTweensOf(P, z, e.globalTime(t)), F = !e.parent, xi = 0), e._pt && l && (uo[O.id] = 1);
    }
    b && Mu(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = u, e._initted = (!e._op || e._pt) && !F, h && t <= 0 && v.render(At, !0, !0);
}, Mh = function(e, t, i, r, s, o, a, l) {
  var u = (e._pt && e._ptCache || (e._ptCache = {}))[t], f, d, h, c;
  if (!u)
    for (u = e._ptCache[t] = [], h = e._ptLookup, c = e._targets.length; c--; ) {
      if (f = h[c][t], f && f.d && f.d._pt)
        for (f = f.d._pt; f && f.p !== t && f.fp !== t; )
          f = f._next;
      if (!f)
        return mo = 1, e.vars[t] = "+=0", qo(e, a), mo = 0, l ? gn(t + " not eligible for reset") : 1;
      u.push(f);
    }
  for (c = u.length; c--; )
    d = u[c], f = d._pt || d, f.s = (r || r === 0) && !s ? r : f.s + (r || 0) + o * f.c, f.c = i - f.s, d.e && (d.e = ge(i) + $e(d.e)), d.b && (d.b = f.s + $e(d.b));
}, kh = function(e, t) {
  var i = e[0] ? er(e[0]).harness : 0, r = i && i.aliases, s, o, a, l;
  if (!r)
    return t;
  s = ar({}, t);
  for (o in r)
    if (o in s)
      for (l = r[o].split(","), a = l.length; a--; )
        s[l[a]] = s[o];
  return s;
}, Oh = function(e, t, i, r) {
  var s = t.ease || r || "power1.inOut", o, a;
  if (He(t))
    a = i[e] || (i[e] = []), t.forEach(function(l, u) {
      return a.push({
        t: u / (t.length - 1) * 100,
        v: l,
        e: s
      });
    });
  else
    for (o in t)
      a = i[o] || (i[o] = []), o === "ease" || a.push({
        t: parseFloat(e),
        v: t[o],
        e: s
      });
}, sn = function(e, t, i, r, s) {
  return de(e) ? e.call(t, i, r, s) : De(e) && ~e.indexOf("random(") ? _n(e) : e;
}, Tu = Ho + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Su = {};
ut(Tu + ",id,stagger,delay,duration,paused,scrollTrigger", function(n) {
  return Su[n] = 1;
});
var xe = /* @__PURE__ */ function(n) {
  $l(e, n);
  function e(i, r, s, o) {
    var a;
    typeof r == "number" && (s.duration = r, r = s, s = null), a = n.call(this, o ? r : rn(r)) || this;
    var l = a.vars, u = l.duration, f = l.delay, d = l.immediateRender, h = l.stagger, c = l.overwrite, g = l.keyframes, p = l.defaults, m = l.scrollTrigger, _ = l.yoyoEase, w = r.parent || le, y = (He(i) || Hl(i) ? ci(i[0]) : "length" in r) ? [i] : Dt(i), v, T, C, S, M, P, b, O;
    if (a._targets = y.length ? Wo(y) : gn("GSAP target " + i + " not found. https://gsap.com", !Tt.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = c, g || h || kn(u) || kn(f)) {
      if (r = a.vars, v = a.timeline = new tt({
        data: "nested",
        defaults: p || {},
        targets: w && w.data === "nested" ? w.vars.targets : y
      }), v.kill(), v.parent = v._dp = oi(a), v._start = 0, h || kn(u) || kn(f)) {
        if (S = y.length, b = h && lu(h), ii(h))
          for (M in h)
            ~Tu.indexOf(M) && (O || (O = {}), O[M] = h[M]);
        for (T = 0; T < S; T++)
          C = as(r, Su), C.stagger = 0, _ && (C.yoyoEase = _), O && ar(C, O), P = y[T], C.duration = +sn(u, oi(a), T, P, y), C.delay = (+sn(f, oi(a), T, P, y) || 0) - a._delay, !h && S === 1 && C.delay && (a._delay = f = C.delay, a._start += f, C.delay = 0), v.to(P, C, b ? b(T, P, y) : 0), v._ease = U.none;
        v.duration() ? u = f = 0 : a.timeline = 0;
      } else if (g) {
        rn(zt(v.vars.defaults, {
          ease: "none"
        })), v._ease = ir(g.ease || r.ease || "none");
        var k = 0, A, z, L;
        if (He(g))
          g.forEach(function(B) {
            return v.to(y, B, ">");
          }), v.duration();
        else {
          C = {};
          for (M in g)
            M === "ease" || M === "easeEach" || Oh(M, g[M], C, g.easeEach);
          for (M in C)
            for (A = C[M].sort(function(B, F) {
              return B.t - F.t;
            }), k = 0, T = 0; T < A.length; T++)
              z = A[T], L = {
                ease: z.e,
                duration: (z.t - (T ? A[T - 1].t : 0)) / 100 * u
              }, L[M] = z.v, v.to(y, L, k), k += L.duration;
          v.duration() < u && v.to({}, {
            duration: u - v.duration()
          });
        }
      }
      u || a.duration(u = v.duration());
    } else
      a.timeline = 0;
    return c === !0 && !No && (xi = oi(a), le.killTweensOf(y), xi = 0), Kt(w, oi(a), s), r.reversed && a.reverse(), r.paused && a.paused(!0), (d || !u && !g && a._start === Ae(w._time) && lt(d) && ah(oi(a)) && w.data !== "nested") && (a._tTime = -re, a.render(Math.max(0, -f) || 0)), m && nu(oi(a), m), a;
  }
  var t = e.prototype;
  return t.render = function(r, s, o) {
    var a = this._time, l = this._tDur, u = this._dur, f = r < 0, d = r > l - re && !f ? l : r < re ? 0 : r, h, c, g, p, m, _, w, y, v;
    if (!u)
      uh(this, r, s, o);
    else if (d !== this._tTime || !r || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== f) {
      if (h = d, y = this.timeline, this._repeat) {
        if (p = u + this._rDelay, this._repeat < -1 && f)
          return this.totalTime(p * 100 + r, s, o);
        if (h = Ae(d % p), d === l ? (g = this._repeat, h = u) : (g = ~~(d / p), g && g === Ae(d / p) && (h = u, g--), h > u && (h = u)), _ = this._yoyo && g & 1, _ && (v = this._yEase, h = u - h), m = Rr(this._tTime, p), h === a && !o && this._initted && g === m)
          return this._tTime = d, this;
        g !== m && (y && this._yEase && wu(y, _), this.vars.repeatRefresh && !_ && !this._lock && this._time !== u && this._initted && (this._lock = o = 1, this.render(Ae(p * g), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (su(this, f ? r : h, o, s, d))
          return this._tTime = 0, this;
        if (a !== this._time && !(o && this.vars.repeatRefresh && g !== m))
          return this;
        if (u !== this._dur)
          return this.render(r, s, o);
      }
      if (this._tTime = d, this._time = h, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = w = (v || this._ease)(h / u), this._from && (this.ratio = w = 1 - w), h && !a && !s && !g && (bt(this, "onStart"), this._tTime !== d))
        return this;
      for (c = this._pt; c; )
        c.r(w, c.d), c = c._next;
      y && y.render(r < 0 ? r : !h && _ ? -re : y._dur * y._ease(h / this._dur), s, o) || this._startAt && (this._zTime = r), this._onUpdate && !s && (f && fo(this, r, s, o), bt(this, "onUpdate")), this._repeat && g !== m && this.vars.onRepeat && !s && this.parent && bt(this, "onRepeat"), (d === this._tDur || !d) && this._tTime === d && (f && !this._onUpdate && fo(this, r, !0, !0), (r || !u) && (d === this._tDur && this._ts > 0 || !d && this._ts < 0) && Ai(this, 1), !s && !(f && !a) && (d || a || _) && (bt(this, d === l ? "onComplete" : "onReverseComplete", !0), this._prom && !(d < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, t.targets = function() {
    return this._targets;
  }, t.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), n.prototype.invalidate.call(this, r);
  }, t.resetTo = function(r, s, o, a, l) {
    vn || yt.wake(), this._ts || this.play();
    var u = Math.min(this._dur, (this._dp._time - this._start) * this._ts), f;
    return this._initted || qo(this, u), f = this._ease(u / this._dur), Mh(this, r, s, o, a, f, u, l) ? this.resetTo(r, s, o, a, 1) : (xs(this, 0), this.parent || iu(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, t.kill = function(r, s) {
    if (s === void 0 && (s = "all"), !r && (!s || s === "all"))
      return this._lazy = this._pt = 0, this.parent ? Zr(this) : this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, s, xi && xi.vars.overwrite !== !0)._first || Zr(this), this.parent && o !== this.timeline.totalDuration() && Fr(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var a = this._targets, l = r ? Dt(r) : a, u = this._ptLookup, f = this._pt, d, h, c, g, p, m, _;
    if ((!s || s === "all") && sh(a, l))
      return s === "all" && (this._pt = 0), Zr(this);
    for (d = this._op = this._op || [], s !== "all" && (De(s) && (p = {}, ut(s, function(w) {
      return p[w] = 1;
    }), s = p), s = kh(a, s)), _ = a.length; _--; )
      if (~l.indexOf(a[_])) {
        h = u[_], s === "all" ? (d[_] = s, g = h, c = {}) : (c = d[_] = d[_] || {}, g = s);
        for (p in g)
          m = h && h[p], m && ((!("kill" in m.d) || m.d.kill(p) === !0) && ws(this, m, "_pt"), delete h[p]), c !== "all" && (c[p] = 1);
      }
    return this._initted && !this._pt && f && Zr(this), this;
  }, e.to = function(r, s) {
    return new e(r, s, arguments[2]);
  }, e.from = function(r, s) {
    return nn(1, arguments);
  }, e.delayedCall = function(r, s, o, a) {
    return new e(s, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: r,
      onComplete: s,
      onReverseComplete: s,
      onCompleteParams: o,
      onReverseCompleteParams: o,
      callbackScope: a
    });
  }, e.fromTo = function(r, s, o) {
    return nn(2, arguments);
  }, e.set = function(r, s) {
    return s.duration = 0, s.repeatDelay || (s.repeat = 0), new e(r, s);
  }, e.killTweensOf = function(r, s, o) {
    return le.killTweensOf(r, s, o);
  }, e;
}(wn);
zt(xe.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
ut("staggerTo,staggerFrom,staggerFromTo", function(n) {
  xe[n] = function() {
    var e = new tt(), t = ho.call(arguments, 0);
    return t.splice(n === "staggerFromTo" ? 5 : 4, 0, 0), e[n].apply(e, t);
  };
});
var Uo = function(e, t, i) {
  return e[t] = i;
}, Eu = function(e, t, i) {
  return e[t](i);
}, Ah = function(e, t, i, r) {
  return e[t](r.fp, i);
}, Dh = function(e, t, i) {
  return e.setAttribute(t, i);
}, jo = function(e, t) {
  return de(e[t]) ? Eu : Bo(e[t]) && e.setAttribute ? Dh : Uo;
}, Pu = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t);
}, Ih = function(e, t) {
  return t.set(t.t, t.p, !!(t.s + t.c * e), t);
}, Cu = function(e, t) {
  var i = t._pt, r = "";
  if (!e && t.b)
    r = t.b;
  else if (e === 1 && t.e)
    r = t.e;
  else {
    for (; i; )
      r = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round((i.s + i.c * e) * 1e4) / 1e4) + r, i = i._next;
    r += t.c;
  }
  t.set(t.t, t.p, r, t);
}, Ko = function(e, t) {
  for (var i = t._pt; i; )
    i.r(e, i.d), i = i._next;
}, zh = function(e, t, i, r) {
  for (var s = this._pt, o; s; )
    o = s._next, s.p === r && s.modifier(e, t, i), s = o;
}, Lh = function(e) {
  for (var t = this._pt, i, r; t; )
    r = t._next, t.p === e && !t.op || t.op === e ? ws(this, t, "_pt") : t.dep || (i = 1), t = r;
  return !i;
}, Rh = function(e, t, i, r) {
  r.mSet(e, t, r.m.call(r.tween, i, r.mt), r);
}, Mu = function(e) {
  for (var t = e._pt, i, r, s, o; t; ) {
    for (i = t._next, r = s; r && r.pr > t.pr; )
      r = r._next;
    (t._prev = r ? r._prev : o) ? t._prev._next = t : s = t, (t._next = r) ? r._prev = t : o = t, t = i;
  }
  e._pt = s;
}, ft = /* @__PURE__ */ function() {
  function n(t, i, r, s, o, a, l, u, f) {
    this.t = i, this.s = s, this.c = o, this.p = r, this.r = a || Pu, this.d = l || this, this.set = u || Uo, this.pr = f || 0, this._next = t, t && (t._prev = this);
  }
  var e = n.prototype;
  return e.modifier = function(i, r, s) {
    this.mSet = this.mSet || this.set, this.set = Rh, this.m = i, this.mt = s, this.tween = r;
  }, n;
}();
ut(Ho + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(n) {
  return Yo[n] = 1;
});
St.TweenMax = St.TweenLite = xe;
St.TimelineLite = St.TimelineMax = tt;
le = new tt({
  sortChildren: !1,
  defaults: Lr,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Tt.stringFilter = _u;
var rr = [], Xn = {}, Fh = [], Fa = 0, Nh = 0, Ns = function(e) {
  return (Xn[e] || Fh).map(function(t) {
    return t();
  });
}, _o = function() {
  var e = Date.now(), t = [];
  e - Fa > 2 && (Ns("matchMediaInit"), rr.forEach(function(i) {
    var r = i.queries, s = i.conditions, o, a, l, u;
    for (a in r)
      o = Ct.matchMedia(r[a]).matches, o && (l = 1), o !== s[a] && (s[a] = o, u = 1);
    u && (i.revert(), l && t.push(i));
  }), Ns("matchMediaRevert"), t.forEach(function(i) {
    return i.onMatch(i, function(r) {
      return i.add(null, r);
    });
  }), Fa = e, Ns("matchMedia"));
}, ku = /* @__PURE__ */ function() {
  function n(t, i) {
    this.selector = i && po(i), this.data = [], this._r = [], this.isReverted = !1, this.id = Nh++, t && this.add(t);
  }
  var e = n.prototype;
  return e.add = function(i, r, s) {
    de(i) && (s = r, r = i, i = de);
    var o = this, a = function() {
      var u = ce, f = o.selector, d;
      return u && u !== o && u.data.push(o), s && (o.selector = po(s)), ce = o, d = r.apply(o, arguments), de(d) && o._r.push(d), ce = u, o.selector = f, o.isReverted = !1, d;
    };
    return o.last = a, i === de ? a(o, function(l) {
      return o.add(null, l);
    }) : i ? o[i] = a : a;
  }, e.ignore = function(i) {
    var r = ce;
    ce = null, i(this), ce = r;
  }, e.getTweens = function() {
    var i = [];
    return this.data.forEach(function(r) {
      return r instanceof n ? i.push.apply(i, r.getTweens()) : r instanceof xe && !(r.parent && r.parent.data === "nested") && i.push(r);
    }), i;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(i, r) {
    var s = this;
    if (i ? function() {
      for (var a = s.getTweens(), l = s.data.length, u; l--; )
        u = s.data[l], u.data === "isFlip" && (u.revert(), u.getChildren(!0, !0, !1).forEach(function(f) {
          return a.splice(a.indexOf(f), 1);
        }));
      for (a.map(function(f) {
        return {
          g: f._dur || f._delay || f._sat && !f._sat.vars.immediateRender ? f.globalTime(0) : -1 / 0,
          t: f
        };
      }).sort(function(f, d) {
        return d.g - f.g || -1 / 0;
      }).forEach(function(f) {
        return f.t.revert(i);
      }), l = s.data.length; l--; )
        u = s.data[l], u instanceof tt ? u.data !== "nested" && (u.scrollTrigger && u.scrollTrigger.revert(), u.kill()) : !(u instanceof xe) && u.revert && u.revert(i);
      s._r.forEach(function(f) {
        return f(i, s);
      }), s.isReverted = !0;
    }() : this.data.forEach(function(a) {
      return a.kill && a.kill();
    }), this.clear(), r)
      for (var o = rr.length; o--; )
        rr[o].id === this.id && rr.splice(o, 1);
  }, e.revert = function(i) {
    this.kill(i || {});
  }, n;
}(), Bh = /* @__PURE__ */ function() {
  function n(t) {
    this.contexts = [], this.scope = t;
  }
  var e = n.prototype;
  return e.add = function(i, r, s) {
    ii(i) || (i = {
      matches: i
    });
    var o = new ku(0, s || this.scope), a = o.conditions = {}, l, u, f;
    ce && !o.selector && (o.selector = ce.selector), this.contexts.push(o), r = o.add("onMatch", r), o.queries = i;
    for (u in i)
      u === "all" ? f = 1 : (l = Ct.matchMedia(i[u]), l && (rr.indexOf(o) < 0 && rr.push(o), (a[u] = l.matches) && (f = 1), l.addListener ? l.addListener(_o) : l.addEventListener("change", _o)));
    return f && r(o, function(d) {
      return o.add(null, d);
    }), this;
  }, e.revert = function(i) {
    this.kill(i || {});
  }, e.kill = function(i) {
    this.contexts.forEach(function(r) {
      return r.kill(i, !0);
    });
  }, n;
}(), us = {
  registerPlugin: function() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    t.forEach(function(r) {
      return pu(r);
    });
  },
  timeline: function(e) {
    return new tt(e);
  },
  getTweensOf: function(e, t) {
    return le.getTweensOf(e, t);
  },
  getProperty: function(e, t, i, r) {
    De(e) && (e = Dt(e)[0]);
    var s = er(e || {}).get, o = i ? tu : eu;
    return i === "native" && (i = ""), e && (t ? o((wt[t] && wt[t].get || s)(e, t, i, r)) : function(a, l, u) {
      return o((wt[a] && wt[a].get || s)(e, a, l, u));
    });
  },
  quickSetter: function(e, t, i) {
    if (e = Dt(e), e.length > 1) {
      var r = e.map(function(f) {
        return dt.quickSetter(f, t, i);
      }), s = r.length;
      return function(f) {
        for (var d = s; d--; )
          r[d](f);
      };
    }
    e = e[0] || {};
    var o = wt[t], a = er(e), l = a.harness && (a.harness.aliases || {})[t] || t, u = o ? function(f) {
      var d = new o();
      br._pt = 0, d.init(e, i ? f + i : f, br, 0, [e]), d.render(1, d), br._pt && Ko(1, br);
    } : a.set(e, l);
    return o ? u : function(f) {
      return u(e, l, i ? f + i : f, a, 1);
    };
  },
  quickTo: function(e, t, i) {
    var r, s = dt.to(e, ar((r = {}, r[t] = "+=0.1", r.paused = !0, r), i || {})), o = function(l, u, f) {
      return s.resetTo(t, l, u, f);
    };
    return o.tween = s, o;
  },
  isTweening: function(e) {
    return le.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = ir(e.ease, Lr.ease)), Da(Lr, e || {});
  },
  config: function(e) {
    return Da(Tt, e || {});
  },
  registerEffect: function(e) {
    var t = e.name, i = e.effect, r = e.plugins, s = e.defaults, o = e.extendTimeline;
    (r || "").split(",").forEach(function(a) {
      return a && !wt[a] && !St[a] && gn(t + " effect requires " + a + " plugin.");
    }), zs[t] = function(a, l, u) {
      return i(Dt(a), zt(l || {}, s), u);
    }, o && (tt.prototype[t] = function(a, l, u) {
      return this.add(zs[t](a, ii(l) ? l : (u = l) && {}, this), u);
    });
  },
  registerEase: function(e, t) {
    U[e] = ir(t);
  },
  parseEase: function(e, t) {
    return arguments.length ? ir(e, t) : U;
  },
  getById: function(e) {
    return le.getById(e);
  },
  exportRoot: function(e, t) {
    e === void 0 && (e = {});
    var i = new tt(e), r, s;
    for (i.smoothChildTiming = lt(e.smoothChildTiming), le.remove(i), i._dp = 0, i._time = i._tTime = le._time, r = le._first; r; )
      s = r._next, (t || !(!r._dur && r instanceof xe && r.vars.onComplete === r._targets[0])) && Kt(i, r, r._start - r._delay), r = s;
    return Kt(le, i, 0), i;
  },
  context: function(e, t) {
    return e ? new ku(e, t) : ce;
  },
  matchMedia: function(e) {
    return new Bh(e);
  },
  matchMediaRefresh: function() {
    return rr.forEach(function(e) {
      var t = e.conditions, i, r;
      for (r in t)
        t[r] && (t[r] = !1, i = 1);
      i && e.revert();
    }) || _o();
  },
  addEventListener: function(e, t) {
    var i = Xn[e] || (Xn[e] = []);
    ~i.indexOf(t) || i.push(t);
  },
  removeEventListener: function(e, t) {
    var i = Xn[e], r = i && i.indexOf(t);
    r >= 0 && i.splice(r, 1);
  },
  utils: {
    wrap: _h,
    wrapYoyo: vh,
    distribute: lu,
    random: fu,
    snap: uu,
    normalize: mh,
    getUnit: $e,
    clamp: dh,
    splitColor: gu,
    toArray: Dt,
    selector: po,
    mapRange: du,
    pipe: ph,
    unitize: gh,
    interpolate: wh,
    shuffle: au
  },
  install: jl,
  effects: zs,
  ticker: yt,
  updateRoot: tt.updateRoot,
  plugins: wt,
  globalTimeline: le,
  core: {
    PropTween: ft,
    globals: Kl,
    Tween: xe,
    Timeline: tt,
    Animation: wn,
    getCache: er,
    _removeLinkedListItem: ws,
    reverting: function() {
      return Ye;
    },
    context: function(e) {
      return e && ce && (ce.data.push(e), e._ctx = ce), ce;
    },
    suppressOverwrites: function(e) {
      return No = e;
    }
  }
};
ut("to,from,fromTo,delayedCall,set,killTweensOf", function(n) {
  return us[n] = xe[n];
});
yt.add(tt.updateRoot);
br = us.to({}, {
  duration: 0
});
var Vh = function(e, t) {
  for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t; )
    i = i._next;
  return i;
}, Gh = function(e, t) {
  var i = e._targets, r, s, o;
  for (r in t)
    for (s = i.length; s--; )
      o = e._ptLookup[s][r], o && (o = o.d) && (o._pt && (o = Vh(o, r)), o && o.modifier && o.modifier(t[r], e, i[s], r));
}, Bs = function(e, t) {
  return {
    name: e,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(r, s, o) {
      o._onInit = function(a) {
        var l, u;
        if (De(s) && (l = {}, ut(s, function(f) {
          return l[f] = 1;
        }), s = l), t) {
          l = {};
          for (u in s)
            l[u] = t(s[u]);
          s = l;
        }
        Gh(a, s);
      };
    }
  };
}, dt = us.registerPlugin({
  name: "attr",
  init: function(e, t, i, r, s) {
    var o, a, l;
    this.tween = i;
    for (o in t)
      l = e.getAttribute(o) || "", a = this.add(e, "setAttribute", (l || 0) + "", t[o], r, s, 0, 0, o), a.op = o, a.b = l, this._props.push(o);
  },
  render: function(e, t) {
    for (var i = t._pt; i; )
      Ye ? i.set(i.t, i.p, i.b, i) : i.r(e, i.d), i = i._next;
  }
}, {
  name: "endArray",
  init: function(e, t) {
    for (var i = t.length; i--; )
      this.add(e, i, e[i] || 0, t[i], 0, 0, 0, 0, 0, 1);
  }
}, Bs("roundProps", go), Bs("modifiers"), Bs("snap", uu)) || us;
xe.version = tt.version = dt.version = "3.12.4";
Ul = 1;
Vo() && Nr();
U.Power0;
U.Power1;
U.Power2;
U.Power3;
U.Power4;
U.Linear;
U.Quad;
U.Cubic;
U.Quart;
U.Quint;
U.Strong;
U.Elastic;
U.Back;
U.SteppedEase;
U.Bounce;
U.Sine;
U.Expo;
U.Circ;
/*!
 * CSSPlugin 3.12.4
 * https://gsap.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Na, bi, Mr, Zo, Ki, Ba, Qo, $h = function() {
  return typeof window < "u";
}, di = {}, qi = 180 / Math.PI, kr = Math.PI / 180, mr = Math.atan2, Va = 1e8, Jo = /([A-Z])/g, Yh = /(left|right|width|margin|padding|x)/i, Hh = /[\s,\(]\S/, Qt = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, vo = function(e, t) {
  return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Wh = function(e, t) {
  return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t);
}, Xh = function(e, t) {
  return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t);
}, qh = function(e, t) {
  var i = t.s + t.c * e;
  t.set(t.t, t.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + t.u, t);
}, Ou = function(e, t) {
  return t.set(t.t, t.p, e ? t.e : t.b, t);
}, Au = function(e, t) {
  return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t);
}, Uh = function(e, t, i) {
  return e.style[t] = i;
}, jh = function(e, t, i) {
  return e.style.setProperty(t, i);
}, Kh = function(e, t, i) {
  return e._gsap[t] = i;
}, Zh = function(e, t, i) {
  return e._gsap.scaleX = e._gsap.scaleY = i;
}, Qh = function(e, t, i, r, s) {
  var o = e._gsap;
  o.scaleX = o.scaleY = i, o.renderTransform(s, o);
}, Jh = function(e, t, i, r, s) {
  var o = e._gsap;
  o[t] = i, o.renderTransform(s, o);
}, ue = "transform", ct = ue + "Origin", ep = function n(e, t) {
  var i = this, r = this.target, s = r.style, o = r._gsap;
  if (e in di && s) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = Qt[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(a) {
        return i.tfm[a] = ai(r, a);
      }) : this.tfm[e] = o.x ? o[e] : ai(r, e), e === ct && (this.tfm.zOrigin = o.zOrigin);
    else
      return Qt.transform.split(",").forEach(function(a) {
        return n.call(i, a, t);
      });
    if (this.props.indexOf(ue) >= 0)
      return;
    o.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(ct, t, "")), e = ue;
  }
  (s || t) && this.props.push(e, t, s[e]);
}, Du = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, tp = function() {
  var e = this.props, t = this.target, i = t.style, r = t._gsap, s, o;
  for (s = 0; s < e.length; s += 3)
    e[s + 1] ? t[e[s]] = e[s + 2] : e[s + 2] ? i[e[s]] = e[s + 2] : i.removeProperty(e[s].substr(0, 2) === "--" ? e[s] : e[s].replace(Jo, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm)
      r[o] = this.tfm[o];
    r.svg && (r.renderTransform(), t.setAttribute("data-svg-origin", this.svgo || "")), s = Qo(), (!s || !s.isStart) && !i[ue] && (Du(i), r.zOrigin && i[ct] && (i[ct] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Iu = function(e, t) {
  var i = {
    target: e,
    props: [],
    revert: tp,
    save: ep
  };
  return e._gsap || dt.core.getCache(e), t && t.split(",").forEach(function(r) {
    return i.save(r);
  }), i;
}, zu, wo = function(e, t) {
  var i = bi.createElementNS ? bi.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : bi.createElement(e);
  return i && i.style ? i : bi.createElement(e);
}, ei = function n(e, t, i) {
  var r = getComputedStyle(e);
  return r[t] || r.getPropertyValue(t.replace(Jo, "-$1").toLowerCase()) || r.getPropertyValue(t) || !i && n(e, Br(t) || t, 1) || "";
}, Ga = "O,Moz,ms,Ms,Webkit".split(","), Br = function(e, t, i) {
  var r = t || Ki, s = r.style, o = 5;
  if (e in s && !i)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(Ga[o] + e in s); )
    ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Ga[o] : "") + e;
}, yo = function() {
  $h() && window.document && (Na = window, bi = Na.document, Mr = bi.documentElement, Ki = wo("div") || {
    style: {}
  }, wo("div"), ue = Br(ue), ct = ue + "Origin", Ki.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", zu = !!Br("perspective"), Qo = dt.core.reverting, Zo = 1);
}, Vs = function n(e) {
  var t = wo("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = this.parentNode, r = this.nextSibling, s = this.style.cssText, o;
  if (Mr.appendChild(t), t.appendChild(this), this.style.display = "block", e)
    try {
      o = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = n;
    } catch {
    }
  else
    this._gsapBBox && (o = this._gsapBBox());
  return i && (r ? i.insertBefore(this, r) : i.appendChild(this)), Mr.removeChild(t), this.style.cssText = s, o;
}, $a = function(e, t) {
  for (var i = t.length; i--; )
    if (e.hasAttribute(t[i]))
      return e.getAttribute(t[i]);
}, Lu = function(e) {
  var t;
  try {
    t = e.getBBox();
  } catch {
    t = Vs.call(e, !0);
  }
  return t && (t.width || t.height) || e.getBBox === Vs || (t = Vs.call(e, !0)), t && !t.width && !t.x && !t.y ? {
    x: +$a(e, ["x", "cx", "x1"]) || 0,
    y: +$a(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : t;
}, Ru = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Lu(e));
}, lr = function(e, t) {
  if (t) {
    var i = e.style, r;
    t in di && t !== ct && (t = ue), i.removeProperty ? (r = t.substr(0, 2), (r === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t), i.removeProperty(r === "--" ? t : t.replace(Jo, "-$1").toLowerCase())) : i.removeAttribute(t);
  }
}, Ti = function(e, t, i, r, s, o) {
  var a = new ft(e._pt, t, i, 0, 1, o ? Au : Ou);
  return e._pt = a, a.b = r, a.e = s, e._props.push(i), a;
}, Ya = {
  deg: 1,
  rad: 1,
  turn: 1
}, ip = {
  grid: 1,
  flex: 1
}, Di = function n(e, t, i, r) {
  var s = parseFloat(i) || 0, o = (i + "").trim().substr((s + "").length) || "px", a = Ki.style, l = Yh.test(t), u = e.tagName.toLowerCase() === "svg", f = (u ? "client" : "offset") + (l ? "Width" : "Height"), d = 100, h = r === "px", c = r === "%", g, p, m, _;
  if (r === o || !s || Ya[r] || Ya[o])
    return s;
  if (o !== "px" && !h && (s = n(e, t, i, "px")), _ = e.getCTM && Ru(e), (c || o === "%") && (di[t] || ~t.indexOf("adius")))
    return g = _ ? e.getBBox()[l ? "width" : "height"] : e[f], ge(c ? s / g * d : s / 100 * g);
  if (a[l ? "width" : "height"] = d + (h ? o : r), p = ~t.indexOf("adius") || r === "em" && e.appendChild && !u ? e : e.parentNode, _ && (p = (e.ownerSVGElement || {}).parentNode), (!p || p === bi || !p.appendChild) && (p = bi.body), m = p._gsap, m && c && m.width && l && m.time === yt.time && !m.uncache)
    return ge(s / m.width * d);
  if (c && (t === "height" || t === "width")) {
    var w = e.style[t];
    e.style[t] = d + r, g = e[f], w ? e.style[t] = w : lr(e, t);
  } else
    (c || o === "%") && !ip[ei(p, "display")] && (a.position = ei(e, "position")), p === e && (a.position = "static"), p.appendChild(Ki), g = Ki[f], p.removeChild(Ki), a.position = "absolute";
  return l && c && (m = er(p), m.time = yt.time, m.width = p[f]), ge(h ? g * s / d : g && s ? d / g * s : 0);
}, ai = function(e, t, i, r) {
  var s;
  return Zo || yo(), t in Qt && t !== "transform" && (t = Qt[t], ~t.indexOf(",") && (t = t.split(",")[0])), di[t] && t !== "transform" ? (s = xn(e, r), s = t !== "transformOrigin" ? s[t] : s.svg ? s.origin : cs(ei(e, ct)) + " " + s.zOrigin + "px") : (s = e.style[t], (!s || s === "auto" || r || ~(s + "").indexOf("calc(")) && (s = fs[t] && fs[t](e, t, i) || ei(e, t) || Ql(e, t) || (t === "opacity" ? 1 : 0))), i && !~(s + "").trim().indexOf(" ") ? Di(e, t, s, i) + i : s;
}, rp = function(e, t, i, r) {
  if (!i || i === "none") {
    var s = Br(t, e, 1), o = s && ei(e, s, 1);
    o && o !== i ? (t = s, i = o) : t === "borderColor" && (i = ei(e, "borderTopColor"));
  }
  var a = new ft(this._pt, e.style, t, 0, 1, Cu), l = 0, u = 0, f, d, h, c, g, p, m, _, w, y, v, T;
  if (a.b = i, a.e = r, i += "", r += "", r === "auto" && (p = e.style[t], e.style[t] = r, r = ei(e, t) || r, p ? e.style[t] = p : lr(e, t)), f = [i, r], _u(f), i = f[0], r = f[1], h = i.match(xr) || [], T = r.match(xr) || [], T.length) {
    for (; d = xr.exec(r); )
      m = d[0], w = r.substring(l, d.index), g ? g = (g + 1) % 5 : (w.substr(-5) === "rgba(" || w.substr(-5) === "hsla(") && (g = 1), m !== (p = h[u++] || "") && (c = parseFloat(p) || 0, v = p.substr((c + "").length), m.charAt(1) === "=" && (m = Cr(c, m) + v), _ = parseFloat(m), y = m.substr((_ + "").length), l = xr.lastIndex - y.length, y || (y = y || Tt.units[t] || v, l === r.length && (r += y, a.e += y)), v !== y && (c = Di(e, t, p, y) || 0), a._pt = {
        _next: a._pt,
        p: w || u === 1 ? w : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: c,
        c: _ - c,
        m: g && g < 4 || t === "zIndex" ? Math.round : 0
      });
    a.c = l < r.length ? r.substring(l, r.length) : "";
  } else
    a.r = t === "display" && r === "none" ? Au : Ou;
  return Xl.test(r) && (a.e = 0), this._pt = a, a;
}, Ha = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, np = function(e) {
  var t = e.split(" "), i = t[0], r = t[1] || "50%";
  return (i === "top" || i === "bottom" || r === "left" || r === "right") && (e = i, i = r, r = e), t[0] = Ha[i] || i, t[1] = Ha[r] || r, t.join(" ");
}, sp = function(e, t) {
  if (t.tween && t.tween._time === t.tween._dur) {
    var i = t.t, r = i.style, s = t.u, o = i._gsap, a, l, u;
    if (s === "all" || s === !0)
      r.cssText = "", l = 1;
    else
      for (s = s.split(","), u = s.length; --u > -1; )
        a = s[u], di[a] && (l = 1, a = a === "transformOrigin" ? ct : ue), lr(i, a);
    l && (lr(i, ue), o && (o.svg && i.removeAttribute("transform"), xn(i, 1), o.uncache = 1, Du(r)));
  }
}, fs = {
  clearProps: function(e, t, i, r, s) {
    if (s.data !== "isFromStart") {
      var o = e._pt = new ft(e._pt, t, i, 0, 0, sp);
      return o.u = r, o.pr = -10, o.tween = s, e._props.push(i), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, yn = [1, 0, 0, 1, 0, 0], Fu = {}, Nu = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, Wa = function(e) {
  var t = ei(e, ue);
  return Nu(t) ? yn : t.substr(7).match(Wl).map(ge);
}, ea = function(e, t) {
  var i = e._gsap || er(e), r = e.style, s = Wa(e), o, a, l, u;
  return i.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix, s = [l.a, l.b, l.c, l.d, l.e, l.f], s.join(",") === "1,0,0,1,0,0" ? yn : s) : (s === yn && !e.offsetParent && e !== Mr && !i.svg && (l = r.display, r.display = "block", o = e.parentNode, (!o || !e.offsetParent) && (u = 1, a = e.nextElementSibling, Mr.appendChild(e)), s = Wa(e), l ? r.display = l : lr(e, "display"), u && (a ? o.insertBefore(e, a) : o ? o.appendChild(e) : Mr.removeChild(e))), t && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s);
}, xo = function(e, t, i, r, s, o) {
  var a = e._gsap, l = s || ea(e, !0), u = a.xOrigin || 0, f = a.yOrigin || 0, d = a.xOffset || 0, h = a.yOffset || 0, c = l[0], g = l[1], p = l[2], m = l[3], _ = l[4], w = l[5], y = t.split(" "), v = parseFloat(y[0]) || 0, T = parseFloat(y[1]) || 0, C, S, M, P;
  i ? l !== yn && (S = c * m - g * p) && (M = v * (m / S) + T * (-p / S) + (p * w - m * _) / S, P = v * (-g / S) + T * (c / S) - (c * w - g * _) / S, v = M, T = P) : (C = Lu(e), v = C.x + (~y[0].indexOf("%") ? v / 100 * C.width : v), T = C.y + (~(y[1] || y[0]).indexOf("%") ? T / 100 * C.height : T)), r || r !== !1 && a.smooth ? (_ = v - u, w = T - f, a.xOffset = d + (_ * c + w * p) - _, a.yOffset = h + (_ * g + w * m) - w) : a.xOffset = a.yOffset = 0, a.xOrigin = v, a.yOrigin = T, a.smooth = !!r, a.origin = t, a.originIsAbsolute = !!i, e.style[ct] = "0px 0px", o && (Ti(o, a, "xOrigin", u, v), Ti(o, a, "yOrigin", f, T), Ti(o, a, "xOffset", d, a.xOffset), Ti(o, a, "yOffset", h, a.yOffset)), e.setAttribute("data-svg-origin", v + " " + T);
}, xn = function(e, t) {
  var i = e._gsap || new xu(e);
  if ("x" in i && !t && !i.uncache)
    return i;
  var r = e.style, s = i.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(e), u = ei(e, ct) || "0", f, d, h, c, g, p, m, _, w, y, v, T, C, S, M, P, b, O, k, A, z, L, B, F, X, J, x, ee, Ie, Lt, fe, ze;
  return f = d = h = p = m = _ = w = y = v = 0, c = g = 1, i.svg = !!(e.getCTM && Ru(e)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (r[ue] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[ue] !== "none" ? l[ue] : "")), r.scale = r.rotate = r.translate = "none"), S = ea(e, i.svg), i.svg && (i.uncache ? (X = e.getBBox(), u = i.xOrigin - X.x + "px " + (i.yOrigin - X.y) + "px", F = "") : F = !t && e.getAttribute("data-svg-origin"), xo(e, F || u, !!F || i.originIsAbsolute, i.smooth !== !1, S)), T = i.xOrigin || 0, C = i.yOrigin || 0, S !== yn && (O = S[0], k = S[1], A = S[2], z = S[3], f = L = S[4], d = B = S[5], S.length === 6 ? (c = Math.sqrt(O * O + k * k), g = Math.sqrt(z * z + A * A), p = O || k ? mr(k, O) * qi : 0, w = A || z ? mr(A, z) * qi + p : 0, w && (g *= Math.abs(Math.cos(w * kr))), i.svg && (f -= T - (T * O + C * A), d -= C - (T * k + C * z))) : (ze = S[6], Lt = S[7], x = S[8], ee = S[9], Ie = S[10], fe = S[11], f = S[12], d = S[13], h = S[14], M = mr(ze, Ie), m = M * qi, M && (P = Math.cos(-M), b = Math.sin(-M), F = L * P + x * b, X = B * P + ee * b, J = ze * P + Ie * b, x = L * -b + x * P, ee = B * -b + ee * P, Ie = ze * -b + Ie * P, fe = Lt * -b + fe * P, L = F, B = X, ze = J), M = mr(-A, Ie), _ = M * qi, M && (P = Math.cos(-M), b = Math.sin(-M), F = O * P - x * b, X = k * P - ee * b, J = A * P - Ie * b, fe = z * b + fe * P, O = F, k = X, A = J), M = mr(k, O), p = M * qi, M && (P = Math.cos(M), b = Math.sin(M), F = O * P + k * b, X = L * P + B * b, k = k * P - O * b, B = B * P - L * b, O = F, L = X), m && Math.abs(m) + Math.abs(p) > 359.9 && (m = p = 0, _ = 180 - _), c = ge(Math.sqrt(O * O + k * k + A * A)), g = ge(Math.sqrt(B * B + ze * ze)), M = mr(L, B), w = Math.abs(M) > 2e-4 ? M * qi : 0, v = fe ? 1 / (fe < 0 ? -fe : fe) : 0), i.svg && (F = e.getAttribute("transform"), i.forceCSS = e.setAttribute("transform", "") || !Nu(ei(e, ue)), F && e.setAttribute("transform", F))), Math.abs(w) > 90 && Math.abs(w) < 270 && (s ? (c *= -1, w += p <= 0 ? 180 : -180, p += p <= 0 ? 180 : -180) : (g *= -1, w += w <= 0 ? 180 : -180)), t = t || i.uncache, i.x = f - ((i.xPercent = f && (!t && i.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetWidth * i.xPercent / 100 : 0) + o, i.y = d - ((i.yPercent = d && (!t && i.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-d) ? -50 : 0))) ? e.offsetHeight * i.yPercent / 100 : 0) + o, i.z = h + o, i.scaleX = ge(c), i.scaleY = ge(g), i.rotation = ge(p) + a, i.rotationX = ge(m) + a, i.rotationY = ge(_) + a, i.skewX = w + a, i.skewY = y + a, i.transformPerspective = v + o, (i.zOrigin = parseFloat(u.split(" ")[2]) || !t && i.zOrigin || 0) && (r[ct] = cs(u)), i.xOffset = i.yOffset = 0, i.force3D = Tt.force3D, i.renderTransform = i.svg ? ap : zu ? Bu : op, i.uncache = 0, i;
}, cs = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, Gs = function(e, t, i) {
  var r = $e(t);
  return ge(parseFloat(t) + parseFloat(Di(e, "x", i + "px", r))) + r;
}, op = function(e, t) {
  t.z = "0px", t.rotationY = t.rotationX = "0deg", t.force3D = 0, Bu(e, t);
}, Wi = "0deg", qr = "0px", Xi = ") ", Bu = function(e, t) {
  var i = t || this, r = i.xPercent, s = i.yPercent, o = i.x, a = i.y, l = i.z, u = i.rotation, f = i.rotationY, d = i.rotationX, h = i.skewX, c = i.skewY, g = i.scaleX, p = i.scaleY, m = i.transformPerspective, _ = i.force3D, w = i.target, y = i.zOrigin, v = "", T = _ === "auto" && e && e !== 1 || _ === !0;
  if (y && (d !== Wi || f !== Wi)) {
    var C = parseFloat(f) * kr, S = Math.sin(C), M = Math.cos(C), P;
    C = parseFloat(d) * kr, P = Math.cos(C), o = Gs(w, o, S * P * -y), a = Gs(w, a, -Math.sin(C) * -y), l = Gs(w, l, M * P * -y + y);
  }
  m !== qr && (v += "perspective(" + m + Xi), (r || s) && (v += "translate(" + r + "%, " + s + "%) "), (T || o !== qr || a !== qr || l !== qr) && (v += l !== qr || T ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + Xi), u !== Wi && (v += "rotate(" + u + Xi), f !== Wi && (v += "rotateY(" + f + Xi), d !== Wi && (v += "rotateX(" + d + Xi), (h !== Wi || c !== Wi) && (v += "skew(" + h + ", " + c + Xi), (g !== 1 || p !== 1) && (v += "scale(" + g + ", " + p + Xi), w.style[ue] = v || "translate(0, 0)";
}, ap = function(e, t) {
  var i = t || this, r = i.xPercent, s = i.yPercent, o = i.x, a = i.y, l = i.rotation, u = i.skewX, f = i.skewY, d = i.scaleX, h = i.scaleY, c = i.target, g = i.xOrigin, p = i.yOrigin, m = i.xOffset, _ = i.yOffset, w = i.forceCSS, y = parseFloat(o), v = parseFloat(a), T, C, S, M, P;
  l = parseFloat(l), u = parseFloat(u), f = parseFloat(f), f && (f = parseFloat(f), u += f, l += f), l || u ? (l *= kr, u *= kr, T = Math.cos(l) * d, C = Math.sin(l) * d, S = Math.sin(l - u) * -h, M = Math.cos(l - u) * h, u && (f *= kr, P = Math.tan(u - f), P = Math.sqrt(1 + P * P), S *= P, M *= P, f && (P = Math.tan(f), P = Math.sqrt(1 + P * P), T *= P, C *= P)), T = ge(T), C = ge(C), S = ge(S), M = ge(M)) : (T = d, M = h, C = S = 0), (y && !~(o + "").indexOf("px") || v && !~(a + "").indexOf("px")) && (y = Di(c, "x", o, "px"), v = Di(c, "y", a, "px")), (g || p || m || _) && (y = ge(y + g - (g * T + p * S) + m), v = ge(v + p - (g * C + p * M) + _)), (r || s) && (P = c.getBBox(), y = ge(y + r / 100 * P.width), v = ge(v + s / 100 * P.height)), P = "matrix(" + T + "," + C + "," + S + "," + M + "," + y + "," + v + ")", c.setAttribute("transform", P), w && (c.style[ue] = P);
}, lp = function(e, t, i, r, s) {
  var o = 360, a = De(s), l = parseFloat(s) * (a && ~s.indexOf("rad") ? qi : 1), u = l - r, f = r + u + "deg", d, h;
  return a && (d = s.split("_")[1], d === "short" && (u %= o, u !== u % (o / 2) && (u += u < 0 ? o : -o)), d === "cw" && u < 0 ? u = (u + o * Va) % o - ~~(u / o) * o : d === "ccw" && u > 0 && (u = (u - o * Va) % o - ~~(u / o) * o)), e._pt = h = new ft(e._pt, t, i, r, u, Wh), h.e = f, h.u = "deg", e._props.push(i), h;
}, Xa = function(e, t) {
  for (var i in t)
    e[i] = t[i];
  return e;
}, up = function(e, t, i) {
  var r = Xa({}, i._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, a, l, u, f, d, h, c, g;
  r.svg ? (u = i.getAttribute("transform"), i.setAttribute("transform", ""), o[ue] = t, a = xn(i, 1), lr(i, ue), i.setAttribute("transform", u)) : (u = getComputedStyle(i)[ue], o[ue] = t, a = xn(i, 1), o[ue] = u);
  for (l in di)
    u = r[l], f = a[l], u !== f && s.indexOf(l) < 0 && (c = $e(u), g = $e(f), d = c !== g ? Di(i, l, u, g) : parseFloat(u), h = parseFloat(f), e._pt = new ft(e._pt, a, l, d, h - d, vo), e._pt.u = g || 0, e._props.push(l));
  Xa(a, r);
};
ut("padding,margin,Width,Radius", function(n, e) {
  var t = "Top", i = "Right", r = "Bottom", s = "Left", o = (e < 3 ? [t, i, r, s] : [t + s, t + i, r + i, r + s]).map(function(a) {
    return e < 2 ? n + a : "border" + a + n;
  });
  fs[e > 1 ? "border" + n : n] = function(a, l, u, f, d) {
    var h, c;
    if (arguments.length < 4)
      return h = o.map(function(g) {
        return ai(a, g, u);
      }), c = h.join(" "), c.split(h[0]).length === 5 ? h[0] : c;
    h = (f + "").split(" "), c = {}, o.forEach(function(g, p) {
      return c[g] = h[p] = h[p] || h[(p - 1) / 2 | 0];
    }), a.init(l, c, d);
  };
});
var Vu = {
  name: "css",
  register: yo,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, t, i, r, s) {
    var o = this._props, a = e.style, l = i.vars.startAt, u, f, d, h, c, g, p, m, _, w, y, v, T, C, S, M;
    Zo || yo(), this.styles = this.styles || Iu(e), M = this.styles.props, this.tween = i;
    for (p in t)
      if (p !== "autoRound" && (f = t[p], !(wt[p] && bu(p, t, i, r, e, s)))) {
        if (c = typeof f, g = fs[p], c === "function" && (f = f.call(i, r, e, s), c = typeof f), c === "string" && ~f.indexOf("random(") && (f = _n(f)), g)
          g(this, e, p, f, i) && (S = 1);
        else if (p.substr(0, 2) === "--")
          u = (getComputedStyle(e).getPropertyValue(p) + "").trim(), f += "", Ci.lastIndex = 0, Ci.test(u) || (m = $e(u), _ = $e(f)), _ ? m !== _ && (u = Di(e, p, u, _) + _) : m && (f += m), this.add(a, "setProperty", u, f, r, s, 0, 0, p), o.push(p), M.push(p, 0, a[p]);
        else if (c !== "undefined") {
          if (l && p in l ? (u = typeof l[p] == "function" ? l[p].call(i, r, e, s) : l[p], De(u) && ~u.indexOf("random(") && (u = _n(u)), $e(u + "") || u === "auto" || (u += Tt.units[p] || $e(ai(e, p)) || ""), (u + "").charAt(1) === "=" && (u = ai(e, p))) : u = ai(e, p), h = parseFloat(u), w = c === "string" && f.charAt(1) === "=" && f.substr(0, 2), w && (f = f.substr(2)), d = parseFloat(f), p in Qt && (p === "autoAlpha" && (h === 1 && ai(e, "visibility") === "hidden" && d && (h = 0), M.push("visibility", 0, a.visibility), Ti(this, a, "visibility", h ? "inherit" : "hidden", d ? "inherit" : "hidden", !d)), p !== "scale" && p !== "transform" && (p = Qt[p], ~p.indexOf(",") && (p = p.split(",")[0]))), y = p in di, y) {
            if (this.styles.save(p), v || (T = e._gsap, T.renderTransform && !t.parseTransform || xn(e, t.parseTransform), C = t.smoothOrigin !== !1 && T.smooth, v = this._pt = new ft(this._pt, a, ue, 0, 1, T.renderTransform, T, 0, -1), v.dep = 1), p === "scale")
              this._pt = new ft(this._pt, T, "scaleY", T.scaleY, (w ? Cr(T.scaleY, w + d) : d) - T.scaleY || 0, vo), this._pt.u = 0, o.push("scaleY", p), p += "X";
            else if (p === "transformOrigin") {
              M.push(ct, 0, a[ct]), f = np(f), T.svg ? xo(e, f, 0, C, 0, this) : (_ = parseFloat(f.split(" ")[2]) || 0, _ !== T.zOrigin && Ti(this, T, "zOrigin", T.zOrigin, _), Ti(this, a, p, cs(u), cs(f)));
              continue;
            } else if (p === "svgOrigin") {
              xo(e, f, 1, C, 0, this);
              continue;
            } else if (p in Fu) {
              lp(this, T, p, h, w ? Cr(h, w + f) : f);
              continue;
            } else if (p === "smoothOrigin") {
              Ti(this, T, "smooth", T.smooth, f);
              continue;
            } else if (p === "force3D") {
              T[p] = f;
              continue;
            } else if (p === "transform") {
              up(this, f, e);
              continue;
            }
          } else
            p in a || (p = Br(p) || p);
          if (y || (d || d === 0) && (h || h === 0) && !Hh.test(f) && p in a)
            m = (u + "").substr((h + "").length), d || (d = 0), _ = $e(f) || (p in Tt.units ? Tt.units[p] : m), m !== _ && (h = Di(e, p, u, _)), this._pt = new ft(this._pt, y ? T : a, p, h, (w ? Cr(h, w + d) : d) - h, !y && (_ === "px" || p === "zIndex") && t.autoRound !== !1 ? qh : vo), this._pt.u = _ || 0, m !== _ && _ !== "%" && (this._pt.b = u, this._pt.r = Xh);
          else if (p in a)
            rp.call(this, e, p, u, w ? w + f : f);
          else if (p in e)
            this.add(e, p, u || e[p], w ? w + f : f, r, s);
          else if (p !== "parseTransform") {
            $o(p, f);
            continue;
          }
          y || (p in a ? M.push(p, 0, a[p]) : M.push(p, 1, u || e[p])), o.push(p);
        }
      }
    S && Mu(this);
  },
  render: function(e, t) {
    if (t.tween._time || !Qo())
      for (var i = t._pt; i; )
        i.r(e, i.d), i = i._next;
    else
      t.styles.revert();
  },
  get: ai,
  aliases: Qt,
  getSetter: function(e, t, i) {
    var r = Qt[t];
    return r && r.indexOf(",") < 0 && (t = r), t in di && t !== ct && (e._gsap.x || ai(e, "x")) ? i && Ba === i ? t === "scale" ? Zh : Kh : (Ba = i || {}) && (t === "scale" ? Qh : Jh) : e.style && !Bo(e.style[t]) ? Uh : ~t.indexOf("-") ? jh : jo(e, t);
  },
  core: {
    _removeProperty: lr,
    _getMatrix: ea
  }
};
dt.utils.checkPrefix = Br;
dt.core.getStyleSaver = Iu;
(function(n, e, t, i) {
  var r = ut(n + "," + e + "," + t, function(s) {
    di[s] = 1;
  });
  ut(e, function(s) {
    Tt.units[s] = "deg", Fu[s] = 1;
  }), Qt[r[13]] = n + "," + e, ut(i, function(s) {
    var o = s.split(":");
    Qt[o[1]] = r[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
ut("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(n) {
  Tt.units[n] = "px";
});
dt.registerPlugin(Vu);
var Tr = dt.registerPlugin(Vu) || dt;
Tr.core.Tween;
function qa(n, e) {
  for (var t = 0; t < e.length; t++) {
    var i = e[t];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i);
  }
}
function fp(n, e, t) {
  return e && qa(n.prototype, e), t && qa(n, t), n;
}
/*!
 * Observer 3.12.4
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Re, qn, xt, Si, Ei, Or, Gu, Ui, on, $u, ui, $t, Yu, Hu = function() {
  return Re || typeof window < "u" && (Re = window.gsap) && Re.registerPlugin && Re;
}, Wu = 1, Sr = [], H = [], ti = [], an = Date.now, bo = function(e, t) {
  return t;
}, cp = function() {
  var e = on.core, t = e.bridge || {}, i = e._scrollers, r = e._proxies;
  i.push.apply(i, H), r.push.apply(r, ti), H = i, ti = r, bo = function(o, a) {
    return t[o](a);
  };
}, Mi = function(e, t) {
  return ~ti.indexOf(e) && ti[ti.indexOf(e) + 1][t];
}, ln = function(e) {
  return !!~$u.indexOf(e);
}, Ke = function(e, t, i, r, s) {
  return e.addEventListener(t, i, {
    passive: !r,
    capture: !!s
  });
}, je = function(e, t, i, r) {
  return e.removeEventListener(t, i, !!r);
}, On = "scrollLeft", An = "scrollTop", To = function() {
  return ui && ui.isPressed || H.cache++;
}, ds = function(e, t) {
  var i = function r(s) {
    if (s || s === 0) {
      Wu && (xt.history.scrollRestoration = "manual");
      var o = ui && ui.isPressed;
      s = r.v = Math.round(s) || (ui && ui.iOS ? 1 : 0), e(s), r.cacheID = H.cache, o && bo("ss", s);
    } else
      (t || H.cache !== r.cacheID || bo("ref")) && (r.cacheID = H.cache, r.v = e());
    return r.v + r.offset;
  };
  return i.offset = 0, e && i;
}, it = {
  s: On,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: ds(function(n) {
    return arguments.length ? xt.scrollTo(n, Ee.sc()) : xt.pageXOffset || Si[On] || Ei[On] || Or[On] || 0;
  })
}, Ee = {
  s: An,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: it,
  sc: ds(function(n) {
    return arguments.length ? xt.scrollTo(it.sc(), n) : xt.pageYOffset || Si[An] || Ei[An] || Or[An] || 0;
  })
}, at = function(e, t) {
  return (t && t._ctx && t._ctx.selector || Re.utils.toArray)(e)[0] || (typeof e == "string" && Re.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, Ii = function(e, t) {
  var i = t.s, r = t.sc;
  ln(e) && (e = Si.scrollingElement || Ei);
  var s = H.indexOf(e), o = r === Ee.sc ? 1 : 2;
  !~s && (s = H.push(e) - 1), H[s + o] || Ke(e, "scroll", To);
  var a = H[s + o], l = a || (H[s + o] = ds(Mi(e, i), !0) || (ln(e) ? r : ds(function(u) {
    return arguments.length ? e[i] = u : e[i];
  })));
  return l.target = e, a || (l.smooth = Re.getProperty(e, "scrollBehavior") === "smooth"), l;
}, So = function(e, t, i) {
  var r = e, s = e, o = an(), a = o, l = t || 50, u = Math.max(500, l * 3), f = function(g, p) {
    var m = an();
    p || m - o > l ? (s = r, r = g, a = o, o = m) : i ? r += g : r = s + (g - s) / (m - a) * (o - a);
  }, d = function() {
    s = r = i ? 0 : r, a = o = 0;
  }, h = function(g) {
    var p = a, m = s, _ = an();
    return (g || g === 0) && g !== r && f(g), o === a || _ - a > u ? 0 : (r + (i ? m : -m)) / ((i ? _ : o) - p) * 1e3;
  };
  return {
    update: f,
    reset: d,
    getVelocity: h
  };
}, Ur = function(e, t) {
  return t && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, Ua = function(e) {
  var t = Math.max.apply(Math, e), i = Math.min.apply(Math, e);
  return Math.abs(t) >= Math.abs(i) ? t : i;
}, Xu = function() {
  on = Re.core.globals().ScrollTrigger, on && on.core && cp();
}, qu = function(e) {
  return Re = e || Hu(), !qn && Re && typeof document < "u" && document.body && (xt = window, Si = document, Ei = Si.documentElement, Or = Si.body, $u = [xt, Si, Ei, Or], Re.utils.clamp, Yu = Re.core.context || function() {
  }, Ui = "onpointerenter" in Or ? "pointer" : "mouse", Gu = be.isTouch = xt.matchMedia && xt.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in xt || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, $t = be.eventTypes = ("ontouchstart" in Ei ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Ei ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Wu = 0;
  }, 500), Xu(), qn = 1), qn;
};
it.op = Ee;
H.cache = 0;
var be = /* @__PURE__ */ function() {
  function n(t) {
    this.init(t);
  }
  var e = n.prototype;
  return e.init = function(i) {
    qn || qu(Re) || console.warn("Please gsap.registerPlugin(Observer)"), on || Xu();
    var r = i.tolerance, s = i.dragMinimum, o = i.type, a = i.target, l = i.lineHeight, u = i.debounce, f = i.preventDefault, d = i.onStop, h = i.onStopDelay, c = i.ignore, g = i.wheelSpeed, p = i.event, m = i.onDragStart, _ = i.onDragEnd, w = i.onDrag, y = i.onPress, v = i.onRelease, T = i.onRight, C = i.onLeft, S = i.onUp, M = i.onDown, P = i.onChangeX, b = i.onChangeY, O = i.onChange, k = i.onToggleX, A = i.onToggleY, z = i.onHover, L = i.onHoverEnd, B = i.onMove, F = i.ignoreCheck, X = i.isNormalizer, J = i.onGestureStart, x = i.onGestureEnd, ee = i.onWheel, Ie = i.onEnable, Lt = i.onDisable, fe = i.onClick, ze = i.scrollSpeed, We = i.capture, me = i.allowClicks, Xe = i.lockAxis, Ne = i.onLockAxis;
    this.target = a = at(a) || Ei, this.vars = i, c && (c = Re.utils.toArray(c)), r = r || 1e-9, s = s || 0, g = g || 1, ze = ze || 1, o = o || "wheel,touch,pointer", u = u !== !1, l || (l = parseFloat(xt.getComputedStyle(Or).lineHeight) || 22);
    var hi, qe, Ht, Z, _e, nt, ht, E = this, pt = 0, ri = 0, Li = Ii(a, it), ve = Ii(a, Ee), Ri = Li(), Fi = ve(), $r = ~o.indexOf("touch") && !~o.indexOf("pointer") && $t[0] === "pointerdown", Te = ln(a), he = a.ownerDocument || Si, Rt = [0, 0, 0], Ft = [0, 0, 0], Ni = 0, ni = function() {
      return Ni = an();
    }, Wt = function(R, Q) {
      return (E.event = R) && c && ~c.indexOf(R.target) || Q && $r && R.pointerType !== "touch" || F && F(R, Q);
    }, st = function() {
      E._vx.reset(), E._vy.reset(), qe.pause(), d && d(E);
    }, Bi = function() {
      var R = E.deltaX = Ua(Rt), Q = E.deltaY = Ua(Ft), we = Math.abs(R) >= r, D = Math.abs(Q) >= r;
      O && (we || D) && O(E, R, Q, Rt, Ft), we && (T && E.deltaX > 0 && T(E), C && E.deltaX < 0 && C(E), P && P(E), k && E.deltaX < 0 != pt < 0 && k(E), pt = E.deltaX, Rt[0] = Rt[1] = Rt[2] = 0), D && (M && E.deltaY > 0 && M(E), S && E.deltaY < 0 && S(E), b && b(E), A && E.deltaY < 0 != ri < 0 && A(E), ri = E.deltaY, Ft[0] = Ft[1] = Ft[2] = 0), (Z || Ht) && (B && B(E), Ht && (w(E), Ht = !1), Z = !1), nt && !(nt = !1) && Ne && Ne(E), _e && (ee(E), _e = !1), hi = 0;
    }, hr = function(R, Q, we) {
      Rt[we] += R, Ft[we] += Q, E._vx.update(R), E._vy.update(Q), u ? hi || (hi = requestAnimationFrame(Bi)) : Bi();
    }, pr = function(R, Q) {
      Xe && !ht && (E.axis = ht = Math.abs(R) > Math.abs(Q) ? "x" : "y", nt = !0), ht !== "y" && (Rt[2] += R, E._vx.update(R, !0)), ht !== "x" && (Ft[2] += Q, E._vy.update(Q, !0)), u ? hi || (hi = requestAnimationFrame(Bi)) : Bi();
    }, Vi = function(R) {
      if (!Wt(R, 1)) {
        R = Ur(R, f);
        var Q = R.clientX, we = R.clientY, D = Q - E.x, $ = we - E.y, N = E.isDragging;
        E.x = Q, E.y = we, (N || Math.abs(E.startX - Q) >= s || Math.abs(E.startY - we) >= s) && (w && (Ht = !0), N || (E.isDragging = !0), pr(D, $), N || m && m(E));
      }
    }, pi = E.onPress = function(V) {
      Wt(V, 1) || V && V.button || (E.axis = ht = null, qe.pause(), E.isPressed = !0, V = Ur(V), pt = ri = 0, E.startX = E.x = V.clientX, E.startY = E.y = V.clientY, E._vx.reset(), E._vy.reset(), Ke(X ? a : he, $t[1], Vi, f, !0), E.deltaX = E.deltaY = 0, y && y(E));
    }, gi = E.onRelease = function(V) {
      if (!Wt(V, 1)) {
        je(X ? a : he, $t[1], Vi, !0);
        var R = !isNaN(E.y - E.startY), Q = E.isDragging, we = Q && (Math.abs(E.x - E.startX) > 3 || Math.abs(E.y - E.startY) > 3), D = Ur(V);
        !we && R && (E._vx.reset(), E._vy.reset(), f && me && Re.delayedCall(0.08, function() {
          if (an() - Ni > 300 && !V.defaultPrevented) {
            if (V.target.click)
              V.target.click();
            else if (he.createEvent) {
              var $ = he.createEvent("MouseEvents");
              $.initMouseEvent("click", !0, !0, xt, 1, D.screenX, D.screenY, D.clientX, D.clientY, !1, !1, !1, !1, 0, null), V.target.dispatchEvent($);
            }
          }
        })), E.isDragging = E.isGesturing = E.isPressed = !1, d && Q && !X && qe.restart(!0), _ && Q && _(E), v && v(E, we);
      }
    }, j = function(R) {
      return R.touches && R.touches.length > 1 && (E.isGesturing = !0) && J(R, E.isDragging);
    }, Gi = function() {
      return (E.isGesturing = !1) || x(E);
    }, Nt = function(R) {
      if (!Wt(R)) {
        var Q = Li(), we = ve();
        hr((Q - Ri) * ze, (we - Fi) * ze, 1), Ri = Q, Fi = we, d && qe.restart(!0);
      }
    }, Bt = function(R) {
      if (!Wt(R)) {
        R = Ur(R, f), ee && (_e = !0);
        var Q = (R.deltaMode === 1 ? l : R.deltaMode === 2 ? xt.innerHeight : 1) * g;
        hr(R.deltaX * Q, R.deltaY * Q, 0), d && !X && qe.restart(!0);
      }
    }, Vt = function(R) {
      if (!Wt(R)) {
        var Q = R.clientX, we = R.clientY, D = Q - E.x, $ = we - E.y;
        E.x = Q, E.y = we, Z = !0, d && qe.restart(!0), (D || $) && pr(D, $);
      }
    }, $i = function(R) {
      E.event = R, z(E);
    }, gr = function(R) {
      E.event = R, L(E);
    }, si = function(R) {
      return Wt(R) || Ur(R, f) && fe(E);
    };
    qe = E._dc = Re.delayedCall(h || 0.25, st).pause(), E.deltaX = E.deltaY = 0, E._vx = So(0, 50, !0), E._vy = So(0, 50, !0), E.scrollX = Li, E.scrollY = ve, E.isDragging = E.isGesturing = E.isPressed = !1, Yu(this), E.enable = function(V) {
      return E.isEnabled || (Ke(Te ? he : a, "scroll", To), o.indexOf("scroll") >= 0 && Ke(Te ? he : a, "scroll", Nt, f, We), o.indexOf("wheel") >= 0 && Ke(a, "wheel", Bt, f, We), (o.indexOf("touch") >= 0 && Gu || o.indexOf("pointer") >= 0) && (Ke(a, $t[0], pi, f, We), Ke(he, $t[2], gi), Ke(he, $t[3], gi), me && Ke(a, "click", ni, !1, !0), fe && Ke(a, "click", si), J && Ke(he, "gesturestart", j), x && Ke(he, "gestureend", Gi), z && Ke(a, Ui + "enter", $i), L && Ke(a, Ui + "leave", gr), B && Ke(a, Ui + "move", Vt)), E.isEnabled = !0, V && V.type && pi(V), Ie && Ie(E)), E;
    }, E.disable = function() {
      E.isEnabled && (Sr.filter(function(V) {
        return V !== E && ln(V.target);
      }).length || je(Te ? he : a, "scroll", To), E.isPressed && (E._vx.reset(), E._vy.reset(), je(X ? a : he, $t[1], Vi, !0)), je(Te ? he : a, "scroll", Nt, We), je(a, "wheel", Bt, We), je(a, $t[0], pi, We), je(he, $t[2], gi), je(he, $t[3], gi), je(a, "click", ni, !0), je(a, "click", si), je(he, "gesturestart", j), je(he, "gestureend", Gi), je(a, Ui + "enter", $i), je(a, Ui + "leave", gr), je(a, Ui + "move", Vt), E.isEnabled = E.isPressed = E.isDragging = !1, Lt && Lt(E));
    }, E.kill = E.revert = function() {
      E.disable();
      var V = Sr.indexOf(E);
      V >= 0 && Sr.splice(V, 1), ui === E && (ui = 0);
    }, Sr.push(E), X && ln(a) && (ui = E), E.enable(p);
  }, fp(n, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), n;
}();
be.version = "3.12.4";
be.create = function(n) {
  return new be(n);
};
be.register = qu;
be.getAll = function() {
  return Sr.slice();
};
be.getById = function(n) {
  return Sr.filter(function(e) {
    return e.vars.id === n;
  })[0];
};
Hu() && Re.registerPlugin(be);
/*!
 * ScrollTrigger 3.12.4
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var I, wr, q, ae, Yt, ne, Uu, hs, bn, Er, Un, Dn, Ge, bs, Eo, Qe, ja, Ka, yr, ju, $s, Ku, Ze, Zu, Qu, Ju, vi, Po, ta, Ar, ia, ps, Co, Ys, In = 1, et = Date.now, Hs = et(), It = 0, Jr = 0, Za = function(e, t, i) {
  var r = _t(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
  return i["_" + t + "Clamp"] = r, r ? e.substr(6, e.length - 7) : e;
}, Qa = function(e, t) {
  return t && (!_t(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, dp = function n() {
  return Jr && requestAnimationFrame(n);
}, Ja = function() {
  return bs = 1;
}, el = function() {
  return bs = 0;
}, jt = function(e) {
  return e;
}, en = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, ef = function() {
  return typeof window < "u";
}, tf = function() {
  return I || ef() && (I = window.gsap) && I.registerPlugin && I;
}, ur = function(e) {
  return !!~Uu.indexOf(e);
}, rf = function(e) {
  return (e === "Height" ? ia : q["inner" + e]) || Yt["client" + e] || ne["client" + e];
}, nf = function(e) {
  return Mi(e, "getBoundingClientRect") || (ur(e) ? function() {
    return es.width = q.innerWidth, es.height = ia, es;
  } : function() {
    return li(e);
  });
}, hp = function(e, t, i) {
  var r = i.d, s = i.d2, o = i.a;
  return (o = Mi(e, "getBoundingClientRect")) ? function() {
    return o()[r];
  } : function() {
    return (t ? rf(s) : e["client" + s]) || 0;
  };
}, pp = function(e, t) {
  return !t || ~ti.indexOf(e) ? nf(e) : function() {
    return es;
  };
}, Jt = function(e, t) {
  var i = t.s, r = t.d2, s = t.d, o = t.a;
  return Math.max(0, (i = "scroll" + r) && (o = Mi(e, i)) ? o() - nf(e)()[s] : ur(e) ? (Yt[i] || ne[i]) - rf(r) : e[i] - e["offset" + r]);
}, zn = function(e, t) {
  for (var i = 0; i < yr.length; i += 3)
    (!t || ~t.indexOf(yr[i + 1])) && e(yr[i], yr[i + 1], yr[i + 2]);
}, _t = function(e) {
  return typeof e == "string";
}, rt = function(e) {
  return typeof e == "function";
}, jn = function(e) {
  return typeof e == "number";
}, ji = function(e) {
  return typeof e == "object";
}, jr = function(e, t, i) {
  return e && e.progress(t ? 0 : 1) && i && e.pause();
}, Ws = function(e, t) {
  if (e.enabled) {
    var i = e._ctx ? e._ctx.add(function() {
      return t(e);
    }) : t(e);
    i && i.totalTime && (e.callbackAnimation = i);
  }
}, _r = Math.abs, sf = "left", of = "top", ra = "right", na = "bottom", nr = "width", sr = "height", un = "Right", fn = "Left", cn = "Top", dn = "Bottom", ye = "padding", kt = "margin", Vr = "Width", sa = "Height", Me = "px", Ot = function(e) {
  return q.getComputedStyle(e);
}, gp = function(e) {
  var t = Ot(e).position;
  e.style.position = t === "absolute" || t === "fixed" ? t : "relative";
}, tl = function(e, t) {
  for (var i in t)
    i in e || (e[i] = t[i]);
  return e;
}, li = function(e, t) {
  var i = t && Ot(e)[Eo] !== "matrix(1, 0, 0, 1, 0, 0)" && I.to(e, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), r = e.getBoundingClientRect();
  return i && i.progress(0).kill(), r;
}, Mo = function(e, t) {
  var i = t.d2;
  return e["offset" + i] || e["client" + i] || 0;
}, af = function(e) {
  var t = [], i = e.labels, r = e.duration(), s;
  for (s in i)
    t.push(i[s] / r);
  return t;
}, mp = function(e) {
  return function(t) {
    return I.utils.snap(af(e), t);
  };
}, oa = function(e) {
  var t = I.utils.snap(e), i = Array.isArray(e) && e.slice(0).sort(function(r, s) {
    return r - s;
  });
  return i ? function(r, s, o) {
    o === void 0 && (o = 1e-3);
    var a;
    if (!s)
      return t(r);
    if (s > 0) {
      for (r -= o, a = 0; a < i.length; a++)
        if (i[a] >= r)
          return i[a];
      return i[a - 1];
    } else
      for (a = i.length, r += o; a--; )
        if (i[a] <= r)
          return i[a];
    return i[0];
  } : function(r, s, o) {
    o === void 0 && (o = 1e-3);
    var a = t(r);
    return !s || Math.abs(a - r) < o || a - r < 0 == s < 0 ? a : t(s < 0 ? r - e : r + e);
  };
}, _p = function(e) {
  return function(t, i) {
    return oa(af(e))(t, i.direction);
  };
}, Ln = function(e, t, i, r) {
  return i.split(",").forEach(function(s) {
    return e(t, s, r);
  });
}, Oe = function(e, t, i, r, s) {
  return e.addEventListener(t, i, {
    passive: !r,
    capture: !!s
  });
}, ke = function(e, t, i, r) {
  return e.removeEventListener(t, i, !!r);
}, Rn = function(e, t, i) {
  i = i && i.wheelHandler, i && (e(t, "wheel", i), e(t, "touchmove", i));
}, il = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Fn = {
  toggleActions: "play",
  anticipatePin: 0
}, gs = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Kn = function(e, t) {
  if (_t(e)) {
    var i = e.indexOf("="), r = ~i ? +(e.charAt(i - 1) + 1) * parseFloat(e.substr(i + 1)) : 0;
    ~i && (e.indexOf("%") > i && (r *= t / 100), e = e.substr(0, i - 1)), e = r + (e in gs ? gs[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0);
  }
  return e;
}, Nn = function(e, t, i, r, s, o, a, l) {
  var u = s.startColor, f = s.endColor, d = s.fontSize, h = s.indent, c = s.fontWeight, g = ae.createElement("div"), p = ur(i) || Mi(i, "pinType") === "fixed", m = e.indexOf("scroller") !== -1, _ = p ? ne : i, w = e.indexOf("start") !== -1, y = w ? u : f, v = "border-color:" + y + ";font-size:" + d + ";color:" + y + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return v += "position:" + ((m || l) && p ? "fixed;" : "absolute;"), (m || l || !p) && (v += (r === Ee ? ra : na) + ":" + (o + parseFloat(h)) + "px;"), a && (v += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), g._isStart = w, g.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")), g.style.cssText = v, g.innerText = t || t === 0 ? e + "-" + t : e, _.children[0] ? _.insertBefore(g, _.children[0]) : _.appendChild(g), g._offset = g["offset" + r.op.d2], Zn(g, 0, r, w), g;
}, Zn = function(e, t, i, r) {
  var s = {
    display: "block"
  }, o = i[r ? "os2" : "p2"], a = i[r ? "p2" : "os2"];
  e._isFlipped = r, s[i.a + "Percent"] = r ? -100 : 0, s[i.a] = r ? "1px" : 0, s["border" + o + Vr] = 1, s["border" + a + Vr] = 0, s[i.p] = t + "px", I.set(e, s);
}, G = [], ko = {}, Tn, rl = function() {
  return et() - It > 34 && (Tn || (Tn = requestAnimationFrame(fi)));
}, vr = function() {
  (!Ze || !Ze.isPressed || Ze.startX > ne.clientWidth) && (H.cache++, Ze ? Tn || (Tn = requestAnimationFrame(fi)) : fi(), It || cr("scrollStart"), It = et());
}, Xs = function() {
  Ju = q.innerWidth, Qu = q.innerHeight;
}, tn = function() {
  H.cache++, !Ge && !Ku && !ae.fullscreenElement && !ae.webkitFullscreenElement && (!Zu || Ju !== q.innerWidth || Math.abs(q.innerHeight - Qu) > q.innerHeight * 0.25) && hs.restart(!0);
}, fr = {}, vp = [], lf = function n() {
  return ke(W, "scrollEnd", n) || Zi(!0);
}, cr = function(e) {
  return fr[e] && fr[e].map(function(t) {
    return t();
  }) || vp;
}, mt = [], uf = function(e) {
  for (var t = 0; t < mt.length; t += 5)
    (!e || mt[t + 4] && mt[t + 4].query === e) && (mt[t].style.cssText = mt[t + 1], mt[t].getBBox && mt[t].setAttribute("transform", mt[t + 2] || ""), mt[t + 3].uncache = 1);
}, aa = function(e, t) {
  var i;
  for (Qe = 0; Qe < G.length; Qe++)
    i = G[Qe], i && (!t || i._ctx === t) && (e ? i.kill(1) : i.revert(!0, !0));
  ps = !0, t && uf(t), t || cr("revert");
}, ff = function(e, t) {
  H.cache++, (t || !Je) && H.forEach(function(i) {
    return rt(i) && i.cacheID++ && (i.rec = 0);
  }), _t(e) && (q.history.scrollRestoration = ta = e);
}, Je, or = 0, nl, wp = function() {
  if (nl !== or) {
    var e = nl = or;
    requestAnimationFrame(function() {
      return e === or && Zi(!0);
    });
  }
}, cf = function() {
  ne.appendChild(Ar), ia = !Ze && Ar.offsetHeight || q.innerHeight, ne.removeChild(Ar);
}, sl = function(e) {
  return bn(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t) {
    return t.style.display = e ? "none" : "block";
  });
}, Zi = function(e, t) {
  if (It && !e && !ps) {
    Oe(W, "scrollEnd", lf);
    return;
  }
  cf(), Je = W.isRefreshing = !0, H.forEach(function(r) {
    return rt(r) && ++r.cacheID && (r.rec = r());
  });
  var i = cr("refreshInit");
  ju && W.sort(), t || aa(), H.forEach(function(r) {
    rt(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), G.slice(0).forEach(function(r) {
    return r.refresh();
  }), ps = !1, G.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var s = r.vars.horizontal ? "offsetWidth" : "offsetHeight", o = r.pin[s];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[s] - o), r.refresh();
    }
  }), Co = 1, sl(!0), G.forEach(function(r) {
    var s = Jt(r.scroller, r._dir), o = r.vars.end === "max" || r._endClamp && r.end > s, a = r._startClamp && r.start >= s;
    (o || a) && r.setPositions(a ? s - 1 : r.start, o ? Math.max(a ? s : r.start + 1, s) : r.end, !0);
  }), sl(!1), Co = 0, i.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), H.forEach(function(r) {
    rt(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), ff(ta, 1), hs.pause(), or++, Je = 2, fi(2), G.forEach(function(r) {
    return rt(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), Je = W.isRefreshing = !1, cr("refresh");
}, Oo = 0, Qn = 1, hn, fi = function(e) {
  if (e === 2 || !Je && !ps) {
    W.isUpdating = !0, hn && hn.update(0);
    var t = G.length, i = et(), r = i - Hs >= 50, s = t && G[0].scroll();
    if (Qn = Oo > s ? -1 : 1, Je || (Oo = s), r && (It && !bs && i - It > 200 && (It = 0, cr("scrollEnd")), Un = Hs, Hs = i), Qn < 0) {
      for (Qe = t; Qe-- > 0; )
        G[Qe] && G[Qe].update(0, r);
      Qn = 1;
    } else
      for (Qe = 0; Qe < t; Qe++)
        G[Qe] && G[Qe].update(0, r);
    W.isUpdating = !1;
  }
  Tn = 0;
}, Ao = [sf, of, na, ra, kt + dn, kt + un, kt + cn, kt + fn, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Jn = Ao.concat([nr, sr, "boxSizing", "max" + Vr, "max" + sa, "position", kt, ye, ye + cn, ye + un, ye + dn, ye + fn]), yp = function(e, t, i) {
  Dr(i);
  var r = e._gsap;
  if (r.spacerIsNative)
    Dr(r.spacerState);
  else if (e._gsap.swappedIn) {
    var s = t.parentNode;
    s && (s.insertBefore(e, t), s.removeChild(t));
  }
  e._gsap.swappedIn = !1;
}, qs = function(e, t, i, r) {
  if (!e._gsap.swappedIn) {
    for (var s = Ao.length, o = t.style, a = e.style, l; s--; )
      l = Ao[s], o[l] = i[l];
    o.position = i.position === "absolute" ? "absolute" : "relative", i.display === "inline" && (o.display = "inline-block"), a[na] = a[ra] = "auto", o.flexBasis = i.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[nr] = Mo(e, it) + Me, o[sr] = Mo(e, Ee) + Me, o[ye] = a[kt] = a[of] = a[sf] = "0", Dr(r), a[nr] = a["max" + Vr] = i[nr], a[sr] = a["max" + sa] = i[sr], a[ye] = i[ye], e.parentNode !== t && (e.parentNode.insertBefore(t, e), t.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, xp = /([A-Z])/g, Dr = function(e) {
  if (e) {
    var t = e.t.style, i = e.length, r = 0, s, o;
    for ((e.t._gsap || I.core.getCache(e.t)).uncache = 1; r < i; r += 2)
      o = e[r + 1], s = e[r], o ? t[s] = o : t[s] && t.removeProperty(s.replace(xp, "-$1").toLowerCase());
  }
}, Bn = function(e) {
  for (var t = Jn.length, i = e.style, r = [], s = 0; s < t; s++)
    r.push(Jn[s], i[Jn[s]]);
  return r.t = e, r;
}, bp = function(e, t, i) {
  for (var r = [], s = e.length, o = i ? 8 : 0, a; o < s; o += 2)
    a = e[o], r.push(a, a in t ? t[a] : e[o + 1]);
  return r.t = e.t, r;
}, es = {
  left: 0,
  top: 0
}, ol = function(e, t, i, r, s, o, a, l, u, f, d, h, c, g) {
  rt(e) && (e = e(l)), _t(e) && e.substr(0, 3) === "max" && (e = h + (e.charAt(4) === "=" ? Kn("0" + e.substr(3), i) : 0));
  var p = c ? c.time() : 0, m, _, w;
  if (c && c.seek(0), isNaN(e) || (e = +e), jn(e))
    c && (e = I.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, h, e)), a && Zn(a, i, r, !0);
  else {
    rt(t) && (t = t(l));
    var y = (e || "0").split(" "), v, T, C, S;
    w = at(t, l) || ne, v = li(w) || {}, (!v || !v.left && !v.top) && Ot(w).display === "none" && (S = w.style.display, w.style.display = "block", v = li(w), S ? w.style.display = S : w.style.removeProperty("display")), T = Kn(y[0], v[r.d]), C = Kn(y[1] || "0", i), e = v[r.p] - u[r.p] - f + T + s - C, a && Zn(a, C, r, i - C < 20 || a._isStart && C > 20), i -= i - C;
  }
  if (g && (l[g] = e || -1e-3, e < 0 && (e = 0)), o) {
    var M = e + i, P = o._isStart;
    m = "scroll" + r.d2, Zn(o, M, r, P && M > 20 || !P && (d ? Math.max(ne[m], Yt[m]) : o.parentNode[m]) <= M + 1), d && (u = li(a), d && (o.style[r.op.p] = u[r.op.p] - r.op.m - o._offset + Me));
  }
  return c && w && (m = li(w), c.seek(h), _ = li(w), c._caScrollDist = m[r.p] - _[r.p], e = e / c._caScrollDist * h), c && c.seek(p), c ? e : Math.round(e);
}, Tp = /(webkit|moz|length|cssText|inset)/i, al = function(e, t, i, r) {
  if (e.parentNode !== t) {
    var s = e.style, o, a;
    if (t === ne) {
      e._stOrig = s.cssText, a = Ot(e);
      for (o in a)
        !+o && !Tp.test(o) && a[o] && typeof s[o] == "string" && o !== "0" && (s[o] = a[o]);
      s.top = i, s.left = r;
    } else
      s.cssText = e._stOrig;
    I.core.getCache(e).uncache = 1, t.appendChild(e);
  }
}, df = function(e, t, i) {
  var r = t, s = r;
  return function(o) {
    var a = Math.round(e());
    return a !== r && a !== s && Math.abs(a - r) > 3 && Math.abs(a - s) > 3 && (o = a, i && i()), s = r, r = o, o;
  };
}, Vn = function(e, t, i) {
  var r = {};
  r[t.p] = "+=" + i, I.set(e, r);
}, ll = function(e, t) {
  var i = Ii(e, t), r = "_scroll" + t.p2, s = function o(a, l, u, f, d) {
    var h = o.tween, c = l.onComplete, g = {};
    u = u || i();
    var p = df(i, u, function() {
      h.kill(), o.tween = 0;
    });
    return d = f && d || 0, f = f || a - u, h && h.kill(), l[r] = a, l.modifiers = g, g[r] = function() {
      return p(u + f * h.ratio + d * h.ratio * h.ratio);
    }, l.onUpdate = function() {
      H.cache++, o.tween && fi();
    }, l.onComplete = function() {
      o.tween = 0, c && c.call(h);
    }, h = o.tween = I.to(e, l), h;
  };
  return e[r] = i, i.wheelHandler = function() {
    return s.tween && s.tween.kill() && (s.tween = 0);
  }, Oe(e, "wheel", i.wheelHandler), W.isTouch && Oe(e, "touchmove", i.wheelHandler), s;
}, W = /* @__PURE__ */ function() {
  function n(t, i) {
    wr || n.register(I) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Po(this), this.init(t, i);
  }
  var e = n.prototype;
  return e.init = function(i, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Jr) {
      this.update = this.refresh = this.kill = jt;
      return;
    }
    i = tl(_t(i) || jn(i) || i.nodeType ? {
      trigger: i
    } : i, Fn);
    var s = i, o = s.onUpdate, a = s.toggleClass, l = s.id, u = s.onToggle, f = s.onRefresh, d = s.scrub, h = s.trigger, c = s.pin, g = s.pinSpacing, p = s.invalidateOnRefresh, m = s.anticipatePin, _ = s.onScrubComplete, w = s.onSnapComplete, y = s.once, v = s.snap, T = s.pinReparent, C = s.pinSpacer, S = s.containerAnimation, M = s.fastScrollEnd, P = s.preventOverlaps, b = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? it : Ee, O = !d && d !== 0, k = at(i.scroller || q), A = I.core.getCache(k), z = ur(k), L = ("pinType" in i ? i.pinType : Mi(k, "pinType") || z && "fixed") === "fixed", B = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], F = O && i.toggleActions.split(" "), X = "markers" in i ? i.markers : Fn.markers, J = z ? 0 : parseFloat(Ot(k)["border" + b.p2 + Vr]) || 0, x = this, ee = i.onRefreshInit && function() {
      return i.onRefreshInit(x);
    }, Ie = hp(k, z, b), Lt = pp(k, z), fe = 0, ze = 0, We = 0, me = Ii(k, b), Xe, Ne, hi, qe, Ht, Z, _e, nt, ht, E, pt, ri, Li, ve, Ri, Fi, $r, Te, he, Rt, Ft, Ni, ni, Wt, st, Bi, hr, pr, Vi, pi, gi, j, Gi, Nt, Bt, Vt, $i, gr, si;
    if (x._startClamp = x._endClamp = !1, x._dir = b, m *= 45, x.scroller = k, x.scroll = S ? S.time.bind(S) : me, qe = me(), x.vars = i, r = r || i.animation, "refreshPriority" in i && (ju = 1, i.refreshPriority === -9999 && (hn = x)), A.tweenScroll = A.tweenScroll || {
      top: ll(k, Ee),
      left: ll(k, it)
    }, x.tweenTo = Xe = A.tweenScroll[b.p], x.scrubDuration = function(D) {
      Gi = jn(D) && D, Gi ? j ? j.duration(D) : j = I.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        duration: Gi,
        paused: !0,
        onComplete: function() {
          return _ && _(x);
        }
      }) : (j && j.progress(1).kill(), j = 0);
    }, r && (r.vars.lazy = !1, r._initted && !x.isReverted || r.vars.immediateRender !== !1 && i.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), x.animation = r.pause(), r.scrollTrigger = x, x.scrubDuration(d), pi = 0, l || (l = r.vars.id)), v && ((!ji(v) || v.push) && (v = {
      snapTo: v
    }), "scrollBehavior" in ne.style && I.set(z ? [ne, Yt] : k, {
      scrollBehavior: "auto"
    }), H.forEach(function(D) {
      return rt(D) && D.target === (z ? ae.scrollingElement || Yt : k) && (D.smooth = !1);
    }), hi = rt(v.snapTo) ? v.snapTo : v.snapTo === "labels" ? mp(r) : v.snapTo === "labelsDirectional" ? _p(r) : v.directional !== !1 ? function(D, $) {
      return oa(v.snapTo)(D, et() - ze < 500 ? 0 : $.direction);
    } : I.utils.snap(v.snapTo), Nt = v.duration || {
      min: 0.1,
      max: 2
    }, Nt = ji(Nt) ? Er(Nt.min, Nt.max) : Er(Nt, Nt), Bt = I.delayedCall(v.delay || Gi / 2 || 0.1, function() {
      var D = me(), $ = et() - ze < 500, N = Xe.tween;
      if (($ || Math.abs(x.getVelocity()) < 10) && !N && !bs && fe !== D) {
        var Y = (D - Z) / ve, Pe = r && !O ? r.totalProgress() : Y, K = $ ? 0 : (Pe - gi) / (et() - Un) * 1e3 || 0, pe = I.utils.clamp(-Y, 1 - Y, _r(K / 2) * K / 0.185), Ue = Y + (v.inertia === !1 ? 0 : pe), Ce = Er(0, 1, hi(Ue, x)), se = Math.round(Z + Ce * ve), te = v, Gt = te.onStart, oe = te.onInterrupt, gt = te.onComplete;
        if (D <= _e && D >= Z && se !== D) {
          if (N && !N._initted && N.data <= _r(se - D))
            return;
          v.inertia === !1 && (pe = Ce - Y), Xe(se, {
            duration: Nt(_r(Math.max(_r(Ue - Pe), _r(Ce - Pe)) * 0.185 / K / 0.05 || 0)),
            ease: v.ease || "power3",
            data: _r(se - D),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Bt.restart(!0) && oe && oe(x);
            },
            onComplete: function() {
              x.update(), fe = me(), j && r && r.progress(Ce), pi = gi = r && !O ? r.totalProgress() : x.progress, w && w(x), gt && gt(x);
            }
          }, D, pe * ve, se - D - pe * ve), Gt && Gt(x, Xe.tween);
        }
      } else
        x.isActive && fe !== D && Bt.restart(!0);
    }).pause()), l && (ko[l] = x), h = x.trigger = at(h || c !== !0 && c), si = h && h._gsap && h._gsap.stRevert, si && (si = si(x)), c = c === !0 ? h : at(c), _t(a) && (a = {
      targets: h,
      className: a
    }), c && (g === !1 || g === kt || (g = !g && c.parentNode && c.parentNode.style && Ot(c.parentNode).display === "flex" ? !1 : ye), x.pin = c, Ne = I.core.getCache(c), Ne.spacer ? Ri = Ne.pinState : (C && (C = at(C), C && !C.nodeType && (C = C.current || C.nativeElement), Ne.spacerIsNative = !!C, C && (Ne.spacerState = Bn(C))), Ne.spacer = Te = C || ae.createElement("div"), Te.classList.add("pin-spacer"), l && Te.classList.add("pin-spacer-" + l), Ne.pinState = Ri = Bn(c)), i.force3D !== !1 && I.set(c, {
      force3D: !0
    }), x.spacer = Te = Ne.spacer, Vi = Ot(c), Wt = Vi[g + b.os2], Rt = I.getProperty(c), Ft = I.quickSetter(c, b.a, Me), qs(c, Te, Vi), $r = Bn(c)), X) {
      ri = ji(X) ? tl(X, il) : il, E = Nn("scroller-start", l, k, b, ri, 0), pt = Nn("scroller-end", l, k, b, ri, 0, E), he = E["offset" + b.op.d2];
      var V = at(Mi(k, "content") || k);
      nt = this.markerStart = Nn("start", l, V, b, ri, he, 0, S), ht = this.markerEnd = Nn("end", l, V, b, ri, he, 0, S), S && (gr = I.quickSetter([nt, ht], b.a, Me)), !L && !(ti.length && Mi(k, "fixedMarkers") === !0) && (gp(z ? ne : k), I.set([E, pt], {
        force3D: !0
      }), Bi = I.quickSetter(E, b.a, Me), pr = I.quickSetter(pt, b.a, Me));
    }
    if (S) {
      var R = S.vars.onUpdate, Q = S.vars.onUpdateParams;
      S.eventCallback("onUpdate", function() {
        x.update(0, 0, 1), R && R.apply(S, Q || []);
      });
    }
    if (x.previous = function() {
      return G[G.indexOf(x) - 1];
    }, x.next = function() {
      return G[G.indexOf(x) + 1];
    }, x.revert = function(D, $) {
      if (!$)
        return x.kill(!0);
      var N = D !== !1 || !x.enabled, Y = Ge;
      N !== x.isReverted && (N && (Vt = Math.max(me(), x.scroll.rec || 0), We = x.progress, $i = r && r.progress()), nt && [nt, ht, E, pt].forEach(function(Pe) {
        return Pe.style.display = N ? "none" : "block";
      }), N && (Ge = x, x.update(N)), c && (!T || !x.isActive) && (N ? yp(c, Te, Ri) : qs(c, Te, Ot(c), st)), N || x.update(N), Ge = Y, x.isReverted = N);
    }, x.refresh = function(D, $, N, Y) {
      if (!((Ge || !x.enabled) && !$)) {
        if (c && D && It) {
          Oe(n, "scrollEnd", lf);
          return;
        }
        !Je && ee && ee(x), Ge = x, Xe.tween && !N && (Xe.tween.kill(), Xe.tween = 0), j && j.pause(), p && r && r.revert({
          kill: !1
        }).invalidate(), x.isReverted || x.revert(!0, !0), x._subPinOffset = !1;
        var Pe = Ie(), K = Lt(), pe = S ? S.duration() : Jt(k, b), Ue = ve <= 0.01, Ce = 0, se = Y || 0, te = ji(N) ? N.end : i.end, Gt = i.endTrigger || h, oe = ji(N) ? N.start : i.start || (i.start === 0 || !h ? 0 : c ? "0 0" : "0 100%"), gt = x.pinnedContainer = i.pinnedContainer && at(i.pinnedContainer, x), Xt = h && Math.max(0, G.indexOf(x)) || 0, ot = Xt, Le, Be, Yi, En, Ve, Se, qt, Ts, la, Yr, Ut, Hr, Pn;
        for (X && ji(N) && (Hr = I.getProperty(E, b.p), Pn = I.getProperty(pt, b.p)); ot--; )
          Se = G[ot], Se.end || Se.refresh(0, 1) || (Ge = x), qt = Se.pin, qt && (qt === h || qt === c || qt === gt) && !Se.isReverted && (Yr || (Yr = []), Yr.unshift(Se), Se.revert(!0, !0)), Se !== G[ot] && (Xt--, ot--);
        for (rt(oe) && (oe = oe(x)), oe = Za(oe, "start", x), Z = ol(oe, h, Pe, b, me(), nt, E, x, K, J, L, pe, S, x._startClamp && "_startClamp") || (c ? -1e-3 : 0), rt(te) && (te = te(x)), _t(te) && !te.indexOf("+=") && (~te.indexOf(" ") ? te = (_t(oe) ? oe.split(" ")[0] : "") + te : (Ce = Kn(te.substr(2), Pe), te = _t(oe) ? oe : (S ? I.utils.mapRange(0, S.duration(), S.scrollTrigger.start, S.scrollTrigger.end, Z) : Z) + Ce, Gt = h)), te = Za(te, "end", x), _e = Math.max(Z, ol(te || (Gt ? "100% 0" : pe), Gt, Pe, b, me() + Ce, ht, pt, x, K, J, L, pe, S, x._endClamp && "_endClamp")) || -1e-3, Ce = 0, ot = Xt; ot--; )
          Se = G[ot], qt = Se.pin, qt && Se.start - Se._pinPush <= Z && !S && Se.end > 0 && (Le = Se.end - (x._startClamp ? Math.max(0, Se.start) : Se.start), (qt === h && Se.start - Se._pinPush < Z || qt === gt) && isNaN(oe) && (Ce += Le * (1 - Se.progress)), qt === c && (se += Le));
        if (Z += Ce, _e += Ce, x._startClamp && (x._startClamp += Ce), x._endClamp && !Je && (x._endClamp = _e || -1e-3, _e = Math.min(_e, Jt(k, b))), ve = _e - Z || (Z -= 0.01) && 1e-3, Ue && (We = I.utils.clamp(0, 1, I.utils.normalize(Z, _e, Vt))), x._pinPush = se, nt && Ce && (Le = {}, Le[b.a] = "+=" + Ce, gt && (Le[b.p] = "-=" + me()), I.set([nt, ht], Le)), c && !(Co && x.end >= Jt(k, b)))
          Le = Ot(c), En = b === Ee, Yi = me(), Ni = parseFloat(Rt(b.a)) + se, !pe && _e > 1 && (Ut = (z ? ae.scrollingElement || Yt : k).style, Ut = {
            style: Ut,
            value: Ut["overflow" + b.a.toUpperCase()]
          }, z && Ot(ne)["overflow" + b.a.toUpperCase()] !== "scroll" && (Ut.style["overflow" + b.a.toUpperCase()] = "scroll")), qs(c, Te, Le), $r = Bn(c), Be = li(c, !0), Ts = L && Ii(k, En ? it : Ee)(), g && (st = [g + b.os2, ve + se + Me], st.t = Te, ot = g === ye ? Mo(c, b) + ve + se : 0, ot && (st.push(b.d, ot + Me), Te.style.flexBasis !== "auto" && (Te.style.flexBasis = ot + Me)), Dr(st), gt && G.forEach(function(Wr) {
            Wr.pin === gt && Wr.vars.pinSpacing !== !1 && (Wr._subPinOffset = !0);
          }), L && me(Vt)), L && (Ve = {
            top: Be.top + (En ? Yi - Z : Ts) + Me,
            left: Be.left + (En ? Ts : Yi - Z) + Me,
            boxSizing: "border-box",
            position: "fixed"
          }, Ve[nr] = Ve["max" + Vr] = Math.ceil(Be.width) + Me, Ve[sr] = Ve["max" + sa] = Math.ceil(Be.height) + Me, Ve[kt] = Ve[kt + cn] = Ve[kt + un] = Ve[kt + dn] = Ve[kt + fn] = "0", Ve[ye] = Le[ye], Ve[ye + cn] = Le[ye + cn], Ve[ye + un] = Le[ye + un], Ve[ye + dn] = Le[ye + dn], Ve[ye + fn] = Le[ye + fn], Fi = bp(Ri, Ve, T), Je && me(0)), r ? (la = r._initted, $s(1), r.render(r.duration(), !0, !0), ni = Rt(b.a) - Ni + ve + se, hr = Math.abs(ve - ni) > 1, L && hr && Fi.splice(Fi.length - 2, 2), r.render(0, !0, !0), la || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), $s(0)) : ni = ve, Ut && (Ut.value ? Ut.style["overflow" + b.a.toUpperCase()] = Ut.value : Ut.style.removeProperty("overflow-" + b.a));
        else if (h && me() && !S)
          for (Be = h.parentNode; Be && Be !== ne; )
            Be._pinOffset && (Z -= Be._pinOffset, _e -= Be._pinOffset), Be = Be.parentNode;
        Yr && Yr.forEach(function(Wr) {
          return Wr.revert(!1, !0);
        }), x.start = Z, x.end = _e, qe = Ht = Je ? Vt : me(), !S && !Je && (qe < Vt && me(Vt), x.scroll.rec = 0), x.revert(!1, !0), ze = et(), Bt && (fe = -1, Bt.restart(!0)), Ge = 0, r && O && (r._initted || $i) && r.progress() !== $i && r.progress($i || 0, !0).render(r.time(), !0, !0), (Ue || We !== x.progress || S) && (r && !O && r.totalProgress(S && Z < -1e-3 && !We ? I.utils.normalize(Z, _e, 0) : We, !0), x.progress = Ue || (qe - Z) / ve === We ? 0 : We), c && g && (Te._pinOffset = Math.round(x.progress * ni)), j && j.invalidate(), isNaN(Hr) || (Hr -= I.getProperty(E, b.p), Pn -= I.getProperty(pt, b.p), Vn(E, b, Hr), Vn(nt, b, Hr - (Y || 0)), Vn(pt, b, Pn), Vn(ht, b, Pn - (Y || 0))), Ue && !Je && x.update(), f && !Je && !Li && (Li = !0, f(x), Li = !1);
      }
    }, x.getVelocity = function() {
      return (me() - Ht) / (et() - Un) * 1e3 || 0;
    }, x.endAnimation = function() {
      jr(x.callbackAnimation), r && (j ? j.progress(1) : r.paused() ? O || jr(r, x.direction < 0, 1) : jr(r, r.reversed()));
    }, x.labelToScroll = function(D) {
      return r && r.labels && (Z || x.refresh() || Z) + r.labels[D] / r.duration() * ve || 0;
    }, x.getTrailing = function(D) {
      var $ = G.indexOf(x), N = x.direction > 0 ? G.slice(0, $).reverse() : G.slice($ + 1);
      return (_t(D) ? N.filter(function(Y) {
        return Y.vars.preventOverlaps === D;
      }) : N).filter(function(Y) {
        return x.direction > 0 ? Y.end <= Z : Y.start >= _e;
      });
    }, x.update = function(D, $, N) {
      if (!(S && !N && !D)) {
        var Y = Je === !0 ? Vt : x.scroll(), Pe = D ? 0 : (Y - Z) / ve, K = Pe < 0 ? 0 : Pe > 1 ? 1 : Pe || 0, pe = x.progress, Ue, Ce, se, te, Gt, oe, gt, Xt;
        if ($ && (Ht = qe, qe = S ? me() : Y, v && (gi = pi, pi = r && !O ? r.totalProgress() : K)), m && !K && c && !Ge && !In && It && Z < Y + (Y - Ht) / (et() - Un) * m && (K = 1e-4), K !== pe && x.enabled) {
          if (Ue = x.isActive = !!K && K < 1, Ce = !!pe && pe < 1, oe = Ue !== Ce, Gt = oe || !!K != !!pe, x.direction = K > pe ? 1 : -1, x.progress = K, Gt && !Ge && (se = K && !pe ? 0 : K === 1 ? 1 : pe === 1 ? 2 : 3, O && (te = !oe && F[se + 1] !== "none" && F[se + 1] || F[se], Xt = r && (te === "complete" || te === "reset" || te in r))), P && (oe || Xt) && (Xt || d || !r) && (rt(P) ? P(x) : x.getTrailing(P).forEach(function(Yi) {
            return Yi.endAnimation();
          })), O || (j && !Ge && !In ? (j._dp._time - j._start !== j._time && j.render(j._dp._time - j._start), j.resetTo ? j.resetTo("totalProgress", K, r._tTime / r._tDur) : (j.vars.totalProgress = K, j.invalidate().restart())) : r && r.totalProgress(K, !!(Ge && (ze || D)))), c) {
            if (D && g && (Te.style[g + b.os2] = Wt), !L)
              Ft(en(Ni + ni * K));
            else if (Gt) {
              if (gt = !D && K > pe && _e + 1 > Y && Y + 1 >= Jt(k, b), T)
                if (!D && (Ue || gt)) {
                  var ot = li(c, !0), Le = Y - Z;
                  al(c, ne, ot.top + (b === Ee ? Le : 0) + Me, ot.left + (b === Ee ? 0 : Le) + Me);
                } else
                  al(c, Te);
              Dr(Ue || gt ? Fi : $r), hr && K < 1 && Ue || Ft(Ni + (K === 1 && !gt ? ni : 0));
            }
          }
          v && !Xe.tween && !Ge && !In && Bt.restart(!0), a && (oe || y && K && (K < 1 || !Ys)) && bn(a.targets).forEach(function(Yi) {
            return Yi.classList[Ue || y ? "add" : "remove"](a.className);
          }), o && !O && !D && o(x), Gt && !Ge ? (O && (Xt && (te === "complete" ? r.pause().totalProgress(1) : te === "reset" ? r.restart(!0).pause() : te === "restart" ? r.restart(!0) : r[te]()), o && o(x)), (oe || !Ys) && (u && oe && Ws(x, u), B[se] && Ws(x, B[se]), y && (K === 1 ? x.kill(!1, 1) : B[se] = 0), oe || (se = K === 1 ? 1 : 3, B[se] && Ws(x, B[se]))), M && !Ue && Math.abs(x.getVelocity()) > (jn(M) ? M : 2500) && (jr(x.callbackAnimation), j ? j.progress(1) : jr(r, te === "reverse" ? 1 : !K, 1))) : O && o && !Ge && o(x);
        }
        if (pr) {
          var Be = S ? Y / S.duration() * (S._caScrollDist || 0) : Y;
          Bi(Be + (E._isFlipped ? 1 : 0)), pr(Be);
        }
        gr && gr(-Y / S.duration() * (S._caScrollDist || 0));
      }
    }, x.enable = function(D, $) {
      x.enabled || (x.enabled = !0, Oe(k, "resize", tn), z || Oe(k, "scroll", vr), ee && Oe(n, "refreshInit", ee), D !== !1 && (x.progress = We = 0, qe = Ht = fe = me()), $ !== !1 && x.refresh());
    }, x.getTween = function(D) {
      return D && Xe ? Xe.tween : j;
    }, x.setPositions = function(D, $, N, Y) {
      if (S) {
        var Pe = S.scrollTrigger, K = S.duration(), pe = Pe.end - Pe.start;
        D = Pe.start + pe * D / K, $ = Pe.start + pe * $ / K;
      }
      x.refresh(!1, !1, {
        start: Qa(D, N && !!x._startClamp),
        end: Qa($, N && !!x._endClamp)
      }, Y), x.update();
    }, x.adjustPinSpacing = function(D) {
      if (st && D) {
        var $ = st.indexOf(b.d) + 1;
        st[$] = parseFloat(st[$]) + D + Me, st[1] = parseFloat(st[1]) + D + Me, Dr(st);
      }
    }, x.disable = function(D, $) {
      if (x.enabled && (D !== !1 && x.revert(!0, !0), x.enabled = x.isActive = !1, $ || j && j.pause(), Vt = 0, Ne && (Ne.uncache = 1), ee && ke(n, "refreshInit", ee), Bt && (Bt.pause(), Xe.tween && Xe.tween.kill() && (Xe.tween = 0)), !z)) {
        for (var N = G.length; N--; )
          if (G[N].scroller === k && G[N] !== x)
            return;
        ke(k, "resize", tn), z || ke(k, "scroll", vr);
      }
    }, x.kill = function(D, $) {
      x.disable(D, $), j && !$ && j.kill(), l && delete ko[l];
      var N = G.indexOf(x);
      N >= 0 && G.splice(N, 1), N === Qe && Qn > 0 && Qe--, N = 0, G.forEach(function(Y) {
        return Y.scroller === x.scroller && (N = 1);
      }), N || Je || (x.scroll.rec = 0), r && (r.scrollTrigger = null, D && r.revert({
        kill: !1
      }), $ || r.kill()), nt && [nt, ht, E, pt].forEach(function(Y) {
        return Y.parentNode && Y.parentNode.removeChild(Y);
      }), hn === x && (hn = 0), c && (Ne && (Ne.uncache = 1), N = 0, G.forEach(function(Y) {
        return Y.pin === c && N++;
      }), N || (Ne.spacer = 0)), i.onKill && i.onKill(x);
    }, G.push(x), x.enable(!1, !1), si && si(x), r && r.add && !ve) {
      var we = x.update;
      x.update = function() {
        x.update = we, Z || _e || x.refresh();
      }, I.delayedCall(0.01, x.update), ve = 0.01, Z = _e = 0;
    } else
      x.refresh();
    c && wp();
  }, n.register = function(i) {
    return wr || (I = i || tf(), ef() && window.document && n.enable(), wr = Jr), wr;
  }, n.defaults = function(i) {
    if (i)
      for (var r in i)
        Fn[r] = i[r];
    return Fn;
  }, n.disable = function(i, r) {
    Jr = 0, G.forEach(function(o) {
      return o[r ? "kill" : "disable"](i);
    }), ke(q, "wheel", vr), ke(ae, "scroll", vr), clearInterval(Dn), ke(ae, "touchcancel", jt), ke(ne, "touchstart", jt), Ln(ke, ae, "pointerdown,touchstart,mousedown", Ja), Ln(ke, ae, "pointerup,touchend,mouseup", el), hs.kill(), zn(ke);
    for (var s = 0; s < H.length; s += 3)
      Rn(ke, H[s], H[s + 1]), Rn(ke, H[s], H[s + 2]);
  }, n.enable = function() {
    if (q = window, ae = document, Yt = ae.documentElement, ne = ae.body, I && (bn = I.utils.toArray, Er = I.utils.clamp, Po = I.core.context || jt, $s = I.core.suppressOverwrites || jt, ta = q.history.scrollRestoration || "auto", Oo = q.pageYOffset, I.core.globals("ScrollTrigger", n), ne)) {
      Jr = 1, Ar = document.createElement("div"), Ar.style.height = "100vh", Ar.style.position = "absolute", cf(), dp(), be.register(I), n.isTouch = be.isTouch, vi = be.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Oe(q, "wheel", vr), Uu = [q, ae, Yt, ne], I.matchMedia ? (n.matchMedia = function(l) {
        var u = I.matchMedia(), f;
        for (f in l)
          u.add(f, l[f]);
        return u;
      }, I.addEventListener("matchMediaInit", function() {
        return aa();
      }), I.addEventListener("matchMediaRevert", function() {
        return uf();
      }), I.addEventListener("matchMedia", function() {
        Zi(0, 1), cr("matchMedia");
      }), I.matchMedia("(orientation: portrait)", function() {
        return Xs(), Xs;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Xs(), Oe(ae, "scroll", vr);
      var i = ne.style, r = i.borderTopStyle, s = I.core.Animation.prototype, o, a;
      for (s.revert || Object.defineProperty(s, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), i.borderTopStyle = "solid", o = li(ne), Ee.m = Math.round(o.top + Ee.sc()) || 0, it.m = Math.round(o.left + it.sc()) || 0, r ? i.borderTopStyle = r : i.removeProperty("border-top-style"), Dn = setInterval(rl, 250), I.delayedCall(0.5, function() {
        return In = 0;
      }), Oe(ae, "touchcancel", jt), Oe(ne, "touchstart", jt), Ln(Oe, ae, "pointerdown,touchstart,mousedown", Ja), Ln(Oe, ae, "pointerup,touchend,mouseup", el), Eo = I.utils.checkPrefix("transform"), Jn.push(Eo), wr = et(), hs = I.delayedCall(0.2, Zi).pause(), yr = [ae, "visibilitychange", function() {
        var l = q.innerWidth, u = q.innerHeight;
        ae.hidden ? (ja = l, Ka = u) : (ja !== l || Ka !== u) && tn();
      }, ae, "DOMContentLoaded", Zi, q, "load", Zi, q, "resize", tn], zn(Oe), G.forEach(function(l) {
        return l.enable(0, 1);
      }), a = 0; a < H.length; a += 3)
        Rn(ke, H[a], H[a + 1]), Rn(ke, H[a], H[a + 2]);
    }
  }, n.config = function(i) {
    "limitCallbacks" in i && (Ys = !!i.limitCallbacks);
    var r = i.syncInterval;
    r && clearInterval(Dn) || (Dn = r) && setInterval(rl, r), "ignoreMobileResize" in i && (Zu = n.isTouch === 1 && i.ignoreMobileResize), "autoRefreshEvents" in i && (zn(ke) || zn(Oe, i.autoRefreshEvents || "none"), Ku = (i.autoRefreshEvents + "").indexOf("resize") === -1);
  }, n.scrollerProxy = function(i, r) {
    var s = at(i), o = H.indexOf(s), a = ur(s);
    ~o && H.splice(o, a ? 6 : 2), r && (a ? ti.unshift(q, r, ne, r, Yt, r) : ti.unshift(s, r));
  }, n.clearMatchMedia = function(i) {
    G.forEach(function(r) {
      return r._ctx && r._ctx.query === i && r._ctx.kill(!0, !0);
    });
  }, n.isInViewport = function(i, r, s) {
    var o = (_t(i) ? at(i) : i).getBoundingClientRect(), a = o[s ? nr : sr] * r || 0;
    return s ? o.right - a > 0 && o.left + a < q.innerWidth : o.bottom - a > 0 && o.top + a < q.innerHeight;
  }, n.positionInViewport = function(i, r, s) {
    _t(i) && (i = at(i));
    var o = i.getBoundingClientRect(), a = o[s ? nr : sr], l = r == null ? a / 2 : r in gs ? gs[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
    return s ? (o.left + l) / q.innerWidth : (o.top + l) / q.innerHeight;
  }, n.killAll = function(i) {
    if (G.slice(0).forEach(function(s) {
      return s.vars.id !== "ScrollSmoother" && s.kill();
    }), i !== !0) {
      var r = fr.killAll || [];
      fr = {}, r.forEach(function(s) {
        return s();
      });
    }
  }, n;
}();
W.version = "3.12.4";
W.saveStyles = function(n) {
  return n ? bn(n).forEach(function(e) {
    if (e && e.style) {
      var t = mt.indexOf(e);
      t >= 0 && mt.splice(t, 5), mt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), I.core.getCache(e), Po());
    }
  }) : mt;
};
W.revert = function(n, e) {
  return aa(!n, e);
};
W.create = function(n, e) {
  return new W(n, e);
};
W.refresh = function(n) {
  return n ? tn() : (wr || W.register()) && Zi(!0);
};
W.update = function(n) {
  return ++H.cache && fi(n === !0 ? 2 : 0);
};
W.clearScrollMemory = ff;
W.maxScroll = function(n, e) {
  return Jt(n, e ? it : Ee);
};
W.getScrollFunc = function(n, e) {
  return Ii(at(n), e ? it : Ee);
};
W.getById = function(n) {
  return ko[n];
};
W.getAll = function() {
  return G.filter(function(n) {
    return n.vars.id !== "ScrollSmoother";
  });
};
W.isScrolling = function() {
  return !!It;
};
W.snapDirectional = oa;
W.addEventListener = function(n, e) {
  var t = fr[n] || (fr[n] = []);
  ~t.indexOf(e) || t.push(e);
};
W.removeEventListener = function(n, e) {
  var t = fr[n], i = t && t.indexOf(e);
  i >= 0 && t.splice(i, 1);
};
W.batch = function(n, e) {
  var t = [], i = {}, r = e.interval || 0.016, s = e.batchMax || 1e9, o = function(u, f) {
    var d = [], h = [], c = I.delayedCall(r, function() {
      f(d, h), d = [], h = [];
    }).pause();
    return function(g) {
      d.length || c.restart(!0), d.push(g.trigger), h.push(g), s <= d.length && c.progress(1);
    };
  }, a;
  for (a in e)
    i[a] = a.substr(0, 2) === "on" && rt(e[a]) && a !== "onRefreshInit" ? o(a, e[a]) : e[a];
  return rt(s) && (s = s(), Oe(W, "refresh", function() {
    return s = e.batchMax();
  })), bn(n).forEach(function(l) {
    var u = {};
    for (a in i)
      u[a] = i[a];
    u.trigger = l, t.push(W.create(u));
  }), t;
};
var ul = function(e, t, i, r) {
  return t > r ? e(r) : t < 0 && e(0), i > r ? (r - t) / (i - t) : i < 0 ? t / (t - i) : 1;
}, Us = function n(e, t) {
  t === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = t === !0 ? "auto" : t ? "pan-" + t + (be.isTouch ? " pinch-zoom" : "") : "none", e === Yt && n(ne, t);
}, Gn = {
  auto: 1,
  scroll: 1
}, Sp = function(e) {
  var t = e.event, i = e.target, r = e.axis, s = (t.changedTouches ? t.changedTouches[0] : t).target, o = s._gsap || I.core.getCache(s), a = et(), l;
  if (!o._isScrollT || a - o._isScrollT > 2e3) {
    for (; s && s !== ne && (s.scrollHeight <= s.clientHeight && s.scrollWidth <= s.clientWidth || !(Gn[(l = Ot(s)).overflowY] || Gn[l.overflowX])); )
      s = s.parentNode;
    o._isScroll = s && s !== i && !ur(s) && (Gn[(l = Ot(s)).overflowY] || Gn[l.overflowX]), o._isScrollT = a;
  }
  (o._isScroll || r === "x") && (t.stopPropagation(), t._gsapAllow = !0);
}, hf = function(e, t, i, r) {
  return be.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: t,
    onWheel: r = r && Sp,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return i && Oe(ae, be.eventTypes[0], cl, !1, !0);
    },
    onDisable: function() {
      return ke(ae, be.eventTypes[0], cl, !0);
    }
  });
}, Ep = /(input|label|select|textarea)/i, fl, cl = function(e) {
  var t = Ep.test(e.target.tagName);
  (t || fl) && (e._gsapAllow = !0, fl = t);
}, Pp = function(e) {
  ji(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var t = e, i = t.normalizeScrollX, r = t.momentum, s = t.allowNestedScroll, o = t.onRelease, a, l, u = at(e.target) || Yt, f = I.core.globals().ScrollSmoother, d = f && f.get(), h = vi && (e.content && at(e.content) || d && e.content !== !1 && !d.smooth() && d.content()), c = Ii(u, Ee), g = Ii(u, it), p = 1, m = (be.isTouch && q.visualViewport ? q.visualViewport.scale * q.visualViewport.width : q.outerWidth) / q.innerWidth, _ = 0, w = rt(r) ? function() {
    return r(a);
  } : function() {
    return r || 2.8;
  }, y, v, T = hf(u, e.type, !0, s), C = function() {
    return v = !1;
  }, S = jt, M = jt, P = function() {
    l = Jt(u, Ee), M = Er(vi ? 1 : 0, l), i && (S = Er(0, Jt(u, it))), y = or;
  }, b = function() {
    h._gsap.y = en(parseFloat(h._gsap.y) + c.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, O = function() {
    if (v) {
      requestAnimationFrame(C);
      var X = en(a.deltaY / 2), J = M(c.v - X);
      if (h && J !== c.v + c.offset) {
        c.offset = J - c.v;
        var x = en((parseFloat(h && h._gsap.y) || 0) - c.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + x + ", 0, 1)", h._gsap.y = x + "px", c.cacheID = H.cache, fi();
      }
      return !0;
    }
    c.offset && b(), v = !0;
  }, k, A, z, L, B = function() {
    P(), k.isActive() && k.vars.scrollY > l && (c() > l ? k.progress(1) && c(l) : k.resetTo("scrollY", l));
  };
  return h && I.set(h, {
    y: "+=0"
  }), e.ignoreCheck = function(F) {
    return vi && F.type === "touchmove" && O() || p > 1.05 && F.type !== "touchstart" || a.isGesturing || F.touches && F.touches.length > 1;
  }, e.onPress = function() {
    v = !1;
    var F = p;
    p = en((q.visualViewport && q.visualViewport.scale || 1) / m), k.pause(), F !== p && Us(u, p > 1.01 ? !0 : i ? !1 : "x"), A = g(), z = c(), P(), y = or;
  }, e.onRelease = e.onGestureStart = function(F, X) {
    if (c.offset && b(), !X)
      L.restart(!0);
    else {
      H.cache++;
      var J = w(), x, ee;
      i && (x = g(), ee = x + J * 0.05 * -F.velocityX / 0.227, J *= ul(g, x, ee, Jt(u, it)), k.vars.scrollX = S(ee)), x = c(), ee = x + J * 0.05 * -F.velocityY / 0.227, J *= ul(c, x, ee, Jt(u, Ee)), k.vars.scrollY = M(ee), k.invalidate().duration(J).play(0.01), (vi && k.vars.scrollY >= l || x >= l - 1) && I.to({}, {
        onUpdate: B,
        duration: J
      });
    }
    o && o(F);
  }, e.onWheel = function() {
    k._ts && k.pause(), et() - _ > 1e3 && (y = 0, _ = et());
  }, e.onChange = function(F, X, J, x, ee) {
    if (or !== y && P(), X && i && g(S(x[2] === X ? A + (F.startX - F.x) : g() + X - x[1])), J) {
      c.offset && b();
      var Ie = ee[2] === J, Lt = Ie ? z + F.startY - F.y : c() + J - ee[1], fe = M(Lt);
      Ie && Lt !== fe && (z += fe - Lt), c(fe);
    }
    (J || X) && fi();
  }, e.onEnable = function() {
    Us(u, i ? !1 : "x"), W.addEventListener("refresh", B), Oe(q, "resize", B), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = g.smooth = !1), T.enable();
  }, e.onDisable = function() {
    Us(u, !0), ke(q, "resize", B), W.removeEventListener("refresh", B), T.kill();
  }, e.lockAxis = e.lockAxis !== !1, a = new be(e), a.iOS = vi, vi && !c() && c(1), vi && I.ticker.add(jt), L = a._dc, k = I.to(a, {
    ease: "power4",
    paused: !0,
    scrollX: i ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: df(c, c(), function() {
        return k.pause();
      })
    },
    onUpdate: fi,
    onComplete: L.vars.onComplete
  }), a;
};
W.sort = function(n) {
  return G.sort(n || function(e, t) {
    return (e.vars.refreshPriority || 0) * -1e6 + e.start - (t.start + (t.vars.refreshPriority || 0) * -1e6);
  });
};
W.observe = function(n) {
  return new be(n);
};
W.normalizeScroll = function(n) {
  if (typeof n > "u")
    return Ze;
  if (n === !0 && Ze)
    return Ze.enable();
  if (n === !1) {
    Ze && Ze.kill(), Ze = n;
    return;
  }
  var e = n instanceof be ? n : Pp(n);
  return Ze && Ze.target === e.target && Ze.kill(), ur(e.target) && (Ze = e), e;
};
W.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: So,
  _inputObserver: hf,
  _scrollers: H,
  _proxies: ti,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      It || cr("scrollStart"), It = et();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Ge;
    }
  }
};
tf() && I.registerPlugin(W);
Tr.registerPlugin(W);
function Cp() {
  return {
    parallaxActive: !1,
    initParallax() {
      const n = document.querySelectorAll("[data-parallax]");
      n.length && (window.innerWidth >= 1024 && (this.parallaxActive = !0, n.forEach((e) => {
        this.animateParallax(e);
      })), window.addEventListener("resize", () => {
        window.innerWidth >= 1024 && !this.parallaxActive ? (this.parallaxActive = !0, n.forEach((e) => {
          this.animateParallax(e);
        })) : window.innerWidth < 1024 && this.parallaxActive && (this.parallaxActive = !1, n.forEach((e) => {
          Tr.killTweensOf(e), Tr.set(e, { clearProps: "all" });
        }));
      }));
    },
    animateParallax(n) {
      const e = n.dataset.speed ? parseFloat(n.dataset.speed) : 5;
      Tr.set(n, {
        scale: n.dataset.scale ? parseFloat(n.dataset.scale) : 1
      }), Tr.fromTo(
        n,
        {
          y: `-${e * (window.innerHeight / 100)}`
        },
        {
          y: `${e * (window.innerHeight / 100)}`,
          ease: "none",
          scrollTrigger: {
            trigger: n.parentElement,
            scrub: !0,
            start: "top bottom",
            end: "bottom top"
          }
        }
      );
    }
  };
}
function Mp() {
  return {
    filterOpen: !1
  };
}
function kp() {
  return {
    fields: {
      firstname: "",
      lastname: "",
      company: "",
      email: "",
      city: "",
      zipcode: "",
      phone: "",
      message: "",
      rgpd: !1
    },
    errorMessage: "",
    errors: {
      firstname: !1,
      lastname: !1,
      company: !1,
      email: !1,
      city: !1,
      zipcode: !1,
      phone: !1,
      message: !1,
      rgpd: !1
    },
    // States
    emailSent: !1,
    emailIsSending: !1,
    emailStatusMessage: "",
    // API
    apiUrl: "/wp-json/bemy/v1/contact",
    logInputs() {
      console.log(
        this.fields.firstname,
        this.fields.lastname,
        this.fields.company,
        this.fields.email,
        this.fields.city,
        this.fields.zipcode,
        this.fields.phone,
        this.fields.message,
        this.fields.rgpd
      );
    },
    submitForm() {
      grecaptcha.ready(function() {
        grecaptcha.execute("reCAPTCHA_site_key", { action: "submit" }).then(function(n) {
          console.log(n);
        });
      }), this.emailSent = !1, this.resetErrors(), this.checkForm();
    },
    checkForm() {
      this.fields.firstname === "" && (this.errors.firstname = !0), this.fields.lastname === "" && (this.errors.lastname = !0), this.fields.company === "" && (this.errors.company = !0), this.fields.email === "" ? this.errors.email = !0 : this.checkEmail(), this.fields.city === "" && (this.errors.city = !0), this.fields.zipcode === "" && (this.errors.zipcode = !0), this.fields.phone === "" ? this.errors.phone = !0 : this.checkPhone(), this.fields.message === "" ? this.errors.message = !0 : this.checkTextarea(), this.fields.rgpd === !1 && (this.errors.rgpd = !0), this.errors.firstname === !1 && this.errors.lastname === !1 && this.errors.company === !1 && this.errors.email === !1 && this.errors.city === !1 && this.errors.zipcode === !1 && this.errors.phone === !1 && this.errors.message === !1 && this.errors.rgpd === !1 ? (this.errorMessage = "", this.sendEmail()) : this.errorMessage = "Veuillez compléter tous les champs pour envoyer le formulaire.";
    },
    checkEmail() {
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.fields.email) ? this.errors.email = !1 : this.errors.email = !0;
    },
    checkPhone() {
      /^[0-9]{10}$/.test(this.fields.phone) ? this.errors.phone = !1 : this.errors.phone = !0;
    },
    checkTextarea() {
      /<("[^"]*"|'[^']*'|[^'">])*>/.test(this.fields.message) ? this.errors.message = !0 : this.errors.message = !1;
    },
    resetErrors() {
      this.errorMessage = "", this.errors.firstname = !1, this.errors.lastname = !1, this.errors.company = !1, this.errors.email = !1, this.errors.city = !1, this.errors.zipcode = !1, this.errors.phone = !1, this.errors.message = !1, this.errors.rgpd = !1;
    },
    sendEmail() {
      this.emailIsSending = !0;
      const n = {
        firstname: this.fields.firstname,
        lastname: this.fields.lastname,
        company: this.fields.company,
        email: this.fields.email,
        city: this.fields.city,
        zipcode: this.fields.zipcode,
        phone: this.fields.phone,
        message: this.fields.message
      };
      axios.post(this.apiUrl, n).then((e) => {
        console.log(e), e.data.success ? (this.emailIsSending = !1, this.emailSent = !0, this.emailStatusMessage = e.data.message, this.resetFields()) : (this.emailIsSending = !1, this.emailSent = !1, this.emailStatusMessage = "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer plus tard.", this.resetFields());
      }).catch((e) => {
        console.log(e);
      });
    },
    resetFields() {
      this.fields.firstname = "", this.fields.lastname = "", this.fields.company = "", this.fields.email = "", this.fields.city = "", this.fields.zipcode = "", this.fields.phone = "", this.fields.message = "", this.fields.rgpd = !1;
    }
  };
}
Rl({
  $delimiters: ["[[", "]]"],
  Menu: Pc,
  Slider: jd,
  Parallax: Cp,
  Documentations: Mp,
  Contact: kp
}).mount();
