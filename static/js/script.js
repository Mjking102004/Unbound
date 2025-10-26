document.addEventListener('DOMContentLoaded', () => {
    const globalFeedback = document.getElementById('global-feedback');

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