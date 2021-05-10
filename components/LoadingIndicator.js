import styled from 'styled-components'
import React from 'react'

const Loading = styled.div`
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
`

const LoadingIndicator = () => {
  return (
    <div className='spinner_container'>
      <Loading id='spinner'></Loading>
    </div>
  )
}

export default LoadingIndicator
