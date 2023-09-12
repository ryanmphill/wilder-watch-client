import { useEffect, useState } from "react"
import { getAllStudies } from "../../managers/StudyManager"

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
        <h2>Welcome To WilderWatch</h2>
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
        <section>
            {
                studies.map((study) => 
                    <div key={`studyhome--${study.id}`}>
                        <div>------------------------------------------------</div>
                        <div>{study.title}</div>
                        <div>{study.summary}</div>
                        <div>------------------------------------------------</div>
                    </div>)
            }
        </section>
    </article>
}