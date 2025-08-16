document.addEventListener('DOMContentLoaded', () => {
    console.log('Results page script loaded.');

    const modal = document.getElementById('result-modal');
    const closeBtn = document.querySelector('.close-btn');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');

    const openModal = () => {
        modal.style.display = 'block';
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
