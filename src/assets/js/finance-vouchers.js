document.addEventListener('DOMContentLoaded', () => {
    console.log('Finance Vouchers script loaded.');

    const modal = document.getElementById('voucher-modal');
    const createVoucherBtn = document.getElementById('create-voucher-btn');
    const closeBtn = modal.querySelector('.close-btn');
    const voucherForm = document.getElementById('voucher-form');

    const openModal = () => modal.style.display = 'block';
    const closeModal = () => modal.style.display = 'none';

    createVoucherBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    voucherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Voucher created successfully! (Frontend only)');
        voucherForm.reset();
        closeModal();
    });
});
