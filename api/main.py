from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.model.predict import predict_price

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
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
    # Don't append Kuala Lumpur - use location as is
    data = {
        'location': request.location,
        'property_type': request.propertyType,
        'rooms': request.rooms,
        'bathrooms': request.bathrooms,
        'car_parks': request.carParks,
        'size': request.size,
        'furnished': request.furnished
    }
    return predict_price(data)