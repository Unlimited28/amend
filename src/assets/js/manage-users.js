document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Deactivate all tabs and content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Activate the clicked tab and its content
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                const activeContent = document.getElementById(`${tabId}-tab`);
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });
    }

    // TODO: Add logic for View/Toggle Status buttons (would require backend)
    const actionButtons = document.querySelectorAll('.actions .btn-icon');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.currentTarget.title;
            alert(`Frontend Only: Perform '${action}' action.`);
        });
    });
});
