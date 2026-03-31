import axios from "axios";

export async function getCexPrice(symbol: string) {
  try {
    const res = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    return Number(res.data.price);
  } catch {
    return null;
  }
}
