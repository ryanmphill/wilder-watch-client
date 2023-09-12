import { useState } from "react";

const CreateStudyForm = () => {
    const [study, updateStudy] = useState({
        title: "",
        subject: "",
        summary: "",
        details: "",
        start_date: "",
        end_date: "",
        study_type: 0,
        region: 0,
        image_url: ""
    })
    const [regions, setRegions] = useState([])
    const [studyTypes, setStudyTypes] = useState([])
    const [formError, setFormError] = useState(false);

    const updateForm = (e, updateFunc, dataType) => {
        let studyCopy = { ...formData };
        if (dataType === "str") {
            updateFunc({ ...studyCopy, [e.target.name]: e.target.value });
        } else if (dataType === "int") {
            updateFunc({ ...studyCopy, [e.target.name]: parseInt(e.target.value) });
        }
    }

    const handleSaveStudy = (e) => {
        e.preventDefault();
        const requiredStr = ['title', 'subject', 'summary', 'details', 'start_date']
        const requiredNum = ['study_type', 'region']
        const formFilled = requiredStr.every(field => study[field].length > 0) && requiredNum.every(field => study[field] > 0)

        if (!formFilled) {
            setFormError(true);
            return;
        }
    }

    return <article>
        <form className="studyForm">
            <h2 className="studyFormHeader">Launch a New Study 🚀</h2>

            <fieldset>
                <div>
                    <label htmlFor="studyTitle" className="studyLabel">Title:</label>
                    <input
                        id="studyTitle"
                        required autoFocus
                        type="text"
                        name="title"
                        // className="form-control"
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
                        name="start_date"
                        className="form-control"
                        value={study.start_date}
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
                        name="end_date"
                        className="form-control"
                        value={study.end_date}
                        onChange={(e) => updateForm(e, updateStudy, "str")}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="selectStudyType" className="label-bold">Study Type:</label>
                    <select
                        id="selectStudyType"
                        name="study_type"
                        value={study.study_type}
                        onChange={(e) => updateForm(e, updateStudy, "int")}
                        className="form-control"
                    >
                        <option value="0">Select Type of Study</option>
                        {studyTypes.map((studyType) => (
                            <option
                                key={`studyType--${studyType.id}`}
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
                    <label htmlFor="selectRegion" className="label-bold">
                        Where is your study taking place?:
                    </label>
                    <select
                        id="selectRegion"
                        name="region"
                        value={study.region}
                        onChange={(e) => updateForm(e, updateStudy, "int")}
                        className="form-control"
                    >
                        <option value="0">Select a Region</option>
                        {regions.map((region) => (
                            <option
                                key={`region--${region.id}`}
                                value={region.id}
                            >
                                {region.label}
                            </option>
                        ))}
                    </select>
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