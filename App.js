import React, { useContext } from 'react'
import TransactionTable from './components/TransactionTable'
import { BALANCE_TAB, Context, CRAWLER_TAB } from './GlobalContext'
import BalanceTable from './components/BalanceTable'
import styled from 'styled-components'

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const Tab = styled.div`
  cursor: pointer;
  padding: 16px;
  background-color: ${(props) => (props.active ? 'lightblue' : 'lightgrey')};
  color: black;
  font-weight: 700;
`

const App = () => {
  const { activeTab, setActiveTab } = useContext(Context)
  const isCrawlerTab = activeTab === CRAWLER_TAB

  return (
    <div>
      <TabWrapper>
        <Tab active={isCrawlerTab} onClick={() => setActiveTab(CRAWLER_TAB)}>
          Transactions crawler
        </Tab>
        <Tab active={!isCrawlerTab} onClick={() => setActiveTab(BALANCE_TAB)}>
          Balance checker
        </Tab>
      </TabWrapper>
      {isCrawlerTab ? <TransactionTable /> : <BalanceTable />}
    </div>
  )
}

export default App
