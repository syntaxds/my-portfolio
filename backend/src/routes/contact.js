const express = require('express');
const router = express.Router();

// In-memory storage for demo (replace with database in production)
const messages = [];

// POST /api/contact - Handle contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'All fields are required',
        fields: { name: !name, email: !email, message: !message }
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address'
      });
    }

    // Create message object
    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'unread'
    };

    // Store message (in production, save to database)
    messages.push(newMessage);

    // Log message to console
    console.log('📧 New Contact Message Received:');
    console.log('────────────────────────────────');
    console.log(`Name: ${newMessage.name}`);
    console.log(`Email: ${newMessage.email}`);
    console.log(`Message: ${newMessage.message}`);
    console.log(`Time: ${newMessage.timestamp}`);
    console.log('────────────────────────────────\n');

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      id: newMessage.id
    });

  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({
      error: 'Failed to send message. Please try again later.'
    });
  }
});

// GET /api/contact - Get all messages (for admin purposes)
router.get('/', (req, res) => {
  res.json({
    total: messages.length,
    messages: messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  });
});

// GET /api/contact/:id - Get specific message
router.get('/:id', (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find(msg => msg.id === messageId);
  
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }
  
  res.json(message);
});

module.exports = router;