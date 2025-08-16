document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields.');
                return;
            }

            if (!/^\S+@\S+\.\S+$/.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show toast notification
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);

            contactForm.reset();
        });
    }
});
