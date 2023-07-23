import React, { useState } from 'react'
import { Box, Tooltip } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar } from '@chakra-ui/react'
import { useChatStore } from '../../store'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'

const SideDrawer = () => {
	const [states, setStates] = useState({
		search: '',
		searchResult: [],
		loading: false,
		loadingChat: false
	})
	const { user } = useChatStore((state) => state )
	const navigate = useNavigate()

	return (
		<Box 
			display={'flex'}
			justifyContent={'space-between'}
			alignItems={'center'}
			p={'5px 10px 5px 10px'}
			bg={'white'}
			// position={'absolute'}
			// top={'20px'}
			// left={'20px'}
			// right={'20px'}

			// w={'100%'}
			// borderWidth={'5px'}
			m={'20px 20px 20px 20px'}
			// m={'5px'}
			borderRadius={'md'}
			boxShadow='md'
		>
			<Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
				<Button variant={'ghost'}>
					<i class="fa-solid fa-magnifying-glass"></i>
					<Text display={{base:'none', md:'flex'}} px={4}>Search User</Text>
				</Button>

			</Tooltip>
			<Text fontSize={'2xl'} px={4}>Let's Chat</Text>
			<div>
				<Menu>
					<MenuButton p={1} m={'0px 10px 0px 10px'}>
					 	<i class="fa-solid fa-bell" style={{color: '#000000'}}></i>
					</MenuButton>
					{/* <MenuList></MenuList> */}
				</Menu>
				<Menu>
					<MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
					 	<Avatar size={'sm'} cursor={'pointer'} name={user.username}/>
					</MenuButton>
					<MenuList>
						<ProfileModal user={user}>
							<MenuItem>My Profile</MenuItem>
						</ProfileModal>
						<MenuDivider/>
						<MenuItem 
							onClick={()=>{
								localStorage.removeItem('userInfo')
								navigate('/')
							}}
						>
							Logout
						</MenuItem>
					</MenuList>
				</Menu>
			</div>
		</Box>
	)
}

export default SideDrawer
