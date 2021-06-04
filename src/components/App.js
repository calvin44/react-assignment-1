import React, { useState } from 'react'
import globalState from '../context/context'
import styles from 'styled-components'
import InputBox from './InputBox'
import DataTable from './DataTable'
import useFetch from '../customHooks/useFetch'

const App = () => {
  const [search, setSearch] = useState('')
  const [apiData, setApiData] = useFetch(search)
  const [rowCount, setRowCount] = useState(5)
  return (
    <globalState.Provider value={ { search, apiData, rowCount, setRowCount, setSearch, setApiData } }>
      <StyledContainer>
        <AppTitle>Hacker News Rest Api</AppTitle>
        <InputBox />
        <DataTable />
      </StyledContainer>
    </globalState.Provider >
  )
}

const StyledContainer = styles.div`
  width: 90vw;
  margin: 0 auto;
`

const AppTitle = styles.h1`
  display: block;
`

export default App

