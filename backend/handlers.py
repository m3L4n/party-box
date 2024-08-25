# handlers.py

from flask import Blueprint, jsonify

from database import get_db
from models import Question

router = Blueprint("questions", __name__)

@router.route("/")
def read_root():
    return jsonify({"message": "Hello World"})

@router.route("/questions", methods=["GET"])
def get_questions():
    db = next(get_db())
    questions = db.query(Question).all()
    return jsonify([{
        "id": q.id,
        "mode": q.mode,
        "language": q.language,
        "content": q.content,
        "answer": q.answer
    } for q in questions])

