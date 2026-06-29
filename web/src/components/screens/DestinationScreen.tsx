'use client';
import React, { useState } from 'react';
import { CATEGORIES, COMMUNITY_POSTS, TRENDING_DESTINATIONS } from '@/data/mockData';

const BUDGET_LENS = ['Budget', 'Mid', 'Luxury'];

function DayTripCard({ name, dist, img }: { name: string; dist: string; img: string }) {
  return (
    <div className="card card-hover" style={{ minWidth: 130, flexShrink: 0 }}>
      <img src={img} alt={name} style={{ width: '100%', height: 80, objectFit: 'cover' }} />
      <div style={{ padding: '8px 10px' }}>
        <div style={{ fontWeight: 700, fontSize: 13 }}>{name}</div>
        <div style={{ color: 'var(--mid)', fontSize: 11 }}>{dist}</div>
      </div>
    </div>
  );
}

interface DestinationScreenProps {
  destinationName?: string;
  onViewPostDetail: (postId: number) => void;
}

export default function DestinationScreen({ destinationName = 'Kyoto', onViewPostDetail }: DestinationScreenProps) {
  const [activeTab, setActiveTab] = useState('discover');
  const [budgetLens, setBudgetLens] = useState('Budget');
  const [mapView, setMapView] = useState(false);

  const foundDest = TRENDING_DESTINATIONS.find(d => d.name.toLowerCase() === destinationName.toLowerCase());
  const DEST = {
    name: foundDest?.name || destinationName,
    country: foundDest?.country || 'Japan',
    posts: foundDest?.posts || 3102,
    travelers: foundDest ? Math.round(foundDest.posts * 5.2) : 14820,
    cover: foundDest?.image || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80'
  };

  const destPosts = COMMUNITY_POSTS.filter(p => p.destination.toLowerCase() === DEST.name.toLowerCase());
  const displayPosts = destPosts.length > 0 ? destPosts : COMMUNITY_POSTS;

  return (
    <div>
      {/* Hero */}
      <div style={{ position: 'relative', height: 200 }}>
        <img src={DEST.cover} alt={DEST.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
          <div style={{ color: 'white', fontWeight: 800, fontSize: 28 }}>{DEST.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>{DEST.country}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
            <span style={{ color: 'white', fontSize: 12 }}>📝 {DEST.posts.toLocaleString()} posts</span>
            <span style={{ color: 'white', fontSize: 12 }}>👥 {(DEST.travelers / 1000).toFixed(1)}k travelers</span>
          </div>
        </div>
        {/* Map toggle */}
        <button onClick={() => setMapView(!mapView)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 'var(--radius-sm)', padding: '6px 12px', fontWeight: 600, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
          {mapView ? '📋 List' : '🗺️ Map'}
        </button>
      </div>

      {mapView ? (
        <MapViewMini onViewPostDetail={onViewPostDetail} />
      ) : (
        <>
          {/* Budget lens */}
          <div style={{ background: 'var(--white)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: 13, color: 'var(--mid)', fontWeight: 600 }}>Budget lens</span>
            <div className="toggle-wrap">
              {BUDGET_LENS.map(l => <button key={l} className={`toggle-opt ${budgetLens === l ? 'active' : ''}`} onClick={() => setBudgetLens(l)}>{l}</button>)}
            </div>
          </div>

          {/* Category tabs */}
          <div className="tab-bar">
            {CATEGORIES.map(c => (
              <button key={c.id} className={`tab-item ${activeTab === c.id ? 'active' : ''}`} onClick={() => setActiveTab(c.id)}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          {/* Day trips */}
          <div style={{ padding: '16px 16px 8px' }}>
            <div className="section-header">
              <span className="section-title">Nearby day trips</span>
              <span className="see-all">See all →</span>
            </div>
            <div className="scroll-row">
              {[
                { name: 'Nara', dist: '45 min', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=200&q=70' },
                { name: 'Osaka', dist: '1h train', img: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=200&q=70' },
                { name: 'Arashiyama', dist: '25 min', img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=200&q=70' },
              ].map(d => <DayTripCard key={d.name} {...d} />)}
            </div>
          </div>

          {/* Quick links */}
          <div style={{ padding: '0 16px 16px' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {['💰 Price checker', '💬 Phrases', '🛂 Visa guide'].map(l => (
                <button key={l} className="chip chip-default" style={{ fontSize: 11, flex: 1, justifyContent: 'center' }}>{l}</button>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div style={{ padding: '0 16px 16px' }}>
            <div className="section-title" style={{ marginBottom: 12 }}>
              {CATEGORIES.find(c => c.id === activeTab)?.icon} {CATEGORIES.find(c => c.id === activeTab)?.label}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {displayPosts.map(p => (
                <div key={p.id} className="card card-hover" style={{ display: 'flex', gap: 0, overflow: 'hidden' }} onClick={() => onViewPostDetail(p.id)}>
                  <img src={p.image} alt="" style={{ width: 80, height: 80, objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ padding: '10px 12px', flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.4, marginBottom: 4 }}>{p.caption.slice(0, 60)}...</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: 'var(--teal)', fontWeight: 600 }}>⚡ {p.freshness}% fresh</span>
                      <span style={{ fontSize: 11, color: 'var(--mid)' }}>❤️ {p.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MapViewMini({ onViewPostDetail }: { onViewPostDetail: (postId: number) => void }) {
  const allPins = [
    { name: 'Nishiki Market', x: 40, y: 35, cat: 'eat', icon: '🍜', desc: 'Historic market with amazing street food skewers.', postId: 1, img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=70', rating: 4.8 },
    { name: 'Gion District', x: 62, y: 28, cat: 'discover', icon: '🔭', desc: 'Traditional wooden houses and tea merchant spots.', postId: 1, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=200&q=70', rating: 4.9 },
    { name: 'Fushimi Inari Shrine', x: 55, y: 58, cat: 'discover', icon: '⛩️', desc: 'Famous path of 10,000 bright red Torii gates.', postId: 2, img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=200&q=70', rating: 5.0 },
    { name: 'Kyoto Station Hotel', x: 48, y: 72, cat: 'stay', icon: '🏨', desc: 'Convenient stays with panoramic city view terrace.', postId: 3, img: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=200&q=70', rating: 4.5 },
    { name: 'Hidden Ramen Alley', x: 35, y: 50, cat: 'eat', icon: '🍜', desc: 'A secluded passage containing 8 top ramen shops.', postId: 1, img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=70', rating: 4.7 },
  ];

  const [active, setActive] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleZoom = (type: 'in' | 'out' | 'reset') => {
    if (type === 'in') setZoom(z => Math.min(2.5, z + 0.25));
    if (type === 'out') setZoom(z => Math.max(0.75, z - 0.25));
    if (type === 'reset') { setZoom(1); setActive(null); }
  };

  const filteredPins = allPins.filter(pin => selectedFilter === 'all' || pin.cat === selectedFilter);

  // Map background transform base style
  const mapStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(145deg, #c8e6c9 0%, #a5d6a7 30%, #80cbc4 60%, #4db6ac 100%)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  };

  // Outer container
  return (
    <div style={{ position: 'relative', height: 500, overflow: 'hidden', borderBottom: '1px solid var(--border-light)' }}>
      {/* Map Content */}
      <div style={mapStyle}>
        {/* Topological lines background decoration */}
        {[20, 35, 50, 65, 80].map(y => (
          <div key={y} style={{ position: 'absolute', top: `${y}%`, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }} />
        ))}

        {/* Category Legend & Filter pills */}
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderRadius: 'var(--radius-md)', padding: '10px', fontSize: 11, boxShadow: 'var(--shadow-md)', zIndex: 10 }}>
          <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--dark)' }}>Filter Pins</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { id: 'all', label: '🌍 All Pins', color: '#1A1A1A' },
              { id: 'discover', label: '🔭 Discover', color: '#1A6B6B' },
              { id: 'eat', label: '🍜 Eat & Drink', color: '#C4622D' },
              { id: 'stay', label: '🏨 Stay', color: '#2D5A27' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => { setSelectedFilter(f.id); setActive(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 8px',
                  borderRadius: 4,
                  background: selectedFilter === f.id ? 'rgba(26,107,107,0.12)' : 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: selectedFilter === f.id ? 700 : 500,
                  color: f.color
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.id === 'all' ? '#1A1A1A' : f.color }} />
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Zoom controls */}
        <div style={{ position: 'absolute', right: 12, top: 12, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 10 }}>
          <button onClick={() => handleZoom('in')} style={{ width: 34, height: 34, background: 'white', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 800, fontSize: 16, cursor: 'pointer', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          <button onClick={() => handleZoom('out')} style={{ width: 34, height: 34, background: 'white', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 800, fontSize: 16, cursor: 'pointer', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
          <button onClick={() => handleZoom('reset')} style={{ width: 34, height: 34, background: 'white', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>◎</button>
        </div>

        {/* Pins Map Space */}
        <div style={{
          width: '100%',
          height: '100%',
          transform: `scale(${zoom})`,
          transformOrigin: active !== null ? `${allPins[active].x}% ${allPins[active].y}%` : '50% 50%',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}>
          {filteredPins.map((pin) => {
            const originalIndex = allPins.findIndex(p => p.name === pin.name);
            const isSelected = active === originalIndex;
            const pinColor = pin.cat === 'eat' ? '#C4622D' : pin.cat === 'stay' ? '#2D5A27' : '#1A6B6B';

            return (
              <div
                key={pin.name}
                style={{
                  position: 'absolute',
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                  transform: 'translate(-50%,-100%)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 20 : 5
                }}
                onClick={() => setActive(isSelected ? null : originalIndex)}
              >
                <div style={{
                  background: pinColor,
                  color: 'white',
                  borderRadius: '50%',
                  width: isSelected ? 40 : 34,
                  height: isSelected ? 40 : 34,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isSelected ? 18 : 15,
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.4)' : '0 2px 6px rgba(0,0,0,0.25)',
                  border: isSelected ? '2.5px solid white' : '2px solid white',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.15) translateY(-2px)' : 'none'
                }}>
                  {pin.icon}
                </div>
                {!isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: '105%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    fontSize: 8,
                    fontWeight: 700,
                    padding: '2px 4px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {pin.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Interactive bottom sheet/drawer detail card */}
      {active !== null && (
        <div className="slide-in" style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          right: 12,
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          padding: '12px',
          display: 'flex',
          gap: 12,
          zIndex: 30,
          maxHeight: 120
        }}>
          <img
            src={allPins[active].img}
            alt=""
            style={{ width: 80, height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0 }}
          />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 800, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--dark)' }}>
                  {allPins[active].name}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sunrise-gold)', flexShrink: 0 }}>
                  ★ {allPins[active].rating}
                </div>
              </div>
              <p style={{ fontSize: 11, color: 'var(--mid)', lineHeight: 1.3, marginTop: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {allPins[active].desc}
              </p>
            </div>
            <button
              onClick={() => onViewPostDetail(allPins[active].postId)}
              style={{
                background: 'var(--teal)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
                alignSelf: 'flex-end',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'var(--teal-light)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'var(--teal)')}
            >
              Read Community Intel →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
