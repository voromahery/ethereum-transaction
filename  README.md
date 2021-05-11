# Transaction app

## How do I launch this application?

#### Run the command below:

- ` yarn install`

- ` yarn start`

- `Place .env in the root folder with Etherscan API key`

  _Please check .env-example_

This application should be available on localhost:1234

## How does this application work?

Application has two sections:

### Transaction crawler

#### This section is using the Etherscan.io API only

All transactions for the given address and with specific start block are displayed here after clicking the **Get transaction** button.
Etherscan has limit of 10,000 requestable transactions, to deal with that, I use pagination, so the app is displaying max 1000 transaction per page.

### Balance checker

#### This section is using the Web3 library only

### It requires an Ethereum-enabled browser, for example Chrome with MetaMask Wallet installed and set up https://metamask.io/

It can find balance at a given address for Eth at a given time.

Optionally, ERC20 Token contract address can be provided to find its balance.

_Please note that there is no address format validation_
