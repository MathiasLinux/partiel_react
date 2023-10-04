import React from 'react';
import {useParams} from "react-router-dom";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

import "../Style/editTask.css"
import jwt_decode from "jwt-decode";

const EditTask = () => {
    const {slug} = useParams();
    let decodedToken = jwt_decode(localStorage.getItem("token"));

    let todos = localStorage.getItem("todos");
    let JsonTodos = JSON.parse(todos)

    let task = JsonTodos.filter(todo => todo.id === parseInt(slug));

    function editTask(event) {
        event.preventDefault();

        let todo = document.querySelector("#todo").value;
        let completed = document.querySelector("#completed").checked;

        // Modification of the task
        task[0].todo = todo;
        task[0].completed = completed;

        // Modification of the localStorage with JsonTodos
        let index = JsonTodos.findIndex(todo => todo.id === parseInt(slug));
        JsonTodos[index] = task[0];
        localStorage.setItem("todos", JSON.stringify(JsonTodos));

        window.location.href = "/task";
    }

    function removeTask() {
        let index = JsonTodos.findIndex(todo => todo.id === parseInt(slug));
        JsonTodos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(JsonTodos));

        window.location.href = "/task";
    }

    function openCommentForm() {
        document.querySelector(".formAddComment").classList.toggle("formAddCommentOn");
    }

    function addComment(event) {
        event.preventDefault();

        let title = document.querySelector("#title").value;
        let email = document.querySelector("#email").value;
        let comment = document.querySelector("#comment").value;

        if (title.trim().length !== 0 && email.trim().length !== 0 && comment.trim().length !== 0) {
            let currentComments = JSON.parse(localStorage.getItem("comments"));

            if (currentComments !== null && currentComments !== undefined) {

                let newComment = {
                    id: currentComments.length + 1,
                    title: title,
                    email: email,
                    comment: comment,
                    todoId: parseInt(slug),
                    userId: decodedToken.id
                }
                currentComments.push(newComment);
                localStorage.setItem("comments", JSON.stringify(currentComments));
                window.location.reload();
            } else {
                let newComment = [{
                    id: 1,
                    title: title,
                    email: email,
                    comment: comment,
                    todoId: parseInt(slug),
                    userId: decodedToken.id
                }]
                localStorage.setItem("comments", JSON.stringify(newComment));
                window.location.reload();
            }
        }
    }

    function removeComment(id) {
        let currentComments = JSON.parse(localStorage.getItem("comments"));
        let index = currentComments.findIndex(comment => comment.id === id);
        currentComments.splice(index, 1);
        localStorage.setItem("comments", JSON.stringify(currentComments));
        window.location.reload();
    }

    return (
        <main>
            <Container>
                <Row>
                    <h2>{task[0].todo}</h2>
                    <Form onSubmit={editTask}>
                        <FormGroup>
                            <Label htmlFor="todo">Titre de la tache :</Label>
                            <Input type="text" name="todo" id="todo" defaultValue={task[0].todo}></Input>
                        </FormGroup>
                        <FormGroup className="checkboxEditTask">
                            <Label htmlFor="completed">Est-t-elle complété ?</Label>
                            <Input type="checkbox" name="completed" id="completed"
                                   defaultChecked={task[0].completed}></Input>
                        </FormGroup>
                        <FormGroup className="buttonsEditTask">
                            <Button color="success" name="Modifier" type="submit">Modifier</Button>
                            <Button color="danger" onClick={removeTask}>Supprimer</Button>
                        </FormGroup>
                    </Form>
                </Row>
                <Row>
                    <h3>Commentaires :</h3>
                    <Col>
                        <Button color="primary" onClick={openCommentForm}>Ajouter un commentaire</Button>
                    </Col>
                    <Form className="formAddComment" onSubmit={addComment}>
                        <FormGroup>
                            <Label htmlFor="title">Titre :</Label>
                            <Input type="text" name="title" id="title"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Adresse email :</Label>
                            <Input type="email" name="email" id="email" defaultValue={decodedToken.email}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="comment">Commentaire :</Label>
                            <Input type="textarea" name="comment" id="comment"></Input>
                        </FormGroup>
                        <Button color="success" type="submit">Envoyer</Button>
                    </Form>
                    <div className="commentDisplay">
                        {JSON.parse(localStorage.getItem("comments")).filter(comment => comment.todoId == slug).map(comment => (
                            <div className="commentMainDiv" key={comment.id}>
                                <div>
                                    <h4>{comment.title}</h4>
                                    <span>De : {comment.email}</span>
                                    <p>{comment.comment}</p>
                                </div>
                                <div>
                                    {/* Only display this button if it is the users comment */}
                                    {comment.userId === decodedToken.id ? (
                                        <Button color="danger"
                                                onClick={() => removeComment(comment.id)}>Supprimer</Button>
                                    ) : (
                                        <></>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                </Row>
            </Container>
        </main>
    );
};

export default EditTask;