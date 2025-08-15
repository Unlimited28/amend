document.addEventListener('DOMContentLoaded', () => {
    const roleSelector = document.getElementById('role');
    const passcodeGroup = document.getElementById('passcode-group');
    const passcodeField = document.getElementById('passcode');
    const loginForm = document.querySelector('.login-form');

    const financePasscode = "OGBC/ACCESS/FIN";

    roleSelector.addEventListener('change', () => {
        if (roleSelector.value === 'finance') {
            passcodeGroup.style.display = 'block';
            passcodeField.required = true;
        } else {
            passcodeGroup.style.display = 'none';
            passcodeField.required = false;
        }
    });

    loginForm.addEventListener('submit', (e) => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Please fill out both email/username and password fields.');
            e.preventDefault();
            return;
        }

        if (roleSelector.value === 'finance') {
            if (passcodeField.value !== financePasscode) {
                alert('Invalid passcode for Finance role.');
                e.preventDefault();
                return;
            }
        }

        // On successful validation (for now, just show a message and redirect)
        e.preventDefault();
        alert('Login successful! (Frontend only)');

        // Redirect to the appropriate dashboard based on role
        const role = roleSelector.value;
        if (role === 'ambassador') {
            window.location.href = 'ambassador/dashboard.html';
        } else if (role === 'president') {
            window.location.href = 'admin/dashboard.html';
        } else if (role === 'superadmin') {
            window.location.href = 'superadmin/dashboard.html';
        } else if (role === 'finance') {
            window.location.href = 'finance/dashboard.html';
        }
    });
});
