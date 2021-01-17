require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

module.exports = {
  port: process.env.PORT || 3003,
  databaseURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  agora: {
    appId: process.env.AGORA_APP_ID,
    appCertificate: process.env.AGORA_APP_CERTIFICATE,
  },
};
