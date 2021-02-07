import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';


const CreateRoom = (props) => {
    const [state, setState] = useState({ name: "" });

    const onChangeName = (e) => {
        setState({ name: e.target.value });
    }

    const onClick = (e) => {
        props.create(state.name);
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
        },
        action: {
            background: "rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            backdropFilter: "blur(10px)",
            borderRadius: "3px",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            width: "20em",
            margin: "20px"
        }

    }));
    const classes = useStyles();


    return <Container component="main" maxWidth="xl" className={classes.root}>
        <Grid container spacing={3} className={classes.action}>
            <Grid item xs={12}>
                <TextField label="Your Name" required fullWidth variant="outlined" onChange={ onChangeName } />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={onClick}>Create Room</Button>
            </Grid>
        </Grid>
    </Container>
        
}
export default CreateRoom