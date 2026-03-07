from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.mongo_client import connect_to_mongo, close_mongo_connection
from app.db.pinecone_client import get_pinecone_index
from app.services.ai_service import get_career_advice 
from app.services.search_service import search_and_recommend

# 1. DEFINE LIFESPAN FIRST
@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    get_pinecone_index()
    yield
    await close_mongo_connection()

# 2. INITIALIZE APP (Must be above routes)
app = FastAPI(title="NCVET Backend", lifespan=lifespan)

# 3. DEFINE ROUTES
@app.get("/")
async def root():
    return {"message": "NCVET Backend is Live"}

@app.get("/health")
async def health():
    return {"status": "active", "db": "connected"}

@app.post("/recommend")
async def get_real_recommendation(skills: list, query: str):
    """The final endpoint for the career application."""
    result = await search_and_recommend(query, skills)
    return {"career_path": result}

@app.get("/test-recommendation")
async def test_recommendation():
    # Simulated input data for testing the AI connection
    skills = ["Python", "FastAPI", "Data Management"]
    matches = ["Backend Developer", "Data Entry Operator", "Database Administrator"]
    
    advice = await get_career_advice(skills, matches)
    return {
        "status": "AI Module Active",
        "user_skills": skills,
        "recommendation": advice
    }