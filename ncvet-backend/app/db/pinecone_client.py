import os
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "nsqf-index")

def get_pinecone_index():
    """
    Initializes and returns the Pinecone index.
    Includes error handling for when the database isn't created yet.
    """
    if not PINECONE_API_KEY:
        print("❌ ERROR: PINECONE_API_KEY not found in .env")
        return None

    try:
        # 1. Initialize Pinecone Client
        pc = Pinecone(api_key=PINECONE_API_KEY)

        # 2. Check if index exists, if not, create it (Optional logic)
        existing_indexes = [index.name for index in pc.list_indexes()]
        
        if PINECONE_INDEX_NAME not in existing_indexes:
            print(f"⚠️ Index '{PINECONE_INDEX_NAME}' does not exist. Creating it...")
            # Uncomment below to enable auto-creation
            # pc.create_index(
            #     name=PINECONE_INDEX_NAME,
            #     dimension=768, # Dimension for Gemini Embeddings
            #     metric="cosine",
            #     spec=ServerlessSpec(cloud="aws", region="us-east-1")
            # )
            return None # Return None until index is ready

        # 3. Connect to the Index
        index = pc.Index(PINECONE_INDEX_NAME)
        print(f"✅ DEBUG: Connected to Pinecone Index: {PINECONE_INDEX_NAME}")
        return index

    except Exception as e:
        print(f"❌ Pinecone Connection Error: {str(e)}")
        print("⚠️ Running in Mock Mode (AI will not have NCVET data access)")
        return None