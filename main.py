#!/usr/bin/env python
from flask import cli

from app import app
import views  # noqa

if __name__ == '__main__':
    cli.run_simple('0.0.0.0', 3000, app)
