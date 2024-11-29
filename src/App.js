import React from 'react';
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./components/common/ErrorPage/ErrorPage";
import Login from "./components/MainPage/Login";
import MainPage from "./components/MainPage/MainPage";
import User from "./components/Users/User";
import Users from "./components/Users/Users";



function App() {

    return (
        <Routes>
  <Route path="/" element = {<MainPage />}  />

  <Route path="/user/:id" element = {<User />} />

<Route path="/:id/subscriptions" element = {<Users usersType = 'subscriptions' />} />

<Route path="/:id/subscribers" element = {<Users  usersType = 'subscribers' />} /> 

<Route path="/:id/allUsers" element = {<Users  usersType = 'allUsers' />} /> 

 <Route path="/registration" element = {<Login formType = 'registrationForm' />} />

 <Route path="/authentication" element = {<Login formType = 'authenticationForm' />} />

 <Route path="/error" element = {<ErrorPage />} />

</Routes>
    );

}
export default App;