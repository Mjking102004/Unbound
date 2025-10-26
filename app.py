from flask import Flask, render_template, jsonify
from flask import request
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

 # Sets the page title used by the Canvas ({{ title }})
    page_title = "UnBound - Your Journey Starts Here"
    return render_template("Home.html", title=page_title)

@app.route('/Verification.html')
def verification_page():
    return render_template('Verification.html')

@app.route('/Create.html')
def Create_page():
    return render_template('Create.html')

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
    app.run(debug=True, port=8088)
