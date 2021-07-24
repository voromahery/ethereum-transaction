import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context, FIRST_PAGE } from '../GlobalContext'

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
    setCurrentPage,
    setErrorMessage,
  } = useContext(Context)

  const getQuery = () => {
    setCurrentPage(FIRST_PAGE)
    if (walletAddress && startBlock) {
      setErrorMessage('')
      queryTransactions()
    } else {
      setErrorMessage(
        'Please fill both fields, eg Address: 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f, Start block: 11860671'
      )
    }
  }

  return (
    <Form>
      <InputWrapper>
        Address*
        <input
          type='text'
          value={walletAddress}
          placeholder='Search a wallet address'
          onChange={(e) => setWalletAddress(e.target.value.trim())}
        />
      </InputWrapper>

      <InputWrapper>
        Start block*
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
