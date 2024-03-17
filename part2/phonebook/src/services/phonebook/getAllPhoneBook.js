import axios from "axios";

export const getAllPhoneBook=async ()=>{
    const response = await axios.get("http://localhost:3001/persons");
    return response.data;
}