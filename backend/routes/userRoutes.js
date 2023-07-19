const express = require('express');
const { login, register } = require('../controllers/userControllers.js')

const router = express.Router()

router.get('/', ()=>{
    console.log('working...')
})
router.post('/login', login)
router.post('/register', register)

module.exports = router