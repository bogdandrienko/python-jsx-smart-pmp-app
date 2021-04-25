def get_sheet_value(row, num, sheet):
    sheet = sheet
    return f'{row}{num}'


# workers_from_db = []
# for num in range(1, 10):
#     workers_from_db.append(get_sheet_value('A', num, sheet=None))
# List comprehension
workers_from_db = [get_sheet_value('A', num, sheet=None) for num in range(1, 10)]
# print(workers_from_db)

# b =
# a = list(b)

print([num for num in range(1, 100) if num % 2 == 0])

# print(list(map(int, workers_from_db)))
