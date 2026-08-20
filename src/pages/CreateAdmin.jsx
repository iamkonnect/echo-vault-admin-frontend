import React from 'react';

const PageTemplate = ({ title, icon, description, children }) => (
  <div style={{ width: '100%' }}>
    <div style={styles.header}>
      <h1 style={styles.title}>{icon} {title}</h1>
      <p style={styles.subtitle}>{description}</p>
    </div>
    {children}
  </div>
);

export default function CreateAdmin() {
  const [formData, setFormData] = React.useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Admin creation would be submitted here');
  };

  return (
    <PageTemplate
      title="Add Admin"
      icon="➕"
      description="Grant admin access to new staff members"
    >
      <div style={styles.cardContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Set initial password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.submitBtn}>Create Admin Account</button>
        </form>
      </div>
    </PageTemplate>
  );
}

export function GiftManagement() {
  return (
    <PageTemplate
      title="Gift Management"
      icon="🎁"
      description="Manage virtual gifts available on the platform"
    >
      <div style={styles.cardContainer}>
        <div style={styles.placeholder}>
          <p>📦 No gifts configured yet</p>
          <p style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>Create gift packages for users to send to artists</p>
        </div>
      </div>
    </PageTemplate>
  );
}

export function Reports() {
  return (
    <PageTemplate
      title="Reports"
      icon="📋"
      description="View and manage user reports and complaints"
    >
      <div style={styles.cardContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>Report ID</th>
              <th style={styles.tableCell}>Type</th>
              <th style={styles.tableCell}>Reported By</th>
              <th style={styles.tableCell}>Status</th>
              <th style={styles.tableCell}>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={styles.tableRow}>
              <td style={styles.tableCell} colSpan="5">No reports available</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageTemplate>
  );
}

const styles = {
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  cardContainer: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  input: {
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
  },
  submitBtn: {
    padding: '12px 24px',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '8px',
  },
  placeholder: {
    textAlign: 'center',
    padding: '40px',
    color: '#888',
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
