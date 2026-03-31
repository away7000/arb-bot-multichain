import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  RPC: {
    eth: process.env.RPC_ETH!,
    bsc: process.env.RPC_BSC!,
  },
  TELEGRAM: {
    token: process.env.TELEGRAM_TOKEN!,
    chatId: process.env.TELEGRAM_CHAT_ID!,
  },
  PRIVATE_KEY: process.env.PRIVATE_KEY!,
};