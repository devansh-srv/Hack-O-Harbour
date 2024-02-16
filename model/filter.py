import docx2txt
import nltk
import warnings
warnings.filterwarnings('ignore')
nltk.download('punkt',quiet = True)
nltk.download('stopwords',quiet = True)
nltk.download('wordnet',quiet = True)
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import Word2Vec
resume  = docx2txt.process('gpt-Python_resume.docx')
job = docx2txt.process('python-job-description.docx')
def preprocess_text(text):
  tokens = word_tokenize(text.lower())
  stop_words = set(stopwords.words('english'))
  filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
  lemmatizer = WordNetLemmatizer()
  lemmatized_tokens = [lemmatizer.lemmatize(word) for word in filtered_tokens]
  return lemmatized_tokens
def average_word_vectors(tokens, model):
    vectors = []
    for token in tokens:
        if token in model.wv:
            vectors.append(model.wv[token])
    if vectors:
        return sum(vectors) / len(vectors)
    else:
        return None
resume_token = preprocess_text(resume)
job_token = preprocess_text(job)
# processing vector average
combined_tokens = [resume_token, job_token]
model = Word2Vec(sentences=combined_tokens, vector_size=100, window=5, min_count=1, workers=4)
resume_vector = average_word_vectors(resume_token, model = model)
job_description_vector = average_word_vectors(job_token, model = model)

if resume_vector is not None and job_description_vector is not None:
    # Calculate cosine similarity
    similarity_score = cosine_similarity([resume_vector], [job_description_vector])[0][0]
    print('Similarity score:', similarity_score*100)
else:
    print("One or both documents contain no tokens in the Word2Vec model vocabulary.")
