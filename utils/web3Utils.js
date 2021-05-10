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
    console.log(daterInstance, 'daterIstance')
    return daterInstance
  }
}

export const getCurrentBlockNumber = async () => {
  return await getWeb3().eth.getBlockNumber()
}

// Expected date format YYYY-MM-DD
export const getBlockNumberForDate = async (date) => {
  console.log(date, 'getBlockNumberDate')
  const dateAtZeroTime = date + 'T00:00:00Z'
  let blockAtDate = await getDater().getDate(
    dateAtZeroTime, // Date, required. Any valid moment.js value: string, milliseconds, Date() object, moment() object.
    true // Block after, optional. Search for the nearest block before or after the given date. By default true.
  )
  return blockAtDate.block
}

export const getEthBalanceAtBlock = async (address, blockNumber) => {
  let balance = await getWeb3().eth.getBalance(address, blockNumber)
  console.log(getWeb3())
  return balance
}

export const getTokenInformation = (
  walletTokenAddress,
  blockNumber,
  tokenContractAddress
) => {
  var MyContract = new web3.eth.Contract(
    contractStandardAbi,
    tokenContractAddress,
    {
      from: walletTokenAddress, // default from address
      // gasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
    }
  )

  MyContract.methods
    .balanceOf(walletTokenAddress)
    .call(undefined, blockNumber)
    .then(function (result) {
      var myTokenBalance = result
      const formated = Number(result) / Math.pow(10, 6) // 0.000001; //TODO: get decimals from contract
      console.log(formated, 'formatedBalance at block')
      return result
    })
}
