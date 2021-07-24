import React, { useContext } from 'react'
import { Context, FIRST_PAGE } from '../GlobalContext'

const TransactionCrawlerInput = () => {
  const {
    walletAddress,
    setWalletAddress,
    startBlock,
    setStartBlock,
    queryTransactions,
    setCurrentPage,
    setErrorMessage,
  } = useContext(Context)

  const getQuery = (e) => {
    e.preventDefault()
    setCurrentPage(FIRST_PAGE)
    if (walletAddress && startBlock) {
      setErrorMessage('')
      queryTransactions()
    } else {
      setErrorMessage(
        'Please fill both fields, eg Address: 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f, Start block: 11860671'
      )
    }
  }

  return (
    <form className='transaction_crawler' onSubmit={getQuery}>
      <div className='input_wrapper'>
        Address*
        <input
          type='text'
          value={walletAddress}
          placeholder='Search a wallet address'
          onChange={(e) => setWalletAddress(e.target.value.trim())}
        />
      </div>

      <div className='input_wrapper'>
        Start block*
        <input
          type='text'
          value={startBlock}
          placeholder='Start block'
          onChange={(e) => setStartBlock(e.target.value)}
        />
      </div>
      <button className='transaction_button'>Get transactions</button>
    </form>
  )
}

export default TransactionCrawlerInput
