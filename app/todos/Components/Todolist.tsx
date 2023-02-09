import Link from "next/link";
import React from "react";
import { Todo } from "../../../typings";

const fetchTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const data: Todo[] = await res.json();
    // console.log(data);
    return data;
};

async function Todolist() {
    const todos = await fetchTodos();
    return (
        <div>
            {todos?.map((todo) => (
                <p key={todo.id}>
                    <a href={`/todos/${todo.id}`}>Todo : {todo.id}</a>
                </p>
            ))}
        </div>
    );
}

export default Todolist;
