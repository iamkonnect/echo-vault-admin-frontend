import React from 'react';
const P = ({ t, i, d }) => (<div><h1 style={s.t}>{i} {t}</h1><p style={s.s}>{d}</p><div style={s.b}><p style={s.m}>Content area</p></div></div>);
export default function MyMusic() { return <P t="My Music" i="🎵" d="Manage your songs" />; }
const s = { t: { fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '8px' }, s: { fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }, b: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '40px', textAlign: 'center' }, m: { color: '#888' } };
