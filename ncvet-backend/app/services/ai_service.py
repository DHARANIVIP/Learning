from google import genai
from app.core.config import settings
import itertools # Efficient way to cycle through a list infinitely

# 1. Create a "Cycle" of your keys from the .env list
# This ensures we go: Key1 -> Key2 -> Key3 -> Key1...
key_cycle = itertools.cycle(settings.GEMINI_KEYS)

async def get_career_advice(user_skills: list, top_matches: list):
    """
    AGENTIC LOGIC with Key Rotation: 
    If a 429 error occurs, it tries the next available key.
    """
    if not top_matches:
        return "No matching NCVET roles found. Try adding more skills."

    # Construct the prompt
    prompt = f"""
    You are an NCVET Career Expert. 
    User Skills: {', '.join(user_skills)}
    
    Top NSQF Matches Found:
    {top_matches}
    
    TASK:
    1. Identify the 'Best Fit' from the matches.
    2. Skill Gap Analysis: What specific technical skills does the user lack for this NSQF level?
    3. Roadmap: Provide 3 clear steps to get certified for this role.
    4. Keep the tone professional yet encouraging.
    """

    # We will try up to the number of keys you have provided
    max_attempts = len(settings.GEMINI_KEYS)
    
    for attempt in range(max_attempts):
        # Get the next key from the cycle and create a temporary client
        current_key = next(key_cycle).strip()
        client = genai.Client(api_key=current_key)
        
        try:
            # We use gemini-1.5-flash for higher free-tier limits
            response = client.models.generate_content(
                model = "models/gemini-2.5-flash", 
                contents=prompt
            )
            return response.text

        except Exception as e:
            error_msg = str(e)
            # Check if the error is a Quota/Rate Limit error
            if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
                print(f"⚠️ Key {attempt + 1} exhausted. Rotating to next key...")
                continue # Jump to the next iteration of the loop
            
            # If it's a different error, return it immediately
            return f"AI Agent Error: {error_msg}"

    return "❌ All API keys are currently exhausted. Please wait 60 seconds before trying again."