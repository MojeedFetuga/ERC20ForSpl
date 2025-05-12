require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.21",
  defaultNetwork: "neondevnet",
  networks: {
    neondevnet: {
      url: "https://proxy.devnet.neonlabs.org/solana",
      accounts: [process.env.PRIVATE_KEY_OWNER],
      chainId: 245022926,
      allowUnlimitedContractSize: false,
      gas: "auto",
      gasPrice: "auto",
    },
  },
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey: {
      neonevm: "test",
    },
    customChains: [
      {
        network: "neonevm",
        chainId: 245022926,
        urls: {
          apiURL: "https://devnet-api.neonscan.org/hardhat/verify",
          browserURL: "https://devnet.neonscan.org",
        },
      },
    ],
  },
};
