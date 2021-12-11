import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from "../App"

function Logout() {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory();
    useEffect(() => {
        fetch("https://taxableincome-vidhish.herokuapp.com/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: 'include'
        })
            .then((res) => {
                dispatch({ type: "USER", payload: false })
                history.push("/signin", { replace: true })
                // window.alert("Logged out successfully")
                if (!res.status === 200) {
                    const error = new error(res.error);
                    throw error;
                }
            }).catch((err) => { console.log(err); })
    })

    return (
        <>
            <h1>Logout Page</h1>
        </>
    )
}

export default Logout
