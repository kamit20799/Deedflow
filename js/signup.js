/* DeedFlow — signup page logic (data + interactions) */
class Component extends DCLogic {
  state = { step: 1, tried: false, showPw: false, terms: false, name: '', phone: '', email: '', pw: '', company: '', city: '', rera: '', proj: 1, src: [0, 4], otp: '', resendIn: 30, setupAt: 0 };
  componentDidMount() {
    this.t = setInterval(() => {
      const s = this.state;
      if (s.step === 3 && s.resendIn > 0) this.setState({ resendIn: s.resendIn - 1 });
      if (s.step === 4 && s.setupAt < 5) this.setState({ setupAt: s.setupAt + 1 });
    }, 1000);
  }
  componentWillUnmount() { clearInterval(this.t); }
  renderVals() {
    const s = this.state;
    const toggle = (arr, i) => arr.indexOf(i) >= 0 ? arr.filter((x) => x !== i) : arr.concat([i]);

    const okName = s.name.trim().length > 1;
    const digits = s.phone.replace(/\D/g, '');
    const okPhone = digits.length >= 10;
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim());
    const okPw = s.pw.length >= 8;
    const okCo = s.company.trim().length > 1;
    const okOtp = /^\d{6}$/.test(s.otp);

    let strength = 0;
    if (s.pw.length >= 8) strength++;
    if (/[A-Z]/.test(s.pw) && /[a-z]/.test(s.pw)) strength++;
    if (/\d/.test(s.pw)) strength++;
    if (/[^A-Za-z0-9]/.test(s.pw)) strength++;
    const sc = ['var(--line)', '#d92d20', '#f5a524', '#7cc46a', '#1aa86b'];
    const pwBars = [0, 1, 2, 3].map((i) => i < strength ? sc[strength] : 'var(--line)');

    let errText = '';
    if (s.tried) {
      if (s.step === 1) {
        if (!okName) errText = 'Enter your full name.';
        else if (!okPhone) errText = 'Enter a valid 10-digit mobile number.';
        else if (!okEmail) errText = 'Enter a valid work email.';
        else if (!okPw) errText = 'Password needs at least 8 characters.';
        else if (!s.terms) errText = 'Please accept the terms to continue.';
      } else if (s.step === 2) {
        if (!okCo) errText = 'Enter your company name.';
      } else if (s.step === 3) {
        if (!okOtp) errText = 'Enter the 6-digit code.';
      }
    }
    const ok1 = okName && okPhone && okEmail && okPw && s.terms;
    const next = () => {
      const valid = s.step === 1 ? ok1 : s.step === 2 ? okCo : okOtp;
      if (!valid) { this.setState({ tried: true }); return; }
      this.setState({ step: s.step + 1, tried: false, resendIn: 30, setupAt: 0 });
    };
    const flag = (bad) => (s.tried && bad) ? '1' : '0';

    const names = ['Your account', 'Your company', 'Verify mobile'];
    const titles = ['Create your free account', 'Tell us about your company', 'Check your phone'];
    const bars = [1, 2, 3].map((i) => i < s.step ? '#ff5f00' : i === s.step ? 'color-mix(in oklab, #ff5f00 55%, var(--line))' : 'var(--line)');

    const projOpts = ['1', '2–5', '6–15', '15+'].map((l, i) => ({ l, on: s.proj === i ? '1' : '0', pick: () => this.setState({ proj: i }) }));
    const srcDefs = ['99acres', 'MagicBricks', 'Housing', 'IndiaMART', 'Meta ads', 'Google ads', 'Channel partners', 'Walk-ins'];
    const srcOpts = srcDefs.map((l, i) => ({ l, on: s.src.indexOf(i) >= 0 ? '1' : '0', pick: () => this.setState({ src: toggle(s.src, i) }) }));

