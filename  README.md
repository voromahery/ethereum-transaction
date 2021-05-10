# Transaction app

## How do I launch this application?

#### Run the command below:

- ` npm install`

- ` npm start`

This application should be available on http://localhost:1234

## How does this application work?

Application has two sections:

## Transaction crawler

### This section is using Etherscan.io API only

All transactions in the given address and with specific start block is displayed here after clicking the **Get transaction** button.

## Balance checker

### This section is using Web3 library only

### It requires Ethereum enabled browser for example Chrome with MetaMask Wallet installed https://metamask.io/

It can find balance at a given address for Eth at a given time.

Optionally, ERC20 Token contract address can be provided to find balance.

_Please note that there is no address format validation_
