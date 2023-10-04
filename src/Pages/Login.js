import React from 'react';
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";

import '../Style/login.css'

const Login = () => {

    function loginValidation(event) {
        event.preventDefault();

        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;

        if (username.trim().length !== 0 && password.trim().length !== 0) {
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({

                    username: username,
                    password: password,
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.token !== undefined) {
                        localStorage.setItem("token", data.token);
                        window.location.href = "/task";
                    } else {
                        document.querySelector("#username").classList.add("is-invalid");
                        document.querySelector("#password").classList.add("is-invalid");

                        let errorDiv = document.querySelector(".errorDisplayLogin")
                        errorDiv.innerText = "Nom d'utilisateur ou mot de passe faux";
                        errorDiv.classList.add("errorDisplayLoginOn");
                    }
                })
        } else {
            document.querySelector("#username").classList.add("is-invalid");
            document.querySelector("#password").classList.add("is-invalid");

            let errorDiv = document.querySelector(".errorDisplayLogin")
            errorDiv.innerText = "Veuillez remplir tous les champs";
            errorDiv.classList.add("errorDisplayLoginOn");
        }
    }

    return (
        <main className="formLogin">
            <div>
                <h2>Veuillez vous connecter</h2>
                <Form onSubmit={loginValidation}>
                    <Alert color="danger" className="errorDisplayLogin"></Alert>
                    <FormGroup>
                        <Label htmlFor="username">Nom d'utilisateur :</Label>
                        <Input type="text" name="username" id="username" required></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Mot de passe :</Label>
                        <Input type="password" name="password" id="password" required></Input>
                    </FormGroup>
                    <Button color="primary" type="submit">Se connecter</Button>
                </Form>
            </div>
        </main>
    );
};

export default Login;