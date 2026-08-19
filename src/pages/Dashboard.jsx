import React from 'react';

export default function Dashboard({ user }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Platform Control</h1>
      <p style={styles.subtitle}>Welcome, Super Admin</p>
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>👥</div>
          <p style={styles.metricValue}>0%</p>
          <p style={styles.metricLabel}>TOTAL USERS</p>
          <p style={styles.metricNumber}>0</p>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>⚡</div>
          <p style={styles.metricValue}>0%</p>
          <p style={styles.metricLabel}>ACTIVE ARTISTS</p>
          <p style={styles.metricNumber}>0</p>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>🎯</div>
          <p style={styles.metricValue}>0</p>
          <p style={styles.metricLabel}>PENDING PAYOUTS</p>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>📊</div>
          <p style={styles.metricValue}>0</p>
          <p style={styles.metricLabel}>ACTIVE REPORTS</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%' },
  title: { fontSize: '36px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '32px' },
  metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' },
  metricCard: { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '24px', textAlign: 'center' },
  metricIcon: { fontSize: '32px', marginBottom: '12px' },
  metricValue: { fontSize: '18px', color: '#10b981', fontWeight: 'bold', margin: '8px 0' },
  metricLabel: { fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '8px 0' },
  metricNumber: { fontSize: '32px', fontWeight: 'bold', color: 'white' },
};
