import axios from "axios";

export const changeNumber=(id,personObject)=>{
   return axios.put(`http://localhost:3001/persons/${id}`,personObject)
}