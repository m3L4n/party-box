import json
import os
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Question


def create_tables():
    Question.metadata.create_all(bind=engine)


def parse_mode_and_language(filename):
    parts = filename.split("/")
    language = parts[-3]
    mode = parts[-2]
    return mode, language


def load_json_data(json_dir):
    questions = []
    for root, dirs, files in os.walk(json_dir):
        for file in files:
            if file.endswith(".json"):
                filepath = os.path.join(root, file)
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    mode, language = parse_mode_and_language(filepath)
                    for question in data.get("questions", []):
                        answer = (
                            question.get("options", [])[0]
                            if question.get("options")
                            else ""
                        )
                        questions.append(
                            {
                                "mode": mode,
                                "language": language,
                                "content": question.get("content"),
                                "answer": answer,
                            }
                        )
    return questions


def insert_questions(session: Session, questions):
    for item in questions:
        question = Question(
            mode=item["mode"],
            language=item["language"],
            content=item["content"],
            answer=item["answer"],
        )
        session.add(question)
    session.commit()


def main():
    create_tables()
    session = SessionLocal()

    json_dir = "data"

    try:
        questions = load_json_data(json_dir)
        insert_questions(session, questions)
        print("Questions successfully loaded into the database.")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        session.close()


if __name__ == "__main__":
    main()
