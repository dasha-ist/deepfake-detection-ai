from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing import image # type: ignore
import numpy as np
import os

# --- Configuration using Environment Variables ---
# Docker Compose will load these from the root .env file.
# We just read them from the environment here. This is the standard "Docker way".
FLASK_ENV = os.getenv('FLASK_ENV', 'production')
UPLOAD_FOLDER = os.getenv('DF_UPLOAD_FOLDER', 'uploads')
MODEL_PATH = os.getenv('DF_MODEL_PATH', 'deepfake_detector_model.keras')
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '*').split(',')


# --- Create the Flask App Instance Globally ---
# Gunicorn (the production server) looks for this 'app' variable at the top level.
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app, resources={r"/*": {"origins": CORS_ALLOWED_ORIGINS}})
print(f"CORS configured for origins: {CORS_ALLOWED_ORIGINS}")


# --- Helper Function ---
def allowed_file(filename):
    """Check if a file has an allowed extension."""
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# --- Model Loading and Prediction Class ---
class InferenceModel:
    """A class to encapsulate model loading and prediction logic."""
    def __init__(self, model_path_param):
        self.model = None
        try:
            # The path here is relative to the WORKDIR in the Docker container (/app)
            if os.path.exists(model_path_param):
                self.model = load_model(model_path_param)
                print(f"Model loaded successfully from '{model_path_param}' inside the container.")
            else:
                # This is a critical error, so we print a clear message.
                print(f"FATAL: Model file not found at '{model_path_param}' inside the container. Check your docker-compose.yml volumes.")
        except Exception as e:
            print(f"FATAL: An error occurred while loading the model: {e}")

    def predict_image(self, file_path):
        """Predict whether an image is Real or Fake."""
        if self.model is None:
            raise RuntimeError("Model is not loaded.")
        
        # The model expects images of size 128x128
        img = image.load_img(file_path, target_size=(128, 128))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) # Add batch dimension

        result = self.model.predict(img_array)
        prediction = result[0][0] # Get the single prediction value
        prediction_percentage = float(prediction * 100)
        return prediction, prediction_percentage


# --- Application Setup ---
# Create the 'uploads' directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
# Create a single instance of our model when the application starts
inference_model = InferenceModel(MODEL_PATH)


# --- API Endpoints ---
# We register routes on the global 'app' object.

@app.route('/upload', methods=['POST'])
def upload_file_api():
    """Handle file upload, perform prediction, and return results."""
    
    # Check if the model was loaded correctly on startup
    if inference_model.model is None:
        return jsonify({'error': 'Model is not loaded, the server is in a failed state.'}), 503

    if 'file' not in request.files or not request.files['file'].filename:
        return jsonify({'error': 'No file selected or file part is missing.'}), 400

    file = request.files['file']

    if file and allowed_file(file.filename):
        # Use a secure filename and save temporarily
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        try:
            file.save(filepath)
            
            # Predict if the image is Real or Fake
            prediction, prediction_percentage = inference_model.predict_image(filepath)
            result_status = 'Fake' if prediction >= 0.5 else 'Real'
            
            # Return the results directly as a JSON payload
            response = jsonify({
                'result': result_status,
                'prediction_percentage': round(prediction_percentage, 2)
            })
            return response, 200
        except Exception as e:
            print(f"Error during prediction: {e}")
            return jsonify({'error': 'An internal error occurred during prediction.'}), 500
        finally:
            # Always clean up the uploaded file to save space
            if os.path.exists(filepath):
                os.remove(filepath)
    else:
        return jsonify({'error': 'Invalid file type. Allowed types are png, jpg, jpeg.'}), 400

# This block is only for local development (e.g., running `python inference.py`)
# Gunicorn will NOT use this part.
if __name__ == '__main__':
    debug_mode = (FLASK_ENV == 'development')
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)