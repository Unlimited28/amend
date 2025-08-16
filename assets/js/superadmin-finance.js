document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Switching ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                button.classList.add('active');
                document.getElementById(`${button.dataset.tab}-tab`).classList.add('active');
            });
        });
    }

    // --- Populate Filters ---
    const associations = [
        "Agape Baptist Association", "Abeokuta North West Baptist Association", "Ketu Baptist Association",
        "Irepodun Oke-Yewa Baptist Association", "Zion Baptist Association", "Abeokuta South Baptist Association",
        "Ijebu North East Baptist Association", "Great Grace Baptist Association", "Abeokuta East Baptist Association",
        "Upper Room Baptist Association", "Ijebu North Baptist Association", "Abeokuta North-East Baptist Association",
        "Abeokuta West Baptist Association", "Bethel Baptist Association", "Ayetoro Baptist Association",
        "Dominion Baptist Association", "Iroyin Ayo Baptist Association", "Ijebu Central Baptist Association",
        "Rehoboth Baptist Association", "Christlife Baptist Association", "Ifeoluwa Baptist Association",
        "Ijebu Progressive Baptist Association", "Yewa Baptist Association", "Ayooluwa Baptist Association",
        "Macedonia Baptist Association"
    ];
    const paymentTypes = ["Dues", "Exams", "Camp"];
    const paymentStatuses = ["Pending", "Approved", "Rejected"];

    const populateSelect = (selectId, data) => {
        const select = document.getElementById(selectId);
        if (select) {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.toLowerCase().replace(/ /g, '-');
                option.textContent = item;
                select.appendChild(option);
            });
        }
    };

    populateSelect('filter-association', associations);
    populateSelect('filter-type', paymentTypes);
    populateSelect('filter-status', paymentStatuses);

    // TODO: Add filtering logic and logic for action buttons
});
