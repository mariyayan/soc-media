import React from 'react';
import { forwardRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import "./form.css";



const Form = forwardRef(({ formData, onSubmit } , ref) => { 

    const { inputs, formName, path, formtype } = formData;
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors } } = useForm();
    let inputElements = inputs.map(inputInfo => (<div key = {inputInfo.name} className ='input-wrapper'><input type = {inputInfo.type} className = 'form-input border' placeholder = {inputInfo.placeholder} {...register(inputInfo.name, inputInfo.validation)} /> {errors[inputInfo.name] && <p className = 'field-error'>{errors[inputInfo.name].message}</p>}</div>));

    useEffect(() => {
        reset();
    }, [isSubmitSuccessful]);

    return (
        <form ref = {ref} className = 'form border' onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
            <fieldset className = 'form-fieldset'>
                {formName ? (<legend className = 'form-header'>{formName}</legend>) : ''}
                {inputElements}
                <button className = 'btn form-btn transition-style border' type="submit">Send</button>
            </fieldset>
        </form>
    );
});

export default Form;