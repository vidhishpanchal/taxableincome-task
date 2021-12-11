import React, { useState, useEffect, useContext } from 'react'
import ReactBootstrap from 'react-bootstrap'
import { Button, ButtonToolbar, Modal, CloseButton } from 'react-bootstrap';
import { UserContext } from "../App"
const Calc = () => {
    // const [show, setShow] = useState(false);
    // const [userName, setUserName] = useState("");
    // const callHomePage = async () => {
    //     try {
    //         const res = await fetch("http://localhost:5000/", {
    //             method: "GET",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             withCredentials: true,
    //             credentials: 'include'
    //         })
    //         const data = await res.json();
    //         console.log(data);
    //         setUserName(data.name);
    //         setShow(true);
    //         if (!res.status === 200) {
    //             const error = new Error(res.error)
    //             throw (error)
    //         } else {
    //             console.log("HomePage Successful");
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         // JSON.parse(JSON.stringify(err));
    //         // window.alert("Please Login to view this page");
    //         //   history.push("/signin");
    //     }
    // }
    // useEffect(() => {
    //     callHomePage();
    // }, [])
    const [bas, setBas] = useState(0)
    const [lta, setLta] = useState(0)
    const [hra, setHra] = useState(0)
    const [apphra, setApphra] = useState(0)
    const [fa, setFa] = useState(0)
    const [inv, setInv] = useState(0)
    const [rent, setRent] = useState(0)
    const [city, setCity] = useState('')
    const [med, setMed] = useState(0)
    const [taxIncome, setTaxIncome] = useState(0)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true)
    };


    const PostDetails = async (e) => {
        e.preventDefault();

        // const {name, email, phone, work, password, cpassword} = user;
        fetch("https://taxableincome-vidhish.herokuapp.com/calc", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "jwtoken": localStorage.getItem("token")
            },
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify(
                {
                    bas: Number(bas), lta: Number(lta), hra: Number(hra), fa: Number(fa), inv: Number(inv), rent: Number(rent), city, med: Number(med)
                    // bas, lta, hra, fa, inv, rent, city, med
                }
            )

        })
            .then((res) => res.json())
            .then((data) => { console.log(data); setTaxIncome(data.message.taxinc); setApphra(data.message.apphra); })
            .catch((err) => console.log(err))
        // const data = await res.json();
        // console.log("result = " + await res.json());
        // if (res.status === 500 || !data) {
        //     window.alert(data.message)
        // } else if (res.status === 201 || res.status === 500) {
        //     // dispatch({ type: "USER", payload: true })
        //     window.alert(data.message);
        //     console.log("Detail submission successful");
        //     // history.push("/")
        // }

    }


    // const getTaxIncome = async () => {
    //     try {
    //         const res = await fetch("http://localhost:5000/calculate", {
    //             method: "POST",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             withCredentials: true,
    //             credentials: 'include',
    //             body: {
    //                 bas, lta, hra, fa, inv, rent, city, med
    //             }

    //         })
    //         const data = await res.json();
    //         console.log(data);
    //         // setTaxIncome(data.taxinc)
    //         //   setUserData({...userData, name:data.name, email: data.email, phone: data.phone});
    //         // if (res.status === 200 || res.status === 204) {
    //         //     setTaxIncome(data.taxinc);
    //         //     console.log("getting tax income successful");

    //         // } else {
    //         //     const error = new Error(res.error)
    //         //     throw (error)
    //         // }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }




    return (
        <>
            <p style={{ marginLeft: '10%', marginTop: '10px' }}>Please fill the details click on Submit details button to get your taxable income.</p>
            <br />
            <h1 style={{ marginLeft: '10%' }}>Taxable Income : {taxIncome} </h1>
            <h4 style={{ marginLeft: '10%' }}>Applicable HRA : {apphra}</h4>
            <br />
            <form>
                <div className='row'>

                    <div className='col-lg-6 col-md-12 col-sm-12' style={{ width: '50%', marginLeft: '10%', marginTop: '10px' }}>
                        <div className="form-group">
                            <label >Basic</label>
                            <input onChange={(e) => { setBas(e.target.value); console.log('bas:', bas) }} type="number" className="form-control" placeholder="Enter Basic" />
                        </div>
                        <div className="form-group">
                            <label >LTA</label>
                            <input onChange={(e) => { setLta(e.target.value); console.log('LTA:', lta) }} type="number" className="form-control" placeholder="Enter LTA" />
                        </div>
                        <div className="form-group">
                            <label >HRA</label>
                            <input onChange={(e) => { setHra(e.target.value); console.log('HRA:', hra) }} type="number" className="form-control" placeholder="Enter HRA" />
                        </div>
                        <div className="form-group">
                            <label >FA</label>
                            <input onChange={(e) => { setFa(e.target.value); console.log('FA:', fa) }} type="number" className="form-control" placeholder="Enter FA" />
                        </div>

                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12' style={{ width: '50%', marginLeft: '10%', marginTop: '10px' }}>
                        <div className="form-group">
                            <label >Investments</label>
                            <input onChange={(e) => { setInv(e.target.value); console.log('Investments:', inv) }} type="number" className="form-control" placeholder="Enter Investments" />
                        </div>
                        <div className="form-group">
                            <label >Actual rent paid by user</label>
                            <input onChange={(e) => { setRent(e.target.value); console.log('rent:', rent) }} type="number" className="form-control" placeholder="Enter rent" />
                        </div>
                        {/* <div className="form-group">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Select City Type
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <h6 onClick={() => { setCity('metro'); console.log('City-type :', city) }} className="dropdown-item">Metro</h6>
                                    <h6 onClick={() => { setCity('nonmetro'); console.log('City-type :', city) }} className="dropdown-item">Non-Metro</h6>
                                </div>
                            </div>
                        </div> */}
                        <div className="form-group">
                            <label>City type(metro/ nonmetro)</label>
                            <input onChange={(e) => { setCity(e.target.value); console.log('city:', city) }} type="text" className="form-control" placeholder="Enter City type" />
                        </div>
                        <div className="form-group">
                            <label >Mediclaim Premium policy paid by user</label>
                            <input onChange={(e) => { setMed(e.target.value); console.log('Med:', med) }} type="number" className="form-control" placeholder="Enter Med" />
                        </div>

                        <button onClick={PostDetails} type='submit' className="btn btn-primary" style={{ margin: '10px' }}>Submit Details</button>
                        <button onClick={handleShow} className="btn btn-primary" style={{ margin: '10px' }}>Show Details</button>
                        {/* onClick={() => { console.log('bas:', bas, 'LTA:', lta, 'HRA:', hra, 'FA:', fa, 'Investments:', inv, 'rent:', rent, 'City-type', city, 'Med:', med) }} */}
                    </div>

                </div>
            </form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Basic</td>
                                <td>{bas}</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>HRA</td>
                                <td>{hra}</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>FA</td>
                                <td>{fa}</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Investments</td>
                                <td>{inv}</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Rent</td>
                                <td>{rent}</td>
                            </tr>
                            <tr>
                                <th scope="row">6</th>
                                <td>City</td>
                                <td>{city}</td>
                            </tr>
                            <tr>
                                <th scope="row">6</th>
                                <td>Mediclaim</td>
                                <td>{med}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={PostDetails}>
                        Calculate Tax Income
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Calc