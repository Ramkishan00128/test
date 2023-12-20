import { useState } from "react"


function InputText({labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue,lable,Latitude,Longitude}){

    const [value, setValue] = useState(defaultValue)
    const [name,setName] = useState()
    const updateInputValue = (e) => {
   
        setValue(e.target.value)
      
        updateFormValue({updateType:e.target.name, value : e.target.value})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input readOnly={Latitude&&true||Longitude&&true} defaultValue={defaultValue} name={lable} type={type || "text"} value={Latitude?Latitude:value||Longitude?Longitude:value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e)} className="input  input-bordered w-full " />
        </div>
    )
}


export default InputText