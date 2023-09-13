import { useParams } from "react-router-dom"
import { getSingleStudy } from "../../managers/StudyManager"
import { useEffect, useState } from "react"


const StudyDetails = () => {
    const { studyId } = useParams()

    const [study, setStudy] = useState({})

    const fetchStudy = () => {
        getSingleStudy(studyId).then(data => setStudy(data))
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
    </article>
}
export default StudyDetails