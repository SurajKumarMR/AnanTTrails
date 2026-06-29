'use client';
import React, { useState } from 'react';
import { STORIES, TRAVELER_TYPES, TRENDING_DESTINATIONS, COMMUNITY_POSTS } from '@/data/mockData';

// ── Icons (inline SVG helpers) ───────────────────────────────────────────────
const Heart = ({ filled, size = 20 }: { filled?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#E53E3E' : 'none'} stroke={filled ? '#E53E3E' : 'currentColor'} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const MessageCircle = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const Share2 = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const Bookmark = ({ filled, size = 20 }: { filled?: boolean; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>
);
const CheckCircle = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1A6B6B" stroke="white" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10" fill="#1A6B6B"/>
    <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2.5" fill="none"/>
  </svg>
);
const ThumbsUp = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  </svg>
);
const Zap = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);

interface Post {
  id: number;
  author: { name: string; handle: string; avatar: string; verified: boolean; location: string };
  category: string;
  categoryTag: string;
  image: string;
  freshness: number;
  visitDate: string;
  price: string;
  likes: number;
  comments: number;
  saved: boolean;
  liked: boolean;
  helpful: number;
  caption: string;
  tags: string[];
  destination: string;
  ratings: Record<string, number>;
}

function StoryBubble({ story }: { story: typeof STORIES[0] }) {
  const [seen, setSeen] = useState(story.seen);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }} onClick={() => setSeen(true)}>
      <div className={`story-ring ${seen ? 'seen' : ''}`} style={{ width: 60, height: 60, borderRadius: '50%' }}>
        {story.own ? (
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#1A6B6B,#C4622D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white' }}>+</div>
        ) : (
          <img src={story.avatar} alt={story.user} style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' }} />
        )}
      </div>
      <span style={{ fontSize: 11, color: 'var(--mid)', maxWidth: 58, textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{story.user}</span>
    </div>
  );
}

function TrendingCard({ dest, onClick }: { dest: typeof TRENDING_DESTINATIONS[0]; onClick?: () => void }) {
  return (
    <div className="card card-hover" style={{ minWidth: 160, flexShrink: 0, overflow: 'hidden' }} onClick={onClick}>
      <div style={{ position: 'relative', height: 110 }}>
        <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
        <span style={{ position: 'absolute', top: 8, left: 8, background: 'var(--terracotta)', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99, letterSpacing: 0.5 }}>{dest.category.toUpperCase()}</span>
      </div>
      <div style={{ padding: '8px 10px 10px' }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{dest.name}</div>
        <div style={{ color: 'var(--mid)', fontSize: 12 }}>{dest.country}</div>
        <div style={{ color: 'var(--teal)', fontSize: 11, marginTop: 2 }}>{dest.posts.toLocaleString()} posts</div>
      </div>
    </div>
  );
}

function PostCard({ post: initialPost, onSelect }: { post: Post; onSelect: () => void }) {
  const [post, setPost] = useState(initialPost);
  const [expanded, setExpanded] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPost(p => ({ ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }));
    if (!post.liked) { setHeartAnim(true); setTimeout(() => setHeartAnim(false), 400); }
  };
  
  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPost(p => ({ ...p, saved: !p.saved }));
  };

  const catColor: Record<string, string> = {
    'Eat & drink': '#C4622D', 'Discover': '#1A6B6B', 'Off the path': '#2D5A27',
    'Stay': '#2D5A27', 'Insider tips': '#8B5CF6', 'Getting around': '#E8A020',
    'Day trips': '#D97706', 'Budget guide': '#059669',
  };

  return (
    <div className="post-card fade-in" style={{ cursor: 'pointer' }} onClick={onSelect}>
      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <img src={post.author.avatar} alt={post.author.name} className="avatar" style={{ width: 40, height: 40 }} />
            {post.author.verified && <span style={{ position: 'absolute', bottom: -2, right: -2 }}><CheckCircle size={14} /></span>}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>{post.author.name}</div>
            <div style={{ color: 'var(--mid)', fontSize: 12 }}>📍 {post.author.location}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="badge badge-fresh"><Zap size={10} />{post.freshness}% fresh</span>
        </div>
      </div>

      {/* Category tags */}
      <div style={{ display: 'flex', gap: 6, padding: '0 16px 10px' }}>
        <span className="chip" style={{ background: catColor[post.category] + '18', color: catColor[post.category], borderColor: catColor[post.category] + '40', fontSize: 11 }}>{post.category.toUpperCase()}</span>
        <span className="chip chip-terra" style={{ fontSize: 11 }}>{post.categoryTag}</span>
      </div>

      {/* Hero image */}
      <div style={{ position: 'relative' }}>
        <img src={post.image} alt="" className="post-hero" />
        <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 6 }}>
          <span className="badge" style={{ background: 'rgba(0,0,0,0.55)', color: 'white', backdropFilter: 'blur(4px)' }}>📅 {post.visitDate}</span>
          <span className="badge" style={{ background: 'rgba(0,0,0,0.55)', color: 'white', backdropFilter: 'blur(4px)' }}>💰 {post.price}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button className={`post-action-btn ${post.liked ? 'liked' : ''}`} onClick={toggleLike}>
          <span className={heartAnim ? 'heart-pop' : ''}><Heart filled={post.liked} size={20} /></span>
          <span>{post.likes.toLocaleString()}</span>
        </button>
        <button className="post-action-btn" onClick={(e) => { e.stopPropagation(); onSelect(); }}><MessageCircle size={20} /><span>{post.comments}</span></button>
        <button className="post-action-btn" onClick={(e) => { e.stopPropagation(); }}><Share2 size={20} /></button>
        <button className="post-action-btn" style={{ marginLeft: 'auto', color: post.saved ? 'var(--teal)' : undefined }} onClick={toggleSave}>
          <Bookmark filled={post.saved} size={20} />
        </button>
      </div>

      {/* Helpful */}
      <div style={{ padding: '6px 16px', color: 'var(--mid)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
        <ThumbsUp size={12} /> <span style={{ color: 'var(--teal)', fontWeight: 600 }}>{post.helpful.toLocaleString()}</span> travelers found this helpful
      </div>

      {/* Caption */}
      <div style={{ padding: '0 16px 8px' }}>
        <span style={{ fontSize: 14, lineHeight: 1.5 }}>
          <strong>{post.author.handle}</strong>{' '}
          {expanded ? post.caption : post.caption.slice(0, 100) + (post.caption.length > 100 ? '...' : '')}
          {post.caption.length > 100 && (
            <span style={{ color: 'var(--mid)', cursor: 'pointer', fontWeight: 600 }} onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
              {expanded ? ' less' : ' more'}
            </span>
          )}
        </span>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, padding: '0 16px 14px', flexWrap: 'wrap' }}>
        {post.tags.map(t => <span key={t} className="chip chip-default" style={{ fontSize: 11 }}>#{t}</span>)}
      </div>
    </div>
  );
}

