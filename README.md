# Unbound - Simple Flask Web Application

A simple Flask web application with a video background and a start page.

## Overview

This project consists of:

*   A **Python backend** built with Flask that serves a single HTML page.
*   A **CSS file** for styling the page.
*   A **video background**.

## Project Structure

```
.
├── app.py              # The main Flask application file
├── requirements.txt    # Python dependencies
├── README.md           # This file
├── static/
│   ├── css/
│   │   └── style.css   # Stylesheet
│   ├── js/
│   │   └── script.js   # Frontend JavaScript (currently unused)
│   └── videos/
│       └── Plane.mp4 # Video file
└── templates/
    └── StartPage.html      # Main HTML page template
```

## Prerequisites

Before you begin, ensure you have the following installed:
*   Python 3.x
*   pip (Python package installer)

## Setup and Installation


1.  **Install the required Python packages:**
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
    Open your web browser and navigate to `http://127.0.0.1:5000`.
