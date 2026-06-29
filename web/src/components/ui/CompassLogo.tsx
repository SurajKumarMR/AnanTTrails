'use client';
import React from 'react';

export default function CompassLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" stroke="#1A6B6B" strokeWidth="6" fill="none"/>
      {/* Tick marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r1 = 50, r2 = 56;
        return (
          <line key={i}
            x1={60 + r1 * Math.sin(angle)} y1={60 - r1 * Math.cos(angle)}
            x2={60 + r2 * Math.sin(angle)} y2={60 - r2 * Math.cos(angle)}
            stroke="#1A6B6B" strokeWidth="2.5" strokeLinecap="round"/>
        );
      })}
      {/* N/S/E/W cardinal points */}
      {[0, 90, 180, 270].map((deg, i) => {
        const r = 42, a = (deg * Math.PI) / 180;
        const x = 60 + r * Math.sin(a), y = 60 - r * Math.cos(a);
        const dx = [[0,-8],[8,0],[0,8],[-8,0]][i];
        return <polygon key={deg} points={`${x},${y} ${x+dx[0]-3},${y+dx[1]+4} ${x+dx[0]+3},${y+dx[1]+4}`} fill="#1A6B6B" transform={`rotate(${deg},${x},${y})`}/>;
      })}
      {/* Mountain peaks */}
      <polygon points="60,18 45,42 75,42" fill="#2D5A27"/>
      <polygon points="72,24 60,44 84,44" fill="#1A6B6B"/>
      {/* Sunrise rays */}
      {Array.from({ length: 7 }).map((_, i) => {
        const a = ((i - 3) * 12 * Math.PI) / 180;
        return <line key={i} x1={60 + 12 * Math.sin(a)} y1={20 - 12 * Math.cos(a)} x2={60 + 20 * Math.sin(a)} y2={20 - 20 * Math.cos(a)} stroke="#E8A020" strokeWidth="2" strokeLinecap="round"/>;
      })}
      {/* Trail / river */}
      <path d="M48 70 Q52 64 60 68 Q68 72 72 66" stroke="#C4622D" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Pin */}
      <circle cx="72" cy="64" r="6" fill="#C4622D"/>
      <circle cx="72" cy="64" r="3" fill="white"/>
    </svg>
  );
}
