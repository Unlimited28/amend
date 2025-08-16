document.addEventListener('DOMContentLoaded', () => {
    const audienceSelect = document.getElementById('audience');
    const associationGroup = document.getElementById('association-select-group');
    const associationSelect = document.getElementById('specific-association');
    const notificationForm = document.getElementById('notification-form');

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

    // Populate the association dropdown
    const populateAssociations = () => {
        if (!associationSelect) return;
        associations.forEach(assoc => {
            const option = document.createElement('option');
            option.value = assoc.toLowerCase().replace(/ /g, '-');
            option.textContent = assoc;
            associationSelect.appendChild(option);
        });
    };

    // Show/hide the association dropdown
    if (audienceSelect && associationGroup) {
        audienceSelect.addEventListener('change', () => {
            if (audienceSelect.value === 'association') {
                associationGroup.classList.remove('hidden');
                associationGroup.querySelector('select').required = true;
            } else {
                associationGroup.classList.add('hidden');
                associationGroup.querySelector('select').required = false;
            }
        });
    }

    // Handle form submission
    if (notificationForm) {
        notificationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Frontend Only: Notification Sent!');
            notificationForm.reset();
            associationGroup.classList.add('hidden');
        });
    }

    // Initial setup
    populateAssociations();
});
