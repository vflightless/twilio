import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = 3333;

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming URL-encoded requests (required for Twilio webhooks)
app.use(express.urlencoded({ extended: true }));

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const forwardToNumber = process.env.FORWARD_TO_NUMBER; // The number to forward messages to

const client = twilio(accountSid, authToken);


// Check if known number?
// If Not, begin registration process
// If yes, is it an opt out request?
// if yes and not an opt out, forward message for processing

// Registration process
// 1. Send message to confirm registration
// 2. User responds with "yes"
// 3. Add user to known numbers
// 4. Send confirmation message

// Opt out process
// 1. Send message to confirm opt out
// 2. User responds with "yes"
// 3. Remove user from known numbers
// 4. Send confirmation message

// Forward message for processing
// command prefix?
// Yes: process command
// No: forward message to group



// Endpoint to send an SMS
/*
app.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;

  try {
    const sentMessage = await client.messages.create({
      body: message,
      from: twilioPhoneNumber, // Your Twilio phone number
      to: to, // The recipient phone number
    });
    res.status(200).send({ messageSid: sentMessage.sid });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
*/

// Endpoint to handle incoming SMS
app.post('/sms', async (req, res) => {
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

