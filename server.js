// import modules
const express = require("express");

const connect = require("./connection/connection")



const errorHandler = require("./middleware/errorHandler");
const connectdb = require("./config/dbConnection");

const dotenv = require("dotenv").config();

// connectdb()
const app = express();

const port = process.env.PORT || 5000;

// app.get("/", (req,res) => {
//     res.json("hello")
// })

// express converts all the data from db or to db to json format

app.use(express.json());

app.use(errorHandler);

connect()

app.use("/api/contacts", require("./routes/contactroutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
