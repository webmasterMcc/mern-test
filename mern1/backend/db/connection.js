const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.db || "";



async function connectToDatabase(){
    try {
        const client = new MongoClient(url);
        await client.connect();
        await client.db('users').command({ping:1})
        console.log('Connected successfully to server');
        return client.db("users") ;
    } catch (error) {
            throw new Error(error.message);
    }
}

 

module.exports = { connectToDatabase };