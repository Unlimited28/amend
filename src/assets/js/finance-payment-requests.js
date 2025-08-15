document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const newRequestBtn = document.getElementById('new-request-btn');
    const modal = document.getElementById('request-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const associationSelect = document.getElementById('req-association');

    // --- Data ---
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

    // --- Functions ---

    // Populate the associations dropdown
    const populateAssociations = () => {
        if (!associationSelect) return;
        associations.forEach(assoc => {
            const option = document.createElement('option');
            option.value = assoc.toLowerCase().replace(/ /g, '-');
            option.textContent = assoc;
            associationSelect.appendChild(option);
        });
    };

    // Show or hide the modal
    const showModal = () => modal.style.display = 'block';
    const hideModal = () => modal.style.display = 'none';

    // --- Event Listeners ---
    if (newRequestBtn) {
        newRequestBtn.addEventListener('click', showModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', hideModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Handle form submission (dummy)
    const form = document.getElementById('request-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Frontend Only: Payment request would be sent.');
            hideModal();
            form.reset();
        });
    }

    // --- Initial Setup ---
    populateAssociations();
});
