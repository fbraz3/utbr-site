FROM nginx:stable

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy all website files
COPY . /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]