import { getQuote } from "./fetcher/oneinch";
import { findArbitrage } from "./engine/arbitrage";
import { sendTelegram } from "./notifier/telegram";

const TOKENS = {
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  USDC: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
};

async function scan() {
  try {
    const quotes: any[] = [];

    const eth = await getQuote(1, TOKENS.USDT, TOKENS.USDC, "100000000");
    const bsc = await getQuote(56, TOKENS.USDT, TOKENS.USDC, "100000000");

    quotes.push({
      chain: "eth",
      from: TOKENS.USDT,
      to: TOKENS.USDC,
      in: eth.fromTokenAmount,
      out: eth.toTokenAmount,
    });

    quotes.push({
      chain: "bsc",
      from: TOKENS.USDT,
      to: TOKENS.USDC,
      in: bsc.fromTokenAmount,
      out: bsc.toTokenAmount,
    });

    const opps = findArbitrage(quotes);

    if (opps.length > 0) {
      const best = opps[0];
      const msg = `🚨 ARB\n${best.a.chain} → ${best.b.chain}\nProfit: ${best.profit}`;
      console.log(msg);
      await sendTelegram(msg);
    }
  } catch (err) {
    console.error(err);
  }
}

setInterval(scan, 5000);