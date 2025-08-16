document.addEventListener('DOMContentLoaded', () => {
    // --- Modal Handling ---
    const addAdBtn = document.getElementById('add-ad-btn');
    const modal = document.getElementById('ad-modal');

    if (!modal) return; // Exit if modal is not on the page

    const closeBtn = modal.querySelector('.close-btn');
    const adForm = document.getElementById('ad-form');

    const openModal = () => modal.style.display = 'block';
    const closeModal = () => modal.style.display = 'none';

    if (addAdBtn) addAdBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Form Submission ---
    if (adForm) {
        adForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Frontend Only: Ad saved!');
            closeModal();
            adForm.reset();
        });
    }
});
