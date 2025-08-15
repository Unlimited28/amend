document.addEventListener('DOMContentLoaded', () => {
    console.log('Manage Ambassadors script loaded.');

    const ranks = [
        "Candidates", "Assistant Intern", "Intern", "Senior Intern", "Envoy", "Senior Envoy", "Special Envoy",
        "Ambassador", "Ambassador Extraordinary", "Ambassador Plenipotentiary"
    ];

    const rankFilter = document.getElementById('rank-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchInput = document.getElementById('search-input');
    const ambassadorsTbody = document.getElementById('ambassadors-tbody');
    const tableRows = ambassadorsTbody.getElementsByTagName('tr');

    // Populate rank filter
    if (rankFilter) {
        ranks.forEach(rank => {
            const option = document.createElement('option');
            option.value = rank;
            option.textContent = rank;
            rankFilter.appendChild(option);
        });
    }

    const filterTable = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedRank = rankFilter.value;
        const selectedStatus = statusFilter.value;

        for (const row of tableRows) {
            const name = row.cells[1].textContent.toLowerCase();
            const uid = row.cells[0].textContent.toLowerCase();
            const rank = row.cells[2].textContent;
            const status = row.dataset.status;

            const nameMatch = name.includes(searchTerm) || uid.includes(searchTerm);
            const rankMatch = !selectedRank || rank === selectedRank;
            const statusMatch = !selectedStatus || status === selectedStatus;

            if (nameMatch && rankMatch && statusMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    };

    // Add event listeners
    searchInput.addEventListener('keyup', filterTable);
    rankFilter.addEventListener('change', filterTable);
    statusFilter.addEventListener('change', filterTable);

    // Handle action buttons
    ambassadorsTbody.addEventListener('click', (e) => {
        if (e.target.classList.contains('action-btn')) {
            const row = e.target.closest('tr');
            const ambassadorName = row.cells[1].textContent;
            alert(`Action button clicked for ${ambassadorName}. (Frontend only)`);
        }
    });
});
