import json
import pytest
from main import app
from database.database import db
from database.models.user import User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

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

def testLogin(client):
  # Crie um novo usuário para o teste
  userHashpassword = bcrypt.generate_password_hash('passwordUserLoginTest')

  user = User(userName='nomeUserLoginTest', userEmail='emailUserLoginTest@test.com', userPassword=userHashpassword)
  db.session.add(user)
  db.session.commit()

  # Faça uma solicitação de login
  response = client.post('/login', json={'userEmail': 'emailUserLoginTest@test.com', 'userPassword': 'passwordUserLoginTest'})

  # Verifique se a resposta é bem-sucedida
  assert response.status_code == 200

  # Verifique se o token de acesso foi retornado
  assert 'accessToken' in response.json

def testRegister(client):
  # Faça uma solicitação de registro
  response = client.post('/register', json={'userName': 'nomeUserRegisterTest', 'userEmail': 'emailUserRegisterTest@test.com', 'userPassword': 'passwordUserRegisterTest'})

  # Verifique se a resposta é bem-sucedida
  assert response.status_code == 200

  # Verifique se o token de acesso foi retornado
  assert 'accessToken' in response.json

  # Verifique se o usuário foi criado no banco de dados
  user = User.query.filter_by(userEmail='emailUserRegisterTest@test.com').first()
  assert user is not None
