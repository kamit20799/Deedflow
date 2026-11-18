/* DeedFlow — features page logic (data + interactions) */
class Component extends DCLogic {
  state = { menuOpen: false, video: true, chapter: 0, vprog: 0, cx: 0.5, cy: 0.5, loginOpen: false, lead: 0, call: 'idle', sec: 0, disp: -1, liked: [0, 1], obj: [1], tower: 1, unit: 'B-1204', holds: {}, area: 1450, floor: 12, plc: 1, facing: 0, offer: 1, frozen: false, bk: 2, rcp: 1, bounced: false };
  componentDidMount() {
    this.tv = setInterval(() => { const st = this.state; const patch = {}; const beat = Math.max(0, Math.min(11, Math.floor((st.vprog + 4.33) / (100 / 12)) - 1)); const ap = document.querySelector('.ap'); const tg = ap && ap.querySelector('[data-cur~="c' + beat + '"]'); if (tg) { const a = ap.getBoundingClientRect(), r = tg.getBoundingClientRect(); if (a.width > 0) { const cx = (r.left + r.width / 2 - a.left) / a.width, cy = (r.top + r.height / 2 - a.top) / a.height; if (Math.abs(cx - st.cx) > 0.006 || Math.abs(cy - st.cy) > 0.006) { patch.cx = cx; patch.cy = cy; } } } if (st.video) { if (st.vprog >= 100) { patch.chapter = (st.chapter + 1) % 4; patch.vprog = 0; } else patch.vprog = st.vprog + 100 / 300; } if (Object.keys(patch).length) this.setState(patch); }, 100); this.t = setInterval(() => { if (this.state.call === 'on') this.setState({ sec: this.state.sec + 1 }); }, 1000); }
  componentWillUnmount() { clearInterval(this.tv); clearInterval(this.t); }
  renderVals() {
    const s = this.state;
    const inr = (n) => (n < 0 ? '−₹' : '₹') + Math.abs(Math.round(n)).toLocaleString('en-IN');
    const mmss = (n) => String(Math.floor(n / 60)).padStart(2, '0') + ':' + String(n % 60).padStart(2, '0');
    const toggle = (arr, i) => arr.indexOf(i) >= 0 ? arr.filter((x) => x !== i) : arr.concat([i]);

    const jump = [['01', 'Leads & scoring', '#leads'], ['02', 'Presales', '#presales'], ['03', 'Site visits', '#visits'], ['04', 'Inventory', '#inventory'], ['05', 'Pricing engine', '#pricing'], ['06', 'Bookings', '#bookings'], ['07', 'Payments', '#payments']].map((j) => ({ n: j[0], l: j[1], href: j[2] }));

    const leads = [
      { name: 'Priya Sharma', src: '99acres', want: '3 BHK, ₹1 Cr', rule: 72, ai: 88, pri: 'HOT', when: '2 min ago', next: 'Call within 15 minutes. Suggest a weekend visit to Tower B.',
        factors: [['R', 'Budget fits available inventory', 25], ['R', 'Premium listing source', 15], ['AI', 'Viewed floor plans 4 times in 48h', 18], ['AI', 'Responds in evenings', 12]] },
      { name: 'Kavya Reddy', src: 'Housing', want: '2 BHK, ₹70 L', rule: 58, ai: 76, pri: 'WARM', when: '18 min ago', next: 'AI rates higher than rules. Worth a same-day call.',
        factors: [['R', 'Budget slightly below base price', 10], ['R', 'Location within 8 km', 14], ['AI', 'Asked about home-loan tie-ups', 20], ['AI', 'Shared enquiry with spouse', 11]] },
      { name: 'Neha Kulkarni', src: 'MagicBricks', want: '3 BHK, ₹1.1 Cr', rule: 81, ai: 79, pri: 'HOT', when: '6 min ago', next: 'Both scores agree. Assign to senior closer.',
        factors: [['R', 'Budget fits premium floors', 28], ['R', 'Repeat enquiry, merged on capture', 18], ['AI', 'Asked about possession date', 15], ['AI', 'High engagement on WhatsApp', 12]] },
      { name: 'Rohan Iyer', src: 'Google ads', want: '1 BHK, ₹45 L', rule: 38, ai: 44, pri: 'COLD', when: '11 min ago', next: 'Add to nurture. No product match in current inventory.',
        factors: [['R', 'Budget below inventory range', 4], ['R', 'Generic ad form', 6], ['AI', 'Single page visit', 8], ['AI', 'Investor intent signals', 14]] }
    ];
    const toneOf = { HOT: 'p-hot', WARM: 'p-warn', COLD: 'p-mut' };
    const leadList = leads.map((l, i) => ({ ...l, ini: l.name.split(' ').map((w) => w[0]).join(''), tone: toneOf[l.pri], on: i === s.lead ? '1' : '0', pick: () => this.setState({ lead: i }) }));
    const L = leads[s.lead];
    const lead = { ...L, tone: toneOf[L.pri], ruleOff: String(213.6 * (1 - L.rule / 100)), aiOff: String(213.6 * (1 - L.ai / 100)),
      factors: L.factors.map((f) => ({ k: f[0], t: f[1], v: '+' + f[2], w: Math.min(100, f[2] * 3.4) + '%', tone: f[0] === 'AI' ? 'p-hot' : 'p-mut', c: f[0] === 'AI' ? '#ff5f00' : 'var(--sub)' })) };

    const onCall = s.call === 'on';
    const dispDefs = ['Site visit booked', 'Call back', 'Send cost sheet', 'Not interested', 'Wrong number', 'Already bought'];
    const dispNextMap = ['Visit created. T-1 day and T-2 hour reminders scheduled.', 'Follow-up task created for tomorrow, 6 PM.', 'Cost sheet draft prepared from the pricing engine.', 'Lead closed with reason. Removed from the queue.', 'Number flagged for review.', 'Lead archived. Source quality updated.'];

    const visitSteps = [
      ['Visit booked by presales', 'Thu 4:12 PM', 'Linked to lead, project and executive', 'done'],
      ['T-1 day reminder', 'Fri 11:00 AM', 'WhatsApp and SMS with location pin', 'done'],
      ['T-2 hour reminder', 'Sat 9:00 AM', 'Confirms the buyer is on the way', 'now'],
      ['Visit at site office', 'Sat 11:00 AM', 'Executive checks in at the site', 'todo'],
      ['Structured feedback', 'Before leaving site', 'Liked, objections, next step', 'todo']
    ].map((v, i) => ({ n: String(i + 1), t: v[0], when: v[1], d: v[2], bg: v[3] === 'done' ? '#ff5f00' : v[3] === 'now' ? 'var(--accsoft)' : 'var(--bg2)', fg: v[3] === 'done' ? '#0a1628' : v[3] === 'now' ? 'var(--acct)' : 'var(--sub)', lineC: i === 4 ? 'transparent' : (v[3] === 'done' ? '#ff5f00' : 'var(--line)') }));
    const likedDefs = ['Layout', 'View', 'Amenities', 'Location'];
    const objDefs = ['Price', 'Possession date', 'Floor', 'Parking'];
    const liked = likedDefs.map((l, i) => ({ l, on: s.liked.indexOf(i) >= 0 ? '1' : '0', pick: () => this.setState({ liked: toggle(s.liked, i) }) }));
    const objections = objDefs.map((l, i) => ({ l, on: s.obj.indexOf(i) >= 0 ? '1' : '0', pick: () => this.setState({ obj: toggle(s.obj, i) }) }));
    let visitNext = 'Send cost sheet for the unit they viewed.';
    if (s.obj.indexOf(0) >= 0) visitNext = 'Raise a discount request through the approval chain.';
    else if (s.obj.indexOf(1) >= 0) visitNext = 'Share RERA possession timeline and construction updates.';
    else if (s.obj.indexOf(2) >= 0) visitNext = 'Offer a hold on a higher floor in the same stack.';
    else if (s.obj.indexOf(3) >= 0) visitNext = 'Send parking allocation options with the cost sheet.';

    const towerNames = ['Tower A', 'Tower B', 'Tower C'];
    const towers = towerNames.map((l, i) => ({ l, on: i === s.tower ? '1' : '0', pick: () => this.setState({ tower: i, unit: String.fromCharCode(65 + i) + '-1204' }) }));
    const T = String.fromCharCode(65 + s.tower);
    const seed = (f, u) => ((f * 7 + u * 13 + s.tower * 5) % 17);
    let cnt = { av: 0, hold: 0, bk: 0 };
    const statusOf = (id, f, u) => {
      if (s.holds[id]) return 'hold';
      const k = seed(f, u);
      if (k < 6) return 'bk'; if (k < 8) return 'hold'; if (k === 16) return 'bl'; return 'av';
    };
    const floors = [];
    for (let f = 12; f >= 3; f--) {
      const units = [];
      for (let u = 1; u <= 6; u++) {
        const id = T + '-' + String(f).padStart(2, '0') + String(u).padStart(2, '0');
        const st = statusOf(id, f, u);
        if (st === 'av') cnt.av++; if (st === 'hold') cnt.hold++; if (st === 'bk') cnt.bk++;
        units.push({ id, short: String(f).padStart(2, '0') + String(u).padStart(2, '0'), cls: 'u-' + st, status: { av: 'Available', hold: 'On hold', bk: 'Booked', bl: 'Blocked' }[st], on: id === s.unit ? '1' : '0', pick: () => this.setState({ unit: id }) });
      }
      floors.push({ label: 'F' + f, units });
    }
    const uf = parseInt(s.unit.slice(2, 4), 10), uu = parseInt(s.unit.slice(4, 6), 10);
    const ust = statusOf(s.unit, uf, uu);
    const types = ['3 BHK', '2 BHK', '2 BHK', '3 BHK', '2 BHK', '4 BHK'];
    const areas = [1450, 1080, 1120, 1480, 1060, 1920];
    const facingsU = ['East', 'North', 'North', 'West', 'South', 'East'];
    const unit = { id: s.unit, type: types[uu - 1], area: areas[uu - 1].toLocaleString('en-IN'), facing: facingsU[uu - 1], floor: String(uf),
      status: { av: 'Available', hold: 'On hold', bk: 'Booked', bl: 'Blocked' }[ust], tone: { av: 'p-ok', hold: 'p-warn', bk: 'p-hot', bl: 'p-mut' }[ust],
      note: ust === 'av' ? 'Place a hold for a buyer. It releases automatically if no booking follows.' : ust === 'hold' ? 'Held for a buyer. Auto-releases in 23h 40m.' : ust === 'bk' ? 'Booked. Linked to booking, cost sheet and payment plan.' : 'Blocked by management. Not visible to sales.',
      btn: ust === 'av' ? 'Hold for 24 hours' : ust === 'hold' && s.holds[s.unit] ? 'Release hold' : 'View booking', btnCls: ust === 'av' ? 'bp' : 'bs' };
    const holdUnit = () => { const h = { ...s.holds }; if (ust === 'av') h[s.unit] = true; else if (h[s.unit]) delete h[s.unit]; this.setState({ holds: h }); };

    const base = 6000, rise = 50;
    const plcDefs = [['None', 0], ['Park facing', 200], ['Corner', 150]];
    const facDefs = [['Any', 0], ['East', 100], ['North', 75], ['Road', -50]];
    const offDefs = [['None', 0], ['Festive −₹75/sq ft', 75], ['Early bird −₹120/sq ft', 120]];
    const mk = (defs, key) => defs.map((d, i) => ({ l: d[0], on: s[key] === i ? '1' : '0', pick: () => { if (!s.frozen) this.setState({ [key]: i }); } }));
    const plcs = mk(plcDefs, 'plc'), facings = mk(facDefs, 'facing'), offers = mk(offDefs, 'offer');
    const A = s.area;
    const bp = A * base, fr = A * rise * Math.max(0, s.floor - 4), pl = A * plcDefs[s.plc][1], fc = A * facDefs[s.facing][1], of = -A * offDefs[s.offer][1];
    const sub = bp + fr + pl + fc + of, gst = sub * 0.05;
    const sheet = [
      { l: 'Base price', s: A.toLocaleString('en-IN') + ' sq ft × ₹6,000', v: inr(bp), c: 'var(--ink)' },
      { l: 'Floor rise', s: s.floor > 4 ? '₹50/sq ft × ' + (s.floor - 4) + ' floors above 4' : 'No rise up to floor 4', v: inr(fr), c: 'var(--ink)' },
      { l: 'PLC', s: plcDefs[s.plc][0], v: inr(pl), c: 'var(--ink)' },
      { l: 'Facing premium', s: facDefs[s.facing][0], v: inr(fc), c: 'var(--ink)' },
      { l: 'Offer', s: offDefs[s.offer][0], v: inr(of), c: of < 0 ? 'var(--acct)' : 'var(--ink)' },
      { l: 'Agreement value', s: 'Before tax', v: inr(sub), c: 'var(--ink)' },
      { l: 'GST', s: '5% sample rate, set per project', v: inr(gst), c: 'var(--blue)' }
    ];

    const bkDefs = [
      { l: 'EOI', d: 'Expression of interest with token amount. The unit is held while the buyer decides.', docs: [['EOI form', 'Signed digitally', 'PDF', 'Signed', 'p-ok'], ['Token receipt', '₹1,00,000 · cleared', 'PDF', 'Cleared', 'p-ok']] },
      { l: 'Booking', d: 'Booking confirmed against a frozen cost sheet. The allotment letter is generated from the booking itself.', docs: [['Allotment letter', 'Auto-generated', 'PDF', 'Issued', 'p-ok'], ['Frozen cost sheet v2', 'Shared with buyer', 'PDF', 'Frozen', 'p-blue'], ['Payment plan', 'CLP · 10 milestones', 'PDF', 'Attached', 'p-ok']] },
      { l: 'Agreement', d: 'Agreement for sale prepared. The buyer gets a proposal email with a tokenised public page to review before signing.', docs: [['Agreement for sale', 'Draft v3', 'DOC', 'In review', 'p-warn'], ['Buyer proposal page', 'Tokenised link · viewed twice', 'URL', 'Viewed', 'p-blue'], ['KYC pack', 'PAN, Aadhaar, photos', 'ZIP', 'Complete', 'p-ok']] },
      { l: 'Registered', d: 'Agreement registered with the sub-registrar. From here, collections follow the payment plan.', docs: [['Registered agreement', 'Scanned copy', 'PDF', 'Pending', 'p-mut'], ['Stamp duty receipt', 'Uploaded by accounts', 'PDF', 'Pending', 'p-mut']] },
      { l: 'Possession', d: 'Possession recorded against unit and booking, with the handover pack visible to the buyer in the customer portal.', docs: [['Possession letter', 'On completion', 'PDF', 'Upcoming', 'p-mut'], ['Handover checklist', 'Snags and sign-off', 'PDF', 'Upcoming', 'p-mut']] }
    ];
    const bkStates = bkDefs.map((b, i) => ({ l: b.l, n: '0' + (i + 1), on: i === s.bk ? '1' : '0', bar: i <= s.bk ? '#ff5f00' : 'var(--line)', pick: () => this.setState({ bk: i }) }));
    const B = bkDefs[s.bk];
    const bk = { l: B.l, d: B.d, docs: B.docs.map((d) => ({ t: d[0], s: d[1], ext: d[2], p: d[3], tone: d[4] })) };

    const clp = [['On booking', '10%', '₹9,80,000', 'Cleared', 'p-ok'], ['On agreement', '20%', '₹19,60,000', 'Cleared', 'p-ok'], ['Plinth', '15%', '₹14,70,000', s.bounced ? 'Reversed' : s.rcp >= 3 ? 'Cleared' : 'Receipt in clearing', s.bounced ? 'p-bad' : s.rcp >= 3 ? 'p-ok' : 'p-warn'], ['Slab 5', '10%', '₹9,80,000', 'Demand sent', 'p-blue'], ['Slab 10', '10%', '₹9,80,000', 'Scheduled', 'p-mut'], ['Possession', '35%', '₹34,30,000', 'Scheduled', 'p-mut']].map((c) => ({ m: c[0], p: c[1], a: c[2], s: c[3], tone: c[4] }));
    const rcpLabels = s.bounced ? ['Received', 'Bounced', 'Reversed'] : ['Received', 'Clearing', 'Cleared'];
    const rcpSteps = rcpLabels.map((l, i) => ({ l, c: s.bounced ? (i === 0 ? '#ff5f00' : '#d92d20') : (i < s.rcp ? '#ff5f00' : 'var(--line)'), t: s.bounced ? (i === 0 ? 'var(--ink)' : 'var(--bad)') : (i < s.rcp ? 'var(--ink)' : 'var(--sub)') }));
    let ledger = [];
    if (s.rcp >= 3 && !s.bounced) ledger = [{ dc: 'Dr', acc: 'Bank · HDFC escrow', amt: '₹14,70,000', tone: 'p-blue' }, { dc: 'Cr', acc: 'Customer · Priya Sharma', amt: '₹14,70,000', tone: 'p-ok' }];
    if (s.bounced) ledger = [{ dc: 'Dr', acc: 'Customer · Priya Sharma', amt: '₹14,70,000', tone: 'p-bad' }, { dc: 'Cr', acc: 'Cheque clearing', amt: '₹14,70,000', tone: 'p-mut' }];

    const more = [
      ['APPROVALS', 'Discount and price-deviation chains', 'Requests route up the chain you define. Approved values freeze into the cost sheet.'],
      ['CANCELLATIONS', 'Refunds by MahaRERA forfeiture tiers', 'Cancellation computes forfeiture and refund, then reverses the ledger line by line.'],
      ['CUSTOMER PORTAL', 'Buyers see what they own', 'Bookings, schedule, documents and construction updates, without calling your CRM team.'],
      ['WHATSAPP & TELEPHONY', 'Talk where buyers are', 'WhatsApp messaging and telephony connected to the same lead record.'],
      ['SLA & GAMIFICATION', 'Speed you can measure', 'SLA timers on untouched leads and leaderboards on calls, visits and bookings.'],
      ['REPORTS & MICROSITES', 'Out to the world, back to your inbox', 'Scheduled reports by email, public listings and per-project microsites feeding lead capture.']
    ].map((m) => ({ k: m[0], t: m[1], d: m[2] }));

    const wkScript = [
      { t: 'Lead lands & gets assigned', d: 'Portal enquiry → deduped → scored → assigned', path: 'leads', nav: 1, clicks: [4, 6, 9], zoom: [1, 1.12, 1.12, 1.18, 1.1, 1, 1.15, 1.15, 1.15, 1.15, 1.1, 1],
        subs: ['Every portal and ad lead lands in one inbox.', 'A new 99acres enquiry arrives — captured automatically.', 'Same mobile number? Duplicates are merged at capture.', 'Rule score and AI score rank the lead: HOT.', 'Open the lead…', '…and the full buyer profile is one click away.', 'Assign it — or let round-robin do it for you.', 'Neha K. owns the lead. The 15-minute SLA starts.', 'A WhatsApp acknowledgement goes out instantly.', 'Update the status as you go.', 'Status: Contacting.', 'Enquiry to assigned lead in under a minute.'] },
      { t: 'Call, follow-up, site visit', d: 'Browser dialer → AI summary → visit booked', path: 'leads/priya-sharma', nav: 1, clicks: [0, 4, 6, 7, 8], zoom: [1.1, 1.15, 1.15, 1.15, 1.15, 1.1, 1.1, 1.12, 1.12, 1.1, 1.1, 1],
        subs: ['Neha opens the lead she was just assigned and calls.', 'The browser dialer connects — no phone needed.', 'The call is recorded, with consent captured.', 'Notes are saved against the lead as you talk.', 'One tap to log the outcome: Interested.', 'AI summarises the call and suggests the next step.', 'Schedule the site visit right here.', 'Pick the day…', '…pick the slot, and confirm.', 'The visit lands on the timeline, confirmed.', 'WhatsApp reminders are scheduled automatically.', 'First call to confirmed site visit, on one screen.'] },
      { t: 'Cost sheet to booking', d: 'Live inventory → hold → cost sheet → EOI', path: 'inventory/skyline/tower-b', nav: 4, clicks: [0, 2, 3, 6, 8, 9], zoom: [1.12, 1.1, 1.15, 1.15, 1.15, 1.15, 1.18, 1.15, 1.15, 1.15, 1.05, 1],
        subs: ['Saturday, at the site: Priya liked Tower B.', 'Select B-1204 to see price and status.', 'Hold the unit for the buyer — the timer starts.', 'Generate the cost sheet from the pricing engine.', 'Base price and PLC are pulled automatically.', 'GST is applied and the total is computed.', 'At the visit the buyer asked for 2% off — enter it.', 'It is above the exec limit, so it routes for approval.', 'Approved by the Sales head. Freeze and share.', 'Sheet frozen as v3. Now book the unit.', 'EOI of ₹2,00,000 collected by UPI at the site.', 'B-1204 is booked. The agreement is generated.'] },
      { t: 'Receipt posts, RERA-checked', d: 'Demand → receipt → 4 checks → ledger', path: 'collections/b-1204', nav: 6, clicks: [0, 2, 3], zoom: [1.12, 1.12, 1.12, 1.15, 1.18, 1.18, 1.18, 1.18, 1.1, 1.1, 1, 1],
        subs: ['B-1204 is booked. Here is its payment schedule.', 'Raise the booking demand: 10% of ₹97.9 L, less the EOI.', 'The buyer pays. Record the receipt.', 'Validate before it posts…', 'RERA §13: total received is exactly 10% — allowed.', 'Escrow: 70% routed to the designated account.', 'GST e-invoice: IRN generated.', 'TDS 194-IA: 1% tracked with Form 26QB.', 'All checks pass. The receipt posts to the ledger.', 'The receipt PDF is emailed to the buyer.', 'The buyer portal updates on its own.', 'And every step is written to the audit trail.'] }
    ];
    const wkBeat = Math.min(11, Math.floor(s.vprog / (100 / 12)));
    const wkCur = wkScript[s.chapter];
    const curBeat = Math.min(11, Math.floor((s.vprog + 4.33) / (100 / 12)) - 1);
    const beats = {}; for (let k = 0; k < 12; k++) { beats['b' + k] = wkBeat >= k; beats['n' + k] = wkBeat < k; }
    const chapters = wkScript.map((c, i) => ({ t: c.t, d: c.d, n: String(i + 1), ic: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z', 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01', 'M6 4h12M6 8h12M8 8c6 0 6 8 0 8H6l6 7'][i], thumb: ['assets/logos/walk-1.jpg', 'assets/logos/walk-2.jpg', 'assets/logos/walk-3.jpg', 'assets/logos/walk-4.jpg'][i], meta: i === s.chapter ? (s.video ? 'Playing' : 'Paused') : '30 sec', on: i === s.chapter ? '1' : '0', k0: i === 0, k1: i === 1, k2: i === 2, k3: i === 3, pick: () => this.setState({ chapter: i, video: true, vprog: 0 }) }));
    const screens = ['Lead inbox', 'Dialer', 'Site-visit calendar', 'Inventory grid', 'Cost sheet', 'Receipt & ledger'];
    const apZ = wkCur.zoom[wkBeat];
    const clampT = (v) => Math.max(1 - apZ, Math.min(0, v));
    const ch3 = s.chapter === 2, ch4 = s.chapter === 3;
    const walk = { chapters, screens, ...beats, videoIdle: !s.video, videoOn: s.video,
      sc1: s.chapter === 0, sc2: s.chapter === 1, sc3: ch3, sc4: ch4,
      apPath: wkCur.path, apNav: [['Dashboard', 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'], ['Leads', 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'], ['Calls', 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z'], ['Site visits', 'M3 5h18v15H3zM3 10h18M8 3v4M16 3v4'], ['Inventory', 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01'], ['Bookings', 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6'], ['Collections', 'M6 4h12M6 8h12M8 8c6 0 6 8 0 8H6l6 7'], ['Partners', 'M8.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM20.5 6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM20.5 18a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM8.2 10.9l7.4-3.8M8.2 13.1l7.4 3.8']].map((n, i) => ({ l: n[0], ic: n[1], on: i === wkCur.nav ? '1' : '0' })),
      apT: 'translate(' + (clampT(0.5 - s.cx * apZ) * 100).toFixed(2) + '%, ' + (clampT(0.5 - s.cy * apZ) * 100).toFixed(2) + '%) scale(' + apZ + ')',
      curX: (s.cx * 100).toFixed(2) + '%', curY: (s.cy * 100).toFixed(2) + '%', ripCls: wkCur.clicks.indexOf(curBeat) >= 0 ? (curBeat % 2 ? 'a' : 'b') : '',
      wkSub: wkCur.subs[wkBeat], npOn: s.video ? '1' : '0', npTime: '0:' + String(Math.min(30, Math.floor(s.vprog * 0.3))).padStart(2, '0'), wkTitle: wkCur.t, wkNum: String(s.chapter + 1), vprogW: s.vprog + '%',
      dispOn: wkBeat >= 5 ? '1' : '0', dayOn: wkBeat >= 8 ? '1' : '0', mVisit: s.chapter === 1 && wkBeat >= 7 && wkBeat < 9, mEoi: ch3 && wkBeat === 10,
      u1204: wkBeat >= 11 ? 'booked' : wkBeat >= 3 ? 'hold' : wkBeat >= 1 ? 'sel' : 'a', availN: wkBeat >= 3 ? '12' : '13', holdN: wkBeat >= 3 && wkBeat < 11 ? '2' : '1', soldN: wkBeat >= 11 ? '11' : '10',
      dStatus: wkBeat >= 8 ? 'Paid' : wkBeat >= 1 ? 'Demand sent' : 'Due', dTone: wkBeat >= 8 ? 'ok' : wkBeat >= 1 ? 'blue' : 'warn', paidN: wkBeat >= 8 ? '2' : '1', paidW: wkBeat >= 8 ? '20%' : '10%',
      toggleVideo: () => this.setState({ video: !s.video }) };

    return {
      ...walk,
      menuOpen: s.menuOpen, menuClosed: !s.menuOpen, navOpen: s.menuOpen ? '1' : '0', menuExp: s.menuOpen ? 'true' : 'false', toggleMenu: () => this.setState({ menuOpen: !s.menuOpen }),
      loginOpen: s.loginOpen, loginExp: s.loginOpen ? 'true' : 'false', loginRot: s.loginOpen ? '180deg' : '0deg',
      toggleLogin: () => { if (Date.now() - (this._lh || 0) < 500) return; this.setState({ loginOpen: !s.loginOpen }); },
      loginIn: () => { clearTimeout(this._lt); if (!this.state.loginOpen) { this._lh = Date.now(); this.setState({ loginOpen: true }); } },
      loginOut: () => { clearTimeout(this._lt); this._lt = setTimeout(() => this.setState({ loginOpen: false }), 180); },
      jump, leadList, lead,
      onCall, callTime: mmss(s.sec), callState: onCall ? 'On call · recording' : s.call === 'ended' ? 'Call ended' : 'Ready to call',
      callTone: onCall ? 'p-ok' : s.call === 'ended' ? 'p-mut' : 'p-blue',
      callBtnCls: onCall ? 'cb-end' : 'cb-go', callBtnLabel: onCall ? 'End call' : 'Start call', callRot: onCall ? '135deg' : '0deg', waveOp: onCall ? '1' : '0.2',
      toggleCall: () => onCall ? this.setState({ call: 'ended' }) : this.setState({ call: 'on', sec: 0, disp: -1 }),
      dispositions: dispDefs.map((l, i) => ({ l, on: s.disp === i ? '1' : '0', pick: () => this.setState({ disp: i }) })),
      dispNext: s.disp >= 0 ? dispNextMap[s.disp] : 'One tap logs the outcome and creates the follow-up.',
      aiReady: s.call === 'ended', aiWaiting: s.call !== 'ended', aiState: s.call === 'ended' ? 'Ready' : onCall ? 'Listening' : 'Idle', aiTone: s.call === 'ended' ? 'p-ok' : 'p-mut',
      visitSteps, liked, objections, visitNext,
      towers, floors, unit, holdUnit, invSummary: cnt.av + ' available · ' + cnt.hold + ' on hold · ' + cnt.bk + ' booked',
      area: A, floor: s.floor, floorPad: String(s.floor).padStart(2, '0'), frozen: s.frozen, notFrozen: !s.frozen, frozenOn: s.frozen ? '1' : '0',
      setArea: (e) => this.setState({ area: parseInt(e.target.value, 10) }),
      setFloor: (e) => this.setState({ floor: parseInt(e.target.value, 10) }),
      plcs, facings, offers, sheet, total: inr(sub + gst),
      frozenLabel: s.frozen ? 'Frozen v1' : 'Draft', frozenTone: s.frozen ? 'p-blue' : 'p-warn', sheetId: s.frozen ? 'CS-2026-0412 · locked' : 'CS-2026-0412 · editable',
      freezeBtn: s.frozen ? 'Unfreeze (needs approval)' : 'Freeze & share with buyer', freezeCls: s.frozen ? 'bs' : 'bp',
      freezeNote: s.frozen ? 'Inputs locked. Any change creates v2 through approvals.' : 'Freezing locks every line the buyer sees.',
      toggleFreeze: () => this.setState({ frozen: !s.frozen, csPop: !s.frozen }),
      csPop: !!s.csPop, closePop: () => this.setState({ csPop: false, frozen: false }),
      popBackdrop: (e) => { const t = e && e.target; if (t && t.classList && t.classList.contains('cspop')) this.setState({ csPop: false, frozen: false }); },
      bkStates, bk, clp, rcpSteps, ledger, noLedger: ledger.length === 0,
      rcpBtn: s.bounced ? 'Reset receipt' : s.rcp >= 3 ? 'Reset receipt' : 'Advance to ' + rcpLabels[s.rcp],
      advanceRcp: () => (s.bounced || s.rcp >= 3) ? this.setState({ rcp: 1, bounced: false }) : this.setState({ rcp: s.rcp + 1 }),
      bounceRcp: () => this.setState({ bounced: true }),
      more
    };
  }
}

DC.mount(Component, 'tpl', 'app');
