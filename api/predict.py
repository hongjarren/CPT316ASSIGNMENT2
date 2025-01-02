from http.server import BaseHTTPRequestHandler
import json
from src.model.predict import predict_price

def convert_keys(data):
    key_mapping = {
        'propertyType': 'property_type',
        'carParks': 'car_parks'
    }
    return {key_mapping.get(k, k.lower()): v for k, v in data.items()}

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            # Convert camelCase to snake_case for Python
            data = convert_keys(data)
            
            # Get prediction
            result = predict_price(data)
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_response = {'error': str(e)}
            self.wfile.write(json.dumps(error_response).encode('utf-8'))