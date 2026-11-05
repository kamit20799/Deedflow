/* DeedFlow — compliance page logic (data + interactions) */
class Component extends DCLogic {
  state = { loginOpen: false, cost: 9800000, recv: 300000, agr: false, esc: 1, tds: 'ia', iaAmt: 9800000, hAmt: 450000, tier: 1, af: 0, tick: 0 };
  componentDidMount() { this.t = setInterval(() => this.setState({ tick: this.state.tick + 1 }), 3200); }
  componentWillUnmount() { clearInterval(this.t); }
  renderVals() {
    const s = this.state;
    const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
    const short = (n) => n >= 10000000 ? '₹' + (n / 10000000).toFixed(2) + ' Cr' : '₹' + (n / 100000).toFixed(1) + ' L';

    const ring = (items, r, off) => items.map((t, i) => { const a = (i / items.length) * Math.PI * 2 - Math.PI / 2 + (off || 0); return { t, x: (50 + r * Math.cos(a)) + '%', y: (50 + r * Math.sin(a)) + '%' }; });
    const orbitA = ring(['RERA §13', 'GST e-invoice', 'TDS 194-IA', 'PMLA'], 50);
    const orbitB = ring(['Escrow 70%', 'DPDP', 'Audit trail', 'TDS 194H'], 50, Math.PI / 4);

    const cost = s.cost, cap = cost * 0.1, prior = Math.min(cost * 0.07, 690000 * cost / 9800000);
    const recvMax = Math.round(cost * 0.12 / 50000) * 50000;
    const recv = Math.min(s.recv, recvMax);
    const after = prior + recv;
    const over = !s.agr && after > cap;
    const scale = cost * 0.12;
    const verdict = s.agr
      ? { tag: 'ALLOWED', tone: 'p-ok', title: 'Agreement registered, cap no longer applies', desc: 'Receipt posts and follows the payment plan.', bg: 'var(--oksoft)', bd: 'transparent' }
      : over
        ? { tag: 'BLOCKED', tone: 'p-bad', title: 'This receipt would take advance to ' + short(after) + ', above the ' + short(cap) + ' cap', desc: 'Register the agreement for sale first, or reduce the receipt to ' + inr(Math.max(0, cap - prior)) + '.', bg: 'var(--badsoft)', bd: 'transparent' }
        : { tag: 'WITHIN CAP', tone: 'p-ok', title: 'Advance after this receipt: ' + short(after) + ' of ' + short(cap), desc: inr(cap - after) + ' can still be collected before an agreement is needed.', bg: 'var(--oksoft)', bd: 'transparent' };

    const escrowDefs = [500000, 980000, 1470000];
    const E = escrowDefs[s.esc];
    const escrowAmts = escrowDefs.map((v, i) => ({ l: inr(v), on: i === s.esc ? '1' : '0', pick: () => this.setState({ esc: i }) }));

    let qr = [];
    for (let i = 0; i < 64; i++) { const r = Math.floor(i / 8), c = i % 8; const finder = (r < 3 && c < 3) || (r < 3 && c > 4) || (r > 4 && c < 3); qr.push(finder ? ((r === 1 && (c === 1 || c === 6)) || (r === 6 && c === 1) ? '#fff' : '#0a1628') : (((i * 37 + 11) % 7) < 3 ? '#0a1628' : '#fff')); }

    const isIA = s.tds === 'ia';
    let tdsOut, tdsNote;
    if (isIA) {
      const a = s.iaAmt, applies = a >= 5000000, t = applies ? a * 0.01 : 0;
      tdsOut = [{ l: 'Consideration', v: short(a), c: 'var(--ink)' }, { l: 'TDS at 1%', v: applies ? inr(t) : 'Not applicable', c: applies ? 'var(--acct)' : 'var(--sub)' }, { l: 'Paid to developer', v: inr(a - t), c: 'var(--ink)' }];
      tdsNote = applies ? 'Buyer deducts 1% on each instalment and files Form 26QB. DeedFlow tracks TDS credit against each receipt so the buyer ledger closes at full value.' : 'Below ₹50 lakh, 194-IA does not apply. Receipts post at full value.';
    } else {
      const a = s.hAmt, applies = a > 20000, t = applies ? a * 0.02 : 0;
      tdsOut = [{ l: 'Commission this FY', v: inr(a), c: 'var(--ink)' }, { l: 'TDS at 2%', v: applies ? inr(t) : 'Below threshold', c: applies ? 'var(--acct)' : 'var(--sub)' }, { l: 'Net payout', v: inr(a - t), c: 'var(--ink)' }];
      tdsNote = applies ? 'Payout runs deduct TDS automatically and show the partner the gross, the deduction and the net in their portal.' : 'Under the yearly threshold, no deduction. DeedFlow keeps counting across payout runs in the year.';
    }

    const tierDefs = [['Within 15 days of booking', 'Early cancellation', 0.01], ['Within 30 days', 'After allotment', 0.02], ['After 30 days', 'Before agreement', 0.05], ['After agreement', 'Per agreement terms', 0.1]];
    const tiers = tierDefs.map((t, i) => ({ l: t[0], d: t[1], p: (t[2] * 100) + '%', on: i === s.tier ? '1' : '0', pick: () => this.setState({ tier: i }) }));
    const fpct = tierDefs[s.tier][2];
    const forfeitN = Math.min(9800000 * fpct, 2940000);

    const consents = [{ l: 'Call recording', s: 'Consented', tone: 'p-ok' }, { l: 'WhatsApp updates', s: 'Consented', tone: 'p-ok' }, { l: 'Marketing emails', s: 'Withdrawn', tone: 'p-mut' }];

    const allAudit = [
      ['Receipt RCP-04431 cleared', 'Accounts · Meera', 'Collections', 'p-ok'],
      ['Cost sheet CS-0412 frozen v2', 'Sales · Neha', 'Pricing', 'p-blue'],
      ['Discount 2% approved', 'Director · R. Kapoor', 'Approvals', 'p-warn'],
      ['Receipt blocked · §13 cap', 'System', 'Compliance', 'p-bad'],
      ['Partner KYC verified', 'System · DigiLocker', 'Partners', 'p-ok'],
      ['Payout run Oct · TDS deducted', 'Accounts · Meera', 'Partners', 'p-blue'],
      ['Unit A-0803 hold released', 'System', 'Inventory', 'p-mut'],
      ['Consent withdrawn · marketing', 'Buyer portal', 'Compliance', 'p-mut']
    ];
    const filters = ['All', 'Collections', 'Compliance', 'Partners', 'Approvals'];
    const auditFilters = filters.map((l, i) => ({ l, on: i === s.af ? '1' : '0', pick: () => this.setState({ af: i }) }));
    const rot = s.tick % allAudit.length;
    const ordered = allAudit.slice(rot).concat(allAudit.slice(0, rot));
    const filtered = ordered.filter((a) => s.af === 0 || a[2] === filters[s.af]).slice(0, 6);
    const mins = [0, 2, 5, 9, 14, 22];
    const audit = filtered.map((a, i) => ({ e: a[0], who: a[1], m: a[2], tone: a[3], t: i === 0 ? 'now' : mins[i] + 'm ago', h: '#' + ((rot * 97 + i * 131 + a[0].length * 17) % 65536).toString(16).padStart(4, '0') + 'e' + (i + 3), cls: i === 0 ? 'pop' : '' }));

    return {
      loginOpen: s.loginOpen, loginExp: s.loginOpen ? 'true' : 'false', loginRot: s.loginOpen ? '180deg' : '0deg',
      toggleLogin: () => this.setState({ loginOpen: !s.loginOpen }),
      orbitA, orbitB,
      cost, costL: short(cost), recv, recvL: inr(recv), recvMax, priorL: inr(prior),
      setCost: (e) => this.setState({ cost: parseInt(e.target.value, 10) }),
      setRecv: (e) => this.setState({ recv: parseInt(e.target.value, 10) }),
      toggleAgr: () => this.setState({ agr: !s.agr }), agrPressed: s.agr ? 'true' : 'false',
      swBg: s.agr ? '#1aa86b' : 'var(--line)', swLeft: s.agr ? '25px' : '3px',
      priorW: (prior / scale * 100) + '%', recvW: (recv / scale * 100) + '%', recvC: over ? '#d92d20' : '#ff5f00',
      capText: s.agr ? 'No cap after registration' : '10% cap · ' + short(cap),
      verdictTag: verdict.tag, verdictTone: verdict.tone, verdictTitle: verdict.title, verdictDesc: verdict.desc, verdictBg: verdict.bg, verdictBorder: verdict.bd,
      escrowAmts, escrowTotal: inr(E), escrow70: inr(E * 0.7), escrow30: inr(E * 0.3), qr,
      iaOn: isIA ? '1' : '0', hOn: isIA ? '0' : '1',
      setIA: () => this.setState({ tds: 'ia' }), setH: () => this.setState({ tds: 'h' }),
      tdsLabel: isIA ? 'Property consideration' : 'Partner commission in the year',
      tdsAmt: isIA ? s.iaAmt : s.hAmt, tdsAmtL: isIA ? short(s.iaAmt) : inr(s.hAmt),
      tdsMin: isIA ? 2000000 : 5000, tdsMax: isIA ? 30000000 : 1500000, tdsStep: isIA ? 100000 : 5000,
      setTds: (e) => { const v = parseInt(e.target.value, 10); this.setState(isIA ? { iaAmt: v } : { hAmt: v }); },
      tdsOut, tdsNote,
      tiers, tier: { p: (fpct * 100) + '%' }, forfeit: inr(forfeitN), refund: inr(2940000 - forfeitN),
      consents, auditFilters, audit
    };
  }
}

DC.mount(Component, 'tpl', 'app');
