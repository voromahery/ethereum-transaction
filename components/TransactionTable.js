import React, { useContext } from 'react'
import { Context, FIRST_PAGE, RESULTS_PER_PAGE } from '../GlobalContext'
import LoadingIndicator from './LoadingIndicator'
import TransactionCrawlerInput from './TransactionCrawlerInput'

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
        <div className='result_info'>
          Displaying result for address {walletAddress}, block range:
          {startBlock}
          &nbsp;-&nbsp;
          {endBlock}.
          <div className='pagination_wrapper'>
            {currentPage > FIRST_PAGE && (
              <button className='pagination_button' onClick={previousPage}>
                {'<< Previous page'}
              </button>
            )}
            {transactionData.length >= RESULTS_PER_PAGE && (
              <button className='pagination_button' onClick={nextPage}>
                {'Next page >>'}
              </button>
            )}
          </div>
        </div>
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
              <div className='row' key={item.timeStamp + index}>
                <div className='transaction_icon'>Tx</div>
                <div className='block_hash_wrapper'>
                  <p className='link_wrapper'>
                    <a
                      className='detail'
                      href={`${etherscanQuery}/tx/${item.blockHash}`}>
                      {item.hash}
                    </a>
                  </p>
                  <div className='detail'>
                    timestamp: {item.timeStamp}, {timeStampDate}
                  </div>
                </div>
                <div className='transaction_origin'>
                  <p className='link_wrapper'>
                    From:&nbsp;
                    <a
                      className='detail'
                      href={`${etherscanQuery}/address/${item.from}`}>
                      {item.from}
                    </a>
                  </p>
                  <p className='link_wrapper'>
                    To:&nbsp;
                    <a
                      className='detail'
                      href={`${etherscanQuery}/address/${item.to}`}>
                      {item.to}
                    </a>
                  </p>
                </div>
                <div className='price_wrapper'>
                  <span>{price}</span> <span>Eth</span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default TransactionTable
