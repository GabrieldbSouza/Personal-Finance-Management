import os
from dotenv import load_dotenv

from routes.homePage import homePageRoute
from database.database import db
from database.models.user import User

def config_all(app):
  config_app(app)
  config_route(app)
  config_db(app)

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

def config_db(app):
  app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pfm.db'
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
  db.init_app(app)
  with app.app_context():
    db.create_all()
    