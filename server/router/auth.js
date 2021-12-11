const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");

require("../db/connection");
const User = require("../models/user")
const Detail = require("../models/detail")

// router.get("/", (req, res)=>{
//     res.send("express router!")
// })

router.post("/signup", (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(422).json({ "message": "Please fill all the datafields." })
    } else if (password != cpassword) {
        res.json({ message: "passwords do not match" })
    }

    User.findOne({ email: email })
        .then((existingUser) => {
            if (existingUser) {
                res.status(422).json({ message: "User with this email ID already exists." })
            }
            else {
                const user = new User({ name, email, phone, work, password, cpassword })
                //hashpassword before saving
                user.save()
                    .then(() => {
                        res.status(201).json({ message: "User registered Successfully!" })
                    })
                    .catch((err) => {
                        res.status(500).json({ error: "Failed to register." })
                        console.log(err);
                    })

            }
        })
        .catch((err) => {
            console.log(err);
        })

})

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all the fields." })
        }
        const foundUser = await User.findOne({ email: email })
        if (foundUser) {
            const isMatch = await bcrypt.compare(password, foundUser.password)

            const token = await foundUser.generateAuthToken();
            console.log("Generated token for " + foundUser.name + " : " + token);
            // console.log("before cookie");

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });


            // console.log("after cookie");

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" })
                console.log("Invalid Password");
            }
            else {
                res.status(200).json({ message: "User signin Successful.", token: token })
                console.log("User signin Successful.");
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" })
            console.log("Invalid Email");
        }




    } catch (err) {
        console.log(err);
    }
})

router.get('/contact', authenticate, function (req, res) {
    // console.log("Authorization for contact and home page")
    res.send(req.rootUser);
})

router.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email | !phone || !message) {
            console.log("Please enter all the fields of contact form.");
            res.status(400).json({ error: "Please enter all the fields of contact form." })
        } else {
            const userContact = await User.findOne({ _id: req.userID });
            if (userContact) {
                const userMessage = await userContact.addMessage(name, email, phone, message)
                await userMessage.save();
                // window.alert("Message sent!")
                res.status(201).json({ message: "Message sent successfully" });
            }
        }



    } catch (err) {
        console.log(err);
    }
})

router.get('/', authenticate, function (req, res) {
    console.log("Authorization home page")
    res.send(req.rootUser);
})

router.get('/logout', (req, res) => {
    console.log("Logout page");
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User Logged out successfully.");
})

// user details to find tax income of user
router.post("/calc", (req, res) => {
    const { bas, lta, hra, fa, inv, rent, city, med } = req.body;
    if (!bas || !lta || !hra || !fa || !inv || !rent || !med || !city) {
        res.status(422).json({ "message": "Please fill all the datafields." })
    }


    const detail = new Detail({ bas, lta, hra, fa, inv, rent, city, med })
    console.log(detail);
    detail.save()
        .then(() => {
            // res.status(201).json({ message: "Detail added to database Successfully!" })
            // console.log('Detail added to database Successfully!');
            let apphra = 0;
            // const { bas, lta, hra, fa, inv, rent, city, med } = req.body;
            // console.log(req.body);
            const metro1 = bas / 2
            const metro2 = rent - (bas / 10)
            const metro3 = hra

            const nonmetro1 = (4 * bas) / 10
            const nonmetro2 = rent - (bas / 10)
            const nonmetro3 = hra
            if (city === 'metro') {
                // res.status(200).json({ message: "Metrocity" });
                apphra = Math.min(metro1, metro2, metro3)
                console.log('metro apphra : ', apphra);
            } else if (city === 'nonmetro') {
                // res.status(200).json({ message: "NonMetrocity" });
                apphra = Math.min(nonmetro1, nonmetro2, nonmetro3)
                console.log('nonmetro apphra : ', apphra);
            } else {

                res.status(500).json({ error: "Error." });
                console.log('City is not metro nonmetro');
            }
            const taxinc = (bas + lta + hra + fa) - apphra - inv - med;
            res.status(200).json({ message: { 'taxinc': taxinc, 'apphra': apphra } });
            console.log('Calculated Tax Income : ', taxinc);
        })
        .catch((err) => {
            res.status(500).json({ error: "Failed to add detail to database." })
            console.log(err);
        })



    // User.findOne({ email: email })
    //     .then((existingUser) => {
    //         if (existingUser) {
    //             res.status(422).json({ message: "User with this email ID already exists." })
    //         }
    //         else 
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })

})

