require('dotenv').config();
const app = require('./src/app');

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
  console.log(`Personal Information API is running at http://localhost:${PORT}`);
  console.log('Press Ctrl + C to stop the server.');
});

module.exports = server;
