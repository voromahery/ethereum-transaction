import React, { useContext, useState } from 'react'
import MaskedInput from 'react-maskedinput'
import styled from 'styled-components'
import { Context } from '../GlobalContext'
import { getBlockNumberForDate, getEthBalanceAtBlock } from '../utils/web3Utils'

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
`

const BalanceSearchInput = () => {
  const {
    walletAddress,
    setWalletAddress,
    startBlock,
    setStartBlock,
    ethBalance,
    setEthBalance,
    tokenInfo,
    setTokenInfo,
    setIsLoading,
    queryTransactions,
  } = useContext(Context)

  const [dateTextValue, setDateTextValue] = useState('2021-05-08')
  const [address, setAddress] = useState(
    '0x415f2a38d1953eaa5d098f6ee3d8da4001b18889'
  )
  const [tokenContract, setTokenContract] = useState('')

  const findBalance = async () => {
    setIsLoading(true)
    const blockNumberForDate = await getBlockNumberForDate(dateTextValue)
    console.log(blockNumberForDate, 'BLOCK NUMBER')

    const ethBalanceAtBlock = await getEthBalanceAtBlock(
      address,
      blockNumberForDate
    )

    console.log(ethBalanceAtBlock, 'ETH BALANCE')
    setEthBalance(ethBalanceAtBlock)
    setIsLoading(false)
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
          value={address}
          placeholder='Wallet address'
          onChange={(e) => setAddress(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        Token Contract
        <input
          type='text'
          value={tokenContract}
          placeholder='Token contract'
          onChange={(e) => setTokenContract(e.target.value)}
        />
      </InputWrapper>
      <GetTransactionButton onClick={findBalance}>
        Get balance
      </GetTransactionButton>
    </Form>
  )
}

export default BalanceSearchInput
