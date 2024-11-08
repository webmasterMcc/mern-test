const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors') ;
const dotenv = require('dotenv');
dotenv.config();
const db = require("./db/index.js")



const app = express();

const apiPort = process.env.port || 5051;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
	
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.get('/', (req , res) => {
   // const ip = req.ip;
    console.log( req.ip)
    res.send('Hello World!' )
})
	

app.listen(apiPort, () => console.log(`Server running on port http://localhost:${apiPort}`))