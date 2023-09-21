import { useCallback, useContext, useEffect, useState } from "react"
import { deleteStudy, getAllStudies } from "../../managers/StudyManager"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import wilderLock from "../../assets/lock white.svg"
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

        <h2 className="homeHeader">Welcome To WilderWatch</h2>

        <section className="home__studyCard__flexContainer">
            {
                studies.map((study) => 
                    <div className="home__studyCard" key={`studyhome--${study.id}`}>
                        {
                            study.image_url &&
                            <div className="home__studyCard__imgContainer">
                                <div className="home__studyCard__imgWrapper">
                                    <img className="home__studyCard--img" src={study.image_url} alt="study"></img>
                                </div>
                            </div>
                        }
                        <div className="home__studyCard__info">
                            <div><Link to={`study/${study.id}`}>{study.title}</Link></div>
                            <div>Subject: {study.subject}</div>
                            <div>Category: {study?.study_type?.label}</div>
                        </div>
                        <footer className="home__studyCard--footer">
                            {
                                study?.author?.id === currentUserId &&
                                <>
                                    <button onClick={() => navigate(`/study/edit/${study.id}`)}>Edit</button>
                                    {
                                        study.id !== confirmation
                                            ? <button onClick={() => showConfirmation(study.id)}>Delete</button>
                                            : <>
                                                Are you sure?
                                                <button onClick={() => { handleDeleteClick(study.id) }}
                                                >Delete</button>
                                                <button onClick={() => showConfirmation(0)}>Cancel</button>
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