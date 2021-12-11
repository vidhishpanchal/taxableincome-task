require('dotenv').config()
var cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
const authenticate = require("./middleware/authenticate");
const app = express()
// app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())
// mongoose connecting line
require("./db/connection");
// const User = require("./models/user");

app.use(express.json());

app.use(require("./router/auth"));
// const PORT = process.env.PORT




// app.get('/contact', function (req, res) {
//   // res.cookie("Test", "Thapa");
//     res.send("Contact Page")
// })

app.get('/about', authenticate, function (req, res) {
  console.log("About Page")
  res.send(req.rootUser);
})

app.get('/', authenticate, function (req, res) {
  console.log("home page")
  res.send(req.rootUser);
})



// Authorization for contact and home page
// app.get('/contact', authenticate, function (req, res) {
//   console.log("Authorization for contact and home page")
//   res.send(req.rootUser);
// })
// app.get('/signin', function (req, res) {
//     res.send("Signin Page")
// })
// app.get('/signup', function (req, res) {
//     res.send("Signup Page")
// })

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
})

 // "proxy": "http://localhost:5000",