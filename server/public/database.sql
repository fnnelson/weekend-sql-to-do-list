CREATE TABLE "todo-list" (
"id" serial primary key,
"task" varchar(180) not null,
"complete_status" boolean
);

INSERT INTO "todo-list" ("task", "complete_status")
VALUES ('eat', false), ('sleep', false), ('drink a whiskey drink', false), ('drink a vodka drink', false), ('drink a lager drink', false), ('drink a cider drink', false), ('get knocked down', false), ('get up again', false), ('do assignment', false) ;