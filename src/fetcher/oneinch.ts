import axios from "axios";

export async function getQuote(chainId: number, from: string, to: string, amount: string) {
  const url = `https://api.1inch.io/v5.0/${chainId}/quote`;
  const res = await axios.get(url, {
    params: { fromTokenAddress: from, toTokenAddress: to, amount }
  });
  return res.data;
}