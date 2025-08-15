document.addEventListener('DOMContentLoaded', () => {
    console.log('Exams page script loaded.');

    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            const selectedStatus = e.target.value;
            console.log(`Filtering exam history by: ${selectedStatus}`);
            // In the future, this would trigger a function to filter the table rows
            // For now, it just logs the selected value.
            alert(`Filtering by ${selectedStatus} (frontend only).`);
        });
    }
});
