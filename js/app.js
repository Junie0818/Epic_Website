/**
 * ============================================================================
 * EPIC MOVEMENT AT SJSU (A CRU MINISTRY) — APPLICATION CONTROLLER
 * ============================================================================
 * Handles:
 * 1. Multi-Tab SPA Navigation & URL Hash Routing (Welcome, About, Community, Events, Past Events, Connect)
 * 2. Community Group & Weekly Gathering Category Filtering
 * 3. Interactive Event Calendar:
 *    - Actual Calendar App Grid View (Monthly 7-day grid with events under specific days + Day Inspector)
 *    - Schedule List View
 *    - Event Type Filters (Big Group, Community Group, Social & Food, Fall Retreat)
 * 4. Past Events Archive Page (#past-events) with all real @epic_sjsu events & original flyers
 * 5. Connect Form Mode Switcher (Interactive Prototype Bio Form + Live Embedded Google Form)
 * 6. Leader Portal Authentication (Nathan Wong, Jonathan Aye, Jerry Wong) & Flyer Creator Studio
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabNavigation();
  initCommunityFilters();
  initEventCalendarAndPastEvents();
  initConnectForm();
  initAuthAndFlyerStudio();
});

/* ==========================================================================
   REAL @epic_sjsu EVENTS DATASET (BIG GROUPS, COMMUNITY GROUPS, SOCIALS, RETREAT)
   ========================================================================== */
