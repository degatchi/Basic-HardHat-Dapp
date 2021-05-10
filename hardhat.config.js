require("@nomiclabs/hardhat-waffle");
require('dotenv').config();


task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: { // to deploy: `npx hardhat run scripts/deploy.js --network localhost`
      chainId: 1337
    },
    rinkeby: { // to deploy: `npx hardhat run scripts/deploy.js --network rinkeby` 
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`, // input your infura testnet endpoint
      accounts: [`0x${process.env.ACCOUNT_PRIVATE_KEY}`] // your wallet's private key your deploying with
    }
  }
};

