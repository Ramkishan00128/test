import axios from "axios";
import { setCreateEventResponse } from "../handleEventSlice";
import { useDispatch } from "react-redux";


export const CreateEventAction = async(data) => {
  console.log(data,"checkdATA")
    // const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNjZDAyYmEzMTQzMzdkNjQ1ZGVkNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI5ODc5NTh9.mgiZNFs8vGpmLqMiEgPk3A4c_rCMIzOFpy9SyE1CXwk"
    try {
        const response = await axios.post('/event',JSON.stringify(data),{
            headers:{
                // 'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

      const res = response.data
      console.log(res,"actiondata")
      return response.data
 
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

