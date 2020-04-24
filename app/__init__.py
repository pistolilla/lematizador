import os
from flask import Flask, request, render_template, jsonify, Response

# Initialize application
app = Flask(__name__)

@app.before_first_request
def startup():
    pass

@app.route("/")
def main():
    return render_template('index.html')