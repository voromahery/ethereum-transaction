import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context } from '../GlobalContext'
import FormInput from './FormInput'

const Row = styled.div`
  display: flex;
  background-color: #e7eaf3;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  padding-right: 10px;
`

const TransactionIcon = styled.div`
  background-color: dodgerblue;
  border-radius: 5px;
  padding: 40px;
`

const TransactionTable = () => {
  const {
    transactionData,
    isLoading,
    wallet,
    startBlock,
    endBlock,
  } = useContext(Context)
  return (
    <div>
      <FormInput />
      {Boolean(!isLoading && transactionData.length) && (
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          Displaying result for address {wallet}, block range: {startBlock}
          &nbsp;-&nbsp;
          {endBlock},&nbsp;number of transaction found:{' '}
          {transactionData.length - 1}
        </div>
      )}
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          transactionData.map((item, index) => {
            const price = item.value * 0.000000000000000001
            const timeStampDate = new Date(
              Number(item.timeStamp * 1000)
            ).toISOString()

            return (
              <Row key={item.timeStamp + index}>
                <TransactionIcon>Tx</TransactionIcon>
                <div style={{ minWidth: '530px' }}>
                  <p>
                    <a href={`https://etherscan.io/tx/${item.blockHash}`}>
                      {item.hash}
                    </a>
                  </p>
                  <div>
                    timestamp: {item.timeStamp}, {timeStampDate}
                  </div>
                </div>
                <div>
                  <p>
                    From:&nbsp;
                    <a href={`https://etherscan.io/address/${item.from}`}>
                      {item.from}
                    </a>
                  </p>
                  <p>
                    To:&nbsp;
                    <a href={`https://etherscan.io/address/${item.to}`}>
                      {item.to}
                    </a>
                  </p>
                </div>
                <div style={{ textAlign: 'right', width: '100%' }}>
                  <span>{price}</span> <span>Eth</span>
                </div>
              </Row>
            )
          })
        )}
      </div>
    </div>
  )
}

export default TransactionTable
