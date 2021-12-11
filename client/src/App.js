import './App.css';
import Navbar from "./Components/Navbar"
import Home from "./Components/Home"
import About from "./Components/About"
import Contact from "./Components/Contact"
import Signin from "./Components/Signin"
import Signup from "./Components/Signup"
import Errorpage from "./Components/Errorpage"
import Logout from "./Components/Logout"
import Calc from "./Components/Calc"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { createContext, useReducer } from 'react';
import { initialState, reducer } from "./reducers/UseReducer"
export const UserContext = createContext()
const Routing = () => {
      return (
            <Switch>
                  <Route exact path="/">
                        <Home />
                  </Route>
                  <Route exact path="/contact">
                        <Contact />
                  </Route>
                  <Route exact path="/about">
                        <About />
                  </Route>
                  <Route exact path="/signin">
                        <Signin />
                  </Route>
                  <Route exact path="/signup">
                        <Signup />
                  </Route>
                  <Route exact path="/calc">
                        <Calc />
                  </Route>
                  <Route exact path="/logout">
                        <Logout />
                  </Route>

                  <Route>
                        <Errorpage />
                  </Route>
            </Switch>
      )
}

function App() {

      const [state, dispatch] = useReducer(reducer, initialState)
      return (
            <Router>

                  <UserContext.Provider value={{ state, dispatch }}>
                        <Navbar />
                        <Routing />
                  </UserContext.Provider>
            </Router>
      );
}

export default App;
