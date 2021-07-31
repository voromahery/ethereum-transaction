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
      <label className='input_wrapper' htmlFor='address'>
        Address*
        <input
          type='text'
          id='address'
          value={walletAddress}
          placeholder='Search a wallet address'
          onChange={(e) => setWalletAddress(e.target.value.trim())}
        />
      </label>

      <label htmlFor='startBlock' className='input_wrapper'>
        Start block*
        <input
          type='text'
          id='startBlock'
          value={startBlock}
          placeholder='Start block'
          onChange={(e) => setStartBlock(e.target.value)}
        />
      </label>
      <button className='transaction_button'>Get transactions</button>
    </form>
  )
}

export default TransactionCrawlerInput
