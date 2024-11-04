import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = "b441772e5ce64d1bed0fb46b134fe8d0";

export const client = createThirdwebClient({
  clientId: clientId,
});
