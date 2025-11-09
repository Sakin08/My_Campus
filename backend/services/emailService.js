const nodemailer = require('nodemailer');
const config = require('../config');

let transporter = null;

function createTransporter() {
  if (transporter) return transporter;
  if (config.email.provider === 'smtp') {
    transporter = nodemailer.createTransport({
      host: config.email.smtp.host,
      port: Number(config.email.smtp.port || 587),
      secure: false,
      auth: {
        user: config.email.smtp.user,
        pass: config.email.smtp.pass
      }
    });
  } else {
    throw new Error('Unsupported email provider configured');
  }
  return transporter;
}

/**
 * Send OTP email
 * @param {string} to
 * @param {string} code
 */
async function sendOtpEmail(to, code) {
  const t = createTransporter();
  const html = `
    <p>CampusHub SUST — Your verification code is:</p>
    <h2>${code}</h2>
    <p>This code expires in ${config.otp.expiresMinutes} minutes.</p>
  `;
  await t.sendMail({
    from: config.email.from,
    to,
    subject: 'CampusHub SUST — Your OTP Code',
    html
  });
}

module.exports = {
  sendOtpEmail
};
