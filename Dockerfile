# Choose the Image which has Node installed already
FROM node:12.22.12-alpine as build

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
RUN npm install -g @angular/cli@10

# build app for production with minification
RUN ng build -c staging

# use nginx to serve application
FROM nginx:1.23.1-alpine as final

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]