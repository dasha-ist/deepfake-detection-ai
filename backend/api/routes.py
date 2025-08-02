import os
from flask import (
    Blueprint, 
    jsonify, 
    request, 
    current_app, 
    g, 
    send_from_directory
)
from werkzeug.utils import secure_filename
from .utils import allowed_file
from .auth import jwt_optional

# Use the model instance created in __init__.py
from . import inference_model

# Create the Blueprint for these routes
main_bp = Blueprint('main', __name__)


@main_bp.route('/upload', methods=['POST'])
@jwt_optional
def upload_file_api():
    """
    Handles file uploads.
    - If the model is loaded, it predicts and saves the image permanently.
    - If the model is NOT loaded, it rejects the upload without saving the file.
    """
    # 1. --- Initial File Validation ---
    if 'file' not in request.files or not request.files['file'].filename:
        return jsonify({'error': 'No file selected or file part is missing.'}), 400

    file = request.files['file']

    if not file or not allowed_file(file.filename, current_app.config['ALLOWED_EXTENSIONS']):
        return jsonify({'error': 'Invalid file type.'}), 400

    # 2. --- Fallback Logic: Model Failed to Load ---
    # If the model isn't loaded, reject the request immediately WITHOUT saving the file.
    if inference_model.model is None:
        current_app.logger.warning("Upload rejected: Model is not loaded. The server is in fallback mode.")
        return jsonify({'error': "Our AI model is feeling lazy right now, please try again later."}), 503

    # 3. --- Normal Prediction Logic (Model is loaded) ---
    try:
        # Determine the permanent save folder based on auth status
        user_folder = 'user' if g.is_authenticated else 'guest'
        save_directory = os.path.join(current_app.config['UPLOAD_FOLDER'], user_folder)
        
        # Ensure the directory exists before saving
        os.makedirs(save_directory, exist_ok=True)
        
        # Use a secure filename to prevent security vulnerabilities
        filename = secure_filename(file.filename)
        filepath = os.path.join(save_directory, filename)

        # Save the file to its permanent location
        file.save(filepath)
        current_app.logger.info(f"File saved permanently to {filepath}")
        
        # Perform the prediction on the saved file
        result_status, prediction_percentage = inference_model.predict_image(filepath)
        
        # Return a successful response with the prediction results
        return jsonify({
            'result': result_status,
            'prediction_percentage': prediction_percentage
        }), 200
        
    except Exception as e:
        current_app.logger.error(f"An unexpected error occurred during prediction or file save: {e}")
        return jsonify({'error': 'An internal server error occurred.'}), 500
    # Note: The 'finally' block that deleted the file has been intentionally removed
    # to make the save permanent on success.


@main_bp.route('/uploads/<path:filepath>')
def serve_upload(filepath):
    """
    Serves a file from the upload folder.
    This makes the uploaded images accessible via a URL.
    Example URL: http://localhost:5000/uploads/guest/my-image.jpg
    """
    try:
        # 'directory' is the path to the main 'uploads' folder
        # 'filepath' is the rest of the path (e.g., "guest/image.jpg")
        return send_from_directory(
            current_app.config['UPLOAD_FOLDER'],
            filepath,
            as_attachment=False  # as_attachment=False displays the image in the browser
        )
    except FileNotFoundError:
        return jsonify({'error': 'File not found.'}), 404