import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const logout = () => {
        // remove use form storage

        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})

    }

    return {logout}
}