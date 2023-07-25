import { useEffect, useState } from 'react'
import { useChatStore } from '../../store'
import { Box, useToast, Button, Stack, Text, Avatar } from '@chakra-ui/react'
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'
import ChatLoading from './ChatLoading.jsx'
import GroupChatModal from './GroupChatModal'


const MyChats = () => {
    const { user, selectedChat, chats, getCurrentUser, setSelectedChat, setChats } = useChatStore((state) => state)
    const [loggedUser, setLoggedUser] = useState({})
    const toast = useToast()
    const fetchChats = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            }
            const { data } = await axios.get('/api/v1/chats/get-chats', config)
            setChats([...chats, ...data])
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

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
        fetchChats()
    }, [])

    return (
        <Box
            // display={{base: selectedChat ? 'none': 'flex', md: 'flex'}}
            display={'flex'}
            flexDir={'column'}
            alignItems={'center'}
            p={3}
            bg={'white'}
            marginLeft={'10px'}
            w={{ base: '100%', md: '31%' }}
            borderRadius={'lg'}
            boxShadow={'md'}
            overflowY={'hidden'}
        // borderWidth={'1px'}
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: '28px', md: '30px' }}
                display={'flex'}
                w={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
            // bg={'#f4f4f4'}
            // borderRadius={'lg'}
            // boxShadow={'base'}
            >
                My Chats
                <GroupChatModal>
                    <Button
                        // bg={'teal'}
                        color={'teal'}
                        display={'flex'}
                        rightIcon={<AddIcon />}
                    >
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
                display={'flex'}
                flexDir={'column'}
                p={3}
                // bg={'#f8f8f8'}
                w={'100%'}
                h={'100%'}
                borderRadius={'lg'}
                overflowY={'hidden'}
            >
                {/* {console.log(chats, typeof chats)}
                {chats.map((chat)=>{
                    console.log(chat, typeof chat)
                    return (<div>{chat._id}</div>)
                })} */}
                {
                    chats ?
                        <Stack overflowY={'scroll'}>
                            {
                                chats.map((chat, index) => (
                                    <Box
                                        onClick={() => setSelectedChat(chat)}
                                        cursor={'pointer'}
                                        bg={'#f4f4f4'}
                                        // boxShadow={'base'}
                                        px={3}
                                        py={2}
                                        borderRadius={'lg'}
                                        w={'100%'}
                                        key={index}
                                        display={'flex'}
                                        alignItems={'center'}
                                    >
                                        {/* {chat._id}
                                        {console.log(chat._id)} */}
                                        <Avatar
                                            mr={2}
                                            size={'sm'}
                                            cursor={'pointer'}
                                            name={'x'}
                                            // src={}
                                        />
                                        <Box>
                                            <Text>
                                                {
                                                    !chat.isGroupChat ?
                                                        (
                                                            chat.users[0]._id === loggedUser._id ?
                                                                chat.users[1].username : chat.users[0].username
                                                        )
                                                        :
                                                        chat.chatName
                                                }
                                            </Text>
                                            <Text fontSize={'xs'}>{'groupchat'}</Text>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Stack> :
                        <ChatLoading />
                }

            </Box>
        </Box>
    )
}

export default MyChats



