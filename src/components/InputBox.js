import TextField from '@material-ui/core/TextField';
import React, { useContext, Fragment, useState } from 'react'
import globalState from '../context/context';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles } from '@material-ui/core';


const StyledButton = withStyles((theme) => createStyles({
    root: {
        display: 'block',
        margin: theme.spacing(1, 0)
    }
}), { name: "StyledButton" })(Button)



const InputBox = () => {
    const { setSearch, setRowCount } = useContext(globalState)
    const [formInput, setFormInput] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(formInput)
        setFormInput('')
        setRowCount(5)
    }

    return (
        <Fragment>
            <form onSubmit={ handleSubmit }>
                <TextField label="Search" size="small" value={ formInput } onChange={ (e) => setFormInput(e.target.value) } variant="outlined" />
                <StyledButton type="submit" onClick={ handleSubmit } size="small" variant="contained" color="primary">Search</StyledButton>
            </form>

        </Fragment>
    )
}




export default InputBox
