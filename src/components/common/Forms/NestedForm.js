import React from 'react';
import { useRef } from 'react';
import Form from './Form';
import { formsData } from '../../../utils/forms-info';
import { sendPostReq } from '../../../utils/common-functions';
import { useServerResponse } from "../../../utils/hooks";
import './nestedForm.css';


function NestedForm({ formType, handler }) {

    const form = useRef();
    const processServerResponse = useServerResponse();

    function showForm() {
        form.current.classList.contains('show') ? form.current.classList.remove('show') : form.current.classList.add('show');
    }

    async function onSubmit(data, errors) {
        const response = await sendPostReq(formsData[formType].path, form.current);
        processServerResponse(response, handler);
        showForm();
    }

    return (
        <div className = 'nested-form-wrapper'> 
            <p className = 'nested-form-title transition-style' onClick = { showForm }>change</p>     
            <Form ref = {form} formData = {formsData[formType]} onSubmit = {onSubmit}  />  
        </div>
    );
}

export default NestedForm;