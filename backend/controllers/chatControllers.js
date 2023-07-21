
const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatModel.js')
const User = require('../models/userModel.js')


const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body
    if(!userId){
        console.log('userId-params is not sent with the request.')
        return res.sendStatus(400)
    }
    // console.log(req)
    let isChat = await Chat.find({
        isGroupChat: false,
        $and:[
            {users: {$elemMatch:{$eq: req.user._id}}},
            {users: {$elemMatch:{$eq: req.userId}}}
        ]
    }).populate('users', '-password').populate('latestMessage')

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select:'username pic email'
    })

    if(isChat.length > 0){
        res.send(isChat[0])
    }else{
        const chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id:createdChat._id}).populate('users', '-password')
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})

const getChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 })
            .then(async(results)=>{
                results = await User.populate(results, {
                    path: 'latestMessage.sender',
                    select: 'username pic email'
                })
                res.status(200).send(results)
            })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const createGroupChat = asyncHandler(async (req, res) => {

})

const renameGroup = asyncHandler(async (req, res) => {

})

const removeFromGroup = asyncHandler(async (req, res) => {

})

const addToGroup = asyncHandler(async (req, res) => {

})


module.exports = { 
    accessChat, 
    getChats, 
    createGroupChat, 
    renameGroup, 
    removeFromGroup, 
    addToGroup 
}