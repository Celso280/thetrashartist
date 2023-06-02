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
const verifyToken = require('./middleware/auth')
const jwt = require('jsonwebtoken')

const PORT = 8000

const Pool = require('pg').Pool

//set-up
const storage = multer.memoryStorage();
const upload = multer({ storage });
//provided by cloudinary line 20-22 cloud_name api_key api_secret
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


app.post('/log-in', (request, response) => {
    console.log(request.body);
    const {email, password}  = request.body
    pool.query('SELECT first_name, last_name, email, password, role, user_id, location FROM "user" WHERE email = $1', [email], (error, results) =>{
        if (error) {
            throw error;
        }
        const compare = bcrypt.compareSync(password, results.rows[0].password)
        if (compare) {
            const generatedToken = generateJwt({...request.body, first_name:results.rows[0].first_name, last_name:results.rows[0].last_name, location:results.rows[0].location, password:results.rows[0].password, role:results.rows[0].role, user_id:results.rows[0].user_id })
            response.status(201).json({
                "generatedToken":generatedToken,
                "result":results.rows
            })
        }
        // console.log(compare);
        // response.status(200).json(results.rows)
    })
})

app.post('/upload-picture', upload.single('file'), (req, res) => {
    //provided by cloudinary docs line 79-88
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

// USER TABLE

app.get('/all-artists', (request, response) => {
    pool.query(`SELECT * FROM "user" WHERE role = 'artist'`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)  
    })
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
    //line 67 (password, 10) is from the request.body
    const encryptedPassword = bcrypt.hashSync(password, 10)

     pool.query('INSERT INTO "user" (first_name, last_name, profile_picture, bio, email, password, location, contact, role, created_at, edited_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING user_id', [first_name, last_name, profile_picture, bio, email, encryptedPassword, location, contact, role, created_at, edited_at], (error, results) => {
        if (error) {
            throw error;
        }
        // line 75 is for generating a token in add-user end point, after go to front end register.js line 111
        const generatedToken = generateJwt({...request.body, password:encryptedPassword})
        response.status(201).json({"token":generatedToken,"id":results.rows[0].user_id})   
    })
})

app.put('/update-user/:id', (request, response) => {
    const id = request.params.id
    const {first_name, last_name, profile_picture, bio, email, password, location, contact, role, created_at, edited_at} = request.body
    const encryptedPassword = bcrypt.hashSync(password, 10)

    pool.query('UPDATE "user" SET first_name = $1, last_name = $2, profile_picture = $3, bio = $4, email = $5, password = $6, location = $7, contact = $8, role = $9, created_at = $10, edited_at = $11 WHERE user_id = $12 RETURNING user_id', [first_name, last_name, profile_picture, bio, email, encryptedPassword, location, contact, role, created_at, edited_at, id], (error, results) => {
        if (error) {
            throw error;    
        }
        const generatedToken = generateJwt({...request.body, password:encryptedPassword})
        response.status(201).json({"token":generatedToken,"id":results.rows[0].user_id}) 
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

// ART TABLE

app.get('/all-arts', (request, response) => {
    pool.query('SELECT * FROM arts', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows) 
        console.log(results);
    })
    
})

app.post('/auth/verifyToken', (request, response) => {
    
    const jwt_token = (request.body.jwt_token)
    
    try { 
        const decode = jwt.verify(jwt_token, process.env.jwt_secret);
        return response.status(200).send({
            first_name:decode.first_name,
            last_name:decode.last_name,
            location:decode.location,
            email:decode.email,
            password:decode.password,
            role:decode.role,
            user_id:decode.user_id
        })
      } catch(err) {
        console.log(err);
        return response.status(401).send('fsfsf')
      }
})

app.get('/all-arts/:status', (request, response) => {

    const status = request.params.status

    pool.query('SELECT * FROM arts WHERE registration_status = $1', [status], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows) 
    })
})

app.get('/get-art/:id', (request, response) => {
    const id = request.params.id
    pool.query('SELECT * FROM arts WHERE art_id = $1', [id], (error, results) =>{
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    })
})

app.post('/add-art', (request, response) => {

    const {category, art_name, price, location, description, upload_image, user_id} = request.body
    
     pool.query('INSERT INTO arts (category, art_name, price, location, description, upload_image, user_id, registration_status, availability_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [category, art_name, price, location, description, upload_image, user_id, 'pending' , 'available'], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('Art added wait for approval from the admin')   
    })
})

