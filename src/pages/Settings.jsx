import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';

export default function Settings() {
  const [adminTab, setAdminTab] = useState('list');
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (adminTab === 'list') {
      fetchAdmins();
    }
  }, [adminTab]);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllAdmins();
      setAdmins(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching admins:', err);
      setError(err.response?.data?.message || 'Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      await apiService.createAdmin(formData);
      setSuccess('Admin created successfully!');
      setFormData({ name: '', email: '', password: '' });
      setAdminTab('list');
      fetchAdmins();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create admin');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;

    try {
      setLoading(true);
      await apiService.deleteAdmin(id);
      setSuccess('Admin deleted successfully');
      fetchAdmins();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚙️ Settings</h1>
      <p style={styles.subtitle}>Manage admin users and platform settings</p>

      {/* Tab Navigation */}
      <div style={styles.tabs}>
        <button
          style={{...styles.tab, backgroundColor: adminTab === 'list' ? '#10b981' : 'transparent'}}
          onClick={() => setAdminTab('list')}
        >
          Admin Users
        </button>
        <button
          style={{...styles.tab, backgroundColor: adminTab === 'create' ? '#10b981' : 'transparent'}}
          onClick={() => setAdminTab('create')}
        >
          Add Admin
        </button>
      </div>

      {success && <div style={styles.success}>{success}</div>}
      {error && <div style={styles.error}>{error}</div>}

      {/* Admin List */}
      {adminTab === 'list' && (
        <div style={styles.card}>
          {loading ? (
            <p style={styles.loading}>Loading admins...</p>
          ) : admins.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableCell}>Name</th>
                  <th style={styles.tableCell}>Email</th>
                  <th style={styles.tableCell}>Role</th>
                  <th style={styles.tableCell}>Created</th>
                  <th style={styles.tableCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{admin.name}</td>
                    <td style={styles.tableCell}>{admin.email}</td>
                    <td style={styles.tableCell}>
                      <span style={styles.badge}>{admin.role}</span>
                    </td>
                    <td style={styles.tableCell}>{new Date(admin.createdAt).toLocaleDateString()}</td>
                    <td style={styles.tableCell}>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDeleteAdmin(admin.id)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={styles.noData}>No admin users found</p>
          )}
        </div>
      )}

      {/* Create Admin */}
      {adminTab === 'create' && (
        <div style={styles.card}>
          <form onSubmit={handleCreateAdmin} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Admin Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={styles.input}
                placeholder="Enter admin name"
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={styles.input}
                placeholder="admin@echovaultz.com"
                disabled={loading}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={styles.input}
                placeholder="Set strong password"
                disabled={loading}
              />
            </div>

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { width: '100%' },
  title: { fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' },
  tabs: { display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' },
  tab: { padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', color: 'white', fontSize: '13px', fontWeight: 'bold', transition: 'all 0.2s' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px' },
  success: { background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.5)', color: '#86efac', padding: '12px 16px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' },
  error: { background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)', color: '#fca5a5', padding: '12px 16px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' },
  loading: { color: '#888', textAlign: 'center', padding: '40px' },
  noData: { color: '#888', textAlign: 'center', padding: '40px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { background: 'rgba(16,185,129,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  tableRow: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
  tableCell: { padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' },
  badge: { background: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' },
  deleteBtn: { padding: '6px 12px', background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.5)', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.9)' },
  input: { padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '13px', outline: 'none' },
  submitBtn: { padding: '12px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', marginTop: '8px' },
};
