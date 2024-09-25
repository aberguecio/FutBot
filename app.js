// app.js
require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleMessage } = require('./messageHandler');

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: 'sessions',
    clientId: 'bot-session',
  }),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('qr', (qr) => {
  console.log('QR recibido, escanéalo con tu teléfono:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Cliente listo para usar');
});

client.on('message', handleMessage);

client.initialize();
