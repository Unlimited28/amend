document.addEventListener('DOMContentLoaded', () => {
    // --- Modal Handling ---
    const addImageBtn = document.getElementById('add-image-btn');
    const modal = document.getElementById('image-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const imageForm = document.getElementById('image-form');

    const openModal = () => modal.style.display = 'block';
    const closeModal = () => modal.style.display = 'none';

    if (addImageBtn) addImageBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Form Submission ---
    if (imageForm) {
        imageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const caption = document.getElementById('image-caption').value;
            const category = document.getElementById('image-category').value;
            const imageFile = document.getElementById('image-upload').files[0];

            if (!imageFile) {
                alert('Please select an image file.');
                return;
            }

            // In a real app, you'd upload this data to the server
            console.log({
                caption,
                category,
                fileName: imageFile.name
            });

            alert('Frontend Only: Image saved!');
            closeModal();
            imageForm.reset();
        });
    }

    // TODO: Add logic for reordering (e.g., using a library like SortableJS)
    // and for edit/delete buttons.
});
