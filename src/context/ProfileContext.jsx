import { createContext, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudiesAuthored, getStudiesParticipated } from "../managers/UserManager";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    // All your data goes here
    const { userId } = useParams()
    const [participatedStudies, setParticipatedStudies] = useState([])
    const [authoredStudies, setAuthoredStudies] = useState([])

    const fetchParticipatedStudies = useCallback(async () => {
        const userData = await getStudiesParticipated(userId)
        setParticipatedStudies(userData)
    },[userId])

    const fetchAuthoredStudies = useCallback(async () => {
        const userData = await getStudiesAuthored(userId)
        setAuthoredStudies(userData)
    },[userId])
    

    // Return this context provider wrapping, it passes down the value prop to its children
    return (
        <ProfileContext.Provider
            value={{ userId, participatedStudies, fetchParticipatedStudies, 
                authoredStudies, fetchAuthoredStudies }}
        >
            {children}
        </ProfileContext.Provider>
    )
}