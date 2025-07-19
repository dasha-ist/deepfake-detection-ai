# deepfake-detection-ai/backend/Dockerfile
# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# PYTHONDONTWRITEBYTECODE=1: Prevents python from writing .pyc files to disc
# PYTHONUNBUFFERED=1: Force stdin, stdout, and stderr to be totally unbuffered

# Set the working directory in the container
WORKDIR /app

# Create a non-root user and group (Debian/Ubuntu syntax)
RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup --no-create-home --shell /bin/false appuser

# Create a virtual environment
RUN python -m venv /opt/venv
# Activate the virtual environment for subsequent RUN commands
ENV PATH="/opt/venv/bin:$PATH"

# Copy the requirements file first to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application files
COPY . .

# The script creates the 'uploads' folder.
# To ensure it exists and has correct permissions beforehand:
RUN mkdir -p uploads

# Change ownership of the app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application using Gunicorn
CMD ["gunicorn", "--workers", "2", "--bind", "0.0.0.0:5000", "inference:app"]