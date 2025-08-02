# deepfake-detection-ai/backend/Dockerfile
FROM python:3.10-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/opt/venv/bin:$PATH"

# Set working directory
WORKDIR /app

# Create a non-root user for security
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Install system dependencies required for creating the venv robustly
USER root
RUN apt-get update && apt-get install -y python3-venv --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Create the virtual environment
RUN python -m venv /opt/venv

# Copy only the requirements file to leverage Docker's cache
COPY requirements.txt .

# Install dependencies into the virtual environment
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Change ownership of the app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Define the command to run the application using Gunicorn
CMD ["gunicorn", "--workers", "2", "--bind", "0.0.0.0:5000", "run:app"]