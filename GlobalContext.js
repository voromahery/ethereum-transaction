import React, { useEffect, useState } from 'react'
const Context = React.createContext()

const ContextProvider = ({ children }) => {
  const [transactionData, setTransactionData] = useState([])
  const [wallet, setWallet] = useState(
    '0xde0b295669a9fd93d5f28d9ec85e40f4cb697'
  )
  const api_key = process.env.REACT_APP_API_KEY
  const dataUrl = `http://api.etherscan.io/api?module=account&action=txlist&address=${wallet}bae&startblock=0&endblock=99999999&sort=asc&apikey=${api_key}`

  if (transactionData.length > 10) {
    transactionData.length = 10
  }
  const fetchData = async () => {
    const response = await fetch(dataUrl)
    const data = await response.json()
    setTransactionData(data.result)
  }

  useEffect(() => {
    fetchData()
  }, [wallet])

  console.log(transactionData)

  return (
    <Context.Provider value={{ transactionData, wallet, setWallet }}>
      {children}
    </Context.Provider>
  )
}
export { ContextProvider, Context }
