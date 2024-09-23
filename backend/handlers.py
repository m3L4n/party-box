from flask import Blueprint, jsonify, request
from random import shuffle, choice
from collections import Counter
from database import get_db
from models import Question

router = Blueprint("questions", __name__)

def fetch_all_questions(db, mode_list, language):
    """Fetches all questions from the database based on mode and language."""
    return db.query(Question).filter(Question.mode.in_(mode_list), Question.language == language).all()

def get_unique_questions(questions):
    """Removes duplicate questions based on their content."""
    unique_questions = []
    seen_contents = set()
    
    for q in questions:
        if q.content not in seen_contents:
            seen_contents.add(q.content)
            unique_questions.append(q)
    
    return unique_questions

def replace_user_placeholders(content, user_list, user_count):
    """Replaces the ${user} placeholders with users from the list."""
    user_placeholders = content.count("${user}")
    selected_users = []
    
    for _ in range(user_placeholders):
        min_count = min(user_count.values()) if user_count else 0
        eligible_users = [user for user in user_list if user_count[user] == min_count]
        selected_user = choice(eligible_users)
        selected_users.append(selected_user)
        user_count[selected_user] += 1

    for user in selected_users:
        content = content.replace("${user}", user, 1)
    
    return content

def replace_num_placeholders(content):
    """Replaces the ${num} placeholders with random numbers."""
    num_placeholders = content.count("${num}")
    
    for _ in range(num_placeholders):
        random_num = str(choice(range(1, 11)))
        if random_num == "10":
            random_num = "un shooter"
        content = content.replace("${num}", random_num, 1)
    
    return content

def prepare_final_questions(questions, user_list):
    """Prepares the final list of questions by replacing placeholders."""
    user_count = Counter()
    final_questions = []
    
    for q in questions:
        final_content = q.content
        
        # Replace ${user} placeholders
        final_content = replace_user_placeholders(final_content, user_list, user_count)
        
        # Replace ${num} placeholders
        final_content = replace_num_placeholders(final_content)
        
        final_questions.append({
            "id": q.id,
            "mode": q.mode,
            "language": q.language,
            "content": final_content,
            "answer": q.answer,
        })
    
    return final_questions

@router.route("/questions", methods=["GET"])
def get_questions():
    db = next(get_db())
    questions = db.query(Question).all()
    
    return jsonify([
        {
            "id": q.id,
            "mode": q.mode,
            "language": q.language,
            "content": q.content,
            "answer": q.answer,
        } for q in questions
    ])

@router.route("/questions/fetch", methods=["POST"])
def fetch_questions():
    db = next(get_db())
    data = request.json

    user_list = data.get("users", [])
    mode_list = data.get("modes", [])
    language = data.get("language", "fr")
    
    # Fetch and process questions
    questions = fetch_all_questions(db, mode_list, language)
    unique_questions = get_unique_questions(questions)
    
    # Shuffle and select 30 questions
    shuffle(unique_questions)
    selected_questions = unique_questions[:30]
    
    # Prepare final questions with replaced placeholders
    final_questions = prepare_final_questions(selected_questions, user_list)
    
    return jsonify(final_questions)