import React from 'react';

function RecommendationCard({ recommendation }) {
  return (
    <div style={styles.card}>
      <h3>AI-Generated Insight (Demo)</h3>
      <pre style={styles.text}>{recommendation.insightText}</pre>
      <p>Status: {recommendation.status}</p>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd'
  },
  text: {
    whiteSpace: 'pre-wrap',
    fontSize: '0.9rem'
  }
};

export default RecommendationCard;
