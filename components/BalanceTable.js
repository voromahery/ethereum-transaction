import React, { useContext, useEffect } from 'react'
import Web3 from 'web3'
import styled from 'styled-components'
import { Context } from '../GlobalContext'
import BalanceSearchInput from './BalanceSearchInput'
import {
  getCurrentBlockNumber,
  getBlockNumberForDate,
  getEthBalanceAtBlock,
} from '../utils/web3Utils'

const BalanceTable = () => {
  const {
    transactionData,
    isLoading,
    walletAddress,
    startBlock,
    endBlock,
    ethBalance,
  } = useContext(Context)

  return (
    <div>
      <BalanceSearchInput />
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div>balance: {Web3.utils.fromWei(ethBalance)} Eth</div>
      )}
    </div>
  )
}

export default BalanceTable
