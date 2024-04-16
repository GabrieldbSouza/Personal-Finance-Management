from flask import Flask
from config import config_all
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
config_all(app)

if __name__ == "__main__":
  app.run(debug = True, port=5001)
