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

 # Sets the page title used by the Canvas ({{ title }})
    page_title = "UnBound - Your Journey Starts Here"
    return render_template("Home.html", title=page_title)

@app.route('/verification.html')
def second_page():
    return render_template('verification.html')

# This is the standard boilerplate for running a Flask app
if __name__ == "__main__":
    # debug=True will automatically reload the server when you make changes
    app.run(debug=True, port=8088)
