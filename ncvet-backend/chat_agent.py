import requests
import json
import time # Added for the countdown timer

BASE_URL = "http://127.0.0.1:8000/recommend"

def start_chat():
    print("🤖 NCVET Career Agent is Online! (Type 'exit' to stop)")
    print("-----------------------------------------------------")
    
    # Get initial skills
    skills_input = input("Enter your current skills (comma separated): ")
    skills = [s.strip() for s in skills_input.split(",")]
    
    while True:
        query = input("\n👤 You: ")
        
        if query.lower() in ['exit', 'quit', 'bye']:
            print("🤖 Agent: Good luck with your NCVET career! Goodbye.")
            break
            
        payload = {
            "skills": skills,
            "query": query
        }
        
        try:
            response = requests.post(BASE_URL, json=payload)
            
            # CASE 1: SUCCESS
            if response.status_code == 200:
                data = response.json()
                print(f"\n🤖 Agent Roadmap:\n{data['ai_roadmap']}")
            
            # CASE 2: QUOTA EXCEEDED (The 429 Error)
            elif response.status_code == 429:
                print("\n⏳ [QUOTA REACHED] Google is busy. Auto-retrying in 20 seconds...")
                # Simple countdown timer
                for i in range(20, 0, -1):
                    print(f"Retrying in {i}s...", end="\r")
                    time.sleep(1)
                
                print("\n🔄 Retrying now...")
                response = requests.post(BASE_URL, json=payload) # Try again
                
                if response.status_code == 200:
                    print(f"\n🤖 Agent Roadmap:\n{response.json()['ai_roadmap']}")
                else:
                    print("⚠️ Still busy. Please wait a bit longer before your next question.")

            # CASE 3: OTHER ERRORS
            else:
                print(f"\n❌ Server Error: {response.status_code}")
                # Print a cleaner error message if possible
                try:
                    print(response.json().get('detail', 'Unknown error'))
                except:
                    print(response.text)

        except Exception as e:
            print(f"❌ Connection Error: Ensure your FastAPI server is running with 'uvicorn'!")

if __name__ == "__main__":
    start_chat()