/* DeedFlow — company page logic (data + interactions) */
class Component extends DCLogic {
  state = { loginOpen: false, step: 1, tried: false, name: '', email: '', phone: '', company: '', notes: '', role: 0, proj: 1, team: 1, focus: [0, 3], day: 0, time: 2 };
  renderVals() {
    const s = this.state;
    const pickList = (defs, key) => defs.map((l, i) => ({ l, on: s[key] === i ? '1' : '0', pick: () => this.setState({ [key]: i }) }));
    const toggle = (arr, i) => arr.indexOf(i) >= 0 ? arr.filter((x) => x !== i) : arr.concat([i]);

    const agenda = [
      { t: '00:00', h: 'Your project, set up', d: 'Towers, floors and units from your inventory structure.' },
      { t: '08:00', h: 'Lead to site visit', d: 'Portal capture, scoring, calling and reminders.' },
      { t: '16:00', h: 'Cost sheet to collections', d: 'Pricing engine, booking, CLP demands and receipts.' },
      { t: '24:00', h: 'Compliance and partners', d: 'RERA cap, escrow, TDS and the partner portal.' }
    ];
    const roles = pickList(['Founder / Director', 'Sales head', 'CRM / Post-sales', 'Finance', 'IT'], 'role');
    const projOpts = pickList(['1', '2–5', '6–15', '15+'], 'proj');
    const teamOpts = pickList(['Under 10', '10–30', '30–100', '100+'], 'team');
    const focusDefs = ['Lead capture & scoring', 'Presales calling', 'Inventory & pricing', 'Collections & ledger', 'RERA & TDS compliance', 'Channel partners'];
    const focusOpts = focusDefs.map((l, i) => ({ l, on: s.focus.indexOf(i) >= 0 ? '1' : '0', pick: () => this.setState({ focus: toggle(s.focus, i) }) }));

    const base = new Date(2026, 10, 4);
    const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], mn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayList = [];
    for (let k = 0; dayList.length < 5; k++) { const d = new Date(base.getTime() + k * 86400000); if (d.getDay() !== 0 && d.getDay() !== 6) dayList.push(d); }
    const days = dayList.map((d, i) => ({ w: wd[d.getDay()], d: String(d.getDate()), m: mn[d.getMonth()], on: s.day === i ? '1' : '0', pick: () => this.setState({ day: i }) }));
    const timeDefs = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'];
    const times = pickList(timeDefs, 'time');
    const D = dayList[s.day];
    const when = wd[D.getDay()] + ', ' + D.getDate() + ' ' + mn[D.getMonth()] + ' at ' + timeDefs[s.time] + ' IST';

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
      loginOpen: s.loginOpen, loginExp: s.loginOpen ? 'true' : 'false', loginRot: s.loginOpen ? '180deg' : '0deg',
      toggleLogin: () => this.setState({ loginOpen: !s.loginOpen }),
      agenda, roles, projOpts, teamOpts, focusOpts, days, times, stepTabs,
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
