# Serve the built Angular app (expects dist/jenkins from Jenkins build)
FROM nginx:alpine
COPY dist/jenkins /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
