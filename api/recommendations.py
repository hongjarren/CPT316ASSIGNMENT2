from typing import List, Dict
from .ml_model import predict_price
from .predict import get_prediction  # Import the existing prediction function

def get_recommendations(budget: float, location: str, property_type: str) -> List[Dict]:
    # Define feature combinations to try
    locations = ["Cheras", "Kepong", "Setapak", "Ampang", "Wangsa Maju"]
    property_types = [
        "Condominium", "Apartment", "Serviced Residence",
        "2-sty Terrace/Link House", "1-sty Terrace/Link House"
    ]
    size_ranges = [(800, 1200), (1200, 1600), (1600, 2000)]
    
    recommendations = []
    
    # Try different combinations
    for loc in locations:
        if loc == location:  # Skip current location
            continue
            
        for prop_type in property_types:
            for size_min, size_max in size_ranges:
                # Create test features
                test_features = {
                    "location": loc,
                    "propertyType": prop_type,
                    "size": (size_min + size_max) / 2,
                    "furnished": "Partially Furnished",
                    "bedrooms": 3,
                    "bathrooms": 2
                }
                
                # Get price prediction using the same function as the main prediction
                result = get_prediction(test_features)
                predicted_price = result["price"]
                
                # If within 20% of budget
                price_diff = ((predicted_price - budget) / budget) * 100
                if abs(price_diff) <= 20:
                    recommendations.append({
                        "location": loc,
                        "reason": f"{prop_type} ({size_min}-{size_max} sqft) - {'Lower' if price_diff < 0 else 'Higher'} by {abs(price_diff):.1f}%",
                        "priceRange": f"RM {(predicted_price * 0.9):,.0f} - RM {(predicted_price * 1.1):,.0f}",
                        "trend": f"Similar {prop_type.lower()} properties in this area"
                    })
    
    # Sort by closest to budget and return top 3
    recommendations.sort(key=lambda x: abs(float(x["priceRange"].split(" - ")[0].replace("RM ", "").replace(",", "")) - budget))
    return recommendations[:3] 