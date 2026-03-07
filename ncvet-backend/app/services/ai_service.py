from google import genai
from app.core.config import settings

# Initialize the NEW client
client = genai.Client(api_key=settings.GEMINI_KEY)

async def get_career_advice(user_skills: list, top_matches: list):
    """
    Uses the latest Gemini model for career advice.
    """
    prompt = f"User Skills: {user_skills}. Job Roles: {top_matches}. Recommend the best match."
    
    try:
        # Using the active 'gemini-2.5-flash' model
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt
        )
        return response.text
    except Exception as e:
        return f"AI Service Error: {str(e)}"