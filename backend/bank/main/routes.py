from bank import app 
from bank.main.models import *
from bank.authentication.models import User
from bank.utils import *

from flask import request
from datetime import datetime

def validate_transaction(
    username, 
    transaction_details
):
    amount, to_account, currency = transaction_details.values()
    try:
        amount = int(amount)
    except:
        return False, "Invalid amount."
    user = User.query.filter_by(username = username).first()
    to_account_query = User.query.filter_by(account_number = to_account).first()
    if to_account_query == None:
        return False, "Account does not exist!"
    if to_account == user.account_number:
        return False, "You cannot send money to yourself, fool."
    elif amount == '' or int(amount) == 0:
        return False, "Amount can't be 0."
    elif amount > user.balance:
        return False, "Nice try, but you don't have enough money!"
    elif currency != "EUR" and currency != "USD":
        return False, "Transaction in currency {} not supported.".format(currency)
    else:
        return True, "Transaction sent!"

def add_tx_to_db(
    username, 
    transaction_details, 
):
    amount, to_account, currency = transaction_details.values()
    amount = int(amount)
    user_sender = User.query.filter_by(username = username).first()
    user_receiver = User.query.filter_by(account_number = to_account).first()
    today = datetime.strftime(datetime.today(), "%d-%m-%Y")
    tx = Transaction(
        from_account = user_sender.account_number,
        to_account = to_account,
        amount = amount, 
        currency = currency, 
        date = today
    )
    user_sender.balance -= amount
    user_receiver.balance += amount
    db.session.add_all(
        [
            tx,
            user_sender, 
            user_receiver
        ]
    )
    db.session.commit()

@app.route('/send_transaction', methods = ['GET', 'POST'])
def send_transaction():
    message = request.get_json()
    print(message)
    username = message['username']
    transaction_details = message['transactionDetails']
    validated, validation_msg = validate_transaction(
        username, transaction_details
    )
    if validated:
        add_tx_to_db(
            username, transaction_details
        )
    result = gen_result_dict(
        result = validated,
        message = validation_msg
    )
    print(validation_msg)
    return result