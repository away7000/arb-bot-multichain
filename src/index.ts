import { PAIRS } from "./pairs";
import { TOKENS } from "./tokens";
import { getDexPrice } from "./fetcher/1inch";
import { getAllPrices } from "./fetcher/cex";
import { findBest } from "./engine/arb";

console.log("BOT STARTED 🚀");

async function scan() {
  console.log("Scanning...");

  for (const pair of PAIRS) {
    try {
      const symbol = pair.base + pair.quote;

      const cexPrices = await getAllPrices(symbol);
      console.log("CEX:", cexPrices);

      const dex = await getDexPrice(
        1,
        TOKENS[pair.base],
        TOKENS[pair.quote],
        "1000000000000000000"
      );

      const dexPrice =
        Number(dex.toTokenAmount) /
        Number(dex.fromTokenAmount);

      console.log("DEX:", dexPrice);

      const best = findBest(cexPrices, dexPrice);
      console.log("BEST:", best);

    } catch (err) {
      console.error("ERROR:", pair, err);
    }
  }
}

scan();
setInterval(scan, 8000);
