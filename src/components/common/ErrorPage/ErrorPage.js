import React from 'react';
import { NavLink } from "react-router-dom";
import "./error-page.css";


function ErrorPage() {

    return (
	    <section className ='bg-style error-wrapper'>
	        <h1 className = 'error-header'>Произошла ошибка</h1>
	        <div><NavLink to={"/"} className ='link'> Вернуться на главную </NavLink></div>
	    </section>
	    );
}
export default ErrorPage;