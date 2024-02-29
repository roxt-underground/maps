from flask import render_template

from app import app


@app.get('/')
def index():
    return render_template('base.html')
