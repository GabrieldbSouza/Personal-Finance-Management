import pytest
from main import app
from database.models.transaction import Transaction, Type, Category, Cicle
from database.database import db
from flask_jwt_extended import create_access_token
from datetime import datetime
@pytest.fixture
def client():
    with app.test_client() as client:
        with app.app_context():
            yield client

@pytest.fixture(autouse=True)
def cleanup_db():
    # Antes de cada teste, limpe o banco de dados
    with app.app_context():
        db.drop_all()
        db.create_all()
        yield
        db.session.rollback()

def testTransactionNew(client):
    # Crie um novo usuário para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)

    # Faça uma solicitação para criar uma nova transação
    response = client.post('/user/transaction/new', json={
        'transName': 'Nova transação',
        'transDate': '2024-05-04',
        'transAmount': 100,
        'transCategory': 1,
        'transType': 1,
        'transCicle': 1
    }, headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se a transação foi criada no banco de dados
    transaction = Transaction.query.filter_by(transUserId=userId).first()
    assert transaction is not None

def testTransactionUpdate(client):
    # Crie um novo usuário e uma transação para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)

    transaction = Transaction(transUserId=userId, transName='Transação',transDate=datetime.strptime('2024-05-04', '%Y-%m-%d').date()
, transAmount=100, transCategory=1, transType=1, transCicle=1)
    db.session.add(transaction)
    db.session.commit()

    # Faça uma solicitação para atualizar a transação
    response = client.put('/user/transaction/update', json={
        'transId': transaction.transId,
        'transName': 'Transação atualizada',
        'transDate': '2024-05-05',
        'transAmount': 200,
        'transCategory': 2,
        'transType': 2,
        'transCicle': 2
    }, headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se a transação foi atualizada no banco de dados
    updated_transaction = db.session.get(Transaction, transaction.transId)
    assert updated_transaction.transName == 'Transação atualizada'
    assert str(updated_transaction.transDate) == '2024-05-05'
    assert updated_transaction.transAmount == 200
    assert updated_transaction.transCategory == 2
    assert updated_transaction.transType == 2
    assert updated_transaction.transCicle == 2

def testTransactionDelete(client):
    # Crie um novo usuário e uma transação para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)    
    
    transaction = Transaction(transUserId=userId, transName='Transação',transDate=datetime.strptime('2024-05-04', '%Y-%m-%d').date()
, transAmount=100, transCategory=1, transType=1, transCicle=1)
    
    db.session.add(transaction)
    db.session.commit()

    # Faça uma solicitação para excluir a transação
    response = client.delete('/user/transaction/delete', json={'transId': transaction.transId},
                             headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se a transação foi excluída do banco de dados
    deleted_transaction = db.session.get(Transaction, transaction.transId)
    assert deleted_transaction is None

def testTransaction(client):
    # Crie um novo usuário e uma transação para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)    
    
    transaction = Transaction(transUserId=userId, transName='Transação',transDate=datetime.strptime('2024-05-04', '%Y-%m-%d').date()
, transAmount=100, transCategory=1, transType=1, transCicle=1)
    
    db.session.add(transaction)
    db.session.commit()

    # Faça uma solicitação para obter detalhes da transação
    response = client.get('/user/transaction', json={'transId': 1},
                             headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se os detalhes da transação estão corretos na resposta
    transaction_data = response.json
    assert transaction_data['transId'] == 1
    assert transaction_data['transName'] == 'Transação'
    assert transaction_data['transDate'] == '2024-05-04 00:00:00'
    assert transaction_data['transAmount'] == 100
    assert transaction_data['transCategory'] == 1
    assert transaction_data['transType'] == 1
    assert transaction_data['transCicle'] == 1

def testTransactions(client):
    # Crie um novo usuário e algumas transações para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)    

    transactions = [
        Transaction(transUserId=userId, transName=f'Transação {i}', transDate=datetime.strptime('2024-05-04', '%Y-%m-%d').date(), transAmount=100.0,
                    transCategory=1, transType=1, transCicle=1) for i in range(3)
    ]
    db.session.add_all(transactions)
    db.session.commit()

    # Faça uma solicitação para obter todas as transações
    response = client.get('/user/transactions',
                          headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se todas as transações estão presentes na resposta
    transaction_data = response.json

    for i, transaction_dict in enumerate(transaction_data):
        expected_transaction = transactions[i]

        assert transaction_dict['transUserId'] == expected_transaction.transUserId
        assert transaction_dict['transName'] == f'Transação {i}'  # Correção do nome da transação
        assert transaction_dict['transDate'] == '2024-05-04 00:00:00'
        assert transaction_dict['transAmount'] == 100.0
        assert transaction_dict['transCategory'] == 1  # Correção da categoria para ser um número, não uma string
        assert transaction_dict['transType'] == 1
        assert transaction_dict['transCicle'] == 1

def testTransactionFromDate(client):
    # Crie um novo usuário e algumas transações para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)    

    transactions = [
        Transaction(transUserId=userId, transName=f'Transação {i}', transDate=datetime.strptime('2024-05-04', '%Y-%m-%d').date(), transAmount=100.0,
                    transCategory=1, transType=1, transCicle=1) for i in range(3)
    ]
    db.session.add_all(transactions)
    db.session.commit()

    # Faça uma solicitação para obter transações a partir de uma data específica
    response = client.get('/user/transaction/from/date', json={'transDate': '2024-05-04'},
                          headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se todas as transações estão presentes na resposta
    transaction_data = response.json
    print("Transações retornadas:", response.json)

    assert len(transaction_data) == 3

    for i, transaction_dict in enumerate(transaction_data):
        expected_transaction = transactions[i]

        assert transaction_dict['transUserId'] == expected_transaction.transUserId
        assert transaction_dict['transName'] == f'Transação {i}' 
        assert transaction_dict['transDate'] == '2024-05-04 00:00:00'
        assert transaction_dict['transAmount'] == 100.0
        assert transaction_dict['transCategory'] == 1  
        assert transaction_dict['transType'] == 1
        assert transaction_dict['transCicle'] == 1

def testTransactionToDate(client):
    # Crie um novo usuário e algumas transações para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)    

    transactions = [
        Transaction(transUserId=userId, transName=f'Transação {i}', transDate=datetime.strptime('2024-05-04', '%Y-%m-%d').date(), transAmount=100.0,
                    transCategory=1, transType=1, transCicle=1) for i in range(3)
    ]
    db.session.add_all(transactions)
    db.session.commit()

    # Faça uma solicitação para obter transações até uma data específica
    response = client.get('/user/transaction/to/date', json={'transDate': '2024-05-05'},
                          headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se todas as transações estão presentes na resposta
    transaction_data = response.json
    assert len(transaction_data) == 3

    for i, transaction_dict in enumerate(transaction_data):
        expected_transaction = transactions[i]

        assert transaction_dict['transUserId'] == expected_transaction.transUserId
        assert transaction_dict['transName'] == f'Transação {i}'  
        assert transaction_dict['transDate'] == '2024-05-04 00:00:00'
        assert transaction_dict['transAmount'] == 100.0
        assert transaction_dict['transCategory'] == 1  
        assert transaction_dict['transType'] == 1
        assert transaction_dict['transCicle'] == 1

def testTransactionBetweenDate(client):
    # Crie um novo usuário e algumas transações para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)    

    transactions = [
        Transaction(transUserId=userId, transName=f'Transação {i}', transDate=datetime.strptime('2024-05-04', '%Y-%m-%d').date(), transAmount=100.0,
                    transCategory=1, transType=1, transCicle=1) for i in range(3)
    ]
    db.session.add_all(transactions)
    db.session.commit()

    # Faça uma solicitação para obter transações entre duas datas específicas
    response = client.get('/user/transaction/between/datefrom/dateto',
                          json={'dateFrom': '2024-05-01', 'dateTo': '2024-05-07'},
                          headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se todas as transações estão presentes na resposta
    transaction_data = response.json
    assert len(transaction_data) == 3

    for i, transaction_dict in enumerate(transaction_data):
        expected_transaction = transactions[i]

        assert transaction_dict['transUserId'] == expected_transaction.transUserId
        assert transaction_dict['transName'] == f'Transação {i}'  
        assert transaction_dict['transDate'] == '2024-05-04 00:00:00'
        assert transaction_dict['transAmount'] == 100.0
        assert transaction_dict['transCategory'] == 1  
        assert transaction_dict['transType'] == 1
        assert transaction_dict['transCicle'] == 1

def testTransactionTypeNew(client):
    # Faça uma solicitação para criar um novo tipo de transação
    userId = 1
    accessToken = create_access_token(identity=userId)    

    response = client.post('/user/transaction/type/new', json={'typeName': 'Tipo de Transação'},
                           headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se o tipo de transação foi criado no banco de dados
    assert Type.query.filter_by(typeName='Tipo de Transação').first() is not None

def testTransactionCategoryNew(client):
    # Faça uma solicitação para criar uma nova categoria de transação
    userId = 1
    accessToken = create_access_token(identity=userId)    

    response = client.post('/user/transaction/category/new', json={'categoryName': 'Categoria de Transação'},
                           headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se a categoria de transação foi criada no banco de dados
    assert Category.query.filter_by(categoryName='Categoria de Transação').first() is not None

def testTransactionCicleNew(client):
    # Faça uma solicitação para criar um novo ciclo de transação
    userId = 1
    accessToken = create_access_token(identity=userId)    

    response = client.post('/user/transaction/cicle/new', json={'cicleName': 'Ciclo de Transação'},
                           headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se o ciclo de transação foi criado no banco de dados
    assert Cicle.query.filter_by(cicleName='Ciclo de Transação').first() is not None

def testTransactionCategories(client):
    # Crie algumas categorias de transação para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)

    categories = [
        Category(categoryUserId=userId, categoryName=f'Categoria {i}') for i in range(3)
    ]
    db.session.add_all(categories)
    db.session.commit()

    # Faça uma solicitação para obter todas as categorias de transação
    response = client.get('/user/transaction/categories',
                          headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se todas as categorias estão presentes na resposta
    category_data = response.json
    assert len(category_data) == 3

    for i, category_dict in enumerate(category_data):
        expected_category = categories[i]

        assert category_dict['categoryId'] == expected_category.categoryId
        assert category_dict['categoryName'] == f'Categoria {i}'

def testTransactionTypes(client):
    # Crie alguns tipos de transação para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)

    types = [
        Type(typeUserId=userId, typeName=f'Tipo {i}') for i in range(1, 4)
    ]
    db.session.add_all(types)
    db.session.commit()

    # Faça uma solicitação para obter todos os tipos de transação
    response = client.get('/user/transaction/types',
                          headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se todos os tipos estão presentes na resposta
    type_data = response.json
    assert len(type_data) == 3

    for i, type_dict in enumerate(type_data):
        expected_type = types[i]

        assert type_dict['typeId'] == expected_type.typeId
        assert type_dict['typeName'] == f'Tipo {i + 1}'

def testTransactionCicles(client):
    # Crie alguns ciclos de transação para o teste
    userId = 1
    accessToken = create_access_token(identity=userId)

    cicles = [
        Cicle(cicleUserId=userId, cicleName=f'Ciclo {i}') for i in range(1, 4)
    ]
    db.session.add_all(cicles)
    db.session.commit()

    # Faça uma solicitação para obter todos os ciclos de transação
    response = client.get('/user/transaction/cicles',
                          headers={'Authorization': f'Bearer {accessToken}', 'Content-Type': 'application/json'})

    # Verifique se a resposta é bem-sucedida
    assert response.status_code == 200

    # Verifique se todos os ciclos estão presentes na resposta
    cicle_data = response.json
    assert len(cicle_data) == 3

    for i, cicle_dict in enumerate(cicle_data):
        expected_cicle = cicles[i]

        assert cicle_dict['cicleId'] == expected_cicle.cicleId
        assert cicle_dict['cicleName'] == f'Ciclo {i + 1}'


        