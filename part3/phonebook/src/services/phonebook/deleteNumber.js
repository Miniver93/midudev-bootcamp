import axios from "axios";

export const deleteNumber=(id)=>{
    return axios.delete(`https://phonebook-deploy-9anb.onrender.com/api/persons/${id}`); 
}