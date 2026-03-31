import { PAIRS } from "./pairs";
import { TOKENS } from "./tokens";
import { getDexPrice } from "./fetcher/1inch";
import { getAllPrices } from "./fetcher/cex";
import { findBest } from "./engine/arb";
import { sendTelegram } from "./notifier/telegram";
import { getTopCoins } from "./fetcher/globalPairs";

console.log("BOT STARTED 🚀");

async function scan() {
  console.log("Scanning...");

  for (const pair of PAIRS) {
    try {
      const symbol = pair.base + pair.quote;

      const cexPrices = await getAllPrices(symbol);

      const dex = await getDexPrice(
        1,
        TOKENS[pair.base],
        TOKENS[pair.quote],
        "1000000000000000000"
      );

      const dexPrice =
        Number(dex.toTokenAmount) /
        Number(dex.fromTokenAmount);

      const best = findBest(cexPrices, dexPrice);

      // 👉 NAH DISINI TARO
      if (best && Math.abs(best.percent) > 0.5) {
        const msg = `
🚨 GLOBAL ARB
${pair.base}/${pair.quote}
DEX: ${dexPrice}
${best.ex.toUpperCase()}: ${best.price}
Spread: ${best.percent.toFixed(2)}%
`;

        console.log(msg);
        await sendTelegram(msg);
      }

    } catch (err) {
      console.error("ERROR:", pair, err);
    }
  }
}

scan();
setInterval(scan, 8000);
