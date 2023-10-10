const apiUrl = "https://localhost:3000";
const endpoint = "/api";

/**
 * Returns all the entities of the given type.
 * @param {*} entity 
 * @returns 
 */
export async function getAll(entity){
    const entityValue = entity.startsWith("/")? entity: `/${entity}`;
    const response = await fetch(`${apiUrl}${endpoint}${entityValue}?api-version=1.0`);
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
    const id = data.id ? `/${data.id}` : "";
    const response = await fetch(`${apiUrl}${endpoint}${entityValue}${id}?api-version=1.0`,{
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
    const response = await fetch(`${apiUrl}${endpoint}${entityValue}${idValue}?api-version=1.0`,{
        method: 'DELETE'
    });
    return await response.json();
}

export function getKey(fields,values){
    if(!values){
        return {};
    }
    for(const field of fields){
        const value = values[field.name];
        
        if(field.isKey || field.name == "id"){
            return {
                field: field.name,
                value: value
            }
        }
    }
}

/**
 * Map values for each column
 * @param {*} fields 
 * @param {*} values 
 * @returns 
 */
export function mapValues(fields,values, index, showActions=true){
    if(values==null) return;
    let result = [];
    let key = {
        field: null,
        value: null
    }
    for(const field of fields){
        const value = values[field.name];
        
        if(field.isKey || field.name == "id"){
            key.field = field.name;
            key.value = value || index;
        }

        if(field.name == "crud-actions" && showActions){
            result.push({
                id: key.field ? key : index.toString(),
                key: field.name,
                label: 'Actions',
                value: 'actions',
                isMultiline: false
            });
        }
        else{
            result.push({
                id: key.field ? key : index.toString(),
                key: field.name,
                label: field.label,
                value: value || "",
                isMultiline: (field.dataType || "string").indexOf("[]")>-1,
            })
        }
    }
    return result;
}
/**
 * A CRUD service that uses the backend API.
 */
export default {
    getAll,
    saveEntity,
    deleteEntity
}