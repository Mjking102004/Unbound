# Unbound - Travel Cost Planner

A split payment plan for travel itineraries.

## Overview

Unbound is a simple payment processing application that allows users to plan their travel expenses. Users can create a travel plan, add events with associated costs, and split the total cost among a party. Each plan is saved and can be retrieved using a unique 4-digit code for their specific travel plan.

This project consists of:

*   A **Python backend** built with Flask that serves multiple HTML pages, handles form data, and saves/retrieves travel plans.
*   **HTML templates** for the home page, plan creation, verification, and code display.
*   **CSS files** for styling the application.
*   **JavaScript files** for frontend interactivity.
*   A **video background** for aesthetic appeal.

## Project Structure

```
.
├── app.py              # The main Flask application file
├── requirements.txt    # Python dependencies
├── README.md           # This file
├── static/
│   ├── css/
│   │   ├── create.css
│   │   ├── popup.css
│   │   └── style.css
│   ├── js/
│   │   ├── script.js
│   │   └── verification.js
│   └── videos/
│       └── Plane.mp4
├── templates/
│   ├── CodePopup.html
│   ├── Create.html
│   ├── Home.html
│   └── Verification.html
└── TravelCodes/
    └── 3565.json
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
    Open your web browser and navigate to `http://127.0.0.1:8088`.

## Usage

1.  **Create a Plan:**
    *   Navigate to the "Create a Plan" page.
    *   Add events and their costs.
    *   Specify the number of people in the party to split the cost.
    *   Save the plan to generate a unique 4-digit travel code.

2.  **View a Plan:**
    *   Navigate to the "Pay for Plan" page.
    *   Enter the 4-digit travel code to view the saved travel plan.