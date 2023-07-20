const express = require('express');
const { login, register, getAllUsers } = require('../controllers/userControllers.js')
const init_route = require('../middlewares/initRoute.js')

const router = express.Router()

router.get('/', ()=>{
    console.log('working...')
})
router.post('/login', init_route, login)
router.post('/register', init_route, register)
router.get('/all-users', init_route, getAllUsers)

module.exports = router