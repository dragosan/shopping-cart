const express = require('express');
const dotenv = require('dotenv');

const app = express();

app.use(express.json());

//load config
dotenv.config({path:"./config/config.env"});

const connectDB = require('./config/db');

connectDB();
app.use(express.json({ extended: false }));

app.get("/",(req,res)=>{
    res.send('hello world!')
})
// const Product = require('./models/Product');

//Routes
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use('/api/products',require("./routes/api/product"))

const port =process.env.PORT || 5000;
app.listen(port ,()=>console.log(`Server started at port ${port}`));