import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { UserContext } from "../App"

function Navbar() {
  const { state, dispatch } = useContext(UserContext)
  const RenderNavbar = () => {
    if (state) {
      return (
        <>
          <li className="nav-item">
            <NavLink to="/" className="nav-link" href="#">Home</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="/about" className="nav-link" href="#">AboutMe</NavLink>
          </li> */}
          {/* <li className="nav-item">
            <NavLink to="/contact" className="nav-link" href="#">Contact</NavLink>
          </li> */}
          {/* <li className="nav-item">
                <NavLink to="/signin" className="nav-link" href="#">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link" href="#">Register</NavLink>
              </li> */}
          <li className="nav-item">
            <NavLink to="/calc" className="nav-link" href="#">Calculate</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/logout" className="nav-link" href="#">Logout</NavLink>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink to="/" className="nav-link" href="#">Home</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="/about" className="nav-link" href="#">AboutMe</NavLink>
          </li> */}
          {/* <li className="nav-item">
            <NavLink to="/contact" className="nav-link" href="#">Contact</NavLink>
          </li> */}

          <li className="nav-item">
            <NavLink to="/signin" className="nav-link" href="#">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className="nav-link" href="#">Register</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="/logout" className="nav-link" href="#">Logout</NavLink>
          </li> */}
          {/* <li className="nav-item">
                <NavLink to="/logout" className="nav-link" href="#">Logout</NavLink>
              </li> */}
        </>
      )
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          {/* <i class="fab fa-pied-piper"></i> */}
          <i className="fab fa-react"></i>
          <span style={{ marginLeft: "15px" }}>MERN</span></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
        <NavLink to="/" className="nav-link" href="#">Home <span className="sr-only">(current)</span></NavLink>
      </li> */}
            <RenderNavbar />

          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
