import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons"
import { useChatStore } from "../../store"
import { Box, IconButton, Text, Button } from "@chakra-ui/react"
import ProfileModal from './ProfileModal'
import UpdateGroupChatModal from "./UpdateGroupChatModal"
// import { useEffect, useState } from "react"

const SingleChat = () => {
    const { user, selectedChat, setSelectedChat } = useChatStore((state)=>state)
    const sender = selectedChat.users?.filter((u) => u._id !== user._id)[0]
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
                                        <UpdateGroupChatModal />
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
                            Messages here
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
