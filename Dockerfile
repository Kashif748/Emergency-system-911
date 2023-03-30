# Choose the Image which has Node installed already
FROM node:12.22.12-alpine as build
ARG BUILD_ARG='-c staging'
# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
RUN npm install -g @angular/cli@10

# build app for production | staging | develop with minification
RUN ng build ${BUILD_ARG}

# export build bundles to artifacts
FROM scratch as artifact
WORKDIR /
COPY --from=build /app/dist .

# use nginx to serve application
FROM nginx:1.23.1-alpine as final
EXPOSE 80

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]