from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.model.predict import predict_price

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Add OPTIONS explicitly
    allow_headers=["*"],
    expose_headers=["*"]
)

class PredictionRequest(BaseModel):
    location: str
    propertyType: str
    rooms: int
    bathrooms: int
    carParks: int
    size: float
    furnished: str

@app.post("/api/predict")
async def predict(request: PredictionRequest):
    # Convert camelCase to snake_case and append Kuala Lumpur to location
    data = {
        'location': f"{request.location}, Kuala Lumpur",
        'property_type': request.propertyType,
        'rooms': request.rooms,
        'bathrooms': request.bathrooms,
        'car_parks': request.carParks,
        'size': request.size,
        'furnished': request.furnished
    }
    return predict_price(data)