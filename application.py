import os
import re
import sqlite3

from flask import Flask, jsonify, render_template, request
from werkzeug.exceptions import default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash

# Configure application
app = Flask(__name__)

# Configure database connection
connection = sqlite3.connect("registrants.db")
cursor = connection.cursor()

# Ensure responses aren't cached
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Header
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store,must-revalidate"
    response.headers["Expires"] = 0
    return response


@app.route("/")
def index():
    """Render map"""
    return render_template("index.html")

# # Query database selecting all
# sql_command = """SELECT * FROM registrants;"""
# cursor.execute(sql_command)
# print("fetchall:")
# results = cursor.fetchall()
# for r in results:
#     print(r)
#
# # Commit changes
# connection.commit()
#
# # Close connection
# connection.close()


if __name__ == "__main__":
    app.run()
