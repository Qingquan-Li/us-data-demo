from flask import Flask
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)

# Add CORS support for all origins and methods to the Flask app
CORS(app)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# cors = CORS(
#     app,
#     resources={r"/api/*": {"origins": [
#         'http://localhost:3000',
#         'http://192.168.0.101:3000',
#         'https://us-data-demo.pages.dev']
#         }
#     }
# )

# Import the routes module (defined in routes.py) from the api package
from app import routes
