import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { getSingleStudy } from "../../../managers/StudyManager"
import { useEffect, useState } from "react"
import StudyMap from "./StudyMap"
import "./studyDetails.css"


const StudyDetails = () => {
    const { studyId } = useParams()

    /*-------------------------------------------------------------*/
    const study = useLoaderData()
    const observations = study.observations
    const studyImg = {'--bg-image': `url(${study.image_url})`}
    /*-------------------------------------------------------------*/

    const navigate = useNavigate()

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
                        <StudyMap observations={observations} />
                    </section>
                </div>
            </div>
        </article>)
}
export default StudyDetails