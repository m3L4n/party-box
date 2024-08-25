# main.py
from flask import Flask
from models import Base
from database import engine
from handlers import router as question_router

app = Flask(__name__)

Base.metadata.create_all(bind=engine)

app.register_blueprint(question_router)

@app.route("/")
def hello():
    return {"message": "Hello World"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)