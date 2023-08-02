import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons"
import { useChatStore } from "../../store"
import { Box, IconButton, Text, Button, Spinner, FormControl, Input, useToast } from "@chakra-ui/react"
import ProfileModal from './ProfileModal'
import ScrollableChat from './ScrollableChats.jsx'
import UpdateGroupChatModal from "./UpdateGroupChatModal"
import { useEffect, useState } from "react"
import axios from "axios"
import './styles.css'


const SingleChat = () => {
    const { user, selectedChat, setSelectedChat } = useChatStore((state)=>state)
    const sender = selectedChat.users?.filter((u) => u._id !== user._id)[0]
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState('')
    const toast = useToast()

    const sendMessage = async (e) =>{
        
        if(e.key === 'Enter' && newMessage){
            // console.log(newMessage)
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                }
                setNewMessage('')
                const { data } = await axios.post('/api/v1/messages/', {
                    content: newMessage,
                    chatId: selectedChat._id
                }, config)
                setMessages([...messages, data])
                // console.log(data)

            } catch (error) {
                toast({
                    title: 'Error occured',
                    description: 'Failed to load the Chats',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom-left'
                })
            }
        }
    }
    const fetchMessages = async () => {
        // console.log(typeof selectedChat, selectedChat)
        if(selectedChat.length===0)return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            setLoading(true)
            const { data } = await axios.get(`/api/v1/messages/${selectedChat._id}`, config);
            setMessages(data)
            // console.log(messages)
            setLoading(false)
        } catch (error) {
            toast({
                title: 'Error occured',
                description: 'Failed to load the Chats',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
            })
        }
    }
    useEffect(()=>{
        fetchMessages()
    },[selectedChat])

    const typingHandler = (e) => {
        // typing indicator logic
        setNewMessage(e.target.value)
    }

    return (
        <Box display={'flex'} height={'100%'} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
            {
                selectedChat.chatName ?
                    <>
                        <Box
                            pb={3}
                            px={2}
                            w={'100%'}
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <IconButton
                                display={'flex'}
                                icon={<ArrowBackIcon />}
                                onClick={() => {

                                }}
                            />
                            {
                                selectedChat.isGroupChat ?
                                    <>
                                        <Text fontSize={'24px'}>
                                            {selectedChat.chatName}
                                        </Text>
                                        <UpdateGroupChatModal fetchMessages={fetchMessages}/>
                                    </>
                                    :
                                    <>
                                        <Text fontSize={'24px'}>
                                            {sender.username}
                                        </Text>
                                        <ProfileModal user={sender}>
                                            <Button colorScheme="teal">
                                                Sender
                                            </Button>
                                        </ProfileModal>
                                    </>
                            }
                        </Box>
                        <Box
                            display={'flex'}
                            flexDir={'column'}
                            justifyContent={'flex-end'}
                            p={3}
                            bg={'#f4f4f4'}
                            w={'100%'}
                            height={'100%'}
                            borderRadius={'lg'}
                            overflowY={'hidden'}
                        >
                            {
                                loading ?
                                <Spinner
                                    size={'xl'}
                                    w={20}
                                    h={20}
                                    alignSelf={'auto'}
                                    // border={'2px solid red'}
                                />
                                :
                                <div>
                                    <ScrollableChat messages={messages}/>
                                </div>
                            }
                            <FormControl
                                tabIndex={0}
                                onKeyDown={sendMessage}
                                isRequired
                                mt={3}
                            >
                                <Input 
                                    variant={'filled'}
                                    bg={'white'}
                                    placeholder="Enter a message..."
                                    boxShadow={'base'}
                                    onChange={typingHandler}
                                    value={newMessage}
                                />
                            </FormControl>
                        </Box>
                    </>
                    :
                    <Box >
                        <Text fontSize={'24px'}>
                            Click on a Chat to Start Chatting
                        </Text>
                    </Box>
            }
        </Box>
    )
}

export default SingleChat
