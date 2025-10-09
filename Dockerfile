FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy only site assets (respect .dockerignore) to keep image small
# Adjust paths if you reorganize files later
COPY index.html /usr/share/nginx/html/
COPY resource /usr/share/nginx/html/resource


# Configure nginx: gzip + long-lived cache for static assets
RUN printf '%s\n' "server {" \
    "    listen 80;" \
    "    server_name _;" \
    "    root /usr/share/nginx/html;" \
    "    index index.html;" \
    "    gzip on;" \
    "    gzip_vary on;" \
    "    gzip_min_length 1000;" \
    "    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;" \
    "    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {" \
    "        expires 1y;" \
    "        add_header Cache-Control \"public, immutable\";" \
    "    }" \
    "    location / {" \
    "        try_files $uri $uri/ /index.html;" \
    "    }" \
    "}" > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]