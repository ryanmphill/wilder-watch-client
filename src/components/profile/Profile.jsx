import { useParams } from "react-router-dom"

const Profile = () => {
    const { userId } = useParams()

    return <article>
        This is the profile page for user {userId}
    </article>
}
export default Profile