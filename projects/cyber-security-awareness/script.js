class CyberAwarenessApp {
  constructor() {
    this.modules = document.querySelectorAll('.module');
    this.navButtons = document.querySelectorAll('.nav-btn');
    this.initNavigation();
    this.initPasswordChecker();
    this.initQuiz();
  }

  initNavigation() {
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.getAttribute('data-module');
        this.modules.forEach(mod => mod.classList.remove('active'));
        document.getElementById(target).classList.add('active');
      });
    });
  }

  initPasswordChecker() {
    const input = document.getElementById('passwordInput');
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');
    const tips = document.getElementById('passwordTips');
    if (!input) return;

    input.addEventListener('input', () => {
      const pwd = input.value;
      const score = this.calculatePasswordScore(pwd);
      bar.style.width = `${score}%`;

      let label = 'Enter a password';
      if (score === 0) label = 'Enter a password';
      else if (score < 30) label = 'Weak';
      else if (score < 60) label = 'Fair';
      else if (score < 80) label = 'Good';
      else label = 'Strong';
      text.textContent = label;

      tips.innerHTML = this.passwordRecommendations(pwd)
        .map(t => `<div>• ${t}</div>`)
        .join('');
    });
  }

  calculatePasswordScore(pwd) {
    if (!pwd) return 0;
    let score = 0;
    const length = pwd.length;
    if (length >= 12) score += 35;
    else if (length >= 8) score += 20;
    else score += 10;

    if (/[a-z]/.test(pwd)) score += 10;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;

    // Penalty for common patterns
    if (/1234|password|qwerty|letmein|admin/i.test(pwd)) score -= 20;
    if (/([A-Za-z0-9])\1{2,}/.test(pwd)) score -= 10; // repeated chars

    return Math.max(0, Math.min(100, score));
  }

  passwordRecommendations(pwd) {
    const recs = [];
    if (!pwd || pwd.length < 12) recs.push('Use at least 12 characters');
    if (!/[A-Z]/.test(pwd)) recs.push('Add uppercase letters');
    if (!/[a-z]/.test(pwd)) recs.push('Add lowercase letters');
    if (!/[0-9]/.test(pwd)) recs.push('Include numbers');
    if (!/[^A-Za-z0-9]/.test(pwd)) recs.push('Add special symbols (e.g., !@#$)');
    if (/1234|password|qwerty|letmein|admin/i.test(pwd)) recs.push('Avoid common phrases');
    if (/([A-Za-z0-9])\1{2,}/.test(pwd)) recs.push('Avoid repeated characters');
    recs.push('Use a password manager to generate and store unique passwords');
    return recs;
  }

  initQuiz() {
    const startBtn = document.getElementById('startQuiz');
    const quizContent = document.querySelector('.quiz-content');
    const resultsEl = document.getElementById('quizResults');
    const questionContainer = document.getElementById('questionContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progressBar');
    const questionCounter = document.getElementById('questionCounter');

    if (!startBtn) return;

    const questions = [
      {
        q: 'What is the strongest password?',
        options: ['MyBirthday1999', 'P@ssw0rd!', 'M0on$-Giraffe!7#', 'qwerty2024'],
        answer: 2,
        explain: 'Strong passwords are long, random, and include mixed characters.'
      },
      {
        q: 'Which is a sign of a phishing email?',
        options: ['Personalized greeting with your full name', 'Urgent threats and misspelled domains', 'Sent from a verified domain', 'Contains no links'],
        answer: 1,
        explain: 'Phishing often uses urgency and lookalike domains to trick users.'
      },
      {
        q: 'Which network is safest for banking?',
        options: ['Public cafe Wi-Fi', 'Home Wi-Fi with WPA2 and strong password', 'Open airport Wi-Fi', 'Neighbor’s Wi-Fi'],
        answer: 1,
        explain: 'Use secured home networks with strong encryption for sensitive tasks.'
      },
      {
        q: 'What should you do after clicking a suspicious link?',
        options: ['Ignore it', 'Enter your credentials to check', 'Disconnect from the internet and run a malware scan', 'Forward to friends'],
        answer: 2,
        explain: 'Disconnect and scan to reduce potential damage and remove threats.'
      },
      {
        q: 'What does 2FA provide?',
        options: ['A backup password', 'A second step like a code or biometrics', 'Faster logins', 'No benefit'],
        answer: 1,
        explain: '2FA adds a second verification step to protect your account.'
      }
    ];

    let current = 0;
    const selections = new Array(questions.length).fill(null);

    const render = () => {
      const { q, options } = questions[current];
      questionContainer.innerHTML = `
        <div class="question">
          <div><strong>${q}</strong></div>
          <div class="options">
            ${options
              .map(
                (opt, idx) => `
                <div class="option ${selections[current] === idx ? 'selected' : ''}" data-idx="${idx}">
                  ${opt}
                </div>`
              )
              .join('')}
          </div>
        </div>`;

      questionContainer.querySelectorAll('.option').forEach(el => {
        el.addEventListener('click', () => {
          selections[current] = Number(el.dataset.idx);
          render();
          updateNavState();
        });
      });

      prevBtn.disabled = current === 0;
      nextBtn.style.display = current < questions.length - 1 ? 'inline-block' : 'none';
      submitBtn.style.display = current === questions.length - 1 ? 'inline-block' : 'none';

      const progress = ((current) / (questions.length - 1)) * 100;
      progressBar.style.width = `${progress}%`;
      questionCounter.textContent = `Question ${current + 1} of ${questions.length}`;
    };

    const updateNavState = () => {
      nextBtn.disabled = selections[current] === null && current < questions.length - 1;
      submitBtn.disabled = selections[current] === null && current === questions.length - 1;
    };

    startBtn.addEventListener('click', () => {
      startBtn.parentElement.style.display = 'none';
      quizContent.style.display = 'block';
      render();
      updateNavState();
    });

    prevBtn.addEventListener('click', () => {
      if (current > 0) { current--; render(); updateNavState(); }
    });

    nextBtn.addEventListener('click', () => {
      if (current < questions.length - 1) { current++; render(); updateNavState(); }
    });

    submitBtn.addEventListener('click', () => {
      let score = 0;
      const explanations = [];
      questions.forEach((q, i) => {
        if (selections[i] === q.answer) score++;
        explanations.push({
          question: q.q,
          correct: q.options[q.answer],
          yours: selections[i] != null ? q.options[selections[i]] : 'No answer',
          isCorrect: selections[i] === q.answer,
          explain: q.explain
        });
      });

      const percent = Math.round((score / questions.length) * 100);
      resultsEl.innerHTML = `
        <div class="results-card">
          <h3>Your Score: ${score}/${questions.length} (${percent}%)</h3>
          <p>${percent >= 80 ? 'Excellent! 🎉' : percent >= 60 ? 'Good job! 👍' : 'Keep learning! 💪'}</p>
          <hr/>
          ${explanations
            .map(
              (e, idx) => `
              <div style="margin:10px 0;">
                <div><strong>${idx + 1}. ${e.question}</strong></div>
                <div>Your answer: <span class="${e.isCorrect ? 'correct' : 'incorrect'}">${e.yours}</span></div>
                <div>Correct answer: <span class="correct">${e.correct}</span></div>
                <div style="opacity:.9;">${e.explain}</div>
              </div>`
            )
            .join('')}
        </div>`;

      quizContent.style.display = 'none';
      resultsEl.style.display = 'block';
    });
  }
}

// Initialize app
window.addEventListener('DOMContentLoaded', () => new CyberAwarenessApp());

