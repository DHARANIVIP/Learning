from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db.mongo_client import connect_to_mongo, close_mongo_connection
from app.db.pinecone_client import get_pinecone_index
from app.services.ai_service import get_career_advice # Import Module 3

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    get_pinecone_index()
    yield
    await close_mongo_connection()

app = FastAPI(title="NCVET Backend", lifespan=lifespan)

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