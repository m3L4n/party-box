from flask import Blueprint, jsonify, request
from database import get_db
from question_service import (
    fetch_questions_by_mode,
    prepare_questions_for_game,
    get_question_by_id,
    select_questions_balanced,
    get_already_asked_questions,
    save_questions_to_redis,
)
from mode_service import get_available_modes
from utils import generate_session_id


router = Blueprint("questions", __name__)


@router.route("/questions/fetch", methods=["POST"])
def fetch_questions():
    try:
        db = next(get_db())
        data = request.json
        user_list = data.get("users", [])
        mode_list = data.get("modes", [])
        language = data.get("language", "fr")

        session_id = data.get("session_id", generate_session_id())
        questions_by_mode = fetch_questions_by_mode(db, mode_list, language, session_id)
        selected_questions = select_questions_balanced(
            questions_by_mode, target_count=30
        )

        question_ids = [q.id for q in selected_questions]
        save_questions_to_redis(session_id, question_ids)

        final_questions = prepare_questions_for_game(selected_questions, user_list)
        return jsonify({"session_id": session_id, "questions": final_questions})

    except Exception as e:
        print(f"Erreur: {e}")
        return f"Une erreur est survenue: {e}", 500


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


@router.route("/test_redis")
def test_redis():
    session_id = request.args.get("session_id")
    if session_id:
        already_asked = get_already_asked_questions(session_id)
        if already_asked:
            return jsonify({"questions_already_asked": list(map(int, already_asked))})
        return "Aucune question posée pour cette session."
    return "Veuillez fournir un 'session_id'."
