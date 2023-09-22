import { Link, useNavigate, useParams } from "react-router-dom"
import { getSingleStudy } from "../../../managers/StudyManager"
import { useEffect, useState } from "react"
import StudyMap from "./StudyMap"
import "./studyDetails.css"


const StudyDetails = () => {
    const { studyId } = useParams()

    const [study, setStudy] = useState({})
    const [studyImg, setStudyImg] = useState({})
    const [observations, setObservations] = useState([])

    const navigate = useNavigate()

    const fetchStudy = async () => {
        const studyData = await getSingleStudy(studyId)
        setStudy(studyData)
        setObservations(studyData.observations)
        const bgImage = {'--bg-image': `url(${studyData.image_url})`}
        setStudyImg(bgImage)
    }

    useEffect(
        () => {
            fetchStudy()
        },
        [studyId]
    )

    return (study &&
        <article>
            <section className="studyDetails__imgHeader" style={studyImg}>
                <div className="studyDetails__imgHeaderContainer">
                    <div className="studyDetails__imgHeaderTab">Study Type: {study?.study_type?.label}</div>
                    <div className="studyDetails__imgHeaderTab">Locality: {study?.region?.label}</div>
                    <div className="studyDetails__imgHeaderTab">Subject of Study: {study.subject}</div>
                </div>
            </section>

            <div className="studyDetails__body">
                <section>
                    <h2>{study.title}</h2>
                    <p>{study.summary}</p>
                </section>

                <div className="studyDetails__bodyFlex">
                    <section className="studyDetails__infoContainer">
                        <h3>Study Details</h3>
                        <p>{study.details}</p>
                        <div>Starting Date: {study.start_date}</div>
                        <div>Authored By: <Link to={`/profile/${study?.author?.id}`}>{study?.author?.full_name}</Link></div>
                        <div>
                            <button className="btn__medium studyDetails__participate"
                                onClick={() => { navigate(`/study/${studyId}/add_observation`) }}
                            >Participate</button>
                        </div>
                    </section>

                    <section className="studyDetails__mapContainer">
                        <h3>Observations from Study Participants</h3>
                        <StudyMap observations={observations}
                            centerLon={study.average_longitude}
                            centerLat={study.average_latitude}
                            furthestLon={study.furthest_longitude}
                            furthestLat={study.furthest_latitude} />
                    </section>
                </div>
                {/*
                    observations.length > 0 &&
                    observations.map((observation) =>
                        <div key={`observation--${observation.id}`}>
                            <div>----------------------------</div>
                            <div>Coordinates: {observation.latitude}, {observation.longitude}</div>
                            <div>Observed By: {observation.participant_name}</div>
                        </div>)
                */}
            </div>
        </article>)
}
export default StudyDetails