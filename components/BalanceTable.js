import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context } from '../GlobalContext'
import BalanceSearchInput from './BalanceSearchInput'

const BalanceTable = () => {
  const {
    transactionData,
    isLoading,
    walletAddress,
    startBlock,
    endBlock,
  } = useContext(Context)
  return (
    <div>
      <BalanceSearchInput />
    </div>
  )
}

export default BalanceTable
