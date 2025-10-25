from flask import Flask, render_template, jsonify, request
import json
import random
import os

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
    page_title = "T-Voice"
    return render_template("index.html", title=page_title)

@app.route("/page2")
def page2():
    """
    Serves the page2.html page.
    """
    return render_template("page2.html", title="Page 2")


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

@app.route("/save_travel_code", methods=['POST'])
def save_travel_code():
    data = request.get_json()
    
    while True:
        filename = f"{random.randint(1000, 9999)}.json"
        filepath = os.path.join("TravelCodes", filename)
        if not os.path.exists(filepath):
            break
            
    with open(filepath, "w") as f:
        json.dump(data, f, indent=4)
    return jsonify({"status": "success", "filename": filename})

# This is the standard boilerplate for running a Flask app
if __name__ == "__main__":
    # debug=True will automatically reload the server when you make changes
    app.run(debug=True, port=8080)
