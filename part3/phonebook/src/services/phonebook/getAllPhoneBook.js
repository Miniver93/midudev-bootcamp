import axios from "axios";

export const getAllPhoneBook=async ()=>{
    const response = await axios.get("https://phonebook-deploy-9anb.onrender.com/api/persons");
    return response.data;
}