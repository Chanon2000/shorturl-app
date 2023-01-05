FROM node:18-alpine3.16 AS build

WORKDIR /app

COPY package.json ./

RUN npm install 

COPY . .

RUN npm run build


FROM nginx:latest



COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]