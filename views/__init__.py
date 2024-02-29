import importlib


views = [
    'misc',
    'static',
    'pages',
    'api',
]

for v in views:
    importlib.import_module(f'views.{v}')
