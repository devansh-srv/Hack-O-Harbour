import google.generativeai as genai
# !@#$*


google_API = "AIzaSyDqzI0VF-cXhHOp6shlZKCQuocFz-LD1Z0"
genai.configure(api_key = google_API)

model = genai.GenerativeModel('gemini-pro')

#query based on job desc
# f = open("jobquery.txt", "r")
# text = f.read()
# desc_query = text

desc_query = "Give me 10 extremely difficult mcq questions on python, flask, mongodb"
question = "Give me 5 extremely difficult python mcq questions"
context = "(with question number) separate each question with !@#ques (print this separator just before question number) \
and separate questions from options from question with !@#opt (print the options like a), b) ) and print correct answer \
after the options with !@#ans"

response = model.generate_content(desc_query+context)
# print(response.text)

text = response.text
print(text)

