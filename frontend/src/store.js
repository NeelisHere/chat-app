import { create } from 'zustand'

export const useChatStore = create((set) => ({
    user: {
        email: '', password: '', pic: '', token: '', username: '', _id:'' 
    },
    isLoggedIn: false,
    selectedChat: [],
    chats: [],
    getCurrentUser: (currentUser)=> set((state)=>({ 
        user: { ...state.user, ...currentUser },
        isLoggedIn: currentUser? true: false 
    })),
    setSelectedChat: (usersarray)=>set((state)=>{
        return { ...state, selectedChat : usersarray}
    }),
    setChats: (userChats) => set((state)=>{
        return { ...state, chats: userChats }
    })

}));