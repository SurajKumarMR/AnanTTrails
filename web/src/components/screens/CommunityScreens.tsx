'use client';
import React, { useState } from 'react';
import { TRIBES, SEASONAL_MONTHS, CHALLENGES, PRICE_DATA, PHRASES } from '@/data/mockData';

// ── Travel Tribes ─────────────────────────────────────────────────────────────
export function TribesScreen() {
  const [joined, setJoined] = useState<number[]>([1, 3, 8]);
  const toggle = (id: number) => setJoined(j => j.includes(id) ? j.filter(x => x !== id) : [...j, id]);

  return (
    <div style={{ padding: '16px' }}>
      <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Trail Tribes 🏕️</div>
      <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>Find your people. Travel your way.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {TRIBES.map(tribe => (
          <div key={tribe.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px' }}>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: tribe.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{tribe.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{tribe.name}</div>
              <div style={{ color: 'var(--mid)', fontSize: 12 }}>{tribe.members.toLocaleString()} members</div>
            </div>
            <button onClick={() => toggle(tribe.id)} className={`btn ${joined.includes(tribe.id) ? 'btn-outline' : 'btn-primary'}`} style={{ padding: '6px 14px', fontSize: 12 }}>
              {joined.includes(tribe.id) ? 'Joined ✓' : 'Join'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Seasonal Guide ────────────────────────────────────────────────────────────
export function SeasonalScreen() {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const tagColor: Record<string, string> = { Perfect: '#2D5A27', Great: '#1A6B6B', 'Off-season': '#6B7280' };
  const tagBg: Record<string, string> = { Perfect: '#EDF4EC', Great: '#E8F5F5', 'Off-season': '#F3F4F6' };

  return (
    <div>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Seasonal Guide 📅</div>
        <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>Best destinations month by month</div>
        <div className="scroll-row" style={{ gap: 8, marginBottom: 16 }}>
          {SEASONAL_MONTHS.map((m, i) => (
            <button key={m.month} className={`chip ${activeMonth === i ? 'chip-active' : 'chip-default'}`} onClick={() => setActiveMonth(i)} style={{ fontSize: 12 }}>{m.month}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SEASONAL_MONTHS[activeMonth].destinations.map(dest => (
          <div key={dest.name} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{dest.name}</div>
            <span style={{ background: tagBg[dest.tag] || '#F3F4F6', color: tagColor[dest.tag] || '#6B7280', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 99 }}>{dest.tag}</span>
          </div>
        ))}
        <div style={{ background: 'var(--teal-faint)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', border: '1px solid var(--teal)30' }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--teal)', marginBottom: 4 }}>🌟 Community tip for {SEASONAL_MONTHS[activeMonth].month}</div>
          <div style={{ fontSize: 13, color: 'var(--mid)' }}>Community-verified picks based on real traveler reports from the past 3 months.</div>
        </div>
      </div>
    </div>
  );
}

// ── Monthly Challenges ────────────────────────────────────────────────────────
export function ChallengesScreen() {
  const [entered, setEntered] = useState<number[]>([]);
  return (
    <div style={{ padding: '16px' }}>
      <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Monthly Challenges 🏆</div>
      <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>Share stories. Earn badges. Get featured.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {CHALLENGES.map(c => (
          <div key={c.id} className="card" style={{ padding: '16px', border: `1.5px solid ${c.status === 'active' ? 'var(--teal)30' : c.status === 'upcoming' ? 'var(--sunrise-gold)40' : 'var(--border)'}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28 }}>{c.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--mid)', marginTop: 2 }}>{c.desc}</div>
                </div>
              </div>
              <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 99, background: c.status === 'active' ? '#EDF4EC' : c.status === 'upcoming' ? '#FEF9ED' : 'var(--border-light)', color: c.status === 'active' ? 'var(--mountain-green)' : c.status === 'upcoming' ? 'var(--sunrise-gold)' : 'var(--mid)' }}>
                {c.status.toUpperCase()}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 12, color: 'var(--mid)' }}>
                {c.status === 'active' && `🔥 ${c.entries?.toLocaleString()} entries · ${c.endsIn} left`}
                {c.status === 'upcoming' && `⏰ Starts in ${c.startsIn}`}
                {c.status === 'ended' && `🏅 ${c.entries?.toLocaleString()} entries · Winner: ${c.winner}`}
              </div>
              {c.status === 'active' && (
                <button className={`btn ${entered.includes(c.id) ? 'btn-ghost' : 'btn-primary'}`} style={{ fontSize: 12, padding: '6px 14px' }} onClick={() => setEntered(e => e.includes(c.id) ? e : [...e, c.id])}>
                  {entered.includes(c.id) ? '✓ Entered' : 'Enter'}
                </button>
              )}
            </div>
            {c.prize && <div style={{ fontSize: 12, color: 'var(--sunrise-gold)', fontWeight: 600, marginTop: 6 }}>🏆 Prize: {c.prize}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Practical Tools ────────────────────────────────────────────────────────────
export function ToolsScreen() {
  const [activeTool, setActiveTool] = useState<'price' | 'phrases' | 'visa' | 'ai'>('price');
  const [aiQuery, setAiQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const askAI = () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiAnswer(`Based on 847 community posts about ${aiQuery || 'this topic'}: Travelers recommend arriving early morning to avoid crowds. Budget travelers report spending around £15-20/day including accommodation. The community rates safety 4.8/5 — solo travelers report feeling very safe. 3 recent posts mention a new direct bus route that's much cheaper than taxis.\n\n*Sourced from verified community posts, last updated 2 days ago.*`);
      setAiLoading(false);
    }, 1800);
  };

  return (
    <div>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Practical Tools 🛠️</div>
        <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 14 }}>Community-verified travel intelligence</div>
        <div className="scroll-row" style={{ gap: 8, marginBottom: 0 }}>
          {[['price', '💰 Prices'], ['phrases', '💬 Phrases'], ['visa', '🛂 Visa'], ['ai', '🤖 Smart Q&A']].map(([id, label]) => (
            <button key={id} className={`chip ${activeTool === id ? 'chip-active' : 'chip-default'}`} onClick={() => setActiveTool(id as typeof activeTool)} style={{ fontSize: 12 }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {activeTool === 'price' && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Community price checker · India</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {PRICE_DATA.map(item => (
                <div key={item.item} className="card" style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{item.item}</div>
                        <div style={{ fontSize: 11, color: 'var(--mid)', marginTop: 2 }}>{item.note}</div>
                        <div style={{ fontSize: 11, color: 'var(--mid)', marginTop: 1 }}>✅ {item.verified.toLocaleString()} verified</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: 'var(--teal)', fontSize: 14 }}>{item.local}</div>
                      <div style={{ fontSize: 11, color: 'var(--mid)' }}>local</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline" style={{ width: '100%' }}>+ Submit a price</button>
          </div>
        )}

        {activeTool === 'phrases' && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Hindi phrase cheat sheet</div>
            {PHRASES.map(p => (
              <div key={p.phrase} className="card" style={{ padding: '12px 14px', marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{p.phrase}</div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--teal)', margin: '2px 0' }}>{p.local}</div>
                    <div style={{ fontSize: 12, color: 'var(--mid)' }}>🔊 {p.pronunciation}</div>
                  </div>
                  <span style={{ fontSize: 20 }}>{p.flag}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--mid)', marginTop: 6 }}>Added by @{p.contributed}</div>
              </div>
            ))}
            <button className="btn btn-outline" style={{ width: '100%', marginTop: 8 }}>+ Contribute a phrase</button>
          </div>
        )}

        {activeTool === 'visa' && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Visa & Entry Guide</div>
            <div className="card" style={{ padding: '14px', marginBottom: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Your nationality</div>
              <select className="input-field">
                <option>🇬🇧 United Kingdom</option>
                <option>🇺🇸 United States</option>
                <option>🇮🇳 India</option>
                <option>🇦🇺 Australia</option>
              </select>
            </div>
            {[['🇯🇵 Japan', 'Visa-free · 90 days', '✅ No visa required', 'Passport valid 6+ months'], ['🇹🇭 Thailand', 'Visa-free · 30 days', '✅ No visa required', 'May extend to 60 days on arrival'], ['🇮🇩 Indonesia', 'Visa on arrival · 30 days', '⚠️ USD 35 on arrival', 'Extendable once']].map(([dest, type, status, note]) => (
              <div key={dest} className="card" style={{ padding: '12px 14px', marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{dest}</div>
                  <span style={{ background: status.startsWith('✅') ? '#EDF4EC' : '#FEF9ED', color: status.startsWith('✅') ? 'var(--mountain-green)' : 'var(--sunrise-gold)', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 99 }}>{type}</span>
                </div>
                <div style={{ fontSize: 13, color: status.startsWith('✅') ? 'var(--mountain-green)' : 'var(--terracotta)', marginTop: 4 }}>{status}</div>
                <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 2 }}>{note}</div>
                <div style={{ fontSize: 11, color: 'var(--mid)', marginTop: 4 }}>✅ Community verified · 2 days ago</div>
              </div>
            ))}
          </div>
        )}

        {activeTool === 'ai' && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Smart Q&A 🤖</div>
            <div style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 14 }}>AI answers citing real community posts</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <input className="input-field" value={aiQuery} onChange={e => setAiQuery(e.target.value)} placeholder="Ask anything about your destination…" style={{ flex: 1 }} onKeyDown={e => e.key === 'Enter' && askAI()} />
              <button className="btn btn-primary" style={{ padding: '10px 16px' }} onClick={askAI}>Ask</button>
            </div>
            {aiLoading && (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--mid)' }}>
                <div style={{ fontSize: 24, marginBottom: 8, animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚙️</div>
                <div>Searching community posts…</div>
              </div>
            )}
            {aiAnswer && !aiLoading && (
              <div className="card" style={{ padding: '16px' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--teal)', marginBottom: 8 }}>🤖 AI Answer (powered by Claude)</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{aiAnswer}</div>
              </div>
            )}
            {!aiAnswer && !aiLoading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Is Kyoto safe for solo female travelers?', 'What\'s the cheapest way to get from Bangkok to Chiang Mai?', 'Best time to visit Bali?'].map(q => (
                  <button key={q} onClick={() => { setAiQuery(q); }} style={{ background: 'var(--border-light)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px 14px', fontSize: 13, cursor: 'pointer', textAlign: 'left', color: 'var(--dark)' }}>{q}</button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
