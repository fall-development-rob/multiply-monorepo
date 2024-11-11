from flask import Flask

import logging

from flask_cors import CORS

from src.routes import registerRoutes

app = Flask(__name__)

CORS(app)  # Enable CORS for all routes

def createApp():
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s [%(name)s] %(message)s',
        handlers=[
            logging.StreamHandler()
        ]
    )

    # Set up routes
    registerRoutes(app)
    return app

app = createApp()
    