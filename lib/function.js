import axios from "axios";
import dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

export const getMsg = (url, ctx) => {
  try {
    axios.get(url).then( async (response) => {
      console.log(response.data);
      const msgg = response.data.question;
      const msg = await translateEng(msgg)
      const pretty = `
      Eng : ${msgg} \n\nIndo : ${msg ?? '-'}
      `
      bot.telegram.sendMessage(ctx.chat.id, pretty, {});
    });
  } catch (error) {
    console.log("🚀 ~ getMsg ~ error:", error);
  }
};

export async function translateEng(text) {
  const url = `https://lingva-translate-qzcqp1sbo-lingva-team.vercel.app/api/v1/en/id/${encodeURIComponent(text)}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    console.log("🚀 ~ app.get ~ data:", data);
    return data.translation;
  } catch (error) {
    console.log("🚀 ~ translateEng ~ error:", error);
  }
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const parseStringify = (value) => JSON.parse(JSON.stringify(value));

export async function jadwalsholat() {
  const date = new Date()
  const formattedDate = await formatDate(date)
  console.log("🚀 ~ jadwalsholat ~ formattedDate:", formattedDate)
  const url = `https://api.myquran.com/v2/sholat/jadwal/1636/${formattedDate}`
  try {
    const response = await axios.get(url)
    const data = await response.data.data.jadwal;
    console.log("🚀 ~ app.get ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ translateEng ~ error:", error);
  }
}