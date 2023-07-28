import { Box } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <Box
            px={2}
            py={1}
            borderRadius={"md"}
            m={1}
            mb={2}
            variant={'solid'}
            fontSize={12}
            backgroundColor={'teal'}
            color={'white'}
            cursor={'pointer'}
            onClick={handleFunction}
        >
            { user.username }
            <CloseIcon pl={1}/>
        </Box>
        // <Badge colorScheme='purple' >{ user.username }</Badge>
    )
}

export default UserBadgeItem
