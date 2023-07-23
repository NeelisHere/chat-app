import React, { useState } from 'react'
import { Box, Tooltip } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import {
	Input,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Avatar } from '@chakra-ui/react'
import { useChatStore } from '../../store'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import UserListItem from './UserListItem'

const SideDrawer = () => {
	const [states, setStates] = useState({
		search: '',
		searchResult: [],
		loading: false,
		loadingChat: false
	})
	const { user } = useChatStore((state) => state)
	const navigate = useNavigate()
	const toast = useToast()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const handleSearch = async () => {
		if(!states.search){
			toast({
				title: 'Please enter something in Search',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'top'
			})
			return;
		}
		try {
			setStates({ ...states, loading: true })
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`
				}
			}
			const { data } = await axios.get(`/api/v1/users/all-users?search=${states.search}`, config)
			setStates({ ...states, loading: false, searchResult: data.users })
		} catch (error) {
			toast({
				title: 'Error occured',
				description: 'Failed to load the Search Results',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top'
			})
		}
	}

	const accessChat = (userId) => {
		alert(userId)
	}

	return (
		<Box>
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
					<Button variant={'ghost'} onClick={onOpen}>
						<i class="fa-solid fa-magnifying-glass"></i>
						<Text display={{ base: 'none', md: 'flex' }} px={4}>Search User</Text>
					</Button>
				</Tooltip>
				<Text fontSize={'2xl'} px={4}>Let's Chat</Text>
				<div>
					<Menu>
						<MenuButton p={1} m={'0px 10px 0px 10px'}>
							<i class="fa-solid fa-bell" style={{ color: '#000000' }}></i>
						</MenuButton>
						{/* <MenuList></MenuList> */}
					</Menu>
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							<Avatar size={'sm'} cursor={'pointer'} name={user.username} />
						</MenuButton>
						<MenuList>
							<ProfileModal user={user}>
								<MenuItem>My Profile</MenuItem>
							</ProfileModal>
							<MenuDivider />
							<MenuItem
								onClick={() => {
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
			<Drawer placement='left' onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent bg={'#f4f4f4'}>
					<DrawerHeader borderBottomWidth={'1px'}>Search Users</DrawerHeader>
					<DrawerBody>
						<Box
							display={'flex'}
							paddingBottom={2}
							
						>
							<Input
								placeholder='Search'
								mr={2}
								value={states.search}
								bg={'white'}
								onChange={(e) => {
									setStates({ ...states, search: e.target.value })
								}}
							/>
							<Button
								onClick={handleSearch}
							>
								<SearchIcon/>
							</Button>
						</Box>
						<br />
						{
							states.loading ?
							<ChatLoading/>:
							(
								states.searchResult.map((user)=>{
									return(
										<UserListItem 
											key={user._id}
											user={user}
											handleFunction={()=>{
												accessChat(user._id)
											}}
										/>
									)
								})
							)
						}
					</DrawerBody>
				</DrawerContent>

			</Drawer>
		</Box>
	)
}

export default SideDrawer
