import { useEffect, useState } from "react"
import { getAllStudies } from "../../managers/StudyManager"
import { Link } from "react-router-dom"

export const Home = () => {
    const [studies, setStudies] = useState([])

    const fetchStudies = () => {
        getAllStudies().then(data => setStudies(data))
    }

    useEffect(
        () => {
            fetchStudies()
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
                        <div>------------------------------------------------</div>
                    </div>)
            }
        </section>
    </article>
}