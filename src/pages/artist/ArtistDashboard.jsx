import React from 'react';

export default function ArtistDashboard({ user, stats }) {
  const s = stats || { totalSongs: 0, totalFollowers: 0, totalStreams: 0, revenue: 0 };

  return (
    <div>
      <h1 style={styles.title}>🎵 Artist Dashboard</h1>
      <p style={styles.subtitle}>Welcome, {user?.name || 'Artist'}</p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>🎵 TOTAL SONGS</div>
          <p style={styles.cardValue}>{s.totalSongs || 0}</p>
          <p style={styles.cardSub}>Available on platform</p>
        </div>
        <div style={styles.card}>
          <div style={styles.cardHeader}>👥 TOTAL FOLLOWERS</div>
          <p style={styles.cardValue}>{s.totalFollowers || 0}</p>
          <p style={styles.cardSub}>Following your channel</p>
        </div>
        <div style={styles.card}>
          <div style={styles.cardHeader}>▶️ TOTAL STREAMS</div>
          <p style={styles.cardValue}>{s.totalStreams || 0}</p>
          <p style={styles.cardSub}>All-time streams</p>
        </div>
        <div style={styles.card}>
          <div style={styles.cardHeader}>💰 TOTAL EARNINGS</div>
          <p style={styles.cardValue}>${s.revenue?.toFixed(2) || '0.00'}</p>
          <p style={styles.cardSub}>Lifetime earnings</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  title: { fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', textAlign: 'center' },
  cardHeader: { fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' },
  cardValue: { fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '8px' },
  cardSub: { fontSize: '12px', color: '#888' },
};
