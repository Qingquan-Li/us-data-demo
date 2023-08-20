# Backend

## Run the Backend Locally

Install Python (recommended version 3.8 or higher).
Then run the following commands:

```bash
# Go to the backend directory:
$ cd backend
# Create a virtual environment:
backend $ python -m venv .venv
# Activate the virtual environment:
backend $ source .venv/bin/activate
# Install the dependencies (in a virtual environment):
(.venv) backend $ pip install -r requirements.txt
# Run the Flask development server:
(.venv) backend $ flask --app app run # or: flask run
```

- Running on http://127.0.0.1:5000
- View the api/data: http://127.0.0.1:5000/api/data

## Run the Backend with Docker (Local/Development)

```bash
# Go to the backend directory:
$ cd backend
# Build the Docker image:
# name: us-data-demo-backend, tag: latest (default)
# context (directory): . (current directory)
backend $ docker build -t us-data-demo-backend .
# Run the Docker container:
# port mapping: 5000:5000 (host:container)
backend $ docker run -p 5000:5000 us-data-demo-backend
```

- Running on http://localhost:5000
- View the api/data: http://localhost:5000/api/data

## Run the Backend with Docker Compose (Development/Production)

> Gunicorn is used as the WSGI server.
> Nginx is used as the reverse proxy server.

```bash
# Build and run the container:
$ docker compose up --build
# Stop the container:
$ docker compose down
```

Or:

```bash
# Build the container without using cache:
$ docker compose build --no-cache
# Run the container in the background (detached mode):
$ docker compose up -d
# Stop the container:
$ docker compose down
```

- Running on http://localhost
- View the api/data: http://localhost/api/data

### Run the Container on a Server by Specifying the SERVER_NAME
```bash
$ SERVER_NAME=us-data-demo.qingquanli.com docker-compose up -d
```
