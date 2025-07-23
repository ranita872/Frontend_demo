// index.js

import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json()) // To parse JSON bodies

// Routes
app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp } = req.body;

  // Dummy check for now
  if (otp === '1234') {
    // Simulate setting a session or JWT cookie here
    res.status(200).json({ message: 'OTP verified successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body

  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' })
  }

  // Mock sending OTP logic (replace with real SMS service like Twilio)
  console.log(`Sending OTP to ${phone}`)

  return res.json({ message: 'OTP sent successfully!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
