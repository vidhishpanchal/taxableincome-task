const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const detailSchema = new mongoose.Schema({
    bas: {
        type: Number,
        required: true
    },
    lta: {
        type: Number,
        required: true
    },
    hra: {
        type: Number,
        required: true
    },
    fa: {
        type: Number,
        required: true
    },

    inv: {
        type: Number,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    med: {
        type: Number,
        required: true
    },
    apphra: {
        type: Number,
    }
});


const Detail = mongoose.model("Detail", detailSchema);
module.exports = Detail;


//hashing password using bcrypt before saving user in db
// userSchema.pre("save", async function(next){
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password, 12)
//         this.cpassword = await bcrypt.hash(this.password, 12)
//     }
//     next();
// })

// storing message
// userSchema.methods.addMessage = async function(name, email, phone, message){
//     try {
//         this.messages = await this.messages.concat({name, email, phone, message});
//         await this.save()
//         return this.messages;
//     } catch (err) {
//         console.log(err);
//         console.log("error in usermodelmethod");
//     }
// }


//  generating token
// userSchema.methods.generateAuthToken = async function(){
//     try {
//         let token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
//         this.tokens = this.tokens.concat({token: token});
//         await this.save();
//         return token
//     } catch (err) {
//         console.log(err);
//     }
// }

//generating token
// userSchema.methods.generateAuthToken(async function(){
//     try{
//         let token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
//         this.tokens = this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     }
//     catch(err){
//         console.log(err);
//     }
// })
