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


# for checking if code is valid:
@app.route('/verify-code', methods=['POST'])
def verifyPayCode():
    myCode = request.json.get('code')

    if not myCode:
        return jsonify({
            'success': False,
            'message': 'No code provided.'
        }), 400
    
    # Get the base directory
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Build the path with forward slashes or use Path from pathlib
    file_path = os.path.join(base_dir, 'TravelCodes', f'{myCode}.json')
    
    # Normalize the path (converts to proper format)
    file_path = os.path.normpath(file_path)
    
    print(f"Looking for: {file_path}")
    print(f"File exists: {os.path.exists(file_path)}")
    
    # Try alternative check
    print(f"Is file: {os.path.isfile(file_path)}")
    
    # List what's actually in the directory
    travel_codes_dir = os.path.join(base_dir, 'TravelCodes')
    if os.path.exists(travel_codes_dir):
        print(f"Files in TravelCodes: {os.listdir(travel_codes_dir)}")
    
    if os.path.isfile(file_path):
        try:
            with open(file_path, 'r') as f:
                import json
                plan_data = json.load(f)
            
            return jsonify({
                'success': True,
                'message': 'Code verified!',
                'data': plan_data
            })
        except Exception as e:
            print(f"Cannot read file: {e}")
            return jsonify({
                'success': False,
                'message': 'Error reading plan data.'
            }), 500
    else:
        return jsonify({
            'success': False,
            'message': 'Code not found, try again.'
        }), 404

# This is the standard boilerplate for running a Flask app
if __name__ == "__main__":
    # debug=True will automatically reload the server when you make changes
    app.run(debug=True, port=8080)
