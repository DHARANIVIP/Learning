from google import genai
from google.genai import types

# Use the new Gemini 3 Flash model (Released Dec 2025/Updated March 2026)
# It is faster, more accurate for roadmaps, and 100% active.
MODEL_ID = "gemini-3-flash-preview" 

async def generate_roadmap(query: str, job_data: list):
    try:
        # Ensure you are using the modern GenAI Client
        client = genai.Client(api_key=settings.GEMINI_KEYS[0])
        
        prompt = f"""
        User Goal: {query}
        Available Job Data: {job_data}
        Task: Create a step-by-step career roadmap for a Drone Application Developer.
        """
        
        response = client.models.generate_content(
            model=MODEL_ID,
            contents=prompt
        )
        
        return response.text
        
    except Exception as e:
        # This will catch if the key is wrong or model name changes
        print(f"❌ Roadmap Service Error: {e}")
        return "I encountered an error generating your roadmap. Please try again."