import React from 'react';

const LOGO_URL = 'https://media.base44.com/images/public/6a26ff9818a50c7b968c3bf4/efa6c358d_RUSALEN-05.png';

export default function Logo({ className = '' }) {
  return (
    <img
      src={LOGO_URL}
      alt="RUSALEN — Международный исследовательский центр"
      className={`mix-blend-screen w-auto ${className}`}
    />
  );
}