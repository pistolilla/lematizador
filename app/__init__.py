import os
from flask import Flask, request, render_template, jsonify, Response

# Initialize application
app = Flask(__name__)

@app.before_first_request
def startup():
    global nlp
    import spacy
    nlp = spacy.load('es_core_news_md')

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/lematiza/<sent>")
def lematiza(sent):
    doc = nlp(sent)
    return jsonify([token.lemma_ for token in doc])