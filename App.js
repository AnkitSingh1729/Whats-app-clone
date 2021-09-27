import React, {useState} from "react";
import './App.css';
import Login from "./Login"
import Sidebar from './Sidebar';
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useStateValue } from "./StateProvider";



function App() {
  const [{user}, dispatch] = useStateValue();  // Where is this "user" coming from? Why under curlybraces
  return (
    // BEM naming convention
    <div className="app">
      {!user ? (
        <h1><Login /></h1>
      ) : (
      <div className="app__body">
      <Router>
            <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
        </Switch>
      </Router>
      
    </div>
      )
    }
        
    </div>

    
  );
}

export default App;



// In firebase website: "rooms" is an array, it's list of all the rooms that we are going to have ex: Dance Room, Study Room etc.
// Each room in array "rooms" has unique id and it has a property called "name" example name: "Dance Room" 