import {  useContext, useEffect } from "react"
import "./profile.css"
import { ProfileContext } from "../../context/ProfileContext"
import { ProfileNav } from "./ProfileNav"

const ProfileHeader = () => {
    const { userId, profileData, fetchUserProfile, fetchParticipatedStudies, fetchAuthoredStudies } = useContext(ProfileContext)

    useEffect(
        () => {
            fetchUserProfile()
        },
        [fetchUserProfile]
    )
    useEffect(
        () => {
            fetchParticipatedStudies()
        },
        [fetchParticipatedStudies]
    )
    useEffect(
        () => {
            fetchAuthoredStudies()
        },
        [fetchAuthoredStudies]
    )

    return (profileData &&
    <article className="profile__header fadeIn">
        <section>
            <div className="profile__header__flexContainer">
                <div className="profile__imgContainer">
                    {
                        profileData.image_url &&
                        <div className="profile__imgWrapper">
                        <img className="profile--img fadeIn" src={profileData?.image_url} alt="owner of profile"></img>
                        </div>
                    }
                </div>
                <div className="profile__header__info fadeIn">
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
        <ProfileNav profileId={userId}/>
    </article>
)}
export default ProfileHeader