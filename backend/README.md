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

## Run the Backend with Docker

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
