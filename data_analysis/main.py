
import pandas as pd
from sklearn.tree import DecisionTreeClassifier # Import Decision Tree Classifier
from sklearn.linear_model import LinearRegression

from sklearn.model_selection import train_test_split # Import train_test_split function
from sklearn import metrics #Import scikit-learn metrics module for accuracy calculation
from sklearn.externals.six import StringIO
from IPython.display import Image
from sklearn.tree import export_graphviz
import pydotplus

df = pd.read_csv('MICRODADOS_ENEM_ESCOLA.csv')

feature_cols = ['N_TRANS_ATM', 'N_TRANS_TELLER', 'MONEY_MONTLY_OVERDRAWN',
             'BANK_FUNDS', 'MONTHLY_CHECKS_WRITTEN', 'N_OF_DEPENDENTS',
             'CHECKING_AMOUNT', 'MORTGAGE_AMOUNT', 'CREDIT_BALANCE',
             'PROFESSION', 'MARITAL_STATUS', 'SEX',
             'HOUSE_OWNERSHIP', 'CAR_OWNERSHIP', 'HAS_CHILDREN']

X = df[feature_cols]
y = df['BUY_INSURANCE']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1)

clf = DecisionTreeClassifier(criterion="entropy", max_depth=4)
clf = clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
print("Decision Tree accuracy:", metrics.accuracy_score(y_test, y_pred))

regressor = LinearRegression()  
regressor.fit(X_train, y_train) #training the algorithm
y_pred = regressor.predict(X_test)
print("Linear regression accuracy:", metrics.accuracy_score(y_test, y_pred))

# dot_data = StringIO()
# export_graphviz(clf, out_file=dot_data,
#                 filled=True, rounded=True,
#                 special_characters=True, feature_names = feature_cols,class_names=['0','1'])
# graph = pydotplus.graph_from_dot_data(dot_data.getvalue())
# graph.write_png('diabetes.png')
# Image(graph.create_png())