import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { sign, verify } from "hono/jwt";
import { logger } from "hono/logger";
import { nanoid } from "nanoid";
//import bcrypt from "bcryptjs";
import { getDb, todos } from "@repo/db"
import type { Context, Next } from "hono"
import * as z from "zod";
import {
  CreateTodoSchema,
  CreateTodoFormSchema,
  TodoSchema,
  TodoStatusEnum,
  LoginSchema,
  RegisterSchema,
  UserResponseSchema,
  sessionResponseSchema,ErrorSchema,MessageSchema,
} from "@repo/shared";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from 'hono/cookie';
import { describeRoute, resolver, validator } from "hono-openapi";
import { openAPIRouteHandler } from "hono-openapi";
import { Scalar } from "@scalar/hono-api-reference"
import { auth } from "./auth";
import { cors } from "hono/cors";
import { handle } from "hono/vercel"



type Variables = {
  user: typeof auth.$Infer.Session.user | null;
  session :typeof auth.$Infer.Session.session | null;
}

const app = new Hono<{ Variables: Variables }>().basePath("/api")




app.use(
  "*", 
  cors({
    origin: "http://localhost:3000", 
    allowHeaders: ["Content-Type","Authorization","Cookie"],
    allowMethods: ["POST", "GET", "OPTIONS","PATCH","DELETE"],
    credentials: true,
    //exposeHeaders: ["user"]
       
  }),
);

app.all("/auth/*",(c)=>
{
  return auth.handler(c.req.raw);
})


app.use("*", logger());

const hour = 60 * 60;


// app.use("*", async(c,next)=>
// {
//   const session = await auth.api.getSession({headers:c.req.raw.headers});
//   if(!session)
//   {
//     c.set("user",null);
//     c.set("session",null);
//     await next();
//     return;
//   }
//   c.set("user",session.user);
//   //c.set("session",session.session);
//   await next();
// });




// function getJwtSecret() {
//   const secret = process.env.JWT_SECRET;

//   if (!secret) {
//     if (process.env.NODE_ENV === "production") {
//       return "build-time-dummy-key";
//     }
//     throw new Error("JWT secret is missing");
//   }
//   return secret;
// }

// const authGuard = async (c: Context, next: Next) => {
//   const token = getCookie(c, "auth_token");
//   if (!token) {
//     return c.json({ error: "Unauthorised access" }, 401);
//   }

//   try {
//     const payload = await verify(token, getJwtSecret(), "HS256");
//     c.set("user", payload as Variables["user"]);
//     await next();
//   } catch {
//     return c.json({ error: "Invalid or expired token" }, 401);
//   }
// };


// app.post(
//   "/register",
//   describeRoute({
//     description: "Register new user",
//     responses: {
//       201: {
//         description: "User created",
//         content: {
//           "application/json": {
//             schema: resolver(UserResponseSchema),
//           },
//         },
//       },
//       400: {
//         description: "Validation error",
//         content: {
//           "application/json": { schema: resolver(ErrorSchema) },
//         },
//       },
//       409: {
//         description: "User already exists",
//         content: {
//           "application/json": { schema: resolver(ErrorSchema) },
//         },
//       },
//       500: {
//         description: "Internal server error",
//         content: {
//           "application/json": { schema: resolver(ErrorSchema) },
//         },
//       },
//     },
//   }),
//   validator("json", RegisterSchema),
//   async (c) => {
//     try {
//       const db = getDb();
//       const { email, password, role } = c.req.valid("json");

