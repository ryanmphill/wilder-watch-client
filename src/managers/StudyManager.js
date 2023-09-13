export const getAllStudies = () => {
    return fetch(`http://localhost:8000/studies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  }).then((res) => res.json());
}

export const getSingleStudy = (id) => {
    return fetch(`http://localhost:8000/studies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  }).then((res) => res.json());
}

export const createNewStudy = (newStudy) => {
  return fetch(`http://localhost:8000/studies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(newStudy)
  }).then((res) => res.json());
}

export const editStudy = (updatedStudy, pk) => {
  return fetch(`http://localhost:8000/studies/${pk}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(updatedStudy)
  }).then((res) => {
    if (res.status != 204) {
      return res.json()
    }
  });
}