const EPIC_EVENTS = [
  // --- APRIL 2023 ARCHIVE EVENT (FROM @epic_sjsu IG FEED) ---
  {
    id: 'evt-2023-04-04-good-shepherd',
    title: 'Epic Weekly Meeting: "I Am the Good Shepherd"',
    category: 'big-group',
    badgeLabel: 'Big Group • Weekly Meeting',
    dateStr: '2023-04-04',
    displayDate: 'Tue, Apr 4, 2023',
    monthAbbr: 'Apr',
    dayNum: '04',
    time: '7:00 PM – 8:30 PM',
    location: 'SJSU Student Union Meeting Room 1B',
    leaders: 'Speaker: Pastor Matt Chiu',
    description: 'Join us at our weekly meeting to hear from Pastor Matt Chiu speak on how Jesus is our Good Shepherd! Come for the fellowship and learning how to trust in a God who unconditionally cares for us.',
    flyerImg: 'assets/ig/post_Cqlxrx9JoV_.jpg',
    formUrl: 'https://www.instagram.com/p/Cqlxrx9JoV_/',
    formLabel: 'View Original Instagram Post',
    isPast: true
  },

  // --- SEPTEMBER 2026 REAL EVENTS ---
  {
    id: 'evt-2026-09-21-mon-cg',
    title: 'Monday Community Group Launch (Book of Philippians)',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-09-21',
    displayDate: 'Mon, Sept 21, 2026',
    monthAbbr: 'Sep',
    dayNum: '21',
    time: '3:30 PM – 4:45 PM',
    location: 'SJSU Student Union Tables above Jamba Juice (between Jamba Juice & Info Center)',
    leaders: 'Jonathan Aye & Jerry Wong',
    description: 'First Monday Community Group of the semester! Open to guys and girls of all ages. Build friendships, share life together, and study the Book of Philippians.',
    flyerImg: 'assets/ig/post_DdiSLJ5hwnz.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-09-22-in-n-out',
    title: 'Weekly Wednesday Large Group + Free In-N-Out!',
    category: 'big-group',
    badgeLabel: 'Big Group • BUILD Series',
    dateStr: '2026-09-22',
    displayDate: 'Tue/Wed, Sept 22–23, 2026',
    monthAbbr: 'Sep',
    dayNum: '22',
    time: '5:00 PM – 6:30 PM',
    location: 'Dudley Moorhead Hall (DMH 231)',
    leaders: 'Jerry Wong, Nathan Wong & Jonathan Aye',
    description: '"Come and see" (John 1:45–46)! Join us for our first Weekly Large Group of the semester in DMH 231 from 5:00–6:30 PM with free In-N-Out burgers for everyone who registers.',
    flyerImg: 'assets/ig/post_DdmMBoQBvSv.jpg',
    formUrl: 'https://forms.gle/bUJn9vnoKUdm7x7b8',
    formLabel: 'Meal & Attendance Form',
    isPast: true
  },
  {
    id: 'evt-2026-09-23-build-1',
    title: 'Wednesday Large Group: BUILD Series Kickoff',
    category: 'big-group',
    badgeLabel: 'Big Group • BUILD',
    dateStr: '2026-09-23',
    displayDate: 'Wed, Sept 23, 2026',
    monthAbbr: 'Sep',
    dayNum: '23',
    time: '5:00 PM – 6:30 PM',
    location: 'Dudley Moorhead Hall (DMH 231)',
    leaders: 'Jerry Wong, Nathan Wong & Jonathan Aye',
    description: 'SJSU Epic BUILD Series Large Group in DMH 231. Worship, gospel message, table discussions, and campus dinner.',
    flyerImg: 'assets/ig/post_Ddn7ICbhVpf.jpg',
    formUrl: 'https://forms.gle/bUJn9vnoKUdm7x7b8',
    formLabel: 'Large Group Form',
    isPast: true
  },
  {
    id: 'evt-2026-09-24-thu-cg',
    title: 'Thursday Community Group Launch (Book of Philippians)',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-09-24',
    displayDate: 'Thu, Sept 24, 2026',
    monthAbbr: 'Sep',
    dayNum: '24',
    time: '2:30 PM – 3:45 PM',
    location: 'SJSU Student Union Tables above Jamba Juice (between Jamba Juice & Info Center)',
    leaders: 'Nathan Wong & Kadin',
    description: 'First Thursday Community Group of the semester! Covers the exact same Philippians Bible study content as Monday—pick the day that fits your schedule.',
    flyerImg: 'assets/ig/post_DdiSLJ5hwnz.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-09-28-mon-cg',
    title: 'Monday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-09-28',
    displayDate: 'Mon, Sept 28, 2026',
    monthAbbr: 'Sep',
    dayNum: '28',
    time: '3:30 PM – 4:30 PM',
    location: 'SJSU Student Union Tables between Jamba Juice & Info Center',
    leaders: 'Jonathan Aye & Jerry Wong',
    description: 'Weekly Monday Community Group studying Philippians together in the Student Union.',
    flyerImg: 'assets/ig/post_Dd5IPJXB-gq.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-09-30-living-sacrifice',
    title: 'Wednesday Large Group: "Be a Living Sacrifice" (Ministry Fair & Free Tacos!)',
    category: 'big-group',
    badgeLabel: 'Big Group • Ministry Fair & Tacos',
    dateStr: '2026-09-30',
    displayDate: 'Wed, Sept 30, 2026',
    monthAbbr: 'Sep',
    dayNum: '30',
    time: '5:00 PM – 6:30 PM',
    location: 'Dudley Moorhead Hall (DMH 231)',
    leaders: 'Speaker: Jerry Wong • Contacts: Nathan Wong & Jonathan Aye',
    description: '"Be a Living Sacrifice" (Romans 12:1–2) + Epic Ministry Fair and Free Tacos in DMH 231! Followed by an after-meeting social (Volleyball or Pizza My Heart) from 6:30–7:30 PM.',
    flyerImg: 'assets/ig/post_Dd5IPJXB-gq.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSexaaO95w2q-M5-yI4xI7mF7W26tT5s-gE79V_G1sI2K01g1g/viewform',
    formLabel: 'Tacos & Ministry Fair Form',
    isPast: true
  },
  {
    id: 'evt-2026-09-30-pizza-volleyball',
    title: 'After-Meeting Social: Volleyball & Pizza My Heart',
    category: 'social',
    badgeLabel: 'Social & Food',
    dateStr: '2026-09-30',
    displayDate: 'Wed, Sept 30, 2026',
    monthAbbr: 'Sep',
    dayNum: '30',
    time: '6:30 PM – 7:30 PM',
    location: 'DMH 231 / Campus Lawn & Pizza My Heart',
    leaders: 'Nathan Wong & Jonathan Aye',
    description: 'Hangout right after Wednesday Large Group for campus volleyball and Pizza My Heart with Epic students.',
    flyerImg: 'assets/ig/post_Dd5IPJXB-gq.jpg',
    formUrl: 'https://www.instagram.com/epic_sjsu/',
    formLabel: '@epic_sjsu Instagram',
    isPast: true
  },

  // --- OCTOBER 2026 REAL EVENTS ---
  {
    id: 'evt-2026-10-01-thu-cg',
    title: 'Thursday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-10-01',
    displayDate: 'Thu, Oct 1, 2026',
    monthAbbr: 'Oct',
    dayNum: '01',
    time: '2:30 PM – 3:30 PM',
    location: 'SJSU Student Union Tables between Jamba Juice & Info Center',
    leaders: 'Nathan Wong & Kadin',
    description: 'Thursday afternoon Bible study and fellowship at the tables above Jamba Juice in the Student Union.',
    flyerImg: 'assets/ig/post_Dd5IPJXB-gq.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-05-mon-cg',
    title: 'Monday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-10-05',
    displayDate: 'Mon, Oct 5, 2026',
    monthAbbr: 'Oct',
    dayNum: '05',
    time: '3:30 PM – 4:30 PM',
    location: 'SJSU Student Union Tables between Jamba Juice & Info Center',
    leaders: 'Jonathan Aye & Jerry Wong',
    description: 'Monday Community Group in the Student Union studying the Book of Philippians.',
    flyerImg: 'assets/ig/post_DeKa3-Dvhta.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-07-kbbq',
    title: 'SJSU Epic KBBQ Social & Large Group Gathering!',
    category: 'social',
    badgeLabel: 'Social & Food • Free KBBQ',
    dateStr: '2026-10-07',
    displayDate: 'Wed, Oct 7, 2026',
    monthAbbr: 'Oct',
    dayNum: '07',
    time: '5:00 PM – 6:30 PM',
    location: 'Student Union Outside Tables (and DMH 359)',
    leaders: 'Jerry Wong (925-997-1083), Nathan Wong (925-339-5010) & Jonathan Aye (209-740-7102)',
    description: 'Craving Korean BBQ? Join us at the outdoor tables near the Student Union from 5:00–6:30 PM for free Korean BBQ, community, and Bible fellowship!',
    flyerImg: 'assets/ig/post_DeKfxjUy-Hj.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe_8i7sP9Z75G7k68A_oK8A0B8o89A_4B522t1pA0t0V7N1pA/viewform',
    formLabel: 'KBBQ Sign-Up Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-08-thu-cg',
    title: 'Thursday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-10-08',
    displayDate: 'Thu, Oct 8, 2026',
    monthAbbr: 'Oct',
    dayNum: '08',
    time: '2:30 PM – 3:30 PM',
    location: 'SJSU Student Union Tables between Jamba Juice & Info Center',
    leaders: 'Nathan Wong & Kadin',
    description: 'Thursday afternoon Philippians Bible study and group discussion above Jamba Juice.',
    flyerImg: 'assets/ig/post_DeKa3-Dvhta.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-12-mon-cg',
    title: 'Monday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-10-12',
    displayDate: 'Mon, Oct 12, 2026',
    monthAbbr: 'Oct',
    dayNum: '12',
    time: '3:30 PM – 4:45 PM',
    location: 'SJSU Student Union Tables above Jamba Juice',
    leaders: 'Jonathan Aye & Jerry Wong',
    description: 'Weekly Monday Community Group at the Student Union tables above Jamba Juice.',
    flyerImg: 'assets/ig/post_Dee-aqgPOI_.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-14-build-midOct',
    title: 'Wednesday Large Group: BUILD Series & Campus Dinner',
    category: 'big-group',
    badgeLabel: 'Big Group • BUILD Series',
    dateStr: '2026-10-14',
    displayDate: 'Wed, Oct 14, 2026',
    monthAbbr: 'Oct',
    dayNum: '14',
    time: '5:00 PM – 6:30 PM',
    location: 'Dudley Moorhead Hall (DMH 231)',
    leaders: 'Jerry Wong, Nathan Wong & Jonathan Aye',
    description: 'Weekly Wednesday BUILD Large Group in DMH 231. Partnered with Southbay Community Baptist Church (Pastor Rob Jeon).',
    flyerImg: 'assets/ig/post_Dee-aqgPOI_.jpg',
    formUrl: 'https://forms.gle/bUJn9vnoKUdm7x7b8',
    formLabel: 'Large Group Meal Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-15-thu-cg',
    title: 'Thursday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-10-15',
    displayDate: 'Thu, Oct 15, 2026',
    monthAbbr: 'Oct',
    dayNum: '15',
    time: '2:30 PM – 3:45 PM',
    location: 'SJSU Student Union Tables above Jamba Juice',
    leaders: 'Nathan Wong & Kadin',
    description: 'Weekly Thursday Community Group at the Student Union tables above Jamba Juice.',
    flyerImg: 'assets/ig/post_Dee-aqgPOI_.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-19-mon-cg',
    title: 'Monday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-10-19',
    displayDate: 'Mon, Oct 19, 2026',
    monthAbbr: 'Oct',
    dayNum: '19',
    time: '3:30 PM – 4:30 PM',
    location: 'SJSU Student Union Tables between Jamba Juice & Info Center',
    leaders: 'Jonathan Aye & Jerry Wong',
    description: 'Monday Community Group studying Philippians together in the Student Union.',
    flyerImg: 'assets/ig/post_Deqm7a1BzAM.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-21-boba-kfc',
    title: 'SEND/SERVE Large Group: Share Your Story + Boba Bar & KFC Chicken!',
    category: 'big-group',
    badgeLabel: 'Big Group • SEND/SERVE + Boba & KFC',
    dateStr: '2026-10-21',
    displayDate: 'Wed, Oct 21, 2026',
    monthAbbr: 'Oct',
    dayNum: '21',
    time: '5:00 PM – 6:30 PM',
    location: 'Dudley Moorhead Hall (DMH 231)',
    leaders: 'Jerry Wong, Nathan Wong & Jonathan Aye',
    description: 'Join us on Wednesday in DMH 231 from 5:00–6:30 PM for our SEND/SERVE session on how to share your faith story, plus a DIY Boba Bar & free KFC Chicken!',
    flyerImg: 'assets/ig/post_DevGIuGzauO.jpg',
    formUrl: 'https://forms.gle/bUJn9vnoKUdm7x7b8',
    formLabel: 'Boba & KFC Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-22-thu-cg',
    title: 'Thursday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-10-22',
    displayDate: 'Thu, Oct 22, 2026',
    monthAbbr: 'Oct',
    dayNum: '22',
    time: '2:30 PM – 3:30 PM',
    location: 'SJSU Student Union Tables between Jamba Juice & Info Center',
    leaders: 'Nathan Wong & Kadin',
    description: 'Thursday afternoon Philippians Bible study above Jamba Juice.',
    flyerImg: 'assets/ig/post_Deqm7a1BzAM.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-26-mon-cg',
    title: 'Monday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-10-26',
    displayDate: 'Mon, Oct 26, 2026',
    monthAbbr: 'Oct',
    dayNum: '26',
    time: '3:30 PM – 4:30 PM',
    location: 'SJSU Student Union Tables between Jamba Juice & Info Center',
    leaders: 'Jonathan Aye & Jerry Wong',
    description: 'Monday Community Group / Bible Study at the Student Union tables between Jamba Juice and the Info Center.',
    flyerImg: 'assets/ig/post_DfBVswdBO0p.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-28-campus-burgers',
    title: 'Weekly Wednesday Large Group: Speaker Noah Qiu + Free Campus Burgers!',
    category: 'big-group',
    badgeLabel: 'Big Group • Free Campus Burgers',
    dateStr: '2026-10-28',
    displayDate: 'Wed, Oct 28, 2026',
    monthAbbr: 'Oct',
    dayNum: '28',
    time: '5:00 PM – 6:30 PM',
    location: 'Dudley Moorhead Hall (DMH 231)',
    leaders: 'Guest Speaker: Noah Qiu • Hosts: Nathan Wong & Jonathan Aye',
    description: 'Join us Wednesday 5:00–6:30 PM in DMH 231! Our guest speaker is Noah Qiu, and we are providing free Campus Burgers for all who register on the form.',
    flyerImg: 'assets/ig/post_DfBVswdBO0p.jpg',
    formUrl: 'https://forms.gle/bUJn9vnoKUdm7x7b8',
    formLabel: 'Campus Burgers Form',
    isPast: true
  },
  {
    id: 'evt-2026-10-29-thu-cg',
    title: 'Thursday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-10-29',
    displayDate: 'Thu, Oct 29, 2026',
    monthAbbr: 'Oct',
    dayNum: '29',
    time: '2:30 PM – 3:30 PM',
    location: 'SJSU Student Union Tables between Jamba Juice & Info Center',
    leaders: 'Nathan Wong & Kadin',
    description: 'Thursday Community Group / Bible Study at the Student Union tables between Jamba Juice and the Info Center.',
    flyerImg: 'assets/ig/post_DfBVswdBO0p.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Community Group Bio Form',
    isPast: true
  },

  // --- NOVEMBER 2026 UPCOMING EVENTS ---
  {
    id: 'evt-2026-11-02-mon-cg',
    title: 'Monday Community Group / Bible Study (Philippians)',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-11-02',
    displayDate: 'Mon, Nov 2, 2026',
    monthAbbr: 'Nov',
    dayNum: '02',
    time: '3:30 PM – 4:45 PM',
    location: 'SJSU Student Union Tables above Jamba Juice',
    leaders: 'Jonathan Aye & Jerry Wong',
    description: 'Weekly Monday Community Group in the Student Union above Jamba Juice.',
    flyerImg: 'assets/ig/post_DdiSLJ5hwnz.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Sign Up via Bio Form',
    isPast: false
  },
  {
    id: 'evt-2026-11-04-wed-lg',
    title: 'Weekly Wednesday Large Group (Big Group) + Free Dinner',
    category: 'big-group',
    badgeLabel: 'Big Group • BUILD Series',
    dateStr: '2026-11-04',
    displayDate: 'Wed, Nov 4, 2026',
    monthAbbr: 'Nov',
    dayNum: '04',
    time: '5:00 PM – 6:30 PM',
    location: 'Dudley Moorhead Hall (DMH 231)',
    leaders: 'Jerry Wong, Nathan Wong & Jonathan Aye',
    description: 'Weekly Wednesday Large Group in DMH 231 from 5:00–6:30 PM! Worship, Bible teaching, community, and free dinner.',
    flyerImg: 'assets/ig/post_DfBVswdBO0p.jpg',
    formUrl: 'https://forms.gle/bUJn9vnoKUdm7x7b8',
    formLabel: 'RSVP for Free Dinner',
    isPast: false
  },
  {
    id: 'evt-2026-11-05-thu-cg',
    title: 'Thursday Community Group / Bible Study (Philippians)',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-11-05',
    displayDate: 'Thu, Nov 5, 2026',
    monthAbbr: 'Nov',
    dayNum: '05',
    time: '2:30 PM – 3:45 PM',
    location: 'SJSU Student Union Tables above Jamba Juice',
    leaders: 'Nathan Wong & Kadin',
    description: 'Weekly Thursday Community Group in the Student Union above Jamba Juice.',
    flyerImg: 'assets/ig/post_DdiSLJ5hwnz.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Sign Up via Bio Form',
    isPast: false
  },
  {
    id: 'evt-2026-11-09-mon-cg',
    title: 'Monday Community Group / Bible Study (Philippians)',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-11-09',
    displayDate: 'Mon, Nov 9, 2026',
    monthAbbr: 'Nov',
    dayNum: '09',
    time: '3:30 PM – 4:45 PM',
    location: 'SJSU Student Union Tables above Jamba Juice',
    leaders: 'Jonathan Aye & Jerry Wong',
    description: 'Weekly Monday Community Group in the Student Union above Jamba Juice.',
    flyerImg: 'assets/ig/post_DdiSLJ5hwnz.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Sign Up via Bio Form',
    isPast: false
  },
  {
    id: 'evt-2026-11-11-wed-lg',
    title: 'Weekly Wednesday Large Group (Pre-Retreat Night!)',
    category: 'big-group',
    badgeLabel: 'Big Group • Pre-Retreat Night',
    dateStr: '2026-11-11',
    displayDate: 'Wed, Nov 11, 2026',
    monthAbbr: 'Nov',
    dayNum: '11',
    time: '5:00 PM – 6:30 PM',
    location: 'Dudley Moorhead Hall (DMH 231)',
    leaders: 'Jerry Wong, Nathan Wong & Jonathan Aye',
    description: 'Wednesday Large Group before we head out to Daybreak Camp in Felton for Fall Retreat! Carpool coordination + free dinner in DMH 231.',
    flyerImg: 'assets/ig/post_Dee-aqgPOI_.jpg',
    formUrl: 'https://forms.gle/US4QeF1Xm72tfFgX8',
    formLabel: 'Fall Retreat Form',
    isPast: false
  },
  {
    id: 'evt-2026-11-12-thu-cg',
    title: 'Thursday Community Group / Bible Study (Philippians)',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-11-12',
    displayDate: 'Thu, Nov 12, 2026',
    monthAbbr: 'Nov',
    dayNum: '12',
    time: '2:30 PM – 3:45 PM',
    location: 'SJSU Student Union Tables above Jamba Juice',
    leaders: 'Nathan Wong & Kadin',
    description: 'Weekly Thursday Community Group in the Student Union above Jamba Juice.',
    flyerImg: 'assets/ig/post_DdiSLJ5hwnz.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Sign Up via Bio Form',
    isPast: false
  },
  {
    id: 'evt-2026-11-13-retreat-day1',
    title: 'SJSU Epic Fall Retreat: "Dream Big, Love Well" (Day 1 Departure)',
    category: 'retreat',
    badgeLabel: 'Fall Retreat • Day 1',
    dateStr: '2026-11-13',
    displayDate: 'Fri, Nov 13, 2026',
    monthAbbr: 'Nov',
    dayNum: '13',
    time: 'Meet 3:00 PM at SJSU ATMs (Leave 4:00 PM)',
    location: 'Daybreak Camp in Felton, CA',
    leaders: 'Guest Speaker: Young Lee (Epic Mission Director) • Jerry Wong & Jonathan Aye',
    description: 'Fall Retreat Day 1! Meet at the SJSU ATMs at 3:00 PM to carpool to Daybreak Camp in Felton, CA. Includes 5 meals, 4 sessions with Young Lee, campfire, and cabins ($75; Venmo @Nathan86091).',
    flyerImg: 'assets/ig/post_DeshZ_ZpoS8.jpg',
    formUrl: 'https://forms.gle/US4QeF1Xm72tfFgX8',
    formLabel: 'Register for Fall Retreat ($75)',
    isPast: false
  },
  {
    id: 'evt-2026-11-14-retreat-day2',
    title: 'SJSU Epic Fall Retreat: "Dream Big, Love Well" (Day 2 Sessions & Campfire)',
    category: 'retreat',
    badgeLabel: 'Fall Retreat • Day 2',
    dateStr: '2026-11-14',
    displayDate: 'Sat, Nov 14, 2026',
    monthAbbr: 'Nov',
    dayNum: '14',
    time: 'All Day (Sessions, Beach/Redwoods, Campfire)',
    location: 'Daybreak Camp in Felton, CA',
    leaders: 'Guest Speaker: Young Lee • Nathan Wong, Jonathan Aye & Jerry Wong',
    description: 'Full day at Daybreak Camp in Felton, CA! Gospel identity sessions with Young Lee, volleyball, free time to study or visit the beach, and evening campfire.',
    flyerImg: 'assets/ig/post_DeuQP1BBLvN.jpg',
    formUrl: 'https://forms.gle/US4QeF1Xm72tfFgX8',
    formLabel: 'Register for Fall Retreat ($75)',
    isPast: false
  },
  {
    id: 'evt-2026-11-15-retreat-day3',
    title: 'SJSU Epic Fall Retreat: "Dream Big, Love Well" (Day 3 Sending & Return)',
    category: 'retreat',
    badgeLabel: 'Fall Retreat • Day 3',
    dateStr: '2026-11-15',
    displayDate: 'Sun, Nov 15, 2026',
    monthAbbr: 'Nov',
    dayNum: '15',
    time: '9:00 AM – 1:00 PM Return to SJSU',
    location: 'Daybreak Camp in Felton, CA → SJSU',
    leaders: 'Guest Speaker: Young Lee • Jerry Wong, Nathan Wong & Jonathan Aye',
    description: 'Final morning worship, testimony sharing, and return carpools back to San Jose State University.',
    flyerImg: 'assets/ig/post_DeshZ_ZpoS8.jpg',
    formUrl: 'https://forms.gle/US4QeF1Xm72tfFgX8',
    formLabel: 'Register for Fall Retreat ($75)',
    isPast: false
  },
  {
    id: 'evt-2026-11-16-mon-cg',
    title: 'Monday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-11-16',
    displayDate: 'Mon, Nov 16, 2026',
    monthAbbr: 'Nov',
    dayNum: '16',
    time: '3:30 PM – 4:45 PM',
    location: 'SJSU Student Union Tables above Jamba Juice',
    leaders: 'Jonathan Aye & Jerry Wong',
    description: 'Post-retreat Monday Community Group in the Student Union above Jamba Juice.',
    flyerImg: 'assets/ig/post_DdiSLJ5hwnz.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Sign Up via Bio Form',
    isPast: false
  },
  {
    id: 'evt-2026-11-18-wed-lg',
    title: 'Weekly Wednesday Large Group: Retreat Testimonies & Dinner',
    category: 'big-group',
    badgeLabel: 'Big Group • BUILD Series',
    dateStr: '2026-11-18',
    displayDate: 'Wed, Nov 18, 2026',
    monthAbbr: 'Nov',
    dayNum: '18',
    time: '5:00 PM – 6:30 PM',
    location: 'Dudley Moorhead Hall (DMH 231)',
    leaders: 'Jerry Wong, Nathan Wong & Jonathan Aye',
    description: 'Hear student stories from Fall Retreat + Bible message and free dinner in DMH 231.',
    flyerImg: 'assets/ig/post_Dee-aqgPOI_.jpg',
    formUrl: 'https://forms.gle/bUJn9vnoKUdm7x7b8',
    formLabel: 'RSVP for Dinner',
    isPast: false
  },
  {
    id: 'evt-2026-11-19-thu-cg',
    title: 'Thursday Community Group / Bible Study',
    category: 'community-group',
    badgeLabel: 'Community Group',
    dateStr: '2026-11-19',
    displayDate: 'Thu, Nov 19, 2026',
    monthAbbr: 'Nov',
    dayNum: '19',
    time: '2:30 PM – 3:45 PM',
    location: 'SJSU Student Union Tables above Jamba Juice',
    leaders: 'Nathan Wong & Kadin',
    description: 'Weekly Thursday Community Group in the Student Union above Jamba Juice.',
    flyerImg: 'assets/ig/post_DdiSLJ5hwnz.jpg',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdsBOZaDIZW6av3RSgOJg3xIUCQkpkpNxy1q4jrEqqCmj73sQ/viewform',
    formLabel: 'Sign Up via Bio Form',
    isPast: false
  }
];

