from api import create_app
from api.config import Config

# The app instance is created by the factory
app = create_app(Config)

# This block is for local development only
if __name__ == '__main__':
    # The host must be '0.0.0.0' to be accessible from the Next.js container
    app.run(host='0.0.0.0', port=5000)