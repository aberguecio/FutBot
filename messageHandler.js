// messageHandler.js
const { getChatGPTResponse } = require('./openai');
const { saveMessage, getUserMessages } = require('./database'); // Si usas base de datos

async function handleMessage(message) {
  if (message.fromMe) return;

  const user = message.from;
  const content = message.body;

  // Guarda el mensaje del usuario
  await saveMessage(user, 'user', content);

  if (!content.toLowerCase().includes('futbot')) {
    return;
  }

  // Obtén los mensajes anteriores del usuario
  const previousMessages = await getUserMessages(user);
  console.log('Mensajes anteriores:', previousMessages);

  // Formatea los mensajes para OpenAI
  const formattedMessages = previousMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  try {
    const replyContent = await getChatGPTResponse(formattedMessages);
    // Guarda la respuesta del bot
    await saveMessage(user, 'assistant', replyContent);
    await message.reply(replyContent);
    console.log(`Respondido a ${user}: ${replyContent}`);
  } catch (error) {
    console.error('Error al obtener respuesta de OpenAI:', error);
    await message.reply('Lo siento, hubo un error al procesar tu mensaje.');
  }
}

module.exports = { handleMessage };