/* ==========================================================================
   1. MULTI-TAB SPA NAVIGATION
   ========================================================================== */
function initTabNavigation() {
  const navLinks = document.querySelectorAll('.nav-link[data-tab]');
  const tabPages = document.querySelectorAll('.tab-page');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNavLinks = document.getElementById('mainNavLinks');

  function switchTab(targetTabId) {
    let found = false;
    tabPages.forEach(page => {
      if (page.id === targetTabId) {
        page.classList.add('active');
        found = true;
      } else {
        page.classList.remove('active');
      }
    });

    if (!found) return;

    navLinks.forEach(link => {
      if (link.getAttribute('data-tab') === targetTabId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (mainNavLinks) {
      mainNavLinks.classList.remove('mobile-open');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (history.replaceState) {
      history.replaceState(null, null, `#${targetTabId}`);
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetTab = link.getAttribute('data-tab');
      if (targetTab) switchTab(targetTab);
    });
  });

  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-target-tab]');
    if (trigger) {
      e.preventDefault();
      const targetTab = trigger.getAttribute('data-target-tab');
      if (targetTab) switchTab(targetTab);
    }
  });

  if (mobileMenuBtn && mainNavLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNavLinks.classList.toggle('mobile-open');
    });
  }

  const initialHash = window.location.hash.replace('#', '');
  const validTabs = ['welcome', 'about', 'community', 'events', 'past-events', 'connect'];
  if (initialHash && validTabs.includes(initialHash)) {
    switchTab(initialHash);
  }
}

