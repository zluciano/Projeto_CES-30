# table_name = "escola"
table_name = "enem_escola"
# table_name = "municipio"
table_filepath = "tables/" + str(table_name) + ".csv"
# table_filepath = "tables/" + str(table_name) + "_exemplo" + ".csv"

insert_queries_filepath = "SQLs/insert/insert_" + table_name + ".sql"

f = open(insert_queries_filepath, "w+")

count = 1
with open(table_filepath, 'r', encoding='utf-8-sig', errors='ignore') as table_file:
    row = table_file.readline()
    columns = row.split(";")
    columns[-1] = columns[-1].split("\n")[0]

    row = table_file.readline()
    while row:
        count += 1
        if count % 1000 == 0:
            print("line", count)

        query = "INSERT INTO " + str(table_name.upper()) + " VALUES ("
        row_split = row.split(";")
        row_split[-1] = row_split[-1].split("\n")[0]

        for value in row_split:
            if table_name == "escola" or table_name == "enem_escola":
                if value == row_split[1]:
                    index = value.find('\'')
                    if index != -1:
                        value = value[:index] + '\'' + value[index:]
                    index = -1
                    query += "'" + str(value) + "'"
                else:
                    query += str(value)
            elif table_name == "municipio":
                if value == row_split[1] or value == row_split[2]:
                    index = value.find('\'')
                    if index != -1:
                        value = value[:index] + '\'' + value[index:]
                    index = -1
                    query += "'" + str(value) + "'"
                else:
                    query += str(value)

            if value != row_split[-1]:
                query += ", "

        query += ");\n"

        f.write(query)

        row = table_file.readline()

f.close()
