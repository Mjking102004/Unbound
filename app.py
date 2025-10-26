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

@app.route('/CodePopup.html')
def CodePopup_page():
    return render_template('CodePopup.html')

@app.route('/Home.html')
def Home_page():
    return render_template('Home.html')

@app.route("/save_travel_code", methods=['POST'])
def save_travel_code():
    data = request.get_json()
    travel_code = data.get('travel_code')

    # Get party size and divide prices if available
    party_size = data.get('party_size')
    if party_size and int(party_size) > 1:
        party_size = int(party_size)
        for item in data.get('events', []):
            if 'price' in item:
                try:
                    item['price'] = float(item['price']) / party_size
                except (ValueError, TypeError):
                    pass # Handle cases where price might not be a valid number

    filename = f"{travel_code}.json"
    filepath = os.path.join("TravelCodes", filename)

    with open(filepath, "w") as f:
        json.dump(data, f, indent=4)
    return jsonify({"status": "success", "filename": filename})

@app.route("/get_travel_plan/<code>")
def get_travel_plan(code):
    filepath = os.path.join("TravelCodes", f"{code}.json")
    if os.path.exists(filepath):
        with open(filepath, "r") as f:
            data = json.load(f)
        return jsonify(data)
    else:
        return jsonify({"error": "Invalid code"}), 404

# This is the standard boilerplate for running a Flask app
if __name__ == "__main__":
    # debug=True will automatically reload the server when you make changes
    app.run(debug=True, port=8088)
