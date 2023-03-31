from bank import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(64), index = True, unique = True)
    email = db.Column(db.String(128), unique = True)
    password = db.Column(db.String(128))
    account_number = db.Column(db.String(18))
    balance = db.Column(db.Integer)

    def __repr__(self):
        return '<User {}>'.format(self.username)