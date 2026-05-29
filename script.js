// ==================== script.js - 20 VERBES ====================
const verbs = [
   {base: "be", past: "was/were", pp: "been", fr: "être", mastery: 0},
  {base: "have", past: "had", pp: "had", fr: "avoir", mastery: 0},
  {base: "do", past: "did", pp: "done", fr: "faire", mastery: 0},
  {base: "go", past: "went", pp: "gone", fr: "aller", mastery: 0},
  {base: "say", past: "said", pp: "said", fr: "dire", mastery: 0},
  {base: "make", past: "made", pp: "made", fr: "faire", mastery: 0},
  {base: "take", past: "took", pp: "taken", fr: "prendre", mastery: 0},
  {base: "come", past: "came", pp: "come", fr: "venir", mastery: 0},
  {base: "see", past: "saw", pp: "seen", fr: "voir", mastery: 0},
  {base: "get", past: "got", pp: "got/gotten", fr: "obtenir", mastery: 0},
  {base: "know", past: "knew", pp: "known", fr: "savoir", mastery: 0},
  {base: "give", past: "gave", pp: "given", fr: "donner", mastery: 0},
  {base: "find", past: "found", pp: "found", fr: "trouver", mastery: 0},
  {base: "think", past: "thought", pp: "thought", fr: "penser", mastery: 0},
  {base: "tell", past: "told", pp: "told", fr: "dire", mastery: 0},
  {base: "become", past: "became", pp: "become", fr: "devenir", mastery: 0},
  {base: "show", past: "showed", pp: "shown", fr: "montrer", mastery: 0},
  {base: "leave", past: "left", pp: "left", fr: "partir", mastery: 0},
  {base: "feel", past: "felt", pp: "felt", fr: "ressentir", mastery: 0},
  {base: "put", past: "put", pp: "put", fr: "mettre", mastery: 0},
  
  // 21 à 40
  {base: "bring", past: "brought", pp: "brought", fr: "apporter", mastery: 0},
  {base: "begin", past: "began", pp: "begun", fr: "commencer", mastery: 0},
  {base: "keep", past: "kept", pp: "kept", fr: "garder", mastery: 0},
  {base: "hold", past: "held", pp: "held", fr: "tenir", mastery: 0},
  {base: "write", past: "wrote", pp: "written", fr: "écrire", mastery: 0},
  {base: "stand", past: "stood", pp: "stood", fr: "se tenir", mastery: 0},
  {base: "hear", past: "heard", pp: "heard", fr: "entendre", mastery: 0},
  {base: "let", past: "let", pp: "let", fr: "laisser", mastery: 0},
  {base: "mean", past: "meant", pp: "meant", fr: "signifier", mastery: 0},
  {base: "set", past: "set", pp: "set", fr: "poser / mettre", mastery: 0},
  {base: "meet", past: "met", pp: "met", fr: "rencontrer", mastery: 0},
  {base: "run", past: "ran", pp: "run", fr: "courir", mastery: 0},
  {base: "pay", past: "paid", pp: "paid", fr: "payer", mastery: 0},
  {base: "sit", past: "sat", pp: "sat", fr: "s'asseoir", mastery: 0},
  {base: "speak", past: "spoke", pp: "spoken", fr: "parler", mastery: 0},
  {base: "lie", past: "lay", pp: "lain", fr: "être allongé", mastery: 0},
  {base: "lead", past: "led", pp: "led", fr: "mener", mastery: 0},
  {base: "read", past: "read", pp: "read", fr: "lire", mastery: 0},
  {base: "grow", past: "grew", pp: "grown", fr: "grandir", mastery: 0},
  {base: "lose", past: "lost", pp: "lost", fr: "perdre", mastery: 0}
];

let currentScore = parseInt(localStorage.getItem('verbScore')) || 0;
let currentStreak = 0;
let currentVerb = null;
let bestStreak = parseInt(localStorage.getItem('bestStreak')) || 0;

function saveData() {
  localStorage.setItem('verbsData', JSON.stringify(verbs));
  localStorage.setItem('verbScore', currentScore);
  if (currentStreak > bestStreak) {
    bestStreak = currentStreak;
    localStorage.setItem('bestStreak', bestStreak);
  }
}

function updateMastery(base, correct) {
  const verb = verbs.find(v => v.base === base);
  if (!verb) return;
  verb.mastery = correct ? Math.min(5, (verb.mastery || 0) + 1) : Math.max(0, (verb.mastery || 0) - 1);
  saveData();
}

function updateStats() {
  document.getElementById('totalScore').textContent = currentScore;
  document.getElementById('streak').textContent = currentStreak;
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }
}

