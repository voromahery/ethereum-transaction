import React, { useContext } from 'react'
import TransactionTable from './components/TransactionTable'
import { BALANCE_TAB, Context, CRAWLER_TAB } from './GlobalContext'
import BalanceTable from './components/BalanceTable'

const App = () => {
  const { activeTab, setActiveTab, errorMessage } = useContext(Context)
  const isCrawlerTab = activeTab === CRAWLER_TAB

  return (
    <div>
      <div className='tab_wrapper'>
        <div
          className={isCrawlerTab ? 'active tab' : 'not_active tab'}
          onClick={() => setActiveTab(CRAWLER_TAB)}>
          Transactions crawler
        </div>
        <div
          className={isCrawlerTab ? 'not_active tab' : 'active tab'}
          onClick={() => setActiveTab(BALANCE_TAB)}>
          Balance checker
        </div>
      </div>

      {isCrawlerTab ? <TransactionTable /> : <BalanceTable />}

      <div className='error_message_container'>{errorMessage}</div>
    </div>
  )
}

export default App
