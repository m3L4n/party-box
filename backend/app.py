# app.py

import os
from flask import Flask
from models import Base
from database import engine
from routes import router
from config import mail

app = Flask(__name__)


class Config:
    MAIL_SERVER = os.getenv("MAIL_SERVER")
    MAIL_PORT = int(os.getenv("MAIL_PORT"))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS") == "True"
    MAIL_USE_SSL = os.getenv("MAIL_USE_SSL") == "True"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")


mail.init_app(app)
Base.metadata.create_all(bind=engine)
app.register_blueprint(router)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
