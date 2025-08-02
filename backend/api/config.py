# backend/api/config.py
import os
from dotenv import load_dotenv

# Load environment variables from a .env file if it exists
load_dotenv()

class Config:
    """Base configuration settings."""
    # --- General Flask Settings ---
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')
    DEBUG = FLASK_ENV == 'development'

    # --- Application-Specific Settings ---
    UPLOAD_FOLDER = os.getenv('DF_UPLOAD_FOLDER', 'uploads')
    MODEL_PATH = os.getenv('DF_MODEL_PATH', 'deepfake_detector_model.keras')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

    # --- CORS Settings ---
    # Default to allowing your Next.js frontend in development
    CORS_ALLOWED_ORIGINS = os.getenv(
        'CORS_ALLOWED_ORIGINS',
        'http://localhost:3000'
        'aideepfake.ca'
    ).split(',')

    # --- Supabase Settings ---
    SUPABASE_URL = os.getenv('SUPABASE_URL')
    SUPABASE_KEY = os.getenv('SUPABASE_KEY')
    SUPABASE_JWT_SECRET = os.getenv('SUPABASE_JWT_SECRET')