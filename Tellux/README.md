# Tellux - Simple Flask Web Application

A basic "full-stack" web application demonstrating how a Python backend using the Flask framework can interact with a vanilla JavaScript frontend.

## Overview

This project consists of:

*   A **Python backend** built with Flask that serves an HTML page and a JSON API endpoint.
*   A **JavaScript frontend** that uses the Fetch API to request data from the backend and display it on the page without a full page reload.

It serves as a clear and simple starting point for understanding the client-server model in web development.

## Project Structure

```
.
├── app.py              # The main Flask application file
├── requirements.txt    # Python dependencies
├── static/
│   └── js/
│       └── script.js   # Frontend JavaScript
└── templates/
    └── index.html      # Main HTML page template
```

## Prerequisites

Before you begin, ensure you have the following installed:
*   Python 3.x
*   pip (Python package installer)

## Setup and Installation

1.  **Navigate to the project directory:**
    ```bash
    cd /workspaces/Tellux/Tellux
    ```

2.  **Install the required Python packages:**
    It's highly recommended to use a virtual environment.
    ```bash
    # Install dependencies from requirements.txt
    pip install -r requirements.txt
    ```

## Running the Application

1.  **Start the Flask development server:**
    ```bash
    python app.py
    ```

2.  **View the application:**
    Open your web browser and navigate to `http://127.0.0.1:5000`. Click the "Fetch Data" button to see the frontend communicate with the backend.