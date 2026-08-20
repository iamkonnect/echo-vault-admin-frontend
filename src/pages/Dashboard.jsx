import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';

export default function Dashboard({ user, stats }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const response = await apiService.getDashboard('admin');
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const platformStats = data || stats || {
    totalUsers: 0,
    activeArtists: 0,
    pendingPayouts: 0,
    activeReports: 0,
    revenue: 0,
    totalSongs: 0,
    totalVideos: 0,
  };

  if (loading) {
    return <div style={styles.loading}>Loading dashboard...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Platform Control</h1>
          <p style={styles.subtitle}>Welcome, {user?.name || 'Admin'} - {user?.role || 'Super Admin'}</p>
        </div>
        <div style={styles.revenueCard}>
          <p style={styles.revenueLabel}>Platform Revenue</p>
          <p style={styles.revenueValue}>${platformStats.revenue?.toFixed(2) || '0.00'}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <span style={styles.metricIcon}>👥</span>
            <span style={styles.metricLabel}>TOTAL USERS</span>
          </div>
          <p style={styles.metricNumber}>{platformStats.totalUsers || 0}</p>
          <p style={styles.metricChange}>All registered users</p>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <span style={styles.metricIcon}>⚡</span>
            <span style={styles.metricLabel}>ACTIVE ARTISTS</span>
          </div>
          <p style={styles.metricNumber}>{platformStats.activeArtists || 0}</p>
          <p style={styles.metricChange}>Currently active</p>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <span style={styles.metricIcon}>🎵</span>
            <span style={styles.metricLabel}>TOTAL SONGS</span>
          </div>
          <p style={styles.metricNumber}>{platformStats.totalSongs || 0}</p>
          <p style={styles.metricChange}>On platform</p>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <span style={styles.metricIcon}>🎬</span>
            <span style={styles.metricLabel}>TOTAL VIDEOS</span>
          </div>
          <p style={styles.metricNumber}>{platformStats.totalVideos || 0}</p>
          <p style={styles.metricChange}>On platform</p>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <span style={styles.metricIcon}>💰</span>
            <span style={styles.metricLabel}>PENDING PAYOUTS</span>
          </div>
          <p style={styles.metricNumber}>{platformStats.pendingPayouts || 0}</p>
          <p style={styles.metricChange}>Awaiting approval</p>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricHeader}>
            <span style={styles.metricIcon}>📋</span>
            <span style={styles.metricLabel}>ACTIVE REPORTS</span>
          </div>
          <p style={styles.metricNumber}>{platformStats.activeReports || 0}</p>
          <p style={styles.metricChange}>Requires attention</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.actionsSection}>
        <h3 style={styles.sectionTitle}>⚡ Quick Actions</h3>
        <div style={styles.actionGrid}>
          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>👥</div>
            <p style={styles.actionTitle}>User Directory</p>
            <p style={styles.actionDesc}>Manage all users</p>
          </div>
          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>⭐</div>
            <p style={styles.actionTitle}>Artist Verification</p>
            <p style={styles.actionDesc}>Verify new artists</p>
          </div>
          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>➕</div>
            <p style={styles.actionTitle}>Add Admin</p>
            <p style={styles.actionDesc}>Grant admin access</p>
          </div>
          <div style={styles.actionCard}>
            <div style={styles.actionIcon}>💳</div>
            <p style={styles.actionTitle}>Review Payouts</p>
            <p style={styles.actionDesc}>Approve withdrawals</p>
          </div>
        </div>
      </div>

      {/* Recent Withdrawals */}
      <div style={styles.withdrawalsSection}>
        <h3 style={styles.sectionTitle}>📋 Recent Withdrawals</h3>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>Artist</th>
                <th style={styles.tableCell}>Amount</th>
                <th style={styles.tableCell}>Status</th>
                <th style={styles.tableCell}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr style={styles.tableRow}>
                <td style={{...styles.tableCell, textAlign: 'center'}} colSpan="4">No withdrawals yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  loading: { fontSize: '16px', color: '#10b981', padding: '40px', textAlign: 'center' },
  error: { fontSize: '16px', color: '#ef4444', padding: '40px', textAlign: 'center' },
  container: { width: '100%' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  revenueCard: {
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '12px',
    padding: '16px 24px',
    textAlign: 'center',
  },
  revenueLabel: {
    fontSize: '12px',
    color: '#10b981',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  },
  revenueValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#10b981',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '40px',
  },
  metricCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '24px',
    transition: 'all 0.3s ease',
  },
  metricHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  metricIcon: {
    fontSize: '24px',
  },
  metricLabel: {
    fontSize: '11px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  metricNumber: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '8px',
  },
  metricChange: {
    fontSize: '12px',
    color: '#10b981',
  },
  actionsSection: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: 'white',
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  actionCard: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  actionIcon: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  actionTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  actionDesc: {
    fontSize: '12px',
    color: '#888',
  },
  withdrawalsSection: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '24px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    background: 'rgba(16, 185, 129, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  tableRow: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  tableCell: {
    padding: '12px',
    textAlign: 'left',
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
};
