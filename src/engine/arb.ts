export function findBest(prices: any, dexPrice: number) {
  let best: any = null;

  for (const [ex, price] of Object.entries(prices)) {
    if (!price) continue;

    const diff = dexPrice - (price as number);
    const percent = (diff / (price as number)) * 100;

    if (!best || Math.abs(percent) > Math.abs(best.percent)) {
      best = { ex, price, percent };
    }
  }

  return best;
}
