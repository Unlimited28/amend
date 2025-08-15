document.addEventListener('DOMContentLoaded', () => {
    // --- Modal Handling ---
    const newPostBtn = document.getElementById('new-post-btn');
    const modal = document.getElementById('post-modal');
    const closeBtn = modal.querySelector('.close-btn');

    const openModal = () => modal.style.display = 'block';
    const closeModal = () => modal.style.display = 'none';

    if (newPostBtn) newPostBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- WYSIWYG Editor Logic ---
    const editorToolbar = document.querySelector('.wysiwyg-editor .toolbar');
    const editorContent = document.getElementById('editor-content');

    if (editorToolbar) {
        editorToolbar.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button) {
                const command = button.getAttribute('data-command');
                document.execCommand(command, false, null);
                editorContent.focus();
            }
        });
    }

    // --- Form Submission ---
    const postForm = document.getElementById('post-form');
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('post-title').value;
            const content = editorContent.innerHTML; // Get content from the editor

            // In a real app, you'd send this data to the server
            console.log({
                title,
                content
            });

            alert('Frontend Only: Post saved!');
            closeModal();
            postForm.reset();
            editorContent.innerHTML = '';
        });
    }
});
