import os
from dotenv import load_dotenv
from routes.homePage import homePageRoute
from routes.user import userPageRoute

from database.database import db
from database.models.user import User
from database.models.transaction import Transaction, Type, Category
from flask_jwt_extended import JWTManager


def config_all(app):
  app.config['SECRET_KEY'] = '121cbbcjllzclzccdcxnjcndnc3'
  config_app(app)
  config_route(app)
  config_db(app)
  jwt = JWTManager(app)
  app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')


def config_app(app):
  app.config['OAUTH2_PROVIDERS'] = { 
    'google': {
      'client_id': os.environ.get('GOOGLE_CLIENT_ID'),
      'client_secret': os.environ.get('GOOGLE_CLIENT_SECRET'),
      'authorize_url': 'https://accounts.google.com/o/oauth2/auth',
      'token_url': 'https://accounts.google.com/o/oauth2/token',
      'userinfo': {
        'url': 'https://www.googleapis.com/oauth2/v3/userinfo',
        'email': lambda json: json['email'],
      },
      'scopes': ['https://www.googleapis.com/auth/userinfo.email'],
    },
    }
def config_route(app):
  app.register_blueprint(homePageRoute)  
  app.register_blueprint(userPageRoute) 

def config_db(app):
  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pfm.db'
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
  db.init_app(app)
  with app.app_context():
    db.create_all()
    