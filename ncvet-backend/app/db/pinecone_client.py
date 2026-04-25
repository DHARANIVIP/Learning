from pinecone import Pinecone
from app.core.config import settings

# Initialize Pinecone
pc = Pinecone(api_key=settings.PINECONE_API_KEY)

def get_pinecone_index():
    """Connect to the vector index for career matching."""
    try:
        index = pc.Index(settings.PINECONE_INDEX)
        # Verify connection
        index.describe_index_stats() 
        print(f"✅ Successfully connected to Pinecone Index: {settings.PINECONE_INDEX}")
        return index
    except Exception as e:
        print(f"❌ Pinecone Connection Error: {e}")
        return None