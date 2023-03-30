from bank import app

@app.route('/')
def main():
    return {
        "message": "Well done!"
    }