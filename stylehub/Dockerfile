# # Use the official Python runtime image
# FROM python:3.13
 
# # Create the app directory
# RUN mkdir /app
 
# # Set the working directory inside the container
# WORKDIR /app
 
# # Set environment variables 
# # Prevents Python from writing pyc files to disk
# ENV PYTHONDONTWRITEBYTECODE=1
# #Prevents Python from buffering stdout and stderr
# ENV PYTHONUNBUFFERED=1 
 
# # Upgrade pip
# RUN pip install --upgrade pip 
 
# # Copy the Django project  and install dependencies
# COPY requirements.txt  /app/
 
# # run this command to install all dependencies 
# RUN pip install --no-cache-dir -r requirements.txt
 
# # Copy the Django project to the container
# COPY . /app/
 
# # Expose the Django port
# EXPOSE 8000
 
# # Run Django’s development server
# CMD ["python", "manage.py", "runserver", "127.0.0.1:8000"]

FROM python:3.11-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port Railway expects
EXPOSE 8000

# Start Django using Gunicorn
CMD ["gunicorn", "style_hub.wsgi:application", "--bind", "0.0.0.0:8000"]