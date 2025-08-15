document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin Exams script loaded.');

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const mainContent = document.querySelector('.main-content');

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const tabToShow = button.getAttribute('data-tab');
            tabContents.forEach(content => {
                if (content.id === `${tabToShow}-tab`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Handle action buttons
    mainContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('approve-btn')) {
            const row = e.target.closest('tr');
            const ambassadorName = row.cells[1].textContent;
            if (confirm(`Are you sure you want to approve ${ambassadorName} for the exam?`)) {
                alert(`${ambassadorName} has been approved. (Frontend only)`);
                row.remove(); // Simulate moving the user to the other list
            }
        }

        if (e.target.classList.contains('revoke-btn')) {
            const row = e.target.closest('tr');
            const ambassadorName = row.cells[1].textContent;
            if (confirm(`Are you sure you want to revoke approval for ${ambassadorName}?`)) {
                alert(`Approval for ${ambassadorName} has been revoked. (Frontend only)`);
                row.remove(); // Simulate moving the user
            }
        }
    });
});
