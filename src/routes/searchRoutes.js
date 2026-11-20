const express = require('express');
const { profile, skills } = require('../data/profile');

const router = express.Router();

router.get('/', (req, res) => {
  const query = typeof req.query.q === 'string' ? req.query.q.trim() : '';

  if (!query) {
    return res.status(400).json({
      success: false,
      error: { status: 400, message: 'Search query is required. Use /search?q=keyword.' }
    });
  }

  const searchableProfile = [
    profile.name,
    profile.role,
    profile.institution,
    profile.location,
    profile.summary,
    ...profile.languages,
    ...profile.strengths,
    ...profile.experience.flatMap((item) => [item.role, item.organization, item.period, item.description])
  ].join(' ').toLowerCase();

  const matchingSkills = skills.filter((skill) =>
    `${skill.name} ${skill.category} ${skill.level}`.toLowerCase().includes(query.toLowerCase())
  );

  const profileMatches = searchableProfile.includes(query.toLowerCase());
  const results = {
    profile: profileMatches ? profile : null,
    skills: matchingSkills
  };
  const total = (profileMatches ? 1 : 0) + matchingSkills.length;

  return res.status(200).json({
    success: true,
    query,
    count: total,
    data: results
  });
});

module.exports = router;
