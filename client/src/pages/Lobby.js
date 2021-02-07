import React from 'react';
import Container from '@material-ui/core/Container';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const Lobby = (props) => {
    const history = useHistory();

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
            width: "10em",
            height: "10em",
            margin: "20px"
        }

    }));
    const classes = useStyles();

    const goCreate = () => {
        history.push("/create");
    }

    const goJoin = () => {
        history.push("/join");
    }


    return <Container component="main" maxWidth="xl" className={classes.root}>
        <ButtonBase
            focusRipple
            className={classes.action}
            onClick={goCreate}
        >
            <AddCircleIcon />
                <Typography
                component="div"
                variant="h5"
                >
                    Create
                </Typography>
        </ButtonBase>
        <ButtonBase
            focusRipple
            className={classes.action}
            onClick={goJoin}
        >
            <OpenInNewIcon />
            <Typography
                component="div"
                variant="h5"
            >
                Join
                </Typography>
        </ButtonBase>
        </Container>
        
}
export default Lobby