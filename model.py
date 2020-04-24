# %%
import spacy
nlp = spacy.load('es')

# %%
def lemmatizer(sentence):
    doc = nlp(sentence)
    return [token.lemma_ for token in doc]

# %%
sentence = "Hoy vino y te buscó Jesús"
lemmatizer(sentence)

# %%
