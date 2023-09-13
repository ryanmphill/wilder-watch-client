export const addObservation = (observation, pk) => {
    return fetch(`http://localhost:8000/studies/${pk}/add_observation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(observation)
    }).then((res) => res.json());
}