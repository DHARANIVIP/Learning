from app.db.mongo_client import db
from app.db.pinecone_client import get_pinecone_index
from app.services.ai_service import get_career_advice

async def search_and_recommend(user_query: str, user_skills: list):
    # This function coordinates the three modules
    index = get_pinecone_index()
    
    # Mock search for testing Module 4
    mock_job_titles = ["Software Developer", "Cloud Architect"]
    
    # Call Gemini for final advice
    recommendation = await get_career_advice(user_skills, mock_job_titles)
    return recommendation