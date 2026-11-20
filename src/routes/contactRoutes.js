const express = require('express');
const contacts = require('../data/contacts');

const router = express.Router();
let nextContactId = 1;

router.post('/', (req, res) => {
  const { name, email, message } = req.body || {};

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof message !== 'string' || !message.trim()
  ) {
    return res.status(400).json({
      success: false,
      error: {
        status: 400,
        message: 'Name, a valid email address, and message are required.'
      }
    });
  }

  const normalizedEmail = email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(normalizedEmail)) {
    return res.status(400).json({
      success: false,
      error: { status: 400, message: 'Please provide a valid email address.' }
    });
  }

  const contact = {
    id: nextContactId++,
    name: name.trim(),
    email: normalizedEmail,
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  contacts.push(contact);

  return res.status(201).json({
    success: true,
    message: 'Contact message received successfully.',
    data: contact
  });
});

module.exports = router;
