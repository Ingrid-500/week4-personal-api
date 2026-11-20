const express = require('express');
const { skills } = require('../data/profile');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: skills.length,
    data: skills
  });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      error: { status: 400, message: 'Skill ID must be a positive integer.' }
    });
  }

  const skill = skills.find((item) => item.id === id);

  if (!skill) {
    return res.status(404).json({
      success: false,
      error: { status: 404, message: `Skill with ID ${id} was not found.` }
    });
  }

  return res.status(200).json({ success: true, data: skill });
});

module.exports = router;
