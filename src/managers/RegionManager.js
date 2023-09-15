export const getAllRegions = async () => {
    const res = await fetch(`http://localhost:8000/regions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return await res.json();
}