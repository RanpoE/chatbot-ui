import React from 'react'

const FormField = ({ labelName, value, name, type, placeHolder, handleChange }) => {
    return (
        <React.Fragment>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">{labelName}</label>
            <input type={type} name={name} onChange={handleChange} value={value} id={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder={placeHolder} required="" />
        </React.Fragment>
    )
}

export default FormField