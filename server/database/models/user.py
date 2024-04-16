from database.database import db

class User(db.Model):
  _tablename__ = 'users'
  userId = db.Column(db.Integer, primary_key = True) 
  userName = db.Column(db.String, nullable = False)
  userEmail = db.Column(db.String, unique = True, nullable = False)
  userPassword =db.Column(db.String, nullable = False)