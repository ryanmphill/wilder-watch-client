import { useNavigate, useParams } from "react-router-dom"
import { getSingleStudy } from "../../../managers/StudyManager"
import { useEffect, useState } from "react"
import StudyMap from "./StudyMap"


const StudyDetails = () => {
    const { studyId } = useParams()

    const [study, setStudy] = useState({})
    const [observations, setObservations] = useState([])

    const navigate = useNavigate()

    const fetchStudy = async () => {
        const studyData = await getSingleStudy(studyId)
        setStudy(studyData)
        setObservations(studyData.observations)

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
        <div>
            <button
                onClick={() => {navigate(`/study/${studyId}/add_observation`)}}
            >Participate</button>
        </div>

        <section>
            <h3>Observations from Study Participants</h3>
            <StudyMap observations={observations}
            centerLon={study.average_longitude}
            centerLat={study.average_latitude}
            furthestLon={study.furthest_longitude}
            furthestLat={study.furthest_latitude} />
            {
                observations.length > 0 &&
                observations.map((observation) => 
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