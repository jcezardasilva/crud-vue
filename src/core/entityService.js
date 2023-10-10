const apiUrl = "https://localhost:3000";
const endpoint = "/api/Config?api-version=1.0";

export async function getAll(){
    const response = await fetch(`${apiUrl}${endpoint}`);
    return await response.json();
}

export default {
    getAll
}