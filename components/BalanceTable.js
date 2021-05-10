import React, { useContext } from 'react'
import Web3 from 'web3'
import styled from 'styled-components'
import { Context } from '../GlobalContext'
import BalanceSearchInput from './BalanceSearchInput'
import LoadingIndicator from './LoadingIndicator'

const BoldText = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 10px;
  margin-left: 0;
`

const BalanceTable = () => {
  const { isLoading, ethBalance, tokenInfo } = useContext(Context)

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
