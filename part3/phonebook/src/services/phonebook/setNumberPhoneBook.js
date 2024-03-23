import axios from "axios";

export const setNumberPhoneBook=(personObject ={})=>{
    return axios.post("https://phonebook-deploy-9anb.onrender.com/api/persons",personObject)
}