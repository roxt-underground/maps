import json
import os.path
import time

from flask import request

from app import app, BASE_DIR


POLYLINES_DIR = os.path.join(BASE_DIR, 'polylines/')


@app.post('/api/polyline')
def save_polyline():
    name = f'polyline.{int(time.time() * 100)}.json'
    data = request.json
    if data['type'].lower() == 'feature':
        data = {
            "type": "FeatureCollection",
            "properties": {
                "description": "",
                "color": "#990000"
            },
            "features": [
                data,
            ]
        }
    with open(f'{POLYLINES_DIR}{name}', 'w') as pl_file:
        json.dump(data, pl_file, indent=2, ensure_ascii=False)
    return {'response': 'ok'}
