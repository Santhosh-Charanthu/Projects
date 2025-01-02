const telegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = "8019453245:AAG0Y0OyPzZS5cEPBg2-aZy0KbEpAVji9Bk";

const bot = new telegramBot(token, { polling: true });

const ranJoke = async () => {
  const url = "https://official-joke-api.appspot.com/random_joke";
  try {
    const res = await axios.get(url);
    const joke = res.data;
    return `${joke.setup} - ${joke.punchline}`;
  } catch (err) {
    return "Something went wrong. Could not fetch a joke.";
  }
};


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome! Send /joke to get a random joke.");
});

bot.onText(/\/joke/, async (msg) => {
  const chatId = msg.chat.id;
  const joke = await ranJoke();
  bot.sendMessage(chatId, joke);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (!msg.text.startsWith("/")) {
    bot.sendMessage(chatId, "I can tell you a joke! Send /joke to hear one.");
  }
});
