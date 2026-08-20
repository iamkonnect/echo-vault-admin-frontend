import React from 'react';
const P = ({ t, i, d }) => (<div><h1 style={s.title}>{i} {t}</h1><p style={s.sub}>{d}</p><div style={s.box}><p style={s.msg}>Content management area</p></div></div>);
export default function UploadSong() { return <P t="Upload Song" i="⬆️" d="Add new music to your profile" />; }
export function MyMusic() { return <P t="My Music" i="🎵" d="Manage your uploaded songs" />; }
export function UploadVideo() { return <P t="Upload Video" i="🎬" d="Share video content" />; }
export function UploadShorts() { return <P t="Upload Shorts" i="📹" d="Upload short-form videos (max 60 seconds)" />; }
export function ArtistRevenue() { return <P t="Revenue" i="💰" d="Track your earnings" />; }
export function ArtistInsights() { return <P t="Insights" i="📈" d="Analytics and performance metrics" />; }
export function ArtistLiveInsights() { return <P t="Live Insights" i="📊" d="Real-time statistics" />; }
const s = { title: { fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '8px' }, sub: { fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }, box: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '40px', textAlign: 'center' }, msg: { color: '#888', fontSize: '14px' } };
