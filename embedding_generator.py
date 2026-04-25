from embedding_gemma import embedding_text
import json
import numpy as np
import time

with open("sections_with_ques.json", "r", encoding="utf-8") as f:
    sections_meta = json.load(f)
embeddings_with_ques=[]
start_from=0
for i, values in sections_meta.items():
    if int(i) < start_from:
        continue
    embed_text=""
    embed_text+="chapter: "+(values.get("chapter") or "")+ "\n"
    embed_text+="section: "+(values.get("section") or "")+ "\n"
    embed_text+="text: "+(values.get("text") or "")+ "\n"
    embed_text+="questions: " +(values.get("questions") or "") + "\n"

    try:
        embeddings_with_ques.append(embedding_text(embed_text))


        np.save("embeddings_with_ques(FLASH).npy", np.array(embeddings_with_ques, dtype=np.float32))
        print(f"done key: {i}")
    except Exception as e:
        print(f"failed at key: {i}")
        print(e)
        break






