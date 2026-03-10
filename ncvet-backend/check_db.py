import asyncio
from app.db.mongo_client import connect_to_mongo, db
from app.db.pinecone_client import get_pinecone_index

async def verify():
    # 1. Connect to MongoDB
    await connect_to_mongo()
    
    # 2. Check MongoDB Count
    # Note: We use the database name 'ncvet_db' and collection 'qualifications'
    count = await db.client.ncvet_db.qualifications.count_documents({})
    print(f"\n📊 [MONGODB] Total Job Roles Found: {count}")

    # 3. Check Pinecone Stats
    index = get_pinecone_index()
    if index:
        stats = index.describe_index_stats()
        print(f"🌲 [PINECONE] Total Vectors Found: {stats['total_vector_count']}")
        print(f"📐 [PINECONE] Dimension: {stats['dimension']}")
    
    print("\n✅ Verification Complete!")

if __name__ == "__main__":
    asyncio.run(verify())