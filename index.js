const express = require('express');
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./api/routes/user");
// const questionRouter = require("./api/routes/question");
// const answerRouter = require("./api/routes/answer");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(userRouter);
// app.use(questionRouter);
// app.use(answerRouter);

mongoose
    .connect(process.env.MONGO_CONNECT)
    .then(console.log("CONNECTED"))
    .catch((err) => {
        console.log("err", err);
    });



app.listen(process.env.PORT, () => {
    console.log('App works!!!')
})