import React from 'react';

const ContentTable = ({ title, icon, columns }) => (
  <div style={{ width: '100%' }}>
    <div style={styles.header}>
      <h1 style={styles.title}>{icon} {title}</h1>
    </div>
    <div style={styles.cardContainer}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            {columns.map((col) => (
              <th key={col} style={styles.tableCell}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr style={styles.tableRow}>
            <td style={{...styles.tableCell, textAlign: 'center', color: '#888'}} colSpan={columns.length}>No data available</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default function UserDirectory() {
  return <ContentTable title="User Directory" icon="👥" columns={['ID', 'Name', 'Email', 'Role', 'Status', 'Joined', 'Actions']} />;
}

export function ArtistVerification() {
  return <ContentTable title="Artist Verification" icon="⭐" columns={['Artist Name', 'Email', 'Genre', 'Followers', 'Status', 'Submitted', 'Actions']} />;
}

export function MusicManagement() {
  return <ContentTable title="Music Management" icon="🎵" columns={['Song Title', 'Artist', 'Genre', 'Streams', 'Status', 'Uploaded', 'Actions']} />;
}

export function VideoManagement() {
  return <ContentTable title="Video Management" icon="🎬" columns={['Video Title', 'Artist', 'Views', 'Status', 'Uploaded', 'Actions']} />;
}

export function ShortsManagement() {
  return <ContentTable title="Shorts Management" icon="📹" columns={['Short Title', 'Creator', 'Views', 'Status', 'Uploaded', 'Actions']} />;
}

export function AdsManagement() {
  return <ContentTable title="Ads Management" icon="📢" columns={['Ad Name', 'Type', 'Status', 'Impressions', 'Clicks', 'Created', 'Actions']} />;
}

export function SliderManagement() {
  return <ContentTable title="Slider Management" icon="🎠" columns={['Slider Name', 'Position', 'Status', 'Created', 'Updated', 'Actions']} />;
}

export function Payouts() {
  return <ContentTable title="Payouts" icon="💰" columns={['Artist', 'Amount', 'Method', 'Status', 'Requested', 'Processed', 'Actions']} />;
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
  cardContainer: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '24px',
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
