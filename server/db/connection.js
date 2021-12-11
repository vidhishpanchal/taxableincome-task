const mongoose = require("mongoose");

// mongoose connecting line
// const DB = process.env.DATABASE;
// mongoose.connect('mongodb://localhost:27017/s4dstask1',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     })
mongoose.connect('mongodb+srv://taxableincomevidhish:password123taxableincome@merntaxableincome.dqoam.mongodb.net/TaxableIncomeDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });
