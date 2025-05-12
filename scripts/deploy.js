const { ethers } = require("hardhat");
const web3 = require("@solana/web3.js");
const bs58 = require("bs58");
const {
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction
} = require('@solana/spl-token');
const { config } = require('./config');

async function main() {
    const SOLANA_NODE = config.SOLANA_NODE;
    const DEVNET_ERC20ForSPL_FACTORY = "0xF6b17787154C418d5773Ea22Afc87A95CAA3e957";
    let solanaTx;
    let tx;

    const connection = new web3.Connection(SOLANA_NODE, "processed");
    const keypair = web3.Keypair.fromSecretKey(
        bs58.default.decode(process.env.PRIVATE_KEY_SOLANA)
    );
    const [user1] = await ethers.getSigners();

    const ERC20ForSplFactoryContract = await ethers.getContractFactory("ERC20ForSplFactory");
    const ERC20ForSplMintableContract = await ethers.getContractFactory("ERC20ForSplMintable");
    const ERC20ForSplFactory = ERC20ForSplFactoryContract.attach(DEVNET_ERC20ForSPL_FACTORY);

    // Deploy ERC20ForSplMintable contract
    tx = await ERC20ForSplFactory.createErc20ForSplMintable(
        "MojFet " + Date.now().toString(),
        "MJF",
        9,
        user1.address
    );
    await tx.wait(1);

    const ERC20ForSPLMintableAddress = await ERC20ForSplFactory.allErc20ForSpl(
        parseInt((await ERC20ForSplFactory.allErc20ForSplLength()).toString()) - 1
    );
    const ERC20ForSplMintable = ERC20ForSplMintableContract.attach(ERC20ForSPLMintableAddress);
    console.log(ERC20ForSplMintable.target, 'ERC20ForSPLMintableAddress');
    const tokenMint = await ERC20ForSplMintable.tokenMint();
    console.log(tokenMint, 'tokenMint');

    // mint 1000 tokens to user
    tx = await ERC20ForSplMintable.mint(user1.address, 1000 * 10 ** 9);
    await tx.wait(1);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});