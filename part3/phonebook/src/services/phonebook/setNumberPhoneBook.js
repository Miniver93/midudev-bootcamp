import axios from "axios";

export const setNumberPhoneBook=(personObject ={})=>{
    return axios.post("http://localhost:3001/api/persons",personObject)
}