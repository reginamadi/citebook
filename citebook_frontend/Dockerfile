FROM node:13.12.0-alpine

WORKDIR /app/citebook_frontend

COPY . .

# RUN npm cache clean --force
# RUN npm install  -g npm
RUN npm install

EXPOSE 3000

CMD ["npm" , "start"]
