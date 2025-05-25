from flask import Flask, request, render_template, jsonify, make_response
from flask_cors import CORS
from tensorflow.keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing import image # type: ignore
import numpy as np
import os

# Make sure the uploads directory exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

class InferenceModel:
    """
    A class to load a trained model and handle file uploads and predictions via API endpoints.
    """

    def __init__(self, model_path):
        """
        Initialize the InferenceModel class.

        Args:
            model_path (str): Path to the saved Keras model.
        """
        try:
            self.model = load_model(model_path)
            print(f"Model loaded successfully from {model_path}")
        except Exception as e:
            print(f"Error loading model from {model_path}: {e}")
            self.model = None # Set model to None if loading fails

        self.app = Flask(__name__)
        # Enable CORS for /upload from your Next.js app
        CORS(self.app, resources={r"/upload": {"origins": "http://34.44.254.135:3000"}})

        self.app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
        self.model_path = model_path

        # --- API Endpoints ---

        @self.app.route('/')
        def index():
            """
            Serve the main index.html file.
            """
            return render_template('index.html')

        @self.app.route('/upload', methods=['POST', 'OPTIONS']) # Add OPTIONS method for preflight requests
        def upload_file_api():
            """
            Handle file upload, perform prediction, and return results directly.
            Suitable for clients like Postman expecting a single response.
            """
            if request.method == 'OPTIONS': # Handle preflight request
                return self._build_cors_preflight_response()

            if self.model is None:
                 return jsonify({'error': 'Model not loaded. Cannot perform prediction.'}), 500

            # check if the post request has the file part
            if 'file' not in request.files:
                return jsonify({'error': 'No file part in the request'}), 400

            file = request.files['file']

            # if user does not select file, browser also
            # submit an empty part without filename
            if file.filename == '':
                return jsonify({'error': 'No selected file'}), 400

            if file and self.allowed_file(file.filename):
                # Use the original filename for saving, as we'll delete it immediately
                # For production, using a unique name is safer to avoid conflicts
                filepath = os.path.join(self.app.config['UPLOAD_FOLDER'], file.filename)

                try:
                    # Save the uploaded file temporarily
                    file.save(filepath)

                    # Predict if the image is Real or Fake
                    prediction, prediction_percentage = self.predict_image(filepath)

                    # Determine result message
                    result_status = 'Fake' if prediction >= 0.5 else 'Real'

                    # Clean up the uploaded file immediately after prediction
                    os.remove(filepath)

                    # Return the results directly as a JSON payload
                    response = jsonify({
                        'result': result_status,
                        'prediction_percentage': round(prediction_percentage, 2) # Round for cleaner output
                    })
                    return response, 200

                except Exception as e:
                    # Clean up the file if an error occurred after saving
                    if os.path.exists(filepath):
                        os.remove(filepath)
                    print(f"Error during prediction: {e}")
                    return jsonify({'error': f'An error occurred during prediction: {e}'}), 500

            else:
                return jsonify({'error': 'Allowed file types are png, jpg, jpeg'}), 400


    def _build_cors_preflight_response(self): # Helper for OPTIONS
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization') # Add any headers your FE might send
        response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS') # Allowed methods
        return response

    def allowed_file(self, filename):
        """
        Check if a file has an allowed extension.

        Parameters:
        -----------
        filename : str
            The name of the file to check.

        Returns:
        --------
        bool
            True if the file has an allowed extension, False otherwise.
        """
        ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    def predict_image(self, file_path):
        """
        Predict whether an image is Real or Fake using the loaded model.

        Parameters:
        -----------
        file_path : str
            The path to the image file.

        Returns:
        --------
        tuple
            A tuple containing the raw prediction score (0-1) and the prediction percentage (0-100).
        """
        if self.model is None:
             raise RuntimeError("Model is not loaded.")

        try:
            # The model expects images of size 128x128
            img = image.load_img(file_path, target_size=(128, 128))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0) # Add batch dimension

            result = self.model.predict(img_array)
            prediction = result[0][0] # Get the single prediction value
            prediction_percentage = float(prediction * 100) # Ensure it's a float for JSON
            return prediction, prediction_percentage
        except Exception as e:
            print(f"Error predicting image {file_path}: {e}")
            raise # Re-raise the exception after logging


    def run(self):
        """
        Run the Flask application with the loaded model (for development purposes).
        """
        # For local development, debug=True is useful
        self.app.run(debug=True, host='127.0.0.1', port=5000)


# --- Application Initialization for Gunicorn and Development ---

# This part ensures that the Flask app is initialized correctly whether
# it's run directly (for development) or by Gunicorn (for production).
model_path = 'deepfake_detector_model.keras'
inference_instance = InferenceModel(model_path)

if __name__ == '__main__':
    # When run directly (e.g., `python inference.py`), use the development server
    inference_instance.run()
else:
    # When imported by Gunicorn, expose the Flask application instance
    app = inference_instance.app