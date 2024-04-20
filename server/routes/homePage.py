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
  email = request.json.get('email')
  password = request.json.get('password')

  user = User.query.filter_by(userEmail = email).first()

  if user is None:
    return jsonify({'error': 'Email invalido'}), 404
  
  if not bcrypt.check_password_hash(user.userPassword, password):
    return jsonify({'error': 'Senha invalida'}), 401
  
  accessToken = create_access_token(identity = email, expires_delta = timedelta(hours=1))

  return jsonify({
    "id": user.userId,
    "name": user.userName,
    "email": email,
    "accessToken": accessToken
  }), 200

@homePageRoute.route('/register', methods = ['POST', 'OPTIONS'])
def register():
  name = request.json.get('name')
  email = request.json.get('email')
  password = request.json.get('password')

  if User.query.filter_by(userEmail=email).first() is not None:
    return jsonify({'error': 'Usuario ja cadastrado.'}), 409

  newUser = User(userName = name, userEmail = email, userPassword = bcrypt.generate_password_hash(password))

  db.session.add(newUser)
  db.session.commit()

  accessToken = create_access_token(identity = email, expires_delta = timedelta(hours=1))

  return jsonify ({
    "id": newUser.userId,
    "name": newUser.userName,
    "email": newUser.userEmail,
    "accessToken": accessToken
  }), 200
