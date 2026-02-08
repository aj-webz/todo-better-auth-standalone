import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { logger } from "hono/logger";
import { nanoid } from "nanoid";

import { getDb, todos } from "@repo/db";
import {
  CreateTodoSchema,
  TodoSchema,
  TodoStatusEnum,
} from "@repo/shared";

const app = new Hono().basePath("/api");

app.use("*", logger());

app.get("/", async (c) => {
  const db = getDb();
  const data = await db.select().from(todos);

  console.log("GET /api → rows:", data.length);

  return c.json(TodoSchema.array().parse(data));
});

app.post("/", async (c) => {
  const db = getDb();
  const body = await c.req.json();

  console.log("POST /api → BODY:", body);

  const parsed = CreateTodoSchema.safeParse(body);

  if (!parsed.success) {
    console.error(
      "POST /api → VALIDATION FAILED:",
      parsed.error.flatten()
    );

    return c.json(
      { errors: parsed.error.flatten() },
      400
    );
  }

  console.log("POST /api → PARSED (DB PAYLOAD):", parsed.data);

  const [row] = await db
    .insert(todos)
    .values({
      id: nanoid(),
      ...parsed.data,
    })
    .returning();

  console.log("POST /api → INSERTED ROW:", row);

  return c.json(TodoSchema.parse(row), 201);
});

app.patch("/:id/status", async (c) => {
  const db = getDb();
  const { id } = c.req.param();
  const body = await c.req.json();

  console.log(`PATCH /api/${id}/status → BODY:`, body);

  const statusResult = TodoStatusEnum.safeParse(body.status);

  if (!statusResult.success) {
    console.error(
      `PATCH /api/${id}/status → INVALID STATUS:`,
      body.status
    );

    return c.json(
      { error: "Invalid todo status" },
      400
    );
  }

  const status = statusResult.data;

  const [row] = await db
    .update(todos)
    .set({
      status,
      completed: status === "completed",
    })
    .where(eq(todos.id, id))
    .returning();

  if (!row) {
    console.warn(`PATCH /api/${id}/status → NOT FOUND`);
    return c.json({ message: "Not found" }, 404);
  }

  console.log(`PATCH /api/${id}/status → UPDATED ROW:`, row);

  return c.json(TodoSchema.parse(row));
});

app.delete("/:id", async (c) => {
  const db = getDb();
  const { id } = c.req.param();

  console.log(`DELETE /api/${id}`);

  const result = await db
    .delete(todos)
    .where(eq(todos.id, id))
    .returning();

  if (!result.length) {
    console.warn(`DELETE /api/${id} → NOT FOUND`);
    return c.json({ message: "Not found" }, 404);
  }

  console.log(`DELETE /api/${id} → DELETED`);

  return c.body(null, 204);
});

export default app;
