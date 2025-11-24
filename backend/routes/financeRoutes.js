const express = require('express');
const router = express.Router();

const userData = require('../data/userSample.json');
let recommendations = require('../data/recommendations.json');

let nextRecommendationId = 1;

// GET /api/user
router.get('/user', (req, res) => {
  res.json(userData);
});

// GET /api/summary
router.get('/summary', (req, res) => {
  const { monthlyIncome, monthlyExpenses, currentSavings } = userData;
  const monthlyNet = monthlyIncome - monthlyExpenses;
  const savingsRate = +(monthlyNet / monthlyIncome * 100).toFixed(2);
  const suggestedSavings = +(monthlyIncome * 0.20).toFixed(2);
  res.json({ monthlyIncome, monthlyExpenses, currentSavings, monthlyNet, savingsRate, suggestedSavings });
});

// POST /api/ai-insight
router.post('/ai-insight', (req, res) => {
  const { monthlyIncome, monthlyExpenses, currentSavings, goals } = req.body || {};

  const income = monthlyIncome || userData.monthlyIncome;
  const expenses = monthlyExpenses || userData.monthlyExpenses;
  const savings = currentSavings || userData.currentSavings;
  const net = income - expenses;
  const savingsRate = +(net / income * 100).toFixed(2);

  let riskLevel = 'conservative';
  if (savingsRate >= 20) riskLevel = 'moderate';
  if (savingsRate >= 30) riskLevel = 'aggressive';

  const primaryGoal = goals?.[0] || userData.goals[0];
  const monthlyGoalContribution = +(primaryGoal.targetAmount / (primaryGoal.yearsToGoal * 12)).toFixed(2);

  const insightText = `
Based on the current profile, the estimated savings rate is ${savingsRate} percent.
A recommended benchmark is allocating 20 percent of income, approximately $${(income * 0.2).toFixed(0)} per month.
Capacity aligns with a "${riskLevel}" risk profile.
To reach the goal "${primaryGoal.name}", a monthly contribution of $${monthlyGoalContribution} is suggested.
This output is educational only and requires licensed advisor review before any decision.`;

  const recommendation = {
    id: nextRecommendationId++,
    userId: userData.id,
    createdAt: new Date().toISOString(),
    savingsRate,
    riskLevel,
    primaryGoal: primaryGoal.name,
    monthlyGoalContribution,
    insightText,
    status: 'PENDING_ADVISOR_REVIEW',
    advisorComment: ''
  };

  recommendations.push(recommendation);

  res.json({ message: 'AI insight generated', recommendation });
});

// GET /api/recommendations
router.get('/recommendations', (req, res) => {
  res.json(recommendations);
});

// POST /api/advisor-review
router.post('/advisor-review', (req, res) => {
  const { id, status, advisorComment } = req.body;
  const index = recommendations.findIndex(r => r.id === id);

  if (index === -1) return res.status(404).json({ error: 'Not Found' });

  recommendations[index].status = status;
  recommendations[index].advisorComment = advisorComment || '';

  res.json({ message: 'Updated', recommendation: recommendations[index] });
});

module.exports = router;
