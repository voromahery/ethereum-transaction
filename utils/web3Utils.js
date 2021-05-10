import Web3 from 'web3'
const EthDater = require('ethereum-block-by-date')

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
  const dateAtZeroTime = date + 'T00:00:00Z'
  let blockAtDate = await getDater().getDate(
    dateAtZeroTime, // Date, required. Any valid moment.js value: string, milliseconds, Date() object, moment() object.
    true // Block after, optional. Search for the nearest block before or after the given date. By default true.
  )
  return blockAtDate
}
