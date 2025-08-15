document.addEventListener('DOMContentLoaded', () => {
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

    const ranks = [
        "Candidates", "Assistant Intern", "Intern", "Senior Intern", "Envoy", "Senior Envoy", "Special Envoy",
        "Ambassador", "Ambassador Extraordinary", "Ambassador Plenipotentiary"
    ];

    const passcodes = {
        president: "OGBC/ACCESS/PRESIDENT",
        superadmin: "OGBC/ACCESS/SUPER",
        finance: "OGBC/ACCESS/FIN"
    };

    // Populate dropdowns
    const populateDropdown = (selector, data) => {
        const selects = document.querySelectorAll(selector);
        selects.forEach(select => {
            if (select) {
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item;
                    option.textContent = item;
                    select.appendChild(option);
                });
            }
        });
    };

    populateDropdown('select[name="association"]', associations);
    populateDropdown('select[name="rank"]', ranks);

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.signup-form');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const formToShow = button.getAttribute('data-form');
            forms.forEach(form => {
                if (form.id === `${formToShow}-form`) {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
        });
    });

    // Form validation
    const validateForm = (form) => {
        const inputs = form.querySelectorAll('input[required], select[required]');
        for (const input of inputs) {
            if (!input.value.trim()) {
                alert(`Please fill out the ${input.name} field.`);
                return false;
            }
        }

        const email = form.querySelector('input[type="email"]');
        if (email && !/^\S+@\S+\.\S+$/.test(email.value)) {
            alert('Please enter a valid email address.');
            return false;
        }

        const phone = form.querySelector('input[type="tel"]');
        if (phone && !/^\d{11}$/.test(phone.value)) {
            alert('Please enter a valid 11-digit phone number.');
            return false;
        }

        const password = form.querySelector('input[name="password"]');
        const confirmPassword = form.querySelector('input[name="confirm_password"]');
        if (password && confirmPassword && password.value !== confirmPassword.value) {
            alert('Passwords do not match.');
            return false;
        }

        const passcodeField = form.querySelector('input[name="passcode"]');
        if (passcodeField) {
            const formId = form.id;
            let requiredPasscode = '';
            if (formId === 'president-form') {
                requiredPasscode = passcodes.president;
            } else if (formId === 'superadmin-form') {
                requiredPasscode = passcodes.superadmin;
            } else if (formId === 'finance-form') {
                requiredPasscode = passcodes.finance;
            }

            if (requiredPasscode && passcodeField.value !== requiredPasscode) {
                alert('Invalid passcode.');
                return false;
            }
        }

        return true;
    };

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            } else {
                // On successful validation (for now, just show a message)
                e.preventDefault();
                alert('Sign up successful! (Frontend only)');
                form.reset();
            }
        });
    });
});
