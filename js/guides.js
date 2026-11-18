/* DeedFlow — guides page logic (data + interactions) */
class Component extends DCLogic {
  state = { menuOpen: false, cat: 'All', shown: 9, q: '' };
  renderVals() {
    const s = this.state;
    const deco = (g) => { const o = Object.assign({}, g); o['a' + g.art] = true; return o; };
    const all = [{"slug": "rera-section-13-advance-cap", "tag": "RERA", "mark": "10%", "cap": "advance cap, checked on every receipt", "bg": "#0a1628", "fg": "#ff8a3d", "art": 0, "t": "RERA Section 13: what the 10% advance cap means for your sales team", "d": "When the cap applies, what counts toward it, and how to stop a receipt before it crosses.", "meta": "6 min read", "date": "18 Nov 2026", "pn": "#14233a", "pn2": "#14233a", "tx": "#ffffff"}, {"slug": "tds-on-property-and-commission", "tag": "Tax", "mark": "TDS", "cap": "buyer and partner side, tracked", "bg": "#fff1e8", "fg": "#c24700", "art": 1, "t": "TDS on property sales and broker commission: a checklist for developers", "d": "Buyer-side and partner-side TDS, side by side, with what accounts needs to track.", "meta": "7 min read", "date": "18 Nov 2026", "pn": "#ffffff", "pn2": "#ffffff", "tx": "#0a1628"}, {"slug": "construction-linked-plans-without-spreadsheets", "tag": "Collections", "mark": "CLP", "cap": "milestones to demand letters", "bg": "#e8f0fd", "fg": "#1d5fd1", "art": 2, "t": "Running construction-linked plans without spreadsheets", "d": "Milestones, demand letters, receipts and the ledger, in the order they should happen.", "meta": "6 min read", "date": "18 Nov 2026", "pn": "#ffffff", "pn2": "#ffffff", "tx": "#0a1628"}, {"slug": "dedupe-portal-leads-at-capture", "tag": "Pre-sales", "mark": "3 → 1", "cap": "duplicates merged at capture", "bg": "#e6f5ee", "fg": "#0f7a4a", "art": 3, "t": "Portal leads: why dedupe at capture beats dedupe at month-end", "d": "How duplicate enquiries from 99acres, MagicBricks and Meta inflate your pipeline, and the fix.", "meta": "5 min read", "date": "18 Nov 2026", "pn": "#ffffff", "pn2": "#ffffff", "tx": "#0a1628"}, {"slug": "channel-partner-commissions", "tag": "Partners", "mark": "CP", "cap": "slab-based partner payouts", "bg": "#fff5dc", "fg": "#9a5800", "art": 4, "t": "Channel partner commissions: slabs, attribution and TDS-net payouts", "d": "A clean model for who brought the buyer, what they earn, and when they get paid.", "meta": "6 min read", "date": "18 Nov 2026", "pn": "#ffffff", "pn2": "#ffffff", "tx": "#0a1628"}, {"slug": "holds-cost-sheets-price-freezes", "tag": "Inventory", "mark": "Live", "cap": "unit availability, by tower", "bg": "#0a1628", "fg": "#86b0ff", "art": 5, "t": "Holds, cost sheets and price freezes: ending the \"quoted less\" call", "d": "Timed holds, one pricing engine and frozen cost sheets, and why all three matter together.", "meta": "5 min read", "date": "18 Nov 2026", "pn": "#14233a", "pn2": "#14233a", "tx": "#ffffff"}].map(deco);
    const tags = ['All'].concat(all.map((g) => g.tag).filter((t, i, a) => a.indexOf(t) === i));
    const q = s.q.trim().toLowerCase();
    const list = all.filter((g) => (s.cat === 'All' || g.tag === s.cat) && (!q || (g.t + ' ' + g.d + ' ' + g.tag).toLowerCase().indexOf(q) >= 0));
    const vis = list.slice(0, s.shown);
    return {
      menuOpen: s.menuOpen, menuClosed: !s.menuOpen, navOpen: s.menuOpen ? '1' : '0', menuExp: s.menuOpen ? 'true' : 'false', toggleMenu: () => this.setState({ menuOpen: !s.menuOpen }),
      f: all[0],
      subEmail: s.subEmail || '', onSub: (ev) => this.setState({ subEmail: ev.target.value }),
      subErr: s.subTried && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s.subEmail || '').trim()) ? '1' : '0',
      subGo: () => { if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s.subEmail || '').trim())) this.setState({ subDone: true }); else this.setState({ subTried: true }); },
      subDone: !!s.subDone, subOpen: !s.subDone,
      cats: tags.map((l) => ({ l, on: s.cat === l ? '1' : '0', pick: () => this.setState({ cat: l, shown: 9 }) })),
      q: s.q, onQ: (ev) => this.setState({ q: ev.target.value, shown: 9 }),
      vis, none: list.length === 0, reset: () => this.setState({ q: '', cat: 'All' }),
      more: list.length > s.shown, loadMore: () => this.setState({ shown: s.shown + 9 }),
      countText: vis.length + ' of ' + list.length
    };
  }
}

DC.mount(Component, 'tpl', 'app');
