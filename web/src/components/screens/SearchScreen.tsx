'use client';
import React, { useState } from 'react';
import { TRENDING_DESTINATIONS, TRAVELER_TYPES } from '@/data/mockData';

interface SearchScreenProps {
  onViewDestination: (name: string) => void;
}

export default function SearchScreen({ onViewDestination }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const [persona, setPersona] = useState('all');

  const filtered = TRENDING_DESTINATIONS.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.country.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div style={{ background: 'var(--white)', padding: '16px', borderBottom: '1px solid var(--border-light)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="search-bar" style={{ marginBottom: 12 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--mid-light)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search destinations, tips, stories…" autoFocus />
          {query && <button onClick={() => setQuery('')} style={{ color: 'var(--mid)', fontSize: 18, lineHeight: 1 }}>×</button>}
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--mid)', marginBottom: 8 }}>Traveling as</div>
        <div className="scroll-row" style={{ gap: 8 }}>
          {TRAVELER_TYPES.map(t => (
            <button key={t.id} className={`chip ${persona === t.id ? 'chip-active' : 'chip-default'}`} onClick={() => setPersona(t.id)} style={{ fontSize: 11 }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <div className="section-header">
          <span className="section-title">{query ? `Results for "${query}"` : 'Popular destinations'}</span>
          <span style={{ fontSize: 13, color: 'var(--mid)' }}>{filtered.length} found</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(dest => (
            <div key={dest.id} className="card card-hover" style={{ display: 'flex', gap: 0, overflow: 'hidden' }} onClick={() => onViewDestination(dest.name)}>
              <img src={dest.image} alt={dest.name} style={{ width: 90, height: 90, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ padding: '12px 14px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{dest.name}</div>
                    <div style={{ color: 'var(--mid)', fontSize: 13 }}>{dest.country}</div>
                  </div>
                  <span className="chip chip-terra" style={{ fontSize: 10, flexShrink: 0 }}>{dest.category}</span>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 600 }}>📝 {dest.posts.toLocaleString()} posts</span>
                  <span style={{ fontSize: 12, color: 'var(--mid)' }}>👥 Active community</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--mid)' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
            <div style={{ fontWeight: 600 }}>No destinations found</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Try a different search</div>
          </div>
        )}
      </div>
    </div>
  );
}
