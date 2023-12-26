import React, { useEffect, useRef, useState } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const MapSearch = ({ updateFormValue, myfun }) => {
  const inputRef = useRef();
  const [addressFields, setAddressFields] = useState(null);
  const [guestCoordinates, setGuestCoordinates] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handlePlaceChanged = () => {
    const places = inputRef.current.getPlaces();
    const place = places[0];

    if (place) {
      let data = {
        delivery_address: place.formatted_address,
        address_type: "HOME",
        city: "",
        country: "",
        district: "",
        full_address: place.formatted_address,
        landmark: "",
        zip_code: "",
      };

      place?.address_components?.forEach((i) => {
        if (i.types[0] === "locality") {
          data.city = i?.long_name || "";
        }

        if (i.types[0] === "administrative_area_level_3") {
          data.district = i?.long_name || "";
        }
        if (i.types[0] === "country") {
          data.country = i?.long_name || "";
        }
        if (i.types[0] === "postal_code") {
          data.zip_code = i?.long_name || "";
        }
      });

      const guestAddress = place.formatted_address;
      setGuestCoordinates({
        lattitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
      setAddressFields({ ...data });

      // Update the inputValue with the selected place's name
      setInputValue(place.formatted_address || "");

      //   updateFormValue("address1", place.formatted_address);
      myfun("address1", place.formatted_address);

      // Log the selected value with full address and zip code to the console
      console.log("Selected Place:", {
        name: place.name,
        fullAddress: place.formatted_address,
        zipCode: data.zip_code,
      });
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Log the value to the console
    console.log("Input Value:", value, guestCoordinates);
  };

  const inputStyle = {
    width: "100%",
    borderRadius: "10px",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    // Add any additional styles you need
  };

  return (
    <LoadScript
      googleMapsApiKey='AIzaSyAdwF9cF9d7B6MIov5rw4JVUfXEST2TS9w'
      libraries={["places"]}
      region='GB'
    >
      <div className='addressSearch'>
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            type='text'
            name='address1'
            placeholder='Enter the address'
            value={inputValue}
            onChange={handleChange}
            style={inputStyle}
          />
        </StandaloneSearchBox>
      </div>
    </LoadScript>
  );
};

export default MapSearch;
