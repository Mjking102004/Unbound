// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    const fetchButton = document.getElementById('fetch-button');
    const dataContainer = document.getElementById('data-container');

    fetchButton.addEventListener('click', () => {
        // Show a loading message
        dataContainer.innerHTML = 'Fetching data...';

        // Use the modern Fetch API to make a request to our backend
        fetch('/api/data')
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON from the response
            })
            .then(data => {
                // We have the data! Now let's display it.
                console.log('Data received from backend:', data);
                
                // Build an HTML string to display the data
                let content = `
                    <p><strong>Message:</strong> ${data.message}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                        ${data.items.map(item => `<li></li>`).join('')}
                    </ul>
                `;
                
                dataContainer.innerHTML = content;
            })
            .catch(error => {
                // If something went wrong, display an error message
                console.error('Error fetching data:', error);
                dataContainer.innerHTML = '<p style="color: red;">Failed to fetch data. See console for details.</p>';
            });
    });

});
