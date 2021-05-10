import Web3 from 'web3'
const EthDater = require('ethereum-block-by-date')

let contractStandardAbi = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    type: 'function',
  },
]

let web3Instance = null

const getWeb3 = () => {
  if (web3Instance) {
    return web3Instance
  } else {
    web3Instance = new Web3(Web3.givenProvider)
    return web3Instance
  }
}

let daterInstance = null

const getDater = () => {
  if (daterInstance) {
    return daterInstance
  } else {
    daterInstance = new EthDater(getWeb3())
    return daterInstance
  }
}

export const getCurrentBlockNumber = async () => {
  return await getWeb3().eth.getBlockNumber()
}

// Expected date format YYYY-MM-DD
export const getBlockNumberForDate = async (date) => {
  const dateAtMidnight = date + 'T00:00:00Z'
  const blockAtDate = await getDater().getDate(dateAtMidnight, true)
  return blockAtDate.block
}

export const getEthBalanceAtBlock = async (address, blockNumber) => {
  const trimmedAddress = address.trim()
  const balance = await getWeb3().eth.getBalance(trimmedAddress, blockNumber)
  return balance
}

export const getTokenInformation = async (
  walletTokenAddress,
  blockNumber,
  tokenContractAddress
) => {
  const web3 = getWeb3()
  const trimmedTokenContractAddress = tokenContractAddress.trim()
  const trimmedWalletTokenAddress = walletTokenAddress.trim()
  var MyContract = await new web3.eth.Contract(
    contractStandardAbi,
    trimmedTokenContractAddress,
    {
      from: trimmedWalletTokenAddress,
    }
  )

  const tokenSymbol = await MyContract.methods
    .symbol()
    .call()
    .then(function (result) {
      return result
    })

  const decimals = await MyContract.methods
    .decimals()
    .call()
    .then(function (result) {
      return result
    })

  const tokenBalance = await MyContract.methods
    .balanceOf(trimmedWalletTokenAddress)
    .call(undefined, blockNumber)
    .then(function (result) {
      const myTokenBalance = result
      const formated = Number(myTokenBalance) / Math.pow(10, decimals)
      return formated
    })
  return { balance: tokenBalance, symbol: tokenSymbol }
}
