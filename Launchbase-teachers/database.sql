DROP DATABASE IF EXISTS my_teacher
CREATE DATABASE my_teacher

CREATE TABLE "teachers" (
"id" SERIAL PRIMARY KEY,
"name" TEXT NOT NULL,
"avatar_url" TEXT,
"birth" TIMESTAMP,
"education_level" TEXT,
"class_type" TEXT,
"subjects_taught" TEXT,
"created_at" timestamp DEFAULT (now()),
"updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "students" (
"id" SERIAL PRIMARY KEY,
"name" TEXT NOT NULL,
"avatar_url" TEXT,
"birth" TIMESTAMP,
"email" TEXT NOT NULL,
"school_year" TEXT,
"subjects" TEXT,
"workload" INTEGER,
"teacher_id" INTEGER REFERENCES teachers(id),
"created_at" timestamp DEFAULT (now()),
"updated_at" timestamp DEFAULT (now())
);

-- create Procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at =NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto updated_at students
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Auto updated_at teachers
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON teachers
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


-- to run seeds
DELETE FROM students;
DELETE FROM teachers;

-- restart sequence auto_increment from tables ids
ALTER SEQUENCE students_id_seq RESTART WITH 1;
ALTER SEQUENCE teachers_id_seq RESTART WITH 1;
