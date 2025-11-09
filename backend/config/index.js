const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpires: process.env.ACCESS_TOKEN_EXPIRES || '15m',
    refreshExpires: process.env.REFRESH_TOKEN_EXPIRES || '7d'
  },
  cookie: {
    domain: process.env.COOKIE_DOMAIN || 'localhost',
    secure: process.env.COOKIE_SECURE === 'true' || false,
    httpOnly: true,
  },
  email: {
    provider: process.env.EMAIL_PROVIDER || 'smtp',
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    from: process.env.FROM_EMAIL || 'CampusHub <noreply@campushub.sust.edu>'
  },
  otp: {
    expiresMinutes: parseInt(process.env.OTP_EXPIRES_MINUTES || '5', 10),
    rateLimitPerHour: parseInt(process.env.OTP_RATE_LIMIT_PER_HOUR || '5', 10)
  },
  maxImageUploads: parseInt(process.env.MAX_IMAGE_UPLOADS || '6', 10)
};
