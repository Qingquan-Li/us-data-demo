# Nginx Configuration on a Linux Server

Use Nginx as a reverse proxy to serve a React.js frontend and a Flask backend on the same domain.

## 1. Create a new file us-data-demo in the /etc/nginx/sites-available directory:
```bash
$ sudo vim /etc/nginx/sites-available/us-data-demo
```

## 2. Add the following configuration:
```conf
# /etc/nginx/sites-available/us-data-demo

# Define a server block.
server {
    # Listen on port 80 (default HTTP port).
    listen 80;

    # Define the domain name.
    server_name us-data-demo.qingquanli.com;

    # Define the location for the API endpoint (Flask backend).
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

    # Define the location for the root URL (React.js frontend).
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 3. Create a symbolic link to the file in the /etc/nginx/sites-enabled directory:
```bash
$ sudo ln -s /etc/nginx/sites-available/us-data-demo /etc/nginx/sites-enabled/
```

## 4. Optional: Configure HTTPS

- Use Cloudflare DNS proxy to enable HTTPS (it can also enable to hide the IP address of the server)
- Or: Configure Let's Encrypt (certbot) in Nginx to enable HTTPS
