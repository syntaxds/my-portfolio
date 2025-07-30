// api/contact.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
      status: 'received'
    };

    // Log message (you can see this in Vercel function logs)
    console.log('📧 New Contact Message Received:');
    console.log('────────────────────────────────');
    console.log(`Name: ${newMessage.name}`);
    console.log(`Email: ${newMessage.email}`);
    console.log(`Message: ${newMessage.message}`);
    console.log(`Time: ${newMessage.timestamp}`);
    console.log('────────────────────────────────');

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
}