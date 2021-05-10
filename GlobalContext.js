import React, { useEffect, useState } from 'react'
const Context = React.createContext()

export const CRAWLER_TAB = 'CRAWLER_TAB'
export const BALANCE_TAB = 'BALANCE_TAB'

const ContextProvider = ({ children }) => {
  const START_BLOCK = 0
  const END_BLOCK = 99999999
  const [transactionData, setTransactionData] = useState([])
  const [ethBalance, setEthBalance] = useState('')
  const [tokenInfo, setTokenInfo] = useState({ balance: '', symbol: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(CRAWLER_TAB)
  const [walletAddress, setWalletAddress] = useState(
    '0x01D9Eb6f8bDc5DCB17Fc447aBB41e1a69F2CF292'
  )
  const [startBlock, setStartBlock] = useState(START_BLOCK)
  const [endBlock, setEndBlock] = useState(END_BLOCK)
  const api_key = process.env.REACT_APP_API_KEY
  const currentBlockUrl = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${api_key}`

  const getTransactionsUrl = (address, startBlock, endBlock, api_key) => {
    const dataUrl = `http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${api_key}`
    return dataUrl
  }

  const fetchTransactions = async (address, startBlock, endBlock) => {
    const response = await fetch(
      getTransactionsUrl(address, startBlock, endBlock, api_key)
    )
    const data = await response.json()
    return data.result
  }

  const fetchCurrentBlock = async () => {
    const response = await fetch(currentBlockUrl)
    const data = await response.json()
    const blockDecimal = parseInt(data.result, 16)
    return blockDecimal
  }

  const queryTransactions = async (e) => {
    setIsLoading(true)
    const currentBlock = await fetchCurrentBlock()

    setEndBlock(currentBlock)
    const transactions = await fetchTransactions(
      walletAddress,
      startBlock,
      currentBlock
    )
    setTransactionData(transactions)
    setIsLoading(false)
  }

  console.log(transactionData)

  return (
    <Context.Provider
      value={{
        endBlock,
        isLoading,
        startBlock,
        activeTab,
        walletAddress,
        transactionData,
        setStartBlock,
        setIsLoading,
        setActiveTab,
        setWalletAddress,
        queryTransactions,
        ethBalance,
        setEthBalance,
        tokenInfo,
        setTokenInfo,
      }}>
      {children}
    </Context.Provider>
  )
}
export { ContextProvider, Context }
