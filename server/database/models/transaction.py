from database.database import db

class Transaction(db.Model):
    __tablename__ = 'transactions'
    transId = db.Column(db.Integer, primary_key = True)
    transName = db.Column(db.String, nullable = False)
    transUserId = db.Column(db.Integer, db.ForeignKey('user.userId'), nullable = False)
    transDate = db.Column(db.Date, nullable = False)
    transAmount = db.Column(db.Interger, nullable = False)
    transType = db.Column(db.Interger, db.foreignKey('category.catId'), nullable = False)

class category(db.Model):
    __tablename__ = 'categories'
    catId = db.Column(db.Integer, primary_key = True)
    catName = db.Column(db.String, nullable = False)