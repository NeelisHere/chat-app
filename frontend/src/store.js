import { create } from 'zustand'

export const useChatStore = create((set) => ({
    user: {
        email: '', password: '', pic: '', token: '', username: '', _id:'' 
    },
    isLoggedIn: false,
    getCurrentUser: (currentUser)=> set((state)=>({ 
        user: { ...state.user, ...currentUser },
        isLoggedIn: currentUser? true: false 
    }))

}));