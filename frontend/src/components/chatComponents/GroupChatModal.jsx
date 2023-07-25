import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    FormControl,
    Input
} from '@chakra-ui/react'
import { useState } from 'react'
import { useChatStore } from '../../store'

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [groupChatStates, setGroupChatStates] = useState({
        groupChatName: '',
        selectedUsers: '',
        search: '',
        searchResult: []
    })
    const [loading, setLoading] = useState(false)
    const { user, chats, setChats } = useChatStore((state) => state)
    const handleSearch = (e) => {
        console.log(e.target.value)
    }
    const handleSubmit = () => {

    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} justifyContent={'center'}>
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody

                    >
                        <FormControl>
                            <Input
                                placeholder='Chat Name'
                                mb={3}
                                onChange={(e) => {
                                    setGroupChatStates({ ...groupChatStates, groupChatName: e.target.value })
                                }}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder='Add users'
                                mb={3}
                                onChange={handleSearch}
                            />
                        </FormControl>
                        {/* selected users */}
                        {/* render searched users */}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal
