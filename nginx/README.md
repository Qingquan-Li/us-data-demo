# Nginx Configuration

## 1. Create a new file us-data-demo in the /etc/nginx/sites-available directory:
```bash
$ sudo vim /etc/nginx/sites-available/us-data-demo
```

## 2. Add the following configuration:
```conf
# /etc/nginx/sites-available/us-data-demo

# Define a server block that listens on port 80 (default HTTP port).
server {
    listen 80;
    server_name us-data-demo.qingquanli.com;

    # Define the location for the root URL (React.js frontend).
    location / {
        # Define the path to the static files.
        root /home/jake/us-data-demo/frontend/build;
        # 1. Nginx first tries to serve the exact URI provided by the client.
        # For instance, if the client requests /page1.html, Nginx will look for
        # a file named page1.html in the specified root directory.
        # 2. If page1.html doesn't exist, Nginx will then treat the URI as a
        # directory and look for a default index file in that directory
        # (e.g., /page1.html/index.html).
        # 3. If neither the file nor the directory exists, Nginx will serve the
        # (fallback html) index.html file as the last resort.
        try_files $uri $uri/ /index.html;
    }

    # Define the location for the API endpoint.
    location /api {
        # The proxy_pass directive in Nginx is used to pass requests to another
        # server for processing and then return the response to the client.
        # It's a fundamental part of setting up Nginx as a reverse proxy.
        # Forward requests to the Flask app running on Gunicorn inside the
        # Docker container, which is mapped to port 5000 (host:container).
        proxy_pass http://localhost:5000;

        # Set the Host header of the forwarded request (the request sent to the Flask app)
        # to the host header of the original request (the request sent to Nginx), which is
        # the domain name typed in the browser.
        # This is necessary for the Flask app to generate correct URLs in the response.
        # `$host` is an Nginx built-in variable that contains the host name (domain name)
        # of the original request.
        proxy_set_header Host $host;

        # By default, Nginx does not forward the real IP address of the client (browser)
        # to the forwarded request (the request sent to the Flask app).
        # The application receiving the forwarded request (Flask) would see/think the proxy(Nginx)'s
        # IP address as the client IP, not the actual (real) client(browser)'s IP address.
        # Set the real IP address of the client in the forwarded request
        # to let the Flask know about the real IP address from the client.
        # `$remote_addr` is a built-in variable that contains the IP address of the client
        # that sent the request to the Nginx.
        proxy_set_header X-Real-IP $remote_addr;

        # Append the IP address of the client making the original request
        # to the `X-Forwarded-For` header of the forwarded request.
        # The value of the `X-Forwarded-For` header is a comma+space separated list of IP addresses.
        # `X-Forwarded-For` header is a de-facto standard header for identifying the originating
        # IP address of a client connecting to a web server through an HTTP proxy or load balancer.
        # `$proxy_add_x_forwarded_for` is a special Nginx built-in variable that represents
        # the client's IP address and any existing X-Forwarded-For IP addresses from the request.
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
```

## 3. Create a symbolic link to the file in the /etc/nginx/sites-enabled directory:
```bash
$ sudo ln -s /etc/nginx/sites-available/us-data-demo /etc/nginx/sites-enabled/
```

Optional: Configure HTTPS with Let's Encrypt or Cloudfare

Optional: Configure a Dockerfile for Nginx
```Dockerfile
# Use the official Nginx image based on Alpine Linux.
# Alpine is a lightweight Linux distribution.
FROM nginx:alpine

# Copy the Nginx configuration file (default.conf) to the appropriate
# directory in the (Ngix) container.
COPY default.conf /etc/nginx/conf.d/
```
