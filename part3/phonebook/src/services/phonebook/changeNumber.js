import axios from "axios";

export const changeNumber=(id,personObject)=>{
   return axios.put(`https://phonebook-deploy-9anb.onrender.com/api/persons/${id}`,personObject)
}