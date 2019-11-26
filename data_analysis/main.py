
import pandas as pd
from sklearn.tree import DecisionTreeClassifier # Import Decision Tree Classifier
from sklearn.linear_model import LinearRegression

from sklearn.model_selection import train_test_split # Import train_test_split function
from sklearn import metrics #Import scikit-learn metrics module for accuracy calculation
from sklearn.externals.six import StringIO
from IPython.display import Image
from sklearn.tree import export_graphviz
import pydotplus

print("1")

df = pd.read_csv('COMPLETO_MICRODADOS_ENEM_ESCOLA.csv', delimiter=";", engine='python', encoding="ISO-8859-1")
df = df.dropna(axis=0, how='any')

print("2")

print(df)

feature_cols = ['NU_ANO', 'NU_MEDIA_CN', 'NU_MEDIA_CH', 'NU_MEDIA_LP',
                'NU_MEDIA_MT', 'NU_MEDIA_RED']

output_column = 'NU_MEDIA_RED'
feature_cols.remove(output_column)

X = df[feature_cols]
y = df[output_column]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1)

regressor = LinearRegression()  
regressor.fit(X_train, y_train)  # training the algorithm
y_pred = regressor.predict(X_test)

print("")
print("explained_variance_score:", metrics.explained_variance_score(y_test, y_pred))
print("max_error:", metrics.max_error(y_test, y_pred))
print("mean_absolute_error:", metrics.mean_absolute_error(y_test, y_pred))
print("mean_squared_error:", metrics.mean_squared_error(y_test, y_pred))
print("mean_squared_log_error:", metrics.mean_squared_log_error(y_test, y_pred))
print("median_absolute_error:", metrics.median_absolute_error(y_test, y_pred))
print("r2_score:", metrics.r2_score(y_test, y_pred))

print("")

for i in range(1, 10):
    print("Real -> Previsto: " + str(y_test[i:i+1].tolist()[0]) + " -> " + str(y_pred[i:i+1][0]))
