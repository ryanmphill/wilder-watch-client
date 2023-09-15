export const getAllStudyTypes = async () => {
    const res = await fetch(`http://localhost:8000/study_types`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return await res.json();
}