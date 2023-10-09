import { apiUrl } from "../utils/config/apiConfig";

export const getAllStudies = async () => {
    const res = await fetch(`${apiUrl}/studies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return await res.json();
}

export const getSingleStudy = async (id) => {
    const res = await fetch(`${apiUrl}/studies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return await res.json();
}

export const studyLoader = async ({ params }) => {
  // The errorElement automatically catches any exceptions
  const res = await fetch(`${apiUrl}/studies/${params.studyId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  if (!res.ok) {
    throw new Response("Not Found", { status: res.status });
  }
  const data = await res.json()
  return data
}

export const createNewStudy = async (newStudy) => {
  const res = await fetch(`${apiUrl}/studies`, {
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
  const res = await fetch(`${apiUrl}/studies/${pk}`, {
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
  const res = await fetch(`${apiUrl}/studies/${pk}`, {
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