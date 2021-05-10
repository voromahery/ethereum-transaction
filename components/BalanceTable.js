import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../GlobalContext'
import BalanceSearchInput from './BalanceSearchInput'
import {
  getCurrentBlockNumber,
  getBlockNumberForDate,
} from '../utils/web3Utils'

const BalanceTable = () => {
  const {
    transactionData,
    isLoading,
    walletAddress,
    startBlock,
    endBlock,
  } = useContext(Context)

  console.log('HELLO')

  useEffect(async () => {
    const blockNumber = await getCurrentBlockNumber()
    const blockNumberAtDate = await getBlockNumberForDate('2021-03-25')
  }, [])

  return (
    <div>
      <BalanceSearchInput />
    </div>
  )
}

export default BalanceTable
