import { useContext, useEffect, useState } from "react"
import { deleteStudy, getAllStudies } from "../../managers/StudyManager"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export const Home = () => {
    const { currentUserId, fetchCurrentUserId } = useContext(AuthContext)

    const [confirmation, showConfirmation] = useState(0)
    const [studies, setStudies] = useState([])
    const navigate = useNavigate()

    const fetchStudies = async () => {
        const data = await getAllStudies()
        setStudies(data)
    }

    useEffect(
        () => {
            fetchStudies()
            fetchCurrentUserId()
        },
        []
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
        <section>
            <div>

            ------------------------------------------------- 

            </div>
            <div>
            
            ***Hero Img***

            </div>
            <div>
            
            -------------------------------------------------

            </div>
        </section>

        <h2>Welcome To WilderWatch</h2>

        <section>
            {
                studies.map((study) => 
                    <div key={`studyhome--${study.id}`}>
                        <div>------------------------------------------------</div>
                        <div><Link to={`study/${study.id}`}>{study.title}</Link></div>
                        <div>{study.summary}</div>
                        {
                            study?.author?.id === currentUserId &&
                            <>
                                <button onClick={() => navigate(`/study/edit/${study.id}`)}>Edit</button>
                                {
                                    study.id !== confirmation
                                        ? <button onClick={() => showConfirmation(study.id)}>Delete</button>
                                        : <>
                                            Are you sure?
                                            <button onClick={() => {handleDeleteClick(study.id)}}
                                                >Delete</button>
                                            <button onClick={() => showConfirmation(0)}>Cancel</button>
                                        </>
                                }
                                
                            </>
                        }
                        <div>------------------------------------------------</div>
                    </div>)
            }
        </section>
    </article>
}