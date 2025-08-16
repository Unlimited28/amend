document.addEventListener('DOMContentLoaded', () => {
    console.log('Finance Associations script loaded.');

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

    const tableBody = document.getElementById('associations-tbody');
    const modal = document.getElementById('payment-request-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const paymentRequestForm = document.getElementById('payment-request-form');

    // Populate table
    associations.forEach(assoc => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${assoc}</td>
            <td><button class="btn create-request-btn">Create Payment Request</button></td>
        `;
    });

    // Modal handling
    const openModal = () => modal.style.display = 'block';
    const closeModal = () => modal.style.display = 'none';

    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('create-request-btn')) {
            openModal();
        }
    });

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Handle form submission
    paymentRequestForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Payment request sent successfully! (Frontend only)');
        paymentRequestForm.reset();
        closeModal();
    });
});
