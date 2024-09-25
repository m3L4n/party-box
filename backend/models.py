# models.py

from sqlalchemy import Column, Integer, String
from database import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    mode = Column(String(50))
    type = Column(String(50))
    language = Column(String(50))
    content = Column(String(250))
    answer = Column(String(250))
    score = Column(Integer, default=0)