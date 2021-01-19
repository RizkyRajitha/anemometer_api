CREATE TABLE hystoricalwinddata (
  id SERIAL PRIMARY KEY NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  avarage VARCHAR(255) ,
  max VARCHAR(255)
);