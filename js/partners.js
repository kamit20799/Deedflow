/* DeedFlow — partners page logic (data + interactions) */
class Component extends DCLogic {
  state = { loginOpen: false, step: 1, ph: 0, result: null, checking: false, bookings: 6, avg: 9500000 };
  componentWillUnmount() { clearTimeout(this.t); clearTimeout(this._loginCloseT); }
  renderVals() {
    const s = this.state;
    const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
    const short = (n) => n >= 10000000 ? '₹' + (n / 10000000).toFixed(2) + ' Cr' : '₹' + (n / 100000).toFixed(1) + ' L';

    const heroRows = [
      { l: 'Arjun Mehta registered', s: 'Greenfield Enclave · ownership 60 days', p: 'Accepted', tone: 'p-ok' },
      { l: 'Site visit · Kavya Reddy', s: 'Sat 4:00 PM · agent Ravi', p: 'Confirmed', tone: 'p-blue' },
      { l: 'Booking BK-0977', s: 'Commission eligible at agreement', p: 'Eligible', tone: 'p-hot' },
      { l: 'Payout run · October', s: 'TDS 194H deducted', p: 'Processing', tone: 'p-warn' }
    ];

    const stepDefs = [
      { t: 'Sign up', d: 'Partner applies with firm details', long: 'The partner applies with firm name, RERA agent registration and bank details. Your team sees the application in the CRM.', rows: [['Firm details', 'Sai Realty · Pune', 'Received', 'p-ok'], ['RERA agent registration', 'A5XXXXXXXX09', 'Captured', 'p-blue'], ['Bank account', 'Penny-drop pending', 'Pending', 'p-warn']] },
      { t: 'KYC', d: 'PAN via SurePass, Aadhaar via DigiLocker', long: 'PAN is verified through SurePass and Aadhaar through DigiLocker consent. No scanned copies, no manual checks.', rows: [['PAN · SurePass', 'ABCPXXXX1K · name matched', 'Verified', 'p-ok'], ['Aadhaar · DigiLocker', 'XXXX XXXX 4821', 'Verified', 'p-ok'], ['GSTIN', 'Optional', 'Skipped', 'p-mut']] },
      { t: 'Agreement', d: 'Commission slabs and terms', long: 'Assign projects and the commission slab that applies. Terms are recorded so payout runs use the same numbers your team agreed.', rows: [['Projects assigned', 'Greenfield Enclave, Skyline Residences', '2', 'p-blue'], ['Slab plan', 'Volume slabs · quarterly', 'Attached', 'p-ok'], ['Lead ownership window', 'Set per project', 'Set', 'p-ok']] },
      { t: 'Go live', d: 'Partner and agents log in', long: 'The partner gets portal access and adds agents under the same account. Agents register leads; ownership stays with the partner firm.', rows: [['Partner admin', 'sai@realty', 'Active', 'p-ok'], ['Agent · Ravi', 'Added by partner', 'Active', 'p-ok'], ['Agent · Pooja', 'Invite sent', 'Invited', 'p-warn']] }
    ];
    const steps = stepDefs.map((st, i) => ({ n: '0' + (i + 1), t: st.t, d: st.d, on: i === s.step ? '1' : '0', pick: () => this.setState({ step: i }) }));
    const S = stepDefs[s.step];
    const step = { t: S.t, long: S.long, rows: S.rows.map((r) => ({ l: r[0], s: r[1], p: r[2], tone: r[3] })) };

    const phoneDefs = ['98XXX 11204', '97XXX 66310', '99XXX 20487'];
    const results = [
      { tag: 'REGISTERED', tone: 'p-ok', bg: 'var(--oksoft)', t: 'Lead is yours', d: 'No existing lead or partner registration found. Ownership recorded to Sai Realty.', meta: 'REG-2026-11-0381 · 03 Nov 2026, 11:42 · window active' },
      { tag: 'DUPLICATE', tone: 'p-bad', bg: 'var(--badsoft)', t: 'Already registered by another partner', d: 'This buyer was registered by a different partner within the ownership window. Your request is logged for review.', meta: 'Conflict with REG-2026-10-0219 · review by Sales head' },
      { tag: 'EXISTING', tone: 'p-warn', bg: 'var(--warnsoft)', t: 'Buyer already in the CRM', d: 'This buyer enquired directly through 99acres last week. Sales head decides on partner attribution.', meta: 'Lead L-88412 · source 99acres · approval requested' }
    ];
    const phones = phoneDefs.map((l, i) => ({ l, on: i === s.ph ? '1' : '0', pick: () => this.setState({ ph: i, result: null, checking: false }) }));
    const check = () => { this.setState({ checking: true, result: null }); clearTimeout(this.t); this.t = setTimeout(() => this.setState({ checking: false, result: this.state.ph }), 1100); };

    const slabDefs = [[1, 3, '1–3 bookings', 0.015], [4, 7, '4–7 bookings', 0.02], [8, 12, '8–12 bookings', 0.025], [13, 99, '13+ bookings', 0.03]];
    const cur = slabDefs.find((x) => s.bookings >= x[0] && s.bookings <= x[1]);
    const slabs = slabDefs.map((x) => { const on = x === cur; return { l: x[2], p: (x[3] * 100).toFixed(1) + '%', bd: on ? '#ff5f00' : 'var(--line)', bg: on ? 'color-mix(in oklab, #ff5f00 12%, var(--surf))' : 'transparent', c: on ? 'var(--acct)' : 'var(--mut)' }; });
    const value = s.bookings * s.avg;
    const gross = value * cur[3];
    const tds = gross > 20000 ? gross * 0.02 : 0;
    const payout = [
      { l: 'Agreement value', s: s.bookings + ' × ' + short(s.avg), v: inr(value), c: 'var(--ink)' },
      { l: 'Slab applied', s: cur[2], v: (cur[3] * 100).toFixed(1) + '%', c: 'var(--acct)' },
      { l: 'Gross commission', s: 'Before tax', v: inr(gross), c: 'var(--ink)' },
      { l: 'TDS · 194H', s: '2% sample rate, configurable', v: '−' + inr(tds), c: 'var(--bad)' },
      { l: 'Ledger', s: 'Dr Commission expense · Cr Partner · Cr TDS payable', v: 'Posts on approval', c: 'var(--sub)' }
    ];

    const forDev = [
      { t: 'No ownership disputes', d: 'Registration timestamps settle who brought the buyer.' },
      { t: 'Verified partners only', d: 'KYC through SurePass and DigiLocker before access.' },
      { t: 'Payouts that reconcile', d: 'Slabs, TDS and ledger entries computed in one run.' },
      { t: 'One view of partner performance', d: 'Leads, visits and bookings per partner and per agent.' }
    ];
    const forCP = [
      { t: 'Register leads in seconds', d: 'From the portal, with instant duplicate checks.' },
      { t: 'See every booking you earned', d: 'Status from site visit to agreement.' },
      { t: 'Know your payout before it lands', d: 'Gross, TDS and net, per run.' },
      { t: 'Agents inside your account', d: 'Your agents work under your firm; ownership stays with you.' }
    ];

    const R = s.result === null ? null : results[s.result];
    return {
      loginOpen: s.loginOpen, loginExp: s.loginOpen ? 'true' : 'false', loginRot: s.loginOpen ? '180deg' : '0deg',
      toggleLogin: () => this.setState({ loginOpen: !s.loginOpen }),
      openLogin: () => { clearTimeout(this._loginCloseT); this.setState({ loginOpen: true }); },
      closeLogin: () => { clearTimeout(this._loginCloseT); this._loginCloseT = setTimeout(() => this.setState({ loginOpen: false }), 200); },
      heroRows, steps, step,
      phones, phone: '+91 ' + phoneDefs[s.ph], check, checking: s.checking, checkBtn: s.checking ? 'Checking…' : 'Register lead',
      hasResult: !!R, res: R || results[0],
      bookings: s.bookings, avg: s.avg, avgL: short(s.avg),
      setBk: (e) => this.setState({ bookings: parseInt(e.target.value, 10) }),
      setAvg: (e) => this.setState({ avg: parseInt(e.target.value, 10) }),
      slabs, payout, net: inr(gross - tds),
      forDev, forCP
    };
  }
}

DC.mount(Component, 'tpl', 'app');
