require('dotenv').config();
const { PublicKey } = require('@solana/web3.js');

const config = {
  SOLANA_NODE: 'https://api.devnet.solana.com',
  DEVNET_ERC20ForSPL_FACTORY: '0xF6b17787154C418d5773Ea22Afc87A95CAA3e957',
  utils: {
    publicKeyToBytes32: (base58) => {
      const pk = new PublicKey(base58).toBytes();
      const bytes32 = Buffer.alloc(32);
      pk.copy(bytes32, 0);
      return bytes32;
    },
  },
};

module.exports = { config };
