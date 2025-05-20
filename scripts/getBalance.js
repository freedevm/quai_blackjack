const quais = require('quais')
const ERC20Json = require('../artifacts/contracts/ERC20.sol/ERC20.json')
const { deployMetadata } = require("hardhat");
require('dotenv').config()

// Pull contract arguments from .env
// const abi = [
//     'function getContractBalance() view returns (uint256)',
//     'event Deposit(address indexed user, uint256 amount)'
// ]

const abi = require('../artifacts/contracts/Blackjack.sol/Blackjack.json')

async function deployERC20() {
  // Config provider, wallet, and contract factory
  const provider = new quais.JsonRpcProvider('https://orchard.rpc.quai.network', undefined, { usePathing: true })
  const providerws = new quais.WebSocketProvider('wss://orchard.rpc.quai.network', undefined, { usePathing: true })
  // create contract with only a Provider
    const contract = new quais.Contract('0x004D4E252aCb397E95DfBa84F7a882D962237cbb', abi.abi, provider)
    const contractws = new quais.Contract('0x004D4E252aCb397E95DfBa84F7a882D962237cbb', abi.abi, providerws)

    // get the token symbol
    balance = await contract.getContractBalance() // "ABC"
    console.log('Contract balance is: ', balance)


    // use an event listener to listen for any transfer event
    contractws.on('Deposit', (user, amount, event) => {
        console.log('Deposit to', user, 'amount', amount)

        console.log(event);
        // stop listening for events
        // event.removeListener()
    })

    const filter = contract.filters.Deposit;
    const events = await contract.queryFilter(filter, -500)
    console.log("events", events);
}

deployERC20()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
