from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

class MongoDB:
    client: AsyncIOMotorClient = None

    @property
    def get_db(self):
        """
        Returns the database instance. 
        Change 'ncvet_db' to your actual database name.
        """
        if self.client:
            # We target the database directly
            return self.client.get_database("ncvet_db") 
        return None

# Global instance
db = MongoDB()

async def connect_to_mongo():
    try:
        db.client = AsyncIOMotorClient(settings.MONGODB_URL)
        # Verify connection
        await db.client.admin.command('ping') 
        print("✅ Successfully connected to MongoDB Atlas!")
    except Exception as e:
        print(f"❌ MongoDB Connection Error: {e}")

async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("❌ MongoDB Connection Closed")