import { useEffect, useState } from "react"
import { getAllStudies } from "../../managers/StudyManager"
import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser } from "../../managers/AuthManager"

export const Home = ({ fetchCurrentUserId, fetchStudies, studies, currentUserId}) => {

    const navigate = useNavigate()

    useEffect(
        () => {
            fetchStudies()
            fetchCurrentUserId()
        },
        []
    )

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
                                <button>Delete</button>
                            </>
                        }
                        <div>------------------------------------------------</div>
                    </div>)
            }
        </section>
    </article>
}