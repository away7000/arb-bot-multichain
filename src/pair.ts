export const PAIRS = [
  { base: "USDT", quote: "USDC" },
  { base: "USDT", quote: "DAI" },
  { base: "WETH", quote: "USDT" },
  { base: "WBTC", quote: "USDT" },
  { base: "WETH", quote: "USDC" },
];

// ============================================
// FILE: src/fetcher/1inch.ts
// ============================================
import axios from "axios";

export async function getDexPrice(chainId: number, from: string, to: string, amount: string) {
  const res = await axios.get(`https://api.1inch.io/v5.0/${chainId}/quote`, {
    params: { fromTokenAddress: from, toTokenAddress: to, amount }
  });

  return res.data;
}
