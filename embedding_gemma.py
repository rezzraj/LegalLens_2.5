
import os
from google import genai

api_key = os.environ["GEMINI_API_KEY"]

client = genai.Client(api_key=api_key)

MODEL = "gemini-embedding-001"


device = "cuda" if torch.cuda.is_available() else "cpu"



def embedding_text(text: str):
    result = client.models.embed_content(
        model=MODEL,
        contents=text,

    )

    # result.embeddings is a list
    # we take the first embedding
    return result.embeddings[0].values












