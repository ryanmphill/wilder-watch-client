import { useCallback, useContext, useEffect, useState } from "react"
import { deleteStudy, getAllStudies } from "../../managers/StudyManager"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import wilderLock from "../../assets/lock white.svg"
import deleteIcon from "../../assets/delete-icon.svg"
import editIcon from "../../assets/edit-icon.svg"
import "./home.css"

export const Home = () => {
    const { currentUserId, fetchCurrentUserId } = useContext(AuthContext)

    const [confirmation, showConfirmation] = useState(0)
    const [studies, setStudies] = useState([])
    const navigate = useNavigate()

    const fetchStudies = useCallback(async () => {
        const data = await getAllStudies()
        setStudies(data)
    },[])

    useEffect(
        () => {
            fetchStudies()
            fetchCurrentUserId()
        },
        [fetchStudies, fetchCurrentUserId]
    )

    const handleDeleteClick = async (id) => {
        try {
            await deleteStudy(id)
            fetchStudies()
        } catch (err) {
            console.error(err)
        }
    }

    return <article>
        <section className="home__heroImg">
            <div className="home__lockContainer">
                <img className="home__lock" src={wilderLock} alt="lock"></img>
            </div>
        </section>

        <h2 className="homeHeader fadeIn">Welcome To WilderWatch</h2>

        <section className="home__studyCard__flexContainer">
            {
                studies.map((study) => 
                    <div className="home__studyCard fadeIn" key={`studyhome--${study.id}`}>
                        {
                            study.image_url &&
                            <div className="home__studyCard__imgContainer">
                                <div className="home__studyCard__imgWrapper">
                                    <img className="home__studyCard--img" src={study.image_url} alt="study"></img>
                                </div>
                            </div>
                        }
                        <div className="home__studyCard__info">
                            <div><Link className="home__studyCard__title" to={`study/${study.id}`}>{study.title}</Link></div>
                            <div>Subject: {study.subject}</div>
                            <div>Category: {study?.study_type?.label}</div>
                        </div>
                        <footer className="home__studyCard--footer">
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
                                                <p className="home__studyCard__dltPrompt fadeIn">Are you sure?</p>
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
}