export const addObservation = async (observation, pk) => {
    const res = await fetch(`http://localhost:8000/studies/${pk}/add_observation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(observation)
    });
    return await res.json();
}