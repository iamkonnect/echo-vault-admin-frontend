import React from 'react';

export default function GiftManagement() {
  return (
    <div style={{ width: '100%' }}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎁 Gift Management</h1>
        <p style={styles.subtitle}>Manage virtual gifts available on the platform</p>
      </div>

      <div style={styles.cardContainer}>
        <div style={styles.toolbar}>
          <button style={styles.btn}>+ Add Gift</button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableCell}>Gift Name</th>
              <th style={styles.tableCell}>Price</th>
              <th style={styles.tableCell}>Category</th>
              <th style={styles.tableCell}>Status</th>
              <th style={styles.tableCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={styles.tableRow}>
              <td style={{...styles.tableCell, textAlign: 'center', color: '#888'}} colSpan="5">No gifts configured yet</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
  toolbar: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
  },
  btn: {
    padding: '10px 16px',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px',
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
