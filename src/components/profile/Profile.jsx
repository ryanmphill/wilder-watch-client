import { Outlet } from "react-router-dom"
import ProfileHeader from "./ProfileHeader"
import { ProfileProvider } from "../../context/ProfileContext"


const Profile = () => {
    return <>
        <ProfileProvider>
            <ProfileHeader />
            <Outlet />
        </ProfileProvider>
    </>
}
export default Profile