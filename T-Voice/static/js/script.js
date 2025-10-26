document.addEventListener('DOMContentLoaded', () => {
    const addEventButton = document.getElementById('add-event-button');
    const eventsContainer = document.getElementById('events-container');
    const saveButton = document.getElementById('save-button');
    const budgetTabButton = document.getElementById('budget-tab-button');
    const budgetTab = document.getElementById('budget-tab');
    const closeBudgetTab = document.getElementById('close-budget-tab');

    if (addEventButton) {
        addEventButton.addEventListener('click', () => {
            addEvent();
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', () => {
            saveTravelCode();
        });
    }

    if (budgetTabButton) {
        budgetTabButton.addEventListener('click', () => {
            budgetTab.classList.toggle('active');
        });
    }

    if (closeBudgetTab) {
        closeBudgetTab.addEventListener('click', () => {
            budgetTab.classList.remove('active');
        });
    }

    function addEvent() {
        const eventId = `event-${Date.now()}`;
        const eventElement = document.createElement('div');
        eventElement.classList.add('event-bar');
        eventElement.id = eventId;

        eventElement.innerHTML = `
            <input type="text" class="event-name" placeholder="Event Name (e.g., Flight, Hotel)">
            <input type="number" class="event-price" placeholder="Price">
            <button class="delete-event-button">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        eventsContainer.appendChild(eventElement);

        const deleteButton = eventElement.querySelector('.delete-event-button');
        deleteButton.addEventListener('click', () => {
            document.getElementById(eventId).remove();
        });
    }

    function saveTravelCode() {
        const events = [];
        const eventBars = document.querySelectorAll('.event-bar');

        eventBars.forEach(bar => {
            const eventName = bar.querySelector('.event-name').value;
            const eventPrice = bar.querySelector('.event-price').value;
            events.push({ name: eventName, price: eventPrice });
        });

        fetch('/save_travel_code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ events: events }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('TravelCode saved!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error saving TravelCode.');
        });
    }
});