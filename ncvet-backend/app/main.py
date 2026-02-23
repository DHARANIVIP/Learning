from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.mongo_client import connect_to_mongo, close_mongo_connection
from app.db.pinecone_client import get_pinecone_index # Add this import

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Connect to MongoDB
    await connect_to_mongo()
    
    # 2. Connect to Pinecone Simultaneously
    get_pinecone_index()
    
    yield
    # 3. Shutdown
    await close_mongo_connection()

app = FastAPI(title="NCVET Backend", lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "NCVET Backend is Live"}

@app.get("/health")
async def health():
    return {"status": "active", "db": "connected"}