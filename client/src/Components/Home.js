import React, { useState, useEffect } from 'react'
// import woman_laptop from "../img/woman_laptop.svg"
import { NavLink } from "react-router-dom";

function Home() {

  // const history = useHistory();
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const callHomePage = async () => {
    try {
      const res = await fetch("https://taxableincome-vidhish.herokuapp.com/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "jwtoken": localStorage.getItem("token")
        },
        withCredentials: true,
        credentials: 'include'
      })
      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);
      if (!res.status === 200) {
        const error = new Error(res.error)
        throw (error)
      } else {
        console.log("HomePage Successful");
      }
    } catch (err) {
      console.log(err);
      // JSON.parse(JSON.stringify(err));
      // window.alert("Please Login to view this page");
      //   history.push("/signin");
    }
  }
  useEffect(() => {
    callHomePage();
  }, [])

  return (
    <>
      <div className="home_div">
        <p>WELCOME</p>
        <h1>{userName}</h1>
        <h2>{show ? <><h3>Let's calculate your taxable income</h3><NavLink to='/calc'>Calculate</NavLink></> : "Please Login or Signup to find your taxable income."}</h2>

      </div>
    </>
  )
}

export default Home
