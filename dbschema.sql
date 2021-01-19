CREATE TABLE hystoricalwinddata (
  id SERIAL PRIMARY KEY NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  avarage decimal,
  max decimal
);


select date_trunc('hour', "createdAt"),
  count(1)
from hystoricalwinddata
group by 1;



ALTER TABLE hystoricalwinddata 
RENAME COLUMN createdAt TO createdat;
 -- or hour, day, week, month, year