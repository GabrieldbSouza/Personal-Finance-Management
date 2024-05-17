from flask import Blueprint, request, jsonify
from database.models.user import User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from datetime import timedelta
from database.database import db

homePageRoute = Blueprint('home', __name__)

bcrypt = Bcrypt()

def handleOptions():
  response = jsonify(message='OPTIONS request received')
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', '*')
  response.headers.add('Access-Control-Allow-Methods', '*')
  
  return response, 200

@homePageRoute.route('/login', methods = ['POST', 'OPTIONS'])
def login():

  if request.method == 'OPTIONS':
    return handleOptions()
  
  userEmail = request.json.get('userEmail')
  userPassword = request.json.get('userPassword')

  user = User.query.filter_by(userEmail = userEmail).first()

  if user is None:
    return jsonify({'emailErro': 'Email invalido'}), 404
  
  if not bcrypt.check_password_hash(user.userPassword, userPassword):
    return jsonify({'passwordErro': 'Senha invalida'}), 401
  
  accessToken = create_access_token(identity = user.userId, expires_delta = timedelta(hours = 1))
  
  return jsonify({'accessToken': accessToken}), 200

@homePageRoute.route('/register', methods = ['POST', 'OPTIONS'])
def register():

  if request.method == 'OPTIONS':
    return handleOptions()
  
  userName = request.json.get('userName')
  userEmail = request.json.get('userEmail')
  userPassword = request.json.get('userPassword')

  user = User.query.filter_by(userEmail = userEmail).first()

  if user is not None:
    return jsonify({'emailErro': 'Usuario já cadastrado.'}), 409

  newUser = User(userName = userName, userEmail = userEmail, userPassword = bcrypt.generate_password_hash(userPassword))

  db.session.add(newUser)
  db.session.commit()

  user = User.query.filter_by(userEmail = userEmail).first()

  accessToken = create_access_token(identity = user.userId, expires_delta = timedelta(hours = 1))
  
  return jsonify({'accessToken': accessToken}), 200
