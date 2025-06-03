FROM nginx:alpine

COPY . /usr/share/nginx/html/

RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/compose.yaml \
          /usr/share/nginx/html/.gitignore \
          /usr/share/nginx/html/download-assets.sh \
          /usr/share/nginx/html/README.md

RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Enable gzip compression \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1000; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml; \
    \
    # Cache static assets \
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Main location \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]