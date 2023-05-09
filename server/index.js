// import generateJwt from './jwt/tokengenerator'
const generateJwt = require('./jwt/tokengenerator')
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const PORT = 8000

const Pool = require('pg').Pool

const storage = multer.memoryStorage();
const upload = multer({ storage });
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port
})

app.use(cors({
    origin: ["http://localhost:3000"]}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})

app.get('/all-users', (request, response) => {
    pool.query('SELECT * FROM "user"', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    })
})

app.get('/get-user/:id', (request, response) => {
    const id = request.params.id
    pool.query('SELECT * FROM "user" WHERE user_id = $1', [id], (error, results) =>{
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    })
})

app.post('/add-user', (request, response) => {

    const {first_name, last_name, profile_picture, bio, email, password, location, contact, role, created_at, edited_at} = request.body

    const encryptedPassword = bcrypt.hashSync(password, 10)

    const newUser = pool.query('INSERT INTO "user" (first_name, last_name, profile_picture, bio, email, password, location, contact, role, created_at, edited_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [first_name, last_name, profile_picture, bio, email, encryptedPassword, location, contact, role, created_at, edited_at])

    const token = generateJwt(newUser.rows[0])
    response.json({token})
})

app.post('/upload-picture', upload.single('file'), (req, res) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          res.status(500).json({ message: 'Server error' });
        } else {
          res.json(result);
        }
      })
      .end(req.file.buffer);
  });

app.put('/update-user/:id', (request, response) => {
    const id = request.params.id
    const {first_name, last_name, profile_picture, bio, email, password, location, contact, role, created_at, edited_at} = request.body

    pool.query('UPDATE "user" SET first_name = $1, last_name = $2, profile_picture = $3, bio = $4, email = $5, password = $6, location = $7, contact = $8, role = $9, created_at = $10, edited_at = $11 WHERE user_id = $12', [first_name, last_name, profile_picture, bio, email, password, location, contact, role, created_at, edited_at, id], (error, results) => {
        if (error) {
            throw error;    
        }
        response.status(200).send('User updated successfully!') 
    })

})

app.delete('/delete-user/:id', (request, response) => {
    const id = request.params.id
    
    pool.query('DELETE FROM "user" WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            throw error;    
        }
        response.status(200).send(`User No.${id} is successfully deleted !`) 
    })
})


