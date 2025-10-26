document.addEventListener('DOMContentLoaded', () => {
    const globalFeedback = document.getElementById('global-feedback');
    const addEventButton = document.getElementById('add-event-button');
    const eventsContainer = document.getElementById('events-container');
    const saveButton = document.getElementById('save-button');
    const budgetTabButton = document.getElementById('budget-tab-button');
    const budgetTab = document.getElementById('budget-tab');
    const closeBudgetTab = document.getElementById('close-budget-tab');
    updateTotalBudget();
    updateEventList();

    if (addEventButton) {
        addEventButton.addEventListener('click', () => {
            addEvent();
            updateTotalBudget();
            updateEventList();
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

    eventsContainer.addEventListener('input', (event) => {
        if (event.target.classList.contains('event-price') || event.target.classList.contains('event-name')) {
            updateTotalBudget();
            updateEventList();
        }
    });

    function updateTotalBudget() {
        const prices = document.querySelectorAll('.event-price');
        let total = 0;
        prices.forEach(priceInput => {
            const price = parseFloat(priceInput.value) || 0;
            total += price;
        });
        document.getElementById('total-amount-value').textContent = `${total.toFixed(2)}`;
    }

    function updateEventList() {
        const eventList = document.getElementById('total-event-list');
        eventList.innerHTML = '';
        const eventBars = document.querySelectorAll('.event-bar');
        eventBars.forEach(bar => {
            const eventName = bar.querySelector('.event-name').value || 'Unnamed Event';
            const eventPrice = parseFloat(bar.querySelector('.event-price').value) || 0;
            const listItem = document.createElement('li');
            listItem.textContent = `${eventName} - ${eventPrice.toFixed(2)}`;
            eventList.prepend(listItem);
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

        eventsContainer.prepend(eventElement);

        const deleteButton = eventElement.querySelector('.delete-event-button');
        deleteButton.addEventListener('click', () => {
            document.getElementById(eventId).remove();
            updateTotalBudget();
            updateEventList();
        });
    }

    function saveTravelCode() {
        const events = [];
        const eventBars = document.querySelectorAll('.event-bar');
        const partyCount = document.getElementById('party-count').value;
        const travelDate = document.getElementById('travel-date').value;

        if (eventBars.length === 0) {
            alert('Please add at least one event.');
            return;
        }

        if (partyCount < 2) {
            alert('Party size must be at least 2.');
            return;
        }

        const travelCode = Math.floor(1000 + Math.random() * 9000);
        window.location.href = `/CodePopup.html?code=${travelCode}`;

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
            body: JSON.stringify({ events: events, party_size: partyCount, travel_code: travelCode, travel_date: travelDate }),
        })
        .then(response => { if (!response.ok) { throw new Error('Network response was not ok'); } return response.json(); })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error saving TravelCode.');
        });
    }

    window.showMockActionFeedback = function(message) {
        globalFeedback.textContent = message;
        globalFeedback.classList.remove('hidden');
        globalFeedback.classList.add('animate-fadeInOut'); // Add custom animation class

        // Hide after animation (2s defined in CSS)
        setTimeout(() => {
            globalFeedback.classList.remove('animate-fadeInOut');
            globalFeedback.classList.add('hidden');
        }, 2000); 
    }
});
