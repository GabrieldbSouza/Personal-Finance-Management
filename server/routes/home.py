from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from database.models.user import User
from database.database import db
from datetime import timedelta

homePageRoute = Blueprint('home', __name__)
bcrypt = Bcrypt()

@homePageRoute.route('/')
def home():
  pass

@homePageRoute.route('/login', methods = ['POST', 'OPTIONS'])
def login():
  if request.method == 'OPTIONS':
        response = jsonify(message='OPTIONS request received')
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
  
  email = request.json.get('email')
  password = request.json.get('password')

  user = User.query.filter_by(userEmail = email).first()

  if user is None:
    return jsonify({'error': 'Email invalido'}), 404
  
  if not bcrypt.check_password_hash(user.userPassword, password):
    return jsonify({'error': 'Senha invalida'}), 401
  
  accessToken = create_access_token(identity=user.userId, expires_delta=timedelta(hours=10))
  return jsonify({
    "id": user.userId,
    "name": user.userName,
    "email": email,
    "accessToken": accessToken
  }), 200

@homePageRoute.route('/register', methods = ['POST', 'OPTIONS'])
def register():
  if request.method == 'OPTIONS':
        response = jsonify(message='OPTIONS request received')
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
  
  name = request.json.get('name')
  email = request.json.get('email')
  password = request.json.get('password')

  if User.query.filter_by(userEmail=email).first() is not None:
    return jsonify({'error': 'Usuario ja cadastrado.'}), 409

  newUser = User(userName = name, userEmail = email, userPassword = bcrypt.generate_password_hash(password))

  db.session.add(newUser)
  db.session.commit()

  accessToken = create_access_token(identity=newUser.userId, expires_delta=timedelta(minutes=10))
  return jsonify ({
    "id": newUser.userId,
    "name": newUser.userName,
    "email": newUser.userEmail,
    "accessToken": accessToken
  }), 200
