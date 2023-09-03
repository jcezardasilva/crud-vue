const apiUrl = "http://localhost:8081";
const endpoint = "/api/pages";

export async function getAll(){
    const response = await fetch(`${apiUrl}${endpoint}`);
    return await response.json();
}

export default {
    getAll
}