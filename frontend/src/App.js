import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdvisorPanel from './pages/AdvisorPanel';

function App() {
  return (
    <Router>
      <header style={styles.header}>
        <h1>SmartFin Advisor</h1>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Client Dashboard</Link>
          <Link to="/advisor" style={styles.link}>Advisor Panel</Link>
        </nav>
      </header>

      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/advisor" element={<AdvisorPanel />} />
        </Routes>
      </main>
    </Router>
  );
}

const styles = {
  header: {
    background: '#111827',
    color: '#fff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nav: {
    display: 'flex',
    gap: '1rem'
  },
  link: {
    color: '#e5e7eb',
    textDecoration: 'none'
  },
  main: {
    padding: '1.5rem',
    maxWidth: '900px',
    margin: '0 auto'
  }
};

export default App;

