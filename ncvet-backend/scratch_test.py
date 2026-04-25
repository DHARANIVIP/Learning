import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import asyncio
from app.main import app
from app.db.mongo_client import connect_to_mongo
from app.models.user_models import UserCreate
from app.routes.auth_routes import register

async def test_register():
    await connect_to_mongo()
    user = UserCreate(email="test@ncvet.ai", password="mypassword123")
    try:
        response = await register(user)
        print("Success:", response)
    except Exception as e:
        import traceback
        traceback.print_exc()

asyncio.run(test_register())
