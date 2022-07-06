const apiUrl = "http://localhost:8080";
const endpoint = "/api/people";

export async function getAll(){
    const response = await fetch(`${apiUrl}${endpoint}`);
    return await response.json();
}

export default {
    getAll
}