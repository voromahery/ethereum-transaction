import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context, FIRST_PAGE, RESULTS_PER_PAGE } from '../GlobalContext'
import LoadingIndicator from './LoadingIndicator'
import TransactionCrawlerInput from './TransactionCrawlerInput'

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  background-color: #e7eaf3;
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
    padding-right: 10px;
    padding-bottom: 0;
  }
`
const TransactionOrigin = styled.div`
  width: 100%;
  max-width: max-content;
  margin-right: auto;
  padding: 0 10px 0 10px;
  @media (min-width: 600px) {
    padding: 0;
    max-width: 30%;
  }
  @media (min-width: 900px) {
    max-width: 100%;
  }
`

const TransactionIcon = styled.div`
  background-color: dodgerblue;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 40px;
`

const PaginationWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`
const PaginationButton = styled.div`
  padding: 10px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 6px;
`

const ResultInfo = styled.div`
  margintop: '20px';
  marginbottom: '20px';
  overflow-wrap: break-word;
`
const BlockHashWrapper = styled.div`
  minwidth: '530px';
  padding: 0 10px 0 10px;
  @media (min-width: 600px) {
    padding: 0;
    max-width: 30%;
  }
  @media (min-width: 900px) {
    max-width: 100%;
  }
`
const PriceWrapper = styled.div`
  width: 100%;
  padding: 0 10px 0 10px;
  @media (min-width: 600px) {
    max-width: max-content;
    margin-left: auto;
    padding: 0;
  }
`
const LinkWrapper = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 233px;
`

const TransactionTable = () => {
  const {
    transactionData,
    isLoading,
    walletAddress,
    startBlock,
    currentPage,
    queryTransactions,
    setCurrentPage,
    endBlock,
  } = useContext(Context)

  const etherscanQuery = 'https://etherscan.io'

  const nextPage = () => {
    setCurrentPage(currentPage + 1)
    queryTransactions()
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1)
    queryTransactions()
  }

  return (
    <div>
      <TransactionCrawlerInput />
      {Boolean(!isLoading && transactionData.length) && (
        <ResultInfo>
          Displaying result for address {walletAddress}, block range:
          {startBlock}
          &nbsp;-&nbsp;
          {endBlock}.
          <PaginationWrapper>
            {currentPage > FIRST_PAGE && (
              <PaginationButton onClick={previousPage}>
                {'<< Previous page'}
              </PaginationButton>
            )}
            {transactionData.length >= RESULTS_PER_PAGE && (
              <PaginationButton onClick={nextPage}>
                {'Next page >>'}
              </PaginationButton>
            )}
          </PaginationWrapper>
        </ResultInfo>
      )}
      <div>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          transactionData.map((item, index) => {
            // I could use Web3.fromWei but in this part I wanted to use just Etherscan API without Web3 library
            const price = item.value * 0.000000000000000001
            const timeStampDate = new Date(
              Number(item.timeStamp * 1000)
            ).toISOString()

            return (
              <Row key={item.timeStamp + index}>
                <TransactionIcon>Tx</TransactionIcon>
                <BlockHashWrapper>
                  <LinkWrapper>
                    <a
                      className='detail'
                      href={`${etherscanQuery}/tx/${item.blockHash}`}>
                      {item.hash}
                    </a>
                  </LinkWrapper>
                  <div className='detail'>
                    timestamp: {item.timeStamp}, {timeStampDate}
                  </div>
                </BlockHashWrapper>
                <TransactionOrigin>
                  <LinkWrapper>
                    From:&nbsp;
                    <a
                      className='detail'
                      href={`${etherscanQuery}/address/${item.from}`}>
                      {item.from}
                    </a>
                  </LinkWrapper>
                  <LinkWrapper>
                    To:&nbsp;
                    <a
                      className='detail'
                      href={`${etherscanQuery}/address/${item.to}`}>
                      {item.to}
                    </a>
                  </LinkWrapper>
                </TransactionOrigin>
                <PriceWrapper>
                  <span>{price}</span> <span>Eth</span>
                </PriceWrapper>
              </Row>
            )
          })
        )}
      </div>
    </div>
  )
}

export default TransactionTable
