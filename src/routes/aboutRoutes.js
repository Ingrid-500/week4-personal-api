const express = require('express');
const { profile } = require('../data/profile');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: profile
  });
});

module.exports = router;
