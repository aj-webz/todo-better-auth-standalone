import { z } from "zod";


const TodoStatusEnum = z.enum([
  "todo",
  "in-progress",
  "backlog",
  "completed",
  "cancelled",
]);


const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: TodoStatusEnum,
  completed: z.boolean(),
  createdAt: z.coerce.date(),
  endAt: z.coerce.date().nullable(),
});


const CreateTodoFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.date(),
  dueTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Time must be HH:mm:ss"),
});


const CreateTodoSchema = CreateTodoFormSchema.transform((data) => {
  const parts = data.dueTime.split(":");
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  const s = Number(parts[2]);

  const end = new Date(data.dueDate!);
  end.setHours(h, m, s, 0);
  return {
    title: data.title,
    description: data.description,
    status: "todo" as const,
    completed: false,
    createdAt: new Date(),
    endAt: end,
  };
});

// User schema:
const RegisterSchema = z.object(
  {
    email: z.string().email(),
    password: z.string().min(8),
    role :z.enum(["user","admin"]),
  }
)

const LoginSchema = RegisterSchema;

const UserResponseSchema = z.object(
  {
    success:z.boolean(),
    user: z.object({
      id:z.string().uuid(),
      email:z.string().email(),
      password:z.string(),
      role:z.enum(["user","admin"]),
      createdAt:z.string().datetime(),
    })
  }
)


const ErrorSchema = z.object({
  error: z.string(),
});

const MessageSchema = z.object({
  message: z.string(),
});



const sessionResponseSchema = z.object({
  authenticated: z.boolean(),
  user: z.object({
    sub: z.string(),
    email: z.string(),
    role: z.enum(["user", "admin"]),
    exp: z.number(),
  }),
});


export {
  TodoStatusEnum,
  TodoSchema,
  CreateTodoFormSchema,
  CreateTodoSchema,
  RegisterSchema,
  LoginSchema,
  UserResponseSchema,
  sessionResponseSchema,ErrorSchema,MessageSchema,
};




export type TodoStatus = z.infer<typeof TodoStatusEnum>;
export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodoFormInput = z.infer<typeof CreateTodoFormSchema>;
export type CreateTodoInput = z.infer<typeof CreateTodoSchema>;
