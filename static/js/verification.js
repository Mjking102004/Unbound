
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitCode');
    const codeInputs = document.querySelectorAll('.code-input');
    const errorMessage = document.getElementById('errorMessage');
    const codeEntrySection = document.getElementById('codeEntrySection');
    const planDetailsSection = document.getElementById('planDetailsSection');
    const planName = document.getElementById('planName');
    const planInfo = document.getElementById('planInfo');
    const dropdownContent = document.getElementById('dropdownContent');
    const totalPriceEl = document.getElementById('totalPrice');
    const selectedCount = document.getElementById('selectedCount');
    const monthlyPayment = document.getElementById('monthlyPayment');
    const monthlyPaymentAmount = document.getElementById('monthlyPaymentAmount');

    submitButton.addEventListener('click', () => {
        const code = Array.from(codeInputs).map(input => input.value).join('');
        if (code.length === 4) {
            fetch(`/get_travel_plan/${code}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Invalid code');
                    }
                    return response.json();
                })
                .then(data => {
                    displayPlan(data);
                })
                .catch(error => {
                    errorMessage.textContent = error.message;
                    errorMessage.classList.remove('hidden');
                });
        } else {
            errorMessage.textContent = 'Please enter a 4-digit code.';
            errorMessage.classList.remove('hidden');
        }
    });

    function displayPlan(data) {
        codeEntrySection.style.display = 'none';
        planDetailsSection.style.display = 'block';

        planName.textContent = `Trip for ${data.party_size} people`;
        planInfo.textContent = `Travel Date: ${data.travel_date}`;

        dropdownContent.innerHTML = '';
        let total = 0;
        let selected = 0;

        data.events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('dropdown-item');
            const eventPrice = parseFloat(event.price);
            total += eventPrice;

            eventElement.innerHTML = `
                <label class="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg">
                    <input type="checkbox" class="form-checkbox h-5 w-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500" data-price="${eventPrice}" checked>
                    <span class="text-white font-medium">${event.name}</span>
                    <span class="text-green-400 font-bold ml-auto">${eventPrice.toFixed(2)}</span>
                </label>
            `;
            dropdownContent.appendChild(eventElement);
        });

        totalPriceEl.textContent = `${total.toFixed(2)}`;
        selectedCount.textContent = data.events.length;

        const travelDate = new Date(data.travel_date);
        const currentDate = new Date();
        const diffInMonths = (travelDate.getFullYear() - currentDate.getFullYear()) * 12 + (travelDate.getMonth() - currentDate.getMonth());

        if (diffInMonths >= 2) {
            const numberOfPayments = diffInMonths - 1;
            const monthlyAmount = total / numberOfPayments;
            const paymentEndDate = new Date(travelDate);
            paymentEndDate.setMonth(travelDate.getMonth() - 1);

            monthlyPayment.style.display = 'block';
            monthlyPaymentAmount.textContent = `${monthlyAmount.toFixed(2)}/month until ${paymentEndDate.toLocaleDateString()}`;
        }

        dropdownContent.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                let currentTotal = 0;
                let currentSelected = 0;
                const checkboxes = dropdownContent.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        currentTotal += parseFloat(checkbox.dataset.price);
                        currentSelected++;
                    }
                });
                totalPriceEl.textContent = `${currentTotal.toFixed(2)}`;
                selectedCount.textContent = currentSelected;

                if (diffInMonths >= 2) {
                    const numberOfPayments = diffInMonths - 1;
                    const monthlyAmount = currentTotal / numberOfPayments;
                    const paymentEndDate = new Date(travelDate);
                    paymentEndDate.setMonth(travelDate.getMonth() - 1);

                    monthlyPayment.style.display = 'block';
                    monthlyPaymentAmount.textContent = `${monthlyAmount.toFixed(2)}/month until ${paymentEndDate.toLocaleDateString()}`;
                }
            }
        });
    }
});
