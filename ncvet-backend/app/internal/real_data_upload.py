import pandas as pd
import asyncio
from app.db.mongo_client import db
from app.db.pinecone_client import get_pinecone_index
from app.services.ai_service import client

async def upload_real_ncvet_data():
    index = get_pinecone_index()
    # Replace with your actual CSV path
    df = pd.read_csv("nsqf_data.csv") 

    print("🚀 Ingesting Real NCVET Records...")
    for _, row in df.iterrows():
        # 1. Create a "Searchable Description"
        search_text = f"Job: {row['title']}. Skills: {row['skills']}. Level: {row['level']}"
        
        # 2. Get AI Vector (Embedding)
        emb = client.models.embed_content(
            model="models/gemini-embedding-001",
            contents=search_text
        )
        
        # 3. Store in MongoDB (Full Details)
        job_doc = row.to_dict()
        res = await db.ncvet_db.qualifications.insert_one(job_doc)
        
        # 4. Store in Pinecone (Search Index)
        index.upsert(vectors=[(
            str(res.inserted_id), 
            emb.embeddings[0].values, 
            {"title": row['title'], "level": str(row['level'])}
        )])

    print("✅ All real data indexed successfully!")

if __name__ == "__main__":
    asyncio.run(upload_real_ncvet_data())