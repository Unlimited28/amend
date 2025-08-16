document.addEventListener('DOMContentLoaded', () => {
    console.log('Camp Registration script loaded.');

    const uploadArea = document.querySelector('.upload-area');
    const fileUpload = document.getElementById('file-upload');

    if (uploadArea) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.style.borderColor = '#001f3f', false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => uploadArea.style.borderColor = '#DAA520', false);
        });

        // Handle dropped files
        uploadArea.addEventListener('drop', handleFiles, false);

        // Handle selected files
        fileUpload.addEventListener('change', (e) => {
            handleFiles({ dataTransfer: { files: e.target.files } });
        });

        function handleFiles(e) {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
                    alert(`File "${file.name}" uploaded successfully! (Frontend only)`);
                    // Here you would typically start the upload process
                } else {
                    alert('Invalid file type. Please upload an .xls or .xlsx file.');
                }
            }
        }
    }
});
