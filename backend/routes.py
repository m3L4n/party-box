from flask import Blueprint, jsonify, request
from database import get_db
from question_service import fetch_questions_by_mode, prepare_questions_for_game, get_question_by_id
from mode_service import get_available_modes

router = Blueprint("questions", __name__)

@router.route("/questions/fetch", methods=["POST"])
def fetch_questions():
    db = next(get_db())
    data = request.json
    user_list = data.get("users", [])
    mode_list = data.get("modes", [])
    language = data.get("language", "fr")
    
    questions = fetch_questions_by_mode(db, mode_list, language)
    final_questions = prepare_questions_for_game(questions, user_list)

    return jsonify(final_questions)

@router.route("/modes/<language>", methods=["GET"])
def get_modes(language):
    db = next(get_db())
    modes = get_available_modes(db, language)
    return jsonify(modes)

@router.route("/questions/<int:question_id>/like", methods=["POST"])
def like_question(question_id):
    db = next(get_db())
    question = get_question_by_id(db, question_id)

    question.score += 1
    db.commit()
    return jsonify({"message": "Liked", "new_score": question.score})

@router.route("/questions/<int:question_id>/dislike", methods=["POST"])
def dislike_question(question_id):
    db = next(get_db())
    question = get_question_by_id(db, question_id)

    question.score -= 1
    db.commit()
    return jsonify({"message": "Disliked", "new_score": question.score})
