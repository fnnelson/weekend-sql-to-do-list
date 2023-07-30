CREATE TABLE "todo-list" (
"id" serial primary key,
"task" varchar(180) not null,
"complete_status" boolean
);

INSERT INTO "todo-list" ("task", "complete_status")
VALUES ('assignment', false), ('eat', false), ('sleep', false), ('Hang out with friends', false);