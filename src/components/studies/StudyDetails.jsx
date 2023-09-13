import { useParams } from "react-router-dom"
import { getSingleStudy } from "../../managers/StudyManager"
import { useEffect, useState } from "react"


const StudyDetails = () => {
    const { studyId } = useParams()

    const [study, setStudy] = useState({})
    const [observations, setObservations] = useState([])

    const fetchStudy = () => {
        getSingleStudy(studyId).then(data => {
            setStudy(data)
            setObservations(data.observations)
        })
    }

    useEffect(
        () => {
            fetchStudy()
        },
        [studyId]
    )

    return <article>
        <h2>{study.title}</h2>
        <p>{study.summary}</p>
        <p>{study.details}</p>
        <div>Subject of Study: {study.subject}</div>
        <div>Type of Study: {study?.study_type?.label}</div>
        <div>Starting Date: {study.start_date}</div>
        <div>Region: {study?.region?.label}</div>

        <section>
            <h3>Observations from Study Participants</h3>
            {
                observations.length > 0 &&
                study.observations.map((observation) => 
                <div key={`observation--${observation.id}`}>
                    <div>----------------------------</div>
                    <div>Coordinates: {observation.latitude}, {observation.longitude}</div>
                    <div>Observed By: {observation.participant_name}</div>
                </div>)
            }
        </section>
    </article>
}
export default StudyDetails