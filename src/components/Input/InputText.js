import { useState } from "react"
import moment from "moment"


function InputText({labelTitle, labelStyle, type,Type, containerStyle, defaultValue, placeholder, updateFormValue,lable,Latitude,Longitude}){

    const [value, setValue] = useState(defaultValue)
    const [name,setName] = useState()
    const updateInputValue = (e) => {
        let dataObject=moment(e.target.value)
   
        setValue(e.target.value)
        updateFormValue({updateType:e.target.name, value : lable=="from_date"?dataObject.format("DD-MM-YYYY"):e.target.value })
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input  defaultValue={defaultValue} name={lable} type={lable=="from_time"&&"time"||lable=="to_time"&&"time"||lable=="from_date"&&"date"} value={Latitude?Latitude:value||Longitude?Longitude:value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e)} className="input  input-bordered w-full " />
        </div>
    )
}

// readOnly={Latitude&&true||Longitude&&true}
export default InputText