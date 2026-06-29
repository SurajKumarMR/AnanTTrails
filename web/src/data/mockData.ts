// Mock data for AnanTTrails

export const TRAVELER_TYPES = [
  { id: 'all', label: 'All travelers', icon: '🌍' },
  { id: 'budget', label: 'Budget backpacker', icon: '🎒' },
  { id: 'solo-female', label: 'Solo female', icon: '👩' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
  { id: 'digital-nomad', label: 'Digital nomad', icon: '💻' },
  { id: 'adventure', label: 'Adventure seeker', icon: '🧗' },
  { id: 'cultural', label: 'Culture lover', icon: '🏛️' },
  { id: 'foodie', label: 'Food hunter', icon: '🍜' },
];

export const CATEGORIES = [
  { id: 'discover', label: 'Discover', icon: '🔭', color: '#1A6B6B' },
  { id: 'stay', label: 'Stay', icon: '🏨', color: '#2D5A27' },
  { id: 'eat', label: 'Eat & drink', icon: '🍜', color: '#C4622D' },
  { id: 'transport', label: 'Getting around', icon: '🛺', color: '#E8A020' },
  { id: 'day-trips', label: 'Day trips', icon: '🗺️', color: '#8B5CF6' },
  { id: 'insider', label: 'Insider tips', icon: '💡', color: '#EC4899' },
  { id: 'off-path', label: 'Off the path', icon: '🌿', color: '#059669' },
  { id: 'budget-guide', label: 'Budget guide', icon: '💰', color: '#D97706' },
];

export const TRENDING_DESTINATIONS = [
  { id: 1, name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', category: 'Adventure', posts: 2841 },
  { id: 2, name: 'Chiang Mai', country: 'Thailand', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80', category: 'Culture', posts: 1920 },
  { id: 3, name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80', category: 'Cultural', posts: 3102 },
  { id: 4, name: 'Matera', country: 'Italy', image: 'https://images.unsplash.com/photo-1523365154888-8a758819b722?w=400&q=80', category: 'Hidden Gem', posts: 642 },
  { id: 5, name: 'Tbilisi', country: 'Georgia', image: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&q=80', category: 'Budget', posts: 880 },
];

export const COMMUNITY_POSTS = [
  {
    id: 1,
    author: { name: 'Julian Aris', handle: 'julian_aris', avatar: 'https://i.pravatar.cc/40?img=11', verified: true, location: 'Kyoto, Japan' },
    category: 'Eat & drink',
    categoryTag: 'INSIDER TIP',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80',
    freshness: 97,
    visitDate: 'Mar 2024',
    price: '¥850',
    likes: 1240,
    comments: 45,
    saved: false,
    liked: false,
    helpful: 238,
    caption: 'Just found this tiny ramen stall hidden in an alleyway near Gion. No English menu, just pure magic. The broth is aged for 48 hours and it shows. Absolute gem for anyone visiting Kyoto! 🍜✨',
    tags: ['Solo', 'Budget', 'Foodie', 'Hidden Gem'],
    destination: 'Kyoto',
    ratings: { value: 5, authenticity: 5, accessibility: 3, safety: 5, vibe: 5, crowd: 2 },
  },
  {
    id: 2,
    author: { name: 'Elena Rossi', handle: 'elena_rossi', avatar: 'https://i.pravatar.cc/40?img=5', verified: true, location: 'Matera, Italy' },
    category: 'Discover',
    categoryTag: 'HIDDEN GEMS',
    image: 'https://images.unsplash.com/photo-1523365154888-8a758819b722?w=600&q=80',
    freshness: 92,
    visitDate: 'Apr 2024',
    price: 'Free',
    likes: 842,
    comments: 28,
    saved: true,
    liked: false,
    helpful: 154,
    caption: 'Sunrise in the Sassi is unlike anything else. The way the light hits the limestone caves makes the whole city look like it\'s glowing. Definitely wake up at 5:30 AM for this view! 🇮🇹🌅',
    tags: ['Solo', 'Sunrise', 'Budget', 'Photography'],
    destination: 'Matera',
    ratings: { value: 5, authenticity: 5, accessibility: 4, safety: 5, vibe: 5, crowd: 4 },
  },
  {
    id: 3,
    author: { name: 'Alex Rivero', handle: 'alex_rivero', avatar: 'https://i.pravatar.cc/40?img=13', verified: false, location: 'Northern Vietnam' },
    category: 'Off the path',
    categoryTag: 'ADVENTURE',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&q=80',
    freshness: 88,
    visitDate: 'Feb 2024',
    price: 'Free',
    likes: 242,
    comments: 18,
    saved: false,
    liked: true,
    helpful: 89,
    caption: 'Found this incredible waterfall hike near Sapa. Hardly anyone else there. The trail is muddy but 100% worth it for this view.',
    tags: ['Adventure', 'Hiking', 'Off-path'],
    destination: 'Sapa',
    ratings: { value: 5, authenticity: 5, accessibility: 2, safety: 3, vibe: 5, crowd: 5 },
  },
];

export const STORIES = [
  { id: 1, user: 'Your Story', avatar: '', own: true, seen: false },
  { id: 2, user: 'elena_t', avatar: 'https://i.pravatar.cc/56?img=1', seen: false },
  { id: 3, user: 'marco_v', avatar: 'https://i.pravatar.cc/56?img=3', seen: false },
  { id: 4, user: 'sarah_j', avatar: 'https://i.pravatar.cc/56?img=2', seen: true },
  { id: 5, user: 'the_nomad', avatar: 'https://i.pravatar.cc/56?img=8', seen: true },
  { id: 6, user: 'kai_wanders', avatar: 'https://i.pravatar.cc/56?img=12', seen: true },
];

export const TRIBES = [
  { id: 1, name: 'Solo Female Travelers', icon: '👩', members: 14820, joined: true, color: '#EC4899' },
  { id: 2, name: 'Budget Backpackers', icon: '🎒', members: 28340, joined: false, color: '#E8A020' },
  { id: 3, name: 'Digital Nomads', icon: '💻', members: 19200, joined: true, color: '#8B5CF6' },
  { id: 4, name: 'Food Hunters', icon: '🍜', members: 22100, joined: false, color: '#C4622D' },
  { id: 5, name: 'Off the Beaten Path', icon: '🌿', members: 11400, joined: false, color: '#2D5A27' },
  { id: 6, name: 'Family Travelers', icon: '👨‍👩‍👧', members: 9800, joined: false, color: '#1A6B6B' },
  { id: 7, name: 'Adventure Seekers', icon: '🧗', members: 16600, joined: false, color: '#059669' },
  { id: 8, name: 'Cultural Explorers', icon: '🏛️', members: 13300, joined: true, color: '#D97706' },
];

export const SEASONAL_MONTHS = [
  { month: 'Jan', destinations: [{ name: 'Bali', tag: 'Perfect' }, { name: 'Marrakech', tag: 'Great' }, { name: 'Iceland', tag: 'Off-season' }] },
  { month: 'Feb', destinations: [{ name: 'Kyoto', tag: 'Perfect' }, { name: 'Lisbon', tag: 'Great' }, { name: 'Maldives', tag: 'Perfect' }] },
  { month: 'Mar', destinations: [{ name: 'Jordan', tag: 'Perfect' }, { name: 'Colombia', tag: 'Great' }, { name: 'NZ', tag: 'Great' }] },
  { month: 'Apr', destinations: [{ name: 'Japan', tag: 'Perfect' }, { name: 'Morocco', tag: 'Great' }, { name: 'Greece', tag: 'Great' }] },
  { month: 'May', destinations: [{ name: 'Croatia', tag: 'Perfect' }, { name: 'Peru', tag: 'Perfect' }, { name: 'Iceland', tag: 'Great' }] },
  { month: 'Jun', destinations: [{ name: 'Iceland', tag: 'Perfect' }, { name: 'Norway', tag: 'Perfect' }, { name: 'Scotland', tag: 'Great' }] },
  { month: 'Jul', destinations: [{ name: 'Montenegro', tag: 'Perfect' }, { name: 'Georgia', tag: 'Great' }, { name: 'Canada', tag: 'Perfect' }] },
  { month: 'Aug', destinations: [{ name: 'Philippines', tag: 'Great' }, { name: 'Albania', tag: 'Perfect' }, { name: 'Bolivia', tag: 'Perfect' }] },
  { month: 'Sep', destinations: [{ name: 'Vietnam', tag: 'Perfect' }, { name: 'Italy', tag: 'Great' }, { name: 'Nepal', tag: 'Perfect' }] },
  { month: 'Oct', destinations: [{ name: 'Rajasthan', tag: 'Perfect' }, { name: 'Japan', tag: 'Great' }, { name: 'Ethiopia', tag: 'Great' }] },
  { month: 'Nov', destinations: [{ name: 'Sri Lanka', tag: 'Perfect' }, { name: 'Egypt', tag: 'Great' }, { name: 'Mexico', tag: 'Great' }] },
  { month: 'Dec', destinations: [{ name: 'Chiang Mai', tag: 'Perfect' }, { name: 'Goa', tag: 'Great' }, { name: 'Cuba', tag: 'Perfect' }] },
];

export const CHALLENGES = [
  {
    id: 1,
    status: 'active',
    title: 'Hidden Gems June',
    desc: 'Share a spot fewer than 1,000 travelers know about.',
    entries: 1284,
    endsIn: '8 days',
    prize: 'Gold badge + featured post',
    emoji: '💎',
  },
  {
    id: 2,
    status: 'active',
    title: 'Street Food Stories',
    desc: 'Your best street food find with price + photos.',
    entries: 2901,
    endsIn: '21 days',
    prize: 'Silver badge',
    emoji: '🍢',
  },
  {
    id: 3,
    status: 'upcoming',
    title: 'Solo & Thriving July',
    desc: 'Solo travel tips that changed your trip.',
    entries: 0,
    startsIn: '9 days',
    prize: 'Gold badge',
    emoji: '🌟',
  },
  {
    id: 4,
    status: 'ended',
    title: 'Best Sunrise Spots',
    desc: 'Top sunrise views from the community.',
    entries: 4102,
    winner: '@julia_wanders',
    emoji: '🌅',
  },
];

export const COLLAB_TRIPS = [
  {
    id: 1,
    destination: 'Tbilisi → Kazbegi, Georgia',
    dates: 'Jul 14–21, 2024',
    budget: 'Mid-range',
    style: 'Adventure + Culture',
    spotsLeft: 2,
    totalSpots: 4,
    organizer: { name: 'Priya M.', avatar: 'https://i.pravatar.cc/40?img=9' },
    travelers: [
      { name: 'Priya M.', avatar: 'https://i.pravatar.cc/32?img=9', status: 'confirmed' },
      { name: 'Sam K.', avatar: 'https://i.pravatar.cc/32?img=14', status: 'confirmed' },
      { name: 'Open', avatar: '', status: 'open' },
      { name: 'Open', avatar: '', status: 'open' },
    ],
    costEstimate: '£680 pp',
    desc: 'Wine, mountains, ancient monasteries — 8 days in Georgia with a flexible itinerary. Mix of hiking and city days.',
    tags: ['Adventure', 'Culture', 'Mid-budget'],
  },
  {
    id: 2,
    destination: 'Bali Loop',
    dates: 'Aug 3–12, 2024',
    budget: 'Budget',
    style: 'Backpacker',
    spotsLeft: 3,
    totalSpots: 5,
    organizer: { name: 'Tom D.', avatar: 'https://i.pravatar.cc/40?img=7' },
    travelers: [
      { name: 'Tom D.', avatar: 'https://i.pravatar.cc/32?img=7', status: 'confirmed' },
      { name: 'Open', avatar: '', status: 'open' },
    ],
    costEstimate: '£420 pp',
    desc: 'Temples, rice terraces, surf lessons, cooking class. Budget-friendly with hostel stays.',
    tags: ['Budget', 'Beach', 'Culture'],
  },
];

export const PRICE_DATA = [
  { item: 'Coffee / tea', local: '₹30–80', mid: '₹150–300', note: 'Filter coffee cheapest in south', icon: '☕', verified: 1284 },
  { item: 'Street meal', local: '₹60–120', mid: '₹200–400', note: 'Thali best value for money', icon: '🍛', verified: 2102 },
  { item: 'Hostel dorm', local: '₹400–800', mid: '₹1200–2000', note: 'Per night, 6–8 bed dorm', icon: '🛏️', verified: 940 },
  { item: 'Auto-rickshaw', local: '₹20–50/km', mid: 'Meter', note: 'Always negotiate first', icon: '🛺', verified: 1820 },
  { item: 'Beer (local)', local: '₹80–150', mid: '₹250–400', note: 'Cheaper in Goa + HP', icon: '🍺', verified: 721 },
];

export const PHRASES = [
  { phrase: 'Thank you', local: 'Dhanyavaad', pronunciation: 'Dhun-ya-vaad', contributed: 'rahul_t', flag: '🇮🇳' },
  { phrase: 'How much?', local: 'Kitna?', pronunciation: 'Kit-na', contributed: 'priya_m', flag: '🇮🇳' },
  { phrase: 'Where is...?', local: '...kahan hai?', pronunciation: '...kuh-han hai', contributed: 'tom_d', flag: '🇮🇳' },
  { phrase: 'Delicious!', local: 'Bahut achha!', pronunciation: 'Ba-hut ach-ha', contributed: 'elena_r', flag: '🇮🇳' },
];

export const EXPLORER_RANKS = [
  { rank: 'Wanderer', icon: '🌱', color: '#6B7280', min: 0, maxPosts: 5, maxCountries: 3 },
  { rank: 'Pathfinder', icon: '🧭', color: '#1A6B6B', minPosts: 5, maxPosts: 25, minCountries: 3, maxCountries: 10 },
  { rank: 'Nomad', icon: '🌏', color: '#C4622D', minPosts: 25, maxPosts: 75, minCountries: 10, maxCountries: 25 },
  { rank: 'Legendary Explorer', icon: '⭐', color: '#8B5CF6', minPosts: 75, minCountries: 25 },
];

export const PROFILE_DATA = {
  name: 'Sarah Johnson',
  handle: '@sarah_j',
  avatar: 'https://i.pravatar.cc/80?img=2',
  bio: 'Solo traveler, street food addict. 32 countries and counting 🌍',
  rank: 'Nomad',
  rankIcon: '🌏',
  rankProgress: 68,
  nextRank: 'Legendary Explorer',
  stats: { countries: 32, posts: 47, helpful: 1240 },
  travelStyle: ['Solo', 'Budget', 'Off-path', 'Foodie', 'Culture'],
  countriesVisited: ['JP', 'TH', 'ID', 'VN', 'IN', 'IT', 'FR', 'GR', 'TR', 'GE', 'PE', 'CO', 'MX', 'MA', 'TN', 'ET', 'TZ'],
  badges: [
    { name: 'Verified Visitor', icon: '✅', color: '#1A6B6B' },
    { name: 'Asia Explorer', icon: '🌏', color: '#C4622D' },
    { name: 'Top Contributor', icon: '🏆', color: '#E8A020' },
    { name: 'Hidden Gem Hunter', icon: '💎', color: '#8B5CF6' },
  ],
  posts: [
    'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=70',
    'https://images.unsplash.com/photo-1523365154888-8a758819b722?w=200&q=70',
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=70',
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=200&q=70',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&q=70',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=200&q=70',
  ],
};

export const SUBSCRIPTION_FEATURES = {
  free: ['5 saves/month', 'Basic search', 'Community feed', 'Post creation', 'Public tribe access'],
  plus: ['Unlimited offline downloads', 'Unlimited saves', 'Ad-free experience', 'AI Smart Q&A', 'Expert-curated guides', 'Priority support', 'Revenue share (Legendary rank)', 'Early feature access'],
};
