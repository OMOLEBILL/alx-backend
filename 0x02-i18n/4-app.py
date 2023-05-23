#!/usr/bin/env python3
"""This is a basic class that we implement the Flask"""
from flask import Flask, render_template, request
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config:
    """We create a configuration class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.route("/", strict_slashes=False)
def index():
    """We render the 0-index.html"""
    return render_template("3-index.html")


@babel.localeselector
def get_locale():
    """We get the best match"""
    arg = request.args.get("locale")
    if arg and arg in app.config["LANGUAGES"]:
        return arg
    return request.accept_languages.best_match(app.config["LANGUAGES"])


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
