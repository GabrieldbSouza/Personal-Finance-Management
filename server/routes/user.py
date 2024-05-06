from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from database.models.transaction import Transaction, Type, Category, Cicle
from database.database import db

userPageRoute = Blueprint('user', __name__)

def handleOptions():
  response = jsonify(message='OPTIONS request received')
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', '*')
  response.headers.add('Access-Control-Allow-Methods', '*')
  
  return response, 200

@userPageRoute.route('/transaction/new', methods = ['POST'])
@jwt_required()
def transactionNew(): # Cria uma nova transação
  
  if request.method == 'OPTIONS':
    return handleOptions()
  
  userId = get_jwt_identity()
  transName = request.json.get('transName')
  transDate = datetime.strptime(request.json.get('transDate'), '%Y-%m-%d').date()
  transAmount = request.json.get('transAmount')
  transCategory = request.json.get('transCategory')
  transType = request.json.get('transType')
  transCicle = request.json.get('transCicle')

  transactionNew = Transaction(
    transUserId = userId,
    transName = transName,
    transDate = transDate,
    transAmount = transAmount,
    transCategory = transCategory,
    transType = transType,
    transCicle = transCicle
  )

  db.session.add(transactionNew)
  db.session.commit()

  return jsonify({"mensagem": "Transação criada com sucesso."}), 200
  
@userPageRoute.route('/transaction/update', methods = ['PUT'])
@jwt_required()
def transactionUpdate(): # Atualiza uma nova transação 

  if request.method == 'OPTIONS':
    return handleOptions()
  
  userId = get_jwt_identity()
  transId = request.json.get('transId')

  transactionUpdate = Transaction.query.filter_by(transId = transId, transUserId = userId).first()

  transactionUpdate.transName = request.json.get('transName')
  transactionUpdate.transDate = datetime.strptime(request.json.get('transDate'), '%Y-%m-%d').date()
  transactionUpdate.transAmount = request.json.get('transAmount')
  transactionUpdate.transCategory = request.json.get('transCategory')
  transactionUpdate.transType = request.json.get('transType')
  transactionUpdate.transCicle = request.json.get('transCicle')

  db.session.commit()

  return jsonify({"menssagem": "Transação atualizada com sucesso."}), 200
  
@userPageRoute.route('/transaction/delete', methods = ['DELETE'])
@jwt_required()
def transactionDelete(): # Apaga uma transação

  if request.method == 'OPTIONS':
    return handleOptions()
  
  userId = get_jwt_identity()
  transId = request.json.get('transId')

  transactionDelete = Transaction.query.filter_by(transId = transId, transUserId = userId).first()

  db.session.delete(transactionDelete)
  db.session.commit()

  return jsonify({"mensagem": "Transação apagada com sucesso."})
  
@userPageRoute.route('/transaction', methods = ['GET'])
@jwt_required()
def transaction(): # Retorna uma transação

  if request.method == 'OPTIONS':
    return handleOptions()
   
  userId = get_jwt_identity()
  transId = request.json.get('transId')

  transaction = Transaction.query.filter_by(transId = transId, transUserId = userId).first()

  transactionData = {
    'transUserId': transaction.transUserId,
    'transId': transaction.transId,
    'transName': transaction.transName,
    'transDate': transaction.transDate.strftime('%Y-%m-%d %H:%M:%S'),  # Converte para string no formato desejado
    'transAmount': transaction.transAmount,
    'transCategory': transaction.transCategory,
    'transType': transaction.transType,
    'transCicle': transaction.transCicle
  }

  return jsonify(transactionData)

@userPageRoute.route('/transactions', methods = ['GET', 'OPTIONS'])
@jwt_required()
def transactions(): # Retorna todas as transações

  if request.method == 'OPTIONS':
    return handleOptions()
    
  userId = get_jwt_identity()
  
  transactions = Transaction.query.filter_by(transUserId = userId).all()

  transactionData = []

  for transaction in transactions:

    transactionData.append ({
      'transUserId': transaction.transUserId,
      'transId': transaction.transId,
      'transName': transaction.transName,
      'transDate': transaction.transDate.strftime('%Y-%m-%d %H:%M:%S'),  
      'transAmount': transaction.transAmount,
      'transCategory': transaction.transCategory,
      'transType': transaction.transType,
      'transCicle': transaction.transCicle
    })

  return jsonify(transactionData)

@userPageRoute.route('/transaction/from/date', methods = ['GET'])
@jwt_required()
def transactionFromDate(): # Retorna todas as transações a partir de uma data

  if request.method == 'OPTIONS':
    return handleOptions()
    
  userId = get_jwt_identity()
  date = datetime.strptime(request.json.get('transDate'), '%Y-%m-%d').date()

  transactions = Transaction.query.filter((Transaction.transUserId == userId) & (Transaction.transDate >= date)).all()

  transactionData = []

  for transaction in transactions:    
    transactionData.append ({
      'transUserId': transaction.transUserId,
      'transId': transaction.transId,
      'transName': transaction.transName,
      'transDate': transaction.transDate.strftime('%Y-%m-%d %H:%M:%S'),  # Converte para string no formato desejado
      'transAmount': transaction.transAmount,
      'transCategory': transaction.transCategory,
      'transType': transaction.transType,
      'transCicle': transaction.transCicle
    })

  return jsonify(transactionData)

