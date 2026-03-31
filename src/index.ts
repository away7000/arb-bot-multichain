import { PAIRS } from "./pairs";
import { TOKENS } from "./tokens";
import { getDexPrice } from "./fetcher/1inch";
import { getCexPrice } from "./fetcher/binance";
import { sendTelegram } from "./notifier/telegram";
import { calculateArb } from "./engine/arb";

const best = findBest(cexPrices, dexPrice);

if (!best) return;

if (Math.abs(best.percent) > 0.5) {
  const msg = `
🚨 GLOBAL ARB
${pair.base}/${pair.quote}
DEX: ${dexPrice}
${best.ex.toUpperCase()}: ${best.price}
Spread: ${best.percent.toFixed(2)}%
`;

  await sendTelegram(msg);
}

console.log("BOT STARTED 🚀");

async function scan() {
  console.log("Scanning...");

  for (const pair of PAIRS) {
    try {
      const symbol = pair.base + pair.quote;

      const cexPrice = await getCexPrice(symbol);
      if (!cexPrice) continue;

      const dex = await getDexPrice(
        1,
        TOKENS[pair.base],
        TOKENS[pair.quote],
        "1000000000000000000"
      );

      const dexPrice = Number(dex.toTokenAmount) / Number(dex.fromTokenAmount);

      const arb = calculateArb(dexPrice, cexPrice);

      console.log(pair.base, pair.quote, "DEX:", dexPrice, "CEX:", cexPrice);

      if (Math.abs(arb.percent) > 0.5) {
        const msg = `🚨 ARB\n${pair.base}/${pair.quote}\nDEX: ${dexPrice}\nCEX: ${cexPrice}\nDiff: ${arb.percent.toFixed(2)}%`;

        console.log(msg);
        await sendTelegram(msg);
      }

    } catch (err) {
      console.error("ERROR PAIR:", pair, err);
    }
  }
}

scan();
setInterval(scan, 8000);
