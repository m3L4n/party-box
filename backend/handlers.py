# handlers.py

from flask import Blueprint, jsonify, request
from random import shuffle, choice
from collections import Counter

from database import get_db
from models import Question

router = Blueprint("questions", __name__)

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


@router.route("/questions/fetch", methods=["POST"])
def fetch_questions():
    db = next(get_db())
    data = request.json

    user_list = data.get("users", [])
    mode_list = data.get("modes", [])

    questions = db.query(Question).filter(Question.mode.in_(mode_list)).all()

    unique_questions = []
    seen_contents = set()

    for q in questions:
        if q.content not in seen_contents:
            seen_contents.add(q.content)
            unique_questions.append(q)

    shuffle(unique_questions)
    selected_questions = unique_questions[:30]

    user_count = Counter()
    final_questions = []

    for q in selected_questions:
        user_placeholders = q.content.count("${user}")
        selected_users = []

        for _ in range(user_placeholders):
            min_count = min(user_count.values()) if user_count else 0
            eligible_users = [
                user for user in user_list if user_count[user] == min_count
            ]

            selected_user = choice(eligible_users)
            selected_users.append(selected_user)
            user_count[selected_user] += 1

        final_content = q.content
        for user in selected_users:
            final_content = final_content.replace("${user}", user, 1)

        final_questions.append(
            {
                "id": q.id,
                "mode": q.mode,
                "language": q.language,
                "content": final_content,
                "answer": q.answer,
            }
        )

    return jsonify(final_questions)
