import React, { useState } from 'react'

const SideDrawer = () => {
	const [ states, setStates ] = useState({
		search: '',
		searchResult: [],
		loading: false,
		loadingChat: false
	})
	return (
		<div>
			SideDrawer
		</div>
	)
}

export default SideDrawer
