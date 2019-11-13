import pandas as pd

previous_filepath = 'microdados_enem2015/DADOS/data_example.csv'
new_filepath = 'microdados_enem2015/DADOS/new_data_example.csv'

with open(new_filepath, 'w') as new_data:
    with open(previous_filepath) as previous_data:

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


# READING MERGED DATA
print("READING DATA")
data = pd.read_csv(new_filepath, delimiter=",", engine='python')
data = data.dropna(axis=0, how='any')

print(data.head())
