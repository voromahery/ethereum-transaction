import React, { useContext, useState } from 'react'
import { Context } from '../GlobalContext'

const FormInput = () => {
  const { wallet, setWallet, dataUrl } = useContext(Context)
  const getWallet = (e) => {
    e.preventDefault()
    const form = e.target
    setWallet(form.value)
    console.log(wallet, 'FORM')
  }

  const searchBlock = () => {
    // https://etherscan.io/block/
  }
  return (
    <div>
      <form onSubmit={getWallet}>
        <input
          type='text'
          placeholder='Search a wallet'
          onChange={(e) => e.target.value}
        />
        <button>Search</button>
      </form>
      {/* <form >
        <input type='text' placeholder="Search" onChange={(e) => e.target.value} />
        <button>Search</button>
      </form> */}
    </div>
  )
}

export default FormInput
