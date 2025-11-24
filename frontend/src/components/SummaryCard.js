import React from 'react';

function SummaryCard({ user, summary }) {
  return (
    <div style={styles.card}>
      <h3>Financial Overview</h3>
      <p>{user.name} — {user.occupation}</p>
      <ul>
        <li>Monthly Income: ${summary.monthlyIncome}</li>
        <li>Monthly Expenses: ${summary.monthlyExpenses}</li>
        <li>Monthly Net: ${summary.monthlyNet}</li>
        <li>Savings Rate: {summary.savingsRate}%</li>
        <li>Suggested Savings: ${summary.suggestedSavings}</li>
        <li>Current Savings: ${summary.currentSavings}</li>
      </ul>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '1rem'
  }
};

export default SummaryCard;
