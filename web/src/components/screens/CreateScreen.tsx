'use client';
import React, { useState } from 'react';
import { CATEGORIES } from '@/data/mockData';

const STEPS = ['Destination', 'Category', 'Story', 'Photos', 'Context', 'Ratings', 'Publish'];

const WRITING_TIPS = [
  'Share the exact address or landmark',
  'Include what surprised you most',
  'Mention what type of traveler this suits best',
  'Add any local tips or warnings',
];

const BEST_FOR_TAGS = ['Solo', 'Couples', 'Families', 'Budget', 'Luxury', 'Foodies', 'Adventure', 'Photography'];

const RATING_DIMS = ['Value', 'Authenticity', 'Accessibility', 'Safety', 'Vibe', 'Crowd level'];

const RECENT_DESTS = ['Kyoto, Japan', 'Bali, Indonesia', 'Chiang Mai, Thailand', 'Matera, Italy'];

export default function CreateScreen() {
  const [step, setStep] = useState(0);
  const [dest, setDest] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [bestFor, setBestFor] = useState<string[]>([]);
  const [visitDate, setVisitDate] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [season, setSeason] = useState('');
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [published, setPublished] = useState(false);

  const progress = ((step) / (STEPS.length - 1)) * 100;

  const toggleBestFor = (tag: string) =>
    setBestFor(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);

  const setRating = (dim: string, val: number) =>
    setRatings(r => ({ ...r, [dim]: val }));

  if (published) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center', height: '100%' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <div style={{ fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Post published!</div>
        <div style={{ color: 'var(--mid)', marginBottom: 24 }}>Your story is live and helping travelers right now.</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Share on Instagram', 'Share on WhatsApp', 'Copy link'].map(s => (
            <button key={s} className="btn btn-outline" style={{ fontSize: 13 }}>{s}</button>
          ))}
        </div>
        <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => { setPublished(false); setStep(0); setTitle(''); setBody(''); }}>
          Write another post
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div style={{ background: 'var(--white)', padding: '14px 16px', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>Step {step + 1} of {STEPS.length}</span>
          <span style={{ fontSize: 13, color: 'var(--mid)' }}>{STEPS[step]}</span>
        </div>
        <div className="progress-bar" style={{ height: 6 }}>
          <div className="progress-fill" style={{ width: `${progress}%`, height: '100%' }} />
        </div>
        {/* Step tabs */}
        <div className="scroll-row" style={{ marginTop: 10, gap: 6 }}>
          {STEPS.map((s, i) => (
            <button key={s} onClick={() => i <= step && setStep(i)} className="chip" style={{
              fontSize: 11, padding: '4px 10px',
              background: i < step ? 'var(--teal)' : i === step ? 'var(--teal-faint)' : 'var(--border-light)',
              color: i < step ? 'white' : i === step ? 'var(--teal)' : 'var(--mid)',
              borderColor: i === step ? 'var(--teal)' : 'transparent',
              cursor: i <= step ? 'pointer' : 'default',
            }}>
              {i < step ? '✓' : i + 1}. {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>
        {/* STEP 0: Destination */}
        {step === 0 && (
          <div className="fade-in">
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Where did you go?</div>
            <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>Search for a destination or region</div>
            <input className="input-field" value={dest} onChange={e => setDest(e.target.value)} placeholder="Search destination…" style={{ marginBottom: 16 }} />
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: 'var(--mid)' }}>Recent destinations</div>
            {RECENT_DESTS.map(d => (
              <button key={d} onClick={() => setDest(d)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 0', borderBottom: '1px solid var(--border-light)', background: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: 20 }}>📍</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: dest === d ? 'var(--teal)' : 'var(--dark)' }}>{d}</span>
              </button>
            ))}
          </div>
        )}

        {/* STEP 1: Category */}
        {step === 1 && (
          <div className="fade-in">
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>What type of tip is this?</div>
            <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>Choose the category that best fits your story</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setCategory(c.id)} style={{ padding: '16px', borderRadius: 'var(--radius-md)', border: `2px solid ${category === c.id ? c.color : 'var(--border)'}`, background: category === c.id ? c.color + '18' : 'var(--white)', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{c.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: category === c.id ? c.color : 'var(--dark)' }}>{c.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Story */}
        {step === 2 && (
          <div className="fade-in">
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Tell your story</div>
            <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>Real, honest and helpful — travelers trust you</div>
            <input className="input-field" value={title} onChange={e => setTitle(e.target.value)} placeholder="Give your post a title…" style={{ marginBottom: 12 }} />
            <textarea className="input-field" value={body} onChange={e => setBody(e.target.value)} placeholder="Share your experience in detail…" style={{ minHeight: 140, marginBottom: 12 }} />
            <div style={{ color: 'var(--mid)', fontSize: 12, textAlign: 'right', marginBottom: 16 }}>{body.length}/2000 characters</div>
            <div style={{ background: 'var(--teal-faint)', borderRadius: 'var(--radius-md)', padding: '12px 14px', borderLeft: '3px solid var(--teal)' }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--teal)', marginBottom: 8 }}>💡 Writing tips</div>
              {WRITING_TIPS.map(tip => <div key={tip} style={{ fontSize: 12, color: 'var(--mid)', marginBottom: 4 }}>• {tip}</div>)}
            </div>
          </div>
        )}

        {/* STEP 3: Photos */}
        {step === 3 && (
          <div className="fade-in">
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Add photos</div>
            <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>Up to 8 photos. EXIF data is stripped for privacy.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 16 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 'var(--radius-md)', border: '2px dashed var(--border)', background: 'var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: i === 0 ? 28 : 20, color: 'var(--mid)' }}>
                  {i === 0 ? '+' : '📷'}
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--border-light)', borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>📍 Drop a map pin</div>
              <div style={{ fontSize: 12, color: 'var(--mid)' }}>Mark the exact location so others can find it</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--mid)', textAlign: 'center' }}>🔒 EXIF metadata (GPS, device info) is automatically removed</div>
          </div>
        )}

        {/* STEP 4: Context */}
        {step === 4 && (
          <div className="fade-in">
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Add context</div>
            <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>Help others understand when and for whom this tip applies</div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Visit date</label>
              <input type="month" className="input-field" value={visitDate} onChange={e => setVisitDate(e.target.value)} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Price range</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Free', 'Budget', 'Mid-range', 'Luxury'].map(p => (
                  <button key={p} className={`chip ${priceRange === p ? 'chip-active' : 'chip-default'}`} style={{ fontSize: 12 }} onClick={() => setPriceRange(p)}>{p}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Season</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['🌸 Spring', '☀️ Summer', '🍂 Autumn', '❄️ Winter', 'Year-round'].map(s => (
                  <button key={s} className={`chip ${season === s ? 'chip-active' : 'chip-default'}`} style={{ fontSize: 12 }} onClick={() => setSeason(s)}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>Best for</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {BEST_FOR_TAGS.map(tag => (
                  <button key={tag} className={`chip ${bestFor.includes(tag) ? 'chip-active' : 'chip-default'}`} style={{ fontSize: 12 }} onClick={() => toggleBestFor(tag)}>{tag}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Ratings */}
        {step === 5 && (
          <div className="fade-in">
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Rate your experience</div>
            <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>6 dimensions that help travelers make better decisions</div>
            {RATING_DIMS.map(dim => (
              <div key={dim} style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{dim}</div>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map(v => (
                    <span key={v} className={`star ${(ratings[dim] || 0) >= v ? 'filled' : 'empty'}`} onClick={() => setRating(dim, v)}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STEP 6: Publish */}
        {step === 6 && (
          <div className="fade-in">
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>Almost there!</div>
            <div style={{ color: 'var(--mid)', fontSize: 14, marginBottom: 16 }}>Preview and publish your post</div>
            {/* Mini preview */}
            <div className="card" style={{ marginBottom: 16, padding: '14px' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title || 'Untitled post'}</div>
              <div style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 8 }}>{dest || 'Destination not set'}</div>
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>{body ? body.slice(0, 120) + (body.length > 120 ? '…' : '') : 'No story written yet.'}</div>
              {bestFor.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {bestFor.map(t => <span key={t} className="chip chip-teal" style={{ fontSize: 11, background: 'var(--teal-faint)', color: 'var(--teal)', borderColor: 'var(--teal)' }}>#{t}</span>)}
                </div>
              )}
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Share your post</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {['📸 Instagram', '💬 WhatsApp', '🔗 Copy link'].map(s => (
                <button key={s} className="btn btn-ghost" style={{ flex: 1, fontSize: 12 }}>{s}</button>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%', fontSize: 16, padding: '14px' }} onClick={() => setPublished(true)}>
              🚀 Publish to AnanTTrails
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ padding: '0 16px 24px', display: 'flex', gap: 10 }}>
        {step > 0 && <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep(s => s - 1)}>← Back</button>}
        {step === 0 && <button className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>}
        {step < STEPS.length - 1 && (
          <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => setStep(s => s + 1)}>
            Continue →
          </button>
        )}
      </div>
    </div>
  );
}
