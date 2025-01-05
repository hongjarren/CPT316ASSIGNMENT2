import pickle

# Load the label encoders
with open('src/model/trained/label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)

# Get locations from the trained encoder
locations = sorted(label_encoders['location'].classes_)

# Print in TypeScript format
print("\nTypeScript LOCATIONS array:")
print("export const LOCATIONS = [")
for loc in locations:
    print(f"  '{loc}',")
print("] as const;") 