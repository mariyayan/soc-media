import React from 'react';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Form from "../common/Forms/Form";
import { formsData } from '../../utils/forms-info';
import { sendPostReq } from "../../utils/common-functions";
import { logIn } from '../../redux/slices/userDataSlice';
import { useServerResponse } from '../../utils/hooks';



function Login({ formType }) {

    const form = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const processServerResponse = useServerResponse();

    function handler(response) {
        dispatch(logIn(response));
        navigate('/');
    }

    async function onSubmit(data, errors) {
       const response = await sendPostReq(formsData[formType].path, form.current);
       processServerResponse(response, handler);
    }

    return (
        <Form ref = {form} formData = {formsData[formType]} onSubmit = {onSubmit} />
    );
}
export default Login;