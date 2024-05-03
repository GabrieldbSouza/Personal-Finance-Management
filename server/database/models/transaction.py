from database.database import db

class Category(db.Model):
    __tablename__ = 'category'
    categoryId = db.Column(db.Integer, primary_key = True)
    categoryUserId = db.Column(db.Integer, db.ForeignKey('user.userId'), nullable = False)
    categoryName = db.Column(db.String, nullable = False)

class Type(db.Model):
    __tablename__ = 'type'
    typeId = db.Column(db.Integer, primary_key = True)
    typeUserId = db.Column(db.Integer, db.ForeignKey('user.userId'), nullable = False)
    typeName = db.Column(db.String, nullable = False)

class Cicle(db.Model):
    __tablename__ = 'cicle'
    cicleId = db.Column(db.Integer, primary_key = True)
    cicleUserId = db.Column(db.Integer, db.ForeignKey('user.userId'), nullable = False)
    cicleName = db.Column(db.String, nullable = False)

class Transaction(db.Model):
    __tablename__ = 'transactions'
    transId = db.Column(db.Integer, primary_key = True)
    transName = db.Column(db.String, nullable = False)
    transUserId = db.Column(db.Integer, db.ForeignKey('user.userId'), nullable = False)
    transDate = db.Column(db.Date, nullable = False)
    transAmount = db.Column(db.Integer, nullable = False)
    transType = db.Column(db.Integer, db.ForeignKey('type.typeId'), nullable = False)
    transCategory = db.Column(db.Integer, db.ForeignKey('category.categoryId'), nullable = False)
    transCicle = db.Column(db.Integer, db.ForeignKey('cicle.cicleId'), nullable = False)
