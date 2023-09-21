import { useContext, useState } from "react"
import { ProfileContext } from "../../context/ProfileContext"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import deleteIcon from "../../assets/delete-icon.svg"
import editIcon from "../../assets/edit-icon.svg"

const ProfileAuthored = () => {
    const { authoredStudies } = useContext(ProfileContext)
    const { currentUserId } = useContext(AuthContext)
    const [confirmation, showConfirmation] = useState(0)
    const navigate = useNavigate()

    return (authoredStudies.length > 0 ?
        <article className="fadeIn">
                <h3>Studies Authored</h3>
                <section className="profile__studyCard__flexContainer">
                {
                    authoredStudies.map(study => 
                    <div className="profile__studyCard" key={`authored--${study.id}`}>
                        {
                            study.image_url &&
                            <div className="profile__studyCard__imgContainer">
                                <div className="profile__studyCard__imgWrapper">
                                    <img className="profile__studyCard--img" src={study.image_url} alt="authored study"></img>
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
            <h4>No studies authored yet</h4>
        </article>
    )
}
export default ProfileAuthored