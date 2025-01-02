import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import pickle
import os
from preprocessing import preprocess_data

# Create models directory if it doesn't exist
os.makedirs('src/model/trained', exist_ok=True)

# Load the dataset
df = pd.read_csv('data_kaggle.csv')
print("Initial data shape:", df.shape)
print("Initial columns:", df.columns.tolist())

# Rename columns
df = df.rename(columns={
    'Location': 'location',
    'Price': 'price',
    'Rooms': 'rooms',
    'Bathrooms': 'bathrooms',
    'Car Parks': 'car_parks',
    'Property Type': 'property_type',
    'Size': 'size',
    'Furnishing': 'furnished'
})
print("After renaming shape:", df.shape)
print("After renaming columns:", df.columns.tolist())

# Preprocess the data
df, label_encoders = preprocess_data(df)
print("After preprocessing shape:", df.shape)
print("After preprocessing columns:", df.columns.tolist())

# Prepare features and target
features = ['location', 'property_type', 'rooms', 'bathrooms', 'car_parks', 'size', 'furnished']
X = df[features]
y = df['price']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train the model
model = RandomForestRegressor(
    n_estimators=100,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42
)
model.fit(X_train_scaled, y_train)

# Evaluate the model
train_pred = model.predict(X_train_scaled)
test_pred = model.predict(X_test_scaled)

print("Model Performance:")
print(f"Training R² Score: {r2_score(y_train, train_pred):.4f}")
print(f"Testing R² Score: {r2_score(y_test, test_pred):.4f}")
print(f"Training RMSE: RM{np.sqrt(mean_squared_error(y_train, train_pred)):,.2f}")
print(f"Testing RMSE: RM{np.sqrt(mean_squared_error(y_test, test_pred)):,.2f}")

# Save the model and preprocessing components
with open('src/model/trained/model.pkl', 'wb') as f:
    pickle.dump(model, f)
with open('src/model/trained/scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)
with open('src/model/trained/label_encoders.pkl', 'wb') as f:
    pickle.dump(label_encoders, f)

# Save feature information
feature_info = {
    'names': features,
    'categorical': ['location', 'property_type', 'furnished'],
    'numerical': ['rooms', 'bathrooms', 'car_parks', 'size']
}
with open('src/model/trained/feature_info.json', 'w') as f:
    import json
    json.dump(feature_info, f)

print("Original CSV columns:", pd.read_csv('data_kaggle.csv').columns.tolist())