from flask import Flask
import os


BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask('maps_app')
