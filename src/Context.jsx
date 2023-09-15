import { createContext, useState } from "react";
import { getCurrentUser } from "./managers/AuthManager";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // All your data goes here
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [isAdmin, setIsAdminState] = useState(localStorage.getItem('wilder_admin'))
    const [currentUserId, setCurrentUserId] = useState(0)

    const setToken = (newToken) => {
        localStorage.setItem('auth_token', newToken)
        setTokenState(newToken)
    }

    const setAdmin = (isStaff) => {
        localStorage.setItem('wilder_admin', isStaff)
        setIsAdminState(isStaff)
    }

    const fetchCurrentUserId = async () => {
        if (localStorage.getItem("auth_token")) {
            const data = await getCurrentUser()
            setCurrentUserId(data.id)
        } else {
            setCurrentUserId(0)
        }
        
    }

    

    // Return this context provider wrapping, it passes down the value prop to its children
    return (
        <AuthContext.Provider
            value={{ token, setToken, isAdmin, setAdmin, currentUserId, fetchCurrentUserId }}
        >
            {children}
        </AuthContext.Provider>
    )
}