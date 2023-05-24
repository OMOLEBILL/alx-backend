#!/usr/bin/env python3
"""This is a basic class that we implement the Flask"""
from flask import Flask, render_template, request, g
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """We create a configuration class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.route("/", strict_slashes=False)
def index():
    """We render the 0-index.html"""
    return render_template("6-index.html")


@babel.localeselector
def get_locale():
    """We get the best match"""
    arg = request.args.get("locale")
    if arg and arg in app.config["LANGUAGES"]:
        return arg
    if get_user():
        arg = get_user().get("locale")
        if arg and arg in app.config["LANGUAGES"]:
            return arg
    arg = request.headers.get("locale")
    if arg and arg in app.config["LANGUAGES"]:
        return arg
    return request.accept_languages.best_match(app.config["LANGUAGES"])


def get_user():
    """ We get the user"""
    arg = request.args.get("login_as")
    if arg and int(arg) in users:
        return users.get(int(arg))
    return None


@app.before_request
def before_request():
    """We use the decorator to makw sure it's called first"""
    g.user = get_user()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
