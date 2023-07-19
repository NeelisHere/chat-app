const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chatData = require('./data/chatData')
const connectDB = require('./config/db')
const userRouters = require('./routes/userRoutes.js')
// const colors = require('colors')

const app = express();
dotenv.config()
connectDB()

app.use(cors())
app.use(express.json());
app.use('/api/v1/users', userRouters)

const PORT= process.env.PORT || 8000



app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Home-route working'
    })
})


app.listen(PORT, ()=>{
    console.log(`listening on: http://localhost:${PORT}`)
});


//npaulbe19
//h1TZhvYKBybNi7GS