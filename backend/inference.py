from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing import image # type: ignore
import numpy as np
import os
from dotenv import load_dotenv

load_dotenv()

# Configuration using Environment Variables
FLASK_ENV = os.getenv('FLASK_ENV', 'production')

# DF_UPLOAD_FOLDER: Environment variable for the directory where uploaded files will be temporarily stored.
#                   Defaults to 'uploads' if not set.
UPLOAD_FOLDER = os.getenv('DF_UPLOAD_FOLDER', 'uploads')

# DF_MODEL_PATH: Environment variable for the path to the Keras model file.
#                Defaults to 'deepfake_detector_model.keras' if not set.
MODEL_PATH = os.getenv('DF_MODEL_PATH', 'deepfake_detector_model.keras')

# FRONTEND_DOMAIN: The domain of the frontend application. Used for CORS if a specific domain is needed.
#                  Defaults to '*' allowing all origins if not set, or you can set a specific default.
FRONTEND_DOMAIN = os.getenv('FRONTEND_DOMAIN', '*')

# CORS_ALLOWED_ORIGINS: A comma-separated list of origins allowed for CORS. Takes precedence over FRONTEND_DOMAIN if set.
#                       e.g., "http://localhost:3000,https://your-production-frontend.com"
CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', FRONTEND_DOMAIN).split(',')

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


class InferenceModel:
    """
    A class to load a trained model and handle file uploads and predictions via API endpoints.
    """

    def __init__(self, model_path_param):
        """
        Initialize the InferenceModel class.

        Args:
            model_path_param (str): Path to the saved Keras model.
        """
        try:
            self.model = load_model(model_path_param)
            print(f"Model loaded successfully from {model_path_param}")
        except Exception as e:
            print(f"Error loading model from {model_path_param}: {e}")
            self.model = None # Set model to None if loading fails

        self.app = Flask(__name__)
        self.app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
        self.model_path = model_path_param
        CORS(self.app, resources={r"/*": {"origins": CORS_ALLOWED_ORIGINS}})
        print (f"CORS configured for origins: {CORS_ALLOWED_ORIGINS}") 



        # --- API Endpoints ---

        @self.app.route('/')
        def index():
            """
            Serve the main index.html file.
            """
            return render_template('index.html')

        @self.app.route('/upload', methods=['POST']) 
        def upload_file_api():
            """
            Handle file upload, perform prediction, and return results directly.
            Suitable for clients like Postman expecting a single response.
            """

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
        #Set debug mode based on FLASK_ENV
        debug_mode = FLASK_ENV == 'development'
        # Listen on all interfaces (0.0.0.0) for Docker compatibility
        self.app.run(debug=debug_mode, host='0.0.0.0', port=5000)


if __name__ == '__main__':
    #inference
    #MODEL_PATH is defined at the top of the file via os.getenv
    inference_model = InferenceModel(MODEL_PATH)
    inference_model.run()
