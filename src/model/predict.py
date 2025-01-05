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
    features_scaled = scaler.transform(features)
    
    # Get prediction and confidence scores
    prediction = model.predict(features_scaled)[0]
    
    # Get prediction probabilities from all trees
    predictions = [tree.predict(features_scaled)[0] for tree in model.estimators_]
    
    # Calculate confidence metrics
    std_dev = np.std(predictions)
    mean_pred = np.mean(predictions)
    cv = std_dev / mean_pred  # Coefficient of variation
    
    # Calculate confidence score (inverse of CV, normalized)
    base_confidence = 1 / (1 + cv)
    
    # Adjust confidence based on prediction range
    pred_range = np.percentile(predictions, 75) - np.percentile(predictions, 25)
    range_penalty = min(1, pred_range / mean_pred)
    
    # Final confidence score (0 to 1)
    confidence = base_confidence * (1 - range_penalty)
    
    # Ensure confidence is between 0 and 1
    confidence = max(0, min(1, confidence))
    
    return {
        'price': float(prediction),
        'confidence': float(confidence),
        'range': {
            'low': float(np.percentile(predictions, 25)),
            'high': float(np.percentile(predictions, 75))
        }
    }