    const wsName = s.company.trim() || 'your-company';
    const preview = [
      { l: 'Lead sources selected', v: String(s.src.length), c: '#ff5f00' },
      { l: 'Team seats on trial', v: '3', c: '#45d69a' },
      { l: 'Trial length', v: '14 days', c: '#86b0ff' }
    ];
    const perks = [
      { t: 'Full CRM for 14 days', d: 'Leads, presales, inventory, cost sheets, bookings and collections.' },
      { t: '3 team members included', d: 'Invite presales, sales and accounts from day one.' },
      { t: 'Compliance checks built in', d: 'RERA §13 cap, GST and TDS on every transaction.' },
      { t: 'Plans from ₹1,000 / month', d: 'Choose a plan when you are ready.' }
    ];
    const setupDefs = ['Creating your workspace', 'Setting up roles for sales, presales and accounts', 'Connecting your lead sources', 'Loading a sample project to explore'];
    const setup = setupDefs.map((l, i) => ({ l, done: i < s.setupAt, run: i === s.setupAt, op: i <= s.setupAt ? 1 : 0.4 }));
    const masked = digits.length >= 10 ? '+91 ' + digits.slice(-10, -8) + 'XXX XX' + digits.slice(-3) : '+91 your number';

    return {
      perks, preview, wsName,
      step: String(Math.min(s.step, 3)), stepName: names[Math.min(s.step, 3) - 1].toUpperCase(), stepTitle: titles[Math.min(s.step, 3) - 1], bars,
      s1: s.step === 1, s2: s.step === 2, s3: s.step === 3, done: s.step === 4, notDone: s.step < 4,
      f: { name: s.name, phone: s.phone, email: s.email, pw: s.pw, company: s.company, city: s.city, rera: s.rera, otp: s.otp },
      e: { name: flag(!okName), phone: flag(!okPhone), email: flag(!okEmail), pw: flag(!okPw), company: flag(!okCo), otp: flag(!okOtp) },
      onName: (ev) => this.setState({ name: ev.target.value }),
      onPhone: (ev) => this.setState({ phone: ev.target.value }),
      onEmail: (ev) => this.setState({ email: ev.target.value }),
      onPw: (ev) => this.setState({ pw: ev.target.value }),
      onCompany: (ev) => this.setState({ company: ev.target.value }),
      onCity: (ev) => this.setState({ city: ev.target.value }),
      onRera: (ev) => this.setState({ rera: ev.target.value }),
      onOtp: (ev) => this.setState({ otp: ev.target.value.replace(/\D/g, '').slice(0, 6) }),
      pwType: s.showPw ? 'text' : 'password', pwToggle: s.showPw ? 'Hide' : 'Show', pwToggleLabel: s.showPw ? 'Hide password' : 'Show password',
      togglePw: () => this.setState({ showPw: !s.showPw }),
      pwBars, pwLabel: ['', 'Weak', 'Fair', 'Good', 'Strong'][strength],
      terms: s.terms, termsOn: s.terms ? '1' : '0', termsPressed: s.terms ? 'true' : 'false', toggleTerms: () => this.setState({ terms: !s.terms }),
      err: !!errText, errText,
      projOpts, srcOpts,
      phoneShown: masked,
      resendText: s.resendIn > 0 ? 'Resend available in 0:' + String(s.resendIn).padStart(2, '0') : 'Did not get it?',
      resendDisabled: s.resendIn > 0, resendOp: s.resendIn > 0 ? '0.45' : '1',
      resend: () => this.setState({ resendIn: 30 }),
      canBack: s.step > 1 && s.step < 4, noBack: s.step === 1,
      back: () => this.setState({ step: s.step - 1, tried: false }), next,
      nextLabel: s.step === 1 ? 'Create account' : s.step === 2 ? 'Continue' : 'Verify & start trial',
      firstName: s.name.trim().split(' ')[0] || 'there', setup
    };
  }
}

DC.mount(Component, 'tpl', 'app');
