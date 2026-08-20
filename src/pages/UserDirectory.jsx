import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';

export default function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await apiService.getAllUsers();
        setUsers(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.response?.data?.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 style={styles.title}>👥 User Directory</h1>
      <p style={styles.subtitle}>Manage all registered users</p>

      <div style={styles.card}>
        {loading ? (
          <p style={styles.loading}>Loading users...</p>
        ) : error ? (
          <p style={styles.error}>Error: {error}</p>
        ) : users.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>ID</th>
                <th style={styles.tableCell}>Name</th>
                <th style={styles.tableCell}>Email</th>
                <th style={styles.tableCell}>Role</th>
                <th style={styles.tableCell}>Verified</th>
                <th style={styles.tableCell}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{user.id.slice(0, 8)}...</td>
                  <td style={styles.tableCell}>{user.name}</td>
                  <td style={styles.tableCell}>{user.email}</td>
                  <td style={styles.tableCell}>
                    <span style={{ ...styles.badge, background: user.role === 'ADMIN' ? '#ef4444' : '#10b981' }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={styles.tableCell}>{user.isVerified ? '✅' : '⏳'}</td>
                  <td style={styles.tableCell}>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noData}>No users found</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  title: { fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', overflow: 'auto' },
  loading: { color: '#10b981', textAlign: 'center', padding: '40px' },
  error: { color: '#ef4444', textAlign: 'center', padding: '40px' },
  noData: { color: '#888', textAlign: 'center', padding: '40px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { background: 'rgba(16,185,129,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  tableRow: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
  tableCell: { padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' },
  badge: { padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', color: 'white' },
};
