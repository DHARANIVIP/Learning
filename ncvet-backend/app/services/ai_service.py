import asyncio
from google import genai
from google.genai import types
from app.core.config import settings

# 1. Configure the client with built-in retries for 429 errors
client = genai.Client(
    api_key=settings.GEMINI_KEY,
    http_options=types.HttpOptions(
        retry_options=types.HttpRetryOptions(
            attempts=3,              # Try 3 times before giving up
            initial_delay=2.0,       # Wait 2 seconds before first retry
            http_status_codes=[429]  # Only retry on "Rate Limit" errors
        )
    )
)

async def get_career_advice(user_skills: list, top_matches: list):
    prompt = (
        f"User skills: {user_skills}. NSQF Matches: {top_matches}. "
        "Provide a short, professional career roadmap."
    )
    
    try:
        # Use the most efficient model for high-speed testing
        response = client.models.generate_content(
            model="gemini-2.0-flash-lite", 
            contents=prompt
        )
        return response.text
        
    except Exception as e:
        # 2. Fallback Logic: If AI is totally exhausted, return a valid response anyway
        print(f"⚠️ AI Service Exception: {e}")
        return (
            f"Based on your profile, the best NSQF path is {top_matches[0]}. "
            "Our AI coach is currently busy generating your detailed roadmap—"
            "please refresh in a moment for the full step-by-step guide."
        )