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
    return jsonify(
        [
            {
                "id": q.id,
                "mode": q.mode,
                "language": q.language,
                "content": q.content,
                "answer": q.answer,
            }
            for q in questions
        ]
    )


@router.route("/questions/<language>", methods=["GET"])
def get_questions_by_language(language):
    db = next(get_db())
    questions = db.query(Question).filter(Question.language == language).all()
    return jsonify(
        [
            {
                "id": q.id,
                "mode": q.mode,
                "language": q.language,
                "content": q.content,
                "answer": q.answer,
            }
            for q in questions
        ]
    )


@router.route("/questions/<language>/<mode>", methods=["GET"])
def get_questions_by_language_mode(language, mode):
    db = next(get_db())
    questions = (
        db.query(Question)
        .filter(Question.language == language, Question.mode == mode)
        .all()
    )
    return jsonify(
        [
            {
                "id": q.id,
                "mode": q.mode,
                "language": q.language,
                "content": q.content,
                "answer": q.answer,
            }
            for q in questions
        ]
    )


@router.route("/questions/mode", methods=["GET"])
def get_mode():
    db = next(get_db())
    questions = db.query(Question).all()
    mode_list = []
    for q in questions:
        if q.mode not in mode_list:
            mode_list.append(q.mode)
    return jsonify(mode_list)
