import {
  pgTable,
  text,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

/* =============================
   Status Enum (DOMAIN-ALIGNED)
   ============================= */
export const todoStatusEnum = pgEnum("todo_status", [
  "todo",
  "in-progress",
  "backlog",
  "completed",
  "cancelled",
]);

/* =============================
   Todos Table
   ============================= */
export const todos = pgTable("todoworker", {
  id: text("id").primaryKey(),

  title: text("title").notNull(),
  description: text("description").notNull(),


  status: todoStatusEnum("status")
    .notNull()
    .default("todo"),

  completed: boolean("completed")
    .notNull()
    .default(false),

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),

  /**
   * Nullable by design.
   * Controlled by CreateTodoSchema transform.
   */
  endAt: timestamp("end_at", {
    withTimezone: true,
    mode: "date",
  }),
});
