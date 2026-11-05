/* DeedFlow site runtime — small reactive template engine (no dependencies)
   Templates use {{holes}}, <sc-for list="{{list}}" as="x">, <sc-if value="{{cond}}">
   and onClick / onInput / onChange attributes bound to functions from renderVals(). */
(function () {
  'use strict';

  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = this.state || {}; }
    setState(patch) {
      Object.assign(this.state, typeof patch === 'function' ? patch(this.state) : patch);
      DC._schedule(this);
    }
  }
  window.DCLogic = DCLogic;

  const DC = {
    _schedule(inst) {
      if (inst._raf) return;
      inst._raf = requestAnimationFrame(() => { inst._raf = 0; DC._render(inst); });
    },

    mount(Component, templateId, rootId) {
      const tpl = document.getElementById(templateId);
      const root = document.getElementById(rootId);
      const inst = new Component({});
      inst._tpl = tpl; inst._root = root;
      DC._render(inst, true);
      DC._delegate(root);
      if (inst.componentDidMount) inst.componentDidMount();
      window.addEventListener('beforeunload', () => inst.componentWillUnmount && inst.componentWillUnmount());
      DC._reveal(root);
      DC._header();
      return inst;
    },

    _render(inst, first) {
      const vals = inst.renderVals();
      const frag = inst._tpl.content.cloneNode(true);
      const wrap = document.createElement('div');
      wrap.appendChild(frag);
      DC._walk(wrap, vals);
      if (first) {
        inst._root.replaceChildren(...Array.from(wrap.childNodes));
      } else {
        DC._morphChildren(inst._root, wrap);
        DC._reveal(inst._root);
      }
    },

    /* ---------- template evaluation ---------- */
    _look(path, scope) {
      path = path.trim();
      if (path === 'true') return true;
      if (path === 'false') return false;
      if (/^-?\d+(\.\d+)?$/.test(path)) return +path;
      let cur = scope;
      for (const k of path.split('.')) { if (cur == null) return ''; cur = cur[k]; }
      return cur;
    },
    _interp(str, scope) {
      return str.replace(/\{\{([^}]+)\}\}/g, (_, x) => {
        const v = DC._look(x, scope);
        return typeof v === 'function' ? '' : (v == null ? '' : String(v));
      });
    },
    _walk(node, scope) {
      for (const ch of Array.from(node.childNodes)) {
        if (ch.nodeType === 3) { if (ch.nodeValue.includes('{{')) ch.nodeValue = DC._interp(ch.nodeValue, scope); continue; }
        if (ch.nodeType !== 1) continue;
        const tag = ch.tagName.toLowerCase();
        if (tag === 'sc-for') {
          const m = ch.getAttribute('list').match(/\{\{([^}]+)\}\}/);
          const list = DC._look(m[1], scope) || [];
          const as = ch.getAttribute('as');
          const frag = document.createDocumentFragment();
          list.forEach((item, i) => {
            const w = document.createElement('div');
            w.innerHTML = ch.innerHTML;
            DC._walk(w, Object.assign(Object.create(scope), { [as]: item, $index: i }));
            while (w.firstChild) frag.appendChild(w.firstChild);
          });
          ch.replaceWith(frag);
          continue;
        }
        if (tag === 'sc-if') {
          const m = ch.getAttribute('value').match(/\{\{([^}]+)\}\}/);
          const v = DC._look(m[1], scope);
          if (v) { DC._walk(ch, scope); ch.replaceWith(...Array.from(ch.childNodes)); } else ch.remove();
          continue;
        }
        for (const a of Array.from(ch.attributes)) {
          if (a.name.startsWith('hint-')) { ch.removeAttribute(a.name); continue; }
          if (/^on[a-z]+$/.test(a.name)) {
            const m = a.value.match(/\{\{([^}]+)\}\}/);
            const fn = m ? DC._look(m[1], scope) : null;
            ch.removeAttribute(a.name);
            if (typeof fn === 'function') { (ch.__h || (ch.__h = {}))[a.name.slice(2)] = fn; }
            continue;
          }
          if (a.value.includes('{{')) {
            const whole = a.value.match(/^\{\{([^}]+)\}\}$/);
            const v = whole ? DC._look(whole[1], scope) : undefined;
            if (whole && typeof v === 'boolean') { if (v) ch.setAttribute(a.name, ''); else ch.removeAttribute(a.name); }
            else ch.setAttribute(a.name, DC._interp(a.value, scope));
            if (a.name === 'data-src') { ch.setAttribute('src', ch.getAttribute('data-src')); ch.removeAttribute('data-src'); }
          }
        }
        DC._walk(ch, scope);
      }
    },

    /* ---------- DOM patching (keeps focus, scroll and running animations) ---------- */
    _morphChildren(live, fresh) {
      const a = Array.from(live.childNodes), b = Array.from(fresh.childNodes);
      const n = Math.max(a.length, b.length);
      for (let i = 0; i < n; i++) {
        const x = a[i], y = b[i];
        if (!y) { x.remove(); continue; }
        if (!x) { live.appendChild(y); continue; }
        DC._morph(x, y);
      }
    },
    _morph(x, y) {
      if (x.nodeType !== y.nodeType || (x.nodeType === 1 && x.tagName !== y.tagName)) { x.replaceWith(y); return; }
      if (x.nodeType === 3) { if (x.nodeValue !== y.nodeValue) x.nodeValue = y.nodeValue; return; }
      if (x.nodeType !== 1) return;
      // attributes
      for (const a of Array.from(x.attributes)) if (!y.hasAttribute(a.name)) x.removeAttribute(a.name);
      for (const a of Array.from(y.attributes)) {
        let v = a.value;
        if (a.name === 'class' && x.classList.contains('in')) v += ' in';
        if (x.getAttribute(a.name) !== v) x.setAttribute(a.name, v);
      }
      x.__h = y.__h;
      const tag = x.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        if (y.hasAttribute('value') && x.value !== y.getAttribute('value') && document.activeElement !== x) x.value = y.getAttribute('value');
        if (tag === 'INPUT' && (x.type === 'checkbox' || x.type === 'radio')) x.checked = y.hasAttribute('checked');
        if (tag === 'INPUT' && (x.type === 'range' || x.type === 'number') && document.activeElement === x && y.hasAttribute('value')) x.value = y.getAttribute('value');
      }
      if (x.tagName === 'svg' || x.namespaceURI === 'http://www.w3.org/2000/svg') {
        if (x.outerHTML !== y.outerHTML) { x.replaceWith(y); }
        return;
      }
      DC._morphChildren(x, y);
    },

    /* ---------- events (delegated) ---------- */
    _delegate(root) {
      ['click', 'input', 'change', 'keydown', 'submit'].forEach((type) => {
        root.addEventListener(type, (e) => {
          let el = e.target;
          while (el && el !== root) {
            if (el.__h && el.__h[type]) { el.__h[type](e); if (type === 'submit') e.preventDefault(); return; }
            el = el.parentNode;
          }
        });
      });
      // onMouseEnter / onMouseLeave: mouseenter/mouseleave don't bubble, so emulate
      // them on top of the bubbling mouseover/mouseout events (hoverIntent-style).
      [['mouseover', 'mouseenter'], ['mouseout', 'mouseleave']].forEach(([native, virtual]) => {
        root.addEventListener(native, (e) => {
          let el = e.target;
          while (el && el !== root) {
            if (el.__h && el.__h[virtual] && !el.contains(e.relatedTarget)) { el.__h[virtual](e); return; }
            el = el.parentNode;
          }
        });
      });
      // close the Log-in dropdown on outside click / Escape
      document.addEventListener('click', (e) => {
        const open = root.querySelector('[aria-haspopup="true"][aria-expanded="true"]');
        if (open && !open.parentNode.contains(e.target)) open.click();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const open = root.querySelector('[aria-haspopup="true"][aria-expanded="true"]');
        if (open) open.click();
      });
    },

    /* ---------- scroll reveal fallback for browsers without scroll-driven animations ---------- */
    _io: null,
    _reveal(root) {
      if (CSS.supports('animation-timeline: view()')) return;
      if (!DC._io) {
        DC._io = new IntersectionObserver((entries) => {
          entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); DC._io.unobserve(en.target); } });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      }
      root.querySelectorAll('.rv:not(.in)').forEach((el) => DC._io.observe(el));
    },

    /* ---------- sticky header shadow ---------- */
    _header() {
      const onScroll = () => {
        const h = document.querySelector('header');
        if (h) h.classList.toggle('scrolled', window.scrollY > 8);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  };
  window.DC = DC;
})();
