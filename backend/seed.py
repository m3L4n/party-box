import json
import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Question
from sqlalchemy import MetaData


def drop_tables():
    meta = MetaData()
    meta.reflect(bind=engine)
    meta.drop_all(bind=engine)


def create_tables():
    Question.metadata.create_all(bind=engine)


def parse_mode_and_language(filepath):
    """Extracts mode and language from the filepath."""
    parts = filepath.split(os.sep)
    language = parts[-3]
    mode = parts[-2]
    return mode, language


def load_json_data(json_dir):
    """Loads all questions from JSON files in the given directory."""
    questions = []
    for root, dirs, files in os.walk(json_dir):
        if root.startswith(json_dir + "/."):
            continue
        for file in files:
            if file.endswith(".json"):
                filepath = os.path.join(root, file)
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    mode, language = parse_mode_and_language(filepath)
                    for question_data in data.get("questions", []):
                        question = {
                            "mode": mode,
                            "type": question_data.get("type", "classic"),
                            "language": language,
                            "content": question_data.get("content", ""),
                            "answer": question_data.get("answer", ""),
                        }
                        questions.append(question)
                print(f"Loaded {len(data.get('questions'))} questions from {filepath}")
    return questions


def insert_questions(session: Session, questions):
    """Inserts all the questions into the database."""
    modes = set([item["mode"] for item in questions])
    for item in questions:
        question = Question(
            mode=item["mode"],
            type=item["type"],
            language=item["language"],
            content=item["content"],
            answer=item["answer"],
            score=0,
        )
        session.add(question)
    print("Modes:", modes)
    session.commit()


def main():
    drop_tables()
    print("Tables dropped")
    create_tables()
    print("Tables created")

    session = SessionLocal()
    json_dir = "../../data"

    try:
        questions = load_json_data(json_dir)
        insert_questions(session, questions)
        print(f"Successfully loaded {len(questions)} questions into the database.")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        session.close()


if __name__ == "__main__":
    main()
