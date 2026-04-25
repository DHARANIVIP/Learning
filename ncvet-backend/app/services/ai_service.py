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

async def generate_architect_path(mode: str, topic: str, user_stack: list):
    """
    Acts as the Antigravity AI Architect.
    """
    if not topic or len(topic) < 3:
        return {
            "modules": [],
            "clarifying_questions": [
                "What specific aspect of this topic are you interested in?",
                "What is your current skill level regarding this?",
                "What is your ultimate career goal?"
            ]
        }

    stack_str = ", ".join(user_stack)
    
    prompt = f"""
    Act as a Senior AI Engineer and 'Learning Path Generator' for an evolving professional.
    User's Current Stack: {stack_str}
    Requested Topic: {topic}
    Mode: {mode}
    
    CRITICAL INSTRUCTION: You MUST return a valid JSON object. Do not use markdown blocks like ```json. Return ONLY the raw JSON.
    
    Format required:
    {{
      "modules": [
        {{
          "title": "String",
          "status": "Locked | In-Progress | Completed",
          "market_relevance": "String (1-sentence insight on why this skill is trending in 2026)",
          "duration": "String (e.g. 4.5 Hours)"
        }}
      ]
    }}
    
    Generate 3 highly specific modules tailored to the user's stack and requested topic in the {mode} format.
    """

    max_attempts = len(settings.GEMINI_KEYS)
    for attempt in range(max_attempts):
        current_key = next(key_cycle).strip()
        client = genai.Client(api_key=current_key)
        
        try:
            response = client.models.generate_content(
                model="models/gemini-2.5-flash", 
                contents=prompt
            )
            # Try to parse it to ensure it's valid JSON
            import json
            text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(text)

        except Exception as e:
            error_msg = str(e)
            if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
                continue
            
            # Fallback if parsing fails or other error
            return {
                "modules": [
                    {
                        "title": f"Intro to {topic} (Fallback)",
                        "status": "Locked",
                        "market_relevance": "High demand.",
                        "duration": "1 Hour"
                    }
                ]
            }

    return {"modules": []}