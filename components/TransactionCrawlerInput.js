import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Context } from '../GlobalContext'

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

const TransactionCrawlerInput = () => {
  const {
    walletAddress,
    setWalletAddress,
    startBlock,
    setStartBlock,
    queryTransactions,
    errorMessage,
    setErrorMessage,
  } = useContext(Context)

  const getQuery = () => {
    if (walletAddress && startBlock) {
      setErrorMessage('')
      queryTransactions()
    } else {
      setErrorMessage(
        'Please fill both fields, eg Address: 0x424FC8c1a37D386Ff49D6F886A946ABA0a76f8b2, Start block: 11860671'
      )
    }
  }

  return (
    <Form>
      <InputWrapper>
        Address
        <input
          type='text'
          value={walletAddress}
          placeholder='Search a wallet address'
          onChange={(e) => setWalletAddress(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        Block
        <input
          type='text'
          value={startBlock}
          placeholder='Start block'
          onChange={(e) => setStartBlock(e.target.value)}
        />
      </InputWrapper>
      <GetTransactionButton onClick={getQuery}>
        Get transactions
      </GetTransactionButton>
    </Form>
  )
}

export default TransactionCrawlerInput