//       const [existing] = await db.select().from(users).where(eq(users.email, email));
//       if (existing) {
//         return c.json({ error: "user already exists" }, 409);
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const [newUser] = await db.insert(users).values({
//         email,
//         password: hashedPassword,
//         role,
//       }).returning();

//       return c.json({
//         success: true,
//         user: newUser,
//       }, 201);

//     } catch (error) {
//       return c.json({ error: "Internal server error" }, 500);
//     }
//   }
// );


// app.post(
//   "/login",
//   describeRoute({
//     description: "User login",
//     responses: {
//       200: {
//         description: "Login success",
//         content: {
//           "application/json": {
//             schema: resolver(UserResponseSchema),
//           },
//         },
//       },
//       400: {
//         description: "Validation error",
//         content: {
//           "application/json": { schema: resolver(ErrorSchema) },
//         },
//       },
//       401: {
//         description: "Invalid credentials",
//         content: {
//           "application/json": { schema: resolver(ErrorSchema) },
//         },
//       },
//       403: {
//         description: "Forbidden role",
//         content: {
//           "application/json": { schema: resolver(ErrorSchema) },
//         },
//       },
//       500: {
//         description: "Internal server error",
//         content: {
//           "application/json": { schema: resolver(ErrorSchema) },
//         },
//       },
//     },
//   }),
//   validator("json", LoginSchema),
//   async (c) => {
//     try {
//       const db = getDb();
//       const { email, password, role } = c.req.valid("json");

//       const [user] = await db.select().from(users).where(eq(users.email, email));
//       if (!user) {
//         return c.json({ error: "Invalid credentials" }, 401);
//       }

//       const validPassword = await bcrypt.compare(password, user.password);
//       if (!validPassword) {
//         return c.json({ error: "Invalid credentials" }, 401);
//       }

//       if (user.role !== role) {
//         return c.json({ error: `You are not allowed to login as ${role}` }, 403);
//       }

//       const payload = {
//         sub: user.id,
//         email: user.email,
//         role: user.role,
//         exp: Math.floor(Date.now() / 1000) + hour,
//       };

//       const token = await sign(payload, getJwtSecret());

//       setCookie(c, "auth_token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "Lax",
//         path: "/",
//         maxAge: hour,
//       });

//       return c.json({
//         success: true,
//         user: user,
//       });

//     } catch {
//       return c.json({ error: "Internal server error" }, 500);
//     }
//   }
// );


// app.post(
//   "/logout",
//   describeRoute({
//     description: "Logout user",
//     responses: {
//       200: {
//         description: "Logout success",
//         content: {
//           "application/json": {
//             schema: resolver(z.object({ success: z.boolean() })),
//           },
//         },
//       },
//       401: {
//         description: "Unauthorized",
//         content: {
//           "application/json": { schema: resolver(ErrorSchema) },
//         },
//       },
//     },
//   }),
//   authGuard,
//   (c) => {
//     deleteCookie(c, "auth_token", { path: "/" });
//     return c.json({ success: true });
//   }
// );


// app.get(
//   "/auth/session",async (c)=>
//   {
//     const user = c.get("user");
//     const session = c.get("session")
//     if(!user) return c.body(null,401);
//     return c.json({
//       session,user,
//     });
//   }
// );


// app.post("/auth/logout",async (c)=>{
//   const session = await auth.api.getSession({headers:c.req.raw.headers});
//   if(!session) return c.json({error:"Unauthorized"},401);
//   await auth.api.signOut();
//   return c.json({success:true},200)
// })





const authGuard = async (c: Context, next: Next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session?.user) {
    return c.json({ error: "Unauthorized user" }, 401);
  }
  c.set("user", session.user);
  
// c.set("session",session.session);
  await next();
};


app.get(
  "/todos",
  describeRoute({
    description: "Get all todos",
    responses: {
      200: {
        description: "Todos retrieved",
        content: {
          "application/json": {
            schema: resolver(TodoSchema.array()),
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": { schema: resolver(ErrorSchema) },
        },
      },
    },
  }),
  //authGuard,
  async (c) => {
    const db = getDb();
    // const user = c.get("user");
    // if(!user)
    // {
    //   return c.json({message:"Unauthorized access"},401);
    // }
    const data = await db.select().from(todos);
    return c.json(TodoSchema.array().parse(data));
  }
);


app.post(
  "/todos",
  describeRoute({
    description: "Create new todo",
    responses: {
      201: {
        description: "Todo created",
        content: {
          "application/json": {
            schema: resolver(TodoSchema),
          },
        },
      },
      400: {
        description: "Validation error",
        content: {
          "application/json": { schema: resolver(ErrorSchema) },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": { schema: resolver(ErrorSchema) },
        },
      },
    },
  }),
  validator("json", CreateTodoFormSchema),
 // authGuard,
  async (c) => {
    const db = getDb();
    const body = c.req.valid("json");
    const parsed = CreateTodoSchema.parse(body);

    const [row] = await db.insert(todos).values({
      id: nanoid(),
      ...parsed,
    }).returning();

    return c.json(TodoSchema.parse(row), 201);
  }
);


const UpdateStatusSchema = z.object({
  status: TodoStatusEnum,
});

app.patch(
  "/todos/:id/status",
  describeRoute({
    description: "Update todo status",
    responses: {
      200: {
        description: "Updated",
        content: {
          "application/json": {
            schema: resolver(TodoSchema),
          },
        },
      },
      400: {
        description: "Invalid status",
        content: {
          "application/json": { schema: resolver(ErrorSchema) },
        },
      },
      404: {
        description: "Todo not found",
        content: {
          "application/json": { schema: resolver(MessageSchema) },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": { schema: resolver(ErrorSchema) },
        },
      },
    },
  }),
  validator("json", UpdateStatusSchema),
 // authGuard,
  async (c) => {
    const db = getDb();
    const { id } = c.req.param();
    const { status } = c.req.valid("json");

    const [row] = await db.update(todos)
      .set({ status, completed: status === "completed" })
      .where(eq(todos.id, id))
      .returning();

    if (!row) {
      return c.json({ message: "Not found" }, 404);
    }

    return c.json(TodoSchema.parse(row));
  }
);


app.delete(
  "/todos/:id",
  describeRoute({
    description: "Delete todo",
    responses: {
      204: {
        description: "Todo deleted",
        content: {},
      },
      404: {
        description: "Todo not found",
        content: {
          "application/json": {
            schema: resolver(MessageSchema),
          },
        },
      },
      401: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: resolver(ErrorSchema),
          },
        },
      },
    },
  }),
 //authGuard,
  async (c) => {
    const db = getDb();
    const { id } = c.req.param();

    const result = await db.delete(todos).where(eq(todos.id, id)).returning();
    if (!result.length) {
      return c.json({ message: "Not found" }, 404);
    }

    return c.body(null, 204);
  }
);


app.get("/doc",openAPIRouteHandler(app,{
    documentation:{
      servers:[{
        url:"/api",
      }]
    }
}))


app.get("/scalar-docs",Scalar((c)=>({
  url:new URL("/api/doc",c.req.url).toString(),
  theme:"deepSpace",
  layout:"modern",
})))




export { app };
export default app.fetch.bind(app) ;