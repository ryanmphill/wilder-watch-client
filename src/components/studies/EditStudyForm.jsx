import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRegions } from "../../managers/RegionManager";
import { getAllStudyTypes } from "../../managers/StudyTypeManager";
import { editStudy, getSingleStudy } from "../../managers/StudyManager";
import "./studyForm.css"

const EditStudyForm = () => {
    const { studyId } = useParams()

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
    const [focusedError, setFocusedError] = useState([]);
    const navigate = useNavigate()

    const fetchStudy = async () => {
        const studyJSON = await getSingleStudy(studyId)
        let studyCopy = {
            ...study,
            title: studyJSON.title,
            subject: studyJSON.subject,
            summary: studyJSON.summary,
            details: studyJSON.details,
            startDate: studyJSON.start_date,
            endDate: studyJSON.end_date ? studyJSON.end_date : "",
            studyTypeId: studyJSON.study_type.id,
            regionId: studyJSON.region.id,
            imageUrl: studyJSON.image_url
        };
        updateStudy(studyCopy)
    }

    useEffect(
        () => {
            fetchStudy()
        },
        [studyId]
    )

    useEffect(
        () => {
            const fetchRegionsAndTypes = async () => {
                const regionData = await getAllRegions()
                setRegions(regionData)
                const typeData = await getAllStudyTypes()
                setStudyTypes(typeData)
            }
            fetchRegionsAndTypes()
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

    const handleSaveStudy = async (e) => {
        e.preventDefault();
        const requiredStr = ['title', 'subject', 'summary', 'details', 'startDate']
        const requiredNum = ['studyTypeId', 'regionId']
        const formFilled = requiredStr.every(field => study[field].length > 0) && requiredNum.every(field => study[field] > 0)

        if (!formFilled) {
            setFormError(true);
            const missingStr = requiredStr.filter(field => study[field].length === 0)
            const missingNum = requiredNum.filter(field => study[field] === 0)
            const missingFields = missingStr.concat(missingNum)
            setFocusedError(missingFields)
            return;
        }

        // Send the updated study to the API
        try {
            await editStudy(study, studyId)
            navigate(`/study/${studyId}`)
        } catch (e) {
            console.error(e)
        }
    }

    return <article>
        <form className="studyForm fadeIn">
            <h2 className="studyFormHeader">Update your Study 🖊️</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studyTitle" className="studyLabel form-label">Title:</label>
                    <input
                        id="studyTitle"
                        required autoFocus
                        type="text"
                        name="title"
                        className="studyForm__control"
                        placeholder="Add a title for your study"
                        value={study.title}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
                {focusedError.includes("title") && 
                <div className="error-message">
                    ** Please enter a title **
                </div>}
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studySubject" className="studyLabel form-label">Subject:</label>
                    <input
                        id="studySubject"
                        required
                        type="text"
                        name="subject"
                        className="studyForm__control"
                        placeholder="What is the subject of the study?"
                        value={study.subject}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
                {focusedError.includes("subject") && 
                <div className="error-message">
                    ** Please enter a subject **
                </div>}
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studySummary" className="studyLabel form-label">Summary:</label>
                    <textarea
                        id="studySummary"
                        required
                        type="text"
                        name="summary"
                        className="studyForm__control studyForm--textarea"
                        placeholder="Write a summary to help users understand the study"
                        value={study.summary}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    >
                    </textarea>
                </div>
                {focusedError.includes("summary") && 
                <div className="error-message">
                    ** Please include a summary **
                </div>}
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studyDetailsField" className="studyLabel form-label">Details:</label>
                    <textarea
                        id="studyDetailsField"
                        required
                        type="text"
                        name="details"
                        className="studyForm__control studyForm--textarea"
                        placeholder="Help your users understand what you are asking of them."
                        value={study.details}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    >
                    </textarea>
                </div>
                {focusedError.includes("details") && 
                <div className="error-message">
                    ** Please provide some details **
                </div>}
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studyStartDate" className="studyLabel form-label">Start Date:</label>
                    <input
                        id="studyStartDate"
                        required
                        type="date"
                        name="startDate"
                        className="studyForm__control"
                        value={study.startDate}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
                {focusedError.includes("startDate") && 
                <div className="error-message">
                    ** Please enter a starting date **
                </div>}
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studyEndDate" className="studyLabel form-label">End Date:</label>
                    <input
                        id="studyEndDate"
                        required
                        type="date"
                        name="endDate"
                        className="studyForm__control"
                        value={study.endDate}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
            </fieldset>

            <div className="studyForm__flexContainer">
                <fieldset className="studyForm__flexChild">
                    <div className="form-group">
                        <label htmlFor="selectstudyTypeId" className="studyLabel form-label">Study Type:</label>
                        <select
                            id="selectstudyTypeId"
                            name="studyTypeId"
                            value={study.studyTypeId}
                            onChange={(e) => updateForm(e, updateStudy, "int")}
                            className="studyForm__control"
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
                    {focusedError.includes("studyTypeId") && 
                    <div className="error-message">
                        ** Please select a study type **
                    </div>}
                </fieldset>

                <fieldset className="studyForm__flexChild">
                    <div className="form-group">
                        <label htmlFor="selectregionId" className="studyLabel form-label">
                            Where is your study taking place?:
                        </label>
                        <select
                            id="selectregionId"
                            name="regionId"
                            value={study.regionId}
                            onChange={(e) => updateForm(e, updateStudy, "int")}
                            className="studyForm__control"
                        >
                            <option value="0">Select a region</option>
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
                    {focusedError.includes("regionId") && 
                    <div className="error-message">
                        ** Please select a region **
                    </div>}
                </fieldset>
            </div>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="studyImgUrl" className="studyLabel form-label">Image Url:</label>
                    <input
                        id="studyImgUrl"
                        required
                        type="text"
                        name="imageUrl"
                        className="studyForm__control"
                        placeholder="Add an image url (optional)"
                        value={study.imageUrl}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
            </fieldset>

            <div className="studyForm__btnGroup">
                <button
                    onClick={(clickEvent) => { handleSaveStudy(clickEvent) }}
                    className="btn__large"
                >
                    Submit
                </button>
                <button
                        onClick={() => { navigate(-1) }}
                        className="btn__cancel__large"
                >
                    Cancel
                </button>
            </div>

            {formError && <div className="error-message">Please fill in all of the required fields.</div>}
        </form>
    </article>
}
export default EditStudyForm