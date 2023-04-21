import os
from dotenv import load_dotenv
import pandas as pd

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    POINTS = pd.DataFrame(
        index = ['Collaborate', 'Betray'], 
        columns = ['Collaborate', 'Betray'],
        data = [
            [5, -2],
            [2, 0]
        ]
    )   
    ROUNDS = 5