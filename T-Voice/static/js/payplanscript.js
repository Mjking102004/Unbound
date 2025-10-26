let planData = null;

document.getElementById('submitCode').addEventListener('click', async function() {
    const code = document.getElementById('planCode').value;
    const errorMessage = document.getElementById('errorMessage');
    const planDetailsSection = document.getElementById('planDetailsSection');

    // check if it's 4 digits
    if (!/^\d{4}$/.test(code)) {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Invalid code. Please enter a 4-digit code.';
        planDetailsSection.style.display = 'none';
        return;
    }

    try {
        // Send request to Flask backend to verify the code
        const response = await fetch('/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            // turn code into json?
            body: JSON.stringify({ code: code })
        });

        const result = await response.json();

        // if response is valid, show hidden portion (i.e dropdown)
        if (result.success) {
            // Code found! Show the hidden section
            errorMessage.style.display = 'none';
            planDetailsSection.style.display = 'block';
            
            planData = result.data;
            displayPlan(planData);

        // invalid; print error
        } else {
            // Code not found
            errorMessage.style.display = 'block';
            errorMessage.innerText = result.message || 'Error: code not found.';
            planDetailsSection.style.display = 'none';
        }

    // error handling
    } catch (error) {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Error verifying code. Please try again.';
        planDetailsSection.style.display = 'none';
    }
});

// dropdown data
function displayPlan(data) {
    const planInfo = document.getElementById('planInfo');
    const dropdownContent = document.getElementById('dropdownContent');
    
    planInfo.innerText = `Select your events for payment:`;
    
    // Clear previous content
    dropdownContent.innerHTML = '';
    
    // Check if events exist
    if (!data.events || data.events.length === 0) {
        dropdownContent.innerHTML = '<div style="padding: 15px;">No events found in this plan.</div>';
        return;
    }
    
    // Create event items
    data.events.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-item selected';
        eventDiv.dataset.id = index;
        eventDiv.dataset.price = event.price;
        
        eventDiv.innerHTML = `
            <input type="checkbox" class="event-checkbox" checked data-id="${index}" data-price="${event.price}">
            <div class="event-info">
                <div class="event-name">${event.name}</div>
            </div>
            <div class="event-price">$${event.price}</div>
        `;
        
        // Toggle checkbox when clicking the entire item
        eventDiv.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox') {
                const checkbox = this.querySelector('.event-checkbox');
                checkbox.checked = !checkbox.checked;
                updateTotal();
            }
        });
        
        dropdownContent.appendChild(eventDiv);
    });
    
    // Add event listeners to checkboxes
    const checkboxes = document.querySelectorAll('.event-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });
    
    // make dropdown toggle
    setupDropdown();
    
    // calculate initial total
    updateTotal();
}

function setupDropdown() {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownContent = document.getElementById('dropdownContent');
    const arrow = dropdownButton.querySelector('.arrow');
    
    dropdownButton.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownContent.classList.toggle('show');
        arrow.classList.toggle('rotate');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.events-dropdown')) {
            dropdownContent.classList.remove('show');
            arrow.classList.remove('rotate');
        }
    });
}

function updateTotal() {
    const checkboxes = document.querySelectorAll('.event-checkbox');
    let total = 0;
    let selectedCount = 0;
    
    checkboxes.forEach(checkbox => {
        const parentDiv = checkbox.closest('.event-item');
        
        if (checkbox.checked) {
            total += parseFloat(checkbox.dataset.price);
            selectedCount++;
            parentDiv.classList.add('selected');
        } else {
            parentDiv.classList.remove('selected');
        }
    });
    
    // print total and count (of events)
    document.getElementById('totalPrice').innerText = `$${total}`;
    document.getElementById('selectedCount').innerText = selectedCount;
}

document.getElementById('proceedPayment').addEventListener('click', function() {
    const selectedEvents = [];
    const checkboxes = document.querySelectorAll('.event-checkbox:checked');
    
    checkboxes.forEach(checkbox => {
        const eventId = parseInt(checkbox.dataset.id);
        const event = planData.events[eventId];
        if (event) {
            selectedEvents.push(event);
        }
    });
    
    if (selectedEvents.length === 0) {
        alert('Please select at least one event!');
        return;
    }
    
    // You can send this to your backend for payment processing
    console.log('Selected events:', selectedEvents);
    alert(`Success: proceeding to payment for ${selectedEvents.length} event(s)`);
    
    // TODO: Send to payment endpoint
    // fetch('/process-payment', { 
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ events: selectedEvents })
    // })
});