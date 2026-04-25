from typing import Optional
from app.db.mongo_client import db
from app.models.user_models import UserCreate
from app.core.security import get_password_hash

async def get_user_by_email(email: str) -> Optional[dict]:
    database = db.get_db
    if database is None:
        raise Exception("Database not connected")
    
    user = await database.users.find_one({"email": email})
    return user

async def create_user(user_in: UserCreate) -> dict:
    database = db.get_db
    if database is None:
        raise Exception("Database not connected")
        
    hashed_password = get_password_hash(user_in.password)
    user_dict = {
        "email": user_in.email,
        "hashed_password": hashed_password
    }
    
    result = await database.users.insert_one(user_dict)
    
    created_user = {**user_dict, "_id": result.inserted_id}
    return created_user
