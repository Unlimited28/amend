document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const showBuilderBtn = document.getElementById('show-exam-builder-btn');
    const examListView = document.getElementById('exam-list-view');
    const examBuilderView = document.getElementById('exam-builder-view');
    const backToListBtn = document.getElementById('back-to-list-btn');
    const addQuestionBtn = document.getElementById('add-question-btn');
    const questionContainer = document.getElementById('question-builder-container');
    const rankSelect = document.getElementById('exam-rank');
    const examForm = document.getElementById('exam-builder-form');

    // --- Data ---
    const ranks = [
        "Candidates", "Assistant Intern", "Intern", "Senior Intern", "Envoy",
        "Senior Envoy", "Special Envoy", "Ambassador", "Ambassador Extraordinary", "Ambassador Plenipotentiary"
    ];

    // --- Functions ---

    // Populate the ranks dropdown
    const populateRanks = () => {
        if (!rankSelect) return;
        ranks.forEach(rank => {
            const option = document.createElement('option');
            option.value = rank.toLowerCase().replace(/ /g, '-');
            option.textContent = rank;
            rankSelect.appendChild(option);
        });
    };

    // Toggle between list and builder views
    const showBuilderView = () => {
        examListView.classList.add('hidden');
        examBuilderView.classList.remove('hidden');
    };

    const showListView = () => {
        examBuilderView.classList.add('hidden');
        examListView.classList.remove('hidden');
    };

    // Update question numbers
    const updateQuestionNumbers = () => {
        const questionBlocks = questionContainer.querySelectorAll('.question-block');
        questionBlocks.forEach((block, index) => {
            const numberEl = block.querySelector('.question-number');
            if (numberEl) {
                numberEl.textContent = `Question ${index + 1}`;
            }
        });
    };

    // Create a new question block
    const createQuestionBlock = () => {
        const questionCount = questionContainer.children.length;
        const block = document.createElement('div');
        block.className = 'question-block';
        block.innerHTML = `
            <div class="question-header">
                <span class="question-number">Question ${questionCount + 1}</span>
                <div class="question-controls">
                    <button type="button" class="drag-handle" title="Reorder">↕️</button>
                    <button type="button" class="remove-question-btn" title="Remove Question">🗑️</button>
                </div>
            </div>
            <textarea name="question-text" placeholder="Enter the question text here..." required></textarea>
            <div class="options-grid">
                ${[...Array(4)].map((_, i) => `
                    <div class="option-group">
                        <input type="radio" name="correct-answer-${questionCount}" value="${i}" required>
                        <input type="text" name="option-${i}" placeholder="Option ${String.fromCharCode(65 + i)}" required>
                    </div>
                `).join('')}
            </div>
        `;
        questionContainer.appendChild(block);
    };

    // --- Event Listeners ---
    if (showBuilderBtn) {
        showBuilderBtn.addEventListener('click', showBuilderView);
    }

    if (backToListBtn) {
        backToListBtn.addEventListener('click', showListView);
    }

    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', createQuestionBlock);
    }

    // Event delegation for removing questions and handling drag-and-drop
    if (questionContainer) {
        questionContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-question-btn')) {
                e.target.closest('.question-block').remove();
                updateQuestionNumbers();
            }
        });

        // TODO: Implement drag-and-drop reordering functionality
        // This requires a more complex implementation using the HTML Drag and Drop API.
        // The basic idea is to:
        // 1. Add `draggable="true"` to `.question-block`.
        // 2. Listen for `dragstart` to mark the dragged item.
        // 3. Listen for `dragover` on other items to find the drop target.
        // 4. Listen for `drop` to move the element in the DOM.
        // 5. Update question numbers and names after dropping.
    }

    // Handle form submission
    if(examForm) {
        examForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const action = e.submitter.value;
            alert(`Frontend Only: Exam would be ${action}ed.`);
            // TODO: Add backend logic for saving/publishing
        });
    }

    // --- Initial Setup ---
    populateRanks();
    // Add one question block by default when creating a new exam
    if (addQuestionBtn) {
        createQuestionBlock();
    }
});
