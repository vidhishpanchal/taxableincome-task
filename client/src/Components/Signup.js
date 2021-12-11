import React, { useState } from 'react'
import woman_laptop from "../img/woman_laptop.svg"
import { NavLink, useHistory } from "react-router-dom";


function Signup() {

    const history = useHistory()
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    })
    let name, value
    const handleChange = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;
        const res = await fetch("https://taxableincome-vidhish.herokuapp.com/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })

        })
        const data = await res.json();
        if (data.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert("Successful Registration");
            console.log("Successful Registration");
            history.push("/signin");
        }
    }

    return (
        <>
            <div className="signup_div">
                <h1 style={{ marginLeft: "10%", paddingTop: "50px", paddingBottom: "10px" }}>Sign up</h1>
                <div className="row">
                    {/* form div */}
                    <div className="col-lg-6 col-sm-12">
                        <form method="post" className="signup_form_div">
                            <div class="form-group">
                                <input
                                    value={user.name}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    name="name"
                                    type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Name" />
                            </div>
                            <div class="form-group">
                                <input
                                    value={user.email}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    name="email"
                                    type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                            </div>
                            <div class="form-group">
                                <input
                                    value={user.phone}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    name="phone"
                                    type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Mobile Number" />
                            </div>
                            <div class="form-group">
                                <input
                                    value={user.work}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    name="work"
                                    type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Profession" />
                            </div>
                            <div class="form-group">
                                <input
                                    value={user.password}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    name="password"
                                    type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <input
                                    value={user.cpassword}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    name="cpassword"
                                    type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password" />
                            </div>

                            <button type="submit" class="btn btn-primary" onClick={PostData}>Register</button>
                            <NavLink to="/signin"><p style={{ marginTop: "10px" }}>Already a user? Signin</p></NavLink>
                        </form>
                    </div>
                    {/* image div */}
                    <div className="col-lg-6 col-sm-12">
                        <img src={woman_laptop} alt="woman_laptop" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
