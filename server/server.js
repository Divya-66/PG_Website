import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Mapping of PG properties to client emails
const pgClientMap = {
  'xyz': 'divya.sabharwal2023@vitstudent.ac.in',
  'Comfort PG - Central': 'client2@example.com',
  'Elite PG - Tech Park': 'client3@example.com',
};

// Nodemailer configuration for Brevo
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_API_KEY,
  },
});

app.post('/send-email', async (req, res) => {
  const { name, email, phone, pgProperty, visitDate, notes } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !pgProperty || !visitDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Get client email based on pgProperty
  const clientEmail = pgClientMap[pgProperty];
  if (!clientEmail) {
    return res.status(400).json({ message: `No client email found for PG property: ${pgProperty}` });
  }

  // Sender email (must be verified in Brevo)
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'no-reply@yourdomain.com';

  // Customer email template
  const subjectCustomer = `Your Booking Confirmation for ${pgProperty}`;
  const htmlCustomer = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7fa;">
      <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #1a3c5e; font-size: 24px; margin: 0 0 20px; text-align: center;">Booking Confirmation</h1>
        <p style="color: #333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
          Dear ${name},
        </p>
        <p style="color: #333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
          Thank you for booking a visit to <strong>${pgProperty}</strong>. We are excited to assist you in exploring our premium PG accommodations.
        </p>
        <h2 style="color: #1a3c5e; font-size: 20px; margin: 20px 0 10px;">Your Visit Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0; table-layout: fixed;">
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>Name:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>Phone:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>PG Property:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${pgProperty}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>Visit Date & Time:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${visitDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>Notes:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${notes || 'N/A'}</td>
          </tr>
        </table>
        <p style="color: #333; font-size: 16px; line-height: 1.5; margin: 20px 0;">
          Our team will contact you shortly to confirm your visit and provide further details. If you have any questions, feel free to reach out to us at <a href="mailto:${senderEmail}" style="color: #2a7ae2; text-decoration: none;">${senderEmail}</a>.
        </p>
        <p style="color: #333; font-size: 16px; line-height: 1.5; margin: 20px 0;">
          Best regards,<br>
          The PG Booking Team
        </p>
      </div>
      <div style="text-align: center; padding: 10px; color: #666; font-size: 12px;">
        © 2025 PG Booking. All rights reserved.
      </div>
    </div>
  `;

  // Client email template
  const subjectClient = `New Booking Request: ${name} for ${pgProperty}`;
  const htmlClient = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7fa;">
      <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #1a3c5e; font-size: 24px; margin: 0 0 20px; text-align: center;">New Booking Request</h1>
        <p style="color: #333; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
          A new booking request has been received for <strong>${pgProperty}</strong>. Please review the details below and follow up with the customer.
        </p>
        <h2 style="color: #1a3c5e; font-size: 20px; margin: 20px 0 10px;">Booking Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0; table-layout: fixed;">
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>Name:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>Email:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>Phone:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>PG Property:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${pgProperty}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>Visit Date & Time:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${visitDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 40%; vertical-align: top;"><strong>Notes:</strong></td>
            <td style="padding: 10px; font-size: 16px; color: #333; border-bottom: 1px solid #e0e0e0; width: 60%; word-wrap: break-word; overflow-wrap: break-word;">${notes || 'N/A'}</td>
          </tr>
        </table>
        <p style="color: #333; font-size: 16px; line-height: 1.5; margin: 20px 0;">
          Please contact the customer at <a href="mailto:${email}" style="color: #2a7ae2; text-decoration: none;">${email}</a> or <a href="tel:${phone}" style="color: #2a7ae2; text-decoration: none;">${phone}</a> to confirm the visit or discuss further details.
        </p>
        <p style="color: #333; font-size: 16px; line-height: 1.5; margin: 20px 0;">
          Best regards,<br>
          The PG Booking Team
        </p>
      </div>
      <div style="text-align: center; padding: 10px; color: #666; font-size: 12px;">
        © 2025 PG Booking. All rights reserved.
      </div>
    </div>
  `;

  try {
    // Send email to customer
    await transporter.sendMail({
      from: `"PG Booking" <${senderEmail}>`,
      to: email,
      subject: subjectCustomer,
      html: htmlCustomer,
    });

    // Send email to client
    await transporter.sendMail({
      from: `"PG Booking" <${senderEmail}>`,
      to: clientEmail,
      subject: subjectClient,
      html: htmlClient,
    });

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Failed to send emails', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});