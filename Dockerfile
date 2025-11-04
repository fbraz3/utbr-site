FROM nginx:stable

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy all website files
COPY . /usr/share/nginx/html/

EXPOSE 80

# Healthcheck - check if nginx is serving content
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -fI http://localhost/ || exit 1

# fix permissions for running nginx as non-root user    
RUN chown nginx:nginx /var/cache/nginx/; \
    chown -R nginx:nginx /etc/nginx/conf.d; \
    (touch /run/nginx.pid && chown nginx:nginx /run/nginx.pid);

# Switch to the nginx user
USER nginx

CMD ["nginx", "-g", "daemon off;"]