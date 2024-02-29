# This is a sample Python script.

# Press ⇧F10 to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

from flask import cli

from app import app
import views  # noqa


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    cli.run_simple('0.0.0.0', 3000, app)
