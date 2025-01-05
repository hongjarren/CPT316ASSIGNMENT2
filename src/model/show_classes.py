import pickle

# Load the label encoders
with open('src/model/trained/label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)

# Get property types from the label encoder
property_types = label_encoders['property_type'].classes_
print("\nAvailable Property Types:")
for pt in property_types:
    print(f"- {pt}") 