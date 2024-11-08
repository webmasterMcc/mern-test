const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// Middleware
const app = express();

app.use(cors());
app.use(fileUpload());
app.get('/' , (req, res) => {
    res.send('<form action="/upload" method="post" enctype="multipart/form-data"><input type="file" name="file"/><button type="submit">Upload</button></form>');
})
app.post('/upload', (req,res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
    
      const file = req.files.file;
    
      file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
    
        res.json({ fileName: file.name, filePath: `${__dirname}/client/public/uploads/${file.name}` });
      });
});

app.listen(5000 ,() => {
    console.log('Server started on port http://localhost:5000');
}) ;



// React File Uploader With Express (Using React Hooks)
// https://www.youtube.com/watch?v=b6Oe2puTdMQ&ab_channel=TraversyMedia