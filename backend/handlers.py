# handlers.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/")
def read_root():
    return {"Hello": "World"}


# from models import Question
# from database import get_db


# @router.get("/api/questions")
# def get_questions(db: Session = Depends(get_db)):
#     return db.query(Question).all()


# @router.get("/api/questions/{id}")
# def get_question(id: int, db: Session = Depends(get_db)):
#     question = db.query(Question).filter(Question.id == id).first()
#     if question is None:
#         raise HTTPException(status_code=404, detail="Question not found")
#     return question


# @router.get("/api/questions/{mode}/{language}")
# def get_questions_by_mode_and_language(
#     mode: str, language: str, db: Session = Depends(get_db)
# ):
#     return (
#         db.query(Question)
#         .filter(Question.mode == mode, Question.language == language)
#         .all()
#     )
