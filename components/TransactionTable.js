import React, { useContext } from 'react'
import { Context } from '../GlobalContext'

const TransactionTable = () => {
  const { transactionData } = useContext(Context)
  return (
    <div>
      <header>
        <h3>Transaction</h3>
      </header>
      <div>
        {transactionData.map((item) => (
          <div key={item.timeStamp}>
            <span>Tx</span>
            <div>
              <p>
                <a href={`https://etherscan.io/tx/${item.blockHash}`}>
                  {item.blockHash}
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
              <span>{item.value}</span> <span>Eth</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionTable
