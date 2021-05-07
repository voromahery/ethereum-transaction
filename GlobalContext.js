import React, { useEffect } from 'react'
const Context = React.createContext()

const ContextProvider = ({ children }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const dataUrl = `http://api.etherscan.io/api?module=account&action=txlist&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&startblock=0&endblock=99999999&sort=asc&apikey=${api_key}`
  const fetchData = async () => {
    const response = await fetch(dataUrl)
    const data = await response.json()
    console.log(data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return <Context.Provider value={''}>{children}</Context.Provider>
}
export { ContextProvider, Context }
