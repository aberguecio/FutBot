const { Client, LocalAuth } = require('whatsapp-web.js');

// Inicializa el cliente con opciones de autenticación local
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'sessions',
        clientId: 'bot-session'
    }),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
});

const qrcode = require('qrcode-terminal');

client.on('qr', (qr) => {
    console.log('QR recibido, escanéalo con tu teléfono:');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('Autenticado correctamente');
});

client.on('auth_failure', (message) => {
    console.error('Error de autenticación:', message);
});

client.once('ready', () => {
    console.log('Cliente listo para usar');
});

client.on('message', message => {
    console.log(`Mensaje recibido de ${message.from}: ${message.body}`);
    if (message.body === '!ping') {
        message.reply('pong');
        console.log('Respondido: pong');
    }
});

client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
});

client.on('change_state', (state) => {
    console.log('Estado del cliente:', state);
});

client.on('error', (err) => {
    console.error('Error en el cliente:', err);
});

client.initialize();
