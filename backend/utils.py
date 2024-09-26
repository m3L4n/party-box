import uuid
from random import choice

def replace_num_placeholders(content):
    num_placeholders = content.count("${num}")
    
    for _ in range(num_placeholders):
        random_num = str(choice(range(1, 11)))
        if random_num == "10":
            random_num = "un shooter"
        else :
            random_num = random_num + " penalties"
        content = content.replace("${num}", random_num, 1)
    
    return content

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

def replace_placeholders(content, user_list, user_count):
    content = replace_user_placeholders(content, user_list, user_count)
    content = replace_num_placeholders(content)
    return content

def generate_session_id():
    return str(uuid.uuid4())