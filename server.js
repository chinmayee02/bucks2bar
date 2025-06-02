const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require("cors");
const rateLimit = require('express-rate-limit');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit : '5mb' })); // Increase the limit to handle larger images

// Rate limiter for the /send-email endpoint
const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per window
    message: 'Too many email requests from this IP, please try again later.',
});
app.use('/send-email', emailLimiter); // Apply rate limiting to the /send-email endpoint

app.post('/send-email', async (req, res) => {
    const { email, image } = req.body;
    console.log('Received request to send email:', {email, image});
    if (!email || !image) {
        return res.status(400).send('Email and image are required.');
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.resend.com', // Resend SMTP host
        port: 587,              // Resend SMTP port
        secure: false,          // Use TLS
        auth: {
            user: '', // Resend API key as the username
            pass: '',      // Leave the password empty for Resend
        },
    });

    const mailOptions = {
        from: 'your-email-id',
        to: email,
        subject: 'Your Chart Image',
        html: '<p>Here is your chart image:</p><img src= " />',
        attachments: [
            {
                filename: 'chart.png',
                content: image.split(',')[1], // Extract the base64 data
                encoding: 'base64', // Specify the encoding
            },
        ]    
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});