/* ==========================================================================
   2. COMMUNITY GROUP & GATHERING FILTERS
   ========================================================================== */
function initCommunityFilters() {
  const filterBtns = document.querySelectorAll('.lifegroup-filter-btn');
  const cards = document.querySelectorAll('.lifegroup-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCat === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. ACTUAL CALENDAR APP GRID VIEW + LIST VIEW + PAST EVENTS PAGE
   ========================================================================== */
function initEventCalendarAndPastEvents() {
  const btnViewGrid = document.getElementById('btnViewCalendarGrid');
  const btnViewList = document.getElementById('btnViewCalendarList');
  const calendarAppGridView = document.getElementById('calendarAppGridView');
  const calendarListView = document.getElementById('calendarListView');

  const calChips = document.querySelectorAll('.cal-chip');
  const calPrevMonth = document.getElementById('calPrevMonth');
  const calNextMonth = document.getElementById('calNextMonth');
  const calCurrentMonthLabel = document.getElementById('calCurrentMonthLabel');
  const calMonthPills = document.querySelectorAll('.cal-month-pill');
  const calDaysGrid = document.getElementById('calDaysGrid');

  const calInspectorTitle = document.getElementById('calInspectorTitle');
  const calInspectorSubtitle = document.getElementById('calInspectorSubtitle');
  const calInspectorBody = document.getElementById('calInspectorBody');

  const pastFilterBtns = document.querySelectorAll('.past-filter-btn');
  const pastEventsGrid = document.getElementById('pastEventsGrid');

  // Supported months in the Calendar App View: Sept 2026 (8), Oct 2026 (9), Nov 2026 (10)
  const MONTHS_META = [
    { year: 2026, month: 8, label: 'September 2026' },
    { year: 2026, month: 9, label: 'October 2026' },
    { year: 2026, month: 10, label: 'November 2026' }
  ];

  let currentMonthIdx = 1; // Default to October 2026 (where most flyers & weekly schedules live)
  let activeCategory = 'all';
  let selectedDateStr = '2026-10-28';

  // --- A. Toggle between Calendar App Grid View and Schedule List View ---
  if (btnViewGrid && btnViewList && calendarAppGridView && calendarListView) {
    btnViewGrid.addEventListener('click', () => {
      btnViewGrid.classList.add('active');
      btnViewList.classList.remove('active');
      calendarAppGridView.style.display = 'block';
      calendarListView.style.display = 'none';
    });

    btnViewList.addEventListener('click', () => {
      btnViewList.classList.add('active');
      btnViewGrid.classList.remove('active');
      calendarListView.style.display = 'flex';
      calendarAppGridView.style.display = 'none';
    });
  }

  // --- B. Category Filter Chips ---
  calChips.forEach(chip => {
    chip.addEventListener('click', () => {
      activeCategory = chip.getAttribute('data-category') || 'all';
      calChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      renderCalendarGrid();
      renderScheduleListView();
      renderInspectorForDate(selectedDateStr);
    });
  });

  // --- C. Month Navigation Controls ---
  function setMonthByIndex(idx) {
    if (idx < 0) idx = 0;
    if (idx >= MONTHS_META.length) idx = MONTHS_META.length - 1;
    currentMonthIdx = idx;

    const mMeta = MONTHS_META[currentMonthIdx];
    if (calCurrentMonthLabel) {
      calCurrentMonthLabel.textContent = mMeta.label;
    }

    calMonthPills.forEach(pill => {
      const pMonth = parseInt(pill.getAttribute('data-month'), 10);
      if (pMonth === mMeta.month) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Pick first date with events in that month for the inspector
    const monthPrefix = `${mMeta.year}-${String(mMeta.month + 1).padStart(2, '0')}`;
    const firstMatch = EPIC_EVENTS.find(ev =>
      ev.dateStr.startsWith(monthPrefix) &&
      (activeCategory === 'all' || ev.category === activeCategory)
    );
    if (firstMatch) {
      selectedDateStr = firstMatch.dateStr;
    } else {
      selectedDateStr = `${monthPrefix}-01`;
    }

    renderCalendarGrid();
    renderInspectorForDate(selectedDateStr);
  }

  if (calPrevMonth) {
    calPrevMonth.addEventListener('click', () => {
      setMonthByIndex(currentMonthIdx - 1);
    });
  }
  if (calNextMonth) {
    calNextMonth.addEventListener('click', () => {
      setMonthByIndex(currentMonthIdx + 1);
    });
  }

  calMonthPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetMonth = parseInt(pill.getAttribute('data-month'), 10);
      const foundIdx = MONTHS_META.findIndex(m => m.month === targetMonth);
      if (foundIdx !== -1) {
        setMonthByIndex(foundIdx);
      }
    });
  });

  // --- D. Render 7-Column Calendar App Grid ---
  function renderCalendarGrid() {
    if (!calDaysGrid) return;
    calDaysGrid.innerHTML = '';

    const { year, month } = MONTHS_META[currentMonthIdx];
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Leading days from previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-day-cell outside-month';
      const numSpan = document.createElement('div');
      numSpan.className = 'cal-day-num';
      numSpan.textContent = String(prevMonthDays - i);
      emptyCell.appendChild(numSpan);
      calDaysGrid.appendChild(emptyCell);
    }

    // Actual days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = EPIC_EVENTS.filter(ev =>
        ev.dateStr === dateStr &&
        (activeCategory === 'all' || ev.category === activeCategory)
      );

      const cell = document.createElement('div');
      cell.className = 'cal-day-cell';
      if (dayEvents.length > 0) cell.classList.add('has-events');
      if (dateStr === selectedDateStr) cell.classList.add('selected-day');

      const numRow = document.createElement('div');
      numRow.className = 'cal-day-num';
      numRow.innerHTML = `<span>${day}</span>`;
      if (dayEvents.length > 0) {
        const countBadge = document.createElement('span');
        countBadge.style.fontSize = '0.68rem';
        countBadge.style.color = 'var(--navy-600)';
        countBadge.textContent = `${dayEvents.length} ${dayEvents.length === 1 ? 'event' : 'events'}`;
        numRow.appendChild(countBadge);
      }
      cell.appendChild(numRow);

      const eventsStack = document.createElement('div');
      eventsStack.className = 'cal-day-events';

      dayEvents.forEach(ev => {
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = `cal-event-pill pill-${ev.category}`;
        pill.innerHTML = `
          <span class="pill-time">${ev.time}</span>
          <span>${ev.title}</span>
        `;
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          selectDay(dateStr);
        });
        eventsStack.appendChild(pill);
      });

      cell.appendChild(eventsStack);

      cell.addEventListener('click', () => {
        selectDay(dateStr);
      });

      calDaysGrid.appendChild(cell);
    }

    // Trailing cells to complete the week row
    const totalCells = firstDayOfMonth + daysInMonth;
    const remainder = totalCells % 7;
    if (remainder !== 0) {
      const trailingCount = 7 - remainder;
      for (let t = 1; t <= trailingCount; t++) {
        const trailCell = document.createElement('div');
        trailCell.className = 'cal-day-cell outside-month';
        const numSpan = document.createElement('div');
        numSpan.className = 'cal-day-num';
        numSpan.textContent = String(t);
        trailCell.appendChild(numSpan);
        calDaysGrid.appendChild(trailCell);
      }
    }
  }

  function selectDay(dateStr) {
    selectedDateStr = dateStr;
    renderCalendarGrid();
    renderInspectorForDate(dateStr);
  }

  // --- E. Render Day Inspector Panel below Calendar Grid ---
  function renderInspectorForDate(dateStr) {
    if (!calInspectorBody || !calInspectorTitle || !calInspectorSubtitle) return;

    const matchingEvents = EPIC_EVENTS.filter(ev =>
      ev.dateStr === dateStr &&
      (activeCategory === 'all' || ev.category === activeCategory)
    );

    const parsedDate = new Date(`${dateStr}T12:00:00`);
    const formattedHeading = isNaN(parsedDate.getTime())
      ? dateStr
      : parsedDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });

    calInspectorTitle.textContent = `Events on ${formattedHeading}`;

    if (matchingEvents.length === 0) {
      calInspectorSubtitle.textContent = 'No events scheduled for this specific day under the current filter.';
      calInspectorBody.innerHTML = `
        <div style="font-size: 0.9rem; color: var(--text-secondary);">
          Click on any highlighted Monday (Community Group), Wednesday (Large Group / Big Group), Thursday (Community Group), or Fri–Sun Nov 13–15 (Fall Retreat) cell on the calendar grid above to inspect full details and flyers.
        </div>
      `;
      return;
    }

    calInspectorSubtitle.textContent = `Showing ${matchingEvents.length} scheduled ${matchingEvents.length === 1 ? 'gathering' : 'gatherings'} with real campus locations and times.`;

    calInspectorBody.innerHTML = matchingEvents.map(ev => `
      <div class="cal-inspector-event-card">
        <img class="cal-inspector-thumb" src="${ev.flyerImg}" alt="${ev.title} Flyer">
        <div>
          <span class="event-type-badge badge-${ev.category}">${ev.badgeLabel}</span>
          <h5 class="cal-inspector-event-title">${ev.title}</h5>
          <div class="cal-inspector-meta">
            <div><strong>Time:</strong> ${ev.time}</div>
            <div><strong>Location:</strong> ${ev.location}</div>
            <div><strong>Leadership:</strong> ${ev.leaders}</div>
          </div>
          <p class="cal-inspector-desc">${ev.description}</p>
          <div style="margin-top: 0.75rem; display: flex; gap: 0.65rem; flex-wrap: wrap;">
            <a class="btn-primary btn-sm" href="${ev.formUrl}" target="_blank" rel="noopener">${ev.formLabel}</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- F. Render Schedule List View ---
  function renderScheduleListView() {
    if (!calendarListView) return;

    // Show all 2026 semester events filtered by category
    const listEvents = EPIC_EVENTS.filter(ev =>
      ev.dateStr.startsWith('2026-') &&
      (activeCategory === 'all' || ev.category === activeCategory)
    );

    if (listEvents.length === 0) {
      calendarListView.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-secondary);">
          No events match the selected filter.
        </div>
      `;
      return;
    }

    calendarListView.innerHTML = listEvents.map(ev => `
      <article class="cal-event-item" data-category="${ev.category}">
        <div class="cal-date-box">
          <span class="cal-date-month">${ev.monthAbbr}</span>
          <span class="cal-date-day">${ev.dayNum}</span>
        </div>
        <div class="cal-event-info">
          <span class="event-type-badge badge-${ev.category}">${ev.badgeLabel}</span>
          <h3 class="cal-event-title">${ev.title}</h3>
          <div class="cal-event-meta">
            <span><strong>Date:</strong> ${ev.displayDate}</span>
            <span><strong>Time:</strong> ${ev.time}</span>
            <span><strong>Location:</strong> ${ev.location}</span>
          </div>
          <p class="cal-event-desc">${ev.description}</p>
        </div>
        <div class="cal-event-action">
          <a href="${ev.formUrl}" target="_blank" rel="noopener" class="btn-secondary btn-sm">${ev.formLabel}</a>
        </div>
      </article>
    `).join('');
  }

  // --- G. Render Past Events Page (#past-events) ---
  function renderPastEventsArchive(pastFilter = 'all') {
    if (!pastEventsGrid) return;

    const pastEvents = EPIC_EVENTS.filter(ev =>
      ev.isPast && (pastFilter === 'all' || ev.category === pastFilter)
    ).slice().reverse(); // Most recent past events first

    pastEventsGrid.innerHTML = pastEvents.map(ev => `
      <article class="past-event-card" data-category="${ev.category}">
        <div class="past-event-img-wrap">
          <img src="${ev.flyerImg}" alt="${ev.title} Original @epic_sjsu Flyer" loading="lazy">
        </div>
        <div class="past-event-body">
          <div class="past-event-top">
            <span class="event-type-badge badge-${ev.category}">${ev.badgeLabel}</span>
            <span class="past-event-date">${ev.displayDate}</span>
          </div>
          <h2 class="past-event-title">${ev.title}</h2>
          <div class="past-event-meta">
            <div><strong>Time:</strong> ${ev.time}</div>
            <div><strong>Location:</strong> ${ev.location}</div>
            <div><strong>Leaders / Speaker:</strong> ${ev.leaders}</div>
          </div>
          <p class="past-event-desc">${ev.description}</p>
        </div>
      </article>
    `).join('');
  }

  pastFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterVal = btn.getAttribute('data-past-filter') || 'all';
      pastFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPastEventsArchive(filterVal);
    });
  });

  // Initial render
  setMonthByIndex(1); // October 2026
  renderScheduleListView();
  renderPastEventsArchive('all');
}

