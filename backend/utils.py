import uuid
from random import choices, choice


def replace_num_placeholders(content):
    num_placeholders = content.count("${num}")

    for _ in range(num_placeholders):
        options = [
            "1 penalties",
            "2 penalties",
            "3 penalties",
            "4 penalties",
            "5 penalties",
            "un shooter",
        ]
        probabilities = [0.3, 0.3, 0.2, 0.2, 0.2, 0.1]
        random_num = choices(options, probabilities)[0]

        content = content.replace("${num}", random_num, 1)

    return content


def replace_user_placeholders(content, user_list):
    nb_placeholders = content.count("${user}")
    selected_users = set()
    while len(selected_users) < nb_placeholders:
        selected_users.add(choice(user_list))

    for _ in range(nb_placeholders):
        user = selected_users.pop()
        content = content.replace("${user}", user, 1)

    return content


def replace_placeholders(content, user_list):
    content = replace_user_placeholders(content, user_list)
    content = replace_num_placeholders(content)
    return content


def generate_session_id():
    return str(uuid.uuid4())
