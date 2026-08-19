import React from 'react';

export default function ArtistDashboard({ user }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Artist Dashboard</h1>
      <p style={styles.subtitle}>Welcome, Artist</p>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🎵</div>
          <p style={styles.statValue}>0</p>
          <p style={styles.statLabel}>TOTAL SONGS</p>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <p style={styles.statValue}>0</p>
          <p style={styles.statLabel}>TOTAL FOLLOWERS</p>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>▶️</div>
          <p style={styles.statValue}>0</p>
          <p style={styles.statLabel}>TOTAL STREAMS</p>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <p style={styles.statValue}>$0</p>
          <p style={styles.statLabel}>TOTAL EARNINGS</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%' },
  title: { fontSize: '36px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '32px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' },
  statCard: { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '24px', textAlign: 'center' },
  statIcon: { fontSize: '32px', marginBottom: '12px' },
  statValue: { fontSize: '28px', fontWeight: 'bold', color: '#8b5cf6', margin: '8px 0' },
  statLabel: { fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' },
};
