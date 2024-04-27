from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
from database.models.user import User
from database.models.transaction import Transaction, Type, Category
from database.database import db
from datetime import timedelta
from datetime import datetime
import json
userPageRoute = Blueprint('user', __name__)
bcrypt = Bcrypt()

@userPageRoute.route('/transaction', methods = ['GET','OPTIONS'])
@jwt_required()
def transaction():
  if request.method == 'OPTIONS':
    response = jsonify(message='OPTIONS request received')
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', '*')

    return response, 200
  
  tkUserId = get_jwt_identity()
  user = User.query.filter_by(userId=tkUserId).first()

  if not user:
    return jsonify(message='User not found'), 404

  transactions = Transaction.query.filter_by(transUserId=user.userId).all()

  # Convertendo as transações para um formato adequado
  transactions_data = [transaction.to_dict() for transaction in transactions]
  print(json.dumps(transactions_data, indent=2))

  return jsonify(transactions_data)

@userPageRoute.route('/transaction/new', methods = ['POST'])
@jwt_required()
def newTransaction():

  tkUserId = get_jwt_identity()

  name = request.json.get('name')
  userId = tkUserId
  date = datetime.strptime(request.json.get('date'), '%Y-%m-%d').date()
  amount = request.json.get('amount')
  type = request.json.get('type')
  category = request.json.get('category')

  transaction = Transaction(
     transName = name, 
     transUserId = userId, 
     transDate = date, 
     transAmount = amount, 
     transType = type, 
     transCategory = category)
  
  db.session.add(transaction)
  db.session.commit()

  return '',200

@userPageRoute.route('/type/new', methods = ['POST', 'GET','OPTIONS'])
def newType():
  if request.method == 'OPTIONS':
    response = jsonify(message='OPTIONS request received')
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response, 200
  
  if request.methods == 'GET':
     return jsonify({"nome": "Funcionou"})
  
  name = request.json.get('type')
  type = Type(typeName=name)  # Corrigido para typeType
  db.session.add(type)
  db.session.commit()
  return '', 200

@userPageRoute.route('/category/new', methods=['POST', 'OPTIONS'])
def newCategory():
    if request.method == 'OPTIONS':
        response = jsonify(message='OPTIONS request received')
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response, 200

    name = request.json.get('catName')  # Corrigido para pegar 'catName' do JSON
    category = Category(catName=name)
    db.session.add(category)
    db.session.commit()

    return jsonify({"message": "Categoria criada com sucesso"}), 200  # Retornando uma resposta JSON válida
