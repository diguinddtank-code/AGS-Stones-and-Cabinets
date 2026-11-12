import React from 'react';
import type { DesignId, EdgeProfile } from '@/lib/kitchenDesign/catalog';

// Small architectural plan diagrams for the layout cards.
export function PlanIcon({ id, className }: { id: DesignId; className?: string }) {
  const wall = 'currentColor';
  return (
    <svg viewBox="0 0 120 84" className={className} fill="none" aria-hidden="true">
      <rect x="2" y="2" width="116" height="80" rx="3" stroke={wall} strokeOpacity="0.15" />
      {id === 'buckhead' && (
        <>
          <rect x="8" y="8" width="84" height="13" rx="1.5" fill={wall} fillOpacity="0.85" />
          <rect x="92" y="8" width="20" height="14" rx="1.5" fill={wall} fillOpacity="0.55" />
          <rect x="8" y="21" width="13" height="36" rx="1.5" fill={wall} fillOpacity="0.85" />
          <rect x="44" y="9.5" width="18" height="10" rx="1" fill="#ca8a04" />
          <rect x="34" y="40" width="50" height="18" rx="2" fill="#ca8a04" fillOpacity="0.9" />
          {[42, 59, 76].map((x) => <circle key={x} cx={x} cy="66" r="3.2" fill={wall} fillOpacity="0.35" />)}
        </>
      )}
      {id === 'midtown' && (
        <>
          <rect x="8" y="8" width="40" height="14" rx="1.5" fill={wall} fillOpacity="0.55" />
          <rect x="48" y="8" width="64" height="12" rx="1.5" fill={wall} fillOpacity="0.85" />
          <rect x="72" y="9.5" width="16" height="9" rx="1" fill="#ca8a04" />
          <rect x="40" y="40" width="64" height="18" rx="1" fill="#ca8a04" fillOpacity="0.9" />
          {[48, 63, 80, 95].map((x) => <circle key={x} cx={x} cy="66" r="3.2" fill={wall} fillOpacity="0.35" />)}
          <rect x="3" y="44" width="3" height="28" fill="#93c5fd" />
        </>
      )}
      {id === 'estate' && (
        <>
          <rect x="8" y="8" width="104" height="12" rx="1.5" fill={wall} fillOpacity="0.85" />
          <rect x="8" y="20" width="12" height="46" rx="1.5" fill={wall} fillOpacity="0.85" />
          <rect x="100" y="20" width="12" height="14" rx="1.5" fill={wall} fillOpacity="0.85" />
          <rect x="100" y="34" width="12" height="32" rx="1.5" fill={wall} fillOpacity="0.55" />
          <rect x="9.5" y="34" width="9" height="16" rx="1" fill="#ca8a04" />
          <rect x="50" y="9.5" width="20" height="9" rx="1" fill="#93c5fd" />
          <rect x="42" y="38" width="36" height="17" rx="2" fill="#ca8a04" fillOpacity="0.9" />
          {[48, 60, 72].map((x) => <circle key={x} cx={x} cy="63" r="3.2" fill={wall} fillOpacity="0.35" />)}
        </>
      )}
    </svg>
  );
}

// Countertop edge cross-sections.
export function EdgeIcon({ id, className }: { id: EdgeProfile; className?: string }) {
  const p: Record<EdgeProfile, string> = {
    eased: 'M4 10 H42 Q44 10 44 12 V22 Q44 24 42 24 H4 Z',
    bevel: 'M4 10 H38 L44 16 V24 H4 Z',
    bullnose: 'M4 10 H37 A7 7 0 0 1 37 24 H4 Z',
    mitered: 'M4 6 H42 Q44 6 44 8 V28 Q44 30 42 30 H4 Z',
  };
  return (
    <svg viewBox="0 0 48 36" className={className} aria-hidden="true">
      <path d={p[id]} fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
