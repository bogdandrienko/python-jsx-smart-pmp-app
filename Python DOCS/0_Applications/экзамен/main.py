val = 3
num = f'{val}_'
data = []
with open(f'{num}data.html', 'r+', encoding='utf-8') as file:
    questions = []
    index = 1
    for lines in file:
        final_data = f"<strong>{index}</strong><br><hr><br>"
        data = lines.split(" </b>")[1].split("<button class=")[0]
        try:
            new_data = data.split('<img src="')
            if len(new_data) > 2:
                final_data += data
            else:
                final_data += data.split('<img src="')[0] + """<img src="https://sdo.kineu.kz""" + data.split('<img src="')[1]
        except Exception as ex:
            final_data += data
        final_data += "<br><hr><br>"
        reverse = False
        for question in questions:
            if question.split("</strong>")[1] == final_data.split("</strong>")[1]:
                print('повторение!')
                reverse = True
                break
        if reverse is False:
            questions.append(final_data)
            index += 1
# print(questions)
print(len(questions))
with open(f'{num}new_data.html', 'w', encoding='utf-8') as file:
    title = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    """
    footer = """
    </body>
</html>"""
    file.write(title)
    for line in questions:
        file.write(line)
    file.write(footer)
