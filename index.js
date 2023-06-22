const express = require("express");
const app = express();
const mongoose = require("mongoose");
const indexRoute = require("./Routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//database connection
const dbUrl = "mongodb+srv://gwtdev6:CwqrxsUjwCH4QtyV@cluster0.om3bko9.mongodb.net/?retryWrites=true&w=majority";
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(dbUrl, connectionParams).then(() => {
    console.log("DB Connected")
}).catch(() => {
    console.log("DB Not Connected")
})

//Route connection
app.use('/api', indexRoute);

//Server connection
app.listen(8001, (err) => {
    if(!err) {
        console.log("Server connected on port 8001")
    } else {
        console.log("Error on Server connection")
    }
})


//SOMETHING TO NOTE
//I didn't use .env coz secret key is the one and only sensitive data in this application, so
// i hardcoded the secret data and i used it
// i use mongo db atlas connection here, for mongodb database connectivity