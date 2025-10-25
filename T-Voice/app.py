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
    page_title = "Tellux"
    return render_template("index.html", title=page_title)


# Route to serve the pay plan page
@app.route("/payplan")
def payplan():
    """
    Serves the pay plan page rendered from 'payplan.html'.
    """
    page_title = "Pay for Plan"
    return render_template("payplan.html", title=page_title)

# --- API Endpoints ---

@app.route("/api/data")
def get_data():
    """
    This is a simple API endpoint that returns a JSON object.
    Your frontend can call this to get data from the backend.
    """
    # In a real application, you would fetch this data from a database
    # or perform some computation.
    data = {
        "message": "Hello from the Python backend!",
        "items": ["Item 1", "Item 2", "Item 3"]
    }
    return jsonify(data)

# This is the standard boilerplate for running a Flask app
if __name__ == "__main__":
    # debug=True will automatically reload the server when you make changes
    app.run(debug=True)
