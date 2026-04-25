import asyncio
import json
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["ncvet_db"]
collection = db["courses"]

curated_courses = [
  {
    "title": 'Machine Learning Specialization',
    "description": 'Master ML fundamentals, supervised/unsupervised learning, and build real-world projects with Andrew Ng — the world\'s most popular ML course.',
    "source_url": 'https://www.coursera.org/specializations/machine-learning-introduction',
    "image": 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipnemtsi.cloudfront.net/Role/Machine-Learning-Engineer.png?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25',
    "sector": 'AI & ML', "level": 'Intermediate', "duration": '3 Months',
    "instructor": 'Andrew Ng', "provider": 'Coursera', "rating": 4.9, "enrolledCount": '285k',
    "isCurated": True,
  },
  {
    "title": 'Deep Learning Specialization',
    "description": 'Deep dive into neural networks, CNNs, RNNs, and Transformers. Build AI applications — taught by Andrew Ng at DeepLearning.AI.',
    "source_url": 'https://www.coursera.org/specializations/deep-learning',
    "image": 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25',
    "sector": 'AI & ML', "level": 'Advanced', "duration": '5 Months',
    "instructor": 'Andrew Ng', "provider": 'Coursera', "rating": 4.9, "enrolledCount": '320k',
    "isCurated": True,
  },
  {
    "title": 'Generative AI with Large Language Models',
    "description": 'Learn GenAI fundamentals, fine-tune LLMs, and deploy production-grade AI apps with AWS and DeepLearning.AI.',
    "source_url": 'https://www.coursera.org/learn/generative-ai-with-llms',
    "image": 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/97/fb23a9d2ad4f7bae788e0db4ec32f0/GenAI-LLMs.png?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25',
    "sector": 'AI & ML', "level": 'Intermediate', "duration": '3 Weeks',
    "instructor": 'DeepLearning.AI × AWS', "provider": 'Coursera', "rating": 4.8, "enrolledCount": '95k',
    "isCurated": True,
  },
  {
    "title": 'Google Data Analytics Certificate',
    "description": 'Learn data analysis with spreadsheets, SQL, R, and Tableau. Earn a Google certificate and prepare for a data analyst role.',
    "source_url": 'https://www.coursera.org/professional-certificates/google-data-analytics',
    "image": 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~google-data-analytics/XDP~SPECIALIZATION!~google-data-analytics.jpeg?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25',
    "sector": 'Computer Science', "level": 'Beginner', "duration": '6 Months',
    "instructor": 'Google Career Certificates', "provider": 'Coursera', "rating": 4.8, "enrolledCount": '1.8M',
    "isCurated": True,
  },
  {
    "title": 'IBM Data Science Professional Certificate',
    "description": 'Hands-on data science skills: Python, SQL, machine learning, and data visualisation with IBM tools and real datasets.',
    "source_url": 'https://www.coursera.org/professional-certificates/ibm-data-science',
    "image": 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~ibm-data-science/XDP~SPECIALIZATION!~ibm-data-science.jpeg?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25',
    "sector": 'Computer Science', "level": 'Beginner', "duration": '5 Months',
    "instructor": 'IBM Skills Network', "provider": 'Coursera', "rating": 4.7, "enrolledCount": '520k',
    "isCurated": True,
  },
  {
    "title": 'Python for Everybody Specialization',
    "description": 'Learn Python fundamentals, data structures, web scraping, and databases in this beginner-friendly specialisation by Dr. Chuck.',
    "source_url": 'https://www.coursera.org/specializations/python',
    "image": 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~python/XDP~SPECIALIZATION!~python.jpeg?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25',
    "sector": 'Computer Science', "level": 'Beginner', "duration": '8 Months',
    "instructor": 'Dr. Chuck Severance', "provider": 'Coursera', "rating": 4.8, "enrolledCount": '1.3M',
    "isCurated": True,
  },
  {
    "title": 'Meta Full-Stack Developer Certificate',
    "description": 'Build full-stack web applications with React, Node.js, and databases. Certified by Meta — the company behind Facebook and Instagram.',
    "source_url": 'https://www.coursera.org/professional-certificates/meta-full-stack-developer',
    "image": 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~meta-full-stack-developer/XDP~SPECIALIZATION!~meta-full-stack-developer.jpeg?auto=format%2Ccompress&dpr=1&w=330&h=330&fit=fill&q=25',
    "sector": 'Computer Science', "level": 'Intermediate', "duration": '9 Months',
    "instructor": 'Meta Staff', "provider": 'Coursera', "rating": 4.7, "enrolledCount": '130k',
    "isCurated": True,
  },
  {
    "title": '100 Days of Code: The Complete Python Pro Bootcamp',
    "description": '100 projects in 100 days — Python web development, data science, automation, and more. The #1 Python course on Udemy.',
    "source_url": 'https://www.udemy.com/course/100-days-of-code/',
    "image": 'https://img-b.udemycdn.com/course/480x270/2776760_f176_10.jpg',
    "sector": 'Computer Science', "level": 'Beginner', "duration": '60 Hours',
    "instructor": 'Angela Yu', "provider": 'Udemy', "rating": 4.8, "enrolledCount": '1.1M',
    "isCurated": True,
  },
  {
    "title": 'The Complete Web Developer Bootcamp',
    "description": 'Full stack web development with HTML, CSS, JavaScript, Node.js, React, MongoDB from scratch. Hundreds of coding exercises.',
    "source_url": 'https://www.udemy.com/course/the-web-developer-bootcamp/',
    "image": 'https://img-b.udemycdn.com/course/480x270/625204_436a_3.jpg',
    "sector": 'Computer Science', "level": 'Beginner', "duration": '65 Hours',
    "instructor": 'Colt Steele', "provider": 'Udemy', "rating": 4.7, "enrolledCount": '900k',
    "isCurated": True,
  },
  {
    "title": "CS50: Introduction to Computer Science",
    "description": "Harvard's introduction to the intellectual enterprises of computer science. Free to audit — the most widely taken CS course in history.",
    "source_url": 'https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science',
    "image": 'https://prod-discovery.edx-cdn.org/media/course/image/84ab3a15-bfa3-4700-be46-320d0f507b99-fc9ec178b668.small.jpg',
    "sector": 'Computer Science', "level": 'Beginner', "duration": '12 Weeks',
    "instructor": 'David J. Malan', "provider": 'edX', "rating": 4.9, "enrolledCount": '3M',
    "isCurated": True,
  },
  {
    "title": 'Machine Learning (NPTEL — IIT Madras)',
    "description": 'Comprehensive ML course from IIT Madras — regression, classification, SVM, decision trees, clustering, and neural networks. Free with certificate.',
    "source_url": 'https://nptel.ac.in/courses/106/105/106105215/',
    "image": 'https://nptel.ac.in/assets/images/nptel-logo.png',
    "sector": 'AI & ML', "level": 'Intermediate', "duration": '8 Weeks',
    "instructor": 'Prof. Sudeshna Sarkar', "provider": 'NPTEL', "rating": 4.7, "enrolledCount": '120k',
    "isCurated": True,
  }
]

