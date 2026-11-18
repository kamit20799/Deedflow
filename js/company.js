/* DeedFlow — company page logic (data + interactions) */
class Component extends DCLogic {
  state = { menuOpen: false, loginOpen: false, step: 1, tried: false, name: '', email: '', phone: '', company: '', notes: '', role: 0, proj: 1, team: 1, focus: [0, 3], mo: 0, sel: '', time: '11:00' };
  renderVals() {
    const s = this.state;
    const pickList = (defs, key) => defs.map((l, i) => ({ l, on: s[key] === i ? '1' : '0', pick: () => this.setState({ [key]: i }) }));
    const toggle = (arr, i) => arr.indexOf(i) >= 0 ? arr.filter((x) => x !== i) : arr.concat([i]);

    const agenda = [
      { h: 'Your project, set up', d: 'Towers, floors and units from your inventory structure.', m: '8 min', icon: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01' },
      { h: 'Lead to site visit', d: 'Portal capture, scoring, calling and reminders.', m: '8 min', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z' },
      { h: 'Cost sheet to collections', d: 'Pricing engine, booking, CLP demands and receipts.', m: '8 min', icon: 'M6 4h12M6 8h12M8 8c6 0 6 8 0 8H6l6 7' },
      { h: 'Compliance and partners', d: 'RERA cap, escrow, TDS and the partner portal.', m: '6 min', icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4' }
    ];
    const roles = pickList(['Founder / Director', 'Sales head', 'CRM / Post-sales', 'Finance', 'IT'], 'role');
    const projOpts = pickList(['1', '2–5', '6–15', '15+'], 'proj');
    const teamOpts = pickList(['Under 10', '10–30', '30–100', '100+'], 'team');
    const focusDefs = ['Lead capture & scoring', 'Presales calling', 'Inventory & pricing', 'Collections & ledger', 'RERA & TDS compliance', 'Channel partners'];
    const focusOpts = focusDefs.map((l, i) => ({ l, on: s.focus.indexOf(i) >= 0 ? '1' : '0', pick: () => this.setState({ focus: toggle(s.focus, i) }) }));

    const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], mn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const first = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    if (first.getDay() === 0) first.setDate(first.getDate() + 1);
    const last = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60);
    const key = (d) => d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    const selKey = s.sel || key(first);
    const sp = selKey.split('-');
    const D = new Date(+sp[0], +sp[1], +sp[2]);
    const maxMo = (last.getFullYear() - today.getFullYear()) * 12 + last.getMonth() - today.getMonth();
    const vm = new Date(today.getFullYear(), today.getMonth() + s.mo, 1);
    const cal = [];
    for (let i = 0; i < (vm.getDay() + 6) % 7; i++) cal.push({ l: '', st: 'x', pick: () => {} });
    const dim = new Date(vm.getFullYear(), vm.getMonth() + 1, 0).getDate();
    for (let n = 1; n <= dim; n++) {
      const d = new Date(vm.getFullYear(), vm.getMonth(), n);
      const ok = d >= first && d <= last && d.getDay() !== 0;
      const k = key(d);
      cal.push({ l: String(n), st: k === selKey ? 'on' : ok ? 'ok' : 'off', pick: () => { if (ok) this.setState({ sel: k }); } });
    }
    const tl = (arr) => arr.map((l) => ({ l, on: s.time === l ? '1' : '0', pick: () => this.setState({ time: l }) }));
    const tMorn = tl(['10:00', '10:30', '11:00', '11:30']);
    const tAft = tl(['12:00', '12:30', '14:00', '14:30', '15:00', '15:30']);
    const tEve = tl(['16:00', '16:30', '17:00', '17:30', '18:00', '18:30']);
    const when = wd[D.getDay()] + ', ' + D.getDate() + ' ' + mn[D.getMonth()] + ' ' + D.getFullYear() + ' at ' + s.time + ' IST';

    const valid1 = s.name.trim().length > 1 && /.+@.+\..+/.test(s.email);
    const labels = ['About you', 'Your portfolio', 'Pick a slot'];
    const stepTabs = labels.map((l, i) => ({ n: String(i + 1), l, c: i + 1 <= s.step ? 'var(--ink)' : 'var(--sub)', bar: i + 1 < s.step ? '#ff5f00' : i + 1 === s.step ? 'color-mix(in oklab, #ff5f00 55%, var(--line))' : 'var(--line)' }));
    const next = () => {
      if (s.step === 1 && !valid1) { this.setState({ tried: true }); return; }
      this.setState({ step: s.step + 1, tried: false });
    };
    const firstName = (s.name.trim().split(' ')[0]) || 'there';

    const values = [
      { n: '01', t: 'Only what ships', d: 'The site lists capabilities that are in the product today, nothing on a roadmap.' },
      { n: '02', t: 'Compliance in the flow', d: 'Rules run when money moves, so reports are a by-product, not a project.' },
      { n: '03', t: 'One record per buyer', d: 'Dedupe at capture and a single ledger keep every team on the same facts.' },
      { n: '04', t: 'Every change on the record', d: 'A strict audit trail across leads, pricing, receipts and payouts.' }
    ];

    return {
      menuOpen: s.menuOpen, menuClosed: !s.menuOpen, navOpen: s.menuOpen ? '1' : '0', menuExp: s.menuOpen ? 'true' : 'false', toggleMenu: () => this.setState({ menuOpen: !s.menuOpen }),
      loginOpen: s.loginOpen, loginExp: s.loginOpen ? 'true' : 'false', loginRot: s.loginOpen ? '180deg' : '0deg',
      toggleLogin: () => { if (Date.now() - (this._lh || 0) < 500) return; this.setState({ loginOpen: !s.loginOpen }); },
      loginIn: () => { clearTimeout(this._lt); if (!this.state.loginOpen) { this._lh = Date.now(); this.setState({ loginOpen: true }); } },
      loginOut: () => { clearTimeout(this._lt); this._lt = setTimeout(() => this.setState({ loginOpen: false }), 180); },
      agenda, roles, projOpts, teamOpts, focusOpts, cal, tAll: tMorn.concat(tAft, tEve), stepTabs,
      calTitle: mFull[vm.getMonth()] + ' ' + vm.getFullYear(), prevOff: s.mo <= 0 ? '1' : '0', nextOff: s.mo >= maxMo ? '1' : '0',
      calPrev: () => { if (s.mo > 0) this.setState({ mo: s.mo - 1 }); }, calNext: () => { if (s.mo < maxMo) this.setState({ mo: s.mo + 1 }); },
      f: { name: s.name, email: s.email, phone: s.phone, company: s.company, notes: s.notes },
      onName: (e) => this.setState({ name: e.target.value }),
      onEmail: (e) => this.setState({ email: e.target.value }),
      onPhone: (e) => this.setState({ phone: e.target.value }),
      onCompany: (e) => this.setState({ company: e.target.value }),
      onNotes: (e) => this.setState({ notes: e.target.value }),
      s1: s.step === 1, s2: s.step === 2, s3: s.step === 3, done: s.step === 4, notDone: s.step < 4,
      err1: s.step === 1 && s.tried && !valid1,
      canBack: s.step > 1 && s.step < 4, noBack: s.step === 1,
      back: () => this.setState({ step: s.step - 1 }), next,
      nextLabel: s.step === 3 ? 'Confirm demo' : 'Continue', nextDisabled: false,
      summary: 'Demo for ' + (s.company.trim() || 'your company') + ' · ' + when + ' · 30 minutes, online',
      firstName, doneText: 'Your demo is on ' + when + '. A calendar invite is on its way to ' + (s.email || 'your inbox') + '.',
      reset: () => this.setState({ step: 1, tried: false }),
      values
    };
  }
}

DC.mount(Component, 'tpl', 'app');
