// ========== НАСТРОЙКИ FIREBASE ==========
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCRgQ7y14HmmNEXXLqNMqjOLMUJzWCoHwc",
    authDomain: "sixsix-b1743.firebaseapp.com",
    projectId: "sixsix-b1743",
    storageBucket: "sixsix-b1743.firebasestorage.app",
    messagingSenderId: "773352016608",
    appId: "1:773352016608:web:a1f825b1751f8cfd085e85",
    measurementId: "G-FNG1JSVFGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// ========================================

// База данных учителей (сократил для проверки)
const teachersDB = {
    "29": ["Горчакова Анжелика Николаевна", "Шукова Ольга Анатольевна", "Якунов Даниил Александрович"],
    "33": ["Расторопова Алена Игоревна", "Кудряшова Вера Григорьевна", "Клочков Алексей Александрович"],
    "13": ["Агеева Марина Анатольевна", "Гайдов Владимир Валентинович", "Мартынов Павел Сергеевич"]
};

const maleTeachers = ["Якунов Даниил Александрович", "Клочков Алексей Александрович", "Гайдов Владимир Валентинович", "Мартынов Павел Сергеевич"];

// Состояние
let currentSchool = "33";
let currentCategory = "sexy";
let selectedTeacher = null;
let filterSchool = "all";

// ID устройства
let deviceId = localStorage.getItem('deviceId');
if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substring(2);
    localStorage.setItem('deviceId', deviceId);
}

// Данные
let votes = { "33": {}, "13": {}, "29": {}, "raion": {} };

// Функции Firebase
async function loadVotes() {
    try {
        const votesRef = ref(db, 'votes');
        const snapshot = await get(votesRef);
        if (snapshot.exists()) {
            votes = snapshot.val();
            console.log('✅ Голоса загружены');
        }
        updateAllDisplays();
    } catch (error) {
        console.error('❌ Ошибка загрузки:', error);
    }
}

async function saveVotes() {
    try {
        await set(ref(db, 'votes'), votes);
        console.log('✅ Голоса сохранены');
    } catch (error) {
        console.error('❌ Ошибка сохранения:', error);
    }
}

// Подписка на изменения
function subscribeToVotes() {
    const votesRef = ref(db, 'votes');
    onValue(votesRef, (snapshot) => {
        if (snapshot.exists()) {
            votes = snapshot.val();
            updateAllDisplays();
        }
    });
}

// Обновление интерфейса
function updateAllDisplays() {
    updateActivityPodium();
    updateWinnersDistrict();
    renderSchoolLeaders();
}

function getFilteredTeachers() {
    let teachers = [];
    if (currentSchool === 'raion') {
        if (filterSchool === 'all') {
            teachers = [...teachersDB["33"], ...teachersDB["13"], ...teachersDB["29"]];
        } else {
            teachers = teachersDB[filterSchool] || [];
        }
    } else {
        teachers = teachersDB[currentSchool] || [];
    }
    if (currentCategory === 'chill') {
        teachers = teachers.filter(t => maleTeachers.includes(t));
    }
    return teachers;
}

function renderTeacherWheel() {
    const wheel = document.getElementById('teacherWheel');
    if (!wheel) return;
    
    const teachersList = getFilteredTeachers();

    let html = '';
    teachersList.forEach(teacher => {
        const selectedClass = (selectedTeacher === teacher) ? 'selected-teacher' : '';
        html += `<div class="teacher-option ${selectedClass}" data-teacher="${teacher}">${teacher}</div>`;
    });
    
    if (teachersList.length === 0) {
        html = '<div class="teacher-option">Нет учителей</div>';
    }
    
    wheel.innerHTML = html;

    document.querySelectorAll('.teacher-option').forEach(el => {
        el.addEventListener('click', function() {
            document.querySelectorAll('.teacher-option').forEach(opt => opt.classList.remove('selected-teacher'));
            this.classList.add('selected-teacher');
            selectedTeacher = this.dataset.teacher;
            const saveBtn = document.getElementById('saveVoteBtn');
            if (saveBtn) saveBtn.disabled = false;
        });
    });
}

function calculateSchoolScores() {
    const scores = { "33": 0, "13": 0, "29": 0 };
    for (let school of ["33", "13", "29"]) {
        if (votes[school]) {
            for (let cat of ['sexy', 'good', 'mraz', 'fun', 'chill']) {
                if (votes[school][cat]) {
                    for (let teacher in votes[school][cat]) {
                        scores[school] += votes[school][cat][teacher].length;
                    }
                }
            }
        }
    }
    return scores;
}

function updateActivityPodium() {
    const podium = document.getElementById('activityPodium');
    if (!podium) return;
    
    const scores = calculateSchoolScores();
    const sorted = Object.entries(scores)
        .map(([school, score]) => ({ school, score }))
        .sort((a, b) => b.score - a.score);
    
    let html = '';
    if (sorted[0]) {
        html += `<div class="podium-place place-1"><div class="place-bar"><div>Школа ${sorted[0].school}</div><div class="school-score">${sorted[0].score}</div></div></div>`;
    }
    if (sorted[1]) {
        html += `<div class="podium-place place-2"><div class="place-bar"><div>Школа ${sorted[1].school}</div><div class="school-score">${sorted[1].score}</div></div></div>`;
    }
    if (sorted[2]) {
        html += `<div class="podium-place place-3"><div class="place-bar"><div>Школа ${sorted[2].school}</div><div class="school-score">${sorted[2].score}</div></div></div>`;
    }
    podium.innerHTML = html;
}

