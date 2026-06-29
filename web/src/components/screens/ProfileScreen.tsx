'use client';
import React, { useState } from 'react';
import { PROFILE_DATA, EXPLORER_RANKS, SUBSCRIPTION_FEATURES } from '@/data/mockData';

const VISITED_COUNTRIES = ['JP', 'TH', 'ID', 'VN', 'IN', 'IT', 'FR', 'GR', 'TR', 'GE', 'PE', 'CO', 'MX', 'MA', 'TN', 'ET', 'TZ'];

type SubScreen = null | 'offline' | 'plus' | 'rank';

export default function ProfileScreen() {
  const p = PROFILE_DATA;
  const [sub, setSub] = useState<SubScreen>(null);

  if (sub === 'offline') return <OfflineScreen onBack={() => setSub(null)} />;
  if (sub === 'plus') return <PlusScreen onBack={() => setSub(null)} />;
  if (sub === 'rank') return <RankScreen onBack={() => setSub(null)} />;

  return (
    <div>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, var(--teal) 0%, var(--mountain-green) 100%)', padding: '24px 20px 20px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src={p.avatar} alt={p.name} style={{ width: 72, height: 72, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.8)', objectFit: 'cover' }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 20 }}>{p.name}</div>
              <div style={{ opacity: 0.8, fontSize: 13 }}>{p.handle}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 99, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{p.rankIcon} {p.rank}</span>
              </div>
            </div>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
        </div>
        <div style={{ opacity: 0.85, fontSize: 13, marginBottom: 14 }}>{p.bio}</div>
        {/* Stats */}
        <div style={{ display: 'flex', gap: 0, background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)' }}>
          {[['🌍', p.stats.countries, 'Countries'], ['📝', p.stats.posts, 'Posts'], ['👍', p.stats.helpful.toLocaleString(), 'Helpful']].map(([icon, val, label]) => (
            <div key={label as string} style={{ flex: 1, textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontWeight: 800, fontSize: 20 }}>{icon} {val}</div>
              <div style={{ opacity: 0.75, fontSize: 11 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rank progress */}
      <div style={{ padding: '16px', background: 'var(--white)', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Progress to {p.nextRank}</div>
          <button onClick={() => setSub('rank')} style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none' }}>View ranks →</button>
        </div>
        <div className="progress-bar" style={{ height: 8, marginBottom: 6 }}>
          <div className="progress-fill" style={{ width: `${p.rankProgress}%`, height: '100%' }} />
        </div>
        <div style={{ fontSize: 12, color: 'var(--mid)' }}>{p.rankProgress}% — keep posting and exploring!</div>
      </div>

      {/* World map */}
      <div style={{ padding: '16px', background: 'var(--white)', marginTop: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>🗺️ My travel passport</div>
        <div style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #E0F2F1 100%)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: 12, minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 8 }}>🌍 {p.stats.countries} countries visited</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
            {VISITED_COUNTRIES.map(c => (
              <span key={c} style={{ background: 'var(--teal)', color: 'white', borderRadius: 4, padding: '2px 7px', fontSize: 11, fontWeight: 700 }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Travel style */}
      <div style={{ padding: '0 16px 16px', background: 'var(--white)' }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Travel style</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.travelStyle.map(t => <span key={t} className="chip chip-active" style={{ fontSize: 12 }}>{t}</span>)}
        </div>
      </div>

      {/* Badges */}
      <div style={{ padding: '16px', background: 'var(--white)', marginTop: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Badges</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {p.badges.map(b => (
            <div key={b.name} style={{ background: b.color + '18', border: `1px solid ${b.color}40`, borderRadius: 'var(--radius-md)', padding: '10px 14px', textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{b.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: b.color }}>{b.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div style={{ padding: '16px', background: 'var(--white)', marginTop: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Quick access</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: '📥', label: 'Offline mode', sub: 'offline' as SubScreen },
            { icon: '⭐', label: 'AnanTTrails+', sub: 'plus' as SubScreen },
            { icon: '✈️', label: 'My Collabs', sub: null },
            { icon: '🏆', label: 'Challenges', sub: null },
          ].map(item => (
            <button key={item.label} onClick={() => item.sub && setSub(item.sub)} style={{ background: 'var(--border-light)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <div style={{ padding: '16px', marginTop: 8 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>My posts</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4 }}>
          {p.posts.map((img, i) => (
            <div key={i} style={{ aspectRatio: '1', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OfflineScreen({ onBack }: { onBack: () => void }) {
  const [toggle, setToggle] = useState(true);
  const downloads = [
    { name: 'Kyoto, Japan', size: '42 MB', updated: '2 days ago' },
    { name: 'Bali, Indonesia', size: '38 MB', updated: '1 week ago' },
    { name: 'Chiang Mai, Thailand', size: '29 MB', updated: '3 days ago' },
  ];
  return (
    <div>
      <div style={{ background: 'var(--white)', padding: '14px 16px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{ fontSize: 20, color: 'var(--mid)', cursor: 'pointer', background: 'none', border: 'none' }}>←</button>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Offline Mode</div>
        <button onClick={() => setToggle(t => !t)} style={{ marginLeft: 'auto', background: toggle ? 'var(--teal)' : 'var(--border)', border: 'none', borderRadius: 99, width: 48, height: 26, cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
          <div style={{ width: 20, height: 20, background: 'white', borderRadius: '50%', position: 'absolute', top: 3, left: toggle ? 25 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
        </button>
      </div>
      <div style={{ padding: '16px' }}>
        <div style={{ background: toggle ? 'var(--teal-faint)' : 'var(--border-light)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 16, color: toggle ? 'var(--teal)' : 'var(--mid)', fontWeight: 600, fontSize: 14 }}>
          {toggle ? '✅ Offline mode is ON' : '⚪ Offline mode is OFF'}
        </div>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Downloaded destinations</div>
        {downloads.map(d => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</div>
              <div style={{ color: 'var(--mid)', fontSize: 12 }}>{d.size} · Updated {d.updated}</div>
            </div>
            <button style={{ color: 'var(--terracotta)', fontSize: 12, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
          </div>
        ))}
        <div style={{ marginTop: 16, padding: '12px', background: 'var(--border-light)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--mid)' }}>
          📦 Storage used: 109 MB of 500 MB
        </div>
        <button className="btn btn-primary" style={{ width: '100%', marginTop: 14 }}>+ Download more destinations</button>
      </div>
    </div>
  );
}

function PlusScreen({ onBack }: { onBack: () => void }) {
  const [plan, setPlan] = useState<'monthly' | 'annual'>('annual');
  return (
    <div>
      <div style={{ background: 'var(--white)', padding: '14px 16px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{ fontSize: 20, color: 'var(--mid)', cursor: 'pointer', background: 'none', border: 'none' }}>←</button>
        <div style={{ fontWeight: 700, fontSize: 16 }}>AnanTTrails+</div>
      </div>
      <div style={{ padding: '24px 16px 0', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>⭐</div>
        <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Go Plus</div>
        <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 20 }}>Support the community. Travel smarter.</div>
        <div className="toggle-wrap" style={{ display: 'inline-flex', marginBottom: 20 }}>
          <button className={`toggle-opt ${plan === 'monthly' ? 'active' : ''}`} onClick={() => setPlan('monthly')}>Monthly</button>
          <button className={`toggle-opt ${plan === 'annual' ? 'active' : ''}`} onClick={() => setPlan('annual')}>Annual · Save 33%</button>
        </div>
        <div style={{ background: 'linear-gradient(135deg, var(--teal), var(--mountain-green))', borderRadius: 'var(--radius-xl)', padding: '24px', color: 'white', marginBottom: 16 }}>
          <div style={{ fontSize: 36, fontWeight: 800 }}>{plan === 'monthly' ? '£4.99' : '£39.99'}</div>
          <div style={{ opacity: 0.8, fontSize: 13 }}>{plan === 'monthly' ? 'per month' : 'per year (£3.33/mo)'}</div>
        </div>
      </div>
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--teal)', marginBottom: 8 }}>⭐ Plus includes</div>
            {SUBSCRIPTION_FEATURES.plus.map(f => <div key={f} style={{ fontSize: 12, marginBottom: 6, display: 'flex', gap: 6 }}><span style={{ color: 'var(--teal)' }}>✓</span>{f}</div>)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--mid)', marginBottom: 8 }}>Free tier</div>
            {SUBSCRIPTION_FEATURES.free.map(f => <div key={f} style={{ fontSize: 12, marginBottom: 6, display: 'flex', gap: 6 }}><span style={{ color: 'var(--mid-light)' }}>·</span>{f}</div>)}
          </div>
        </div>
        <button className="btn btn-terra" style={{ width: '100%', fontSize: 15, marginBottom: 10 }}>Start 7-day free trial</button>
        <div style={{ fontSize: 11, color: 'var(--mid)', textAlign: 'center', marginBottom: 14 }}>No commitment · Cancel anytime</div>
        <div style={{ background: 'var(--border-light)', borderRadius: 'var(--radius-md)', padding: '12px 14px', fontSize: 12, color: 'var(--mid)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--dark)' }}>💡 How we fund AnanTTrails:</strong> Subscriptions + expert guides (Legendary Explorers) + clearly-marked affiliate links. No hidden ads. No selling your data.
        </div>
      </div>
    </div>
  );
}

function RankScreen({ onBack }: { onBack: () => void }) {
  const ranks = [
    { name: 'Wanderer', icon: '🌱', color: '#6B7280', bg: '#F3F4F6', req: 'Join the community', perks: ['Access to community feed', 'Create posts', 'Join tribes'] },
    { name: 'Pathfinder', icon: '🧭', color: '#1A6B6B', bg: '#E8F5F5', req: '5+ posts · 3+ countries', perks: ['Verified badge', 'Priority comments', 'Access to tribe events'] },
    { name: 'Nomad', icon: '🌏', color: '#C4622D', bg: '#FDF0EA', req: '25+ posts · 10+ countries', perks: ['Featured posts', 'Collab trip organizer', 'Seasonal guide access'] },
    { name: 'Legendary Explorer', icon: '⭐', color: '#8B5CF6', bg: '#F3F0FF', req: '75+ posts · 25+ countries · verified', perks: ['Publish expert guides', 'Revenue share (20%)', 'Priority support', 'Shape app features'] },
  ];
  return (
    <div>
      <div style={{ background: 'var(--white)', padding: '14px 16px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{ fontSize: 20, color: 'var(--mid)', cursor: 'pointer', background: 'none', border: 'none' }}>←</button>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Explorer Ranks</div>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {ranks.map((r, i) => (
          <div key={r.name} style={{ background: r.bg, border: `1.5px solid ${r.color}30`, borderRadius: 'var(--radius-lg)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 28 }}>{r.icon}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: r.color }}>{r.name}</div>
                <div style={{ fontSize: 12, color: 'var(--mid)' }}>{r.req}</div>
              </div>
              {i === 2 && <span style={{ marginLeft: 'auto', background: r.color, color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99 }}>YOUR RANK</span>}
            </div>
            {r.perks.map(p => (
              <div key={p} style={{ fontSize: 13, display: 'flex', gap: 6, marginBottom: 4 }}>
                <span style={{ color: r.color }}>✓</span>{p}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
