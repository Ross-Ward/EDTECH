import google.generativeai as genai
import os

# Set your API key here or use environment variable
api_key = os.getenv('GEMINI_API_KEY')

if not api_key:
    print("Please set GEMINI_API_KEY environment variable")
    print("Get your key from: https://aistudio.google.com/app/apikey")
    exit(1)

genai.configure(api_key=api_key)

# Create the model
model = genai.GenerativeModel('gemini-2.5-flash')

# Test prompt
response = model.generate_content("Say hello and confirm you're working!")

print(response.text)
