import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom';
import Lobby from './pages/Lobby';
import Room from './pages/Room';
import socket from './socketConfig';


const App = () => {
    const [state, setState] = useState({
        redirect: "",
        code: "",
        name: ""
    });


  const create = (name) => {
    socket.emit('createRoom', { code: socket.id, name: name});
      socket.on('success', () => {
          
          setState({ redirect: "/room/" + socket.id, code: socket.id, name: name });

    });
  } 

  const join = (code, name) => {
        socket.emit('joinRoom', { code: code, name: name });
        socket.on('success', (name) => {
            setState({ redirect: "/room/" + code, code: code, name: name });      
    });
  }

    return <Router>
        <Switch>
            <Route exact path="/room/:id"
                render={(props) => (<Room code={state.code} name={state.name} />)} />
            {state.redirect && <Redirect to={{
                pathname: state.redirect,
                state: { code: state.code, name: state.name }
            }} />}
            <Route exact path="/" component={Lobby}/>

            <Route
            exact path="/join"
            render={(props) => (
                <JoinRoom join={join}/>
            )}/>
            <Route
                exact path="/create"
                render={(props) => (
                <CreateRoom create={create}/>
                )}/>
                )
        </Switch>
  </Router>

}
export default App;