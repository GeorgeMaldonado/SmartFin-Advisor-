import React, { useEffect, useState } from 'react';

const API = 'http://localhost:5000/api';

function AdvisorPanel() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('APPROVED');

  useEffect(() => {
    fetch(`${API}/recommendations`)
      .then(res => res.json())
      .then(setItems);
  }, []);

  const update = async () => {
    if (!selected) return;
    await fetch(`${API}/advisor-review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: selected.id,
        status,
        advisorComment: comment
      })
    });
    alert('Review updated (demo).');
  };

  return (
    <div>
      <h2>Advisor Panel</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
        <div>
          {items.map(r => (
            <div
              key={r.id}
              style={styles.item}
              onClick={() => {
                setSelected(r);
                setComment(r.advisorComment || '');
                setStatus(r.status === 'PENDING_ADVISOR_REVIEW' ? 'APPROVED' : r.status);
              }}
            >
              Recommendation #{r.id} — {r.status}
            </div>
          ))}
        </div>

        <div>
          {!selected && <p>Select a recommendation to review.</p>}
          {selected && (
            <>
              <p><strong>Risk: {selected.riskLevel}</strong></p>

              <label>
                Status:
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  style={{ marginLeft: '0.5rem' }}
                >
                  <option value="APPROVED">APPROVED</option>
                  <option value="REQUIRES_FOLLOW_UP">REQUIRES_FOLLOW_UP</option>
                </select>
              </label>

              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={4}
                style={styles.textarea}
                placeholder="Advisor comments..."
              />

              <button onClick={update} style={styles.button}>Save Review</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  item: {
    padding: '0.7rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    cursor: 'pointer'
  },
  textarea: {
    width: '100%',
    marginTop: '1rem',
    padding: '0.5rem'
  },
  button: {
    padding: '0.5rem 1rem',
    marginTop: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#059669',
    color: '#fff',
    fontWeight: 600
  }
};

export default AdvisorPanel;
