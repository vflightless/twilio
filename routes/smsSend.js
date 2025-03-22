import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Twilio credentials
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const forwardToNumber = process.env.FORWARD_TO_NUMBER;

const client = twilio(accountSid, authToken);

const router = express.Router();

// Endpoint to handle incoming SMS
router.post('/', async (req, res) => {
  const { From, Body } = req.body; // Extract sender and message body from Twilio webhook

  try {
    // Forward the received message to the specified number
    const forwardedMessage = await client.messages.create({
      body: `Forwarded message from ${From}: ${Body}`,
      from: twilioPhoneNumber, // Your Twilio phone number
      to: forwardToNumber, // The number to forward the message to
    });

    res.status(200).send('<Response></Response>'); // Respond with an empty TwiML response
  } catch (error) {
    console.error('Error forwarding message:', error.message);
    res.status(500).send('<Response></Response>'); // Respond with an empty TwiML response on error
  }
});

export default router;