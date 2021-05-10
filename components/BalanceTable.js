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

const BoldText = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 10px;
  margin-left: 0;
`

const BalanceTable = () => {
  const {
    transactionData,
    isLoading,
    walletAddress,
    startBlock,
    endBlock,
    ethBalance,
    setErrorMessage,
    tokenInfo,
  } = useContext(Context)

  return (
    <div>
      <BalanceSearchInput />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div>
          {ethBalance && (
            <BoldText>Balance: {Web3.utils.fromWei(ethBalance)} Eth</BoldText>
          )}
          {tokenInfo.balance && (
            <BoldText>
              Token balance: {`${tokenInfo.balance} ${tokenInfo.symbol}`}
            </BoldText>
          )}
        </div>
      )}
    </div>
  )
}

export default BalanceTable
