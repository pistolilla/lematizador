import os
from flask import Flask, request, render_template, jsonify, Response

# Initialize application
app = Flask(__name__)

@app.before_first_request
def startup():
    global nlp
    import spacy
    nlp = spacy.load('es_core_news_sm')

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/api/nlp/")
def lematiza():
    sent = request.args.get('s')
    doc = nlp(sent)
    tokens = []
    for token in doc:
        print(token.tag_)
        tag = {}
        for pair in token.tag_.split("|"):
            k, *v = pair.split("=")
            tag.update({k: "".join(v) if len(v) > 0 else None})
        obj = {
            "text": token.text,
            "lemma": token.lemma_,
            "pos": token.pos_,
            "tag": tag,
            "dependency": token.dep_
        }
        tokens.append(obj)
    entities = []
    for entity in doc.ents:
        obj = {
            "entity": entity.text,
            "label": entity.label_,
            "start": entity.start_char,
            "end": entity.end_char
        }
        entities.append(obj)
    return jsonify({"tokens": tokens, "entities": entities})