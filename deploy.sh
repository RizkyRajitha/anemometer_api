 
docker rm -f anemometerapi
 
docker rm -f postgresql-anemometer
 
docker network rm  anemometernet
 
docker network create --subnet 172.20.0.0/16 anemometernet
 
docker run --name postgresql-anemometer -p 5432:5432 -e POSTGRES_PASSWORD=123 -e POSTGRES_USER=anemometer -d  postgres:10-alpine
 
docker network connect --ip 172.20.0.5 anemometernet postgresql-anemometer
 
docker run --name anemometerapi -p 3001:3001 -d  batman/anemometerapislim
 
docker network connect  anemometernet anemometerapi
 
RETRIES=10
 
until docker exec -i postgresql-anemometer psql -U anemometer -d anemometer  -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "Waiting for postgres server, $((RETRIES--)) remaining attempts..."
  sleep 1
done
  echo "posgres is up"
  echo "starting migration"
 
cat ./dbmigrate.sql | docker exec -i postgresql-anemometer psql -U anemometer -d anemometer