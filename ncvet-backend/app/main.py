from fastapi import FastAPI
from contextlib import asynccontextmanager
from typing import List
from pydantic import BaseModel

# Internal Imports
from app.db.mongo_client import connect_to_mongo, close_mongo_connection
from app.db.pinecone_client import get_pinecone_index
from app.services.ai_service import get_career_advice 
from app.services.search_service import search_and_recommend
from fastapi.middleware.cors import CORSMiddleware

# --- 1. DATA MODELS ---
class RecommendRequest(BaseModel):
    skills: List[str]
    query: str

# --- 2. LIFESPAN CONFIGURATION ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    await connect_to_mongo()
    get_pinecone_index()
    yield
    # Shutdown logic
    await close_mongo_connection()

# --- 3. APP INITIALIZATION ---
app = FastAPI(title="NCVET Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, change "*" to your website URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 4. ROUTES ---

@app.get("/")
async def root():
    return {"message": "NCVET Backend API is running successfully"}

@app.get("/health")
async def health():
    return {"status": "active", "databases": "connected"}

@app.post("/recommend")
async def get_real_recommendation(request: RecommendRequest):
    """
    Main Integrated Endpoint.
    Takes skills and a query from a JSON body.
    """
    # Use the attributes from the 'request' object
    result = await search_and_recommend(request.query, request.skills)
    return {"career_path": result}

@app.get("/test-recommendation")
async def test_recommendation():
    """Simple test route to verify AI connection."""
    skills = ["Python", "FastAPI", "Data Management"]
    matches = ["Backend Developer", "Data Entry Operator", "Database Administrator"]
    advice = await get_career_advice(skills, matches)
    return {
        "status": "AI Module Active",
        "user_skills": skills,
        "recommendation": advice
    }