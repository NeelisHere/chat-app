const express = require('express');
const { 
    accessChat, 
    getChats, 
    createGroupChat, 
    renameGroup,
    removeFromGroup,
    addToGroup
} = require('../controllers/chatControllers.js')
const init_route = require('../middlewares/initRoute.js')
const { protect } = require('../middlewares/auth.js')

const router = express.Router()

router.post('/access-chat', init_route, protect, accessChat)
router.get('/get-chats', init_route, protect, getChats)
// router.post('/group', init_route, createGroupChat)
// router.put('/group-rename', init_route, renameGroup)
// router.put('/group-add', init_route, addToGroup)
// router.put('/group-remove', init_route, removeFromGroup)

module.exports = router