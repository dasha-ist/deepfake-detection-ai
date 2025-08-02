import os
from flask import Flask
from flask_cors import CORS
from supabase import create_client, Client

from .config import Config
from .model import InferenceModel

# --- Global Instances ---
supabase: Client = None
inference_model: InferenceModel = None

def create_app(config_class=Config):
    """The application factory."""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # ================================================================= #
    # === CONVERT UPLOAD_FOLDER TO AN ABSOLUTE PATH ===
    # We get the directory of the current file (__init__.py), go up one level to the 'backend' folder,
    # and join it with the 'uploads' folder name from the config.
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    absolute_upload_folder = os.path.join(project_root, app.config['UPLOAD_FOLDER'])
    app.config['UPLOAD_FOLDER'] = absolute_upload_folder
    # ================================================================= #

    # Allow access to global instances
    global supabase, inference_model

    # --- Initialize Extensions and Services ---
    CORS(app, resources={r"/*": {"origins": app.config['CORS_ALLOWED_ORIGINS']}})
    print(f"CORS configured for origins: {app.config['CORS_ALLOWED_ORIGINS']}")

    if app.config['SUPABASE_URL'] and app.config['SUPABASE_KEY']:
        supabase = create_client(app.config['SUPABASE_URL'], app.config['SUPABASE_KEY'])
        print("Supabase client initialized.")
    else:
        print("Supabase client not initialized (URL or Key missing).")

    # Initialize the model a single time on startup
    inference_model = InferenceModel(app.config['MODEL_PATH'])

    # --- Create Upload Directories ---
    # This will now use the absolute path we just created.
    try:
        upload_folder = app.config['UPLOAD_FOLDER']
        os.makedirs(os.path.join(upload_folder, 'guest'), exist_ok=True)
        os.makedirs(os.path.join(upload_folder, 'user'), exist_ok=True)
        print(f"Upload directories ensured at '{upload_folder}'.")
    except OSError as e:
        app.logger.error(f"Error creating upload directories: {e}")

    # --- Register Blueprints ---
    from .routes import main_bp
    app.register_blueprint(main_bp)

    return app