# main.py

from fastapi import FastAPI
from models import Base
from database import engine
from handlers import router as question_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(question_router)
