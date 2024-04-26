from database.database import db

class Category(db.Model):
    __tablename__ = 'category'
    catId = db.Column(db.Integer, primary_key = True)
    catName = db.Column(db.String, nullable = False)

class Type(db.Model):
    __tablename__ = 'type'
    typeId = db.Column(db.Integer, primary_key = True)
    typeName = db.Column(db.String, nullable = False)

class Transaction(db.Model):
    __tablename__ = 'transactions'
    transId = db.Column(db.Integer, primary_key = True)
    transName = db.Column(db.String, nullable = False)
    transUserId = db.Column(db.Integer, db.ForeignKey('user.userId'), nullable = False)
    transDate = db.Column(db.Date, nullable = False)
    transAmount = db.Column(db.Integer, nullable = False)
    transType = db.Column(db.Integer, db.ForeignKey('type.typeId'), nullable = False)
    transCategory = db.Column(db.Integer, db.ForeignKey('category.catId'), nullable = False)


