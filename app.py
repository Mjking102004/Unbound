from flask import Flask, render_template, jsonify

# Initialize the Flask application
app = Flask(__name__)

# --- Routes ---

@app.route("/")
def index():
    """
    Serves the main HTML page.
    The `render_template` function will look for 'index.html' 
    in the 'templates' folder.
    """
    # You can pass variables to your template like this:
    page_title = "Unbound"
    return render_template("StartPage.html", title=page_title)


# This is the standard boilerplate for running a Flask app
if __name__ == "__main__":
    # debug=True will automatically reload the server when you make changes
    app.run(debug=True, port=8080)
