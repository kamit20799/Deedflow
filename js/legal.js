/* DeedFlow — legal page logic (data + interactions) */
class Component extends DCLogic {
  state = { menuOpen: false, loginOpen: false, step: 1, tried: false, name: '', email: '', phone: '', company: '', notes: '', role: 0, proj: 1, team: 1, focus: [0, 3], day: 0, time: 2, doc: 0 };
  componentDidMount() {
    try { const i = ['privacy', 'terms', 'dpdp'].indexOf((location.hash || '').slice(1)); if (i > 0) this.setState({ doc: i }); } catch (e) {}
  }
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

    const legalDocs = [{"k": "privacy", "l": "Privacy policy", "intro": "How DeedFlow collects, uses and protects personal data.", "secs": [{"n": "01", "t": "Who we are", "x": "DeedFlow is a sales CRM for property developers, operated by [Company legal name], [registered address] (\"DeedFlow\", \"we\", \"us\"). This policy covers our website and the DeedFlow service."}, {"n": "02", "t": "Two kinds of data", "x": "Website and account data is what you give us directly: your name, work email, mobile number and company when you request a demo or sign up, plus account details, usage logs and cookies. Customer data is what our customers store in DeedFlow: their leads, buyers, bookings, receipts and documents. For customer data the developer decides why and how it is used, and DeedFlow processes it on their instructions."}, {"n": "03", "t": "How we use it", "x": "To reply to enquiries and arrange demos, to provide and support the service, to bill for it, to keep it secure, to improve the product, and to send service messages. We send marketing email only where you have agreed, and every such email has an unsubscribe link."}, {"n": "04", "t": "Who we share it with", "x": "Service providers that help us run DeedFlow, such as hosting, telephony, messaging, payment and email providers, under contracts that limit what they can do with the data. We also disclose data where the law requires it. We do not sell personal data."}, {"n": "05", "t": "Where it is stored", "x": "DeedFlow is hosted in India. [Confirm sub-processors and any processing outside India.]"}, {"n": "06", "t": "How long we keep it", "x": "For as long as your account is active and as needed to meet legal, tax and accounting duties. After an account is closed, customer data is returned or deleted on request within [number] days."}, {"n": "07", "t": "Security", "x": "Access is role-based, data is encrypted in transit, and changes inside the CRM are written to an audit trail. [Confirm encryption at rest and backup practices.]"}, {"n": "08", "t": "Your rights", "x": "You can ask us to show, correct or delete your personal data, and you can withdraw consent at any time. If your data is held by a developer inside DeedFlow, contact that developer first; we will help them respond."}, {"n": "09", "t": "Cookies", "x": "We use cookies that are needed for the site to work and, with your consent, cookies that measure how the site is used."}, {"n": "10", "t": "Contact", "x": "Privacy questions: [privacy email]. Grievance Officer: [name, email, address]. We will update this policy when our practices change and show the date of the latest version here."}]}, {"k": "terms", "l": "Terms of service", "intro": "The agreement between you and DeedFlow when you use the service.", "secs": [{"n": "01", "t": "The agreement", "x": "These terms apply when you sign up for or use DeedFlow. If you accept them for a company, you confirm that you are authorised to do so."}, {"n": "02", "t": "Accounts and users", "x": "Give accurate details, keep login credentials safe, and make sure the people you add as users follow these terms. You are responsible for activity under your account."}, {"n": "03", "t": "Free trial and plans", "x": "The free trial runs for 14 days with 3 users. Paid plans and their limits on users, projects and leads are as shown on the pricing page at the time you subscribe."}, {"n": "04", "t": "Fees and taxes", "x": "Plans are billed in advance, monthly or annually. Prices exclude GST, which is added at the applicable rate. [Confirm refund, renewal and late-payment terms.]"}, {"n": "05", "t": "Your data", "x": "You own the data you put into DeedFlow. We use it only to provide the service. You are responsible for having a lawful basis and any consent needed for the buyer and lead data you store."}, {"n": "06", "t": "Acceptable use", "x": "Do not use DeedFlow to break the law, to send unsolicited communications, to store data you have no right to hold, or to interfere with the service or other customers."}, {"n": "07", "t": "Compliance features", "x": "DeedFlow provides software checks, validations and document generation that support your compliance process. They are not legal or tax advice, and you remain responsible for meeting RERA, GST, TDS and other statutory requirements."}, {"n": "08", "t": "Third-party services", "x": "Connections to property portals, telephony, messaging and payment providers are subject to those providers' own terms and availability."}, {"n": "09", "t": "Availability and support", "x": "We work to keep DeedFlow available and to fix faults promptly. [Confirm uptime commitment, support hours and channels.]"}, {"n": "10", "t": "Suspension and ending the agreement", "x": "You can cancel at any time from your account. We may suspend an account for non-payment or a serious breach of these terms. After the agreement ends you can export your data for [number] days."}, {"n": "11", "t": "Liability", "x": "[Confirm warranty disclaimers and the limit of liability with legal counsel.]"}, {"n": "12", "t": "Governing law", "x": "These terms are governed by the laws of India. Courts at [city] have jurisdiction. [Confirm.]"}]}, {"k": "dpdp", "l": "DPDP notice", "intro": "Your rights under the Digital Personal Data Protection Act, 2023.", "secs": [{"n": "01", "t": "Who is responsible for your data", "x": "For website and account data, [Company legal name] is the Data Fiduciary. For buyer and lead data stored in the CRM by a developer, that developer is the Data Fiduciary and DeedFlow acts as its Data Processor."}, {"n": "02", "t": "What we process and why", "x": "Contact and company details, to respond to you and provide the service. Account and usage data, to run and secure the service. Call recordings and messages, only where consent has been given, to keep a record of the conversation."}, {"n": "03", "t": "Consent", "x": "We ask for consent in clear words for each purpose. In DeedFlow, consent for calls, recordings and messages is stored on the lead with its purpose and time. You can withdraw consent as easily as you gave it, and the withdrawal is recorded."}, {"n": "04", "t": "Your rights", "x": "You can ask for a summary of your personal data and how it is processed, ask for it to be corrected, completed, updated or erased, raise a grievance, and nominate another person to exercise your rights if you are unable to."}, {"n": "05", "t": "How to use your rights", "x": "Write to [privacy email]. We will acknowledge your request and respond within [number] days. If a developer holds your data in DeedFlow, we will pass your request to them."}, {"n": "06", "t": "Grievance Officer", "x": "[Name, designation, email, address.] If you are not satisfied with our response, you may complain to the Data Protection Board of India."}, {"n": "07", "t": "Children", "x": "DeedFlow is a business product and is not directed at anyone under 18."}, {"n": "08", "t": "Changes", "x": "We will update this notice when the law or our processing changes, and show the date of the latest version here."}]}];
    return {
      doc: legalDocs[s.doc || 0], docTabs: legalDocs.map((d, i) => ({ l: d.l, on: (s.doc || 0) === i ? '1' : '0', pick: () => this.setState({ doc: i }) })),
      menuOpen: s.menuOpen, menuClosed: !s.menuOpen, navOpen: s.menuOpen ? '1' : '0', menuExp: s.menuOpen ? 'true' : 'false', toggleMenu: () => this.setState({ menuOpen: !s.menuOpen }),
      loginOpen: s.loginOpen, loginExp: s.loginOpen ? 'true' : 'false', loginRot: s.loginOpen ? '180deg' : '0deg',
      toggleLogin: () => { if (Date.now() - (this._lh || 0) < 500) return; this.setState({ loginOpen: !s.loginOpen }); },
      loginIn: () => { clearTimeout(this._lt); if (!this.state.loginOpen) { this._lh = Date.now(); this.setState({ loginOpen: true }); } },
      loginOut: () => { clearTimeout(this._lt); this._lt = setTimeout(() => this.setState({ loginOpen: false }), 180); },
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