@userPageRoute.route('/transaction/to/date', methods = ['GET'])
@jwt_required()
def transactionToDate(): # Retorna todas as transações até uma data

  if request.method == 'OPTIONS':
    return handleOptions()
    
  userId = get_jwt_identity()
  date = datetime.strptime(request.json.get('transDate'), '%Y-%m-%d').date()

  transactions = Transaction.query.filter((Transaction.transUserId == userId) & (Transaction.transDate <= date)).all()

  transactionData = []

  for transaction in transactions:    
    transactionData.append ({
      'transUserId': transaction.transUserId,
      'transId': transaction.transId,
      'transName': transaction.transName,
      'transDate': transaction.transDate.strftime('%Y-%m-%d %H:%M:%S'),  # Converte para string no formato desejado
      'transAmount': transaction.transAmount,
      'transCategory': transaction.transCategory,
      'transType': transaction.transType,
      'transCicle': transaction.transCicle
    })

  return jsonify(transactionData)
  
@userPageRoute.route('/transaction/between/datefrom/dateto', methods = ['GET'])
@jwt_required()
def transactionBetweenDate(): # Retorna todas as transações entre duas datas

  if request.method == 'OPTIONS':
    return handleOptions()
    
  userId = get_jwt_identity()
  dateFrom = datetime.strptime(request.json.get('dateFrom'), '%Y-%m-%d').date()
  dateTo = datetime.strptime(request.json.get('dateTo'), '%Y-%m-%d').date()

  transactions = Transaction.query.filter((Transaction.transUserId == userId) & (Transaction.transDate >= dateFrom) & (Transaction.transDate <= dateTo)).all()

  transactionData = []

  for transaction in transactions:
    
    transactionData.append ({
      'transUserId': transaction.transUserId,
      'transId': transaction.transId,
      'transName': transaction.transName,
      'transDate': transaction.transDate.strftime('%Y-%m-%d %H:%M:%S'),  # Converte para string no formato desejado
      'transAmount': transaction.transAmount,
      'transCategory': transaction.transCategory,
      'transType': transaction.transType,
      'transCicle': transaction.transCicle
    })

  return jsonify(transactionData)

@userPageRoute.route('/transaction/type/new', methods = ['POST'])
@jwt_required()
def transactionType():
  
  if request.method == 'OPTIONS':
    return handleOptions()
    
  userId = get_jwt_identity()
  typeName = request.json.get('typeName')

  typeNew = Type(
    typeUserId = userId,
    typeName = typeName
  )

  db.session.add(typeNew)
  db.session.commit()

  return jsonify({"mensagem": "Tipo de transação criada com sucesso."}), 200

@userPageRoute.route('/transaction/category/new', methods = ['POST'])
@jwt_required()
def transactionCategory():
  
  if request.method == 'OPTIONS':
    return handleOptions()
    
  userId = get_jwt_identity()
  categoryName = request.json.get('categoryName')

  categoryNew = Category(
    categoryUserId = userId,
    categoryName = categoryName
  )

  db.session.add(categoryNew)
  db.session.commit()

  return jsonify({"mensagem": "Categoria de transação criada com sucesso."}), 200

@userPageRoute.route('/transaction/cicle/new', methods = ['POST', 'OPTIONS'])
@jwt_required()
def transactionCicle():
  
  if request.method == 'OPTIONS':
    return handleOptions()
  
  userId = get_jwt_identity()
  cicleName = request.json.get('cicleName') 
  
  cicleNew = Cicle(
    cicleUserId = userId,
    cicleName = cicleName
  )

  db.session.add(cicleNew)
  db.session.commit()

  return jsonify({"mensagem": "Ciclo de transação criada com sucesso."}), 200

@userPageRoute.route('/transaction/categories', methods=['GET', 'OPTIONS'])
@jwt_required()
def categories():
  
  if request.method == 'OPTIONS':
    return handleOptions()

  userId = get_jwt_identity()

  categories = Category.query.filter_by(categoryUserId = userId).all()

  categoryData = []

  for category in categories:
    categoryData.append({
      'categoryId': category.categoryId,
      'categoryName': category.categoryName
    })

  return jsonify(categoryData)

@userPageRoute.route('/transaction/types', methods=['GET', 'OPTIONS'])
@jwt_required()
def types():
  
  if request.method == 'OPTIONS':
    return handleOptions()

  userId = get_jwt_identity()

  types = Type.query.filter_by(typeUserId = userId).all()

  typeData = []

  for type in types:
    typeData.append({
      'typeId': type.typeId,
      'typeName': type.typeName  # Adicione os atributos desejados aqui
    })

  return jsonify(typeData)

@userPageRoute.route('/transaction/cicles', methods=['GET', 'OPTIONS'])
@jwt_required()
def cicles():
  
  if request.method == 'OPTIONS':
    return handleOptions()

  userId = get_jwt_identity()

  cicles = Cicle.query.filter_by(cicleUserId = userId).all()

  cicleData = []

  for cicle in cicles:
    cicleData.append({
      'cicleId': cicle.cicleId,
      'cicleName': cicle.cicleName  # Adicione os atributos desejados aqui
    })

  return jsonify(cicleData)