router.get('/home', (req, res) => {
    res.send('Working')
})
// router.post('/calculate', (req, res) => {
//     const apphra = 0;
//     const { bas, lta, hra, fa, inv, rent, city, med } = req.body;
//     console.log(req.body);
//     const metro1 = bas / 2
//     const metro2 = rent - (bas / 10)
//     const metro3 = hra

//     const nonmetro1 = (4 * bas) / 10
//     const nonmetro2 = rent - (bas / 10)
//     const nonmetro3 = hra
//     if (city == 'metro') {
//         res.status(200).json({ message: "Metrocity" });
//         apphra = Math.min(metro1, metro2, metro3)
//         console.log('metro apphra : ', apphra);
//     } else if (city == 'nonmetro') {
//         res.status(200).json({ message: "NonMetrocity" });
//         apphra = Math.min(nonmetro1, nonmetro2, nonmetro3)
//         console.log('nonmetro apphra : ', apphra);
//     } else {
//         res.status(500).json({ error: "Error." });
//         console.log('Error');
//     }
//     const taxinc = (bas + lta + hra + fa) - apphra - inv - med;

// })












// router.post("/signin", (req, res)=>{
//     const {email, password} = req.body;
//     if(!email || !password){
//         res.status(400).json({message: "Please fill all fields."});
//     }
//     User.findOne({email: email})
//     .then((foundUser)=>{
//         if(!foundUser){
//             // console.log(foundUser);
//             console.log("Incorrect Email");
//             res.status(400).json({error: "Invalid Credentials"})
//         }else{
//               //function for generating auth token
//               function generateAuthToken(){
//                 try{
//                 let token = jwt.sign({_id: foundUser._id}, process.env.JWT_SECRET);
//                 foundUser.tokens = foundUser.tokens.concat({token:token});
//                 foundUser.save();
//                 return token;
//             }
//             catch(err){
//                 console.log(err);
//             }
//             }
//             const newtoken = generateAuthToken();
//             console.log("Generated token for " + foundUser.name + " : " + newtoken);

//             res.cookie("jwtoken", newtoken, {
//                 expires: new Date(Date.now() + 15552000),
//                 httpOnly: true
//             })
// //generating auth token end
//             bcrypt.compare(password, foundUser.password)

//             .then((isMatch)=>{
//                 if(isMatch){
//                     //function for generating auth token
//                             // function generateAuthToken(){
//                             //     try{
//                             //     let token = jwt.sign({_id: foundUser._id}, process.env.JWT_SECRET);
//                             //     foundUser.tokens = foundUser.tokens.concat({token:token});
//                             //     foundUser.save();
//                             //     return token;
//                             // }
//                             // catch(err){
//                             //     console.log(err);
//                             // }
//                             // }
//                             // const newtoken = generateAuthToken();
//                             // console.log("Generated token for " + foundUser.name + " : " + newtoken);

//                             // res.cookie("jwtoken", newtoken, {
//                             //     expires: new Date(Date.now() + 15552000),
//                             //     httpOnly: true
//                             // })
//                             //generating auth token end
//                     res.json({message: "User Signin Successful."})
//                 }else{
//                     console.log("Incorrect Password");
//                     res.status(400).json({error: "Invalid Credentials"})
//                 }
//             })
//             .catch((err)=>{
//                 console.log(err);
//             })
//         }
//     }
//     ).catch((err)=>{
//         console.log(err);
//     })
// })






module.exports = router;