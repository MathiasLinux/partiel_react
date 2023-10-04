import React from 'react';
import {Card, CardBody, CardHeader, CardText, CardTitle} from "reactstrap";

import "../Style/cardTask.css"

const CardTask = (todo) => {
    function goToTask() {
        window.location.href = "/task/" + todo.todo.id;
    }

    return (
        <Card key={todo.todo.id}
              onClick={goToTask}
              className="my-2 taskCardMain"
              color="primary"
              inverse
              style={{
                  width: '18rem'
              }}
        >
            <CardHeader>
                <CardTitle tag="h5">
                    {todo.todo.todo}
                </CardTitle>
            </CardHeader>
            <CardBody>
                <CardText>
                    {todo.todo.completed ? (
                        <>
                            ✅ La tache à été complétée !
                        </>
                    ) : (
                        <>
                            ❌ La tache n'a pas encore été complété.
                        </>
                    )}
                </CardText>
            </CardBody>
        </Card>
    );
};

export default CardTask;