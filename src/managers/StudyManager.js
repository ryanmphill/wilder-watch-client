export const getAllStudies = () => {
    return fetch(`http://localhost:8000/studies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  }).then((res) => res.json());
}