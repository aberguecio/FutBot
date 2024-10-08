// openai.js
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getChatGPTResponse(messages) {
  const response = await openai.createChatCompletion({
    model: 'gpt-4o-mini',
    messages: messages,
  });
  return response.data.choices[0].message.content;
}

module.exports = { getChatGPTResponse };
