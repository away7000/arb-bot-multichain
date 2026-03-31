import axios from "axios";
import { CONFIG } from "../config";

export async function sendTelegram(msg: string) {
  await axios.post(`https://api.telegram.org/bot${CONFIG.TELEGRAM.token}/sendMessage`, {
    chat_id: CONFIG.TELEGRAM.chatId,
    text: msg
  });
}