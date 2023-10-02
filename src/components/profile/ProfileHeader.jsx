import {  useContext, useEffect } from "react"
import "./profile.css"
import { ProfileContext } from "../../context/ProfileContext"
import { ProfileNav } from "./ProfileNav"
import { AuthContext } from "../../context/AuthContext"
import { useLoaderData } from "react-router-dom"

const ProfileHeader = () => {
    const profileData = useLoaderData()
    const { userId, fetchParticipatedStudies, fetchAuthoredStudies } = useContext(ProfileContext)
    const { fetchCurrentUserId } = useContext(AuthContext)

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
    useEffect(
        () => {
            fetchCurrentUserId()
        },
        [fetchCurrentUserId]
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
        <ProfileNav profileId={userId}/>
    </article>
)}
export default ProfileHeader