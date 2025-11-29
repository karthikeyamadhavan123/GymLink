import { LabelProps } from "@/types"
import React from "react"

const Label: React.FC<LabelProps> = ({ htmlFor, labelText }) => {
    return (
        <div>
            <label htmlFor={htmlFor} className="block text-gray-300 mb-1">
                {labelText}
            </label>
        </div>
    )
}

export default Label
