// Interactive Features for DSA Documentation

// Code Execution
document.querySelectorAll('.code-example').forEach(example => {
    const runButton = document.createElement('button');
    runButton.className = 'run-code-btn';
    runButton.innerHTML = '<i class="fas fa-play"></i> Run Code';
    example.appendChild(runButton);

    runButton.addEventListener('click', () => {
        const code = example.querySelector('code').textContent;
        // Here you would implement code execution logic
        alert('Code execution feature coming soon!');
    });
});

// Visualizations
function createVisualization(container, type, data) {
    // Here you would implement visualization logic
    // This could include tree visualization, graph visualization, etc.
}

// Interactive Examples
document.querySelectorAll('.interactive-example').forEach(example => {
    const canvas = document.createElement('canvas');
    canvas.className = 'visualization-canvas';
    example.appendChild(canvas);

    // Initialize visualization based on example type
    const type = example.dataset.type;
    const data = JSON.parse(example.dataset.data);
    createVisualization(canvas, type, data);
});

// Progress Tracking
const progress = {
    completedTopics: new Set(),
    saveProgress() {
        localStorage.setItem('dsaProgress', JSON.stringify([...this.completedTopics]));
    },
    loadProgress() {
        const saved = localStorage.getItem('dsaProgress');
        if (saved) {
            this.completedTopics = new Set(JSON.parse(saved));
            this.updateUI();
        }
    },
    markTopicComplete(topicId) {
        this.completedTopics.add(topicId);
        this.saveProgress();
        this.updateUI();
    },
    updateUI() {
        document.querySelectorAll('.topic-section').forEach(section => {
            const topicId = section.id;
            if (this.completedTopics.has(topicId)) {
                section.classList.add('completed');
                const badge = document.createElement('div');
                badge.className = 'completion-badge';
                badge.innerHTML = '<i class="fas fa-check"></i>';
                section.appendChild(badge);
            }
        });
    }
};

// Initialize progress tracking
progress.loadProgress();

// Interactive Quiz System
class QuizSystem {
    constructor() {
        this.questions = {};
        this.currentQuiz = null;
        this.score = 0;
    }

    loadQuestions(topic) {
        // Load questions for specific topic
        // This would typically come from a backend
        return fetch(`/api/quiz/${topic}`)
            .then(response => response.json())
            .then(data => {
                this.questions = data;
                this.startQuiz();
            });
    }

    startQuiz() {
        this.currentQuiz = 0;
        this.score = 0;
        this.showQuestion();
    }

    showQuestion() {
        const question = this.questions[this.currentQuiz];
        // Display question and options
    }

    submitAnswer(answer) {
        // Check answer and update score
        if (answer === this.questions[this.currentQuiz].correct) {
            this.score++;
        }
        this.nextQuestion();
    }

    nextQuestion() {
        this.currentQuiz++;
        if (this.currentQuiz < this.questions.length) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        // Display final score and feedback
    }
}

// Initialize quiz system
const quizSystem = new QuizSystem();

// Code Editor Integration
class CodeEditor {
    constructor(container) {
        this.container = container;
        this.editor = null;
        this.initialize();
    }

    initialize() {
        // Initialize code editor (could use Monaco, CodeMirror, etc.)
        this.editor = CodeMirror(this.container, {
            mode: 'text/x-c++src',
            theme: 'monokai',
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 4
        });
    }

    setCode(code) {
        this.editor.setValue(code);
    }

    getCode() {
        return this.editor.getValue();
    }
}

// Initialize code editors
document.querySelectorAll('.code-editor').forEach(container => {
    new CodeEditor(container);
});

// Search and Filter
const searchInput = document.querySelector('.search-box input');
const sections = document.querySelectorAll('.doc-section');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    sections.forEach(section => {
        const title = section.querySelector('h2').textContent.toLowerCase();
        const content = section.textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
});

// Theme Switcher
const themeSwitcher = document.createElement('div');
themeSwitcher.className = 'theme-switcher';
themeSwitcher.innerHTML = `
    <button class="theme-toggle" aria-label="Toggle theme">
        <i class="fas fa-sun"></i>
        <i class="fas fa-moon"></i>
    </button>
    <div class="theme-options">
        <button class="theme-option" data-theme="light">Light</button>
        <button class="theme-option" data-theme="dark">Dark</button>
        <button class="theme-option" data-theme="system">System</button>
    </div>
`;

document.body.appendChild(themeSwitcher);

// Theme Management
const themeManager = {
    currentTheme: localStorage.getItem('theme') || 'light',
    
    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    },
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update theme switcher UI
        const themeToggle = document.querySelector('.theme-toggle');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        const moonIcon = themeToggle.querySelector('.fa-moon');
        
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    },
    
    setupEventListeners() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeOptions = document.querySelectorAll('.theme-option');
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.applyTheme(newTheme);
        });
        
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.applyTheme(theme);
            });
        });
        
        // System theme detection
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (this.currentTheme === 'system') {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
};

// Initialize theme manager
themeManager.init();

// Mobile Responsive Menu
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.body.appendChild(menuToggle);

const sidebar = document.querySelector('.sidebar');
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
}); 