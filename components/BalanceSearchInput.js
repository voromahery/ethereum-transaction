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
    '0x424FC8c1a37D386Ff49D6F886A946ABA0a76f8b2'
  )
  const [tokenContract, setTokenContract] = useState(
    '0xdAC17F958D2ee523a2206206994597C13D831ec7'
  )

  // const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7' // USDT
  // const walletTokenAddress = "0xe053e07212a5a84ec8c5478e497e6b163b0c50ed";// shibuya
  // const walletTokenAddress = '0x424FC8c1a37D386Ff49D6F886A946ABA0a76f8b2' // with USDT

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
    if (tokenContract) {
      const tokenInfo = await getTokenInformation(
        walletAddress,
        blockNumberForDate,
        tokenContract
      )
      console.log(tokenInfo, 'TOKEN INFO')
      setTokenInfo(tokenInfo)
    }
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
          value={walletAddress}
          placeholder='Wallet address'
          onChange={(e) => setWalletAddress(e.target.value)}
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
