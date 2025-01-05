import pandas as pd
import numpy as np
import re
from sklearn.preprocessing import LabelEncoder

def clean_price(price_str):
    """Clean price values by removing currency symbol and converting to float"""
    if pd.isna(price_str):
        return np.nan
    try:
        # Remove 'RM' and any commas, then convert to float
        return float(price_str.replace('RM', '').replace(',', '').strip())
    except (ValueError, AttributeError):
        return np.nan

def clean_size(size_str):
    """Clean size values by extracting numeric value and converting to float"""
    if pd.isna(size_str):
        return np.nan
    try:
        # Extract numeric values using regex
        numeric_part = re.search(r'(\d+(?:\.\d+)?)', str(size_str))
        if numeric_part:
            return float(numeric_part.group(1))
        return np.nan
    except (ValueError, AttributeError):
        return np.nan

def clean_rooms(rooms_str):
    """Clean rooms value by taking the base number before any '+' symbol"""
    if pd.isna(rooms_str):
        return np.nan
    try:
        # Handle 'Studio' case
        if isinstance(rooms_str, str) and 'studio' in rooms_str.lower():
            return 0
        # Extract first number before '+'
        base_rooms = str(rooms_str).split('+')[0]
        return float(base_rooms)
    except (ValueError, AttributeError):
        return np.nan

def clean_location(location):
    """Clean location by removing ', Kuala Lumpur' suffix"""
    if pd.isna(location):
        return np.nan
    return location.replace(', Kuala Lumpur', '').strip()

def preprocess_data(df):
    """Main preprocessing function"""
    print("Initial shape:", df.shape)
    print("Initial null values:\n", df.isnull().sum())
    
    # Clean numeric columns
    df['price'] = df['price'].apply(clean_price)
    df['size'] = df['size'].apply(clean_size)
    df['rooms'] = df['rooms'].apply(clean_rooms)
    df['location'] = df['location'].apply(clean_location)
    
    # Convert other numeric columns
    numeric_columns = ['bathrooms', 'car_parks']
    for col in numeric_columns:
        df[col] = pd.to_numeric(df[col], errors='coerce')
    
    print("\nAfter cleaning - null values:\n", df.isnull().sum())
    
    # Drop rows with missing values
    df = df.dropna()
    print("\nAfter dropping nulls - shape:", df.shape)
    
    # Encode categorical variables
    label_encoders = {}
    categorical_columns = ['location', 'property_type', 'furnished']
    
    for col in categorical_columns:
        label_encoders[col] = LabelEncoder()
        df[col] = label_encoders[col].fit_transform(df[col])
    
    return df, label_encoders