 const mongoose = require('mongoose')
	

mongoose.connect(process.env.mongoDB).then( e => console.log('Connected to MongoDB') )
	.catch(e => {
        console.error('Connection error', e.message)
    })
	

const db = mongoose.connection
	

module.exports = db