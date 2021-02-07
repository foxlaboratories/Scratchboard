import React, { useState } from "react";
import Sketch from "react-p5";
import socket from '../socketConfig';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import useWindowDimensions from '../components/windowDimensions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SimpleBar from 'simplebar-react';
import '../css/simplebar.css';




const Room = (props) => {
    const [state, setState] = useState({
        guests: [],
        name: props.name,
        code: props.code
    })
    socket.on('userConnection', (name, count, guests, code) => {
        setState({
            guests: guests,
            count: count,
            code: code
        });

    });

    const isTabletOrMobile = useMediaQuery("(max-width: 1224px)")
    const isPortrait = useMediaQuery("(orientation: portrait)")
    const { height, width } = useWindowDimensions();

    const WIDTH = (isTabletOrMobile || isPortrait) ? width - 100 : (width * 0.75) - 100;
    const HEIGHT = (isTabletOrMobile || isPortrait)? (height/2):height - 200;


 
  // p5.js logic for canvas - called only once at the start of the program
  const setup = (p5, parent) => {
    var cnv = p5.createCanvas(WIDTH, HEIGHT, p5.WEBGL).parent(parent);
      p5.background(220, 220, 220);

      socket.on('drawing', (data, name) => {
          if (name != state.name) {
              const adjustX = WIDTH / 2;
              const adjustY = HEIGHT / 2;
              let c = p5.color(40, 40, 240);
              
              p5.ellipse(data.x - adjustX, data.y - adjustY, 5, 5);
              p5.noStroke();
              p5.fill(c);
          }
    });

    socket.on('clear', () => {
      p5.clear();
      p5.background(220,220,220);
    });
  }
    
  const draw = (p5) => {
  }

  const keyTyped = (p5) => {
    
    if(p5.key === 'c'){
        socket.emit('clear', state.code);
      p5.clear();
      p5.background(220,220,220);
    }
  }

   const mouseDragged = (p5) => {
        const adjustX = WIDTH / 2;
        const adjustY = HEIGHT / 2;
      p5.ellipse(p5.mouseX - adjustX, p5.mouseY - adjustY, 5, 5);
      p5.noStroke();
      p5.fill(0);
      var positions = {
        x: p5.mouseX,
        y: p5.mouseY
      }
      socket.emit('mouse', positions, state.code, state.name);
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
            width: "100%",
            margin: "20px"
        }

    }));
    const classes = useStyles();


    return <React.Fragment>
        
            <Container component="main" maxWidth="xl" className={classes.root}>
            <Grid container spacing={3} className={classes.action}>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">{state.code}</Typography>
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SimpleBar style={{ maxHeight: height - 70 }} >
                        <List>
                            {state.guests && state.guests.map((item, index) => (
                                <ListItem alignItems="flex-start" button key={index}>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </SimpleBar>
                </Grid>
                <Grid item xs={12} lg={9}>
                    <Sketch setup={setup} draw={draw} mouseDragged={mouseDragged} keyTyped={keyTyped} />
                </Grid>
            </Grid>
        </Container>
        </React.Fragment>

}
export default Room