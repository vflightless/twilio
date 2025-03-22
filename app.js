import express from 'express';
import dotenv from 'dotenv';
import smsSend from './routes/smsSend.js';
import smsReceive from './routes/smsReceive.js';

// Load environment variables from a .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = 3333;

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming URL-encoded requests (required for Twilio webhooks)
app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/sms', smsSend);
app.use('/send-sms', smsReceive);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});