/* ==========================================================================
   4. CONNECT FORM & EMBEDDED INSTAGRAM BIO FORM TOGGLE
   ========================================================================== */
function initConnectForm() {
  const btnShowProtoForm = document.getElementById('btnShowProtoForm');
  const btnShowEmbeddedForm = document.getElementById('btnShowEmbeddedForm');
  const protoFormWrapper = document.getElementById('protoFormWrapper');
  const embeddedFormWrapper = document.getElementById('embeddedFormWrapper');

  const form = document.getElementById('connectIntakeForm');
  const successAlert = document.getElementById('connectSuccessMsg');

  if (btnShowProtoForm && btnShowEmbeddedForm && protoFormWrapper && embeddedFormWrapper) {
    btnShowProtoForm.addEventListener('click', () => {
      btnShowProtoForm.classList.add('active');
      btnShowEmbeddedForm.classList.remove('active');
      protoFormWrapper.style.display = 'block';
      embeddedFormWrapper.style.display = 'none';
    });

    btnShowEmbeddedForm.addEventListener('click', () => {
      btnShowEmbeddedForm.classList.add('active');
      btnShowProtoForm.classList.remove('active');
      embeddedFormWrapper.style.display = 'block';
      protoFormWrapper.style.display = 'none';
    });
  }

  if (form && successAlert) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      successAlert.style.display = 'block';
      form.reset();
      setTimeout(() => {
        successAlert.style.display = 'none';
      }, 7000);
    });
  }
}

