import { useContext } from "react"
import { ProfileContext } from "../../context/ProfileContext"
import { Link } from "react-router-dom"

const ProfileParticipated = () => {
    const { participatedStudies } = useContext(ProfileContext)

    return (participatedStudies &&
        <article>
                <h3>Studies Participated In</h3>
                <section className="profile__studyCard__flexContainer">
                {
                    participatedStudies.map(study => 
                    <div className="profile__studyCard" key={`participated--${study.id}`}>
                        {
                            study.image_url &&
                            <div className="profile__studyCard__imgContainer">
                                <div className="profile__studyCard__imgWrapper">
                                    <img className="profile__studyCard--img" src={study.image_url} alt="participated study"></img>
                                </div>
                            </div>
                        }
                        <div className="profile__studyCard__info">
                            <div><h3><Link to={`/study/${study.id}`}>{study.title}</Link></h3></div>
                            <div>Subject: {study.subject}</div>
                            <div>Category: {study?.study_type?.label}</div>
                        </div>
                    </div>)
                }
                </section>
        </article>
    )
}
export default ProfileParticipated