export function calculateArb(dexPrice: number, cexPrice: number) {
  const diff = dexPrice - cexPrice;
  const percent = (diff / cexPrice) * 100;

  return {
    diff,
    percent,
  };
}