/* ==========================================================================
   5. LEADER PORTAL AUTHENTICATION & @epic_sjsu FLYER CREATOR STUDIO
   ========================================================================== */
function initAuthAndFlyerStudio() {
  let isLeaderLoggedIn = false;

  const btnOpenLogin = document.getElementById('btnOpenLogin');
  const btnUnlockStudio = document.getElementById('btnUnlockStudio');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const loginModal = document.getElementById('loginModal');
  const btnDemoLogin = document.getElementById('btnDemoLogin');
  const loginForm = document.getElementById('loginForm');
  const btnLogout = document.getElementById('btnLogout');

  const authGuestView = document.getElementById('authGuestView');
  const authUserView = document.getElementById('authUserView');
  const loggedInLeaderName = document.getElementById('loggedInLeaderName');
  const flyerStudioLocked = document.getElementById('flyerStudioLocked');
  const flyerStudioActive = document.getElementById('flyerStudioActive');

  function openModal() {
    if (loginModal) loginModal.classList.add('open');
  }

  function closeModal() {
    if (loginModal) loginModal.classList.remove('open');
  }

  function setLoggedInState(loggedIn, leaderLabel = 'Nathan Wong') {
    isLeaderLoggedIn = loggedIn;

    if (loggedIn) {
      if (authGuestView) authGuestView.style.display = 'none';
      if (authUserView) authUserView.style.display = 'flex';
      if (loggedInLeaderName) loggedInLeaderName.textContent = leaderLabel;
      if (flyerStudioLocked) flyerStudioLocked.style.display = 'none';
      if (flyerStudioActive) flyerStudioActive.classList.add('unlocked');
      closeModal();
    } else {
      if (authGuestView) authGuestView.style.display = 'flex';
      if (authUserView) authUserView.style.display = 'none';
      if (flyerStudioLocked) flyerStudioLocked.style.display = 'block';
      if (flyerStudioActive) flyerStudioActive.classList.remove('unlocked');
    }
  }

  if (btnOpenLogin) btnOpenLogin.addEventListener('click', openModal);
  if (btnUnlockStudio) btnUnlockStudio.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) closeModal();
    });
  }

  if (btnDemoLogin) {
    btnDemoLogin.addEventListener('click', () => {
      setLoggedInState(true, 'Nathan Wong & Jonathan Aye');
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('loginEmail');
      const emailVal = emailInput ? emailInput.value.toLowerCase() : '';
      let leaderName = 'Nathan Wong';
      if (emailVal.includes('jonathan')) leaderName = 'Jonathan Aye';
      if (emailVal.includes('jerry')) leaderName = 'Jerry Wong';
      setLoggedInState(true, leaderName);
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      setLoggedInState(false);
    });
  }

  // --- Flyer Studio Controls ---
  const selectTemplate = document.getElementById('flyerSelectTemplate');
  const inputTitle = document.getElementById('flyerInputTitle');
  const inputSubtitle = document.getElementById('flyerInputSubtitle');
  const inputDate = document.getElementById('flyerInputDate');
  const inputTime = document.getElementById('flyerInputTime');
  const inputLocation = document.getElementById('flyerInputLocation');
  const inputContact = document.getElementById('flyerInputContact');
  const selectTheme = document.getElementById('flyerSelectTheme');

  const displayTitle = document.getElementById('flyerDisplayTitle');
  const displaySubtitle = document.getElementById('flyerDisplaySubtitle');
  const displayDate = document.getElementById('flyerDisplayDate');
  const displayTime = document.getElementById('flyerDisplayTime');
  const displayLocation = document.getElementById('flyerDisplayLocation');
  const displayContact = document.getElementById('flyerDisplayContact');
  const liveFlyerCanvas = document.getElementById('liveFlyerCanvas');

  const btnDownloadFlyer = document.getElementById('btnDownloadFlyer');
  const btnPrintFlyer = document.getElementById('btnPrintFlyer');

  const FLYER_PRESETS = {
    large_group: {
      title: 'Weekly Wednesday Large Group!',
      subtitle: 'Community + Bible • Free Campus Burgers!',
      date: 'Wednesday, Oct 28',
      time: '5:00 PM – 6:30 PM',
      location: 'Dudley Moorhead Hall (DMH 231)',
      contact: 'Jerry: 925-997-1083 • Nathan: 925-339-5010 • Jonathan: 209-740-7102',
      theme: 'theme-epic-teal'
    },
    boba_kfc: {
      title: 'Share Your Story + Boba & KFC!',
      subtitle: 'SEND/SERVE Night • Free DIY Boba Bar & KFC Chicken',
      date: 'Wednesday, Oct 21',
      time: '5:00 PM – 6:30 PM',
      location: 'Dudley Moorhead Hall (DMH 231)',
      contact: 'Jerry: 925-997-1083 • Nathan: 925-339-5010 • Jonathan: 209-740-7102',
      theme: 'theme-chalkboard'
    },
    kbbq_social: {
      title: 'SJSU Epic KBBQ Invites You!',
      subtitle: 'Free Korean BBQ • Community & Fellowship',
      date: 'Wednesday, Oct 7',
      time: '5:00 PM – 6:30 PM',
      location: 'Student Union Outside Tables',
      contact: 'Jerry: 925-997-1083 • Nathan: 925-339-5010 • Jonathan: 209-740-7102',
      theme: 'theme-epic-teal'
    },
    community_groups: {
      title: 'Join Epic Community Groups!',
      subtitle: 'Book of Philippians • Same Content, Join One!',
      date: 'Mondays & Thursdays',
      time: 'Mon 3:30–4:45 PM • Thu 2:30–3:45 PM',
      location: 'SJSU Student Union Tables above Jamba Juice',
      contact: 'Mon: Jonathan & Jerry • Thu: Nathan & Kadin',
      theme: 'theme-botanical'
    },
    fall_retreat: {
      title: 'Fall Retreat: Dream Big, Love Well',
      subtitle: 'Speaker: Young Lee (Epic Mission Director) • $75',
      date: 'Fri–Sun, Nov 13–15, 2026',
      time: 'Meet 3:00 PM at SJSU ATMs (Leave 4:00 PM)',
      location: 'Daybreak Camp in Felton, CA',
      contact: 'Venmo @Nathan86091 • Jerry: 925-997-1083 • Jonathan: 209-740-7102',
      theme: 'theme-botanical'
    }
  };

  function syncCanvas() {
    if (displayTitle && inputTitle) displayTitle.textContent = inputTitle.value;
    if (displaySubtitle && inputSubtitle) displaySubtitle.textContent = inputSubtitle.value;
    if (displayDate && inputDate) displayDate.textContent = inputDate.value;
    if (displayTime && inputTime) displayTime.textContent = inputTime.value;
    if (displayLocation && inputLocation) displayLocation.textContent = inputLocation.value;
    if (displayContact && inputContact) displayContact.textContent = inputContact.value;

    if (liveFlyerCanvas && selectTheme) {
      liveFlyerCanvas.classList.remove('theme-epic-teal', 'theme-botanical', 'theme-chalkboard');
      liveFlyerCanvas.classList.add(selectTheme.value);
    }
  }

  [inputTitle, inputSubtitle, inputDate, inputTime, inputLocation, inputContact].forEach(el => {
    if (el) el.addEventListener('input', syncCanvas);
  });

  if (selectTheme) {
    selectTheme.addEventListener('change', syncCanvas);
  }

  if (selectTemplate) {
    selectTemplate.addEventListener('change', () => {
      const preset = FLYER_PRESETS[selectTemplate.value];
      if (!preset) return;
      if (inputTitle) inputTitle.value = preset.title;
      if (inputSubtitle) inputSubtitle.value = preset.subtitle;
      if (inputDate) inputDate.value = preset.date;
      if (inputTime) inputTime.value = preset.time;
      if (inputLocation) inputLocation.value = preset.location;
      if (inputContact) inputContact.value = preset.contact;
      if (selectTheme) selectTheme.value = preset.theme;
      syncCanvas();
    });
  }

  if (btnPrintFlyer) {
    btnPrintFlyer.addEventListener('click', () => {
      window.print();
    });
  }

  if (btnDownloadFlyer) {
    btnDownloadFlyer.addEventListener('click', () => {
      exportFlyerToPNG({
        title: inputTitle ? inputTitle.value : 'Epic SJSU Event',
        subtitle: inputSubtitle ? inputSubtitle.value : '',
        date: inputDate ? inputDate.value : '',
        time: inputTime ? inputTime.value : '',
        location: inputLocation ? inputLocation.value : '',
        contact: inputContact ? inputContact.value : '',
        theme: selectTheme ? selectTheme.value : 'theme-epic-teal'
      });
    });
  }
}

