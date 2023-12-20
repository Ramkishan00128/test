import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { showNotification } from '../common/headerSlice'
import InputText from '../../components/Input/InputText'
import TextAreaInput from '../../components/Input/TextAreaInput'
import ToogleInput from '../../components/Input/ToogleInput'
import { CreateEventAction } from "../common/action/EventAction"
import { DatePicker1Presentation } from "../../components/Date&TimePicker/Date_Time_Picker"



function CreateEvent(){
 const dispatch = useDispatch()
 const [coordinates, setCoordinates] = useState(null);
 const [getData, setGetData] = useState({
  thumbnail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4NFVBn18pC0iWupbsCUZGkkjh9NHPC3zPhxFtE57OwwHftrDT4y4w2Ao&s",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqtorS3qTjidfIy6DvBG9WS8Nj7xK76AZM_-z1SLj2A&s",
  event_location_map_link:"https://www.google.com/maps/place//data=!4m2!3m1!1s0x390ce5789277f755:0x11e3c48dbdc99126?sa=X&ved=2ahUKEwjkr6f-k7GCAxU9lGoFHZuUDzIQ9eIBegQIARAA",
  lat:10,
  long:10
 });
 
 const url="http://livewiredapi.ibyteworkshop.com/admin/event"
 const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGNjZDAyYmEzMTQzMzdkNjQ1ZGVkNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI5ODc5NTh9.mgiZNFs8vGpmLqMiEgPk3A4c_rCMIzOFpy9SyE1CXwk"
  
  const handleSearch = async () => {
    const { city, address1, address2 } = getData;
    const mergedString = `${city}, ${address1},${address2==undefined?"":address2}`;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          mergedString
        )}&key=AIzaSyCJPwXRGyzpraP0cjAKCBqiDRZvsW-E9Io`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const { results } = data;
  
      if (results && results.length > 0) {
        const { location } = results[0].geometry;
        setCoordinates({
          latitude: location.lat,
          longitude: location.lng,
        });      
        setGetData((prevAddress) => ({
      ...prevAddress,
          lati: location.lat,
          longi:location.lng,
      }));
      } else {
        console.error("No results found");
      }
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({message : "Event Created", status : 1}))    
    }

    const submitEvent=async()=>{
  
      let Response= await CreateEventAction(getData)
      if(Response.success){
        dispatch(showNotification({message : "Event Created", status : 1}))  
      }
    }

     const updateFormValue = ({ updateType, value }) => {
      setGetData((prevAddress) => ({
      ...prevAddress,
      [updateType]: value,
      }));
    };


  
  
    return(
        <>
            
            <TitleCard title="Create Event" topMargin="mt-2">
                 
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    <InputText lable="city" labelTitle="City" defaultValue="" updateFormValue={updateFormValue}/>
                    <InputText lable="address1" labelTitle="Address1" defaultValue="" updateFormValue={updateFormValue}/>
                    <InputText lable="address2" labelTitle="Address2" defaultValue="" updateFormValue={updateFormValue}/>
                    <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => handleSearch()}>Get Coordinate</button></div>
            
                </div>   
                    <div className="divider" ></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
                    <InputText lable="lat" labelTitle="Latitude" defaultValue="" updateFormValue={updateFormValue} Latitude={coordinates?.latitude}/>
                    <InputText lable="long" labelTitle="Longitude" defaultValue="" updateFormValue={updateFormValue} Longitude={coordinates?.longitude} />   
                    <InputText lable="title" labelTitle="Title" defaultValue="" updateFormValue={updateFormValue}/>
                    {/*<InputText lable="timing" labelTitle="Timing" defaultValue="" updateFormValue={updateFormValue}/>*/ }
                       
                    <InputText lable="event_location_map_link"  labelTitle="Event Location Map Link" defaultValue="https://www.google.com/maps/place//data=!4m2!3m1!1s0x390ce5789277f755:0x11e3c48dbdc99126?sa=X&ved=2ahUKEwjkr6f-k7GCAxU9lGoFHZuUDzIQ9eIBegQIARAA" updateFormValue={updateFormValue}/>
                    <InputText lable="thumbnail" labelTitle="Thumbnail" defaultValue="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4NFVBn18pC0iWupbsCUZGkkjh9NHPC3zPhxFtE57OwwHftrDT4y4w2Ao&s" updateFormValue={updateFormValue}/>
                    <InputText lable="image"  labelTitle="Image" defaultValue="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsqtorS3qTjidfIy6DvBG9WS8Nj7xK76AZM_-z1SLj2A&s" updateFormValue={updateFormValue}/>                   
                    <InputText lable="from_date" labelTitle=" Date" defaultValue="" updateFormValue={updateFormValue}/>
                    <InputText lable="from_time"  labelTitle="From Time" defaultValue="" updateFormValue={updateFormValue}/>
                    <InputText lable="to_time"  labelTitle="To time" defaultValue="" updateFormValue={updateFormValue}/>
                    <TextAreaInput lable="desciption" labelTitle="Description" defaultValue="" updateFormValue={updateFormValue}/>
                    <DatePicker1Presentation Property="date"/> 
                    <DatePicker1Presentation Property="date_time"/>         
                </div>
                

                {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue}/>
                    <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/>
    </div>*/}

                <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => submitEvent()}>Create Event</button></div>
            </TitleCard>
        </>
    )
}


export default CreateEvent