document.addEventListener('DOMContentLoaded', () => {
    console.log('System Settings script loaded.');

    const settingsForm = document.getElementById('settings-form');

    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('System settings saved successfully! (Frontend only)');
        });
    }
});
