import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

class InferenceModel:
    """A class to encapsulate model loading and prediction logic safely."""
    def __init__(self, model_path):
        self.model = None
        try:
            if os.path.exists(model_path):
                self.model = load_model(model_path)
                print(f"✅ Model loaded successfully from '{model_path}'.")
            else:
                print(f"🚨 FATAL WARNING: Model file not found at '{model_path}'. Server will run in fallback mode.")
        except Exception as e:
            print(f"🚨 FATAL WARNING: An error occurred while loading the model: {e}. Server will run in fallback mode.")

    def predict_image(self, file_path):
        """Predict whether an image is Real or Fake. Raises error if model is not loaded."""
        if self.model is None:
            raise RuntimeError("Prediction called but the model is not loaded.")
        
        img = image.load_img(file_path, target_size=(128, 128))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)

        result = self.model.predict(img_array)
        prediction = result[0][0]
        prediction_percentage = float(prediction * 100)
        
        return 'Fake' if prediction >= 0.5 else 'Real', round(prediction_percentage, 2)