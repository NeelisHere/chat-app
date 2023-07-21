const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')
// const colors = require('colors')

const app = express();
dotenv.config()
connectDB()

app.use(cors())
app.use(express.json());
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/chats', chatRoutes)

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