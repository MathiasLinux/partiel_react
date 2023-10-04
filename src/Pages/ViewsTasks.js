import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row, Spinner} from "reactstrap";
import axios from "axios";
import CardTask from "../Components/CardTask";
import "../Style/viewsTasks.css"
import jwt_decode from "jwt-decode";

const ViewsTasks = () => {
    // useState to contain the bool of loading
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("todos") !== undefined && localStorage.getItem("todos") !== null) {
            setIsLoading(false);
        } else {
            // Usage of an API to get all the posts with on each a title, a body and an id
            axios.get('https://dummyjson.com/todos')
                .then(res => {
                    localStorage.setItem("todos", JSON.stringify(res.data.todos))
                    setIsLoading(false)
                })
        }
    }, []);

    function addNewTaskButton() {
        document.querySelector(".formNewTask").classList.toggle("formNewTaskOn");
    }

    function addNewTaskForm(event) {
        event.preventDefault();

        let todo = document.querySelector("#todo").value;
        let completed = document.querySelector("#completed").checked;

        if (todo.trim().length !== 0) {
            let currentTodos = JSON.parse(localStorage.getItem("todos"));
            let token = localStorage.getItem("token");
            let userId = jwt_decode(token).id;

            let newTodo = {
                id: currentTodos.length + 1,
                completed: completed,
                todo: todo,
                userId: userId
            }
            currentTodos.push(newTodo);
            localStorage.setItem("todos", JSON.stringify(currentTodos));
            window.location.reload();
        }
    }

    return (
        <main>
            {isLoading ? (
                <>
                    <Spinner
                        color="secondary"
                        type="grow"
                    />
                </>
            ) : (
                <>
                    <Container>
                        <Row xs="auto">
                            <Col>
                                <Button color="secondary" onClick={addNewTaskButton}>Créer une tache</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form className="formNewTask" onSubmit={addNewTaskForm}>
                                    <FormGroup>
                                        <Label htmlFor="todo">Titre</Label>
                                        <Input type="text" name="todo" id="todo"></Input>
                                    </FormGroup>
                                    <FormGroup className="completedFormGroup">
                                        <Input type="checkbox" name="completed" id="completed"></Input>
                                        <Label htmlFor="completed">Est-t-elle complété</Label>
                                    </FormGroup>
                                    <Button color="success">Créer</Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row xs="auto">
                            {JSON.parse(localStorage.getItem("todos")).map((todo) => (
                                <Col key={todo.id}>
                                    <CardTask todo={todo}/>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </>
            )}
        </main>
    );
};

export default ViewsTasks;