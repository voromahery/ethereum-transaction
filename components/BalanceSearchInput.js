import React, { useContext, useState } from 'react'
import MaskedInput from 'react-maskedinput'
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

const BalanceSearchInput = () => {
  const {
    walletAddress,
    setWalletAddress,
    startBlock,
    setStartBlock,
    balance,
    setBalance,
    queryTransactions,
  } = useContext(Context)

  const [dateTextValue, setDateTextValue] = useState('')

  return (
    <Form>
      <InputWrapper>
        Date
        <MaskedInput
          mask='1111-11-11'
          name='date'
          size='10'
          onChange={(e) => setDateTextValue(e)}
        />
      </InputWrapper>

      <GetTransactionButton onClick={queryTransactions}>
        Get transactions
      </GetTransactionButton>
    </Form>
  )
}

export default BalanceSearchInput
