import React, { useContext, useState } from 'react'
import { Context } from '../GlobalContext'

const FormInput = () => {
  const {
    wallet,
    setWallet,
    startBlock,
    setStartBlock,
    queryTransactions,
  } = useContext(Context)

  const getWallet = (e) => {
    e.preventDefault()
    const form = e.target
  }

  // const convertHexToDecimal = () => {
  //   parseInt(hexValue, decimal)
  // }

  return (
    <div>
      <label>Address</label>
      <input
        type='text'
        value={wallet}
        placeholder='Search a wallet'
        onChange={(e) => setWallet(e.target.value)}
      />

      <label>Block</label>
      <input
        type='text'
        value={startBlock}
        placeholder='Search'
        onChange={(e) => setStartBlock(e.target.value)}
      />
      <button onClick={queryTransactions}>Get transactions</button>
    </div>
  )
}

export default FormInput
