import requests
from bs4 import BeautifulSoup
import json
import os

def scrape_nqr_courses():
    url = "https://www.nqr.gov.in/"
    # More detailed headers to mimic a real Chrome browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/'
    }
    
    print(f"🌐 Connecting to: {url}")
    
    try:
        session = requests.Session()
        response = session.get(url, headers=headers, timeout=15)
        
        if response.status_code != 200:
            print(f"❌ Connection Failed. Status Code: {response.status_code}")
            return

        soup = BeautifulSoup(response.text, 'html.parser')
        courses = []

        # The NQR site uses <h4> tags inside specific card layouts for course titles
        # Let's try a broader search for <h4> or <a> tags that look like courses
        items = soup.find_all(['h4', 'h5']) 

        for item in items:
            title = item.get_text().strip()
            # Basic filter: Only keep titles longer than 10 chars to avoid nav links
            if len(title) > 10:
                courses.append({
                    "title": title,
                    "description": "NCVET Certified Qualification",
                    "source_url": url
                })

        # If homepage scraping fails, we add 5 "Essential NCVET Courses" manually 
        # so your project isn't empty while we debug the dynamic selectors.
        if len(courses) == 0:
            print("⚠️ Live scraping failed (Site might be dynamic). Adding Essential NCVET fallback data...")
            courses = [
                {"title": "Solar PV Installer - Civil", "description": "NSQF Level 4, Green Jobs Sector"},
                {"title": "Domestic Data Entry Operator", "description": "NSQF Level 4, IT-ITeS Sector"},
                {"title": "Self Employed Tailor", "description": "NSQF Level 3, Apparel Sector"},
                {"title": "Assistant Electrician", "description": "NSQF Level 3, Construction Sector"},
                {"title": "Field Technician - Computing and Peripherals", "description": "NSQF Level 4, Electronics Sector"}
            ]

        file_path = os.path.join(os.getcwd(), 'nsqf_data.json')
        with open(file_path, 'w') as f:
            json.dump(courses, f, indent=4)
        
        print(f"✅ Final Result: {len(courses)} courses saved to nsqf_data.json")

    except Exception as e:
        print(f"❌ Critical Error: {e}")

if __name__ == "__main__":
    scrape_nqr_courses()