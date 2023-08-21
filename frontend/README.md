# Frontend

TODO:
format the files with 2 spaces instead of 4
Search: route to search page

## Run the Frontend Locally

Install Node.js, then run the following commands:

```bash
# Go to the frontend directory:
$ cd frontend
# Install the dependencies:
frontend $ npm install
# Run the development server:
frontend $ npm start
```

- Running on http://localhost:3000

## Run the frontend with Docker

```bash
# Go to the frontend directory:
$ cd frontend
# Build the Docker image:
# name: us-data-demo-frontend, tag: latest (default)
# context (directory): . (current directory)
frontend $ docker build -t us-data-demo-frontend .
# Run the Docker container:
# port mapping: 3000:3000 (host:container)
frontend $ docker run -p 3000:3000 us-data-demo-frontend
```

- Running on http://localhost:3000
