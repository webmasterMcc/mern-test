const { connectToDatabase } = require("./db/connection");
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const helmet = require('helmet');

dotenv.config();
const port = process.env.PORT || 5051;

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'", 'http://localhost:3000'], // Allow your frontend's domain
            scriptSrc: ["'self'", 'http://localhost:3000'], // Allow scripts from your frontend
            // Add other directives as needed
        }
    }
}));

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log(process.env.PORT)
    res.send('<a href="/users">users</a>');
});

app.get("/posts/add" , (req, res) => {
    res.send('maybe failed to add post');
  })

  app.post("/posts/add", async (req, res) => {
    console.log("POST /posts/add route hit");
  
        const db = await connectToDatabase();
        const postsCollection = db.collection('posts');
        console.log("POST /posts/add route hit (using hardcoded data)");
        try {
            // Define a new post document with hardcoded data (for testing)
            let newPost = {
                title: "react and MongoDB",  
                body: "learning Javascript Backend for MongoDB and ReactJS",  
            };
            const result = await postsCollection.insertOne(newPost);
            console.log("1 document inserted");

            console.log("Post created:", result);
            res.send('Post created');
        }catch(e) {
            console.error(e);
            res.status(500).send('Error creating post');
        }
        
  });
// app.post("/posts/add", async (req, res) => {
//     if (err) throw err;
//     const db = await connectToDatabase();
//     const postsCollection =  db.collection('posts');
//     console.log("POST /posts/add route hit (using hardcoded data)");
//     try {
  
//       // Define a new post document with hardcoded data (for testing)
//       let newPost = {
//         title: "react and MongoDB",  
//         body: "learning Javascript Backend for MongoDB and ReactJS",  
//       };
  
//       const result = await postsCollection.insertOne(newPost , function(err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         console.log("Post created:", result.insertedId);
//         db.close();
//       });
      
//       res.status(201).send('Post created');

//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error creating post');
//     }

//   });

 
app.get("/userslist", async (req, res) => {
    console.log("GET /userslist route hit");
    try {
        const db = await connectToDatabase();
        const users = await db.collection('posts').find().toArray();
        console.log(users);
        res.json(users);
    } catch (error) {
        console.error(error); // Fixed typo here
        res.status(500).send('Error fetching users');
    }
});

app.get("/users", (req, res) => {
    res.send('<a href="/posts/add">Add User</a>');
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
