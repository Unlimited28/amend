document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const notificationItems = document.querySelectorAll('.notification-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                // Filter notifications
                notificationItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'flex';
                    } else if (filter === 'unread') {
                        if (item.classList.contains('unread')) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Add logic for "Mark as Read" buttons
    const markAsReadButtons = document.querySelectorAll('.notification-item .btn-sm-secondary');
    markAsReadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.closest('.notification-item');
            if (item) {
                item.classList.remove('unread');
                item.querySelector('.icon-col').textContent = '✔️';
                e.target.remove(); // Remove the button after clicking
            }
        });
    });
});
