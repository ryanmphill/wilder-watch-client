import { useEffect, useState } from "react";
import { createNewStudy } from "../../managers/StudyManager";
import { useNavigate } from "react-router-dom";
import { getAllRegions } from "../../managers/RegionManager";
import { getAllStudyTypes } from "../../managers/StudyTypeManager";

const CreateStudyForm = () => {
    const [study, updateStudy] = useState({
        title: "",
        subject: "",
        summary: "",
        details: "",
        startDate: "",
        endDate: "",
        studyTypeId: 0,
        regionId: 0,
        imageUrl: ""
    })
    const [regions, setRegions] = useState([])
    const [studyTypes, setStudyTypes] = useState([])
    const [formError, setFormError] = useState(false);
    const navigate = useNavigate()

    useEffect(
        () => {
            getAllRegions().then((data) => setRegions(data))
            getAllStudyTypes().then((data) => setStudyTypes(data))
        },
        []
    )

    const updateForm = (e, updateFunc, dataType) => {
        let studyCopy = { ...study };
        if (dataType === "str") {
            updateFunc({ ...studyCopy, [e.target.name]: e.target.value });
        } else if (dataType === "int") {
            updateFunc({ ...studyCopy, [e.target.name]: parseInt(e.target.value) });
        }
    }

    const handleSaveStudy = (e) => {
        e.preventDefault();
        const requiredStr = ['title', 'subject', 'summary', 'details', 'startDate']
        const requiredNum = ['studyTypeId', 'regionId']
        const formFilled = requiredStr.every(field => study[field].length > 0) && requiredNum.every(field => study[field] > 0)

        if (!formFilled) {
            setFormError(true);
            return;
        }

        // Send the new study to the API
        createNewStudy(study)
            .then((newStudy) => {
                const newStudyId = newStudy.id
                navigate(`/study/${newStudyId}`)
            })
            .catch((e) => console.error(e))
    }

    return <article>
        <form className="studyForm">
            <h2 className="studyFormHeader">Launch a New Study 🚀</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studyTitle" className="studyLabel">Title:</label>
                    <input
                        id="studyTitle"
                        required autoFocus
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Add a title for your study"
                        value={study.title}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studySubject" className="studyLabel">Subject:</label>
                    <input
                        id="studySubject"
                        required autoFocus
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="What is the subject of the study?"
                        value={study.subject}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studySummary" className="studyLabel">Summary:</label>
                    <textarea
                        id="studySummary"
                        required autoFocus
                        type="text"
                        name="summary"
                        className="form-control"
                        placeholder="Write a summary to help users understand the study"
                        value={study.summary}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    >
                    </textarea>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studyDetailsField" className="studyLabel">Details:</label>
                    <textarea
                        id="studyDetailsField"
                        required autoFocus
                        type="text"
                        name="details"
                        className="form-control"
                        placeholder="Help your users understand what you are asking of them."
                        value={study.details}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    >
                    </textarea>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studyStartDate" className="studyLabel">Start Date:</label>
                    <input
                        id="studyStartDate"
                        required autoFocus
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={study.startDate}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studyEndDate" className="studyLabel">End Date:</label>
                    <input
                        id="studyEndDate"
                        required autoFocus
                        type="date"
                        name="endDate"
                        className="form-control"
                        value={study.endDate}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="selectstudyTypeId" className="label-bold">Study Type:</label>
                    <select
                        id="selectstudyTypeId"
                        name="studyTypeId"
                        value={study.studyTypeId}
                        onChange={(e) => updateForm(e, updateStudy, "int")}
                        className="form-control"
                    >
                        <option value="0">Select Type of Study</option>
                        {studyTypes.map((studyType) => (
                            <option
                                key={`studyTypeId--${studyType.id}`}
                                value={studyType.id}
                            >
                                {studyType.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="selectregionId" className="label-bold">
                        Where is your study taking place?:
                    </label>
                    <select
                        id="selectregionId"
                        name="regionId"
                        value={study.regionId}
                        onChange={(e) => updateForm(e, updateStudy, "int")}
                        className="form-control"
                    >
                        <option value="0">Select a regionId</option>
                        {regions.map((region) => (
                            <option
                                key={`regionId--${region.id}`}
                                value={region.id}
                            >
                                {region.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studyImgUrl" className="studyLabel">Image Url:</label>
                    <input
                        id="studyImgUrl"
                        required autoFocus
                        type="text"
                        name="imageUrl"
                        className="form-control"
                        placeholder="Add an image url (optional)"
                        value={study.imageUrl}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => { handleSaveStudy(clickEvent) }}
                className="btn btn-primary"
            >
                Submit
            </button>

            {formError && <div className="alert alert-danger">Please fill in all of the required fields.</div>}
        </form>
    </article>
}
export default CreateStudyForm