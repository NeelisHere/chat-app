import { SettingsIcon } from "@chakra-ui/icons"
import { useDisclosure, useToast } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, Box
} from '@chakra-ui/react'
import { useChatStore } from "../../store"
import { useState } from "react"


const UpdateGroupChatModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, selectedChat, setSelectedChat } = useChatStore((state)=>state)
    const [ groupChatStates, setGroupChatStates ] = useState({
        groupChatName: '',
        search: '',
        searchResult: []
    })
    
    const [ loading, setLoading ] = useState(false)
    const [ renameLoading, setRenameLoading ] = useState(false)
    const toast = useToast()

    return (
        <>
            <Button onClick={onOpen} variant='ghost'>
                <SettingsIcon />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} justifyContent={'center'}>
                        {selectedChat.chatName}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>
                        <Box>
                            
                        </Box>
                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={onClose}>
                            Edit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal
