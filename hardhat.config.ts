import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";

import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  gasReporter: {
    enabled: true,
    currency: "USD",
    token: "ETH",
    coinmarketcap: process.env.COIN_MKT_CAP_API_KEY,
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: false,
      },
    },
  },
  networks: {
    goerli: {
      chainId: 5,
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
