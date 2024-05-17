from database.models.transaction import Transaction, Type, Category, Cicle
from datetime import date

def testNewType():
  type = Type()
  type.typeName = 'nomeTypeTest'
  type.typeUserId = 1

  assert type.typeName == 'nomeTypeTest'
  assert type.typeUserId == 1

def testNewcategory():
  category = Category()
  category.categoryName = 'nomeCategoryTest'
  category.categoryUserId = 1

  assert category.categoryName == 'nomeCategoryTest'
  assert category.categoryUserId == 1

def testNewcicle():
  cicle = Cicle()
  cicle.cicleName = 'nomeCicleTest'
  cicle.cicleUserId = 1

  assert cicle.cicleName == 'nomeCicleTest'
  assert cicle.cicleUserId == 1

def testNewTransaction():
  transaction = Transaction()
  transaction.transId = 1
  transaction.transName = 'nomeTransactionTest'
  transaction.transUserId = 1
  transaction.transDate = date(2024, 10, 17)
  transaction.transAmount = '500'
  transaction.transType = 1
  transaction.transCategory = 1
  transaction.transCicle = 1

  assert transaction.transId == 1
  assert transaction.transName == 'nomeTransactionTest'
  assert transaction.transUserId == 1
  assert transaction.transDate == date(2024, 10, 17)
  assert transaction.transAmount == '500'
  assert transaction.transType == 1
  assert transaction.transCategory == 1
  assert transaction.transCicle == 1

