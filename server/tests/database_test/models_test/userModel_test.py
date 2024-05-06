from database.models.user import User

def testNewUser():
  user = User()
  user.userName = 'nomeUserTest'
  user.userEmail = 'emailUserTest@test.com'
  user.userPassword = 'passwordUserTest'

  assert user.userName == 'nomeUserTest'
  assert user.userEmail == 'emailUserTest@test.com'
  assert user.userPassword == 'passwordUserTest'
