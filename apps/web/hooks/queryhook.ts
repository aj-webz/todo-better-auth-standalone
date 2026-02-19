"use client";
import z from "zod"
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  type Todo,
  type CreateTodoFormInput,
  TodoStatusEnum,
} from "@repo/shared";

import {
  readTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
} from "../lib/todo.services";

import { queryKey } from "./queryKey";


export function useTodoQuery() {
  return useQuery<Todo[]>({
    queryKey: queryKey.all,
    queryFn: readTodos,
    staleTime: 1000 * 60,
  });
}


export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTodoFormInput) =>
      createTodo(input),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.all,
      });
    },
  });
}


export function useUpdateTodoStatus() {
  const queryClient = useQueryClient();
type TodoStatus = z.infer<typeof TodoStatusEnum>;
  
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: TodoStatus;
    }) => updateTodoStatus(id, status),

    
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: queryKey.all });

      const previousTodos = queryClient.getQueryData<Todo[]>(queryKey.all);

      if (previousTodos) {
        queryClient.setQueryData<Todo[]>(queryKey.all, (old) =>
          old?.map((todo) => (todo.id === id ? { ...todo, status } : todo))
        );
      }

      return { previousTodos };
    },

    
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(queryKey.all, context.previousTodos);
      }
    },

    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.all });
    },
  });
}


export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.all,
      });
    },
  });
}
