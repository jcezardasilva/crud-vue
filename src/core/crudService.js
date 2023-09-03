const apiUrl = "http://localhost:8081";
const endpoint = "/api";

/**
 * Returns all the entities of the given type.
 * @param {*} entity 
 * @returns 
 */
export async function getAll(entity){
    const entityValue = entity.startsWith("/")? entity: `/${entity}`;
    const response = await fetch(`${apiUrl}${endpoint}${entityValue}`);
    return await response.json();
}
/**
 * Saves an entity to the backend.
 * @param {string} entity the entity name to save
 * @param {object} data the entity data
 * @param {string|null} data.id if exists the entity will be updated, otherwise created
 * @returns 
 */
export async function saveEntity(entity,data){
    const entityValue = entity.startsWith("/")? entity: `/${entity}`;
    const id = data.id ? `/${data.id}` : null;
    const response = await fetch(`${apiUrl}${endpoint}${entityValue}${id}`,{
        method: id? 'PUT': 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}
/**
 * Saves an entity to the backend.
 * @param {string} entity the entity name to save
 * @param {object} id the entity id to delete
 * @returns 
 */
export async function deleteEntity(entity,id){
    const entityValue = entity.startsWith("/")? entity: `/${entity}`;
    const idValue = id.startsWith('/') ? id: `/${id}`;
    const response = await fetch(`${apiUrl}${endpoint}${entityValue}${idValue}`,{
        method: 'DELETE'
    });
    return await response.json();
}
/**
 * A CRUD service that uses the backend API.
 */
export default {
    getAll,
    saveEntity,
    deleteEntity
}