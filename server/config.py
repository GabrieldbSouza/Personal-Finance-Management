import os
from dotenv import load_dotenv
from routes.home import homePageRoute
from routes.user import userPageRoute

from database.database import db
from database.models.user import User
from database.models.transaction import Transaction, Type, Category
from flask_jwt_extended import JWTManager


def config_all(app):
  app.config['SECRET_KEY'] = '121cbbcjllzclzccdcxnjcndnc3'
  #config_app(app)
  config_route(app)
  config_db(app)
  #config_cors(app)
  jwt = JWTManager(app)
  app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')

def config_app(app):
  pass
  
def config_route(app):
  app.register_blueprint(homePageRoute)  
  app.register_blueprint(userPageRoute, url_prefix='/user') 

def config_db(app):
  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pfm.db'
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
  db.init_app(app)
  with app.app_context():
    db.create_all()

def config_cors(app):
  pass