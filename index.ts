import { ethers } from "ethers";
import { DELAY_SECONDS_MAX, DELAY_SECONDS_MIN, PRIVATE_KEYS_FILEPATH, RPC_URL } from "./config";
import { getRandomInteger, getRandomNumber, readFileLines, sleep } from "./utils";
import { routerAbi } from "./abi";
import logger from "./utils/logger";

const routerContractAddr = "0x39E48491b3A182C3F6b699281d74aF9f8a620CFa";

const main = async () => {
  const privateKeys = readFileLines(PRIVATE_KEYS_FILEPATH);
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  logger.divider();
  for (let i = 0; i < privateKeys.length; i++) {
    try {
      const key = privateKeys[i];
      const amountIn = getRandomNumber(0.0003, 0.00035);
      const wallet = new ethers.Wallet(key, provider);

      logger.info(`[${i + 1}/${privateKeys.length}] Running wallet: ${wallet.address}`);

      const amountOutMin = ethers.parseUnits("15", 18); // Example: 1 token with 18 decimals
      const path = [
        "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", // Example: ETH address
        "0x6Db8b088c4d41d622B44CD81B900bA690f2d496C", // Example: DAI address
      ];
      const to = wallet.address; // Replace with your wallet address
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

      // Create an Interface instance
      const iface = new ethers.Interface(routerAbi);
      // Encode the calldata
      const calldata = iface.encodeFunctionData("swapExactETHForTokens", [amountOutMin, path, to, deadline]);

      const populatedTx = await wallet.populateTransaction({
        to: routerContractAddr,
        data: calldata,
        value: ethers.parseEther(amountIn.toFixed(18)),
      });

      const tx = await wallet.sendTransaction(populatedTx);
      logger.success(`[${i + 1}/${privateKeys.length}] TX SENT => https://arbiscan.io/tx/${tx.hash}`);
      const delay = getRandomInteger(DELAY_SECONDS_MIN, DELAY_SECONDS_MAX);
      logger.info(`Sleep for ${delay} seconds`);
      await sleep(delay * 1000);
      logger.divider();
    } catch (error) {
      logger.error(`Error on wallet ${i + 1}. Skipping to the next acc`, error);
      continue;
    }
  }
  logger.success(`All acc finished`);
};

main();
