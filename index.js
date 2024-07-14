import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { Telegraf } from "telegraf";
import { getMsg } from "./lib/function.js";
import axios from "axios";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const bot = new Telegraf(process.env.BOT_TOKEN);
app.use(express.static("static"));
app.use(express.json());
app.listen(port, () => console.log(`Listening on ${port}`));
bot.launch();

app.get("/", (req, res) => {
  res.status(200).json("Klee listening...")
  // res.sendFile(path.join(__dirname + "/index.html"));
});




bot.command("start", (ctx) => {
  console.log(ctx.from);
  console.log(ctx.botInfo);
  const msg = `Hello there >< 👋🏻 \n
i'am Klee, what can klee do for you `
  bot.telegram.sendMessage(ctx.chat.id, msg, {});
});


// Truth Or Dare 
bot.command("truth", async (ctx) => {
  getMsg('https://api.truthordarebot.xyz/api/truth',ctx)
});

bot.command("dare", async (ctx) => {
  getMsg('https://api.truthordarebot.xyz/api/dare',ctx)
});

bot.command(['wyr'], async (ctx) => {
  console.log(ctx.from);
  getMsg('https://api.truthordarebot.xyz/api/wyr',ctx)
});

bot.command(['nhie'], async (ctx) => {
  getMsg('https://api.truthordarebot.xyz/api/nhie',ctx)
});
bot.command(['paranoia'], async (ctx) => {
  getMsg('https://api.truthordarebot.xyz/api/paranoia',ctx)
});


bot.command("usd", (ctx) => {
  console.log(ctx.from);
  axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`).then((response) => {
    console.log(response.data);
    const data = response.data;
    const message = `Hello, per tanggal ${data.date} \nNilai dollar setara dengan ${data.usd.idr} Rupiah Indonesia`;
    bot.telegram.sendMessage(ctx.chat.id, message, {});
  });
});
bot.command("quotes", (ctx) => {
  console.log(ctx.from);
  axios.get(`https://api.quotable.io/random`).then((response) => {
    console.log(response.data);
    const data = response.data;
    const quotes = `"${data.content}" \n\n ~ ${data.author}`;
    const msg = `
    Here's the quote of the day for you, Master : \n\n${quotes}\n
    `
    bot.telegram.sendMessage(ctx.chat.id, msg, {});
  });
});


bot.command(['help','menu'], (ctx) => {
  console.log(ctx.from);
  const msg = `
Sure, Klee can help you to find what you need. 
You can whisper klee by sending these commands:

*Truth Or Dare Game*
truth - Get Truth
dare - Get Dare
wyr - Get Would You Rather
nhie - Get Never Have I Ever
paranoia - Get Paranoia Question
`
    bot.telegram.sendMessage(ctx.chat.id, msg, {});
});


bot.on("text", (ctx) => {
  const text = ctx.message.text; // works!
  console.log(text);
  ctx.reply('Yaw!')
});