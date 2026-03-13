import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3001;

  app.use(express.json());

  // API Route for Contact Form
  app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const { SMTP_USER, SMTP_PASS } = process.env;

      if (!SMTP_USER || !SMTP_PASS) {
        console.error('Missing SMTP credentials in environment variables.');
        return res.status(500).json({ 
          error: 'Server configuration error: SMTP_USER and SMTP_PASS are not set in the AI Studio Secrets panel.' 
        });
      }

      // Configure your SMTP transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: 'lokmanhossen230@gmail.com',
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h3>New Message from Portfolio</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Email Error:', error);
      
      let errorMessage = 'Failed to send email. Please check your SMTP configuration.';
      
      if (error.code === 'EAUTH' || (error.response && error.response.includes('535'))) {
        errorMessage = 'Gmail Authentication Failed: Please ensure you are using a 16-character "App Password" from Google, NOT your regular Gmail password. Also, verify that SMTP_USER is your full email address.';
      }
      
      res.status(500).json({ error: errorMessage });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
