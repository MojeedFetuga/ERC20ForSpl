 **ERC20–SPL Factory Contract Deployment**. 

My Deployed Address: 0x58Dd0Fd7855670B016FAD3Fc23B484E1097006aA kindly check it out on https://neon-devnet.blockscout.com/

Below is the ReadMe Details and Guide!

---

````markdown
# ERC20–SPL Factory Contract

This project provides a Solidity-based **ERC20 Token Factory** designed to facilitate a bridged experience between Ethereum and Solana ecosystems. While ERC20 and SPL are not natively compatible, this factory supports deploying ERC20 tokens on an EVM-compatible chain (like Neon EVM on Solana), which can then be paired with SPL tokens via off-chain or bridge mechanisms.

---

## 🌉 Purpose

This contract helps bootstrap tokens that are:

- **ERC20-compliant** on EVM-compatible chains (e.g. Neon EVM).
- Intended to pair with **SPL tokens** on Solana (created via CLI or SPL libraries).
- Prepared for bridging or simulated cross-chain scenarios.

---

## �� Prerequisites

Make sure you have the following:

- Node.js and npm installed.
- Hardhat and dependencies installed (`npm install`).
- NEON Devnet account with sufficient funds.
- Verified deployment environment.
- Git and GitHub CLI if pushing to a repository.

---

## 📦 Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/MojeedFetuga/ERC20ForSpl.git
cd ERC20ForSpl
npm install
````

---

## ⚙️ Configuration

1. **Set up `.env`**

```ini
PRIVATE_KEY=your_private_key
NEON_API_KEY=your_neon_scan_api_key
```

> ⚠️ Never commit `.env` to version control.

2. **Update `hardhat.config.js`**

Ensure it contains the `neondevnet` config:

```js
networks: {
  neondevnet: {
    url: "https://devnet.neonevm.org", // replace if needed
    accounts: [process.env.PRIVATE_KEY]
  }
},
etherscan: {
  apiKey: {
    neondevnet: process.env.NEON_API_KEY
  }
}
```

---

## 🚀 Deployment

Run the deployment script to deploy the factory contract:

```bash
npx hardhat run scripts/deploy.js --network neondevnet
```

After deployment, note the contract address printed in the terminal.

---

## 🔍 Verification

To verify the contract on NeonScan:

```bash
npx hardhat verify --network neondevnet <deployed_contract_address>
```

If Sourcify is disabled, you can re-enable in `hardhat.config.js`:

```js
sourcify: {
  enabled: true
}
```

---

## 🏗️ Using the Factory

After deploying the factory, you can create new ERC20 tokens like this:

```solidity
factory.createERC20("TokenName", "TKN", 18, 1000000);
```

This will deploy a new ERC20 contract instance and mint tokens to the caller.

> You can extend this logic to coordinate with SPL minting on Solana, or integrate with a bridge like [Wormhole](https://wormhole.com).

---

## 🧹 Git Cleanup (Optional)

If your repo included large binaries (like Solana release files), clean them before pushing:

```bash
git filter-repo --invert-paths --path solana-release-x86_64-unknown-linux-gnu.tar.bz2 --force
```

Then re-push:

```bash
git push -u origin main --force
```

---

## 🔗 Resources

* [Hardhat Docs](https://hardhat.org)
* [Neon EVM](https://neonfoundation.io/)
* [Solana Token CLI](https://spl.solana.com/token)
* [Git LFS for Large Files](https://git-lfs.github.com/)
* [Wormhole Bridge](https://wormhole.com/)

---

## 📜 License

MIT License © 2025 Mojeed Fetuga

```


![image](https://github.com/user-attachments/assets/8cc525b0-1112-4447-a16a-fa1e5c02174a)

