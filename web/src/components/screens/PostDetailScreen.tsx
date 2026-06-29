'use client';
import React, { useState } from 'react';
import { COMMUNITY_POSTS } from '@/data/mockData';

// Inline Icons
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
const Info = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

interface PostDetailProps {
  postId: number | null;
  onBack: () => void;
}

const INITIAL_COMMENTS: Record<number, Comment[]> = {
  1: [
    { id: 1, user: 'Elena Rossi', avatar: 'https://i.pravatar.cc/40?img=5', text: 'Is this place wheelchair accessible? The alleyways near Gion can be super narrow.', time: '2h ago' },
    { id: 2, user: 'Alex Rivero', avatar: 'https://i.pravatar.cc/40?img=13', text: 'Went here last night! Pure magic. The broth is extremely rich. Note that they only seat about 8 people.', time: '5h ago' }
  ],
  2: [
    { id: 1, user: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/40?img=2', text: 'Is it safe to walk around at 5:30 AM alone near the Sassi?', time: '1d ago' },
    { id: 2, user: 'Julian Aris', avatar: 'https://i.pravatar.cc/40?img=11', text: 'Yes, absolutely. Matera is super safe and peaceful at sunrise. Mostly just photographers.', time: '12h ago' }
  ],
  3: [
    { id: 1, user: 'Julian Aris', avatar: 'https://i.pravatar.cc/40?img=11', text: 'How muddy was the trail? Thinking of doing this in trail runners.', time: '3d ago' },
    { id: 2, user: 'Alex Rivero', avatar: 'https://i.pravatar.cc/40?img=13', text: 'Trail runners are fine but expect them to get completely brown. The view is 100% worth it.', time: '2d ago' }
  ]
};

export default function PostDetailScreen({ postId, onBack }: PostDetailProps) {
  // Find post or fallback to post 1
  const targetId = postId ?? 1;
  const originalPost = COMMUNITY_POSTS.find(p => p.id === targetId) ?? COMMUNITY_POSTS[0];

  const [post, setPost] = useState(originalPost);
  const [freshness, setFreshness] = useState(originalPost.freshness);
  const [hasVoted, setHasVoted] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS[targetId] || [
    { id: 1, user: 'Fellow Traveler', avatar: 'https://i.pravatar.cc/40?img=8', text: 'Thanks for sharing this tip! Adding to my itinerary.', time: '1d ago' }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [heartAnim, setHeartAnim] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleVote = (voteType: string) => {
    if (hasVoted) return;
    setHasVoted(voteType);

    if (voteType === 'accurate') {
      const nextFresh = Math.min(100, freshness + 2);
      setFreshness(nextFresh);
      triggerToast('Thank you! Marked as still accurate.');
    } else if (voteType === 'outdated') {
      const nextFresh = Math.max(0, freshness - 10);
      setFreshness(nextFresh);
      triggerToast('Alert sent. Marked as outdated.');
    } else if (voteType === 'inaccurate') {
      const nextFresh = Math.max(0, freshness - 25);
      setFreshness(nextFresh);
      triggerToast('Report submitted. Marked as inaccurate.');
    }
  };

  const toggleLike = () => {
    const isLiking = !post.liked;
    setPost(p => ({ ...p, liked: isLiking, likes: isLiking ? p.likes + 1 : p.likes - 1 }));
    if (isLiking) {
      setHeartAnim(true);
      setTimeout(() => setHeartAnim(false), 400);
    }
  };

  const toggleSave = () => {
    const isSaving = !post.saved;
    setPost(p => ({ ...p, saved: isSaving }));
    triggerToast(isSaving ? `Saved to ${post.destination} list!` : 'Removed from saved trips.');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast('Post link copied to clipboard!');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: comments.length + 1,
      user: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/80?img=2', // Current user's avatar
      text: newCommentText.trim(),
      time: 'Just now'
    };

    setComments(prev => [...prev, newComment]);
    setPost(p => ({ ...p, comments: p.comments + 1 }));
    setNewCommentText('');
    triggerToast('Comment posted successfully!');
  };

  const RATING_DIMENSIONS = [
    { key: 'value', label: 'Value for Money', icon: '💰', minLabel: 'Pricey', maxLabel: 'Great Value' },
    { key: 'authenticity', label: 'Authenticity', icon: '🛡️', minLabel: 'Tourist Trap', maxLabel: 'Hyper Local' },
    { key: 'accessibility', label: 'Accessibility', icon: '🚶', minLabel: 'Challenging', maxLabel: 'Fully Accessible' },
    { key: 'safety', label: 'Safety', icon: '🔒', minLabel: 'Caution', maxLabel: 'Very Safe' },
    { key: 'vibe', label: 'Vibe & Atmosphere', icon: '✨', minLabel: 'Dull', maxLabel: 'Excellent' },
    { key: 'crowd', label: 'Crowd Level', icon: '👥', minLabel: 'Sparse', maxLabel: 'Crowded' },
  ];

  // Helper to color code dimensions based on rating value
  const getRatingColor = (val: number, isCrowd = false) => {
    if (isCrowd) {
      if (val >= 4) return 'var(--terracotta)'; // Crowded
      if (val <= 2) return 'var(--mountain-green)'; // Sparse / Peaceful
      return 'var(--sunrise-gold)'; // Mid
    }
    if (val >= 4) return 'var(--teal)';
    if (val <= 2) return '#E53E3E'; // Low rating red
    return 'var(--sunrise-gold)';
  };

  return (
    <div className="fade-in" style={{ paddingBottom: 24 }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(26, 107, 107, 0.95)',
          color: 'white',
          padding: '8px 16px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 999,
          fontSize: 13,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Header bar */}
      <div style={{
        background: 'var(--white)',
        padding: '14px 16px',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--teal)', fontWeight: 600, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Back
        </button>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--dark)', marginLeft: 'auto' }}>
          Post Details
        </div>
      </div>

      {/* Author Profile Card */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--white)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <img src={post.author.avatar} alt={post.author.name} className="avatar" style={{ width: 44, height: 44 }} />
            {post.author.verified && (
              <span style={{ position: 'absolute', bottom: -2, right: -2 }}>
                <CheckCircle size={15} />
              </span>
            )}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--dark)' }}>
              {post.author.name}
            </div>
            <div style={{ color: 'var(--mid)', fontSize: 12 }}>
              📍 {post.author.location} · @{post.author.handle}
            </div>
          </div>
        </div>
        <span className="badge badge-fresh" style={{ fontSize: 12, padding: '4px 10px' }}>
          ⚡ {freshness}% fresh
        </span>
      </div>

      {/* Image and quick facts */}
      <div style={{ position: 'relative', width: '100%', height: 260 }}>
        <img src={post.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 8 }}>
          <span className="badge" style={{ background: 'rgba(0,0,0,0.65)', color: 'white', backdropFilter: 'blur(6px)', padding: '5px 10px' }}>
            📅 Visited {post.visitDate}
          </span>
          <span className="badge" style={{ background: 'rgba(0,0,0,0.65)', color: 'white', backdropFilter: 'blur(6px)', padding: '5px 10px' }}>
            💰 Price: {post.price}
          </span>
        </div>
      </div>

      {/* Action Row */}
      <div className="post-actions" style={{ background: 'var(--white)', padding: '12px 16px', borderBottom: '1px solid var(--border-light)' }}>
        <button className={`post-action-btn ${post.liked ? 'liked' : ''}`} onClick={toggleLike} style={{ fontSize: 14 }}>
          <span className={heartAnim ? 'heart-pop' : ''}><Heart filled={post.liked} size={22} /></span>
          <span>{post.likes.toLocaleString()}</span>
        </button>
        <button className="post-action-btn" style={{ fontSize: 14 }}><MessageCircle size={22} /><span>{comments.length}</span></button>
        <button className="post-action-btn" onClick={handleShare} style={{ fontSize: 14 }}><Share2 size={22} /></button>
        <button className="post-action-btn" style={{ marginLeft: 'auto', color: post.saved ? 'var(--teal)' : undefined }} onClick={toggleSave}>
          <Bookmark filled={post.saved} size={22} />
        </button>
      </div>

      {/* Freshness Accuracy Voting Panel */}
      <div style={{ margin: '16px 16px 0', background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <span style={{ fontSize: 18 }}>⏱️</span>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Is this intelligence still accurate?</div>
        </div>
        <p style={{ fontSize: 12, color: 'var(--mid)', marginBottom: 12 }}>
          Community-verified details keep guides fresh. Please vote if you have visited recently.
        </p>

        {hasVoted ? (
          <div className="fade-in" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--teal-faint)', padding: '10px 14px', borderRadius: 'var(--radius-md)', color: 'var(--teal)', fontSize: 13, fontWeight: 600 }}>
            <span>✓</span> Thank you for your feedback! Your vote has updated the freshness score.
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => handleVote('accurate')}
              style={{
                flex: 1,
                border: '1.5px solid var(--mountain-green)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 6px',
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--mountain-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                cursor: 'pointer',
                background: 'rgba(45, 90, 39, 0.03)'
              }}
            >
              👍 Yes, still good
            </button>
            <button
              onClick={() => handleVote('outdated')}
              style={{
                flex: 1,
                border: '1.5px solid var(--sunrise-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 6px',
                fontSize: 12,
                fontWeight: 700,
                color: '#C07010',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                cursor: 'pointer',
                background: '#FEF9ED'
              }}
            >
              🕒 Outdated
            </button>
            <button
              onClick={() => handleVote('inaccurate')}
              style={{
                flex: 1,
                border: '1.5px solid #E53E3E',
                borderRadius: 'var(--radius-md)',
                padding: '10px 6px',
                fontSize: 12,
                fontWeight: 700,
                color: '#E53E3E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                cursor: 'pointer',
                background: '#FFF5F5'
              }}
            >
              ❌ Inaccurate
            </button>
          </div>
        )}
      </div>

      {/* 6-Dimension Ratings Card */}
      <div style={{ margin: '16px', background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
          <span style={{ fontSize: 18 }}>📊</span>
          <div style={{ fontWeight: 700, fontSize: 14 }}>6-Dimension Travel Ratings</div>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', color: 'var(--mid)', cursor: 'help' }} title="Dimension details are contributed by the author and verified by the community.">
            <Info size={16} />
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {RATING_DIMENSIONS.map((dim) => {
            const score = (post.ratings as Record<string, number>)[dim.key] || 3;
            const isCrowd = dim.key === 'crowd';
            const color = getRatingColor(score, isCrowd);

            return (
              <div key={dim.key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                  <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--dark)' }}>
                    <span>{dim.icon}</span> {dim.label}
                  </span>
                  <span style={{ fontWeight: 700, color }}>
                    {score} / 5
                  </span>
                </div>
                {/* Horizontal rating bar segments */}
                <div style={{ display: 'flex', gap: 3, height: 6 }}>
                  {[1, 2, 3, 4, 5].map((segmentVal) => (
                    <div
                      key={segmentVal}
                      style={{
                        flex: 1,
                        background: segmentVal <= score ? color : 'var(--border-light)',
                        borderRadius: 3,
                        transition: 'background 0.3s ease'
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--mid-light)' }}>
                  <span>{dim.minLabel}</span>
                  <span>{dim.maxLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Text Body */}
      <div style={{ background: 'var(--white)', padding: '16px', borderBottom: '1px solid var(--border-light)' }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: 'var(--dark)' }}>Review & Advice</h4>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--dark-2)', whiteSpace: 'pre-wrap' }}>
          {post.caption}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
          {post.tags.map(t => <span key={t} className="chip chip-default" style={{ fontSize: 11 }}>#{t}</span>)}
        </div>
      </div>

      {/* Comments section */}
      <div style={{ background: 'var(--white)', padding: '16px', marginTop: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: 'var(--dark)' }}>
          Comments ({comments.length})
        </div>

        {/* Comments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 16 }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ display: 'flex', gap: 10 }}>
              <img src={comment.avatar} alt={comment.user} className="avatar" style={{ width: 32, height: 32, flexShrink: 0 }} />
              <div style={{ flex: 1, background: 'var(--border-light)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: 'var(--dark)' }}>{comment.user}</span>
                  <span style={{ color: 'var(--mid-light)', fontSize: 10 }}>{comment.time}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--dark-2)', lineHeight: 1.4 }}>
                  {comment.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Input Form */}
        <form onSubmit={handleAddComment} style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            className="input-field"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Ask a question or add a tip..."
            style={{ flex: 1, padding: '10px 14px', borderRadius: 'var(--radius-md)' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0 16px', borderRadius: 'var(--radius-md)', whiteSpace: 'nowrap' }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
