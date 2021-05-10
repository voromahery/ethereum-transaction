import React, { useContext, useEffect } from 'react'
import Web3 from 'web3'
import styled from 'styled-components'
import { Context } from '../GlobalContext'
import BalanceSearchInput from './BalanceSearchInput'
import LoadingIndicator from './LoadingIndicator'
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
    tokenInfo,
  } = useContext(Context)

  return (
    <div>
      <BalanceSearchInput />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div>
          <div>balance: {Web3.utils.fromWei(ethBalance)} Eth</div>
          <div>Token balance: {`${tokenInfo.balance} ${tokenInfo.symbol}`}</div>
        </div>
      )}
    </div>
  )
}

export default BalanceTable
