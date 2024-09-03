const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const body_Parser = require('body-parser')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors=require('cors')


app.use(body_Parser.json())// Body Parser use to take input from body 
app.use(cors())

app.post('/getResponse', (req, res, next) => {
    console.log(req.body.question)

    // Make sure to include these imports:
    // import { GoogleGenerativeAI } from "@google/generative-ai";
    const genAI = new GoogleGenerativeAI('AIzaSyApwwH_jUFAsCRZLtV5vItbZlIUZJMkJGY');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    model.generateContent(req.body.question)
        .then(result => {
            console.log(result.response.text());
            res.status(200).json({
                response: result.response.text()
            })
        })

        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
})

app.get('*',(req,res)=>{
    res.status(404).json({
        msg:'Bad Request'
    })
})


module.exports = app;