function getDistrictWinners() {
    const categories = ['sexy', 'good', 'mraz', 'fun', 'chill'];
    const winners = {};
    const raionVotes = votes['raion'] || {};

    categories.forEach(cat => {
        let maxCount = 0;
        let winnerName = 'нет голосов';
        if (raionVotes[cat]) {
            for (let teacher in raionVotes[cat]) {
                const cnt = raionVotes[cat][teacher].length;
                if (cnt > maxCount) {
                    maxCount = cnt;
                    winnerName = teacher;
                }
            }
        }
        winners[cat] = { name: winnerName, votes: maxCount };
    });
    return winners;
}

function updateWinnersDistrict() {
    const grid = document.getElementById('winnersGrid');
    if (!grid) return;
    
    const winners = getDistrictWinners();
    const catLabels = ['Секси', 'Добрая', 'Мразота', 'Угарная', 'Чиловый мужик'];
    const icons = ['💋', '😇', '👿', '🔥', '😎'];
    
    let html = '';
    Object.keys(winners).forEach((cat, idx) => {
        html += `
            <div class="winner-card">
                <div class="winner-icon">${icons[idx]}</div>
                <div class="winner-category">${catLabels[idx]}</div>
                <div class="winner-name">${winners[cat].name}</div>
                <div style="font-size: 14px;">${winners[cat].votes} голосов</div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

function renderSchoolLeaders() {
    if (currentSchool === 'raion') return;
    
    const grid = document.getElementById('leadersGrid');
    if (!grid) return;
    
    const categories = ['sexy', 'good', 'mraz', 'fun', 'chill'];
    const catLabels = ['Секси', 'Добрая', 'Мразота', 'Угарная', 'Чиловый мужик'];
    const schoolVotes = votes[currentSchool] || {};
    
    let html = '';
    categories.forEach((cat, idx) => {
        let maxCount = 0;
        let topTeacher = 'нет голосов';
        if (schoolVotes[cat]) {
            for (let teacher in schoolVotes[cat]) {
                const cnt = schoolVotes[cat][teacher].length;
                if (cnt > maxCount) {
                    maxCount = cnt;
                    topTeacher = teacher;
                }
            }
        }
        html += `
            <div class="leader-cat-block">
                <div class="leader-cat-name">${catLabels[idx]}</div>
                <div class="leader-teacher">${topTeacher}</div>
                <div>голосов: ${maxCount}</div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

// События
document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById('saveVoteBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', async function() {
            if (!selectedTeacher) return;
            
            if (votes[currentSchool]?.[currentCategory]?.[selectedTeacher]?.includes(deviceId)) {
                alert('Ты уже голосовал!');
                return;
            }

            if (!votes[currentSchool]) votes[currentSchool] = {};
            if (!votes[currentSchool][currentCategory]) votes[currentSchool][currentCategory] = {};
            if (!votes[currentSchool][currentCategory][selectedTeacher]) votes[currentSchool][currentCategory][selectedTeacher] = [];
            
            votes[currentSchool][currentCategory][selectedTeacher].push(deviceId);
            
            await saveVotes();
            alert('✅ Голос учтён!');
            
            saveBtn.disabled = true;
        });
    }

    // Переключение школы
    document.querySelectorAll('.school-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.school-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSchool = this.dataset.school;
            
            const filterDiv = document.getElementById('schoolFilter');
            if (filterDiv) {
                filterDiv.style.display = currentSchool === 'raion' ? 'flex' : 'none';
            }
            
            const leadersBlock = document.getElementById('schoolLeadersBlock');
            if (leadersBlock) {
                leadersBlock.style.display = currentSchool === 'raion' ? 'none' : 'block';
            }
            
            selectedTeacher = null;
            const saveBtn = document.getElementById('saveVoteBtn');
            if (saveBtn) saveBtn.disabled = true;
            
            renderTeacherWheel();
            if (currentSchool !== 'raion') renderSchoolLeaders();
        });
    });

    // Фильтр для района
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(f => f.classList.remove('active-filter'));
            this.classList.add('active-filter');
            filterSchool = this.dataset.filterSchool;
            selectedTeacher = null;
            const saveBtn = document.getElementById('saveVoteBtn');
            if (saveBtn) saveBtn.disabled = true;
            renderTeacherWheel();
        });
    });

    // Категории
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.cat-btn').forEach(c => c.classList.remove('active-cat'));
            this.classList.add('active-cat');
            currentCategory = this.dataset.cat;
            selectedTeacher = null;
            const saveBtn = document.getElementById('saveVoteBtn');
            if (saveBtn) saveBtn.disabled = true;
            renderTeacherWheel();
        });
    });
});

// Инициализация
loadVotes();
subscribeToVotes();
renderTeacherWheel();
updateAllDisplays();
