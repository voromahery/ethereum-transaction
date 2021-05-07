import React, { useContext } from 'react'
import { Context } from '../GlobalContext'

const FormInput = () => {
  const { wallet, setWallet } = useContext(Context)
  const getWallet = (event) => {
    const form = event.target
    console.log(form)
    event.preventDefault()
  }

  return (
    <form>
      <input
        type='text'
        onChange={(event) => event.target.value}
        value={wallet}
      />
      <button onSubmit={getWallet}>Search</button>
    </form>
  )
}

export default FormInput
