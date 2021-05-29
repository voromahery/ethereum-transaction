import React, { useState } from 'react'
const Context = React.createContext()

export const CRAWLER_TAB = 'CRAWLER_TAB'
export const BALANCE_TAB = 'BALANCE_TAB'
export const RESULTS_PER_PAGE = 1000
export const FIRST_PAGE = 1
const api_key = process.env.ETHERSCAN_API_KEY

const ContextProvider = ({ children }) => {
  const START_BLOCK = 12390294
  const END_BLOCK = 99999999

  const [transactionData, setTransactionData] = useState([])
  const [ethBalance, setEthBalance] = useState('')
  const [tokenInfo, setTokenInfo] = useState({ balance: '', symbol: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(CRAWLER_TAB)
  const [walletAddress, setWalletAddress] = useState('')
  const [startBlock, setStartBlock] = useState(START_BLOCK)
  const [endBlock, setEndBlock] = useState(END_BLOCK)
  const [errorMessage, setErrorMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE)
  const currentBlockUrl = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${api_key}`

  const getTransactionsUrl = (
    address,
    startBlock,
    endBlock,
    pageNumber,
    api_key
  ) => {
    const dataUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${pageNumber}&offset=${RESULTS_PER_PAGE}&sort=asc&apikey=${api_key}`
    return dataUrl
  }

  const fetchTransactions = async (
    address,
    startBlock,
    endBlock,
    pageNumber
  ) => {
    const response = await fetch(
      getTransactionsUrl(address, startBlock, endBlock, pageNumber, api_key)
    )
    const data = await response.json()
    return data.result
  }

  // Fetching current block number
  const fetchCurrentBlock = async () => {
    const response = await fetch(currentBlockUrl)
    const data = await response.json()

    // Convert hexadecimal to decimal
    const blockDecimal = parseInt(data.result, 16)
    return blockDecimal
  }

  const queryTransactions = async () => {
    setIsLoading(true)
    const currentBlock = await fetchCurrentBlock()
    setEndBlock(currentBlock)

    const transactions = await fetchTransactions(
      walletAddress,
      startBlock,
      currentBlock,
      currentPage
    )

    setTransactionData(transactions)
    setIsLoading(false)
  }

  return (
    <Context.Provider
      value={{
        endBlock,
        isLoading,
        startBlock,
        activeTab,
        walletAddress,
        currentPage,
        setCurrentPage,
        transactionData,
        setStartBlock,
        setIsLoading,
        setActiveTab,
        setWalletAddress,
        queryTransactions,
        ethBalance,
        errorMessage,
        setErrorMessage,
        setEthBalance,
        tokenInfo,
        setTokenInfo,
      }}>
      {children}
    </Context.Provider>
  )
}
export { ContextProvider, Context }
