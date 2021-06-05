import React, { Fragment, useContext, useMemo } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import styles from 'styled-components'
import globalState from '../context/context'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const StyledTableHead = withStyles((_) => createStyles({
    root: {
        backgroundColor: 'blue'
    }
}), { name: "StyledTableHead" })(TableHead)

const StyledTable = withStyles((_) => createStyles({
    root: {
        border: '1px solid black'
    }
}), { name: "StyledTable" })(Table)

const StyledTableContainer = withStyles((theme) => createStyles({
    root: {
        marginTop: theme.spacing(5),
        overflowX: 'auto'
    }
}), { name: "StyledTableContainer" })(TableContainer)

const StyledTableCell = withStyles((_) => createStyles({
    root: {
        border: '1px solid black'
    }
}), { name: "StyledTableCe;;" })(TableCell)

const StyledTableCellHead = withStyles((_) => createStyles({
    root: {
        color: 'white'
    }
}), { name: "StyledTAbleCellHead" })(TableCell)

const StyledButton = withStyles((theme) => createStyles({
    root: {
        margin: theme.spacing(2)
    }
}), { name: "StyledButton" })(Button)

const DataTable = () => {
    const { apiData, setApiData, rowCount, setRowCount } = useContext(globalState)
    const showLoadMoreButton = useMemo(() => {
        if (apiData.length >= rowCount) {
            return true
        } else {
            return false
        }
    }, [apiData.length, rowCount])
    const handleDelete = (id) => {
        setApiData(prev => prev.filter(item => item.objectID !== id))
    }
    const loadMore = () => {
        setRowCount(rowCount + 5)
    }
    if (apiData !== 'error') {
        if (apiData.length !== 0) {
            return (
                <Fragment>
                    <StyledTableContainer component={ Paper }>
                        <StyledTable aria-label="simple table">
                            <StyledTableHead>
                                <TableRow>
                                    <StyledTableCellHead align="left">ID</StyledTableCellHead>
                                    <StyledTableCellHead align="left">Author</StyledTableCellHead>
                                    <StyledTableCellHead align="left">Comments</StyledTableCellHead>
                                    <StyledTableCellHead align="left">Title</StyledTableCellHead>
                                    <StyledTableCellHead align="left">URL</StyledTableCellHead>
                                    <StyledTableCellHead align="left">Remove</StyledTableCellHead>
                                </TableRow>
                            </StyledTableHead>
                            <TableBody>
                                {
                                    apiData.filter((item, index) => index < rowCount).map((item, index) => (
                                        <TableRow key={ index }>
                                            <StyledTableCell align="left">{ item.objectID }</StyledTableCell>
                                            <StyledTableCell align="left">{ item.author }</StyledTableCell>
                                            <StyledTableCell align="left">{ item.num_comments }</StyledTableCell>
                                            <StyledTableCell align="left">{ item.title }</StyledTableCell>
                                            <StyledTableCell align="left">{ item.url }</StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Button
                                                    size="small"
                                                    onClick={ () => handleDelete(item.objectID) }
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={ <DeleteIcon /> }
                                                >Delete</Button>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </StyledTable>
                    </StyledTableContainer>
                    <ButtonContainer>
                        <StyledButton disabled={ !showLoadMoreButton } style={ { visibility: !showLoadMoreButton && 'hidden' } } onClick={ loadMore } variant="contained" size="small" color="primary">Load More</StyledButton>
                    </ButtonContainer>
                </Fragment >
            )
        } else {
            return (
                <h1>Loading...</h1>
            )
        }
    } else {
        return (
            <ErrorContainer>
                <h1>Something Went Wrong!!</h1>
            </ErrorContainer>
        )
    }

}

const ButtonContainer = styles.div`
    display: flex;
    justify-content: center;
`

const ErrorContainer = styles(ButtonContainer)`
    color: red;
`
export default DataTable
