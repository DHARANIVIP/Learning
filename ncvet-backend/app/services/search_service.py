from google import genai
from google.genai import types
from app.core.config import settings
from app.db.pinecone_client import get_pinecone_index
from app.db.mongo_client import db  # Ensure this is the Database object, not Client

# SAFE INITIALIZATION
if not settings.GEMINI_KEYS or len(settings.GEMINI_KEYS) == 0:
    raise ValueError("❌ GEMINI_KEYS not found in .env file.")

client = genai.Client(api_key=settings.GEMINI_KEYS[0])

async def search_and_recommend(query: str, user_skills: list):
    index = get_pinecone_index()
    
    # 1. Convert user query to vector (New 2026 Model)
    try:
        # Use the mandatory replacement: gemini-embedding-001
        res = client.models.embed_content(
            model="gemini-embedding-001", 
            contents=query,
            config=types.EmbedContentConfig(
                output_dimensionality=1024,
                task_type="RETRIEVAL_QUERY"
            )
        )
        query_vector = res.embeddings[0].values
    except Exception as e:
        print(f"❌ Embedding Error: {e}")
        return []

    # 2. Search Pinecone
    results = index.query(vector=query_vector, top_k=2, include_metadata=True)
    
    # 3. Get full details from MongoDB (Fixing the Subscriptable Error)
    recommendations = []
    
    # FIX: Ensure we are accessing the 'qualifications' collection correctly
    # If 'db' is the client, use db.get_database()["qualifications"] 
    # but based on your error, 'db' likely needs to be referenced as a collection source:
    # Use the .get_db property we created in mongo_client.py
    collection = db.get_db.get_collection("qualifications") 

    for match in results['matches']:
        job_id = match['id']
        # Use find_one on the collection object
        job_details = await collection.find_one({"id": job_id})
        
        if job_details:
            job_details.pop('_id', None)
            recommendations.append(job_details)
            
    return recommendations