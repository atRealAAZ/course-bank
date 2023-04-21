from game import app 
from game.main.models import *
from game.authentication.models import User
from game.utils import *
from config import Config

from flask import request
from datetime import datetime
import numpy as np

letters = [i for i in 'abcdefghijklmnopqrstuvwxyz']
klinkers = ['a', 'e', 'i', 'o', 'u']
medeklinkers = [l for l in letters if l not in klinkers]

def gen_next_letter(letter, method):
    if letter in klinkers:
        if method == 'old':
            return np.random.choice(letters)
        else:
            return np.random.choice(medeklinkers)
    else:
        return np.random.choice(klinkers)
    
def generate_name(names = 1, method = 'new', entity = 'person'):
    name = ''
    for subname in range(names):
        length = np.random.randint(5, 12)
        first = np.random.choice(letters).upper()
        name += first
        iters = 1
        while iters < length:
            next_letter = gen_next_letter(name[-1], method)
            name += next_letter
            iters +=1 
        name += ' '
    if entity == 'party':
        return 'The ' + name[:-1]
    else:
        return name[:-1] 
    
class Player:

    def __init__(self, name):
        self.name = name
        self.points = 0

class Opponent:
    
    def __init__(self):
        self.name = self._generate_name()
        self.points = 0
       
    def _generate_name(self):
        nr_names = np.random.choice([2, 3])
        name = generate_name(nr_names, 'person')
        return name

class Intriguis:
    
    def __init__(self, name): 
        self.player = Player(name = name)
        self.opponent = Opponent()
        self.state = {
            "text": "Hi {}. You are playing {}. The goal is to choose whether to collaborate or betray every round. Choose!".format(self.player.name, self.opponent.name),
            "state": "playing",
            "round": 1
        }
        self.config = Config
        
    def play(self, times):
        for time in range(times):
            player_choice = input("Make your choice: Collaborate or Betray: ")
            opponent_choice = np.random.choice(['Collaborate', 'Betray']) 
            player_result, opponent_result = self._effects(player_choice, opponent_choice)
            self.player.points += player_result
            self.opponent.points += opponent_result
            print("You chose {} while {} chose {}. You get {} and {} gets {}".format(
                  player_choice, self.opponent.name, opponent_choice,
                  player_result, self.opponent.name, opponent_result
            ))
        if self.player.points > self.opponent.points:
            print("Congratulations! You won with {} to {}!".format(
                self.player.points, self.opponent.points))
        else:
            print("You lost! You had {} versus {}. Go lick your wounds!".format(
                self.player.points, self.opponent.points))      
            
    def _effects(self, player_choice, opponent_choice):
        player_points = self.config.POINTS.loc[player_choice, opponent_choice]
        opponent_points = self.config.POINTS.loc[opponent_choice, player_choice]
        return player_points, opponent_points
    
    def next_move(self, choice):
        player_choice = choice
        opponent_choice = np.random.choice(['Collaborate', 'Betray']) 
        player_result, opponent_result = self._effects(player_choice, opponent_choice)
        self.player.points += player_result
        self.opponent.points += opponent_result
        text = "You chose {} while {} chose {}. You get {} and {} gets {}".format(
            player_choice, self.opponent.name, opponent_choice,
            player_result, self.opponent.name, opponent_result
        )
        self.state['text'] = text
        self.state['round'] +=1 
        if self.state['round'] >= self.config.ROUNDS:
            self.state['state'] = 'Game Over'
            if self.player.points > self.opponent.points:
                text = "Congratulations! You won with {} to {}!".format(
                    self.player.points, self.opponent.points)
                self.state['text'] = text
            else:
                text = "You lost! You had {} versus {}. Go lick your wounds!".format(
                    self.player.points, self.opponent.points)
                self.state['text'] = text     
        
@app.route('/start_game', methods = ['GET', 'POST'])
def start_game():
    name = request.get_json()['username']
    i = Intriguis(name)
    app.game = i
    print(i.state)
    return i.state

@app.route('/continue_game', methods = ['GET', 'POST'])
def continue_game():
    choice = request.get_json()['choice']
    print(choice)
    app.game.next_move(choice)
    return app.game.state
            
