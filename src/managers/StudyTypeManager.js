export const getAllStudyTypes = () => {
    return fetch(`http://localhost:8000/study_types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  }).then((res) => res.json());
}