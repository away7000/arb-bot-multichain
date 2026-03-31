export function findArbitrage(quotes: any[]) {
  const opps: any[] = [];
  for (const a of quotes) {
    for (const b of quotes) {
      if (a.chain !== b.chain && a.to === b.from) {
        const profit = Number(b.out) - Number(a.in);
        if (profit > 0) opps.push({ a, b, profit });
      }
    }
  }
  return opps.sort((a, b) => b.profit - a.profit);
}