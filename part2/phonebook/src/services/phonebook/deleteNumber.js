import axios from "axios";

export const deleteNumber=(id)=>{
    return axios.delete(`http://localhost:3001/persons/${id}`); 
}