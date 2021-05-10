import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Context } from '../GlobalContext'
import BalanceSearchInput from './BalanceSearchInput'
import { getCurrentBlockNumber } from '../utils/web3Utils'

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
    console.log(blockNumber)
  }, [])

  return (
    <div>
      <BalanceSearchInput />
    </div>
  )
}

export default BalanceTable
