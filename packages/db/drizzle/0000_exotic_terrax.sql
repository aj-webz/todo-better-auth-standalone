CREATE TYPE "public"."todo_status" AS ENUM('todo', 'in-progress', 'backlog', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "todoworker" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "todo_status" DEFAULT 'todo' NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"end_at" timestamp with time zone
);
