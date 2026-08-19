import React from 'react';
const Placeholder = ({ title, icon }) => (
  <div>
    <h1 style={{ fontSize: '32px', color: '#10b981', marginBottom: '20px' }}>{icon} {title}</h1>
    <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '20px', borderRadius: '8px' }}>
      <p>Content for {title}</p>
    </div>
  </div>
);

export { Placeholder };
