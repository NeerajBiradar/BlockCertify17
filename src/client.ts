import { createThirdwebClient, defineChain } from "thirdweb";
import { getContract } from "thirdweb";
// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "b441772e5ce64d1bed0fb46b134fe8d0";

export const client = createThirdwebClient({
  clientId: clientId,
});

export const contract = getContract({
  client,
  chain: defineChain(59141),
  address: "0xc0370fC2917F2174e9cF00AabFFC1584b499f7f1"
});