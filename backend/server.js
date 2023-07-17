const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chatData = require('./data/chatData')

const app = express();
dotenv.config()

app.use(cors())

const PORT= process.env.PORT || 8000

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Home-route working'
    })
})

app.get('/chats', (req, res) => {
    res.json({
        success: true,
        chatData
    })
})

app.listen(PORT, ()=>{
    console.log(`listening on: http://localhost:${PORT}`)
});

