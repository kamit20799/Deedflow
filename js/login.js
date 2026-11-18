/* DeedFlow — login page logic (data + interactions) */
class Component extends DCLogic {
  state = { role: 0, id: '', pw: '', showPw: false, tried: false, done: false };
  renderVals() {
    const s = this.state;
    const defs = [
      { t: 'Developer team', d: 'Sales, presales, CRM and accounts', icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01', idLabel: 'Email or mobile number', idPh: 'you@company.in or +91 98XXX XXXXX' },
      { t: 'Channel partner', d: 'Brokers and their agents', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8', idLabel: 'Registered mobile or email', idPh: '+91 98XXX XXXXX' },
      { t: 'Home buyer', d: 'Booking, payments and documents', icon: 'M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z', idLabel: 'Registered mobile or email', idPh: '+91 98XXX XXXXX' }
    ];
    const cur = defs[s.role];
    const v = s.id.trim();
    const okId = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || (v.replace(/\D/g, '').length >= 10);
    const okPw = s.pw.length >= 1;
    let errText = '';
    if (s.tried) {
      if (!okId) errText = 'Enter your registered email or mobile number.';
      else if (!okPw) errText = 'Enter your password.';
    }
    const perks = defs.map((d) => ({ t: d.t, d: d.d, icon: d.icon }));
    return {
      perks,
      roles: defs.map((d, i) => ({ t: d.t, d: d.d, icon: d.icon, on: s.role === i ? '1' : '0', sel: s.role === i ? 'true' : 'false', pick: () => this.setState({ role: i, tried: false, done: false }) })),
      roleName: cur.t.toLowerCase(), idLabel: cur.idLabel, idPh: cur.idPh,
      idVal: s.id, pwVal: s.pw,
      onId: (ev) => this.setState({ id: ev.target.value }),
      onPw: (ev) => this.setState({ pw: ev.target.value }),
      eId: s.tried && !okId ? '1' : '0', ePw: s.tried && okId && !okPw ? '1' : '0',
      pwType: s.showPw ? 'text' : 'password', pwToggle: s.showPw ? 'Hide' : 'Show', pwToggleLabel: s.showPw ? 'Hide password' : 'Show password',
      togglePw: () => this.setState({ showPw: !s.showPw }),
      err: !!errText, errText,
      btn: 'Log in',
      submit: () => { if (!okId || !okPw) { this.setState({ tried: true }); return; } this.setState({ done: true, tried: false }); },
      done: s.done, notDone: !s.done
    };
  }
}

DC.mount(Component, 'tpl', 'app');
