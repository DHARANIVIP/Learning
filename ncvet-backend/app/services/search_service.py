from app.db.mongo_client import db
from app.db.pinecone_client import get_pinecone_index
from app.services.ai_service import get_career_advice
from google import genai
from app.core.config import settings
from bson import ObjectId

# Initialize the GenAI client for Embeddings
client = genai.Client(api_key=settings.GEMINI_KEY)

async def search_and_recommend(user_query: str, user_skills: list):
    index = get_pinecone_index()
    
    # 1. Generate Embedding (Use the stable model we fixed earlier)
    try:
        res = client.models.embed_content(
            model="models/gemini-embedding-001", 
            contents=user_query
        )
        query_vector = res.embeddings[0].values
    except Exception as e:
        print(f"❌ Embedding Error: {e}")
        return {"error": "AI Service currently unavailable"}

    # 2. Vector Search 
    # The response is now a 'QueryResponse' object, not a dict
    search_results = index.query(
        vector=query_vector, 
        top_k=3, 
        include_metadata=True
    )
    
    # 3. FIX: Extract job titles safely from the object
    job_titles = []
    
    # Use .matches instead of ['matches']
    if search_results.matches:
        for match in search_results.matches:
            try:
                # Try to get data from MongoDB using the ID
                job_data = await db.client.ncvet_db.qualifications.find_one(
                    {"_id": ObjectId(match.id)}
                )
                if job_data:
                    job_titles.append(job_data['title'])
                else:
                    # Fallback to Pinecone metadata if Mongo is empty
                    job_titles.append(match.metadata.get('title', 'Unknown Role'))
            except Exception:
                continue

    # Fallback if no jobs found
    if not job_titles:
        job_titles = ["Assistant Electrician", "Data Entry Operator"]

    # 4. Final step: AI Coaching
    recommendation = await get_career_advice(user_skills, job_titles)
    
    return {
        "recommended_roles": job_titles,
        "ai_advice": recommendation
    }