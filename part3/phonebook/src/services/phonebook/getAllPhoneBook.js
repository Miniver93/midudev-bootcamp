import axios from "axios";

export const getAllPhoneBook=async ()=>{
    const response = await axios.get("http://localhost:3001/api/persons");
    return response.data;
}