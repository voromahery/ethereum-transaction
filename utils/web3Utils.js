import Web3 from 'web3'

let web3Instance = null

const getWeb3 = () => {
  if (web3Instance) {
    return web3Instance
  } else {
    web3Instance = new Web3(Web3.givenProvider)
    console.log(web3Instance, 'WebIstance')

    return web3Instance
  }
}

export const getCurrentBlockNumber = async () => {
  return await getWeb3().eth.getBlockNumber()
}