/**
 * Renders the current Flyer Creator Studio settings onto a high-res HTML5 Canvas
 * and downloads a PNG image.
 */
function exportFlyerToPNG(data) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 1080, 1350);
  if (data.theme === 'theme-botanical') {
    grad.addColorStop(0, '#133A2B');
    grad.addColorStop(0.55, '#1F5C44');
    grad.addColorStop(1, '#0D261C');
  } else if (data.theme === 'theme-chalkboard') {
    grad.addColorStop(0, '#1C1917');
    grad.addColorStop(0.6, '#292524');
    grad.addColorStop(1, '#0C0A09');
  } else {
    grad.addColorStop(0, '#0B3B49');
    grad.addColorStop(0.55, '#135466');
    grad.addColorStop(1, '#07222B');
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1350);

  ctx.strokeStyle = 'rgba(245, 166, 35, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(50, 50, 980, 1250);

  ctx.fillStyle = '#F5A623';
  ctx.font = 'bold 24px Inter, sans-serif';
  ctx.fillText('EPIC MOVEMENT AT SAN JOSE STATE • A CRU MINISTRY', 100, 140);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 64px Georgia, serif';
  wrapCanvasText(ctx, data.title, 100, 250, 880, 76);

  ctx.fillStyle = '#F7C96E';
  ctx.font = '600 32px Inter, sans-serif';
  wrapCanvasText(ctx, data.subtitle, 100, 440, 880, 44);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(100, 540, 880, 460);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px Inter, sans-serif';
  ctx.fillText(`DATE:      ${data.date}`, 150, 640);
  ctx.fillText(`TIME:      ${data.time}`, 150, 730);
  ctx.fillText(`LOCATION:  ${data.location}`, 150, 820);
  ctx.font = '600 26px Inter, sans-serif';
  ctx.fillText(`CONTACTS:  ${data.contact}`, 150, 910);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = 'bold 22px Inter, sans-serif';
  ctx.fillText('PARTNERING CHURCH: SOUTHBAY COMMUNITY BAPTIST CHURCH (PASTOR ROB JEON)', 100, 1130);

  ctx.fillStyle = '#F5A623';
  ctx.font = 'bold 30px Georgia, serif';
  ctx.fillText('@epic_sjsu • Open to All SJSU Students!', 100, 1190);

  const link = document.createElement('a');
  link.download = 'epic-sjsu-flyer.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = (text || '').split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
