export const getAllRegions = () => {
    return fetch(`http://localhost:8000/regions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  }).then((res) => res.json());
}