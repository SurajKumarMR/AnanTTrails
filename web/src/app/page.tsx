'use client';
import React, { useState } from 'react';
import CompassLogo from '@/components/ui/CompassLogo';
import ExploreScreen from '@/components/screens/ExploreScreen';
import SearchScreen from '@/components/screens/SearchScreen';
import CreateScreen from '@/components/screens/CreateScreen';
import CollabsScreen from '@/components/screens/CollabsScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import DestinationScreen from '@/components/screens/DestinationScreen';
import PostDetailScreen from '@/components/screens/PostDetailScreen';
import { TribesScreen, SeasonalScreen, ChallengesScreen, ToolsScreen } from '@/components/screens/CommunityScreens';

type Screen = 'explore' | 'search' | 'create' | 'collabs' | 'profile' | 'destination' | 'tribes' | 'seasonal' | 'challenges' | 'tools' | 'post-detail';

interface NavTab {
  id: Screen;
  label: string;
  icon: React.ComponentType<{ active: boolean }> | React.ComponentType<any>;
  special?: boolean;
}

const NAV_TABS: NavTab[] = [
  { id: 'explore', label: 'Explore', icon: HomeIcon },
  { id: 'search', label: 'Search', icon: SearchIcon },
  { id: 'create', label: '', icon: PlusIcon, special: true },
  { id: 'collabs', label: 'Collabs', icon: CollabIcon },
  { id: 'profile', label: 'Profile', icon: ProfileIcon },
];

function HomeIcon({ active }: { active: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'var(--teal)' : 'none'} stroke={active ? 'var(--teal)' : 'currentColor'} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function SearchIcon({ active }: { active: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--teal)' : 'currentColor'} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function PlusIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}
function CollabIcon({ active }: { active: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--teal)' : 'currentColor'} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function ProfileIcon({ active }: { active: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--teal)' : 'currentColor'} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}

const HEADER_ICONS = (screen: Screen, onNav: (s: Screen) => void) => (
  <div style={{ display: 'flex', gap: 8 }}>
    {screen === 'explore' && (
      <>
        <button onClick={() => onNav('tribes')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--border-light)', border: 'none', fontSize: 16, cursor: 'pointer' }}>🏕️</button>
        <button onClick={() => onNav('seasonal')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--border-light)', border: 'none', fontSize: 16, cursor: 'pointer' }}>📅</button>
        <button onClick={() => onNav('challenges')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--border-light)', border: 'none', fontSize: 16, cursor: 'pointer' }}>🏆</button>
      </>
    )}
  </div>
);

export default function Home() {
  const [screen, setScreen] = useState<Screen>('explore');
  const [prevScreen, setPrevScreen] = useState<Screen>('explore');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedDestinationName, setSelectedDestinationName] = useState<string>('Kyoto');

  const navigateTo = (nextScreen: Screen) => {
    setPrevScreen(screen);
    setScreen(nextScreen);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'explore': 
        return (
          <ExploreScreen 
            onNavigate={(s) => navigateTo(s as Screen)}
            onSelectPost={(id) => {
              setSelectedPostId(id);
              navigateTo('post-detail');
            }}
            onSelectDestination={(name) => {
              setSelectedDestinationName(name);
              navigateTo('destination');
            }}
          />
        );
      case 'search': 
        return (
          <SearchScreen 
            onViewDestination={(name) => {
              setSelectedDestinationName(name);
              navigateTo('destination');
            }}
          />
        );
      case 'create': return <CreateScreen />;
      case 'collabs': return <CollabsScreen />;
      case 'profile': return <ProfileScreen />;
      case 'destination': 
        return (
          <DestinationScreen 
            destinationName={selectedDestinationName}
            onViewPostDetail={(id) => {
              setSelectedPostId(id);
              navigateTo('post-detail');
            }}
          />
        );
      case 'post-detail':
        return (
          <PostDetailScreen 
            postId={selectedPostId} 
            onBack={() => setScreen(prevScreen)}
          />
        );
      case 'tribes': return <TribesScreen />;
      case 'seasonal': return <SeasonalScreen />;
      case 'challenges': return <ChallengesScreen />;
      case 'tools': return <ToolsScreen />;
    }
  };

  const activeNavId = (['tribes', 'seasonal', 'challenges', 'tools', 'destination', 'post-detail'].includes(screen)) ? 'explore' : screen;

  return (
    <main className="app-frame">
      {/* Desktop sidebar info */}
      <div style={{ display: 'none', flexDirection: 'column', maxWidth: 320, color: 'white' }} className="desktop-info">
        <h1 style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: 36, lineHeight: 1.1, marginBottom: 16 }}>
          <span style={{ color: '#80CBC4' }}>Anant</span><span style={{ color: '#FFAB91' }}>Trails</span>
        </h1>
        <p style={{ opacity: 0.8, fontSize: 16, lineHeight: 1.6 }}>Real stories from real travelers. Community-driven travel intelligence — organized so you can plan smarter, faster, and with genuine local confidence.</p>
      </div>

      {/* Phone shell */}
      <div className="phone-shell">
        {/* Status bar */}
        <div style={{ background: 'var(--white)', padding: '10px 20px 6px', display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: 'var(--dark)', flexShrink: 0 }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 14 }}>
            <span>●●●</span><span>WiFi</span><span>🔋</span>
          </div>
        </div>

        {/* App header */}
        {screen !== 'create' && screen !== 'post-detail' && (
          <div className="screen-header">
            {['tribes', 'seasonal', 'challenges', 'tools', 'destination'].includes(screen) ? (
              <button onClick={() => setScreen(prevScreen)} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--teal)', fontWeight: 600, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer' }}>
                ← Back
              </button>
            ) : (
              <button onClick={() => setScreen('explore')} className="logo-mark">
                <CompassLogo size={34} />
                <div className="logo-text"><span className="teal">Anant</span><span className="terra">Trails</span></div>
              </button>
            )}
            {HEADER_ICONS(screen, navigateTo)}
            {screen === 'explore' && (
              <button onClick={() => navigateTo('tools')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--teal-faint)', border: 'none', fontSize: 16, cursor: 'pointer' }}>🛠️</button>
            )}
          </div>
        )}

        {/* Screen content */}
        <div className="screen">
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        <div className="bottom-nav">
          {NAV_TABS.map(tab => (
            tab.special ? (
              <button key="create" className="nav-tab-create" onClick={() => navigateTo('create')} id="nav-create">
                <PlusIcon />
              </button>
            ) : (
              <button key={tab.id} className={`nav-tab ${activeNavId === tab.id ? 'active' : ''}`} onClick={() => navigateTo(tab.id as Screen)} id={`nav-${tab.id}`}>
                <tab.icon active={activeNavId === tab.id} />
                <span>{tab.label}</span>
              </button>
            )
          ))}
        </div>
      </div>
    </main>
  );
}
