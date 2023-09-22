import { useNavigate, useParams } from "react-router-dom"
import { addObservation } from "../../../managers/ObservationManager";
import { useState } from "react";
import ObservationFormMap from "./ObservationFormMap";
import "./observationForm.css"
import "../studyForm.css"

const AddObservation = () => {
    const { studyId } = useParams()
    const [showMap, setShowMap] = useState(false)
    const [observation, updateObservation] = useState({
        latitude: 0,
        longitude: 0,
        description: "",
        image: "",
        date: ""
    })
    
    const [formError, setFormError] = useState(false);
    const navigate = useNavigate()

    const updateForm = (e, updateFunc, dataType) => {
        let copy = { ...observation };
        if (dataType === "str") {
            updateFunc({ ...copy, [e.target.name]: e.target.value });
        } else if (dataType === "int") {
            updateFunc({ ...copy, [e.target.name]: parseInt(e.target.value) });
        } else if (dataType === "float") {
            if (e.target.value !== "") {
                updateFunc({ ...copy, [e.target.name]: parseFloat(e.target.value) });
            } else { // Change value to zero when all info in input is backspaced
                updateFunc({ ...copy, [e.target.name]: 0 });
            }
        }
    }

    const handleSaveObservation = async (e) => {
        e.preventDefault();
        const requiredStr = ['date']
        const formFilled = requiredStr.every(field => observation[field].length > 0)

        if (!formFilled) {
            setFormError(true);
            return;
        }

        // Send the new observation to the API
        try {
            await addObservation(observation, studyId)
            navigate(`/study/${studyId}`)
        } catch (error) {
            console.error(error)
        }
    }

    return <article>
        <form className="observationForm studyForm">
            <h2 className="observationFormHeader studyFormHeader">Record Your Observation 🔭</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="obs-latitude" className="studyLabel">Latitude:</label>
                    <input
                        id="obs-latitude"
                        required autoFocus
                        type="number"
                        name="latitude"
                        className="studyForm__control"
                        placeholder=""
                        value={observation.latitude !== 0 ? observation.latitude : ""}
                        onChange={(e) => updateForm(e, updateObservation, "float")}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="obs-longitude" className="studyLabel">Longitude:</label>
                    <input
                        id="obs-longitude"
                        required
                        type="number"
                        name="longitude"
                        className="studyForm__control"
                        placeholder=""
                        value={observation.longitude !== 0 ? observation.longitude : ""}
                        onChange={(e) => updateForm(e, updateObservation, "float")}
                    />
                </div>
            </fieldset>
            
            {!showMap
                ? <button className="btn__medium" onClick={(e) => {
                    e.preventDefault()
                    setShowMap(true)
                }}
                >Use My Location 🌎</button>

                : <ObservationFormMap
                    observation={observation}
                    updateObservation={updateObservation}
                    setShowMap={setShowMap} />
            }

            <fieldset>
                <div className="form-group">
                    <label htmlFor="obs-desc" className="studyLabel">Description:</label>
                    <textarea
                        id="obs-desc"
                        required
                        type="text"
                        name="description"
                        className="studyForm__control studyForm--textarea"
                        placeholder="Write a brief description of what you observed"
                        value={observation.description}
                        onChange={(e) => updateForm(e, updateObservation, "str")}
                    >
                    </textarea>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="obs-date" className="studyLabel">Date of Observation:</label>
                    <input
                        id="obs-date"
                        required
                        type="date"
                        name="date"
                        className="studyForm__control"
                        value={observation.date}
                        onChange={(e) => updateForm(e, updateObservation, "str")}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="obs-image" className="studyLabel">Image Url:</label>
                    <input
                        id="obs-image"
                        required
                        type="text"
                        name="image"
                        className="studyForm__control"
                        placeholder="Add an image url (optional)"
                        value={observation.image}
                        onChange={(e) => updateForm(e, updateObservation, "str")}
                    />
                </div>
            </fieldset>

            <div className="studyForm__btnGroup">
                <button
                    onClick={(clickEvent) => { handleSaveObservation(clickEvent) }}
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

            {formError && <div className="alert alert-danger">Please fill in all of the required fields.</div>}
        </form>
    </article>
}
export default AddObservation