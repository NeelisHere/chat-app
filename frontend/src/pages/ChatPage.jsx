import axios from "axios"
import { useEffect, useState } from "react"

const ChatPage = () => {

	const [chats, setChats] = useState([]);

	const fetchChats = async () => {
		const { data } = await axios.get('/chats')
		const { chatData } = data.chatData;
		setChats(chatData)
	}

	useEffect(() => {
		fetchChats()
	}, [])

	return (
		<div>
			{
				chats.map((chat, index) => {
					return(
						<div key={index}>{chat.message}</div>
					)
				})
			}
		</div>
	)
}

export default ChatPage
