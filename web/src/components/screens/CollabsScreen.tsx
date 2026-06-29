'use client';
import React, { useState } from 'react';
import { COLLAB_TRIPS } from '@/data/mockData';

type Tab = 'browse' | 'mytrips';

export default function CollabsScreen() {
  const [tab, setTab] = useState<Tab>('browse');
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    const trip = COLLAB_TRIPS[selected];
    return <TripDetail trip={trip} onBack={() => setSelected(null)} />;
  }

  if (showCreate) return <CreateCollab onBack={() => setShowCreate(false)} />;

  return (
    <div>
      <div style={{ background: 'var(--white)', padding: '16px', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontWeight: 800, fontSize: 20 }}>Collaborative Trips</div>
          <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 13 }} onClick={() => setShowCreate(true)}>+ New trip</button>
        </div>
        <div className="toggle-wrap" style={{ display: 'inline-flex' }}>
          <button className={`toggle-opt ${tab === 'browse' ? 'active' : ''}`} onClick={() => setTab('browse')}>Browse trips</button>
          <button className={`toggle-opt ${tab === 'mytrips' ? 'active' : ''}`} onClick={() => setTab('mytrips')}>My trips</button>
        </div>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {tab === 'browse' ? (
          COLLAB_TRIPS.map((trip, i) => (
            <div key={trip.id} className="card card-hover" style={{ padding: '16px' }} onClick={() => setSelected(i)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{trip.destination}</div>
                  <div style={{ color: 'var(--mid)', fontSize: 13, marginTop: 2 }}>📅 {trip.dates}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ background: trip.spotsLeft <= 1 ? 'var(--terracotta-faint)' : 'var(--teal-faint)', color: trip.spotsLeft <= 1 ? 'var(--terracotta)' : 'var(--teal)', borderRadius: 99, padding: '4px 10px', fontSize: 12, fontWeight: 700 }}>
                    {trip.spotsLeft} spot{trip.spotsLeft !== 1 ? 's' : ''} left
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 10, lineHeight: 1.5 }}>{trip.desc.slice(0, 90)}…</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {trip.tags.map(t => <span key={t} className="chip chip-default" style={{ fontSize: 11 }}>{t}</span>)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={trip.organizer.avatar} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{trip.organizer.name}</span>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--teal)', fontSize: 14 }}>{trip.costEstimate}</div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--mid)' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>✈️</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>No trips yet</div>
            <div style={{ fontSize: 13, marginBottom: 16 }}>Join or create your first collaborative trip</div>
            <button className="btn btn-primary" onClick={() => setTab('browse')}>Browse open trips</button>
          </div>
        )}
      </div>
    </div>
  );
}

function TripDetail({ trip, onBack }: { trip: typeof COLLAB_TRIPS[0]; onBack: () => void }) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div>
      <div style={{ background: 'var(--white)', padding: '14px 16px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{ fontSize: 20, color: 'var(--mid)', cursor: 'pointer', background: 'none', border: 'none' }}>←</button>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{trip.destination}</div>
      </div>
      <div style={{ padding: '16px' }}>
        {/* Details */}
        <div className="card" style={{ padding: '16px', marginBottom: 14 }}>
          {[['📅 Dates', trip.dates], ['💰 Budget', trip.budget], ['🎒 Style', trip.style], ['💵 Estimate', trip.costEstimate]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)', fontSize: 14 }}>
              <span style={{ color: 'var(--mid)' }}>{k}</span>
              <span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Rough plan */}
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Rough plan</div>
        <div style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.6, marginBottom: 14 }}>{trip.desc}</div>

        {/* Travelers */}
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Travelers ({trip.travelers.filter(t => t.status !== 'open').length}/{trip.totalSpots})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {trip.travelers.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {t.avatar ? <img src={t.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} /> : <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>?</div>}
                <span style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: t.status === 'confirmed' ? 'var(--mountain-green)' : t.status === 'open' ? 'var(--mid-light)' : 'var(--sunrise-gold)', background: t.status === 'confirmed' ? '#EDF4EC' : t.status === 'open' ? 'var(--border-light)' : '#FEF9ED', padding: '3px 8px', borderRadius: 99 }}>
                {t.status}
              </span>
            </div>
          ))}
        </div>

        {/* Trip chat stub */}
        <div style={{ background: 'var(--teal-faint)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--teal)' }}>💬 Trip chat</div>
            <div style={{ fontSize: 12, color: 'var(--mid)' }}>Coordinate with your crew</div>
          </div>
          <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 13 }}>Open</button>
        </div>

        {!confirmed ? (
          <button className="btn btn-primary" style={{ width: '100%', fontSize: 15 }} onClick={() => setConfirmed(true)}>✈️ Confirm my spot</button>
        ) : (
          <div style={{ background: '#EDF4EC', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center' }}>
            <div style={{ fontWeight: 700, color: 'var(--mountain-green)', marginBottom: 4 }}>✅ Spot confirmed!</div>
            <div style={{ fontSize: 13, color: 'var(--mid)' }}>You'll get a shareable trip link once all spots are filled.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateCollab({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState({ destination: '', dates: '', budget: '', style: '', count: '4', desc: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div>
      <div style={{ background: 'var(--white)', padding: '14px 16px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{ fontSize: 20, color: 'var(--mid)', cursor: 'pointer', background: 'none', border: 'none' }}>←</button>
        <div style={{ fontWeight: 700, fontSize: 16 }}>New collaborative trip</div>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[['Destination', 'destination', 'Where to? e.g. Tbilisi, Georgia'], ['Dates', 'dates', 'e.g. Jul 14–21, 2024'], ['Traveler count', 'count', 'Max travelers']].map(([label, key, ph]) => (
          <div key={key}>
            <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
            <input className="input-field" placeholder={ph} value={form[key as keyof typeof form]} onChange={set(key)} />
          </div>
        ))}
        <div>
          <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Budget style</label>
          <select className="input-field" value={form.budget} onChange={set('budget')}>
            <option>Budget</option><option>Mid-range</option><option>Luxury</option>
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Trip style</label>
          <select className="input-field" value={form.style} onChange={set('style')}>
            <option>Adventure</option><option>Culture</option><option>Beach</option><option>Backpacker</option><option>Mixed</option>
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Description</label>
          <textarea className="input-field" value={form.desc} onChange={set('desc')} placeholder="What's the vibe? What will you do?" />
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={onBack}>Post trip</button>
      </div>
    </div>
  );
}
