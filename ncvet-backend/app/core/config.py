from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import os
from dotenv import load_dotenv

# Force load the .env file from the current directory
load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "NCVET Career AI"
    MONGODB_URL: str = os.getenv("MONGODB_URL", "")
    PINECONE_API_KEY: str = os.getenv("PINECONE_API_KEY", "")
    
    # FIX: Explicitly pull from the .env variable name to avoid empty strings
    PINECONE_INDEX: str = os.getenv("PINECONE_INDEX_NAME", "nsqf-index") 
    
    # Read the raw string from environment
    GEMINI_KEYS_STR: str = os.getenv("GEMINI_KEYS", "")

    @property
    def GEMINI_KEYS(self) -> List[str]:
        # Split the string into a list and remove empty spaces
        keys = [k.strip() for k in self.GEMINI_KEYS_STR.split(",") if k.strip()]
        return keys

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

# DEBUG: This will print in your terminal so you can see if keys are loading
if not settings.GEMINI_KEYS:
    print("⚠️ DEBUG: GEMINI_KEYS list is empty! Check your .env file.")
else:
    print(f"✅ DEBUG: Loaded {len(settings.GEMINI_KEYS)} API Keys.")

# NEW DEBUG: Check Pinecone Index name
if not settings.PINECONE_INDEX:
    print("⚠️ DEBUG: PINECONE_INDEX is empty!")
else:
    print(f"✅ DEBUG: Pinecone Index Target: {settings.PINECONE_INDEX}")