app.put('/update-art/:id', (request, response) => {
    const id = request.params.id
    const {art_name, price, location, description, upload_image} = request.body

    pool.query('UPDATE arts SET art_name = $1, price = $2, location = $3, description = $4, upload_image = $5 WHERE art_id = $6', [art_name, price, location, description, upload_image, id], (error, results) => {
        if (error) {
            throw error;    
        }
        response.status(200).send('Art updated successfully!') 
    })
})

app.put('/update-art-reg-status/:id', (request, response) => {
    const id = request.params.id
    const {registration_status} = request.body

    pool.query('UPDATE arts SET registration_status = $1 WHERE art_id = $2', [registration_status, id], (error, results) => {
        if (error) {
            throw error;    
        }
        response.status(200).send('Art updated successfully!') 
    })
})

app.delete('/delete-art/:id', (request, response) => {
    const id = request.params.id
    
    pool.query('DELETE FROM arts WHERE art_id = $1', [id], (error, results) => {
        if (error) {
            throw error;    
        }
        response.status(200).send(`Art No.${id} is successfully deleted !`) 
    })
}) 

// CATEGORY_LISTS TABLE

app.get('/all-categories', (request, response) => {
    pool.query('SELECT * FROM category_lists', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
        
    })
})

app.get('/get-category/:id', (request, response) => {
    const id = request.params.id
    pool.query('SELECT * FROM category_lists WHERE category_id = $1', [id], (error, results) =>{
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
    })
})

app.post('/add-category', (request, response) => {

    const {category_name, availability_status, created_at, edited_at} = request.body
    

     pool.query('INSERT INTO category_lists (category_name, availability_status, created_at, edited_at) VALUES ($1, $2, $3, $4)', [category_name, availability_status, created_at, edited_at], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('Category added successfuly!')
    })
})

app.put('/update-category/:id', (request, response) => {
    const id = request.params.id
    const {category_name, availability_Status} = request.body

    pool.query('UPDATE category_lists SET category_name = $1 WHERE category_id = $2', [category_name, id], (error, results) => {
        if (error) {
            throw error;    
        }
        response.status(200).send('User updated successfully!') 
    })

})

app.delete('/delete-category/:id', (request, response) => {
    const id = request.params.id
    
    pool.query('DELETE FROM category_lists WHERE category_id = $1', [id], (error, results) => {
        if (error) {
            throw error;    
        }
        response.status(200).send(`Category No.${id} is successfully deleted !`) 
    })
})

// ADD TO CART

app.post('/add-cart-item', (request, response) => {

    const {user_id, art_id, image_upload, art_name,  quantity, price} = request.body

     pool.query('INSERT INTO cart (user_id, art_id, image_upload, art_name, quantity, price) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING cart_id', [user_id, art_id, image_upload, art_name, quantity, price], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).json(`adding to cart ${results}`)   
    })
})

app.get('/all-cart-items/:id', (request, response) => {
    const id = request.params.id

    pool.query('SELECT * FROM cart WHERE user_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
        
    })
})

app.delete('/delete-cart-item/:id', (request, response) => {
    const id = request.params.id
    
    pool.query('DELETE FROM cart WHERE cart_id = $1', [id], (error, results) => {
        if (error) {
            throw error;    
        }
        response.status(200).send(`Item No.${id} is successfully deleted !`) 
    })
})

// ORDER TABLE

app.post('/add-order', (request, response) => {

    const {user_id, art_id, quantity} = request.body

     pool.query('INSERT INTO orders (user_id, art_id, quantity) VALUES ($1, $2, $3 ) RETURNING order_id, art_id', [user_id, art_id, quantity], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).json(results.rows)   
    })
})

app.get('/get-orders', (request, response) => {

    pool.query('SELECT * FROM arts INNER JOIN orders ON arts.art_id = orders.art_id INNER JOIN "user" ON orders.user_id = "user".user_id', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows) 
    })
})

app.delete('/delete-order/:id', (request, response) => {
    const id = request.params.id
    
    pool.query('DELETE FROM orders WHERE order_id = $1', [id], (error, results) => {
        if (error) {
            throw error;    
        }
        response.status(200).send(`Order No.${id} is successfully deleted !`) 
    })
})