interface ExploreScreenProps {
  onNavigate: (screen: string) => void;
  onSelectPost: (id: number) => void;
  onSelectDestination: (name: string) => void;
}

export default function ExploreScreen({ onNavigate, onSelectPost, onSelectDestination }: ExploreScreenProps) {
  const [activePersona, setActivePersona] = useState('all');
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  });

  return (
    <div>
      {/* Stories */}
      <div style={{ background: 'var(--white)', padding: '12px 16px 14px', borderBottom: '1px solid var(--border-light)' }}>
        <div className="scroll-row" style={{ gap: 14 }}>
          {STORIES.map(s => <StoryBubble key={s.id} story={s} />)}
        </div>
      </div>

      {/* Greeting + search */}
      <div style={{ padding: '20px 16px 14px' }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{greeting} 👋</div>
        <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 14 }}>Where next?</div>
        <div className="search-bar" onClick={() => onNavigate('search')} style={{ cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--mid-light)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input readOnly placeholder="Search destinations, tips, stories…" />
        </div>
      </div>

      {/* Persona chips */}
      <div style={{ padding: '0 16px 16px' }}>
        <div className="scroll-row">
          {TRAVELER_TYPES.map(t => (
            <button key={t.id} className={`chip ${activePersona === t.id ? 'chip-active' : 'chip-default'}`} onClick={() => setActivePersona(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div style={{ padding: '0 16px 16px' }}>
        <div className="section-header">
          <span className="section-title">Trending this week</span>
          <span className="see-all" onClick={() => onNavigate('search')}>See all →</span>
        </div>
        <div className="scroll-row">
          {TRENDING_DESTINATIONS.map(d => (
            <TrendingCard key={d.id} dest={d} onClick={() => onSelectDestination(d.name)} />
          ))}
        </div>
      </div>

      {/* Seasonal Banner */}
      <div style={{ margin: '0 16px 16px', cursor: 'pointer' }} onClick={() => onNavigate('seasonal')}>
        <div style={{ background: 'linear-gradient(135deg, var(--teal) 0%, var(--mountain-green) 100%)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 2 }}>📅 Seasonal Guide</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Best spots for June</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>10 destinations handpicked</div>
          </div>
          <span style={{ fontSize: 32 }}>☀️</span>
        </div>
      </div>

      {/* Trail Tribes Banner */}
      <div style={{ margin: '0 16px 16px', cursor: 'pointer' }} onClick={() => onNavigate('tribes')}>
        <div style={{ background: 'linear-gradient(135deg, var(--terracotta) 0%, #8B2FC9 100%)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 2 }}>👥 Trail Tribes</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Find your travel crew</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>8 tribes, 100k+ members</div>
          </div>
          <span style={{ fontSize: 32 }}>🏕️</span>
        </div>
      </div>

      {/* Monthly Challenge Banner */}
      <div style={{ margin: '0 16px 16px', cursor: 'pointer' }} onClick={() => onNavigate('challenges')}>
        <div style={{ background: 'linear-gradient(135deg, var(--sunrise-gold) 0%, var(--terracotta) 100%)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 2 }}>🏆 Monthly Challenge</div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Hidden Gems June</div>
            <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>1,284 entries · 8 days left</div>
          </div>
          <span style={{ fontSize: 32 }}>💎</span>
        </div>
      </div>

      {/* Community feed */}
      <div style={{ padding: '0 16px 8px' }}>
        <div className="section-header">
          <span className="section-title">Fresh from the community</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '0 16px 20px' }}>
        {COMMUNITY_POSTS.map(p => (
          <PostCard key={p.id} post={p} onSelect={() => onSelectPost(p.id)} />
        ))}
      </div>
    </div>
  );
}
