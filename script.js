// Loud & Clear - ASL Learning Application
// AI-Powered Gamified Learning for Autism Spectrum Disorder

class ASLLearningApp {
    constructor() {
        this.currentSection = 'home';
        this.userProgress = this.loadProgress();
        this.lessons = this.initializeLessons();
        this.achievements = this.initializeAchievements();
        this.currentLessonIndex = 0;
        this.isAIEnabled = true;
        
        this.init();
    }

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.updateUserStats();
        this.updateAICompanion();
        this.populateAchievements();
        this.updateProgressDisplay();
        console.log('🤟 Loud & Clear ASL Learning App initialized!');
    }

    // Load user progress from localStorage
    loadProgress() {
        const defaultProgress = {
            signsLearned: 0,
            streak: 0,
            totalStars: 0,
            totalDays: 0,
            totalTime: 0,
            averageAccuracy: 0,
            currentLesson: 0,
            unlockedAchievements: [],
            practiceScores: [],
            lastVisit: null
        };

        const saved = localStorage.getItem('asl-learning-progress');
        return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress;
    }

    // Save progress to localStorage
    saveProgress() {
        localStorage.setItem('asl-learning-progress', JSON.stringify(this.userProgress));
    }

    // Initialize lesson data
    initializeLessons() {
        return [
            {
                word: 'Hello',
                description: 'A friendly greeting sign. Wave your hand with fingers spread apart.',
                emoji: '👋',
                difficulty: 'easy',
                category: 'greetings'
            },
            {
                word: 'Thank You',
                description: 'Place your hand near your lips and move it forward.',
                emoji: '🙏',
                difficulty: 'easy',
                category: 'greetings'
            },
            {
                word: 'Please',
                description: 'Place your hand on your chest and move it in a circular motion.',
                emoji: '🤲',
                difficulty: 'easy',
                category: 'greetings'
            },
            {
                word: 'Yes',
                description: 'Make a fist and nod it up and down like nodding your head.',
                emoji: '✅',
                difficulty: 'easy',
                category: 'responses'
            },
            {
                word: 'No',
                description: 'Bring your index and middle finger together with your thumb.',
                emoji: '❌',
                difficulty: 'easy',
                category: 'responses'
            },
            {
                word: 'Water',
                description: 'Make a "W" shape with your hand and tap it to your chin.',
                emoji: '💧',
                difficulty: 'medium',
                category: 'needs'
            },
            {
                word: 'Help',
                description: 'Place one hand flat under the other fist and lift both up.',
                emoji: '🆘',
                difficulty: 'medium',
                category: 'needs'
            },
            {
                word: 'More',
                description: 'Bring your fingertips together and tap them repeatedly.',
                emoji: '➕',
                difficulty: 'medium',
                category: 'needs'
            },
            {
                word: 'Friend',
                description: 'Hook your index fingers together, then switch positions.',
                emoji: '👫',
                difficulty: 'hard',
                category: 'relationships'
            },
            {
                word: 'Love',
                description: 'Cross your arms over your chest in a hugging motion.',
                emoji: '❤️',
                difficulty: 'hard',
                category: 'emotions'
            }
        ];
    }

    // Initialize achievements system
    initializeAchievements() {
        return [
            {
                id: 'first-sign',
                name: 'First Sign',
                description: 'Learn your first ASL sign',
                icon: '🌟',
                requirement: 1,
                type: 'signs_learned'
            },
            {
                id: 'hello-world',
                name: 'Hello World',
                description: 'Master the greeting signs',
                icon: '👋',
                requirement: 3,
                type: 'signs_learned'
            },
            {
                id: 'streak-keeper',
                name: 'Streak Keeper',
                description: 'Practice for 3 days in a row',
                icon: '🔥',
                requirement: 3,
                type: 'streak'
            },
            {
                id: 'star-collector',
                name: 'Star Collector',
                description: 'Earn 50 stars',
                icon: '⭐',
                requirement: 50,
                type: 'stars'
            },
            {
                id: 'practice-master',
                name: 'Practice Master',
                description: 'Complete 20 practice sessions',
                icon: '🎯',
                requirement: 20,
                type: 'practice_sessions'
            },
            {
                id: 'accuracy-ace',
                name: 'Accuracy Ace',
                description: 'Maintain 90% accuracy',
                icon: '🎪',
                requirement: 90,
                type: 'accuracy'
            },
            {
                id: 'dedicated-learner',
                name: 'Dedicated Learner',
                description: 'Practice for 7 days in a row',
                icon: '📚',
                requirement: 7,
                type: 'streak'
            },
            {
                id: 'sign-master',
                name: 'Sign Master',
                description: 'Learn all available signs',
                icon: '🏆',
                requirement: 10,
                type: 'signs_learned'
            }
        ];
    }

    // Setup event listeners
    setupEventListeners() {
        // Navigation
        document.getElementById('homeBtn').addEventListener('click', () => this.showSection('home'));
        document.getElementById('learnBtn').addEventListener('click', () => this.showSection('learn'));
        document.getElementById('practiceBtn').addEventListener('click', () => this.showSection('practice'));
        document.getElementById('progressBtn').addEventListener('click', () => this.showSection('progress'));

        // Home section actions
        document.getElementById('startLearning').addEventListener('click', () => this.startLearning());
        document.getElementById('continueProgress').addEventListener('click', () => this.continueProgress());

        // Learning section controls
        document.getElementById('playDemo').addEventListener('click', () => this.playDemo());
        document.getElementById('practiceSign').addEventListener('click', () => this.goToPractice());
        document.getElementById('nextSign').addEventListener('click', () => this.nextSign());

        // Practice section controls
        document.getElementById('startPractice').addEventListener('click', () => this.startPractice());
        document.getElementById('skipPractice').addEventListener('click', () => this.skipPractice());

        // Modal controls
        document.getElementById('modalClose').addEventListener('click', () => this.hideModal());

        // Update streak on page load
        this.updateStreak();
    }

    // Show specific section
    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active state from all nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected section
        document.getElementById(`${sectionName}Section`).classList.add('active');
        document.getElementById(`${sectionName}Btn`).classList.add('active');

        this.currentSection = sectionName;

        // Update content based on section
        if (sectionName === 'learn') {
            this.loadCurrentLesson();
        } else if (sectionName === 'practice') {
            this.setupPracticeSession();
        } else if (sectionName === 'progress') {
            this.updateProgressDisplay();
        }
    }

    // Start learning from the beginning
    startLearning() {
        this.currentLessonIndex = 0;
        this.showSection('learn');
        this.showFeedback('Welcome to your ASL learning journey! 🌟', 'Let\'s start with your first sign.');
    }

    // Continue from where user left off
    continueProgress() {
        this.currentLessonIndex = this.userProgress.currentLesson;
        this.showSection('learn');
        this.showFeedback('Welcome back! 👋', 'Let\'s continue your learning journey.');
    }

    // Load current lesson content
    loadCurrentLesson() {
        const lesson = this.lessons[this.currentLessonIndex];
        if (!lesson) return;

        document.getElementById('signWord').textContent = lesson.word;
        document.getElementById('signDescription').textContent = lesson.description;
        document.querySelector('.sign-placeholder').textContent = lesson.emoji;

        // Update progress bar
        const progress = ((this.currentLessonIndex + 1) / this.lessons.length) * 100;
        document.getElementById('lessonProgress').style.width = `${progress}%`;

        // Update AI companion message
        this.updateAICompanion(`Great! Let's learn the sign for "${lesson.word}". ${lesson.description}`);
    }

    // Play demonstration (simulated AI feature)
    playDemo() {
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.showFeedback('Demo Playing! 🎬', 'Watch carefully and try to mimic the movement.');
            
            // Simulate AI analysis
            setTimeout(() => {
                this.updateAICompanion('Did you see how the hand moves? Try practicing it yourself!');
            }, 2000);
        }, 1500);
    }

    // Go to practice section
    goToPractice() {
        this.showSection('practice');
    }

    // Move to next sign
    nextSign() {
        if (this.currentLessonIndex < this.lessons.length - 1) {
            this.currentLessonIndex++;
            this.userProgress.currentLesson = this.currentLessonIndex;
            this.userProgress.signsLearned = Math.max(this.userProgress.signsLearned, this.currentLessonIndex + 1);
            
            // Award stars for completing a lesson
            this.awardStars(10);
            
            this.loadCurrentLesson();
            this.checkAchievements();
            this.saveProgress();
            this.updateUserStats();
            
            this.showFeedback('Excellent work! ⭐', `You've earned 10 stars! Ready for "${this.lessons[this.currentLessonIndex].word}"?`);
        } else {
            this.showFeedback('Congratulations! 🎉', 'You\'ve completed all available lessons! You\'re amazing!');
            this.checkAchievements();
        }
    }

    // Setup practice session
    setupPracticeSession() {
        const lesson = this.lessons[this.currentLessonIndex];
        if (!lesson) return;

        document.getElementById('feedbackMessage').textContent = 
            `Show me the sign for "${lesson.word}"! I'll use AI to analyze your gesture.`;
        document.getElementById('accuracy').textContent = '0%';
        document.getElementById('practiceScore').textContent = this.userProgress.practiceScores.reduce((a, b) => a + b, 0);
    }

    // Start practice session (AI simulation)
    startPractice() {
        this.showLoading();
        document.getElementById('feedbackMessage').textContent = 'AI is analyzing your gesture...';
        
        // Simulate AI processing time
        setTimeout(() => {
            this.hideLoading();
            this.simulateAIFeedback();
        }, 2000);
    }

    // Simulate AI feedback for practice
    simulateAIFeedback() {
        const accuracyScore = Math.floor(Math.random() * 30) + 70; // 70-100% accuracy
        const lesson = this.lessons[this.currentLessonIndex];
        
        document.getElementById('accuracy').textContent = `${accuracyScore}%`;
        
        const sessionScore = Math.floor(accuracyScore / 10);
        this.userProgress.practiceScores.push(sessionScore);
        document.getElementById('practiceScore').textContent = 
            this.userProgress.practiceScores.reduce((a, b) => a + b, 0);

        if (accuracyScore >= 85) {
            this.showFeedback('Excellent! 🌟', `${accuracyScore}% accuracy! You've mastered the sign for "${lesson.word}"!`);
            this.awardStars(15);
        } else if (accuracyScore >= 70) {
            this.showFeedback('Good job! 👍', `${accuracyScore}% accuracy! Keep practicing to improve.`);
            this.awardStars(8);
        } else {
            this.showFeedback('Keep trying! 💪', `${accuracyScore}% accuracy. Don't worry, practice makes perfect!`);
            this.awardStars(5);
        }

        // Update average accuracy
        this.updateAverageAccuracy();
        this.checkAchievements();
        this.saveProgress();
        this.updateUserStats();
    }

    // Skip practice session
    skipPractice() {
        this.showFeedback('No problem! 😊', 'You can practice anytime. Let\'s continue learning!');
        this.showSection('learn');
    }

    // Update average accuracy
    updateAverageAccuracy() {
        if (this.userProgress.practiceScores.length > 0) {
            const average = this.userProgress.practiceScores.reduce((a, b) => a + b, 0) / this.userProgress.practiceScores.length;
            this.userProgress.averageAccuracy = Math.round(average * 10); // Convert to percentage
        }
    }

    // Award stars to user
    awardStars(amount) {
        this.userProgress.totalStars += amount;
        
        // Create visual star animation (could be enhanced with actual animations)
        console.log(`⭐ +${amount} stars awarded! Total: ${this.userProgress.totalStars}`);
    }

    // Update user statistics display
    updateUserStats() {
        document.getElementById('totalProgress').textContent = this.userProgress.signsLearned;
        document.getElementById('streak').textContent = this.userProgress.streak;
        document.getElementById('totalStars').textContent = this.userProgress.totalStars;
        document.getElementById('totalDays').textContent = this.userProgress.totalDays;
        document.getElementById('totalTime').textContent = this.userProgress.totalTime;
        document.getElementById('averageAccuracy').textContent = `${this.userProgress.averageAccuracy}%`;
    }

    // Update AI companion message
    updateAICompanion(message = null) {
        const messages = [
            "Hi! I'm Alex, your AI learning companion. I'm here to help you learn ASL at your own pace. Ready to start?",
            "You're doing great! Remember, everyone learns at their own speed, and that's perfectly okay.",
            "ASL is a beautiful language. Each sign you learn opens up new ways to communicate!",
            "Take breaks when you need them. Learning should be fun and comfortable.",
            "I'm here to support you every step of the way. You've got this!",
            "Every small step forward is progress worth celebrating! 🌟"
        ];

        const companionMessage = message || messages[Math.floor(Math.random() * messages.length)];
        document.getElementById('companionMessage').textContent = companionMessage;
    }

    // Update streak tracking
    updateStreak() {
        const today = new Date().toDateString();
        const lastVisit = this.userProgress.lastVisit;

        if (!lastVisit) {
            // First visit
            this.userProgress.streak = 1;
            this.userProgress.totalDays = 1;
        } else if (lastVisit !== today) {
            const lastVisitDate = new Date(lastVisit);
            const todayDate = new Date(today);
            const daysDiff = Math.floor((todayDate - lastVisitDate) / (1000 * 60 * 60 * 24));

            if (daysDiff === 1) {
                // Consecutive day
                this.userProgress.streak++;
                this.userProgress.totalDays++;
            } else if (daysDiff > 1) {
                // Streak broken
                this.userProgress.streak = 1;
                this.userProgress.totalDays++;
            }
            // Same day visits don't change streak
        }

        this.userProgress.lastVisit = today;
        this.saveProgress();
    }

    // Check and unlock achievements
    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (this.userProgress.unlockedAchievements.includes(achievement.id)) {
                return; // Already unlocked
            }

            let shouldUnlock = false;

            switch (achievement.type) {
                case 'signs_learned':
                    shouldUnlock = this.userProgress.signsLearned >= achievement.requirement;
                    break;
                case 'streak':
                    shouldUnlock = this.userProgress.streak >= achievement.requirement;
                    break;
                case 'stars':
                    shouldUnlock = this.userProgress.totalStars >= achievement.requirement;
                    break;
                case 'practice_sessions':
                    shouldUnlock = this.userProgress.practiceScores.length >= achievement.requirement;
                    break;
                case 'accuracy':
                    shouldUnlock = this.userProgress.averageAccuracy >= achievement.requirement;
                    break;
            }

            if (shouldUnlock) {
                this.unlockAchievement(achievement);
            }
        });
    }

    // Unlock specific achievement
    unlockAchievement(achievement) {
        this.userProgress.unlockedAchievements.push(achievement.id);
        this.awardStars(20); // Bonus stars for achievements
        
        this.showFeedback(`🏆 Achievement Unlocked!`, `${achievement.icon} ${achievement.name}: ${achievement.description}`);
        
        console.log(`🏆 Achievement unlocked: ${achievement.name}`);
        this.saveProgress();
        this.populateAchievements();
    }

    // Populate achievements display
    populateAchievements() {
        const grid = document.getElementById('achievementGrid');
        grid.innerHTML = '';

        this.achievements.forEach(achievement => {
            const isUnlocked = this.userProgress.unlockedAchievements.includes(achievement.id);
            
            const badge = document.createElement('div');
            badge.className = `achievement-badge ${isUnlocked ? 'unlocked' : ''}`;
            badge.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">${achievement.icon}</div>
                <h4>${achievement.name}</h4>
                <p style="font-size: 0.875rem; margin-top: 0.25rem;">${achievement.description}</p>
                ${!isUnlocked ? '<div style="margin-top: 0.5rem; font-size: 0.75rem; opacity: 0.7;">🔒 Locked</div>' : ''}
            `;
            
            grid.appendChild(badge);
        });
    }

    // Update progress display
    updateProgressDisplay() {
        this.populateAchievements();
        this.populateLearningPath();
    }

    // Populate learning path timeline
    populateLearningPath() {
        const timeline = document.getElementById('pathTimeline');
        timeline.innerHTML = '';

        this.lessons.forEach((lesson, index) => {
            const isCompleted = index < this.userProgress.signsLearned;
            const isCurrent = index === this.currentLessonIndex;
            
            const milestone = document.createElement('div');
            milestone.style.cssText = `
                display: flex;
                align-items: center;
                padding: 1rem;
                margin-bottom: 0.5rem;
                background-color: ${isCompleted ? '#5cb85c' : isCurrent ? '#4a90e2' : '#f8f9fa'};
                color: ${isCompleted || isCurrent ? 'white' : '#6c757d'};
                border-radius: 8px;
                border: 2px solid ${isCompleted ? '#5cb85c' : isCurrent ? '#4a90e2' : '#e9ecef'};
            `;
            
            milestone.innerHTML = `
                <span style="font-size: 1.5rem; margin-right: 1rem;">${lesson.emoji}</span>
                <div>
                    <h4 style="margin: 0; font-size: 1rem;">${lesson.word}</h4>
                    <p style="margin: 0; font-size: 0.875rem; opacity: 0.8;">${lesson.category}</p>
                </div>
                <span style="margin-left: auto; font-size: 1.25rem;">
                    ${isCompleted ? '✅' : isCurrent ? '🔄' : '⏸️'}
                </span>
            `;
            
            timeline.appendChild(milestone);
        });
    }

    // Show feedback modal
    showFeedback(title, message) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').textContent = message;
        document.getElementById('feedbackModal').classList.add('show');
        document.getElementById('feedbackModal').setAttribute('aria-hidden', 'false');
    }

    // Hide feedback modal
    hideModal() {
        document.getElementById('feedbackModal').classList.remove('show');
        document.getElementById('feedbackModal').setAttribute('aria-hidden', 'true');
    }

    // Show loading indicator
    showLoading() {
        document.getElementById('loadingIndicator').classList.add('show');
        document.getElementById('loadingIndicator').setAttribute('aria-hidden', 'false');
    }

    // Hide loading indicator
    hideLoading() {
        document.getElementById('loadingIndicator').classList.remove('show');
        document.getElementById('loadingIndicator').setAttribute('aria-hidden', 'true');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aslApp = new ASLLearningApp();
});

// Additional AI-powered features (simulated for demonstration)
class AICompanion {
    static getEncouragingMessage(userProgress) {
        const messages = {
            beginner: [
                "You're taking the first steps in learning ASL - that's amazing!",
                "Every expert was once a beginner. You're doing great!",
                "Learning a new language takes courage. I'm proud of you!"
            ],
            intermediate: [
                "You're making excellent progress! Your dedication shows.",
                "Your ASL skills are really developing well. Keep it up!",
                "I can see how much you've improved. You should be proud!"
            ],
            advanced: [
                "You're becoming fluent in ASL! That's incredible!",
                "Your mastery of these signs is impressive. Well done!",
                "You're an inspiration to other learners. Amazing work!"
            ]
        };

        let level = 'beginner';
        if (userProgress.signsLearned >= 5) level = 'intermediate';
        if (userProgress.signsLearned >= 8) level = 'advanced';

        const levelMessages = messages[level];
        return levelMessages[Math.floor(Math.random() * levelMessages.length)];
    }

    static getPersonalizedTip(userProgress) {
        const tips = [
            "Practice in front of a mirror to see your hand movements clearly.",
            "Take breaks when you feel overwhelmed - learning should be comfortable.",
            "Try practicing signs throughout your day to reinforce memory.",
            "Remember that facial expressions are important in ASL too!",
            "Don't worry about perfect form at first - focus on the basic movement.",
            "Each person learns at their own pace, and that's perfectly normal."
        ];

        return tips[Math.floor(Math.random() * tips.length)];
    }
}

// Accessibility features for autism spectrum disorder
class AccessibilityFeatures {
    static enableHighContrast() {
        document.body.classList.add('high-contrast');
    }

    static enableReducedMotion() {
        document.body.classList.add('reduced-motion');
    }

    static enableLargeText() {
        document.body.classList.add('large-text');
    }

    static announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ASLLearningApp, AICompanion, AccessibilityFeatures };
}