import re

def detect_sector(title):
    t = title.lower()
    if re.search(r'solar|green|hydrogen|renewable|carbon|organic|wind|bio.?energy', t): return 'Green Energy'
    if re.search(r'health|medical|nurse|pharma|ayur|clinical|hospital|dental|lab|diagnostic', t): return 'Healthcare'
    if re.search(r'software|it |web|mobile|data|cyber|cloud|iot|iiot|robot|ai |drone|digital|5g|telecom', t): return 'Computer Science'
    if re.search(r'weld|mason|carpenter|tailor|plumber|electrici|fitter|mechanic|blacksmith|weaver', t): return 'Skilled Trades'
    if re.search(r'food|retail|beauty|salon|hair|spa|hospitality|hotel|cook|baker|restaurant', t): return 'Hospitality & Retail'
    return 'NCVET Qualifications'

SECTOR_IMAGES = {
  'Computer Science': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop',
  'AI & ML':          'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop',
  'Green Energy':     'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80&auto=format&fit=crop',
  'Healthcare':       'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop',
  'Skilled Trades':   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop',
  'Hospitality & Retail': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop',
  'NCVET Qualifications': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&auto=format&fit=crop',
}

async def init_db():
    print("Clearing existing courses...")
    await collection.delete_many({})
    
    docs_to_insert = list(curated_courses)
                
    if docs_to_insert:
        result = await collection.insert_many(docs_to_insert)
        print(f"Inserted {len(result.inserted_ids)} courses successfully.")

if __name__ == "__main__":
    asyncio.run(init_db())
