FROM nginx:stable

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy all website files
COPY . /usr/share/nginx/html/

# Create classic version directory for backward compatibility
RUN mkdir -p /usr/share/nginx/html/classic/css /usr/share/nginx/html/classic/js
COPY index-classic.html /usr/share/nginx/html/classic/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]