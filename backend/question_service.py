from random import sample, shuffle
from collections import Counter
from models import Question
from utils import replace_placeholders
from config import redis_client


def fetch_questions_by_mode(db, mode_list, language, session_id):
    already_asked = get_already_asked_questions(session_id)
    already_asked = set(map(int, already_asked))

    questions_by_mode = {}
    for mode in mode_list:
        questions = (
            db.query(Question)
            .filter(
                Question.mode == mode,
                Question.language == language,
                ~Question.id.in_(already_asked),
            )
            .all()
        )
        questions_by_mode[mode] = questions
    return questions_by_mode


def select_questions_balanced(questions_by_mode, target_count=30):
    mode_list = list(questions_by_mode.keys())
    questions_per_mode = target_count // len(mode_list)
    selected_questions = []

    for mode in mode_list:
        mode_questions = questions_by_mode[mode]
        selected_questions.extend(
            sample(mode_questions, min(questions_per_mode, len(mode_questions)))
        )

    remaining_count = target_count - len(selected_questions)
    if remaining_count > 0:
        remaining_questions = [
            q
            for mode_questions in questions_by_mode.values()
            for q in mode_questions
            if q not in selected_questions
        ]
        additional_questions = sample(
            remaining_questions, min(remaining_count, len(remaining_questions))
        )
        selected_questions.extend(additional_questions)

    return selected_questions


def prepare_questions_for_game(questions, user_list):
    user_count = Counter()
    final_questions = []

    for q in questions:
        final_content = replace_placeholders(q.content, user_list, user_count)
        final_questions.append(
            {
                "id": q.id,
                "mode": q.mode,
                "language": q.language,
                "content": final_content,
                "answer": q.answer,
                "score": q.score,
            }
        )
    shuffle(final_questions)

    return final_questions


def get_question_by_id(db, question_id):
    return db.query(Question).filter(Question.id == question_id).first()


def get_already_asked_questions(session_id):
    redis_key = f"session:{session_id}:questions"
    return redis_client.smembers(redis_key)


def save_questions_to_redis(session_id, question_ids):
    redis_key = f"session:{session_id}:questions"
    redis_client.sadd(redis_key, *question_ids)
    redis_client.expire(redis_key, 3600)
