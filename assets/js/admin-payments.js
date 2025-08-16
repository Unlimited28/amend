document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin Payments script loaded.');

    const paymentForm = document.getElementById('payment-form');

    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const description = document.getElementById('description').value;
            const amount = document.getElementById('amount').value;
            const paymentDate = document.getElementById('payment-date').value;
            const paymentProof = document.getElementById('payment-proof').value;

            if (!description || !amount || !paymentDate || !paymentProof) {
                alert('Please fill out all fields.');
                return;
            }

            alert('Payment proof submitted successfully for review. (Frontend only)');
            paymentForm.reset();
        });
    }
});
