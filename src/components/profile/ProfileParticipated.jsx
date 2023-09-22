import { useContext, useState } from "react"
import { ProfileContext } from "../../context/ProfileContext"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import deleteIcon from "../../assets/delete-icon.svg"
import editIcon from "../../assets/edit-icon.svg"
import { deleteStudy } from "../../managers/StudyManager"

const ProfileParticipated = () => {
    const { participatedStudies, fetchParticipatedStudies, fetchAuthoredStudies } = useContext(ProfileContext)
    const { currentUserId } = useContext(AuthContext)
    const [confirmation, showConfirmation] = useState(0)
    const navigate = useNavigate()

    const handleDeleteClick = async (id) => {
        try {
            await deleteStudy(id)
            fetchParticipatedStudies()
            fetchAuthoredStudies()
        } catch (err) {
            console.error(err)
        }
    }

    return (participatedStudies.length > 0 ?
        <article className="fadeIn">
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
                            <div><h3><Link className="profile__studyCard__title" to={`/study/${study.id}`}>{study.title}</Link></h3></div>
                            <div>Subject: {study.subject}</div>
                            <div>Category: {study?.study_type?.label}</div>
                        </div>
                        <footer className="profile__studyCard--footer">
                            {
                                study?.author?.id === currentUserId &&
                                <>
                                    {
                                        study.id !== confirmation
                                            ? <>
                                                <button className="iconbtn__edit fadeIn" onClick={() => navigate(`/study/edit/${study.id}`)}>
                                                    <img className="iconbtn__edit--img fadeIn" src={editIcon} alt="edit"></img>
                                                </button>
                                                <button className="iconbtn__dlt fadeIn" onClick={() => showConfirmation(study.id)}>
                                                    <img className="iconbtn__dlt--img fadeIn" src={deleteIcon} alt="delete"></img>
                                                </button>
                                              </>
                                            : <>
                                                <p className="profile__studyCard__dltPrompt fadeIn">Are you sure?</p>
                                                <button className="btn__small fadeIn" onClick={() => { handleDeleteClick(study.id) }}
                                                >Delete</button>
                                                <button className="btn__cancel__small fadeIn" onClick={() => showConfirmation(0)}>Cancel</button>
                                            </>
                                    }

                                </>
                            }
                        </footer>
                    </div>)
                }
                </section>
        </article>
        :
        <article>
            <h4>No studies have been participated in yet</h4>
        </article>
    )
}
export default ProfileParticipated