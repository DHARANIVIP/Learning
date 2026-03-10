from fastapi import FastAPI
from contextlib import asynccontextmanager
from pydantic import BaseModel # Added for validation
from typing import List        # Added for type safety
from app.db.mongo_client import connect_to_mongo, close_mongo_connection
from app.db.pinecone_client import get_pinecone_index
from app.services.ai_service import get_career_advice 
from app.services.search_service import search_and_recommend

# --- ADDED: REQUEST MODEL ---
class RecommendationRequest(BaseModel):
    skills: List[str]
    query: str

# 1. DEFINE LIFESPAN FIRST
@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    get_pinecone_index()
    yield
    await close_mongo_connection()

# 2. INITIALIZE APP
app = FastAPI(title="NCVET Backend", lifespan=lifespan)

# 3. DEFINE ROUTES
@app.get("/")
async def root():
    return {"message": "NCVET Backend is Live"}

@app.get("/health")
async def health():
    return {"status": "active", "db": "connected"}

@app.post("/recommend")
async def get_real_recommendation(request: RecommendationRequest):
    # 1. SEARCH (Find the jobs)
    matches = await search_and_recommend(request.query, request.skills)
    
    # 2. ANALYZE (Get Agent Advice)
    advice = await get_career_advice(request.skills, matches)
    
    return {
        "recommended_roles": matches,
        "ai_roadmap": advice
    }

@app.get("/test-recommendation")
async def test_recommendation():
    skills = ["Python", "FastAPI", "Data Management"]
    matches = ["Backend Developer", "Data Entry Operator", "Database Administrator"]
    
    advice = await get_career_advice(skills, matches)
    return {
        "status": "AI Module Active",
        "user_skills": skills,
        "recommendation": advice
    }