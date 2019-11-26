import pandas as pd

table_name = "escola"
# table_filepath = "tables/" + str(table_name) + ".csv"
table_filepath = 'tables/escola_exemplo.csv'

dataset = pd.read_csv(table_filepath, delimiter=";", engine='python')
dataset = dataset.dropna(axis=0, how='any')

print("DATASET", table_name.upper(), "READ FINISHED\n")
print(dataset.head())

columns = []
for col in dataset.columns:
    columns.append(col)

print("\nCOLUMNS", columns)
print("")

insert_queries_filepath = 'queries/insert_escola.sql'

f = open(insert_queries_filepath, "w+")

for index, row in dataset.iterrows():
    query = "INSERT INTO " + str(table_name.upper()) + " VALUES ("
    for col in columns:
        query += str(row[col])
        if col != columns[-1]:
            query += ", "
    query += ");"

    f.write(query + "\n")
