import asyncio
import json
from app.db.mongo_client import connect_to_mongo, db
from app.db.pinecone_client import get_pinecone_index
from google import genai
from google.genai import types  # <--- Added for dimension configuration
from app.core.config import settings


# Initialize the NEW client
client = genai.Client(api_key=settings.GEMINI_KEY)

# 📋 REAL NCVET NSQF DATA (2026 Sample)
nsqf_data = [
    {"id": "nsqf_001", "title": "Drone Application Developer", "level": 5.0, "sector": "IT-ITeS", "desc": "Focuses on UAV programming and sensor integration."},
    {"id": "nsqf_002", "title": "Solar Domestic Product Assembler", "level": 2.5, "sector": "Green Jobs", "desc": "Assembly and maintenance of small-scale solar products."},
    {"id": "nsqf_003", "title": "AI - Data Quality Analyst", "level": 4.5, "sector": "IT-ITeS", "desc": "Ensuring data integrity for machine learning models."},
    {"id": "nsqf_004", "title": "Electric Vehicle Service Lead", "level": 5.0, "sector": "Automotive", "desc": "Managing diagnostics and repair for EV fleets."}
]

async def upload_data():
    await connect_to_mongo()
    index = get_pinecone_index()
    
    try:
        with open('nsqf_data.json', 'r') as f:
            nsqf_data = json.load(f)
        print(f"📖 Loaded {len(nsqf_data)} roles from nsqf_data.json")
    except Exception as e:
        print(f"❌ Error reading JSON file: {e}")
        return

    print("🚀 Starting Data Ingestion...")

    if not index:
        print("❌ Pinecone Index not found. Check your .env settings.")
        return

    print("🚀 Starting Data Ingestion...")

    for job in nsqf_data:
        try:
            # 1. Upload to MongoDB (Full Details)
            # Accessing the database through the 'db' instance correctly
            await db.client.ncvet_db.qualifications.update_one(
                {"id": job["id"]}, {"$set": job}, upsert=True
            )
            
            # 2. Convert text to Vector using Gemini with 1024 Dimension Truncation
            text_for_embedding = f"{job['title']} in {job['sector']}. {job['desc']}"
            
            # Using Matryoshka Representation to match your 1024-dim Pinecone Index
            res = client.models.embed_content(
                model="gemini-embedding-001", 
                contents=text_for_embedding,
                config=types.EmbedContentConfig(output_dimensionality=1024) # <--- CRITICAL FIX
            )
            vector = res.embeddings[0].values
            
            # 3. Upload to Pinecone (Vector + Metadata)
            # Metadata keys must be strings; ensure job data is compatible
            index.upsert(vectors=[(
                job["id"], 
                vector, 
                {"title": job["title"], "level": float(job["level"]), "sector": job["sector"]}
            )])
            
            print(f"✅ Ingested: {job['title']}")
            
        except Exception as e:
            print(f"⚠️ Error ingesting {job['title']}: {e}")

    print("🎉 All data successfully uploaded to MongoDB and Pinecone!")

if __name__ == "__main__":
    asyncio.run(upload_data())