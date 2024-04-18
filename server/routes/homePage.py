from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from database.models.user import User
from database.database import db

homePageRoute = Blueprint('home', __name__)
bcrypt = Bcrypt()

@homePageRoute.route('/')
def home():
  pass

@homePageRoute.route('/login', methods = ['POST', 'OPTIONS'])
def login():
  if request.method == 'OPTIONS':
    return '', 200 
  email = request.json.get('email')
  password = request.json.get('password')
  print(email,password)
  user = User.query.filter_by(userEmail = email).first()

  if user is None:
    print("sem email")
    return "<erro>"
  
  if not bcrypt.check_password_hash(user.userPassword, password):
    print("bdbdbd")
    return "<erro>"
  accessToken = create_access_token(identity = email)
  return jsonify({
    "email": email,
    "accessToken": accessToken
  }), 200

@homePageRoute.route('/register', methods = ['POST', 'OPTIONS'])
def register():
  if request.method == 'OPTIONS':
    return '', 200
  name = request.json.get('name')
  email = request.json.get('email')
  password = request.json.get('password')


  if User.query.filter_by(userEmail=email).first() is not None:
    print("error")
    return "console.log('error')"

  newUser = User(userName = name, userEmail = email, userPassword = bcrypt.generate_password_hash(password))

  db.session.add(newUser)
  db.session.commit()

  accessToken = create_access_token(identity = email)

  return jsonify ({
    "id": newUser.userId,
    "name": newUser.userName,
    "email": newUser.userEmail,
    "accessToken": accessToken
  }), 200
