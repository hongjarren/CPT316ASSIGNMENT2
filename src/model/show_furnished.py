import pickle

# Load the label encoders
with open('src/model/trained/label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)

# Get furnished options from the trained encoder
furnished_options = sorted(label_encoders['furnished'].classes_)

# Print in TypeScript format
print("\nTypeScript FURNISHED_OPTIONS array:")
print("export const FURNISHED_OPTIONS = [")
for option in furnished_options:
    print(f"  '{option}',")
print("] as const;") 