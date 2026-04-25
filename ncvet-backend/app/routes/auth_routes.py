from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user_models import UserCreate, UserLogin, UserResponse, Token
from app.db.user_crud import get_user_by_email, create_user
from app.core.security import verify_password, create_access_token
from typing import Any

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse)
async def register(user_in: UserCreate) -> Any:
    # Check if user exists
    user = await get_user_by_email(user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="User with this email already exists."
        )
    
    # Create user
    created_user = await create_user(user_in)
    return UserResponse(
        id=str(created_user["_id"]),
        email=created_user["email"]
    )

@router.post("/login", response_model=Token)
async def login(user_in: UserLogin) -> Any:
    user = await get_user_by_email(user_in.email)
    if not user or not verify_password(user_in.password, user.get("hashed_password")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(subject=user["email"])
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

# Swagger UI Login Support allows interacting via the built-in Docs
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await get_user_by_email(form_data.username) # OAuth2 uses 'username' field, we treat it as email
    if not user or not verify_password(form_data.password, user.get("hashed_password")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(subject=user["email"])
    return {"access_token": access_token, "token_type": "bearer"}
