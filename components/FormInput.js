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

const FormInput = () => {
  const {
    wallet,
    setWallet,
    startBlock,
    setStartBlock,
    queryTransactions,
  } = useContext(Context)

  const getWallet = (e) => {
    e.preventDefault()
    const form = e.target
  }

  // const convertHexToDecimal = () => {
  //   parseInt(hexValue, decimal)
  // }

  return (
    <Form>
      <InputWrapper>
        Address
        <input
          type='text'
          value={wallet}
          placeholder='Search a wallet'
          onChange={(e) => setWallet(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        Block
        <input
          type='text'
          value={startBlock}
          placeholder='Search'
          onChange={(e) => setStartBlock(e.target.value)}
        />
      </InputWrapper>
      <GetTransactionButton onClick={queryTransactions}>
        Get transactions
      </GetTransactionButton>
    </Form>
  )
}

export default FormInput
