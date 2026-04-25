import os
import json
from fastapi import FastAPI
from contextlib import asynccontextmanager
from pydantic import BaseModel # Added for validation
from typing import List, Optional # Added for type safety
from app.db.mongo_client import connect_to_mongo, close_mongo_connection, db
from .db.pinecone_client import get_pinecone_index
from app.services.ai_service import get_career_advice 
from app.services.search_service import search_and_recommend
from fastapi.middleware.cors import CORSMiddleware

# --- ADDED: REQUEST MODEL ---
class RecommendationRequest(BaseModel):
    skills: List[str]
    query: str

class GeneratePathRequest(BaseModel):
    mode: str
    topic: str
    user_stack: List[str]

class EnrollRequest(BaseModel):
    courseId: str
    courseTitle: str
    name: str
    email: str

# 1. DEFINE LIFESPAN FIRST
@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    get_pinecone_index()
    yield
    await close_mongo_connection()

# 2. INITIALIZE APP
app = FastAPI(title="NCVET Backend", lifespan=lifespan)

# CORS — allow Vite dev server and any deployed frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
@app.get("/api/v1/courses/real")
async def get_real_courses():
    # Legacy endpoint, keeping for fallback if needed
    file_path = "nsqf_data.json"
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            data = json.load(f)
        return {"status": "success", "data": data}
    return {"status": "error", "message": "No scraped data found. Run the scraper first."}

@app.get("/api/courses")
async def get_all_courses(search: Optional[str] = None, category: Optional[str] = "All", limit: int = 50, skip: int = 0):
    query = {}
    
    # 1. Handle text search
    if search:
        query["title"] = {"$regex": search, "$options": "i"}
        
    # 2. Handle category filter
    if category and category != "All":
        query["sector"] = category

    try:
        database = db.get_db
        if database is None:
            raise Exception("MongoDB not connected")
        collection = database["courses"]
        
        cursor = collection.find(query).skip(skip).limit(limit)
        courses = await cursor.to_list(length=limit)
        
        # Convert ObjectId to string for JSON serialization
        for course in courses:
            course["_id"] = str(course["_id"])
            
        total_count = await collection.count_documents(query)
        
        return {
            "status": "success",
            "data": courses,
            "total": total_count,
            "has_more": (skip + limit) < total_count
        }
    except Exception as e:
        print(f"DB Error: {e}")
        return {"status": "error", "message": str(e)}

@app.post("/api/ai/generate-path")
async def generate_learning_path(request: GeneratePathRequest):
    from app.services.ai_service import generate_architect_path
    path_data = await generate_architect_path(request.mode, request.topic, request.user_stack)
    return path_data

@app.get("/api/user/progress")
async def get_user_progress():
    # Simulated DB fetch for user progress
    # In a real app, you would fetch from MongoDB using the user's ID
    total_modules = 12
    completed_modules = 5
    progress_percentage = round((completed_modules / total_modules) * 100)
    
    return {
        "status": "success",
        "progress_percentage": progress_percentage,
        "completed_modules": completed_modules,
        "total_modules": total_modules,
        "next_recommended": {
            "title": "Deep Learning with CNNs",
            "type": "Course",
            "duration": "4.5 Hours",
            "market_relevance": "High demand in 2026 AI roles."
        }
    }

@app.post("/api/user/enroll")
async def track_enrollment(request: EnrollRequest):
    # Simulated tracking of enrollment intent in DB
    print(f"Tracking intent: {request.name} ({request.email}) clicked enroll on '{request.courseTitle}'")
    return {"status": "success", "message": "Enrollment intent tracked successfully."}