from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from database.models.user import User
from database.models.transaction import Transaction, Type, Category
from database.database import db
from datetime import timedelta

userPageRoute = Blueprint('user', __name__)
bcrypt = Bcrypt()

@userPageRoute.route('/transaction', methods = ['GET', 'POST'])
def transaction():
  userId = request.json.get('userId')

  transactions = User.transactions

  return jsonify(transaction.to_dict() for transaction in transactions)

@userPageRoute.route('/transaction/new', methods = ['POST'])
def newTransaction():
  name =  request.json.get('name')
  userId =  request.json.get('userId')
  date =  request.json.get('date')
  amount =  request.json.get('amount')
  type =  request.json.get('type')
  category =  request.json.get('category')

  transaction = Transaction(transName = name, transUserId = userId, transDate = date, transAmount = amount, transType = type, transCategory = category)
  
  db.session.add(transaction)
  db.session.commit()

  return 200

@userPageRoute.route('/type/new', methods = ['POST'])
def newType():
    name =  request.json.get('name')
    type = Type(typeName = name)
    db.session.add(type)
    db.session.commit()
    return 200

@userPageRoute.route('/category/new', methods = ['POST'])
def newCategory():
   name =  request.json.get('name')
   category = Category(catName = name)
   db.session.add(category)
   db.session.commit()
   return 200