import { useState } from "react"


function TextAreaInput({labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType,lable}){

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (e) => {
        setValue(e.target.value);
        updateFormValue({updateType:e.target.name, value : e.target.value})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <textarea value={value} name={lable} className="textarea textarea-bordered w-full" placeholder={placeholder || ""} onChange={(e) => updateInputValue(e)}></textarea>
        </div>
    )
}


export default TextAreaInput