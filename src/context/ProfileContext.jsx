import { createContext, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../managers/UserManager";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    // All your data goes here
    const { userId } = useParams()
    const [profileData, setProfileData] = useState({})

    const fetchUserProfile = useCallback(async () => {
        const userData = await getSingleUser(userId)
        setProfileData(userData)
    },[userId])
    

    // Return this context provider wrapping, it passes down the value prop to its children
    return (
        <ProfileContext.Provider
            value={{ userId, profileData, fetchUserProfile }}
        >
            {children}
        </ProfileContext.Provider>
    )
}