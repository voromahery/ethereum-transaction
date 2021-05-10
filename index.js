import React from 'react'
import ReactDOM from 'react-dom'
import { ContextProvider } from './GlobalContext'
import App from './App'
import { GlobalStyles } from './GlobalStyle'

ReactDOM.render(
  <ContextProvider>
    <GlobalStyles />
    <App />
  </ContextProvider>,
  document.getElementById('root')
)
