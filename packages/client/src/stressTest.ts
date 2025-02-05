import {
  Hex,
  createWalletClient,
  fallback,
  getContract,
  http,
  webSocket,
} from "viem";

import worldAbi from "contracts/out/IWorld.sol/IWorld.abi.json";

import { getClient } from "@wagmi/core";
import { transportObserver } from "@latticexyz/common";
import { transactionQueue } from "@latticexyz/common/actions";
import { privateKeyToAccount } from "viem/accounts";
import { wagmiConfig } from "./wagmiConfig";

const PRIVATE_KEY =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const worldAddress = "0xfDf868Ea710FfD8cd33b829c5AFf79eDd15EcD5f";
const chainId = 31337;

function getWorldContract() {
  const client = getClient(wagmiConfig, {
    chainId,
  });

  const account = privateKeyToAccount(PRIVATE_KEY);

  const walletClient = createWalletClient({
    chain: client.chain,
    transport: transportObserver(fallback([webSocket(), http()])),
    pollingInterval: 1000,
    account,
  }).extend(transactionQueue());

  const worldContract = getContract({
    address: worldAddress as Hex,
    abi: worldAbi,
    client: { public: client, wallet: walletClient },
  });

  return worldContract;
}

const LIMIT = 100;

export async function stressTest() {
  const worldContract = getWorldContract();

  // Some of these tx's will fail with "index out of order"
  for (let i = 1; i < LIMIT; i++) {
    worldContract.write.app__setIndex([BigInt(i)]);
  }
}

stressTest();
