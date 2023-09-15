export const getAllStudies = async () => {
    const res = await fetch(`http://localhost:8000/studies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return await res.json();
}

export const getSingleStudy = async (id) => {
    const res = await fetch(`http://localhost:8000/studies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return await res.json();
}

export const createNewStudy = async (newStudy) => {
  const res = await fetch(`http://localhost:8000/studies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(newStudy)
  });
  return await res.json();
}

export const editStudy = async (updatedStudy, pk) => {
  const res = await fetch(`http://localhost:8000/studies/${pk}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(updatedStudy)
  });
  if (res.status != 204) {
    return await res.json();
  }
}

export const deleteStudy = async (pk) => {
  const res = await fetch(`http://localhost:8000/studies/${pk}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
    },
  });
  if (res.status != 204) {
    return await res.json();
  }
}