import axios from "axios";

export async function getDexPrice(chainId: number, from: string, to: string, amount: string) {
  const res = await axios.get(`https://api.1inch.io/v5.0/${chainId}/quote`, {
    params: { fromTokenAddress: from, toTokenAddress: to, amount }
  });

  return res.data;
}
