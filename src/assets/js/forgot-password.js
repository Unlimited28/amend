document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.querySelector('.login-form');

    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('If an account with that email exists, a password reset link has been sent. (Frontend only)');
        forgotPasswordForm.reset();
    });
});
