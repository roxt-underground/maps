from flask import send_from_directory

from app import app, BASE_DIR


@app.route('/static/<path:path>')
def static_route(path):
    return send_from_directory(f'{BASE_DIR}/static', path)
