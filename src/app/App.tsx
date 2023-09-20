import React from 'react'
import Header from './Header'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App