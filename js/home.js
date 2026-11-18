/* DeedFlow — home page logic (data + interactions) */
class Component extends DCLogic {
  state = { menuOpen: false, video: true, chapter: 0, vprog: 0, cx: 0.5, cy: 0.5, ts: 0, tsHold: false, f1: { name: '', phone: '', email: '', company: '', proj: 1 }, f1Tried: false, f1Done: false, f2: { name: '', phone: '', email: '', interest: 0 }, f2Tried: false, f2Done: false, loginOpen: false, bf: 0, heroEmail: '', stage: 0, auto: true, feed: 0, sec: 134, chk: 8, portal: 1, annual: false, faq: 0, hold: 1740 };
  componentDidMount() {
    this.tts = setInterval(() => { const st = this.state; if (!st.tsHold) this.setState({ ts: (st.ts + 1) % 6 }); }, 5000);
    this.tv = setInterval(() => { const st = this.state; const patch = {}; const beat = Math.max(0, Math.min(11, Math.floor((st.vprog + 4.33) / (100 / 12)) - 1)); const ap = document.querySelector('.ap'); const tg = ap && ap.querySelector('[data-cur~="c' + beat + '"]'); if (tg) { const a = ap.getBoundingClientRect(), r = tg.getBoundingClientRect(); if (a.width > 0) { const cx = (r.left + r.width / 2 - a.left) / a.width, cy = (r.top + r.height / 2 - a.top) / a.height; if (Math.abs(cx - st.cx) > 0.006 || Math.abs(cy - st.cy) > 0.006) { patch.cx = cx; patch.cy = cy; } } } if (st.video) { if (st.vprog >= 100) { patch.chapter = (st.chapter + 1) % 4; patch.vprog = 0; } else patch.vprog = st.vprog + 100 / 300; } if (Object.keys(patch).length) this.setState(patch); }, 100);
    this.t1 = setInterval(() => {
      const s = this.state;
      this.setState({ feed: (s.feed + 1) % 8, stage: s.auto ? (s.stage + 1) % 8 : s.stage });
    }, 4500);
    this.t2 = setInterval(() => {
      const s = this.state;
      this.setState({ sec: s.sec + 1, chk: (s.chk + 1) % 11, hold: s.hold > 0 ? s.hold - 1 : 1740 });
    }, 1000);
  }
  componentWillUnmount() { clearInterval(this.tv); clearInterval(this.tts); clearInterval(this.t1); clearInterval(this.t2); }
  renderVals() {
    const s = this.state;
    const mmss = (n) => String(Math.floor(n / 60)).padStart(2, '0') + ':' + String(n % 60).padStart(2, '0');
    const inr = (n) => '₹' + n.toLocaleString('en-IN');

    const leads = [
      { name: 'Priya Sharma', src: '99acres', proj: 'Skyline Residences', rule: 72, ai: 88, pri: 'HOT' },
      { name: 'Arjun Mehta', src: 'Meta ads', proj: 'Greenfield Enclave', rule: 64, ai: 71, pri: 'WARM' },
      { name: 'Neha Kulkarni', src: 'MagicBricks', proj: 'Skyline Residences', rule: 81, ai: 79, pri: 'HOT' },
      { name: 'Rohan Iyer', src: 'Google ads', proj: 'Riverside Towers', rule: 38, ai: 44, pri: 'COLD' },
      { name: 'Kavya Reddy', src: 'Housing', proj: 'Greenfield Enclave', rule: 58, ai: 76, pri: 'WARM' },
      { name: 'Vikram Singh', src: 'IndiaMART', proj: 'Riverside Towers', rule: 69, ai: 91, pri: 'HOT' },
      { name: 'Ananya Joshi', src: 'Microsite', proj: 'Skyline Residences', rule: 47, ai: 52, pri: 'WARM' },
      { name: 'Siddharth Rao', src: '99acres', proj: 'Greenfield Enclave', rule: 33, ai: 29, pri: 'COLD' }
    ];
    const toneOf = { HOT: 'p-hot', WARM: 'p-warn', COLD: 'p-mut' };
    const ago = ['just now', '2 min ago', '6 min ago', '11 min ago', '18 min ago'];
    const feedRows = [0, 1, 2, 3, 4].map((i) => {
      const l = leads[(s.feed + 8 - i) % 8];
      return { ...l, ini: l.name.split(' ').map((w) => w[0]).join(''), ago: ago[i], ruleW: l.rule + '%', aiW: l.ai + '%', tone: toneOf[l.pri], cls: i === 0 ? 'rowin' : '' };
    });

    const sideNav = ['Dashboard', 'Leads', 'Presales', 'Site visits', 'Inventory', 'Bookings', 'Collections', 'Partners', 'Reports'].map((label, i) => ({
      label, count: ['', '128', '42', '9', '', '3', '17', '', ''][i],
      color: i === 1 ? 'var(--ink)' : 'var(--mut)', bg: i === 1 ? 'var(--surf)' : 'transparent', weight: i === 1 ? 650 : 500,
      dot: i === 1 ? '#ff5f00' : 'var(--line)'
    }));
    const kpis = [
      { l: 'New today', v: String(128 + s.feed), d: '+14% vs last Tue', c: 'var(--ok)' },
      { l: 'HOT leads', v: '24', d: '6 uncalled · SLA 15 min', c: 'var(--acct)' },
      { l: 'Visits booked', v: '9', d: 'T-2h reminders queued', c: 'var(--blue)' },
      { l: 'First-call time', v: '4m 12s', d: 'Target 5m', c: 'var(--ok)' }
    ];
    const sources = [
      { alt: '99acres', src: 'assets/logos/99acres.png', h: '28px' },
      { alt: 'MagicBricks', src: 'assets/logos/magicbricks.png', h: '38px' },
      { alt: 'Housing.com', src: 'assets/logos/housing.png', h: '24px' },
      { alt: 'IndiaMART', src: 'assets/logos/indiamart.png', h: '42px' },
      { alt: 'Meta lead ads', src: 'assets/logos/meta.png', h: '26px' },
      { alt: 'Google lead ads', src: 'assets/logos/google.png', h: '30px' },
      { alt: 'WhatsApp', src: 'assets/logos/whatsapp.png', h: '36px' }
    ];

    const stages = [
      { label: 'Capture', title: 'Every portal lands in one inbox.', desc: 'Leads from listing portals and ad platforms arrive in seconds and are deduplicated at capture, so two portals never create two buyers.', points: ['99acres, MagicBricks, Housing, IndiaMART, Meta and Google lead ads', 'Dedupe on phone and email before the lead is saved', 'Auto-assignment by project, source and round-robin rules'],
        mockTitle: 'Capture stream', mockTag: 'Live', mockTone: 'p-ok', foot: 'Last 60 minutes', footR: '41 captured',
        rows: [['99acres', 'Skyline Residences · 3 BHK', '14', 'New', 'p-blue'], ['Meta lead ads', 'Greenfield Enclave form', '11', 'New', 'p-blue'], ['MagicBricks', 'Matched existing buyer', '1', 'Merged', 'p-warn'], ['Housing.com', 'Riverside Towers · 2 BHK', '9', 'New', 'p-blue'], ['IndiaMART', 'Commercial enquiry', '6', 'Assigned', 'p-ok']] },
      { label: 'Score', title: 'Two scores, side by side.', desc: 'Your own rules score every lead the way your best sales head would. An AI score reads the same lead independently. Priority lands as HOT, WARM or COLD.', points: ['Rule-based score you configure: budget, source, location, intent', 'AI score shown next to it, never replacing it', 'HOT / WARM / COLD priority drives the calling queue'],
        mockTitle: 'Priya Sharma · scoring', mockTag: 'HOT', mockTone: 'p-hot', foot: 'Rule 72 · AI 88', footR: 'Priority: HOT',
        rows: [['Budget matches inventory', '₹90L – ₹1.1Cr', '+25', 'Rule', 'p-mut'], ['Source quality', '99acres premium', '+15', 'Rule', 'p-mut'], ['Repeat project views', '4 visits in 48h', '+18', 'AI', 'p-hot'], ['Callback window', 'Evenings, weekdays', '+12', 'AI', 'p-hot'], ['Location fit', 'Within 6 km', '+14', 'Rule', 'p-mut']] },
      { label: 'Call', title: 'Presales that never leaves the browser.', desc: 'A browser softphone with click-to-call, consented recording and a live queue. Dispositions are one tap, and AI call analysis lands on the lead when the call ends.', points: ['Click-to-call from any lead, no desk phone', 'Recording only with consent, stored against the lead', 'AI call analysis and dispositions feed the score'],
        mockTitle: 'Live queue', mockTag: '6 waiting', mockTone: 'p-warn', foot: 'Agents online: 8', footR: 'Avg wait 0:42',
        rows: [['Priya Sharma', 'HOT · 99acres', '02:14', 'On call', 'p-ok'], ['Vikram Singh', 'HOT · IndiaMART', '—', 'Next', 'p-hot'], ['Neha Kulkarni', 'Disposition: site visit', '05:31', 'Done', 'p-blue'], ['Kavya Reddy', 'Disposition: call back', '03:02', 'Done', 'p-blue'], ['Rohan Iyer', 'Disposition: not interested', '01:10', 'Closed', 'p-mut']] },
      { label: 'Site visit', title: 'Visits that actually happen.', desc: 'Schedule a visit and DeedFlow reminds the buyer a day before and two hours before. The sales executive files structured feedback before leaving site.', points: ['T-1 day and T-2 hour reminders, automatically', 'Structured feedback: liked, objections, next step', 'Feedback updates score and the follow-up task'],
        mockTitle: 'Visit · Sat 11:00 AM', mockTag: 'Confirmed', mockTone: 'p-ok', foot: 'Skyline Residences site office', footR: 'Tower B',
        rows: [['Visit booked', 'By presales · Neha', 'Thu', 'Done', 'p-ok'], ['T-1 day reminder', 'WhatsApp + SMS', 'Fri 11:00', 'Sent', 'p-ok'], ['T-2 hour reminder', 'WhatsApp', 'Sat 09:00', 'Queued', 'p-blue'], ['Feedback form', 'Liked: layout, view', '—', 'Pending', 'p-warn'], ['Next step', 'Cost sheet for B-1204', '—', 'Auto task', 'p-mut']] },
      { label: 'Cost sheet', title: 'One price engine. Frozen once shared.', desc: 'Base rate, PLC, floor rise, facing premiums, offers and GST computed by the same engine every time. Once a cost sheet is issued, it freezes, so the buyer and accounts see the same number.', points: ['PLC, floor rise and facing premiums per project', 'Offers and approved deviations, applied in order', 'Frozen cost sheet with version history'],
        mockTitle: 'Cost sheet · B-1204', mockTag: 'Frozen v2', mockTone: 'p-blue', foot: 'Total incl. GST', footR: '₹98,00,000',
        rows: [['Base price', '1,450 sq ft × ₹6,000', '₹87,00,000', 'Base', 'p-mut'], ['Floor rise', 'Floor 12', '₹3,60,000', 'Rule', 'p-mut'], ['PLC · park facing', 'Premium location', '₹2,90,000', 'PLC', 'p-mut'], ['Festive offer', 'Approved by Sales head', '−₹1,15,000', 'Offer', 'p-hot'], ['GST', 'As applicable', '₹4,65,000', 'Tax', 'p-blue']] },
      { label: 'Booking', title: 'From EOI to registration, tracked.', desc: 'EOI, booking, agreement, registration and possession are real states with documents attached. Buyers get a proposal email with a tokenised public page to review it.', points: ['EOI › Booking › Agreement › Registered › Possession', 'Allotment letters generated from the booking', 'Buyer proposal email with a secure, tokenised page'],
        mockTitle: 'Booking BK-0981', mockTag: 'Agreement', mockTone: 'p-warn', foot: 'Buyer: Priya Sharma', footR: 'B-1204',
        rows: [['EOI', 'Token received', '12 Oct', 'Done', 'p-ok'], ['Booking', 'Allotment letter issued', '15 Oct', 'Done', 'p-ok'], ['Agreement for sale', 'Draft shared with buyer', '—', 'In progress', 'p-warn'], ['Registered', 'Sub-registrar slot', '—', 'Upcoming', 'p-mut'], ['Possession', 'As per RERA date', '—', 'Upcoming', 'p-mut']] },
      { label: 'Collections', title: 'Collections your CFO can sign off.', desc: 'Construction-linked payment plans raise demand letters on each milestone. Receipts move through clearing and reversal, and every rupee posts to a double-entry ledger.', points: ['CLP milestones with automatic demand letters', 'Receipts: received › clearing › cleared, or reversed', 'Razorpay online payments and overdue reminders'],
        mockTitle: 'CLP · B-1204', mockTag: '1 overdue', mockTone: 'p-bad', foot: 'Collected so far', footR: '₹29,40,000',
        rows: [['On booking', '10%', '₹9,80,000', 'Cleared', 'p-ok'], ['On agreement', '20%', '₹19,60,000', 'Cleared', 'p-ok'], ['Plinth', '15%', '₹14,70,000', 'Overdue', 'p-bad'], ['Slab 5', '10%', '₹9,80,000', 'Demand sent', 'p-warn'], ['Slab 10', '10%', '₹9,80,000', 'Scheduled', 'p-mut']] },
      { label: 'Possession', title: 'Hand over keys, not paperwork.', desc: 'Buyers follow their schedule, documents and construction updates in the customer portal, right up to possession. Your CRM team answers fewer "what is the status" calls.', points: ['Customer portal: bookings, schedule, documents', 'Construction updates pushed per tower', 'Possession recorded against the unit and booking'],
        mockTitle: 'Customer portal · Priya', mockTag: 'Tower B', mockTone: 'p-blue', foot: 'Next demand', footR: 'Slab 5',
        rows: [['Construction update', 'Slab 9 cast · photos', 'Oct', 'New', 'p-hot'], ['Payment schedule', '3 of 10 paid', '30%', 'On track', 'p-ok'], ['Allotment letter', 'PDF', '—', 'Available', 'p-blue'], ['Agreement for sale', 'Registered copy', '—', 'Available', 'p-blue'], ['Possession', 'Handover checklist', '—', 'Upcoming', 'p-mut']] }
    ];

    const proofStats = [{ v: '120+', l: 'Developers live' }, { v: '450+', l: 'Projects managed' }, { v: '₹2,400 Cr', l: 'Collections tracked' }, { v: '38', l: 'Cities' }];
    const bfDefs = [
      { l: 'Owners & directors', who: 'owners and directors', t: 'Every launch and every rupee on one screen.', d: 'See bookings, collections and overdue across projects without waiting for the month-end MIS.', pts: ['Bookings and collections across every project', 'Approval chains on every discount and deviation', 'A strict audit trail of who changed what'], href: 'features.html', cta: 'See the product', mock: 'Group overview', stats: [['Bookings MTD', '42'], ['Collected', '₹18.4 Cr'], ['Overdue', '₹2.1 Cr']], rows: [['Skyline Residences', '24 of 180 units booked this quarter', 'On track', 'p-ok'], ['Discount request · A-0803', '2% · waiting on you', 'Approve', 'p-warn'], ['Riverside Towers', 'Plinth demand overdue on 6 units', 'Overdue', 'p-bad']] },
      { l: 'Sales heads', who: 'sales heads', t: 'Faster first calls. Fewer leads that go cold.', d: 'Every portal lead is scored, queued and timed, and every site visit is reminded and followed up.', pts: ['HOT / WARM / COLD queue with SLA timers', 'T-1 day and T-2 hour site visit reminders', 'Leaderboards on calls, visits and bookings'], href: 'features.html', cta: 'See leads and presales', mock: 'Sales floor today', stats: [['First-call time', '4m 12s'], ['Visits this week', '38'], ['HOT uncalled', '6']], rows: [['Vikram Singh · HOT', 'SLA breach in 4 minutes', 'Call now', 'p-hot'], ['Saturday visits', '9 confirmed, 2 pending', 'Reminded', 'p-blue'], ['Neha K.', 'Top closer this month · 7 bookings', 'Leader', 'p-ok']] },
      { l: 'Finance & accounts', who: 'finance and accounts', t: 'Collections that reconcile themselves.', d: 'Demands, receipts and refunds post to a double-entry ledger with GST, TDS and escrow already applied.', pts: ['CLP demand letters raised on each milestone', 'Receipts cleared or reversed, never edited', 'GST, TDS 194-IA and RERA escrow split built in'], href: 'compliance.html', cta: 'See compliance', mock: 'Collections desk', stats: [['Demands raised', '124'], ['In clearing', '9'], ['Escrow routed', '₹12.9 Cr']], rows: [['RCP-04431 · ₹14,70,000', 'Cheque in clearing', 'Clearing', 'p-warn'], ['Slab 5 demands', '62 letters sent with GST', 'Sent', 'p-blue'], ['Receipt blocked · §13 cap', 'Agreement not registered', 'Blocked', 'p-bad']] },
      { l: 'Channel partner networks', who: 'channel partner networks', t: 'Scale your broker network without disputes.', d: 'Partners complete KYC, register leads with ownership, and see payouts with TDS in their own portal.', pts: ['KYC through SurePass and DigiLocker', 'Lead registration with ownership tracking', 'Commission slabs and payout runs with TDS'], href: 'partners.html', cta: 'See channel partners', mock: 'Partner network', stats: [['Active partners', '86'], ['Leads registered', '1,240'], ['Payout due', '₹14.2 L']], rows: [['Sai Realty', 'Slab 2 · 5 bookings this quarter', 'Eligible', 'p-ok'], ['Duplicate registration', 'Same buyer, two partners', 'Review', 'p-warn'], ['October payout run', 'TDS 194H deducted', 'Processing', 'p-blue']] }
    ];
    const B = bfDefs[s.bf];
    const bf = { ...B, whoUp: B.who.toUpperCase(), stats: B.stats.map((x) => ({ l: x[0], v: x[1] })), rows: B.rows.map((r, i) => ({ l: r[0], s: r[1], p: r[2], tone: r[3], delay: (i * 0.08) + 's' })) };
    const bfTabs = bfDefs.map((b, i) => ({ l: b.l, on: i === s.bf ? '1' : '0', pick: () => this.setState({ bf: i }) }));
    const testimonialDefs = [
      ['Rajesh Malhotra', 'Director, Malhotra Buildcon', 'Pune', 'RM', '#ffd3b8', 'Collections up 31%', 'We used to chase 10% advances on WhatsApp and spreadsheets. Now the demand goes out the day the slab is cast and the receipt posts with the RERA check already done. Our CA signed off Q2 in four days.'],
      ['Sneha Iyer', 'Head of Sales, Vistara Homes', 'Bengaluru', 'SI', '#c7f0dc', '0 duplicate leads', 'Three portals, two ad accounts, one inbox. Dedupe at capture alone stopped our presales team calling the same buyer twice — and the AI score tells them who to call first.'],
      ['Amit Deshpande', 'CFO, Deshpande Realty', 'Nagpur', 'AD', '#cfe0ff', 'Clean RERA audit', 'The escrow split and the 10% cap are enforced at entry, not caught at month-end. Our quarterly filings come straight out of the ledger. First audit with zero observations.'],
      ['Priyanka Reddy', 'CP Network Lead, Skyline Estates', 'Hyderabad', 'PR', '#ffe8a3', '210 partners onboarded', 'Channel partners register themselves, see their own pipeline and get payouts with TDS already deducted. The "who brought this buyer" arguments just stopped.'],
      ['Vikram Nair', 'Managing Partner, Nair & Sons Developers', 'Kochi', 'VN', '#e3d4ff', 'Site visits +42%', 'Reminders at T-1 day and T-2 hours sound small. They took our no-show rate from one in three to one in eight, and the feedback form is filled before the car leaves.'],
      ['Alisha Fernandes', 'Sales Director, Orchid Infra', 'Mumbai', 'AF', '#ffd9c2', 'Cost sheet in 2 min', 'Frozen cost sheets ended the "but the other exec quoted me less" calls. Discounts route up the chain, get approved on the phone, and the buyer gets one number.']
    ];
    const tsN = testimonialDefs.length;
    const testimonials = testimonialDefs.map((t, i) => ({ name: t[0], role: t[1], city: t[2], ini: t[3], c: t[4], result: t[5], quote: t[6], on: i === s.ts ? '1' : '0', d: String(((i - s.ts + tsN + 3) % tsN) - 3), far: Math.abs(((i - s.ts + tsN + 3) % tsN) - 3) >= 2 ? '1' : '0', lift: i === s.ts ? 'translateY(-4px)' : '' }));
    const tsDots = testimonialDefs.map((t, i) => ({ on: i === s.ts ? '1' : '0', pick: () => this.setState({ ts: i, tsHold: true }) }));
    const tsVis = 3, tsMax = tsN - tsVis;
    const tsOffset = 'calc(' + Math.min(s.ts, tsMax) * -1 + ' * (100% + 18px) / 3)';
    const stars = [1, 2, 3, 4, 5];
    const tsBlock = { testimonials, tsDots, tsOffset, stars, reviewCount: String(tsN),
      tsPrev: () => this.setState({ ts: (s.ts + tsN - 1) % tsN, tsHold: true }), tsNext: () => this.setState({ ts: (s.ts + 1) % tsN, tsHold: true }),
      tsPause: () => this.setState({ tsHold: true }), tsPlay: () => this.setState({ tsHold: false }) };
    const deco = (g) => { const o = Object.assign({}, g); o['a' + g.art] = true; return o; };
    const posts = [{"slug": "rera-section-13-advance-cap", "tag": "RERA", "mark": "10%", "cap": "advance cap, checked on every receipt", "bg": "#0a1628", "fg": "#ff8a3d", "art": 0, "t": "RERA Section 13: what the 10% advance cap means for your sales team", "d": "When the cap applies, what counts toward it, and how to stop a receipt before it crosses.", "meta": "6 min read", "date": "18 Nov 2026", "pn": "#14233a", "pn2": "#14233a", "tx": "#ffffff"}, {"slug": "tds-on-property-and-commission", "tag": "Tax", "mark": "TDS", "cap": "buyer and partner side, tracked", "bg": "#fff1e8", "fg": "#c24700", "art": 1, "t": "TDS on property sales and broker commission: a checklist for developers", "d": "Buyer-side and partner-side TDS, side by side, with what accounts needs to track.", "meta": "7 min read", "date": "18 Nov 2026", "pn": "#ffffff", "pn2": "#ffffff", "tx": "#0a1628"}, {"slug": "construction-linked-plans-without-spreadsheets", "tag": "Collections", "mark": "CLP", "cap": "milestones to demand letters", "bg": "#e8f0fd", "fg": "#1d5fd1", "art": 2, "t": "Running construction-linked plans without spreadsheets", "d": "Milestones, demand letters, receipts and the ledger, in the order they should happen.", "meta": "6 min read", "date": "18 Nov 2026", "pn": "#ffffff", "pn2": "#ffffff", "tx": "#0a1628"}, {"slug": "dedupe-portal-leads-at-capture", "tag": "Pre-sales", "mark": "3 → 1", "cap": "duplicates merged at capture", "bg": "#e6f5ee", "fg": "#0f7a4a", "art": 3, "t": "Portal leads: why dedupe at capture beats dedupe at month-end", "d": "How duplicate enquiries from 99acres, MagicBricks and Meta inflate your pipeline, and the fix.", "meta": "5 min read", "date": "18 Nov 2026", "pn": "#ffffff", "pn2": "#ffffff", "tx": "#0a1628"}, {"slug": "channel-partner-commissions", "tag": "Partners", "mark": "CP", "cap": "slab-based partner payouts", "bg": "#fff5dc", "fg": "#9a5800", "art": 4, "t": "Channel partner commissions: slabs, attribution and TDS-net payouts", "d": "A clean model for who brought the buyer, what they earn, and when they get paid.", "meta": "6 min read", "date": "18 Nov 2026", "pn": "#ffffff", "pn2": "#ffffff", "tx": "#0a1628"}, {"slug": "holds-cost-sheets-price-freezes", "tag": "Inventory", "mark": "Live", "cap": "unit availability, by tower", "bg": "#0a1628", "fg": "#86b0ff", "art": 5, "t": "Holds, cost sheets and price freezes: ending the \"quoted less\" call", "d": "Timed holds, one pricing engine and frozen cost sheets, and why all three matter together.", "meta": "5 min read", "date": "18 Nov 2026", "pn": "#14233a", "pn2": "#14233a", "tx": "#ffffff"}].slice(0, 6).map(deco);
    const curRaw = stages[s.stage];
    const cur = { ...curRaw, num: String(s.stage + 1).padStart(2, '0'), labelUp: curRaw.label.toUpperCase(),
      rows: curRaw.rows.map((r, i) => ({ l: r[0], s: r[1], v: r[2], p: r[3], tone: r[4], delay: (i * 0.07) + 's' })) };
    const stagesUI = stages.map((st, i) => ({ label: st.label, num: String(i + 1), on: i === s.stage ? '1' : '0', done: i < s.stage ? '1' : '0', pick: () => this.setState({ stage: i, auto: false }) }));

    const checkDefs = [
      ['Booking cap · RERA §13', 'Advance within 10% before agreement', '₹9,80,000 / ₹9,80,000'],
      ['RERA escrow split', '70% routed to designated account', '₹6,86,000'],
      ['GST & e-invoice', 'Invoice generated with IRN', 'IRN ✓'],
      ['TDS 194-IA', 'Buyer deducts 1% on ₹50L+ property', '₹9,800'],
      ['PMLA', 'KYC verified, payment mode checked', 'Clear'],
      ['DPDP consent', 'Purpose-bound consent on file', 'On file'],
      ['Ledger & audit trail', 'Dr Bank · Cr Customer · entry sealed', '#A-20931']
    ];
    const checks = checkDefs.map((c, i) => {
      const done = i < s.chk - 1, running = i === s.chk - 1;
      return { t: c[0], s: c[1], v: c[2], done, running, op: (done || running) ? 1 : 0.4, bg: done ? 'rgba(69,214,154,0.14)' : running ? 'rgba(255,95,0,0.14)' : 'var(--surf2)' };
    });
    const allDone = s.chk - 1 >= checkDefs.length;
    const compChips = [
      { t: 'RERA §13 cap', d: 'Blocks receipts above 10% before agreement', v: 'No penalty notices, no refunds under pressure' },
      { t: 'RERA escrow & filings', d: 'Escrow split and quarterly filings', v: 'Filings ready without a month-end scramble' },
      { t: 'GST & e-invoicing', d: 'Tax on every demand, IRN on invoices', v: 'Zero manual invoices, zero mismatch notices' },
      { t: 'TDS 194-IA & 194H', d: 'On property sale and partner commission', v: 'Buyers and CPs get the right certificates, on time' },
      { t: 'Audit trail', d: 'Every change, who made it, and when', v: 'Auditors sign off in days, not weeks' },
      { t: 'DPDP', d: 'Consent, purpose and retention', v: 'Buyer data handled the way the law now expects' }
    ];

    const portals = [
      { name: 'Platform Admin', who: 'DeedFlow operations', title: 'Run every tenant from one console.', desc: 'Provision developers, manage plans and limits, and keep each company\'s data in its own tenant.', points: ['Tenant provisioning and plan limits', 'Usage across users, projects and leads', 'Platform-wide audit and health'], app: 'Platform Admin', user: 'ops@deedflow', ini: 'PA', chip: '#86b0ff',
        stats: [['Tenants', '42'], ['Active users', '1,180'], ['Plan upgrades', '6']], rows: [['Skyline Group', 'Professional · 31 / 50 users', 'Active', 'p-ok'], ['Greenfield Builders', 'Growth · trial converted', 'New', 'p-blue'], ['Riverside Developers', 'Lead limit at 92%', 'Notice', 'p-warn'], ['Harbour Estates', 'Enterprise · 4 projects', 'Active', 'p-ok']] },
      { name: 'Internal CRM', who: 'sales, presales and accounts', title: 'One workspace for the whole sales floor.', desc: 'Presales calls, sales closes and accounts collects, all on the same lead, booking and ledger. Role permissions keep each team in its lane.', points: ['Leads, calls, visits, cost sheets and bookings', 'Demands, receipts and ledger for accounts', 'Approvals, SLA and scheduled reports for managers'], app: 'DeedFlow CRM', user: 'Neha · Sales', ini: 'DF', chip: '#ff5f00',
        stats: [['My HOT leads', '11'], ['Visits today', '3'], ['Bookings MTD', '7']], rows: [['Call Vikram Singh', 'HOT · SLA in 6 min', 'Due', 'p-hot'], ['Site visit · Priya Sharma', 'Sat 11:00 · Tower B', 'Confirmed', 'p-ok'], ['Discount approval · A-0803', 'Waiting on Sales head', 'Pending', 'p-warn'], ['Cost sheet · B-1204', 'Frozen v2 shared', 'Sent', 'p-blue']] },
      { name: 'Channel Partner', who: 'brokers and their agents', title: 'Partners register leads, track payouts.', desc: 'Partners complete KYC, register leads, and see commission and payouts with TDS already worked out. Their agents work inside the same partner account.', points: ['KYC via SurePass and DigiLocker', 'Lead registration with ownership tracking', 'Commission slabs, payout runs with TDS'], app: 'Partner Portal', user: 'Sai Realty', ini: 'CP', chip: '#45d69a',
        stats: [['Registered leads', '64'], ['Bookings', '5'], ['Payout due', '₹3.1L']], rows: [['Lead registered · Arjun Mehta', 'Greenfield Enclave', 'Accepted', 'p-ok'], ['Booking BK-0977', 'Slab 2 · 2.0% commission', 'Eligible', 'p-blue'], ['Payout run · October', 'TDS 194H deducted', 'Processing', 'p-warn'], ['KYC', 'PAN + Aadhaar verified', 'Verified', 'p-ok']] },
      { name: 'Customer', who: 'home buyers', title: 'Buyers stop calling to ask for status.', desc: 'Buyers see their booking, payment schedule, documents and construction updates in one place, and pay online when a demand is raised.', points: ['Bookings and payment schedule', 'Documents: allotment, agreement, receipts', 'Construction updates per tower'], app: 'My Home', user: 'Priya Sharma', ini: 'MH', chip: '#f5b54a',
        stats: [['Paid', '30%'], ['Next due', 'Slab 5'], ['Documents', '6']], rows: [['Demand · Slab 5', '₹9,80,000 · due in 12 days', 'Pay now', 'p-hot'], ['Receipt · On agreement', '₹19,60,000', 'Cleared', 'p-ok'], ['Construction · Tower B', 'Slab 9 cast', 'New', 'p-blue'], ['Agreement for sale', 'Registered copy', 'PDF', 'p-mut']] }
    ];
    const pr = portals[s.portal];
    const portal = { ...pr, whoUp: pr.who.toUpperCase(), stats: pr.stats.map((x) => ({ l: x[0], v: x[1] })), rows: pr.rows.map((r, i) => ({ l: r[0], s: r[1], p: r[2], tone: r[3], delay: (i * 0.08) + 's' })) };
    const portalTabs = portals.map((p, i) => ({ name: p.name, on: i === s.portal ? '1' : '0', pick: () => this.setState({ portal: i }) }));

    const planDefs = [
      { n: 'Growth', tag: 'For a developer with a few live projects', m: 4999, a: 49990, u: '20', pr: '10', l: '10,000' },
      { n: 'Professional', tag: 'For multi-project sales teams', m: 9999, a: 99990, u: '50', pr: '25', l: '50,000', pop: true },
      { n: 'Enterprise', tag: 'For groups running large launches', m: 24999, a: 249990, u: '200', pr: '100', l: '2,00,000' }
    ];
    const plans = planDefs.map((p) => ({ ...p, pop: !!p.pop, price: inr(s.annual ? p.a : p.m), per: s.annual ? '/ year' : '/ month', btn: p.pop ? 'bp' : 'bs', border: p.pop ? '#ff5f00' : 'var(--line)' }));

    const faqDefs = [
      ['Which lead sources connect out of the box?', '99acres, MagicBricks, Housing, IndiaMART, and Meta and Google lead ads. Leads from project microsites and public listings come in the same way. Every lead is deduplicated at capture.'],
      ['How does the RERA §13 booking cap work?', 'When a receipt is entered before the agreement for sale is registered, DeedFlow checks it against 10% of the unit cost and stops anything that would cross it, so the team knows an agreement is needed first.'],
      ['Can our channel partners and buyers log in?', 'Yes. Channel partners get their own portal for KYC, lead registration and payouts, with their agents inside the same account. Buyers get a customer portal for bookings, schedule, documents and construction updates.'],
      ['Do we have to give up our pricing rules?', 'No. The pricing engine takes your PLC, floor rise, facing premiums, offers and GST, and approval chains handle any deviation. Once issued, a cost sheet is frozen.'],
      ['What is included in the free trial?', 'A 14-day trial with 3 users so your team can explore the CRM before choosing a plan.']
    ];
    const faqs = faqDefs.map((f, i) => ({ q: f[0], a: f[1], open: s.faq === i, on: s.faq === i ? '1' : '0', exp: s.faq === i ? 'true' : 'false', toggle: () => this.setState({ faq: s.faq === i ? -1 : i }) }));

    const approval = [
      { r: 'Sales executive', s: 'Requested 2%', tone: 'p-blue', arrow: '→' },
      { r: 'Sales head', s: 'Approved', tone: 'p-ok', arrow: '→' },
      { r: 'Director', s: s.sec % 6 < 3 ? 'Reviewing' : 'Approved', tone: s.sec % 6 < 3 ? 'p-warn' : 'p-ok', arrow: '→' },
      { r: 'Cost sheet', s: s.sec % 6 < 3 ? 'Waiting' : 'Frozen v3', tone: s.sec % 6 < 3 ? 'p-mut' : 'p-blue', arrow: '' }
    ];
    const bump = s.feed % 3;
    const board = [
      { rank: '1', n: 'Neha K.', v: String(42 + bump), w: (84 + bump) + '%', c: '#ff5f00' },
      { rank: '2', n: 'Rahul D.', v: String(37 + (bump === 1 ? 2 : 0)), w: (74 + (bump === 1 ? 4 : 0)) + '%', c: 'color-mix(in oklab, #ff5f00 60%, var(--surf))' },
      { rank: '3', n: 'Aisha M.', v: '31', w: '62%', c: 'color-mix(in oklab, #ff5f00 35%, var(--surf))' }
    ];

    const pillars = [
      { t: 'Pre-sales', d: 'Portal leads, dedupe, calling, site visits, AI scoring', href: 'features.html' },
      { t: 'Post-sales', d: 'Bookings, agreements, demands, receipts, CP payouts', href: 'features.html' },
      { t: 'Inventory management', d: 'Project › tower › floor › unit, holds, live pricing', href: 'features.html' }
    ];
    const pillarCards = [
      { k: '01 · PRE-SALES', short: 'pre-sales', t: 'Every enquiry answered and scored.', d: 'Leads from 99acres, MagicBricks, Housing, Meta and Google land in one inbox, deduplicated at capture.', icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z', pts: ['Lead capture from portals, ads and walk-ins', 'Browser calling with recordings and dispositions', 'Site-visit scheduling with T-1 day reminders', 'Rule score + AI score on every lead'], href: 'features.html' },
      { k: '02 · POST-SALES', short: 'post-sales', t: 'EOI to possession, every rupee accounted.', d: 'Bookings, agreements, demand letters, receipts and collections — with RERA, GST and TDS applied at entry.', icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11', pts: ['Booking → agreement → registration states', 'CLP demands and receipts with ledger posting', 'RERA 10% cap and escrow split enforced', 'Channel partner slabs and TDS-net payouts'], href: 'compliance.html' },
      { k: '03 · INVENTORY', short: 'inventory', t: 'Live availability, tower by tower.', d: 'One source of truth for every unit across every project, so sales, channel partners and buyers all see the same availability board.', icon: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01', pts: ['Project › tower › floor › unit hierarchy', 'Holds that expire on their own', 'Pricing engine with frozen cost sheets', 'Public listings and project microsites'], href: 'features.html' }
    ];
    const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    const validPhone = (v) => v.replace(/\D/g, '').length >= 10;
    const f1 = s.f1, f2 = s.f2;
    const e1 = { name: s.f1Tried && !f1.name.trim() ? '1' : '0', phone: s.f1Tried && !validPhone(f1.phone) ? '1' : '0', email: s.f1Tried && !validEmail(f1.email) ? '1' : '0', company: '0' };
    const e2 = { name: s.f2Tried && !f2.name.trim() ? '1' : '0', phone: s.f2Tried && !validPhone(f2.phone) ? '1' : '0', email: s.f2Tried && !validEmail(f2.email) ? '1' : '0' };
    const f1Valid = f1.name.trim() && validPhone(f1.phone) && validEmail(f1.email);
    const f2Valid = f2.name.trim() && validPhone(f2.phone) && validEmail(f2.email);
    const setF1 = (k) => (e) => this.setState({ f1: { ...s.f1, [k]: e.target.value } });
    const setF2 = (k) => (e) => this.setState({ f2: { ...s.f2, [k]: e.target.value } });
    const projOpts = ['1', '2–5', '6–15', '15+'].map((l, i) => ({ l, on: f1.proj === i ? '1' : '0', pick: () => this.setState({ f1: { ...s.f1, proj: i } }) }));
    const intOpts = ['Full demo', 'Pre-sales', 'Post-sales', 'Inventory', 'Pricing'].map((l, i) => ({ l, on: f2.interest === i ? '1' : '0', pick: () => this.setState({ f2: { ...s.f2, interest: i } }) }));
    const approval2 = approval.map((a, i) => ({ ...a, ini: a.r.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(), c: ['#ffd3b8', '#ffe8a3', '#c7f0dc', '#cfe0ff'][i % 4], more: i < approval.length - 1 }));
    const floorFeatures = [
      { t: 'Approval chains for discounts', d: 'A sales executive can offer, but cannot give away. Deviations route up the chain you define and freeze into the cost sheet once approved.', icon: 'M4 12h6l2-3 2 6 2-3h4', tags: ['Multi-level', 'Frozen cost sheet'] },
      { t: 'Holds that expire on their own', d: 'Block a unit for a buyer for a set time. If the booking does not land, the unit goes back on sale automatically.', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2', tags: ['Timed holds', 'Auto release'] },
      { t: 'Leaderboards that move', d: 'Gamification on calls, visits and bookings, with SLA timers on every untouched lead so nothing sits idle.', icon: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3', tags: ['SLA timers', 'Team targets'] },
      { t: 'Cancellations without arguments', d: 'Refunds are computed from MahaRERA forfeiture tiers and reversed through the ledger, line by line, with the working shown.', icon: 'M3 10h18M7 15h4M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z', tags: ['Forfeiture tiers', 'Ledger reversal'] },
      { t: 'WhatsApp, telephony, reports', d: 'Message buyers where they already are, call from the browser with recordings, and have reports land in inboxes on schedule.', icon: 'M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z', tags: ['WhatsApp API', 'Click-to-call', 'Scheduled reports'] },
      { t: 'Listings and project microsites', d: 'Publish public property listings and a microsite per project, with enquiry forms wired straight into lead capture.', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18', tags: ['Microsites', 'Lead capture'] }
    ];
    const forms = {
      pillars, approval2, floorFeatures, pillarCards, projOpts, intOpts, f1, f2, e1, e2,
      f1Pending: !s.f1Done, f1Done: s.f1Done, f1Err: s.f1Tried && !f1Valid,
      f2Pending: !s.f2Done, f2Done: s.f2Done, f2Err: s.f2Tried && !f2Valid,
      h1Name: setF1('name'), h1Phone: setF1('phone'), h1Email: setF1('email'), h1Company: setF1('company'),
      h2Name: setF2('name'), h2Phone: setF2('phone'), h2Email: setF2('email'),
      h1Submit: () => { if (!f1Valid) { this.setState({ f1Tried: true }); return; } this.setState({ f1Done: true, f1Tried: false }); },
      h2Submit: () => { if (!f2Valid) { this.setState({ f2Tried: true }); return; } this.setState({ f2Done: true, f2Tried: false }); },
      h1Reset: () => this.setState({ f1Done: false, f1: { name: '', phone: '', email: '', company: '', proj: 1 } }),
      h2Reset: () => this.setState({ f2Done: false, f2: { name: '', phone: '', email: '', interest: 0 } })
    };

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
      ...forms, ...tsBlock, ...walk,
      menuOpen: s.menuOpen, menuClosed: !s.menuOpen, navOpen: s.menuOpen ? '1' : '0', menuExp: s.menuOpen ? 'true' : 'false', toggleMenu: () => this.setState({ menuOpen: !s.menuOpen }),
      heroEmail: s.heroEmail, onHeroEmail: (e) => this.setState({ heroEmail: e.target.value }),
      loginOpen: s.loginOpen, loginExp: s.loginOpen ? 'true' : 'false', loginRot: s.loginOpen ? '180deg' : '0deg',
      toggleLogin: () => { if (Date.now() - (this._lh || 0) < 500) return; this.setState({ loginOpen: !s.loginOpen }); },
      loginIn: () => { clearTimeout(this._lt); if (!this.state.loginOpen) { this._lh = Date.now(); this.setState({ loginOpen: true }); } },
      loginOut: () => { clearTimeout(this._lt); this._lt = setTimeout(() => this.setState({ loginOpen: false }), 180); },
      sideNav, kpis, feedRows, callTime: mmss(s.sec),
      sourcesLoop: sources.concat(sources, sources, sources, sources, sources),
      stagesUI, cur, progW: (s.stage / 7 * 100) + '%',
      autoLabel: s.auto ? 'Auto-playing · click a stage to take over' : 'Manual · ' + (s.stage + 1) + ' of 8',
      prevStage: () => this.setState({ stage: (s.stage + 7) % 8, auto: false }),
      nextStage: () => this.setState({ stage: (s.stage + 1) % 8, auto: false }),
      checks, compChips, chkLabel: allDone ? 'Posted' : 'Checking…', chkTone: allDone ? 'p-ok' : 'p-warn',
      portalTabs, portal,
      monthOn: s.annual ? '0' : '1', yearOn: s.annual ? '1' : '0',
      setMonthly: () => this.setState({ annual: false }), setAnnual: () => this.setState({ annual: true }),
      plans, faqs, approval, board,
      proofStats, bf, bfTabs, testimonials, posts,
      holdLeft: mmss(s.hold), holdOffset: String(119.4 * (1 - s.hold / 1800))
    };
  }
}

DC.mount(Component, 'tpl', 'app');
