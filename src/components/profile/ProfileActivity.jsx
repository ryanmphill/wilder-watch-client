import { useCallback, useContext, useEffect, useState } from "react"
import { ProfileContext } from "../../context/ProfileContext"
import { formatDate } from "../../utils/helpers/formatDate"

const ProfileActivity = () => {
    const { userId, profileData } = useContext(ProfileContext)
    
    return (profileData &&
        <article>
            <div>Observations made: {profileData.observation_count}</div>
            <div>Studies participated in: {profileData.studies_participated_count}</div>
            {
                profileData.authored_studies_count > 0 &&
                <div>Authored Studies: {profileData.authored_studies_count}</div>
            }
            <div>Member since: {profileData.date_joined && formatDate(profileData.date_joined)}</div>
        </article>
    )
}
export default ProfileActivity