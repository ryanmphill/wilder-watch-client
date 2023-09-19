import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleUser } from "../../managers/UserManager"
import "./profile.css"

const Profile = () => {
    const { userId } = useParams()
    const [profileData, setProfileData] = useState({})

    const fetchUserProfile = useCallback(async () => {
        const userData = await getSingleUser(userId)
        setProfileData(userData)
    },[userId])

    useEffect(
        () => {
            fetchUserProfile()
        },
        [fetchUserProfile]
    )

    return <article>
        <section className="profile__header">
            <div className="profile__header__flexContainer">
                <div className="profile__imgContainer">
                    {
                        profileData.image_url &&
                        <div className="profile__imgWrapper">
                        <img className="profile--img" src={profileData?.image_url} alt="owner of profile"></img>
                        </div>
                    }
                </div>
                <div className="profile__header__info">
                    <header>
                        <h2>{profileData.full_name}</h2>
                        {profileData.flair &&
                            <div>{profileData.flair}</div>
                        }
                    </header>
                    <div>
                        {
                            profileData.bio &&
                            <div>{profileData.bio}</div>
                        }
                    </div>
                </div>
            </div>
        </section>
    </article>
}
export default Profile