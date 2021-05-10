import React, { useEffect, useState } from 'react'
const Context = React.createContext()

export const CRAWLER_TAB = 'CRAWLER_TAB'
export const BALANCE_TAB = 'BALANCE_TAB'
export const RESULTS_PER_PAGE = 1000
export const FIRST_PAGE = 1
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
  const api_key = process.env.REACT_APP_API_KEY
  const currentBlockUrl = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${api_key}`

  // https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken

  // const getTransactionsUrl = (address, startBlock, endBlock, api_key) => {
  //   const dataUrl = `http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${api_key}`

  //   return dataUrl
  // }

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
    console.log(data)
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
      currentBlock,
      currentPage
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
