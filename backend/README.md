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

## Build and Run the Backend with Docker (Local/Development)

> Gunicorn is used as the WSGI server.

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

## Download and Run the Backend Docker Container (Production)

```bash
# Download the Docker image:
$ sudo docker pull qingquanli/us-data-demo-backend
# Run the Docker container in the background (detached mode),
# Port mapping: 5000:5000 (host:container):
$ sudo docker run -d -p 5000:5000 qingquanli/us-data-demo-backend
```
