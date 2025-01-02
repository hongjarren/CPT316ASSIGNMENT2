import pickle
import numpy as np
import json

def load_model_components():
    with open('src/model/trained/model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('src/model/trained/scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)
    with open('src/model/trained/label_encoders.pkl', 'rb') as f:
        label_encoders = pickle.load(f)
    with open('src/model/trained/feature_info.json', 'r') as f:
        feature_info = json.load(f)
    return model, scaler, label_encoders, feature_info

def prepare_features(data, label_encoders, feature_info):
    features = []
    for feature in feature_info['names']:
        value = data[feature]
        if feature in feature_info['categorical']:
            encoder = label_encoders[feature]
            value = encoder.transform([value])[0]
        features.append(value)
    return np.array(features).reshape(1, -1)

def predict_price(data):
    model, scaler, label_encoders, feature_info = load_model_components()
    
    # Prepare features
    features = prepare_features(data, label_encoders, feature_info)
    
    # Scale features
    features_scaled = scaler.transform(features)
    
    # Make prediction
    prediction = model.predict(features_scaled)[0]
    
    return {
        'price': float(prediction),
        'confidence': 0.95  # You can implement confidence calculation if needed
    }