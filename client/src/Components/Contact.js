import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

function Contact() {

  const history = useHistory();
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });
  const callContactPage = async () => {
    try {
      const res = await fetch("https://taxableincome-vidhish.herokuapp.com/contact", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        withCredentials: true,
        credentials: 'include'
      })
      const data = await res.json();
      console.log(data);
      setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
      if (!res.status === 200) {
        const error = new Error(res.error)
        throw (error)
      } else {
        console.log("ContactPage Successful");
      }
    } catch (err) {
      console.log(err);
      // JSON.parse(JSON.stringify(err));
      // window.alert("Please Login to view this page");
      history.push("/signin");
    }
  }
  useEffect(() => {
    callContactPage();
  }, [])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  }

  const SendMessage = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({ name, email, phone, message })
    });
    const data = await res.json()
    if (!data || res.status === 400) {
      console.log("Message not sent");
    } else {
      window.alert("Message Sent!")
      setUserData({ ...userData, message: "" })
    }
  }

  return (
    <>
      <div className="contact_row_div">
        <div className="contact_small_div">
          <div style={{ display: "flex", padding: "2%" }}>
            <i class="fas fa-mobile-alt fa-2x"></i>
            <div className="contact_smallcard_text">
              <h6 className="contact_smallcard_title">Phone</h6>
              <p className="contact_smallcard_content">4934020202</p>
            </div>
          </div>
        </div>
        <div className="contact_small_div">
          <div style={{ display: "flex", padding: "2%" }}>
            <i class="fas fa-envelope fa-2x"></i>
            <div className="contact_smallcard_text">
              <h6 className="contact_smallcard_title">Email</h6>
              <p className="contact_smallcard_content">tom@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="contact_small_div">
          <div style={{ display: "flex", padding: "2%" }}>
            <i class="fas fa-map-marked-alt fa-2x"></i>
            <div className="contact_smallcard_text">
              <h6 className="contact_smallcard_title">Address</h6>
              <p className="contact_smallcard_content">Mumbai, India</p>
            </div>
          </div>
        </div>
      </div>
      {/* big div */}

      <div className="contact_div">
        <h2 style={{ marginLeft: "10%", paddingTop: "30px", paddingBottom: "10px" }}>Get in Touch</h2>

        <form method="POST" className="contact_page_form">
          <div className="row" style={{ padding: "5%" }}>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <input onChange={handleChange} name="name" type="text" value={userData.name} class="form-control" placeholder="Your Name" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <input onChange={handleChange} name="phone" type="email" value={userData.email} class="form-control" placeholder="Your Email" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div class="form-group">
                <input onChange={handleChange} name="email" type="text" value={userData.phone} class="form-control" placeholder="Your Number" />
              </div>
            </div>
          </div>
          <div class="form-group" style={{ paddingLeft: "5%", paddingRight: "5%", paddingBottom: "5%", marginTop: "-20px" }}>
            <textarea onChange={handleChange} name="message" class="form-control" value={userData.message} id="exampleFormControlTextarea1" rows="3" placeholder="Message"></textarea>
          </div>
          <div className="contact_register_btn">
            <button onClick={SendMessage} className="btn btn-primary">Send Message</button>
          </div>
        </form>


      </div>

    </>
  )
}

export default Contact
