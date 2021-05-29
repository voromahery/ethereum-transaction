import React, { useContext, useState } from 'react'
import MaskedInput from 'react-maskedinput'
import styled from 'styled-components'
import { Context } from '../GlobalContext'
import {
  getBlockNumberForDate,
  getEthBalanceAtBlock,
  getTokenInformation,
} from '../utils/web3Utils'

const Form = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
`

const GetTransactionButton = styled.button`
  max-width: max-content;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-wrap: anywhere;
`

const BalanceSearchInput = () => {
  const {
    walletAddress,
    setWalletAddress,
    setEthBalance,
    setErrorMessage,
    setTokenInfo,
    setIsLoading,
  } = useContext(Context)

  const [dateTextValue, setDateTextValue] = useState('')
  const [tokenContract, setTokenContract] = useState('')

  const findBalance = async () => {
    setEthBalance('')
    setTokenInfo({ balance: '', symbol: '' })
    setIsLoading(true)
    const blockNumberForDate = await getBlockNumberForDate(dateTextValue)

    const ethBalanceAtBlock = await getEthBalanceAtBlock(
      walletAddress,
      blockNumberForDate
    )

    setEthBalance(ethBalanceAtBlock)
    if (tokenContract) {
      const tokenInfo = await getTokenInformation(
        walletAddress,
        blockNumberForDate,
        tokenContract
      )
      setTokenInfo(tokenInfo)
    }
    setIsLoading(false)
  }

  const getQuery = () => {
    if (walletAddress && dateTextValue) {
      setErrorMessage('')
      findBalance()
    } else {
      setErrorMessage(
        'Please fill both fields, eg Address: 0x424FC8c1a37D386Ff49D6F886A946ABA0a76f8b2, Start date: 2021-01-01'
      )
    }
  }

  return (
    <Form>
      <InputWrapper>
        Date
        <MaskedInput
          mask='1111-11-11'
          name='date'
          value={dateTextValue}
          size='10'
          onChange={(e) => setDateTextValue(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        Address
        <input
          type='text'
          value={walletAddress}
          placeholder='Wallet address'
          onChange={(e) => setWalletAddress(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        Token Contract (optional) eg: 0xdAC17F958D2ee523a2206206994597C13D831ec7
        [USDT]
        <input
          type='text'
          value={tokenContract}
          placeholder='Token contract'
          onChange={(e) => setTokenContract(e.target.value)}
        />
      </InputWrapper>
      <GetTransactionButton onClick={getQuery}>
        Get balance
      </GetTransactionButton>
    </Form>
  )
}

export default BalanceSearchInput
