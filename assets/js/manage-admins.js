document.addEventListener('DOMContentLoaded', () => {
    console.log('Manage Admins script loaded.');

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

    const modal = document.getElementById('add-admin-modal');
    const addAdminBtn = document.getElementById('add-admin-btn');
    const closeBtn = modal.querySelector('.close-btn');
    const addAdminForm = document.getElementById('add-admin-form');
    const associationSelect = document.getElementById('association-select');
    const tableBody = document.querySelector('.manage-table tbody');

    // Populate association dropdown
    if (associationSelect) {
        associations.forEach(assoc => {
            const option = document.createElement('option');
            option.value = assoc;
            option.textContent = assoc;
            associationSelect.appendChild(option);
        });
    }

    // Modal handling
    const openModal = () => modal.style.display = 'block';
    const closeModal = () => modal.style.display = 'none';

    addAdminBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle form submission
    addAdminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('New president added successfully! (Frontend only)');
        addAdminForm.reset();
        closeModal();
    });

    // Handle remove button
    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const row = e.target.closest('tr');
            const adminName = row.cells[0].textContent;
            if (confirm(`Are you sure you want to remove ${adminName}?`)) {
                alert(`${adminName} has been removed. (Frontend only)`);
                row.remove();
            }
        }
    });
});
