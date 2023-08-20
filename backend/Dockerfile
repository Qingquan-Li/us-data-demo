# Use an official Python runtime as the parent image
FROM python:3.11-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory (backend) contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Set the command to run the application using gunicorn
# "app:app" tells Gunicorn to look in the app module (or app.py file)
# for a Flask application instance named app.
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers=2", "app:app"]
