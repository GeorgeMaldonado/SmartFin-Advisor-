import React, { useEffect, useState } from 'react';
import SummaryCard from '../components/SummaryCard';
import RecommendationCard from '../components/RecommendationCard';

const API_BASE = 'http://localhost:5000/api';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/user`).then(res => res.json()).then(setUser);
    fetch(`${API_BASE}/summary`).then(res => res.json()).then(setSummary);
  }, []);

  const generateInsight = async () => {
    if (!user) return;
    const res = await fetch(`${API_BASE}/ai-insight`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const data = await res.json();
    setRecommendation(data.recommendation);
  };

  return (
    <div>
      <h2>Client Dashboard</h2>
      {user && summary && <SummaryCard user={user} summary={summary} />}

      <button onClick={generateInsight} style={styles.button}>
        Generate AI Insight
      </button>

      {recommendation && (
        <div style={{ marginTop: '1rem' }}>
          <RecommendationCard recommendation={recommendation} />
        </div>
      )}
    </div>
  );
}

const styles = {
  button: {
    padding: '0.7rem 1.4rem',
    marginTop: '1rem',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#2563eb',
    color: 'white',
    fontWeight: 600
  }
};

export default Dashboard;
