import { formatDate } from "../../utils/helpers/formatDate"
import { Link, useRouteLoaderData } from "react-router-dom"

const ProfileActivity = () => {
    const profileData = useRouteLoaderData("profileRoot") // Access loader data from the root profile route
    
    return (profileData &&
        <article className="fadeIn" id="activity--article">
            <section className="activity__userStats">
                <div className="activity__stat">
                    <div className="activity__stat__label">Observations made: </div> 
                    <div className="activity__stat__data">{profileData.observation_count}</div>
                </div>
                <div className="activity__stat">
                    <div className="activity__stat__label">Studies participated: </div> 
                    <div className="activity__stat__data">{profileData.studies_participated_count}</div>
                </div>
                <div className="activity__stat">
                    <div className="activity__stat__label">Member since: </div> 
                    <div className="activity__stat__data">{profileData.date_joined && formatDate(profileData.date_joined)}</div>
                </div>
            </section>
            {
                    profileData.authored_studies_count > 0 &&
                    <div>Authored Studies: {profileData.authored_studies_count}</div>
            }
            <section>
                <h3>Recent Activity</h3>
                {
                    profileData.observations &&
                    profileData.observations.map(obs => 
                    <div className="activity__observation" key={`userobs--${obs.id}`}>
                        {
                            obs.image &&
                            <div className="activity__observation__imgContainer">
                                <div className="activity__observation__imgWrapper">
                                    <img className="activity__observation--img" src={obs.image} alt="observation"></img>
                                </div>
                            </div>
                        }
                        <div className="activity__observation__info">
                            <div>Study: <Link to={`/study/${obs.study}`}>{obs.study_title}</Link></div>
                            <div>{obs.description && `"${obs.description}"`}</div>
                            <div>Observation recorded at {obs.latitude}, {obs.longitude} on {formatDate(obs.date)}</div>
                        </div>
                    </div>)
                }
            </section>
        </article>
    )
}
export default ProfileActivity