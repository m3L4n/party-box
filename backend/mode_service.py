from models import Question

def get_available_modes(db, language):
    modes = db.query(Question.mode).distinct().filter(Question.language == language).all()
    modes_list = [mode[0] for mode in modes]
    return modes_list