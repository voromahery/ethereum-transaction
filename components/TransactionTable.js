import React, { useContext } from 'react'
import { Context } from '../GlobalContext'
import FormInput from './FormInput'

const TransactionTable = () => {
  const { transactionData, isLoading } = useContext(Context)
  return (
    <div>
      <FormInput />
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          // transactionData > 0 &&
          transactionData.map((item, index) => {
            const price = item.value * 0.000000000000000001
            return (
              <div key={item.timeStamp + index}>
                <span>Tx</span>
                <div>
                  <p>
                    <a href={`https://etherscan.io/tx/${item.blockHash}`}>
                      {item.hash}
                    </a>
                  </p>
                  <time>{item.timeStamp}</time>
                </div>
                <div>
                  <p>
                    From:
                    <a href={`https://etherscan.io/address/${item.from}`}>
                      {item.from}
                    </a>
                  </p>
                  <p>
                    To:
                    <a href={`https://etherscan.io/address/${item.to}`}>
                      {item.to}
                    </a>
                  </p>
                </div>
                <div>
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
