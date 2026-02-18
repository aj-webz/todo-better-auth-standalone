"use client";

import {
  TodoSchema,
  type Todo,
  type CreateTodoFormInput,
  type TodoStatusEnum,
} from "@repo/shared";

const baseUrl = process.env.NODE_ENV === "production"
  ? "https://todo-better-auth-standalone-server.vercel.app/api/todos"
  : "http://localhost:3001/api/todos";


export async function readTodos(): Promise<Todo[]> {
  const res = await fetch(baseUrl);

  if (!res.ok) throw new Error("Failed to fetch");

  const json = await res.json();
  return json.map((t: unknown) => TodoSchema.parse(t));
}


export async function createTodo(
  input: CreateTodoFormInput
): Promise<Todo> {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Create failed: ${res.status}`);
  }

  return TodoSchema.parse(await res.json());
}


export async function updateTodoStatus(
  id: string,
  status: typeof TodoStatusEnum._type
): Promise<Todo> {
  const res = await fetch(`${baseUrl}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error(`Update failed: ${res.status}`);
  }

  return TodoSchema.parse(await res.json());
}


export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Delete failed: ${res.status}`);
  }
}
