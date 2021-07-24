import React, { useContext } from 'react'
import Web3 from 'web3'
import { Context } from '../GlobalContext'
import BalanceSearchInput from './BalanceSearchInput'
import LoadingIndicator from './LoadingIndicator'

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
            <div className='bold_text'>
              Balance: {Web3.utils.fromWei(ethBalance)} Eth
            </div>
          )}
          {tokenInfo.balance && (
            <div className='bold_text'>
              Token balance: {`${tokenInfo.balance} ${tokenInfo.symbol}`}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BalanceTable