// ===================== LISTE =====================
function searchVerbs() {
  const term = document.getElementById('search').value.toLowerCase();
  const container = document.getElementById('listContent');
  container.innerHTML = '';

  const filtered = verbs.filter(v => 
    v.base.toLowerCase().includes(term) || v.fr.toLowerCase().includes(term)
  );

  filtered.forEach(v => {
    const div = document.createElement('div');
    div.className = 'verb-card';
    div.innerHTML = `
      <div>
        <strong>${v.base}</strong> → ${v.past} / ${v.pp}<br>
        <small>${v.fr}</small>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <span class="mastery">Maîtrise : ${v.mastery || 0}/5</span>
        <button onclick="event.stopImmediatePropagation(); speakAll('${v.base}', '${v.past}', '${v.pp}')">🔊 Écouter</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function speakAll(base, past, pp) {
  speak(base);
  setTimeout(() => speak(past), 800);
  setTimeout(() => speak(pp), 1600);
}

// ===================== FLASHCARDS =====================
function showFlashcard() {
  currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
  document.getElementById('flashcard').innerHTML = `
    <div class="card-inner" onclick="this.parentElement.classList.toggle('flipped')">
      <div class="front">
        <h2>${currentVerb.base}</h2>
        <p>Cliquez pour retourner la carte</p>
      </div>
      <div class="back">
        <h2>${currentVerb.past} / ${currentVerb.pp}</h2>
        <p>${currentVerb.fr}</p>
        <button class="btn-primary" onclick="event.stopImmediatePropagation(); speakAll('${currentVerb.base}', '${currentVerb.past}', '${currentVerb.pp}')">
          🔊 Prononcer les 3 formes
        </button>
      </div>
    </div>
  `;
}

// ===================== QUIZ =====================
function startQuiz() {
  currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
  const correct = `${currentVerb.past} / ${currentVerb.pp}`;
  let options = [correct];
  while (options.length < 4) {
    const rand = verbs[Math.floor(Math.random() * verbs.length)];
    const wrong = `${rand.past} / ${rand.pp}`;
    if (!options.includes(wrong)) options.push(wrong);
  }
  options.sort(() => Math.random() - 0.5);

  let html = `<h3>${currentVerb.base} (${currentVerb.fr})</h3>`;
  options.forEach(opt => {
    html += `<button class="option" onclick="checkQuiz(this, '${opt}', '${correct}')">${opt}</button>`;
  });
  document.getElementById('quizContent').innerHTML = html;
}

function checkQuiz(btn, selected, correct) {
  const isCorrect = selected === correct;
  btn.style.background = isCorrect ? '#10b981' : '#ef4444';
  btn.style.color = 'white';
  btn.style.borderColor = isCorrect ? '#10b981' : '#ef4444';

  updateMastery(currentVerb.base, isCorrect);
  if (isCorrect) {
    currentScore += 10;
    currentStreak++;
  } else {
    currentStreak = 0;
  }
  updateStats();
  saveData();
  setTimeout(startQuiz, 1400);
}

// ===================== QUIZ AUDIO =====================
function startAudioQuiz() {
  currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
  speak(currentVerb.base);

  let html = `<h3 style="margin-bottom:10px;">Quel verbe entendez-vous ?</h3>
              <button class="btn-primary" style="margin-bottom:20px;" onclick="speak('${currentVerb.base}')">🔊 Réécouter</button>
              <div id="audioOptions"></div>`;

  document.getElementById('audioQuizContent').innerHTML = html;
  const container = document.getElementById('audioOptions');

  let options = [currentVerb.base];
  while (options.length < 4) {
    const rand = verbs[Math.floor(Math.random() * verbs.length)].base;
    if (!options.includes(rand)) options.push(rand);
  }
  options.sort(() => Math.random() - 0.5);

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = opt;
    btn.onclick = () => {
      const correct = opt === currentVerb.base;
      btn.style.background = correct ? '#10b981' : '#ef4444';
      btn.style.color = 'white';
      btn.style.borderColor = correct ? '#10b981' : '#ef4444';
      updateMastery(currentVerb.base, correct);
      if (correct) { currentScore += 12; currentStreak++; } else { currentStreak = 0; }
      updateStats();
      saveData();
      setTimeout(startAudioQuiz, 1500);
    };
    container.appendChild(btn);
  });
}

// ===================== MATCHING =====================
function startMatching() {
  document.getElementById('matchingContent').innerHTML = `<p class="status-message">🔄 Module en cours d'adaptation...</p>`;
}

// ===================== STATS =====================
function showStats() {
  const total = verbs.length;
  const mastered = verbs.filter(v => (v.mastery || 0) >= 4).length;
  const percentage = Math.round(mastered/total*100);
  const avg = (verbs.reduce((s, v) => s + (v.mastery || 0), 0) / total).toFixed(1);

  document.getElementById('statsContent').innerHTML = `
    <p>Verbes maîtrisés (Niveau 4+) : <strong>${mastered}/${total}</strong> (${percentage}%)</p>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentage}%;"></div>
    </div>
    <div class="stats-grid">
      <div class="stat-box"><span>Niveau moyen</span><strong>${avg} / 5</strong></div>
      <div class="stat-box"><span>Score global</span><strong>${currentScore}</strong></div>
      <div class="stat-box"><span>Meilleure série</span><strong>${bestStreak} 🔥</strong></div>
    </div>
  `;
}

// ===================== NAVIGATION =====================
function showSection(section) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(section).classList.add('active');

  // Mettre à jour l'état actif sur les boutons de navigation
  document.querySelectorAll('nav button').forEach(btn => {
    btn.classList.remove('active');
    if(btn.getAttribute('onclick').includes(section)) {
      btn.classList.add('active');
    }
  });

  if (section === 'list') searchVerbs();
  if (section === 'flashcards') showFlashcard();
  if (section === 'quiz') startQuiz();
  if (section === 'audioquiz') startAudioQuiz();
  if (section === 'stats') showStats();
}

// ===================== INIT =====================
window.onload = () => {
  // Charger les données sauvegardées si existantes
  const savedVerbs = localStorage.getItem('verbsData');
  if (savedVerbs) {
    try {
      const parsed = JSON.parse(savedVerbs);
      parsed.forEach(sv => {
        const v = verbs.find(v => v.base === sv.base);
        if(v) v.mastery = sv.mastery;
      });
    } catch(e) { console.error("Erreur de chargement", e); }
  }

  updateStats();
  showSection('list');
  document.getElementById('versionTitle').textContent = "Module standard (40 verbes)";

  // Dark mode toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.getElementById('themeToggle').textContent = isDark ? '🌙' : '☀️';
  });
};