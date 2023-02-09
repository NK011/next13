import React from "react";
import { Todo } from "../../../typings";
import { notFound } from "next/navigation";

export const dynamicParams = true;

type PageProps = {
    params: {
        todoId: string;
    };
};

const fetchTodo = async (todoId: string) => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        { next: { revalidate: 60 } }
    );
    const data: Todo = await res.json();
    return data;
};
async function TodoPage({ params: { todoId } }: PageProps) {
    const todo = await fetchTodo(todoId);

    if (!todo.id) return notFound();

    return (
        <div className="p-5 bg-yellow-400 h-48 flex flex-col justify-center items-center">
            <p className="border-b-2 border-red-800">
                {todo.id} {todo.title}
            </p>
            <p>By user: {todo.id}</p>
        </div>
    );
}

export default TodoPage;

export async function generateStaticParams() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const todos: Todo[] = await res.json();

    const todoList = todos.splice(0, 10);
    return todoList.map((todo) => ({
        todoId: todo.id.toString(),
    }));
}
