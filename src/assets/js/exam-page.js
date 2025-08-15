document.addEventListener('DOMContentLoaded', () => {
    const timeLeftEl = document.getElementById('time-left');
    const progressEl = document.getElementById('progress');
    const totalQuestionsEl = document.getElementById('total-questions');
    const submitBtn = document.getElementById('submit-exam-btn');
    const questionGrid = document.getElementById('question-grid');
    const saveNextBtn = document.getElementById('save-next-btn');

    const totalQuestions = 20;
    let currentQuestion = 1;
    let answeredQuestions = new Set();
    let timeInSeconds = 60 * 60; // 60 minutes

    // --- Timer ---
    const timerInterval = setInterval(() => {
        timeInSeconds--;
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        timeLeftEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (timeInSeconds <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Submitting your exam.');
            submitExam();
        }
    }, 1000);

    // --- Question Navigator ---
    for (let i = 1; i <= totalQuestions; i++) {
        const qEl = document.createElement('div');
        qEl.textContent = i;
        qEl.dataset.question = i;
        if (i === currentQuestion) {
            qEl.classList.add('current');
        }
        questionGrid.appendChild(qEl);
    }
    const navItems = questionGrid.querySelectorAll('div');

    // --- Functions ---
    const updateProgress = () => {
        progressEl.textContent = currentQuestion;
        navItems.forEach(item => {
            item.classList.remove('current');
            if (parseInt(item.dataset.question) === currentQuestion) {
                item.classList.add('current');
            }
        });
    };

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    const submitExam = () => {
        clearInterval(timerInterval);

        // 1. Show success toast
        showToast('Exam submitted successfully! Redirecting to home...');

        // 2. Redirect to home page after a short delay
        setTimeout(() => {
            // 3. Use location.replace to prevent back navigation
            // This replaces the current page in the session history,
            // so the user can't navigate back to the exam page.
            window.location.replace('../index.html');
        }, 2000); // 2-second delay to allow user to see the toast
    };

    // --- Event Listeners ---
    saveNextBtn.addEventListener('click', () => {
        // Mark current question as answered
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            answeredQuestions.add(currentQuestion);
            const currentNavItem = questionGrid.querySelector(`[data-question="${currentQuestion}"]`);
            currentNavItem.classList.add('answered');
        } else {
            alert('Please select an option before moving to the next question.');
            return;
        }

        // Move to next question
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            updateProgress();
            // In a real app, you would load the next question's data here
            document.getElementById('question-text').textContent = `{Question ${currentQuestion}: ...}`;
            document.querySelector('form')?.reset(); // Reset options
        }

        // Check if all questions are answered
        if (answeredQuestions.size === totalQuestions) {
            submitBtn.disabled = false;
        }
    });

    submitBtn.addEventListener('click', () => {
        if (answeredQuestions.size === totalQuestions) {
            submitExam();
        } else {
            alert('Please answer all questions before submitting.');
        }
    });
});
