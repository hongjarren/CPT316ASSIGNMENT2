from google.generativeai import GenerativeModel
import google.generativeai as genai
import os

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = GenerativeModel('gemini-pro')

# Initialize chat with context about the app
SYSTEM_CONTEXT = """
You are an AI assistant for a property price prediction app in Kuala Lumpur. The app:
- Uses machine learning to predict property prices
- Covers 60+ areas in KL
- Considers factors like location, size, rooms, etc.
- Provides confidence scores and price ranges
- Helps buyers, sellers, agents, and investors

Keep responses concise and friendly. If asked about specific prices, remind users to use the prediction tool instead.
"""

async def get_chat_response(message: str) -> str:
    try:
        chat = model.start_chat(history=[])
        response = chat.send_message(f"{SYSTEM_CONTEXT}\n\nUser: {message}")
        return response.text
    except Exception as e:
        print(f"Gemini API error: {e}")
        return "I apologize, but I'm having trouble processing your request right now. Please try again later." 