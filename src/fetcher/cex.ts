import axios from "axios";

const EXCHANGES = ["binance", "bybit", "okx", "kucoin", "gate", "mexc"];

async function fetchPrice(exchange: string, symbol: string) {
  try {
    switch (exchange) {

      case "binance":
        return Number((await axios.get(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        )).data.price);

      case "bybit":
        return Number((await axios.get(
          `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbol}`
        )).data.result.list[0].lastPrice);

      case "okx":
        return Number((await axios.get(
          `https://www.okx.com/api/v5/market/ticker?instId=${symbol.replace("USDT","-USDT")}`
        )).data.data[0].last);

      case "kucoin":
        return Number((await axios.get(
          `https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=${symbol.replace("USDT","-USDT")}`
        )).data.data.price);

      case "gate":
        return Number((await axios.get(
          `https://api.gateio.ws/api/v4/spot/tickers?currency_pair=${symbol.replace("USDT","_USDT")}`
        )).data[0].last);

      case "mexc":
        return Number((await axios.get(
          `https://api.mexc.com/api/v3/ticker/price?symbol=${symbol}`
        )).data.price);

      default:
        return null;
    }
  } catch {
    return null;
  }
}

export async function getAllPrices(symbol: string) {
  const results: any = {};

  await Promise.all(
    EXCHANGES.map(async (ex) => {
      const price = await fetchPrice(ex, symbol);
      if (price) results[ex] = price;
    })
  );

  return results;
}
