from os import listdir
from os.path import isfile, join
from enem_data_handler import remove_blank_spaces

mypath = "../../microdados_enem2015/DADOS/aux"
list_files_name = [f for f in listdir(mypath) if isfile(join(mypath, f))]
# list_files_name = ["xaa"]
print("Total files: " + str(len(list_files_name)))
is_first = True
count = 0
for file_name in list_files_name:
    print("ARQUIVO", file_name)
    previous_filepath = mypath + "/" + file_name
    new_filepath = mypath + "/new/new_" + file_name
    remove_blank_spaces(previous_filepath, new_filepath, is_first)
    is_first = False
    count += 1
    print(str(count) + "/" + str(len(list_files_name)))

print("Total fixed: " + str(count))
