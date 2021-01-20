FROM node:14.15.4-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN ls
# RUN npm install @prisma/cli
RUN apt-get update
RUN apt-get install openssl -y
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
RUN ls
COPY . .
RUN npx prisma generate
# RUN npx prisma migrate dev --name "init" --preview-feature

EXPOSE 3001
CMD [ "node", "app.js" ]