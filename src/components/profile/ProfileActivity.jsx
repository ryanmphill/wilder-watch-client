import { useContext } from "react"
import { ProfileContext } from "../../context/ProfileContext"

const ProfileActivity = () => {
    const { userId, profileData, fetchUserProfile } = useContext(ProfileContext)
    return <article>
            <div>User # {userId}</div>
            <div>Name: {profileData.full_name}</div>
        </article>
}
export default ProfileActivity