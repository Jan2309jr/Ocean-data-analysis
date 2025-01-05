import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler
import pickle

# Load or create sample data
# Columns: ['sea_ice', 'salinity', 'temperature', 'acidity', 'oxygen', 'currents', 'target']
data = {
    "sea_ice": [10, 15, 12, 14, 13, 11, 9],
    "salinity": [34, 35, 34.5, 35.2, 34.8, 34.9, 35.1],
    "temperature": [2, 3, 2.5, 3.2, 2.8, 3.1, 3.3],
    "acidity": [8.1, 8.2, 8.15, 8.25, 8.18, 8.22, 8.19],
    "oxygen": [7, 7.5, 7.2, 7.4, 7.1, 7.3, 7.6],
    "currents": [2.1, 2.3, 2.2, 2.4, 2.5, 2.3, 2.1],
    "target": [3, 3.5, 3.2, 3.8, 3.4, 3.6, 3.9]  # Example target trend
}

# Create DataFrame
df = pd.DataFrame(data)

# Step 1: Data Cleaning
# Handle missing values - fill missing data with the column mean
df.fillna(df.mean(), inplace=True)

# Step 2: Feature Scaling (Optional for some models but good practice)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df.drop(columns=['target']))

# Step 3: Features and Target
X = pd.DataFrame(X_scaled, columns=df.columns[:-1])  # Dropping 'target' column
y = df['target']  # Target (future trend of temperature)

# Step 4: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 6: Make predictions and evaluate the model
y_pred = model.predict(X_test)
print("Mean Squared Error:", mean_squared_error(y_test, y_pred))

# Step 7: Save the model to a file using pickle
with open('ocean_model.pkl', 'wb') as f:
    pickle.dump(model, f)
