import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler
import numpy as np

def clean_size(size_str):
    if pd.isna(size_str):
        return np.nan
    try:
        # Remove any non-numeric characters except decimal point
        numeric_str = ''.join(c for c in str(size_str) if c.isdigit() or c == '.')
        return float(numeric_str)
    except (ValueError, TypeError):
        return np.nan

def clean_price(price_str):
    if pd.isna(price_str):
        return np.nan
    # Remove 'RM' and convert to float
    try:
        return float(price_str.replace('RM', '').replace(',', ''))
    except:
        return np.nan

def clean_location(location):
    if pd.isna(location):
        return np.nan
    # Remove ',Kuala Lumpur' from the location
    return location.replace(', Kuala Lumpur', '').strip()

def preprocess_data(df):
    print("Before cleaning - null values:\n", df.isnull().sum())
    
    # Clean location names
    df['location'] = df['location'].apply(clean_location)
    
    # Clean and convert price
    df['price'] = df['price'].apply(clean_price)
    
    # Clean and convert size
    df['size'] = df['size'].apply(clean_size)
    
    print("After cleaning - null values:\n", df.isnull().sum())
    
    # Drop rows with missing values
    df = df.dropna()
    print("After dropping nulls - shape:", df.shape)
    
    # Convert categorical variables
    label_encoders = {}
    categorical_columns = ['location', 'property_type', 'furnished']
    
    for col in categorical_columns:
        label_encoders[col] = LabelEncoder()
        df[col] = label_encoders[col].fit_transform(df[col])
    
    # Convert numeric columns to float
    numeric_columns = ['rooms', 'bathrooms', 'car_parks', 'size']
    for col in numeric_columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    
    return df, label_encoders