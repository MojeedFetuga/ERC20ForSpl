// scripts/deployWrapper.js
const { ethers } = require("hardhat");

const FACTORY_ADDRESS = "0xF6b17787154C418d5773Ea22Afc87A95CAA3e957"; // Replace if different
const SPL_MINT_ADDRESS = "0x..."; // Replace with SPL token mapped address on Neon
const TOKEN_NAME = "My Wrapped Token";
const TOKEN_SYMBOL = "MWT";

async function main() {
  const [deployer] = await ethers.getSigners();

  const factoryAbi = [ // minimal ABI
    "function createERC20Wrapper(string name_, string symbol_, address splTokenMint) returns (address)"
  ];

  const factory = new ethers.Contract(FACTORY_ADDRESS, factoryAbi, deployer);
  console.log("Deploying wrapper...");

  const tx = await factory.createERC20Wrapper(TOKEN_NAME, TOKEN_SYMBOL, SPL_MINT_ADDRESS);
  const receipt = await tx.wait();

  const event = receipt.events?.find(e => e.event === "ERC20WrapperCreated");
  const wrapperAddress = event ? event.args.wrapper : receipt.logs[0].address;

  console.log("✅ Wrapper Deployed at:", wrapperAddress);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
