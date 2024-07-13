import axios from "axios";
import dotenv from "dotenv";
import { Telegraf } from "telegraf";

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);


export const getMsg = (url,ctx) =>{
    try {
      axios.get(url).then((response) => {
        console.log(response.data);
        const msg = response.data.question;
        bot.telegram.sendMessage(ctx.chat.id, msg, {});
      });
    } catch (error) {
      console.log("🚀 ~ getMsg ~ error:", error)
    }
  }