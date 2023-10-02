import { useNavigate, useParams } from "react-router-dom"
import { addObservation } from "../../../managers/ObservationManager";
import { useState } from "react";
import ObservationFormMap from "./ObservationFormMap";
import "./observationForm.css"
import "../studyForm.css"
import { updateForm } from "../../../utils/helpers/updateFormData";

const AddObservation = () => {
    const { studyId } = useParams()
    const [showMap, setShowMap] = useState(false)
    const [observation, updateObservation] = useState({
        latitude: "",
        longitude: "",
        description: "",
        image: "",
        date: ""
    })
    
    const [formError, setFormError] = useState(false);
    const [focusedError, setFocusedError] = useState([]);
    const navigate = useNavigate()

    const handleSaveObservation = async (e) => {
        e.preventDefault();
        // Define requirements for form submission
        const requiredStr = ['date']
        const requiredNum = typeof observation.longitude === "number" && typeof observation.latitude === "number"
        const formFilled = requiredStr.every(field => observation[field].length > 0) && requiredNum === true
        const validLon = observation.longitude >= -180 && observation.longitude <= 180 && typeof observation.longitude === "number"
        const validLat = observation.latitude > -90 && observation.latitude < 90 && typeof observation.latitude === "number"
        // Validate user input
        if (!formFilled || !validLon || !validLat) {
            const focusedErrors = [];
            setFormError(true);
            if (observation["date"].length === 0) {
                focusedErrors.push("date")
            };
            if (!validLon) {
                focusedErrors.push("longitude")
            };
            if (!validLat) {
                focusedErrors.push("latitude")
            };
            setFocusedError(focusedErrors)
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
                        value={observation.latitude}
                        onChange={(e) => updateForm(e, observation, updateObservation, "float")}
                    />
                </div>
                {focusedError.includes("latitude") && 
                <div className="error-message">
                    ** Please enter a valid latitude in the range between -90 and +90 degrees. Latitudes in close proximity to the poles may not be visible on the map. **
                </div>}
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
                        value={observation.longitude}
                        onChange={(e) => updateForm(e, observation, updateObservation, "float")}
                    />
                </div>
                {focusedError.includes("longitude") && <div className="error-message">** Please enter a valid longitude in the range between -180 and +180 degrees **</div>}
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
                        onChange={(e) => updateForm(e, observation, updateObservation, "str")}
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
                        onChange={(e) => updateForm(e, observation, updateObservation, "str")}
                    />
                </div>
                {focusedError.includes("date") && <div className="error-message">** Please enter the date of your observation **</div>}
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
                        onChange={(e) => updateForm(e, observation, updateObservation, "str")}
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

            {formError && <div className="error-message">** Please provide a valid input for all of the required fields. **</div>}
        </form>
    </article>
}
export default AddObservation