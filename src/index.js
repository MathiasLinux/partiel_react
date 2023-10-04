import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ViewsTasks from "./Pages/ViewsTasks";
import NavigationBar from "./Components/NavigationBar";

import 'bootstrap/dist/css/bootstrap.css';
import './Style/main.css'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import EditTask from "./Pages/EditTask";
import NotFound from "./Pages/NotFound";
import Contact from "./Pages/Contact";
import Logout from "./Pages/Logout";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <React.StrictMode>
        <Router>
            <NavigationBar/>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                {/*To go to this route verify that the user is connected with the jwt token stored in the localStorage as "token"*/}
                <Route path="/task"
                       element={localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null ?
                           <ViewsTasks/> : <Login/>}></Route>
                <Route path="/task/:slug"
                       element={localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null ?
                           <EditTask/> : <Login/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/logout" element={<Logout/>}></Route>
                <Route path="/contact" element={<Contact/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
