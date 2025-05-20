const quais = require('quais')
const ERC20Json = require('../artifacts/contracts/ERC20.sol/ERC20.json')
const { deployMetadata } = require("hardhat");
require('dotenv').config()

// Pull contract arguments from .env
const abi = [
	'function decimals() view returns (uint8)',
	'function symbol() view returns (string)',
	'function balanceOf(address addr) view returns (uint)',
]

async function deployERC20() {
  // Config provider, wallet, and contract factory
  const provider = new quais.JsonRpcProvider('https://orchard.rpc.quai.network', undefined, { usePathing: true })
  // create contract with only a Provider
    const contract = new quais.Contract('0x00611E8B086115Fd061C5c135e03aeE4dF777276', abi, provider)

    // get the token symbol
    symbol = await contract.symbol() // "ABC"
  console.log('Contract symbol is: ', symbol)
}

deployERC20()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
