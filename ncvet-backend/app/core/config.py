from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "NCVET Career AI")
    MONGODB_URL: str = os.getenv("MONGODB_URL", "")
    PINECONE_API_KEY: str = os.getenv("PINECONE_API_KEY", "")
    PINECONE_INDEX: str = os.getenv("PINECONE_INDEX_NAME", "")
    GEMINI_KEY: str = os.getenv("GEMINI_API_KEY", "")

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()