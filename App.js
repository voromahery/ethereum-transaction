import React, { useContext } from 'react'
import TransactionTable from './components/TransactionTable'
import { BALANCE_TAB, Context, CRAWLER_TAB } from './GlobalContext'
import BalanceTable from './components/BalanceTable'
import styled from 'styled-components'

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 408px;
  @media (min-width: 375px) {
    flex-wrap: nowrap;
  }
`

const Tab = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 16px;
  background-color: ${(props) => (props.active ? 'lightblue' : 'lightgrey')};
  color: black;
  font-weight: 700;
`

const ErrorMessageContainer = styled.div`
  color: red;
  font-weight: 700;
  font-size: 18px;
  word-wrap: break-word;
  @media (min-width: 650px) {
    font-size: 28px;
  }
`

const App = () => {
  const { activeTab, setActiveTab, errorMessage } = useContext(Context)
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

      <ErrorMessageContainer>{errorMessage}</ErrorMessageContainer>
    </div>
  )
}

export default App
