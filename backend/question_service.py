from random import choice
from collections import Counter
from models import Question


def fetch_questions_by_mode(db, mode_list, language):
    return db.query(Question).filter(Question.mode.in_(mode_list), Question.language == language).all()

def get_unique_questions(questions):
    seen_contents = set()
    unique_questions = [q for q in questions if q.content not in seen_contents and not seen_contents.add(q.content)]
    return unique_questions

def replace_user_placeholders(content, user_list, user_count):
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
    num_placeholders = content.count("${num}")
    
    for _ in range(num_placeholders):
        random_num = str(choice(range(1, 11)))
        if random_num == "10":
            random_num = "un shooter"
        content = content.replace("${num}", random_num, 1)
    
    return content

def prepare_questions_for_game(questions, user_list):
    user_count = Counter()
    final_questions = []

    for q in questions:
        final_content = replace_placeholders(q.content, user_list, user_count)
        final_questions.append({
            "id": q.id,
            "mode": q.mode,
            "language": q.language,
            "content": final_content,
            "answer": q.answer
        })

    return final_questions

def replace_placeholders(content, user_list, user_count):
    content = replace_user_placeholders(content, user_list, user_count)
    content = replace_num_placeholders(content)
    return content

def select_balanced_questions(questions, mode_list, target_count=30):
    mode_weights = {mode: 0 for mode in mode_list}
    selected_questions = []

    for _ in range(target_count):
        min_weight = min(mode_weights.values())
        modes_with_min_weight = [mode for mode, weight in mode_weights.items() if weight == min_weight]
        eligible_questions = [q for q in questions if q.mode in modes_with_min_weight]

        if not eligible_questions:
            break

        selected_question = choice(eligible_questions)
        selected_questions.append(selected_question)
        mode_weights[selected_question.mode] += 1

    return selected_questions