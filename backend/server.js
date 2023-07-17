const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config()

const PORT= process.env.PORT || 8000

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Home-route working'
    })
})

// app.get()

app.listen(PORT, ()=>{
    console.log(`listening on: http://localhost:${PORT}`)
});

