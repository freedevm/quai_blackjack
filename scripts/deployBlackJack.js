const quais = require('quais')
const BlackjackJson = require('../artifacts/contracts/Blackjack.sol/Blackjack.json')
const { deployMetadata } = require("hardhat");
require('dotenv').config()

// Pull contract arguments from .env
const tokenArgs = [process.env.ERC20_NAME, process.env.ERC20_SYMBOL, quais.parseUnits(process.env.ERC20_INITIALSUPPLY)]

async function deployBlackjack() {
    // Config provider, wallet, and contract factory
    const provider = new quais.JsonRpcProvider(hre.network.config.url, undefined, { usePathing: true })
    const wallet = new quais.Wallet(hre.network.config.accounts[0], provider)
    const ipfsHash = await deployMetadata.pushMetadataToIPFS("Blackjack")
    const BlackJack = new quais.ContractFactory(BlackjackJson.abi, BlackjackJson.bytecode, wallet, ipfsHash)

    // Broadcast deploy transaction
    const blackjack = await BlackJack.deploy()
    console.log('Transaction broadcasted: ', blackjack.deploymentTransaction().hash)

    // Wait for contract to be deployed
    await blackjack.waitForDeployment()
    console.log('Contract deployed to: ', await blackjack.getAddress())


    // const [deployer] = await hre.ethers.getSigners();
    // console.log("Deploying contracts with the account:", deployer.address);

    // const BlackJack = await hre.ethers.getContractFactory("Blackjack");
    // const blackjack = await BlackJack.deploy();
    // await blackjack.waitForDeployment();

    // console.log("BlackJack data:", blackjack);
    // console.log("BlackJack deployed to:", await blackjack.getAddress());
}

deployBlackjack()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
