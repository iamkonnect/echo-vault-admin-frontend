import React from 'react';

const Table = ({ title, icon, columns }) => (
  <div>
    <h1 style={styles.title}>{icon} {title}</h1>
    <div style={styles.card}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.th}>
            {columns.map(c => <th key={c} style={styles.td}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr style={styles.tr}><td style={{...styles.td, textAlign: 'center'}} colSpan={columns.length}>No data</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default function UserDirectory() { return <Table title="User Directory" icon="👥" columns={['ID', 'Name', 'Email', 'Role', 'Status', 'Actions']} />; }

const styles = { title: { fontSize: '32px', fontWeight: 'bold', color: '#10b981', marginBottom: '24px' }, card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', overflow: 'auto' }, table: { width: '100%', borderCollapse: 'collapse' }, th: { background: 'rgba(16, 185, 129, 0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }, tr: { borderBottom: '1px solid rgba(255,255,255,0.05)' }, td: { padding: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' } };
