import React from 'react';
import "../Style/home.css"
import {Button} from "reactstrap";

const Home = () => {
    return (
        <main className="homeMain">
            <div className="homeMiddle">
                <h2 className="homeTitle">Bienvenue sur la Todo list du future</h2>
                <div className="homeButtons">
                    <Button href="/task" color="primary">Todo</Button>
                    <Button href="/contact" color="warning">Contact</Button>
                    <Button href="/login" color="secondary">Login</Button>
                </div>
            </div>
        </main>
    );
};

export default Home;