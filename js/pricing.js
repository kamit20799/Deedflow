/* DeedFlow — pricing page logic (data + interactions) */
class Component extends DCLogic {
  state = { loginOpen: false, annual: false, eu: 14, ep: 4, el: 12, faq: 0 };
  renderVals() {
    const s = this.state;
    const inr = (n) => '₹' + n.toLocaleString('en-IN');
    const defs = [
      { n: 'Free trial', m: 0, a: 0, u: 3, p: 0, l: 0, for: 'Explore the CRM with your team for 14 days.', cta: 'Start free trial' },
      { n: 'Base', m: 1000, a: 10000, u: 5, p: 5, l: 10, for: 'For a small team getting set up.', cta: 'Choose Base' },
      { n: 'Growth', m: 4999, a: 49990, u: 20, p: 10, l: 10000, for: 'For a developer with a few live projects.', cta: 'Choose Growth' },
      { n: 'Professional', m: 9999, a: 99990, u: 50, p: 25, l: 50000, for: 'For multi-project sales teams with partners.', cta: 'Choose Professional', pop: true },
      { n: 'Enterprise', m: 24999, a: 249990, u: 200, p: 100, l: 200000, for: 'For groups running large launches.', cta: 'Choose Enterprise' }
    ];
    const plans = defs.map((d, i) => {
      const pop = !!d.pop;
      const free = d.m === 0;
      return {
        n: d.n, pop, u: String(d.u), pr: d.p.toLocaleString('en-IN'), l: d.l.toLocaleString('en-IN'), for: d.for, cta: d.cta,
        price: free ? '₹0' : inr(s.annual ? d.a : d.m), per: free ? '14 days' : (s.annual ? '/ year' : '/ month'),
        sub: free ? 'No plan needed to start' : (s.annual ? inr(Math.round(d.a / 12)) + ' / month, billed yearly' : inr(d.a) + ' if billed yearly'),
        hasTag: pop || free, tag: pop ? 'Most chosen' : 'Start here',
        tagBg: pop ? '#ff5f00' : 'var(--bg2)', tagFg: pop ? '#0a1628' : 'var(--sub)',
        bg: pop ? '#0a1628' : 'var(--surf)', fg: pop ? '#edf1f7' : 'var(--ink)', border: pop ? '#0a1628' : 'var(--line)',
        divider: pop ? 'rgba(255,255,255,0.14)' : 'var(--line)', shadow: pop ? '0 30px 60px -20px rgba(10,22,40,0.55)' : 'none',
        btn: pop ? 'bp' : 'bs', cls: 'lift in', delay: (0.1 + i * 0.07) + 's'
      };
    });
    const leadSteps = [0, 10, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000, 7500, 9000, 10000, 12500, 15000, 17500, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 160000, 175000, 190000, 200000];
    const el = leadSteps[s.el];
    const paid = defs.slice(1);
    let rec = paid.find((d) => s.eu <= d.u && s.ep <= d.p && el <= d.l);
    const fits = !!rec;
    if (!rec) rec = paid[paid.length - 1];
    const recOut = {
      n: fits ? rec.n : 'Enterprise+',
      why: fits ? 'Up to ' + rec.u + ' users, ' + rec.p + ' projects and ' + rec.l.toLocaleString('en-IN') + ' leads' : 'Beyond Enterprise limits. Talk to sales.',
      price: fits ? inr(s.annual ? rec.a : rec.m) : 'Custom', per: fits ? (s.annual ? 'per year' : 'per month') : 'quote'
    };
    const cols = defs.map((d) => ({ n: d.n, c: d.pop ? 'var(--acct)' : 'var(--ink)' }));
    const rows = [
      { l: 'Monthly price', v: defs.map((d) => d.m === 0 ? '₹0' : inr(d.m)) },
      { l: 'Annual price', v: defs.map((d) => d.a === 0 ? '₹0' : inr(d.a)) },
      { l: 'Users', v: defs.map((d) => String(d.u)) },
      { l: 'Projects', v: defs.map((d) => String(d.p)) },
      { l: 'Leads', v: defs.map((d) => d.l.toLocaleString('en-IN')) }
    ];
    const faqDefs = [
      ['How does annual billing work?', 'Annual plans are priced at ten times the monthly price, so you get two months free compared with paying monthly.'],
      ['What happens after the 14-day trial?', 'Choose a plan to keep working with your data. The trial includes 3 users.'],
      ['Can we move between plans?', 'Yes. Move up when you add users, projects or leads beyond your current limits. [Confirm downgrade and proration rules.]'],
      ['Are channel partners and buyers counted as users?', '[Confirm whether partner-portal and customer-portal logins count toward the user limit.]']
    ];
    const faqs = faqDefs.map((f, i) => ({ q: f[0], a: f[1], open: s.faq === i, on: s.faq === i ? '1' : '0', exp: s.faq === i ? 'true' : 'false', toggle: () => this.setState({ faq: s.faq === i ? -1 : i }) }));
    return {
      loginOpen: s.loginOpen, loginExp: s.loginOpen ? 'true' : 'false', loginRot: s.loginOpen ? '180deg' : '0deg',
      toggleLogin: () => this.setState({ loginOpen: !s.loginOpen }),
      monthOn: s.annual ? '0' : '1', yearOn: s.annual ? '1' : '0',
      setMonthly: () => this.setState({ annual: false }), setAnnual: () => this.setState({ annual: true }),
      plans, eu: s.eu, ep: s.ep, elIdx: s.el, elL: el.toLocaleString('en-IN'),
      setU: (e) => this.setState({ eu: parseInt(e.target.value, 10) }),
      setP: (e) => this.setState({ ep: parseInt(e.target.value, 10) }),
      setL: (e) => this.setState({ el: parseInt(e.target.value, 10) }),
      rec: recOut, recBg: fits ? 'color-mix(in oklab, #ff5f00 9%, var(--surf))' : 'var(--surf2)', recBorder: fits ? '#ff5f00' : 'var(--line)',
      cols, rows, faqs
    };
  }
}

DC.mount(Component, 'tpl', 'app');
