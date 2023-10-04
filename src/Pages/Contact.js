import React from 'react';
import {Button, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import * as emailjs from "emailjs-com";

import "../Style/contact.css"

const Contact = () => {
    function sendMailForm(event) {
        event.preventDefault();

        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let subject = document.querySelector("#message").value;


        if (name.trim().length !== 0 && email.trim().length !== 0 && subject.trim().length !== 0) {

            let templateParams = {
                to_name: "Ginny Le Chien",
                from_name: name,
                message: subject,
                reply_to: email,
                from_country: "France"
            }

            emailjs.send('service_597bvnr', 'template_f74wz5n', templateParams, "czlJ60J5u6NWe8x9U")
                .then(function (response) {
                    document.querySelector(".sendStatus").innerText = "L'email à été correctement envoyé";
                }, function (error) {
                    document.querySelector(".sendStatus").innerText = "Il y a eu une erreur à l'expédition du mail"
                });
        }
    }

    return (
        <main>
            <Container>
                <Row>
                    <h2>Formulaire de contact</h2>
                    <Form onSubmit={sendMailForm}>
                        <FormGroup>
                            <Label htmlFor="name">Votre nom et prénom :</Label>
                            <Input type="text" name="name" id="name"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Votre email :</Label>
                            <Input type="email" name="email" id="email"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="message">Votre message :</Label>
                            <Input type="textarea" name="message" id="message"></Input>
                        </FormGroup>
                        <Button color="primary" type="submit">Envoyer</Button>
                        <div className="sendStatus"></div>
                    </Form>
                </Row>
            </Container>
        </main>
    );
};

export default Contact;