import { Outlet } from "react-router-dom"
import ProfileHeader from "./ProfileHeader"
import { ProfileProvider } from "../../context/ProfileContext"


const Profile = () => {
    return <>
        <ProfileProvider>
            <section className="profile">
                <ProfileHeader />
                <Outlet />
            </section>
        </ProfileProvider>
    </>
}
export default Profile