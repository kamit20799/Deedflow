/* DeedFlow — home page logic (data + interactions) */
class Component extends DCLogic {
  state = { loginOpen: false, bf: 0, heroEmail: '', stage: 0, auto: true, feed: 0, sec: 134, chk: 8, portal: 1, annual: false, faq: 0, hold: 1740 };
  componentDidMount() {
    this.t1 = setInterval(() => {
      const s = this.state;
      this.setState({ feed: (s.feed + 1) % 8, stage: s.auto ? (s.stage + 1) % 8 : s.stage });
    }, 4500);
    this.t2 = setInterval(() => {
      const s = this.state;
      this.setState({ sec: s.sec + 1, chk: (s.chk + 1) % 11, hold: s.hold > 0 ? s.hold - 1 : 1740 });
    }, 1000);
  }
  componentWillUnmount() { clearInterval(this.t1); clearInterval(this.t2); clearTimeout(this._loginCloseT); }
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

    const proofStats = [{ v: '120+', l: 'Developers live on DeedFlow' }, { v: '450+', l: 'Projects managed' }, { v: '₹2,400 Cr', l: 'Collections tracked' }, { v: '38', l: 'Cities' }];
    const bfDefs = [
      { l: 'Owners & directors', who: 'owners and directors', t: 'Every launch and every rupee on one screen.', d: 'See bookings, collections and overdue across projects without waiting for the month-end MIS.', pts: ['Bookings and collections across every project', 'Approval chains on every discount and deviation', 'A strict audit trail of who changed what'], href: 'features.html', cta: 'See the product', mock: 'Group overview', stats: [['Bookings MTD', '42'], ['Collected', '₹18.4 Cr'], ['Overdue', '₹2.1 Cr']], rows: [['Skyline Residences', '24 of 180 units booked this quarter', 'On track', 'p-ok'], ['Discount request · A-0803', '2% · waiting on you', 'Approve', 'p-warn'], ['Riverside Towers', 'Plinth demand overdue on 6 units', 'Overdue', 'p-bad']] },
      { l: 'Sales heads', who: 'sales heads', t: 'Faster first calls. Fewer leads that go cold.', d: 'Every portal lead is scored, queued and timed, and every site visit is reminded and followed up.', pts: ['HOT / WARM / COLD queue with SLA timers', 'T-1 day and T-2 hour site visit reminders', 'Leaderboards on calls, visits and bookings'], href: 'features.html', cta: 'See leads and presales', mock: 'Sales floor today', stats: [['First-call time', '4m 12s'], ['Visits this week', '38'], ['HOT uncalled', '6']], rows: [['Vikram Singh · HOT', 'SLA breach in 4 minutes', 'Call now', 'p-hot'], ['Saturday visits', '9 confirmed, 2 pending', 'Reminded', 'p-blue'], ['Neha K.', 'Top closer this month · 7 bookings', 'Leader', 'p-ok']] },
      { l: 'Finance & accounts', who: 'finance and accounts', t: 'Collections that reconcile themselves.', d: 'Demands, receipts and refunds post to a double-entry ledger with GST, TDS and escrow already applied.', pts: ['CLP demand letters raised on each milestone', 'Receipts cleared or reversed, never edited', 'GST, TDS 194-IA and RERA escrow split built in'], href: 'compliance.html', cta: 'See compliance', mock: 'Collections desk', stats: [['Demands raised', '124'], ['In clearing', '9'], ['Escrow routed', '₹12.9 Cr']], rows: [['RCP-04431 · ₹14,70,000', 'Cheque in clearing', 'Clearing', 'p-warn'], ['Slab 5 demands', '62 letters sent with GST', 'Sent', 'p-blue'], ['Receipt blocked · §13 cap', 'Agreement not registered', 'Blocked', 'p-bad']] },
      { l: 'Channel partner networks', who: 'channel partner networks', t: 'Scale your broker network without disputes.', d: 'Partners complete KYC, register leads with ownership, and see payouts with TDS in their own portal.', pts: ['KYC through SurePass and DigiLocker', 'Lead registration with ownership tracking', 'Commission slabs and payout runs with TDS'], href: 'partners.html', cta: 'See channel partners', mock: 'Partner network', stats: [['Active partners', '86'], ['Leads registered', '1,240'], ['Payout due', '₹14.2 L']], rows: [['Sai Realty', 'Slab 2 · 5 bookings this quarter', 'Eligible', 'p-ok'], ['Duplicate registration', 'Same buyer, two partners', 'Review', 'p-warn'], ['October payout run', 'TDS 194H deducted', 'Processing', 'p-blue']] }
    ];
    const B = bfDefs[s.bf];
    const bf = { ...B, whoUp: B.who.toUpperCase(), stats: B.stats.map((x) => ({ l: x[0], v: x[1] })), rows: B.rows.map((r, i) => ({ l: r[0], s: r[1], p: r[2], tone: r[3], delay: (i * 0.08) + 's' })) };
    const bfTabs = bfDefs.map((b, i) => ({ l: b.l, on: i === s.bf ? '1' : '0', pick: () => this.setState({ bf: i }) }));
    const testimonials = [
      { quote: 'DeedFlow cut our average collection cycle from 45 days to under 12 — the automated reminders and real-time dashboards changed how our finance team works.', name: 'Marcus Chen', role: 'COO, Horizon Living Developments', ini: 'MC' },
      { quote: "We used to lose nearly a third of our leads to slow follow-up. With DeedFlow's lead routing and call tracking, our conversion rate doubled in two quarters.", name: 'Amara Okafor', role: 'Head of Sales, Prestige Horizon Group', ini: 'AO' },
      { quote: "Our last RERA audit took half the time it used to, with zero discrepancies flagged. DeedFlow's compliance checks caught issues months before the regulator would have.", name: 'Rafael Santos', role: 'Director of Compliance, Meridian Realty Partners', ini: 'RS' }
    ];
    const posts = [
      { tag: 'RERA', mark: '§13', bg: '#0a1628', fg: '#ff8a3d', t: 'RERA Section 13: what the 10% advance cap means for your sales team', d: 'When the cap applies, what counts toward it, and how to stop a receipt before it crosses.', meta: '[Publish date] · [0] min read' },
      { tag: 'Tax', mark: 'TDS', bg: '#fff1e8', fg: '#c24700', t: 'TDS under 194-IA and 194H: a checklist for developers', d: 'Buyer-side and partner-side TDS, side by side, with what accounts needs to track.', meta: '[Publish date] · [0] min read' },
      { tag: 'Collections', mark: 'CLP', bg: '#e8f0fd', fg: '#1d5fd1', t: 'Running construction-linked plans without spreadsheets', d: 'Milestones, demand letters, receipts and the ledger, in the order they should happen.', meta: '[Publish date] · [0] min read' }
    ];
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
      { t: 'RERA §13 cap', d: 'Blocks receipts above 10% before agreement' },
      { t: 'RERA escrow & filings', d: 'Escrow split and project filings' },
      { t: 'GST & e-invoicing', d: 'Tax on every demand, IRN on invoices' },
      { t: 'TDS 194-IA & 194H', d: 'On property sale and partner commission' },
      { t: 'PMLA', d: 'KYC and payment-mode checks' },
      { t: 'DPDP', d: 'Consent, purpose and retention' }
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

    return {
      heroEmail: s.heroEmail, onHeroEmail: (e) => this.setState({ heroEmail: e.target.value }),
      loginOpen: s.loginOpen, loginExp: s.loginOpen ? 'true' : 'false', loginRot: s.loginOpen ? '180deg' : '0deg',
      toggleLogin: () => this.setState({ loginOpen: !s.loginOpen }),
      openLogin: () => { clearTimeout(this._loginCloseT); this.setState({ loginOpen: true }); },
      closeLogin: () => { clearTimeout(this._loginCloseT); this._loginCloseT = setTimeout(() => this.setState({ loginOpen: false }), 200); },
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
