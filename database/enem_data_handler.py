import pandas as pd

previous_filepath = 'tables/escola.csv'
new_filepath = 'tables/new_escola.csv'


def remove_blank_spaces(previous_filepath, new_filepath, first_file):
    with open(new_filepath, 'w') as new_data:
        with open(previous_filepath, 'r', errors='ignore') as previous_data:

            if first_file:
                row = previous_data.readline()

                new_data.write(row)

            row = previous_data.readline()

            while row:
                list_split_row = row.split(",")

                for i in range(len(list_split_row)):
                    element = list_split_row[i]
                    if element == "":
                        list_split_row[i] = "None"

                row = ""
                for i in range(len(list_split_row) - 1):
                    element = list_split_row[i]
                    row += element + ","
                row += list_split_row[len(list_split_row) - 1]

                new_data.write(row)

                row = previous_data.readline()
    previous_data.close()
    new_data.close()
    print("oi!")


# # READING MERGED DATA
# print("READING DATA")
# data = pd.read_csv(new_filepath, delimiter=",", engine='python')
# data = data.dropna(axis=0, how='any')
#
# print(data.head())
